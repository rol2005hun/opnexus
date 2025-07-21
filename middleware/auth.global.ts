import { useAuthStore } from '@/stores/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();
    const token = useCookie('auth-token');
    
    if (token.value) {
        if (!authStore.user || !authStore.isAuthenticated) {
            authStore.token = token.value;
            await authStore.fetchProfile();
        }
        
        if (authStore.isAuthenticated && to.name === 'auth') {
            return navigateTo('/');
        }
    }
    
    if (to.name === undefined) {
        return token.value ? navigateTo('/') : navigateTo('/auth');
    }
});