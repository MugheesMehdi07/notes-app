import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, createNote, updateNote, deleteNote } from '../redux/slices/notesSlice';
import NotesList from '../components/NotesList';
import NoteForm from '../components/NoteForm';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material';

const NotesPage = () => {
  const dispatch = useDispatch();
  const { items: notes, loading } = useSelector((state) => state.notes);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, id: null });

  // Fetch notes on component mount
  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  // Open dialog for creating or editing a note
  const handleOpenDialog = (note = null) => {
    setCurrentNote(note);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentNote(null);
  };

  // Submit note creation or update
  const handleSubmitNote = (noteData) => {
    if (currentNote) {
      dispatch(updateNote({ id: currentNote.id, noteData }));
    } else {
      dispatch(createNote(noteData));
    }
    handleCloseDialog();
  };

  // Open delete confirmation dialog
  const handleOpenDeleteConfirmation = (id) => {
    setDeleteConfirmation({ open: true, id });
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmation({ open: false, id: null });
  };

  // Confirm delete note
  const handleConfirmDelete = () => {
    dispatch(deleteNote(deleteConfirmation.id));
    handleCloseDeleteConfirmation();
  };

  if (loading) return <Box>Loading...</Box>;

  return (
    <Box sx={{ p: 4 }}>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
        Create Note
      </Button>

      <NotesList
        notes={notes}
        onEdit={handleOpenDialog}
        onDelete={handleOpenDeleteConfirmation}
      />

      {/* Create/Edit Note Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{currentNote ? 'Edit Note' : 'Create Note'}</DialogTitle>
        <DialogContent>
          <NoteForm
            initialData={currentNote}
            onSubmit={handleSubmitNote}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmation.open}
        onClose={handleCloseDeleteConfirmation}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this note?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NotesPage;
