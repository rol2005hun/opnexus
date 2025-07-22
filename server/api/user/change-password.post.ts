import bcrypt from 'bcryptjs';
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
        const { currentPassword, newPassword } = body;

        if (!currentPassword || !newPassword) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Current password and new password are required'
            });
        }

        if (newPassword.length < 6) {
            throw createError({
                statusCode: 400,
                statusMessage: 'New password must be at least 6 characters long'
            });
        }

        const user = await User.findById(payload.userId);
        if (!user) {
            throw createError({
                statusCode: 404,
                statusMessage: 'User not found'
            });
        }

        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Current password is incorrect'
            });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 12);

        await User.findByIdAndUpdate(
            payload.userId,
            { password: hashedNewPassword },
            { runValidators: true }
        );

        return {
            success: true,
            message: 'Password changed successfully'
        };

    } catch (error: any) {
        if (error.statusCode) {
            throw error;
        }

        console.error('Password change error:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        });
    }
});
