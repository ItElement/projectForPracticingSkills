import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticleView } from 'entities/Article';
import { ArticlePageSchema } from 'pages/ArticlesPage';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';

const articlesAdapter = createEntityAdapter<Article>({
    // делаем селектор поля по которому будет идти нормализация
    selectId: (article) => article.id,
});

// делаем селектор с помощью которого будем комменты получать
export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    // commentsAdapter.getInitialState() - функция возвращающая дефолтный стейт
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

const articlePageSlice = createSlice({
    name: 'articlePageSlice',
    initialState: articlesAdapter.getInitialState<ArticlePageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: ArticleView.SMALL,
        page: 1,
        hasMore: true,
        _inited: false,
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        initState: (state) => {
            const view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as ArticleView;
            state.view = view;
            state.limit = view === ArticleView.BIG ? 4 : 12;
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            // начал выполняться async action
            .addCase(fetchArticlesList.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            // произошла ошибка или успешно загрузили данные
            // action ожидаем на вход Article
            .addCase(fetchArticlesList.fulfilled, (
                state,
                action: PayloadAction<Article[]>,
            ) => {
                state.isLoading = false;
                articlesAdapter.addMany(state, action.payload);
                state.hasMore = action.payload.length > 0;
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: articlesPageReducer } = articlePageSlice;
export const { actions: articlesPageActions } = articlePageSlice;

// ids - это айдишник из entities, а entities
// содержит ключ id из ids и значение
