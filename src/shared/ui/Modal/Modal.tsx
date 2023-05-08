import React, {
    ReactNode,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
    } = props;
    const {
        isClosing,
        isMounted,
        close,
        isOpening,
    } = useModal({
        animationDelay: ANIMATION_DELAY,
        onClose,
        isOpen,
    });
    const { theme } = useTheme();

    const mods: Mods = {
        [cls.opened]: isOpening,
        [cls.isClosing]: isClosing,
        [cls[theme]]: true,
    };

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <Overlay onClick={close} />
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};

// <Portal>
//     <div className={classNames(cls.Modal, mods, [className])}>
//         <Overlay onClick={closeHandler} />
//         {/* <div className={cls.overlay} onClick={closeHandler}> */}
//         <div className={cls.content} onClick={onContentClick}>
//             {children}
//         </div>
//         {/* </div> */}
//     </div>
// </Portal>
