import { ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';
import {
    ReduxStoreWithManager,
    StateSchema,
    StateSchemaKey,
} from '@/app/providers/StoreProvider';

export type ReducersList = {
    // (2 часть после :) забираем поле из стейт схемы в зависимости от названия
    // редюсера, который разработчик указал (избавляет от ошибок с указанием не верного редюсера)
    // NonNullable говорит что редбюссер должен быть не нулевой
    [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

type ReducersListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
    children: ReactNode;
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
    const { children, reducers, removeAfterUnmount = true } = props;
    // получаем редакс стор
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    // при монтировании добавляем редюсер
    useEffect(() => {
        const mountedReducers = store.reducerManager.getMountedReducers();
        Object.entries(reducers).forEach(([name, reducer]) => {
            const mounted = mountedReducers[name as StateSchemaKey]; // по ключу
            // Добавляем новый редюсер только если его нет
            if (!mounted) {
                store.reducerManager.add(name as StateSchemaKey, reducer);
                dispatch({ type: `@INIT ${name} reducer` });
            }
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name, reducer]) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };
        // eslint-disable-next-line
    }, []);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>{children}</>
    );
};
