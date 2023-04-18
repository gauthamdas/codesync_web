import { useCallback, useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { getToken } from "../Utils/Common";
import io from 'socket.io-client';
const socket = io(`${process.env.REACT_APP_SOCKET}}`,{
  reconnection: true,
  autoConnect: false,
  transports: ['websocket'],
  // protocol: 'http',
});
const languageOptions = [
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "C++", value: "cpp" },
];
const codeOpts={
  "javascript": "function newFunc(){\n  for (let i=0;i<l.length;i++){\n    console.log(m);\n  }\n  if (n==4){\n    console.log('hi');\n  }\n  else{\n    console.log('bye');\n  }\n}",
  "python": "def newFunc():\n  for i in range(l):\n    print(m)\n  if n==4:\n    print('hi')\n  else:\n    print('bye')",
  "cpp": "#include <iostream>\nusing namespace std;\nint main(){\n  for (int i=0;i<l.length();i++){\n    cout<<m;\n  }\n  if (n==4){\n    cout<<'hi';\n  }\n  else{\n    cout<<'bye';\n  }\n  return 0;\n}",
}
function CodeEditor() {
  const [code, setCode] = useState(codeOpts);
  const monacoObjects = useRef(null);
  const [inRoom, setInRoom] = useState(true);
  const [availableRooms, setAvailableRooms] = useState([{roomCode: "123456",roomName: "test"}]);
  const [users, setUsers] = useState([]);

  // const [isReconnecting, setIsReconnecting] = useState(false);

  const decorationIds = useRef([]);

  let history = useHistory();
  let roomCode = history.location.pathname.split("/")[2];


  const languageRef = useRef("python");
  const [language, setLanguage] = useState(languageRef.current);

  const handleLanguageChange = (event) => {
    languageRef.current = event.target.value;
    setLanguage(event.target.value);
    axios.post(`${process.env.REACT_APP_HOST}/room/changeLanguage`, {
      token: getToken(),
      roomCode: roomCode,
      language: event.target.value,
      }).then((res) => {
        console.log(res);
        setCode(()=>{
          return {
            ...code,
            [languageRef.current]: res.data.code,
          }
        });
      }).catch((err) => {
        console.log(err);
      });
    // console.log(language.current,event.target.value);
  };

  const tryReconnect = useCallback(() => {
    setTimeout(() => {
      socket.connect()
      
    }, 2000);
  }, [])

  useEffect(() => {
    if (!socket.connected){
      tryReconnect();
    }

    socket.io.on('close',(reason,description)=>{
      console.log("socket closed");
      if (reason==="transport close")tryReconnect();
    })

    socket?.on('assigned', (data) => {
      console.log(data,localStorage.getItem('paymentId'));
    });

    // disconnect the socket when the component is unmounted
    return () => {
      console.log("unmounting");
      socket.disconnect({token: getToken()});
    };
  }, [tryReconnect]);

  useEffect(() => {
    if (roomCode?.length !== 6) {
      // console.log(history.location.pathname)
      if (history.location.pathname===`/editor`) {
        axios.post(`${process.env.REACT_APP_HOST}/room/getDetails`, {
          token: getToken(),
          }).then((res) => {
            console.log(res);
            setAvailableRooms(res.data);
          }).catch((err) => {
            console.log(err);
          });
      }
      history.push("/editor");
      return;
    }
    console.log(roomCode);
    axios.post(`${process.env.REACT_APP_HOST}/room/join`, {
      token: getToken(),
      roomCode: roomCode,
      }).then((res) => {
        console.log(res);
        setInRoom(true);
      }).catch((err) => {
        console.log(err);
        history.push("/editor");
      });
    return () => {
    
    }
  }, [history, roomCode])
  
  const createRoom = () => {
    axios.post(`${process.env.REACT_APP_HOST}/room/create`, {
      token: getToken(),
      roomName: "test",
      defaultLanguage: "python",
      }).then((res) => {
        console.log(res);
        history.push(`/editor/${res.data.roomCode}`);
      }).catch((err) => {
        console.log(err);
      });
  }
  // create a array of 10 colors with opacity 0.7
  useEffect(() => {
    if (!monacoObjects.current) return;
  
    const { editor,monaco } = monacoObjects.current;

    // remove all decorations
    editor.deltaDecorations(decorationIds.current, []);

    // create text decorations  based on user position
    const decorations = createDecorations(editor, monaco, users);
              
              // Set the decorations
      const newDecorationIds = editor.deltaDecorations([], decorations);
      decorationIds.current =  newDecorationIds;
      // console.log(newDecorationIds===decorationIds.current);
      // editor.deltaDecorations(decorationIds.current, []);      
      
    }, [users]);
    
    const createDecorations = ( editor,/** @type {import("@monaco-editor/react").Monaco} */  monaco, users) => {
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
          stickiness: monaco.editor.TrackedRangeStickiness.GrowsOnlyWhenTypingBefore,
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

  const handleEditorChange = (value, event) => {
    console.log(languageRef.current,value)
    // console.log(event);
    setCode(()=>{
      return {
        ...code,
        [languageRef.current]: value,
      }
    });
  };

  return (
    <>
      <div className="editor">
        {inRoom ? <><h2>Code Editor <small aria-haspopup={"tree"}>({'ee'})</small></h2>
        <div className="language-dropdown">
  <select value={language} onChange={handleLanguageChange}>
    {languageOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
</div>
        <Editor
          height="75vh"
          theme="vs-dark"
          language={languageRef.current}
          value={code[languageRef.current]}
          options={{
            fontSize: 20,
            autoFocus: true,
          }}
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
        />
        </>:
        <>
        <div><h1 onClick={createRoom}>Create Room</h1></div>
        <div><h1>Join Room</h1>
        {availableRooms.map((room,index) => {
          return <h5 key={index} onClick={() => history.push(`/editor/${room.roomCode}`)}>{room.roomName}</h5>
        })
        }
        </div>
        </>
}
      </div>
    </>
  );
}

export default CodeEditor;
