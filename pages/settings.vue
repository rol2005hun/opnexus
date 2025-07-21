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
@use '@/assets/scss/pages/settings.scss';
</style>