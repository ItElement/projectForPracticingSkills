import { MutableRefObject, useEffect, useRef } from 'react';

export interface UseInfiniteScrollOptions {
    callback?: () => void;
    // элемент который пересекаем
    triggerRef: MutableRefObject<HTMLElement>;
    // тут наша страница
    wrapperRef: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll(props: UseInfiniteScrollOptions) {
    const {
        wrapperRef,
        triggerRef,
        callback,
    } = props;

    useEffect(() => {
        const wrapperElement = wrapperRef.current;
        const triggerElement = triggerRef.current;
        let observer: IntersectionObserver | null = null;
        if (callback) {
            const options = {
                // элемент в котором находится скролл
                // root: wrapperRef.current,  не работает
                root: wrapperElement,
                rootMargin: '20px',
                threshold: 1.0,
            };

            // entries массив элементов за которыми мы наблюдаем
            // const callback = function (entries, observer) {
            //     /* Content excerpted, show below */
            // };

            observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);

            observer.observe(triggerElement);
        }

        return () => {
            if (observer && triggerElement) {
                // в игнор, тк объект на который ссылка меняться не будет
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(triggerElement);
            }
        };
    }, [callback, triggerRef, wrapperRef]);
}
