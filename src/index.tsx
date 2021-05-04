import React from 'react';
import ReactDOM from 'react-dom';
import './styles/css/index.css'
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Main from "./pages/main";
import Favorites from "./pages/favorites";
import './i18n/index'
import Footer from "./components/Footer";
import Header from "./components/Header";
import {initializeIcons} from '@fluentui/font-icons-mdl2';
import {createStore} from 'redux'
import reducer from './reducers/index'
import {favoriteAction, initAction, ratingAction} from "./actions/book";
import {Provider} from 'react-redux'

initializeIcons();


export const store = createStore(reducer)
console.log(store.getState());

async function getBooks() {
    let req = await fetch('/data/books.json');
    if (req.ok) {
        return req.json();
    }
}

getBooks().then(value => {
    store.dispatch(initAction(value.books));
    store.dispatch(favoriteAction(1, true));
    console.log(store.getState());

})


function setTitle() {
    if (document.title !== store.getState().appReducer.title) {
        document.title = store.getState().appReducer.title;
    }
}

store.subscribe(setTitle);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <>
                <Router>
                    <Header/>

                    <div className={'content'}>


                        <Switch>
                            <Route exact path="/">
                                <Main/>
                            </Route>
                            <Route exact path="/favorites">
                                <Favorites/>
                            </Route>

                        </Switch>
                    </div>
                    <Footer/>
                </Router>
            </>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

