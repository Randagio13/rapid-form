!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("rapidForm",[],t):"object"==typeof exports?exports.rapidForm=t():e.rapidForm=t()}(window,function(){return function(e){function t(t){for(var n,o,a=t[0],c=t[1],l=t[2],u=0,p=[];u<a.length;u++)o=a[u],s[o]&&p.push(s[o][0]),s[o]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);for(d&&d(t);p.length;)p.shift()();return i.push.apply(i,l||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],n=!0,a=1;a<r.length;a++){var c=r[a];0!==s[c]&&(n=!1)}n&&(i.splice(t--,1),e=o(o.s=r[0]))}return e}var n={},s={1:0},i=[];function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=n,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},o.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var a=window.webpackJsonprapidForm=window.webpackJsonprapidForm||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var l=0;l<a.length;l++)t(a[l]);var d=c;return i.push([163,0]),r()}({102:function(e,t){},163:function(e,t,r){"use strict";r.r(t);var n={};r.d(n,"setFields",function(){return oe}),r.d(n,"setTheme",function(){return ae}),r.d(n,"checkAllReqFields",function(){return ce}),r.d(n,"setCheckError",function(){return le}),r.d(n,"default",function(){return de});var s=r(0);var i=(e,t,r,n)=>{switch(e){case"text":case"password":case"email":case"hidden":return s.createElement(he,Object.assign({key:r,"data-key":r},t));case"file":return s.createElement(fe,Object.assign({key:r,"data-key":r},t));case void 0:return console.error("Warning: The prop `type` is marked as required, but its value is `undefined`"),null;default:return console.warn(`Warning: This prop type='${e}' is not supported`),null}},o=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(n=Object.getOwnPropertySymbols(e);s<n.length;s++)t.indexOf(n[s])<0&&(r[n[s]]=e[n[s]])}return r};const a=(e,t,r,n)=>{const{formid:c}=t;switch(e){case"input":const{type:n}=t;return i(n,t,r);case"button":return s.createElement(Y,Object.assign({},t));case"select":return s.createElement(me,Object.assign({"data-key":r},t));case void 0:return console.error("Warning: The prop `type` is marked as required, but its value is `undefined`"),null;default:const{children:l}=t,d=o(t,["children"]),u=Reflect.get(t,"children");if(Array.isArray(u)&&u.length>1){const t=u.map((e,t)=>{const r=Reflect.get(e.valueOf(),"type"),n=Reflect.get(e.valueOf(),"props");return a(r,Object.assign({},n,{formid:c}),t,e)});return s.createElement(e,Object.assign({},d,{key:r,formid:c}),t)}if("string"==typeof u)return s.createElement(e,Object.assign({},d,{key:r,formid:c}),u);const p=Reflect.get(u.valueOf(),"type"),h=Reflect.get(u.valueOf(),"props"),f=a(p,Object.assign({},h,{formid:c}),r,u);return s.createElement(e,Object.assign({},d,{key:r,formid:c}),f)}};var c=a,l=r(13),d=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(n=Object.getOwnPropertySymbols(e);s<n.length;s++)t.indexOf(n[s])<0&&(r[n[s]]=e[n[s]])}return r};const u=(e,t)=>{const r=[];return e.map(e=>{e.get("type"),e.get("key");const n=e.get("props").toJS(),{children:s,required:i,name:o}=n;d(n,["children","required","name"]);if(s){const{props:e}=s,{required:n,name:i}=e;Array.isArray(s),n&&!Reflect.get(t,i)?r.push({name:i,check:!1}):o&&r.push({name:i,check:!0})}i&&!Reflect.get(t,o)?r.push({name:o,check:!1}):o&&r.push({name:o,check:!0})}),r.find(e=>{const{check:t}=e;return!1===t})};var p=(e,t)=>{let r=Object(l.Map)();return e.split(",").map(e=>{switch(e){case"empty":default:(""===t||void 0===t||Array.isArray(t)&&0===t.length)&&(r=r.set(e,!0))}}),r},h=r(162),f=r.n(h),m=r(100),y=r.n(m),O=r(160),b=r.n(O),g=r(159),j=r.n(g),v=r(65),E=r(39),k=r.n(E),R=r(64),w=r(99),C=r(45),S=r.n(C),T=r(98),x=r(158),P=r.n(x),F=r(44),q=r.n(F),M=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(n=Object.getOwnPropertySymbols(e);s<n.length;s++)t.indexOf(n[s])<0&&(r[n[s]]=e[n[s]])}return r};var A=class{constructor(e){this.handleInputFile=(()=>{this.inputFile.click()}),this.renderField=((e,t,r)=>{switch(this.themeName){case"material-ui":switch(e){case"text":case"email":case"password":case"hidden":const{value:n}=t;return s.createElement(P.a,Object.assign({type:e},t,{value:n||""}));case"file":const{value:i,error:o}=t,a=M(t,["value","error"]);return s.createElement("div",null,s.createElement(y.a,{variant:"raised",onClick:this.handleInputFile},"upload",s.createElement(f.a,null),s.createElement("input",Object.assign({ref:e=>{this.inputFile=e},style:{display:"none"},type:e},a))),s.createElement(q.a,{type:"subheading"},i||""));case"button":const{children:c}=t,l=M(t,["children"]);return s.createElement(y.a,Object.assign({},l),c);case"select":const{children:d}=t,u=M(t,["children"]),{multiple:p,value:h,placeholder:m,withChip:O,multiCheckbox:b,error:g,required:R}=u;Reflect.deleteProperty(u,"withChip"),Reflect.deleteProperty(u,"multiCheckbox");const w=s.createElement(k.a,{id:"select-placeholder"}),C={required:R};if(p){Reflect.deleteProperty(u,"value");const e=""!==h&&h?h:[],t=O?e=>e?e.map((e,t)=>s.createElement(j.a,{key:t,label:e})):[]:e=>e.join(", ");return m?s.createElement(v.FormControl,{error:g},s.createElement(E.InputLabel,{htmlFor:"select-placeholder"},m),s.createElement(S.a,Object.assign({inputProps:C,value:e,renderValue:t,input:w},u),this.renderMultipleSelect(d,e,b))):s.createElement(S.a,Object.assign({value:e,renderValue:t,inputProps:C},u),this.renderMultipleSelect(d,e,b))}return m?s.createElement(v.FormControl,{error:g},s.createElement(E.InputLabel,{htmlFor:"select-placeholder"},m),s.createElement(S.a,Object.assign({native:!0,input:w,inputProps:C},u),d)):s.createElement(S.a,Object.assign({native:!0,inputProps:C},u),d);default:return r}default:return r}}),this.renderMultipleSelect=((e,t,r)=>(Array.isArray(e)?e:[e]).map((e,n)=>{const{props:i}=e,{value:o,children:a}=i,c=M(i,["value","children"]),l=!!Array.isArray(t)&&t.indexOf(o)>-1;return r?s.createElement(w.MenuItem,Object.assign({key:n,value:o},c),s.createElement(b.a,{checked:l}),s.createElement(R.ListItemText,{primary:a})):s.createElement(w.MenuItem,Object.assign({key:n,value:o},c),s.createElement(R.ListItemText,{primary:a}))})),this.themeName=e}renderByTheme(e,t={}){switch(this.themeName){case"material-ui":const r=Object(T.createMuiTheme)(t);return s.createElement("div",null,s.createElement(T.MuiThemeProvider,{theme:r},e));default:return e}}},J=r(1),B=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(n=Object.getOwnPropertySymbols(e);s<n.length;s++)t.indexOf(n[s])<0&&(r[n[s]]=e[n[s]])}return r};class I extends s.Component{constructor(){super(...arguments),this.handleRenderByTheme=(()=>{const e=this.props,{children:t,theme:r,errors:n,formid:i}=e,o=B(e,["children","theme","errors","formid"]),a=new A(r),c=n.get(i)&&n.get(i).size>0,l=Object.assign({},o,{disabled:c}),d=s.createElement("button",Object.assign({},l),t);return a.renderField("button",Object.assign({},l,{children:t}),d)})}render(){const e=this.props,{dispatch:t,children:r}=e;B(e,["dispatch","children"]);return this.handleRenderByTheme()}}I.propTypes={children:J.oneOfType([J.string,J.element]),className:J.string,errors:J.instanceOf(l.Map),formid:J.string.isRequired,key:J.oneOfType([J.string,J.number]),name:J.string,style:J.object,theme:J.string,type:J.oneOf(["submit","reset","button","menu"]).isRequired};var V=I,_=r(157);class N extends s.Component{constructor(){super(...arguments),this.renderByThemes=(e=>{const{theme:t,overrideTheme:r}=this.props;return new A(t).renderByTheme(e,r)}),this.readChildren=(()=>{const{children:e,id:t,key:r,theme:n}=this.props;if(e.length>1)return e.map((e,r)=>{const n=Reflect.get(e.valueOf(),"props"),s=Reflect.get(e.valueOf(),"type"),i=Object.assign({},n,{formid:t});return c(s,i,`${r}`,e)});const s=Reflect.get(e.valueOf(),"props"),i=Reflect.get(e.valueOf(),"type"),o=Object.assign({},s,{formid:t});return[c(i,o,!r&&t)]}),this.handleSubmit=(e=>{const{onSubmit:t,id:r,fields:n,checkAllReqFields:s}=this.props;e.preventDefault();const i=document.querySelector(`#${r}`),o=_(i,{hash:!0}),a=0===Object.keys(o).length,c=u(n.get(r),o);if("function"==typeof t&&!a&&void 0===c)return t(e,o);s(r)})}componentDidMount(){const{fields:e,setFields:t,setTheme:r,theme:n,id:s}=this.props;e instanceof l.Map&&t(this.readChildren(),s),n&&r(n)}componentWillUpdate(e){const{fields:t,setFields:r}=this.props,{id:n}=e;!t.find((e,t)=>t===n)&&t.size>0&&r(this.readChildren(),n)}render(){const{children:e,id:t,name:r,fields:n,onSubmit:i,method:o}=this.props,a=n.get(t)?n.get(t).toJS():null;return this.renderByThemes(s.createElement("form",{key:t,id:t,name:r||t,method:o,onSubmit:this.handleSubmit},a))}}N.propTypes={checkAllReqFields:J.func.isRequired,fields:J.instanceOf(l.Map),id:J.string.isRequired,method:J.oneOf(["get","post"]).isRequired,onSubmit:J.func,overrideTheme:J.object,setFields:J.func.isRequired,setTheme:J.func.isRequired,theme:J.oneOf(["material-ui"])};var z=N,L=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(n=Object.getOwnPropertySymbols(e);s<n.length;s++)t.indexOf(n[s])<0&&(r[n[s]]=e[n[s]])}return r};class W extends s.Component{constructor(){super(...arguments),this.handleValidation=(e=>{const t=this.props,{setCheckError:r}=t,n=L(t,["setCheckError"]),s=Reflect.get(this.props,"data-validation"),i=Reflect.get(e.target,"value"),o=Reflect.get(n,"required"),a=Reflect.get(n,"data-key"),c=p(s,i);if(!s||!o)return r(Object.assign({},n,{value:i}),a,Object(l.Map)());r(Object.assign({},n,{value:i}),a,c)}),this.handleRenderByTheme=(()=>{const e=this.props,{setCheckError:t,theme:r,type:n}=e,i=L(e,["setCheckError","theme","type"]),o=new A(r),a=s.createElement("input",Object.assign({},i,{onChange:this.handleValidation})),c=Object.assign({onChange:this.handleValidation},i);return o.renderField(n,c,a)})}render(){return this.handleRenderByTheme()}}W.propTypes={className:J.string,key:J.oneOfType([J.string,J.number]),name:J.string,setCheckError:J.func,style:J.object,theme:J.string,type:J.oneOf(["text","password","email","hidden"]).isRequired};var $=W,D=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(n=Object.getOwnPropertySymbols(e);s<n.length;s++)t.indexOf(n[s])<0&&(r[n[s]]=e[n[s]])}return r};class H extends s.Component{constructor(){super(...arguments),this.handleValidation=(e=>{const t=this.props,{setCheckError:r}=t,n=D(t,["setCheckError"]),s=Reflect.get(this.props,"data-validation"),i=Reflect.get(e.target.files[0],"name"),o=Reflect.get(n,"required"),a=Reflect.get(n,"data-key"),c=p(s,i);if(!s||!o)return r(Object.assign({},n,{value:i}),a,Object(l.Map)());r(Object.assign({},n,{value:i}),a,c)}),this.handleRenderByTheme=(()=>{const e=this.props,{setCheckError:t,theme:r,type:n}=e,i=D(e,["setCheckError","theme","type"]),o=new A(r),a=s.createElement("input",Object.assign({},i,{onChange:this.handleValidation})),c=Object.assign({onChange:this.handleValidation},i);return o.renderField(n,c,a)})}render(){return this.handleRenderByTheme()}}H.propTypes={className:J.string,key:J.oneOfType([J.string,J.number]),name:J.string,setCheckError:J.func,style:J.object,theme:J.string,type:J.oneOf(["file"]).isRequired};var K=H,U=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(n=Object.getOwnPropertySymbols(e);s<n.length;s++)t.indexOf(n[s])<0&&(r[n[s]]=e[n[s]])}return r};class G extends s.Component{constructor(){super(...arguments),this.handleValidation=(e=>{const t=this.props,{setCheckError:r}=t,n=U(t,["setCheckError"]),s=Reflect.get(this.props,"data-validation"),i=Reflect.get(e.target,"value"),o=Reflect.get(n,"required"),a=Reflect.get(n,"data-key"),c=p(s,i);if(!s||!o)return r(Object.assign({},n,{value:i}),a,Object(l.Map)());r(Object.assign({},n,{value:i}),a,c)}),this.handleRenderByTheme=(()=>{const e=this.props,{setCheckError:t,children:r,theme:n,errors:i}=e,o=U(e,["setCheckError","children","theme","errors"]),a=new A(n),c=s.createElement("select",Object.assign({},o),r),l=Object.assign({onChange:this.handleValidation},o);return a.renderField("select",Object.assign({},l,{children:r}),c)})}render(){const e=this.props,{dispatch:t,children:r}=e;U(e,["dispatch","children"]);return this.handleRenderByTheme()}}G.propTypes={children:J.oneOfType([J.string,J.element,J.array]),className:J.string,errors:J.instanceOf(l.Map),key:J.oneOfType([J.string,J.number]),name:J.string,setCheckError:J.func,style:J.object,theme:J.string};var Q=G,X=r(18);var Y=Object(X.b)(({button:e,form:{theme:t,errors:r}},n)=>Object.assign({},e,n,{theme:t,errors:r}),(e,t)=>({}))(V);var Z=["text","password"];r(102),r(46);const ee={payload:null,type:""},te={errors:Object(l.Map)(),fields:Object(l.Map)(),theme:""},re="SET_FIELDS",ne="SET_THEME",se="SET_ERRORS",ie="SET_CHECK_ERROR",oe=(e,t)=>({fields:Object(l.fromJS)(e),id:t,type:re}),ae=e=>({theme:e,type:ne}),ce=e=>(t,r)=>{const{form:{fields:n}}=r();n.get(e).map(e=>{const r=e.get("key"),n=e.get("props").toJS(),{children:s}=n;if(s){if(Array.isArray(s))return null;const e=Reflect.get(s,"props"),{value:n,type:i,required:o}=e;if(!Z.find(e=>e===i)&&!o)return null;const a=Reflect.get(e,"data-validation");t(le(e,r,p(a,n)))}const{value:i,type:o,required:a}=n;if(!Z.find(e=>e===o)&&!a)return null;const c=Reflect.get(n,"data-validation");t(le(n,r,p(c,i)))})},le=(e,t,r)=>(n,i)=>{const o=i().form.errors,{name:a,value:c,formid:u}=e;n({errors:((e,t,r,n,s)=>{const i=n.get(e);return s.size>0?n.setIn([e,t],Object(l.fromJS)(Object.assign({name:r},s.toJS()))).filter(e=>void 0!==e):i&&i.size>0&&i.getIn([`${t}`,"name"])===r?1===i.size?i.delete("0"):n.setIn([e],i.delete(`${t}`)):n})(u,t,a,o,r),type:se});const p=Object(l.fromJS)(i().form.fields.get(u)),h=p.filter(e=>e.get("key")===t),f=((e,t,r="")=>e.map(e=>{const n=e.get("type"),i=e.get("key"),o=e.get("props").toJS(),{children:a}=o,c=d(o,["children"]);if(a){const{props:e}=a;if(Array.isArray(a))return null;const o=Object.assign({},e,{error:!t,value:r});return Object(l.fromJS)(s.createElement(n,Object.assign({},c,{key:i}),s.cloneElement(a,o)))}const u=Object.assign({},c,{error:!t});return Object(l.fromJS)(s.createElement(n,Object.assign({},u,{key:i,value:r})))}))(h,0===r.size,c),m=h.merge(f);return n({fields:p.update(t,()=>Object(l.fromJS)(m.toJS()[0])),id:u,type:ie})};function de(e=te,t=ee){const{type:r,fields:n,theme:s,errors:i,id:o}=t;switch(r){case re:case ie:const t=e.fields.set(o,n);return Object.assign({},e,{fields:t});case se:return Object.assign({},e,{errors:i});case ne:return Object.assign({},e,{theme:s});default:return e}}var ue=r(14);var pe=Object(X.b)(({form:e},t)=>Object.assign({},e,t),e=>Object(ue.bindActionCreators)(Object.assign({},n),e))(z);var he=Object(X.b)(({input:e,form:{theme:t}},r)=>Object.assign({},e,r,{theme:t}),e=>Object(ue.bindActionCreators)({setCheckError:le},e))($);var fe=Object(X.b)(({input:e,form:{theme:t}},r)=>Object.assign({},e,r,{theme:t}),e=>Object(ue.bindActionCreators)({setCheckError:le},e))(K);var me=Object(X.b)(({select:e,form:{theme:t,errors:r}},n)=>Object.assign({},e,n,{theme:t,errors:r}),e=>Object(ue.bindActionCreators)({setCheckError:le},e))(Q),ye=Object(ue.combineReducers)({form:de}),Oe=r(156),be=r(155),ge=r.n(be),je=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(n=Object.getOwnPropertySymbols(e);s<n.length;s++)t.indexOf(n[s])<0&&(r[n[s]]=e[n[s]])}return r};const ve=Object(Oe.composeWithDevTools)(Object(ue.applyMiddleware)(ge.a)),Ee=Object(ue.createStore)(ye,ve);t.default=class extends s.Component{render(){const e=this.props,{children:t}=e,r=je(e,["children"]);return s.createElement(X.a,{store:Ee},s.createElement(pe,Object.assign({},r),t))}}},46:function(e,t){}})});
//# sourceMappingURL=rapidForm.js.map