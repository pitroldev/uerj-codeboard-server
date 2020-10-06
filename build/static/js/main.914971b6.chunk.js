(this["webpackJsonpuerj-codeboard-site"]=this["webpackJsonpuerj-codeboard-site"]||[]).push([[0],{112:function(e,t){},548:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(19),c=n.n(o),i=n(71),u=n(61),l=n(2),d=n(70),s=n(3),f=n(6),b=n(5),m=n(62),g=n.n(m),p=n(63),h=n.n(p),v=n(64),j=h()(v.api_uri),O=n(20),E=n(13),S=n(38),y=n(65),w={user:{id:void 0},selectedUser:{id:void 0,code:void 0},language:{default:"python"},styles:{fontSize:16,theme:"xcode",tabSize:2,autoComplete:!0}};var x={key:"root",storage:n.n(y).a},C=Object(S.a)(x,(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CHANGE_LANGUAGE":return Object(f.a)(Object(f.a)({},e),{},{language:Object(f.a)(Object(f.a)({},e.language),{},Object(O.a)({},t.boardName,t.language))});case"CHANGE_CODE":return Object(f.a)(Object(f.a)({},e),{},{user:Object(f.a)(Object(f.a)({},e.user),{},Object(O.a)({},t.board,t.code)),selectedUser:{id:t.id,code:t.code}});case"CHANGE_SELECTED_USER":return Object(f.a)(Object(f.a)({},e),{},{selectedUser:{id:t.id,code:t.code}});case"REGISTER_USER":return Object(f.a)(Object(f.a)({},e),{},{user:{id:t.id},selectedUser:{id:t.id}});default:return e}})),k=Object(E.c)(C),U=Object(S.b)(k);function A(e,t){return{type:"CHANGE_SELECTED_USER",id:e,code:t}}n(117),n(118),n(119),n(120),n(121),n(122),n(123);var L=function(e){var t=e.boardName,n=e.boardStyle,o=e.boardLanguage,c=Object(r.useState)("print('Hello World!')"),i=Object(b.a)(c,2),u=i[0],l=i[1],d=Object(r.useRef)(null),s=k.getState(),f=s.user,m=s.selectedUser;return Object(r.useEffect)((function(){function e(){console.log("undo trigger")}function n(){console.log("redo trigger")}l(k.getState().user[t]);var r=d.current.editor.commands;r.commands.undo.exec=e,r.commandKeyBinding["ctrl-z"].exec=e,r.commands.redo.exec=n,r.commandKeyBinding["ctrl-y"].exec=n}),[t,n,o]),Object(r.useEffect)((function(){return k.subscribe((function(){l(k.getState().selectedUser.code),d.current.editor.focus()}))}),[]),a.a.createElement(g.a,{focus:!0,ref:d,readOnly:f.id!==m.id,mode:o,theme:n.theme,fontSize:n.fontSize,tabSize:n.tabSize,enableBasicAutocompletion:n.autoComplete,enableLiveAutocompletion:n.autoComplete,style:{width:"80vw",height:"91vh"},name:"CodeEditor",onLoad:function(e){e.focus()},onChange:function(e){var n=k.getState().user.id;k.dispatch(function(e,t,n){return{type:"CHANGE_CODE",board:e,code:t,id:n}}(t,e,n));var r={id:n,code:e};j.emit(t,r)},showPrintMargin:!1,highlightActiveLine:!0,showGutter:!0,value:f.id===m.id?u:m.code})},N=n(4);function M(e){for(var t=e.toLowerCase().split(" "),n=0;n<t.length;n++)t[n]=t[n].charAt(0).toUpperCase()+t[n].substring(1);return e=t.join(" ")}var I=n(72);function R(){var e=Object(N.a)(["\n  display: flex;\n  flex-direction: row;\n  padding-left: 5%;\n  padding-right: 5%;\n  align-items: center;\n  background-color: ",";\n"]);return R=function(){return e},e}function G(){var e=Object(N.a)(["\n  font-size: 16pt;\n  font-weight: 600;\n  color: ",";\n  padding-left: 5;\n"]);return G=function(){return e},e}function _(){var e=Object(N.a)(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  height: 9vh;\n  min-height: 70px;\n  justify-content: center;\n  background-color: ",";\n"]);return _=function(){return e},e}function z(){var e=Object(N.a)(['\n  font-size: 16pt;\n  font-weight: 600;\n  font-family: "Fira Code VF", monospace;\n  color: ',";\n  align-self: center;\n"]);return z=function(){return e},e}function B(){var e=Object(N.a)(["\n  display: flex;\n  flex-direction: column;\n  width: 20vw;\n  background-color: ",";\n"]);return B=function(){return e},e}var H=l.c.div(B(),(function(e){return e.theme.primaryColor})),$=l.c.p(z(),(function(e){return e.theme.white})),D=l.c.div(_(),(function(e){return e.theme.secondaryColor})),J=l.c.p(G(),(function(e){return e.theme.white})),T=l.c.div(R(),(function(e){return e.isSelected?e.theme.secondaryColor:e.theme.primaryColor})),F=function(e){var t=e.data,n=(e.dataUsers,Object(r.useState)([])),o=Object(b.a)(n,2),c=o[0],i=o[1],u=Object(r.useState)(""),l=Object(b.a)(u,2),d=l[0],s=l[1];return Object(r.useEffect)((function(){var e=[];Object.keys(t).map((function(n){if(n){var r=function(e){var t,n=e.match(/.{1,4}/g)||[],r="";for(t=0;t<n.length;t++)r+=String.fromCharCode(parseInt(n[t],16));var a=r.split("$$$"),o=Object(b.a)(a,2),c=o[0],i=o[1];return{username:M(c),password:i,id:e}}(n),a={username:r.username,password:r.password,id:r.id,code:t[n].code};return e.push(a)}return null})),i(e),window.addEventListener("resize",(function(e){}))}),[t]),Object(r.useEffect)((function(){s(k.getState().user.id),k.subscribe((function(){s(k.getState().selectedUser.id)}))}),[]),a.a.createElement(H,null,a.a.createElement(D,null,a.a.createElement($,null,"<CodeBoard/>")),c.map((function(e,t){return a.a.createElement(T,{isSelected:d===e.id,key:t,onClick:function(){return function(e){k.dispatch(A(e.id,e.code))}(e)}},a.a.createElement(I.a,{color:"#fff",size:"22pt"}),a.a.createElement(J,null,e.username))})))},V=n(69),W=n.n(V);function K(){var e=Object(N.a)(["\n  width: 30pt;\n  padding-right: 2%;\n"]);return K=function(){return e},e}function P(){var e=Object(N.a)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  align-items: center;\n  width: 80vw;\n"]);return P=function(){return e},e}function q(){var e=Object(N.a)(["\n  font-size: 16pt;\n  font-weight: 600;\n  text-align: right;\n  padding-right: 2%;\n  color: ",";\n"]);return q=function(){return e},e}function Q(){var e=Object(N.a)(["\n  display: flex;\n  flex-direction: row;\n  height: 9vh;\n  min-height: 70px;\n  justify-content: space-between;\n  background-color: ",";\n"]);return Q=function(){return e},e}var X=l.c.div(Q(),(function(e){return e.theme.secondaryColor})),Y=l.c.p(q(),(function(e){return e.theme.white})),Z=l.c.div(P()),ee=l.c.img(K()),te=function(e){var t=e.boardName;return a.a.createElement(X,null,a.a.createElement(Z,null,a.a.createElement(Y,null,t),a.a.createElement(ee,{src:W.a,alt:"React Logo"})))},ne=n(26),re=n.n(ne);function ae(){var e=Object(N.a)(["\n  margin-top: 10%;\n"]);return ae=function(){return e},e}function oe(){var e=Object(N.a)([""]);return oe=function(){return e},e}function ce(){var e=Object(N.a)(["\n  padding-left: 5%;\n  padding-right: 5%;\n  padding-top: 10%;\n  padding-bottom: 10%;\n  display: flex;\n  flex-direction: column;\n  width: 50vw;\n  background-color: #0f0;\n  align-self: center;\n"]);return ce=function(){return e},e}var ie=l.c.div(ce()),ue=l.c.input(oe()),le=l.c.button(ae()),de={overlay:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(255, 255, 255, 0.5)"},content:{display:"flex",position:"absolute",top:"0px",left:"0px",right:"0px",bottom:"0px",border:"0px",background:"transparent",overflow:"auto",WebkitOverflowScrolling:"touch",borderRadius:"0px",outline:"none",padding:"0px",justifyContent:"center"}},se=function(e){var t=e.isVisible,n=e.closeModal,o=Object(r.useState)(!1),c=Object(b.a)(o,2),i=c[0],u=c[1],l=Object(r.useState)(""),d=Object(b.a)(l,2),s=d[0],f=d[1],m=Object(r.useState)(""),g=Object(b.a)(m,2),p=g[0],h=g[1];return Object(r.useEffect)((function(){u(t)}),[t]),a.a.createElement(re.a,{isOpen:i,contentLabel:"Example Modal",style:de},a.a.createElement(ie,null,a.a.createElement("h1",null,"Usu\xe1rio"),a.a.createElement(ue,{onChange:function(e){return f(e.target.value)}}),a.a.createElement("h1",null,"Senha"),a.a.createElement(ue,{onChange:function(e){return h(e.target.value)}}),a.a.createElement(le,{onClick:function(){var e=function(e,t){var n,r="".concat(e,"$$$").concat(t),a="";for(n=0;n<r.length;n++)a+=("000"+r.charCodeAt(n).toString(16)).slice(-4);return a}(s,p);return k.dispatch(function(e,t){return{type:"REGISTER_USER",id:e}}(e)),n()}},"Registrar")))};function fe(){var e=Object(N.a)(["\n  display: flex;\n  flex-direction: column;\n  width: 80vw;\n  background-color: #ff0;\n"]);return fe=function(){return e},e}function be(){var e=Object(N.a)(["\n  display: flex;\n  flex-direction: row;\n  background-color: #0f0;\n"]);return be=function(){return e},e}var me=l.c.div(be()),ge=l.c.div(fe()),pe=window.location.pathname.toLowerCase().replace("/codeboard/","");console.log("window",window.location.pathname),console.log("boardName",pe);var he=function(){var e=Object(r.useState)(null),t=Object(b.a)(e,2),n=t[0],o=t[1],c=Object(r.useState)(!0),i=Object(b.a)(c,2),u=i[0],l=i[1],d=Object(r.useState)({}),s=Object(b.a)(d,2),m=s[0],g=s[1],p=Object(r.useState)("javascript"),h=Object(b.a)(p,2),v=h[0],O=h[1];function E(){var e=k.getState().language;g(k.getState().styles),e[pe]||k.dispatch(function(e,t){return{type:"CHANGE_LANGUAGE",boardName:t,language:e}}(e.default,pe)),O(e[pe])}return Object(r.useEffect)((function(){E(),k.getState().user.id&&function(){l(!1),k.dispatch(A(k.getState().user.id,k.getState().user[pe])),j.emit("codeboard",pe);var e={id:k.getState().user.id,code:k.getState().user[pe]};j.emit(pe,e),j.on(pe,(function(e){o((function(t){return Object(f.a)(Object(f.a)({},t),e)}));var t=e[Object.keys(e).find((function(e){return e===k.getState().selectedUser.id}))];k.dispatch(A(t.id,t.code))}))}()}),[u]),Object(r.useEffect)((function(){return k.subscribe(E)}),[]),a.a.createElement(me,null,a.a.createElement(se,{isVisible:u,closeModal:function(){return l(!1)}}),a.a.createElement(F,{data:n||[],whoIsWriting:n?Object.keys(n):[]}),a.a.createElement(ge,null,a.a.createElement(te,{boardName:pe}),!u&&a.a.createElement(L,{boardName:pe,boardStyle:m,boardLanguage:v})))},ve=function(){return a.a.createElement(d.a,null,a.a.createElement(s.c,null,a.a.createElement(s.a,{path:"/codeboard",component:he})))},je={primaryColor:"#016BA5",secondaryColor:"#01507C",white:"#fff",fontBlack:"#333",fontFamily:{light:"Montserrat-Light",lightItalic:"Montserrat-LightItalic",regular:"Montserrat-Regular",regularItalic:"Montserrat-Italic",medium:"Montserrat-Medium",mediumItalic:"Montserrat-MediumItalic",bold:"Montserrat-SemiBold",boldItalic:"Montserrat-SemiBoldItalic"}};function Oe(){var e=Object(N.a)(["\n  body {\n    font-family: Montserrat !important;\n  }\n"]);return Oe=function(){return e},e}var Ee=Object(l.b)(Oe()),Se=function(){return a.a.createElement(i.a,{store:k},a.a.createElement(u.a,{loading:null,persistor:U},a.a.createElement(l.a,{theme:je},a.a.createElement(Ee,null),a.a.createElement(ve,null))))};c.a.render(a.a.createElement(Se,null),document.getElementById("root")),re.a.setAppElement(document.getElementById("root"))},64:function(e){e.exports=JSON.parse('{"api_uri":"http://pitroldevelop.kinghost.net:21117/"}')},69:function(e,t,n){e.exports=n.p+"static/media/UERJ_Logo.e608b5a7.svg"},73:function(e,t,n){e.exports=n(548)}},[[73,1,2]]]);
//# sourceMappingURL=main.914971b6.chunk.js.map