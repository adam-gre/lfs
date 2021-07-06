import React from 'react';
import { Image, Stack, Box, useColorMode, Set, Button, Icon } from 'bumbag';
import {
    NavLink
} from "react-router-dom";
import { faHome, faThList, faTruckLoading, faCog } from '@fortawesome/free-solid-svg-icons';
import userEvent from '@testing-library/user-event';
import { useAuth0 } from '@auth0/auth0-react';
var logo = require('../../assets/logo_arrows_light.png');
var logo_dark = require('../../assets/logo_arrows_dark.png');

  
function Sidebar() {
    const { colorMode, setColorMode } = useColorMode();

    const {
        isLoading,
        isAuthenticated,
        error,
        user,
        loginWithRedirect,
        logout,
    } = useAuth0();
  
    return (
        <div className="sidebar" >
            <Stack alignX="center" height="100vh" orientation="vertical">
                <img src={logo_dark} height="50px" alt='LFS' />
                <NavLink to="/user" class="nav-link" activeClassName='active'>
                    <Image
                        fit="contain"
                        height="auto"
                        width="3vw"
                        src={user.picture}
                        alt={user.name}
                        backgroundColor="whitesmoke"
                        className="avatar"
                    />
                </NavLink>
                <NavLink to="/home" class="nav-link" activeClassName='active'>
                    <Box className="nav-box" alignY="center" alignX="center">
                        <Icon aria-label="Dashboard" icon={faHome} type="font-awesome" />
                    </Box>
                </NavLink>
                <NavLink to="/deliveries" class="nav-link" activeClassName='active'>
                    <Box className="nav-box" alignY="center" alignX="center">
                        <Icon aria-label="Deliveries" icon={faThList} type="font-awesome" />
                    </Box>
                </NavLink>
                <NavLink to="/submit" class="nav-link" activeClassName='active'>
                    <Box className="nav-box" alignY="center" alignX="center">
                        <Icon aria-label="Submit" icon={faTruckLoading} type="font-awesome" />
                    </Box>
                </NavLink>
                <NavLink to="/settings" marginTop="10vh" class="nav-link" activeClassName='active'>
                    <Box className="nav-box" alignY="center" alignX="center">
                        <Icon aria-label="Settings" icon={faCog} type="font-awesome" />
                    </Box>
                </NavLink>
                
      <Set>
        <Button onClick={() => setColorMode('default')}>Light</Button>
        <Button onClick={() => setColorMode('dark')}>Dark</Button>
      </Set>
            </Stack>
        </div>
    );
};

export default Sidebar;
