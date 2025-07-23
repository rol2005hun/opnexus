export interface AuthResponse {
    success: boolean;
    token?: string;
    user?: any;
    message?: string;
}

export interface LoginCredentials {
    identifier: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    agentName: string;
}

export const useAuth = () => {
    const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
        try {
            const response = await $fetch<AuthResponse>('/api/auth/login', {
                method: 'POST',
                body: credentials
            });
            return response;
        } catch (error: any) {
            console.error('Login failed:', error);
            throw {
                success: false,
                message: error.data?.message || 'Login failed'
            };
        }
    };

    const register = async (data: RegisterData): Promise<AuthResponse> => {
        try {
            const response = await $fetch<AuthResponse>('/api/auth/register', {
                method: 'POST',
                body: data
            });
            return response;
        } catch (error: any) {
            console.error('Registration failed:', error);
            throw {
                success: false,
                message: error.data?.message || 'Registration failed'
            };
        }
    };

    return {
        login,
        register
    };
};