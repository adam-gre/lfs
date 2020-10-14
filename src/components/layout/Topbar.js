import React from 'react';
import { Image, Stack, Box } from 'bumbag';
import {
    Link
} from "react-router-dom";
import { FaHome, FaTruck } from 'react-icons/fa';
import { AiOutlineForm } from 'react-icons/ai';
import { IoMdSettings } from 'react-icons/io'
import logo from '../../lfs_arrows_white.png';

const Sidebar = () => (
    <Box height="100%" backgroundColor="#171A1F" paddingTop="2vh" paddingBottom="2vh">
        <Stack alignX="center" height="100vh" orientation="vertical">
            <Link to="/home">
                <Image
                    fit="contain"
                    height="2.5vw"
                    width="2.5vw"
                    src={logo}
                    alt="LFS"
                />
            </Link>
            <Link to="/home">
                <Box className="nav-box" alignY="center" alignX="center">
                    <FaHome size="2vw" className="nav-item" />
                </Box>
            </Link>
            <Link to="/deliveries">
                <Box className="nav-box" alignY="center" alignX="center">
                    <FaTruck size="2vw" className="nav-item" />
                </Box>
            </Link>
            <Link to="/submit">
                <Box className="nav-box" alignY="center" alignX="center">
                    <AiOutlineForm size="2vw" className="nav-item" />
                </Box>
            </Link>
            <Link to="/settings" marginTop="10vh">
                <Box className="nav-box" alignY="center" alignX="center">
                    <IoMdSettings size="2vw" className="nav-item" />
                </Box>
            </Link>
        </Stack>
    </Box>
    
    
);

export default Sidebar;
