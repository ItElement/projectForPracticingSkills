import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page/Page';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { RatingCard } from '@/entities/Rating';

const MainPage = memo(() => {
    const { t } = useTranslation('main');

    return (
        <Page>
            {t('Главная страница')}
            <RatingCard
                title={t('Как вам статья?')}
                feedbackTitle={t('Оставьте отзыв')}
                hasFeedback
            />
        </Page>
    );
});

export default MainPage;
