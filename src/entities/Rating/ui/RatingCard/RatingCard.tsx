import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { StarRating } from '@/shared/ui/StarRating';
import { Modal } from '@/shared/ui/Modal';
import { InputCommon } from '@/shared/ui/InputCommon';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice';
import { Drawer } from '@/shared/ui/Drawer';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
    rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        onCancel,
        feedbackTitle,
        title,
        onAccept,
        hasFeedback,
        rate = 0,
    } = props;
    const { t } = useTranslation();
    const isMobil = useDevice();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback((selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);
        if (hasFeedback) {
            setIsModalOpen(true);
        } else {
            onAccept?.(selectedStarsCount);
        }
        setIsModalOpen(true);
    }, [hasFeedback, onAccept]);

    const acceptHandle = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandle = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <VStack max gap="32">
            <Text title={feedbackTitle} />
            <InputCommon value={feedback} onChange={setFeedback} placeholder={t('Ваш отзыв')} />
            <HStack max gap="16" justify="end">
                <Button
                    onClick={cancelHandle}
                    theme={ButtonTheme.OUTLINE_RED}
                >
                    {t('Закрыть')}
                </Button>
                <Button onClick={acceptHandle}>
                    {t('Отправить')}
                </Button>
            </HStack>
        </VStack>
    );

    return (
        <Card max className={classNames('', {}, [className])}>
            <VStack max align="center" gap="8">
                <Text title={starsCount ? t('Спасибо за оценку') : title} />
                <StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars} />
            </VStack>
            {!isMobil
                ? (
                    <Modal
                        onClose={cancelHandle}
                        isOpen={isModalOpen}
                        lazy
                    >
                        {modalContent}
                    </Modal>
                )
                : (
                    <Drawer
                        onClose={cancelHandle}
                        isOpen={isModalOpen}
                        lazy
                    >
                        {modalContent}
                    </Drawer>
                )}
        </Card>
    );
});
