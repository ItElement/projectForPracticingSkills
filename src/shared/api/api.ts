// инстанс аксоиос
import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

export const $api = axios.create({
    baseURL: __API__,
    // для получение каких либо данных авторизованным пользователем
    headers: {
        authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
    },
});

//
// const baseUrl = __IS_DEV__ ? 'http://localhost:8000' : 'https://production.ru';
