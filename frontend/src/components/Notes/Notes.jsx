import React, { useState } from 'react'
import './Notes.css'

const Notes = () => {
  const [selectedPdf, setSelectedPdf] = useState(null)

  const handlePdfClick = (pdfPath) => {
    setSelectedPdf(pdfPath)
  }

  return (
    <div className="notes-container">
      <h2>Non Pharma</h2>
      <button onClick={() => handlePdfClick('/All non Pharma.pdf')}>
        View Non Pharma Notes
      </button>

      <h2>Pharma</h2>
      <button onClick={() => handlePdfClick('/notes.pdf')}>
        View Pharma Notes
      </button>

      <h2>Calculations</h2>
      <button onClick={() => handlePdfClick('/notes-2.pdf')}>
        View Calculations Notes
      </button>

      <h2>Work Regulations</h2>
      <button onClick={() => handlePdfClick('/Rx-NAPLEX.pdf')}>
        View Work Regulations Notes
      </button>

      {selectedPdf && (
        <div className="pdf-viewer">
          <iframe
            src={selectedPdf}
            title="PDF Viewer"
            width="100%"
            height="500px"
          ></iframe>
        </div>
      )}
    </div>
  )
}

export default Notes
