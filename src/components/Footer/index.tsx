import React from 'react';
import { useTranslation } from 'react-i18next';


function Footer()
{
    const { t, i18n } = useTranslation('common');

    return (

        <div className={'footer'}>
           <p> {t('footer')}</p>
        </div>
    );
}

export default Footer;