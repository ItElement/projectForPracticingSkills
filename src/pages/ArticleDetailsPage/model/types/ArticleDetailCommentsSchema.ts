import { EntityState } from '@reduxjs/toolkit';
import { Comment } from '@/entities/Comment';

// чтобы не указывать ids и entities наследуемся
// ids: number | string
// entities: то что указано в джинерике
export interface ArticleDetailCommentsSchema extends EntityState<Comment>{
    isLoading?: boolean;
    error?: string;
}
