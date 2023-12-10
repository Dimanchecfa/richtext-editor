import { useEffect, useState } from "react";
import "./index.css";
import {
  BiAlignJustify,
  BiAlignRight,
  BiLandscape,
  BiRuler,
} from "react-icons/bi";

function ImageResizer({
  isOpen,
  onClose,
  onApply,
  initialWidth,
  initialHeight,
  imageRect,
  setImageRect,
  currentImage,
}: any) {
  const [width, setWidth] = useState<any>(initialWidth);
  const [height, setHeight] = useState<any>(initialHeight);
  const [style, setStyle] = useState<any>({});


  const handleClick = (toolbar: any) => {
    if (toolbar.command === "rotateRight") {
      onApply(width, height , "right");
      setImageRect(currentImage?.getBoundingClientRect());
        return;
    }
    if (toolbar.command === "rotateLeft") {
      onApply(width, height , "left");
        setImageRect(currentImage?.getBoundingClientRect());
        return;
    }
    document.execCommand(toolbar.command, false, "");
  };

  const [toolbars, setToolbars] = useState<any>([
    {
      key: "L",
      title: "Left",
      command: "justifyLeft",
      icon: () => <BiAlignJustify width={14} height={14} />,
    },
    {
        key : "C",
        title : "Center",
        command : "justifyCenter",
        icon : () => <BiAlignJustify width={14} height={14} />
    },
    {
      key: "R",
      title: "Right",
      command: "justifyRight",
      icon: () => <BiAlignRight width={14} height={14} />,
    },

    {
      key: "RL",
      title: "Rotate Left",
      command: "rotateLeft",
      icon: () => <BiLandscape width={14} height={14} />,
    },
    {
      key: "RR",
      title: "Rotate Right",
      command: "rotateRight",
      icon: () => <BiRuler width={16} height={16} />,
    },
  ]);

  useEffect(() => {
    if (!currentImage) return;
    const imageRect = currentImage.getBoundingClientRect();
    setImageRect(imageRect);
    setWidth(currentImage.width);
    setHeight(currentImage.height);
    setStyle({
      top: `${imageRect.top - 50}px`,
      left: `${imageRect.left}px`,
    });
  },[currentImage]);

  return (
    isOpen && (
      <div className="tooltip" style={style}>
        <div className="tooltip-content">
          {toolbars.map((toolbar: any) => (
            <ToolTipButton
              key={toolbar.key}
              icon={toolbar.icon(toolbar)}
              onClick={() => handleClick(toolbar)}
            />
          ))}
        </div>
      </div>
    )
  );
}

const ToolTipButton = ({ icon, onClick }: any) => {
  return (
    <button className="tooltip-button" onClick={onClick}>
      {icon}
    </button>
  );
};

export default ImageResizer;
