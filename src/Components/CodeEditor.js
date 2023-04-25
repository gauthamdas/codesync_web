import { useCallback, useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { getToken, getUsername } from "../Utils/Common";
import io from "socket.io-client";
import Sidebar from "./Sidebar";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Pending,  WifiOffRounded, WifiRounded } from "@mui/icons-material";

// add type annotations to the socket object
const socket = io(`${process.env.REACT_APP_SOCKET}/?token=${getToken()}`, {
  reconnection: true,
  autoConnect: false,
  transports: ["websocket"],
});
const languageOptions = [
  { label: "JavaScript", value: "javascript", ext: "js" },
  { label: "Python", value: "python", ext: "py" },
  { label: "C++", value: "cpp", ext: "cpp" },
];

function CodeEditor({ isDrawerOpen, users, setUsers, ...props }) {
  const [code, setCode] = useState({ python: "", javascript: "", cpp: "" });
  const monacoObjects = useRef(null);
  const [isConnected, setIsConnected] = useState(1);
  const [roomName, setRoomName] = useState("");
  const [inRoom, setInRoom] = useState(false);
  const [availableRooms, setAvailableRooms] = useState([]);
  const hiddenFileInputUploadCode = useRef(null);
  const [roomCodeINP, setRoomCodeINP] = useState("");
  // console.log(props)
  // const [isReconnecting, setIsReconnecting] = useState(false);

  const decorationIds = useRef([]);

  let history = useHistory();
  let roomCode = history.location.pathname.split("/")[2];

  const languageRef = useRef(null);
  const [language, setLanguage] = useState(languageRef.current);

  const handleLanguageChange = (event) => {
    languageRef.current = event.target.value;
    setLanguage(event.target.value);
    axios
      .post(`${process.env.REACT_APP_HOST}/room/changeLanguage`, {
        token: getToken(),
        roomCode: roomCode,
        language: event.target.value,
      })
      .then((res) => {
        // console.log(res);
        setCode(() => {
          return {
            ...code,
            [languageRef.current]: res.data.code,
          };
        });
        setUsers(res?.data?.activeUsers);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(language.current,event.target.value);
  };

  const handleClickUploadCode = (event) => {
    hiddenFileInputUploadCode.current.click();
  };

  const tryReconnect = useCallback(() => {
    setTimeout(() => {
      socket.connect();
      // if (socket.connected){
      // }
    }, 1000);
  }, []);

  useEffect(() => {
    // console.log(roomCode, inRoom);
    if (!roomCode || !inRoom) {
      return;
    }
    // console.log(1)
    if (!socket.connected) {
      tryReconnect();
    }
    // console.log(2)

    // window.addEventListener("offline", () => {
    //   console.log("offline");
    //   setIsConnected(0);
    // });

    // window.addEventListener("online", () => {
    //   console.log("online");
    //   setIsConnected(1);
    // });

    socket.io.on("close", (reason, description) => {
      console.log("socket closed");
      setIsConnected(0);
      if (reason === "transport close") tryReconnect();
    });

    socket?.on("disconnect", () => {
      console.log("socket diconnected");
    });

    socket.io.on("disconnect", (reason) => {
      console.log("socket disconnected 1");
      setIsConnected(0);
    });

    socket?.on("authConnect", () => {
      // console.log("socket connected");
      setIsConnected(2);
      socket.emit("joinRoom", { token: getToken(), roomCode: roomCode });
    });

    socket?.on("cursorUpdate", (data) => {
      const { cursor, email, language } = data;
      const lineNumber = String(cursor).split(":")[0];
      const column = String(cursor).split(":")[1];
      // console.log(existingUserIndex);
      if (language !== languageRef.current) {
        return;
      }
      setUsers((prevUsers) => {
        prevUsers.forEach((user) => {
          if (user.email === email) {
            user.lineNumber = parseInt(lineNumber);
            user.column = parseInt(column);
          }
          // console.log(user);
        });
        // console.log(prevUsers);
        return [...prevUsers];
      });
    });

    socket?.on("codeUpdate", (data) => {
      const { code, language } = data;
      if (language !== languageRef.current) {
        return;
      }
      setCode((prevCode) => {
        return {
          ...prevCode,
          [languageRef.current]: code,
        };
      });
    });

    socket?.on("activeUsersUpdate", (data) => {
      const { email, name, lineNumber, column, type } = data;
      setUsers((prevUsers) => {
        let id = prevUsers.length
          ? parseInt(prevUsers[prevUsers.length - 1].id) + 1
          : 1;
        let existingUser = prevUsers.find((user) => user.email === email);
        // console.log(existingUser, type);
        if (existingUser && type === "leave") {
          return prevUsers
            .filter((user) => user.email !== email)
            .map((user, index) => {
              // console.log({
              //   ...user,
              //   id: index + 1,
              // })
              return {
                ...user,
                id: index + 1,
              };
            });
        } else if (existingUser && type === "join") {
          return prevUsers.map((user) => {
            if (user.email === email) {
              return {
                ...user,
                email,
                name,
                lineNumber,
                column,
                id: user.id,
              };
            } else {
              return user;
            }
          });
        } else if (!existingUser && type === "join") {
          return [
            ...prevUsers,
            {
              email,
              name,
              lineNumber,
              column,
              id: id,
            },
          ];
        } else {
          // console.log(prevUsers);
          return prevUsers;
        }
      });
      // console.log(users)
    });

    // disconnect the socket when the component is unmounted
    return () => {
      // console.log("unmounting");
      socket.disconnect({ token: getToken() });
      socket.removeAllListeners();
      socket.io.removeAllListeners();
      window.removeEventListener("offline", () => {});
      window.removeEventListener("online", () => {});
      setInRoom(false);
      setUsers([]);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inRoom, roomCode, tryReconnect]);

  useEffect(() => {
    if (roomCode?.length !== 6) {
      // console.log(history.location.pathname)
      if (history.location.pathname === `/editor`) {
        axios
          .post(`${process.env.REACT_APP_HOST}/room/getDetails`, {
            token: getToken(),
          })
          .then((res) => {
            // console.log(res.data);
            setAvailableRooms(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      history.push("/editor");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_HOST}/room/join`, {
        token: getToken(),
        roomCode: roomCode,
      })
      .then((res) => {
        // console.log(res?.data.activeUsers);
        setInRoom(true);
        setRoomName(res?.data?.roomName);
        setLanguage(res?.data?.defaultLanguage);
        languageRef.current = res?.data?.defaultLanguage;
        // console.log(res?.data?.activeUsers);
        setCode(res?.data?.data);
        setUsers(res?.data?.activeUsers);
      })
      .catch((err) => {
        console.log(err);
        history.push("/editor");
      });
    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, roomCode]);
 
  const createRoom = () => {
    // e.preventDefault();
    let roomName = document.getElementById("roomName").value;
    let language = document.getElementById("language").nextElementSibling.value;

    console.log(roomName, language);

    axios
      .post(`${process.env.REACT_APP_HOST}/room/create`, {
        token: getToken(),
        roomName: roomName,
        defaultLanguage: language,
      })
      .then((res) => {
        // console.log(res);
        history.push(`/editor/${res.data.roomCode}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // create a array of 10 colors with opacity 0.7
  useEffect(() => {
    if (!monacoObjects.current) return;

    const { editor, monaco } = monacoObjects.current;

    // remove all decorations
    editor.deltaDecorations(decorationIds.current, []);

    // create text decorations  based on user position
    const decorations = createDecorations(editor, monaco, users);

    // Set the decorations
    const newDecorationIds = editor.deltaDecorations([], decorations);
    decorationIds.current = newDecorationIds;
    // console.log(decorations);
    // editor.deltaDecorations(decorationIds.current, []);
  }, [users]);

  const createDecorations = (
    editor,
    /** @type {import("@monaco-editor/react").Monaco} */ monaco,
    users
  ) => {
    const decorations = users
      .filter((user) => user.email !== getUsername())
      .map((user, index) => {
        // console.log(user);

        return {
          range: new monaco.Range(
            // 3, 2, 3, 3
            user.lineNumber,
            user.column,
            user.lineNumber,
            parseInt(user.column) + 1
          ),
          options: {
            // inlineClassName: `color-${user.id}`,
            className: `color-${user.id}`,
            stickiness:
              monaco.editor.TrackedRangeStickiness.GrowsOnlyWhenTypingBefore,
            hoverMessage: { value: `User: ${user.name}` },
            minimap: {
              color: "#ff82048b",
              position: monaco.editor.MinimapPosition.Gutter,
            },
          },
        };
      });
    return decorations;
  };

  const handleEditorDidMount = (editor, monaco) => {
    monacoObjects.current = {
      editor,
      monaco,
    };
    editor.focus();
    editor.onDidChangeCursorPosition((e) => {
      // console.log(e);
      if (e.source === "modelChange") return;
      socket.emit("cursorUpdate", {
        roomCode: roomCode,
        cursor: `${e.position.lineNumber}:${e.position.column}`,
        language: languageRef.current,
      });
    });
    
  };

  const handleEditorChange = (value, event) => {
    // console.log(languageRef.current,value)
    // console.log(event);
    if (event.changes[0].forceMoveMarkers) return;
    socket.emit("codeUpdate", {
      roomCode: roomCode,
      language: languageRef.current,
      code: value,
    });
    setCode(() => {
      return {
        ...code,
        [languageRef.current]: value,
      };
    });
  };

  const handleFileUpload = (e) => {
    // console.log(e.target.files[0]);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (e) => {
      // console.log(e.target.result);
      setCode((prev) => {
        return {
          ...prev,
          [languageRef.current]: e.target.result,
        };
      });
      socket.emit("codeUpdate", {
        roomCode: roomCode,
        language: languageRef.current,
        code: e.target.result,
      });
    };

    reader.onerror = (e) => {
      console.log(e);
    };
  };

  const handledownloadFile = (code,fileName,type) => {
    const element = document.createElement("a");
    const file = new Blob([code], {
      type: type,
    });
    element.href = URL.createObjectURL(file);
    element.download = `${fileName}`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };


  return (
    <>
      <Sidebar isDrawerOpen={isDrawerOpen} users={users} />
      {inRoom ? (
        <>
          <div className="editor">
            <div className="code-bar">
              <u><h3>{roomName}</h3></u>
              <div className="language-dropdown">
                <select
                  value={language ? language : ""}
                  onChange={handleLanguageChange}
                >
                  {languageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className="copy-button"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
              >
                <button className="copy-btn">
                  <i className="fa-solid fa-users-line"></i>&nbsp;Copy
                </button>
              </div>
              <div className="upload-button">
                <input
                  type="file"
                  id="file"
                  ref={hiddenFileInputUploadCode}
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
                <label htmlFor="file">
                  <button className="btn" onClick={handleClickUploadCode}>
                    <i className="fa-solid fa-upload"></i>&nbsp;Upload
                  </button>
                </label>
              </div>
              <div className="download-button">
                <button
                  className="btn"
                  onClick={() => {
                    handledownloadFile(
                      code[languageRef.current],
                      `${roomName}.${languageOptions.find(l=>l.value===languageRef.current).ext}`,
                      "text/plain"
                    );
                  }}
                >
                  <i className="fa-solid fa-download"></i>&nbsp;Download
                </button>
              </div>
              <div>
                {/* write a if else if*/}

                {isConnected===0 ? 
                <WifiOffRounded sx={{ color: "#ff0000"}}/>:(isConnected===1 ?
                <Pending sx={{ color: "#ffee00"}}/>:<WifiRounded sx={{ color: "#00ff00"}} />)}
              </div>
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
          </div>
        </>
      ) : (
        <>
          <div className="editor-dash">
            <Box
              sx={{
                display: "flex",
                height: "90%",
                width: "50%",
                flexDirection: "column",
                color: "black",
                background: "white",
                padding: "20px 200px",
                border: "15px solid #1976d2",
                borderRadius: "30px",
              }}
            >
              <Typography variant="h4" component="h1" sx={{ mt: 2, mb: 2 }}>
                Create Room
              </Typography>
              <FormControl sx={{ mb: 2 }}>
                {/* <FormLabel htmlFor="roomName">Room Name:</FormLabel> */}
                <TextField
                  id="roomName"
                  type="text"
                  label="Room Name"
                  variant="outlined"
                />
              </FormControl>
              <FormControl sx={{ mb: 2 }}>
                <InputLabel id="select-label">Default language</InputLabel>
                <Select
                  id="language"
                  variant="outlined"
                  label="Default language"
                  defaultValue={languageOptions[0].value}
                >
                  {languageOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={createRoom}
              >
                Create Room
              </Button>
            </Box>
            <br />
            <Box
              sx={{
                display: "flex",
                height: "90%",
                width: "50%",
                flexDirection: "column",
                color: "black",
                background: "white",
                padding: "20px 100px",
                border: "15px solid #1976d2",
                borderRadius: "30px",
              }}
            >
              <Typography variant="h4" component="h1" sx={{ mt: 2, mb: 2 }}>
                Join Room
              </Typography>
              <FormControl sx={{ mb: 2 }}>
                {/* <FormLabel htmlFor="roomCode">Room Code:</FormLabel> */}
                <TextField
                  id="roomCode"
                  type="text"
                  value={roomCode?roomCode:roomCodeINP}
                  variant="outlined"
                  label="Room Code"
                  onChange={(event) => setRoomCodeINP(event.target.value)}
                />
              </FormControl>
              <Button variant="contained" color="primary" onClick={()=>{
                history.push(`/editor/${roomCodeINP}`)
              }}>
                Join
              </Button>
              {/* <div style={{"overflowY": "scroll", "marginTop":"20px"}}> */}
              <TableContainer sx={{ maxHeight: 300 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Room Name</TableCell>
                      <TableCell>Room Code</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {availableRooms.map((room, index) => (
                      <TableRow key={index}>
                        <TableCell>{room.roomName}</TableCell>
                        <TableCell>{room.roomCode}</TableCell>
                        <TableCell>
                          <Link to={`/editor/${room.roomCode}`}>Join</Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* </div> */}
            </Box>
          </div>
        </>
      )}
    </>
  );
}

export default CodeEditor;
