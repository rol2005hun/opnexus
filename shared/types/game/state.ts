import type { Mission } from './mission';
import type { MissionProgress } from './progress';
import type { MissionContent } from '../content/mission';

export interface GameState {
    currentMission: string | null;
    missions: Mission[];
    missionContents: Record<string, MissionContent>;
    isInLaptop: boolean;
    progress: Record<string, MissionProgress>;
}