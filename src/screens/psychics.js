import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import { Nav, NavItem, NavLink, TabContent, TabPane, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Card, Grid, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom';

import UserIcon from '../images/user-icon.png';

// Services
import { getPsychics, verifyPsychic } from '../shared/services/psychics';

const useStyles = makeStyles(theme => ({

    mainContainer: {
        marginTop: "1rem",
        //   backgroundColor:"red"
    },

    GridContainer: {
        textAlign: "center",
        border: "1px solid var(--unnamed-color-136ee3)",
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        boxShadow: "0px 12px 20px #00000029",
        border: "1px solid #136EE3",
        borderRadius: "29px",
        opacity: "1",
        cursor: 'pointer'
    },

    GridContainerActive: {
        textAlign: "center",
        border: "1px solid var(--unnamed-color-136ee3)",
        background: "#136EE3 0% 0% no-repeat padding-box",
        boxShadow: "0px 12px 20px #00000029",
        border: "1px solid #136EE3",
        borderRadius: "29px",
        opacity: "1",
        cursor: 'pointer',

        "& .nav-link": {
            color: "#fff"
        }
    },

    navLink: {
        marginLeft: "1rem",
        marginRight: "1rem",

    },
    // ****************************Nav Link End**************************************************

    // *************************************Psychic Card***********************************************************
    mainDiv: {
        // backgroundColor:"red",
        display: "flex",
        justifyContent: "center",
        padding: "10px",
        marginTop: "3rem",
    },

    mainDiv1: {
        width: "95%",
    },

    gridDiv: {
        backgroundColor: "",
        marginBottom: "2rem",
    },

    gridDiv1: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        boxShadow: "0px 12px 20px #00000029",
        borderRadius: "10px",
        opacity: "1",
    },

    gridDiv2: {
        width: "100%",
        height: "100%",
    },
    // -------------------------------------------------------
    imgDivmain: {
        display: "flex",
        justifyContent: "center",
        marginTop: "2rem",
    },

    imgDiv: {
        borderRadius: "50%",
        height: "5rem",
        width: "5rem",
        // border: "solid 2px #565656"
    },

    cardText1: {
        marginTop: "1rem",
        textAlign: "center",
        font: "normal normal 500 1rem Poppins",
        textOverflow: "ellipsis",
        // height:"4rem"
    },

    cardText2: {
        marginTop: "0.2rem",
        textAlign: "center",
        font: "normal normal normal 13px/11px Poppins",
        textOverflow: "ellipsis",
        color: "#656565",
        // height:"2rem"
    },

    btnDiv: {
        height: "fit-content",
        marginTop: "1rem",
        textAlign: "center",
        marginBottom: "1rem"
    },

    btnfull: {
        fontSize: "0.8rem",
        width: "50%",
        textTransform: "capitalize",
        opacity: "1",
        color: "white",
        background: "var(--unnamed-color-136ee3) 0% 0% no-repeat padding-box",
        background: "#136EE3 0% 0% no-repeat padding-box",
        borderRadius: "18px",
        border: 0,
        outline: 'none',
    },
    // *********************************Modal CSS*********************************************************************************
    mainheading: {
        color: "var(--unnamed-color-136ee3)",
        textAlign: "left",
        font: "normal normal medium 25px/25px Poppins",
        letterSpacing: "0px",
        color: "#136EE3",
        opacity: "1",
        marginTop: '10px',
    },

    line: {
        height: "0.4vh",
        width: "4%",
        backgroundColor: "#136EE3",
        textAlign: "-webkit-end",
        marginTop: "-0.5vmax",
        opacity: "1",
    },

    area: {
        marginBottom: '10px',
    },

    heading1: {
        textAlign: "left",
        font: "normal normal normal 16px/17px Poppins",
        letterSpacing: "0px",
        color: "#000000",
        opacity: "1",
    },

    heading2: {
        textAlign: "left",
        font: "normal normal normal 14px Poppins",
        letterSpacing: "0px",
        color: "#2b2b2b",
        opacity: "1",
    },
    //   ***********************************Modal Button***************************************

    modalbtnDiv: {
        // height: "fit-content",
        // textAlign:"center",
        marginTop: "1rem",
        width: "30%",
        display: "flex",
        justifyContent: "space-around",
    },

    verifyBtn: {
        background: "var(--unnamed-color-136ee3) 0% 0% no-repeat padding-box",
        background: "#136EE3 0% 0% no-repeat padding-box",
        borderRadius: "23px",
        fontSize: "0.8rem",
        width: "50%",
        textTransform: "capitalize",
        opacity: "1",
        color: "white",
        textAlign: "center",
        height: "2rem",
        border: 0,
        outline: 'none',
        marginRight: '10px'
    },

    rejectBtn: {
        background: "var(--unnamed-color-ff4238) 0% 0% no-repeat padding-box",
        background: "#FF4238 0% 0% no-repeat padding-box",
        borderRadius: "23px",
        opacity: "1",
        fontSize: "0.8rem",
        width: "50%",
        textTransform: "capitalize",
        color: "white",
        height: "2rem",
        border: 0,
        outline: 'none',
    },

    modalImgDiv: {
        // marginTop:"1rem",
        height: "5rem",
        width: "5rem",
        backgroundColor: "#ececec",
        borderRadius: "60%",
        border: "60%",
        // justify:"center"
        margin: "5px auto"
    },


}))

