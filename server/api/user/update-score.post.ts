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
        const { storyId, points } = body; 

        if (!storyId) {
            await warn(`[UPDATE-SCORE] Missing story ID for user ID: ${payload.userId}.`);
            throw createError({
                statusCode: 400,
                statusMessage: 'Story ID is required'
            });
        }

        if (typeof points !== 'number' || ![100, -10].includes(points)) {
            await warn(`[UPDATE-SCORE] Invalid points value: ${points} for user ID: ${payload.userId}, story: ${storyId}.`);
            throw createError({
                statusCode: 400,
                statusMessage: 'Points must be either 100 or -10.'
            });
        }

        const user = await User.findById(payload.userId);
        if (!user) {
            await warn(`[UPDATE-SCORE] User not found: ID: ${payload.userId}.`);
            throw createError({
                statusCode: 404,
                statusMessage: 'User not found'
            });
        }

        if (!user.gameProgress) {
            user.gameProgress = {
                completedStories: [],
                purchasedStories: [],
                currentStory: null,
                totalPlaytime: 0,
                storyScores: new Map(),
                achievements: []
            };
        }
        if (!user.gameProgress.storyScores) {
             user.gameProgress.storyScores = new Map();
        }
        if (!user.gameProgress.completedStories) {
            user.gameProgress.completedStories = [];
        }

        let currentStoryScore = user.gameProgress.storyScores.get(storyId) || 0;
        const isStoryCompleted = user.gameProgress.completedStories.includes(storyId);
        let message = '';

        if (points === -10) {
            user.gameProgress.storyScores.set(storyId, currentStoryScore + points);
            message = `Wrong guess. Score decreased by 10. New score: ${user.gameProgress.storyScores.get(storyId)}`;
            await info(`[UPDATE-SCORE] Score decreased for user: ID: ${user._id}, username: ${user.username}, story: ${storyId}, new score: ${user.gameProgress.storyScores.get(storyId)}.`);
        } else if (points === 100) {
            if (!isStoryCompleted) {
                user.gameProgress.storyScores.set(storyId, currentStoryScore + points);
                user.gameProgress.completedStories.push(storyId);
                message = `Story completed. Points added: 100. New score: ${user.gameProgress.storyScores.get(storyId)}`;
                await success(`[UPDATE-SCORE] Story completed by user: ID: ${user._id}, username: ${user.username}, story: ${storyId}, new score: ${user.gameProgress.storyScores.get(storyId)}.`);
            } else {
                message = 'Story already completed. Score not updated.';
                await info(`[UPDATE-SCORE] Attempt to complete already finished story by user: ID: ${user._id}, username: ${user.username}, story: ${storyId}.`);
            }
        }
        
        const updateDoc = {
            'gameProgress.storyScores': user.gameProgress.storyScores,
            'gameProgress.completedStories': user.gameProgress.completedStories
        };

        const updatedUser = await User.findByIdAndUpdate(
            payload.userId,
            { $set: updateDoc },
            { runValidators: true, new: true }
        );

        if (!updatedUser) {
            await error(`[UPDATE-SCORE] Failed to update user progress for user ID: ${payload.userId}, story: ${storyId}.`);
            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to update user progress.'
            });
        }

        return {
            success: true,
            currentScore: updatedUser.gameProgress.storyScores.get(storyId) || 0,
            message: message
        };

    } catch (err: any) { 
        if (err.statusCode) {
            throw err;
        }

        console.error('Story score update error:', err);
        await error(`[UPDATE-SCORE] ${err instanceof Error ? err.message : 'Unknown error'}.`);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        });
    }
});