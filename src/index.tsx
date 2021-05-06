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
import Book from "./pages/book";
import {windowResizeAction} from "./actions/app";
import i18next from "i18next";

initializeIcons();
i18next
    .init({defaultNS:"common"})
.then();

export const store = createStore(reducer)

async function getBooks() {
    let req = await fetch('/data/books.json');
    if (req.ok) {
        return req.json();
    }
}

getBooks().then(value => {
    store.dispatch(initAction(value.books));

})


function setTitle() {
    if (document.title !== store.getState().appReducer.title) {
        document.title = i18next.t(store.getState().appReducer.title);
    }
}



store.subscribe(setTitle);

window.addEventListener(`resize`, event => {
    store.dispatch(windowResizeAction());
}, false);

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
                            <Route exact path="/books/:id">
                                <Book/>
                            </Route>
                            <Route exact path="/books">
                                <Redirect to={'/'}/>
                            </Route>

                        </Switch>
                    </div>
                    {
                        /*
                        <Footer/>

                         */
                    }
                </Router>
            </>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

