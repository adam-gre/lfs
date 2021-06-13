import React, { useState } from 'react';
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
import Delivery from './components/view/Delivery.js';
import Live from './components/view/Live.js';
import User from './components/view/User.js';
import Login from './components/view/Login.js';
import Error404 from './components/view/404.js';
import { FiMenu } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth0 } from '@auth0/auth0-react';


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

function App() {
  
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  console.log(user);

  return (
    <Provider theme={theme}>
      <Router>
        <BumbagProvider theme={theme}>
          
          {!isAuthenticated ?  
            <Login />    
          : 
            <PageWithSidebar
              backgroundColor="default"
              sidebarWidth="5vw"
              sidebar={<Sidebar />}>
                <Hide above="mobile">
                <TopNav style={{backgroundColor:"#eee"}}>
                  <TopNav.Section>
                      <Drawer.State>
                        <Drawer.Disclosure><FiMenu color="#272727" size="10vw" /></Drawer.Disclosure>
                          <Drawer>
                            <Sidebar />
                          </Drawer>
                      </Drawer.State>
                  </TopNav.Section>
                  <TopNav.Section>
                  </TopNav.Section>
                </TopNav>
              </Hide>    
              <Switch>
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
                <Route exact path="/home" component={Dashboard} />
                <Route exact path="/submit" component={Submit} />
                <Route exact path="/live" component={Live} />
                <Route exact path="/deliveries" component={Deliveries} />
                <Route exact path={`/deliveries/:jobId`} component={Delivery} />
                <Route exact path={`/user/:userId`} component={User}/>
                
                <Route path="/404" component={Error404} />
  
                <Redirect to="/404" />
              </Switch>
            </PageWithSidebar>
          }
        </BumbagProvider>
      </Router>
    </Provider>
  )
}
export default App;