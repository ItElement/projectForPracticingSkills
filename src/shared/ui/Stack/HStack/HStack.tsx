import { useTranslation } from 'react-i18next';
import { Flex, FlexProps } from '../Flex/Flex';

// омит исключает какое либо свойство
type HStackProps = Omit<FlexProps, 'direction'>;

export const HStack = (props: HStackProps) => {
    const { t } = useTranslation();

    return <Flex direction="row" {...props} />;
};
