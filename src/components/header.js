import React, { useState } from 'react';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import { AppBar, Toolbar, Grid, InputBase, IconButton, Badge, makeStyles } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import divimg from '../images/avatar.jpeg';
import { from } from 'pumpify';
import { useHistory } from 'react-router-dom';

import { signOut } from '../shared/services/user';
import cookies from '../shared/utilities/cookies';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fff',
        paddingLeft: '270px',
    },
    searchInput: {
        background: "#F2F1F1 0% 0% no-repeat padding-box",
        borderRadius: "27px",
        opacity: "1",
        width: "40%",
        height: "35px",
        padding: `0px ${theme.spacing(1)}px`,
        fontSize: '0.8rem',
        '&:hover': {
            backgroundColor: '#f2f2f2'
        },
        '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(1)
        }
    },

    heading: {
        font: "normal normal 600 2rem Poppins",
        letterSpacing: "0px",
        color: "#4A4949",
        opacity: "1",
    },

    DropdownBtn: {
        background: "none",
        border: "none",
        font: "normal normal medium 18px/19px Poppins",
        letterSpacing: "0px",
        color: "#0A0808",
        opacity: "1",

        "&:hover": {
            background: "none",
            color: "#0A0808",
        }
    },
}))

function Header(props) {
    const classes = useStyles();
    const history = useHistory();

    const [dropdownOpen, setdropdownOpen] = useState(false);

    let toggleDropdown = () => {
        setdropdownOpen(!dropdownOpen);
    }

    let handleLogout = () => {
        signOut();
        history.push("/login");
    }

    return (

        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item>
                    </Grid>

                    <div className="d-flex justify-content-between align-items-center w-100 mt-2">
                        <h1 className={classes.heading}>{props.title}</h1>
                        <div className="position-relative">
                            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} >
                                <DropdownToggle caret className={classes.DropdownBtn}>
                                    <span>{cookies.getCookie('name')}</span>
                                </DropdownToggle>
                                <DropdownMenu style={{ right: '-10px', left: 'unset' }}>
                                    <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </Grid>
            </Toolbar>
        </AppBar>

    )
}

export default Header;