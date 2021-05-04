import React from 'react';
import { useTranslation } from 'react-i18next';
import {Pivot, PivotItem} from "@fluentui/react";
import {Link,BrowserRouter as Router, Route, Switch,Redirect} from "react-router-dom";
import {connectElem} from "../../reducers";
interface HeaderProps
{
    state:any,
    dispatch:any
}

function Header(props:HeaderProps)
{
    const { t, i18n } = useTranslation('common');

    return (

        <div className={'header'}>
            <div>
            <h2>{props.state.appReducer.title}</h2>
            </div>
            <div className={'navigation'}>
                <Link to='/'><p>Home</p></Link>
                <Link to='/favorites'><p>Favorites</p></Link>

            </div>
        </div>
    );
}

export default connectElem(Header);