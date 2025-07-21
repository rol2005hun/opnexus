<template>
    <div class="auth-page">
        <div class="auth-container">
            <!-- Animated Background Elements -->
            <div class="floating-elements">
                <div class="element element-1"></div>
                <div class="element element-2"></div>
                <div class="element element-3"></div>
            </div>

            <div class="auth-header">
                <div class="logo-container">
                    <div class="logo-hexagon">
                        <div class="logo-inner">
                            <span class="logo-text">N</span>
                        </div>
                    </div>
                </div>
                <h1 class="main-title">
                    <span class="title-line">NEXUS</span>
                    <span class="title-subtitle">Digital Investigation Agency</span>
                </h1>
                <div class="security-badge">
                    <span class="badge-icon">🛡️</span>
                    <span class="badge-text">CLASSIFIED SYSTEM</span>
                </div>
                
                <div class="auth-tabs">
                    <button :class="{ active: mode === 'login' }" @click="switchMode('login')" class="tab-button">
                        <span class="tab-icon">🔐</span>
                        <span class="tab-text">Agent Access</span>
                    </button>
                    <button :class="{ active: mode === 'register' }" @click="switchMode('register')" class="tab-button">
                        <span class="tab-icon">📋</span>
                        <span class="tab-text">Recruitment</span>
                    </button>
                </div>
            </div>

            <!-- Login Form -->
            <Transition name="form-slide" mode="out-in">
                <div v-if="mode === 'login'" key="login" class="auth-form">
                    <div class="form-header">
                        <h2>🎯 Agent Access Portal</h2>
                        <p class="form-subtitle">Enter your credentials to access classified systems</p>
                    </div>
                    <form @submit.prevent="handleLogin" class="form-content">
                        <div class="form-group">
                            <label for="identifier">
                                <span class="label-icon">👤</span>
                                Agent Identifier
                            </label>
                            <div class="input-wrapper">
                                <input id="identifier" v-model="loginForm.identifier" type="text"
                                    placeholder="agent.username or email@nexus.gov" 
                                    autocomplete="username" required class="form-input" />
                                <div class="input-border"></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password">
                                <span class="label-icon">🔑</span>
                                Security Clearance Code
                            </label>
                            <div class="input-wrapper">
                                <input id="password" v-model="loginForm.password" type="password" 
                                    placeholder="••••••••••••" autocomplete="current-password" required class="form-input" />
                                <div class="input-border"></div>
                            </div>
                        </div>
                        <button type="submit" :disabled="authStore.isLoading" class="auth-button">
                            <div class="button-content">
                                <span v-if="authStore.isLoading" class="loading-state">
                                    <span class="spinner"></span>
                                    Authenticating Agent...
                                </span>
                                <span v-else class="normal-state">
                                    <span class="button-icon">🚀</span>
                                    Initiate System Access
                                </span>
                            </div>
                        </button>
                    </form>
                </div>

                <!-- Register Form -->
                <div v-else key="register" class="auth-form">
                    <div class="form-header">
                        <h2>📋 Agent Recruitment Portal</h2>
                        <p class="form-subtitle">Join our elite team of digital investigators</p>
                    </div>
                    <form @submit.prevent="handleRegister" class="form-content">
                        <div class="form-group">
                            <label for="agentName">
                                <span class="label-icon">🏷️</span>
                                Full Agent Name
                            </label>
                            <div class="input-wrapper">
                                <input id="agentName" v-model="registerForm.agentName" type="text" 
                                    placeholder="e.g., Sarah Mitchell Chen" autocomplete="name" required class="form-input" />
                                <div class="input-border"></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="username">
                                <span class="label-icon">👤</span>
                                Agent Username
                            </label>
                            <div class="input-wrapper">
                                <input id="username" v-model="registerForm.username" type="text" 
                                    placeholder="agent_sarah_m" autocomplete="username" required class="form-input" />
                                <div class="input-border"></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="email">
                                <span class="label-icon">📧</span>
                                Official Email Address
                            </label>
                            <div class="input-wrapper">
                                <input id="email" v-model="registerForm.email" type="email" 
                                    placeholder="sarah.chen@nexus.gov" autocomplete="email" required class="form-input" />
                                <div class="input-border"></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password">
                                <span class="label-icon">🔒</span>
                                Security Clearance Code
                            </label>
                            <div class="input-wrapper">
                                <input id="password" v-model="registerForm.password" type="password"
                                    placeholder="Minimum 6 secure characters" autocomplete="new-password" required class="form-input" />
                                <div class="input-border"></div>
                            </div>
                        </div>
                        <button type="submit" :disabled="authStore.isLoading" class="auth-button">
                            <div class="button-content">
                                <span v-if="authStore.isLoading" class="loading-state">
                                    <span class="spinner"></span>
                                    Processing Application...
                                </span>
                                <span v-else class="normal-state">
                                    <span class="button-icon">🎖️</span>
                                    Join NEXUS Agency
                                </span>
                            </div>
                        </button>
                    </form>
                </div>
            </Transition>

            <!-- Enhanced Messages -->
            <Transition name="message-slide">
                <div v-if="message.text" :class="['message', message.type]">
                    <span class="message-icon">
                        {{ message.type === 'success' ? '✅' : '⚠️' }}
                    </span>
                    <span class="message-text">{{ message.text }}</span>
                </div>
            </Transition>

            <div class="auth-footer">
                <div class="security-notice">
                    <span class="security-icon">�</span>
                    <span class="security-text">Encrypted Federal System • Authorized Personnel Only</span>
                </div>
                <div class="classification-level">
                    <span class="classification-badge">TOP SECRET</span>
                </div>
            </div>
        </div>

        <div class="background">
            <div class="grid-overlay"></div>
            <div class="gradient-overlay"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const mode = ref<'login' | 'register'>('login');

