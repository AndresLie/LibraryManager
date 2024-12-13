# Library Management Web

A Library Management Web to perform CRUD and View operation on Books in the library

## How to use

### Prerequisites

- Node.js 20
- React 18
- MongoDB

### Setup

#### 1. Clone the repository:

```bash
git clone https://github.com/AndresLie/LibraryManager.git
cd LibraryManager
```

#### 2. Backend & Database Setup

1. Create a .env file from the provided template

   ```bash
   cp template.env .env
   ```

2. Configure your MongoDB connection:

   - Run your MongoDB server locally or use a cloud service like MongoDB Atlas.
   - Add your connection string to the .env file:
     `MONGO_URI=mongodb://localhost:your_database_port/your_database_name`

3. Navigate to the backend directory and install dependencies

   ```
   cd backend
   npm i
   ```

4. In .env put the PORT number you wish the backend run on  
   `PORT=PORT_NUMBER`
5. Start the backend server

   ```
   nodemon index.js
   ```

#### 3. Frontend Setup

1. In a new terminal
   ```
   cd frontend
   ```
2. Create a .env file from the provided template

   ```bash
   cp template.env .env
   ```

3. Put your backend path to the VITE_API_URL
   `VITE_API_URL=backend_url`
4. Install dependencies

   ```
   npm i
   ```

5. Start the frontend
   ```
   npm run dev
   ```

Your Frontend should be running at localhost:5173
