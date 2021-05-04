import React, {useEffect} from 'react';
import {connectElem} from "../../reducers";
import {updateTitleAction} from "../../actions/app";
import {useTranslation} from "react-i18next";

interface FavoritesProps
{
    state:any,
    dispatch:any
}
function Favorites(props:FavoritesProps) {
    const { t, i18n } = useTranslation('common');

    useEffect(()=>{props.dispatch(updateTitleAction(t('favoritesPage.header')));},[props.state.appReducer.title])

    return (
        <>
            <div></div>
        </>
    );

}

export default connectElem(Favorites);