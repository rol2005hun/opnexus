<template>
    <Transition :name="transitionName" @enter="onEnter" @leave="onLeave" appear>
        <div v-if="!isMinimized" ref="windowElement" class="window" :class="{
            maximized: app.maximized,
            'window-entering': isEntering,
            'window-leaving': isLeaving,
            'is-dragging': isDragging,
            'is-resizing': isResizing
        }" :style="{
            left: app.position.x + 'px',
            top: app.position.y + 'px',
            width: app.size.width + 'px',
            height: app.size.height + 'px',
            zIndex: app.zIndex
        }" @mousedown="handleFocus">
            <div class="title-bar" @mousedown="startDrag">
                <div class="title-left">
                    <span class="app-icon">{{ app.icon }}</span>
                    <span class="app-title">{{ app.name }}</span>
                </div>

                <div class="title-controls">
                    <button class="control-btn minimize" @click="handleMinimize">
                        ─
                    </button>
                    <button class="control-btn maximize" @click="handleMaximize">
                        {{ app.maximized ? '🗗' : '🗖' }}
                    </button>
                    <button class="control-btn close" @click="handleClose">
                        ✕
                    </button>
                </div>
            </div>

            <div class="window-content">
                <component :is="getAppComponent()" />
            </div>

            <div v-if="!app.maximized" class="resize-handle" @mousedown="startResize"></div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import Email from './apps/Email.vue';
import CipherChat from './apps/CipherChat.vue';
import EvidenceLocker from './apps/EvidenceLocker.vue';
import JobDescription from './apps/JobDescription.vue';
import Default from './apps/Default.vue';

interface Props {
    app: {
        id: string
        name: string
        icon: string
        position: { x: number; y: number }
        size: { width: number; height: number }
        zIndex: number
        maximized?: boolean
        minimized?: boolean
    }
}

const props = defineProps<Props>();

const emit = defineEmits<{
    close: []
    minimize: []
    maximize: []
    focus: []
}>();

const isDragging = ref(false);
const isResizing = ref(false);
const isMinimized = ref(false);
const isEntering = ref(false);
const isLeaving = ref(false);
const windowElement = ref<HTMLElement>();
const dragStart = ref({ x: 0, y: 0 });
const resizeStart = ref({ x: 0, y: 0, width: 0, height: 0 });

watch(() => props.app.minimized, (newVal) => {
    isMinimized.value = !!newVal;
});

const transitionName = computed(() => {
    if (isLeaving.value) return 'window-close';
    return 'window-open';
});

const getAppComponent = () => {
    const componentMap: Record<string, any> = {
        email: Email,
        chat: CipherChat,
        files: Default,
        browser: Default,
        notes: JobDescription,
        evidence: EvidenceLocker
    };

    return componentMap[props.app.id] || Default;
};

const handleFocus = () => {
    emit('focus');
};

const startDrag = (event: MouseEvent) => {
    if (event.target === event.currentTarget && !props.app.maximized) {
        isDragging.value = true;
        dragStart.value = {
            x: event.clientX - props.app.position.x,
            y: event.clientY - props.app.position.y
        };

        document.addEventListener('mousemove', handleDrag);
        document.addEventListener('mouseup', stopDrag);
    }
};

const handleDrag = (event: MouseEvent) => {
    if (isDragging.value) {
        const minVisibleWidth = 100;
        const titleBarHeight = 32;
        const taskbarHeight = 50;

        const newX = Math.max(
            -props.app.size.width + minVisibleWidth,
            Math.min(
                event.clientX - dragStart.value.x,
                window.innerWidth - minVisibleWidth
            )
        );

        const newY = Math.max(
            0,
            Math.min(
                event.clientY - dragStart.value.y,
                window.innerHeight - titleBarHeight
            )
        );

        Object.assign(props.app.position, { x: newX, y: newY });
    }
};

const stopDrag = () => {
    isDragging.value = false;
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', stopDrag);
};

const startResize = (event: MouseEvent) => {
    isResizing.value = true;
    resizeStart.value = {
        x: event.clientX,
        y: event.clientY,
        width: props.app.size.width,
        height: props.app.size.height
    };

    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
};

