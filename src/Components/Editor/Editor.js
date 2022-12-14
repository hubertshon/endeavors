import React, { useEffect, useState } from 'react';
import "./Editor.css";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor, EditorState, ContentState } from 'draft-js';


// const toolbarOptions = {
//   inline: { inDropdown: true },
//   list: { inDropdown: true },
//   textAlign: { inDropdown: true },
//   link: { inDropdown: true },
//   history: { inDropdown: false },
// }
export const MyEditor = React.forwardRef((props, ref) => {

  const newState = EditorState.createEmpty();
  const content = ContentState.createFromText(props.text);
  const loadState = EditorState.createWithContent(content);

  const [editorState, setEditorState] = useState(newState);

    useEffect(() => {
      if (props.text.length > 0) {
        setEditorState(loadState);
      }
    }, []);

    const sendText = () => {
      const textValue = editorState.getCurrentContent().getPlainText('\u0001');
      props.getEditorText(textValue);
    }


  return  (
    <div ref={ref}>
      <Editor 
        editorState={editorState} 
        onChange={editorState => setEditorState(editorState)} 
        onBlur={() => sendText()}  
        />
    </div>
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
});
