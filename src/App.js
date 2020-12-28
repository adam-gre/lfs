import React from 'react';
import { Drawer, Provider, Hide, Image, Button, TopNav, PageWithSidebar, Provider as BumbagProvider } from 'bumbag';
import './App.css';
import Sidebar from './components/layout/Sidebar.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Dashboard from './components/view/Dashboard.js'; // Homepage
import Submit from './components/view/Submit.js';
import Deliveries from './components/view/Deliveries.js';
import Live from './components/view/Live.js';
import User from './components/view/User.js';
import Login from './components/view/Login.js';
import Error404 from './components/view/404.js';
import { FiMenu } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import firebase from './providers/firebase';
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed
} from "@react-firebase/auth";
import { FirebaseDatabaseProvider } from "@react-firebase/database";

const theme = {
  fonts: {
    importUrls: ['https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'],
    default: "'Work Sans', system-ui, sans-serif"
  },
  palette: {
    primary: '#008aff'
  }
}

toast.configure()

export default () => (
  <FirebaseAuthProvider firebase={firebase}>
    <FirebaseAuthConsumer>
      <IfFirebaseAuthed>
        <FirebaseDatabaseProvider>
          <Provider theme={theme}>
            <Router>
              <BumbagProvider theme={theme}>
                <PageWithSidebar
                  backgroundColor="default"
                  sidebarWidth="5vw"
                  sidebar={<Sidebar />}>
                    <Hide above="mobile">
                    <TopNav style={{backgroundColor:"#171A1F"}}>
                      <TopNav.Section>
                          <Drawer.State>
                            <Drawer.Disclosure><FiMenu color="white" /></Drawer.Disclosure>
                              <Drawer>
                                <Sidebar style={{width: "100%"}} />
                              </Drawer>
                          </Drawer.State>
                      </TopNav.Section>
                      <TopNav.Section>
                      </TopNav.Section>
                    </TopNav>
                  </Hide>                    
                  <button
                    onClick={() => {
                      firebase.auth().signOut().then(() => {
                        toast.success(`Logged out!`, {
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
                  >Sign out</button>
                  <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/home" component={Dashboard} />
                    <Route exact path="/submit" component={Submit} />
                    <Route exact path="/live" component={Live} />
                    <Route exact path="/deliveries" component={Deliveries} />
                    <Route exact path={`/user/:userId`} component={User}/>
                    
                    <Route path="/404" component={Error404} />

                    <Redirect to="/404" />
                  </Switch>
                </PageWithSidebar>
              </BumbagProvider>
            </Router>
          </Provider>
        </FirebaseDatabaseProvider>
      </IfFirebaseAuthed>
      <IfFirebaseUnAuthed>
        <BumbagProvider theme={theme}>
          <Login />
        </BumbagProvider>
      </IfFirebaseUnAuthed>
    </FirebaseAuthConsumer>
  </FirebaseAuthProvider>
)