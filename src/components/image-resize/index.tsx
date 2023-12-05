import { useState } from "react";
import "./index.css";


function ImageSizeModal({ isOpen, onClose, onApply, initialWidth, initialHeight } : any) {
  const [width, setWidth] = useState<any>(initialWidth);
  const [height, setHeight] = useState<any>(initialHeight);

  return (
      isOpen && 
      <div className="modal">
          <div className="modal-content">
              <span className="close" onClick={onClose}>&times;</span>
              <label>Width: <input type="number" value={width} onChange={e => setWidth(e.target.value)} /></label>
              <label>Height: <input type="number" value={height} onChange={e => setHeight(e.target.value)} /></label>
              <button onClick={() => onApply(width, height)}>Apply</button>
          </div>
      </div>
  );
}

export default ImageSizeModal;
