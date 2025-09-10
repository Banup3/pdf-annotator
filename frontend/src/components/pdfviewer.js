import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHighlights } from '../api/api';
import { Document, Page } from 'react-pdf';

const PDFViewer = () => {
    const { uuid } = useParams();
    const token = localStorage.getItem('token');
    const [fileUrl] = useState(`http://localhost:5000/uploads/${uuid}`);
    const [highlights, setHighlights] = useState([]);

    useEffect(() => {
        getHighlights(uuid, token).then(res => setHighlights(res.data));
    }, [uuid, token]);

    return (
        <div>
            <Document file={fileUrl}>
                <Page pageNumber={1} />
            </Document>
            <div>
                {highlights.map((h, index) => (
                    <div key={index}>
                        Page {h.page}: {h.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PDFViewer;
