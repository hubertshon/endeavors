import React, { useState } from 'react';
import "./Editor.css";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor, EditorState } from 'draft-js';


const toolbarOptions = {
    inline: { inDropdown: true },
    list: { inDropdown: true },
    textAlign: { inDropdown: true },
    link: { inDropdown: true },
    history: { inDropdown: false },
  }
export const MyEditor = () => {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );


  return  (
    <Editor editorState={editorState} onChange={setEditorState} />
    // <Editor
    //     editorState={editorState}
    //     editorStyle={{ 
    //         margin: 12,
    //         borderWidth: 0.5,
    //         padding: 10,
    //         borderRadius: "1px"}}
    //     toolbarClassName="editor-toolbar"
    //     wrapperClassName="wrapperClassName"
    //     editorClassName="editorClassName"
    //     onEditorStateChange={setEditorState}
    //     toolbar={toolbarOptions}
    // />    
  )
}
