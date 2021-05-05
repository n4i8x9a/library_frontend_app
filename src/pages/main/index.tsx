import React, {useEffect, useState} from 'react';
import {connectElem} from "../../reducers";
import {updateTitleAction} from "../../actions/app";
import {useTranslation} from "react-i18next";
import BookCard from "../../components/BookCard";
import {SearchBox} from '@fluentui/react/lib/SearchBox';
import {Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles} from '@fluentui/react/lib/Dropdown';
import {on} from "cluster";
import Books from "../../components/Books";

interface MainProps {
    state: any,
    dispatch: any
}

function Main(props: MainProps) {
    const {t, i18n} = useTranslation('common');

    useEffect(() => {
        props.dispatch(updateTitleAction(t('mainPage.header')));
    }, [props.state.appReducer.title])


    return <Books
        //@ts-ignore
        books={props.state.bookReducer.books}/>

}

export default connectElem(Main);