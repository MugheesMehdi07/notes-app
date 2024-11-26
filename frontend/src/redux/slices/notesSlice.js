import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api';


// Async Thunk: Fetch Notes
export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/notes/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch notes');
    }
  }
);

// Async Thunk: Create Note
export const createNote = createAsyncThunk(
  'notes/createNote',
  async (noteData, { rejectWithValue }) => {
    try {
      const response = await api.post('/notes/', noteData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create note');
    }
  }
);

// Async Thunk: Update Note
export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async ({ id, noteData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/notes/${id}/`, noteData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update note');
    }
  }
);

// Async Thunk: Delete Note
export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/notes/${id}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete note');
    }
  }
);

// Async Thunk: Upload Audio
export const uploadAudio = createAsyncThunk(
  'notes/uploadAudio',
  async ({ noteId, file }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post(`notes/${noteId}/audio/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return { noteId, audio: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to upload audio');
    }
  }
);


// Slice
const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {}, // For non-async actions if needed
  extraReducers: (builder) => {
    builder
      // Fetch Notes
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Note
      .addCase(createNote.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update Note
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.items.findIndex((note) => note.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete Note
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.items = state.items.filter((note) => note.id !== action.payload);
      })
      // Audio Upload
      .addCase(uploadAudio.fulfilled, (state, action) => {
        const { noteId, audio } = action.payload;
        const note = state.items.find((note) => note.id === noteId);
        if (note) {
          note.audio.push(audio);
        }
      });
  },

});

export default notesSlice.reducer;
