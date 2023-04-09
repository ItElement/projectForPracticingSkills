import { ArticleDetailCommentsSchema } from './ArticleDetailCommentsSchema';
import { ArticleDetailsPageRecommendationsSchema } from './ArticleDetailsPageRecommendationsSchema';

export interface ArticleDetailsPageSchema {
    comments: ArticleDetailCommentsSchema;
    recommendations: ArticleDetailsPageRecommendationsSchema;
}
