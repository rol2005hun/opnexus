import { connectToDatabase } from '~/server/utils/database';
import { User } from '~/server/api/models/User';
import { verifyToken, extractTokenFromHeader } from '~/server/utils/jwt';

export default defineEventHandler(async (event) => {
    if (getMethod(event) !== 'GET') {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method Not Allowed'
        });
    }

    try {
        await connectToDatabase();

        // Extract and verify JWT token
        const authHeader = getHeader(event, 'authorization');
        const token = extractTokenFromHeader(authHeader);

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

        // Find user by ID
        const user = await User.findById(payload.userId);

        if (!user) {
            throw createError({
                statusCode: 404,
                statusMessage: 'User not found'
            });
        }

        // Return user data (without password)
        const userResponse = {
            id: user._id,
            username: user.username,
            email: user.email,
            agent: user.agent,
            gameProgress: user.gameProgress,
            subscription: user.subscription,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        return {
            success: true,
            user: userResponse
        };

    } catch (error: any) {
        console.error('Profile fetch error:', error);

        if (error.statusCode) {
            throw error;
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        });
    }
});