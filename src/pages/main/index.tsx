import React, {useEffect, useState} from 'react';
import {connectElem} from "../../reducers";
import {searchButtonShowAction, updateHeaderTextAction, updateTitleAction} from "../../actions/app";
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
        props.dispatch(updateTitleAction('mainPage.header'));
        props.dispatch(updateHeaderTextAction('mainPage.header'));

        if (props.state.appReducer.isMobile)
        {
            props.dispatch(searchButtonShowAction(true));
        }

    }, [props.state.appReducer.title,props.state.appReducer.headerText])


    return <Books
        //@ts-ignore
        books={props.state.bookReducer.books}/>

}

export default connectElem(Main);