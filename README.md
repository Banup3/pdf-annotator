# pdf-annotator
# PDF Annotator

A full-stack PDF annotation tool that allows users to upload PDFs, highlight text, and save annotations. Built with **React**, **Node.js**, **Express**, and **MongoDB**.

---

## Features

- User authentication (Register/Login with JWT)
- PDF Upload and Viewer
- Highlighting text and saving highlights
- My Library: view, rename, and delete uploaded PDFs
- Persistent storage of annotations in MongoDB

---

## Technologies Used

- Frontend: React, pdfjs-dist
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT
- File Upload: Multer

---

## Prerequisites

- Node.js (v16+)
- MongoDB (local or cloud)
- Git

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Banup3/pdf-annotator.git
cd pdf-annotator
### 2.setup backend
cd backend
npm install
npm run dev
### 3.setup frontend
cd frontend
npm install
npm start

project-structure
pdf-annotator/
├── backend/          # Node.js + Express backend
├── frontend/         # React frontend
├── README.md         # Project instructions
