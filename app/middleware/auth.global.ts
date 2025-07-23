import { useGameStore } from '@/stores/game';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();
    const gameStore = useGameStore();
    const token = useCookie('auth-token');

    const publicRoutes = ['auth', 'index'];
    const isPublicRoute = publicRoutes.includes(to.name as string);

    if (token.value) {
        if (!authStore.user || !authStore.isAuthenticated) {
            authStore.token = token.value;
            await authStore.fetchProfile();
        }

        if (authStore.isAuthenticated && to.name === 'auth') {
            return navigateTo('/');
        }
    }

    if (!token.value && !isPublicRoute) {
        return navigateTo('/auth');
    }

    if (to.name === undefined) {
        return token.value ? navigateTo('/') : navigateTo('/auth');
    }

    if (gameStore.missions.length === 0) {
        await gameStore.initializeMissions();
    }
});