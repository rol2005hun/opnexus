<template>
    <div class="settings-page">
        <div class="background-floating-elements">
            <div class="bg-element bg-dot-1"></div>
            <div class="bg-element bg-dot-2"></div>
            <div class="bg-element bg-dot-3"></div>
            <div class="bg-element bg-line-1"></div>
            <div class="bg-element bg-hex-1"></div>
        </div>
        
        <div class="settings-container">
            <div class="settings-header">
                <button @click="goBack" class="back-button">
                    <span class="back-icon">←</span>
                    <span class="back-text">Back to System</span>
                </button>
                
                <div class="header-content">
                    <div class="logo-container">
                        <div class="logo-hexagon">
                            <div class="logo-inner">
                                <span class="logo-text">N</span>
                            </div>
                        </div>
                    </div>
                    <h1 class="page-title">
                        <span class="title-line">AGENT SETTINGS</span>
                        <span class="title-subtitle">Personal Data Management</span>
                    </h1>
                    <div class="classification-badge">
                        <span class="badge-icon">🔒</span>
                        <span class="badge-text">CONFIDENTIAL</span>
                    </div>
                </div>
            </div>

            <div class="settings-content">
                <div class="settings-form">
                    <div class="form-section">
                        <h2 class="section-title">
                            <span class="section-icon">👤</span>
                            Agent Profile
                        </h2>
                        
                        <div class="form-group">
                            <label for="agentName">
                                <span class="label-icon">🏷️</span>
                                Full Agent Name
                            </label>
                            <div class="input-wrapper">
                                <input id="agentName" v-model="userProfile.agentName" type="text" 
                                    placeholder="e.g., Sarah Mitchell Chen" class="form-input" />
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="username">
                                <span class="label-icon">🆔</span>
                                Agent Username
                            </label>
                            <div class="input-wrapper">
                                <input id="username" v-model="userProfile.username" type="text" 
                                    placeholder="agent_sarah_m" class="form-input" />
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="email">
                                <span class="label-icon">📧</span>
                                Contact Email
                            </label>
                            <div class="input-wrapper">
                                <input id="email" v-model="userProfile.email" type="email" 
                                    placeholder="agent@nexus.gov" class="form-input" />
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h2 class="section-title">
                            <span class="section-icon">🔐</span>
                            Security Settings
                        </h2>
                        
                        <div class="form-group">
                            <label for="currentPassword">
                                <span class="label-icon">🔑</span>
                                Current Password
                            </label>
                            <div class="input-wrapper">
                                <input id="currentPassword" v-model="passwordForm.currentPassword" 
                                    type="password" placeholder="Enter current password" class="form-input" />
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="newPassword">
                                <span class="label-icon">🆕</span>
                                New Password
                            </label>
                            <div class="input-wrapper">
                                <input id="newPassword" v-model="passwordForm.newPassword" 
                                    type="password" placeholder="Enter new password" class="form-input" />
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="confirmPassword">
                                <span class="label-icon">✅</span>
                                Confirm New Password
                            </label>
                            <div class="input-wrapper">
                                <input id="confirmPassword" v-model="passwordForm.confirmPassword" 
                                    type="password" placeholder="Confirm new password" class="form-input" />
                            </div>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button @click="saveProfile" class="save-button">
                            <span class="button-icon">💾</span>
                            <span class="button-text">Save Profile</span>
                            <div class="button-glow"></div>
                        </button>

                        <button @click="changePassword" class="password-button">
                            <span class="button-icon">🔒</span>
                            <span class="button-text">Change Password</span>
                            <div class="button-glow"></div>
                        </button>

                        <button @click="logout" class="logout-button">
                            <span class="button-icon">🚪</span>
                            <span class="button-text">Logout</span>
                            <div class="button-glow"></div>
                        </button>
                    </div>
                </div>

                <div v-if="message.text" :class="['message', message.type]">
                    <span class="message-icon">{{ message.type === 'success' ? '✅' : '❌' }}</span>
                    <span class="message-text">{{ message.text }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

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
            #0d1117 100%
        );
    
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
        width: 800px;
        height: 600px;
        transform: translate(-50%, -50%);
        background: radial-gradient(ellipse, rgba(0, 122, 204, 0.03) 0%, transparent 70%);
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
            top: 15%;
            left: 10%;
            width: 5px;
            height: 5px;
            background: rgba(0, 122, 204, 0.6);
            border-radius: 50%;
            animation: bgFloat1 15s ease-in-out infinite;
        }

        &.bg-dot-2 {
            bottom: 20%;
            right: 15%;
            width: 4px;
            height: 4px;
            background: rgba(59, 130, 246, 0.5);
            border-radius: 50%;
            animation: bgFloat2 18s ease-in-out infinite reverse;
        }

        &.bg-dot-3 {
            top: 60%;
            left: 8%;
            width: 6px;
            height: 6px;
            background: rgba(0, 122, 204, 0.4);
            border-radius: 50%;
            animation: bgFloat3 20s ease-in-out infinite;
        }

        &.bg-line-1 {
            top: 30%;
            right: 12%;
            width: 60px;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(0, 122, 204, 0.3), transparent);
            animation: bgFloat4 22s ease-in-out infinite;
        }

        &.bg-hex-1 {
            bottom: 40%;
            left: 85%;
            width: 8px;
            height: 8px;
            background: transparent;
            border: 1px solid rgba(59, 130, 246, 0.3);
            transform: rotate(45deg);
            animation: bgFloat5 25s ease-in-out infinite reverse;
        }
    }
}

