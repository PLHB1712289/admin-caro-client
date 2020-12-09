import React, {useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from "./home";
import Login from "../components/login";
import Profile from "./profile";
import Register from "./register";
import {AuthenticationContext} from "../provider/authentication-provider";
import Header from "./header";

const Navbar=(props)=>{
    const {authentication}=useContext(AuthenticationContext);
    return(
        <div>
                <Header/>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {authentication ?
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to={'/'} className="nav-link">Home</Link>
                                </li>


                                <li className="nav-item">
                                    <Link to={'/user/profile'} className="nav-link">Profile</Link>
                                </li>

                            </ul>
                            :
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to={'/'} className="nav-link">Home</Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={'/user/login'} className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/user/register'} className="nav-link">Register</Link>
                                </li>

                            </ul>
                        }

                    </div>
                </nav> <br/>
                <Switch>
                    <Route exact path='/' component={ Home } />
                    <Route path='/user/login' component={ Login } />
                    <Route path='/user/register' component={ Register } />

                    <Route path='/user/profile' component={ Profile } />
                </Switch>
        </div>
    );
}
export default Navbar;