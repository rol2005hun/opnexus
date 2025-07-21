import mongoose from 'mongoose';

export interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
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
    updatedAt: Date;
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    agent: {
        badge: {
            type: String,
            default: () => `NX-${Math.floor(Math.random() * 9000) + 1000}`
        },
        name: {
            type: String,
            required: true
        },
        rank: {
            type: String,
            default: 'Trainee Agent'
        },
        department: {
            type: String,
            default: 'Digital Investigation Unit'
        },
        clearanceLevel: {
            type: Number,
            default: 1
        },
        joinDate: {
            type: Date,
            default: Date.now
        }
    },
    gameProgress: {
        completedStories: [{
            type: String,
            default: []
        }],
        purchasedStories: [{
            type: String,
            default: []
        }],
        currentStory: {
            type: String,
            default: null
        },
        totalPlaytime: {
            type: Number,
            default: 0
        },
        achievements: [{
            type: String,
            default: []
        }]
    },
    subscription: {
        type: {
            type: String,
            enum: ['free', 'premium'],
            default: 'free'
        },
        expiresAt: {
            type: Date,
            default: null
        }
    }
}, {
    timestamps: true
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);