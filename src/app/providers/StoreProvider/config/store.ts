import {
    CombinedState,
    configureStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { NavigateOptions, To } from 'react-router-dom';
import { $api } from 'shared/api/api';
import { createReducerManager } from './reducerManager';
import { StateSchema } from './StateSchema';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    navigate?: (to: To, options?: NavigateOptions) => void,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        // инициализируем стэйт
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                // можем передать любые данные
                extraArgument: {
                    api: $api,
                    // storybook
                    navigate,
                },
            },
        }),
    });

    // добавили новое поле
    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

// типизируем диспатч
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
