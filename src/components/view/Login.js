import React from 'react';
import { Box, Container, Heading, Paragraph, Link, Divider, Input, Button } from 'bumbag';
import firebase from "firebase";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var blob1 = require('../../assets/blob-1.svg');
var blob2 = require('../../assets/blob-2.svg');
var logo = require('../../assets/logo_arrows_dark.png');

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {name: '', email: ''};
  
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        const {id , value} = e.target   
        this.setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    render () {
        return (
            <>
            <Container isFluid margin='0' padding='0' height="100vh" backgroundColor="#e9ecf0" className='login-bg'>
                <img src={blob1} height="800vh" width='800vw' className='bg-blob-1' alt='' />
                <img src={blob1} height="600vh" className='bg-blob-2' alt='' />
                <Box width="100vw" height="100vh" alignX='center' alignY='center' className='login-box'>
                    <Heading use='h1'>Sign in</Heading>
                    <Divider />
                    <Paragraph className='login-subheader'>Welcome back! You need to sign in to use our Hub</Paragraph>
                    <Input className='login-input' placeholder='Email' name='email' id="email" type='email' onChange={this.handleChange} />
                    <Input className='login-input' placeholder='Password' name='password' id="password" type='password' style={{marginTop: '1vh'}} onChange={this.handleChange} />
                    <Button className='login-input' backgroundColor='primary' color='white' style={{marginTop: '1vh'}} 
                        onClick={() => {
                            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                            .then((user) => {
                                console.log(user)
                                toast.success(`Logged in!`, {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                            })
                            .catch((error) => {
                                var errorCode = error.code;
                                var errorMessage = error.message;
                                toast.error(`${error.message}`, {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                                console.log(`${errorCode} ${errorMessage}`)
                            });
                        }}
                    >Sign In</Button>
                    <Link style={{marginTop: '1vh'}}>Forgot your password?</Link>
                </Box>
            </Container>
            </>
        )
    }
};

export default Login;
