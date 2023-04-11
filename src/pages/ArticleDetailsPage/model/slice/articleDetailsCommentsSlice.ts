import {
    createEntityAdapter,
    createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import { Comment } from 'entities/Comment';
import { StateSchema } from 'app/providers/StoreProvider';
import {
    fetchCommentsByArticleId,
} from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { ArticleDetailCommentsSchema } from '../types/ArticleDetailCommentsSchema';

const commentsAdapter = createEntityAdapter<Comment>({
    // делаем селектор поля по которому будет идти нормализация
    selectId: (comment) => comment.id,
});

// делаем селектор с помощью которого будем комменты получать
export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    // commentsAdapter.getInitialState() - функция возвращающая дефолтный стейт
    (state) => state.articleDetailsPage?.comments || commentsAdapter.getInitialState(),
);

const articleDetailsCommentsSlice = createSlice({
    name: 'articleDetailsCommentsSlice',
    initialState: commentsAdapter.getInitialState<ArticleDetailCommentsSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            // начал выполняться async action
            .addCase(fetchCommentsByArticleId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            // произошла ошибка или успешно загрузили данные
            // action ожидаем на вход Article
            .addCase(fetchCommentsByArticleId.fulfilled, (
                state,
                action: PayloadAction<Comment[]>,
            ) => {
                state.isLoading = false;
                commentsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice;
// export const { actions: articleDetailsCommentActions } = articleDetailsCommentsSlice;

// ids - это айдишник из entities, а entities
// содержит ключ id из ids и значение
