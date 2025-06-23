'use client';

import { useRef, useState, useEffect } from 'react';

import PenTool from '../Toolbar/PenTool';
import ColorPicker from '../Toolbar/ColorPicker';
import UndoButton from '../Toolbar/UndoButton';
import ShapeSelector from '../Toolbar/ShapeTool';
import SelectTool from '../Toolbar/SelectTool';
import FillColorToggle from '../Toolbar/FillColor';


export default function Whiteboard() {
      const canvasRef = useRef(null);
      const penSizeRef = useRef(null);
      const [drawing, setDrawing] = useState(false);
      const [penSize, setPenSize] = useState(5);
      const [penColor, setPenColor] = useState('#000000');
      const [strokeColor, setStrokeColor] = useState('#000000');
      const [tool, setTool] = useState('pen');
      const [strokes, setStrokes] = useState([]);
      const [startPoint, setStartPoint] = useState(null);
      const [currentEndPoint, setCurrentEndPoint] = useState(null);
      const [selectedId, setSelectedId] = useState(null);
      const [isDragging, setIsDragging] = useState(false);
      const [dragOffset, setDragOffset] = useState(null);
      const [activeHandle, setActiveHandle] = useState(null);
      const [showPenSizeSelector, setShowPenSizeSelector] = useState(false);
      const [isFilled, setIsFilled] = useState(false);
      const [fillColor, setFillColor] = useState('#000000'); // new state
      const skipNextClickRef = useRef(false);





  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Delete' && selectedId !== null) {
        setStrokes((prev) => prev.filter((s) => s.id !== selectedId));
        setSelectedId(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedId]);

  useEffect(() => {
    redrawCanvas();
  }, [strokes, selectedId, currentEndPoint]);

  useEffect(() => {
  if (tool !== 'pen') setShowPenSizeSelector(false);
}, [tool]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        penSizeRef.current &&
        !penSizeRef.current.contains(event.target)
      ) {
        setShowPenSizeSelector(false);
      }
    };

    if (showPenSizeSelector) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPenSizeSelector]);



const redrawCanvas = () => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  strokes.forEach((stroke) => {
    if (Array.isArray(stroke)) {
      
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      stroke.forEach((point) => {
        ctx.strokeStyle = point.color;
        ctx.lineWidth = point.size;
        ctx.lineTo(point.x, point.y);
      });
      ctx.lineCap = 'round';
      ctx.stroke();
    } else {
   
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;

      if (stroke.type === 'square') {
        if (stroke.filled && stroke.fillColor) {
          ctx.fillStyle = stroke.fillColor;
          ctx.fillRect(
            stroke.start.x,
            stroke.start.y,
            stroke.end.x - stroke.start.x,
            stroke.end.y - stroke.start.y
          );
        }
        ctx.strokeRect(
          stroke.start.x,
          stroke.start.y,
          stroke.end.x - stroke.start.x,
          stroke.end.y - stroke.start.y
        );
      } else if (stroke.type === 'circle') {
        const centerX = (stroke.start.x + stroke.end.x) / 2;
        const centerY = (stroke.start.y + stroke.end.y) / 2;
        const radiusX = Math.abs(stroke.end.x - stroke.start.x) / 2;
        const radiusY = Math.abs(stroke.end.y - stroke.start.y) / 2;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        if (stroke.filled && stroke.fillColor) {
          ctx.fillStyle = stroke.fillColor;
          ctx.fill();
        }
        ctx.stroke();
      } else if (stroke.type === 'arrow') {
        drawArrow(ctx, stroke.start.x, stroke.start.y, stroke.end.x, stroke.end.y);
      }

      
      if (stroke.id === selectedId) {
        const { x, y, width, height } = stroke.boundingBox;
        ctx.save();
        ctx.lineWidth = 2;
        ctx.setLineDash([]);
        ctx.strokeStyle = '#00aaff';
        ctx.strokeRect(x, y, width, height);

        const handleSize = 8;
        const handles = [
          { name: 'tl', cx: x, cy: y },
          { name: 'tr', cx: x + width, cy: y },
          { name: 'bl', cx: x, cy: y + height },
          { name: 'br', cx: x + width, cy: y + height },
          { name: 't', cx: x + width / 2, cy: y },
          { name: 'b', cx: x + width / 2, cy: y + height },
          { name: 'l', cx: x, cy: y + height / 2 },
          { name: 'r', cx: x + width, cy: y + height / 2 },
        ];

        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        handles.forEach(({ cx, cy }) => {
          ctx.fillRect(cx - handleSize / 2, cy - handleSize / 2, handleSize, handleSize);
        });
        ctx.restore();
      }
    }
  });


  if (startPoint && currentEndPoint && ['square', 'circle', 'arrow'].includes(tool)) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = penSize;

    if (tool === 'square') {
      const width = currentEndPoint.x - startPoint.x;
      const height = currentEndPoint.y - startPoint.y;
      if (isFilled) {
        ctx.fillStyle = penColor;
        ctx.fillRect(startPoint.x, startPoint.y, width, height);
      }
      ctx.strokeRect(startPoint.x, startPoint.y, width, height);
    } else if (tool === 'circle') {
      const centerX = (startPoint.x + currentEndPoint.x) / 2;
      const centerY = (startPoint.y + currentEndPoint.y) / 2;
      const radiusX = Math.abs(currentEndPoint.x - startPoint.x) / 2;
      const radiusY = Math.abs(currentEndPoint.y - startPoint.y) / 2;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
      if (isFilled) {
        ctx.fillStyle = penColor;
        ctx.fill();
      }
      ctx.stroke();
    } else if (tool === 'arrow') {
      drawArrow(ctx, startPoint.x, startPoint.y, currentEndPoint.x, currentEndPoint.y);
    }
  }
};

