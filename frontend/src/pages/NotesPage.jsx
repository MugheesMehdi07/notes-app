import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, createNote, updateNote, deleteNote } from '../redux/slices/notesSlice';
import NotesList from '../components/NotesList';
import NoteForm from '../components/NoteForm';
import AudioRecorder from '../components/AudioRecorder';
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, Box } from '@mui/material';

const NotesPage = () => {
  const dispatch = useDispatch();
  const { items: notes, loading } = useSelector((state) => state.notes);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [showRecorder, setShowRecorder] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleSaveAudio = async (blob, noteId) => {
    const formData = new FormData();
    formData.append('file', blob);

    try {
      const response = await fetch(`http://localhost:8000/api/notes/${noteId}/audio/`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.ok) {
        alert('Audio uploaded successfully!');
        dispatch(fetchNotes()); // Refresh notes to include the new audio
      } else {
        alert('Failed to upload audio');
      }
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
        Create Note
      </Button>

      <NotesList
        notes={notes}
        onEdit={(note) => {
          setCurrentNote(note);
          setOpenDialog(true);
        }}
        onDelete={(id) => dispatch(deleteNote(id))}
        onRecord={(noteId) => {
          setCurrentNoteId(noteId);
          setShowRecorder(true);
        }}
      />

      {/* Recorder Dialog */}
      <Dialog open={showRecorder} onClose={() => setShowRecorder(false)}>
        <DialogTitle>Record Audio</DialogTitle>
        <DialogContent>
          <AudioRecorder
            onSave={(blob) => {
              handleSaveAudio(blob, currentNoteId);
              setShowRecorder(false);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Create/Edit Note Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{currentNote ? 'Edit Note' : 'Create Note'}</DialogTitle>
        <DialogContent>
          <NoteForm
            initialData={currentNote}
            onSubmit={(noteData) => {
              if (currentNote) {
                dispatch(updateNote({ id: currentNote.id, noteData }));
              } else {
                dispatch(createNote(noteData));
              }
              setOpenDialog(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default NotesPage;
