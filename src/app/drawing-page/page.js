'use client';

import Whiteboard from './components/Canvas/WhiteBoard';
import './drawing.css';

export default function MainPage() {
  return (
    <div className="canvas-main" style={{ backgroundColor: '#ccc', height: '100vh' }}>
      <div style={{ padding: '2rem' }}>
        <h1
          className="drawing-heading"
          style={{
            color: '#ff0000',
            fontWeight: '600',
            textAlign: 'center',
            paddingBottom: '7px',
            fontFamily: 'Bahnschrift',
            fontSize: '3rem',
            textShadow: '2px 2px 2px #fff',
            letterSpacing: '1px',
          }}
        >
          Drawing Pad
        </h1>

        <div
          style={{
            height: '5px',
            width: '100%',
            backgroundColor: '#ffa200',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        />
        <br />
        <Whiteboard />
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .drawing-heading {
            font-size: 1.8rem !important;
            padding-bottom: 4px !important;
          }

          .canvas-main {
            height: auto !important;
          }
        }
      `}</style>
    </div>
  );
}
