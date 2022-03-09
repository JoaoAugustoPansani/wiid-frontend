import React, { useRef, useState } from "react";

import { Box } from "@mui/system";
import TextField from '@mui/material/TextField';
import { Alert, Typography } from "@mui/material";
import Button from '@mui/material/Button';

const Login = (props) => {

    //Input values
    const [uname, setUname] = useState('');
    const [pass, setPass] = useState('');
    //Users
    const users = props.users;
    //Errors
    const errors = {
        uname: props.lang.invalidUserText,
        pass: props.lang.invalidPasswordText
    }
    //Login states
    const [errorMessages, setErrorMessages] = useState({});
    //Validate form submission
    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        //Find user login info 
        const userData = users.find((user) => user.username === uname);

        //Compare user info 
        if (userData) {
            if (userData.password !== pass) {
                //Invalid password
                setErrorMessages({ name: 'pass', message: errors.pass });
            } else {
                props.setIsSubmitted(true);
            }
        } else {
            //Username not found
            setErrorMessages({ name: 'uname', message: errors.uname });
        }
    };
    //Generate JSX for errors
    const renderErrorMessage = (name) => {
        return name === errorMessages.name && (
            <Alert severity="error">{errorMessages.message}</Alert>
        );
    }

    return <Box sx={{
        widht: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <Box
            sx={{
                width: '375px',
                height: '400px',
                boxShadow: '0 7px 30px -10px rgba(150,170,180,0.5)',
            }}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '30px'
                }}
                autoComplete="off">
                <Typography variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        color: props.theme.color,
                    }}>
                    {props.lang.loginTitle}
                </Typography>
                <Typography variant="subtitle2"
                    sx={{ mt: 1, color: props.theme.color, }}>
                    {props.lang.loginText}
                </Typography>
                <TextField
                    inputProps={{
                        style: { color: props.theme.color }
                    }}
                    label={props.lang.userInputText}
                    required
                    onInput={e => setUname(e.target.value)}
                    sx={{
                        mt: 4,
                        color: props.theme.color,
                        "& .MuiOutlinedInput-root": {
                            "& > fieldset": {
                                borderColor: props.theme.color
                            }
                        },
                        "& .MuiInputLabel-root": {
                            color: props.theme.color
                        }
                    }}
                />
                {renderErrorMessage("uname")}
                <TextField
                    inputProps={{
                        style: { color: props.theme.color }
                    }}
                    id="outlined-password-input"
                    label={props.lang.passwordInputText}
                    type="password"
                    autoComplete="current-password"
                    sx={{
                        mt: 3,
                        "& .MuiOutlinedInput-root": {
                            "& > fieldset": {
                                borderColor: props.theme.color
                            }
                        },
                        "& .MuiInputLabel-root": {
                            color: props.theme.color
                        }
                    }}
                    required
                    onInput={e => setPass(e.target.value)}
                />
                {renderErrorMessage("pass")}
                <Button variant="contained"
                    type="submit"
                    sx={{ mt: 4 }}>
                    Logar
                </Button>
            </Box>
        </Box>
    </Box>
};

export default Login;