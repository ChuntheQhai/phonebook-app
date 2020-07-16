import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import { useModal } from "react-modal-hook";
import PhoneBookFormContainer from "./PhoneBookFormContainer";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'block',
    color: "white"
  },
  alignItemsAndJustifyContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appBar: {
    backdropFilter: "blur(42px)"
  }
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [showCreateModal, hideCreateModal] = useModal(
    ({ in: open, onExited }) => (
      <PhoneBookFormContainer
        open={open}
        onExited={onExited}
        onClose={hideCreateModal}
      />
    )
  );
  
  return (
    <div className={classes.grow}>
      <AppBar color='transparent' className={classes.appBar}>
        <Toolbar className={classes.alignItemsAndJustifyContent}>
          <Typography className={classes.title} variant="h6">
            PhoneBook App
          </Typography>
          <Button onClick={showCreateModal} variant="contained" color="secondary">
            Add Contact
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}