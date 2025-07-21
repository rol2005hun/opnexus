<template>
    <div class="settings-page">
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

        <div class="settings-container">
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

            <div class="settings-header">
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
                <div class="agency-subtitle">Agent Settings Portal</div>
                <div class="security-badge">
                    <span class="badge-icon">🔒</span>
                    <span class="badge-text">CONFIDENTIAL</span>
                </div>
            </div>

            <div class="settings-form">
                <div class="form-header">
                    <h2>👤 Agent Profile Management</h2>
                    <p class="form-subtitle">Manage your personal information and security settings</p>
                </div>

                <div class="form-content">
                    <div class="form-group">
                        <label for="agentName">
                            <span class="label-icon">🏷️</span>
                            Full Agent Name
                        </label>
                        <div class="input-wrapper">
                            <input id="agentName" v-model="userProfile.agentName" type="text"
                                placeholder="e.g., Sarah Mitchell Chen" class="form-input" />
                            <div class="input-border"></div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="username">
                            <span class="label-icon">👤</span>
                            Agent Username
                        </label>
                        <div class="input-wrapper">
                            <input id="username" v-model="userProfile.username" type="text" placeholder="agent_sarah_m"
                                class="form-input" />
                            <div class="input-border"></div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="email">
                            <span class="label-icon">📧</span>
                            Official Email Address
                        </label>
                        <div class="input-wrapper">
                            <input id="email" v-model="userProfile.email" type="email" placeholder="agent@nexus.gov"
                                class="form-input" />
                            <div class="input-border"></div>
                        </div>
                    </div>

                    <div class="security-section">
                        <h3 class="section-subtitle">🔐 Security Clearance Update</h3>

                        <div class="form-group">
                            <label for="currentPassword">
                                <span class="label-icon">🔑</span>
                                Current Security Code
                            </label>
                            <div class="input-wrapper">
                                <input id="currentPassword" v-model="passwordForm.currentPassword" type="password"
                                    placeholder="••••••••••••" class="form-input" />
                                <div class="input-border"></div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="newPassword">
                                <span class="label-icon">🔒</span>
                                New Security Code
                            </label>
                            <div class="input-wrapper">
                                <input id="newPassword" v-model="passwordForm.newPassword" type="password"
                                    placeholder="Minimum 6 secure characters" class="form-input" />
                                <div class="input-border"></div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="confirmPassword">
                                <span class="label-icon">✅</span>
                                Confirm Security Code
                            </label>
                            <div class="input-wrapper">
                                <input id="confirmPassword" v-model="passwordForm.confirmPassword" type="password"
                                    placeholder="Re-enter new security code" class="form-input" />
                                <div class="input-border"></div>
                            </div>
                        </div>
                    </div>

                    <div class="form-actions">
                        <div class="action-row primary-actions">
                            <button @click="saveProfile" class="save-button">
                                <div class="button-content">
                                    <span class="normal-state">
                                        <span class="button-icon">💾</span>
                                        Save Profile
                                    </span>
                                </div>
                            </button>

                            <button @click="changePassword" class="password-button">
                                <div class="button-content">
                                    <span class="normal-state">
                                        <span class="button-icon">🔒</span>
                                        Change Password
                                    </span>
                                </div>
                            </button>
                        </div>

                        <div class="action-row secondary-actions">
                            <button @click="goBack" class="back-button">
                                <div class="button-content">
                                    <span class="normal-state">
                                        <span class="button-icon">←</span>
                                        Back to System
                                    </span>
                                </div>
                            </button>

                            <button @click="logout" class="logout-button">
                                <div class="button-content">
                                    <span class="normal-state">
                                        <span class="button-icon">🚪</span>
                                        Logout
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Transition name="message-slide">
                <div v-if="message.text" :class="['message', message.type]">
                    <span class="message-icon">
                        {{ message.type === 'success' ? '✅' : '⚠️' }}
                    </span>
                    <span class="message-text">{{ message.text }}</span>
                </div>
            </Transition>

            <div class="settings-footer">
                <div class="security-notice">
                    <span class="security-icon">🔒</span>
                    <span class="security-text">Encrypted Federal System • Authorized Personnel Only</span>
                </div>
                <div class="classification-level">
                    <span class="classification-badge">CONFIDENTIAL</span>
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

