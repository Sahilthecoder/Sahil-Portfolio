import{j as e,u as t}from"./index-B9k1co7f.js";import{r as a,u as r,e as o,f as s,R as i,O as n}from"./react-2AWE0Gja.js";import{I as l}from"./imageUtils-SNPc1lXc.js";import{g as d}from"./imagePaths-Dhem27nf.js";import{f as c,g as m,h as u,i as p,j as h,k as g,l as f,m as x}from"./index-DrpvGgvf.js";import{M as y,O as b,q as v,H as w,I as k,c as j}from"./index-_xJqeRE7.js";import{m as N,A as E}from"./vendor-B0XlBqHj.js";const C=[{name:"Home",path:"/",section:"home",icon:e.jsx(m,{className:"w-5 h-5"}),description:"Back to the homepage",exact:!0},{name:"About",path:"/about",section:"about",icon:e.jsx(u,{className:"w-5 h-5"}),description:"Learn about me and my skills",exact:!1},{name:"Experience",path:"/experience",section:"experience",icon:e.jsx(p,{className:"w-5 h-5"}),description:"View my professional experience",exact:!1},{name:"Projects",path:"/projects",section:"projects",icon:e.jsx(h,{className:"w-5 h-5"}),description:"Explore my portfolio projects",exact:!1},{name:"Contact",path:"/contact",section:"contact",icon:e.jsx(g,{className:"w-5 h-5"}),description:"Get in touch with me",exact:!1}],$=i.memo(({onThemeChange:r,className:o=""})=>{const{theme:s,toggleTheme:i,autoTheme:n,toggleAutoTheme:l}=t(),[d,c]=a.useState(!1),[m,u]=a.useState(!1),p=a.useCallback(e=>{e.stopPropagation(),u(!0),setTimeout(()=>u(!1),200),i(),r&&r()},[i,r]),h=a.useCallback(e=>{e.preventDefault(),e.stopPropagation(),l()},[l]),g=a.useMemo(()=>({light:{icon:e.jsx(x,{className:"theme-icon"}),label:"Light Mode",className:"theme-light",tooltip:"Switch to dark mode"},dark:{icon:e.jsx(f,{className:"theme-icon"}),label:"Dark Mode",className:"theme-dark",tooltip:"Switch to light mode"}}),[]),y=g[s]||g.light;return e.jsxs("div",{className:"theme-toggle-container",children:[e.jsxs(N.button,{type:"button",className:`theme-toggle ${d?"hovered":""} ${m?"pressed":""} ${o}`,onClick:e=>{e.stopPropagation(),p(e)},onContextMenu:h,onHoverStart:()=>c(!0),onHoverEnd:()=>c(!1),onMouseDown:()=>u(!0),onMouseUp:()=>u(!1),onMouseLeave:()=>u(!1),"aria-label":`${y.tooltip}${n?" (Auto theme enabled)":""}`,whileHover:{scale:1.05},whileTap:{scale:.95},children:[e.jsxs(N.div,{className:"theme-toggle-inner",animate:{rotate:d?"light"===s?15:-15:0,scale:m?.9:1},transition:{type:"spring",stiffness:500,damping:15,mass:.5},children:[e.jsx("span",{className:"theme-icon",children:y.icon}),e.jsx("span",{className:"theme-ripple"})]}),n&&e.jsx(N.span,{className:"theme-auto-indicator",initial:{scale:0},animate:{scale:1,opacity:[0,1,1],y:[10,-2,0]},exit:{scale:0,opacity:0},transition:{duration:.3,times:[0,.8,1],ease:"easeOut"}})]}),e.jsxs(N.div,{className:"theme-tooltip",initial:{opacity:0,y:5},animate:{opacity:d?1:0,y:d?0:5},transition:{duration:.2},children:[y.tooltip,n&&" (Auto)"]})]})}),T=()=>{const[t,i]=a.useState(!1),[n,m]=a.useState(!1),u=r(),p=o(),h=a.useRef(null),g=a.useRef(null),f=a.useRef(null);a.useEffect(()=>{let e;const t=()=>{clearTimeout(e),e=setTimeout(()=>{m(window.scrollY>10)},10)};return window.addEventListener("scroll",t,{passive:!0}),()=>{clearTimeout(e),window.removeEventListener("scroll",t)}},[]),a.useEffect(()=>{k(),window.scrollTo(0,0)},[u.pathname]),a.useEffect(()=>{if(t){const e=window.getComputedStyle(document.body).overflow;document.body.style.overflow="hidden";const t=g.current;if(!t)return;const a=Array.from(t.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(e=>!e.disabled&&!e.hidden&&null!==e.offsetParent);if(0===a.length)return;const r=a[0],o=a[a.length-1],s=e=>{if("Escape"===e.key){k();const e=document.querySelector('[aria-label*="menu"]');return void(e&&e.focus())}"Tab"===e.key&&(e.shiftKey?document.activeElement===r&&(e.preventDefault(),o.focus()):document.activeElement===o&&(e.preventDefault(),r.focus()))};return requestAnimationFrame(()=>{r.focus()}),document.addEventListener("keydown",s),()=>{document.removeEventListener("keydown",s),document.body.style.overflow=e}}},[t]);const x=a.useCallback(e=>{e&&(e.stopPropagation(),e.preventDefault());const a=!t;i(a);const r=document.querySelector('[aria-label*="menu"]');r&&r.setAttribute("aria-expanded",String(a))},[t]),k=a.useCallback(()=>{i(!1)},[]),j=a.useCallback(e=>{t&&g.current&&!g.current.contains(e.target)&&k()},[t]);a.useEffect(()=>{if(t)return document.addEventListener("mousedown",j),()=>{document.removeEventListener("mousedown",j)}},[t,j]),a.useCallback((e,t)=>{if("/"!==u.pathname)p(t||"/"),setTimeout(()=>{const t=document.getElementById(e);if(t){const e=100,a=t.getBoundingClientRect().top+window.pageYOffset-e;window.scrollTo({top:a,behavior:"smooth"})}},100);else{const t=document.getElementById(e);if(t){const e=100,a=t.getBoundingClientRect().top+window.pageYOffset-e;window.scrollTo({top:a,behavior:"smooth"})}}},[u.pathname,p]);const T=a.useCallback((e,t)=>{e.preventDefault(),k(),u.pathname!==t.path?p(t.path,{state:{fromNavigation:!0}}):window.scrollTo({top:0,behavior:"smooth"})},[k,u.pathname,p]);return a.useEffect(()=>(t?(document.body.classList.add("menu-open"),document.body.style.overflow="hidden"):(document.body.classList.remove("menu-open"),document.body.style.overflow="auto"),()=>{document.body.classList.remove("menu-open"),document.body.style.overflow="auto"}),[t]),a.useEffect(()=>{const e=e=>{!t||e.target.closest(".mobile-menu-container")||e.target.closest(".mobile-menu-button")||k()},a=e=>{"Escape"===e.key&&t&&k()},r=()=>{k()};return document.addEventListener("mousedown",e),document.addEventListener("keydown",a),window.addEventListener("popstate",r),()=>{document.removeEventListener("mousedown",e),document.removeEventListener("keydown",a),window.removeEventListener("popstate",r)}},[t,k]),e.jsx(N.nav,{ref:h,initial:{y:-100},animate:{y:0},transition:{type:"spring",stiffness:100,damping:20},className:"fixed top-0 left-0 right-0 z-50 transition-all duration-300 "+(n?"bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm":"bg-transparent"),children:e.jsx("div",{className:"w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:e.jsxs("div",{className:"flex justify-between h-16 md:h-20 items-center",children:[e.jsx(s,{to:"/",className:"flex items-center space-x-2 group","aria-label":"Home",onClick:e=>{"/"===u.pathname&&(e.preventDefault(),window.scrollTo({top:0,behavior:"smooth"}))},children:e.jsxs("div",{className:"logo-container relative flex items-center group-hover:scale-105 transition-transform",children:[e.jsx("div",{className:"logo-gradient absolute inset-0 rounded-full opacity-70 group-hover:opacity-90 transition-opacity"}),e.jsx("div",{className:"logo relative z-10 bg-white dark:bg-gray-900 rounded-full p-1.5 shadow-sm",children:e.jsx(l,{src:d("logo","","logo192.png"),alt:"Sahil Ali - Portfolio Logo",className:"logo-img h-8 w-8 md:h-9 md:w-9 transition-transform duration-300 group-hover:scale-110",width:36,height:36,priority:!0,sizes:"(max-width: 768px) 36px, 40px"})}),e.jsxs("span",{className:"ml-3 hidden md:inline-block text-sm font-medium text-gray-700 dark:text-gray-300",children:["Sahil Ali",e.jsx("span",{className:"block text-xs text-gray-500 dark:text-gray-400",children:"Data Analyst"})]})]})}),e.jsx("button",{className:"lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors",onClick:x,"aria-expanded":t,"aria-controls":"mobile-menu","aria-haspopup":"true","aria-label":t?"Close navigation menu":"Open navigation menu",children:t?e.jsx(y,{className:"w-6 h-6 text-gray-800 dark:text-gray-100"}):e.jsx(b,{className:"w-6 h-6 text-gray-800 dark:text-gray-100"})}),e.jsx("nav",{className:"hidden lg:flex items-center space-x-1","aria-label":"Main navigation",children:C.map(t=>{const a=t.exact?u.pathname===t.path:u.pathname.startsWith(t.path);return e.jsxs("div",{className:"relative group",children:[e.jsx("button",{onClick:e=>T(e,t),className:"px-4 py-2 rounded-md text-sm font-medium transition-colors "+(a?"bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400":"text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"),"aria-current":a?"page":void 0,"aria-label":t.description,children:e.jsxs("span",{className:"flex items-center space-x-2",children:[e.jsx("span",{className:"nav-item-icon","aria-hidden":"true",children:t.icon}),e.jsx("span",{className:"nav-item-text",children:t.name})]})}),a&&e.jsx(N.span,{className:"absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500",layoutId:"activeNavItem",transition:{type:"spring",stiffness:380,damping:30}})]},t.name)})}),e.jsxs("div",{className:"hidden lg:flex items-center space-x-4",children:[e.jsx($,{}),e.jsx("a",{href:"https://github.com/yourusername",target:"_blank",rel:"noopener noreferrer",className:"p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors","aria-label":"GitHub",children:e.jsx(v,{className:"w-5 h-5"})}),e.jsx("a",{href:"https://linkedin.com/in/yourusername",target:"_blank",rel:"noopener noreferrer",className:"p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors","aria-label":"LinkedIn",children:e.jsx(w,{className:"w-5 h-5"})})]}),e.jsx(E,{children:t&&e.jsxs("div",{ref:f,id:"mobile-menu",role:"dialog","aria-modal":"true","aria-label":"Mobile navigation menu",className:`fixed inset-0 z-50 bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out ${t?"translate-x-0":"translate-x-full"} lg:hidden`,children:[e.jsx(N.div,{className:"fixed inset-0 bg-black/50 backdrop-blur-sm z-40",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},onClick:k,"aria-hidden":"true"}),e.jsx(N.div,{ref:g,className:"fixed top-0 right-0 h-screen w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col overflow-hidden",initial:{x:"100%"},animate:{x:0},exit:{x:"100%"},transition:{type:"tween",ease:[.22,1,.36,1]},role:"dialog","aria-modal":"true","aria-label":"Mobile menu",children:e.jsxs("div",{className:"p-6 pb-4",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("div",{className:"hidden lg:flex items-center space-x-4",children:[e.jsx($,{onThemeChange:k}),e.jsx("a",{href:"https://github.com/yourusername",target:"_blank",rel:"noopener noreferrer",className:"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200","aria-label":"GitHub",children:e.jsx(v,{className:"h-5 w-5"})}),e.jsx("a",{href:"https://linkedin.com/in/yourusername",target:"_blank",rel:"noopener noreferrer",className:"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200","aria-label":"LinkedIn",children:e.jsx(w,{className:"h-5 w-5"})})]}),e.jsx("h2",{className:"text-2xl font-bold text-gray-900 dark:text-white",children:"Menu"}),e.jsx("button",{onClick:k,className:"p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors","aria-label":"Close menu",children:e.jsx(c,{className:"w-6 h-6 text-gray-600 dark:text-gray-300"})})]}),e.jsx("nav",{className:"flex-1 overflow-y-auto py-4 -mx-4 px-4",children:e.jsx("ul",{className:"space-y-2",children:C.map(t=>{const a=t.exact?u.pathname===t.path:u.pathname.startsWith(t.path);return e.jsx("li",{children:e.jsxs("button",{onClick:e=>{if(e.preventDefault(),k(),u.pathname===t.path){if("/"===t.path)window.scrollTo({top:0,behavior:"smooth"});else if(t.section){const e=document.getElementById(t.section);if(e){const t=100,a=e.getBoundingClientRect().top+window.pageYOffset-t;window.scrollTo({top:a,behavior:"smooth"})}}}else p(t.path),setTimeout(()=>{if(t.section){const e=document.getElementById(t.section);if(e){const t=100,a=e.getBoundingClientRect().top+window.pageYOffset-t;window.scrollTo({top:a,behavior:"smooth"})}}else"/"===t.path&&window.scrollTo({top:0,behavior:"smooth"})},100)},className:"w-full px-4 py-3 rounded-lg flex items-center space-x-3 text-left transition-colors "+(a?"bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400":"hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"),"aria-current":a?"page":void 0,children:[e.jsx("span",{className:"flex-shrink-0 "+(a?"text-blue-500":"text-gray-400"),children:t.icon}),e.jsx("span",{className:"font-medium",children:t.name})]})},t.name)})})}),e.jsxs("div",{className:"mt-auto p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900",children:[e.jsxs("div",{className:"flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800",children:[e.jsx("span",{className:"text-sm font-medium text-gray-700 dark:text-gray-300",children:"Dark Mode"}),e.jsx($,{onThemeChange:k})]}),e.jsxs("div",{className:"flex justify-center space-x-4 mt-4",children:[e.jsx("a",{href:"https://github.com/yourusername",target:"_blank",rel:"noopener noreferrer",className:"p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors","aria-label":"GitHub",onClick:k,children:e.jsx(v,{className:"w-5 h-5"})}),e.jsx("a",{href:"https://linkedin.com/in/yourusername",target:"_blank",rel:"noopener noreferrer",className:"p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors","aria-label":"LinkedIn",onClick:k,children:e.jsx(w,{className:"w-5 h-5"})})]})]})]})})]})})]})})})},L=()=>{const t=(new Date).getFullYear(),a=[{icon:e.jsx(v,{}),href:"https://github.com/SahilTheCoder",label:"GitHub",gradient:"from-gray-800 via-gray-700 to-gray-800",hoverGradient:"from-gray-700 via-gray-600 to-gray-700",darkGradient:"from-gray-700 via-gray-600 to-gray-700",darkHoverGradient:"from-gray-600 via-gray-500 to-gray-600",size:"w-9 h-9",iconClass:"text-gray-100 dark:text-gray-200"},{icon:e.jsx(w,{}),href:"https://www.linkedin.com/in/sahil-ali-714867242/",label:"LinkedIn",gradient:"from-blue-600 via-blue-500 to-blue-600",hoverGradient:"from-blue-500 via-blue-400 to-blue-500",darkGradient:"from-blue-700 via-blue-600 to-blue-700",darkHoverGradient:"from-blue-600 via-blue-500 to-blue-600",size:"w-9 h-9",iconClass:"text-white"},{icon:e.jsx(k,{}),href:"https://wa.me/919875771550",label:"WhatsApp",gradient:"from-green-500 via-green-400 to-green-500",hoverGradient:"from-green-400 via-green-300 to-green-400",darkGradient:"from-green-600 via-green-500 to-green-600",darkHoverGradient:"from-green-500 via-green-400 to-green-500",size:"w-9 h-9",iconClass:"text-white"},{icon:e.jsx(j,{}),href:"mailto:sahilkhan36985@gmail.com",label:"Email",gradient:"from-red-500 via-red-400 to-red-500",hoverGradient:"from-red-400 via-red-300 to-red-400",darkGradient:"from-red-600 via-red-500 to-red-600",darkHoverGradient:"from-red-500 via-red-400 to-red-500",size:"w-9 h-9",iconClass:"text-white"}];return e.jsx("footer",{className:"bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-700 dark:text-gray-300 py-6 px-4 border-t border-gray-200 dark:border-gray-800 transition-colors duration-200",children:e.jsxs("div",{className:"container mx-auto max-w-6xl",children:[e.jsxs("div",{className:"flex flex-col md:flex-row justify-between items-center",children:[e.jsx("div",{className:"mb-4 md:mb-0",children:e.jsxs("p",{className:"text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors duration-200",children:["© ",t," Sahil's Portfolio. All rights reserved."]})}),e.jsx("div",{className:"flex space-x-4",children:a.map((t,a)=>e.jsx("a",{href:t.href,target:"_blank",rel:"noopener noreferrer",className:`flex items-center justify-center rounded-full p-2 transition-all duration-300 transform hover:-translate-y-0.5 \n                  shadow-md hover:shadow-lg \n                  bg-gradient-to-br ${t.gradient} hover:${t.hoverGradient}\n                  dark:${t.darkGradient} dark:hover:${t.darkHoverGradient}\n                  transition-all duration-300`,"aria-label":t.label,children:i.cloneElement(t.icon,{className:`${t.size} ${t.iconClass} transition-colors duration-200`})},a))})]}),e.jsx("div",{className:"mt-3 text-center md:text-left",children:e.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200",children:"Based in Rajasthan, India • Open to remote opportunities"})})]})})};let D,A,O,z={data:""},I=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,S=/\/\*[^]*?\*\/|  +/g,G=/\n+/g,H=(e,t)=>{let a="",r="",o="";for(let s in e){let i=e[s];"@"==s[0]?"i"==s[1]?a=s+" "+i+";":r+="f"==s[1]?H(i,s):s+"{"+H(i,"k"==s[1]?"":t)+"}":"object"==typeof i?r+=H(i,t?t.replace(/([^,])+/g,e=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):s):null!=i&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=H.p?H.p(s,i):s+":"+i+";")}return a+(t&&o?t+"{"+o+"}":o)+r},M={},P=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+P(e[a]);return t}return e};function _(e){let t=this||{},a=e.call?e(t.p):e;return((e,t,a,r,o)=>{let s=P(e),i=M[s]||(M[s]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(s));if(!M[i]){let t=s!==e?e:(e=>{let t,a,r=[{}];for(;t=I.exec(e.replace(S,""));)t[4]?r.shift():t[3]?(a=t[3].replace(G," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(G," ").trim();return r[0]})(e);M[i]=H(o?{["@keyframes "+i]:t}:t,a?"":"."+i)}let n=a&&M.g?M.g:null;return a&&(M.g=M[i]),l=M[i],d=t,c=r,(m=n)?d.data=d.data.replace(m,l):-1===d.data.indexOf(l)&&(d.data=c?l+d.data:d.data+l),i;var l,d,c,m})(a.unshift?a.raw?((e,t,a)=>e.reduce((e,r,o)=>{let s=t[o];if(s&&s.call){let e=s(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;s=t?"."+t:e&&"object"==typeof e?e.props?"":H(e,""):!1===e?"":e}return e+r+(null==s?"":s)},""))(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,(r=t.target,"object"==typeof window?((r?r.querySelector("#_goober"):window._goober)||Object.assign((r||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:r||z),t.g,t.o,t.k);var r}_.bind({g:1});let B=_.bind({k:1});function R(e,t){let a=this||{};return function(){let r=arguments;function o(t,s){let i=Object.assign({},t),n=i.className||o.className;a.p=Object.assign({theme:A&&A()},i),a.o=/ *go\d+/.test(n),i.className=_.apply(a,r)+(n?" "+n:"");let l=e;return e[0]&&(l=i.as||e,delete i.as),O&&l[0]&&O(i),D(l,i)}return t?t(o):o}}var F=(e,t)=>(e=>"function"==typeof e)(e)?e(t):e,Y=(()=>{let e=0;return()=>(++e).toString()})(),q=(()=>{let e;return()=>{if(void 0===e&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),U=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return U(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+o}))}}},W=[],K={toasts:[],pausedAt:void 0},V=e=>{K=U(K,e),W.forEach(e=>{e(K)})},Z={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},J=e=>(t,a)=>{let r=((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||Y()}))(t,e,a);return V({type:2,toast:r}),r.id},Q=(e,t)=>J("blank")(e,t);Q.error=J("error"),Q.success=J("success"),Q.loading=J("loading"),Q.custom=J("custom"),Q.dismiss=e=>{V({type:3,toastId:e})},Q.remove=e=>V({type:4,toastId:e}),Q.promise=(e,t,a)=>{let r=Q.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let o=t.success?F(t.success,e):void 0;return o?Q.success(o,{id:r,...a,...null==a?void 0:a.success}):Q.dismiss(r),e}).catch(e=>{let o=t.error?F(t.error,e):void 0;o?Q.error(o,{id:r,...a,...null==a?void 0:a.error}):Q.dismiss(r)}),e};var X,ee,te,ae,re=(e,t)=>{V({type:1,toast:{id:e,height:t}})},oe=()=>{V({type:5,time:Date.now()})},se=new Map,ie=e=>{let{toasts:t,pausedAt:r}=((e={})=>{let[t,r]=a.useState(K),o=a.useRef(K);a.useEffect(()=>(o.current!==K&&r(K),W.push(r),()=>{let e=W.indexOf(r);e>-1&&W.splice(e,1)}),[]);let s=t.toasts.map(t=>{var a,r,o;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||Z[t.type],style:{...e.style,...null==(o=e[t.type])?void 0:o.style,...t.style}}});return{...t,toasts:s}})(e);a.useEffect(()=>{if(r)return;let e=Date.now(),a=t.map(t=>{if(t.duration===1/0)return;let a=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(!(a<0))return setTimeout(()=>Q.dismiss(t.id),a);t.visible&&Q.dismiss(t.id)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[t,r]);let o=a.useCallback(()=>{r&&V({type:6,time:Date.now()})},[r]),s=a.useCallback((e,a)=>{let{reverseOrder:r=!1,gutter:o=8,defaultPosition:s}=a||{},i=t.filter(t=>(t.position||s)===(e.position||s)&&t.height),n=i.findIndex(t=>t.id===e.id),l=i.filter((e,t)=>t<n&&e.visible).length;return i.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+o,0)},[t]);return a.useEffect(()=>{t.forEach(e=>{if(e.dismissed)((e,t=1e3)=>{if(se.has(e))return;let a=setTimeout(()=>{se.delete(e),V({type:4,toastId:e})},t);se.set(e,a)})(e.id,e.removeDelay);else{let t=se.get(e.id);t&&(clearTimeout(t),se.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:re,startPause:oe,endPause:o,calculateOffset:s}}},ne=B`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,le=B`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,de=B`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,ce=R("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ne} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${le} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${de} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,me=B`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,ue=R("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${me} 1s linear infinite;
`,pe=B`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,he=B`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,ge=R("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${pe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${he} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,fe=R("div")`
  position: absolute;
`,xe=R("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ye=B`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,be=R("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ye} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ve=({toast:e})=>{let{icon:t,type:r,iconTheme:o}=e;return void 0!==t?"string"==typeof t?a.createElement(be,null,t):t:"blank"===r?null:a.createElement(xe,null,a.createElement(ue,{...o}),"loading"!==r&&a.createElement(fe,null,"error"===r?a.createElement(ce,{...o}):a.createElement(ge,{...o})))},we=e=>`\n0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,ke=e=>`\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}\n`,je=R("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Ne=R("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Ee=a.memo(({toast:e,position:t,style:r,children:o})=>{let s=e.height?((e,t)=>{let a=e.includes("top")?1:-1,[r,o]=q()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[we(a),ke(a)];return{animation:t?`${B(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${B(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},i=a.createElement(ve,{toast:e}),n=a.createElement(Ne,{...e.ariaProps},F(e.message,e));return a.createElement(je,{className:e.className,style:{...s,...r,...e.style}},"function"==typeof o?o({icon:i,message:n}):a.createElement(a.Fragment,null,i,n))});X=a.createElement,H.p=ee,D=X,A=te,O=ae;var Ce=({id:e,className:t,style:r,onHeightUpdate:o,children:s})=>{let i=a.useCallback(t=>{if(t){let a=()=>{let a=t.getBoundingClientRect().height;o(e,a)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return a.createElement("div",{ref:i,className:t,style:r},s)},$e=_`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Te=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:o,children:s,containerStyle:i,containerClassName:n})=>{let{toasts:l,handlers:d}=ie(r);return a.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...i},className:n,onMouseEnter:d.startPause,onMouseLeave:d.endPause},l.map(r=>{let i=r.position||t,n=((e,t)=>{let a=e.includes("top"),r=a?{top:0}:{bottom:0},o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:q()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...r,...o}})(i,d.calculateOffset(r,{reverseOrder:e,gutter:o,defaultPosition:t}));return a.createElement(Ce,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?$e:"",style:n},"custom"===r.type?F(r.message,r):s?s(r):a.createElement(Ee,{toast:r,position:i}))}))};const Le=()=>e.jsxs("div",{className:"flex flex-col min-h-screen",children:[e.jsx(T,{}),e.jsx("main",{className:"flex-grow",children:e.jsx(n,{})}),e.jsx(L,{}),e.jsx(Te,{position:"top-center"})]});export{Le as default};
//# sourceMappingURL=Layout-CdwU7P8O.js.map
