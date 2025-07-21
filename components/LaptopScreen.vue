<template>
    <div class="laptop-screen">
        <div class="laptop-frame">
            
            <div class="screen">
                
                <div class="desktop">
                    
                    <div class="desktop-icons">
                        <div v-for="app in laptopStore.apps" :key="app.id" class="desktop-icon"
                            @click="laptopStore.openApp(app.id)">
                            <div class="icon">{{ app.icon }}</div>
                            <span class="icon-label">{{ app.name }}</span>
                        </div>
                    </div>

                    <div class="windows-container">
                        <Window v-for="app in laptopStore.openApps" :key="app.id" :app="app"
                            @close="laptopStore.closeApp(app.id)" @minimize="laptopStore.minimizeApp(app.id)"
                            @maximize="laptopStore.maximizeApp(app.id)" @focus="laptopStore.bringToFront(app.id)" />
                    </div>

                    <div class="taskbar">
                        <div class="taskbar-left">
                            <button class="start-button" @click="exitLaptop">
                                <div class="nexus-logo">
                                    <div class="logo-diamond">◆</div>
                                    <div class="logo-lines">
                                        <span class="line line-1"></span>
                                        <span class="line line-2"></span>
                                        <span class="line line-3"></span>
                                    </div>
                                </div>
                                <span class="nexus-text">NEXUS</span>
                            </button>
                        </div>

                        <div class="taskbar-center">
                            <div v-for="app in laptopStore.taskbarApps" :key="app.id" class="taskbar-app"
                                :class="{ minimized: app.minimized }"
                                @click="app.minimized ? laptopStore.openApp(app.id) : laptopStore.bringToFront(app.id)">
                                <span class="app-icon">{{ app.icon }}</span>
                                <span class="app-name">{{ app.name }}</span>
                            </div>
                        </div>

                        <div class="taskbar-right">

                            <div class="system-time">
                                {{ currentTime }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="esc-hint">
            <kbd>ESC</kbd> to exit
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLaptopStore } from '@/stores/laptop';
import { useGameStore } from '@/stores/game';

const laptopStore = useLaptopStore();
const gameStore = useGameStore();

const currentTime = ref('');

let timeInterval: NodeJS.Timeout | null = null;

const updateTime = () => {
    const now = new Date();
    currentTime.value = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

const exitLaptop = () => {
    gameStore.exitLaptop();
};

const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        exitLaptop();
    }
};

onMounted(() => {
    updateTime();
    timeInterval = setInterval(updateTime, 1000);
    window.addEventListener('keydown', handleKeyPress);
});

onUnmounted(() => {
    if (timeInterval) {
        clearInterval(timeInterval);
        timeInterval = null;
    }
    window.removeEventListener('keydown', handleKeyPress);
});
</script>

<style lang="scss" scoped>
@use "sass:color";

.laptop-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: $bg-dark;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.laptop-frame {
    width: 100vw;
    height: 100vh;
    background: $laptop-bg;
    padding: 0;
    box-shadow: none;
    position: relative;
    border-radius: 0;
}

.screen {
    width: 100%;
    height: 100%;
    background: $laptop-bg;
    overflow: hidden;
    position: relative;
    border-radius: 0;
}

.desktop {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: $laptop-bg;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg,
                rgba(0, 122, 204, 0.1) 0%,
                transparent 50%,
                rgba(0, 170, 68, 0.1) 100%);
    }
}

.desktop-icons {
    position: absolute;
    top: 20px;
    left: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 80px);
    gap: 20px;
    max-width: 300px;
    z-index: 10;
}

.desktop-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: background 0.2s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    .icon {
        font-size: 2rem;
        margin-bottom: 4px;
    }

    .icon-label {
        font-size: 0.75rem;
        color: $text-primary;
        text-align: center;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
    }
}

.windows-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 50px);
    pointer-events: none;

    >* {
        pointer-events: auto;
    }
}

.taskbar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: $taskbar-bg;
    border-top: 1px solid #333;
    display: flex;
    align-items: center;
    padding: 0 10px;
    z-index: 9999;
}

.taskbar-left {
    .start-button {
        background: linear-gradient(135deg, #1a365d 0%, #2d5a87 50%, #1a365d 100%);
        color: white;
        border: 1px solid rgba(0, 122, 204, 0.3);
        padding: 6px 12px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transition: left 0.5s ease;
        }

        &:hover {
            background: linear-gradient(135deg, #2d5a87 0%, #3d6a97 50%, #2d5a87 100%);
            border-color: rgba(0, 122, 204, 0.6);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 122, 204, 0.4);

            &::before {
                left: 100%;
            }

            .nexus-logo {
                .logo-diamond {
                    color: #00ffff;
                    text-shadow: 0 0 8px #00ffff;
                }

                .line {
                    background: #00ffff;
                    box-shadow: 0 0 4px #00ffff;
                }
            }
        }

        .nexus-logo {
            position: relative;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;

            .logo-diamond {
                font-size: 1.2rem;
                color: #0ea5e9;
                transition: all 0.3s ease;
                position: absolute;
                z-index: 2;
            }

            .logo-lines {
                position: absolute;
                width: 100%;
                height: 100%;

                .line {
                    position: absolute;
                    background: #0ea5e9;
                    border-radius: 1px;
                    transition: all 0.3s ease;

                    &.line-1 {
                        width: 12px;
                        height: 1px;
                        top: 6px;
                        left: 6px;
                        transform: rotate(45deg);
                    }

                    &.line-2 {
                        width: 8px;
                        height: 1px;
                        top: 12px;
                        left: 8px;
                        transform: rotate(-45deg);
                    }

                    &.line-3 {
                        width: 6px;
                        height: 1px;
                        top: 16px;
                        left: 9px;
                        transform: rotate(45deg);
                    }
                }
            }
        }

        .nexus-text {
            font-size: 0.9rem;
            letter-spacing: 0.5px;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }
    }
}

.taskbar-center {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 4px;
    margin-left: 20px;
}

.taskbar-app {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s ease;
    min-width: 120px;

    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    &.minimized {
        opacity: 0.6;
    }

    .app-icon {
        font-size: 1rem;
    }

    .app-name {
        font-size: 0.8rem;
        color: $text-primary;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

.taskbar-right {
    display: flex;
    align-items: center;
    gap: 12px;

    .investigation-status {
        background: rgba(0, 122, 204, 0.2);
        border: 1px solid $accent-blue;
        padding: 4px 8px;
        border-radius: 4px;
        max-width: 300px;

        .status-text {
            font-size: 0.8rem;
            color: $accent-blue;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    .system-time {
        font-family: $font-mono;
        font-size: 0.9rem;
        color: $text-primary;
        background: rgba(255, 255, 255, 0.1);
        padding: 6px 12px;
        border-radius: 4px;
    }
}

.esc-hint {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: $text-secondary;
    font-size: 0.9rem;

    kbd {
        background: $bg-secondary;
        border: 1px solid $border-color;
        border-radius: 4px;
        padding: 4px 8px;
        font-family: $font-mono;
        font-size: 0.8rem;
        color: $text-primary;
    }
}

@media (max-width: $tablet) {
    .laptop-frame {
        width: 98vw;
        height: 95vh;
        padding: 10px;
    }

    .desktop-icons {
        grid-template-columns: repeat(auto-fill, 60px);
        gap: 15px;
    }

    .desktop-icon .icon {
        font-size: 1.5rem;
    }

    .taskbar-app {
        min-width: 100px;

        .app-name {
            display: none;
        }
    }
}
</style>
