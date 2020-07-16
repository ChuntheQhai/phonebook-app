import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  FiCard,
  FiCardActionArea,
  FiCardActions,
  FiCardContent,
  FiCardMedia
} from "../styles/FullImageCard";

const useStyles = makeStyles({
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
  }
});

const PhoneBookCard = ({ phonebook, showConfirmModal }) => {
  const classes = useStyles();

  return (
    <FiCard>
      <div className={classes.imageButtonWrapper}>
        <DeleteIcon
          iconStyle={classes.removeIcon}
          className={classes.removeBtn}
          onClick={showConfirmModal}  />
      </div>
      <FiCardActionArea>
        <FiCardMedia
          media="picture"
          image={`/images/contact.jpg`}
        />
        <FiCardContent className={classes.fiCardContent}>
          <Typography variant="h1" component="h1" style={{ marginTop: 15 }}>
            {`${phonebook.name}`}
          </Typography>
          <Typography variant="h2" component="h2" style={{ marginTop: 15 }}>
            {`+${phonebook.phone}`}
          </Typography>
        </FiCardContent>
      </FiCardActionArea>
      <FiCardActions className={classes.cardAction}>
      </FiCardActions>
    </FiCard>
  )
}
export default PhoneBookCard;