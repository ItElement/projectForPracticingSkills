import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    // что телепортируем
    children: ReactNode;
    // куда телепортируем
    element?: HTMLElement;
}

export const Portal = (props: PortalProps) => {
    const {
        children,
        element = document.body,
    } = props;
    return createPortal(children, element);
};
