import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/server/utils/database';
import { User } from '@/server/api/models/User';
import { generateToken } from '@/server/utils/jwt';

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
        const { identifier, password } = body;

        // Validation
        if (!identifier || !password) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Email/username and password are required'
            });
        }

        // Try to find user by email or username
        const user = await User.findOne({
            $or: [
                { email: identifier.toLowerCase() },
                { username: identifier }
            ]
        });

        if (!user) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid credentials'
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid credentials'
            });
        }

        // Generate JWT token
        const token = generateToken({
            userId: user._id.toString(),
            email: user.email,
            username: user.username
        });

        // Return user data (without password)
        const userResponse = {
            id: user._id,
            username: user.username,
            email: user.email,
            agent: user.agent,
            gameProgress: user.gameProgress,
            subscription: user.subscription,
            createdAt: user.createdAt
        };

        return {
            success: true,
            user: userResponse,
            token,
            message: `Welcome back, Agent ${user.agent.name}!`
        };

    } catch (error: any) {
        console.error('Login error:', error);

        if (error.statusCode) {
            throw error;
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error during login'
        });
    }
});