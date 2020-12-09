import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from "./components/home";
import Login from "./components/login";
import Profile from "./components/profile";
import Register from "./components/register";
import {AuthenticationProvider,AuthenticationContext} from "./provider/authentication-provider";
import Navbar from "./components/navbar";
import Header from "./components/header";

function App() {

  return (
      <AuthenticationProvider>
        <div className="App">
          <Navbar/>

        </div>
      </AuthenticationProvider>

  );
}

export default App;
