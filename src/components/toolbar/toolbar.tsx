import React, { useEffect, useState } from "react";
import "./index.css";
import cn from "classnames";
import { BiAlignJustify, BiAlignRight, BiBold, BiCode, BiFile, BiFullscreen, BiImageAdd, BiItalic, BiLandscape, BiListOl, BiListUl, BiParagraph, BiRedo, BiRuler, BiStrikethrough, BiUnderline, BiUndo } from "react-icons/bi";
import { FileIcon } from "../icons";



const ToolbarButton = ({ toolbar, onClick, isActive, isDragged } : any) => {
  return (
    <button
      className={cn("editor__toolbar-button", { active: isActive, dragged: isDragged })}
      onClick={() => onClick(toolbar)}
      draggable
      onDragStart={toolbar.onDragStart}
      onDragEnter={toolbar.onDragEnter}
      onDragEnd={toolbar.onDragEnd}
    >
      {toolbar.icon ? toolbar.icon(toolbar) : toolbar.key}
    </button>
  );
};


export default function Toolbar({ insertImage } : any )  {
  const [draggedIndex, setDraggedIndex] = useState<any>(null);
  const [activeTools, setActiveTools] = React.useState<any>([]);
  const [toolbars, setToolbars] = useState<any>([
    {
      key: "B",
      title: "Bold",
      command: "bold",
      icon: () => <BiFile style={{ width: "18px", height: "18px" }} />,
    },
    {
      key: "I",
      title: "Italic",
      command: "italic",
      icon: () => <BiItalic />,
    },
    {
      key: "U",
      title: "Underline",
      command: "underline",
      icon : () => <BiUnderline />
    },
    {
      key: "S",
      title: "Strike",
      command: "strikeThrough",
      icon : () => <BiStrikethrough />
    },
    // {
    //   key: "F",
    //   title: "Full Screen",
    //   command: "fullScreen",
    //   icon : () => <BiFullscreen />
    // },
    {
      key: "OL",
      title: "Ordered List",
      command: "insertOrderedList",
      icon: () => <BiListOl />,
    },
    {
      key: "UL",
      title: "Unordered List",
      command: "insertUnorderedList",
      icon : () => <BiListUl />
    },
    {
      key: "HR",
      title: "Horizontal Rule",
      command: "insertHorizontalRule",
      icon : () => <BiRuler />
    },
    {
      key: "L",
      title: "Left",
      command: "justifyLeft",
      icon : () => <BiAlignJustify />
    },
    {
      key: "C",
      title: "Center",
      command: "justifyCenter",
      icon : () => <BiAlignJustify />
    },
    {
      key: "R",
      title: "Right",
      command: "justifyRight",
      icon : () => <BiAlignRight />
    },
    {
      key: "J",
      title: "Justify",
      command: "justifyFull",
    },
    {
      key: "Undo",
      title: "Undo",
      command: "undo",
      icon : () => <BiUndo />
    },
    {
      key: "Redo",
      title: "Redo",
      command: "redo",
      icon : () => <BiRedo />
    },
    {
      key: "Insert Paragraph",
      title: "Insert Paragraph",
      command: "insertParagraph",
      icon : () => <BiParagraph />
    },
    {
      key: "Insert HTML",
      title: "Insert HTML",
      command: "insertHTML",
      icon : () => <BiCode />
    },
  ]);

  const handleDragStart = (toolbar: any) => {
    setDraggedIndex(toolbar);
  };

  const insertCodeBlock = () => {
    const code = '<span style="color: red">Hello World</span><br>'
    if (code) {
      document.execCommand('insertHTML', false, '<pre><code class="html">Votre code HTML ici</code></pre>');
    }
  };
  

  const handleDragEnter = (index: any) => {
    if (index === draggedIndex) return;
    const newToolbars = [...toolbars];
    const dragItem = newToolbars[draggedIndex];
    newToolbars.splice(draggedIndex, 1);
    newToolbars.splice(index, 0, dragItem);

    setDraggedIndex(index);
    setToolbars(newToolbars);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };
  

  const handleClick = (toolbar: any) => {
    return () => {
      document.execCommand(toolbar.command, false, "");
      if (activeTools.includes(toolbar.key)) {
        setActiveTools(activeTools.filter((item: any) => item !== toolbar.key));
      } else {
        setActiveTools([...activeTools, toolbar.key]);
      }
    };
  };

  useEffect(() => {
    document.execCommand("defaultParagraphSeparator", false, "p");
  }, []);
  const toogleFullScreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
          alert(`Erreur en tentant d'activer le mode plein écran: ${err.message} (${err.name})`);
        });
        // editor-container
        let editorContainer = document.querySelector(".editor-container") as HTMLElement;

        editorContainer.style.width = "100%";
        editorContainer.style.height = "100%";
        // annuler le max-width
        editorContainer.style.maxWidth = "100%";
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          // editor-container
          let editorContainer = document.querySelector(".editor-container") as HTMLElement;
          editorContainer.style.width = "100%";
          editorContainer.style.height = "100%";
          // annuler le max-width
          editorContainer.style.maxWidth = "600px";
          editorContainer.style.maxHeight = "400px";
        }
      }
  }

  const handleUpload = (e : any) => {
    const editor = document.querySelector(".editor__content") as HTMLElement;
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = (e : any) => {
        const file = e.target.files[0];
        insertImage(file , editor);
      };
      input.click();
  }




  return (
    <div className="editor__toolbar">
      <ToolbarButton
        toolbar={{ key: "FullScreen", icon: () => <BiFullscreen /> , onDragStart: () => handleDragStart(0), onDragEnter: () => handleDragEnter(0), onDragEnd: handleDragEnd }}
        onClick={toogleFullScreen}
        isActive={activeTools.includes("File")}
        isDragged={false}
      />
       <ToolbarButton
        toolbar={{ key: "Code", icon: () => <BiCode/> , onDragStart: () => handleDragStart(0), onDragEnter: () => handleDragEnter(0), onDragEnd: handleDragEnd }}
        onClick={insertCodeBlock}
        isActive={activeTools.includes("Code")}
        isDragged={false}
      />
      <ToolbarButton
        toolbar={{ key: "Image", icon: () => <BiImageAdd /> , onDragStart: () => handleDragStart(0), onDragEnter: () => handleDragEnter(0), onDragEnd: handleDragEnd }}
        onClick={handleUpload}
        isActive={activeTools.includes("Image")}
        isDragged={false}
      />
      {toolbars.map((toolbar : any, index : any) => (
      <ToolbarButton
        key={toolbar.key}
        toolbar={{ ...toolbar, onDragStart: () => handleDragStart(index), onDragEnter: () => handleDragEnter(index), onDragEnd: handleDragEnd }}
        onClick={handleClick(toolbar)}
        isActive={activeTools.includes(toolbar.key)}
        isDragged={index === draggedIndex}
      />
    ))}
      <select
        className="editor__toolbar-select"
        onChange={(e) => {
          document.execCommand("formatBlock", false, e.target.value);
        }}
      >
        <option value="p">Normal</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
      </select>
    </div>
  );
}
