
// import { Plus } from 'lucide-react';

// export default function SelectTool({ activeTool, setActiveTool }) {
//   return (
//     <button
//       className={`tool-button ${activeTool === 'select' ? 'active' : ''}`}
//       onClick={() => setActiveTool('select')}
//       title="Select"
//       style={{borderRadius: '10px'}}
//     >
//       <Plus />
//     </button>
//   );
// }


'use client';
import { Plus } from 'lucide-react';

export default function SelectTool({ activeTool, setActiveTool }) {
  return (
    <button
      onClick={() => setActiveTool('select')}
      className={`tool-button ${activeTool === 'select' ? 'active' : ''}`}
      title="Select"
      style={{borderRadius:'50%',fontSize:'24px',padding:'0.2rem',cursor:'pointer'}}
    >
      👆🏼
    </button>
  );
}
