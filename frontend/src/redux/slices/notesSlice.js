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
      });
  },
});

export default notesSlice.reducer;
