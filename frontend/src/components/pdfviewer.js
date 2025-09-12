// import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import { getHighlights, getPDFs ,saveHighlight} from '../api/api';
// import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/build/pdf';
// import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';

// // Set the workerSrc to the imported worker
// GlobalWorkerOptions.workerSrc = pdfWorker;

// const PDFViewer = () => {
//   const { uuid } = useParams();
//   const token = localStorage.getItem('token');
//   const [fileUrl, setFileUrl] = useState('');
//   const [highlights, setHighlights] = useState([]);
//   const [pdfDoc, setPdfDoc] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     getPDFs(token).then(res => {
//       const pdf = res.data.find(p => p.uuid === uuid);
//       if (pdf) setFileUrl(`http://localhost:5000/uploads/${pdf.filename}`);
//     });

//     getHighlights(uuid, token).then(res => setHighlights(res.data));
//   }, [uuid, token]);

//   useEffect(() => {
//     if (!fileUrl) return;

//     const loadPDF = async () => {
//       const loadingTask = getDocument(fileUrl);
//       const pdf = await loadingTask.promise;
//       setPdfDoc(pdf);
//       renderPage(pdf, pageNumber);
//     };

//     loadPDF();
//   }, [fileUrl]);

//   // const renderPage = async (pdf, num) => {
//   //   const page = await pdf.getPage(num);
//   //   const canvas = canvasRef.current;
//   //   const context = canvas.getContext('2d');

//   //   const viewport = page.getViewport({ scale: 1.5 });
//   //   canvas.height = viewport.height;
//   //   canvas.width = viewport.width;

//   //   const renderContext = {
//   //     canvasContext: context,
//   //     viewport: viewport,
//   //   };

//   //   await page.render(renderContext).promise;
//   // };
//   const renderPage = async (pdf, num) => {
//   const page = await pdf.getPage(num);
//   const canvas = canvasRef.current;
//   const context = canvas.getContext('2d');

//   const viewport = page.getViewport({ scale: 1.5 });
//   canvas.height = viewport.height;
//   canvas.width = viewport.width;

//   const renderContext = {
//     canvasContext: context,
//     viewport: viewport,
//   };

//   await page.render(renderContext).promise;

//   // ✅ After rendering the page, draw the highlights
//   renderHighlights(context, viewport);
// };


//   const goToPrev = () => {
//     if (pageNumber <= 1) return;
//     const newPage = pageNumber - 1;
//     setPageNumber(newPage);
//     renderPage(pdfDoc, newPage);
//   };

//   const goToNext = () => {
//     if (!pdfDoc || pageNumber >= pdfDoc.numPages) return;
//     const newPage = pageNumber + 1;
//     setPageNumber(newPage);
//     renderPage(pdfDoc, newPage);
//   };
//   const [selection, setSelection] = useState(null);
//   const handleMouseDown = (e) => {
//   const rect = canvasRef.current.getBoundingClientRect();
//   setSelection({
//     startX: e.clientX - rect.left,
//     startY: e.clientY - rect.top,
//     endX: null,
//     endY: null,
//   });
// };

// const handleMouseMove = (e) => {
//   if (!selection || selection.endX !== null) return;
//   const rect = canvasRef.current.getBoundingClientRect();
//   setSelection(prev => ({
//     ...prev,
//     endX: e.clientX - rect.left,
//     endY: e.clientY - rect.top,
//   }));
// };

// const handleMouseUp = async () => {
//   if (!selection) return;
  
//   const { startX, startY, endX, endY } = selection;
//   const x = Math.min(startX, endX);
//   const y = Math.min(startY, endY);
//   const width = Math.abs(startX - endX);
//   const height = Math.abs(startY - endY);

//   const text = window.prompt("Enter highlight text", ""); // Simple way to input text

//   if (text) {
//     const newHighlight = {
//       uuid: uuid,
//       page: pageNumber,
//       text: text,
//       x: x,
//       y: y,
//       width: width,
//       height: height,
//       timestamp: new Date().toISOString(),
//     };

//     // Call API to save highlight
//     try {
//       await saveHighlight(newHighlight, token); // Implement this API function
//       setHighlights(prev => [...prev, newHighlight]);
//     } catch (error) {
//       console.error("Failed to save highlight", error);
//     }
//   }

//   setSelection(null);
// };
//   const renderHighlights = (context, viewport) => {
//     highlights
//       .filter(h => h.page === pageNumber)
//       .forEach(h => {
//         context.save();
//         context.globalAlpha = 0.5;
//         context.fillStyle = 'yellow';
//         context.fillRect(h.x, h.y, h.width, h.height);
//         context.restore();
//       });
//   };

//   return (
//     <div>
//       {fileUrl ? (
//         <div>
//           <canvas
//   ref={canvasRef}
//   onMouseDown={handleMouseDown}
//   onMouseMove={handleMouseMove}
//   onMouseUp={handleMouseUp}
// />

//           <div>
//             <button onClick={goToPrev}>Previous</button>
//             <span> Page {pageNumber} </span>
//             <button onClick={goToNext}>Next</button>
//           </div>
//         </div>
//       ) : (
//         <p>Loading PDF...</p>
//       )}

