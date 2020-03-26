import React from 'react';
import './App.css';
import Home from "./Home";
import Login from "./Auth/Login";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";


export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

