import axios from 'axios';
import React, {useContext, useEffect, useState} from "react";
import {Button, Card, Col, Form, Row} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link,Redirect ,useHistory} from 'react-router-dom';
import {AuthenticationContext} from "../provider/authentication-provider";
import userApi from "../api/userApi";

const Header=(props) =>{
    let history=useHistory();
    const {authentication,setAuthentication}=useContext(AuthenticationContext);
    //const [isLoggedOut,setIsLoggedOut]=useState(false);
    const Logout= async () => {
        const res = await userApi.logout();
        history.push('/user/login');
        setAuthentication(null);


    }
    if(authentication)
    {
        return(

            <nav className="navbar navbar-light bg-primary">
                <span className="d-block p-2 bg-primary text-white">Admin Caro</span>
                <span className="d-block p-2 bg-primary text-white">
                    Hello {authentication.username}
                </span>
                <Button onClick={Logout}>Log out</Button>
            </nav>
        );
    }
    else
    {
        return(

            <nav className="navbar navbar-light bg-primary">
                <span className="d-block p-2 bg-primary text-white">Admin Caro</span>

            </nav>
        );
    }



}


export default Header;
