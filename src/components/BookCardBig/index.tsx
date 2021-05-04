import React, {useState} from 'react';
import {connectElem} from "../../reducers";
import {Link} from "react-router-dom";
import {IconButton, Rating, RatingSize} from "@fluentui/react";
import {favoriteAction, ratingAction} from "../../actions/book";

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
    return (
        <div className={'book_card'}>
            <img src={'/data/pictures/' + props.book.picture} width={200} height={300}></img>
            <div className={'book_info'}>
                <Link to={`/books/${props.book.id}`}><h3>{props.book.title}</h3></Link>
                <p><span className={'bold_text'}>{'author : '}</span>{props.book.author}</p>
                <p><span className={'bold_text'}>{'year : '}</span>{props.book.year}</p>
                <p><span className={'bold_text'}>{'publisher : '}</span>{props.book.publisher}</p>
            </div>
            <div className={'rating'} onMouseEnter={() => setRatingDis(false)}
                 onMouseLeave={() => setRatingDis(true)}
            >
                <p><span className={'bold_text'}>{'rating : '}</span><span
                    style={{color: ratColor(), fontWeight: 'bold'}}>{props.book.rating.average.toFixed(2)}</span></p>
                <div className={'stars'}>
                    {
                        ratingDis ?
                            <Rating
                                readOnly
                                rating={props.book.rating.average}
                                allowZeroStars
                                max={5}
                                ariaLabel="Large stars"
                                ariaLabelFormat="{0} of {1} stars"
                            />

                            :
                            <Rating
                                allowZeroStars
                                max={5}
                                size={RatingSize.Large}
                                ariaLabel="Large stars"
                                ariaLabelFormat="{0} of {1} stars"
                                onChange={(event: React.FormEvent<HTMLElement>, rating?: number) => {
                                    if (event.type === 'focus') {
                                        props.dispatch(ratingAction(props.book.id, Number(rating)))
                                    }
                                }}
                            />
                    }
                </div>


                <p><span className={'bold_text'}>{'rated : '}</span>{props.book.rating.rated}</p>
            </div>

            <IconButton iconProps={{iconName: starIcon()}}

                        onClick={() => {
                            props.dispatch(favoriteAction(props.book.id, !props.book.favorites))
                        }}
            />
        </div>
    )
};


export default connectElem(BookCardBig);