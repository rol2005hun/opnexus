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
@use '@/assets/scss/components/LaptopScreen.scss';
</style>