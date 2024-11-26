import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const NoteItem = ({ note, onEdit, onDelete, onRecord }) => {

  const getFullURL = (file) => {
  if (file.startsWith('/')) {
    return `http://localhost:8000${file}`;
  }
  return file;
  };


  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{note.title}</Typography>
        <Typography>{note.content}</Typography>

        {note?.audio_files && note?.audio_files?.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Audio Files:</Typography>
            {note.audio_files.map((audio) => (
              <Box key={audio.id} sx={{ mb: 1 }}>
                  <audio controls>
                        <source src={getFullURL(audio.file)} type="audio/wav" />
                         Your browser does not support the audio element.
                </audio>
              </Box>
            ))}
          </Box>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button onClick={onEdit} variant="outlined" size="small">
            Edit
          </Button>
          <Button onClick={onDelete} variant="outlined" color="error" size="small">
            Delete
          </Button>
          <Button onClick={onRecord} variant="outlined" size="small">
            Record Audio
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NoteItem;
