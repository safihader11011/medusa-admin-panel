import React from 'react';
import { Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import logo from '../images/logo.svg'
import { HomeTwoTone } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import SidebarIcon1 from '../images/sidebarIcon1.svg';
import SidebarIcon2 from '../images/sidebarIcon2.svg';
import SidebarIcon3 from '../images/sidebarIcon3.svg';
import SidebarIcon4 from '../images/sidebarIcon4.svg';
import SidebarIcon5 from '../images/sidebarIcon5.svg';
import SidebarIcon6 from '../images/sidebarIcon6.svg';

const useStyles = makeStyles(theme => ({

    logoContainerDiv: {
        // backgroundColor:"pink",
        display: "flex",
        justifyContent: "center",
        marginTop: "2rem",
    },

    logoDiv: {
        height: "fit-content",
        width: "70%",
        // backgroundColor:"yellow"
    },

    menuDiv: {
        marginTop: "3rem",
        // marginLeft:"1rem",
        fontFamily: "Poppins",
        // backgroundColor:"blue",
        display: "flex",
        // justifyContent: "center",
    },

    linkText: {
        marginLeft: "1rem",
        font: "normal normal normal 0.9rem Poppins",
        letterSpacing: "0px",
        color: "#000000",
        opacity: "1",
        padding: "0"
    },

}))

const Sidebar = (props) => {
    const classes = useStyles();
    return (

        <div>
            <ProSidebar>
                <div className={classes.logoContainerDiv}>
                    <div className={classes.logoDiv}>
                        <img src={logo} alt="logo" width="100%" />
                    </div>
                </div>
                <Menu iconShape="square" className={classes.menuDiv}>
                    <MenuItem >
                        <img src={SidebarIcon6} alt="icon3" width="20%" />
                        <Link to="/categories"><span className={classes.linkText}>Categories</span></Link>
                    </MenuItem>
                    <MenuItem >
                        <img src={SidebarIcon2} alt="icon2" width="20%" />
                        <Link to="/psychics"><sapn className={classes.linkText}>Psychics</sapn></Link>
                    </MenuItem>
                </Menu>
            </ProSidebar>
        </div>

    );
}

export default Sidebar;









