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
@use '@/assets/scss/components/Window.scss';
</style>