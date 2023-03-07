import {
    AnyAction, combineReducers, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { ReducerManager, StateSchema, StateSchemaKey } from './StateSchema';

// на вход функция приниает дефолтные редьюссеры
export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>): ReducerManager {
    const reducers = { ...initialReducers };

    // создаем корневой редюсер
    let combinedReducer = combineReducers(reducers);

    // хранит названия редьюссеров, которые хотим удалить
    let keysToRemove: StateSchemaKey[] = [];

    return {
        // getReducerMap возвращает редьюссеры
        getReducerMap: () => reducers,
        // редьюссер
        reduce: (state: StateSchema, action: AnyAction) => {
            if (keysToRemove.length > 0) {
                state = { ...state };
                keysToRemove.forEach((key) => {
                    delete state[key];
                });
                keysToRemove = [];
            }
            return combinedReducer(state, action);
        },
        // добавляет ключ в редьюссер
        add: (key: StateSchemaKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return;
            }
            reducers[key] = reducer;
            combinedReducer = combineReducers(reducers);
        },
        // удаляет ключ из редьюссера
        remove: (key: StateSchemaKey) => {
            if (!key || !reducers[key]) {
                return;
            }
            delete reducers[key];
            keysToRemove.push(key);
            combinedReducer = combineReducers(reducers);
        },
    };
}
