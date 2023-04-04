import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InputCommon } from 'shared/ui/InputCommon/InputCommon';
import { Page } from 'widgets/Page/Page';

const MainPage = memo(() => {
    const { t } = useTranslation('main');
    const [value, setValue] = useState('');

    const onChange = (val: string) => {
        setValue(val);
    };

    return (
        <Page>
            {t('Главная страница')}
            <InputCommon
                value={value}
                onChange={onChange}
                placeholder={t('Введите username')}
                type="text"
            />
        </Page>
    );
});

export default MainPage;
