import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from '@/entities/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { ThunkConfig } from '@/app/providers/StoreProvider';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

// в джинерике первыйм аргументом, то что мы возвращаем, а второй это аргумент
export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        const {
            extra,
            dispatch,
            rejectWithValue,
        } = thunkAPI;

        try {
            const response = await extra.api.post<User>('/login', authData);

            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
            // return thunkAPI.rejectWithValue(i18n.t('Вы ввели неверный логин или пароль'));
        }
    },
);

// const loginByUsername = createAsyncThunk(
//     'login/loginByUsername',
//     async ({ username, password }: LoginByUsernameProps, thunkAPI) => {
//         const response = await axios.post('https://localhost:8000/login');
//         return response.data;
//     },
// );
