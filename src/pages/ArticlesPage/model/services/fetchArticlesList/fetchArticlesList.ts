import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { getArticlesPageLimit } from 'pages/ArticlesPage/model/selectors/aticlesPageSelectors';

interface FetchArticlesListPops {
    page?: number;
}

// в джинерике первыйм аргументом, то что мы возвращаем, а второй это аргумент
export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListPops,
    ThunkConfig<string>
>(
    'articlesPage/fetchArticlesList',
    async (props, thunkAPI) => {
        const {
            extra,
            rejectWithValue,
            getState,
        } = thunkAPI;
        const { page = 1 } = props;
        const limit = getArticlesPageLimit(getState());

        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _limit: limit,
                    _page: page,
                },
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
