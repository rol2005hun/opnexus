import type { StoryContent } from '@/types/content';
import { nexusCorpLeakStory } from '@/stories/nexus-corp-leak';

export type StoryId = 'nexus-corp-leak' | 'banking-fraud';

export const storyRegistry: Record<StoryId, () => Promise<StoryContent>> = {
    'nexus-corp-leak': async () => nexusCorpLeakStory,
    'banking-fraud': async () => {
        const { bankingFraudStory } = await import('@/stories/banking-fraud');
        return bankingFraudStory;
    }
};

export async function getStoryContent(storyId: string): Promise<StoryContent | null> {
    const loader = storyRegistry[storyId as StoryId];
    if (!loader) return null;
    
    try {
        return await loader();
    } catch (error) {
        console.error(`Failed to load story ${storyId}:`, error);
        return null;
    }
}