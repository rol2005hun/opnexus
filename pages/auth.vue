<template>
    <div class="auth-page">
        
        <div class="background-floating-elements">
            <div class="bg-element bg-dot-1"></div>
            <div class="bg-element bg-dot-2"></div>
            <div class="bg-element bg-dot-3"></div>
            <div class="bg-element bg-dot-4"></div>
            <div class="bg-element bg-dot-5"></div>
            <div class="bg-element bg-line-1"></div>
            <div class="bg-element bg-line-2"></div>
            <div class="bg-element bg-hex-1"></div>
            <div class="bg-element bg-hex-2"></div>
        </div>
        
        <div class="auth-container">
            
            <div class="floating-elements">
                <div class="element dot-1"></div>
                <div class="element dot-2"></div>
                <div class="element dot-3"></div>
                <div class="element dot-4"></div>
                <div class="element line-1"></div>
                <div class="element line-2"></div>
                <div class="element hex-1"></div>
                <div class="element hex-2"></div>
            </div>

            <div class="auth-header">
                <div class="logo-container">
                    <div class="logo-icon">
                        <span class="logo-text">
                            <span class="logo-o">O</span><span class="logo-n">N</span>
                        </span>
                    </div>
                    <div class="logo-title-container">
                        <span class="logo-operation">Operation:</span>
                        <span class="logo-nexus">NEXUS</span>
                    </div>
                </div>
                <div class="agency-subtitle">Digital Investigation Agency</div>
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
                    <span class="security-icon">🔒</span>
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
    
    // Professional FBI/investigation background - harmonizes with blue form
    background: 
        // Subtle blue accent spots to complement the form
        radial-gradient(ellipse at 15% 25%, rgba(0, 122, 204, 0.08) 0%, transparent 50%),
        radial-gradient(ellipse at 85% 75%, rgba(0, 122, 204, 0.06) 0%, transparent 60%),
        radial-gradient(ellipse at 50% 10%, rgba(59, 130, 246, 0.04) 0%, transparent 70%),
        radial-gradient(ellipse at 30% 90%, rgba(0, 122, 204, 0.05) 0%, transparent 60%),
        // Professional dark gradient base
        linear-gradient(145deg, 
            #0a0e1a 0%,
            #1a1f2e 25%, 
            #141826 50%, 
            #0f1419 75%, 
            #0d1117 100%
        );
    
    // Subtle surveillance/investigation grid pattern
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
            linear-gradient(rgba(0, 122, 204, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 122, 204, 0.02) 1px, transparent 1px);
        background-size: 80px 80px;
        pointer-events: none;
        opacity: 0.3;
    }
    
    // Gentle blue glow effect around the center (where form is)
    &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 600px;
        height: 600px;
        transform: translate(-50%, -50%);
        background: radial-gradient(circle, rgba(0, 122, 204, 0.03) 0%, transparent 70%);
        pointer-events: none;
        animation: gentleGlow 8s ease-in-out infinite alternate;
    }
}

// Background floating elements (outside the form)
.background-floating-elements {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 0;

    .bg-element {
        position: absolute;
        opacity: 0.4;

        &.bg-dot-1 {
            top: 10%;
            left: 15%;
            width: 6px;
            height: 6px;
            background: rgba(0, 122, 204, 0.6);
            border-radius: 50%;
            animation: bgFloatDot1 16s ease-in-out infinite;
        }

        &.bg-dot-2 {
            top: 20%;
            right: 20%;
            width: 4px;
            height: 4px;
            background: rgba(59, 130, 246, 0.7);
            border-radius: 50%;
            animation: bgFloatDot2 14s ease-in-out infinite reverse;
        }

        &.bg-dot-3 {
            bottom: 25%;
            left: 25%;
            width: 5px;
            height: 5px;
            background: rgba(0, 122, 204, 0.5);
            border-radius: 50%;
            animation: bgFloatDot3 18s ease-in-out infinite;
        }

        &.bg-dot-4 {
            bottom: 15%;
            right: 30%;
            width: 7px;
            height: 7px;
            background: rgba(59, 130, 246, 0.4);
            border-radius: 50%;
            animation: bgFloatDot4 12s ease-in-out infinite reverse;
        }

        &.bg-dot-5 {
            top: 50%;
            left: 5%;
            width: 3px;
            height: 3px;
            background: rgba(0, 122, 204, 0.8);
            border-radius: 50%;
            animation: bgFloatDot5 20s ease-in-out infinite;
        }

        &.bg-line-1 {
            top: 30%;
            left: 5%;
            width: 80px;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(0, 122, 204, 0.3), transparent);
            animation: bgFloatLine1 22s ease-in-out infinite;
        }

        &.bg-line-2 {
            bottom: 40%;
            right: 8%;
            width: 60px;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.25), transparent);
            animation: bgFloatLine2 19s ease-in-out infinite reverse;
        }

        &.bg-hex-1 {
            top: 60%;
            right: 10%;
            width: 10px;
            height: 10px;
            background: transparent;
            border: 1px solid rgba(0, 122, 204, 0.3);
            transform: rotate(45deg);
            animation: bgFloatHex1 25s ease-in-out infinite;
        }

        &.bg-hex-2 {
            top: 8%;
            left: 70%;
            width: 8px;
            height: 8px;
            background: transparent;
            border: 1px solid rgba(59, 130, 246, 0.25);
            transform: rotate(45deg);
            animation: bgFloatHex2 21s ease-in-out infinite reverse;
        }
    }
}

