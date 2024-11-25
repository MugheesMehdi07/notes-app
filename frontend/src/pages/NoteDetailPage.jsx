import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NoteForm from '../components/NoteForm';
import { useDispatch } from 'react-redux';
import { updateNote } from '../redux/slices/notesSlice';

const NoteDetailPage = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch the specific note details
    // Assume the backend provides a single note endpoint.
  }, [id]);

  const handleUpdateNote = (noteData) => {
    dispatch(updateNote({ id, noteData }));
  };

  return note ? <NoteForm onSubmit={handleUpdateNote} initialData={note} /> : <div>Loading...</div>;
};

export default NoteDetailPage;
