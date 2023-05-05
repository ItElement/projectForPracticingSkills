import { EntityState } from '@reduxjs/toolkit';
import {
    Article, ArticleSortFiled, ArticleTypes, ArticleView,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types';

export interface ArticlePageSchema extends EntityState<Article>{
    isLoading?: boolean;
    error?: string;

    // pagination
    page: number;
    limit: number;
    hasMore: boolean;

    // filters
    view: ArticleView;
    // что за сортировка
    order: SortOrder;
    // поле по которому сортируем
    sort: ArticleSortFiled;
    // поиск статей
    search: string;
    // выбор типа статьи
    type: ArticleTypes;

    _inited: boolean;
}