// Floating elements for investigation theme (inside form)
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
        opacity: 0.6;

        &.dot-1 {
            top: 15%;
            left: 10%;
            width: 4px;
            height: 4px;
            background: rgba(0, 122, 204, 0.7);
            border-radius: 50%;
            animation: floatDot1 12s ease-in-out infinite;
        }

        &.dot-2 {
            top: 25%;
            right: 15%;
            width: 6px;
            height: 6px;
            background: rgba(59, 130, 246, 0.5);
            border-radius: 50%;
            animation: floatDot2 15s ease-in-out infinite reverse;
        }

        &.dot-3 {
            bottom: 20%;
            left: 20%;
            width: 3px;
            height: 3px;
            background: rgba(0, 122, 204, 0.8);
            border-radius: 50%;
            animation: floatDot3 18s ease-in-out infinite;
        }

        &.dot-4 {
            bottom: 30%;
            right: 12%;
            width: 5px;
            height: 5px;
            background: rgba(59, 130, 246, 0.6);
            border-radius: 50%;
            animation: floatDot4 14s ease-in-out infinite reverse;
        }

        &.line-1 {
            top: 40%;
            left: 8%;
            width: 60px;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(0, 122, 204, 0.4), transparent);
            animation: floatLine1 20s ease-in-out infinite;
        }

        &.line-2 {
            top: 60%;
            right: 10%;
            width: 40px;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
            animation: floatLine2 16s ease-in-out infinite reverse;
        }

        &.hex-1 {
            top: 70%;
            left: 85%;
            width: 8px;
            height: 8px;
            background: transparent;
            border: 1px solid rgba(0, 122, 204, 0.4);
            transform: rotate(45deg);
            animation: floatHex1 22s ease-in-out infinite;
        }

        &.hex-2 {
            top: 12%;
            left: 75%;
            width: 6px;
            height: 6px;
            background: transparent;
            border: 1px solid rgba(59, 130, 246, 0.3);
            transform: rotate(45deg);
            animation: floatHex2 19s ease-in-out infinite reverse;
        }
    }
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
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.logo-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 
        0 4px 20px rgba(59, 130, 246, 0.4),
        0 0 0 1px rgba(59, 130, 246, 0.2) inset;

    .logo-text {
        font-size: 1.2rem;
        font-weight: 700;
        font-family: 'JetBrains Mono', monospace;

        .logo-o {
            color: #22c55e;
        }

        .logo-n {
            color: white;
        }
    }
}

.logo-title-container {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;

    .logo-operation {
        color: #22c55e;
        font-size: 2rem;
        font-weight: 500;
        letter-spacing: 0.05em;
        font-family: 'Inter', sans-serif;
        text-shadow: 0 0 20px rgba(34, 197, 94, 0.5);
    }

    .logo-nexus {
        color: #f1f5f9;
        font-size: 2rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        font-family: 'Inter', sans-serif;
        text-shadow: 0 0 20px rgba(241, 245, 249, 0.5);
    }
}

.agency-subtitle {
    text-align: center;
    font-size: 0.9rem;
    color: #94a3b8;
    font-weight: 400;
    margin-bottom: 0.8rem;
    letter-spacing: 0.05em;
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
                    width: 100%;
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
            left: 50%;
            width: 0%;
            height: 20px;
            background: linear-gradient(90deg, #3b82f6, #1d4ed8);
            transform: translateX(-50%);
            transition: width 0.3s ease;
            border-radius: 50px;
            clip-path: inset(85% 0 0 0);
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
        height: 100vh;
        max-height: 100vh;
        min-height: fit-content;
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

    .logo-container {
        gap: 0.5rem;
        margin-bottom: 1rem;
    }

    .logo-icon {
        width: 36px;
        height: 36px;

        .logo-text {
            font-size: 1rem;
        }
    }

    .logo-title-container {
        gap: 0.3rem;

        .logo-operation {
            font-size: 1.2rem;
        }

        .logo-nexus {
            font-size: 1.4rem;
        }
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

    .form-group .input-wrapper .form-input {
        padding: 0.7rem;
    }

    .auth-button {
        padding: 0.8rem;
    }
}

@media (max-height: 700px) {
    .auth-container {
        margin: 0;
        border-radius: 0;
        border: none;
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

// Professional investigation background animation
@keyframes gentleGlow {
    0% { 
        opacity: 0.3;
        transform: translate(-50%, -50%) scale(1);
    }
    100% { 
        opacity: 0.6;
        transform: translate(-50%, -50%) scale(1.1);
    }
}

// Floating elements animations
@keyframes floatDot1 {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(20px, -15px); }
    50% { transform: translate(-10px, -25px); }
    75% { transform: translate(15px, 10px); }
}

@keyframes floatDot2 {
    0%, 100% { transform: translate(0, 0); }
    33% { transform: translate(-25px, 20px); }
    66% { transform: translate(30px, -10px); }
}

@keyframes floatDot3 {
    0%, 100% { transform: translate(0, 0); }
    20% { transform: translate(15px, -20px); }
    40% { transform: translate(-20px, -15px); }
    60% { transform: translate(25px, 15px); }
    80% { transform: translate(-15px, 25px); }
}

@keyframes floatDot4 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-30px, -20px); }
}

