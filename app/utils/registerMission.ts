import type { Mission } from '#shared/types/game/mission';

export type MissionId = 'the-internal-leak' | 'banking-fraud-investigation' | 'operation-blackout' | 'the-insider' | 'digital-ghost';

const missionRegistry: Record<MissionId, () => Promise<Mission>> = {
    'the-internal-leak': async () => {
        const { missionMetadata, missionContent } = await import('../../missions/the-internal-leak');
        return { ...missionMetadata, content: missionContent };
    },
    'banking-fraud-investigation': async () => {
        const { missionMetadata } = await import('../../missions/banking-fraud-investigation');
        return { ...missionMetadata, content: undefined };
    },
    'operation-blackout': async () => {
        const { missionMetadata } = await import('../../missions/operation-blackout/metadata');
        return { ...missionMetadata, content: undefined };
    },
    'the-insider': async () => {
        const { missionMetadata } = await import('../../missions/the-insider/metadata');
        return { ...missionMetadata, content: undefined };
    },
    'digital-ghost': async () => {
        const { missionMetadata } = await import('../../missions/digital-ghost/metadata');
        return { ...missionMetadata, content: undefined };
    }
};

export default async function registerMission(missionId: string): Promise<Mission | null> {
    const loader = missionRegistry[missionId as MissionId];
    if (!loader) {
        console.warn(`Mission '${missionId}' not found in registry`);
        return null;
    }

    try {
        return await loader();
    } catch (error) {
        console.error(`Failed to load mission '${missionId}':`, error);
        return null;
    }
}

export async function getAllMissions(): Promise<Mission[]> {
    const missionIds = Object.keys(missionRegistry) as MissionId[];
    const missionPromises = missionIds.map(async (id) => {
        return await registerMission(id);
    });

    try {
        const missions = await Promise.all(missionPromises);
        return missions.filter((mission): mission is Mission => mission !== null);
    } catch (error) {
        console.error('Failed to load missions:', error);
        return [];
    }
}