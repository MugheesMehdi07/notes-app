from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import NoteListView, NoteDetailView, UserRegistrationView, CustomTokenObtainPairView, AudioUploadView

urlpatterns = [
    #user registration
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Notes CRUD
    path('notes/', NoteListView.as_view(), name='note_list'),
    path('notes/<int:pk>/', NoteDetailView.as_view(), name='note_detail'),

    # Audio Files
    path('notes/<int:note_id>/audio/', AudioUploadView.as_view(), name='audio-upload'),
]
