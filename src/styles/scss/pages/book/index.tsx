import React from 'react';
import {
    useParams, Redirect
} from "react-router-dom";
import {connectElem} from "../../../../reducers";
import BookCardBig from "../../../../components/BookCardBig";


interface BookProps {
    state: any,
    dispatch: any
}

function Book(props: BookProps) {


    let params: any = useParams();


    let book:any = props.state.bookReducer.books.find((item: any, index: any) => {
        if (item.id === Number(params.id) ){
            return true;
        }
    });

    if (book === undefined) {
        return <div>No</div>
    } else {
        return (
        <>
           <BookCardBig
               // @ts-ignore

               book={book}/>
       </>
        );
    }
}

export default connectElem(Book);