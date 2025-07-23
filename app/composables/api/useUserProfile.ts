export interface UserProfile {
    username: string;
    email: string;
    agentName: string;
}

export interface ProfileUpdateResponse {
    success: boolean;
    user?: UserProfile;
}

export const useUserProfile = () => {
    const fetchProfile = async (token: string): Promise<{ success: boolean; user?: any }> => {
        try {
            const response = await $fetch<{ success: boolean; user?: any }>('/api/user/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            console.error('Profile fetch error:', error);
            throw new Error('Profile fetch failed');
        }
    };

    const updateProfile = async (profileData: Partial<UserProfile>): Promise<ProfileUpdateResponse> => {
        try {
            const response = await $fetch<ProfileUpdateResponse>('/api/user/update-profile', {
                method: 'POST',
                body: profileData
            });
            return response;
        } catch (error) {
            console.error('Failed to update profile:', error);
            throw new Error('Profile update failed');
        }
    };

    const changePassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean }> => {
        try {
            const response = await $fetch<{ success: boolean }>('/api/user/change-password', {
                method: 'POST',
                body: {
                    currentPassword,
                    newPassword
                }
            });
            return response;
        } catch (error) {
            console.error('Password change failed:', error);
            throw new Error('Password change failed');
        }
    };

    return {
        fetchProfile,
        updateProfile,
        changePassword
    };
};
