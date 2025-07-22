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
        const { identifier, password } = body;

        if (!identifier || !password) {
            await warn(`[LOGIN] Attempt with missing credentials.`);
            throw createError({
                statusCode: 400,
                statusMessage: 'Email/username and password are required'
            });
        }

        const user = await User.findOne({
            $or: [
                { email: identifier.toLowerCase() },
                { username: identifier }
            ]
        });

        if (!user) {
            await warn(`[LOGIN] Invalid identifier: ${identifier}`);
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid credentials'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            await warn(`[LOGIN] Failed login attempt for user: ID: ${user._id} Email: ${user.email}`);
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid credentials'
            });
        }

        const token = generateToken({
            userId: user._id.toString(),
            email: user.email,
            username: user.username
        });

        const userResponse = {
            id: user._id,
            username: user.username,
            email: user.email,
            agent: user.agent,
            gameProgress: user.gameProgress,
            subscription: user.subscription,
            createdAt: user.createdAt
        };

        await success(`[LOGIN] User logged in: ID: ${user._id} Username: ${user.username}.`);

        return {
            success: true,
            user: userResponse,
            token,
            message: `Welcome back, Agent ${user.agent.name}!`
        };

    } catch (err: any) {
        console.error('Login error:', err);
        
        if (!err.statusCode) {
            await error(`[LOGIN] ${err instanceof Error ? err.message : 'Unknown error'}.`);
        }

        if (err.statusCode) {
            throw err;
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error during login'
        });
    }
});