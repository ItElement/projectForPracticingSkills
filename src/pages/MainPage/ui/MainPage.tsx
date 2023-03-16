import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InputCommon } from 'shared/ui/InputCommon/InputCommon';

const MainPage = memo(() => {
    const { t } = useTranslation('main');
    const [value, setValue] = useState('');

    const onChange = (val: string) => {
        setValue(val);
    };

    return (
        <div>
            {t('Главная страница')}
            <InputCommon
                value={value}
                onChange={onChange}
                placeholder={t('Введите username')}
                type="text"
            />
        </div>
    );
});

export default MainPage;
