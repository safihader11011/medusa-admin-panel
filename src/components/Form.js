import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



const useStyles = makeStyles((theme) => ({

    heading:{
        // textAlign: "left",
        font: "normal normal medium 70px/106px Poppins",
        letterSpacing: "0px",
        color: "#4B4B4B",
        opacity: "1",
    },

    line:{
        height: "0.9vh",
        width: "25%",
        // border: "9px solid var(--unnamed-color-136ee3)",
        border: "3px solid #136EE3",
        opacity: "1",
        textAlign: "-webkit-center",
        // marginTop: "-2vmax",
    },

  paper: {
    marginTop: theme.spacing(8),
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
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 12px 40px #00000029",
    borderRadius: "17px",
    opacity: "1",
    border:"none",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "17px",
        border:"none",
      },
      "&.Mui-focused fieldset": {
        borderWidth: "2px",
      }
    }
  },
}));

export default function SignIn() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
         <Typography component="h1" style={{textAlign:"center", marginBottom:"5%"}}>
         <h1 className={classes.heading}>Admin</h1>
         <p>This is the admin and admin can access their portal and scheuldde payment</p>
        </Typography>

        <Typography component="h1" variant="h5">
         <h1 className={classes.heading}>Sign in</h1>
         {/* <div className={classes.line}></div> */}
        </Typography>
      
        <form className={classes.form} noValidate>

          <TextField className={classes.inputbox}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField className={classes.inputbox}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password" 
          />
         <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
           
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>

          <Box >
        
        sign up
      </Box>
          
        </form>
      </div>
      
    </Container>
  );
}