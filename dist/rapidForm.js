!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["react","react-dom"],t):"object"==typeof exports?exports.RapidForm=t(require("react"),require("react-dom")):e.RapidForm=t(e.react,e["react-dom"])}(window,function(e,t){return function(e){function t(t){for(var n,a,u=t[0],c=t[1],s=t[2],f=0,p=[];f<u.length;f++)a=u[f],o[a]&&p.push(o[a][0]),o[a]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);for(l&&l(t);p.length;)p.shift()();return i.push.apply(i,s||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],n=!0,u=1;u<r.length;u++){var c=r[u];0!==o[c]&&(n=!1)}n&&(i.splice(t--,1),e=a(a.s=r[0]))}return e}var n={},o={1:0},i=[];function a(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=n,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},a.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var u=window.webpackJsonpRapidForm=window.webpackJsonpRapidForm||[],c=u.push.bind(u);u.push=t,u=u.slice();for(var s=0;s<u.length;s++)t(u[s]);var l=c;return i.push([367,0]),r()}({0:function(t,r){t.exports=e},150:function(e,t,r){"use strict";var n=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e};Object.defineProperty(t,"__esModule",{value:!0});var o=r(95),i=r(0);t.default=function(e,t,r,a){switch(e){case"text":case"password":case"email":case"hidden":return i.createElement(o.TextContainer,n({key:r,"data-key":r},t));case"file":return i.createElement(o.FileContainer,n({key:r,"data-key":r},t));case void 0:return console.error("Warning: The prop `type` is marked as required, but its value is `undefined`"),null;default:return console.warn("Warning: This prop type='"+e+"' is not supported"),null}}},154:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(22),o=r(40);t.default=n.combineReducers({form:o.default})},155:function(e,t,r){"use strict";var n=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e};Object.defineProperty(t,"__esModule",{value:!0});var o=r(45),i=r(32),a=r(40),u=r(22);t.default=i.connect(function(e,t){var r=e.select,o=e.form,i=o.theme,a=o.errors;return n({},r,t,{theme:i,errors:a})},function(e){return u.bindActionCreators({setCheckError:a.setCheckError},e)})(o.Select)},156:function(e,t,r){"use strict";var n=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e};Object.defineProperty(t,"__esModule",{value:!0});var o=r(45),i=r(32),a=r(40),u=r(22);t.default=i.connect(function(e,t){var r=e.input,o=e.form.theme;return n({},r,t,{theme:o})},function(e){return u.bindActionCreators({setCheckError:a.setCheckError},e)})(o.File)},157:function(e,t,r){"use strict";var n=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e};Object.defineProperty(t,"__esModule",{value:!0});var o=r(45),i=r(32),a=r(40),u=r(22);t.default=i.connect(function(e,t){var r=e.input,o=e.form.theme;return n({},r,t,{theme:o})},function(e){return u.bindActionCreators({setCheckError:a.setCheckError},e)})(o.Text)},158:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Action={payload:null,type:""}},159:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0})},160:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0})},161:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(160);t.ConnectedTextProps=n.ConnectedTextProps;var o=r(159);t.callbackSubmit=o.callbackSubmit,t.callbackOnClick=o.callbackOnClick,t.setCheckError=o.setCheckError;var i=r(158);t.Action=i.Action},162:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=["text","password"]},163:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(162);t.inputTypes=n.default},164:function(e,t,r){"use strict";var n=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e};Object.defineProperty(t,"__esModule",{value:!0});var o=r(45),i=r(32),a=r(40),u=r(22);t.default=i.connect(function(e,t){var r=e.form;return n({},r,t)},function(e){return u.bindActionCreators(n({},a),e)})(o.Form)},165:function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),i=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},a=this&&this.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&(r[n[o]]=e[n[o]])}return r};Object.defineProperty(t,"__esModule",{value:!0});var u=r(39),c=r(31),s=r(1),l=r(0),f=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.handleValidation=function(e){var r=t.props,n=r.setCheckError,o=a(r,["setCheckError"]),s=Reflect.get(t.props,"data-validation"),l=Reflect.get(e.target,"value"),f=Reflect.get(o,"required"),p=Reflect.get(o,"data-key"),d=u.validationMethod(s,l);if(!s||!f)return n(i({},o,{value:l}),p,c.Map());n(i({},o,{value:l}),p,d)},t.handleRenderByTheme=function(){var e=t.props,r=(e.setCheckError,e.children),n=e.theme,o=(e.errors,a(e,["setCheckError","children","theme","errors"])),c=new u.Themes(n),s=l.createElement("select",i({},o),r),f=i({onChange:t.handleValidation},o);return c.renderField("select",i({},f,{children:r}),s)},t}return o(t,e),t.prototype.render=function(){var e=this.props;e.dispatch,e.children,a(e,["dispatch","children"]);return this.handleRenderByTheme()},t.propTypes={children:s.oneOfType([s.string,s.element,s.array]),className:s.string,errors:s.instanceOf(c.Map),key:s.oneOfType([s.string,s.number]),name:s.string,setCheckError:s.func,style:s.object,theme:s.string},t}(l.Component);t.default=f},166:function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),i=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},a=this&&this.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&(r[n[o]]=e[n[o]])}return r};Object.defineProperty(t,"__esModule",{value:!0});var u=r(39),c=r(31),s=r(1),l=r(0),f=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.handleValidation=function(e){var r=t.props,n=r.setCheckError,o=a(r,["setCheckError"]),s=Reflect.get(t.props,"data-validation"),l=Reflect.get(e.target.files[0],"name"),f=Reflect.get(o,"required"),p=Reflect.get(o,"data-key"),d=u.validationMethod(s,l);if(!s||!f)return n(i({},o,{value:l}),p,c.Map());n(i({},o,{value:l}),p,d)},t.handleRenderByTheme=function(){var e=t.props,r=(e.setCheckError,e.theme),n=e.type,o=a(e,["setCheckError","theme","type"]),c=new u.Themes(r),s=l.createElement("input",i({},o,{onChange:t.handleValidation})),f=i({onChange:t.handleValidation},o);return c.renderField(n,f,s)},t}return o(t,e),t.prototype.render=function(){return this.handleRenderByTheme()},t.propTypes={className:s.string,key:s.oneOfType([s.string,s.number]),name:s.string,setCheckError:s.func,style:s.object,theme:s.string,type:s.oneOf(["file"]).isRequired},t}(l.Component);t.default=f},167:function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),i=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},a=this&&this.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&(r[n[o]]=e[n[o]])}return r};Object.defineProperty(t,"__esModule",{value:!0});var u=r(39),c=r(31),s=r(1),l=r(0),f=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.handleValidation=function(e){var r=t.props,n=r.setCheckError,o=a(r,["setCheckError"]),s=Reflect.get(t.props,"data-validation"),l=Reflect.get(e.target,"value"),f=Reflect.get(o,"required"),p=Reflect.get(o,"data-key"),d=u.validationMethod(s,l);if(!s||!f)return n(i({},o,{value:l}),p,c.Map());n(i({},o,{value:l}),p,d)},t.handleRenderByTheme=function(){var e=t.props,r=(e.setCheckError,e.theme),n=e.type,o=a(e,["setCheckError","theme","type"]),c=new u.Themes(r),s=l.createElement("input",i({},o,{onChange:t.handleValidation})),f=i({onChange:t.handleValidation},o);return c.renderField(n,f,s)},t}return o(t,e),t.prototype.render=function(){return this.handleRenderByTheme()},t.propTypes={className:s.string,key:s.oneOfType([s.string,s.number]),name:s.string,setCheckError:s.func,style:s.object,theme:s.string,type:s.oneOf(["text","password","email","hidden"]).isRequired},t}(l.Component);t.default=f},169:function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),i=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e};Object.defineProperty(t,"__esModule",{value:!0});var a=r(168),u=r(39),c=r(31),s=r(1),l=r(0),f=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.renderByThemes=function(e){var r=t.props,n=r.theme,o=r.overrideTheme;return new u.Themes(n).renderByTheme(e,o)},t.readChildren=function(){var e=t.props,r=e.children,n=e.id,o=e.key;e.theme;if(r.length>1)return r.map(function(e,t){var r=Reflect.get(e.valueOf(),"props"),o=Reflect.get(e.valueOf(),"type"),a=i({},r,{formid:n});return u.typesManager(o,a,""+t,e)});var a=Reflect.get(r.valueOf(),"props"),c=Reflect.get(r.valueOf(),"type"),s=i({},a,{formid:n});return[u.typesManager(c,s,!o&&n)]},t.handleSubmit=function(e){var r=t.props,n=r.onSubmit,o=r.id,i=r.fields,c=r.checkAllReqFields;e.preventDefault();var s=document.querySelector("#"+o),l=a(s,{hash:!0}),f=0===Object.keys(l).length,p=u.analizeRequiredFields(i.get(o),l);if("function"==typeof n&&!f&&void 0===p)return n(e,l);c(o)},t}return o(t,e),t.prototype.componentDidMount=function(){var e=this.props,t=e.fields,r=e.setFields,n=e.setTheme,o=e.theme,i=e.id;t instanceof c.Map&&r(this.readChildren(),i),o&&n(o)},t.prototype.componentWillUpdate=function(e){var t=this.props,r=t.fields,n=t.setFields,o=e.id;!r.find(function(e,t){return t===o})&&r.size>0&&n(this.readChildren(),o)},t.prototype.render=function(){var e=this.props,t=(e.children,e.id),r=e.name,n=e.fields,o=(e.onSubmit,e.method),i=n.get(t)?n.get(t).toJS():null;return this.renderByThemes(l.createElement("form",{key:t,id:t,name:r||t,method:o,onSubmit:this.handleSubmit},i))},t.propTypes={checkAllReqFields:s.func.isRequired,fields:s.instanceOf(c.Map),id:s.string.isRequired,method:s.oneOf(["get","post"]).isRequired,onSubmit:s.func,overrideTheme:s.object,setFields:s.func.isRequired,setTheme:s.func.isRequired,theme:s.oneOf(["material-ui"])},t}(l.Component);t.default=f},18:function(e,r){e.exports=t},362:function(e,t,r){"use strict";var n=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},o=this&&this.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&(r[n[o]]=e[n[o]])}return r};Object.defineProperty(t,"__esModule",{value:!0});var i=r(361),a=r(252),u=r(237),c=r(229),s=r(115),l=r(67),f=r(107),p=r(203),d=r(177),h=r(174),y=r(171),v=r(46),m=r(0),O=function(){function e(e){var t=this;this.handleInputFile=function(){t.inputFile.click()},this.renderField=function(e,r,u){switch(t.themeName){case"material-ui":switch(e){case"text":case"email":case"password":case"hidden":var f=r.value,p=r.key;return m.createElement(y.default,n({key:e+"-"+p,type:e},r,{value:f||""}));case"file":var h=r.value,O=(r.error,r.key),_=o(r,["value","error","key"]);return m.createElement("div",null,m.createElement(a.default,{key:e+"-"+O,variant:"raised",onClick:t.handleInputFile},"upload",m.createElement(i.default,null),m.createElement("input",n({ref:function(e){return t.inputFile=e},style:{display:"none"},type:e},_))),m.createElement(v.default,{variant:"subheading"},h||""));case"button":var b=r.children,g=r.key,j=o(r,["children","key"]);return m.createElement(a.default,n({key:e+"-"+g},j),b);case"select":var P=r.children,k=o(r,["children"]),w=k.multiple,E=k.value,C=k.placeholder,R=k.withChip,M=k.multiCheckbox,T=k.error,S=k.required;Reflect.deleteProperty(k,"withChip"),Reflect.deleteProperty(k,"multiCheckbox");var x=m.createElement(l.default,{id:"select-placeholder"}),F={required:S};if(w){Reflect.deleteProperty(k,"value");var q=""!==E&&E?E:[],A=R?function(e){return e?e.map(function(e,t){return m.createElement(c.default,{key:"chip-"+t,label:e})}):[]}:function(e){return e.join(", ")};return C?m.createElement(s.FormControl,{error:T},m.createElement(l.InputLabel,{htmlFor:"select-placeholder"},C),m.createElement(d.default,n({inputProps:F,value:q,renderValue:A,input:x},k),t.renderMultipleSelect(P,q,M))):m.createElement(d.default,n({value:q,renderValue:A,inputProps:F},k),t.renderMultipleSelect(P,q,M))}return C?m.createElement(s.FormControl,{error:T},m.createElement(l.InputLabel,{htmlFor:"select-placeholder"},C),m.createElement(d.default,n({native:!0,input:x,inputProps:F},k),P)):m.createElement(d.default,n({native:!0,inputProps:F},k),P);default:return u}default:return u}},this.renderMultipleSelect=function(e,t,r){return(Array.isArray(e)?e:[e]).map(function(e,i){var a=e.props,c=a.value,s=a.children,l=o(a,["value","children"]),d=!!Array.isArray(t)&&t.indexOf(c)>-1;return r?m.createElement(p.MenuItem,n({key:"option-"+i,value:c},l),m.createElement(u.default,{checked:d}),m.createElement(f.ListItemText,{primary:s})):m.createElement(p.MenuItem,n({key:"option-"+i,value:c},l),m.createElement(f.ListItemText,{primary:s}))})},this.themeName=e}return e.prototype.renderByTheme=function(e,t){switch(void 0===t&&(t={}),this.themeName){case"material-ui":var r=h.createMuiTheme(t);return m.createElement("div",null,m.createElement(h.MuiThemeProvider,{theme:r},e));default:return e}},e}();t.default=O},363:function(e,t,r){"use strict";var n=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},o=this&&this.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&(r[n[o]]=e[n[o]])}return r};Object.defineProperty(t,"__esModule",{value:!0});var i=r(31),a=r(0);t.analizeFields=function(e,t,r){return void 0===r&&(r=""),e.map(function(e){var u=e.get("type"),c=e.get("key"),s=e.get("props").toJS(),l=s.children,f=o(s,["children"]);if(l){var p=l.props;if(Array.isArray(l))return null;var d=n({},p,{error:!t,value:r});return i.fromJS(a.createElement(u,n({},f,{key:c}),a.cloneElement(l,d)))}var h=n({},f,{error:!t});return i.fromJS(a.createElement(u,n({},h,{key:c,value:r})))})},t.analizeRequiredFields=function(e,t){var r=[];return e.map(function(e){e.get("type"),e.get("key");var n=e.get("props").toJS(),i=n.children,a=n.required,u=n.name;o(n,["children","required","name"]);if(i){var c=i.props,s=c.required,l=c.name;Array.isArray(i),s&&!Reflect.get(t,l)?r.push({name:l,check:!1}):u&&r.push({name:l,check:!0})}a&&!Reflect.get(t,u)?r.push({name:u,check:!1}):u&&r.push({name:u,check:!0})}),r.find(function(e){return!1===e.check})},t.analizeErrors=function(e,t,r,o,a){var u=o.get(e);return a.size>0?o.setIn([e,t],i.fromJS(n({name:r},a.toJS()))).filter(function(e){return void 0!==e}):u&&u.size>0&&u.getIn([""+t,"name"])===r?1===u.size?u.delete("0"):o.setIn([e],u.delete(""+t)):o};t.default=function(e,t){var r=i.Map();return e.split(",").map(function(e){switch(e){case"empty":default:(""===t||void 0===t||Array.isArray(t)&&0===t.length)&&(r=r.set(e,!0))}}),r}},364:function(e,t,r){"use strict";var n=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},o=this&&this.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&(r[n[o]]=e[n[o]])}return r};Object.defineProperty(t,"__esModule",{value:!0});var i=r(95),a=r(0),u=r(150),c=function(e,t,r,s){var l=t.formid;switch(e){case"input":var f=t.type;return u.default(f,t,r);case"button":return a.createElement(i.ButtonContainer,n({},t));case"select":return a.createElement(i.SelectContainer,n({"data-key":r},t));case void 0:return console.error("Warning: The prop `type` is marked as required, but its value is `undefined`"),null;default:t.children;var p=o(t,["children"]),d=Reflect.get(t,"children");if(Array.isArray(d)&&d.length>1){var h=d.map(function(e,t){var r=Reflect.get(e.valueOf(),"type"),o=Reflect.get(e.valueOf(),"props");return c(r,n({},o,{formid:l}),t,e)});return a.createElement(e,n({},p,{key:r,formid:l}),h)}if("string"==typeof d)return a.createElement(e,n({},p,{key:r,formid:l}),d);var y=Reflect.get(d.valueOf(),"type"),v=Reflect.get(d.valueOf(),"props"),m=c(y,n({},v,{formid:l}),r,d);return a.createElement(e,n({},p,{key:r,formid:l}),m)}};t.default=c},365:function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),i=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},a=this&&this.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&(r[n[o]]=e[n[o]])}return r};Object.defineProperty(t,"__esModule",{value:!0});var u=r(39),c=r(31),s=r(1),l=r(0),f=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.handleRenderByTheme=function(){var e=t.props,r=e.children,n=e.theme,o=e.errors,c=e.formid,s=a(e,["children","theme","errors","formid"]),f=new u.Themes(n),p=o.get(c)&&o.get(c).size>0,d=i({},s,{disabled:p}),h=l.createElement("button",i({},d),r);return f.renderField("button",i({},d,{children:r}),h)},t}return o(t,e),t.prototype.render=function(){var e=this.props;e.dispatch,e.children,a(e,["dispatch","children"]);return this.handleRenderByTheme()},t.propTypes={children:s.oneOfType([s.string,s.element]),className:s.string,errors:s.instanceOf(c.Map),formid:s.string.isRequired,key:s.oneOfType([s.string,s.number]),name:s.string,style:s.object,theme:s.string,type:s.oneOf(["submit","reset","button","menu"]).isRequired},t}(l.Component);t.default=f},366:function(e,t,r){"use strict";var n=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e};Object.defineProperty(t,"__esModule",{value:!0});var o=r(45),i=r(32);t.default=i.connect(function(e,t){var r=e.button,o=e.form,i=o.theme,a=o.errors;return n({},r,t,{theme:i,errors:a})},function(e,t){return{}})(o.Button)},367:function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),i=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},a=this&&this.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&(r[n[o]]=e[n[o]])}return r};Object.defineProperty(t,"__esModule",{value:!0});var u=r(95),c=r(0),s=r(32),l=r(154),f=r(22),p=r(153),d=r(152),h=p.composeWithDevTools(f.applyMiddleware(d.default)),y=f.createStore(l.default,h),v=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.prototype.render=function(){var e=this.props,t=e.children,r=a(e,["children"]);return c.createElement(s.Provider,{store:y},c.createElement(u.FormContainer,i({},r),t))},t}(c.Component);t.default=v},39:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(364);t.typesManager=n.default;var o=r(150);t.typesInput=o.default;var i=r(363);t.validationMethod=i.default,t.analizeFields=i.analizeFields,t.analizeErrors=i.analizeErrors,t.analizeRequiredFields=i.analizeRequiredFields;var a=r(362);t.Themes=a.default},40:function(e,t,r){"use strict";var n=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e};Object.defineProperty(t,"__esModule",{value:!0});var o=r(163),i=r(39),a=r(31),u=r(161),c={errors:a.Map(),fields:a.Map(),theme:""},s="SET_FIELDS",l="SET_THEME",f="SET_ERRORS",p="SET_CHECK_ERROR";t.setFields=function(e,t){return{fields:a.fromJS(e),id:t,type:s}},t.setTheme=function(e){return{theme:e,type:l}},t.checkAllReqFields=function(e){return function(r,n){n().form.fields.get(e).map(function(e){var n=e.get("key"),a=e.get("props").toJS(),u=a.children;if(u){if(Array.isArray(u))return null;var c=Reflect.get(u,"props"),s=c.value,l=c.type,f=c.required;if(!o.inputTypes.find(function(e){return e===l})&&!f)return null;var p=Reflect.get(c,"data-validation");r(t.setCheckError(c,n,i.validationMethod(p,s)))}var d=a.value,h=a.type,y=a.required;if(!o.inputTypes.find(function(e){return e===h})&&!y)return null;var v=Reflect.get(a,"data-validation");r(t.setCheckError(a,n,i.validationMethod(v,d)))})}},t.setCheckError=function(e,t,r){return function(n,o){var u=o().form.errors,c=e.name,s=e.value,l=e.formid;n({errors:i.analizeErrors(l,t,c,u,r),type:f});var d=a.fromJS(o().form.fields.get(l)),h=d.filter(function(e){return e.get("key")===t}),y=i.analizeFields(h,0===r.size,s),v=h.merge(y);return n({fields:d.update(t,function(){return a.fromJS(v.toJS()[0])}),id:l,type:p})}},t.default=function(e,t){void 0===e&&(e=c),void 0===t&&(t=u.Action);var r=t.type,o=t.fields,i=t.theme,a=t.errors,d=t.id;switch(r){case s:case p:var h=e.fields.set(d,o);return n({},e,{fields:h});case f:return n({},e,{errors:a});case l:return n({},e,{theme:i});default:return e}}},45:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(365);t.Button=n.default;var o=r(169);t.Form=o.default;var i=r(167);t.Text=i.default;var a=r(166);t.File=a.default;var u=r(165);t.Select=u.default},95:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(366);t.ButtonContainer=n.default;var o=r(164);t.FormContainer=o.default;var i=r(157);t.TextContainer=i.default;var a=r(156);t.FileContainer=a.default;var u=r(155);t.SelectContainer=u.default}})});
//# sourceMappingURL=rapidForm.js.map