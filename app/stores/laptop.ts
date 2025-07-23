import { defineStore } from 'pinia';

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
                desktopPosition: { x: 0, y: 0 },
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
                desktopPosition: { x: 105, y: 0 },
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
                desktopPosition: { x: 210, y: 0 },
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
                desktopPosition: { x: 315, y: 0 },
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
                desktopPosition: { x: 0, y: 105 },
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
                desktopPosition: { x: 105, y: 105 },
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

            this.refreshGridPositions();
        },

        refreshGridPositions() {
            const newGridPositions = this.getGridPositions();
            const maxX = Math.max(...newGridPositions.map(pos => pos.x));
            const maxY = Math.max(...newGridPositions.map(pos => pos.y));

            this.apps.forEach(app => {
                if (app.desktopPosition.x > maxX || app.desktopPosition.y > maxY) {
                    const availablePositions = this.getAvailableGridPositions();
                    if (availablePositions.length > 0) {
                        let closestPosition = availablePositions[0];
                        let minDistance = Number.MAX_VALUE;

                        for (const pos of availablePositions) {
                            const distance = Math.sqrt(
                                Math.pow(app.desktopPosition.x - pos.x, 2) +
                                Math.pow(app.desktopPosition.y - pos.y, 2)
                            );
                            if (distance < minDistance) {
                                minDistance = distance;
                                closestPosition = pos;
                            }
                        }

                        if (closestPosition) {
                            app.desktopPosition = { x: closestPosition.x, y: closestPosition.y };
                        }
                    }
                }
            });
        },

        updateDesktopIconPosition(appId: string, x: number, y: number) {
            const app = this.apps.find(a => a.id === appId);
            if (app) {
                app.desktopPosition = { x, y };
            }
        },

        getGridPositions() {
            const gridSizeX = 105;
            const gridSizeY = 105;
            const startX = 0;
            const startY = 0;
            const positions = [];

            const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
            const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;

            const cols = Math.floor(screenWidth / gridSizeX);
            const rows = Math.floor((screenHeight - 100) / gridSizeY);

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    positions.push({
                        x: startX + (col * gridSizeX),
                        y: startY + (row * gridSizeY)
                    });
                }
            }
            return positions;
        },

        getAvailableGridPositions() {
            const allPositions = this.getGridPositions();
            const usedPositions = this.apps.map(app => app.desktopPosition);

            return allPositions.filter(pos =>
                !usedPositions.some(used =>
                    Math.abs(used.x - pos.x) < 5 && Math.abs(used.y - pos.y) < 5
                )
            );
        },

        snapToGrid(x: number, y: number) {
            const gridPositions = this.getGridPositions();
            let closestPosition = gridPositions[0];
            let minDistance = Number.MAX_VALUE;

            for (const pos of gridPositions) {
                const distance = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2));
                if (distance < minDistance) {
                    minDistance = distance;
                    closestPosition = pos;
                }
            }

            return closestPosition;
        },

        isPositionOccupied(x: number, y: number, excludeAppId?: string) {
            return this.apps.some(app => {
                if (excludeAppId && app.id === excludeAppId) return false;
                return app.desktopPosition.x === x && app.desktopPosition.y === y;
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