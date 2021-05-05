import React, {useState} from 'react';
import {connectElem} from "../../reducers";
import {IconButton, Rating, RatingSize} from '@fluentui/react';
import {favoriteAction, ratingAction} from "../../actions/book";
import {Link} from "react-router-dom";
import RatingComponent from "../RatingComponent";

interface BookCardProps {
    book: any,
    state: any,
    dispatch: any
}

function BookCard(props: BookCardProps) {
    const [ratingDis, setRatingDis] = useState(true);
    const starIcon = () => {
        if (props.book.favorites) {
            return 'FavoriteStarFill'
        } else {
            return 'FavoriteStar';
        }
    }
    const ratColor = () => {
        if (props.book.rating.average < 3) {
            return '#c50f1f';

        }
        if (props.book.rating.average < 4) {
            return '#ffaa44';

        }
        if (props.book.rating.average <= 5) {
            return '#6bb700';

        }
    }
    return (
        <div className={'book_card'}>
            <img src={'/data/pictures/' + props.book.picture} width={100} height={150}></img>
            <div className={'book_info'}>
                <Link to={`/books/${props.book.id}`}><h3>{props.book.title}</h3></Link>
                <p><span className={'bold_text'}>{'author : '}</span></p>
                <p>{props.book.author}</p>
                <p><span className={'bold_text'}>{'year : '}</span></p>
                <p>{props.book.year}</p>
                <p><span className={'bold_text'}>{'publisher : '}</span></p>
                <p>{props.book.publisher}</p>
            </div>
            <div className={'rating'}>
               <RatingComponent
                   //@ts-ignore
                   book={props.book}/>

            </div>
            <div className={'favorite_star'}>
            <IconButton iconProps={{iconName: starIcon()}}
                        style={{zoom:"150%"}}

                        onClick={() => {
                            props.dispatch(favoriteAction(props.book.id, !props.book.favorites))
                        }}
            />
            </div>
        </div>
    )
}

export default connectElem(BookCard);
/*
<p><span className={'bold_text'}>{'author : '}</span>{props.book.author}</p>
                <p><span className={'bold_text'}>{'year : '}</span>{props.book.year}</p>
                <p><span className={'bold_text'}>{'publisher : '}</span>{props.book.publisher}</p>
 */