@keyframes floatLine1 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.4; }
    25% { transform: translate(10px, -15px) rotate(5deg); opacity: 0.7; }
    50% { transform: translate(-15px, -10px) rotate(-3deg); opacity: 0.5; }
    75% { transform: translate(20px, 5px) rotate(8deg); opacity: 0.6; }
}

@keyframes floatLine2 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
    30% { transform: translate(-20px, 10px) rotate(-5deg); opacity: 0.6; }
    70% { transform: translate(15px, -12px) rotate(4deg); opacity: 0.4; }
}

@keyframes floatHex1 {
    0%, 100% { transform: rotate(45deg) translate(0, 0); opacity: 0.4; }
    25% { transform: rotate(55deg) translate(-10px, 15px); opacity: 0.7; }
    50% { transform: rotate(35deg) translate(20px, -10px); opacity: 0.5; }
    75% { transform: rotate(60deg) translate(-15px, -20px); opacity: 0.6; }
}

@keyframes floatHex2 {
    0%, 100% { transform: rotate(45deg) translate(0, 0); opacity: 0.3; }
    40% { transform: rotate(30deg) translate(25px, 20px); opacity: 0.6; }
    80% { transform: rotate(70deg) translate(-18px, 12px); opacity: 0.4; }
}

// Background floating elements animations
@keyframes bgFloatDot1 {
    0%, 100% { transform: translate(0, 0); opacity: 0.4; }
    25% { transform: translate(30px, -25px); opacity: 0.7; }
    50% { transform: translate(-20px, -35px); opacity: 0.5; }
    75% { transform: translate(25px, 15px); opacity: 0.6; }
}

@keyframes bgFloatDot2 {
    0%, 100% { transform: translate(0, 0); opacity: 0.4; }
    33% { transform: translate(-35px, 30px); opacity: 0.8; }
    66% { transform: translate(40px, -15px); opacity: 0.3; }
}

@keyframes bgFloatDot3 {
    0%, 100% { transform: translate(0, 0); opacity: 0.4; }
    20% { transform: translate(25px, -30px); opacity: 0.6; }
    40% { transform: translate(-30px, -25px); opacity: 0.8; }
    60% { transform: translate(35px, 20px); opacity: 0.5; }
    80% { transform: translate(-25px, 35px); opacity: 0.7; }
}

@keyframes bgFloatDot4 {
    0%, 100% { transform: translate(0, 0); opacity: 0.4; }
    50% { transform: translate(-40px, -30px); opacity: 0.6; }
}

@keyframes bgFloatDot5 {
    0%, 100% { transform: translate(0, 0); opacity: 0.4; }
    30% { transform: translate(20px, 25px); opacity: 0.9; }
    70% { transform: translate(-15px, -20px); opacity: 0.5; }
}

@keyframes bgFloatLine1 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
    25% { transform: translate(15px, -20px) rotate(8deg); opacity: 0.6; }
    50% { transform: translate(-25px, -15px) rotate(-5deg); opacity: 0.4; }
    75% { transform: translate(30px, 10px) rotate(12deg); opacity: 0.7; }
}

@keyframes bgFloatLine2 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.25; }
    30% { transform: translate(-30px, 15px) rotate(-8deg); opacity: 0.5; }
    70% { transform: translate(25px, -18px) rotate(6deg); opacity: 0.35; }
}

@keyframes bgFloatHex1 {
    0%, 100% { transform: rotate(45deg) translate(0, 0); opacity: 0.3; }
    25% { transform: rotate(60deg) translate(-15px, 25px); opacity: 0.6; }
    50% { transform: rotate(30deg) translate(30px, -20px); opacity: 0.4; }
    75% { transform: rotate(75deg) translate(-25px, -30px); opacity: 0.7; }
}

@keyframes bgFloatHex2 {
    0%, 100% { transform: rotate(45deg) translate(0, 0); opacity: 0.25; }
    40% { transform: rotate(20deg) translate(35px, 30px); opacity: 0.5; }
    80% { transform: rotate(80deg) translate(-28px, 18px); opacity: 0.35; }
}
</style>