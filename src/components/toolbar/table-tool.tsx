import React, { useEffect } from "react";
import GridSelector from "./grid-selector";
import { BiTable } from "react-icons/bi";
import "./index.css";

export default function TableTool({ activeTools, setActiveTools, icon }: any) {
  const dropdownRef = React.useRef<any>(null);
  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleCreateTable = (cols: any, rows: any) => {
    const editor = document.querySelector(".editor__content") as HTMLElement;
    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    const tableBody = document.createElement("tbody");
    const tableHead = document.createElement("thead");
    const tableHeadRow = document.createElement("tr");
    const tableHeadCell = document.createElement("th");
    tableHeadCell.innerText = "Header";
    tableHeadRow.appendChild(tableHeadCell);
    tableHead.appendChild(tableHeadRow);
    table.appendChild(tableHead);
    for (let i = 0; i < rows.length; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < cols.length; j++) {
        const cell = document.createElement("td");
        cell.style.border = "1px solid black";
        cell.style.padding = "5px";
        cell.innerText = "Cell";
        row.appendChild(cell);
      }
      tableBody.appendChild(row);
    }
    table.appendChild(tableBody);
    editor.appendChild(table);
  };
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      <div style={{ position: "relative" }}>
        <button
          id="tableButton"
          className={
            "editor__toolbar-button" + (activeTools.includes("table") ? " active" : "")
          }
          // ref={dropdownRef}
          // onMouseEnter={() => setActiveTools([...activeTools, "table"])}
          onClick={toggleDropdown}
        >
          <BiTable width={16} height={16} />
        </button>
        {showDropdown && <GridSelector close={() => setShowDropdown(false)}/>}
      </div>
    </>
  );
}