const switchMode = (newMode: 'login' | 'register') => {
    mode.value = newMode;
    message.text = ''; // Clear any existing messages
};

const loginForm = reactive({
    identifier: '',
    password: ''
});

const registerForm = reactive({
    username: '',
    email: '',
    password: '',
    agentName: ''
});

const message = reactive({
    text: '',
    type: 'success' as 'success' | 'error'
});

const showMessage = (text: string, type: 'success' | 'error' = 'success') => {
    message.text = text;
    message.type = type;
    setTimeout(() => {
        message.text = '';
    }, 5000);
};

const handleLogin = async () => {
    const result = await authStore.login(loginForm);

    if (result?.success) {
        showMessage(result.message);
        setTimeout(() => {
            router.push('/');
        }, 1500);
    } else {
        showMessage(result?.message || 'Login failed', 'error');
    }
};

const handleRegister = async () => {
    const result = await authStore.register(registerForm);

    if (result?.success) {
        showMessage(result.message);
        setTimeout(() => {
            router.push('/');
        }, 1500);
    } else {
        showMessage(result?.message || 'Registration failed', 'error');
    }
};

watch(() => authStore.isAuthenticated, (isAuth) => {
    if (isAuth) {
        router.push('/');
    }
}, { immediate: true });
</script>

<style scoped lang="scss">
// Animation keyframes
@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
    33% { transform: translateY(-20px) rotate(120deg); opacity: 1; }
    66% { transform: translateY(-10px) rotate(240deg); opacity: 0.8; }
}

@keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
    50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.7; }
}

@keyframes gradientShift {
    0%, 100% { 
        background-position: 0% 50%; 
    }
    50% { 
        background-position: 100% 50%; 
    }
}

// Main page layout
.auth-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

