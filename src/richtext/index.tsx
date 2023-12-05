import React, { useEffect, useState } from 'react'
import "./index.css"
import Toolbar from '../components/toolbar/toolbar'
import ImageSizeModal from '../components/image-resize';

export default function Editor() {
  const [isModalOpen, setModalOpen] = useState<any>(false);
  const [currentImage, setCurrentImage] = useState<any>(null);

  useEffect(() => {
      const editor = document.querySelector(".editor__content") as HTMLElement;
      editor.addEventListener("click", (e : any) => {
          if (e.target.tagName === "IMG") {
              setCurrentImage(e.target);
              setModalOpen(true);
          }
      });
  }, []);

  const applyImageSize = (width : any, height : any
    ) => {
      if (currentImage) {
          currentImage.style.width = `${width}px`;
          currentImage.style.height = `${height}px`;
      }
      setModalOpen(false);
  };



  const insertImage = (file : any, editor : any) => {
    const reader = new FileReader();
    reader.onload = (e : any) => {
        const img = document.createElement('img') as any;
        img.setAttribute('data-dropped', 'true');
        img.addEventListener('dragstart', handleDragStart);
        img.className = 'resizable';
        img.src = e.target.result;
        editor.appendChild(img);
    };
    reader.readAsDataURL(file);
};
  useEffect(() => {
    const editor = document.querySelector(".editor__content") as HTMLElement;

    // Gérer le glisser-déposer
    const handleDrop = (e : any) => {
        e.preventDefault();
        e.stopPropagation();
        const dataTransfer = e.dataTransfer;
        const droppedFiles = dataTransfer.files;

    // Vérifiez si l'élément déplacé est déjà une image dans l'éditeur
    if (droppedFiles.length === 0) {
        const htmlData = dataTransfer.getData('text/html');
        const img = (new DOMParser()).parseFromString(htmlData, 'text/html').querySelector('img[data-dropped="true"]');
        
        if (img) {
            // Gérer le déplacement de l'image déjà présente dans l'éditeur
            // Vous pouvez par exemple changer sa position ou la supprimer de son emplacement précédent
            return;
        }
    }

    if (droppedFiles.length > 0) {
      Array.from(droppedFiles).forEach((file : any) => {
          if (file.type.startsWith('image/')) {
              insertImage(file, editor);
          }
      });
  }
    };

    const handleDragOver = (e : any) => {
        e.preventDefault();
    };

    editor.addEventListener('drop', handleDrop);
    editor.addEventListener('dragover', handleDragOver);

    return () => {
        // Nettoyage des événements
        editor.removeEventListener('drop', handleDrop);
        editor.removeEventListener('dragover', handleDragOver);
    };
}, []);

useEffect(() => {
  const editor = document.querySelector(".editor__content") as HTMLElement;
  
  const handleDrop = (e : any) => {
      e.preventDefault();

      // Récupérer le HTML de l'image déplacée
      const imageHTML = e.dataTransfer.getData('text/plain');
      if (imageHTML) {
          // Insérer l'image à l'endroit du dépôt
          const range = document.caretRangeFromPoint(e.clientX, e.clientY);
          if (range) {
              range.insertNode(document.createRange().createContextualFragment(imageHTML));
          }
      }
  };

  editor.addEventListener('drop', handleDrop);

  return () => {
      editor.removeEventListener('drop', handleDrop);
  };
}, []);

const handleDragStart = (e : any) => {
  e.dataTransfer.setData('text/plain', e.target.outerHTML); // Stocker le HTML de l'image
  e.target.remove(); // Supprimer l'image originale
};

  useEffect(() => {
    const editor = document.querySelector(".editor__content")  as HTMLElement;
    const textarea = document.querySelector(".editor__textarea") as HTMLElement;
    editor.addEventListener("input", () => {
      textarea.innerHTML = editor.innerHTML;
    });
    textarea.addEventListener("input", () => {
      editor.innerHTML = textarea.innerHTML;
    });
  }, []);


  return (
    <div className="editor-container">
            <ImageSizeModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onApply={applyImageSize}
                initialWidth={currentImage?.style.width}
                initialHeight={currentImage?.style.height}
            />
        <Toolbar />
       
        <div className="editor__content" contentEditable="true"
        suppressContentEditableWarning={true} 
        style={{ resize: "vertical" }}
        // cette ligne permet de supprimer le warning de react qui dit que le contentEditable est une mauvaise pratique
        >
        </div>
        <textarea className="editor__textarea"></textarea>
    </div>
  )
}

// Path: src/components/toolbar/toolbar.tsx

