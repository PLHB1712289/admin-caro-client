import React, {useState} from "react";
import {Form, Row, Col, Card, Button,InputGroup,FormControl,FormLabel} from "react-bootstrap";
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link,Redirect} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import userApi from "../api/userApi";

const Register=(props)=>{
    let history = useHistory();
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const [address,setAddress]=useState("");
    const [phone,setPhone]=useState("");

    const [error,setError]=useState("");
    const onChangeUsername=(e)=>{
        setUsername(e.target.value);
    };
    const onChangePassword=(e)=>{
        setPassword(e.target.value);
    };
    const onChangeEmail=(e)=>{
        setEmail(e.target.value);
    };
    const onChangePhone=(e)=>{
        setPhone(e.target.value);
    };
    const onChangeAddress=(e)=>{
        setAddress(e.target.value);
    };

    const register= async (e) => {
        e.preventDefault();
        const obj = {
            username: username,
            password: password,
            email: email,
            phone: phone,
            address: address
        };
        if (obj.username !== "" && obj.password !== "" && obj.email !== '' && obj.phone !== '' && obj.address !== '') {
            const res = await userApi.register(obj);
            if(res==="Tài khoản đã tồn tại")
            {
                setError(res);
            }
            else
            {
                alert("Đăng ký thành công");
                history.push('/user/login');
                console.log(res);
            }
            /* axios.post('http://localhost:5000/user/register', obj)
                 .then(res => {
                     //setRedirectTo('/user/login');
                     alert("Đăng ký thành công");
                     history.push('/user/login');
                     console.log(res.data);
                 })
                 .catch(function (error) {
                     setError(error);

                 });*/
        } else {
            setError("Phải nhập đầy đủ thông tin");
        }


    };

    return(
        <div className="col d-flex justify-content-center">
            <Card style={{ width: '25rem' }}>
                <Card.Body>
                    <Card.Title>Register</Card.Title>
                    <Form onSubmit={register}>
                        {error?
                            <Form.Group as={Row} >
                                <Form.Label column sm="8">
                                    <div style={{color:'red'}}>{error}</div>
                                </Form.Label>
                                <Col sm="4">
                                </Col>
                            </Form.Group>
                            :""}
                        <Form.Group as={Row} >
                            <Form.Label column sm="4">
                                Username
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="input" name="username" placeholder="" onChange={onChangeUsername} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} >
                            <Form.Label column sm="4">
                                Password
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="password" name="password"placeholder="" onChange={onChangePassword} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicEmail">
                            <Form.Label column sm="4">
                                Email
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="email" name="email" placeholder=""  onChange={onChangeEmail}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column sm="4">
                                Address
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="input" name="address" placeholder="" onChange={onChangeAddress} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                                Phone
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="number" name="phone" placeholder="" onChange={onChangePhone} />
                            </Col>
                        </Form.Group>
                        <Button variant="primary" size="lg" block type="submit" >
                            Register
                        </Button>

                    </Form>
                </Card.Body>
            </Card>
        </div>



    );
}

export default Register;