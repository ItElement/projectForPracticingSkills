import React, {
    memo, ReactNode, useCallback, useEffect,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/app/providers/ThemeProvider';
import { useAnimationLib } from '@/shared/lib/components/AnimationProvider';
import { Overlay } from '../Overlay/Overlay';
import cls from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

// высота окна
const height = window.innerHeight - 100;

export const DrawerContent = memo((props: DrawerProps) => {
    const { Spring, Gesture } = useAnimationLib();
    const [{ y }, api] = Spring.useSpring(() => ({ y: height }));
    const {
        className,
        children,
        onClose,
        isOpen,
        lazy,
    } = props;
    const { theme } = useTheme();
    // const {
    //     isOpening,
    // } = useModal({
    //     animationDelay: 300,
    //     onClose,
    //     isOpen,
    // });

    // когда открываем Drawer запускаем анимацию
    const openDrawer = useCallback(() => {
        api.start({ y: 0, immediate: false });
    }, [api]);

    useEffect(() => {
        if (isOpen) {
            openDrawer();
        }
    }, [api, isOpen, openDrawer]);

    // когда закрываем Drawer тоже запускаем анимацию
    const close = (velocity = 0) => {
        api.start({
            y: height,
            immediate: false,
            config: { ...Spring.config.stiff, velocity },
            onResolve: onClose,
        });
    };

    const bind = Gesture.useDrag(
        ({
            last,
            velocity: [, vy],
            direction: [, dy],
            movement: [, my],
            cancel,
        }) => {
            if (my < -70) cancel();

            if (last) {
                if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
                    close();
                } else {
                    openDrawer();
                }
            } else {
                api.start({ y: my, immediate: true });
            }
        },
        {
            from: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true,
        },
    );

    if (!isOpen) {
        return null;
    }

    const display = y.to((py) => (py < height ? 'block' : 'none'));

    // const mods: Mods = {
    //     [cls.opened]: isOpening,
    //     [cls.isClosing]: isClosing,
    //     [cls[theme]]: true,
    // };
    //
    // if (lazy && !isMounted) {
    //     return null;
    // }

    return (
        <Portal>
            <div className={classNames(cls.Drawer, {}, [className, theme, 'app_drawer'])}>
                <Overlay onClick={() => close()} />
                <Spring.a.div
                    className={cls.sheet}
                    style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
                    {...bind()}
                >
                    {children}
                </Spring.a.div>
            </div>
        </Portal>
    );
});

// если isLoaded false то не отрисовываем
export const Drawer = memo((props: DrawerProps) => {
    const { isLoaded } = useAnimationLib();

    if (!isLoaded) {
        return null;
    }

    return <DrawerContent {...props} />;
});

// было раньше без драг энд дропа
// return (
//     <Portal>
//         <div className={classNames(cls.Drawer, {}, [className, theme, 'app_drawer'])}>
//             <Overlay onClick={close} />
//             <div
//                 className={cls.content}
//             >
//                 {children}
//             </div>
//         </div>
//     </Portal>
// );
