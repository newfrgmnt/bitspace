import { CanvasStore } from './CanvasStore';

export type Position = {
    x: number;
    y: number;
};

export type Size = {
    width: number;
    height: number;
};

export type StoreProviderValue = {
    store: CanvasStore;
};
