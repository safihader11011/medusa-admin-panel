import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Container, TextField, CssBaseline, Typography, Box } from "@material-ui/core";
import { Link, useHistory } from 'react-router-dom';
import validator from 'validator';
import logo1 from '../images/logo.svg';



import { signIn, checkSignIn } from '../shared/services/user';

const useStyles = makeStyles((theme) => ({

    link: {
        textDecoration: "none",
    },

    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: "transparent linear-gradient(180deg, #FF4238 0%, #80211C 100%) 0% 0% no-repeat padding-box",
        // background: "#F6F6F6 0% 0% no-repeat padding-box",
        boxShadow: "0px 12px 20px #0000004D",
        opacity: "1",
        height: "100vh",
        textAlign: "-webkit-center",
        [theme.breakpoints.down("md")]: {
            height: "fit-contant",
        },
    },

    logoDiv: {
        margin: "15% 8%",
        background: "#F6F6F6 0% 0% no-repeat padding-box",
        boxShadow: "0px 12px 20px #0000004D",
        opacity: "1",
        // marginLeft:"10vmax"
    },
    // *********************************FORM CSS***************************************************************************

    heading: {
        // textAlign: "left",
        font: "normal normal medium 70px/106px Poppins",
        letterSpacing: "0px",
        color: "#4B4B4B",
        opacity: "1",
    },

    line: {
        height: "0.9vh",
        width: "35%",
        backgroundColor: "#136EE3",
        borderRadius: "10px",
        // textAlign: "-webkit-center",

    },

    main: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },

    paper: {
        // marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },

    submit: {
        margin: theme.spacing(3, 0, 2),
        background: "var(--unnamed-color-136ee3) 0% 0% no-repeat padding-box",
        background: "#136EE3 0% 0% no-repeat padding-box",
        boxShadow: "0px 1px 5px #00000029",
        borderRadius: "49px",
        opacity: "1",
        textTransform: "capitalize",
    },

    inputbox: {
        background: "#F5F5F5 0% 0% no-repeat padding-box",
        borderRadius: "49px",
        opacity: "1",
        border: "none",
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderRadius: "17px",
                border: "none",
            },
            "&.Mui-focused fieldset": {
                // borderWidth: "17px",
                borderRadius: "17px",
                border: "none",
            }
        }
    },

}));

const Login = () => {

    const classes = useStyles();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        emailError: null,
        passwordError: null,
    });

    useEffect(() => {
        if (checkSignIn()) {
            history.push("/categories");
        }
    }, []);

    let handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (validator.isEmail(e.target.value)) {
            errors.emailError = null;
        }
        else {
            errors.emailError = 'Invalid Email.';
        }
    }

    let handlePasswordChange = (e) => {
        setPassword(e.target.value);
        // if(e.target.value.length >= 6){
        //     errors.passwordError = null;
        // }
        // else {
        //     errors.passwordError = 'Invalid password.';
        // }
    }

    let handleSubmit = async (e) => {
        e.preventDefault();

        if (!errors.emailError) {
            let data = {
                _id: email,
                password
            }

            let res = await signIn(data);

            if (!res.error) {
                if (res.token) {
                    history.push("/categories");
                }
            }
        }
    }

    return (
        <>


            <Grid container >
                <Grid item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    xl={4} className={classes.logoContainer}>
                    <div className={classes.logoDiv}>
                        <img src={logo1} alt="logo1" width="60%" height="90%" />
                    </div>
                </Grid>

                <Grid item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={8}
                    xl={8} >
                    <Container component="main" maxWidth="xs" className={classes.main}>
                        {/* <CssBaseline /> */}
                        <div className={classes.paper}>

                            <Typography style={{ textAlign: "-webkit-center", }} >
                                <h1 className={classes.heading}>Sign in</h1>
                                <div className={classes.line}></div>
                            </Typography>

                            <form action="" onSubmit={handleSubmit} className={classes.form} noValidate>

                                <div className="position-relative">
                                    <TextField className={classes.inputbox}
                                        variant="outlined" margin="normal" required fullWidth
                                        type="email" value={email} autoComplete="email"
                                        placeholder="Email Address" onChange={handleEmailChange} />
                                    {errors.emailError ? <label className="error">{errors.emailError}</label> : null}
                                </div>

                                <div className="position-relative">
                                    <TextField className={classes.inputbox}
                                        variant="outlined" margin="normal" fullWidth
                                        type="password" value={password} autoComplete="current-password"
                                        placeholder="Password" required onChange={handlePasswordChange} />
                                    {errors.passwordError ? <label className="error">{errors.passwordError}</label> : null}
                                </div>

                                <Grid container>
                                    <Grid item xs style={{ marginLeft: "4%", }}>
                                        <Link href="#" className={classes.link}>
                                            Forgot password?
                                        </Link>
                                    </Grid>

                                </Grid>

                                <Button
                                    type="submit" fullWidth variant="contained" color="primary" className={classes.submit}
                                    value="Log In" >
                                    Log In
                                </Button>

                                {/* <Box style={{ textAlign: "-webkit-center", }}>
                                    <span><b>Creat New Account? </b></span>
                                    <Link to="/signup" className={classes.link} style={{ color: "red" }}>
                                        <b> Sign up</b>
                                    </Link>
                                </Box> */}

                            </form>
                        </div>
                    </Container>

                </Grid>
            </Grid>
        </>
    );
};

export default Login;