// Enhanced background
.background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -2;

    .grid-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
            linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
            radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
        background-size: 60px 60px, 60px 60px, 800px 800px, 600px 600px;
        opacity: 0.4;
        animation: pulse 6s ease-in-out infinite;
    }

    .gradient-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
            radial-gradient(ellipse at top left, rgba(59, 130, 246, 0.2) 0%, transparent 60%),
            radial-gradient(ellipse at top right, rgba(16, 185, 129, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse at bottom left, rgba(139, 92, 246, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse at bottom right, rgba(236, 72, 153, 0.1) 0%, transparent 60%),
            linear-gradient(135deg, 
                #0f172a 0%, 
                #1e293b 20%, 
                #334155 40%, 
                #1e293b 60%, 
                #0f172a 80%, 
                #020617 100%
            );
    }
}

// Floating elements animation
.floating-elements {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: -1;

    .element {
        position: absolute;
        border-radius: 50%;

        &.element-1 {
            top: 15%;
            left: 8%;
            width: 8px;
            height: 8px;
            background: rgba(59, 130, 246, 0.6);
            animation: float 6s ease-in-out infinite;
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
        }

        &.element-2 {
            top: 65%;
            right: 12%;
            width: 6px;
            height: 6px;
            background: rgba(16, 185, 129, 0.6);
            animation: float 8s ease-in-out infinite reverse;
            box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);
        }

        &.element-3 {
            bottom: 25%;
            left: 15%;
            width: 4px;
            height: 4px;
            background: rgba(139, 92, 246, 0.6);
            animation: float 10s ease-in-out infinite;
            box-shadow: 0 0 12px rgba(139, 92, 246, 0.4);
        }
    }

    // Additional tech elements
    &::before {
        content: '';
        position: absolute;
        top: 30%;
        right: 20%;
        width: 2px;
        height: 40px;
        background: linear-gradient(180deg, transparent, rgba(59, 130, 246, 0.3), transparent);
        animation: float 7s ease-in-out infinite;
    }

    &::after {
        content: '';
        position: absolute;
        bottom: 40%;
        left: 25%;
        width: 30px;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.3), transparent);
        animation: float 9s ease-in-out infinite reverse;
    }
}

// Main container
.auth-container {
    background: rgba(17, 25, 40, 0.98);
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 20px;
    padding: 2rem;
    width: 100%;
    max-width: 450px;
    max-height: 95vh;
    overflow-y: auto;
    backdrop-filter: blur(20px);
    box-shadow: 
        0 25px 50px rgba(0, 0, 0, 0.7),
        0 0 0 1px rgba(59, 130, 246, 0.1) inset;
    position: relative;
    animation: slideInUp 0.8s ease-out;

    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent);
    }
}

.auth-header {
    text-align: center;
}

.logo-container {
    margin-bottom: 1rem;
}

.logo-hexagon {
    width: 60px;
    height: 60px;
    margin: 0 auto 0.8rem;
    position: relative;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: glow 3s ease-in-out infinite;

    .logo-inner {
        width: 52px;
        height: 52px;
        background: rgba(17, 25, 40, 0.9);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .logo-text {
        font-size: 1.6rem;
        font-weight: 900;
        color: #3b82f6;
        text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
    }
}

.main-title {
    margin-bottom: 0.8rem;

    .title-line {
        display: block;
        font-size: 2.2rem;
        font-weight: 900;
        color: #f1f5f9;
        text-shadow: 0 0 30px rgba(59, 130, 246, 0.4);
        letter-spacing: 0.1em;
    }

    .title-subtitle {
        display: block;
        font-size: 0.85rem;
        color: #94a3b8;
        font-weight: 400;
        margin-top: 0.3rem;
        letter-spacing: 0.05em;
    }
}

.security-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    padding: 0.4rem 0.8rem;
    border-radius: 50px;
    margin-bottom: 1.5rem;

    .badge-icon {
        font-size: 0.9rem;
    }

    .badge-text {
        font-size: 0.7rem;
        color: #ef4444;
        font-weight: 600;
        letter-spacing: 0.05em;
    }
}

