// export default function PenSizeSelector({ penSize, setPenSize }) {
//   return (
//     <div>
//       <label style={{ marginRight: '0.5rem' ,color:'black'}}>Pen Size:</label>
//       <input
//         type="range"
//         min="1"
//         max="20"
//         value={penSize}
//         onChange={(e) => setPenSize(e.target.value)}
//       />
//     </div>
//   );
// }

'use client';

export default function PenTool({ tool, setTool }) {
  return (
    <button
      onClick={() => setTool('pen')}
      className={`tool-button ${tool === 'pen' ? 'active' : ''}`}
      title="Pen"
      style={{borderRadius: '20px',fontSize:'20px',padding:'0.3rem',cursor:'pointer'}}
    >
      🖊️
    </button>
  );
}
