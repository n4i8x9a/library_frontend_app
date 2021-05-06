import React, {useState} from 'react';
import {connectElem} from "../../reducers";
import {Dropdown, IDropdownOption, IDropdownStyles} from "@fluentui/react/lib/Dropdown";
import {useTranslation} from "react-i18next";
import BookCard from "../BookCard";
import {SearchBox} from "@fluentui/react/lib/SearchBox";
import {Panel} from '@fluentui/react/lib/Panel';
import {useBoolean} from '@fluentui/react-hooks';
import {DefaultButton} from "@fluentui/react";
import {Icon} from '@fluentui/react/lib/Icon';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile,
    isTablet,
} from "react-device-detect";
import SearchContainer from "../SearchContainer";

interface BooksProps {
    state: any,
    dispatch: any,
    books: any
}


function Books(props: BooksProps) {

    const [sortedBooks, setSortedBooks] = useState([]);
    const [isSearch,setIsSearch]=useState(false);
    const {t, i18n} = useTranslation('common');

    let key = 0;
    let elArr = [];
    let bookArr = sortedBooks.length === 0 && !isSearch ? props.books : sortedBooks;

    for (let book of bookArr) {
        elArr.push(
            // @ts-ignore
            <BookCard key={key} book={book}/>
        );
        key++;
    }
    return (
        <>
            <div className={'main_page'}>
                <SearchContainer
                    //@ts-ignore
                    books={props.books} setBooks={(value: any,isSearch:boolean) => {

                    setSortedBooks(value);
                    setIsSearch(isSearch);

                }}/>
                <div className={'cont'}>
                    {elArr}

                </div>


            </div>
        </>
    );

}

export default connectElem(Books);