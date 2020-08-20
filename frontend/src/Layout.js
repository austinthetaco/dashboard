import React, {useState, useContext} from 'react';
import LoginModal from './auth/LoginModal';
import { RootContext } from './RootContext';

import { Link, Switch, Route } from 'react-router-dom';

import Movies from './movies/Movies';
import Home from './Home'

export default () => {
    const { user, setAuthUser } = useContext(RootContext);


    const [modalIsOpen, changeModalState] = useState(false);
    const [formToShow, setFormToShow] = useState(null);

    
    const modalClickHandler = (val) => {
        setFormToShow(val);
        changeModalState(!modalIsOpen)
    }
    const logoutHandler = () => {
        setAuthUser(null);
    }

    return (
        <div>
            Sup nerds
            {user ? <button onClick={logoutHandler}>Logout</button>:
            <>
                <button onClick={modalClickHandler.bind(this, "login")}>Login</button>
                <button onClick={modalClickHandler.bind(this, "register")}>Register</button>
            </>
            }
            
            <LoginModal isOpen={modalIsOpen} formToShow={formToShow} changeModalState={changeModalState}/>
            <Link to="movies">Movies</Link>

            <Switch>
                <Route path="/movies">
                    <Movies/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </div>
    )
}