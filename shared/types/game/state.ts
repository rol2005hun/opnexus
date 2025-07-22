import type { Story } from './story';
import type { StoryProgress } from './progress';

export interface GameState {
    currentStory: string | null;
    stories: Story[];
    isInLaptop: boolean;
    progress: Record<string, StoryProgress>;
}
