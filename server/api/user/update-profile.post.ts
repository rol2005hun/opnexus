import { connectToDatabase } from '@@/server/utils/database';
import { User } from '@@/server/api/models/User';
import { verifyToken, extractTokenFromHeader } from '@@/server/utils/jwt';

export default defineEventHandler(async (event) => {
    if (getMethod(event) !== 'POST') {
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
            throw createError({
                statusCode: 400,
                statusMessage: 'Agent name, username, and email are required'
            });
        }

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
            throw createError({
                statusCode: 404,
                statusMessage: 'User not found'
            });
        }

        return {
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser
        };

    } catch (error: any) {
        if (error.statusCode) {
            throw error;
        }

        console.error('Profile update error:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        });
    }
});
