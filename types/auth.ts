export interface User {
    id: string;
    username: string;
    email: string;
    agent: {
        badge: string;
        name: string;
        rank: string;
        department: string;
        clearanceLevel: number;
        joinDate: Date;
    };
    gameProgress: {
        completedStories: string[];
        purchasedStories: string[];
        currentStory: string | null;
        totalPlaytime: number;
        achievements: string[];
    };
    subscription: {
        type: 'free' | 'premium';
        expiresAt?: Date;
    };
    createdAt: Date;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}
