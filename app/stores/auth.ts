import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false
    }),

    getters: {
        currentUser: (state) => state.user,
        userAgent: (state) => state.user?.agent,
        gameProgress: (state) => state.user?.gameProgress,
        canAccessMission: (state) => (mission: Mission) => {
            if (!state.user) return false;
            
            const hasPurchased = state.user.gameProgress.purchasedMissions.includes(mission.id);
            const hasRequiredClearance = state.user.agent.clearanceLevel >= mission.securityClearance;
            
            return hasPurchased && hasRequiredClearance;
        }
    },

    actions: {
        async register(userData: { username: string; email: string; password: string; agentName: string }) {
            this.isLoading = true;
            try {
                const { register } = useAuth();
                const data = await register(userData);

                if (data.success) {
                    this.user = data.user;
                    this.token = data.token || null;
                    this.isAuthenticated = true;

                    const tokenCookie = useCookie('auth-token');
                    tokenCookie.value = data.token;

                    return { success: true, message: data.message };
                }
            } catch (error: any) {
                console.error('Registration error:', error);
                return {
                    success: false,
                    message: error.message || 'Registration failed'
                };
            } finally {
                this.isLoading = false;
            }
        },

        async login(credentials: { identifier: string; password: string }) {
            this.isLoading = true;
            try {
                const { login } = useAuth();
                const data = await login(credentials);

                if (data.success) {
                    this.user = data.user;
                    this.token = data.token || null;
                    this.isAuthenticated = true;

                    const tokenCookie = useCookie('auth-token');
                    tokenCookie.value = data.token;

                    return { success: true, message: data.message };
                }
            } catch (error: any) {
                console.error('Login error:', error);
                return {
                    success: false,
                    message: error.message || 'Login failed'
                };
            } finally {
                this.isLoading = false;
            }
        },

        async fetchProfile() {
            if (!this.token) return;

            try {
                const { fetchProfile } = useUserProfile();
                const data = await fetchProfile(this.token);

                if (data.success) {
                    this.user = data.user;
                    this.isAuthenticated = true;
                }
            } catch (error) {
                console.error('Profile fetch error:', error);
                this.logout();
            }
        },

        logout() {
            this.user = null;
            this.token = null;
            this.isAuthenticated = false;

            const tokenCookie = useCookie('auth-token');
            tokenCookie.value = null;
        },

        async initAuth() {
            const tokenCookie = useCookie('auth-token');
            if (tokenCookie.value) {
                this.token = tokenCookie.value;
                await this.fetchProfile();
            }
        }
    }
});