// Enhanced tabs
.auth-tabs {
    display: flex;
    gap: 0.8rem;
    margin-top: 1.5rem;

    .tab-button {
        flex: 1;
        padding: 0.8rem;
        background: rgba(30, 41, 59, 0.5);
        border: 1px solid rgba(59, 130, 246, 0.2);
        color: #94a3b8;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        position: relative;
        overflow: hidden;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
            transition: left 0.5s ease;
        }

        &:hover::before {
            left: 100%;
        }

        &.active {
            background: rgba(59, 130, 246, 0.2);
            color: #3b82f6;
            border-color: #3b82f6;
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);

            .tab-icon {
                animation: pulse 2s ease-in-out infinite;
            }
        }

        &:hover:not(.active) {
            background: rgba(59, 130, 246, 0.1);
            color: #60a5fa;
            transform: translateY(-1px);
        }

        .tab-icon {
            font-size: 1rem;
        }

        .tab-text {
            font-weight: 500;
            font-size: 0.85rem;
        }
    }
}

// Form styles
.auth-form {
    margin: 1.5rem 0;

    .form-header {
        text-align: center;
        margin-bottom: 1.5rem;

        h2 {
            color: #f1f5f9;
            margin-bottom: 0.4rem;
            font-size: 1.2rem;
            font-weight: 600;
        }

        .form-subtitle {
            color: #94a3b8;
            font-size: 0.8rem;
            margin: 0;
            line-height: 1.3;
        }
    }
}

.form-group {
    margin-bottom: 1.2rem;

    label {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        color: #94a3b8;
        margin-bottom: 0.6rem;
        font-size: 0.85rem;
        font-weight: 500;

        .label-icon {
            font-size: 0.9rem;
        }
    }

    .input-wrapper {
        position: relative;

        .form-input {
            width: 100%;
            padding: 0.9rem;
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 10px;
            color: #f1f5f9;
            font-size: 0.95rem;
            transition: all 0.3s ease;

            &:focus {
                outline: none;
                border-color: #3b82f6;
                background: rgba(30, 41, 59, 0.9);
                box-shadow: 
                    0 0 0 3px rgba(59, 130, 246, 0.1),
                    0 0 20px rgba(59, 130, 246, 0.2);

                + .input-border {
                    opacity: 1;
                    transform: scaleX(1);
                }
            }

            &::placeholder {
                color: #64748b;
                font-size: 0.9rem;
            }
        }

        .input-border {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, #3b82f6, #1d4ed8);
            border-radius: 0 0 10px 10px;
            opacity: 0;
            transform: scaleX(0);
            transition: all 0.3s ease;
        }
    }
}

// Enhanced button
.auth-button {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    border: none;
    border-radius: 10px;
    color: white;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s ease;
    }

    &:hover:not(:disabled) {
        background: linear-gradient(135deg, #2563eb, #1e40af);
        transform: translateY(-1px);
        box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);

        &::before {
            left: 100%;
        }
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }

    &:disabled {
        opacity: 0.8;
        cursor: not-allowed;
        transform: none;
    }

    .button-content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
    }

    .loading-state {
        display: flex;
        align-items: center;
        gap: 0.4rem;

        .spinner {
            width: 14px;
            height: 14px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
    }

    .normal-state {
        display: flex;
        align-items: center;
        gap: 0.4rem;
    }

    .button-icon {
        font-size: 1rem;
    }
}

// Enhanced messages
.message {
    margin-top: 1rem;
    padding: 0.8rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-weight: 500;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    font-size: 0.9rem;

    .message-icon {
        font-size: 1.1rem;
        flex-shrink: 0;
    }

    .message-text {
        flex: 1;
    }

    &.success {
        background: rgba(34, 197, 94, 0.15);
        color: #22c55e;
        border: 1px solid rgba(34, 197, 94, 0.3);
    }

    &.error {
        background: rgba(239, 68, 68, 0.15);
        color: #ef4444;
        border: 1px solid rgba(239, 68, 68, 0.3);
    }
}

