export default function FillColorToggle({ isFilled, toggleFill }) {
  return (
    <button
      onClick={toggleFill}
      title={`Fill: ${isFilled ? 'On' : 'Off'}`}
      style={{
        backgroundColor: isFilled ? '#007acc' : '#fff', // blue when active
        color: isFilled ? '#fff' : '#000',
        border: '2px solid #888',
        borderRadius: '30px',
        cursor: 'pointer',
        width: '40px',
        height: '40px',
        fontSize: '1.1rem',
        transition: 'all 0.2s ease-in-out',
      }}
    >
      🎨
    </button>
  );
}
