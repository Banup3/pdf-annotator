// import React, { useState, useEffect } from 'react';
// import { getPDFs, renamePDF, deletePDF, uploadPDF } from '../api/api';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//     const [pdfs, setPdfs] = useState([]);
//     const [file, setFile] = useState(null);
//     const navigate = useNavigate();
//     const token = localStorage.getItem('token');

//     useEffect(() => {
//         getPDFs(token).then(res => {
//             setPdfs(res.data);
//         });
//     }, [token]);

//     const handleUpload = async () => {
//         if (!file) return;
//         await uploadPDF(file, token);
//         const res = await getPDFs(token);
//         setPdfs(res.data);
//     };

//     const handleRename = async (uuid) => {
//         const newName = prompt("Enter new name:");
//         if (!newName) return;
//         try {
//             await renamePDF(uuid, newName, token);
//             setPdfs(pdfs.map(pdf => pdf.uuid === uuid ? { ...pdf, originalName: newName } : pdf));
//         } catch (error) {
//             console.error("Rename failed", error);
//         }
//     };

//     const handleDelete = async (uuid) => {
//         if (!window.confirm("Are you sure you want to delete this PDF?")) return;
//         try {
//             await deletePDF(uuid, token);
//             setPdfs(pdfs.filter(pdf => pdf.uuid !== uuid));
//         } catch (error) {
//             console.error("Delete failed", error);
//         }
//     };

//     return (
//         <div>
//             <h1>My PDFs</h1>
//             <input type="file" onChange={e => setFile(e.target.files[0])} />
//             <button onClick={handleUpload}>Upload</button>
//             <ul>
//                 {pdfs.map(pdf => (
//                     <li key={pdf.uuid}>
//                         {pdf.originalName}
//                         <button onClick={() => navigate(`/pdf/${pdf.uuid}`)}>Open</button>
//                         <button onClick={() => handleRename(pdf.uuid)}>Rename</button>
//                         <button onClick={() => handleDelete(pdf.uuid)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Dashboard;
import React, { useState, useEffect } from 'react';
import { getPDFs, renamePDF, deletePDF, uploadPDF } from '../api/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [pdfs, setPdfs] = useState([]);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        getPDFs(token).then(res => {
            setPdfs(res.data);
        });
    }, [token]);

    const handleUpload = async () => {
        if (!file) return;
        await uploadPDF(file, token);
        const res = await getPDFs(token);
        setPdfs(res.data);
    };

    const handleRename = async (uuid) => {
        const newName = window.prompt('Enter new name:');
        if (!newName) return;
        await renamePDF(uuid, newName, token);
        const res = await getPDFs(token);
        setPdfs(res.data);
    };

    const handleDelete = async (uuid) => {
        if (!window.confirm('Are you sure you want to delete this PDF?')) return;
        await deletePDF(uuid, token);
        const res = await getPDFs(token);
        setPdfs(res.data);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>My PDF Library</h1>

            <div style={styles.uploadSection}>
                <input 
                    type="file" 
                    onChange={e => setFile(e.target.files[0])} 
                    style={styles.fileInput}
                />
                <button onClick={handleUpload} style={styles.uploadButton}>Upload PDF</button>
            </div>

            <ul style={styles.pdfList}>
                {pdfs.map(pdf => (
                    <li key={pdf.uuid} style={styles.pdfItem}>
                        <span style={styles.pdfName}>{pdf.originalName}</span>
                        <div style={styles.actions}>
                            <button onClick={() => navigate(`/pdf/${pdf.uuid}`)} style={styles.actionButton}>Open</button>
                            <button onClick={() => handleRename(pdf.uuid)} style={styles.actionButton}>Rename</button>
                            <button onClick={() => handleDelete(pdf.uuid)} style={{ ...styles.actionButton, backgroundColor: '#e74c3c' }}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '20px auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        textAlign: 'center',
        color: '#333',
    },
    uploadSection: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
        gap: '10px',
    },
    fileInput: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    uploadButton: {
        padding: '8px 16px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#3498db',
        color: 'white',
        cursor: 'pointer',
    },
    pdfList: {
        listStyleType: 'none',
        padding: 0,
    },
    pdfItem: {
        backgroundColor: '#f9f9f9',
        padding: '15px',
        marginBottom: '10px',
        borderRadius: '6px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    pdfName: {
        fontSize: '16px',
        color: '#333',
    },
    actions: {
        display: 'flex',
        gap: '10px',
    },
    actionButton: {
        padding: '6px 12px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: '#2ecc71',
        color: 'white',
    }
};

export default Dashboard;
