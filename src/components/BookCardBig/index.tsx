import React, {useState} from 'react';
import {connectElem} from "../../reducers";
import {Link} from "react-router-dom";
import {IconButton, Rating, RatingSize} from "@fluentui/react";
import {favoriteAction, ratingAction} from "../../actions/book";
import RatingComponent from "../RatingComponent";

interface BookCardProps {
    book: any,
    state: any,
    dispatch: any
}

function BookCardBig(props: BookCardProps) {
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

    /*
    return (
        <div className={'book_card_big'}>

            <div>
            <div className={'book_main'}>
            <img src={'/data/pictures/' + props.book.picture} width={160} height={240}></img>
            <div className={'book_info_big'}>
                <h2>{props.book.title}</h2>
                <p><span className={'bold_text'}>{'author : '}</span>{props.book.author}</p>
                <p><span className={'bold_text'}>{'year : '}</span>{props.book.year}</p>
                <p><span className={'bold_text'}>{'publisher : '}</span>{props.book.publisher}</p>


            </div>

            </div>

                <div className={'book_btns'}>
                <div className={'rating_big'}>
                    <RatingComponent
                        //@ts-ignore
                        book={props.book}/>

                </div>

                <IconButton style={{zoom:"150%"}} iconProps={{iconName: starIcon()}}

                            onClick={() => {
                                props.dispatch(favoriteAction(props.book.id, !props.book.favorites))
                            }}
                />
                </div>
            </div>
                <div className={'book_description'}>

                <p>{props.book.description}</p>
            </div>
            </div>

    )

     */

    return <div className={'book_card_big'}>

        <div className={'book_info_big'}>
            <img src={'/data/pictures/' + props.book.picture} width={160} height={240}></img>
            <div className={'text_info'}>
            <h2>{props.book.title}</h2>
            <p>{props.book.author}</p>
            <p>{props.book.year}</p>
            <p>{props.book.publisher}</p>
            </div>
            <div className={'book_btns'}>
                <div className={'rating_big'}>
                    <RatingComponent
                        //@ts-ignore
                        book={props.book}/>

                </div>

                <IconButton style={{zoom:"150%"}} iconProps={{iconName: starIcon()}}

                            onClick={() => {
                                props.dispatch(favoriteAction(props.book.id, !props.book.favorites))
                            }}
                />
                <Link to={''}>Download</Link>
            </div>
        </div>

        <div className={'book_description'}>
            <p>{props.book.description}</p>
        </div>
    </div>
};




export default connectElem(BookCardBig);