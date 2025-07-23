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
        canAccessMission: (state) => (requiredClearance: number) => {
            return state.user ? state.user.agent.clearanceLevel >= requiredClearance : false;
        },
        hasMissionAccess: (state) => (missionId: string) => {
            return state.user?.gameProgress.purchasedMissions.includes(missionId) || false;
        }
    },

    actions: {
        async register(userData: { username: string; email: string; password: string; agentName: string }) {
            this.isLoading = true;
            try {
                const data = await $fetch<any>('/api/auth/register', {
                    method: 'POST',
                    body: userData
                });

                if (data.success) {
                    this.user = data.user;
                    this.token = data.token;
                    this.isAuthenticated = true;

                    const tokenCookie = useCookie('auth-token');
                    tokenCookie.value = data.token;

                    return { success: true, message: data.message };
                }
            } catch (error: any) {
                console.error('Registration error:', error);
                return {
                    success: false,
                    message: error.data?.message || 'Registration failed'
                };
            } finally {
                this.isLoading = false;
            }
        },

        async login(credentials: { identifier: string; password: string }) {
            this.isLoading = true;
            try {
                const data = await $fetch<any>('/api/auth/login', {
                    method: 'POST',
                    body: credentials
                });

                if (data.success) {
                    this.user = data.user;
                    this.token = data.token;
                    this.isAuthenticated = true;

                    const tokenCookie = useCookie('auth-token');
                    tokenCookie.value = data.token;

                    return { success: true, message: data.message };
                }
            } catch (error: any) {
                console.error('Login error:', error);
                return {
                    success: false,
                    message: error.data?.message || 'Login failed'
                };
            } finally {
                this.isLoading = false;
            }
        },

        async fetchProfile() {
            if (!this.token) return;

            try {
                const data = await $fetch<any>('/api/user/profile', {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });

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
        },

        async updateGameProgress(progress: Partial<User['gameProgress']>) {
            if (!this.user) return;

            this.user.gameProgress = {
                ...this.user.gameProgress,
                ...progress
            };

            // TODO: Sync with server
        },

        async purchaseMission(missionId: string) {
            if (!this.user || this.hasMissionAccess(missionId)) return false;

            try {
                // TODO: Implement payment logic

                this.user.gameProgress.purchasedMissions.push(missionId);

                return true;
            } catch (error) {
                console.error('Mission purchase error:', error);
                return false;
            }
        }
    }
});