const userProfile = reactive({
    agentName: '',
    username: '',
    email: ''
});

const passwordForm = reactive({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
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

const goBack = () => {
    router.push('/');
};

const saveProfile = async () => {
    try {
        const response = await fetch('/api/user/update-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                agentName: userProfile.agentName,
                username: userProfile.username,
                email: userProfile.email
            })
        });

        const data = await response.json() as { success: boolean; message?: string };

        if (data.success) {
            showMessage('Profile updated successfully!');
            await authStore.fetchProfile();
        } else {
            showMessage(data.message || 'Failed to update profile', 'error');
        }
    } catch (error) {
        showMessage('Failed to update profile', 'error');
    }
};

const changePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        showMessage('New passwords do not match!', 'error');
        return;
    }

    if (passwordForm.newPassword.length < 6) {
        showMessage('Password must be at least 6 characters long!', 'error');
        return;
    }

    try {
        const response = await fetch('/api/user/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword
            })
        });

        const data = await response.json() as { success: boolean; message?: string };

        if (data.success) {
            showMessage('Password changed successfully!');
            passwordForm.currentPassword = '';
            passwordForm.newPassword = '';
            passwordForm.confirmPassword = '';
        } else {
            showMessage(data.message || 'Failed to change password', 'error');
        }
    } catch (error) {
        showMessage('Failed to change password', 'error');
    }
};

const logout = async () => {
    await authStore.logout();
    router.push('/auth');
};

onMounted(async () => {
    try {
        await authStore.fetchProfile();

        if (authStore.user) {
            userProfile.agentName = authStore.user.agent?.name || '';
            userProfile.username = authStore.user.username || '';
            userProfile.email = authStore.user.email || '';
        }
    } catch (error) {
        console.error('Failed to load profile:', error);
    }
});
</script>

<style scoped lang="scss">
@keyframes float {

    0%,
    100% {
        transform: translateY(0px) rotate(0deg);
        opacity: 0.6;
    }

    33% {
        transform: translateY(-20px) rotate(120deg);
        opacity: 1;
    }

    66% {
        transform: translateY(-10px) rotate(240deg);
        opacity: 0.8;
    }
}

@keyframes glow {

    0%,
    100% {
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
    }

    50% {
        box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
    }
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

    0%,
    100% {
        opacity: 0.4;
    }

    50% {
        opacity: 0.7;
    }
}

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

.settings-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    background:
        radial-gradient(ellipse at 15% 25%, rgba(0, 122, 204, 0.08) 0%, transparent 50%),
        radial-gradient(ellipse at 85% 75%, rgba(0, 122, 204, 0.06) 0%, transparent 60%),
        radial-gradient(ellipse at 50% 10%, rgba(59, 130, 246, 0.04) 0%, transparent 70%),
        radial-gradient(ellipse at 30% 90%, rgba(0, 122, 204, 0.05) 0%, transparent 60%),
        linear-gradient(145deg,
            #0a0e1a 0%,
            #1a1f2e 25%,
            #141826 50%,
            #0f1419 75%,
            #0d1117 100%);

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
            bottom: 30%;
            left: 8%;
            width: 5px;
            height: 5px;
            background: rgba(0, 122, 204, 0.6);
            border-radius: 50%;
            animation: floatDot3 18s ease-in-out infinite;
        }

        &.dot-4 {
            bottom: 20%;
            right: 12%;
            width: 3px;
            height: 3px;
            background: rgba(59, 130, 246, 0.8);
            border-radius: 50%;
            animation: floatDot4 10s ease-in-out infinite reverse;
        }

        &.line-1 {
            top: 40%;
            left: 5%;
            width: 50px;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(0, 122, 204, 0.4), transparent);
            animation: floatLine1 20s ease-in-out infinite;
        }

        &.line-2 {
            bottom: 50%;
            right: 8%;
            width: 40px;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
            animation: floatLine2 17s ease-in-out infinite reverse;
        }

        &.hex-1 {
            top: 70%;
            right: 15%;
            width: 6px;
            height: 6px;
            background: transparent;
            border: 1px solid rgba(0, 122, 204, 0.4);
            transform: rotate(45deg);
            animation: floatHex1 23s ease-in-out infinite;
        }

        &.hex-2 {
            top: 10%;
            left: 85%;
            width: 8px;
            height: 8px;
            background: transparent;
            border: 1px solid rgba(59, 130, 246, 0.3);
            transform: rotate(45deg);
            animation: floatHex2 19s ease-in-out infinite reverse;
        }
    }
}

