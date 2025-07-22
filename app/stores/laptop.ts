import { defineStore } from 'pinia';
import type { LaptopApp, LaptopState } from '#shared/types';

export const useLaptopStore = defineStore('laptop', {
    state: (): LaptopState => ({
        highestZIndex: 100,
        wallpaper: '',
        apps: [
            {
                id: 'secureMail',
                name: 'Secure Mail',
                icon: '📧',
                isOpen: false,
                zIndex: 100,
                position: { x: 100, y: 100 },
                size: { width: 800, height: 600 },
                minimized: false,
                maximized: false
            },
            {
                id: 'cipherChat',
                name: 'Cipher Chat',
                icon: '💬',
                isOpen: false,
                zIndex: 100,
                position: { x: 150, y: 150 },
                size: { width: 700, height: 500 },
                minimized: false,
                maximized: false
            },
            {
                id: 'fileExplorer',
                name: 'File Explorer',
                icon: '📁',
                isOpen: false,
                zIndex: 100,
                position: { x: 200, y: 200 },
                size: { width: 900, height: 700 },
                minimized: false,
                maximized: false
            },
            {
                id: 'nexium',
                name: 'Nexium',
                icon: '🌐',
                isOpen: false,
                zIndex: 100,
                position: { x: 250, y: 250 },
                size: { width: 1000, height: 800 },
                minimized: false,
                maximized: false
            },
            {
                id: 'jobDescription',
                name: 'Job Description',
                icon: '💼',
                isOpen: false,
                zIndex: 100,
                position: { x: 300, y: 300 },
                size: { width: 600, height: 400 },
                minimized: false,
                maximized: false
            },
            {
                id: 'evidenceLocker',
                name: 'Evidence Locker',
                icon: '🔍',
                isOpen: false,
                zIndex: 100,
                position: { x: 350, y: 350 },
                size: { width: 850, height: 650 },
                minimized: false,
                maximized: false
            }
        ]
    }),

    actions: {
        openApp(appId: string) {
            const app = this.apps.find(a => a.id === appId);
            if (app) {
                app.isOpen = true;

                if (app.minimized) {
                    app.minimized = false;

                    if (app.preMinimizePosition) {
                        app.position = { ...app.preMinimizePosition };
                    }
                    if (app.preMinimizeSize) {
                        app.size = { ...app.preMinimizeSize };
                    }
                    if (app.preMinimizeMaximized) {
                        app.maximized = true;
                    }

                    delete app.preMinimizePosition;
                    delete app.preMinimizeSize;
                    delete app.preMinimizeMaximized;
                }

                this.bringToFront(appId);
            }
        },

        closeApp(appId: string) {
            const app = this.apps.find(a => a.id === appId);
            if (app) {
                app.isOpen = false;
                app.minimized = false;
                app.maximized = false;
                delete app.originalPosition;
                delete app.originalSize;
                delete app.preMinimizePosition;
                delete app.preMinimizeSize;
                delete app.preMinimizeMaximized;
            }
        },

        minimizeApp(appId: string) {
            const app = this.apps.find(a => a.id === appId);
            if (app) {
                app.preMinimizePosition = { ...app.position };
                app.preMinimizeSize = { ...app.size };
                app.preMinimizeMaximized = app.maximized;

                app.minimized = true;
                app.maximized = false;
            }
        },

        maximizeApp(appId: string) {
            const app = this.apps.find(a => a.id === appId);
            if (app) {
                if (app.maximized) {
                    if (app.originalPosition && app.originalSize) {
                        app.position = { ...app.originalPosition };
                        app.size = { ...app.originalSize };
                    }
                    app.maximized = false;
                } else {
                    app.originalPosition = { ...app.position };
                    app.originalSize = { ...app.size };

                    const windowsContainer = document.querySelector('.windows-container') as HTMLElement;
                    if (windowsContainer) {
                        const containerRect = windowsContainer.getBoundingClientRect();
                        app.position = { x: 0, y: 0 };
                        app.size = {
                            width: containerRect.width,
                            height: containerRect.height
                        };
                    } else {
                        app.position = { x: 0, y: 0 };
                        app.size = {
                            width: window.innerWidth,
                            height: window.innerHeight - 50
                        };
                    }
                    app.maximized = true;
                }

                app.minimized = false;
                this.bringToFront(appId);
            }
        },

        bringToFront(appId: string) {
            const app = this.apps.find(a => a.id === appId);
            if (app) {
                this.highestZIndex++;
                app.zIndex = this.highestZIndex;
            }
        },

        moveApp(appId: string, position: { x: number; y: number }) {
            const app = this.apps.find(a => a.id === appId);
            if (app) {
                app.position = position;
            }
        },

        resizeApp(appId: string, size: { width: number; height: number }) {
            const app = this.apps.find(a => a.id === appId);
            if (app) {
                app.size = size;
            }
        },

        handleWindowResize() {
            this.apps.forEach(app => {
                if (app.maximized) {
                    const container = document.querySelector('.windows-container');
                    const containerRect = container?.getBoundingClientRect();

                    app.size = {
                        width: containerRect?.width || window.innerWidth,
                        height: containerRect?.height || (window.innerHeight - 50)
                    };
                }
            });
        }
    },

    getters: {
        openApps(): LaptopApp[] {
            return this.apps.filter(app => app.isOpen && !app.minimized);
        },

        minimizedApps(): LaptopApp[] {
            return this.apps.filter(app => app.isOpen && app.minimized);
        },

        maximizedApps(): LaptopApp[] {
            return this.apps.filter(app => app.isOpen && app.maximized);
        },

        taskbarApps(): LaptopApp[] {
            return this.apps.filter(app => app.isOpen);
        }
    }
});