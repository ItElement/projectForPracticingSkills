import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

// когда разные ошибки могут быть, то создаем перечисление
// и добавляем в стейт, а в компоненте выволим перевод нужной ошибки
// enum LoginErrors {
//     INCORRECT_DATA = '',
//     SERVER_ERROR = '',
// }

// в джинерике первыйм аргументом, то что мы возвращаем, а второй аргумент
export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string }>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:8000/login', authData);

            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            thunkAPI.dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('error');
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
