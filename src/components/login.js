import React, {useEffect, useState,useContext} from "react";
import {Form,Row,Col,Card,Button} from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link,Redirect,useHistory } from 'react-router-dom';
import axios from "axios";
import {AuthenticationContext} from "../provider/authentication-provider";
import userApi from "../api/userApi";

const Login=(props)=> {
    const {authentication,setAuthentication}=useContext(AuthenticationContext);
    let history = useHistory();
    const [redirectTo, setRedirectTo] = useState(null);

    const [loggedIn, setLoggedIn] = useState(false);

    const [loginUser, setLoginUser] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [error, setError] = useState("");
    const onChangeUsername = (e) => {
        setLoginUser(e.target.value);
    };
    const onChangePassword = (e) => {
        setLoginPassword(e.target.value);
    };
    const login= async (e) => {
        e.preventDefault();
        /* const obj = {
             username: loginUser,
             password: loginPassword,

         };
         if(obj.username !==""&&obj.password!=="")
         {
             axios.post('http://localhost:5000/user/login', obj)
                 .then(res => {
                     //setRedirectTo('/user/login');
                     if(res.data==="Không có tài khoản này")
                     {
                         setError("Sai tài khoản hoặc mật khẩu");
                     }
                     else {
                         setAuthentication(res.data);
                         history.push('/');
                         console.log("Check user after login");
                         console.log(res.data);
                     }

                 })
                 .catch(function (error) {
                     setError(error);

                 });
         }
         else
         {
             setError("Phải nhập đầy đủ thông tin");
         }
 */
        if (loginUser && loginPassword) {
            const res = await userApi.login(loginUser, loginPassword);
            if(res==="Không có tài khoản này")
            {
                setError("Sai tài khoản hoặc mật khẩu");
            }
            else {
                setAuthentication(res);
                history.push('/');
                console.log("Check response after login");
                console.log(res);
            }
        }
        else
        {
            setError("Phải nhập đủ thông tin");
        }
    };


    return (
        <div className="col d-flex justify-content-center">
            <Card style={{width: '25rem'}}>
                <Card.Body>
                    <Card.Title>Login</Card.Title>

                    <Form>
                        {error ?
                            <Form.Group as={Row}>
                                <Form.Label column sm="8">
                                    <div style={{color: 'red'}}>{error}</div>
                                </Form.Label>
                                <Col sm="4">
                                </Col>
                            </Form.Group>
                            : ""}
                        <Form.Group as={Row} controlId="formBasicEmail">

                            <Col sm="">
                                <Form.Control type="input" placeholder="Username" onChange={onChangeUsername}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicPassword">

                            <Col sm="">
                                <Form.Control type="password" placeholder="Password" onChange={onChangePassword}/>
                            </Col>
                        </Form.Group>
                        <Button variant="primary" size="lg" block type="submit" onClick={login}
                                style={{backgroundColor: "white", color: "black"}}>
                            Login
                        </Button>
                        <br/>


                    </Form>


                </Card.Body>


            </Card>

        </div>

    );





}

export default Login;