.settings-container {
    background: rgba(17, 25, 40, 0.98);
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 20px;
    padding: 2rem;
    width: 100%;
    max-width: 500px;
    max-height: 95vh;
    overflow-y: auto;
    backdrop-filter: blur(20px);
    box-shadow: 
        0 25px 50px rgba(0, 0, 0, 0.7),
        0 0 0 1px rgba(59, 130, 246, 0.1) inset;
    position: relative;
    z-index: 1;
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

.settings-header {
    text-align: center;
    margin-bottom: 2rem;
    position: relative;
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

.settings-form {
    margin: 1.5rem 0;
}

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

.form-content {
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

    .security-section {
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid rgba(59, 130, 246, 0.1);

        .section-subtitle {
            font-size: 1.2rem;
            color: #f1f5f9;
            margin-bottom: 1.5rem;
            font-weight: 600;
            text-align: center;
        }
    }

    .form-actions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 2.5rem;

        .action-row {
            display: flex;
            gap: 1rem;

            &.primary-actions {
                margin-bottom: 0.5rem;
            }

            &.secondary-actions {
                margin-top: 0.5rem;
            }
        }
    }
}

.save-button,
.password-button,
.logout-button,
.back-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;

    .button-content {
        display: flex;
        align-items: center;
        gap: 0.6rem;

        .button-icon {
            font-size: 1.1rem;
        }
    }

    &:hover {
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
}

.save-button {
    background: linear-gradient(135deg, #059669, #047857);
    color: white;
    box-shadow: 0 4px 15px rgba(5, 150, 105, 0.2);

    &:hover {
        box-shadow: 0 8px 25px rgba(5, 150, 105, 0.3);
    }
}

.password-button {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: white;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);

    &:hover {
        box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
    }
}

.logout-button {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.2);

    &:hover {
        box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);
    }
}

