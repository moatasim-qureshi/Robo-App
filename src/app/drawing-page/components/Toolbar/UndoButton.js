// 'use client';

// export default function UndoButton({ onUndo }) {
//   return (
//     <button 
//       onClick={onUndo}
//       style={{ padding: '0.5rem 0.8rem', background: '#ff6961', color: 'white', border: 'none', 
//         borderRadius: '20px', cursor: 'pointer'}}
//     >
//       ↺
//     </button>
//   );
// }

'use client';

export default function UndoButton({ onUndo }) {
  return (
    <button
      onClick={onUndo}
      className="tool-button"
      title="Undo"
      style={{fontSize:'20px',borderRadius:'30px',padding:'0.3rem 0.6rem',cursor:'pointer'}}
    >
      ↺
    </button>
  );
}