const handleResize = (event: MouseEvent) => {
    if (isResizing.value) {
        const deltaX = event.clientX - resizeStart.value.x;
        const deltaY = event.clientY - resizeStart.value.y;

        const newWidth = Math.max(300, resizeStart.value.width + deltaX);
        const newHeight = Math.max(200, resizeStart.value.height + deltaY);

        Object.assign(props.app.size, { width: newWidth, height: newHeight });
    }
};

const stopResize = () => {
    isResizing.value = false;
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', stopResize);
};

const handleMinimize = () => {
    isLeaving.value = true;
    setTimeout(() => {
        emit('minimize');
        isLeaving.value = false;
    }, 250);
};

const handleMaximize = () => {
    emit('maximize');
};

const handleClose = () => {
    isLeaving.value = true;
    setTimeout(() => {
        emit('close');
        isLeaving.value = false;
    }, 200);
};

const onEnter = (el: Element) => {
    isEntering.value = true;
    setTimeout(() => {
        isEntering.value = false;
    }, 300);
};

const onLeave = (el: Element) => {
};
</script>

<style lang="scss" scoped>
@use "sass:color";

.window-open-enter-active {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.window-open-enter-from {
    opacity: 0;
    transform: scale(0.7) translateY(30px);
}

.window-open-enter-to {
    opacity: 1;
    transform: scale(1) translateY(0);
}

.window-close-leave-active {
    transition: all 0.25s cubic-bezier(0.5, 0, 1, 0.5);
}

.window-close-leave-from {
    opacity: 1;
    transform: scale(1) translateY(0);
}

.window-close-leave-to {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
}

.window {
    position: absolute;
    background: $window-bg;
    border: 1px solid #444;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    min-width: 300px;
    min-height: 200px;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

    &.maximized {
        border-radius: 0;
        border: none;
        box-shadow: none;
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    &.window-entering {
        animation: windowEnter 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }

    &.window-leaving {
        animation: windowLeave 0.2s cubic-bezier(0.5, 0, 1, 0.5) forwards;
    }

    &.is-dragging,
    &.is-resizing {
        transition: none !important;
    }
}

@keyframes windowEnter {
    from {
        opacity: 0;
        transform: scale(0.8) translateY(20px);
    }

    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

@keyframes windowLeave {
    from {
        opacity: 1;
        transform: scale(1) translateY(0);
    }

    to {
        opacity: 0;
        transform: scale(0.9) translateY(10px);
    }
}

.title-bar {
    height: 32px;
    background: $bg-secondary;
    border-bottom: 1px solid #444;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    cursor: move;
    user-select: none;

    .window.maximized & {
        cursor: default;
    }

    .title-left {
        display: flex;
        align-items: center;
        gap: 8px;

        .app-icon {
            font-size: 1rem;
        }

        .app-title {
            font-size: 0.9rem;
            color: $text-primary;
        }
    }

    .title-controls {
        display: flex;
        gap: 4px;
    }

    .control-btn {
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.8rem;
        font-weight: bold;
        transition: background 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;

        &.minimize {
            background: $accent-orange;
            color: white;

            &:hover {
                background: color.adjust($accent-orange, $lightness: 10%);
            }
        }

        &.maximize {
            background: $accent-green;
            color: white;
            line-height: 1;

            &:hover {
                background: color.adjust($accent-green, $lightness: 10%);
            }
        }

        &.close {
            background: $accent-red;
            color: white;

            &:hover {
                background: color.adjust($accent-red, $lightness: 10%);
            }
        }
    }
}

.window-content {
    height: calc(100% - 32px);
    overflow: auto;
    background: $window-bg;
}

.resize-handle {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 16px;
    height: 16px;
    cursor: se-resize;
    background: linear-gradient(-45deg,
            transparent 30%,
            #666 30%,
            #666 35%,
            transparent 35%,
            transparent 65%,
            #666 65%,
            #666 70%,
            transparent 70%);
}
</style>