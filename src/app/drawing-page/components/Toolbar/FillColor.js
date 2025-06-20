export default function FillColorToggle({ isFilled, toggleFill }) {
  return (
    <button
      onClick={toggleFill}
      title="Toggle Fill"
      style={{
        background: isFilled ? '#000' : '#fff',
        color: isFilled ? '#fff' : '#000',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        width: '35px',
        height: '40px',
        fontSize: '1.2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      }}
    >
      🎨
    </button>
  );
}
