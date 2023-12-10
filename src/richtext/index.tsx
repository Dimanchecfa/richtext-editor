import React, { useEffect, useState } from "react";
import "./index.css";
import Toolbar from "../components/toolbar/toolbar";
import ImageResizer from "../components/image-resize";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";

export default function Editor() {
  const [isModalOpen, setModalOpen] = useState<any>(false);
  const [currentImage, setCurrentImage] = useState<any>(null);
  const [imageRect, setImageRect] = useState<any>(null);

  useEffect(() => {
    const editor = document.querySelector(".editor__content") as HTMLElement;
    editor.addEventListener("click", (e: any) => {
      if (e.target.tagName === "IMG") {
        setCurrentImage(e.target);
        e.target.style.outline = "2px solid #00bcd4";
        e.target.style.outlineOffset = "5px";
        setImageRect(e.target.getBoundingClientRect());
        setModalOpen(true);
      }
    });
  }, []);
  useEffect(() => {
    if (!currentImage) return;
  }, [currentImage]);

  const applyImageSize = (width: any, height: any, rotateDirection: any) => {
    if (currentImage) {
      currentImage.style.width = `${width}px`;
      currentImage.style.height = `${height}px`;

      let imageRotation = parseInt(currentImage.dataset.rotation);
      switch (rotateDirection) {
        case "right":
          if (imageRotation % 360 === 0 && imageRotation !== 0) {
            imageRotation = 0;
            currentImage.dataset.rotation = 0;
          }
          if (imageRotation === 360 || imageRotation > 360) {
            imageRotation = 0;
            currentImage.dataset.rotation = 0;
          }
          console.log( currentImage.dataset.rotation)
          currentImage.style.transform = `rotate(${imageRotation + 90}deg)`;
          break;
        case "left":
          imageRotation = parseInt(currentImage.dataset.rotation);
          // verifier si la rotation est un multiple de 360
          if (imageRotation % 360 === 0 && imageRotation !== 0) {
            imageRotation = 0;
            currentImage.dataset.rotation = 0;
          }
          // verifier si l'image a une rotation de 360
          if (imageRotation === 360 || imageRotation > 360) {
            imageRotation = 0;
            currentImage.dataset.rotation = 0;
          }
          currentImage.style.transform = `rotate(${imageRotation - 90}deg)`;
          break;
        default:
          break;
      }

 }
    // setModalOpen(false);
  };

  const insertImage = (file: any, editor: any) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = document.createElement("img") as any;
      img.className = "resizable";
      img.src = e.target.result;
      editor.appendChild(img);
    };
    reader.readAsDataURL(file);
  };


  useEffect(() => {
    const editor = document.querySelector(".editor__content") as HTMLElement;
    const textarea = document.querySelector(".editor__textarea") as HTMLElement;
    editor.addEventListener("input", () => {
      textarea.innerHTML = editor.innerHTML;
    });
    textarea.addEventListener("input", () => {
      editor.innerHTML = textarea.innerHTML;
    });
    hljs.highlightAll();
  }, []);


  return (
    <div className="editor-container">
      <ImageResizer
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onApply={applyImageSize}
        initialWidth={currentImage?.style.width}
        initialHeight={currentImage?.style.height}
        imageRect={imageRect}
        setImageRect={setImageRect}
        currentImage={currentImage}
      />
      <Toolbar insertImage={insertImage} />

      <div
        className="editor__content"
        contentEditable="true"
        suppressContentEditableWarning={true}
        style={{ resize: "vertical" }}
        // cette ligne permet de supprimer le warning de react qui dit que le contentEditable est une mauvaise pratique
      ></div>
      <textarea className="editor__textarea"></textarea>
    </div>
  );
}

// Path: src/components/toolbar/toolbar.tsx