const startDrawing = (e) => {
  const { offsetX, offsetY } = e.nativeEvent;

  if (tool === 'select') {
    const s = strokes.find((s) => s.id === selectedId && !Array.isArray(s));
    if (s && s.boundingBox) {
      const { x, y, width, height } = s.boundingBox;
      const handleSize = 8;
      const handles = [
        { name: 'tl', cx: x, cy: y },
        { name: 'tr', cx: x + width, cy: y },
        { name: 'bl', cx: x, cy: y + height },
        { name: 'br', cx: x + width, cy: y + height },
        { name: 't', cx: x + width / 2, cy: y },
        { name: 'b', cx: x + width / 2, cy: y + height },
        { name: 'l', cx: x, cy: y + height / 2 },
        { name: 'r', cx: x + width, cy: y + height / 2 },
      ];

      for (const handle of handles) {
        if (
          offsetX >= handle.cx - handleSize &&
          offsetX <= handle.cx + handleSize &&
          offsetY >= handle.cy - handleSize &&
          offsetY <= handle.cy + handleSize
        ) {
          setActiveHandle(handle.name);
          return; // Start resizing
        }
      }

      if (
        offsetX >= x &&
        offsetX <= x + width &&
        offsetY >= y &&
        offsetY <= y + height
      ) {
        setIsDragging(true);
        setDragOffset({ dx: offsetX - x, dy: offsetY - y });
        return; // Start dragging
      }
    }
  }

  if (tool === 'pen') {
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setDrawing(true);
    setStrokes((prev) => [
      ...prev,
      [{ x: offsetX, y: offsetY, color: penColor, size: penSize }],
    ]);
  } else if (['square', 'circle', 'arrow'].includes(tool)) {
    setStartPoint({ x: offsetX, y: offsetY });
    setCurrentEndPoint({ x: offsetX, y: offsetY });
  }
};


