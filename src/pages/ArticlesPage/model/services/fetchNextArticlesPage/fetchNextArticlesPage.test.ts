import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { fetchNextArticlesPage } from './fetchNextArticlesPage';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('fetchNextArticlesPage.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: true,
            },
        });

        const result = await thunk.callThunk();

        // pending, fulfilled и 2 раза внутри thank
        expect(thunk.dispatch).toBeCalledTimes(4);
        // проверяем какой аргумент передали
        expect(fetchArticlesList).toHaveBeenCalled();
    });

    test('fetchArticleList not called', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: false,
            },
        });

        const result = await thunk.callThunk();

        // pending, fulfilled и 2 раза внутри thank
        expect(thunk.dispatch).toBeCalledTimes(2);
        // проверяем какой аргумент передали
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });

    test('fetchArticleList not called (isLoading)', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: true,
                hasMore: true,
            },
        });

        const result = await thunk.callThunk();

        // pending, fulfilled и 2 раза внутри thank
        expect(thunk.dispatch).toBeCalledTimes(2);
        // проверяем какой аргумент передали
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });
});
