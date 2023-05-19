import { Flex, FlexProps } from '../Flex/Flex';

// омит исключает какое либо свойство
type VStackProps = Omit<FlexProps, 'direction'>;

export const VStack = (props: VStackProps) => {
    const { align = 'start' } = props;

    return <Flex {...props} direction="column" align={align} />;
};
