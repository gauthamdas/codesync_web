(this.webpackJsonpcodesync=this.webpackJsonpcodesync||[]).push([[0],{115:function(e,t,n){},216:function(e,t){},222:function(e,t,n){},223:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),o=n(42),r=n.n(o),s=n(14),i=n(43),l=n(25),u=n(21),d=n(39),j=function(){return localStorage.getItem("token")||null},b=function(e,t,n,a){localStorage.setItem("token",e),localStorage.setItem("username",JSON.stringify(t)),localStorage.setItem("name",JSON.stringify(n)),localStorage.setItem("photoURL",JSON.stringify(a))},h=n(3),m=["component","setAuth","setAuthLoading","isDrawerOpen","users","setUsers"];var O=function(e){var t=e.component,n=e.setAuth,a=e.setAuthLoading,c=e.isDrawerOpen,o=e.users,r=e.setUsers,s=Object(d.a)(e,m);return Object(h.jsx)(l.b,Object(u.a)(Object(u.a)({},s),{},{render:function(e){return j()?Object(h.jsx)(t,Object(u.a)({setAuth:n,setAuthLoading:a,isDrawerOpen:c,users:o,setUsers:r},e)):Object(h.jsx)(l.a,{to:{pathname:"/login",state:{from:e.location}}})}}))},v=["component","setAuth","setAuthLoading","socket"];var p=function(e){var t=e.component,n=e.setAuth,a=e.setAuthLoading,c=e.socket,o=Object(d.a)(e,v);return Object(h.jsx)(l.b,Object(u.a)(Object(u.a)({},o),{},{render:function(e){return j()?Object(h.jsx)(l.a,{to:{pathname:"/"}}):Object(h.jsx)(t,Object(u.a)({setAuth:n,setAuthLoading:a,Socket:c},e))}}))},g=n(51),f=n.n(g),x=n(1),N=n(5),w=n(132),k=n(60),S=Object(w.a)({apiKey:"AIzaSyBquhnb8FEUzjwJywfS8Ifxf6m8LVjl9ag",authDomain:"codesync-ooad.firebaseapp.com",projectId:"codesync-ooad",storageBucket:"codesync-ooad.appspot.com",messagingSenderId:"616748410621",appId:"1:616748410621:web:c99f252643e7971b21c094",measurementId:"G-DB2QH1HJR0"}),y=Object(k.c)(S),C=new k.a;C.addScope("https://www.googleapis.com/auth/userinfo.profile");var A=function(){var e=Object(N.a)(Object(x.a)().mark((function e(){var t,n;return Object(x.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(k.d)(y,k.b);case 3:return e.next=5,Object(k.e)(y,C);case 5:return t=e.sent,n=t.user,e.t0=console,e.t1=n,e.next=11,n.getIdTokenResult(!0);case 11:return e.t2=e.sent,e.t0.log.call(e.t0,e.t1,e.t2),e.abrupt("return",{auth:!0,accessToken:n.accessToken,name:n.displayName,email:n.email,photo:n.photoURL});case 16:return e.prev=16,e.t3=e.catch(0),console.error(e.t3),e.abrupt("return",{auth:!1,accessToken:null,name:null,email:null,photo:null});case 20:case"end":return e.stop()}}),e,null,[[0,16]])})));return function(){return e.apply(this,arguments)}}(),L=["setAuth","setAuthLoading","Socket"];n(182).config();var I=function(e){var t=e.setAuth,n=e.setAuthLoading,c=(e.Socket,Object(d.a)(e,L)),o=Object(a.useState)(!1),r=Object(s.a)(o,2),i=r[0],l=r[1],u=Object(a.useState)(null),j=Object(s.a)(u,2)[1];Object(a.useEffect)((function(){return function(){}}),[]);var m=Object(a.useCallback)((function(e){n(!e),t(e)}),[t,n]);return i?Object(h.jsx)(h.Fragment,{children:Object(h.jsx)("div",{className:"loadclass-new",children:Object(h.jsxs)("div",{className:"spinner-box",children:[Object(h.jsx)("div",{className:"configure-border-1",children:Object(h.jsx)("div",{className:"configure-core"})}),Object(h.jsx)("div",{className:"configure-border-2",children:Object(h.jsx)("div",{className:"configure-core"})})]})})}):Object(h.jsxs)("div",{className:"login-container",children:[Object(h.jsx)("h3",{className:"brand-title",children:"CodeSync"}),Object(h.jsx)("input",{type:"button",value:i?"Loading...":"LOGIN",onClick:function(){j(null),l(!0),A().then((function(e){if(!e.auth)throw new Error("Something went wrong. Please try again later.");delete e.auth,f.a.post("".concat("https://cs.api.gauthamdas.me","/login"),e).then((function(e){var t,n,a,o;l(!1),b(null===(t=e.data)||void 0===t?void 0:t.accessToken,null===(n=e.data)||void 0===n?void 0:n.email,null===(a=e.data)||void 0===a?void 0:a.name,null===(o=e.data)||void 0===o?void 0:o.photo),m(!0),c.history.push("/")})).catch((function(e){var t,n,a;l(!1),console.log(null===(t=e.response)||void 0===t?void 0:t.data),401===(null===(n=e.response)||void 0===n?void 0:n.status)?j(null===(a=e.response)||void 0===a?void 0:a.data.error):j("Something went wrong. Please try again later.")}))})).catch((function(e){var t,n,a;l(!1),console.log(null===(t=e.response)||void 0===t?void 0:t.data),401===(null===(n=e.response)||void 0===n?void 0:n.status)?j(null===(a=e.response)||void 0===a?void 0:a.data.error):j("Something went wrong. Please try again later.")}))},disabled:i})]})};var D=function(){return Object(h.jsx)("div",{children:"Home"})},R=(n(115),n(272)),U=n(260),E=["toggleDrawer","auth","setAuth","users"];var F=function(e){var t=e.toggleDrawer,n=e.auth,a=(e.setAuth,e.users);return Object(d.a)(e,E),Object(h.jsx)(h.Fragment,{children:n&&Object(h.jsxs)("nav",{className:"navbar",children:[Object(h.jsx)("div",{className:"logo",children:"CODESYNC"}),Object(h.jsxs)("ul",{className:"nav-links",children:[Object(h.jsx)("li",{children:Object(h.jsx)(i.b,{to:"/",children:"Home"})}),Object(h.jsx)("li",{children:Object(h.jsx)(i.b,{to:"/",children:"About"})}),Object(h.jsx)("li",{children:Object(h.jsx)(i.b,{to:"/editor",children:"Editor"})}),window.location.pathname.toLowerCase().startsWith("/editor")&&Object(h.jsx)("div",{className:"menu-toggle",onClick:t,children:Object(h.jsx)(R.a,{color:"secondary",badgeContent:a.length,children:Object(h.jsx)(U.a,{})})})]})]})})},J=n(19),T=n(4),B=n(140),P=n(138),H=n.n(P),M=n(276),G=["isDrawerOpen","users"];var z=function(e){var t=e.isDrawerOpen,n=e.users;return Object(d.a)(e,G),Object(h.jsxs)("div",{className:"drawer ".concat(t?"open":""),children:[Object(h.jsx)("h2",{children:"Active Users"}),Object(h.jsx)("ul",{children:n.map((function(e,t){return Object(h.jsxs)("div",{className:"user-list",children:[Object(h.jsx)(M.a,{alt:e.name,src:e.photo,sx:{width:34,height:34,margin:"0"}}),Object(h.jsx)("span",{children:e.name})]},t)}))})]})},V=n(279),W=n(280),q=n(273),K=n(269),Q=n(274),Y=n(267),X=n(270),Z=n(278),$=n(283),_=n(284),ee=n(285),te=n(286),ne=n(287),ae=n(288),ce=n(261),oe=["isDrawerOpen","users","setUsers"],re=H()("".concat("https://cs.socket.gauthamdas.me","/?token=").concat(j()),{reconnection:!0,autoConnect:!1,transports:["websocket"]}),se=[{label:"JavaScript",value:"javascript"},{label:"Python",value:"python"},{label:"C++",value:"cpp"}];var ie=function(e){var t=e.isDrawerOpen,n=e.users,c=e.setUsers,o=(Object(d.a)(e,oe),Object(a.useState)({python:"",javascript:"",cpp:""})),r=Object(s.a)(o,2),b=r[0],m=r[1],O=Object(a.useRef)(null),v=Object(a.useState)(""),p=Object(s.a)(v,2),g=p[0],x=p[1],N=Object(a.useState)(!1),w=Object(s.a)(N,2),k=w[0],S=w[1],y=Object(a.useState)([{roomCode:"123456",roomName:"test"}]),C=Object(s.a)(y,2),A=C[0],L=C[1],I=Object(a.useRef)([]),D=Object(l.g)(),R=D.location.pathname.split("/")[2],U=Object(a.useRef)(null),E=Object(a.useState)(U.current),F=Object(s.a)(E,2),P=F[0],H=F[1],M=Object(a.useCallback)((function(){setTimeout((function(){re.connect()}),2e3)}),[]);Object(a.useEffect)((function(){if(R&&k)return re.connected||M(),re.io.on("close",(function(e,t){console.log("socket closed"),"transport close"===e&&M()})),null===re||void 0===re||re.on("authConnect",(function(){re.emit("joinRoom",{token:j(),roomCode:R})})),null===re||void 0===re||re.on("cursorUpdate",(function(e){var t=e.cursor,n=e.email,a=e.language,o=String(t).split(":")[0],r=String(t).split(":")[1];a===U.current&&c((function(e){return e.forEach((function(e){e.email===n&&(e.lineNumber=parseInt(o),e.column=parseInt(r))})),Object(J.a)(e)}))})),null===re||void 0===re||re.on("codeUpdate",(function(e){var t=e.code;e.language===U.current&&m((function(e){return Object(u.a)(Object(u.a)({},e),{},Object(T.a)({},U.current,t))}))})),null===re||void 0===re||re.on("activeUsersUpdate",(function(e){var t=e.email,n=e.name,a=e.lineNumber,o=e.column,r=e.type;c((function(e){var c=e.length?parseInt(e[e.length-1].id)+1:1,s=e.find((function(e){return e.email===t}));return s&&"leave"===r?e.filter((function(e){return e.email!==t})).map((function(e,t){return Object(u.a)(Object(u.a)({},e),{},{id:t+1})})):s&&"join"===r?e.map((function(e){return e.email===t?Object(u.a)(Object(u.a)({},e),{},{email:t,name:n,lineNumber:a,column:o,id:e.id}):e})):s||"join"!==r?e:[].concat(Object(J.a)(e),[{email:t,name:n,lineNumber:a,column:o,id:c}])}))})),function(){re.disconnect({token:j()}),re.removeAllListeners(),re.io.removeAllListeners()}}),[k,R,M]),Object(a.useEffect)((function(){return 6!==(null===R||void 0===R?void 0:R.length)?("/editor"===D.location.pathname&&f.a.post("".concat("https://cs.api.gauthamdas.me","/room/getDetails"),{token:j()}).then((function(e){L(e.data)})).catch((function(e){console.log(e)})),void D.push("/editor")):(f.a.post("".concat("https://cs.api.gauthamdas.me","/room/join"),{token:j(),roomCode:R}).then((function(e){var t,n,a,o,r;S(!0),x(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.roomName),H(null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.defaultLanguage),U.current=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.defaultLanguage,m(null===e||void 0===e||null===(o=e.data)||void 0===o?void 0:o.data),c(null===e||void 0===e||null===(r=e.data)||void 0===r?void 0:r.activeUsers)})).catch((function(e){console.log(e),D.push("/editor")})),function(){})}),[D,R]),Object(a.useEffect)((function(){if(O.current){var e=O.current,t=e.editor,a=e.monaco;t.deltaDecorations(I.current,[]);var c=G(t,a,n),o=t.deltaDecorations([],c);I.current=o}}),[n]);var G=function(e,t,n){return n.filter((function(e){return e.email!==function(){var e=localStorage.getItem("username");return e?JSON.parse(e):null}()})).map((function(e,n){return{range:new t.Range(e.lineNumber,e.column,e.lineNumber,parseInt(e.column)+1),options:{className:"color-".concat(e.id),stickiness:t.editor.TrackedRangeStickiness.GrowsOnlyWhenTypingBefore,hoverMessage:{value:"User: ".concat(e.name)},minimap:{color:"#ff82048b",position:t.editor.MinimapPosition.Gutter}}}}))};return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(z,{isDrawerOpen:t,users:n}),k?Object(h.jsx)(h.Fragment,{children:Object(h.jsxs)("div",{className:"editor",children:[Object(h.jsxs)("div",{className:"code-bar",children:[Object(h.jsx)("h3",{children:g}),Object(h.jsx)("div",{className:"language-dropdown",children:Object(h.jsx)("select",{value:P||"",onChange:function(e){U.current=e.target.value,H(e.target.value),f.a.post("".concat("https://cs.api.gauthamdas.me","/room/changeLanguage"),{token:j(),roomCode:R,language:e.target.value}).then((function(e){var t;m((function(){return Object(u.a)(Object(u.a)({},b),{},Object(T.a)({},U.current,e.data.code))})),c(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.activeUsers)})).catch((function(e){console.log(e)}))},children:se.map((function(e){return Object(h.jsx)("option",{value:e.value,children:e.label},e.value)}))})}),Object(h.jsx)("div",{className:"copy-button",onClick:function(){navigator.clipboard.writeText(window.location.href)},children:Object(h.jsxs)("button",{className:"copy-btn",children:[Object(h.jsx)("i",{className:"fa-solid fa-users-line"}),"\xa0Copy"]})}),Object(h.jsx)("div",{children:Object(h.jsx)(ce.a,{})})]}),Object(h.jsx)(B.a,{height:"75vh",theme:"vs-dark",language:U.current,value:b[U.current],options:{fontSize:20,autoFocus:!0},onMount:function(e,t){O.current={editor:e,monaco:t},e.focus(),e.onDidChangeCursorPosition((function(e){"modelChange"!==e.source&&re.emit("cursorUpdate",{roomCode:R,cursor:"".concat(e.position.lineNumber,":").concat(e.position.column),language:U.current})}))},onChange:function(e,t){t.changes[0].forceMoveMarkers||(re.emit("codeUpdate",{roomCode:R,language:U.current,code:e}),m((function(){return Object(u.a)(Object(u.a)({},b),{},Object(T.a)({},U.current,e))})))}})]})}):Object(h.jsx)(h.Fragment,{children:Object(h.jsxs)("div",{className:"editor-dash",children:[Object(h.jsxs)(V.a,{sx:{display:"flex",height:"90%",width:"50%",flexDirection:"column",color:"black",background:"white",padding:"20px 200px",border:"15px solid #1976d2",borderRadius:"30px"},children:[Object(h.jsx)(W.a,{variant:"h4",component:"h1",sx:{mt:2,mb:2},children:"Create Room"}),Object(h.jsx)(q.a,{sx:{mb:2},children:Object(h.jsx)(K.a,{id:"roomName",type:"text",label:"Room Name",variant:"outlined"})}),Object(h.jsxs)(q.a,{sx:{mb:2},children:[Object(h.jsx)(Q.a,{id:"select-label",children:"Default language"}),Object(h.jsx)(Y.a,{id:"language",variant:"outlined",label:"Default language",defaultValue:se[0].value,children:se.map((function(e){return Object(h.jsx)(X.a,{value:e.value,children:e.label},e.value)}))})]}),Object(h.jsx)(Z.a,{variant:"contained",color:"primary",type:"button",onClick:function(){var e=document.getElementById("roomName").value,t=document.getElementById("language").nextElementSibling.value;console.log(e,t),f.a.post("".concat("https://cs.api.gauthamdas.me","/room/create"),{token:j(),roomName:e,defaultLanguage:t}).then((function(e){D.push("/editor/".concat(e.data.roomCode))})).catch((function(e){console.log(e)}))},children:"Create Room"})]}),Object(h.jsx)("br",{}),Object(h.jsxs)(V.a,{sx:{display:"flex",height:"90%",width:"50%",flexDirection:"column",color:"black",background:"white",padding:"20px 100px",border:"15px solid #1976d2",borderRadius:"30px"},children:[Object(h.jsx)(W.a,{variant:"h4",component:"h1",sx:{mt:2,mb:2},children:"Join Room"}),Object(h.jsx)(q.a,{sx:{mb:2},children:Object(h.jsx)(K.a,{id:"roomCode",type:"text",value:R||"",variant:"outlined",label:"Room Code"})}),Object(h.jsx)(Z.a,{variant:"contained",color:"primary",children:"Join"}),Object(h.jsx)($.a,{sx:{maxHeight:300},children:Object(h.jsxs)(_.a,{stickyHeader:!0,"aria-label":"sticky table",children:[Object(h.jsx)(ee.a,{children:Object(h.jsxs)(te.a,{children:[Object(h.jsx)(ne.a,{children:"Room Name"}),Object(h.jsx)(ne.a,{children:"Room Code"}),Object(h.jsx)(ne.a,{})]})}),Object(h.jsx)(ae.a,{children:A.map((function(e,t){return Object(h.jsxs)(te.a,{children:[Object(h.jsx)(ne.a,{children:e.roomName}),Object(h.jsx)(ne.a,{children:e.roomCode}),Object(h.jsx)(ne.a,{children:Object(h.jsx)(i.b,{to:"/editor/".concat(e.roomCode),children:"Join"})})]},t)}))})]})})]})]})})]})};n(222);var le=function(){var e=Object(a.useState)(!0),t=Object(s.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(!1),r=Object(s.a)(o,2),u=r[0],d=r[1],m=Object(a.useState)(!1),v=Object(s.a)(m,2),g=v[0],x=v[1],N=Object(a.useState)([]),w=Object(s.a)(N,2),k=w[0],S=w[1];return Object(a.useEffect)((function(){var e=j();if(e)return f.a.post("".concat("https://cs.api.gauthamdas.me","/verifyToken"),{token:e}).then((function(t){var n,a,o;b(e,null===(n=t.data)||void 0===n?void 0:n.email,null===(a=t.data)||void 0===a?void 0:a.name,null===(o=t.data)||void 0===o?void 0:o.photo),c(!1),d(!0)})).catch((function(e){var t;401===(null===e||void 0===e||null===(t=e.response)||void 0===t?void 0:t.status)&&(localStorage.removeItem("token"),localStorage.removeItem("username"),localStorage.removeItem("name")),c(!1),d(!1)})),function(){}}),[]),n&&j()?Object(h.jsx)(h.Fragment,{children:Object(h.jsx)("div",{className:"loadclass-new",children:Object(h.jsxs)("div",{className:"spinner-box",children:[Object(h.jsx)("div",{className:"configure-border-1",children:Object(h.jsx)("div",{className:"configure-core"})}),Object(h.jsx)("div",{className:"configure-border-2",children:Object(h.jsx)("div",{className:"configure-core"})})]})})}):Object(h.jsx)("div",{className:"App",children:Object(h.jsx)(i.a,{children:Object(h.jsxs)("div",{children:[Object(h.jsx)(F,{auth:u,setAuth:d,setAuthLoading:c,toggleDrawer:function(){x(!g)},users:k}),Object(h.jsx)("div",{className:"content",children:Object(h.jsxs)(l.d,{children:[Object(h.jsx)(O,{exact:!0,path:"/",component:D,setAuth:d,setAuthLoading:c}),Object(h.jsx)(p,{exact:!0,path:"/",component:I}),Object(h.jsx)(p,{path:"/login",component:I,setAuth:d,setAuthLoading:c}),Object(h.jsx)(O,{path:"/editor",component:ie,setAuth:d,setAuthLoading:c,isDrawerOpen:g,users:k,setUsers:S})]})})]})})})},ue=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,289)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,o=t.getLCP,r=t.getTTFB;n(e),a(e),c(e),o(e),r(e)}))};r.a.render(Object(h.jsx)(c.a.StrictMode,{children:Object(h.jsx)(le,{})}),document.getElementById("root")),ue()}},[[223,1,2]]]);
//# sourceMappingURL=main.b62b02f5.chunk.js.map