const draw = (e) => {
  const { offsetX, offsetY } = e.nativeEvent;

  
  if (tool === 'select' && activeHandle && selectedId !== null) {
    setStrokes((prev) =>
      prev.map((s) => {
        if (s.id !== selectedId || Array.isArray(s)) return s;

        let newStart = { ...s.start };
        let newEnd = { ...s.end };

        // Adjust start/end based on which handle is active
        switch (activeHandle) {
          case 'tl':
            newStart.x = offsetX; newStart.y = offsetY; break;
          case 'tr':
            newEnd.x = offsetX; newStart.y = offsetY; break;
          case 'bl':
            newStart.x = offsetX; newEnd.y = offsetY; break;
          case 'br':
            newEnd.x = offsetX; newEnd.y = offsetY; break;
          case 't':
            newStart.y = offsetY; break;
          case 'b':
            newEnd.y = offsetY; break;
          case 'l':
            newStart.x = offsetX; break;
          case 'r':
            newEnd.x = offsetX; break;
        }

      
        const boundingBox = {
          x: Math.min(newStart.x, newEnd.x),
          y: Math.min(newStart.y, newEnd.y),
          width: Math.abs(newEnd.x - newStart.x),
          height: Math.abs(newEnd.y - newStart.y),
        };

        return {
          ...s,
          start: newStart,
          end: newEnd,
          boundingBox,
        };
      })
    );
    return;
  }


  if (tool === 'select' && isDragging && selectedId !== null) {
    moveShape(offsetX, offsetY);
    return;
  }


  if (tool === 'pen' && drawing) {
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(offsetX, offsetY);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.lineCap = 'round';
    ctx.stroke();

    setStrokes((prev) => {
      const updated = [...prev];
      updated[updated.length - 1].push({
        x: offsetX, y: offsetY,
        color: penColor, size: penSize,
      });
      return updated;
    });
    return;
  }

 
  if (startPoint) {
    setCurrentEndPoint({ x: offsetX, y: offsetY });
  }
};

  const stopDrawing = () => {
  setDrawing(false);
  setIsDragging(false);
  setActiveHandle(null);

  if (startPoint && currentEndPoint && ['square', 'circle', 'arrow'].includes(tool)) {
    const boundingBox = {
      x: Math.min(startPoint.x, currentEndPoint.x),
      y: Math.min(startPoint.y, currentEndPoint.y),
      width: Math.abs(currentEndPoint.x - startPoint.x),
      height: Math.abs(currentEndPoint.y - startPoint.y),
    };

    const newShape = {
      id: Date.now(),
  type: tool,
  start: startPoint,
  end: currentEndPoint,
  color: strokeColor,
  fillColor: isFilled ? penColor : null,
  size: penSize,
  boundingBox,
  filled: isFilled,
  };

    setStrokes((prev) => [...prev, newShape]);
    
  }

  setStartPoint(null);
  setCurrentEndPoint(null);
  setDragOffset(null);
};

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = strokes.length - 1; i >= 0; i--) {
      const s = strokes[i];
      if (!Array.isArray(s) && s.boundingBox) {
        const { x: bx, y: by, width, height } = s.boundingBox;
        const inside = x >= bx && x <= bx + width && y >= by && y <= by + height;

        if (inside) {
          if (isFilled) {
            const updatedShape = {
              ...s,
              filled: true,
              fillColor: penColor,
            };
            setStrokes((prev) => {
              const newStrokes = [...prev];
              newStrokes[i] = updatedShape;
              return newStrokes;
            });
            return;
          } else {
            setSelectedId(s.id);
            return;
          }

        }
      }
    }

    setSelectedId(null);
  };

const moveShape = (x, y) => {
  setStrokes((prev) =>
    prev.map((s) => {
      if (s.id !== selectedId || Array.isArray(s)) return s;

      const width = s.end.x - s.start.x;
      const height = s.end.y - s.start.y;

      const newStart = {
        x: x - dragOffset.dx,
        y: y - dragOffset.dy,
      };
      const newEnd = {
        x: newStart.x + width,
        y: newStart.y + height,
      };

      const finalStart = {
        x: Math.min(newStart.x, newEnd.x),
        y: Math.min(newStart.y, newEnd.y),
      };
      const finalEnd = {
        x: Math.max(newStart.x, newEnd.x),
        y: Math.max(newStart.y, newEnd.y),
      };

      const boundingBox = {
        x: finalStart.x,
        y: finalStart.y,
        width: finalEnd.x - finalStart.x,
        height: finalEnd.y - finalStart.y,
      };

      return {
        ...s,
        start: finalStart,
        end: finalEnd,
        boundingBox,
      };
    })
  );
};

  const undo = () => {
    setStrokes((prev) => prev.slice(0, -1));
    setSelectedId(null);
  };

  const drawArrow = (ctx, fromX, fromY, toX, toY) => {
    const headLength = 10;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
  };



