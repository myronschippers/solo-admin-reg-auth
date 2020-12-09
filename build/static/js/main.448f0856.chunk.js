(this["webpackJsonpprime-solo-project"]=this["webpackJsonpprime-solo-project"]||[]).push([[0],{43:function(e,t,a){e.exports=a(76)},71:function(e,t,a){},73:function(e,t,a){},74:function(e,t,a){},75:function(e,t,a){},76:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(23),c=a.n(s),u=a(18),o=a(5),i=a(41),l=(a(52),Object(u.c)({loginMessage:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CLEAR_LOGIN_ERROR":return"";case"LOGIN_INPUT_ERROR":return"Enter your username and password!";case"LOGIN_FAILED":return"Oops! The username and password didn't match. Try again!";case"LOGIN_FAILED_NO_CODE":return"Oops! Something went wrong! Is the server running?";default:return e}},registrationMessage:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CLEAR_REGISTRATION_ERROR":return"";case"REGISTRATION_INPUT_ERROR":return"Choose a username and password!";case"REGISTRATION_FAILED":return"Oops! That didn't work. The username might already be taken. Try again!";default:return e}}})),m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_USER":return t.payload;case"UNSET_USER":return{};default:return e}},p=Object(u.c)({errors:l,user:m}),d=a(7),h=a.n(d),b=a(8),E=a(20),f=a.n(E),v=h.a.mark(j),g=h.a.mark(y),O=h.a.mark(w);function j(e){var t;return h.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,Object(b.b)({type:"CLEAR_LOGIN_ERROR"});case 3:return t={headers:{"Content-Type":"application/json"},withCredentials:!0},a.next=6,f.a.post("/api/user/login",e.payload,t);case 6:return a.next=8,Object(b.b)({type:"FETCH_USER"});case 8:a.next=20;break;case 10:if(a.prev=10,a.t0=a.catch(0),console.log("Error with user login:",a.t0),401!==a.t0.response.status){a.next=18;break}return a.next=16,Object(b.b)({type:"LOGIN_FAILED"});case 16:a.next=20;break;case 18:return a.next=20,Object(b.b)({type:"LOGIN_FAILED_NO_CODE"});case 20:case"end":return a.stop()}}),v,null,[[0,10]])}function y(e){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t={headers:{"Content-Type":"application/json"},withCredentials:!0},e.next=4,f.a.post("/api/user/logout",t);case 4:return e.next=6,Object(b.b)({type:"UNSET_USER"});case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log("Error with user logout:",e.t0);case 11:case"end":return e.stop()}}),g,null,[[0,8]])}function w(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(b.c)("LOGIN",j);case 2:return e.next=4,Object(b.c)("LOGOUT",y);case 4:case"end":return e.stop()}}),O)}var R=w,N=h.a.mark(I),x=h.a.mark(C);function I(e){return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(b.b)({type:"CLEAR_REGISTRATION_ERROR"});case 3:return t.next=5,f.a.post("/api/user/register",e.payload);case 5:return t.next=7,Object(b.b)({type:"LOGIN",payload:e.payload});case 7:return t.next=9,Object(b.b)({type:"SET_TO_LOGIN_MODE"});case 9:t.next=16;break;case 11:return t.prev=11,t.t0=t.catch(0),console.log("Error with user registration:",t.t0),t.next=16,Object(b.b)({type:"REGISTRATION_FAILED"});case 16:case"end":return t.stop()}}),N,null,[[0,11]])}function C(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(b.c)("REGISTER",I);case 2:case"end":return e.stop()}}),x)}var _=C,k=h.a.mark(T),L=h.a.mark(S);function T(){var e,t;return h.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,e={headers:{"Content-Type":"application/json"},withCredentials:!0},a.next=4,f.a.get("/api/user",e);case 4:return t=a.sent,a.next=7,Object(b.b)({type:"SET_USER",payload:t.data});case 7:a.next=12;break;case 9:a.prev=9,a.t0=a.catch(0),console.log("User get request failed",a.t0);case 12:case"end":return a.stop()}}),k,null,[[0,9]])}function S(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(b.c)("FETCH_USER",T);case 2:case"end":return e.stop()}}),L)}var A=S,F=h.a.mark(G);function G(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(b.a)([R(),_(),A()]);case 2:case"end":return e.stop()}}),F)}var U=a(10),D=a(11),P=a(13),q=a(12),M=a(19),H=a(6),V=Object(o.b)()((function(e){return r.a.createElement("button",{className:e.className,onClick:function(){return e.dispatch({type:"LOGOUT"})}},"Log Out")})),J=(a(71),function(e){return{store:e}}),z=Object(o.b)(J)((function(e){var t={path:"/login",text:"Login / Register"};return null!=e.store.user.id&&(t.path="/user",t.text="Home"),r.a.createElement("div",{className:"nav"},r.a.createElement(M.b,{to:"/home"},r.a.createElement("h2",{className:"nav-title"},"Prime Solo Project")),r.a.createElement("div",{className:"nav-right"},r.a.createElement(M.b,{className:"nav-link",to:t.path},t.text),e.store.user.id&&r.a.createElement(r.a.Fragment,null,r.a.createElement(M.b,{className:"nav-link",to:"/info"},"Info Page"),r.a.createElement(V,{className:"nav-link"})),r.a.createElement(M.b,{className:"nav-link",to:"/about"},"About")))})),B=(a(73),function(){return r.a.createElement("footer",null,"\xa9 Prime Digital Academy")}),Q=a(42),W=function(e){Object(P.a)(a,e);var t=Object(q.a)(a);function a(){var e;Object(U.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={username:"",password:""},e.login=function(t){t.preventDefault(),e.state.username&&e.state.password?e.props.dispatch({type:"LOGIN",payload:{username:e.state.username,password:e.state.password}}):e.props.dispatch({type:"LOGIN_INPUT_ERROR"})},e.handleInputChangeFor=function(t){return function(a){e.setState({[t]:a.target.value})}},e}return Object(D.a)(a,[{key:"render",value:function(){return r.a.createElement("form",{className:"formPanel",onSubmit:this.login},r.a.createElement("h2",null,"Login"),this.props.store.errors.loginMessage&&r.a.createElement("h3",{className:"alert",role:"alert"},this.props.store.errors.loginMessage),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"username"},"Username:",r.a.createElement("input",{type:"text",name:"username",required:!0,value:this.state.username,onChange:this.handleInputChangeFor("username")}))),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"password"},"Password:",r.a.createElement("input",{type:"password",name:"password",required:!0,value:this.state.password,onChange:this.handleInputChangeFor("password")}))),r.a.createElement("div",null,r.a.createElement("input",{className:"btn",type:"submit",name:"submit",value:"Log In"})))}}]),a}(n.Component),Y=Object(o.b)(J)(W),K=function(e){Object(P.a)(a,e);var t=Object(q.a)(a);function a(){return Object(U.a)(this,a),t.apply(this,arguments)}return Object(D.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(Y,null),r.a.createElement("center",null,r.a.createElement("button",{type:"button",className:"btn btn_asLink",onClick:function(){e.props.history.push("/registration")}},"Register")))}}]),a}(n.Component),X=Object(o.b)(J)(K),Z=Object(o.b)(J)((function(e){var t,a=e.component,n=e.authRedirect,s=e.store,c=Object(Q.a)(e,["component","authRedirect","store"]);return t=s.user.id?a:X,s.user.id&&null!=n?r.a.createElement(H.a,{exact:!0,from:c.path,to:n}):(s.user.id||null==n||(t=a),r.a.createElement(H.b,Object.assign({},c,{component:t})))})),$=function(){return r.a.createElement("div",{className:"container"},r.a.createElement("div",null,r.a.createElement("p",null,"This about page is for anyone to read!")))},ee=function(e){Object(P.a)(a,e);var t=Object(q.a)(a);function a(){return Object(U.a)(this,a),t.apply(this,arguments)}return Object(D.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{id:"welcome"},"Welcome, ",this.props.store.user.username,"!"),r.a.createElement("p",null,"Your ID is: ",this.props.store.user.id),r.a.createElement(V,{className:"log-in"}))}}]),a}(n.Component),te=Object(o.b)(J)(ee),ae=function(){return r.a.createElement("div",null,r.a.createElement("p",null,"Info Page"))},ne=(a(74),function(e){Object(P.a)(a,e);var t=Object(q.a)(a);function a(){var e;Object(U.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={username:"",password:""},e.registerUser=function(t){t.preventDefault(),e.props.dispatch({type:"REGISTER",payload:{username:e.state.username,password:e.state.password}})},e.handleInputChangeFor=function(t){return function(a){e.setState({[t]:a.target.value})}},e}return Object(D.a)(a,[{key:"render",value:function(){return r.a.createElement("form",{className:"formPanel",onSubmit:this.registerUser},r.a.createElement("h2",null,"Register User"),this.props.store.errors.registrationMessage&&r.a.createElement("h3",{className:"alert",role:"alert"},this.props.store.errors.registrationMessage),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"username"},"Username:",r.a.createElement("input",{type:"text",name:"username",value:this.state.username,required:!0,onChange:this.handleInputChangeFor("username")}))),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"password"},"Password:",r.a.createElement("input",{type:"password",name:"password",value:this.state.password,required:!0,onChange:this.handleInputChangeFor("password")}))),r.a.createElement("div",null,r.a.createElement("input",{className:"btn",type:"submit",name:"submit",value:"Register"})))}}]),a}(n.Component)),re=Object(o.b)(J)(ne),se=function(e){Object(P.a)(a,e);var t=Object(q.a)(a);function a(){var e;Object(U.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={heading:"Class Component"},e.onLogin=function(t){e.props.history.push("/login")},e}return Object(D.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("h2",null,this.state.heading),r.a.createElement("div",{className:"grid"},r.a.createElement("div",{className:"grid-col grid-col_8"},r.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id felis metus. Vestibulum et pulvinar tortor. Morbi pharetra lacus ut ex molestie blandit. Etiam et turpis sit amet risus mollis interdum. Suspendisse et justo vitae metus bibendum fringilla sed sed justo. Aliquam sollicitudin dapibus lectus, vitae consequat odio elementum eget. Praesent efficitur eros vitae nunc interdum, eu interdum justo facilisis. Sed pulvinar nulla ac dignissim efficitur. Quisque eget eros metus. Vestibulum bibendum fringilla nibh a luctus. Duis a sapien metus."),r.a.createElement("p",null,"Praesent consectetur orci dui, id elementum eros facilisis id. Sed id dolor in augue porttitor faucibus eget sit amet ante. Nunc consectetur placerat pharetra. Aenean gravida ex ut erat commodo, ut finibus metus facilisis. Nullam eget lectus non urna rhoncus accumsan quis id massa. Curabitur sit amet dolor nisl. Proin euismod, augue at condimentum rhoncus, massa lorem semper lacus, sed lobortis augue mi vel felis. Duis ultrices sapien at est convallis congue."),r.a.createElement("p",null,"Fusce porta diam ac tortor elementum, ut imperdiet metus volutpat. Suspendisse posuere dapibus maximus. Aliquam vitae felis libero. In vehicula sapien at semper ultrices. Vivamus sed feugiat libero. Sed sagittis neque id diam euismod, ut egestas felis ultricies. Nullam non fermentum mauris. Sed in enim ac turpis faucibus pretium in sit amet nisi.")),r.a.createElement("div",{className:"grid-col grid-col_4"},r.a.createElement(re,null),r.a.createElement("center",null,r.a.createElement("h4",null,"Already a Member?"),r.a.createElement("button",{className:"btn btn_sizeSm",onClick:this.onLogin},"Login")))))}}]),a}(n.Component),ce=Object(o.b)(J)(se),ue=function(e){Object(P.a)(a,e);var t=Object(q.a)(a);function a(){var e;Object(U.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={username:"",password:""},e}return Object(D.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(re,null),r.a.createElement("center",null,r.a.createElement("button",{type:"button",className:"btn btn_asLink",onClick:function(){e.props.history.push("/login")}},"Login")))}}]),a}(n.Component),oe=Object(o.b)(J)(ue),ie=(a(75),function(e){Object(P.a)(a,e);var t=Object(q.a)(a);function a(){return Object(U.a)(this,a),t.apply(this,arguments)}return Object(D.a)(a,[{key:"componentDidMount",value:function(){this.props.dispatch({type:"FETCH_USER"})}},{key:"render",value:function(){return r.a.createElement(M.a,null,r.a.createElement("div",null,r.a.createElement(z,null),r.a.createElement(H.d,null,r.a.createElement(H.a,{exact:!0,from:"/",to:"/home"}),r.a.createElement(H.b,{exact:!0,path:"/about",component:$}),r.a.createElement(Z,{exact:!0,path:"/user",component:te}),r.a.createElement(Z,{exact:!0,path:"/info",component:ae}),r.a.createElement(Z,{exact:!0,path:"/login",component:X,authRedirect:"/user"}),r.a.createElement(Z,{exact:!0,path:"/registration",component:oe,authRedirect:"/user"}),r.a.createElement(Z,{exact:!0,path:"/home",component:ce,authRedirect:"/user"}),r.a.createElement(H.b,{render:function(){return r.a.createElement("h1",null,"404")}})),r.a.createElement(B,null)))}}]),a}(n.Component)),le=Object(o.b)()(ie),me=Object(i.a)(),pe=[me],de=Object(u.e)(p,u.a.apply(void 0,pe));me.run(G),c.a.render(r.a.createElement(o.a,{store:de},r.a.createElement(le,null)),document.getElementById("react-root"))}},[[43,1,2]]]);
//# sourceMappingURL=main.448f0856.chunk.js.map