.settings-container {
    background: rgba(17, 25, 40, 0.98);
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 20px;
    padding: 2rem;
    width: 100%;
    max-width: 600px;
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
}

.settings-header {
    text-align: center;
    margin-bottom: 2rem;
    
    .back-button {
        position: absolute;
        top: 1rem;
        left: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(59, 130, 246, 0.1);
        border: 1px solid rgba(59, 130, 246, 0.3);
        padding: 0.5rem 1rem;
        border-radius: 10px;
        color: #3b82f6;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
            background: rgba(59, 130, 246, 0.2);
            transform: translateY(-2px);
        }
        
        .back-icon {
            font-size: 1.2rem;
        }
        
        .back-text {
            font-size: 0.9rem;
            font-weight: 500;
        }
    }
}

.header-content {
    margin-top: 3rem;
}

.logo-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}

.logo-hexagon {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    animation: glow 3s ease-in-out infinite alternate;

    .logo-inner {
        width: 50px;
        height: 50px;
        background: rgba(17, 25, 40, 0.9);
        clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .logo-text {
        color: #3b82f6;
        font-size: 1.8rem;
        font-weight: 700;
        font-family: 'JetBrains Mono', monospace;
    }
}

.page-title {
    margin: 1rem 0;
    
    .title-line {
        display: block;
        font-size: 2rem;
        font-weight: 700;
        color: #f1f5f9;
        letter-spacing: 0.1em;
        margin-bottom: 0.2rem;
    }
    
    .title-subtitle {
        display: block;
        font-size: 0.9rem;
        color: #94a3b8;
        font-weight: 400;
        margin-top: 0.3rem;
        letter-spacing: 0.05em;
    }
}

.classification-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.3);
    padding: 0.4rem 0.8rem;
    border-radius: 50px;
    margin-bottom: 1rem;

    .badge-icon {
        font-size: 0.9rem;
    }

    .badge-text {
        font-size: 0.7rem;
        color: #3b82f6;
        font-weight: 600;
        letter-spacing: 0.05em;
    }
}

.settings-content {
    position: relative;
}

.form-section {
    margin-bottom: 2rem;
    
    .section-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.2rem;
        color: #f1f5f9;
        margin-bottom: 1rem;
        font-weight: 600;
        
        .section-icon {
            font-size: 1.1rem;
        }
    }
}

.form-group {
    margin-bottom: 1.2rem;

    label {
        display: flex;
        align-items: center;
        gap: 0.3rem;
        margin-bottom: 0.4rem;
        color: #cbd5e1;
        font-weight: 500;
        font-size: 0.9rem;

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
                border-color: rgba(59, 130, 246, 0.3);
                background: rgba(30, 41, 59, 0.9);
                box-shadow: none;
            }

            &::placeholder {
                color: #64748b;
            }
        }
    }
}

.form-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
}

.save-button, .password-button, .logout-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
    
    .button-icon {
        font-size: 1.1rem;
    }
    
    .button-glow {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s ease;
    }
    
    &:hover .button-glow {
        left: 100%;
    }
}

.save-button {
    background: linear-gradient(135deg, #059669, #047857);
    color: white;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(5, 150, 105, 0.3);
    }
}

.password-button {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: white;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
    }
}

.logout-button {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);
    }
}

.message {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    border-radius: 10px;
    margin-top: 1rem;
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

@keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
    50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
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

@keyframes bgFloat1 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(20px, -15px); }
}

@keyframes bgFloat2 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-25px, 20px); }
}

@keyframes bgFloat3 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(15px, -25px); }
}

@keyframes bgFloat4 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(-20px, 10px) rotate(5deg); }
}

@keyframes bgFloat5 {
    0%, 100% { transform: rotate(45deg) translate(0, 0); }
    50% { transform: rotate(60deg) translate(-15px, 20px); }
}

@media (max-width: 768px) {
    .settings-container {
        margin: 0;
        padding: 1.5rem;
        max-width: none;
        max-height: 100vh;
        min-height: 100vh;
        border-radius: 0;
        border: none;
        background: rgba(17, 25, 40, 0.95);
    }
    
    .settings-header .back-button {
        position: relative;
        top: 0;
        left: 0;
        margin-bottom: 1rem;
    }
    
    .header-content {
        margin-top: 0;
    }
    
    .form-actions {
        gap: 0.8rem;
    }
}
</style>
