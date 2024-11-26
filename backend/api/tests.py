from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
from .models import Note, Audio
from io import BytesIO


class NotesAppTests(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Create a test user
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.token = self.client.post('/api/token/', {'username': 'testuser', 'password': 'testpassword'}).data[
            'access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

        # Create initial test notes
        self.note1 = Note.objects.create(user=self.user, title="Test Note 1", content="Test Content 1")
        self.note2 = Note.objects.create(user=self.user, title="Test Note 2", content="Test Content 2")

    # User Registration Tests
    def test_user_registration(self):
        response = self.client.post('/api/register/', {
            'username': 'newuser',
            'password': 'newpassword',
            'email': 'newuser@gmail.com',
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('message', response.data)

    # Authentication Tests
    def test_token_obtain_pair(self):
        response = self.client.post('/api/token/', {'username': 'testuser', 'password': 'testpassword'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_token_invalid_credentials(self):
        response = self.client.post('/api/token/', {'username': 'wronguser', 'password': 'wrongpassword'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # Notes API Tests
    def test_get_notes_list(self):
        response = self.client.get('/api/notes/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # Two notes created in setup

    def test_create_note(self):
        response = self.client.post('/api/notes/', {'title': 'New Note', 'content': 'New Content'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], 'New Note')
        self.assertEqual(response.data['content'], 'New Content')

    def test_get_note_detail(self):
        response = self.client.get(f'/api/notes/{self.note1.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.note1.title)

    def test_update_note(self):
        response = self.client.put(f'/api/notes/{self.note1.id}/',
                                   {'title': 'Updated Title', 'content': 'Updated Content'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Updated Title')
        self.assertEqual(response.data['content'], 'Updated Content')

    def test_delete_note(self):
        response = self.client.delete(f'/api/notes/{self.note1.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Note.objects.count(), 1)  # One note should remain

    # Audio Upload Tests
    def test_upload_audio(self):
        # Create an in-memory file
        file_data = BytesIO(b"Test audio file content")
        file_data.name = "test_audio.wav"

        response = self.client.post(f'/api/notes/{self.note1.id}/audio/', {'file': file_data}, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Audio.objects.count(), 1)
        self.assertEqual(Audio.objects.first().note, self.note1)

    def test_upload_audio_no_file(self):
        response = self.client.post(f'/api/notes/{self.note1.id}/audio/')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)

    # Permissions Tests
    def test_unauthorized_access(self):
        # Remove authorization header
        self.client.credentials()

        response = self.client.get('/api/notes/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