// Enhanced footer
.auth-footer {
    margin-top: 2rem;
    padding-top: 1.2rem;
    border-top: 1px solid rgba(59, 130, 246, 0.2);

    .security-notice {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        margin-bottom: 0.8rem;

        .security-icon {
            font-size: 0.9rem;
        }

        .security-text {
            color: #64748b;
            font-size: 0.75rem;
        }
    }

    .classification-level {
        text-align: center;

        .classification-badge {
            display: inline-block;
            background: rgba(239, 68, 68, 0.2);
            color: #ef4444;
            padding: 0.2rem 0.6rem;
            border-radius: 15px;
            font-size: 0.65rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            border: 1px solid rgba(239, 68, 68, 0.3);
        }
    }
}

// Transition animations
.form-slide-enter-active,
.form-slide-leave-active {
    transition: all 0.3s ease;
}

.form-slide-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.form-slide-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

.message-slide-enter-active,
.message-slide-leave-active {
    transition: all 0.3s ease;
}

.message-slide-enter-from,
.message-slide-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

// Responsive design
@media (max-width: 768px) {
    .auth-page {
        padding: 0;
    }

    .auth-container {
        margin: 0;
        padding: 1.5rem;
        max-width: none;
        max-height: 100vh;
        min-height: 100vh;
        border-radius: 0;
        border: none;
        background: rgba(17, 25, 40, 0.95);
        backdrop-filter: blur(15px);
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .logo-hexagon {
        width: 50px;
        height: 50px;

        .logo-inner {
            width: 42px;
            height: 42px;
        }

        .logo-text {
            font-size: 1.4rem;
        }
    }

    .main-title .title-line {
        font-size: 1.8rem;
    }

    .main-title .title-subtitle {
        font-size: 0.8rem;
    }

    .auth-tabs .tab-button {
        padding: 0.7rem;
        font-size: 0.8rem;

        .tab-text {
            display: none;
        }

        .tab-icon {
            font-size: 1.1rem;
        }
    }

    .form-group {
        margin-bottom: 1rem;
    }

    .form-group .input-wrapper .form-input {
        padding: 0.8rem;
        font-size: 0.9rem;
    }

    .auth-button {
        padding: 0.9rem;
        font-size: 0.9rem;
    }

    .auth-footer {
        margin-top: 1.5rem;
    }
}

@media (max-width: 480px) {
    .auth-container {
        padding: 1rem;
    }

    .main-title .title-line {
        font-size: 1.6rem;
    }

    .form-group .input-wrapper .form-input {
        padding: 0.7rem;
    }

    .auth-button {
        padding: 0.8rem;
    }
}

@media (max-height: 700px) {
    .auth-container {
        max-height: 100vh;
        margin: 0;
        border-radius: 0;
        border: none;
        min-height: 100vh;
        justify-content: center;
        overflow-y: auto;
    }

    .logo-container {
        margin-bottom: 0.5rem;
    }

    .auth-header {
        margin-bottom: 1.5rem;
    }

    .security-badge {
        margin-bottom: 1rem;
    }

    .auth-tabs {
        margin-top: 1rem;
    }

    .auth-form {
        margin: 1rem 0;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    .auth-footer {
        margin-top: 1.5rem;
        padding-top: 1rem;
    }
}

@media (max-height: 600px) {
    .logo-hexagon {
        width: 40px;
        height: 40px;
        margin-bottom: 0.5rem;

        .logo-inner {
            width: 32px;
            height: 32px;
        }

        .logo-text {
            font-size: 1.2rem;
        }
    }

    .main-title .title-line {
        font-size: 1.4rem;
    }

    .security-badge {
        margin-bottom: 0.8rem;
        padding: 0.3rem 0.6rem;

        .badge-text {
            font-size: 0.65rem;
        }
    }

    .auth-header {
        margin-bottom: 1rem;
    }

    .form-group {
        margin-bottom: 0.8rem;
    }
}
</style>