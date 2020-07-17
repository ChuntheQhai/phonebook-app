import React, { useEffect } from "react";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import PhoneBookContainer from "./PhoneBookContainer";
import { makeStyles } from '@material-ui/core/styles';
import { getPhoneBookAPI } from '../api/phonebook'
import { createPhonebook } from "../redux";

const useStyles = makeStyles({
  root: {
    marginTop: 76,
  },
  AutoGrid: {
    display: "flex"
  }
});

const enhance = connect(
  state => ({
    ids: Object.keys(state.phonebook)
      .filter(id => state.phonebook[id])
      .reverse()
  }),
  { createPhonebook }
);

const PhoneBookListContainer = ({ ids, createPhonebook }) => {
  const classes = useStyles();
  useEffect(async() => {
    let resultList = await getPhoneBookAPI()
    if (resultList && resultList.data && resultList.data.length > 0) {
      resultList.data.map(d => { createPhonebook(d) })
    }
  }, [])

  return (
    <div className={classes.root}>
      <Grid container spacing={1} className={classes.AutoGrid}>
        {ids.map(id => (
          <PhoneBookContainer key={id} id={id} />
        ))}
      </Grid>
    </div>
  );
};

export default enhance(PhoneBookListContainer);
