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
import Live from './components/view/Live.js';
import User from './components/view/User.js';
import Error404 from './components/view/404.js';
import { FiMenu } from 'react-icons/fi';
 
const theme = {
  fonts: {
    importUrls: ['https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'],
    default: "'Work Sans', system-ui, sans-serif"
  },
  palette: {
    primary: '#008aff'
  }
}

export default () => (
  <Provider theme={theme}>
    <Router>
      <BumbagProvider theme={theme}>
        {/* <Hide above="mobile"> */}
        {/* </Hide> */}
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
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/home">
              <Dashboard />
            </Route>
            <Route path="/submit">
              <Submit />
            </Route>
            <Route path="/Live">
              <Live />
            </Route>
            <Route path={`/user/:userId`} component={User}/>
            
            <Route path="/404">
              <Error404 />
            </Route>
            <Redirect to="/404" />
          </Switch>
        </PageWithSidebar>
      </BumbagProvider>
    </Router>
  </Provider>
)