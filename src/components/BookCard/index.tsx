import React from 'react';
import {connectElem} from "../../reducers";

interface BookCardProps
{
    book:any,
    state:any,
    dispatch:any
}

 function BookCard(props:BookCardProps)
{

    return (
        <div className={'book_card'}>
            <img src={'/data/pictures/'+props.book.picture} width={100} height={150}></img>
            <div className={'book_info'}>
            <h3>{props.book.title}</h3>
                <p><span className={'bold_text'}>{'author : '}</span>{props.book.author}</p>
            <p><span className={'bold_text'}>{'year : '}</span>{props.book.year}</p>
                <p><span className={'bold_text'}>{'publisher : '}</span>{props.book.publisher}</p>
            </div>
        </div>
    )
}

export default connectElem(BookCard);