import type { StoryContent } from '@/types/content';

export type StoryId = 'the-internal-leak' | 'banking-fraud-investigation';

export const storyRegistry: Record<StoryId, () => Promise<StoryContent>> = {
    'the-internal-leak': async () => {
        const { nexusCorpLeakStory } = await import('@/stories/the-internal-leak');
        return nexusCorpLeakStory;
    },
    'banking-fraud-investigation': async () => {
        const { bankingFraudStory } = await import('@/stories/banking-fraud-investigation');
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