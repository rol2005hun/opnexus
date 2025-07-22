import bcrypt from 'bcryptjs';
import { connectToDatabase } from '~/server/utils/database';
import { User } from '~/server/api/models/User';
import { generateToken } from '~/server/utils/jwt';

export default defineEventHandler(async (event) => {
    if (getMethod(event) !== 'POST') {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method Not Allowed'
        });
    }

    try {
        await connectToDatabase();

        const body = await readBody(event);
        const { username, email, password, agentName } = body;

        if (!username || !email || !password || !agentName) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Missing required fields'
            });
        }

        if (password.length < 6) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Password must be at least 6 characters'
            });
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            throw createError({
                statusCode: 409,
                statusMessage: 'User with this email or username already exists'
            });
        }

        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            agent: {
                name: agentName,
                badge: `NX-${Math.floor(Math.random() * 9000) + 1000}`,
                rank: 'Rookie',
                department: 'Digital Investigation Unit',
                clearanceLevel: 1,
                joinDate: new Date()
            },
            gameProgress: {
                completedStories: [],
                purchasedStories: ['the-internal-leak'],
                currentStory: null,
                totalPlaytime: 0,
                achievements: ['new-recruit']
            },
            subscription: {
                type: 'free'
            }
        });

        const savedUser = await newUser.save();

        const token = generateToken({
            userId: savedUser._id.toString(),
            email: savedUser.email,
            username: savedUser.username
        });

        const userResponse = {
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            agent: savedUser.agent,
            gameProgress: savedUser.gameProgress,
            subscription: savedUser.subscription,
            createdAt: savedUser.createdAt
        };

        return {
            success: true,
            user: userResponse,
            token,
            message: 'Registration successful! Welcome to NEXUS, Agent!'
        };

    } catch (error: any) {
        console.error('Registration error:', error);

        if (error.statusCode) {
            throw error;
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error during registration'
        });
    }
});