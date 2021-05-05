import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import {Pivot, PivotItem} from "@fluentui/react";
import {Link,BrowserRouter as Router, Route, Switch,Redirect} from "react-router-dom";
import {connectElem} from "../../reducers";
import { Icon } from '@fluentui/react/lib/Icon';

interface HeaderProps
{
    state:any,
    dispatch:any
}

function Header(props:HeaderProps)
{
    const { t, i18n } = useTranslation('common');
    const [homeIcon,setHomeIcon]=useState("Home");
    const [favIcon,setFavIcon]=useState("FavoriteStar");

    return (

        <div className={'header'}>
            <div>
            <h2>{props.state.appReducer.title}</h2>
            </div>
            <div className={'navigation'}>

                <Link to='/'><Icon
                    style={{zoom:"140%"}}
                    iconName={homeIcon}
                onMouseEnter={()=>setHomeIcon('HomeSolid')}
                                   onMouseLeave={()=>setHomeIcon('Home')}
                /></Link>
                <Link to='/favorites'><Icon iconName={favIcon}
                                            style={{zoom:"140%"}}

                                            onMouseEnter={()=>setFavIcon('FavoriteStarFill')}
                                            onMouseLeave={()=>setFavIcon('FavoriteStar')}
                /></Link>

            </div>
        </div>
    );
}

export default connectElem(Header);