import { useEffect } from 'react';
import { fetchArticleById } from '@/entities/Article/model/services/fetchArticleById/fetchArticleById';

export function useInitialEffect(callback: () => void) {
    useEffect(() => {
        if (__PROJECT__ !== 'storybook' && __PROJECT__ !== 'jest') {
            callback();
        }
        // eslint-disable-next-line
    }, []);
}
