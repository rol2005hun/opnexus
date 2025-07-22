import type { BaseEntity } from '../core/base';

export interface LaptopApp extends BaseEntity {
    name: string;
    icon: string;
    isOpen: boolean;
    zIndex: number;
    position: { x: number; y: number };
    size: { width: number; height: number };
    minimized: boolean;
    maximized: boolean;
    originalPosition?: { x: number; y: number };
    originalSize?: { width: number; height: number };
    preMinimizePosition?: { x: number; y: number };
    preMinimizeSize?: { width: number; height: number };
    preMinimizeMaximized?: boolean;
}

export interface LaptopState {
    apps: LaptopApp[];
    highestZIndex: number;
    wallpaper: string;
}
