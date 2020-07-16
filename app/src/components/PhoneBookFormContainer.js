import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'

import { snackbarService } from 'uno-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { createPhonebook } from "../redux";

import { createPhoneBookAPI } from '../api/phonebook'

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 999999999,
      color: '#fff',
    },
    fieldName: {
        width: "300px"
    },
    phoneInput: {
        marginTop: 25
    }
}));

const enhance = connect(
  (state, ownProps) => ({
    phonebook: ownProps.id ? state.phonebook[ownProps.id] : undefined,
  }),
  { createPhonebook }
);

const PhoneBookFormContainer = ({
  id,
  phonebook,
  createPhonebook,
  onClose,
  ...rest
}) => {
    const classes = useStyles();
    const [nameValidate, setNameValidate] = useState(false)
    const [creating, setCreating] = useState(false);
    const [intervalValue, setInterval] = useState(30)
    const [phone, setPhone] = useState('')

    const handleSubmit = useCallback(async e => {
        e.preventDefault();
        let data = {
            name: e.target.name.value,
            phone
        }
        let r
        try {
            r = await createPhoneBookAPI(data)
            data["id"] = r["id"]
            if (r.status === 200) createPhonebook(data);
        } catch(err) {
            snackbarService.showSnackbar(`Ops! ${err.message}!`, 'error');
        }
        onClose();
    }, [phone]);
    
    return (
        <Dialog
            {...rest}
            onClose={onClose}
            aria-labelledby="person-dialog-slide-title"
            fullWidth={false}
        >
            <Backdrop className={classes.backdrop} open={creating}>
                <CircularProgress color="inherit" />Creating
            </Backdrop>
            <form onSubmit={handleSubmit}>                
                <DialogTitle id="person-dialog-slide-title">
                    {id ? "Edit Contact" : "Create Contact"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        className={classes.fieldName}
                        error={ nameValidate === true }
                        helperText={ nameValidate ? "Your name is empty or duplicate." : ''}
                        name="name"
                        label="Name"
                        placeholder="Enter Your Name"
                        defaultValue={phonebook ? phonebook.name : ""}
                    />
                    
                    <PhoneInput
                        containerClass={classes.phoneInput}
                        country={'my'}
                        value={phone}
                        onChange={phone => setPhone(phone)}
                    />
                   
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" color="primary">
                    Add
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default enhance(PhoneBookFormContainer);
