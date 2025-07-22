const isCompletionModalVisible = ref(false);
const completedStoryId = ref<string | null>(null);
const finalScore = ref(0);

export const useStoryCompletion = () => {
    const showCompletionModal = (storyId: string, score: number) => {
        completedStoryId.value = storyId;
        finalScore.value = score;
        isCompletionModalVisible.value = true;
    };

    const hideCompletionModal = () => {
        isCompletionModalVisible.value = false;
        completedStoryId.value = null;
        finalScore.value = 0;
    };

    const getRankBasedOnScore = (score: number): { rank: string; color: string; description: string } => {
        if (score >= 500) {
            return {
                rank: 'LEGENDARY INVESTIGATOR',
                color: '#FFD700',
                description: 'Perfect investigation! You found every clue and solved the case flawlessly.'
            };
        } else if (score >= 400) {
            return {
                rank: 'MASTER DETECTIVE',
                color: '#C0C0C0',
                description: 'Outstanding work! You conducted a thorough investigation.'
            };
        } else if (score >= 300) {
            return {
                rank: 'SKILLED AGENT',
                color: '#CD7F32',
                description: 'Great job! You successfully solved the case with solid detective work.'
            };
        } else if (score >= 200) {
            return {
                rank: 'COMPETENT INVESTIGATOR',
                color: '#007acc',
                description: 'Well done! You gathered enough evidence to close the case.'
            };
        } else {
            return {
                rank: 'ROOKIE DETECTIVE',
                color: '#666',
                description: 'Case closed, but there\'s room for improvement in your investigation skills.'
            };
        }
    };

    const getStoryTitle = (storyId: string): string => {
        const storyTitles: Record<string, string> = {
            'the-internal-leak': 'The Internal Leak',
            'banking-fraud-investigation': 'Banking Fraud Investigation',
            'operation-blackout': 'Operation Blackout',
            'the-insider': 'The Insider',
            'digital-ghost': 'Digital Ghost'
        };
        return storyTitles[storyId] || 'Unknown Case';
    };

    const completionData = computed(() => {
        if (!completedStoryId.value) return null;

        return {
            storyId: completedStoryId.value,
            storyTitle: getStoryTitle(completedStoryId.value),
            score: finalScore.value,
            rank: getRankBasedOnScore(finalScore.value)
        };
    });

    return {
        isCompletionModalVisible: readonly(isCompletionModalVisible),
        completionData: readonly(completionData),
        showCompletionModal,
        hideCompletionModal
    };
};

export const showCompletionModal = (storyId: string, score: number) => {
    const { showCompletionModal: show } = useStoryCompletion();
    show(storyId, score);
};