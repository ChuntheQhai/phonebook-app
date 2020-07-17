import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";

import {
  FiCard,
  FiCardActionArea,
  FiCardActions,
  FiCardContent,
  FiCardMedia
} from "../styles/FullImageCard";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 14,
    color: "white"
  },
  updated: {
    float: "right",
    color: "white"
  },
  paper: {
    borderRadius: 0,
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 44
  },
  fiCardContent: {
    color: "#ffffff",
    backgroundColor: "rgba(0,0,0,.24)"
  },
  cardAction: {
    padding: 0
  },
  callBtn: {
    zIndex: 1,
    width: "100%"
  },
  imageButtonWrapper: {
    height: "100%",
    width: "100%",
    position: "absolute",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "baseline",
    zIndex: 1
  },
  removeIcon: {
    width: 100,
    height: 100
  },
  removeBtn: {
    zIndex: 2,
    position: "relative",
    fontSize: "2em",
    padding: "5px",
    color: "white",
    cursor: "pointer"
  },
  name: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "42px"
    },
    [theme.breakpoints.between("sm", "md")]: {
      fontSize: "42px"
    },
  },
  phone: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "33px"
    },
    [theme.breakpoints.between("sm", "md")]: {
      fontSize: "33px"
    },
  }
}));

const PhoneBookCard = ({ phonebook, showConfirmModal }) => {
  const classes = useStyles();

  const callNow = () => {
    window.open(`tel:${phonebook.phone}`, '_self')
  }
  return (
    <FiCard>
      <div className={classes.imageButtonWrapper}>
        <DeleteIcon
          iconStyle={classes.removeIcon}
          className={classes.removeBtn}
          onClick={showConfirmModal}  />
      </div>
      <FiCardActionArea onClick={() => alert('hello')} >
        <FiCardMedia
          media="picture"
          image={`/images/contact.jpg`}
        />
        <FiCardContent className={classes.fiCardContent}>
          <Typography variant="h1" className={classes.name} style={{ marginTop: 15 }}>
            {`${phonebook.name}`}
          </Typography>
          
          <Typography variant="h2" className={classes.phone} style={{ marginTop: 15 }}>
            {`+${phonebook.phone}`}
          </Typography>
        </FiCardContent>
      </FiCardActionArea>
      <FiCardActions className={classes.cardAction}>
        <Button className={classes.callBtn} href={`tel:+${phonebook.phone}`}>
          Call Now
        </Button>
      </FiCardActions>
    </FiCard>
  )
}
export default PhoneBookCard;