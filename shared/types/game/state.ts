import type { Mission } from './mission';
import type { MissionProgress } from './progress';

export interface GameState {
    currentMission: string | null;
    missions: Mission[];
    isInLaptop: boolean;
    progress: Record<string, MissionProgress>;
}
