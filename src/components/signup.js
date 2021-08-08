import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import validator from 'validator';

import OtpInput from 'react-otp-input';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {signUp, checkSignIn, verifyOtp, resendOtp } from '../shared/services/user';

const Signup = () => {
    
    const history = useHistory();
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [phoneNo, setphoneNo] = useState('');
    const [password, setpassword] = useState('');
    const [role, setrole] = useState('');

    const [showOtp, setshowOtp] = useState(false);
    const [otp, setotp] = useState('');

    const [errors, setErrors] = useState({
        nameError: null,
        emailError: null,
        phoneNoError: null,
        passwordError: null,
        roleError: null
    }); 

    useEffect(() => {
        if(checkSignIn()){
            history.push("/categories");
        }
    }, []);

    let handleEmailChange = (e) => {
        setemail(e.target.value);
        if(validator.isEmail(e.target.value)){
            errors.emailError = null;
        }
        else {
            errors.emailError = 'Invalid Email.';
        }
    }

    let handlePasswordChange = (e) => {
        setpassword(e.target.value);
        // if(e.target.value.length >= 6){
        //     errors.passwordError = null;
        // }
        // else {
        //     errors.passwordError = 'Use atleast 6 characters. Be creative';
        // }
    }

    const commonHandler = (e) => {
        eval('set' + e.target.name + '(e.target.value);');
    }

    let handleSubmit = async (e) => {
        e.preventDefault();

        if(!errors.emailError){
            let data = {
                name,
                email,
                // phoneNo,
                password
            }
    
            let res = await signUp(data);
    
            if(!res.error){
                if(res.message === 'One Time Password (OTP) has been generated and sent on your registered email'){
                    setshowOtp(true)
                }
            }
        }
    }

    let otpModalToggler = () => {
        setshowOtp(!showOtp);
    }

    let handleOtpChange = (otp) => {
        setotp(otp)
    }

    let otpResend = async () => {
        let data = {
            email
        }

        let res = await resendOtp(data);

        if(!res.error){
            console.log(res)
        }
    }

    let otpSubmit = async () => {
        let data = {
            email,
            OTP: otp
        }

        let res = await verifyOtp(data);

        if(!res.error){
            if(res.message === 'Login successfully.'){
                history.push("/categories");
            }
        }
    }

    return (
        <>
            <Modal isOpen={showOtp} toggle={otpModalToggler}>
                <ModalHeader toggle={otpModalToggler}>Modal title</ModalHeader>
                <ModalBody>
                    <p>One Time Password (OTP) has been generated and sent on your registered email</p>
                    <OtpInput
                        value={otp}
                        onChange={handleOtpChange}
                        numInputs={4}
                        separator={<span> </span>}
                    />
                    <p onClick={otpResend}>resend</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={(otp.length === 4)? () => otpSubmit() : null}>Submit</Button>
                    <Button color="secondary" onClick={otpModalToggler}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <div className="container signup_form my-5">
                <form action="" onSubmit={handleSubmit} className="form justify-content-center p-0">
                    <div className="form-group col-12 m-0 mb-4 p-0">
                        <h2 className="text-center">Sign Up</h2>
                    </div>
                    <div className="p-3">
                        <div className="form-group col-12">
                            <input type="text" name="name" value={name} className="form-control my_input" placeholder="Name" onChange={commonHandler}/>
                            {errors.nameError?<div className="error">{errors.nameError}</div>:null}
                        </div>
                        <div className="form-group col-12">
                            <input type="email" value={email} className="form-control my_input" placeholder="Email Address" required onChange={handleEmailChange}/>
                            {errors.emailError?<div className="error">{errors.emailError}</div>:null}
                        </div>
                        {/* <div className="form-group col-12">
                            <input type="number" name="phoneNo" value={phoneNo} className="form-control my_input" placeholder="Phone Number" onChange={commonHandler}/>
                            {errors.phoneNoError?<div className="error">{errors.phoneNoError}</div>:null}
                        </div> */}
                        <div className="form-group col-12">
                            <input type="password" value={password} className="form-control my_input" placeholder="Password" required onChange={handlePasswordChange}/>
                            {errors.passwordError?<div className="error">{errors.passwordError}</div>:null}
                        </div>
                        <div className="form-group col-12">
                            <input type="text" name="role" value={role} className="form-control my_input" placeholder="Role" onChange={commonHandler}/>
                            {errors.roleError?<div className="error">{errors.roleError}</div>:null}
                        </div>
                        <div className="form-group col-12 mt-4">
                            <input type="submit" className="form-control btn" value="Sign Up" />
                        </div>
                        <hr className="clearfix col-12 mb-3 p-0" />
                        <div className="form-group col-12 m-0 text-center">
                            Already have an account? <Link to="/login">Log In</Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Signup;