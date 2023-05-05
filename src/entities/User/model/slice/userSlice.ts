import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {
    _inited: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // помещаем в стейт данные
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        // проверка авторизован ли пользователь
        initAuthData: (state) => {
            const user = localStorage.getItem((USER_LOCALSTORAGE_KEY));
            if (user) {
                // распарсиваем из строки в js файл обратно
                state.authData = JSON.parse(user);
            }
            state._inited = true;
        },
        // выход пользователя
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
