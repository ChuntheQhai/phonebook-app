import React from "react"
import { connect } from "react-redux"
import { useModal } from "react-modal-hook"
import Grid from '@material-ui/core/Grid'
import { removePhonebook } from "../redux"
import Dialog from "./Dialog"
import PhoneBookFormContainer from "./PhoneBookFormContainer"
import PhoneBookCard from "./PhoneBookCard"
import { deletePhoneBookAPI } from '../api/phonebook'
import { snackbarService } from 'uno-material-ui';

const enhance = connect(
  (state, ownProps) => ({
    phonebook: state.phonebook[ownProps.id]
  }),
  { removePhonebook }
);

const PhoneBookContainer = ({ id, phonebook, removePhonebook }) => {
  const [, hideEditModal] = useModal(({ in: open, onExited }) => (
    <PhoneBookFormContainer
      id={id}
      open={open}
      onExited={onExited}
      onClose={hideEditModal}
    />
  ));

  const [showConfirmModal, hideConfirmModal] = useModal(
    ({ in: open, onExited }) => (
      <Dialog
        open={open}
        onExited={onExited}
        title="Delete Contact?"
        confirmLabel="Delete"
        onConfirm={async () => {
          let r
          try {
            r = await deletePhoneBookAPI(id)
            if (r.status === 200) removePhonebook(id)
          } catch(err ){
            snackbarService.showSnackbar(`Ops! ${err.message}!`, 'error');
          }
        }}
        onCancel={hideConfirmModal}
      >
        Do you really want to delete {phonebook.name}?
      </Dialog>
    ),
    [phonebook]
  );
    
  return (
    <Grid item xs>
      <PhoneBookCard
        phonebook={phonebook}
        showConfirmModal={showConfirmModal}
      />
    </Grid>
  );
};

export default enhance(PhoneBookContainer);
