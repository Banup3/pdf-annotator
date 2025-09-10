import React, { useState, useEffect } from 'react';
import { getPDFs, uploadPDF } from '../api/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [pdfs, setPdfs] = useState([]);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

   useEffect(() => {
    getPDFs(token).then(res => setPdfs(res.data));
}, [token]); // Include token here


    const handleUpload = async () => {
        if (!file) return;
        await uploadPDF(file, token);
        const res = await getPDFs(token);
        setPdfs(res.data);
    };

    return (
        <div>
            <h1>My PDFs</h1>
            <input type="file" onChange={e => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
            <ul>
                {pdfs.map(pdf => (
                    <li key={pdf.uuid}>
                        {pdf.originalName}
                        <button onClick={() => navigate(`/pdf/${pdf.uuid}`)}>Open</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
