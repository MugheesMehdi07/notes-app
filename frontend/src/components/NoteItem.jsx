import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const NoteItem = ({ note, onEdit, onDelete }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{note.title}</Typography>
        <Typography>{note.content}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button onClick={onEdit} variant="outlined" size="small">
            Edit
          </Button>
          <Button onClick={onDelete} variant="outlined" color="error" size="small">
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NoteItem;
