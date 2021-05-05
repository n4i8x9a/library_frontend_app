import React from 'react';
import {connectElem} from "../../reducers";
import {Button,IconButton} from "@fluentui/react";
import {ratingAction} from "../../actions/book";


interface RatingComponentProps
{
    state: any,
    dispatch: any,
    book:any
}

function RatingComponent(props:RatingComponentProps)



{
    let color= props.book.rating>0 ?'green' :'red' ;
    return <div className={'rating_component'}>



        <IconButton
            iconProps={{iconName:"SkypeCircleMinus"}}

            onClick={()=>{

                props.dispatch(ratingAction(props.book.id,-1));
            }}


        />
        <p style={{color:color}}>{props.book.rating}</p>
        <IconButton
            iconProps={{iconName:"CirclePlus"}}
            onClick={()=>{

                props.dispatch(ratingAction(props.book.id,1));
            }}


        />
    </div>
}



export default connectElem(RatingComponent);