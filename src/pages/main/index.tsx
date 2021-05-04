import React, {useEffect} from 'react';
import {connectElem} from "../../reducers";
import {updateTitleAction} from "../../actions/app";
import {useTranslation} from "react-i18next";
import BookCard from "../../components/BookCard";

interface MainProps
{
    state:any,
    dispatch:any
}

function Main(props:MainProps) {
    const { t, i18n } = useTranslation('common');

    useEffect(()=>{props.dispatch(updateTitleAction(t('mainPage.header')));},[props.state.appReducer.title])

    let elArr=[];
    let key=1;
    for (let book of props.state.bookReducer.books)
    {

        elArr.push(
            // @ts-ignore
            <BookCard book={book}/>
        );
        key++;
    }

    return (
        <>
            <div className={'main_page'}>
                <div></div>
                <div className={'cont'}>
                    {elArr}

                </div>


            </div>
        </>
    );

}

export default connectElem(Main);