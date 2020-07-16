import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'

import Grid from '@material-ui/core/Grid';
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
        width: "100%"
    },
    phoneContainer: {
        marginTop: 25
    },
    phoneInput: {
        width: "100%!important"
    },
    phoneDropdown: {
        position: "fixed!important"
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
    const [nameError, setNameError] = useState(false)
    const [phoneError, setPhoneError] = useState(true)
    const [creating, setCreating] = useState(false);
    const [phone, setPhone] = useState('')

    const handleSubmit = useCallback(async e => {
        e.preventDefault();
        
        let name = (e.target && e.target.name) ? e.target.name.value : null
        if (!name) {
            setNameError(true)
            return;
        }

        if(phoneError) return;
        let data = {
            name: e.target.name.value,
            phone
        }

        let r
        try {
            setCreating(true)
            r = await createPhoneBookAPI(data)
            data["id"] = r["id"]
            if (r.status === 200) createPhonebook(data);
            setCreating(false)
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
                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.fieldName}
                            error={ nameError === true }
                            helperText={ nameError ? "Your name is empty." : ''}
                            name="name"
                            label="Name"
                            placeholder="Enter Your Name"
                            defaultValue={phonebook ? phonebook.name : ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <PhoneInput
                            containerClass={classes.phoneContainer}
                            inputClass={classes.phoneInput}
                            dropdownClass={classes.phoneDropdown}
                            country={'my'}
                            onlyCountries={['my']}
                            disableDropdown={true}
                            countryCodeEditable={false}
                            value={phone}
                            onChange={phone => setPhone(phone)}
                            isValid={(value, country) => {
                                if (phone !== '') {
                                    var str = value.trim().match(/\d/g);
                                    console.log(str.length)
                                    if (str && str.length >= 10) {
                                        setPhoneError(false)
                                        return true
                                    }
                                    else {
                                        setPhoneError(true)
                                        return 'Invalid value: '+ value
                                    }
                                }
                                return true
                            }}
                        />
                    </Grid>
                </Grid>
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