//       <div>
//         <h3>Highlights:</h3>
//         {highlights.map((h, index) => (
//           <div key={index}>
//             Page {h.page}: {h.text}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PDFViewer;
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getHighlights, getPDFs, saveHighlight } from '../api/api';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/build/pdf';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';

// Set the workerSrc to the imported worker
GlobalWorkerOptions.workerSrc = pdfWorker;

const PDFViewer = () => {
    const { uuid } = useParams();
    const token = localStorage.getItem('token');
    const [fileUrl, setFileUrl] = useState('');
    const [highlights, setHighlights] = useState([]);
    const [pdfDoc, setPdfDoc] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const canvasRef = useRef(null);
    const [selection, setSelection] = useState(null);

    useEffect(() => {
        getPDFs(token).then(res => {
            const pdf = res.data.find(p => p.uuid === uuid);
            if (pdf) setFileUrl(`http://localhost:5000/uploads/${pdf.filename}`);
        });

        getHighlights(uuid, token).then(res => setHighlights(res.data));
    }, [uuid, token]);

    useEffect(() => {
        if (!fileUrl) return;

        const loadPDF = async () => {
            const loadingTask = getDocument(fileUrl);
            const pdf = await loadingTask.promise;
            setPdfDoc(pdf);
            renderPage(pdf, pageNumber);
        };

        loadPDF();
    }, [fileUrl]);

    const renderPage = async (pdf, num) => {
        const page = await pdf.getPage(num);
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = { canvasContext: context, viewport: viewport };
        await page.render(renderContext).promise;

        // Draw highlights after rendering the page
        renderHighlights(context, viewport);
    };

    const goToPrev = () => {
        if (pageNumber <= 1) return;
        const newPage = pageNumber - 1;
        setPageNumber(newPage);
        renderPage(pdfDoc, newPage);
    };

    const goToNext = () => {
        if (!pdfDoc || pageNumber >= pdfDoc.numPages) return;
        const newPage = pageNumber + 1;
        setPageNumber(newPage);
        renderPage(pdfDoc, newPage);
    };

    // Mouse event handlers
    const handleMouseDown = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        setSelection({
            startX: e.clientX - rect.left,
            startY: e.clientY - rect.top,
            endX: null,
            endY: null,
        });
    };

    const handleMouseMove = (e) => {
        if (!selection || selection.endX !== null) return;
        const rect = canvasRef.current.getBoundingClientRect();
        setSelection(prev => ({
            ...prev,
            endX: e.clientX - rect.left,
            endY: e.clientY - rect.top,
        }));
    };

    const handleMouseUp = async () => {
        if (!selection) return;

        const { startX, startY, endX, endY } = selection;
        const x = Math.min(startX, endX);
        const y = Math.min(startY, endY);
        const width = Math.abs(startX - endX);
        const height = Math.abs(startY - endY);

        const text = window.prompt("Enter highlight text", "");

        if (text) {
            const newHighlight = {
                uuid: uuid,
                page: pageNumber,
                text: text,
                x: x,
                y: y,
                width: width,
                height: height,
                timestamp: new Date().toISOString(),
            };

            try {
                await saveHighlight(newHighlight, token);
                setHighlights(prev => [...prev, newHighlight]);
                renderPage(pdfDoc, pageNumber); // Re-render to show new highlight
            } catch (error) {
                console.error("Failed to save highlight", error);
            }
        }

        setSelection(null);
    };

    const renderHighlights = (context, viewport) => {
        highlights
            .filter(h => h.page === pageNumber)
            .forEach(h => {
                context.save();
                context.globalAlpha = 0.5;
                context.fillStyle = 'yellow';
                context.fillRect(h.x, h.y, h.width, h.height);
                context.restore();
            });
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>PDF Viewer</h2>
            <div style={styles.canvasContainer}>
                {fileUrl ? (
                    <canvas
                        ref={canvasRef}
                        style={styles.canvas}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                    />
                ) : (
                    <p style={styles.loading}>Loading PDF...</p>
                )}
            </div>
            <div style={styles.controls}>
                <button onClick={goToPrev} style={styles.button}>Previous</button>
                <span style={styles.pageInfo}>Page {pageNumber}</span>
                <button onClick={goToNext} style={styles.button}>Next</button>
            </div>
            <div style={styles.highlightsSection}>
                <h3 style={styles.subheading}>Highlights</h3>
                {highlights.map((h, index) => (
                    <div key={index} style={styles.highlightItem}>
                        Page {h.page}: {h.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '900px',
        margin: '20px auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        textAlign: 'center',
        color: '#333',
    },
    canvasContainer: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    canvas: {
        border: '1px solid #ccc',
        borderRadius: '8px',
    },
    loading: {
        fontSize: '18px',
        color: '#777',
    },
    controls: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#3498db',
        color: 'white',
        cursor: 'pointer',
    },
    pageInfo: {
        fontSize: '16px',
        color: '#555',
    },
    highlightsSection: {
        marginTop: '20px',
    },
    subheading: {
        fontSize: '18px',
        color: '#333',
    },
    highlightItem: {
        backgroundColor: '#f0f0f0',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '8px',
    }
};

export default PDFViewer;
