import React from 'react';
import { Image, Stack, Box } from 'bumbag';
import {
    NavLink
} from "react-router-dom";
import { FaHome, FaTruck } from 'react-icons/fa';
import { AiOutlineForm } from 'react-icons/ai';
import { IoMdSettings } from 'react-icons/io'
import userEvent from '@testing-library/user-event';
import { useAuth0 } from '@auth0/auth0-react';
var logo = require('../../assets/logo_arrows_light.png');
var logo_dark = require('../../assets/logo_arrows_dark.png');


  
function Sidebar() {
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
                        <FaHome size={50} className="nav-item" />
                    </Box>
                </NavLink>
                <NavLink to="/deliveries" class="nav-link" activeClassName='active'>
                    <Box className="nav-box" alignY="center" alignX="center">
                        <FaTruck size={50} className="nav-item" />
                    </Box>
                </NavLink>
                <NavLink to="/submit" class="nav-link" activeClassName='active'>
                    <Box className="nav-box" alignY="center" alignX="center">
                        <AiOutlineForm size={50} className="nav-item" />
                    </Box>
                </NavLink>
                <NavLink to="/settings" marginTop="10vh" class="nav-link" activeClassName='active'>
                    <Box className="nav-box" alignY="center" alignX="center">
                        <IoMdSettings size={50} className="nav-item" />
                    </Box>
                </NavLink>
            </Stack>
        </div>
    );
};

export default Sidebar;
