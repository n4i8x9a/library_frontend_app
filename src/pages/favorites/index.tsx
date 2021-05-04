import React, {useEffect} from 'react';
import {connectElem} from "../../reducers";
import {updateTitleAction} from "../../actions/app";
import {useTranslation} from "react-i18next";
import BookCard from "../../components/BookCard";

interface FavoritesProps {
    state: any,
    dispatch: any
}

function Favorites(props: FavoritesProps) {
    const {t, i18n} = useTranslation('common');

    useEffect(() => {
        props.dispatch(updateTitleAction(t('favoritesPage.header')));
    }, [props.state.appReducer.title])

    let elArr = [];
    let key = 1;
    for (let book of props.state.bookReducer.books) {
        if (book.favorites) {
            elArr.push(
                // @ts-ignore
                <BookCard key={key} book={book}/>
            );
            key++;
        }
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

export default connectElem(Favorites);