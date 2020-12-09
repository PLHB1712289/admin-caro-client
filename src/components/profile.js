import React, {useContext, useEffect, useState} from "react";
import {Form, Row, Col, Card, Button,InputGroup,FormControl,FormLabel,} from "react-bootstrap";
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link,Redirect,useHistory,useParams } from 'react-router-dom';
import {AuthenticationContext} from "../provider/authentication-provider";

const Profile=(props)=>{
    let history=useHistory();
    const {authentication}=useContext(AuthenticationContext);
    if(!authentication)
    {
        history.push("/");
        return (
            <div></div>
        );
    }
    else {
        return(
            <div className="col d-flex justify-content-center">
                <Card style={{ width: '30rem' }}>
                    <Card.Body>
                        <Card.Title>Profile</Card.Title>
                        <Card.Text>
                            <Form.Group as={Row} >
                                <Form.Label column sm="4">
                                    Username:
                                </Form.Label>
                                <Col sm="8">
                                    {authentication.username}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm="4" >
                                    Email:
                                </Form.Label>
                                <Col sm="8">
                                    {authentication.email}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm="4">
                                    Phone:
                                </Form.Label>
                                <Col sm="8">
                                    {authentication.phone}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm="4">
                                    Address:
                                </Form.Label>
                                <Col sm="8">
                                    {authentication.address}
                                </Col>
                            </Form.Group>
                            <Button variant="primary">Update</Button>


                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>

        );
    }

}

export default Profile;
