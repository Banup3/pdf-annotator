import React, { useEffect, useState } from 'react';
import { getPDFs, renamePDF, deletePDF } from '../api/api';
import { useNavigate } from 'react-router-dom';

const MyLibrary = () => {
  const [pdfs, setPdfs] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    getPDFs(token).then(res => {
      setPdfs(res.data);
    });
  }, [token]);

  const handleOpen = (uuid) => {
    navigate(`/pdf/${uuid}`);
  };

  const handleRename = async (uuid) => {
    const newName = prompt('Enter new name');
    if (!newName) return;
    await renamePDF(uuid, newName, token);
    setPdfs(pdfs.map(pdf => pdf.uuid === uuid ? { ...pdf, originalName: newName } : pdf));
  };

  const handleDelete = async (uuid) => {
    if (!window.confirm('Are you sure you want to delete this PDF?')) return;
    await deletePDF(uuid, token);
    setPdfs(pdfs.filter(pdf => pdf.uuid !== uuid));
  };

  return (
    <div>
      <h2>My Library</h2>
      <ul>
        {pdfs.map(pdf => (
          <li key={pdf.uuid}>
            {pdf.originalName}
            <button onClick={() => handleOpen(pdf.uuid)}>Open</button>
            <button onClick={() => handleRename(pdf.uuid)}>Rename</button>
            <button onClick={() => handleDelete(pdf.uuid)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyLibrary;
