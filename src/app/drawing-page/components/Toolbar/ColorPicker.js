'use client';

export default function ColorPicker({ penColor, setPenColor }) {
  return (
    <div
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        overflow: 'hidden',

        backgroundColor: penColor,

      }}
    >
      <input
        type="color"
        value={penColor}
        onChange={(e) => setPenColor(e.target.value)}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          padding: '0',
          margin: '0',
          borderRadius: '50%',
          background: 'none',
          cursor: 'pointer',
          appearance: 'none',
         
        }}
        title="Color Picker"
      />
    </div>
  );
}
