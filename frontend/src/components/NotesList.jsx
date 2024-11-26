import React from 'react';
import NoteItem from './NoteItem';
import { List } from '@mui/material';

const NotesList = ({ notes, onEdit, onDelete, onRecord }) => {
  return (
    <List>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onEdit={() => onEdit(note)}
          onDelete={() => onDelete(note.id)}
          onRecord={() => onRecord(note.id)}
        />
      ))}
    </List>
  );
};

export default NotesList;
