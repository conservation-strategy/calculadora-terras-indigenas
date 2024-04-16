import{a as V1,b as y1,c as L1,d as W,e as N1}from"./chunk-ZGOKZBDQ.js";import{Aa as M1,Ha as C1,Ia as O,J as c1,Ja as o,K as z1,Ka as f,La as C,Ma as x1,Oa as g1,Pa as H1,Qa as v,S as H,Sa as V,T as u1,U as p1,Z as G,ca as d1,ta as b1,xa as T,ya as S}from"./chunk-44NH2HC5.js";var S1=[{path:"",redirectTo:"/home",pathMatch:"full"},{path:"home",loadComponent:()=>import("./chunk-D5GZN3BP.js").then(c=>c.HomeComponent)},{path:"calculadora",loadComponent:()=>import("./chunk-PGLHEFNA.js").then(c=>c.CalculatorComponent)},{path:"calculadora-basica",loadComponent:()=>import("./chunk-QSLYFPAD.js").then(c=>c.CalculatorBasicComponent)},{path:"calculadora-agrupada",loadComponent:()=>import("./chunk-67OVUOKM.js").then(c=>c.CalculatorGroupedComponent)},{path:"calculadora-detalhada",loadComponent:()=>import("./chunk-RR4EPHFO.js").then(c=>c.CalculatorDetailedComponent)},{path:"metodologia",loadComponent:()=>import("./chunk-GIYKZSU7.js").then(c=>c.MetodologyComponent)},{path:"publicacoes",loadComponent:()=>import("./chunk-CDSVFMRT.js").then(c=>c.PublicationsComponent)},{path:"equipe",loadComponent:()=>import("./chunk-SINRPRLR.js").then(c=>c.TeamComponent)},{path:"contato",loadComponent:()=>import("./chunk-WGX7YLJM.js").then(c=>c.ContactComponent)},{path:"sobre",loadComponent:()=>import("./chunk-AMWK3456.js").then(c=>c.AboutComponent)},{path:"not-found",loadComponent:()=>import("./chunk-XU4IY6TA.js").then(c=>c.NotFoundComponent)},{path:"**",redirectTo:"not-found"}];var k1={providers:[N1(S1)]};var A1=(()=>{let a=class a{};a.\u0275fac=function(i){return new(i||a)},a.\u0275cmp=H({type:a,selectors:[["app-top"]],standalone:!0,features:[V],decls:29,vars:0,consts:[[1,"navbar","navbar-expand-sm","bg-primary"],[1,"container"],[1,"row"],[1,"col-sm-12","col-md-2"],["routerLink","/",1,"navbar-brand"],["src","./assets/logo-csf.png","height","60"],[1,"navbar-nav","my-3"],["routerLink","/",1,"nav-link","text-white","py-0"],["routerLink","/calculadora",1,"nav-link","text-white","py-0"],["routerLink","/sobre",1,"nav-link","text-white","py-0"],["routerLink","/metodologia",1,"nav-link","text-white","py-0"],["routerLink","/publicacoes",1,"nav-link","text-white","py-0"],["routerLink","/equipe",1,"nav-link","text-white","py-0"],["routerLink","/contato",1,"nav-link","text-white","py-0"]],template:function(i,t){i&1&&(o(0,"nav",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"a",4),C(5,"img",5),f()(),o(6,"div",3)(7,"ul",6)(8,"li")(9,"a",7),v(10,"Home"),f()(),o(11,"li")(12,"a",8),v(13,"Calculadora"),f()(),o(14,"li")(15,"a",9),v(16,"Sobre"),f()(),o(17,"li")(18,"a",10),v(19,"Metodologia"),f()(),o(20,"li")(21,"a",11),v(22,"Publica\xE7\xF5es"),f()(),o(23,"li")(24,"a",12),v(25,"Equipe"),f()(),o(26,"li")(27,"a",13),v(28,"Contato"),f()()()()()()())},dependencies:[W],styles:["a[_ngcontent-%COMP%]:hover{text-decoration:underline}"]});let c=a;return c})();function R(c){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?R=function(a){return typeof a}:R=function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},R(c)}function H2(c,a){if(!(c instanceof a))throw new TypeError("Cannot call a class as a function")}function w1(c,a){for(var n=0;n<a.length;n++){var e=a[n];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(c,e.key,e)}}function V2(c,a,n){return a&&w1(c.prototype,a),n&&w1(c,n),c}function y2(c,a,n){return a in c?Object.defineProperty(c,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):c[a]=n,c}function m(c){for(var a=1;a<arguments.length;a++){var n=arguments[a]!=null?arguments[a]:{},e=Object.keys(n);typeof Object.getOwnPropertySymbols=="function"&&(e=e.concat(Object.getOwnPropertySymbols(n).filter(function(i){return Object.getOwnPropertyDescriptor(n,i).enumerable}))),e.forEach(function(i){y2(c,i,n[i])})}return c}function j1(c,a){return L2(c)||N2(c,a)||S2()}function L2(c){if(Array.isArray(c))return c}function N2(c,a){var n=[],e=!0,i=!1,t=void 0;try{for(var r=c[Symbol.iterator](),l;!(e=(l=r.next()).done)&&(n.push(l.value),!(a&&n.length===a));e=!0);}catch(s){i=!0,t=s}finally{try{!e&&r.return!=null&&r.return()}finally{if(i)throw t}}return n}function S2(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}var I1=function(){},o1={},G1={},k2=null,W1={mark:I1,measure:I1};try{typeof window<"u"&&(o1=window),typeof document<"u"&&(G1=document),typeof MutationObserver<"u"&&(k2=MutationObserver),typeof performance<"u"&&(W1=performance)}catch{}var A2=o1.navigator||{},P1=A2.userAgent,E1=P1===void 0?"":P1,J=o1,z=G1;var B=W1,A3=!!J.document,f1=!!z.documentElement&&!!z.head&&typeof z.addEventListener=="function"&&typeof z.createElement=="function",w3=~E1.indexOf("MSIE")||~E1.indexOf("Trident/"),y="___FONT_AWESOME___";var B1="fa",U1="svg-inline--fa",w2="data-fa-i2svg";var I3=function(){try{return!0}catch{return!1}}();var $1=[1,2,3,4,5,6,7,8,9,10],I2=$1.concat([11,12,13,14,15,16,17,18,19,20]);var I={GROUP:"group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},P3=["xs","sm","lg","fw","ul","li","border","pull-left","pull-right","spin","pulse","rotate-90","rotate-180","rotate-270","flip-horizontal","flip-vertical","flip-both","stack","stack-1x","stack-2x","inverse","layers","layers-text","layers-counter",I.GROUP,I.SWAP_OPACITY,I.PRIMARY,I.SECONDARY].concat($1.map(function(c){return"".concat(c,"x")})).concat(I2.map(function(c){return"w-".concat(c)})),Y1=J.FontAwesomeConfig||{};function P2(c){var a=z.querySelector("script["+c+"]");if(a)return a.getAttribute(c)}function E2(c){return c===""?!0:c==="false"?!1:c==="true"?!0:c}z&&typeof z.querySelector=="function"&&(Z1=[["data-family-prefix","familyPrefix"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]],Z1.forEach(function(c){var a=j1(c,2),n=a[0],e=a[1],i=E2(P2(n));i!=null&&(Y1[e]=i)}));var Z1,Z2={familyPrefix:B1,replacementClass:U1,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0},n1=m({},Z2,Y1);n1.autoReplaceSvg||(n1.observeMutations=!1);var p=m({},n1);J.FontAwesomeConfig=p;var L=J||{};L[y]||(L[y]={});L[y].styles||(L[y].styles={});L[y].hooks||(L[y].hooks={});L[y].shims||(L[y].shims=[]);var x=L[y],T2=[],O2=function c(){z.removeEventListener("DOMContentLoaded",c),t1=1,T2.map(function(a){return a()})},t1=!1;f1&&(t1=(z.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(z.readyState),t1||z.addEventListener("DOMContentLoaded",O2));var s1="pending",X1="settled",U="fulfilled",$="rejected",q2=function(){},J1=typeof global<"u"&&typeof global.process<"u"&&typeof global.process.emit=="function",F2=typeof setImmediate>"u"?setTimeout:setImmediate,D=[],r1;function D2(){for(var c=0;c<D.length;c++)D[c][0](D[c][1]);D=[],r1=!1}function Y(c,a){D.push([c,a]),r1||(r1=!0,F2(D2,0))}function R2(c,a){function n(i){m1(a,i)}function e(i){_(a,i)}try{c(n,e)}catch(i){e(i)}}function K1(c){var a=c.owner,n=a._state,e=a._data,i=c[n],t=c.then;if(typeof i=="function"){n=U;try{e=i(e)}catch(r){_(t,r)}}Q1(t,e)||(n===U&&m1(t,e),n===$&&_(t,e))}function Q1(c,a){var n;try{if(c===a)throw new TypeError("A promises callback cannot return that same promise.");if(a&&(typeof a=="function"||R(a)==="object")){var e=a.then;if(typeof e=="function")return e.call(a,function(i){n||(n=!0,a===i?c2(c,i):m1(c,i))},function(i){n||(n=!0,_(c,i))}),!0}}catch(i){return n||_(c,i),!0}return!1}function m1(c,a){(c===a||!Q1(c,a))&&c2(c,a)}function c2(c,a){c._state===s1&&(c._state=X1,c._data=a,Y(_2,c))}function _(c,a){c._state===s1&&(c._state=X1,c._data=a,Y(j2,c))}function a2(c){c._then=c._then.forEach(K1)}function _2(c){c._state=U,a2(c)}function j2(c){c._state=$,a2(c),!c._handled&&J1&&global.process.emit("unhandledRejection",c._data,c)}function G2(c){global.process.emit("rejectionHandled",c)}function b(c){if(typeof c!="function")throw new TypeError("Promise resolver "+c+" is not a function");if(!(this instanceof b))throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this._then=[],R2(c,this)}b.prototype={constructor:b,_state:s1,_then:null,_data:void 0,_handled:!1,then:function(a,n){var e={owner:this,then:new this.constructor(q2),fulfilled:a,rejected:n};return(n||a)&&!this._handled&&(this._handled=!0,this._state===$&&J1&&Y(G2,this)),this._state===U||this._state===$?Y(K1,e):this._then.push(e),e.then},catch:function(a){return this.then(null,a)}};b.all=function(c){if(!Array.isArray(c))throw new TypeError("You must pass an array to Promise.all().");return new b(function(a,n){var e=[],i=0;function t(s){return i++,function(h){e[s]=h,--i||a(e)}}for(var r=0,l;r<c.length;r++)l=c[r],l&&typeof l.then=="function"?l.then(t(r),n):e[r]=l;i||a(e)})};b.race=function(c){if(!Array.isArray(c))throw new TypeError("You must pass an array to Promise.race().");return new b(function(a,n){for(var e=0,i;e<c.length;e++)i=c[e],i&&typeof i.then=="function"?i.then(a,n):a(i)})};b.resolve=function(c){return c&&R(c)==="object"&&c.constructor===b?c:new b(function(a){a(c)})};b.reject=function(c){return new b(function(a,n){n(c)})};var q={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function W2(c){if(!(!c||!f1)){var a=z.createElement("style");a.setAttribute("type","text/css"),a.innerHTML=c;for(var n=z.head.childNodes,e=null,i=n.length-1;i>-1;i--){var t=n[i],r=(t.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(r)>-1&&(e=t)}return z.head.insertBefore(a,e),c}}var B2="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function X(){for(var c=12,a="";c-- >0;)a+=B2[Math.random()*62|0];return a}function e2(c){return"".concat(c).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function U2(c){return Object.keys(c||{}).reduce(function(a,n){return a+"".concat(n,'="').concat(e2(c[n]),'" ')},"").trim()}function i2(c){return Object.keys(c||{}).reduce(function(a,n){return a+"".concat(n,": ").concat(c[n],";")},"")}function n2(c){return c.size!==q.size||c.x!==q.x||c.y!==q.y||c.rotate!==q.rotate||c.flipX||c.flipY}function t2(c){var a=c.transform,n=c.containerWidth,e=c.iconWidth,i={transform:"translate(".concat(n/2," 256)")},t="translate(".concat(a.x*32,", ").concat(a.y*32,") "),r="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),l="rotate(".concat(a.rotate," 0 0)"),s={transform:"".concat(t," ").concat(r," ").concat(l)},h={transform:"translate(".concat(e/2*-1," -256)")};return{outer:i,inner:s,path:h}}var e1={x:0,y:0,width:"100%",height:"100%"};function T1(c){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return c.attributes&&(c.attributes.fill||a)&&(c.attributes.fill="black"),c}function $2(c){return c.tag==="g"?c.children:[c]}function Y2(c){var a=c.children,n=c.attributes,e=c.main,i=c.mask,t=c.maskId,r=c.transform,l=e.width,s=e.icon,h=i.width,d=i.icon,u=t2({transform:r,containerWidth:h,iconWidth:l}),k={tag:"rect",attributes:m({},e1,{fill:"white"})},P=s.children?{children:s.children.map(T1)}:{},A={tag:"g",attributes:m({},u.inner),children:[T1(m({tag:s.tag,attributes:m({},s.attributes,u.path)},P))]},w={tag:"g",attributes:m({},u.outer),children:[A]},g="mask-".concat(t||X()),M="clip-".concat(t||X()),E={tag:"mask",attributes:m({},e1,{id:g,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[k,w]},F={tag:"defs",children:[{tag:"clipPath",attributes:{id:M},children:$2(d)},E]};return a.push(F,{tag:"rect",attributes:m({fill:"currentColor","clip-path":"url(#".concat(M,")"),mask:"url(#".concat(g,")")},e1)}),{children:a,attributes:n}}function X2(c){var a=c.children,n=c.attributes,e=c.main,i=c.transform,t=c.styles,r=i2(t);if(r.length>0&&(n.style=r),n2(i)){var l=t2({transform:i,containerWidth:e.width,iconWidth:e.width});a.push({tag:"g",attributes:m({},l.outer),children:[{tag:"g",attributes:m({},l.inner),children:[{tag:e.icon.tag,children:e.icon.children,attributes:m({},e.icon.attributes,l.path)}]}]})}else a.push(e.icon);return{children:a,attributes:n}}function J2(c){var a=c.children,n=c.main,e=c.mask,i=c.attributes,t=c.styles,r=c.transform;if(n2(r)&&n.found&&!e.found){var l=n.width,s=n.height,h={x:l/s/2,y:.5};i.style=i2(m({},t,{"transform-origin":"".concat(h.x+r.x/16,"em ").concat(h.y+r.y/16,"em")}))}return[{tag:"svg",attributes:i,children:a}]}function K2(c){var a=c.prefix,n=c.iconName,e=c.children,i=c.attributes,t=c.symbol,r=t===!0?"".concat(a,"-").concat(p.familyPrefix,"-").concat(n):t;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:m({},i,{id:r}),children:e}]}]}function Q2(c){var a=c.icons,n=a.main,e=a.mask,i=c.prefix,t=c.iconName,r=c.transform,l=c.symbol,s=c.title,h=c.maskId,d=c.titleId,u=c.extra,k=c.watchable,P=k===void 0?!1:k,A=e.found?e:n,w=A.width,g=A.height,M=i==="fak",E=M?"":"fa-w-".concat(Math.ceil(w/g*16)),F=[p.replacementClass,t?"".concat(p.familyPrefix,"-").concat(t):"",E].filter(function(j){return u.classes.indexOf(j)===-1}).filter(function(j){return j!==""||!!j}).concat(u.classes).join(" "),Z={children:[],attributes:m({},u.attributes,{"data-prefix":i,"data-icon":t,class:F,role:u.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(w," ").concat(g)})},Q=M&&!~u.classes.indexOf("fa-fw")?{width:"".concat(w/g*16*.0625,"em")}:{};P&&(Z.attributes[w2]=""),s&&Z.children.push({tag:"title",attributes:{id:Z.attributes["aria-labelledby"]||"title-".concat(d||X())},children:[s]});var N=m({},Z,{prefix:i,iconName:t,main:n,mask:e,maskId:h,transform:r,symbol:l,styles:m({},Q,u.styles)}),h1=e.found&&n.found?Y2(N):X2(N),x2=h1.children,g2=h1.attributes;return N.children=x2,N.attributes=g2,l?K2(N):J2(N)}var O1=function(){},E3=p.measurePerformance&&B&&B.mark&&B.measure?B:{mark:O1,measure:O1};var c3=function(a,n){return function(e,i,t,r){return a.call(n,e,i,t,r)}},i1=function(a,n,e,i){var t=Object.keys(a),r=t.length,l=i!==void 0?c3(n,i):n,s,h,d;for(e===void 0?(s=1,d=a[t[0]]):(s=0,d=e);s<r;s++)h=t[s],d=l(d,a[h],h,a);return d};function r2(c,a){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},e=n.skipHooks,i=e===void 0?!1:e,t=Object.keys(a).reduce(function(r,l){var s=a[l],h=!!s.icon;return h?r[s.iconName]=s.icon:r[l]=s,r},{});typeof x.hooks.addPack=="function"&&!i?x.hooks.addPack(c,t):x.styles[c]=m({},x.styles[c]||{},t),c==="fas"&&r2("fa",a)}var q1=x.styles,a3=x.shims,e3={},i3={},n3={},l2=function(){var a=function(i){return i1(q1,function(t,r,l){return t[l]=i1(r,i,{}),t},{})};e3=a(function(e,i,t){return i[3]&&(e[i[3]]=t),e}),i3=a(function(e,i,t){var r=i[2];return e[t]=t,r.forEach(function(l){e[l]=t}),e});var n="far"in q1;n3=i1(a3,function(e,i){var t=i[0],r=i[1],l=i[2];return r==="far"&&!n&&(r="fas"),e[t]={prefix:r,iconName:l},e},{})};l2();var Z3=x.styles;function F1(c,a,n){if(c&&c[a]&&c[a][n])return{prefix:a,iconName:n,icon:c[a][n]}}function o2(c){var a=c.tag,n=c.attributes,e=n===void 0?{}:n,i=c.children,t=i===void 0?[]:i;return typeof c=="string"?e2(c):"<".concat(a," ").concat(U2(e),">").concat(t.map(o2).join(""),"</").concat(a,">")}var t3=function(a){var n={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return a?a.toLowerCase().split(" ").reduce(function(e,i){var t=i.toLowerCase().split("-"),r=t[0],l=t.slice(1).join("-");if(r&&l==="h")return e.flipX=!0,e;if(r&&l==="v")return e.flipY=!0,e;if(l=parseFloat(l),isNaN(l))return e;switch(r){case"grow":e.size=e.size+l;break;case"shrink":e.size=e.size-l;break;case"left":e.x=e.x-l;break;case"right":e.x=e.x+l;break;case"up":e.y=e.y-l;break;case"down":e.y=e.y+l;break;case"rotate":e.rotate=e.rotate+l;break}return e},n):n};function l1(c){this.name="MissingIcon",this.message=c||"Icon unavailable",this.stack=new Error().stack}l1.prototype=Object.create(Error.prototype);l1.prototype.constructor=l1;var K={fill:"currentColor"},f2={attributeType:"XML",repeatCount:"indefinite",dur:"2s"},T3={tag:"path",attributes:m({},K,{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})},v1=m({},f2,{attributeName:"opacity"}),O3={tag:"circle",attributes:m({},K,{cx:"256",cy:"364",r:"28"}),children:[{tag:"animate",attributes:m({},f2,{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:m({},v1,{values:"1;0;1;1;0;1;"})}]},q3={tag:"path",attributes:m({},K,{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:[{tag:"animate",attributes:m({},v1,{values:"1;0;0;0;0;1;"})}]},F3={tag:"path",attributes:m({},K,{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:m({},v1,{values:"0;0;1;1;0;0;"})}]};var D3=x.styles;function D1(c){var a=c[0],n=c[1],e=c.slice(4),i=j1(e,1),t=i[0],r=null;return Array.isArray(t)?r={tag:"g",attributes:{class:"".concat(p.familyPrefix,"-").concat(I.GROUP)},children:[{tag:"path",attributes:{class:"".concat(p.familyPrefix,"-").concat(I.SECONDARY),fill:"currentColor",d:t[0]}},{tag:"path",attributes:{class:"".concat(p.familyPrefix,"-").concat(I.PRIMARY),fill:"currentColor",d:t[1]}}]}:r={tag:"path",attributes:{fill:"currentColor",d:t}},{found:!0,width:a,height:n,icon:r}}var R3=x.styles;var r3=`svg:not(:root).svg-inline--fa {
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
}`;function l3(){var c=B1,a=U1,n=p.familyPrefix,e=p.replacementClass,i=r3;if(n!==c||e!==a){var t=new RegExp("\\.".concat(c,"\\-"),"g"),r=new RegExp("\\--".concat(c,"\\-"),"g"),l=new RegExp("\\.".concat(a),"g");i=i.replace(t,".".concat(n,"-")).replace(r,"--".concat(n,"-")).replace(l,".".concat(e))}return i}var o3=function(){function c(){H2(this,c),this.definitions={}}return V2(c,[{key:"add",value:function(){for(var n=this,e=arguments.length,i=new Array(e),t=0;t<e;t++)i[t]=arguments[t];var r=i.reduce(this._pullDefinitions,{});Object.keys(r).forEach(function(l){n.definitions[l]=m({},n.definitions[l]||{},r[l]),r2(l,r[l]),l2()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(n,e){var i=e.prefix&&e.iconName&&e.icon?{0:e}:e;return Object.keys(i).map(function(t){var r=i[t],l=r.prefix,s=r.iconName,h=r.icon;n[l]||(n[l]={}),n[l][s]=h}),n}}]),c}();function f3(){p.autoAddCss&&!_1&&(W2(l3()),_1=!0)}function s3(c,a){return Object.defineProperty(c,"abstract",{get:a}),Object.defineProperty(c,"html",{get:function(){return c.abstract.map(function(e){return o2(e)})}}),Object.defineProperty(c,"node",{get:function(){if(f1){var e=z.createElement("div");return e.innerHTML=c.html,e.children}}}),c}function R1(c){var a=c.prefix,n=a===void 0?"fa":a,e=c.iconName;if(e)return F1(v3.definitions,n,e)||F1(x.styles,n,e)}function m3(c){return function(a){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},e=(a||{}).icon?a:R1(a||{}),i=n.mask;return i&&(i=(i||{}).icon?i:R1(i||{})),c(e,m({},n,{mask:i}))}}var v3=new o3;var _1=!1;var s2={transform:function(a){return t3(a)}},m2=m3(function(c){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=a.transform,e=n===void 0?q:n,i=a.symbol,t=i===void 0?!1:i,r=a.mask,l=r===void 0?null:r,s=a.maskId,h=s===void 0?null:s,d=a.title,u=d===void 0?null:d,k=a.titleId,P=k===void 0?null:k,A=a.classes,w=A===void 0?[]:A,g=a.attributes,M=g===void 0?{}:g,E=a.styles,F=E===void 0?{}:E;if(c){var Z=c.prefix,Q=c.iconName,N=c.icon;return s3(m({type:"icon"},c),function(){return f3(),p.autoA11y&&(u?M["aria-labelledby"]="".concat(p.replacementClass,"-title-").concat(P||X()):(M["aria-hidden"]="true",M.focusable="false")),Q2({icons:{main:D1(N),mask:l?D1(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:Z,iconName:Q,transform:m({},q,e),symbol:t,title:u,maskId:h,titleId:P,extra:{attributes:M,styles:F,classes:w}})})}});var h3=["*"],z3=c=>{throw new Error(`Could not find icon with iconName=${c.iconName} and prefix=${c.prefix} in the icon library.`)},u3=()=>{throw new Error("Property `icon` is required for `fa-icon`/`fa-duotone-icon` components.")},p3=c=>{let a={[`fa-${c.animation}`]:c.animation!=null&&!c.animation.startsWith("spin"),"fa-spin":c.animation==="spin"||c.animation==="spin-reverse","fa-spin-pulse":c.animation==="spin-pulse"||c.animation==="spin-pulse-reverse","fa-spin-reverse":c.animation==="spin-reverse"||c.animation==="spin-pulse-reverse","fa-pulse":c.animation==="spin-pulse"||c.animation==="spin-pulse-reverse","fa-fw":c.fixedWidth,"fa-border":c.border,"fa-inverse":c.inverse,"fa-layers-counter":c.counter,"fa-flip-horizontal":c.flip==="horizontal"||c.flip==="both","fa-flip-vertical":c.flip==="vertical"||c.flip==="both",[`fa-${c.size}`]:c.size!==null,[`fa-rotate-${c.rotate}`]:c.rotate!==null,[`fa-pull-${c.pull}`]:c.pull!==null,[`fa-stack-${c.stackItemSize}`]:c.stackItemSize!=null};return Object.keys(a).map(n=>a[n]?n:null).filter(n=>n)},d3=c=>c.prefix!==void 0&&c.iconName!==void 0,b3=(c,a)=>d3(c)?c:typeof c=="string"?{prefix:a,iconName:c}:{prefix:c[0],iconName:c[1]},M3=(()=>{let a=class a{constructor(){this.defaultPrefix="fas",this.fallbackIcon=null}};a.\u0275fac=function(i){return new(i||a)},a.\u0275prov=c1({token:a,factory:a.\u0275fac,providedIn:"root"});let c=a;return c})(),C3=(()=>{let a=class a{constructor(){this.definitions={}}addIcons(...e){for(let i of e){i.prefix in this.definitions||(this.definitions[i.prefix]={}),this.definitions[i.prefix][i.iconName]=i;for(let t of i.icon[2])typeof t=="string"&&(this.definitions[i.prefix][t]=i)}}addIconPacks(...e){for(let i of e){let t=Object.keys(i).map(r=>i[r]);this.addIcons(...t)}}getIconDefinition(e,i){return e in this.definitions&&i in this.definitions[e]?this.definitions[e][i]:null}};a.\u0275fac=function(i){return new(i||a)},a.\u0275prov=c1({token:a,factory:a.\u0275fac,providedIn:"root"});let c=a;return c})(),x3=(()=>{let a=class a{constructor(){this.stackItemSize="1x"}ngOnChanges(e){if("size"in e)throw new Error('fa-icon is not allowed to customize size when used inside fa-stack. Set size on the enclosing fa-stack instead: <fa-stack size="4x">...</fa-stack>.')}};a.\u0275fac=function(i){return new(i||a)},a.\u0275dir=p1({type:a,selectors:[["fa-icon","stackItemSize",""],["fa-duotone-icon","stackItemSize",""]],inputs:{stackItemSize:"stackItemSize",size:"size"},standalone:!0,features:[G]});let c=a;return c})(),g3=(()=>{let a=class a{constructor(e,i){this.renderer=e,this.elementRef=i}ngOnInit(){this.renderer.addClass(this.elementRef.nativeElement,"fa-stack")}ngOnChanges(e){"size"in e&&(e.size.currentValue!=null&&this.renderer.addClass(this.elementRef.nativeElement,`fa-${e.size.currentValue}`),e.size.previousValue!=null&&this.renderer.removeClass(this.elementRef.nativeElement,`fa-${e.size.previousValue}`))}};a.\u0275fac=function(i){return new(i||a)(S(M1),S(d1))},a.\u0275cmp=H({type:a,selectors:[["fa-stack"]],inputs:{size:"size"},standalone:!0,features:[G,V],ngContentSelectors:h3,decls:1,vars:0,template:function(i,t){i&1&&(g1(),H1(0))},encapsulation:2});let c=a;return c})(),v2=(()=>{let a=class a{set spin(e){this.animation=e?"spin":void 0}set pulse(e){this.animation=e?"spin-pulse":void 0}constructor(e,i,t,r,l){this.sanitizer=e,this.config=i,this.iconLibrary=t,this.stackItem=r,this.classes=[],l!=null&&r==null&&console.error('FontAwesome: fa-icon and fa-duotone-icon elements must specify stackItemSize attribute when wrapped into fa-stack. Example: <fa-icon stackItemSize="2x"></fa-icon>.')}ngOnChanges(e){if(this.icon==null&&this.config.fallbackIcon==null){u3();return}if(e){let i=this.icon!=null?this.icon:this.config.fallbackIcon,t=this.findIconDefinition(i);if(t!=null){let r=this.buildParams();this.renderIcon(t,r)}}}render(){this.ngOnChanges({})}findIconDefinition(e){let i=b3(e,this.config.defaultPrefix);if("icon"in i)return i;let t=this.iconLibrary.getIconDefinition(i.prefix,i.iconName);return t??(z3(i),null)}buildParams(){let e={flip:this.flip,animation:this.animation,border:this.border,inverse:this.inverse,size:this.size||null,pull:this.pull||null,rotate:this.rotate||null,fixedWidth:typeof this.fixedWidth=="boolean"?this.fixedWidth:this.config.fixedWidth,stackItemSize:this.stackItem!=null?this.stackItem.stackItemSize:null},i=typeof this.transform=="string"?s2.transform(this.transform):this.transform;return{title:this.title,transform:i,classes:[...p3(e),...this.classes],mask:this.mask!=null?this.findIconDefinition(this.mask):null,styles:this.styles!=null?this.styles:{},symbol:this.symbol,attributes:{role:this.a11yRole}}}renderIcon(e,i){let t=m2(e,i);this.renderedIconHTML=this.sanitizer.bypassSecurityTrustHtml(t.html.join(`
`))}};a.\u0275fac=function(i){return new(i||a)(S(y1),S(M3),S(C3),S(x3,8),S(g3,8))},a.\u0275cmp=H({type:a,selectors:[["fa-icon"]],hostAttrs:[1,"ng-fa-icon"],hostVars:2,hostBindings:function(i,t){i&2&&(x1("innerHTML",t.renderedIconHTML,b1),C1("title",t.title))},inputs:{icon:"icon",title:"title",animation:"animation",spin:"spin",pulse:"pulse",mask:"mask",styles:"styles",flip:"flip",size:"size",pull:"pull",border:"border",inverse:"inverse",symbol:"symbol",rotate:"rotate",fixedWidth:"fixedWidth",classes:"classes",transform:"transform",a11yRole:"a11yRole"},standalone:!0,features:[G,V],decls:0,vars:0,template:function(i,t){},encapsulation:2});let c=a;return c})();var h2=(()=>{let a=class a{};a.\u0275fac=function(i){return new(i||a)},a.\u0275mod=u1({type:a}),a.\u0275inj=z1({});let c=a;return c})();var z2={prefix:"fab",iconName:"facebook",icon:[512,512,[],"f09a","M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"]};var u2={prefix:"fab",iconName:"instagram",icon:[448,512,[],"f16d","M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"]};var p2={prefix:"fab",iconName:"linkedin",icon:[448,512,[],"f08c","M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"]};var d2={prefix:"fab",iconName:"twitter",icon:[512,512,[],"f099","M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"]};var b2={prefix:"fab",iconName:"youtube",icon:[576,512,[],"f167","M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"]};var M2=(()=>{let a=class a{constructor(){this.faFacebook=z2,this.faTwitter=d2,this.faYoutube=b2,this.faInstagram=u2,this.faLinkedin=p2}};a.\u0275fac=function(i){return new(i||a)},a.\u0275cmp=H({type:a,selectors:[["app-footer"]],standalone:!0,features:[V],decls:69,vars:5,consts:[[1,"text-center"],[1,"container","p-4"],[1,"mb-3"],["role","button","target","_blank","href","https://www.facebook.com/conservationstrategyfund",1,"btn","btn-sm","btn-outline-primary","btn-floating","m-1"],[3,"icon"],["role","button","target","_blank","href","https://twitter.com/numbers4nature",1,"btn","btn-sm","btn-outline-primary","btn-floating","m-1"],["role","button","target","_blank","href","https://www.youtube.com/user/numbers4nature",1,"btn","btn-sm","btn-outline-primary","btn-floating","m-1"],["role","button","target","_blank","href","https://www.instagram.com/conservationstrategyfund",1,"btn","btn-sm","btn-outline-primary","btn-floating","m-1"],["role","button","target","_blank","href","https://www.linkedin.com/company/conservationstrategyfund",1,"btn","btn-sm","btn-outline-primary","btn-floating","m-1"],[1,"mb-5"],[1,""],[1,"row"],[1,"col-lg","col-md-6","mb-4","mb-md-0"],[1,"text-uppercase","text-primary"],[1,"list-unstyled","mb-0"],["routerLink","/calculadora",1,"text-dark"],["routerLink","/sobre",1,"text-dark"],["routerLink","/",1,"text-dark"],["routerLink","/metodologia",1,"text-dark"],["routerLink","/publicacoes",1,"text-dark"],["routerLink","/equipe",1,"text-dark"],["routerLink","/contato",1,"text-dark"],["href","https://www.conservation-strategy.org/","target","_blank",1,"text-dark"],["href","https://www.socioambiental.org/","target","_blank",1,"text-dark"],[1,"text-center","p-3",2,"background-color","rgba(0, 0, 0, 0.2)"],["href","https://mdbootstrap.com/",1,"text-dark"]],template:function(i,t){i&1&&(o(0,"footer",0)(1,"div",1)(2,"section",2)(3,"a",3),C(4,"fa-icon",4),f(),o(5,"a",5),C(6,"fa-icon",4),f(),o(7,"a",6),C(8,"fa-icon",4),f(),o(9,"a",7),C(10,"fa-icon",4),f(),o(11,"a",8),C(12,"fa-icon",4),f()(),o(13,"section",9)(14,"h6"),v(15," A CSF, o ISA e a Rede Xingu+ n\xE3o se responsabilizam pelas consequ\xEAncias do uso da calculadora. "),f()(),o(16,"section",10)(17,"div",11)(18,"div",12)(19,"h6",13),v(20,"Sobre"),f(),o(21,"ul",14)(22,"li")(23,"a",15),v(24,"Calculadora"),f()(),o(25,"li")(26,"a",16),v(27,"O que \xE9"),f()(),o(28,"li")(29,"a",17),v(30,"Guia de uso"),f()()()(),o(31,"div",12)(32,"h6",13),v(33,"Metodologia"),f(),o(34,"ul",14)(35,"li")(36,"a",18),v(37,"Resumo"),f()()()(),o(38,"div",12)(39,"h6",13),v(40,"Publica\xE7\xF5es"),f(),o(41,"ul",14)(42,"li")(43,"a",19),v(44,"Todas publica\xE7\xF5es"),f()()()(),o(45,"div",12)(46,"h6",13),v(47,"Equipe"),f(),o(48,"ul",14)(49,"li")(50,"a",20),v(51,"CSF e ISA"),f()()()(),o(52,"div",12)(53,"h6",13),v(54,"Contato"),f(),o(55,"ul",14)(56,"li")(57,"a",21),v(58,"Fale conosco"),f()(),o(59,"li")(60,"a",22),v(61,"Site da CSF"),f()(),o(62,"li")(63,"a",23),v(64,"Site da ISA"),f()()()()()()()(),o(65,"div",24),v(66," \xA9 2020 Copyright: "),o(67,"a",25),v(68," CSF All rights reserved."),f()()),i&2&&(T(4),O("icon",t.faFacebook),T(2),O("icon",t.faTwitter),T(2),O("icon",t.faYoutube),T(2),O("icon",t.faInstagram),T(2),O("icon",t.faLinkedin))},dependencies:[h2,v2,W],styles:["footer[_ngcontent-%COMP%]{background-color:#f4f4f4;margin-top:2rem}"]});let c=a;return c})();var C2=(()=>{let a=class a{constructor(){this.title="calc-gestao-terras-indigenas"}};a.\u0275fac=function(i){return new(i||a)},a.\u0275cmp=H({type:a,selectors:[["app-root"]],standalone:!0,features:[V],decls:4,vars:0,consts:[["id","app-main"],["id","app-footer"]],template:function(i,t){i&1&&(o(0,"div",0),C(1,"app-top")(2,"router-outlet")(3,"app-footer",1),f())},dependencies:[L1,A1,M2]});let c=a;return c})();V1(C2,k1).catch(c=>console.error(c));
