import React, { useEffect, useRef, useState } from "react";
import useDynamicPosition from "./dynamic-position";

export default function GridSelector({ close }: any) {
  const maxCols = 10;
  const maxRows = 10;

  const [hoverCols, setHoverCols] = useState(0);
  const [hoverRows, setHoverRows] = useState(0);

  const handleMouseOver = (row: any, col: any) => {
    setHoverCols(col);
    setHoverRows(row);
  };
  const handleMouseOut = () => {
    setHoverCols(0);
    setHoverRows(0);
  };

  const cellStyle = {
    border: "1px solid black",
    padding: "15px",
    display: "table-cell",
    verticalAlign: "middle", // Centre verticalement le contenu
    textAlign: "left", // Aligner le texte à gauche
    minHeight: "20px", // Hauteur minimale pour la cellule
    lineHeight: "normal", // Hauteur de ligne standard
  };



  const initResize = (table : any) => {
    let startX: any;
    let startY: any;
    let startWidth: any;
    let startHeight: any;
  
    const mouseDownHandler = function(e : any) {
      startX = e.clientX;
      startY = e.clientY;
      const defaultView = document.defaultView as any;
      startWidth = parseInt(defaultView.getComputedStyle(table).width, 10);
      startHeight = parseInt(defaultView.getComputedStyle(table).height, 10);
      document.documentElement.addEventListener('mousemove', mouseMoveHandler);
      document.documentElement.addEventListener('mouseup', mouseUpHandler);
    };
  
    const mouseMoveHandler = function(e : any) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      table.style.width = `${startWidth + dx}px`;
      table.style.height = `${startHeight + dy}px`;
    };
  
    const mouseUpHandler = function() {
      document.documentElement.removeEventListener('mousemove', mouseMoveHandler);
      document.documentElement.removeEventListener('mouseup', mouseUpHandler);
    };
  
    const handles = table.querySelectorAll('.resize-handle');
    handles.forEach((handle: any) => {
      handle.addEventListener("mousedown", mouseDownHandler);
    });
  };
  

  const addResizeHandles = (table: any) => {
    const corners = ["top-left", "top-right", "bottom-left", "bottom-right"];
    corners.forEach((corner) => {
      const handle = document.createElement("div");
      handle.className = `resize-handle ${corner}`;
      table.appendChild(handle);
    });
  };
  const initCellResize = (handle: any) => {
    let startX: any;
    let startY: any;
    let startWidth: any;
    let startHeight: any;

    const onMouseDown = (e: any) => {
      startX = e.clientX;
      startY = e.clientY;
      startWidth = handle.parentElement.offsetWidth;
      startHeight = handle.parentElement.offsetHeight;
      document.documentElement.style.cursor = "ns-resize";
      document.documentElement.addEventListener("mousemove", onMouseMove);
      document.documentElement.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: any) => {
      const dy = e.clientY - startY;
      const dx = e.clientX - startX;
      handle.parentElement.style.height = `${startHeight + dy}px`;
      handle.parentElement.style.width = `${startWidth + dx}px`;
      e.stopPropagation();
    };

    const onMouseUp = () => {
      document.documentElement.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseup", onMouseUp);
      document.documentElement.style.cursor = "default";
    };

    handle.addEventListener("mousedown", onMouseDown);
  };

  // const initHorizontalResize = (handle: any) => {
  //   let startX: any, startWidth: any;

  //   const onMouseDown = (e: any) => {
  //     startX = e.clientX;
  //     startWidth = handle.parentElement.offsetWidth;
  //     document.documentElement.addEventListener("mousemove", onMouseMove);
  //     document.documentElement.addEventListener("mouseup", onMouseUp);
  //   };

  //   const onMouseMove = (e: any) => {
  //     const dx = e.clientX - startX;
  //     handle.parentElement.style.width = `${startWidth + dx}px`;
  //   };
  //   const onMouseUp = () => {
  //     document.documentElement.removeEventListener("mousemove", onMouseMove);
  //     document.documentElement.removeEventListener("mouseup", onMouseUp);
  //   };

  //   handle.addEventListener("mousedown", onMouseDown);
  // };
  const initHorizontalResize = (handle: any, columnIndex :any) => {
    let startX: any, startWidths: any;

    const onMouseDown = (e : any) => {
      startX = e.clientX;
      startWidths = Array.from(handle.closest('table').rows)
        .map((row : any) => row.cells[columnIndex]?.offsetWidth);
      document.documentElement.addEventListener('mousemove', onMouseMove);
      document.documentElement.addEventListener('mouseup', onMouseUp);
    };
  
    const onMouseMove = (e : any) => {
      const dx = e.clientX - startX;
      handle.closest('table').rows.forEach((row : any) => {
        const cell = row.cells[columnIndex];
        if (cell) {
          cell.style.width = `${startWidths[row.rowIndex] + dx}px`;
        }
      });
    };
  
    const onMouseUp = () => {
      document.documentElement.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseup', onMouseUp);
    };
  
    handle.addEventListener('mousedown', onMouseDown);
  };
  // const initResize = (table: any) => {
  //   let startX: any;
  //   let startY: any;
  //   let startWidth: any;
  //   let startHeight: any;

  //   const mouseDownHandler = function (e: any) {
  //     startX = e.clientX;
  //     startY = e.clientY;
  //     const defaultView = document.defaultView as any;
  //     startWidth = parseInt(defaultView.getComputedStyle(table).width, 10);
  //     startHeight = parseInt(defaultView.getComputedStyle(table).height, 10);
  //     document.documentElement.addEventListener("mousemove", mouseMoveHandler);
  //     document.documentElement.addEventListener("mouseup", mouseUpHandler);
  //   };

  //   const mouseMoveHandler = function (e: any) {
  //     const dx = e.clientX - startX;
  //     const dy = e.clientY - startY;
  //     table.style.width = `${startWidth + dx}px`;
  //     table.style.height = `${startHeight + dy}px`;
  //   };

  //   const mouseUpHandler = function () {
  //     document.documentElement.removeEventListener(
  //       "mousemove",
  //       mouseMoveHandler
  //     );
  //     document.documentElement.removeEventListener("mouseup", mouseUpHandler);
  //   };

  //   // Attacher les gestionnaires d'événements aux poignées
  //   const handles = table.querySelectorAll(".resize-handle");
  //   handles.forEach((handle: any) => {
  //     handle.addEventListener("mousedown", mouseDownHandler);
  //   });
  // };    // Attacher les gestionnaires d'événements aux poignées

  const handleClick = () => {
    const editor = document.querySelector(".editor__content") as HTMLElement;
    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.setAttribute("draggable", "false");
    const tableBody = document.createElement("tbody");
    const tableHead = document.createElement("thead");
    const tableHeadRow = document.createElement("tr");
    const tableHeadCell = document.createElement("th");
    tableHeadRow.appendChild(tableHeadCell);
    tableHead.appendChild(tableHeadRow);
    table.appendChild(tableHead);
    for (let i = 0; i < hoverRows; i++) {
      const row = document.createElement("tr");
      row.style.borderColor = "inherit";
      row.style.display = "table-row";
      for (let j = 0; j < hoverCols; j++) {
        const cell = document.createElement("td");
        const resizeHandle = document.createElement("div");
        resizeHandle.className = "resize-handle-cell";
        // initCellResize(cell);
        // initHorizontalResize(resizeHandle , j);
        cell.appendChild(resizeHandle);
        Object.assign(cell.style, cellStyle);
        cell.innerText = "\u00a0";
        row.appendChild(cell);
      }
      tableBody.appendChild(row);
    }
    table.className = "table-with-resize";
    addResizeHandles(table);
    initResize(table);

    editor.appendChild(table);
    table.appendChild(tableBody);
    editor.appendChild(table);
    close();
  };

  return (
    <div className="grid-selector">
      {Array.from({ length: maxRows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {Array.from({ length: maxCols }).map((_, colIndex) => (
            <div
              key={colIndex}
              className={`grid-cell ${
                rowIndex < hoverRows && colIndex < hoverCols
                  ? "highlighted"
                  : ""
              }`}
              onMouseOver={() => handleMouseOver(rowIndex + 1, colIndex + 1)}
              onMouseOut={handleMouseOut}
              onClick={handleClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
