import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@@/server/utils/database';
import { User } from '@@/server/api/models/User';
import { generateToken } from '@@/server/utils/jwt';
import { success, error, warn, info } from '@@/server/utils/discord-logger';

export default defineEventHandler(async (event) => {
    if (event.method !== 'POST') {
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
            await warn(`[REGISTER] Attempt with missing fields: ${JSON.stringify({ username: !!username, email: !!email, password: !!password, agentName: !!agentName })}`);
            throw createError({
                statusCode: 400,
                statusMessage: 'Missing required fields'
            });
        }

        if (password.length < 6) {
            await warn(`[REGISTER] Attempt with weak password for user: ${username}`);
            throw createError({
                statusCode: 400,
                statusMessage: 'Password must be at least 6 characters'
            });
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            await warn(`[REGISTER] Attempt with existing credentials: ${existingUser.email === email ? 'email' : 'username'} already exists for ${username || email}`);
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
                rank: 'Rookie' as DifficultyLevel,
                department: 'Digital Investigation Unit',
                clearanceLevel: 1,
                joinDate: new Date()
            },
            gameProgress: {
                completedMissions: [],
                purchasedMissions: ['the-internal-leak'],
                currentMission: null,
                totalPlaytime: 0,
                achievements: ['new-recruit']
            },
            subscription: {
                type: 'free'
            }
        });

        const savedUser = await newUser.save();
        
        await success(`[REGISTER] New user registered: ID: ${savedUser._id}, username: ${username} Email: ${email} Agent: ${agentName} Badge: ${newUser.agent.badge}.`);

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

        await info(`[REGISTER] User ${username} successfully registered and logged in.`);

        return {
            success: true,
            user: userResponse,
            token,
            message: 'Registration successful! Welcome to NEXUS, Agent!'
        };

    } catch (err: any) {
        console.error('Registration error:', err);
        
        if (!err.statusCode) {
            await error(`[REGISTER] ${err instanceof Error ? err.message : 'Unknown error'}.`);
        }

        if (err.statusCode) {
            throw err;
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error during registration'
        });
    }
});