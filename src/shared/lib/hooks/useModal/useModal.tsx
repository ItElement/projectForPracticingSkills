import {
    useCallback, useEffect, useRef, useState,
} from 'react';

interface UseModalProps {
    onClose?: () => void;
    isOpen?: boolean;
    animationDelay: number;
}

/**
 * Переиспользуемый хук для модальных компонентов (drawer/modal)
 * @param props
 */

export function useModal(props: UseModalProps) {
    const {
        animationDelay,
        isOpen = false,
        onClose,
    } = props;
    const [isClosing, setIsClosing] = useState(false);
    const [isOpening, setIsOpening] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    // делаем референс, где храним таймаут
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        setIsMounted(isOpen);
    }, [isOpen]);

    const close = useCallback(() => {
        // если передали onClose
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, animationDelay);
        }
    }, [animationDelay, onClose]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            close();
        }
    }, [close]);

    // предотвращаем всплытие
    // const onContentClick = (e: React.MouseEvent) => {
    //     e.stopPropagation();
    // };

    useEffect(() => {
        if (isOpen) {
            timerRef.current = setTimeout(() => {
                setIsOpening(true);
            }, 10);
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            setIsOpening(false);
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    return {
        isOpening,
        isClosing,
        isMounted,
        close,
    };
}
