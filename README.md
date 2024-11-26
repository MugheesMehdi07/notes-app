
# **Notes Application**

This is a full-stack Notes Application with a Django backend and a React frontend. The backend provides RESTful APIs for managing notes and associated audio files, while the frontend offers a user-friendly interface for interacting with the application.

---

## **Features**
- User authentication with JWT.
- CRUD operations for notes.
- Audio recording and playback linked to notes.

---

## **Prerequisites**
Ensure the following are installed on your system:

1. **Python** (Version 3.12 or later)
2. **Node.js** (Version 14 or later)
3. **npm** (Comes with Node.js)
4. **pip** (Python package manager)
5. **Git** (Optional, for cloning the repository)

---

## **Project Structure**
```plaintext
notes-app/
├── backend/       # Django project
│   ├── manage.py
│   ├── backend/   # Django settings and URLs
│   ├── db.sqlite3 # SQLite database (auto-created)
│   ├── ...
├── frontend/      # React project
│   ├── package.json
│   ├── src/
│   ├── ...
└── README.md      # This file
```

---

## **Setup Instructions**

### **1. Clone the Repository**

```bash
git clone https://github.com/MugheesMehdi07/notes-app.git
cd notes-app
```

---

### **2. Backend Setup**

Navigate to the `backend` directory:

```bash
cd backend
```

#### **2.1. Create a Virtual Environment**

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### **2.2. Install Backend Dependencies**

```bash
pip install -r requirements.txt
```

#### **2.3. Apply Migrations**

```bash
python manage.py migrate
```

#### **2.4. Create a Superuser (Optional)**

```bash
python manage.py createsuperuser
```

#### **2.5. Start the Development Server**

```bash
python manage.py runserver
```

The backend should now be running at [http://127.0.0.1:8000](http://127.0.0.1:8000).

---

### **3. Frontend Setup**

Open a new terminal window, navigate to the `frontend` directory:

```bash
cd frontend
```

#### **3.1. Install Frontend Dependencies**

```bash
npm install
```

#### **3.2. Configure API Base URL**

Ensure the `frontend/src/api.js` file is correctly configured to point to the backend:

```javascript
const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // Backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
```

#### **3.3. Start the React Development Server**

```bash
npm start
```

The frontend should now be running at [http://localhost:3000](http://localhost:3000).

---

## **Running the Full Application**

1. Start the **backend** (Django) server:
   ```bash
   python manage.py runserver
   ```

2. Start the **frontend** (React) development server:
   ```bash
   npm start
   ```

3. Open the application in your browser:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## **Testing the Application**

### **Backend Tests**

To run backend tests, execute the following command in the `backend` directory:

```bash
python manage.py test
```

### **Frontend Tests**

To run frontend tests, execute the following command in the `frontend` directory:

```bash
npm test
```

---

## **Troubleshooting**

1. **Backend Not Running**:
   - Ensure Python and `pip` are correctly installed.
   - Verify the virtual environment is activated.

2. **Frontend Not Running**:
   - Ensure Node.js and npm are installed.
   - Check if the `npm install` command completed without errors.

3. **CORS Errors**:
   - Ensure the `django-cors-headers` library is installed and configured in `backend/settings.py`:
     ```python
     INSTALLED_APPS += ["corsheaders"]
     MIDDLEWARE = ["corsheaders.middleware.CorsMiddleware"] + MIDDLEWARE
     CORS_ALLOWED_ORIGINS = ["http://localhost:3000"]
     ```

4. **Database Issues**:
   - If using SQLite, ensure `db.sqlite3` exists in the `backend` folder or apply migrations again:
     ```bash
     python manage.py migrate
     ```

---