return (
  <>
    <style>{`
      @media (max-width: 768px) {
  .whiteboard-container {
    flex-direction: column-reverse !important;
    height: 450px !important;
    overflow: hidden !important;
  }

  .toolbar {
    flex-direction: row !important;
    flex-wrap: wrap;
    border-right: none !important;
    border-top: 2px solid #999;
    width: 100%;
    justify-content: center;
    padding: 0.5rem !important;
    gap: 0.8rem !important;
    background: #ddd;
    height: 80px !important; 
    z-index: 1;
  }

  .canvas-wrapper {
    width: 100%;
    flex-grow: 1;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  canvas {
    width: 100% !important;
    height: 100% !important;
    max-height: 100% !important;
  }
}

    `}</style>

    <div
      className="whiteboard-container"
      style={{
        display: 'flex',
        flexDirection: 'row',
        minHeight: '450px',
        background: '#b3b3b3',
        borderRadius: '5px',
        overflow: 'hidden',
      }}
    >
      <div
        className="toolbar"
        style={{
          
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          background: '#ddd',
          padding: '1rem 0.5rem',
          borderRight: '2px solid #999',
          height: 'auto',
          zIndex: 10,
          
          position: 'relative',
        }}
      >
        <SelectTool activeTool={tool} setActiveTool={setTool} />
        <PenTool
          tool={tool}
          setTool={() => {
            setTool('pen');
            setShowPenSizeSelector((prev) => !prev);
          }}
        />
        {showPenSizeSelector && tool === 'pen' && (
          <div
            ref={penSizeRef}
            style={{
              background: '#fff',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              position: 'absolute',
              top: '110px',
              left: '60px',
              zIndex: 10,
              width: '170px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <label style={{ marginBottom: '0.5rem', fontSize: '14px', color: 'black' }}>Pen Size</label>
            <input
              type="range"
              min="1"
              max="30"
              value={penSize}
              onChange={(e) => setPenSize(parseInt(e.target.value))}
              style={{ width: '80%' }}
            />
            <span style={{ fontSize: '12px', marginTop: '0.3rem', color: 'black' }}>{penSize}px</span>
          </div>
        )}

        <ShapeSelector selectedShape={tool} onSelectShape={setTool} />
        <FillColorToggle
  isFilled={isFilled}
  toggleFill={() => {
    const lastShapeIndex = [...strokes]
      .reverse()
      .findIndex((s) => typeof s === 'object' && s.type !== 'pen');

    if (lastShapeIndex !== -1) {
      const realIndex = strokes.length - 1 - lastShapeIndex;

      setStrokes((prev) =>
        prev.map((s, i) => {
          if (i !== realIndex || Array.isArray(s)) return s;

          const newFilled = !s.filled;
          return {
            ...s,
            filled: newFilled,
            fillColor: newFilled ? penColor : null,
          };
        })
      );
    }

    setIsFilled((prev) => !prev); 
  }}
/>



        <ColorPicker
  penColor={penColor}
  setPenColor={(color) => {
    setPenColor(color);
    if (!isFilled) {
      setStrokeColor(color); 
    }
  }}
/>
        <UndoButton onUndo={undo} />
      </div>

      <div
        className="canvas-wrapper"
        style={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
          minHeight: '300px',
        }}
      >
        <canvas
          ref={canvasRef}
          width={900}
          height={415}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onClick={handleCanvasClick}
          style={{
            width: '100%',
            height: '100%',
            background: 'white',
            cursor: 'crosshair',
            boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
            borderRadius: '8px',
          }}
        />
      </div>
    </div>
  </>
);

}

 