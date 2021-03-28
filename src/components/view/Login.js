import React from 'react';
import { Box, Container, Heading, Paragraph, Link, Divider, Input, Button } from 'bumbag';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Parse from 'parse';
import { useAuth0 } from '@auth0/auth0-react';

var blob = require('../../assets/blob-1.svg');

// class Login extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {name: '', email: '', sessionToken: ''};
  
//       this.handleChange = this.handleChange.bind(this);
//     }

//     handleChange = (e) => {
//         const {id , value} = e.target   
//         this.setState(prevState => ({
//             ...prevState,
//             [id] : value
//         }))
//     }

    // render () {
function Login() {
    const {
      isLoading,
      isAuthenticated,
      error,
      user,
      loginWithRedirect,
      logout,
    } = useAuth0();
    return (
        <>
        <Container isFluid margin='0' padding='0' height="100vh" backgroundColor="#e9ecf0" className='login-bg'>
            <img src={blob} height="750vh" width='800vw' className='bg-blob-1' alt='' />
            <img src={blob} height="600vh" className='bg-blob-2' alt='' />
            <Box width="100vw" height="100vh" alignX='center' alignY='center' className='login-box'>
                <Heading use='h1'>Sign in</Heading>
                <Divider />
                <Paragraph className='login-subheader'>Welcome! You need to sign in to use our Hub</Paragraph>
                {/* <Input className='login-input' placeholder='Email' name='email' id="email" type='email' onChange={this.handleChange} />
                <Input className='login-input' placeholder='Password' name='password' id="password" type='password' style={{marginTop: '1vh'}} onChange={this.handleChange} />
                <Button className='login-input' backgroundColor='primary' color='white' style={{marginTop: '1vh'}} 
                    onClick={() => {    
                        var user = Parse.User
                        .logIn(this.state.email, this.state.password).then(function(user) {
                            toast.success(`Welcome, ${user.get('username')}`, {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            console.log(Parse.User.current())
                        }).catch(function(error){
                            toast.error(`${error.message}`, {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        });
                    }}
                >Sign In</Button> */}
                <Button className='login-input' backgroundColor='primary' color='white' style={{marginTop: '1vh'}} onClick={loginWithRedirect}>Sign In</Button>
            </Box>
        </Container>
        </>
    )
};

export default Login;
