import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlesPageInited } from '../../selectors/aticlesPageSelectors';
import { articlesPageActions } from '../../slices/articlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

// в джинерике первыйм аргументом, то что мы возвращаем, а второй это аргумент
export const initArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'articlesPage/initArticlesPage',
    async (_, thunkAPI) => {
        const {
            getState,
            dispatch,
        } = thunkAPI;
        const inited = getArticlesPageInited(getState());

        if (!inited) {
            dispatch(articlesPageActions.initState());
            dispatch(fetchArticlesList({ page: 1 }));
        }
    },
);
