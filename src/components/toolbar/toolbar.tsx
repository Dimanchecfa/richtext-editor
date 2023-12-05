import React, { useEffect } from 'react'
import "./index.css"

export default function Toolbar() {

  const toolbars = [
    {
      title : "Bold",
      command : "bold"
    },
    {
      
    }
  ]

  return (
    <div className="editor__toolbar">
          <button className="editor__toolbar-button" data-command="bold" title="Bold" onClick={() => document.execCommand("bold", false, "")}><b>B</b></button>
          <button className="editor__toolbar-button" data-command="italic" title="Italic" onClick={() => document.execCommand("italic", false, "")}><em>I</em></button>
          <button className="editor__toolbar-button" data-command="underline" title="Underline" onClick={() => document.execCommand("underline", false, "")}><u>U</u></button>
          <button className="editor__toolbar-button" data-command="strikeThrough" title="Strike-through"  onClick={() => document.execCommand("strikeThrough", false, "")}>S</button>
          <button className="editor__toolbar-button" data-command="justifyLeft" title="Align Left"><i className="fa fa-align-left" onClick={() => document.execCommand("justifyLeft", false, "")}></i></button>
          <button className="editor__toolbar-button" data-command="justifyCenter" title="Align Center"><i className="fa fa-align-center" onClick={() => document.execCommand("justifyCenter", false, "")}></i></button>
          <button className="editor__toolbar-button" data-command="justifyRight" title="Align Right"><i className="fa fa-align-right" onClick={() => document.execCommand("justifyRight", false, "")}></i></button>
          <button className="editor__toolbar-button" data-command="justifyFull" title="Justify"><i className="fa fa-align-justify" onClick={() => document.execCommand("justifyFull", false, "")}></i></button>
          <button className="editor__toolbar-button" data-command="indent" title="Indent"><i className="fa fa-indent" onClick={() => document.execCommand("indent", false, "")}></i></button>
          <button className="editor__toolbar-button" data-command="outdent" title="Outdent"><i className="fa fa-outdent" onClick={() => document.execCommand("outdent", false, "")}></i></button>

    </div>
  )
}