const Psychics = (props) => {
    const classes = useStyles();

    const [approved, setApproved] = useState([]);
    const [pending, setPending] = useState([]);
    const [rejected, setRejected] = useState([]);

    const [active, setActive] = useState('pending');

    const [profile, setProfile] = useState(null);
    const [showProfile, setShowProfile] = useState(false)

    useEffect(() => {
        getData();
    }, [])

    let getData = async () => {
        let psychics = await getPsychics();

        if (!psychics.error) {
            setPending(psychics.filter(p => !p.registered))
            setApproved(psychics.filter(p => p.registered === 1))
            setRejected(psychics.filter(p => p.registered === 2))
        }
    }

    let profileModalToggler = (data) => {
        if (!showProfile) {
            setProfile(data);
        }
        else {
            setProfile(null);
        }
        setShowProfile(!showProfile);
    }

    let verifyPsychicHandler = async (id, status) => {
        let res = await verifyPsychic(id, status);
        if (res.registered) {
            profileModalToggler();
            getData();
        }
    }

    return (

        <div>
            <Modal isOpen={showProfile} toggle={profileModalToggler}>
                <ModalBody>
                    {profile ?
                        <div>
                            <div className="head d-flex justify-content-between">
                                <div className="profile d-flex align-items-center">
                                    <div className={classes.modalImgDiv}>
                                        <img src={profile.image ? profile.image : UserIcon} alt="divimg" height="100%" width="100%" style={{ borderRadius: "50%", justify: "center", }} />
                                    </div>
                                    <div className="mx-3">
                                        <h4 className="name">{profile.personalInfo.firstName + ' ' + profile.personalInfo.lastName}</h4>
                                        <p className="name">{profile.personalInfo.title}</p>
                                    </div>
                                </div>
                                {!profile.registered ?
                                    <div className="col-md-4 buttons" className={classes.modalbtnDiv}>
                                        <Button className={classes.verifyBtn} onClick={() => verifyPsychicHandler(profile.id, 1)}>Approve</Button>
                                        <Button className={classes.rejectBtn} onClick={() => verifyPsychicHandler(profile.id, 2)}>Reject</Button>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                            <div className="row w-100 m-0 align-items-end">
                                <div className="col-md-10">
                                    <div className="info mt-2">

                                        <h2 className={classes.mainheading}>Basic Information</h2>
                                        <div className={classes.line}></div>
                                        <div className="row w-100 m-0 mt-4">
                                            <div className={`col-md-4 ${classes.area}`}>
                                                <label className={classes.heading1}>Language:</label>
                                                <div className={classes.heading2}>{profile.language? profile.language : 'N/A'}</div>
                                            </div>
                                            <div className={`col-md-8 ${classes.area}`}>
                                                <label className={classes.heading1}>Expertise:</label>
                                                <div className={classes.heading2}>{profile.experties.map((exp, index) => (index === profile.experties.length -1? exp : exp + ", "))}</div>
                                            </div>
                                            <div className={`col-md-12 ${classes.area}`}>
                                                <label className={classes.heading1}>Description:</label>
                                                <div className={classes.heading2}>{profile.description}</div>
                                            </div>
                                        </div>

                                        <h2 className={classes.mainheading}>Personal Information</h2>
                                        <div className={classes.line}></div>
                                        <div className="row w-100 m-0 mt-4">
                                            <div className={`col-md-4 ${classes.area}`}>
                                                <label className={classes.heading1}>Screen Name:</label>
                                                <div className={classes.heading2}>{profile.name}</div>
                                            </div>
                                            <div className={`col-md-4 ${classes.area}`}>
                                                <label className={classes.heading1}>Email:</label>
                                                <div className={classes.heading2}>{profile._id}</div>
                                            </div>
                                            <div className={`col-md-4 ${classes.area}`}>
                                                <label className={classes.heading1}>Title:</label>
                                                <div className={classes.heading2}>{profile.personalInfo.title}</div>
                                            </div>
                                            <div className={`col-md-4 ${classes.area}`}>
                                                <label className={classes.heading1}>Gender:</label>
                                                <div className={classes.heading2}>{profile.personalInfo.gender ? profile.personalInfo.gender : 'N/A'}</div>
                                            </div>
                                            <div className={`col-md-4 ${classes.area}`}>
                                                <label className={classes.heading1}>Date of Birth:</label>
                                                <div className={classes.heading2}>{profile.personalInfo.dob ? profile.personalInfo.dob : 'N/A'}</div>
                                            </div>
                                        </div>

                                        <h2 className={classes.mainheading}>Contact Information</h2>
                                        <div className={classes.line}></div>
                                        <div className="row w-100 m-0 mt-4">
                                            <div className={`col-md-4 ${classes.area}`}>
                                                <label className={classes.heading1}>Street:</label>
                                                <div className={classes.heading2}>{profile.contactInfo? profile.contactInfo.street : 'N/A'}</div>
                                            </div>
                                            <div className={`col-md-4 ${classes.area}`}>
                                                <label className={classes.heading1}>City:</label>
                                                <div className={classes.heading2}>{profile.contactInfo? profile.contactInfo.city : 'N/A'}</div>
                                            </div>
                                            <div className={`col-md-4 ${classes.area}`}>
                                                <label className={classes.heading1}>State/Province:</label>
                                                <div className={classes.heading2}>{profile.contactInfo? profile.contactInfo.state : 'N/A'}</div>
                                            </div>
                                            <div className={`col-md-4 ${classes.area}`}>
                                                <label className={classes.heading1}>Country:</label>
                                                <div className={classes.heading2}>{profile.contactInfo? profile.contactInfo.country : 'N/A'}</div>
                                            </div>
                                            <div className={`col-md-4 ${classes.area}`}>
                                                <label className={classes.heading1}>Phone No.:</label>
                                                <div className={classes.heading2}>{profile.contactInfo? profile.contactInfo.phone : 'N/A'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="fees-tab" style={{ background: "#21437E", color: "white", borderRadius: "5px", padding: '10px' }}>
                                        <p className="mb-0"><span className="mx-1">Fees:</span> $100</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        null
                    }
                </ModalBody>
            </Modal>
            <Sidebar />
            <Header title="Psychics" />
            <div className="main">

                <Grid container justify="center" className={classes.mainContainer}>
                    <Grid item xs={12} sm={4} md={2} lg={2} xl={2} >
                        <div className={active === 'pending'? classes.GridContainerActive : classes.GridContainer}>
                            <NavLink onClick={() => setActive('pending')} >Pending</NavLink>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={4} md={2} lg={2} xl={2} className={classes.navLink}>
                        <div className={active === 'approved'? classes.GridContainerActive : classes.GridContainer}>
                            <NavLink onClick={() => setActive('approved')}>Approved</NavLink>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={4} md={2} lg={2} xl={2}  >
                        <div className={active === 'rejected'? classes.GridContainerActive : classes.GridContainer}>
                            <NavLink onClick={() => setActive('rejected')}>Rejected</NavLink>
                        </div>
                    </Grid>
                </Grid>
                {/************************************************************************************************* */}
                <TabContent activeTab={active}>
                    <TabPane tabId="pending">
                        <div className={classes.mainDiv}>
                            <div className={classes.mainDiv1}>
                                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} justify="space-between">
                                    {pending.length > 0?
                                    <>
                                        {pending.map(p => (
                                            <Grid item xl={4} lg={4} md={4} sm={10} xs={10} className={classes.gridDiv}>
                                                <div className={classes.gridDiv1}>
                                                    <div className={classes.gridDiv2}>
                                                        <div className={classes.imgDivmain}>
                                                            <Card className={classes.imgDiv}>
                                                                <img src={p.image ? p.image : UserIcon} alt="divimg" height="100%" width="100%" style={{ borderRadius: "50%" }} />
                                                            </Card>
                                                        </div>

                                                        <div>
                                                            <div className={classes.cardText1}>
                                                                {/* <p> Dr. Syed Abbas Raza Shah Zaidi Zaidi Zaidi </p> */}
                                                                {p.name}
                                                            </div>
                                                        </div>

                                                        <div className={classes.btnDiv}>
                                                            <Button className={classes.btnfull} onClick={() => profileModalToggler(p)}>
                                                                {/* onClick={() => profileModalToggler(p)} */}
                                                                <span>View Profile</span>
                                                            </Button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </Grid>
                                        ))}
                                    </>
                                    :
                                    'No Record Found'
                                    }
                                </Grid>
                            </div>
                        </div>
                    </TabPane>
                    {/************************************************************************************************* */}
                    <TabPane tabId="approved">
                        <div className={classes.mainDiv}>
                            <div className={classes.mainDiv1}>
                                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} justify="space-between">
                                    {approved.length > 0?
                                    <>
                                        {approved.map(p => (
                                            <Grid item xl={4} lg={4} md={4} sm={10} xs={10} className={classes.gridDiv}>
                                                <div className={classes.gridDiv1}>
                                                    <div className={classes.gridDiv2}>
                                                        <div className={classes.imgDivmain}>
                                                            <Card className={classes.imgDiv}>
                                                                <img src={p.image ? p.image : UserIcon} alt="divimg" height="100%" width="100%" style={{ borderRadius: "50%" }} />
                                                            </Card>
                                                        </div>

                                                        <div>
                                                            <div className={classes.cardText1}>
                                                                {/* <p> Dr. Syed Abbas Raza Shah Zaidi Zaidi Zaidi </p> */}
                                                                {p.name}
                                                            </div>
                                                        </div>

                                                        <div className={classes.btnDiv}>
                                                            <Button className={classes.btnfull} onClick={() => profileModalToggler(p)}>
                                                                {/* onClick={() => profileModalToggler(p)} */}
                                                                <span>View Profile</span>
                                                            </Button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </Grid>
                                        ))}
                                    </>
                                    :
                                    'No Record Found'
                                    }
                                </Grid>
                            </div>
                        </div>
                    </TabPane>
                    {/********************************************************************************************************/}
                    <TabPane tabId="rejected">
                        <div className={classes.mainDiv}>
                            <div className={classes.mainDiv1}>
                                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} justify="space-between">
                                    {rejected.length > 0?
                                    <>
                                        {rejected.map(p => (
                                            <Grid item xl={4} lg={4} md={4} sm={10} xs={10} className={classes.gridDiv}>
                                                <div className={classes.gridDiv1}>
                                                    <div className={classes.gridDiv2}>
                                                        <div className={classes.imgDivmain}>
                                                            <Card className={classes.imgDiv}>
                                                                <img src={p.image ? p.image : UserIcon} alt="divimg" height="100%" width="100%" style={{ borderRadius: "50%" }} />
                                                            </Card>
                                                        </div>

                                                        <div>
                                                            <div className={classes.cardText1}>
                                                                {/* <p> Dr. Syed Abbas Raza Shah Zaidi Zaidi Zaidi </p> */}
                                                                {p.name}
                                                            </div>
                                                        </div>

                                                        <div className={classes.btnDiv}>
                                                            <Button className={classes.btnfull} onClick={() => profileModalToggler(p)}>
                                                                {/* onClick={() => profileModalToggler(p)} */}
                                                                <span>View Profile</span>
                                                            </Button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </Grid>
                                        ))}
                                    </>
                                    :
                                    'No Record Found'
                                    }
                                </Grid>
                            </div>
                        </div>
                    </TabPane>
                </TabContent>
            </div>
        </div>
    );
}

export default Psychics;
