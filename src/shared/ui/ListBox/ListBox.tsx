import { Fragment, ReactNode } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropdownDirection } from 'shared/types/ui';
import { HStack } from '../Stack';
import { Button } from '../Button/Button';
import cls from './ListBox.module.scss';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps {
    items?: ListBoxItem[];
    label?: string;
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange: <T extends string>(value: T) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
    'bottom left': cls.optionsBottomLeft,
    'bottom right': cls.optionsBottomRight,
    'top right': cls.optionsTopRight,
    'top left': cls.optionsTopLeft,
};

export function ListBox(props: ListBoxProps) {
    const {
        items,
        className,
        value,
        defaultValue,
        onChange,
        label,
        readonly,
        direction = 'bottom left',
    } = props;

    const optionsClasses = [mapDirectionClass[direction]];

    return (
        <HStack gap="8" max align="center">
            {label && (
                <span>
                    {label}
                </span>
            )}
            <HListBox
                disabled={readonly}
                as="div"
                className={classNames(cls.ListBox, { [cls.disabled]: readonly }, [className])}
                value={value}
                onChange={onChange}
            >
                <HListBox.Button
                    className={cls.trigger}
                >
                    <Button>
                        {value ?? defaultValue}
                    </Button>
                </HListBox.Button>
                <HListBox.Options className={classNames(cls.options, {}, optionsClasses)}>
                    {items?.map((item: ListBoxItem) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(
                                        cls.item,
                                        {
                                            [cls.active]: active,
                                            [cls.disabled]: item.disabled,
                                        },
                                    )}
                                >
                                    {selected && '*'}
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    );
}
