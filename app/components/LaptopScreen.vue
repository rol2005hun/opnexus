<template>
    <div class="laptop-screen">
        <div class="laptop-frame">
            <div class="screen">
                <div class="desktop">
                    <div class="desktop-icons">
                        <div v-for="app in laptopStore.apps" :key="app.id" class="desktop-icon"
                            :class="{ 'dragging': dragging && dragAppId === app.id }" :style="{
                                position: 'absolute',
                                left: app.desktopPosition.x + 'px',
                                top: app.desktopPosition.y + 'px'
                            }" @mousedown="startDrag($event, app.id)" @dblclick="laptopStore.openApp(app.id)">
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

        <MissionCompletionModal />
    </div>
</template>

<script setup lang="ts">
const laptopStore = useLaptopStore();
const gameStore = useGameStore();

const currentTime = ref('');
const dragging = ref(false);
const dragAppId = ref<string | null>(null);
const dragOffset = ref({ x: 0, y: 0 });

let timeInterval: NodeJS.Timeout | null = null;

const updateTime = () => {
    const now = new Date();
    currentTime.value = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

const exitLaptop = () => {
    const currentMission = gameStore.currentMission;
    const progress = gameStore.currentProgress;

    const missionId = currentMission;
    const isCompleted = progress?.caseStatus === 'completed';

    gameStore.exitLaptop();

    if (missionId && isCompleted) {
        window.dispatchEvent(new CustomEvent('missionCompleted', {
            detail: { missionId: missionId }
        }));
    }
};

const startDrag = (event: MouseEvent, appId: string) => {
    event.preventDefault();
    event.stopPropagation();

    const app = laptopStore.apps.find(a => a.id === appId);
    if (!app) return;

    dragging.value = true;
    dragAppId.value = appId;

    const rect = (event.target as HTMLElement).closest('.desktop-icon')?.getBoundingClientRect();
    if (rect) {
        dragOffset.value = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
};

const onMouseMove = (event: MouseEvent) => {
    if (!dragging.value || !dragAppId.value) return;

    const desktop = document.querySelector('.desktop');
    if (!desktop) return;

    const desktopRect = desktop.getBoundingClientRect();

    const newX = event.clientX - desktopRect.left - dragOffset.value.x;
    const newY = event.clientY - desktopRect.top - dragOffset.value.y;

    const iconWidth = 80;
    const iconHeight = 100;

    const boundedX = Math.max(0, Math.min(newX, desktopRect.width - iconWidth));
    const boundedY = Math.max(0, Math.min(newY, desktopRect.height - iconHeight - 50));

    laptopStore.updateDesktopIconPosition(dragAppId.value, boundedX, boundedY);
};

const onMouseUp = () => {
    if (dragging.value && dragAppId.value) {
        const app = laptopStore.apps.find(a => a.id === dragAppId.value);
        if (app) {
            const snappedPosition = laptopStore.snapToGrid(app.desktopPosition.x, app.desktopPosition.y);

            if (snappedPosition) {
                if (laptopStore.isPositionOccupied(snappedPosition.x, snappedPosition.y, dragAppId.value)) {
                    const availablePositions = laptopStore.getAvailableGridPositions();
                    if (availablePositions.length > 0) {
                        let closestAvailable = availablePositions[0];
                        let minDistance = Number.MAX_VALUE;

                        for (const pos of availablePositions) {
                            const distance = Math.sqrt(
                                Math.pow(app.desktopPosition.x - pos.x, 2) +
                                Math.pow(app.desktopPosition.y - pos.y, 2)
                            );
                            if (distance < minDistance) {
                                minDistance = distance;
                                closestAvailable = pos;
                            }
                        }

                        if (closestAvailable) {
                            laptopStore.updateDesktopIconPosition(dragAppId.value, closestAvailable.x, closestAvailable.y);
                        }
                    }
                } else {
                    laptopStore.updateDesktopIconPosition(dragAppId.value, snappedPosition.x, snappedPosition.y);
                }
            }
        }
    }

    dragging.value = false;
    dragAppId.value = null;

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
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

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/components/LaptopScreen';
</style>