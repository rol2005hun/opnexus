<template>
    <div class="document-reader">
        <div class="document-reader-header">
            <div class="document-info" v-if="currentFile">
                <h2>{{ currentFile.name }}</h2>
                <div class="document-meta">
                    <span class="file-type">{{ getFileTypeLabel(currentFile.type) }}</span>
                    <span class="file-size">{{ currentFile.size }}</span>
                    <span class="last-modified">Modified: {{ useDate().formatDate(currentFile.lastModified) }}</span>
                    <span class="author">Author: {{ currentFile.author }}</span>
                </div>
            </div>
            <div class="no-document" v-else>
                <h2>File Viewer</h2>
                <p>No document selected</p>
            </div>
        </div>

        <div class="document-content" v-if="currentFile">
            <div class="content-wrapper" v-html="useMarkdown().formatMarkdown(currentFile.content)"></div>
        </div>

        <div class="no-content" v-else>
            <div class="empty-state">
                <div class="empty-icon">📄</div>
                <h3>No Document Open</h3>
                <p>Open a document from Email attachments, Chat attachments, or File Explorer to view it here.</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const laptopStore = useLaptopStore();
const gameStore = useGameStore();

const currentFile = computed(() => {
    if (!laptopStore.currentDocument || !gameStore.currentMissionContent) {
        return null;
    }

    return gameStore.currentMissionContent.files.find((file: any) =>
        file.id === laptopStore.currentDocument
    ) || null;
});

const getFileTypeLabel = (type: string): string => {
    const typeLabels: Record<string, string> = {
        'document': 'Document',
        'spreadsheet': 'Spreadsheet',
        'image': 'Image',
        'video': 'Video',
        'audio': 'Audio',
        'archive': 'Archive'
    };
    return typeLabels[type] || 'File';
};

const handleOpenDocument = (event: CustomEvent) => {
    const { fileId } = event.detail;
    laptopStore.currentDocument = fileId;
};

onMounted(() => {
    if (typeof window !== 'undefined') {
        window.addEventListener('openDocument', handleOpenDocument as EventListener);
    }
});

onUnmounted(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('openDocument', handleOpenDocument as EventListener);
    }
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/components/apps/FileReader';
</style>
