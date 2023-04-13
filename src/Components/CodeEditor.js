import { useCallback, useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { useHistory } from "react-router-dom";

function CodeEditor() {
  const [code, setCode] = useState("import Hello\ndef newFunc():\n  for i in l:\n    print(m)\n  if n==4:\n    print('hi')\n  else:\n    print('bye')\n ");
  const monacoObjects = useRef(null);
  const [users, setUsers] = useState([]);
  const decorationIds = useRef([]);

  let history = useHistory()

  useEffect(() => {
    
    history.location.pathname()
    return () => {
    
    }
  }, [history.location])
  

  // create a array of 10 colors with opacity 0.7
  useEffect(() => {
    if (!monacoObjects.current) return;
  
    const { editor,monaco } = monacoObjects.current;

    // remove all decorations
    editor.deltaDecorations(decorationIds.current, []);

    // create text decorations  based on user position
    const decorations = createDecorations(editor, monaco, users);
    
    // const selections = users.map((user, index) => {
      //   return {
        //     selectionStartLineNumber: user.lineNumber,
        //     selectionStartColumn: user.column,
        //     positionLineNumber: user.lineNumber,
        //     positionColumn: user.column,
        //     color: user.color
        //   };
        // });
        
        // // Create an array of decorations, one for each selection
        // const decorations = selections.map(selection => ({
          //   range: new monaco.Range(
            //     selection.selectionStartLineNumber,
            //     selection.selectionStartColumn,
            //     selection.positionLineNumber,
            //     selection.positionColumn,
            //   ),
            //   options: {
              //     isWholeLine: false,
              //     inlineClassName: 'custom-selection',
              //     backgroundColor: selection.color,
              //   }
              // }));
              
              // Set the decorations
      const newDecorationIds = editor.deltaDecorations([], decorations);
      decorationIds.current =  newDecorationIds;
      // console.log(newDecorationIds===decorationIds.current);
      // editor.deltaDecorations(decorationIds.current, []);      
      
    }, [users]);
    
    const createDecorations = ( editor,  monaco, users) => {
      const decorations = users.map((user, index) => {
        return {
          range: new monaco.Range(
          // 3, 2, 3, 3
          user.lineNumber,
          user.column,
          user.lineNumber,
          user.column+1,
        ),
        options: {
          inlineClassName: `color-${user.id}`,
          hoverMessage: { value: `User: ${user.name}` 
          },
        },
        
      };
    });
    return decorations;
  }

  const handleEditorDidMount = (editor, monaco) => {
    monacoObjects.current = {
      editor,
      monaco,
    };
    editor.focus();
    // editor.onMouseMove(function (e) {
    //   // remove all existing decorations
    //   // monacoObjects.current.editor.deltaDecorations(monacoObjects.current.editor.getModel().getAllDecorations(), []);
    //   console.log(e);
    //   editor.deltaDecorations(decorationIds.current, []);
    // });

    setUsers([
      { id: 1, name: "User 1", lineNumber: 1, column: 5, color: "red" },
      { id: 2, name: "User 2", lineNumber: 2, column: 4, color: "blue" },
      { id: 3, name: "User 3", lineNumber: 3, column: 4, color: "green" },
      { id: 4, name: "User 4", lineNumber: 4, column: 4, color: "yellow" },
      { id: 5, name: "User 5", lineNumber: 5, column: 4, color: "orange" },
    ]);
  };

  const handleEditorChange = useCallback((value, event) => {
    setCode(value);
  }, []);

  return (
    <>
      <div className="editor">
        <h2>Code Editor</h2>
        <Editor
          height="75vh"
          theme="vs-dark"
          language={"python"}
          value={code}
          options={{
            fontSize: 20,
            autoFocus: true,
          }}
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
        />
      </div>
    </>
  );
}

export default CodeEditor;
