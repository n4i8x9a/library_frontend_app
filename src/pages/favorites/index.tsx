import React, {useEffect} from 'react';
import {connectElem} from "../../reducers";
import {updateTitleAction} from "../../actions/app";
import {useTranslation} from "react-i18next";
import BookCard from "../../components/BookCard";
import Books from "../../components/Books";

interface FavoritesProps {
    state: any,
    dispatch: any
}

function Favorites(props: FavoritesProps) {
    const {t, i18n} = useTranslation('common');

    useEffect(() => {
        props.dispatch(updateTitleAction(t('favoritesPage.header')));
    }, [props.state.appReducer.title])

    let booksArr = [];

    for (let book of props.state.bookReducer.books) {
        if (book.favorites) {
            booksArr.push(
                book
            );

        }
    }

    return (
        <Books
        //@ts-ignore
            books={booksArr}
        />
    );

}

export default connectElem(Favorites);