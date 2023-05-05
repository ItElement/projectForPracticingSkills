import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getScrollSave = (state: StateSchema) => state.scroll.scroll;

export const getScrollByPath = createSelector(
    // получаем весь объект
    getScrollSave,
    // передаем путь
    (state: StateSchema, path: string) => path,
    // возвращаем конкретный участок скролла по пути
    (scroll, path) => scroll[path] || 0,
);
