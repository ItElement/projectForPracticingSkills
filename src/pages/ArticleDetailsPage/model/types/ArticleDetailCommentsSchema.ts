import { Comment } from 'entities/Comment';
import { EntityState } from '@reduxjs/toolkit';

// чтобы не указывать ids и entities наследуемся
// ids: number | string
// entities: то что указано в джинерике
export interface ArticleDetailCommentsSchema extends EntityState<Comment>{
    isLoading?: boolean;
    error?: string;
}
