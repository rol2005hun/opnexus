import { connectToDatabase } from '@@/server/utils/database';
import { User } from '@@/server/api/models/User';
import { verifyToken, extractTokenFromHeader } from '@@/server/utils/jwt';
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

        const authHeader = getHeader(event, 'authorization');
        let token = extractTokenFromHeader(authHeader);

        if (!token) {
            token = getCookie(event, 'auth-token') || null;
        }

        if (!token) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Authorization token required'
            });
        }

        const payload = verifyToken(token);
        if (!payload) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid or expired token'
            });
        }

        const body = await readBody(event);
        const { agentName, username, email } = body;

        if (!agentName || !username || !email) {
            await warn(`[UPDATE-PROFILE] Attempt with missing fields for user ID: ${payload.userId}.`);
            throw createError({
                statusCode: 400,
                statusMessage: 'Agent name, username, and email are required'
            });
        }

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            await warn(`[UPDATE-PROFILE] Invalid email format for user ID: ${payload.userId}, email: ${email}.`);
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid email format'
            });
        }

        const existingUserWithUsername = await User.findOne({ 
            username, 
            _id: { $ne: payload.userId } 
        });
        if (existingUserWithUsername) {
            await warn(`[UPDATE-PROFILE] Username already taken: ${username} for user ID: ${payload.userId}.`);
            throw createError({
                statusCode: 409,
                statusMessage: 'Username already taken'
            });
        }

        const existingUserWithEmail = await User.findOne({ 
            email, 
            _id: { $ne: payload.userId } 
        });
        if (existingUserWithEmail) {
            await warn(`[UPDATE-PROFILE] Email already in use: ${email} for user ID: ${payload.userId}.`);
            throw createError({
                statusCode: 409,
                statusMessage: 'Email already in use'
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            payload.userId,
            {
                username,
                email,
                'agent.name': agentName
            },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            await warn(`[UPDATE-PROFILE] User not found: ID: ${payload.userId}.`);
            throw createError({
                statusCode: 404,
                statusMessage: 'User not found'
            });
        }

        await success(`[UPDATE-PROFILE] Profile updated successfully for user: ID: ${updatedUser._id}, username: ${updatedUser.username} Agent: ${updatedUser.agent.name}.`);

        return {
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser
        };

    } catch (err: any) {
        if (err.statusCode) {
            throw err;
        }

        console.error('Profile update error:', err);
        await error(`[UPDATE-PROFILE] ${err instanceof Error ? err.message : 'Unknown error'}.`);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        });
    }
});