.back-button {
    background: linear-gradient(135deg, #6b7280, #4b5563);
    color: white;
    box-shadow: 0 4px 15px rgba(107, 114, 128, 0.2);

    &:hover {
        box-shadow: 0 8px 25px rgba(107, 114, 128, 0.3);
    }
}

.message {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 1rem;
    border-radius: 12px;
    margin-top: 1.5rem;
    animation: slideInUp 0.3s ease-out;

    &.success {
        background: rgba(34, 197, 94, 0.1);
        border: 1px solid rgba(34, 197, 94, 0.3);
        color: #22c55e;
    }

    &.error {
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #ef4444;
    }

    .message-icon {
        font-size: 1.1rem;
    }

    .message-text {
        font-weight: 500;
    }
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

.settings-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(59, 130, 246, 0.1);

    .security-notice {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #64748b;
        font-size: 0.8rem;

        .security-icon {
            font-size: 0.9rem;
        }
    }

    .classification-level {
        .classification-badge {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: #ef4444;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: 600;
            letter-spacing: 0.05em;
        }
    }
}

// Animation keyframes
@keyframes bgFloatDot1 {

    0%,
    100% {
        transform: translate(0, 0);
    }

    50% {
        transform: translate(20px, -15px);
    }
}

@keyframes bgFloatDot2 {

    0%,
    100% {
        transform: translate(0, 0);
    }

    50% {
        transform: translate(-25px, 20px);
    }
}

@keyframes bgFloatDot3 {

    0%,
    100% {
        transform: translate(0, 0);
    }

    50% {
        transform: translate(15px, -25px);
    }
}

@keyframes bgFloatDot4 {

    0%,
    100% {
        transform: translate(0, 0);
    }

    50% {
        transform: translate(-20px, 10px);
    }
}

@keyframes bgFloatDot5 {

    0%,
    100% {
        transform: translate(0, 0);
    }

    50% {
        transform: translate(25px, -10px);
    }
}

@keyframes bgFloatLine1 {

    0%,
    100% {
        transform: translate(0, 0) rotate(0deg);
    }

    50% {
        transform: translate(-20px, 10px) rotate(5deg);
    }
}

@keyframes bgFloatLine2 {

    0%,
    100% {
        transform: translate(0, 0) rotate(0deg);
    }

    50% {
        transform: translate(15px, -20px) rotate(-3deg);
    }
}

@keyframes bgFloatHex1 {

    0%,
    100% {
        transform: rotate(45deg) translate(0, 0);
    }

    50% {
        transform: rotate(60deg) translate(-15px, 20px);
    }
}

@keyframes bgFloatHex2 {

    0%,
    100% {
        transform: rotate(45deg) translate(0, 0);
    }

    50% {
        transform: rotate(30deg) translate(20px, -15px);
    }
}

@keyframes floatDot1 {

    0%,
    100% {
        transform: translate(0, 0);
    }

    50% {
        transform: translate(10px, -8px);
    }
}

@keyframes floatDot2 {

    0%,
    100% {
        transform: translate(0, 0);
    }

    50% {
        transform: translate(-12px, 10px);
    }
}

@keyframes floatDot3 {

    0%,
    100% {
        transform: translate(0, 0);
    }

    50% {
        transform: translate(8px, -12px);
    }
}

@keyframes floatDot4 {

    0%,
    100% {
        transform: translate(0, 0);
    }

    50% {
        transform: translate(-10px, 5px);
    }
}

@keyframes floatLine1 {

    0%,
    100% {
        transform: translate(0, 0) rotate(0deg);
    }

    50% {
        transform: translate(-8px, 5px) rotate(2deg);
    }
}

@keyframes floatLine2 {

    0%,
    100% {
        transform: translate(0, 0) rotate(0deg);
    }

    50% {
        transform: translate(6px, -8px) rotate(-2deg);
    }
}

@keyframes floatHex1 {

    0%,
    100% {
        transform: rotate(45deg) translate(0, 0);
    }

    50% {
        transform: rotate(50deg) translate(-6px, 8px);
    }
}

@keyframes floatHex2 {

    0%,
    100% {
        transform: rotate(45deg) translate(0, 0);
    }

    50% {
        transform: rotate(40deg) translate(8px, -6px);
    }
}

@media (max-width: 768px) {
    .settings-container {
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

    .form-group {
        margin-bottom: 1rem;
    }

    .form-group .input-wrapper .form-input {
        padding: 0.8rem;
        font-size: 0.9rem;
    }

    .form-actions {
        gap: 0.8rem;
    }

    .save-button,
    .password-button,
    .logout-button,
    .back-button {
        padding: 0.9rem;
        font-size: 0.95rem;
    }
}

@media (max-width: 443px) {
    .form-actions {
        .action-row {
            flex-direction: column;
            gap: 0.8rem;
        }
    }
}
</style>
