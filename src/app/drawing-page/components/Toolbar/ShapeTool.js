// 'use client';

// export default function ShapeSelector({ selectedShape, onSelectShape }) {
//   return (
//     <div style={{ display: 'flex', gap: '0.5rem' }}>
//       <button
//         onClick={() => onSelectShape('square')}
//         style={{
//           background: selectedShape === 'square' ? '#007bff' : '#eee',
//           color: selectedShape === 'square' ? '#fff' : '#000',
//           padding: '0.4rem',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: 'pointer',
//           marginLeft:'260px'
//         }}
//       >
//         ⬛
//       </button>

//       <button
//         onClick={() => onSelectShape('circle')}
//         style={{
//           background: selectedShape === 'circle' ? '#007bff' : '#eee',
//           color: selectedShape === 'circle' ? '#fff' : '#000',
//           padding: '0.4rem',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: 'pointer'
//         }}
//       >
//         ⚪
//       </button>

//       <button
//         onClick={() => onSelectShape('arrow')}
//         style={{
//           background: selectedShape === 'arrow' ? '#007bff' : '#eee',
//           color: selectedShape === 'arrow' ? '#fff' : '#000',
//           padding: '0.4rem',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: 'pointer'
//         }}
//       >
//         ➤
//       </button>
//     </div>
//   );
// }


'use client';

export default function ShapeTool({ selectedShape, onSelectShape }) {
  return (
    <>
      <button
        onClick={() => onSelectShape('square')}
        className={`tool-button ${selectedShape === 'square' ? 'active' : ''}`}
        title="Square"
        style={{fontSize: '16px',borderRadius:'50%',padding:'0.5rem',cursor:'pointer'}}
      >
        ⬜
      </button>

      <button
        onClick={() => onSelectShape('circle')}
        className={`tool-button ${selectedShape === 'circle' ? 'active' : ''}`}
        title="Circle"
        style={{fontSize: '16px',borderRadius:'50%',padding:'0.5rem',cursor:'pointer'}}
      >
        ⚪
      </button>

      <button
        onClick={() => onSelectShape('arrow')}
        className={`tool-button ${selectedShape === 'arrow' ? 'active' : ''}`}
        title="Arrow"
        style={{fontSize: '16px',borderRadius:'50%',padding:'0.5rem',cursor:'pointer'}}
      >
        ➤
      </button>
    </>
  );
}
