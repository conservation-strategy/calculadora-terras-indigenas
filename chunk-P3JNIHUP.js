import{p as vt}from"./chunk-MK5MZXZQ.js";import{Ka as ct,Pa as x,Sa as ut,V as Y,W as st,ab as dt,ca as V,da as ot,ea as lt,ib as mt,la as R,ob as ht,pb as pt,ta as ft,zb as X}from"./chunk-S6EIKXLU.js";function z(t){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?z=function(e){return typeof e}:z=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},z(t)}function te(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function gt(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function ee(t,e,r){return e&&gt(t.prototype,e),r&&gt(t,r),t}function ne(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function f(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{},n=Object.keys(r);typeof Object.getOwnPropertySymbols=="function"&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(a){return Object.getOwnPropertyDescriptor(r,a).enumerable}))),n.forEach(function(a){ne(t,a,r[a])})}return t}function Tt(t,e){return ae(t)||re(t,e)||ie()}function ae(t){if(Array.isArray(t))return t}function re(t,e){var r=[],n=!0,a=!1,i=void 0;try{for(var s=t[Symbol.iterator](),o;!(n=(o=s.next()).done)&&(r.push(o.value),!(e&&r.length===e));n=!0);}catch(l){a=!0,i=l}finally{try{!n&&s.return!=null&&s.return()}finally{if(a)throw i}}return r}function ie(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}var yt=function(){},tt={},Mt={},se=null,Nt={mark:yt,measure:yt};try{typeof window<"u"&&(tt=window),typeof document<"u"&&(Mt=document),typeof MutationObserver<"u"&&(se=MutationObserver),typeof performance<"u"&&(Nt=performance)}catch{}var oe=tt.navigator||{},bt=oe.userAgent,wt=bt===void 0?"":bt,W=tt,u=Mt;var D=Nt,tn=!!W.document,et=!!u.documentElement&&!!u.head&&typeof u.addEventListener=="function"&&typeof u.createElement=="function",en=~wt.indexOf("MSIE")||~wt.indexOf("Trident/"),b="___FONT_AWESOME___";var Pt="fa",zt="svg-inline--fa",le="data-fa-i2svg";var nn=function(){try{return!0}catch{return!1}}();var _t=[1,2,3,4,5,6,7,8,9,10],fe=_t.concat([11,12,13,14,15,16,17,18,19,20]);var O={GROUP:"group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},an=["xs","sm","lg","fw","ul","li","border","pull-left","pull-right","spin","pulse","rotate-90","rotate-180","rotate-270","flip-horizontal","flip-vertical","flip-both","stack","stack-1x","stack-2x","inverse","layers","layers-text","layers-counter",O.GROUP,O.SWAP_OPACITY,O.PRIMARY,O.SECONDARY].concat(_t.map(function(t){return"".concat(t,"x")})).concat(fe.map(function(t){return"w-".concat(t)})),Lt=W.FontAwesomeConfig||{};function ce(t){var e=u.querySelector("script["+t+"]");if(e)return e.getAttribute(t)}function ue(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}u&&typeof u.querySelector=="function"&&(kt=[["data-family-prefix","familyPrefix"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]],kt.forEach(function(t){var e=Tt(t,2),r=e[0],n=e[1],a=ue(ce(r));a!=null&&(Lt[n]=a)}));var kt,de={familyPrefix:Pt,replacementClass:zt,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0},Q=f({},de,Lt);Q.autoReplaceSvg||(Q.observeMutations=!1);var m=f({},Q);W.FontAwesomeConfig=m;var w=W||{};w[b]||(w[b]={});w[b].styles||(w[b].styles={});w[b].hooks||(w[b].hooks={});w[b].shims||(w[b].shims=[]);var g=w[b],me=[],he=function t(){u.removeEventListener("DOMContentLoaded",t),K=1,me.map(function(e){return e()})},K=!1;et&&(K=(u.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(u.readyState),K||u.addEventListener("DOMContentLoaded",he));var nt="pending",Rt="settled",j="fulfilled",F="rejected",pe=function(){},Dt=typeof global<"u"&&typeof global.process<"u"&&typeof global.process.emit=="function",ve=typeof setImmediate>"u"?setTimeout:setImmediate,P=[],J;function ge(){for(var t=0;t<P.length;t++)P[t][0](P[t][1]);P=[],J=!1}function $(t,e){P.push([t,e]),J||(J=!0,ve(ge,0))}function ye(t,e){function r(a){at(e,a)}function n(a){_(e,a)}try{t(r,n)}catch(a){n(a)}}function jt(t){var e=t.owner,r=e._state,n=e._data,a=t[r],i=t.then;if(typeof a=="function"){r=j;try{n=a(n)}catch(s){_(i,s)}}Ft(i,n)||(r===j&&at(i,n),r===F&&_(i,n))}function Ft(t,e){var r;try{if(t===e)throw new TypeError("A promises callback cannot return that same promise.");if(e&&(typeof e=="function"||z(e)==="object")){var n=e.then;if(typeof n=="function")return n.call(e,function(a){r||(r=!0,e===a?$t(t,a):at(t,a))},function(a){r||(r=!0,_(t,a))}),!0}}catch(a){return r||_(t,a),!0}return!1}function at(t,e){(t===e||!Ft(t,e))&&$t(t,e)}function $t(t,e){t._state===nt&&(t._state=Rt,t._data=e,$(be,t))}function _(t,e){t._state===nt&&(t._state=Rt,t._data=e,$(we,t))}function Ht(t){t._then=t._then.forEach(jt)}function be(t){t._state=j,Ht(t)}function we(t){t._state=F,Ht(t),!t._handled&&Dt&&global.process.emit("unhandledRejection",t._data,t)}function ke(t){global.process.emit("rejectionHandled",t)}function p(t){if(typeof t!="function")throw new TypeError("Promise resolver "+t+" is not a function");if(!(this instanceof p))throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this._then=[],ye(t,this)}p.prototype={constructor:p,_state:nt,_then:null,_data:void 0,_handled:!1,then:function(e,r){var n={owner:this,then:new this.constructor(pe),fulfilled:e,rejected:r};return(r||e)&&!this._handled&&(this._handled=!0,this._state===F&&Dt&&$(ke,this)),this._state===j||this._state===F?$(jt,n):this._then.push(n),n.then},catch:function(e){return this.then(null,e)}};p.all=function(t){if(!Array.isArray(t))throw new TypeError("You must pass an array to Promise.all().");return new p(function(e,r){var n=[],a=0;function i(l){return a++,function(c){n[l]=c,--a||e(n)}}for(var s=0,o;s<t.length;s++)o=t[s],o&&typeof o.then=="function"?o.then(i(s),r):n[s]=o;a||e(n)})};p.race=function(t){if(!Array.isArray(t))throw new TypeError("You must pass an array to Promise.race().");return new p(function(e,r){for(var n=0,a;n<t.length;n++)a=t[n],a&&typeof a.then=="function"?a.then(e,r):e(a)})};p.resolve=function(t){return t&&z(t)==="object"&&t.constructor===p?t:new p(function(e){e(t)})};p.reject=function(t){return new p(function(e,r){r(t)})};var M={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function xe(t){if(!(!t||!et)){var e=u.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;for(var r=u.head.childNodes,n=null,a=r.length-1;a>-1;a--){var i=r[a],s=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(s)>-1&&(n=i)}return u.head.insertBefore(e,n),t}}var Ie="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function H(){for(var t=12,e="";t-- >0;)e+=Ie[Math.random()*62|0];return e}function Wt(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Ce(t){return Object.keys(t||{}).reduce(function(e,r){return e+"".concat(r,'="').concat(Wt(t[r]),'" ')},"").trim()}function Bt(t){return Object.keys(t||{}).reduce(function(e,r){return e+"".concat(r,": ").concat(t[r],";")},"")}function Ut(t){return t.size!==M.size||t.x!==M.x||t.y!==M.y||t.rotate!==M.rotate||t.flipX||t.flipY}function Yt(t){var e=t.transform,r=t.containerWidth,n=t.iconWidth,a={transform:"translate(".concat(r/2," 256)")},i="translate(".concat(e.x*32,", ").concat(e.y*32,") "),s="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),o="rotate(".concat(e.rotate," 0 0)"),l={transform:"".concat(i," ").concat(s," ").concat(o)},c={transform:"translate(".concat(n/2*-1," -256)")};return{outer:a,inner:l,path:c}}var G={x:0,y:0,width:"100%",height:"100%"};function xt(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function Ae(t){return t.tag==="g"?t.children:[t]}function Oe(t){var e=t.children,r=t.attributes,n=t.main,a=t.mask,i=t.maskId,s=t.transform,o=n.width,l=n.icon,c=a.width,h=a.icon,d=Yt({transform:s,containerWidth:c,iconWidth:o}),I={tag:"rect",attributes:f({},G,{fill:"white"})},S=l.children?{children:l.children.map(xt)}:{},C={tag:"g",attributes:f({},d.inner),children:[xt(f({tag:l.tag,attributes:f({},l.attributes,d.path)},S))]},A={tag:"g",attributes:f({},d.outer),children:[C]},y="mask-".concat(i||H()),v="clip-".concat(i||H()),E={tag:"mask",attributes:f({},G,{id:y,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[I,A]},N={tag:"defs",children:[{tag:"clipPath",attributes:{id:v},children:Ae(h)},E]};return e.push(N,{tag:"rect",attributes:f({fill:"currentColor","clip-path":"url(#".concat(v,")"),mask:"url(#".concat(y,")")},G)}),{children:e,attributes:r}}function Se(t){var e=t.children,r=t.attributes,n=t.main,a=t.transform,i=t.styles,s=Bt(i);if(s.length>0&&(r.style=s),Ut(a)){var o=Yt({transform:a,containerWidth:n.width,iconWidth:n.width});e.push({tag:"g",attributes:f({},o.outer),children:[{tag:"g",attributes:f({},o.inner),children:[{tag:n.icon.tag,children:n.icon.children,attributes:f({},n.icon.attributes,o.path)}]}]})}else e.push(n.icon);return{children:e,attributes:r}}function Ee(t){var e=t.children,r=t.main,n=t.mask,a=t.attributes,i=t.styles,s=t.transform;if(Ut(s)&&r.found&&!n.found){var o=r.width,l=r.height,c={x:o/l/2,y:.5};a.style=Bt(f({},i,{"transform-origin":"".concat(c.x+s.x/16,"em ").concat(c.y+s.y/16,"em")}))}return[{tag:"svg",attributes:a,children:e}]}function Te(t){var e=t.prefix,r=t.iconName,n=t.children,a=t.attributes,i=t.symbol,s=i===!0?"".concat(e,"-").concat(m.familyPrefix,"-").concat(r):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:f({},a,{id:s}),children:n}]}]}function Me(t){var e=t.icons,r=e.main,n=e.mask,a=t.prefix,i=t.iconName,s=t.transform,o=t.symbol,l=t.title,c=t.maskId,h=t.titleId,d=t.extra,I=t.watchable,S=I===void 0?!1:I,C=n.found?n:r,A=C.width,y=C.height,v=a==="fak",E=v?"":"fa-w-".concat(Math.ceil(A/y*16)),N=[m.replacementClass,i?"".concat(m.familyPrefix,"-").concat(i):"",E].filter(function(L){return d.classes.indexOf(L)===-1}).filter(function(L){return L!==""||!!L}).concat(d.classes).join(" "),T={children:[],attributes:f({},d.attributes,{"data-prefix":a,"data-icon":i,class:N,role:d.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(A," ").concat(y)})},U=v&&!~d.classes.indexOf("fa-fw")?{width:"".concat(A/y*16*.0625,"em")}:{};S&&(T.attributes[le]=""),l&&T.children.push({tag:"title",attributes:{id:T.attributes["aria-labelledby"]||"title-".concat(h||H())},children:[l]});var k=f({},T,{prefix:a,iconName:i,main:r,mask:n,maskId:c,transform:s,symbol:o,styles:f({},U,d.styles)}),it=n.found&&r.found?Oe(k):Se(k),Jt=it.children,Zt=it.attributes;return k.children=Jt,k.attributes=Zt,o?Te(k):Ee(k)}var It=function(){},rn=m.measurePerformance&&D&&D.mark&&D.measure?D:{mark:It,measure:It};var Ne=function(e,r){return function(n,a,i,s){return e.call(r,n,a,i,s)}},q=function(e,r,n,a){var i=Object.keys(e),s=i.length,o=a!==void 0?Ne(r,a):r,l,c,h;for(n===void 0?(l=1,h=e[i[0]]):(l=0,h=n);l<s;l++)c=i[l],h=o(h,e[c],c,e);return h};function Vt(t,e){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},n=r.skipHooks,a=n===void 0?!1:n,i=Object.keys(e).reduce(function(s,o){var l=e[o],c=!!l.icon;return c?s[l.iconName]=l.icon:s[o]=l,s},{});typeof g.hooks.addPack=="function"&&!a?g.hooks.addPack(t,i):g.styles[t]=f({},g.styles[t]||{},i),t==="fas"&&Vt("fa",e)}var Ct=g.styles,Pe=g.shims,ze={},_e={},Le={},Xt=function(){var e=function(a){return q(Ct,function(i,s,o){return i[o]=q(s,a,{}),i},{})};ze=e(function(n,a,i){return a[3]&&(n[a[3]]=i),n}),_e=e(function(n,a,i){var s=a[2];return n[i]=i,s.forEach(function(o){n[o]=i}),n});var r="far"in Ct;Le=q(Pe,function(n,a){var i=a[0],s=a[1],o=a[2];return s==="far"&&!r&&(s="fas"),n[i]={prefix:s,iconName:o},n},{})};Xt();var sn=g.styles;function At(t,e,r){if(t&&t[e]&&t[e][r])return{prefix:e,iconName:r,icon:t[e][r]}}function Gt(t){var e=t.tag,r=t.attributes,n=r===void 0?{}:r,a=t.children,i=a===void 0?[]:a;return typeof t=="string"?Wt(t):"<".concat(e," ").concat(Ce(n),">").concat(i.map(Gt).join(""),"</").concat(e,">")}var Re=function(e){var r={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return e?e.toLowerCase().split(" ").reduce(function(n,a){var i=a.toLowerCase().split("-"),s=i[0],o=i.slice(1).join("-");if(s&&o==="h")return n.flipX=!0,n;if(s&&o==="v")return n.flipY=!0,n;if(o=parseFloat(o),isNaN(o))return n;switch(s){case"grow":n.size=n.size+o;break;case"shrink":n.size=n.size-o;break;case"left":n.x=n.x-o;break;case"right":n.x=n.x+o;break;case"up":n.y=n.y-o;break;case"down":n.y=n.y+o;break;case"rotate":n.rotate=n.rotate+o;break}return n},r):r};function Z(t){this.name="MissingIcon",this.message=t||"Icon unavailable",this.stack=new Error().stack}Z.prototype=Object.create(Error.prototype);Z.prototype.constructor=Z;var B={fill:"currentColor"},qt={attributeType:"XML",repeatCount:"indefinite",dur:"2s"},on={tag:"path",attributes:f({},B,{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})},rt=f({},qt,{attributeName:"opacity"}),ln={tag:"circle",attributes:f({},B,{cx:"256",cy:"364",r:"28"}),children:[{tag:"animate",attributes:f({},qt,{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:f({},rt,{values:"1;0;1;1;0;1;"})}]},fn={tag:"path",attributes:f({},B,{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:[{tag:"animate",attributes:f({},rt,{values:"1;0;0;0;0;1;"})}]},cn={tag:"path",attributes:f({},B,{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:f({},rt,{values:"0;0;1;1;0;0;"})}]};var un=g.styles;function Ot(t){var e=t[0],r=t[1],n=t.slice(4),a=Tt(n,1),i=a[0],s=null;return Array.isArray(i)?s={tag:"g",attributes:{class:"".concat(m.familyPrefix,"-").concat(O.GROUP)},children:[{tag:"path",attributes:{class:"".concat(m.familyPrefix,"-").concat(O.SECONDARY),fill:"currentColor",d:i[0]}},{tag:"path",attributes:{class:"".concat(m.familyPrefix,"-").concat(O.PRIMARY),fill:"currentColor",d:i[1]}}]}:s={tag:"path",attributes:{fill:"currentColor",d:i}},{found:!0,width:e,height:r,icon:s}}var dn=g.styles;var De=`svg:not(:root).svg-inline--fa {
  overflow: visible;
}

.svg-inline--fa {
  display: inline-block;
  font-size: inherit;
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.225em;
}
.svg-inline--fa.fa-w-1 {
  width: 0.0625em;
}
.svg-inline--fa.fa-w-2 {
  width: 0.125em;
}
.svg-inline--fa.fa-w-3 {
  width: 0.1875em;
}
.svg-inline--fa.fa-w-4 {
  width: 0.25em;
}
.svg-inline--fa.fa-w-5 {
  width: 0.3125em;
}
.svg-inline--fa.fa-w-6 {
  width: 0.375em;
}
.svg-inline--fa.fa-w-7 {
  width: 0.4375em;
}
.svg-inline--fa.fa-w-8 {
  width: 0.5em;
}
.svg-inline--fa.fa-w-9 {
  width: 0.5625em;
}
.svg-inline--fa.fa-w-10 {
  width: 0.625em;
}
.svg-inline--fa.fa-w-11 {
  width: 0.6875em;
}
.svg-inline--fa.fa-w-12 {
  width: 0.75em;
}
.svg-inline--fa.fa-w-13 {
  width: 0.8125em;
}
.svg-inline--fa.fa-w-14 {
  width: 0.875em;
}
.svg-inline--fa.fa-w-15 {
  width: 0.9375em;
}
.svg-inline--fa.fa-w-16 {
  width: 1em;
}
.svg-inline--fa.fa-w-17 {
  width: 1.0625em;
}
.svg-inline--fa.fa-w-18 {
  width: 1.125em;
}
.svg-inline--fa.fa-w-19 {
  width: 1.1875em;
}
.svg-inline--fa.fa-w-20 {
  width: 1.25em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: 0.3em;
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: 0.3em;
  width: auto;
}
.svg-inline--fa.fa-border {
  height: 1.5em;
}
.svg-inline--fa.fa-li {
  width: 2em;
}
.svg-inline--fa.fa-fw {
  width: 1.25em;
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: #ff253a;
  border-radius: 1em;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  color: #fff;
  height: 1.5em;
  line-height: 1;
  max-width: 5em;
  min-width: 1.5em;
  overflow: hidden;
  padding: 0.25em;
  right: 0;
  text-overflow: ellipsis;
  top: 0;
  -webkit-transform: scale(0.25);
          transform: scale(0.25);
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: 0;
  right: 0;
  top: auto;
  -webkit-transform: scale(0.25);
          transform: scale(0.25);
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: 0;
  left: 0;
  right: auto;
  top: auto;
  -webkit-transform: scale(0.25);
          transform: scale(0.25);
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  right: 0;
  top: 0;
  -webkit-transform: scale(0.25);
          transform: scale(0.25);
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: 0;
  right: auto;
  top: 0;
  -webkit-transform: scale(0.25);
          transform: scale(0.25);
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-lg {
  font-size: 1.3333333333em;
  line-height: 0.75em;
  vertical-align: -0.0667em;
}

.fa-xs {
  font-size: 0.75em;
}

.fa-sm {
  font-size: 0.875em;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: 2.5em;
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: -2em;
  position: absolute;
  text-align: center;
  width: 2em;
  line-height: inherit;
}

.fa-border {
  border: solid 0.08em #eee;
  border-radius: 0.1em;
  padding: 0.2em 0.25em 0.15em;
}

.fa-pull-left {
  float: left;
}

.fa-pull-right {
  float: right;
}

.fa.fa-pull-left,
.fas.fa-pull-left,
.far.fa-pull-left,
.fal.fa-pull-left,
.fab.fa-pull-left {
  margin-right: 0.3em;
}
.fa.fa-pull-right,
.fas.fa-pull-right,
.far.fa-pull-right,
.fal.fa-pull-right,
.fab.fa-pull-right {
  margin-left: 0.3em;
}

.fa-spin {
  -webkit-animation: fa-spin 2s infinite linear;
          animation: fa-spin 2s infinite linear;
}

.fa-pulse {
  -webkit-animation: fa-spin 1s infinite steps(8);
          animation: fa-spin 1s infinite steps(8);
}

@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}

@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both, .fa-flip-horizontal.fa-flip-vertical {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

:root .fa-rotate-90,
:root .fa-rotate-180,
:root .fa-rotate-270,
:root .fa-flip-horizontal,
:root .fa-flip-vertical,
:root .fa-flip-both {
  -webkit-filter: none;
          filter: none;
}

.fa-stack {
  display: inline-block;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: #fff;
}

.sr-only {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.sr-only-focusable:active, .sr-only-focusable:focus {
  clip: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  position: static;
  width: auto;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: 1;
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: 0.4;
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: 0.4;
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: 1;
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse {
  color: #fff;
}`;function je(){var t=Pt,e=zt,r=m.familyPrefix,n=m.replacementClass,a=De;if(r!==t||n!==e){var i=new RegExp("\\.".concat(t,"\\-"),"g"),s=new RegExp("\\--".concat(t,"\\-"),"g"),o=new RegExp("\\.".concat(e),"g");a=a.replace(i,".".concat(r,"-")).replace(s,"--".concat(r,"-")).replace(o,".".concat(n))}return a}var Fe=function(){function t(){te(this,t),this.definitions={}}return ee(t,[{key:"add",value:function(){for(var r=this,n=arguments.length,a=new Array(n),i=0;i<n;i++)a[i]=arguments[i];var s=a.reduce(this._pullDefinitions,{});Object.keys(s).forEach(function(o){r.definitions[o]=f({},r.definitions[o]||{},s[o]),Vt(o,s[o]),Xt()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(r,n){var a=n.prefix&&n.iconName&&n.icon?{0:n}:n;return Object.keys(a).map(function(i){var s=a[i],o=s.prefix,l=s.iconName,c=s.icon;r[o]||(r[o]={}),r[o][l]=c}),r}}]),t}();function $e(){m.autoAddCss&&!Et&&(xe(je()),Et=!0)}function He(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(function(n){return Gt(n)})}}),Object.defineProperty(t,"node",{get:function(){if(et){var n=u.createElement("div");return n.innerHTML=t.html,n.children}}}),t}function St(t){var e=t.prefix,r=e===void 0?"fa":e,n=t.iconName;if(n)return At(Be.definitions,r,n)||At(g.styles,r,n)}function We(t){return function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=(e||{}).icon?e:St(e||{}),a=r.mask;return a&&(a=(a||{}).icon?a:St(a||{})),t(n,f({},r,{mask:a}))}}var Be=new Fe;var Et=!1;var Qt={transform:function(e){return Re(e)}},Kt=We(function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=e.transform,n=r===void 0?M:r,a=e.symbol,i=a===void 0?!1:a,s=e.mask,o=s===void 0?null:s,l=e.maskId,c=l===void 0?null:l,h=e.title,d=h===void 0?null:h,I=e.titleId,S=I===void 0?null:I,C=e.classes,A=C===void 0?[]:C,y=e.attributes,v=y===void 0?{}:y,E=e.styles,N=E===void 0?{}:E;if(t){var T=t.prefix,U=t.iconName,k=t.icon;return He(f({type:"icon"},t),function(){return $e(),m.autoA11y&&(d?v["aria-labelledby"]="".concat(m.replacementClass,"-title-").concat(S||H()):(v["aria-hidden"]="true",v.focusable="false")),Me({icons:{main:Ot(k),mask:o?Ot(o.icon):{found:!1,width:null,height:null,icon:{}}},prefix:T,iconName:U,transform:f({},M,n),symbol:i,title:d,maskId:c,titleId:S,extra:{attributes:v,styles:N,classes:A}})})}});var Ue=["*"],Ye=t=>{throw new Error(`Could not find icon with iconName=${t.iconName} and prefix=${t.prefix} in the icon library.`)},Ve=()=>{throw new Error("Property `icon` is required for `fa-icon`/`fa-duotone-icon` components.")},Xe=t=>{let e={[`fa-${t.animation}`]:t.animation!=null&&!t.animation.startsWith("spin"),"fa-spin":t.animation==="spin"||t.animation==="spin-reverse","fa-spin-pulse":t.animation==="spin-pulse"||t.animation==="spin-pulse-reverse","fa-spin-reverse":t.animation==="spin-reverse"||t.animation==="spin-pulse-reverse","fa-pulse":t.animation==="spin-pulse"||t.animation==="spin-pulse-reverse","fa-fw":t.fixedWidth,"fa-border":t.border,"fa-inverse":t.inverse,"fa-layers-counter":t.counter,"fa-flip-horizontal":t.flip==="horizontal"||t.flip==="both","fa-flip-vertical":t.flip==="vertical"||t.flip==="both",[`fa-${t.size}`]:t.size!==null,[`fa-rotate-${t.rotate}`]:t.rotate!==null,[`fa-pull-${t.pull}`]:t.pull!==null,[`fa-stack-${t.stackItemSize}`]:t.stackItemSize!=null};return Object.keys(e).map(r=>e[r]?r:null).filter(r=>r)},Ge=t=>t.prefix!==void 0&&t.iconName!==void 0,qe=(t,e)=>Ge(t)?t:typeof t=="string"?{prefix:e,iconName:t}:{prefix:t[0],iconName:t[1]},Qe=(()=>{let e=class e{constructor(){this.defaultPrefix="fas",this.fallbackIcon=null}};e.\u0275fac=function(a){return new(a||e)},e.\u0275prov=Y({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})(),Ke=(()=>{let e=class e{constructor(){this.definitions={}}addIcons(...n){for(let a of n){a.prefix in this.definitions||(this.definitions[a.prefix]={}),this.definitions[a.prefix][a.iconName]=a;for(let i of a.icon[2])typeof i=="string"&&(this.definitions[a.prefix][i]=a)}}addIconPacks(...n){for(let a of n){let i=Object.keys(a).map(s=>a[s]);this.addIcons(...i)}}getIconDefinition(n,a){return n in this.definitions&&a in this.definitions[n]?this.definitions[n][a]:null}};e.\u0275fac=function(a){return new(a||e)},e.\u0275prov=Y({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})(),Je=(()=>{let e=class e{constructor(){this.stackItemSize="1x"}ngOnChanges(n){if("size"in n)throw new Error('fa-icon is not allowed to customize size when used inside fa-stack. Set size on the enclosing fa-stack instead: <fa-stack size="4x">...</fa-stack>.')}};e.\u0275fac=function(a){return new(a||e)},e.\u0275dir=lt({type:e,selectors:[["fa-icon","stackItemSize",""],["fa-duotone-icon","stackItemSize",""]],inputs:{stackItemSize:"stackItemSize",size:"size"},standalone:!0,features:[R]});let t=e;return t})(),Ze=(()=>{let e=class e{constructor(n,a){this.renderer=n,this.elementRef=a}ngOnInit(){this.renderer.addClass(this.elementRef.nativeElement,"fa-stack")}ngOnChanges(n){"size"in n&&(n.size.currentValue!=null&&this.renderer.addClass(this.elementRef.nativeElement,`fa-${n.size.currentValue}`),n.size.previousValue!=null&&this.renderer.removeClass(this.elementRef.nativeElement,`fa-${n.size.previousValue}`))}};e.\u0275fac=function(a){return new(a||e)(x(ut),x(ft))},e.\u0275cmp=V({type:e,selectors:[["fa-stack"]],inputs:{size:"size"},standalone:!0,features:[R,X],ngContentSelectors:Ue,decls:1,vars:0,template:function(a,i){a&1&&(ht(),pt(0))},encapsulation:2});let t=e;return t})(),xn=(()=>{let e=class e{set spin(n){this.animation=n?"spin":void 0}set pulse(n){this.animation=n?"spin-pulse":void 0}constructor(n,a,i,s,o){this.sanitizer=n,this.config=a,this.iconLibrary=i,this.stackItem=s,this.classes=[],o!=null&&s==null&&console.error('FontAwesome: fa-icon and fa-duotone-icon elements must specify stackItemSize attribute when wrapped into fa-stack. Example: <fa-icon stackItemSize="2x"></fa-icon>.')}ngOnChanges(n){if(this.icon==null&&this.config.fallbackIcon==null){Ve();return}if(n){let a=this.icon!=null?this.icon:this.config.fallbackIcon,i=this.findIconDefinition(a);if(i!=null){let s=this.buildParams();this.renderIcon(i,s)}}}render(){this.ngOnChanges({})}findIconDefinition(n){let a=qe(n,this.config.defaultPrefix);if("icon"in a)return a;let i=this.iconLibrary.getIconDefinition(a.prefix,a.iconName);return i??(Ye(a),null)}buildParams(){let n={flip:this.flip,animation:this.animation,border:this.border,inverse:this.inverse,size:this.size||null,pull:this.pull||null,rotate:this.rotate||null,fixedWidth:typeof this.fixedWidth=="boolean"?this.fixedWidth:this.config.fixedWidth,stackItemSize:this.stackItem!=null?this.stackItem.stackItemSize:null},a=typeof this.transform=="string"?Qt.transform(this.transform):this.transform;return{title:this.title,transform:a,classes:[...Xe(n),...this.classes],mask:this.mask!=null?this.findIconDefinition(this.mask):null,styles:this.styles!=null?this.styles:{},symbol:this.symbol,attributes:{role:this.a11yRole}}}renderIcon(n,a){let i=Kt(n,a);this.renderedIconHTML=this.sanitizer.bypassSecurityTrustHtml(i.html.join(`
`))}};e.\u0275fac=function(a){return new(a||e)(x(vt),x(Qe),x(Ke),x(Je,8),x(Ze,8))},e.\u0275cmp=V({type:e,selectors:[["fa-icon"]],hostAttrs:[1,"ng-fa-icon"],hostVars:2,hostBindings:function(a,i){a&2&&(mt("innerHTML",i.renderedIconHTML,ct),dt("title",i.title))},inputs:{icon:"icon",title:"title",animation:"animation",spin:"spin",pulse:"pulse",mask:"mask",styles:"styles",flip:"flip",size:"size",pull:"pull",border:"border",inverse:"inverse",symbol:"symbol",rotate:"rotate",fixedWidth:"fixedWidth",classes:"classes",transform:"transform",a11yRole:"a11yRole"},standalone:!0,features:[R,X],decls:0,vars:0,template:function(a,i){},encapsulation:2});let t=e;return t})();var In=(()=>{let e=class e{};e.\u0275fac=function(a){return new(a||e)},e.\u0275mod=ot({type:e}),e.\u0275inj=st({});let t=e;return t})();export{xn as a,In as b};
