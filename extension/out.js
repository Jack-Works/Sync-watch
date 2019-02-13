function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  
            if (!window.shadowRoot) { return setTimeout(() => styleInject(css, ref), 200) }
            var head = window.shadowRoot;
            var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = "body {\n    margin: 0;\n    padding: 0;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n\n    overflow: hidden;\n}\ninput,\ntextarea,\nselect,\nbutton,\nbody {\n    font-family: -apple-system, BlinkMacSystemFont, 'Microsoft Yahei UI Light', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',\n        'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;\n}\n\n#root {\n    overflow: hidden;\n}\n\nmain {\n    display: flex;\n    flex-direction: row;\n    width: 100vw;\n    height: 100vh;\n}\n/* For youtube player */\nmain [class^='media-player'] {\n    width: 100%;\n}\n/* For input on mobile */\ndiv[class^='text-box-input'] {\n    min-height: 32px;\n}\n\n.dialog {\n    width: 100vw;\n    min-height: 300px;\n    padding: 3em 15vw;\n    padding-bottom: 0;\n    background: hsl(215, 70%, 30%);\n    display: flex;\n    flex-direction: column;\n    transition: 400ms;\n    height: 0;\n    align-self: center;\n}\n\n.videoPlayer > * {\n    width: 100%;\n}\n@media screen and (max-width: 850px) {\n    .dialog {\n        height: 100vh;\n        padding: 3em;\n        padding-bottom: 0;\n    }\n    main {\n        display: block;\n    }\n    .videoPlayer > * {\n        height: 100%;\n    }\n}\n\n:host([data-sync-watch='extension']) .dialog {\n    height: 100vh;\n    padding: 3em;\n    padding-bottom: 0;\n}\n:host([data-sync-watch='extension']) main,\n:host([data-sync-watch='extension']) .dialog {\n    display: block;\n    width: 100%;\n}\n:host([data-sync-watch='extension']) h1 {\n    color: white;\n}\n\n.dialog nav + * {\n    flex: 1;\n}\n.dialog nav {\n    text-align: right;\n}\n\naside {\n    flex: 3;\n    display: flex;\n    flex-direction: column;\n    overflow: hidden;\n}\n\naside .list {\n    width: 100%;\n    flex: 1;\n    overflow-y: scroll;\n}\n";
styleInject(css);

/**
 * __sync_watch__ can be one of the following:
 * * a url (string)
 * * many url (string[])
 * * an object (See ./src/Comps/gun.d.ts)
 */
{
    let servers = [
        // use public gun server?
        (() => (
            console.warn('You are using public gun server. Maybe you should build your own one'),
            'https://gungame.herokuapp.com/gun'
        ))(),
        // use vola sync server?
        (() => (
            console.warn('You are using vola public gun server. Maybe you should build your own one'),
            'https://sync-watch.vola.xyz/gun'
        ))(),
    ];
    if (location.hostname === 'localhost') {
        servers.push('http://localhost:8765/gun');
    } else {
        servers.push(location.origin + '/gun');
    }
    window.__sync_watch__ = servers;
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

var n="function"===typeof Symbol&&Symbol.for,p=n?Symbol.for("react.element"):60103,q=n?Symbol.for("react.portal"):60106,r=n?Symbol.for("react.fragment"):60107,t=n?Symbol.for("react.strict_mode"):60108,u=n?Symbol.for("react.profiler"):60114,v=n?Symbol.for("react.provider"):60109,w=n?Symbol.for("react.context"):60110,x=n?Symbol.for("react.concurrent_mode"):60111,y=n?Symbol.for("react.forward_ref"):60112,z=n?Symbol.for("react.suspense"):60113,aa=n?Symbol.for("react.memo"):
60115,ba=n?Symbol.for("react.lazy"):60116,A="function"===typeof Symbol&&Symbol.iterator;function ca(a,b,d,c,e,g,h,f){if(!a){a=void 0;if(void 0===b)a=Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[d,c,e,g,h,f],m=0;a=Error(b.replace(/%s/g,function(){return l[m++]}));a.name="Invariant Violation";}a.framesToPop=1;throw a;}}
function B(a){for(var b=arguments.length-1,d="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=0;c<b;c++)d+="&args[]="+encodeURIComponent(arguments[c+1]);ca(!1,"Minified React error #"+a+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",d);}var C={isMounted:function(){return !1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},D={};
function E(a,b,d){this.props=a;this.context=b;this.refs=D;this.updater=d||C;}E.prototype.isReactComponent={};E.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?B("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState");};E.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate");};function F(){}F.prototype=E.prototype;function G(a,b,d){this.props=a;this.context=b;this.refs=D;this.updater=d||C;}var H=G.prototype=new F;
H.constructor=G;objectAssign(H,E.prototype);H.isPureReactComponent=!0;var I={current:null},J={current:null},K=Object.prototype.hasOwnProperty,L={key:!0,ref:!0,__self:!0,__source:!0};
function M(a,b,d){var c=void 0,e={},g=null,h=null;if(null!=b)for(c in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(g=""+b.key),b)K.call(b,c)&&!L.hasOwnProperty(c)&&(e[c]=b[c]);var f=arguments.length-2;if(1===f)e.children=d;else if(1<f){for(var l=Array(f),m=0;m<f;m++)l[m]=arguments[m+2];e.children=l;}if(a&&a.defaultProps)for(c in f=a.defaultProps,f)void 0===e[c]&&(e[c]=f[c]);return {$$typeof:p,type:a,key:g,ref:h,props:e,_owner:J.current}}
function da(a,b){return {$$typeof:p,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function N(a){return "object"===typeof a&&null!==a&&a.$$typeof===p}function escape(a){var b={"=":"=0",":":"=2"};return "$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var O=/\/+/g,P=[];function Q(a,b,d,c){if(P.length){var e=P.pop();e.result=a;e.keyPrefix=b;e.func=d;e.context=c;e.count=0;return e}return {result:a,keyPrefix:b,func:d,context:c,count:0}}
function R(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>P.length&&P.push(a);}
function S(a,b,d,c){var e=typeof a;if("undefined"===e||"boolean"===e)a=null;var g=!1;if(null===a)g=!0;else switch(e){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case p:case q:g=!0;}}if(g)return d(c,a,""===b?"."+T(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var h=0;h<a.length;h++){e=a[h];var f=b+T(e,h);g+=S(e,f,d,c);}else if(null===a||"object"!==typeof a?f=null:(f=A&&a[A]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=f.call(a),h=
0;!(e=a.next()).done;)e=e.value,f=b+T(e,h++),g+=S(e,f,d,c);else"object"===e&&(d=""+a,B("31","[object Object]"===d?"object with keys {"+Object.keys(a).join(", ")+"}":d,""));return g}function U(a,b,d){return null==a?0:S(a,"",b,d)}function T(a,b){return "object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function ea(a,b){a.func.call(a.context,b,a.count++);}
function fa(a,b,d){var c=a.result,e=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?V(a,c,d,function(a){return a}):null!=a&&(N(a)&&(a=da(a,e+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(O,"$&/")+"/")+d)),c.push(a));}function V(a,b,d,c,e){var g="";null!=d&&(g=(""+d).replace(O,"$&/")+"/");b=Q(b,g,c,e);U(a,fa,b);R(b);}function W(){var a=I.current;null===a?B("307"):void 0;return a}
var X={Children:{map:function(a,b,d){if(null==a)return a;var c=[];V(a,c,null,b,d);return c},forEach:function(a,b,d){if(null==a)return a;b=Q(null,null,b,d);U(a,ea,b);R(b);},count:function(a){return U(a,function(){return null},null)},toArray:function(a){var b=[];V(a,b,null,function(a){return a});return b},only:function(a){N(a)?void 0:B("143");return a}},createRef:function(){return {current:null}},Component:E,PureComponent:G,createContext:function(a,b){void 0===b&&(b=null);a={$$typeof:w,_calculateChangedBits:b,
_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:v,_context:a};return a.Consumer=a},forwardRef:function(a){return {$$typeof:y,render:a}},lazy:function(a){return {$$typeof:ba,_ctor:a,_status:-1,_result:null}},memo:function(a,b){return {$$typeof:aa,type:a,compare:void 0===b?null:b}},useCallback:function(a,b){return W().useCallback(a,b)},useContext:function(a,b){return W().useContext(a,b)},useEffect:function(a,b){return W().useEffect(a,b)},useImperativeHandle:function(a,
b,d){return W().useImperativeHandle(a,b,d)},useDebugValue:function(){},useLayoutEffect:function(a,b){return W().useLayoutEffect(a,b)},useMemo:function(a,b){return W().useMemo(a,b)},useReducer:function(a,b,d){return W().useReducer(a,b,d)},useRef:function(a){return W().useRef(a)},useState:function(a){return W().useState(a)},Fragment:r,StrictMode:t,Suspense:z,createElement:M,cloneElement:function(a,b,d){null===a||void 0===a?B("267",a):void 0;var c=void 0,e=objectAssign({},a.props),g=a.key,h=a.ref,f=a._owner;if(null!=
b){void 0!==b.ref&&(h=b.ref,f=J.current);void 0!==b.key&&(g=""+b.key);var l=void 0;a.type&&a.type.defaultProps&&(l=a.type.defaultProps);for(c in b)K.call(b,c)&&!L.hasOwnProperty(c)&&(e[c]=void 0===b[c]&&void 0!==l?l[c]:b[c]);}c=arguments.length-2;if(1===c)e.children=d;else if(1<c){l=Array(c);for(var m=0;m<c;m++)l[m]=arguments[m+2];e.children=l;}return {$$typeof:p,type:a.type,key:g,ref:h,props:e,_owner:f}},createFactory:function(a){var b=M.bind(null,a);b.type=a;return b},isValidElement:N,version:"16.8.1",
unstable_ConcurrentMode:x,unstable_Profiler:u,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentDispatcher:I,ReactCurrentOwner:J,assign:objectAssign}},Y={default:X},Z=Y&&X||Y;var react_production_min=Z.default||Z;

var react = createCommonjsModule(function (module) {

{
  module.exports = react_production_min;
}
});
var react_1 = react.useState;
var react_2 = react.useRef;
var react_3 = react.useImperativeHandle;
var react_4 = react.forwardRef;
var react_5 = react.useEffect;

var scheduler_production_min = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var c=null,f=!1,h=3,k=-1,l=-1,m=!1,n=!1;function p(){if(!m){var a=c.expirationTime;n?q():n=!0;r(t,a);}}
function u(){var a=c,b=c.next;if(c===b)c=null;else{var d=c.previous;c=d.next=b;b.previous=d;}a.next=a.previous=null;d=a.callback;b=a.expirationTime;a=a.priorityLevel;var e=h,Q=l;h=a;l=b;try{var g=d();}finally{h=e,l=Q;}if("function"===typeof g)if(g={callback:g,priorityLevel:a,expirationTime:b,next:null,previous:null},null===c)c=g.next=g.previous=g;else{d=null;a=c;do{if(a.expirationTime>=b){d=a;break}a=a.next;}while(a!==c);null===d?d=c:d===c&&(c=g,p());b=d.previous;b.next=d.previous=g;g.next=d;g.previous=
b;}}function v(){if(-1===k&&null!==c&&1===c.priorityLevel){m=!0;try{do u();while(null!==c&&1===c.priorityLevel)}finally{m=!1,null!==c?p():n=!1;}}}function t(a){m=!0;var b=f;f=a;try{if(a)for(;null!==c;){var d=exports.unstable_now();if(c.expirationTime<=d){do u();while(null!==c&&c.expirationTime<=d)}else break}else if(null!==c){do u();while(null!==c&&!w())}}finally{m=!1,f=b,null!==c?p():n=!1,v();}}
var x=Date,y="function"===typeof setTimeout?setTimeout:void 0,z="function"===typeof clearTimeout?clearTimeout:void 0,A="function"===typeof requestAnimationFrame?requestAnimationFrame:void 0,B="function"===typeof cancelAnimationFrame?cancelAnimationFrame:void 0,C,D;function E(a){C=A(function(b){z(D);a(b);});D=y(function(){B(C);a(exports.unstable_now());},100);}
if("object"===typeof performance&&"function"===typeof performance.now){var F=performance;exports.unstable_now=function(){return F.now()};}else exports.unstable_now=function(){return x.now()};var r,q,w,G=null;"undefined"!==typeof window?G=window:"undefined"!==typeof commonjsGlobal&&(G=commonjsGlobal);
if(G&&G._schedMock){var H=G._schedMock;r=H[0];q=H[1];w=H[2];exports.unstable_now=H[3];}else if("undefined"===typeof window||"function"!==typeof MessageChannel){var I=null,J=function(a){if(null!==I)try{I(a);}finally{I=null;}};r=function(a){null!==I?setTimeout(r,0,a):(I=a,setTimeout(J,0,!1));};q=function(){I=null;};w=function(){return !1};}else{"undefined"!==typeof console&&("function"!==typeof A&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"),
"function"!==typeof B&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"));var K=null,L=!1,M=-1,N=!1,O=!1,P=0,R=33,S=33;w=function(){return P<=exports.unstable_now()};var T=new MessageChannel,U=T.port2;T.port1.onmessage=function(){L=!1;var a=K,b=M;K=null;M=-1;var d=exports.unstable_now(),e=!1;if(0>=P-d)if(-1!==b&&b<=d)e=!0;else{N||(N=!0,E(V));K=a;M=b;return}if(null!==a){O=!0;try{a(e);}finally{O=!1;}}};
var V=function(a){if(null!==K){E(V);var b=a-P+S;b<S&&R<S?(8>b&&(b=8),S=b<R?R:b):R=b;P=a+S;L||(L=!0,U.postMessage(void 0));}else N=!1;};r=function(a,b){K=a;M=b;O||0>b?U.postMessage(void 0):N||(N=!0,E(V));};q=function(){K=null;L=!1;M=-1;};}exports.unstable_ImmediatePriority=1;exports.unstable_UserBlockingPriority=2;exports.unstable_NormalPriority=3;exports.unstable_IdlePriority=5;exports.unstable_LowPriority=4;
exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3;}var d=h,e=k;h=a;k=exports.unstable_now();try{return b()}finally{h=d,k=e,v();}};
exports.unstable_scheduleCallback=function(a,b){var d=-1!==k?k:exports.unstable_now();if("object"===typeof b&&null!==b&&"number"===typeof b.timeout)b=d+b.timeout;else switch(h){case 1:b=d+-1;break;case 2:b=d+250;break;case 5:b=d+1073741823;break;case 4:b=d+1E4;break;default:b=d+5E3;}a={callback:a,priorityLevel:h,expirationTime:b,next:null,previous:null};if(null===c)c=a.next=a.previous=a,p();else{d=null;var e=c;do{if(e.expirationTime>b){d=e;break}e=e.next;}while(e!==c);null===d?d=c:d===c&&(c=a,p());
b=d.previous;b.next=d.previous=a;a.next=d;a.previous=b;}return a};exports.unstable_cancelCallback=function(a){var b=a.next;if(null!==b){if(b===a)c=null;else{a===c&&(c=b);var d=a.previous;d.next=b;b.previous=d;}a.next=a.previous=null;}};exports.unstable_wrapCallback=function(a){var b=h;return function(){var d=h,e=k;h=b;k=exports.unstable_now();try{return a.apply(this,arguments)}finally{h=d,k=e,v();}}};exports.unstable_getCurrentPriorityLevel=function(){return h};
exports.unstable_shouldYield=function(){return !f&&(null!==c&&c.expirationTime<l||w())};exports.unstable_continueExecution=function(){null!==c&&p();};exports.unstable_pauseExecution=function(){};exports.unstable_getFirstCallbackNode=function(){return c};
});

unwrapExports(scheduler_production_min);
var scheduler_production_min_1 = scheduler_production_min.unstable_now;
var scheduler_production_min_2 = scheduler_production_min.unstable_ImmediatePriority;
var scheduler_production_min_3 = scheduler_production_min.unstable_UserBlockingPriority;
var scheduler_production_min_4 = scheduler_production_min.unstable_NormalPriority;
var scheduler_production_min_5 = scheduler_production_min.unstable_IdlePriority;
var scheduler_production_min_6 = scheduler_production_min.unstable_LowPriority;
var scheduler_production_min_7 = scheduler_production_min.unstable_runWithPriority;
var scheduler_production_min_8 = scheduler_production_min.unstable_scheduleCallback;
var scheduler_production_min_9 = scheduler_production_min.unstable_cancelCallback;
var scheduler_production_min_10 = scheduler_production_min.unstable_wrapCallback;
var scheduler_production_min_11 = scheduler_production_min.unstable_getCurrentPriorityLevel;
var scheduler_production_min_12 = scheduler_production_min.unstable_shouldYield;
var scheduler_production_min_13 = scheduler_production_min.unstable_continueExecution;
var scheduler_production_min_14 = scheduler_production_min.unstable_pauseExecution;
var scheduler_production_min_15 = scheduler_production_min.unstable_getFirstCallbackNode;

var scheduler = createCommonjsModule(function (module) {

{
  module.exports = scheduler_production_min;
}
});

function ca$1(a,b,c,d,e,f,g,h){if(!a){a=void 0;if(void 0===b)a=Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[c,d,e,f,g,h],k=0;a=Error(b.replace(/%s/g,function(){return l[k++]}));a.name="Invariant Violation";}a.framesToPop=1;throw a;}}
function t$1(a){for(var b=arguments.length-1,c="https://reactjs.org/docs/error-decoder.html?invariant="+a,d=0;d<b;d++)c+="&args[]="+encodeURIComponent(arguments[d+1]);ca$1(!1,"Minified React error #"+a+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",c);}react?void 0:t$1("227");function da$1(a,b,c,d,e,f,g,h,l){var k=Array.prototype.slice.call(arguments,3);try{b.apply(c,k);}catch(m){this.onError(m);}}
var ea$1=!1,fa$1=null,ha=!1,ia=null,ja={onError:function(a){ea$1=!0;fa$1=a;}};function ka(a,b,c,d,e,f,g,h,l){ea$1=!1;fa$1=null;da$1.apply(ja,arguments);}function la(a,b,c,d,e,f,g,h,l){ka.apply(this,arguments);if(ea$1){if(ea$1){var k=fa$1;ea$1=!1;fa$1=null;}else t$1("198"),k=void 0;ha||(ha=!0,ia=k);}}var ma=null,na={};
function oa(){if(ma)for(var a in na){var b=na[a],c=ma.indexOf(a);-1<c?void 0:t$1("96",a);if(!pa[c]){b.extractEvents?void 0:t$1("97",a);pa[c]=b;c=b.eventTypes;for(var d in c){var e=void 0;var f=c[d],g=b,h=d;ra.hasOwnProperty(h)?t$1("99",h):void 0;ra[h]=f;var l=f.phasedRegistrationNames;if(l){for(e in l)l.hasOwnProperty(e)&&sa(l[e],g,h);e=!0;}else f.registrationName?(sa(f.registrationName,g,h),e=!0):e=!1;e?void 0:t$1("98",d,a);}}}}
function sa(a,b,c){ta[a]?t$1("100",a):void 0;ta[a]=b;ua[a]=b.eventTypes[c].dependencies;}var pa=[],ra={},ta={},ua={},va=null,wa=null,xa=null;function ya(a,b,c){var d=a.type||"unknown-event";a.currentTarget=xa(c);la(d,b,void 0,a);a.currentTarget=null;}function za(a,b){null==b?t$1("30"):void 0;if(null==a)return b;if(Array.isArray(a)){if(Array.isArray(b))return a.push.apply(a,b),a;a.push(b);return a}return Array.isArray(b)?[a].concat(b):[a,b]}
function Aa(a,b,c){Array.isArray(a)?a.forEach(b,c):a&&b.call(c,a);}var Ba=null;function Ca(a){if(a){var b=a._dispatchListeners,c=a._dispatchInstances;if(Array.isArray(b))for(var d=0;d<b.length&&!a.isPropagationStopped();d++)ya(a,b[d],c[d]);else b&&ya(a,b,c);a._dispatchListeners=null;a._dispatchInstances=null;a.isPersistent()||a.constructor.release(a);}}
var Da={injectEventPluginOrder:function(a){ma?t$1("101"):void 0;ma=Array.prototype.slice.call(a);oa();},injectEventPluginsByName:function(a){var b=!1,c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];na.hasOwnProperty(c)&&na[c]===d||(na[c]?t$1("102",c):void 0,na[c]=d,b=!0);}b&&oa();}};
function Ea(a,b){var c=a.stateNode;if(!c)return null;var d=va(c);if(!d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1;}if(a)return null;c&&"function"!==typeof c?t$1("231",b,typeof c):void 0;
return c}function Fa(a){null!==a&&(Ba=za(Ba,a));a=Ba;Ba=null;if(a&&(Aa(a,Ca),Ba?t$1("95"):void 0,ha))throw a=ia,ha=!1,ia=null,a;}var Ga=Math.random().toString(36).slice(2),Ha="__reactInternalInstance$"+Ga,Ia="__reactEventHandlers$"+Ga;function Ja(a){if(a[Ha])return a[Ha];for(;!a[Ha];)if(a.parentNode)a=a.parentNode;else return null;a=a[Ha];return 5===a.tag||6===a.tag?a:null}function Ka(a){a=a[Ha];return !a||5!==a.tag&&6!==a.tag?null:a}
function La(a){if(5===a.tag||6===a.tag)return a.stateNode;t$1("33");}function Ma(a){return a[Ia]||null}function Na(a){do a=a.return;while(a&&5!==a.tag);return a?a:null}function Oa(a,b,c){if(b=Ea(a,c.dispatchConfig.phasedRegistrationNames[b]))c._dispatchListeners=za(c._dispatchListeners,b),c._dispatchInstances=za(c._dispatchInstances,a);}
function Pa(a){if(a&&a.dispatchConfig.phasedRegistrationNames){for(var b=a._targetInst,c=[];b;)c.push(b),b=Na(b);for(b=c.length;0<b--;)Oa(c[b],"captured",a);for(b=0;b<c.length;b++)Oa(c[b],"bubbled",a);}}function Qa(a,b,c){a&&c&&c.dispatchConfig.registrationName&&(b=Ea(a,c.dispatchConfig.registrationName))&&(c._dispatchListeners=za(c._dispatchListeners,b),c._dispatchInstances=za(c._dispatchInstances,a));}function Ra(a){a&&a.dispatchConfig.registrationName&&Qa(a._targetInst,null,a);}
function Sa(a){Aa(a,Pa);}var Ta=!("undefined"===typeof window||!window.document||!window.document.createElement);function Ua(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}var Va={animationend:Ua("Animation","AnimationEnd"),animationiteration:Ua("Animation","AnimationIteration"),animationstart:Ua("Animation","AnimationStart"),transitionend:Ua("Transition","TransitionEnd")},Wa={},Xa={};
Ta&&(Xa=document.createElement("div").style,"AnimationEvent"in window||(delete Va.animationend.animation,delete Va.animationiteration.animation,delete Va.animationstart.animation),"TransitionEvent"in window||delete Va.transitionend.transition);function Ya(a){if(Wa[a])return Wa[a];if(!Va[a])return a;var b=Va[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Xa)return Wa[a]=b[c];return a}
var Za=Ya("animationend"),$a=Ya("animationiteration"),ab=Ya("animationstart"),bb=Ya("transitionend"),cb="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),db=null,eb=null,fb=null;
function gb(){if(fb)return fb;var a,b=eb,c=b.length,d,e="value"in db?db.value:db.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return fb=e.slice(a,1<d?1-d:void 0)}function hb(){return !0}function ib(){return !1}
function A$1(a,b,c,d){this.dispatchConfig=a;this._targetInst=b;this.nativeEvent=c;a=this.constructor.Interface;for(var e in a)a.hasOwnProperty(e)&&((b=a[e])?this[e]=b(c):"target"===e?this.target=d:this[e]=c[e]);this.isDefaultPrevented=(null!=c.defaultPrevented?c.defaultPrevented:!1===c.returnValue)?hb:ib;this.isPropagationStopped=ib;return this}
objectAssign(A$1.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=hb);},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=hb);},persist:function(){this.isPersistent=hb;},isPersistent:ib,destructor:function(){var a=this.constructor.Interface,
b;for(b in a)this[b]=null;this.nativeEvent=this._targetInst=this.dispatchConfig=null;this.isPropagationStopped=this.isDefaultPrevented=ib;this._dispatchInstances=this._dispatchListeners=null;}});A$1.Interface={type:null,target:null,currentTarget:function(){return null},eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};
A$1.extend=function(a){function b(){}function c(){return d.apply(this,arguments)}var d=this;b.prototype=d.prototype;var e=new b;objectAssign(e,c.prototype);c.prototype=e;c.prototype.constructor=c;c.Interface=objectAssign({},d.Interface,a);c.extend=d.extend;jb(c);return c};jb(A$1);function kb(a,b,c,d){if(this.eventPool.length){var e=this.eventPool.pop();this.call(e,a,b,c,d);return e}return new this(a,b,c,d)}function lb(a){a instanceof this?void 0:t$1("279");a.destructor();10>this.eventPool.length&&this.eventPool.push(a);}
function jb(a){a.eventPool=[];a.getPooled=kb;a.release=lb;}var mb=A$1.extend({data:null}),nb=A$1.extend({data:null}),ob=[9,13,27,32],pb=Ta&&"CompositionEvent"in window,qb=null;Ta&&"documentMode"in document&&(qb=document.documentMode);
var rb=Ta&&"TextEvent"in window&&!qb,sb=Ta&&(!pb||qb&&8<qb&&11>=qb),tb=String.fromCharCode(32),ub={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["compositionend","keypress","textInput","paste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:"blur compositionend keydown keypress keyup mousedown".split(" ")},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",
captured:"onCompositionStartCapture"},dependencies:"blur compositionstart keydown keypress keyup mousedown".split(" ")},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:"blur compositionupdate keydown keypress keyup mousedown".split(" ")}},wb=!1;
function xb(a,b){switch(a){case "keyup":return -1!==ob.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "blur":return !0;default:return !1}}function yb(a){a=a.detail;return "object"===typeof a&&"data"in a?a.data:null}var zb=!1;function Ab(a,b){switch(a){case "compositionend":return yb(b);case "keypress":if(32!==b.which)return null;wb=!0;return tb;case "textInput":return a=b.data,a===tb&&wb?null:a;default:return null}}
function Bb(a,b){if(zb)return "compositionend"===a||!pb&&xb(a,b)?(a=gb(),fb=eb=db=null,zb=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return sb&&"ko"!==b.locale?null:b.data;default:return null}}
var Cb={eventTypes:ub,extractEvents:function(a,b,c,d){var e=void 0;var f=void 0;if(pb)b:{switch(a){case "compositionstart":e=ub.compositionStart;break b;case "compositionend":e=ub.compositionEnd;break b;case "compositionupdate":e=ub.compositionUpdate;break b}e=void 0;}else zb?xb(a,c)&&(e=ub.compositionEnd):"keydown"===a&&229===c.keyCode&&(e=ub.compositionStart);e?(sb&&"ko"!==c.locale&&(zb||e!==ub.compositionStart?e===ub.compositionEnd&&zb&&(f=gb()):(db=d,eb="value"in db?db.value:db.textContent,zb=
!0)),e=mb.getPooled(e,b,c,d),f?e.data=f:(f=yb(c),null!==f&&(e.data=f)),Sa(e),f=e):f=null;(a=rb?Ab(a,c):Bb(a,c))?(b=nb.getPooled(ub.beforeInput,b,c,d),b.data=a,Sa(b)):b=null;return null===f?b:null===b?f:[f,b]}},Db=null,Eb=null,Fb=null;function Gb(a){if(a=wa(a)){"function"!==typeof Db?t$1("280"):void 0;var b=va(a.stateNode);Db(a.stateNode,a.type,b);}}function Hb(a){Eb?Fb?Fb.push(a):Fb=[a]:Eb=a;}function Ib(){if(Eb){var a=Eb,b=Fb;Fb=Eb=null;Gb(a);if(b)for(a=0;a<b.length;a++)Gb(b[a]);}}
function Jb(a,b){return a(b)}function Kb(a,b,c){return a(b,c)}function Lb(){}var Mb=!1;function Nb(a,b){if(Mb)return a(b);Mb=!0;try{return Jb(a,b)}finally{if(Mb=!1,null!==Eb||null!==Fb)Lb(),Ib();}}var Ob={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Pb(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return "input"===b?!!Ob[a.type]:"textarea"===b?!0:!1}
function Qb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}function Sb(a){if(!Ta)return !1;a="on"+a;var b=a in document;b||(b=document.createElement("div"),b.setAttribute(a,"return;"),b="function"===typeof b[a]);return b}function Tb(a){var b=a.type;return (a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function Ub(a){var b=Tb(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a);}});Object.defineProperty(a,b,{enumerable:c.enumerable});return {getValue:function(){return d},setValue:function(a){d=""+a;},stopTracking:function(){a._valueTracker=
null;delete a[b];}}}}function Vb(a){a._valueTracker||(a._valueTracker=Ub(a));}function Wb(a){if(!a)return !1;var b=a._valueTracker;if(!b)return !0;var c=b.getValue();var d="";a&&(d=Tb(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}var Xb=react.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;Xb.hasOwnProperty("ReactCurrentDispatcher")||(Xb.ReactCurrentDispatcher={current:null});
var Yb=/^(.*)[\\\/]/,D$1="function"===typeof Symbol&&Symbol.for,Zb=D$1?Symbol.for("react.element"):60103,$b=D$1?Symbol.for("react.portal"):60106,ac=D$1?Symbol.for("react.fragment"):60107,bc=D$1?Symbol.for("react.strict_mode"):60108,cc=D$1?Symbol.for("react.profiler"):60114,dc=D$1?Symbol.for("react.provider"):60109,ec=D$1?Symbol.for("react.context"):60110,fc=D$1?Symbol.for("react.concurrent_mode"):60111,gc=D$1?Symbol.for("react.forward_ref"):60112,hc=D$1?Symbol.for("react.suspense"):60113,ic=D$1?Symbol.for("react.memo"):
60115,jc=D$1?Symbol.for("react.lazy"):60116,kc="function"===typeof Symbol&&Symbol.iterator;function lc(a){if(null===a||"object"!==typeof a)return null;a=kc&&a[kc]||a["@@iterator"];return "function"===typeof a?a:null}
function mc(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case fc:return "ConcurrentMode";case ac:return "Fragment";case $b:return "Portal";case cc:return "Profiler";case bc:return "StrictMode";case hc:return "Suspense"}if("object"===typeof a)switch(a.$$typeof){case ec:return "Context.Consumer";case dc:return "Context.Provider";case gc:var b=a.render;b=b.displayName||b.name||"";return a.displayName||(""!==b?"ForwardRef("+b+
")":"ForwardRef");case ic:return mc(a.type);case jc:if(a=1===a._status?a._result:null)return mc(a)}return null}function nc(a){var b="";do{a:switch(a.tag){case 3:case 4:case 6:case 7:case 10:case 9:var c="";break a;default:var d=a._debugOwner,e=a._debugSource,f=mc(a.type);c=null;d&&(c=mc(d.type));d=f;f="";e?f=" (at "+e.fileName.replace(Yb,"")+":"+e.lineNumber+")":c&&(f=" (created by "+c+")");c="\n    in "+(d||"Unknown")+f;}b+=c;a=a.return;}while(a);return b}
var oc=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,pc=Object.prototype.hasOwnProperty,qc={},rc={};
function sc(a){if(pc.call(rc,a))return !0;if(pc.call(qc,a))return !1;if(oc.test(a))return rc[a]=!0;qc[a]=!0;return !1}function tc(a,b,c,d){if(null!==c&&0===c.type)return !1;switch(typeof b){case "function":case "symbol":return !0;case "boolean":if(d)return !1;if(null!==c)return !c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return "data-"!==a&&"aria-"!==a;default:return !1}}
function uc(a,b,c,d){if(null===b||"undefined"===typeof b||tc(a,b,c,d))return !0;if(d)return !1;if(null!==c)switch(c.type){case 3:return !b;case 4:return !1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return !1}function F$1(a,b,c,d,e){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;}var G$1={};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){G$1[a]=new F$1(a,0,!1,a,null);});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];G$1[b]=new F$1(b,1,!1,a[1],null);});["contentEditable","draggable","spellCheck","value"].forEach(function(a){G$1[a]=new F$1(a,2,!1,a.toLowerCase(),null);});
["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){G$1[a]=new F$1(a,2,!1,a,null);});"allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){G$1[a]=new F$1(a,3,!1,a.toLowerCase(),null);});["checked","multiple","muted","selected"].forEach(function(a){G$1[a]=new F$1(a,3,!0,a,null);});
["capture","download"].forEach(function(a){G$1[a]=new F$1(a,4,!1,a,null);});["cols","rows","size","span"].forEach(function(a){G$1[a]=new F$1(a,6,!1,a,null);});["rowSpan","start"].forEach(function(a){G$1[a]=new F$1(a,5,!1,a.toLowerCase(),null);});var vc=/[\-:]([a-z])/g;function wc(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(vc,
wc);G$1[b]=new F$1(b,1,!1,a,null);});"xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(vc,wc);G$1[b]=new F$1(b,1,!1,a,"http://www.w3.org/1999/xlink");});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(vc,wc);G$1[b]=new F$1(b,1,!1,a,"http://www.w3.org/XML/1998/namespace");});G$1.tabIndex=new F$1("tabIndex",1,!1,"tabindex",null);
function xc(a,b,c,d){var e=G$1.hasOwnProperty(b)?G$1[b]:null;var f=null!==e?0===e.type:d?!1:!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1]?!1:!0;f||(uc(b,c,e,d)&&(c=null),d||null===e?sc(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c))));}
function yc(a){switch(typeof a){case "boolean":case "number":case "object":case "string":case "undefined":return a;default:return ""}}function zc(a,b){var c=b.checked;return objectAssign({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}
function Ac(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=yc(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value};}function Bc(a,b){b=b.checked;null!=b&&xc(a,"checked",b,!1);}
function Cc(a,b){Bc(a,b);var c=yc(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=c)a.value=""+c;}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?Dc(a,b.type,c):b.hasOwnProperty("defaultValue")&&Dc(a,b.type,yc(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked);}
function Ec(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;c||b===a.value||(a.value=b);a.defaultValue=b;}c=a.name;""!==c&&(a.name="");a.defaultChecked=!a.defaultChecked;a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c);}
function Dc(a,b,c){if("number"!==b||a.ownerDocument.activeElement!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c);}var Fc={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:"blur change click focus input keydown keyup selectionchange".split(" ")}};function Gc(a,b,c){a=A$1.getPooled(Fc.change,a,b,c);a.type="change";Hb(c);Sa(a);return a}var Hc=null,Ic=null;function Jc(a){Fa(a);}
function Kc(a){var b=La(a);if(Wb(b))return a}function Lc(a,b){if("change"===a)return b}var Mc=!1;Ta&&(Mc=Sb("input")&&(!document.documentMode||9<document.documentMode));function Nc(){Hc&&(Hc.detachEvent("onpropertychange",Oc),Ic=Hc=null);}function Oc(a){"value"===a.propertyName&&Kc(Ic)&&(a=Gc(Ic,a,Qb(a)),Nb(Jc,a));}function Pc(a,b,c){"focus"===a?(Nc(),Hc=b,Ic=c,Hc.attachEvent("onpropertychange",Oc)):"blur"===a&&Nc();}function Qc(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return Kc(Ic)}
function Rc(a,b){if("click"===a)return Kc(b)}function Sc(a,b){if("input"===a||"change"===a)return Kc(b)}
var Tc={eventTypes:Fc,_isInputEventSupported:Mc,extractEvents:function(a,b,c,d){var e=b?La(b):window,f=void 0,g=void 0,h=e.nodeName&&e.nodeName.toLowerCase();"select"===h||"input"===h&&"file"===e.type?f=Lc:Pb(e)?Mc?f=Sc:(f=Qc,g=Pc):(h=e.nodeName)&&"input"===h.toLowerCase()&&("checkbox"===e.type||"radio"===e.type)&&(f=Rc);if(f&&(f=f(a,b)))return Gc(f,c,d);g&&g(a,e,b);"blur"===a&&(a=e._wrapperState)&&a.controlled&&"number"===e.type&&Dc(e,"number",e.value);}},Uc=A$1.extend({view:null,detail:null}),Vc={Alt:"altKey",
Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Wc(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Vc[a])?!!b[a]:!1}function Xc(){return Wc}
var Yc=0,Zc=0,$c=!1,ad=!1,bd=Uc.extend({screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:Xc,button:null,buttons:null,relatedTarget:function(a){return a.relatedTarget||(a.fromElement===a.srcElement?a.toElement:a.fromElement)},movementX:function(a){if("movementX"in a)return a.movementX;var b=Yc;Yc=a.screenX;return $c?"mousemove"===a.type?a.screenX-b:0:($c=!0,0)},movementY:function(a){if("movementY"in a)return a.movementY;
var b=Zc;Zc=a.screenY;return ad?"mousemove"===a.type?a.screenY-b:0:(ad=!0,0)}}),cd=bd.extend({pointerId:null,width:null,height:null,pressure:null,tangentialPressure:null,tiltX:null,tiltY:null,twist:null,pointerType:null,isPrimary:null}),dd={mouseEnter:{registrationName:"onMouseEnter",dependencies:["mouseout","mouseover"]},mouseLeave:{registrationName:"onMouseLeave",dependencies:["mouseout","mouseover"]},pointerEnter:{registrationName:"onPointerEnter",dependencies:["pointerout","pointerover"]},pointerLeave:{registrationName:"onPointerLeave",
dependencies:["pointerout","pointerover"]}},ed={eventTypes:dd,extractEvents:function(a,b,c,d){var e="mouseover"===a||"pointerover"===a,f="mouseout"===a||"pointerout"===a;if(e&&(c.relatedTarget||c.fromElement)||!f&&!e)return null;e=d.window===d?d:(e=d.ownerDocument)?e.defaultView||e.parentWindow:window;f?(f=b,b=(b=c.relatedTarget||c.toElement)?Ja(b):null):f=null;if(f===b)return null;var g=void 0,h=void 0,l=void 0,k=void 0;if("mouseout"===a||"mouseover"===a)g=bd,h=dd.mouseLeave,l=dd.mouseEnter,k="mouse";
else if("pointerout"===a||"pointerover"===a)g=cd,h=dd.pointerLeave,l=dd.pointerEnter,k="pointer";var m=null==f?e:La(f);e=null==b?e:La(b);a=g.getPooled(h,f,c,d);a.type=k+"leave";a.target=m;a.relatedTarget=e;c=g.getPooled(l,b,c,d);c.type=k+"enter";c.target=e;c.relatedTarget=m;d=b;if(f&&d)a:{b=f;e=d;k=0;for(g=b;g;g=Na(g))k++;g=0;for(l=e;l;l=Na(l))g++;for(;0<k-g;)b=Na(b),k--;for(;0<g-k;)e=Na(e),g--;for(;k--;){if(b===e||b===e.alternate)break a;b=Na(b);e=Na(e);}b=null;}else b=null;e=b;for(b=[];f&&f!==e;){k=
f.alternate;if(null!==k&&k===e)break;b.push(f);f=Na(f);}for(f=[];d&&d!==e;){k=d.alternate;if(null!==k&&k===e)break;f.push(d);d=Na(d);}for(d=0;d<b.length;d++)Qa(b[d],"bubbled",a);for(d=f.length;0<d--;)Qa(f[d],"captured",c);return [a,c]}};function fd(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var gd=Object.prototype.hasOwnProperty;
function hd(a,b){if(fd(a,b))return !0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return !1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return !1;for(d=0;d<c.length;d++)if(!gd.call(b,c[d])||!fd(a[c[d]],b[c[d]]))return !1;return !0}function kd(a){var b=a;if(a.alternate)for(;b.return;)b=b.return;else{if(0!==(b.effectTag&2))return 1;for(;b.return;)if(b=b.return,0!==(b.effectTag&2))return 1}return 3===b.tag?2:3}function ld(a){2!==kd(a)?t$1("188"):void 0;}
function md(a){var b=a.alternate;if(!b)return b=kd(a),3===b?t$1("188"):void 0,1===b?null:a;for(var c=a,d=b;;){var e=c.return,f=e?e.alternate:null;if(!e||!f)break;if(e.child===f.child){for(var g=e.child;g;){if(g===c)return ld(e),a;if(g===d)return ld(e),b;g=g.sibling;}t$1("188");}if(c.return!==d.return)c=e,d=f;else{g=!1;for(var h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling;}if(!g){for(h=f.child;h;){if(h===c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling;}g?
void 0:t$1("189");}}c.alternate!==d?t$1("190"):void 0;}3!==c.tag?t$1("188"):void 0;return c.stateNode.current===c?a:b}function nd(a){a=md(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child.return=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return;}b.sibling.return=b.return;b=b.sibling;}}return null}
var od=A$1.extend({animationName:null,elapsedTime:null,pseudoElement:null}),pd=A$1.extend({clipboardData:function(a){return "clipboardData"in a?a.clipboardData:window.clipboardData}}),qd=Uc.extend({relatedTarget:null});function rd(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}
var sd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},td={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",
116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ud=Uc.extend({key:function(a){if(a.key){var b=sd[a.key]||a.key;if("Unidentified"!==b)return b}return "keypress"===a.type?(a=rd(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?td[a.keyCode]||"Unidentified":""},location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:Xc,charCode:function(a){return "keypress"===
a.type?rd(a):0},keyCode:function(a){return "keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return "keypress"===a.type?rd(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),vd=bd.extend({dataTransfer:null}),wd=Uc.extend({touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:Xc}),xd=A$1.extend({propertyName:null,elapsedTime:null,pseudoElement:null}),yd=bd.extend({deltaX:function(a){return "deltaX"in a?a.deltaX:"wheelDeltaX"in
a?-a.wheelDeltaX:0},deltaY:function(a){return "deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:null,deltaMode:null}),zd=[["abort","abort"],[Za,"animationEnd"],[$a,"animationIteration"],[ab,"animationStart"],["canplay","canPlay"],["canplaythrough","canPlayThrough"],["drag","drag"],["dragenter","dragEnter"],["dragexit","dragExit"],["dragleave","dragLeave"],["dragover","dragOver"],["durationchange","durationChange"],["emptied","emptied"],["encrypted","encrypted"],
["ended","ended"],["error","error"],["gotpointercapture","gotPointerCapture"],["load","load"],["loadeddata","loadedData"],["loadedmetadata","loadedMetadata"],["loadstart","loadStart"],["lostpointercapture","lostPointerCapture"],["mousemove","mouseMove"],["mouseout","mouseOut"],["mouseover","mouseOver"],["playing","playing"],["pointermove","pointerMove"],["pointerout","pointerOut"],["pointerover","pointerOver"],["progress","progress"],["scroll","scroll"],["seeking","seeking"],["stalled","stalled"],
["suspend","suspend"],["timeupdate","timeUpdate"],["toggle","toggle"],["touchmove","touchMove"],[bb,"transitionEnd"],["waiting","waiting"],["wheel","wheel"]],Ad={},Bd={};function Cd(a,b){var c=a[0];a=a[1];var d="on"+(a[0].toUpperCase()+a.slice(1));b={phasedRegistrationNames:{bubbled:d,captured:d+"Capture"},dependencies:[c],isInteractive:b};Ad[a]=b;Bd[c]=b;}
[["blur","blur"],["cancel","cancel"],["click","click"],["close","close"],["contextmenu","contextMenu"],["copy","copy"],["cut","cut"],["auxclick","auxClick"],["dblclick","doubleClick"],["dragend","dragEnd"],["dragstart","dragStart"],["drop","drop"],["focus","focus"],["input","input"],["invalid","invalid"],["keydown","keyDown"],["keypress","keyPress"],["keyup","keyUp"],["mousedown","mouseDown"],["mouseup","mouseUp"],["paste","paste"],["pause","pause"],["play","play"],["pointercancel","pointerCancel"],
["pointerdown","pointerDown"],["pointerup","pointerUp"],["ratechange","rateChange"],["reset","reset"],["seeked","seeked"],["submit","submit"],["touchcancel","touchCancel"],["touchend","touchEnd"],["touchstart","touchStart"],["volumechange","volumeChange"]].forEach(function(a){Cd(a,!0);});zd.forEach(function(a){Cd(a,!1);});
var Dd={eventTypes:Ad,isInteractiveTopLevelEventType:function(a){a=Bd[a];return void 0!==a&&!0===a.isInteractive},extractEvents:function(a,b,c,d){var e=Bd[a];if(!e)return null;switch(a){case "keypress":if(0===rd(c))return null;case "keydown":case "keyup":a=ud;break;case "blur":case "focus":a=qd;break;case "click":if(2===c.button)return null;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":a=bd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":a=
vd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":a=wd;break;case Za:case $a:case ab:a=od;break;case bb:a=xd;break;case "scroll":a=Uc;break;case "wheel":a=yd;break;case "copy":case "cut":case "paste":a=pd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":a=cd;break;default:a=A$1;}b=a.getPooled(e,b,c,d);Sa(b);return b}},Ed=Dd.isInteractiveTopLevelEventType,
Fd=[];function Gd(a){var b=a.targetInst,c=b;do{if(!c){a.ancestors.push(c);break}var d;for(d=c;d.return;)d=d.return;d=3!==d.tag?null:d.stateNode.containerInfo;if(!d)break;a.ancestors.push(c);c=Ja(d);}while(c);for(c=0;c<a.ancestors.length;c++){b=a.ancestors[c];var e=Qb(a.nativeEvent);d=a.topLevelType;for(var f=a.nativeEvent,g=null,h=0;h<pa.length;h++){var l=pa[h];l&&(l=l.extractEvents(d,b,f,e))&&(g=za(g,l));}Fa(g);}}var Hd=!0;
function H$1(a,b){if(!b)return null;var c=(Ed(a)?Id:Jd).bind(null,a);b.addEventListener(a,c,!1);}function Kd(a,b){if(!b)return null;var c=(Ed(a)?Id:Jd).bind(null,a);b.addEventListener(a,c,!0);}function Id(a,b){Kb(Jd,a,b);}
function Jd(a,b){if(Hd){var c=Qb(b);c=Ja(c);null===c||"number"!==typeof c.tag||2===kd(c)||(c=null);if(Fd.length){var d=Fd.pop();d.topLevelType=a;d.nativeEvent=b;d.targetInst=c;a=d;}else a={topLevelType:a,nativeEvent:b,targetInst:c,ancestors:[]};try{Nb(Gd,a);}finally{a.topLevelType=null,a.nativeEvent=null,a.targetInst=null,a.ancestors.length=0,10>Fd.length&&Fd.push(a);}}}var Ld={},Md=0,Nd="_reactListenersID"+(""+Math.random()).slice(2);
function Od(a){Object.prototype.hasOwnProperty.call(a,Nd)||(a[Nd]=Md++,Ld[a[Nd]]={});return Ld[a[Nd]]}function Pd(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}function Qd(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
function Rd(a,b){var c=Qd(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return {node:c,offset:b-a};a=d;}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode;}c=void 0;}c=Qd(c);}}function Sd(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?Sd(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}
function Td(){for(var a=window,b=Pd();b instanceof a.HTMLIFrameElement;){try{a=b.contentDocument.defaultView;}catch(c){break}b=Pd(a.document);}return b}function Ud(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
var Vd=Ta&&"documentMode"in document&&11>=document.documentMode,Wd={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},dependencies:"blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(" ")}},Xd=null,Yd=null,Zd=null,$d=!1;
function ae(a,b){var c=b.window===b?b.document:9===b.nodeType?b:b.ownerDocument;if($d||null==Xd||Xd!==Pd(c))return null;c=Xd;"selectionStart"in c&&Ud(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset});return Zd&&hd(Zd,c)?null:(Zd=c,a=A$1.getPooled(Wd.select,Yd,a,b),a.type="select",a.target=Xd,Sa(a),a)}
var be={eventTypes:Wd,extractEvents:function(a,b,c,d){var e=d.window===d?d.document:9===d.nodeType?d:d.ownerDocument,f;if(!(f=!e)){a:{e=Od(e);f=ua.onSelect;for(var g=0;g<f.length;g++){var h=f[g];if(!e.hasOwnProperty(h)||!e[h]){e=!1;break a}}e=!0;}f=!e;}if(f)return null;e=b?La(b):window;switch(a){case "focus":if(Pb(e)||"true"===e.contentEditable)Xd=e,Yd=b,Zd=null;break;case "blur":Zd=Yd=Xd=null;break;case "mousedown":$d=!0;break;case "contextmenu":case "mouseup":case "dragend":return $d=!1,ae(c,d);case "selectionchange":if(Vd)break;
case "keydown":case "keyup":return ae(c,d)}return null}};Da.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));va=Ma;wa=Ka;xa=La;Da.injectEventPluginsByName({SimpleEventPlugin:Dd,EnterLeaveEventPlugin:ed,ChangeEventPlugin:Tc,SelectEventPlugin:be,BeforeInputEventPlugin:Cb});function ce(a){var b="";react.Children.forEach(a,function(a){null!=a&&(b+=a);});return b}
function de(a,b){a=objectAssign({children:void 0},b);if(b=ce(b.children))a.children=b;return a}function ee(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0);}else{c=""+yc(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e]);}null!==b&&(b.selected=!0);}}
function fe(a,b){null!=b.dangerouslySetInnerHTML?t$1("91"):void 0;return objectAssign({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function ge(a,b){var c=b.value;null==c&&(c=b.defaultValue,b=b.children,null!=b&&(null!=c?t$1("92"):void 0,Array.isArray(b)&&(1>=b.length?void 0:t$1("93"),b=b[0]),c=b),null==c&&(c=""));a._wrapperState={initialValue:yc(c)};}
function he(a,b){var c=yc(b.value),d=yc(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d);}function ie(a){var b=a.textContent;b===a._wrapperState.initialValue&&(a.value=b);}var je={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
function ke(a){switch(a){case "svg":return "http://www.w3.org/2000/svg";case "math":return "http://www.w3.org/1998/Math/MathML";default:return "http://www.w3.org/1999/xhtml"}}function le(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?ke(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
var me=void 0,ne=function(a){return "undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)});}:a}(function(a,b){if(a.namespaceURI!==je.svg||"innerHTML"in a)a.innerHTML=b;else{me=me||document.createElement("div");me.innerHTML="<svg>"+b+"</svg>";for(b=me.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild);}});
function oe(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b;}
var pe={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,
floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},qe=["Webkit","ms","Moz","O"];Object.keys(pe).forEach(function(a){qe.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);pe[b]=pe[a];});});function re(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||pe.hasOwnProperty(a)&&pe[a]?(""+b).trim():b+"px"}
function se(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=re(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e;}}var te=objectAssign({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
function ue(a,b){b&&(te[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML?t$1("137",a,""):void 0),null!=b.dangerouslySetInnerHTML&&(null!=b.children?t$1("60"):void 0,"object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML?void 0:t$1("61")),null!=b.style&&"object"!==typeof b.style?t$1("62",""):void 0);}
function ve(a,b){if(-1===a.indexOf("-"))return "string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return !1;default:return !0}}
function we(a,b){a=9===a.nodeType||11===a.nodeType?a:a.ownerDocument;var c=Od(a);b=ua[b];for(var d=0;d<b.length;d++){var e=b[d];if(!c.hasOwnProperty(e)||!c[e]){switch(e){case "scroll":Kd("scroll",a);break;case "focus":case "blur":Kd("focus",a);Kd("blur",a);c.blur=!0;c.focus=!0;break;case "cancel":case "close":Sb(e)&&Kd(e,a);break;case "invalid":case "submit":case "reset":break;default:-1===cb.indexOf(e)&&H$1(e,a);}c[e]=!0;}}}function xe(){}var ye=null,ze=null;
function Ae(a,b){switch(a){case "button":case "input":case "select":case "textarea":return !!b.autoFocus}return !1}function Be(a,b){return "textarea"===a||"option"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}
var Ce="function"===typeof setTimeout?setTimeout:void 0,De="function"===typeof clearTimeout?clearTimeout:void 0,Ee=scheduler.unstable_scheduleCallback,Fe=scheduler.unstable_cancelCallback;
function Ge(a,b,c,d,e){a[Ia]=e;"input"===c&&"radio"===e.type&&null!=e.name&&Bc(a,e);ve(c,d);d=ve(c,e);for(var f=0;f<b.length;f+=2){var g=b[f],h=b[f+1];"style"===g?se(a,h):"dangerouslySetInnerHTML"===g?ne(a,h):"children"===g?oe(a,h):xc(a,g,h,d);}switch(c){case "input":Cc(a,e);break;case "textarea":he(a,e);break;case "select":b=a._wrapperState.wasMultiple,a._wrapperState.wasMultiple=!!e.multiple,c=e.value,null!=c?ee(a,!!e.multiple,c,!1):b!==!!e.multiple&&(null!=e.defaultValue?ee(a,!!e.multiple,e.defaultValue,
!0):ee(a,!!e.multiple,e.multiple?[]:"",!1));}}function He(a){for(a=a.nextSibling;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a}function Ie(a){for(a=a.firstChild;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a}var Je=[],Ke=-1;function I$1(a){0>Ke||(a.current=Je[Ke],Je[Ke]=null,Ke--);}function J$1(a,b){Ke++;Je[Ke]=a.current;a.current=b;}var Le={},K$1={current:Le},L$1={current:!1},Me=Le;
function Oe(a,b){var c=a.type.contextTypes;if(!c)return Le;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function M$1(a){a=a.childContextTypes;return null!==a&&void 0!==a}function Pe(a){I$1(L$1,a);I$1(K$1,a);}function Qe(a){I$1(L$1,a);I$1(K$1,a);}
function Re(a,b,c){K$1.current!==Le?t$1("168"):void 0;J$1(K$1,b,a);J$1(L$1,c,a);}function Se(a,b,c){var d=a.stateNode;a=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)e in a?void 0:t$1("108",mc(b)||"Unknown",e);return objectAssign({},c,d)}function Te(a){var b=a.stateNode;b=b&&b.__reactInternalMemoizedMergedChildContext||Le;Me=K$1.current;J$1(K$1,b,a);J$1(L$1,L$1.current,a);return !0}
function Ue(a,b,c){var d=a.stateNode;d?void 0:t$1("169");c?(b=Se(a,b,Me),d.__reactInternalMemoizedMergedChildContext=b,I$1(L$1,a),I$1(K$1,a),J$1(K$1,b,a)):I$1(L$1,a);J$1(L$1,c,a);}var Ve=null,We=null;function Xe(a){return function(b){try{return a(b)}catch(c){}}}
function Ye(a){if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)return !1;var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber)return !0;try{var c=b.inject(a);Ve=Xe(function(a){return b.onCommitFiberRoot(c,a)});We=Xe(function(a){return b.onCommitFiberUnmount(c,a)});}catch(d){}return !0}
function Ze(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.contextDependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.effectTag=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.childExpirationTime=this.expirationTime=0;this.alternate=null;}function N$1(a,b,c,d){return new Ze(a,b,c,d)}
function $e(a){a=a.prototype;return !(!a||!a.isReactComponent)}function af(a){if("function"===typeof a)return $e(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===gc)return 11;if(a===ic)return 14}return 2}
function bf(a,b){var c=a.alternate;null===c?(c=N$1(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.effectTag=0,c.nextEffect=null,c.firstEffect=null,c.lastEffect=null);c.childExpirationTime=a.childExpirationTime;c.expirationTime=a.expirationTime;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;c.contextDependencies=a.contextDependencies;c.sibling=a.sibling;
c.index=a.index;c.ref=a.ref;return c}
function cf(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)$e(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case ac:return df(c.children,e,f,b);case fc:return ef(c,e|3,f,b);case bc:return ef(c,e|2,f,b);case cc:return a=N$1(12,c,b,e|4),a.elementType=cc,a.type=cc,a.expirationTime=f,a;case hc:return a=N$1(13,c,b,e),a.elementType=hc,a.type=hc,a.expirationTime=f,a;default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case dc:g=10;break a;case ec:g=9;break a;case gc:g=11;break a;case ic:g=
14;break a;case jc:g=16;d=null;break a}t$1("130",null==a?a:typeof a,"");}b=N$1(g,c,b,e);b.elementType=a;b.type=d;b.expirationTime=f;return b}function df(a,b,c,d){a=N$1(7,a,d,b);a.expirationTime=c;return a}function ef(a,b,c,d){a=N$1(8,a,d,b);b=0===(b&1)?bc:fc;a.elementType=b;a.type=b;a.expirationTime=c;return a}function ff(a,b,c){a=N$1(6,a,null,b);a.expirationTime=c;return a}
function gf(a,b,c){b=N$1(4,null!==a.children?a.children:[],a.key,b);b.expirationTime=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}function hf(a,b){a.didError=!1;var c=a.earliestPendingTime;0===c?a.earliestPendingTime=a.latestPendingTime=b:c<b?a.earliestPendingTime=b:a.latestPendingTime>b&&(a.latestPendingTime=b);jf(b,a);}
function kf(a,b){a.didError=!1;a.latestPingedTime>=b&&(a.latestPingedTime=0);var c=a.earliestPendingTime,d=a.latestPendingTime;c===b?a.earliestPendingTime=d===b?a.latestPendingTime=0:d:d===b&&(a.latestPendingTime=c);c=a.earliestSuspendedTime;d=a.latestSuspendedTime;0===c?a.earliestSuspendedTime=a.latestSuspendedTime=b:c<b?a.earliestSuspendedTime=b:d>b&&(a.latestSuspendedTime=b);jf(b,a);}function lf(a,b){var c=a.earliestPendingTime;a=a.earliestSuspendedTime;c>b&&(b=c);a>b&&(b=a);return b}
function jf(a,b){var c=b.earliestSuspendedTime,d=b.latestSuspendedTime,e=b.earliestPendingTime,f=b.latestPingedTime;e=0!==e?e:f;0===e&&(0===a||d<a)&&(e=d);a=e;0!==a&&c>a&&(a=c);b.nextExpirationTimeToWorkOn=e;b.expirationTime=a;}function P$1(a,b){if(a&&a.defaultProps){b=objectAssign({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);}return b}
function mf(a){var b=a._result;switch(a._status){case 1:return b;case 2:throw b;case 0:throw b;default:a._status=0;b=a._ctor;b=b();b.then(function(b){0===a._status&&(b=b.default,a._status=1,a._result=b);},function(b){0===a._status&&(a._status=2,a._result=b);});switch(a._status){case 1:return a._result;case 2:throw a._result;}a._result=b;throw b;}}var nf=(new react.Component).refs;
function of(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:objectAssign({},b,c);a.memoizedState=c;d=a.updateQueue;null!==d&&0===a.expirationTime&&(d.baseState=c);}
var xf={isMounted:function(a){return (a=a._reactInternalFiber)?2===kd(a):!1},enqueueSetState:function(a,b,c){a=a._reactInternalFiber;var d=pf();d=qf(d,a);var e=rf(d);e.payload=b;void 0!==c&&null!==c&&(e.callback=c);sf();tf(a,e);uf(a,d);},enqueueReplaceState:function(a,b,c){a=a._reactInternalFiber;var d=pf();d=qf(d,a);var e=rf(d);e.tag=vf;e.payload=b;void 0!==c&&null!==c&&(e.callback=c);sf();tf(a,e);uf(a,d);},enqueueForceUpdate:function(a,b){a=a._reactInternalFiber;var c=pf();c=qf(c,a);var d=rf(c);d.tag=
wf;void 0!==b&&null!==b&&(d.callback=b);sf();tf(a,d);uf(a,c);}};function yf(a,b,c,d,e,f,g){a=a.stateNode;return "function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!hd(c,d)||!hd(e,f):!0}
function zf(a,b,c){var d=!1,e=Le;var f=b.contextType;"object"===typeof f&&null!==f?f=Af(f):(e=M$1(b)?Me:K$1.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Oe(a,e):Le);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=xf;a.stateNode=b;b._reactInternalFiber=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
function Bf(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&xf.enqueueReplaceState(b,b.state,null);}
function Cf(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs=nf;var f=b.contextType;"object"===typeof f&&null!==f?e.context=Af(f):(f=M$1(b)?Me:K$1.current,e.context=Oe(a,f));f=a.updateQueue;null!==f&&(Df(a,f,c,e,d),e.state=a.memoizedState);f=b.getDerivedStateFromProps;"function"===typeof f&&(of(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==
typeof e.componentWillMount||(b=e.state,"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&xf.enqueueReplaceState(e,e.state,null),f=a.updateQueue,null!==f&&(Df(a,f,c,e,d),e.state=a.memoizedState));"function"===typeof e.componentDidMount&&(a.effectTag|=4);}var Ef=Array.isArray;
function Ff(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;var d=void 0;c&&(1!==c.tag?t$1("309"):void 0,d=c.stateNode);d?void 0:t$1("147",a);var e=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===e)return b.ref;b=function(a){var b=d.refs;b===nf&&(b=d.refs={});null===a?delete b[e]:b[e]=a;};b._stringRef=e;return b}"string"!==typeof a?t$1("284"):void 0;c._owner?void 0:t$1("290",a);}return a}
function Gf(a,b){"textarea"!==a.type&&t$1("31","[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b,"");}
function Hf(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.effectTag=8;}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b,c){a=bf(a,b,c);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.effectTag=
2,c):d;b.effectTag=2;return c}function g(b){a&&null===b.alternate&&(b.effectTag=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=ff(c,a.mode,d),b.return=a,b;b=e(b,c,d);b.return=a;return b}function l(a,b,c,d){if(null!==b&&b.elementType===c.type)return d=e(b,c.props,d),d.ref=Ff(a,b,c),d.return=a,d;d=cf(c.type,c.key,c.props,null,a.mode,d);d.ref=Ff(a,b,c);d.return=a;return d}function k(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==
c.implementation)return b=gf(c,a.mode,d),b.return=a,b;b=e(b,c.children||[],d);b.return=a;return b}function m(a,b,c,d,f){if(null===b||7!==b.tag)return b=df(c,a.mode,d,f),b.return=a,b;b=e(b,c,d);b.return=a;return b}function q(a,b,c){if("string"===typeof b||"number"===typeof b)return b=ff(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case Zb:return c=cf(b.type,b.key,b.props,null,a.mode,c),c.ref=Ff(a,null,b),c.return=a,c;case $b:return b=gf(b,a.mode,c),b.return=a,b}if(Ef(b)||
lc(b))return b=df(b,a.mode,c,null),b.return=a,b;Gf(a,b);}return null}function x(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case Zb:return c.key===e?c.type===ac?m(a,b,c.props.children,d,e):l(a,b,c,d):null;case $b:return c.key===e?k(a,b,c,d):null}if(Ef(c)||lc(c))return null!==e?null:m(a,b,c,d,null);Gf(a,c);}return null}function C(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=
a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case Zb:return a=a.get(null===d.key?c:d.key)||null,d.type===ac?m(b,a,d.props.children,e,d.key):l(b,a,d,e);case $b:return a=a.get(null===d.key?c:d.key)||null,k(b,a,d,e)}if(Ef(d)||lc(d))return a=a.get(c)||null,m(b,a,d,e,null);Gf(b,d);}return null}function w(e,g,h,k){for(var l=null,m=null,n=g,u=g=0,r=null;null!==n&&u<h.length;u++){n.index>u?(r=n,n=null):r=n.sibling;var v=x(e,n,h[u],k);if(null===v){null===n&&(n=r);break}a&&
n&&null===v.alternate&&b(e,n);g=f(v,g,u);null===m?l=v:m.sibling=v;m=v;n=r;}if(u===h.length)return c(e,n),l;if(null===n){for(;u<h.length;u++)if(n=q(e,h[u],k))g=f(n,g,u),null===m?l=n:m.sibling=n,m=n;return l}for(n=d(e,n);u<h.length;u++)if(r=C(n,e,u,h[u],k))a&&null!==r.alternate&&n.delete(null===r.key?u:r.key),g=f(r,g,u),null===m?l=r:m.sibling=r,m=r;a&&n.forEach(function(a){return b(e,a)});return l}function E(e,g,h,k){var l=lc(h);"function"!==typeof l?t$1("150"):void 0;h=l.call(h);null==h?t$1("151"):void 0;
for(var m=l=null,n=g,u=g=0,r=null,v=h.next();null!==n&&!v.done;u++,v=h.next()){n.index>u?(r=n,n=null):r=n.sibling;var z=x(e,n,v.value,k);if(null===z){n||(n=r);break}a&&n&&null===z.alternate&&b(e,n);g=f(z,g,u);null===m?l=z:m.sibling=z;m=z;n=r;}if(v.done)return c(e,n),l;if(null===n){for(;!v.done;u++,v=h.next())v=q(e,v.value,k),null!==v&&(g=f(v,g,u),null===m?l=v:m.sibling=v,m=v);return l}for(n=d(e,n);!v.done;u++,v=h.next())v=C(n,e,u,v.value,k),null!==v&&(a&&null!==v.alternate&&n.delete(null===v.key?u:
v.key),g=f(v,g,u),null===m?l=v:m.sibling=v,m=v);a&&n.forEach(function(a){return b(e,a)});return l}return function(a,d,f,h){var k="object"===typeof f&&null!==f&&f.type===ac&&null===f.key;k&&(f=f.props.children);var l="object"===typeof f&&null!==f;if(l)switch(f.$$typeof){case Zb:a:{l=f.key;for(k=d;null!==k;){if(k.key===l)if(7===k.tag?f.type===ac:k.elementType===f.type){c(a,k.sibling);d=e(k,f.type===ac?f.props.children:f.props,h);d.ref=Ff(a,k,f);d.return=a;a=d;break a}else{c(a,k);break}else b(a,k);k=
k.sibling;}f.type===ac?(d=df(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=cf(f.type,f.key,f.props,null,a.mode,h),h.ref=Ff(a,d,f),h.return=a,a=h);}return g(a);case $b:a:{for(k=f.key;null!==d;){if(d.key===k)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[],h);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling;}d=gf(f,a.mode,h);d.return=a;a=d;}return g(a)}if("string"===typeof f||"number"===typeof f)return f=
""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f,h),d.return=a,a=d):(c(a,d),d=ff(f,a.mode,h),d.return=a,a=d),g(a);if(Ef(f))return w(a,d,f,h);if(lc(f))return E(a,d,f,h);l&&Gf(a,f);if("undefined"===typeof f&&!k)switch(a.tag){case 1:case 0:h=a.type,t$1("152",h.displayName||h.name||"Component");}return c(a,d)}}var If=Hf(!0),Jf=Hf(!1),Kf={},Lf={current:Kf},Mf={current:Kf},Nf={current:Kf};function Of(a){a===Kf?t$1("174"):void 0;return a}
function Pf(a,b){J$1(Nf,b,a);J$1(Mf,a,a);J$1(Lf,Kf,a);var c=b.nodeType;switch(c){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:le(null,"");break;default:c=8===c?b.parentNode:b,b=c.namespaceURI||null,c=c.tagName,b=le(b,c);}I$1(Lf,a);J$1(Lf,b,a);}function Qf(a){I$1(Lf,a);I$1(Mf,a);I$1(Nf,a);}function Rf(a){Of(Nf.current);var b=Of(Lf.current);var c=le(b,a.type);b!==c&&(J$1(Mf,a,a),J$1(Lf,c,a));}function Sf(a){Mf.current===a&&(I$1(Lf,a),I$1(Mf,a));}
var Tf=0,Uf=2,Vf=4,Wf=8,Xf=16,Yf=32,Zf=64,$f=128,ag=Xb.ReactCurrentDispatcher,bg=0,cg=null,Q$1=null,dg=null,eg=null,R$1=null,fg=null,gg=0,hg=null,ig=0,jg=!1,kg=null,lg=0;function mg(){t$1("307");}function ng(a,b){if(null===b)return !1;for(var c=0;c<b.length&&c<a.length;c++)if(!fd(a[c],b[c]))return !1;return !0}
function og(a,b,c,d,e,f){bg=f;cg=b;dg=null!==a?a.memoizedState:null;ag.current=null===dg?pg:qg;b=c(d,e);if(jg){do jg=!1,lg+=1,dg=null!==a?a.memoizedState:null,fg=eg,hg=R$1=Q$1=null,ag.current=qg,b=c(d,e);while(jg);kg=null;lg=0;}ag.current=rg;a=cg;a.memoizedState=eg;a.expirationTime=gg;a.updateQueue=hg;a.effectTag|=ig;a=null!==Q$1&&null!==Q$1.next;bg=0;fg=R$1=eg=dg=Q$1=cg=null;gg=0;hg=null;ig=0;a?t$1("300"):void 0;return b}
function sg(){ag.current=rg;bg=0;fg=R$1=eg=dg=Q$1=cg=null;gg=0;hg=null;ig=0;jg=!1;kg=null;lg=0;}function tg(){var a={memoizedState:null,baseState:null,queue:null,baseUpdate:null,next:null};null===R$1?eg=R$1=a:R$1=R$1.next=a;return R$1}function ug(){if(null!==fg)R$1=fg,fg=R$1.next,Q$1=dg,dg=null!==Q$1?Q$1.next:null;else{null===dg?t$1("310"):void 0;Q$1=dg;var a={memoizedState:Q$1.memoizedState,baseState:Q$1.baseState,queue:Q$1.queue,baseUpdate:Q$1.baseUpdate,next:null};R$1=null===R$1?eg=a:R$1.next=a;dg=Q$1.next;}return R$1}
function vg(a,b){return "function"===typeof b?b(a):b}
function wg(a){var b=ug(),c=b.queue;null===c?t$1("311"):void 0;if(0<lg){var d=c.dispatch;if(null!==kg){var e=kg.get(c);if(void 0!==e){kg.delete(c);var f=b.memoizedState;do f=a(f,e.action),e=e.next;while(null!==e);fd(f,b.memoizedState)||(xg=!0);b.memoizedState=f;b.baseUpdate===c.last&&(b.baseState=f);return [f,d]}}return [b.memoizedState,d]}d=c.last;var g=b.baseUpdate;f=b.baseState;null!==g?(null!==d&&(d.next=null),d=g.next):d=null!==d?d.next:null;if(null!==d){var h=e=null,l=d,k=!1;do{var m=l.expirationTime;
m<bg?(k||(k=!0,h=g,e=f),m>gg&&(gg=m)):f=l.eagerReducer===a?l.eagerState:a(f,l.action);g=l;l=l.next;}while(null!==l&&l!==d);k||(h=g,e=f);fd(f,b.memoizedState)||(xg=!0);b.memoizedState=f;b.baseUpdate=h;b.baseState=e;c.eagerReducer=a;c.eagerState=f;}return [b.memoizedState,c.dispatch]}
function yg(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};null===hg?(hg={lastEffect:null},hg.lastEffect=a.next=a):(b=hg.lastEffect,null===b?hg.lastEffect=a.next=a:(c=b.next,b.next=a,a.next=c,hg.lastEffect=a));return a}function zg(a,b,c,d){var e=tg();ig|=a;e.memoizedState=yg(b,c,void 0,void 0===d?null:d);}
function Bg(a,b,c,d){var e=ug();d=void 0===d?null:d;var f=void 0;if(null!==Q$1){var g=Q$1.memoizedState;f=g.destroy;if(null!==d&&ng(d,g.deps)){yg(Tf,c,f,d);return}}ig|=a;e.memoizedState=yg(b,c,f,d);}function Cg(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null);};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null;}}function Dg(){}
function Eg(a,b,c){25>lg?void 0:t$1("301");var d=a.alternate;if(a===cg||null!==d&&d===cg)if(jg=!0,a={expirationTime:bg,action:c,eagerReducer:null,eagerState:null,next:null},null===kg&&(kg=new Map),c=kg.get(b),void 0===c)kg.set(b,a);else{for(b=c;null!==b.next;)b=b.next;b.next=a;}else{sf();var e=pf();e=qf(e,a);var f={expirationTime:e,action:c,eagerReducer:null,eagerState:null,next:null},g=b.last;if(null===g)f.next=f;else{var h=g.next;null!==h&&(f.next=h);g.next=f;}b.last=f;if(0===a.expirationTime&&(null===
d||0===d.expirationTime)&&(d=b.eagerReducer,null!==d))try{var l=b.eagerState,k=d(l,c);f.eagerReducer=d;f.eagerState=k;if(fd(k,l))return}catch(m){}finally{}uf(a,e);}}
var rg={readContext:Af,useCallback:mg,useContext:mg,useEffect:mg,useImperativeHandle:mg,useLayoutEffect:mg,useMemo:mg,useReducer:mg,useRef:mg,useState:mg,useDebugValue:mg},pg={readContext:Af,useCallback:function(a,b){tg().memoizedState=[a,void 0===b?null:b];return a},useContext:Af,useEffect:function(a,b){return zg(516,$f|Zf,a,b)},useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):[a];return zg(4,Vf|Yf,Cg.bind(null,b,a),c)},useLayoutEffect:function(a,b){return zg(4,Vf|Yf,a,b)},
useMemo:function(a,b){var c=tg();b=void 0===b?null:b;a=a();c.memoizedState=[a,b];return a},useReducer:function(a,b,c){var d=tg();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a=d.queue={last:null,dispatch:null,eagerReducer:a,eagerState:b};a=a.dispatch=Eg.bind(null,cg,a);return [d.memoizedState,a]},useRef:function(a){var b=tg();a={current:a};return b.memoizedState=a},useState:function(a){var b=tg();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a=b.queue={last:null,dispatch:null,eagerReducer:vg,
eagerState:a};a=a.dispatch=Eg.bind(null,cg,a);return [b.memoizedState,a]},useDebugValue:Dg},qg={readContext:Af,useCallback:function(a,b){var c=ug();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&ng(b,d[1]))return d[0];c.memoizedState=[a,b];return a},useContext:Af,useEffect:function(a,b){return Bg(516,$f|Zf,a,b)},useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):[a];return Bg(4,Vf|Yf,Cg.bind(null,b,a),c)},useLayoutEffect:function(a,b){return Bg(4,Vf|Yf,a,b)},
useMemo:function(a,b){var c=ug();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&ng(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a},useReducer:wg,useRef:function(){return ug().memoizedState},useState:function(a){return wg(vg,a)},useDebugValue:Dg},Fg=null,Gg=null,Hg=!1;
function Ig(a,b){var c=N$1(5,null,null,0);c.elementType="DELETED";c.type="DELETED";c.stateNode=b;c.return=a;c.effectTag=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c;}function Jg(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,!0):!1;default:return !1}}
function Kg(a){if(Hg){var b=Gg;if(b){var c=b;if(!Jg(a,b)){b=He(c);if(!b||!Jg(a,b)){a.effectTag|=2;Hg=!1;Fg=a;return}Ig(Fg,c);}Fg=a;Gg=Ie(b);}else a.effectTag|=2,Hg=!1,Fg=a;}}function Lg(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag;)a=a.return;Fg=a;}function Mg(a){if(a!==Fg)return !1;if(!Hg)return Lg(a),Hg=!0,!1;var b=a.type;if(5!==a.tag||"head"!==b&&"body"!==b&&!Be(b,a.memoizedProps))for(b=Gg;b;)Ig(a,b),b=He(b);Lg(a);Gg=Fg?He(a.stateNode):null;return !0}function Ng(){Gg=Fg=null;Hg=!1;}
var Og=Xb.ReactCurrentOwner,xg=!1;function S$1(a,b,c,d){b.child=null===a?Jf(b,null,c,d):If(b,a.child,c,d);}function Pg(a,b,c,d,e){c=c.render;var f=b.ref;Qg(b,e);d=og(a,b,c,d,f,e);if(null!==a&&!xg)return b.updateQueue=a.updateQueue,b.effectTag&=-517,a.expirationTime<=e&&(a.expirationTime=0),Rg(a,b,e);b.effectTag|=1;S$1(a,b,d,e);return b.child}
function Sg(a,b,c,d,e,f){if(null===a){var g=c.type;if("function"===typeof g&&!$e(g)&&void 0===g.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=g,Tg(a,b,g,d,e,f);a=cf(c.type,null,d,null,b.mode,f);a.ref=b.ref;a.return=b;return b.child=a}g=a.child;if(e<f&&(e=g.memoizedProps,c=c.compare,c=null!==c?c:hd,c(e,d)&&a.ref===b.ref))return Rg(a,b,f);b.effectTag|=1;a=bf(g,d,f);a.ref=b.ref;a.return=b;return b.child=a}
function Tg(a,b,c,d,e,f){return null!==a&&hd(a.memoizedProps,d)&&a.ref===b.ref&&(xg=!1,e<f)?Rg(a,b,f):Ug(a,b,c,d,f)}function Vg(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.effectTag|=128;}function Ug(a,b,c,d,e){var f=M$1(c)?Me:K$1.current;f=Oe(b,f);Qg(b,e);c=og(a,b,c,d,f,e);if(null!==a&&!xg)return b.updateQueue=a.updateQueue,b.effectTag&=-517,a.expirationTime<=e&&(a.expirationTime=0),Rg(a,b,e);b.effectTag|=1;S$1(a,b,c,e);return b.child}
function Wg(a,b,c,d,e){if(M$1(c)){var f=!0;Te(b);}else f=!1;Qg(b,e);if(null===b.stateNode)null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2),zf(b,c,d,e),Cf(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var l=g.context,k=c.contextType;"object"===typeof k&&null!==k?k=Af(k):(k=M$1(c)?Me:K$1.current,k=Oe(b,k));var m=c.getDerivedStateFromProps,q="function"===typeof m||"function"===typeof g.getSnapshotBeforeUpdate;q||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&
"function"!==typeof g.componentWillReceiveProps||(h!==d||l!==k)&&Bf(b,g,d,k);Xg=!1;var x=b.memoizedState;l=g.state=x;var C=b.updateQueue;null!==C&&(Df(b,C,d,g,e),l=b.memoizedState);h!==d||x!==l||L$1.current||Xg?("function"===typeof m&&(of(b,c,m,d),l=b.memoizedState),(h=Xg||yf(b,c,h,d,x,l,k))?(q||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&
g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&(b.effectTag|=4)):("function"===typeof g.componentDidMount&&(b.effectTag|=4),b.memoizedProps=d,b.memoizedState=l),g.props=d,g.state=l,g.context=k,d=h):("function"===typeof g.componentDidMount&&(b.effectTag|=4),d=!1);}else g=b.stateNode,h=b.memoizedProps,g.props=b.type===b.elementType?h:P$1(b.type,h),l=g.context,k=c.contextType,"object"===typeof k&&null!==k?k=Af(k):(k=M$1(c)?Me:K$1.current,k=Oe(b,k)),m=c.getDerivedStateFromProps,(q="function"===
typeof m||"function"===typeof g.getSnapshotBeforeUpdate)||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==d||l!==k)&&Bf(b,g,d,k),Xg=!1,l=b.memoizedState,x=g.state=l,C=b.updateQueue,null!==C&&(Df(b,C,d,g,e),x=b.memoizedState),h!==d||l!==x||L$1.current||Xg?("function"===typeof m&&(of(b,c,m,d),x=b.memoizedState),(m=Xg||yf(b,c,h,d,l,x,k))?(q||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===
typeof g.componentWillUpdate&&g.componentWillUpdate(d,x,k),"function"===typeof g.UNSAFE_componentWillUpdate&&g.UNSAFE_componentWillUpdate(d,x,k)),"function"===typeof g.componentDidUpdate&&(b.effectTag|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.effectTag|=256)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&l===a.memoizedState||(b.effectTag|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&l===a.memoizedState||(b.effectTag|=256),b.memoizedProps=d,b.memoizedState=
x),g.props=d,g.state=x,g.context=k,d=m):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&l===a.memoizedState||(b.effectTag|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&l===a.memoizedState||(b.effectTag|=256),d=!1);return Yg(a,b,c,d,f,e)}
function Yg(a,b,c,d,e,f){Vg(a,b);var g=0!==(b.effectTag&64);if(!d&&!g)return e&&Ue(b,c,!1),Rg(a,b,f);d=b.stateNode;Og.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.effectTag|=1;null!==a&&g?(b.child=If(b,a.child,null,f),b.child=If(b,null,h,f)):S$1(a,b,h,f);b.memoizedState=d.state;e&&Ue(b,c,!0);return b.child}function Zg(a){var b=a.stateNode;b.pendingContext?Re(a,b.pendingContext,b.pendingContext!==b.context):b.context&&Re(a,b.context,!1);Pf(a,b.containerInfo);}
function $g(a,b,c){var d=b.mode,e=b.pendingProps,f=b.memoizedState;if(0===(b.effectTag&64)){f=null;var g=!1;}else f={timedOutAt:null!==f?f.timedOutAt:0},g=!0,b.effectTag&=-65;if(null===a)if(g){var h=e.fallback;a=df(null,d,0,null);0===(b.mode&1)&&(a.child=null!==b.memoizedState?b.child.child:b.child);d=df(h,d,c,null);a.sibling=d;c=a;c.return=d.return=b;}else c=d=Jf(b,null,e.children,c);else null!==a.memoizedState?(d=a.child,h=d.sibling,g?(c=e.fallback,e=bf(d,d.pendingProps,0),0===(b.mode&1)&&(g=null!==
b.memoizedState?b.child.child:b.child,g!==d.child&&(e.child=g)),d=e.sibling=bf(h,c,h.expirationTime),c=e,e.childExpirationTime=0,c.return=d.return=b):c=d=If(b,d.child,e.children,c)):(h=a.child,g?(g=e.fallback,e=df(null,d,0,null),e.child=h,0===(b.mode&1)&&(e.child=null!==b.memoizedState?b.child.child:b.child),d=e.sibling=df(g,d,c,null),d.effectTag|=2,c=e,e.childExpirationTime=0,c.return=d.return=b):d=c=If(b,h,e.children,c)),b.stateNode=a.stateNode;b.memoizedState=f;b.child=c;return d}
function Rg(a,b,c){null!==a&&(b.contextDependencies=a.contextDependencies);if(b.childExpirationTime<c)return null;null!==a&&b.child!==a.child?t$1("153"):void 0;if(null!==b.child){a=b.child;c=bf(a,a.pendingProps,a.expirationTime);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=bf(a,a.pendingProps,a.expirationTime),c.return=b;c.sibling=null;}return b.child}
function ah(a,b,c){var d=b.expirationTime;if(null!==a)if(a.memoizedProps!==b.pendingProps||L$1.current)xg=!0;else{if(d<c){xg=!1;switch(b.tag){case 3:Zg(b);Ng();break;case 5:Rf(b);break;case 1:M$1(b.type)&&Te(b);break;case 4:Pf(b,b.stateNode.containerInfo);break;case 10:bh(b,b.memoizedProps.value);break;case 13:if(null!==b.memoizedState){d=b.child.childExpirationTime;if(0!==d&&d>=c)return $g(a,b,c);b=Rg(a,b,c);return null!==b?b.sibling:null}}return Rg(a,b,c)}}else xg=!1;b.expirationTime=0;switch(b.tag){case 2:d=
b.elementType;null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2);a=b.pendingProps;var e=Oe(b,K$1.current);Qg(b,c);e=og(null,b,d,a,e,c);b.effectTag|=1;if("object"===typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof){b.tag=1;sg();if(M$1(d)){var f=!0;Te(b);}else f=!1;b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null;var g=d.getDerivedStateFromProps;"function"===typeof g&&of(b,d,g,a);e.updater=xf;b.stateNode=e;e._reactInternalFiber=b;Cf(b,d,a,c);b=Yg(null,b,d,!0,f,
c);}else b.tag=0,S$1(null,b,e,c),b=b.child;return b;case 16:e=b.elementType;null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2);f=b.pendingProps;a=mf(e);b.type=a;e=b.tag=af(a);f=P$1(a,f);g=void 0;switch(e){case 0:g=Ug(null,b,a,f,c);break;case 1:g=Wg(null,b,a,f,c);break;case 11:g=Pg(null,b,a,f,c);break;case 14:g=Sg(null,b,a,P$1(a.type,f),d,c);break;default:t$1("306",a,"");}return g;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:P$1(d,e),Ug(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,
e=b.elementType===d?e:P$1(d,e),Wg(a,b,d,e,c);case 3:Zg(b);d=b.updateQueue;null===d?t$1("282"):void 0;e=b.memoizedState;e=null!==e?e.element:null;Df(b,d,b.pendingProps,null,c);d=b.memoizedState.element;if(d===e)Ng(),b=Rg(a,b,c);else{e=b.stateNode;if(e=(null===a||null===a.child)&&e.hydrate)Gg=Ie(b.stateNode.containerInfo),Fg=b,e=Hg=!0;e?(b.effectTag|=2,b.child=Jf(b,null,d,c)):(S$1(a,b,d,c),Ng());b=b.child;}return b;case 5:return Rf(b),null===a&&Kg(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,
g=e.children,Be(d,e)?g=null:null!==f&&Be(d,f)&&(b.effectTag|=16),Vg(a,b),1!==c&&b.mode&1&&e.hidden?(b.expirationTime=b.childExpirationTime=1,b=null):(S$1(a,b,g,c),b=b.child),b;case 6:return null===a&&Kg(b),null;case 13:return $g(a,b,c);case 4:return Pf(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=If(b,null,d,c):S$1(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:P$1(d,e),Pg(a,b,d,e,c);case 7:return S$1(a,b,b.pendingProps,c),b.child;case 8:return S$1(a,b,b.pendingProps.children,
c),b.child;case 12:return S$1(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;g=b.memoizedProps;f=e.value;bh(b,f);if(null!==g){var h=g.value;f=fd(h,f)?0:("function"===typeof d._calculateChangedBits?d._calculateChangedBits(h,f):1073741823)|0;if(0===f){if(g.children===e.children&&!L$1.current){b=Rg(a,b,c);break a}}else for(h=b.child,null!==h&&(h.return=b);null!==h;){var l=h.contextDependencies;if(null!==l){g=h.child;for(var k=l.first;null!==k;){if(k.context===d&&0!==
(k.observedBits&f)){1===h.tag&&(k=rf(c),k.tag=wf,tf(h,k));h.expirationTime<c&&(h.expirationTime=c);k=h.alternate;null!==k&&k.expirationTime<c&&(k.expirationTime=c);for(var m=h.return;null!==m;){k=m.alternate;if(m.childExpirationTime<c)m.childExpirationTime=c,null!==k&&k.childExpirationTime<c&&(k.childExpirationTime=c);else if(null!==k&&k.childExpirationTime<c)k.childExpirationTime=c;else break;m=m.return;}l.expirationTime<c&&(l.expirationTime=c);break}k=k.next;}}else g=10===h.tag?h.type===b.type?null:
h.child:h.child;if(null!==g)g.return=h;else for(g=h;null!==g;){if(g===b){g=null;break}h=g.sibling;if(null!==h){h.return=g.return;g=h;break}g=g.return;}h=g;}}S$1(a,b,e.children,c);b=b.child;}return b;case 9:return e=b.type,f=b.pendingProps,d=f.children,Qg(b,c),e=Af(e,f.unstable_observedBits),d=d(e),b.effectTag|=1,S$1(a,b,d,c),b.child;case 14:return e=b.type,f=P$1(e,b.pendingProps),f=P$1(e.type,f),Sg(a,b,e,f,d,c);case 15:return Tg(a,b,b.type,b.pendingProps,d,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===
d?e:P$1(d,e),null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2),b.tag=1,M$1(d)?(a=!0,Te(b)):a=!1,Qg(b,c),zf(b,d,e,c),Cf(b,d,e,c),Yg(null,b,d,!0,a,c);default:t$1("156");}}var ch={current:null},dh=null,eh=null,fh=null;function bh(a,b){var c=a.type._context;J$1(ch,c._currentValue,a);c._currentValue=b;}function gh(a){var b=ch.current;I$1(ch,a);a.type._context._currentValue=b;}function Qg(a,b){dh=a;fh=eh=null;var c=a.contextDependencies;null!==c&&c.expirationTime>=b&&(xg=!0);a.contextDependencies=null;}
function Af(a,b){if(fh!==a&&!1!==b&&0!==b){if("number"!==typeof b||1073741823===b)fh=a,b=1073741823;b={context:a,observedBits:b,next:null};null===eh?(null===dh?t$1("308"):void 0,eh=b,dh.contextDependencies={first:b,expirationTime:0}):eh=eh.next=b;}return a._currentValue}var hh=0,vf=1,wf=2,ih=3,Xg=!1;function jh(a){return {baseState:a,firstUpdate:null,lastUpdate:null,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}
function kh(a){return {baseState:a.baseState,firstUpdate:a.firstUpdate,lastUpdate:a.lastUpdate,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}function rf(a){return {expirationTime:a,tag:hh,payload:null,callback:null,next:null,nextEffect:null}}function lh(a,b){null===a.lastUpdate?a.firstUpdate=a.lastUpdate=b:(a.lastUpdate.next=b,a.lastUpdate=b);}
function tf(a,b){var c=a.alternate;if(null===c){var d=a.updateQueue;var e=null;null===d&&(d=a.updateQueue=jh(a.memoizedState));}else d=a.updateQueue,e=c.updateQueue,null===d?null===e?(d=a.updateQueue=jh(a.memoizedState),e=c.updateQueue=jh(c.memoizedState)):d=a.updateQueue=kh(e):null===e&&(e=c.updateQueue=kh(d));null===e||d===e?lh(d,b):null===d.lastUpdate||null===e.lastUpdate?(lh(d,b),lh(e,b)):(lh(d,b),e.lastUpdate=b);}
function mh(a,b){var c=a.updateQueue;c=null===c?a.updateQueue=jh(a.memoizedState):nh(a,c);null===c.lastCapturedUpdate?c.firstCapturedUpdate=c.lastCapturedUpdate=b:(c.lastCapturedUpdate.next=b,c.lastCapturedUpdate=b);}function nh(a,b){var c=a.alternate;null!==c&&b===c.updateQueue&&(b=a.updateQueue=kh(b));return b}
function oh(a,b,c,d,e,f){switch(c.tag){case vf:return a=c.payload,"function"===typeof a?a.call(f,d,e):a;case ih:a.effectTag=a.effectTag&-2049|64;case hh:a=c.payload;e="function"===typeof a?a.call(f,d,e):a;if(null===e||void 0===e)break;return objectAssign({},d,e);case wf:Xg=!0;}return d}
function Df(a,b,c,d,e){Xg=!1;b=nh(a,b);for(var f=b.baseState,g=null,h=0,l=b.firstUpdate,k=f;null!==l;){var m=l.expirationTime;m<e?(null===g&&(g=l,f=k),h<m&&(h=m)):(k=oh(a,b,l,k,c,d),null!==l.callback&&(a.effectTag|=32,l.nextEffect=null,null===b.lastEffect?b.firstEffect=b.lastEffect=l:(b.lastEffect.nextEffect=l,b.lastEffect=l)));l=l.next;}m=null;for(l=b.firstCapturedUpdate;null!==l;){var q=l.expirationTime;q<e?(null===m&&(m=l,null===g&&(f=k)),h<q&&(h=q)):(k=oh(a,b,l,k,c,d),null!==l.callback&&(a.effectTag|=
32,l.nextEffect=null,null===b.lastCapturedEffect?b.firstCapturedEffect=b.lastCapturedEffect=l:(b.lastCapturedEffect.nextEffect=l,b.lastCapturedEffect=l)));l=l.next;}null===g&&(b.lastUpdate=null);null===m?b.lastCapturedUpdate=null:a.effectTag|=32;null===g&&null===m&&(f=k);b.baseState=f;b.firstUpdate=g;b.firstCapturedUpdate=m;a.expirationTime=h;a.memoizedState=k;}
function ph(a,b,c){null!==b.firstCapturedUpdate&&(null!==b.lastUpdate&&(b.lastUpdate.next=b.firstCapturedUpdate,b.lastUpdate=b.lastCapturedUpdate),b.firstCapturedUpdate=b.lastCapturedUpdate=null);qh(b.firstEffect,c);b.firstEffect=b.lastEffect=null;qh(b.firstCapturedEffect,c);b.firstCapturedEffect=b.lastCapturedEffect=null;}function qh(a,b){for(;null!==a;){var c=a.callback;if(null!==c){a.callback=null;var d=b;"function"!==typeof c?t$1("191",c):void 0;c.call(d);}a=a.nextEffect;}}
function rh(a,b){return {value:a,source:b,stack:nc(b)}}function sh(a){a.effectTag|=4;}var wh=void 0,xh=void 0,yh=void 0,zh=void 0;wh=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return;}c.sibling.return=c.return;c=c.sibling;}};xh=function(){};
yh=function(a,b,c,d,e){var f=a.memoizedProps;if(f!==d){var g=b.stateNode;Of(Lf.current);a=null;switch(c){case "input":f=zc(g,f);d=zc(g,d);a=[];break;case "option":f=de(g,f);d=de(g,d);a=[];break;case "select":f=objectAssign({},f,{value:void 0});d=objectAssign({},d,{value:void 0});a=[];break;case "textarea":f=fe(g,f);d=fe(g,d);a=[];break;default:"function"!==typeof f.onClick&&"function"===typeof d.onClick&&(g.onclick=xe);}ue(c,d);g=c=void 0;var h=null;for(c in f)if(!d.hasOwnProperty(c)&&f.hasOwnProperty(c)&&null!=f[c])if("style"===
c){var l=f[c];for(g in l)l.hasOwnProperty(g)&&(h||(h={}),h[g]="");}else"dangerouslySetInnerHTML"!==c&&"children"!==c&&"suppressContentEditableWarning"!==c&&"suppressHydrationWarning"!==c&&"autoFocus"!==c&&(ta.hasOwnProperty(c)?a||(a=[]):(a=a||[]).push(c,null));for(c in d){var k=d[c];l=null!=f?f[c]:void 0;if(d.hasOwnProperty(c)&&k!==l&&(null!=k||null!=l))if("style"===c)if(l){for(g in l)!l.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(h||(h={}),h[g]="");for(g in k)k.hasOwnProperty(g)&&l[g]!==k[g]&&(h||
(h={}),h[g]=k[g]);}else h||(a||(a=[]),a.push(c,h)),h=k;else"dangerouslySetInnerHTML"===c?(k=k?k.__html:void 0,l=l?l.__html:void 0,null!=k&&l!==k&&(a=a||[]).push(c,""+k)):"children"===c?l===k||"string"!==typeof k&&"number"!==typeof k||(a=a||[]).push(c,""+k):"suppressContentEditableWarning"!==c&&"suppressHydrationWarning"!==c&&(ta.hasOwnProperty(c)?(null!=k&&we(e,c),a||l===k||(a=[])):(a=a||[]).push(c,k));}h&&(a=a||[]).push("style",h);e=a;(b.updateQueue=e)&&sh(b);}};zh=function(a,b,c,d){c!==d&&sh(b);};
var Ah="function"===typeof WeakSet?WeakSet:Set;function Bh(a,b){var c=b.source,d=b.stack;null===d&&null!==c&&(d=nc(c));null!==c&&mc(c.type);b=b.value;null!==a&&1===a.tag&&mc(a.type);try{console.error(b);}catch(e){setTimeout(function(){throw e;});}}function Ch(a){var b=a.ref;if(null!==b)if("function"===typeof b)try{b(null);}catch(c){Dh(a,c);}else b.current=null;}
function Eh(a,b,c){c=c.updateQueue;c=null!==c?c.lastEffect:null;if(null!==c){var d=c=c.next;do{if((d.tag&a)!==Tf){var e=d.destroy;d.destroy=void 0;void 0!==e&&e();}(d.tag&b)!==Tf&&(e=d.create,d.destroy=e());d=d.next;}while(d!==c)}}
function Fh(a,b){for(var c=a;;){if(5===c.tag){var d=c.stateNode;if(b)d.style.display="none";else{d=c.stateNode;var e=c.memoizedProps.style;e=void 0!==e&&null!==e&&e.hasOwnProperty("display")?e.display:null;d.style.display=re("display",e);}}else if(6===c.tag)c.stateNode.nodeValue=b?"":c.memoizedProps;else if(13===c.tag&&null!==c.memoizedState){d=c.child.sibling;d.return=c;c=d;continue}else if(null!==c.child){c.child.return=c;c=c.child;continue}if(c===a)break;for(;null===c.sibling;){if(null===c.return||
c.return===a)return;c=c.return;}c.sibling.return=c.return;c=c.sibling;}}
function Gh(a){"function"===typeof We&&We(a);switch(a.tag){case 0:case 11:case 14:case 15:var b=a.updateQueue;if(null!==b&&(b=b.lastEffect,null!==b)){var c=b=b.next;do{var d=c.destroy;if(void 0!==d){var e=a;try{d();}catch(f){Dh(e,f);}}c=c.next;}while(c!==b)}break;case 1:Ch(a);b=a.stateNode;if("function"===typeof b.componentWillUnmount)try{b.props=a.memoizedProps,b.state=a.memoizedState,b.componentWillUnmount();}catch(f){Dh(a,f);}break;case 5:Ch(a);break;case 4:Hh(a);}}
function Ih(a){return 5===a.tag||3===a.tag||4===a.tag}
function Jh(a){a:{for(var b=a.return;null!==b;){if(Ih(b)){var c=b;break a}b=b.return;}t$1("160");c=void 0;}var d=b=void 0;switch(c.tag){case 5:b=c.stateNode;d=!1;break;case 3:b=c.stateNode.containerInfo;d=!0;break;case 4:b=c.stateNode.containerInfo;d=!0;break;default:t$1("161");}c.effectTag&16&&(oe(b,""),c.effectTag&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c.return||Ih(c.return)){c=null;break a}c=c.return;}c.sibling.return=c.return;for(c=c.sibling;5!==c.tag&&6!==c.tag;){if(c.effectTag&2)continue b;
if(null===c.child||4===c.tag)continue b;else c.child.return=c,c=c.child;}if(!(c.effectTag&2)){c=c.stateNode;break a}}for(var e=a;;){if(5===e.tag||6===e.tag)if(c)if(d){var f=b,g=e.stateNode,h=c;8===f.nodeType?f.parentNode.insertBefore(g,h):f.insertBefore(g,h);}else b.insertBefore(e.stateNode,c);else d?(g=b,h=e.stateNode,8===g.nodeType?(f=g.parentNode,f.insertBefore(h,g)):(f=g,f.appendChild(h)),g=g._reactRootContainer,null!==g&&void 0!==g||null!==f.onclick||(f.onclick=xe)):b.appendChild(e.stateNode);
else if(4!==e.tag&&null!==e.child){e.child.return=e;e=e.child;continue}if(e===a)break;for(;null===e.sibling;){if(null===e.return||e.return===a)return;e=e.return;}e.sibling.return=e.return;e=e.sibling;}}
function Hh(a){for(var b=a,c=!1,d=void 0,e=void 0;;){if(!c){c=b.return;a:for(;;){null===c?t$1("160"):void 0;switch(c.tag){case 5:d=c.stateNode;e=!1;break a;case 3:d=c.stateNode.containerInfo;e=!0;break a;case 4:d=c.stateNode.containerInfo;e=!0;break a}c=c.return;}c=!0;}if(5===b.tag||6===b.tag){a:for(var f=b,g=f;;)if(Gh(g),null!==g.child&&4!==g.tag)g.child.return=g,g=g.child;else{if(g===f)break;for(;null===g.sibling;){if(null===g.return||g.return===f)break a;g=g.return;}g.sibling.return=g.return;g=g.sibling;}e?
(f=d,g=b.stateNode,8===f.nodeType?f.parentNode.removeChild(g):f.removeChild(g)):d.removeChild(b.stateNode);}else if(4===b.tag?(d=b.stateNode.containerInfo,e=!0):Gh(b),null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return;b=b.return;4===b.tag&&(c=!1);}b.sibling.return=b.return;b=b.sibling;}}
function Kh(a,b){switch(b.tag){case 0:case 11:case 14:case 15:Eh(Vf,Wf,b);break;case 1:break;case 5:var c=b.stateNode;if(null!=c){var d=b.memoizedProps;a=null!==a?a.memoizedProps:d;var e=b.type,f=b.updateQueue;b.updateQueue=null;null!==f&&Ge(c,f,e,a,d,b);}break;case 6:null===b.stateNode?t$1("162"):void 0;b.stateNode.nodeValue=b.memoizedProps;break;case 3:break;case 12:break;case 13:c=b.memoizedState;d=void 0;a=b;null===c?d=!1:(d=!0,a=b.child,0===c.timedOutAt&&(c.timedOutAt=pf()));null!==a&&Fh(a,d);c=
b.updateQueue;if(null!==c){b.updateQueue=null;var g=b.stateNode;null===g&&(g=b.stateNode=new Ah);c.forEach(function(a){var c=Lh.bind(null,b,a);g.has(a)||(g.add(a),a.then(c,c));});}break;case 17:break;default:t$1("163");}}var Mh="function"===typeof WeakMap?WeakMap:Map;function Nh(a,b,c){c=rf(c);c.tag=ih;c.payload={element:null};var d=b.value;c.callback=function(){Oh(d);Bh(a,b);};return c}
function Ph(a,b,c){c=rf(c);c.tag=ih;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){return d(e)};}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){"function"!==typeof d&&(null===Qh?Qh=new Set([this]):Qh.add(this));var c=b.value,e=b.stack;Bh(a,b);this.componentDidCatch(c,{componentStack:null!==e?e:""});});return c}
function Rh(a){switch(a.tag){case 1:M$1(a.type)&&Pe(a);var b=a.effectTag;return b&2048?(a.effectTag=b&-2049|64,a):null;case 3:return Qf(a),Qe(a),b=a.effectTag,0!==(b&64)?t$1("285"):void 0,a.effectTag=b&-2049|64,a;case 5:return Sf(a),null;case 13:return b=a.effectTag,b&2048?(a.effectTag=b&-2049|64,a):null;case 4:return Qf(a),null;case 10:return gh(a),null;default:return null}}
var Sh=Xb.ReactCurrentDispatcher,Th=Xb.ReactCurrentOwner,Uh=1073741822,Vh=0,Wh=!1,T$1=null,Xh=null,U$1=0,Yh=-1,Zh=!1,V$1=null,$h=!1,ai=null,bi=null,ci=null,Qh=null;function di(){if(null!==T$1)for(var a=T$1.return;null!==a;){var b=a;switch(b.tag){case 1:var c=b.type.childContextTypes;null!==c&&void 0!==c&&Pe(b);break;case 3:Qf(b);Qe(b);break;case 5:Sf(b);break;case 4:Qf(b);break;case 10:gh(b);}a=a.return;}Xh=null;U$1=0;Yh=-1;Zh=!1;T$1=null;}
function ei(a,b){ci=bi=ai=null;var c=W$1;W$1=!0;do{if(b.effectTag&512){var d=!1,e=void 0;try{var f=b;Eh($f,Tf,f);Eh(Tf,Zf,f);}catch(g){d=!0,e=g;}d&&Dh(b,e);}b=b.nextEffect;}while(null!==b);W$1=c;c=a.expirationTime;0!==c&&fi(a,c);}function sf(){null!==bi&&Fe(bi);null!==ci&&ci();}
function gi(a){for(;;){var b=a.alternate,c=a.return,d=a.sibling;if(0===(a.effectTag&1024)){T$1=a;a:{var e=b;b=a;var f=U$1;var g=b.pendingProps;switch(b.tag){case 2:break;case 16:break;case 15:case 0:break;case 1:M$1(b.type)&&Pe(b);break;case 3:Qf(b);Qe(b);g=b.stateNode;g.pendingContext&&(g.context=g.pendingContext,g.pendingContext=null);if(null===e||null===e.child)Mg(b),b.effectTag&=-3;xh(b);break;case 5:Sf(b);var h=Of(Nf.current);f=b.type;if(null!==e&&null!=b.stateNode)yh(e,b,f,g,h),e.ref!==b.ref&&(b.effectTag|=
128);else if(g){var l=Of(Lf.current);if(Mg(b)){g=b;e=g.stateNode;var k=g.type,m=g.memoizedProps,q=h;e[Ha]=g;e[Ia]=m;f=void 0;h=k;switch(h){case "iframe":case "object":H$1("load",e);break;case "video":case "audio":for(k=0;k<cb.length;k++)H$1(cb[k],e);break;case "source":H$1("error",e);break;case "img":case "image":case "link":H$1("error",e);H$1("load",e);break;case "form":H$1("reset",e);H$1("submit",e);break;case "details":H$1("toggle",e);break;case "input":Ac(e,m);H$1("invalid",e);we(q,"onChange");break;case "select":e._wrapperState=
{wasMultiple:!!m.multiple};H$1("invalid",e);we(q,"onChange");break;case "textarea":ge(e,m),H$1("invalid",e),we(q,"onChange");}ue(h,m);k=null;for(f in m)m.hasOwnProperty(f)&&(l=m[f],"children"===f?"string"===typeof l?e.textContent!==l&&(k=["children",l]):"number"===typeof l&&e.textContent!==""+l&&(k=["children",""+l]):ta.hasOwnProperty(f)&&null!=l&&we(q,f));switch(h){case "input":Vb(e);Ec(e,m,!0);break;case "textarea":Vb(e);ie(e,m);break;case "select":case "option":break;default:"function"===typeof m.onClick&&
(e.onclick=xe);}f=k;g.updateQueue=f;g=null!==f?!0:!1;g&&sh(b);}else{m=b;e=f;q=g;k=9===h.nodeType?h:h.ownerDocument;l===je.html&&(l=ke(e));l===je.html?"script"===e?(e=k.createElement("div"),e.innerHTML="<script>\x3c/script>",k=e.removeChild(e.firstChild)):"string"===typeof q.is?k=k.createElement(e,{is:q.is}):(k=k.createElement(e),"select"===e&&q.multiple&&(k.multiple=!0)):k=k.createElementNS(l,e);e=k;e[Ha]=m;e[Ia]=g;wh(e,b,!1,!1);q=e;k=f;m=g;var x=h,C=ve(k,m);switch(k){case "iframe":case "object":H$1("load",
q);h=m;break;case "video":case "audio":for(h=0;h<cb.length;h++)H$1(cb[h],q);h=m;break;case "source":H$1("error",q);h=m;break;case "img":case "image":case "link":H$1("error",q);H$1("load",q);h=m;break;case "form":H$1("reset",q);H$1("submit",q);h=m;break;case "details":H$1("toggle",q);h=m;break;case "input":Ac(q,m);h=zc(q,m);H$1("invalid",q);we(x,"onChange");break;case "option":h=de(q,m);break;case "select":q._wrapperState={wasMultiple:!!m.multiple};h=objectAssign({},m,{value:void 0});H$1("invalid",q);we(x,"onChange");break;case "textarea":ge(q,
m);h=fe(q,m);H$1("invalid",q);we(x,"onChange");break;default:h=m;}ue(k,h);l=void 0;var w=k,E=q,v=h;for(l in v)if(v.hasOwnProperty(l)){var n=v[l];"style"===l?se(E,n):"dangerouslySetInnerHTML"===l?(n=n?n.__html:void 0,null!=n&&ne(E,n)):"children"===l?"string"===typeof n?("textarea"!==w||""!==n)&&oe(E,n):"number"===typeof n&&oe(E,""+n):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&(ta.hasOwnProperty(l)?null!=n&&we(x,l):null!=n&&xc(E,l,n,C));}switch(k){case "input":Vb(q);
Ec(q,m,!1);break;case "textarea":Vb(q);ie(q,m);break;case "option":null!=m.value&&q.setAttribute("value",""+yc(m.value));break;case "select":h=q;h.multiple=!!m.multiple;q=m.value;null!=q?ee(h,!!m.multiple,q,!1):null!=m.defaultValue&&ee(h,!!m.multiple,m.defaultValue,!0);break;default:"function"===typeof h.onClick&&(q.onclick=xe);}(g=Ae(f,g))&&sh(b);b.stateNode=e;}null!==b.ref&&(b.effectTag|=128);}else null===b.stateNode?t$1("166"):void 0;break;case 6:e&&null!=b.stateNode?zh(e,b,e.memoizedProps,g):("string"!==
typeof g&&(null===b.stateNode?t$1("166"):void 0),e=Of(Nf.current),Of(Lf.current),Mg(b)?(g=b,f=g.stateNode,e=g.memoizedProps,f[Ha]=g,(g=f.nodeValue!==e)&&sh(b)):(f=b,g=(9===e.nodeType?e:e.ownerDocument).createTextNode(g),g[Ha]=b,f.stateNode=g));break;case 11:break;case 13:g=b.memoizedState;if(0!==(b.effectTag&64)){b.expirationTime=f;T$1=b;break a}g=null!==g;f=null!==e&&null!==e.memoizedState;null!==e&&!g&&f&&(e=e.child.sibling,null!==e&&(h=b.firstEffect,null!==h?(b.firstEffect=e,e.nextEffect=h):(b.firstEffect=
b.lastEffect=e,e.nextEffect=null),e.effectTag=8));if(g||f)b.effectTag|=4;break;case 7:break;case 8:break;case 12:break;case 4:Qf(b);xh(b);break;case 10:gh(b);break;case 9:break;case 14:break;case 17:M$1(b.type)&&Pe(b);break;default:t$1("156");}T$1=null;}b=a;if(1===U$1||1!==b.childExpirationTime){g=0;for(f=b.child;null!==f;)e=f.expirationTime,h=f.childExpirationTime,e>g&&(g=e),h>g&&(g=h),f=f.sibling;b.childExpirationTime=g;}if(null!==T$1)return T$1;null!==c&&0===(c.effectTag&1024)&&(null===c.firstEffect&&(c.firstEffect=
a.firstEffect),null!==a.lastEffect&&(null!==c.lastEffect&&(c.lastEffect.nextEffect=a.firstEffect),c.lastEffect=a.lastEffect),1<a.effectTag&&(null!==c.lastEffect?c.lastEffect.nextEffect=a:c.firstEffect=a,c.lastEffect=a));}else{a=Rh(a,U$1);if(null!==a)return a.effectTag&=1023,a;null!==c&&(c.firstEffect=c.lastEffect=null,c.effectTag|=1024);}if(null!==d)return d;if(null!==c)a=c;else break}return null}
function hi(a){var b=ah(a.alternate,a,U$1);a.memoizedProps=a.pendingProps;null===b&&(b=gi(a));Th.current=null;return b}
function ii(a,b){Wh?t$1("243"):void 0;sf();Wh=!0;var c=Sh.current;Sh.current=rg;var d=a.nextExpirationTimeToWorkOn;if(d!==U$1||a!==Xh||null===T$1)di(),Xh=a,U$1=d,T$1=bf(Xh.current,null,U$1),a.pendingCommitExpirationTime=0;var e=!1;do{try{if(b)for(;null!==T$1&&!ji();)T$1=hi(T$1);else for(;null!==T$1;)T$1=hi(T$1);}catch(E){if(fh=eh=dh=null,sg(),null===T$1)e=!0,Oh(E);else{null===T$1?t$1("271"):void 0;var f=T$1,g=f.return;if(null===g)e=!0,Oh(E);else{a:{var h=a,l=g,k=f,m=E;g=U$1;k.effectTag|=1024;k.firstEffect=k.lastEffect=null;if(null!==
m&&"object"===typeof m&&"function"===typeof m.then){var q=m;m=l;var x=-1,C=-1;do{if(13===m.tag){var w=m.alternate;if(null!==w&&(w=w.memoizedState,null!==w)){C=10*(1073741822-w.timedOutAt);break}w=m.pendingProps.maxDuration;if("number"===typeof w)if(0>=w)x=0;else if(-1===x||w<x)x=w;}m=m.return;}while(null!==m);m=l;do{if(w=13===m.tag)w=void 0===m.memoizedProps.fallback?!1:null===m.memoizedState;if(w){l=m.updateQueue;null===l?(l=new Set,l.add(q),m.updateQueue=l):l.add(q);if(0===(m.mode&1)){m.effectTag|=
64;k.effectTag&=-1957;1===k.tag&&(null===k.alternate?k.tag=17:(g=rf(1073741823),g.tag=wf,tf(k,g)));k.expirationTime=1073741823;break a}k=h.pingCache;null===k?(k=h.pingCache=new Mh,l=new Set,k.set(q,l)):(l=k.get(q),void 0===l&&(l=new Set,k.set(q,l)));l.has(g)||(l.add(g),k=ki.bind(null,h,q,g),q.then(k,k));-1===x?h=1073741823:(-1===C&&(C=10*(1073741822-lf(h,g))-5E3),h=C+x);0<=h&&Yh<h&&(Yh=h);m.effectTag|=2048;m.expirationTime=g;break a}m=m.return;}while(null!==m);m=Error((mc(k.type)||"A React component")+
" suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display."+nc(k));}Zh=!0;m=rh(m,k);h=l;do{switch(h.tag){case 3:h.effectTag|=2048;h.expirationTime=g;g=Nh(h,m,g);mh(h,g);break a;case 1:if(q=m,x=h.type,C=h.stateNode,0===(h.effectTag&64)&&("function"===typeof x.getDerivedStateFromError||null!==C&&"function"===typeof C.componentDidCatch&&(null===Qh||!Qh.has(C)))){h.effectTag|=2048;
h.expirationTime=g;g=Ph(h,q,g);mh(h,g);break a}}h=h.return;}while(null!==h)}T$1=gi(f);continue}}}break}while(1);Wh=!1;Sh.current=c;fh=eh=dh=null;sg();if(e)Xh=null,a.finishedWork=null;else if(null!==T$1)a.finishedWork=null;else{c=a.current.alternate;null===c?t$1("281"):void 0;Xh=null;if(Zh){e=a.latestPendingTime;f=a.latestSuspendedTime;g=a.latestPingedTime;if(0!==e&&e<d||0!==f&&f<d||0!==g&&g<d){kf(a,d);li(a,c,d,a.expirationTime,-1);return}if(!a.didError&&b){a.didError=!0;d=a.nextExpirationTimeToWorkOn=d;
b=a.expirationTime=1073741823;li(a,c,d,b,-1);return}}b&&-1!==Yh?(kf(a,d),b=10*(1073741822-lf(a,d)),b<Yh&&(Yh=b),b=10*(1073741822-pf()),b=Yh-b,li(a,c,d,a.expirationTime,0>b?0:b)):(a.pendingCommitExpirationTime=d,a.finishedWork=c);}}
function Dh(a,b){for(var c=a.return;null!==c;){switch(c.tag){case 1:var d=c.stateNode;if("function"===typeof c.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===Qh||!Qh.has(d))){a=rh(b,a);a=Ph(c,a,1073741823);tf(c,a);uf(c,1073741823);return}break;case 3:a=rh(b,a);a=Nh(c,a,1073741823);tf(c,a);uf(c,1073741823);return}c=c.return;}3===a.tag&&(c=rh(b,a),c=Nh(a,c,1073741823),tf(a,c),uf(a,1073741823));}
function qf(a,b){0!==Vh?a=Vh:Wh?a=$h?1073741823:U$1:b.mode&1?(a=mi?1073741822-10*(((1073741822-a+15)/10|0)+1):1073741822-25*(((1073741822-a+500)/25|0)+1),null!==Xh&&a===U$1&&--a):a=1073741823;mi&&(0===ni||a<ni)&&(ni=a);return a}
function ki(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);if(null!==Xh&&U$1===c)Xh=null;else if(b=a.earliestSuspendedTime,d=a.latestSuspendedTime,0!==b&&c<=b&&c>=d){a.didError=!1;b=a.latestPingedTime;if(0===b||b>c)a.latestPingedTime=c;jf(c,a);c=a.expirationTime;0!==c&&fi(a,c);}}function Lh(a,b){var c=a.stateNode;null!==c&&c.delete(b);b=pf();b=qf(b,a);a=oi(a,b);null!==a&&(hf(a,b),b=a.expirationTime,0!==b&&fi(a,b));}
function oi(a,b){a.expirationTime<b&&(a.expirationTime=b);var c=a.alternate;null!==c&&c.expirationTime<b&&(c.expirationTime=b);var d=a.return,e=null;if(null===d&&3===a.tag)e=a.stateNode;else for(;null!==d;){c=d.alternate;d.childExpirationTime<b&&(d.childExpirationTime=b);null!==c&&c.childExpirationTime<b&&(c.childExpirationTime=b);if(null===d.return&&3===d.tag){e=d.stateNode;break}d=d.return;}return e}
function uf(a,b){a=oi(a,b);null!==a&&(!Wh&&0!==U$1&&b>U$1&&di(),hf(a,b),Wh&&!$h&&Xh===a||fi(a,a.expirationTime),pi>qi&&(pi=0,t$1("185")));}function ri(a,b,c,d,e){var f=Vh;Vh=1073741823;try{return a(b,c,d,e)}finally{Vh=f;}}var si=null,X$1=null,ti=0,ui=void 0,W$1=!1,vi=null,Y$1=0,ni=0,wi=!1,xi=null,Z$1=!1,yi=!1,mi=!1,zi=null,Ai=scheduler.unstable_now(),Bi=1073741822-(Ai/10|0),Ci=Bi,qi=50,pi=0,Di=null;function Ei(){Bi=1073741822-((scheduler.unstable_now()-Ai)/10|0);}
function Fi(a,b){if(0!==ti){if(b<ti)return;null!==ui&&scheduler.unstable_cancelCallback(ui);}ti=b;a=scheduler.unstable_now()-Ai;ui=scheduler.unstable_scheduleCallback(Gi,{timeout:10*(1073741822-b)-a});}function li(a,b,c,d,e){a.expirationTime=d;0!==e||ji()?0<e&&(a.timeoutHandle=Ce(Hi.bind(null,a,b,c),e)):(a.pendingCommitExpirationTime=c,a.finishedWork=b);}function Hi(a,b,c){a.pendingCommitExpirationTime=c;a.finishedWork=b;Ei();Ci=Bi;Ii(a,c);}function pf(){if(W$1)return Ci;Ji();if(0===Y$1||1===Y$1)Ei(),Ci=Bi;return Ci}
function fi(a,b){null===a.nextScheduledRoot?(a.expirationTime=b,null===X$1?(si=X$1=a,a.nextScheduledRoot=a):(X$1=X$1.nextScheduledRoot=a,X$1.nextScheduledRoot=si)):b>a.expirationTime&&(a.expirationTime=b);W$1||(Z$1?yi&&(vi=a,Y$1=1073741823,Ki(a,1073741823,!1)):1073741823===b?Li(1073741823,!1):Fi(a,b));}
function Ji(){var a=0,b=null;if(null!==X$1)for(var c=X$1,d=si;null!==d;){var e=d.expirationTime;if(0===e){null===c||null===X$1?t$1("244"):void 0;if(d===d.nextScheduledRoot){si=X$1=d.nextScheduledRoot=null;break}else if(d===si)si=e=d.nextScheduledRoot,X$1.nextScheduledRoot=e,d.nextScheduledRoot=null;else if(d===X$1){X$1=c;X$1.nextScheduledRoot=si;d.nextScheduledRoot=null;break}else c.nextScheduledRoot=d.nextScheduledRoot,d.nextScheduledRoot=null;d=c.nextScheduledRoot;}else{e>a&&(a=e,b=d);if(d===X$1)break;if(1073741823===
a)break;c=d;d=d.nextScheduledRoot;}}vi=b;Y$1=a;}var Mi=!1;function ji(){return Mi?!0:scheduler.unstable_shouldYield()?Mi=!0:!1}function Gi(){try{if(!ji()&&null!==si){Ei();var a=si;do{var b=a.expirationTime;0!==b&&Bi<=b&&(a.nextExpirationTimeToWorkOn=Bi);a=a.nextScheduledRoot;}while(a!==si)}Li(0,!0);}finally{Mi=!1;}}
function Li(a,b){Ji();if(b)for(Ei(),Ci=Bi;null!==vi&&0!==Y$1&&a<=Y$1&&!(Mi&&Bi>Y$1);)Ki(vi,Y$1,Bi>Y$1),Ji(),Ei(),Ci=Bi;else for(;null!==vi&&0!==Y$1&&a<=Y$1;)Ki(vi,Y$1,!1),Ji();b&&(ti=0,ui=null);0!==Y$1&&Fi(vi,Y$1);pi=0;Di=null;if(null!==zi)for(a=zi,zi=null,b=0;b<a.length;b++){var c=a[b];try{c._onComplete();}catch(d){wi||(wi=!0,xi=d);}}if(wi)throw a=xi,xi=null,wi=!1,a;}function Ii(a,b){W$1?t$1("253"):void 0;vi=a;Y$1=b;Ki(a,b,!1);Li(1073741823,!1);}
function Ki(a,b,c){W$1?t$1("245"):void 0;W$1=!0;if(c){var d=a.finishedWork;null!==d?Oi(a,d,b):(a.finishedWork=null,d=a.timeoutHandle,-1!==d&&(a.timeoutHandle=-1,De(d)),ii(a,c),d=a.finishedWork,null!==d&&(ji()?a.finishedWork=d:Oi(a,d,b)));}else d=a.finishedWork,null!==d?Oi(a,d,b):(a.finishedWork=null,d=a.timeoutHandle,-1!==d&&(a.timeoutHandle=-1,De(d)),ii(a,c),d=a.finishedWork,null!==d&&Oi(a,d,b));W$1=!1;}
function Oi(a,b,c){var d=a.firstBatch;if(null!==d&&d._expirationTime>=c&&(null===zi?zi=[d]:zi.push(d),d._defer)){a.finishedWork=b;a.expirationTime=0;return}a.finishedWork=null;a===Di?pi++:(Di=a,pi=0);$h=Wh=!0;a.current===b?t$1("177"):void 0;c=a.pendingCommitExpirationTime;0===c?t$1("261"):void 0;a.pendingCommitExpirationTime=0;d=b.expirationTime;var e=b.childExpirationTime;d=e>d?e:d;a.didError=!1;0===d?(a.earliestPendingTime=0,a.latestPendingTime=0,a.earliestSuspendedTime=0,a.latestSuspendedTime=0,a.latestPingedTime=
0):(d<a.latestPingedTime&&(a.latestPingedTime=0),e=a.latestPendingTime,0!==e&&(e>d?a.earliestPendingTime=a.latestPendingTime=0:a.earliestPendingTime>d&&(a.earliestPendingTime=a.latestPendingTime)),e=a.earliestSuspendedTime,0===e?hf(a,d):d<a.latestSuspendedTime?(a.earliestSuspendedTime=0,a.latestSuspendedTime=0,a.latestPingedTime=0,hf(a,d)):d>e&&hf(a,d));jf(0,a);Th.current=null;1<b.effectTag?null!==b.lastEffect?(b.lastEffect.nextEffect=b,d=b.firstEffect):d=b:d=b.firstEffect;ye=Hd;e=Td();if(Ud(e)){if("selectionStart"in
e)var f={start:e.selectionStart,end:e.selectionEnd};else a:{f=(f=e.ownerDocument)&&f.defaultView||window;var g=f.getSelection&&f.getSelection();if(g&&0!==g.rangeCount){f=g.anchorNode;var h=g.anchorOffset,l=g.focusNode;g=g.focusOffset;try{f.nodeType,l.nodeType;}catch(vb){f=null;break a}var k=0,m=-1,q=-1,x=0,C=0,w=e,E=null;b:for(;;){for(var v;;){w!==f||0!==h&&3!==w.nodeType||(m=k+h);w!==l||0!==g&&3!==w.nodeType||(q=k+g);3===w.nodeType&&(k+=w.nodeValue.length);if(null===(v=w.firstChild))break;E=w;w=v;}for(;;){if(w===
e)break b;E===f&&++x===h&&(m=k);E===l&&++C===g&&(q=k);if(null!==(v=w.nextSibling))break;w=E;E=w.parentNode;}w=v;}f=-1===m||-1===q?null:{start:m,end:q};}else f=null;}f=f||{start:0,end:0};}else f=null;ze={focusedElem:e,selectionRange:f};Hd=!1;for(V$1=d;null!==V$1;){e=!1;f=void 0;try{for(;null!==V$1;){if(V$1.effectTag&256)a:{var n=V$1.alternate;h=V$1;switch(h.tag){case 0:case 11:case 15:Eh(Uf,Tf,h);break a;case 1:if(h.effectTag&256&&null!==n){var u=n.memoizedProps,z=n.memoizedState,Ag=h.stateNode,Ni=Ag.getSnapshotBeforeUpdate(h.elementType===
h.type?u:P$1(h.type,u),z);Ag.__reactInternalSnapshotBeforeUpdate=Ni;}break a;case 3:case 5:case 6:case 4:case 17:break a;default:t$1("163");}}V$1=V$1.nextEffect;}}catch(vb){e=!0,f=vb;}e&&(null===V$1?t$1("178"):void 0,Dh(V$1,f),null!==V$1&&(V$1=V$1.nextEffect));}for(V$1=d;null!==V$1;){n=!1;u=void 0;try{for(;null!==V$1;){var y=V$1.effectTag;y&16&&oe(V$1.stateNode,"");if(y&128){var B=V$1.alternate;if(null!==B){var r=B.ref;null!==r&&("function"===typeof r?r(null):r.current=null);}}switch(y&14){case 2:Jh(V$1);V$1.effectTag&=-3;break;case 6:Jh(V$1);
V$1.effectTag&=-3;Kh(V$1.alternate,V$1);break;case 4:Kh(V$1.alternate,V$1);break;case 8:z=V$1;Hh(z);z.return=null;z.child=null;z.memoizedState=null;z.updateQueue=null;var O=z.alternate;null!==O&&(O.return=null,O.child=null,O.memoizedState=null,O.updateQueue=null);}V$1=V$1.nextEffect;}}catch(vb){n=!0,u=vb;}n&&(null===V$1?t$1("178"):void 0,Dh(V$1,u),null!==V$1&&(V$1=V$1.nextEffect));}r=ze;B=Td();y=r.focusedElem;n=r.selectionRange;if(B!==y&&y&&y.ownerDocument&&Sd(y.ownerDocument.documentElement,y)){null!==n&&Ud(y)&&(B=n.start,r=n.end,
void 0===r&&(r=B),"selectionStart"in y?(y.selectionStart=B,y.selectionEnd=Math.min(r,y.value.length)):(r=(B=y.ownerDocument||document)&&B.defaultView||window,r.getSelection&&(r=r.getSelection(),u=y.textContent.length,O=Math.min(n.start,u),n=void 0===n.end?O:Math.min(n.end,u),!r.extend&&O>n&&(u=n,n=O,O=u),u=Rd(y,O),z=Rd(y,n),u&&z&&(1!==r.rangeCount||r.anchorNode!==u.node||r.anchorOffset!==u.offset||r.focusNode!==z.node||r.focusOffset!==z.offset)&&(B=B.createRange(),B.setStart(u.node,u.offset),r.removeAllRanges(),
O>n?(r.addRange(B),r.extend(z.node,z.offset)):(B.setEnd(z.node,z.offset),r.addRange(B))))));B=[];for(r=y;r=r.parentNode;)1===r.nodeType&&B.push({element:r,left:r.scrollLeft,top:r.scrollTop});"function"===typeof y.focus&&y.focus();for(y=0;y<B.length;y++)r=B[y],r.element.scrollLeft=r.left,r.element.scrollTop=r.top;}ze=null;Hd=!!ye;ye=null;a.current=b;for(V$1=d;null!==V$1;){y=!1;B=void 0;try{for(r=a,O=c;null!==V$1;){var qa=V$1.effectTag;if(qa&36){var Rb=V$1.alternate;n=V$1;u=O;switch(n.tag){case 0:case 11:case 15:Eh(Xf,
Yf,n);break;case 1:var id=n.stateNode;if(n.effectTag&4)if(null===Rb)id.componentDidMount();else{var dj=n.elementType===n.type?Rb.memoizedProps:P$1(n.type,Rb.memoizedProps);id.componentDidUpdate(dj,Rb.memoizedState,id.__reactInternalSnapshotBeforeUpdate);}var th=n.updateQueue;null!==th&&ph(n,th,id,u);break;case 3:var uh=n.updateQueue;if(null!==uh){z=null;if(null!==n.child)switch(n.child.tag){case 5:z=n.child.stateNode;break;case 1:z=n.child.stateNode;}ph(n,uh,z,u);}break;case 5:var ej=n.stateNode;null===
Rb&&n.effectTag&4&&Ae(n.type,n.memoizedProps)&&ej.focus();break;case 6:break;case 4:break;case 12:break;case 13:break;case 17:break;default:t$1("163");}}if(qa&128){var jd=V$1.ref;if(null!==jd){var vh=V$1.stateNode;switch(V$1.tag){case 5:var Ne=vh;break;default:Ne=vh;}"function"===typeof jd?jd(Ne):jd.current=Ne;}}qa&512&&(ai=r);V$1=V$1.nextEffect;}}catch(vb){y=!0,B=vb;}y&&(null===V$1?t$1("178"):void 0,Dh(V$1,B),null!==V$1&&(V$1=V$1.nextEffect));}null!==d&&null!==ai&&(qa=ei.bind(null,a,d),bi=Ee(qa),ci=qa);Wh=$h=!1;"function"===
typeof Ve&&Ve(b.stateNode);qa=b.expirationTime;b=b.childExpirationTime;b=b>qa?b:qa;0===b&&(Qh=null);a.expirationTime=b;a.finishedWork=null;}function Oh(a){null===vi?t$1("246"):void 0;vi.expirationTime=0;wi||(wi=!0,xi=a);}function Pi(a,b){var c=Z$1;Z$1=!0;try{return a(b)}finally{(Z$1=c)||W$1||Li(1073741823,!1);}}function Qi(a,b){if(Z$1&&!yi){yi=!0;try{return a(b)}finally{yi=!1;}}return a(b)}
function Ri(a,b,c){if(mi)return a(b,c);Z$1||W$1||0===ni||(Li(ni,!1),ni=0);var d=mi,e=Z$1;Z$1=mi=!0;try{return a(b,c)}finally{mi=d,(Z$1=e)||W$1||Li(1073741823,!1);}}
function Si(a,b,c,d,e){var f=b.current;a:if(c){c=c._reactInternalFiber;b:{2===kd(c)&&1===c.tag?void 0:t$1("170");var g=c;do{switch(g.tag){case 3:g=g.stateNode.context;break b;case 1:if(M$1(g.type)){g=g.stateNode.__reactInternalMemoizedMergedChildContext;break b}}g=g.return;}while(null!==g);t$1("171");g=void 0;}if(1===c.tag){var h=c.type;if(M$1(h)){c=Se(c,h,g);break a}}c=g;}else c=Le;null===b.context?b.context=c:b.pendingContext=c;b=e;e=rf(d);e.payload={element:a};b=void 0===b?null:b;null!==b&&(e.callback=b);
sf();tf(f,e);uf(f,d);return d}function Ti(a,b,c,d){var e=b.current,f=pf();e=qf(f,e);return Si(a,b,c,e,d)}function Ui(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function Vi(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return {$$typeof:$b,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}
Db=function(a,b,c){switch(b){case "input":Cc(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Ma(d);e?void 0:t$1("90");Wb(d);Cc(d,e);}}}break;case "textarea":he(a,c);break;case "select":b=c.value,null!=b&&ee(a,!!c.multiple,b,!1);}};
function Wi(a){var b=1073741822-25*(((1073741822-pf()+500)/25|0)+1);b>=Uh&&(b=Uh-1);this._expirationTime=Uh=b;this._root=a;this._callbacks=this._next=null;this._hasChildren=this._didComplete=!1;this._children=null;this._defer=!0;}Wi.prototype.render=function(a){this._defer?void 0:t$1("250");this._hasChildren=!0;this._children=a;var b=this._root._internalRoot,c=this._expirationTime,d=new Xi;Si(a,b,null,c,d._onCommit);return d};
Wi.prototype.then=function(a){if(this._didComplete)a();else{var b=this._callbacks;null===b&&(b=this._callbacks=[]);b.push(a);}};
Wi.prototype.commit=function(){var a=this._root._internalRoot,b=a.firstBatch;this._defer&&null!==b?void 0:t$1("251");if(this._hasChildren){var c=this._expirationTime;if(b!==this){this._hasChildren&&(c=this._expirationTime=b._expirationTime,this.render(this._children));for(var d=null,e=b;e!==this;)d=e,e=e._next;null===d?t$1("251"):void 0;d._next=e._next;this._next=b;a.firstBatch=this;}this._defer=!1;Ii(a,c);b=this._next;this._next=null;b=a.firstBatch=b;null!==b&&b._hasChildren&&b.render(b._children);}else this._next=
null,this._defer=!1;};Wi.prototype._onComplete=function(){if(!this._didComplete){this._didComplete=!0;var a=this._callbacks;if(null!==a)for(var b=0;b<a.length;b++)(0, a[b])();}};function Xi(){this._callbacks=null;this._didCommit=!1;this._onCommit=this._onCommit.bind(this);}Xi.prototype.then=function(a){if(this._didCommit)a();else{var b=this._callbacks;null===b&&(b=this._callbacks=[]);b.push(a);}};
Xi.prototype._onCommit=function(){if(!this._didCommit){this._didCommit=!0;var a=this._callbacks;if(null!==a)for(var b=0;b<a.length;b++){var c=a[b];"function"!==typeof c?t$1("191",c):void 0;c();}}};
function Yi(a,b,c){b=N$1(3,null,null,b?3:0);a={current:b,containerInfo:a,pendingChildren:null,pingCache:null,earliestPendingTime:0,latestPendingTime:0,earliestSuspendedTime:0,latestSuspendedTime:0,latestPingedTime:0,didError:!1,pendingCommitExpirationTime:0,finishedWork:null,timeoutHandle:-1,context:null,pendingContext:null,hydrate:c,nextExpirationTimeToWorkOn:0,expirationTime:0,firstBatch:null,nextScheduledRoot:null};this._internalRoot=b.stateNode=a;}
Yi.prototype.render=function(a,b){var c=this._internalRoot,d=new Xi;b=void 0===b?null:b;null!==b&&d.then(b);Ti(a,c,null,d._onCommit);return d};Yi.prototype.unmount=function(a){var b=this._internalRoot,c=new Xi;a=void 0===a?null:a;null!==a&&c.then(a);Ti(null,b,null,c._onCommit);return c};Yi.prototype.legacy_renderSubtreeIntoContainer=function(a,b,c){var d=this._internalRoot,e=new Xi;c=void 0===c?null:c;null!==c&&e.then(c);Ti(b,d,a,e._onCommit);return e};
Yi.prototype.createBatch=function(){var a=new Wi(this),b=a._expirationTime,c=this._internalRoot,d=c.firstBatch;if(null===d)c.firstBatch=a,a._next=null;else{for(c=null;null!==d&&d._expirationTime>=b;)c=d,d=d._next;a._next=d;null!==c&&(c._next=a);}return a};function Zi(a){return !(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}Jb=Pi;Kb=Ri;Lb=function(){W$1||0===ni||(Li(ni,!1),ni=0);};
function $i(a,b){b||(b=a?9===a.nodeType?a.documentElement:a.firstChild:null,b=!(!b||1!==b.nodeType||!b.hasAttribute("data-reactroot")));if(!b)for(var c;c=a.lastChild;)a.removeChild(c);return new Yi(a,!1,b)}
function aj(a,b,c,d,e){var f=c._reactRootContainer;if(f){if("function"===typeof e){var g=e;e=function(){var a=Ui(f._internalRoot);g.call(a);};}null!=a?f.legacy_renderSubtreeIntoContainer(a,b,e):f.render(b,e);}else{f=c._reactRootContainer=$i(c,d);if("function"===typeof e){var h=e;e=function(){var a=Ui(f._internalRoot);h.call(a);};}Qi(function(){null!=a?f.legacy_renderSubtreeIntoContainer(a,b,e):f.render(b,e);});}return Ui(f._internalRoot)}
function bj(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;Zi(b)?void 0:t$1("200");return Vi(a,b,null,c)}
var fj={createPortal:bj,findDOMNode:function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternalFiber;void 0===b&&("function"===typeof a.render?t$1("188"):t$1("268",Object.keys(a)));a=nd(b);a=null===a?null:a.stateNode;return a},hydrate:function(a,b,c){Zi(b)?void 0:t$1("200");return aj(null,a,b,!0,c)},render:function(a,b,c){Zi(b)?void 0:t$1("200");return aj(null,a,b,!1,c)},unstable_renderSubtreeIntoContainer:function(a,b,c,d){Zi(c)?void 0:t$1("200");null==a||void 0===a._reactInternalFiber?
t$1("38"):void 0;return aj(a,b,c,!1,d)},unmountComponentAtNode:function(a){Zi(a)?void 0:t$1("40");return a._reactRootContainer?(Qi(function(){aj(null,null,a,!1,function(){a._reactRootContainer=null;});}),!0):!1},unstable_createPortal:function(){return bj.apply(void 0,arguments)},unstable_batchedUpdates:Pi,unstable_interactiveUpdates:Ri,flushSync:function(a,b){W$1?t$1("187"):void 0;var c=Z$1;Z$1=!0;try{return ri(a,b)}finally{Z$1=c,Li(1073741823,!1);}},unstable_createRoot:cj,unstable_flushControlled:function(a){var b=
Z$1;Z$1=!0;try{ri(a);}finally{(Z$1=b)||W$1||Li(1073741823,!1);}},__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{Events:[Ka,La,Ma,Da.injectEventPluginsByName,ra,Sa,function(a){Aa(a,Ra);},Hb,Ib,Jd,Fa]}};function cj(a,b){Zi(a)?void 0:t$1("299","unstable_createRoot");return new Yi(a,!0,null!=b&&!0===b.hydrate)}
(function(a){var b=a.findFiberByHostInstance;return Ye(objectAssign({},a,{overrideProps:null,currentDispatcherRef:Xb.ReactCurrentDispatcher,findHostInstanceByFiber:function(a){a=nd(a);return null===a?null:a.stateNode},findFiberByHostInstance:function(a){return b?b(a):null}}))})({findFiberByHostInstance:Ja,bundleType:0,version:"16.8.1",rendererPackageName:"react-dom"});var gj={default:fj},hj=gj&&fj||gj;var reactDom_production_min=hj.default||hj;

var reactDom = createCommonjsModule(function (module) {

function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  ) {
    return;
  }
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

{
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = reactDom_production_min;
}
});

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

function emptyFunction() {}

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  }  shim.isRequired = shim;
  function getShim() {
    return shim;
  }  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

{
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims();
}
});

var murmurhash3_gc = createCommonjsModule(function (module) {
/**
 * JS Implementation of MurmurHash3 (r136) (as of May 20, 2011)
 * 
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/murmurhash-js
 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
 * @see http://sites.google.com/site/murmurhash/
 * 
 * @param {string} key ASCII only
 * @param {number} seed Positive integer only
 * @return {number} 32-bit positive integer hash 
 */

function murmurhash3_32_gc(key, seed) {
	var remainder, bytes, h1, h1b, c1, c2, k1, i;
	
	remainder = key.length & 3; // key.length % 4
	bytes = key.length - remainder;
	h1 = seed;
	c1 = 0xcc9e2d51;
	c2 = 0x1b873593;
	i = 0;
	
	while (i < bytes) {
	  	k1 = 
	  	  ((key.charCodeAt(i) & 0xff)) |
	  	  ((key.charCodeAt(++i) & 0xff) << 8) |
	  	  ((key.charCodeAt(++i) & 0xff) << 16) |
	  	  ((key.charCodeAt(++i) & 0xff) << 24);
		++i;
		
		k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
		k1 = (k1 << 15) | (k1 >>> 17);
		k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

		h1 ^= k1;
        h1 = (h1 << 13) | (h1 >>> 19);
		h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
		h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
	}
	
	k1 = 0;
	
	switch (remainder) {
		case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
		case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
		case 1: k1 ^= (key.charCodeAt(i) & 0xff);
		
		k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
		k1 = (k1 << 15) | (k1 >>> 17);
		k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
		h1 ^= k1;
	}
	
	h1 ^= key.length;

	h1 ^= h1 >>> 16;
	h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
	h1 ^= h1 >>> 13;
	h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
	h1 ^= h1 >>> 16;

	return h1 >>> 0;
}

{
  module.exports = murmurhash3_32_gc;
}
});

var IS_ELECTRON_ENV = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var userAgent = (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase()) || "";
var isElectronEnv = userAgent.includes(" electron/");
exports.default = isElectronEnv;

});

unwrapExports(IS_ELECTRON_ENV);

var IS_NODE_ENV_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

var IS_NODE_ENV = commonjsGlobal && commonjsGlobal.process && !IS_ELECTRON_ENV.default;
exports.default = IS_NODE_ENV;

});

unwrapExports(IS_NODE_ENV_1);

var isUnitlessNumber = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUnitlessNumber = {
    animationIterationCount: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowSpan: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnSpan: true,
    gridColumnStart: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    // SVG-related properties
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true
};
exports.default = exports.isUnitlessNumber;

});

unwrapExports(isUnitlessNumber);
var isUnitlessNumber_1 = isUnitlessNumber.isUnitlessNumber;

var StyleManager_1 = createCommonjsModule(function (module, exports) {
var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });



exports.replace2Dashes = function (key) { return key.replace(/[A-Z]/g, function ($1) { return "-" + $1.toLowerCase(); }); };
exports.getStyleValue = function (key, value) { return ((typeof value === "number" && !isUnitlessNumber.default[key]) ? value + "px" : value); };
exports.extendsStyleKeys = {
    "&:hover": true,
    "&:active": true,
    "&:focus": true,
    "&:disabled": true
};
var StyleManager;
StyleManager = /** @class */ (function () {
    function class_1(config) {
        var _this = this;
        this.themeId = 0;
        this.styleElement = null;
        this.sheets = {};
        this.CSSText = "";
        this.addedCSSText = {};
        this.setupTheme = function (theme) {
            _this.theme = theme;
            _this.themeId = murmurhash3_gc([theme.accent, theme.themeName, theme.useFluentDesign].join(", "));
        };
        this.setupStyleElement = function () {
            if (IS_NODE_ENV_1.default)
                return;
            if (!_this.styleElement) {
                var name_1 = "data-uwp-jss-" + _this.themeId;
                _this.styleElement = document.createElement("style");
                _this.styleElement.setAttribute(name_1, "");
                (() => window.shadowRoot || {appendChild: () => {}, removeChild: () => {}})().appendChild(_this.styleElement);
            }
        };
        this.cleanStyleSheet = function () {
            if (_this.styleElement)
                (() => window.shadowRoot || {appendChild: () => {}, removeChild: () => {}})().removeChild(_this.styleElement);
            _this.theme = null;
            _this.sheets = {};
            _this.CSSText = "";
            _this.styleElement = null;
        };
        this.style2CSSText = function (style) { return style ? Object.keys(style).map(function (key) { return ("  " + exports.replace2Dashes(key) + ": " + exports.getStyleValue(key, style[key]) + ";"); }).join("\n") : void 0; };
        this.sheetsToString = function () { return "\n" + Object.keys(_this.sheets).map(function (id) { return _this.sheets[id].CSSText; }).join(""); };
        this.addStyle = function (style, className, callback) {
            if (className === void 0) { className = ""; }
            if (callback === void 0) { callback = function () { }; }
            var id = murmurhash3_gc(_this.themeId + ": " + JSON.stringify(style));
            if (_this.sheets[id])
                return _this.sheets[id];
            var classNameWithHash = "" + _this.globalClassName + className + "-" + id;
            var styleKeys = Object.keys(style);
            var CSSText = "";
            var contentCSSText = "";
            var extendsCSSText = "";
            for (var _i = 0, styleKeys_1 = styleKeys; _i < styleKeys_1.length; _i++) {
                var styleKey = styleKeys_1[_i];
                if (exports.extendsStyleKeys[styleKey]) {
                    var extendsStyle = style[styleKey];
                    if (extendsStyle) {
                        extendsCSSText += "." + classNameWithHash + styleKey.slice(1) + " {\n" + _this.style2CSSText(extendsStyle) + "\n}\n";
                    }
                }
                else {
                    if (style[styleKey] !== void 0) {
                        contentCSSText += "  " + exports.replace2Dashes(styleKey) + ": " + exports.getStyleValue(styleKey, style[styleKey]) + ";\n";
                    }
                }
            }
            CSSText += "." + classNameWithHash + " {\n" + contentCSSText + "\n}\n";
            CSSText += extendsCSSText;
            _this.sheets[id] = { CSSText: CSSText, classNameWithHash: classNameWithHash, id: id, className: className };
            callback();
            return _this.sheets[id];
        };
        this.addStyleWithUpdate = function (style, className) {
            if (className === void 0) { className = ""; }
            return _this.addStyle(style, className, _this.renderSheets);
        };
        this.addCSSText = function (CSSText, callback) {
            if (callback === void 0) { callback = function () { }; }
            var hash = murmurhash3_gc(CSSText);
            var shouldUpdate = !_this.addedCSSText[hash];
            if (shouldUpdate) {
                _this.addedCSSText[hash] = true;
                _this.CSSText += CSSText;
            }
            callback(shouldUpdate);
        };
        this.addCSSTextWithUpdate = function (CSSText) {
            _this.addCSSText(CSSText, function (shouldUpdate) {
                if (_this.styleElement && shouldUpdate) {
                    _this.updateStyleElement(_this.styleElement.textContent += CSSText);
                }
            });
        };
        this.renderSheets = function () {
            var textContent = _this.sheetsToString();
            textContent += _this.CSSText;
            _this.updateStyleElement(textContent);
        };
        this.updateStyleElement = function (textContent) {
            var name = "data-uwp-jss-" + _this.themeId;
            if (_this.styleElement) {
                _this.styleElement.textContent = textContent;
                _this.styleDidUpdate();
            }
        };
        var globalClassName = config.globalClassName, theme = config.theme, styleDidUpdate = config.styleDidUpdate;
        this.styleDidUpdate = styleDidUpdate || (function () { });
        this.globalClassName = globalClassName ? globalClassName + "-" : "";
        this.setupTheme(theme);
        this.setupStyleElement();
    }
    class_1.prototype.setStyleToManager = function (config, callback) {
        var newStyles = {};
        var _a = config || {}, style = _a.style, className = _a.className;
        if (callback)
            style = callback(this.theme);
        var dynamicStyle = style.dynamicStyle, styleProperties = __rest(style, ["dynamicStyle"]);
        className = className || "";
        var sheet = this.addStyleWithUpdate(styleProperties, className);
        newStyles = {
            className: sheet.classNameWithHash,
            style: dynamicStyle
        };
        return newStyles;
    };
    class_1.prototype.setStylesToManager = function (config, callback) {
        var newStyles = {};
        var className = config.className, styles = config.styles;
        if (callback)
            styles = callback(this.theme);
        className = className || "";
        var keys = Object.keys(styles);
        var CSSText = "";
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var styleItem = styles[key];
            if (!styleItem)
                continue;
            var isStyleClasses = styleItem.className || styleItem.style;
            var secondClassName = "-" + key;
            if (isStyleClasses) {
                secondClassName = styleItem.className;
                secondClassName = secondClassName ? "-" + secondClassName : "";
                secondClassName = "-" + key + secondClassName;
            }
            var _a = (isStyleClasses ? styleItem.style : styleItem), dynamicStyle = _a.dynamicStyle, styleProperties = __rest(_a, ["dynamicStyle"]);
            var sheet = this.addStyleWithUpdate(styleProperties, "" + className + secondClassName);
            newStyles[key] = {
                className: sheet.classNameWithHash,
                style: dynamicStyle
            };
            CSSText += sheet.CSSText + "\n";
        }
        return newStyles;
    };
    return class_1;
}());
exports.default = StyleManager;

});

unwrapExports(StyleManager_1);
var StyleManager_2 = StyleManager_1.replace2Dashes;
var StyleManager_3 = StyleManager_1.getStyleValue;
var StyleManager_4 = StyleManager_1.extendsStyleKeys;

var tinycolor = createCommonjsModule(function (module) {
// TinyColor v1.4.1
// https://github.com/bgrins/TinyColor
// Brian Grinstead, MIT License

(function(Math) {

var trimLeft = /^\s+/,
    trimRight = /\s+$/,
    tinyCounter = 0,
    mathRound = Math.round,
    mathMin = Math.min,
    mathMax = Math.max,
    mathRandom = Math.random;

function tinycolor (color, opts) {

    color = (color) ? color : '';
    opts = opts || { };

    // If input is already a tinycolor, return itself
    if (color instanceof tinycolor) {
       return color;
    }
    // If we are called as a function, call using new instead
    if (!(this instanceof tinycolor)) {
        return new tinycolor(color, opts);
    }

    var rgb = inputToRGB(color);
    this._originalInput = color,
    this._r = rgb.r,
    this._g = rgb.g,
    this._b = rgb.b,
    this._a = rgb.a,
    this._roundA = mathRound(100*this._a) / 100,
    this._format = opts.format || rgb.format;
    this._gradientType = opts.gradientType;

    // Don't let the range of [0,255] come back in [0,1].
    // Potentially lose a little bit of precision here, but will fix issues where
    // .5 gets interpreted as half of the total, instead of half of 1
    // If it was supposed to be 128, this was already taken care of by `inputToRgb`
    if (this._r < 1) { this._r = mathRound(this._r); }
    if (this._g < 1) { this._g = mathRound(this._g); }
    if (this._b < 1) { this._b = mathRound(this._b); }

    this._ok = rgb.ok;
    this._tc_id = tinyCounter++;
}

tinycolor.prototype = {
    isDark: function() {
        return this.getBrightness() < 128;
    },
    isLight: function() {
        return !this.isDark();
    },
    isValid: function() {
        return this._ok;
    },
    getOriginalInput: function() {
      return this._originalInput;
    },
    getFormat: function() {
        return this._format;
    },
    getAlpha: function() {
        return this._a;
    },
    getBrightness: function() {
        //http://www.w3.org/TR/AERT#color-contrast
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    },
    getLuminance: function() {
        //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        var rgb = this.toRgb();
        var RsRGB, GsRGB, BsRGB, R, G, B;
        RsRGB = rgb.r/255;
        GsRGB = rgb.g/255;
        BsRGB = rgb.b/255;

        if (RsRGB <= 0.03928) {R = RsRGB / 12.92;} else {R = Math.pow(((RsRGB + 0.055) / 1.055), 2.4);}
        if (GsRGB <= 0.03928) {G = GsRGB / 12.92;} else {G = Math.pow(((GsRGB + 0.055) / 1.055), 2.4);}
        if (BsRGB <= 0.03928) {B = BsRGB / 12.92;} else {B = Math.pow(((BsRGB + 0.055) / 1.055), 2.4);}
        return (0.2126 * R) + (0.7152 * G) + (0.0722 * B);
    },
    setAlpha: function(value) {
        this._a = boundAlpha(value);
        this._roundA = mathRound(100*this._a) / 100;
        return this;
    },
    toHsv: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
    },
    toHsvString: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
        return (this._a == 1) ?
          "hsv("  + h + ", " + s + "%, " + v + "%)" :
          "hsva(" + h + ", " + s + "%, " + v + "%, "+ this._roundA + ")";
    },
    toHsl: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
    },
    toHslString: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
        return (this._a == 1) ?
          "hsl("  + h + ", " + s + "%, " + l + "%)" :
          "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";
    },
    toHex: function(allow3Char) {
        return rgbToHex(this._r, this._g, this._b, allow3Char);
    },
    toHexString: function(allow3Char) {
        return '#' + this.toHex(allow3Char);
    },
    toHex8: function(allow4Char) {
        return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
    },
    toHex8String: function(allow4Char) {
        return '#' + this.toHex8(allow4Char);
    },
    toRgb: function() {
        return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
    },
    toRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
          "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
    },
    toPercentageRgb: function() {
        return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
    },
    toPercentageRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" :
          "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
    },
    toName: function() {
        if (this._a === 0) {
            return "transparent";
        }

        if (this._a < 1) {
            return false;
        }

        return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
    },
    toFilter: function(secondColor) {
        var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
        var secondHex8String = hex8String;
        var gradientType = this._gradientType ? "GradientType = 1, " : "";

        if (secondColor) {
            var s = tinycolor(secondColor);
            secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
        }

        return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")";
    },
    toString: function(format) {
        var formatSet = !!format;
        format = format || this._format;

        var formattedString = false;
        var hasAlpha = this._a < 1 && this._a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");

        if (needsAlphaFormat) {
            // Special case for "transparent", all other non-alpha formats
            // will return rgba when there is transparency.
            if (format === "name" && this._a === 0) {
                return this.toName();
            }
            return this.toRgbString();
        }
        if (format === "rgb") {
            formattedString = this.toRgbString();
        }
        if (format === "prgb") {
            formattedString = this.toPercentageRgbString();
        }
        if (format === "hex" || format === "hex6") {
            formattedString = this.toHexString();
        }
        if (format === "hex3") {
            formattedString = this.toHexString(true);
        }
        if (format === "hex4") {
            formattedString = this.toHex8String(true);
        }
        if (format === "hex8") {
            formattedString = this.toHex8String();
        }
        if (format === "name") {
            formattedString = this.toName();
        }
        if (format === "hsl") {
            formattedString = this.toHslString();
        }
        if (format === "hsv") {
            formattedString = this.toHsvString();
        }

        return formattedString || this.toHexString();
    },
    clone: function() {
        return tinycolor(this.toString());
    },

    _applyModification: function(fn, args) {
        var color = fn.apply(null, [this].concat([].slice.call(args)));
        this._r = color._r;
        this._g = color._g;
        this._b = color._b;
        this.setAlpha(color._a);
        return this;
    },
    lighten: function() {
        return this._applyModification(lighten, arguments);
    },
    brighten: function() {
        return this._applyModification(brighten, arguments);
    },
    darken: function() {
        return this._applyModification(darken, arguments);
    },
    desaturate: function() {
        return this._applyModification(desaturate, arguments);
    },
    saturate: function() {
        return this._applyModification(saturate, arguments);
    },
    greyscale: function() {
        return this._applyModification(greyscale, arguments);
    },
    spin: function() {
        return this._applyModification(spin, arguments);
    },

    _applyCombination: function(fn, args) {
        return fn.apply(null, [this].concat([].slice.call(args)));
    },
    analogous: function() {
        return this._applyCombination(analogous, arguments);
    },
    complement: function() {
        return this._applyCombination(complement, arguments);
    },
    monochromatic: function() {
        return this._applyCombination(monochromatic, arguments);
    },
    splitcomplement: function() {
        return this._applyCombination(splitcomplement, arguments);
    },
    triad: function() {
        return this._applyCombination(triad, arguments);
    },
    tetrad: function() {
        return this._applyCombination(tetrad, arguments);
    }
};

// If input is an object, force 1 into "1.0" to handle ratios properly
// String input requires "1.0" as input, so 1 will be treated as 1
tinycolor.fromRatio = function(color, opts) {
    if (typeof color == "object") {
        var newColor = {};
        for (var i in color) {
            if (color.hasOwnProperty(i)) {
                if (i === "a") {
                    newColor[i] = color[i];
                }
                else {
                    newColor[i] = convertToPercentage(color[i]);
                }
            }
        }
        color = newColor;
    }

    return tinycolor(color, opts);
};

// Given a string or object, convert that input to RGB
// Possible string inputs:
//
//     "red"
//     "#f00" or "f00"
//     "#ff0000" or "ff0000"
//     "#ff000000" or "ff000000"
//     "rgb 255 0 0" or "rgb (255, 0, 0)"
//     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
//     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
//     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
//     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
//     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
//     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
//
function inputToRGB(color) {

    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;

    if (typeof color == "string") {
        color = stringInputToObject(color);
    }

    if (typeof color == "object") {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = "hsv";
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = "hsl";
        }

        if (color.hasOwnProperty("a")) {
            a = color.a;
        }
    }

    a = boundAlpha(a);

    return {
        ok: ok,
        format: color.format || format,
        r: mathMin(255, mathMax(rgb.r, 0)),
        g: mathMin(255, mathMax(rgb.g, 0)),
        b: mathMin(255, mathMax(rgb.b, 0)),
        a: a
    };
}


// Conversion Functions
// --------------------

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

// `rgbToRgb`
// Handle bounds / percentage checking to conform to CSS color spec
// <http://www.w3.org/TR/css3-color/>
// *Assumes:* r, g, b in [0, 255] or [0, 1]
// *Returns:* { r, g, b } in [0, 255]
function rgbToRgb(r, g, b){
    return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255
    };
}

// `rgbToHsl`
// Converts an RGB color value to HSL.
// *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
// *Returns:* { h, s, l } in [0,1]
function rgbToHsl(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min) {
        h = s = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return { h: h, s: s, l: l };
}

// `hslToRgb`
// Converts an HSL color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
function hslToRgb(h, s, l) {
    var r, g, b;

    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);

    function hue2rgb(p, q, t) {
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    }

    if(s === 0) {
        r = g = b = l; // achromatic
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
function rgbToHsv(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max === 0 ? 0 : d / max;

    if(max == min) {
        h = 0; // achromatic
    }
    else {
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h, s: s, v: v };
}

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
 function hsvToRgb(h, s, v) {

    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);

    var i = Math.floor(h),
        f = h - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s),
        mod = i % 6,
        r = [v, q, p, p, t, v][mod],
        g = [t, v, v, q, p, p][mod],
        b = [p, p, t, v, v, q][mod];

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHex`
// Converts an RGB color to hex
// Assumes r, g, and b are contained in the set [0, 255]
// Returns a 3 or 6 character hex
function rgbToHex(r, g, b, allow3Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    // Return a 3 character hex if possible
    if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }

    return hex.join("");
}

// `rgbaToHex`
// Converts an RGBA color plus alpha transparency to hex
// Assumes r, g, b are contained in the set [0, 255] and
// a in [0, 1]. Returns a 4 or 8 character rgba hex
function rgbaToHex(r, g, b, a, allow4Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16)),
        pad2(convertDecimalToHex(a))
    ];

    // Return a 4 character hex if possible
    if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }

    return hex.join("");
}

// `rgbaToArgbHex`
// Converts an RGBA color to an ARGB Hex8 string
// Rarely used, but required for "toFilter()"
function rgbaToArgbHex(r, g, b, a) {

    var hex = [
        pad2(convertDecimalToHex(a)),
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    return hex.join("");
}

// `equals`
// Can be called with any tinycolor input
tinycolor.equals = function (color1, color2) {
    if (!color1 || !color2) { return false; }
    return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
};

tinycolor.random = function() {
    return tinycolor.fromRatio({
        r: mathRandom(),
        g: mathRandom(),
        b: mathRandom()
    });
};


// Modification Functions
// ----------------------
// Thanks to less.js for some of the basics here
// <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

function desaturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s -= amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function saturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s += amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function greyscale(color) {
    return tinycolor(color).desaturate(100);
}

function lighten (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l += amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

function brighten(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var rgb = tinycolor(color).toRgb();
    rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * - (amount / 100))));
    rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * - (amount / 100))));
    rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * - (amount / 100))));
    return tinycolor(rgb);
}

function darken (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l -= amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

// Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
// Values outside of this range will be wrapped into this range.
function spin(color, amount) {
    var hsl = tinycolor(color).toHsl();
    var hue = (hsl.h + amount) % 360;
    hsl.h = hue < 0 ? 360 + hue : hue;
    return tinycolor(hsl);
}

// Combination Functions
// ---------------------
// Thanks to jQuery xColor for some of the ideas behind these
// <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

function complement(color) {
    var hsl = tinycolor(color).toHsl();
    hsl.h = (hsl.h + 180) % 360;
    return tinycolor(hsl);
}

function triad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
    ];
}

function tetrad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
    ];
}

function splitcomplement(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
        tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
    ];
}

function analogous(color, results, slices) {
    results = results || 6;
    slices = slices || 30;

    var hsl = tinycolor(color).toHsl();
    var part = 360 / slices;
    var ret = [tinycolor(color)];

    for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(tinycolor(hsl));
    }
    return ret;
}

function monochromatic(color, results) {
    results = results || 6;
    var hsv = tinycolor(color).toHsv();
    var h = hsv.h, s = hsv.s, v = hsv.v;
    var ret = [];
    var modification = 1 / results;

    while (results--) {
        ret.push(tinycolor({ h: h, s: s, v: v}));
        v = (v + modification) % 1;
    }

    return ret;
}

// Utility Functions
// ---------------------

tinycolor.mix = function(color1, color2, amount) {
    amount = (amount === 0) ? 0 : (amount || 50);

    var rgb1 = tinycolor(color1).toRgb();
    var rgb2 = tinycolor(color2).toRgb();

    var p = amount / 100;

    var rgba = {
        r: ((rgb2.r - rgb1.r) * p) + rgb1.r,
        g: ((rgb2.g - rgb1.g) * p) + rgb1.g,
        b: ((rgb2.b - rgb1.b) * p) + rgb1.b,
        a: ((rgb2.a - rgb1.a) * p) + rgb1.a
    };

    return tinycolor(rgba);
};


// Readability Functions
// ---------------------
// <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

// `contrast`
// Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
tinycolor.readability = function(color1, color2) {
    var c1 = tinycolor(color1);
    var c2 = tinycolor(color2);
    return (Math.max(c1.getLuminance(),c2.getLuminance())+0.05) / (Math.min(c1.getLuminance(),c2.getLuminance())+0.05);
};

// `isReadable`
// Ensure that foreground and background color combinations meet WCAG2 guidelines.
// The third argument is an optional Object.
//      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
//      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
// If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

// *Example*
//    tinycolor.isReadable("#000", "#111") => false
//    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
tinycolor.isReadable = function(color1, color2, wcag2) {
    var readability = tinycolor.readability(color1, color2);
    var wcag2Parms, out;

    out = false;

    wcag2Parms = validateWCAG2Parms(wcag2);
    switch (wcag2Parms.level + wcag2Parms.size) {
        case "AAsmall":
        case "AAAlarge":
            out = readability >= 4.5;
            break;
        case "AAlarge":
            out = readability >= 3;
            break;
        case "AAAsmall":
            out = readability >= 7;
            break;
    }
    return out;

};

// `mostReadable`
// Given a base color and a list of possible foreground or background
// colors for that base, returns the most readable color.
// Optionally returns Black or White if the most readable color is unreadable.
// *Example*
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
tinycolor.mostReadable = function(baseColor, colorList, args) {
    var bestColor = null;
    var bestScore = 0;
    var readability;
    var includeFallbackColors, level, size ;
    args = args || {};
    includeFallbackColors = args.includeFallbackColors ;
    level = args.level;
    size = args.size;

    for (var i= 0; i < colorList.length ; i++) {
        readability = tinycolor.readability(baseColor, colorList[i]);
        if (readability > bestScore) {
            bestScore = readability;
            bestColor = tinycolor(colorList[i]);
        }
    }

    if (tinycolor.isReadable(baseColor, bestColor, {"level":level,"size":size}) || !includeFallbackColors) {
        return bestColor;
    }
    else {
        args.includeFallbackColors=false;
        return tinycolor.mostReadable(baseColor,["#fff", "#000"],args);
    }
};


// Big List of Colors
// ------------------
// <http://www.w3.org/TR/css3-color/#svg-color>
var names = tinycolor.names = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "0ff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000",
    blanchedalmond: "ffebcd",
    blue: "00f",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    burntsienna: "ea7e5d",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "0ff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkgrey: "a9a9a9",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkslategrey: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dimgrey: "696969",
    dodgerblue: "1e90ff",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "f0f",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    grey: "808080",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgray: "d3d3d3",
    lightgreen: "90ee90",
    lightgrey: "d3d3d3",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslategray: "789",
    lightslategrey: "789",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "0f0",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "f0f",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370db",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "db7093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    rebeccapurple: "663399",
    red: "f00",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    slategrey: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    wheat: "f5deb3",
    white: "fff",
    whitesmoke: "f5f5f5",
    yellow: "ff0",
    yellowgreen: "9acd32"
};

// Make it easy to access colors via `hexNames[hex]`
var hexNames = tinycolor.hexNames = flip(names);


// Utilities
// ---------

// `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
function flip(o) {
    var flipped = { };
    for (var i in o) {
        if (o.hasOwnProperty(i)) {
            flipped[o[i]] = i;
        }
    }
    return flipped;
}

// Return a valid alpha value [0,1] with all invalid values being set to 1
function boundAlpha(a) {
    a = parseFloat(a);

    if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
    }

    return a;
}

// Take input from [0, n] and return it as [0, 1]
function bound01(n, max) {
    if (isOnePointZero(n)) { n = "100%"; }

    var processPercent = isPercentage(n);
    n = mathMin(max, mathMax(0, parseFloat(n)));

    // Automatically convert percentage into number
    if (processPercent) {
        n = parseInt(n * max, 10) / 100;
    }

    // Handle floating point rounding errors
    if ((Math.abs(n - max) < 0.000001)) {
        return 1;
    }

    // Convert into [0, 1] range if it isn't already
    return (n % max) / parseFloat(max);
}

// Force a number between 0 and 1
function clamp01(val) {
    return mathMin(1, mathMax(0, val));
}

// Parse a base-16 hex value into a base-10 integer
function parseIntFromHex(val) {
    return parseInt(val, 16);
}

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
function isOnePointZero(n) {
    return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
}

// Check to see if string passed in is a percentage
function isPercentage(n) {
    return typeof n === "string" && n.indexOf('%') != -1;
}

// Force a hex value to have 2 characters
function pad2(c) {
    return c.length == 1 ? '0' + c : '' + c;
}

// Replace a decimal with it's percentage value
function convertToPercentage(n) {
    if (n <= 1) {
        n = (n * 100) + "%";
    }

    return n;
}

// Converts a decimal to a hex value
function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
}
// Converts a hex value to a decimal
function convertHexToDecimal(h) {
    return (parseIntFromHex(h) / 255);
}

var matchers = (function() {

    // <http://www.w3.org/TR/css3-values/#integers>
    var CSS_INTEGER = "[-\\+]?\\d+%?";

    // <http://www.w3.org/TR/css3-values/#number-value>
    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

    // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

    // Actual matching.
    // Parentheses and commas are optional, but not required.
    // Whitespace can take the place of commas or opening paren
    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

    return {
        CSS_UNIT: new RegExp(CSS_UNIT),
        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
        hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };
})();

// `isValidCSSUnit`
// Take in a single string / number and check to see if it looks like a CSS unit
// (see `matchers` above for definition).
function isValidCSSUnit(color) {
    return !!matchers.CSS_UNIT.exec(color);
}

// `stringInputToObject`
// Permissive string parsing.  Take in a number of formats, and output an object
// based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
function stringInputToObject(color) {

    color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();
    var named = false;
    if (names[color]) {
        color = names[color];
        named = true;
    }
    else if (color == 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0, format: "name" };
    }

    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.
    var match;
    if ((match = matchers.rgb.exec(color))) {
        return { r: match[1], g: match[2], b: match[3] };
    }
    if ((match = matchers.rgba.exec(color))) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    if ((match = matchers.hsl.exec(color))) {
        return { h: match[1], s: match[2], l: match[3] };
    }
    if ((match = matchers.hsla.exec(color))) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    if ((match = matchers.hsv.exec(color))) {
        return { h: match[1], s: match[2], v: match[3] };
    }
    if ((match = matchers.hsva.exec(color))) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    if ((match = matchers.hex8.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = matchers.hex6.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? "name" : "hex"
        };
    }
    if ((match = matchers.hex4.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            a: convertHexToDecimal(match[4] + '' + match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = matchers.hex3.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            format: named ? "name" : "hex"
        };
    }

    return false;
}

function validateWCAG2Parms(parms) {
    // return valid WCAG2 parms for isReadable.
    // If input parms are invalid, return {"level":"AA", "size":"small"}
    var level, size;
    parms = parms || {"level":"AA", "size":"small"};
    level = (parms.level || "AA").toUpperCase();
    size = (parms.size || "small").toLowerCase();
    if (level !== "AA" && level !== "AAA") {
        level = "AA";
    }
    if (size !== "small" && size !== "large") {
        size = "small";
    }
    return {"level":level, "size":size};
}

// Node: Export function
if (module.exports) {
    module.exports = tinycolor;
}
// AMD/requirejs: Define the module
else {
    window.tinycolor = tinycolor;
}

})(Math);
});

var segoeMdl2Assets = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
function setSegoeMDL2AssetsFonts() {
    var linkElm = document.createElement("link");
    Object.assign(linkElm, {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/react-uwp/1.1.0/css/segoe-mdl2-assets.css"
    });
    (() => window.shadowRoot || {appendChild: () => {}, removeChild: () => {}})().appendChild(linkElm);
}
exports.default = setSegoeMDL2AssetsFonts;
exports.setSegoeMDL2AssetsFonts = setSegoeMDL2AssetsFonts;
// import addCSSRule from "../../common/browser/addCSSRule";
// addCSSRule(
// `@font-face {
//   font-family: "Segoe MDL2 Assets";
//   src:
//     local("Segoe MDL2 Assets"),
//     url("${require("./segmdl2.eot")}"),
//     url("${require("./segmdl2.woff2")}") format("woff2"),
//     url("${require("./segmdl2.woff")}") format("woff"),
//     url("${require("./segmdl2.svg#SegoeMDL2Assets")}") format("svg"),
//     url("${require("./segmdl2.ttf")}") format("truetype");
// }
// `);

});

unwrapExports(segoeMdl2Assets);
var segoeMdl2Assets_1 = segoeMdl2Assets.setSegoeMDL2AssetsFonts;

var bowser = createCommonjsModule(function (module) {
/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */

!function (root, name, definition) {
  if (module.exports) module.exports = definition();
  else root[name] = definition();
}(commonjsGlobal, 'bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true;

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
      , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
      , chromeos = /CrOS/.test(ua)
      , silk = /silk/i.test(ua)
      , sailfish = /sailfish/i.test(ua)
      , tizen = /tizen/i.test(ua)
      , webos = /(web|hpw)(o|0)s/i.test(ua)
      , windowsphone = /windows phone/i.test(ua)
      , samsungBrowser = /SamsungBrowser/i.test(ua)
      , windows = !windowsphone && /windows/i.test(ua)
      , mac = !iosdevice && !silk && /macintosh/i.test(ua)
      , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
      , edgeVersion = getSecondMatch(/edg([ea]|ios)\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua) && !/tablet pc/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , xbox = /xbox/i.test(ua)
      , result;

    if (/opera/i.test(ua)) {
      //  an old Opera
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
      };
    } else if (/opr\/|opios/i.test(ua)) {
      // a new Opera
      result = {
        name: 'Opera'
        , opera: t
        , version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/SamsungBrowser/i.test(ua)) {
      result = {
        name: 'Samsung Internet for Android'
        , samsungBrowser: t
        , version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
      };
    }
    else if (/Whale/i.test(ua)) {
      result = {
        name: 'NAVER Whale browser'
        , whale: t
        , version: getFirstMatch(/(?:whale)[\s\/](\d+(?:\.\d+)+)/i)
      };
    }
    else if (/MZBrowser/i.test(ua)) {
      result = {
        name: 'MZ Browser'
        , mzbrowser: t
        , version: getFirstMatch(/(?:MZBrowser)[\s\/](\d+(?:\.\d+)+)/i)
      };
    }
    else if (/coast/i.test(ua)) {
      result = {
        name: 'Opera Coast'
        , coast: t
        , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
      };
    }
    else if (/focus/i.test(ua)) {
      result = {
        name: 'Focus'
        , focus: t
        , version: getFirstMatch(/(?:focus)[\s\/](\d+(?:\.\d+)+)/i)
      };
    }
    else if (/yabrowser/i.test(ua)) {
      result = {
        name: 'Yandex Browser'
      , yandexbrowser: t
      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      };
    }
    else if (/ucbrowser/i.test(ua)) {
      result = {
          name: 'UC Browser'
        , ucbrowser: t
        , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
      };
    }
    else if (/mxios/i.test(ua)) {
      result = {
        name: 'Maxthon'
        , maxthon: t
        , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
      };
    }
    else if (/epiphany/i.test(ua)) {
      result = {
        name: 'Epiphany'
        , epiphany: t
        , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
      };
    }
    else if (/puffin/i.test(ua)) {
      result = {
        name: 'Puffin'
        , puffin: t
        , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
      };
    }
    else if (/sleipnir/i.test(ua)) {
      result = {
        name: 'Sleipnir'
        , sleipnir: t
        , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
      };
    }
    else if (/k-meleon/i.test(ua)) {
      result = {
        name: 'K-Meleon'
        , kMeleon: t
        , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
      };
    }
    else if (windowsphone) {
      result = {
        name: 'Windows Phone'
      , osname: 'Windows Phone'
      , windowsphone: t
      };
      if (edgeVersion) {
        result.msedge = t;
        result.version = edgeVersion;
      }
      else {
        result.msie = t;
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i);
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      };
    } else if (chromeos) {
      result = {
        name: 'Chrome'
      , osname: 'Chrome OS'
      , chromeos: t
      , chromeBook: t
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      };
    } else if (/edg([ea]|ios)/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      };
    }
    else if (/vivaldi/i.test(ua)) {
      result = {
        name: 'Vivaldi'
        , vivaldi: t
        , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (sailfish) {
      result = {
        name: 'Sailfish'
      , osname: 'Sailfish OS'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      };
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      };
    }
    else if (/firefox|iceweasel|fxios/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
      };
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t;
        result.osname = 'Firefox OS';
      }
    }
    else if (silk) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      };
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      };
    }
    else if (/slimerjs/i.test(ua)) {
      result = {
        name: 'SlimerJS'
        , slimer: t
        , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
      };
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , osname: 'BlackBerry OS'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      };
    }
    else if (webos) {
      result = {
        name: 'WebOS'
      , osname: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      /touchpad\//i.test(ua) && (result.touchpad = t);
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , osname: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (tizen) {
      result = {
        name: 'Tizen'
      , osname: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/qupzilla/i.test(ua)) {
      result = {
        name: 'QupZilla'
        , qupzilla: t
        , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
      };
    }
    else if (/chromium/i.test(ua)) {
      result = {
        name: 'Chromium'
        , chromium: t
        , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
        , chrome: t
        , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      };
    }
    else if (android) {
      result = {
        name: 'Android'
        , version: versionIdentifier
      };
    }
    else if (/safari|applewebkit/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      };
      if (versionIdentifier) {
        result.version = versionIdentifier;
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      };
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier;
      }
    }
    else if(/googlebot/i.test(ua)) {
      result = {
        name: 'Googlebot'
      , googlebot: t
      , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
      };
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      if (/(apple)?webkit\/537\.36/i.test(ua)) {
        result.name = result.name || "Blink";
        result.blink = t;
      } else {
        result.name = result.name || "Webkit";
        result.webkit = t;
      }
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier;
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko";
      result.gecko = t;
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i);
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.windowsphone && (android || result.silk)) {
      result.android = t;
      result.osname = 'Android';
    } else if (!result.windowsphone && iosdevice) {
      result[iosdevice] = t;
      result.ios = t;
      result.osname = 'iOS';
    } else if (mac) {
      result.mac = t;
      result.osname = 'macOS';
    } else if (xbox) {
      result.xbox = t;
      result.osname = 'Xbox';
    } else if (windows) {
      result.windows = t;
      result.osname = 'Windows';
    } else if (linux) {
      result.linux = t;
      result.osname = 'Linux';
    }

    function getWindowsVersion (s) {
      switch (s) {
        case 'NT': return 'NT'
        case 'XP': return 'XP'
        case 'NT 5.0': return '2000'
        case 'NT 5.1': return 'XP'
        case 'NT 5.2': return '2003'
        case 'NT 6.0': return 'Vista'
        case 'NT 6.1': return '7'
        case 'NT 6.2': return '8'
        case 'NT 6.3': return '8.1'
        case 'NT 10.0': return '10'
        default: return undefined
      }
    }

    // OS version extraction
    var osVersion = '';
    if (result.windows) {
      osVersion = getWindowsVersion(getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i));
    } else if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (result.mac) {
      osVersion = getFirstMatch(/Mac OS X (\d+([_\.\s]\d+)*)/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = !result.windows && osVersion.split('.')[0];
    if (
         tablet
      || nexusTablet
      || iosdevice == 'ipad'
      || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
      || result.silk
    ) {
      result.tablet = t;
    } else if (
         mobile
      || iosdevice == 'iphone'
      || iosdevice == 'ipod'
      || android
      || nexusMobile
      || result.blackberry
      || result.webos
      || result.bada
    ) {
      result.mobile = t;
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.yandexbrowser && result.version >= 15) ||
		    (result.vivaldi && result.version >= 1.0) ||
        (result.chrome && result.version >= 20) ||
        (result.samsungBrowser && result.version >= 4) ||
        (result.whale && compareVersions([result.version, '1.0']) === 1) ||
        (result.mzbrowser && compareVersions([result.version, '6.0']) === 1) ||
        (result.focus && compareVersions([result.version, '1.0']) === 1) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        || (result.chromium && result.version >= 20)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        || (result.chromium && result.version < 20)
        ) {
      result.c = t;
    } else result.x = t;

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '');

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  };

  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  function getVersionPrecision(version) {
    return version.split(".").length;
  }

  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  function map(arr, iterator) {
    var result = [], i;
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, iterator);
    }
    for (i = 0; i < arr.length; i++) {
      result.push(iterator(arr[i]));
    }
    return result;
  }

  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
   *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
   *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
   *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
   *
   * @param  {Array<String>} versions versions to compare
   * @return {Number} comparison result
   */
  function compareVersions(versions) {
    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
    var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
    var chunks = map(versions, function (version) {
      var delta = precision - getVersionPrecision(version);

      // 2) "9" -> "9.0" (for precision = 2)
      version = version + new Array(delta + 1).join(".0");

      // 3) "9.0" -> ["000000000"", "000000009"]
      return map(version.split("."), function (chunk) {
        return new Array(20 - chunk.length).join("0") + chunk;
      }).reverse();
    });

    // iterate in reverse order by reversed chunks array
    while (--precision >= 0) {
      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
      if (chunks[0][precision] > chunks[1][precision]) {
        return 1;
      }
      else if (chunks[0][precision] === chunks[1][precision]) {
        if (precision === 0) {
          // all version chunks are same
          return 0;
        }
      }
      else {
        return -1;
      }
    }
  }

  /**
   * Check if browser is unsupported
   *
   * @example
   *   bowser.isUnsupportedBrowser({
   *     msie: "10",
   *     firefox: "23",
   *     chrome: "29",
   *     safari: "5.1",
   *     opera: "16",
   *     phantom: "534"
   *   });
   *
   * @param  {Object}  minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function isUnsupportedBrowser(minVersions, strictMode, ua) {
    var _bowser = bowser;

    // make strictMode param optional with ua param usage
    if (typeof strictMode === 'string') {
      ua = strictMode;
      strictMode = void(0);
    }

    if (strictMode === void(0)) {
      strictMode = false;
    }
    if (ua) {
      _bowser = detect(ua);
    }

    var version = "" + _bowser.version;
    for (var browser in minVersions) {
      if (minVersions.hasOwnProperty(browser)) {
        if (_bowser[browser]) {
          if (typeof minVersions[browser] !== 'string') {
            throw new Error('Browser version in the minVersion map should be a string: ' + browser + ': ' + String(minVersions));
          }

          // browser version and min supported version.
          return compareVersions([version, minVersions[browser]]) < 0;
        }
      }
    }

    return strictMode; // not found
  }

  /**
   * Check if browser is supported
   *
   * @param  {Object} minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function check(minVersions, strictMode, ua) {
    return !isUnsupportedBrowser(minVersions, strictMode, ua);
  }

  bowser.isUnsupportedBrowser = isUnsupportedBrowser;
  bowser.compareVersions = compareVersions;
  bowser.check = check;

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  /*
   * Set our detect public method to the main bowser object
   * This is needed to implement bowser in server side
   */
  bowser.detect = detect;
  return bowser
});
});

var getBrowserInformation_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBrowserInformation;



var _bowser2 = _interopRequireDefault(bowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixByBrowser = {
  chrome: 'Webkit',
  safari: 'Webkit',
  ios: 'Webkit',
  android: 'Webkit',
  phantom: 'Webkit',
  opera: 'Webkit',
  webos: 'Webkit',
  blackberry: 'Webkit',
  bada: 'Webkit',
  tizen: 'Webkit',
  chromium: 'Webkit',
  vivaldi: 'Webkit',
  firefox: 'Moz',
  seamoney: 'Moz',
  sailfish: 'Moz',
  msie: 'ms',
  msedge: 'ms'
};


var browserByCanIuseAlias = {
  chrome: 'chrome',
  chromium: 'chrome',
  safari: 'safari',
  firfox: 'firefox',
  msedge: 'edge',
  opera: 'opera',
  vivaldi: 'opera',
  msie: 'ie'
};

function getBrowserName(browserInfo) {
  if (browserInfo.firefox) {
    return 'firefox';
  }

  if (browserInfo.mobile || browserInfo.tablet) {
    if (browserInfo.ios) {
      return 'ios_saf';
    } else if (browserInfo.android) {
      return 'android';
    } else if (browserInfo.opera) {
      return 'op_mini';
    }
  }

  for (var browser in browserByCanIuseAlias) {
    if (browserInfo.hasOwnProperty(browser)) {
      return browserByCanIuseAlias[browser];
    }
  }
}

/**
 * Uses bowser to get default browser browserInformation such as version and name
 * Evaluates bowser browserInfo and adds vendorPrefix browserInformation
 * @param {string} userAgent - userAgent that gets evaluated
 */
function getBrowserInformation(userAgent) {
  var browserInfo = _bowser2.default._detect(userAgent);

  if (browserInfo.yandexbrowser) {
    browserInfo = _bowser2.default._detect(userAgent.replace(/YaBrowser\/[0-9.]*/, ''));
  }

  for (var browser in prefixByBrowser) {
    if (browserInfo.hasOwnProperty(browser)) {
      var prefix = prefixByBrowser[browser];

      browserInfo.jsPrefix = prefix;
      browserInfo.cssPrefix = '-' + prefix.toLowerCase() + '-';
      break;
    }
  }

  browserInfo.browserName = getBrowserName(browserInfo);

  // For cordova IOS 8 the version is missing, set truncated osversion to prevent NaN
  if (browserInfo.version) {
    browserInfo.browserVersion = parseFloat(browserInfo.version);
  } else {
    browserInfo.browserVersion = parseInt(parseFloat(browserInfo.osversion), 10);
  }

  browserInfo.osVersion = parseFloat(browserInfo.osversion);

  // iOS forces all browsers to use Safari under the hood
  // as the Safari version seems to match the iOS version
  // we just explicitely use the osversion instead
  // https://github.com/rofrischmann/inline-style-prefixer/issues/72
  if (browserInfo.browserName === 'ios_saf' && browserInfo.browserVersion > browserInfo.osVersion) {
    browserInfo.browserVersion = browserInfo.osVersion;
  }

  // seperate native android chrome
  // https://github.com/rofrischmann/inline-style-prefixer/issues/45
  if (browserInfo.browserName === 'android' && browserInfo.chrome && browserInfo.browserVersion > 37) {
    browserInfo.browserName = 'and_chr';
  }

  // For android < 4.4 we want to check the osversion
  // not the chrome version, see issue #26
  // https://github.com/rofrischmann/inline-style-prefixer/issues/26
  if (browserInfo.browserName === 'android' && browserInfo.osVersion < 5) {
    browserInfo.browserVersion = browserInfo.osVersion;
  }

  // Samsung browser are basically build on Chrome > 44
  // https://github.com/rofrischmann/inline-style-prefixer/issues/102
  if (browserInfo.browserName === 'android' && browserInfo.samsungBrowser) {
    browserInfo.browserName = 'and_chr';
    browserInfo.browserVersion = 44;
  }

  return browserInfo;
}
module.exports = exports['default'];
});

unwrapExports(getBrowserInformation_1);

var getPrefixedKeyframes_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPrefixedKeyframes;
function getPrefixedKeyframes(browserName, browserVersion, cssPrefix) {
  var prefixedKeyframes = 'keyframes';

  if (browserName === 'chrome' && browserVersion < 43 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 9 || browserName === 'opera' && browserVersion < 30 || browserName === 'android' && browserVersion <= 4.4 || browserName === 'and_uc') {
    return cssPrefix + prefixedKeyframes;
  }
  return prefixedKeyframes;
}
module.exports = exports['default'];
});

unwrapExports(getPrefixedKeyframes_1);

var capitalizeString_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = capitalizeString;
function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
module.exports = exports["default"];
});

unwrapExports(capitalizeString_1);

var addNewValuesOnly_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addNewValuesOnly;
function addIfNew(list, value) {
  if (list.indexOf(value) === -1) {
    list.push(value);
  }
}

function addNewValuesOnly(list, values) {
  if (Array.isArray(values)) {
    for (var i = 0, len = values.length; i < len; ++i) {
      addIfNew(list, values[i]);
    }
  } else {
    addIfNew(list, values);
  }
}
module.exports = exports["default"];
});

unwrapExports(addNewValuesOnly_1);

var isObject_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isObject;
function isObject(value) {
  return value instanceof Object && !Array.isArray(value);
}
module.exports = exports["default"];
});

unwrapExports(isObject_1);

var prefixValue_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixValue;
function prefixValue(plugins, property, value, style, metaData) {
  for (var i = 0, len = plugins.length; i < len; ++i) {
    var processedValue = plugins[i](property, value, style, metaData);

    // we can stop processing if a value is returned
    // as all plugin criteria are unique
    if (processedValue) {
      return processedValue;
    }
  }
}
module.exports = exports["default"];
});

unwrapExports(prefixValue_1);

var createPrefixer_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createPrefixer;



var _getBrowserInformation2 = _interopRequireDefault(getBrowserInformation_1);



var _getPrefixedKeyframes2 = _interopRequireDefault(getPrefixedKeyframes_1);



var _capitalizeString2 = _interopRequireDefault(capitalizeString_1);



var _addNewValuesOnly2 = _interopRequireDefault(addNewValuesOnly_1);



var _isObject2 = _interopRequireDefault(isObject_1);



var _prefixValue2 = _interopRequireDefault(prefixValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createPrefixer(_ref) {
  var prefixMap = _ref.prefixMap,
      plugins = _ref.plugins;
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (style) {
    return style;
  };

  return function () {
    /**
    * Instantiante a new prefixer
    * @param {string} userAgent - userAgent to gather prefix information according to caniuse.com
    * @param {string} keepUnprefixed - keeps unprefixed properties and values
    */
    function Prefixer() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Prefixer);

      var defaultUserAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;

      this._userAgent = options.userAgent || defaultUserAgent;
      this._keepUnprefixed = options.keepUnprefixed || false;

      if (this._userAgent) {
        this._browserInfo = (0, _getBrowserInformation2.default)(this._userAgent);
      }

      // Checks if the userAgent was resolved correctly
      if (this._browserInfo && this._browserInfo.cssPrefix) {
        this.prefixedKeyframes = (0, _getPrefixedKeyframes2.default)(this._browserInfo.browserName, this._browserInfo.browserVersion, this._browserInfo.cssPrefix);
      } else {
        this._useFallback = true;
        return false;
      }

      var prefixData = this._browserInfo.browserName && prefixMap[this._browserInfo.browserName];
      if (prefixData) {
        this._requiresPrefix = {};

        for (var property in prefixData) {
          if (prefixData[property] >= this._browserInfo.browserVersion) {
            this._requiresPrefix[property] = true;
          }
        }

        this._hasPropsRequiringPrefix = Object.keys(this._requiresPrefix).length > 0;
      } else {
        this._useFallback = true;
      }

      this._metaData = {
        browserVersion: this._browserInfo.browserVersion,
        browserName: this._browserInfo.browserName,
        cssPrefix: this._browserInfo.cssPrefix,
        jsPrefix: this._browserInfo.jsPrefix,
        keepUnprefixed: this._keepUnprefixed,
        requiresPrefix: this._requiresPrefix
      };
    }

    _createClass(Prefixer, [{
      key: 'prefix',
      value: function prefix(style) {
        // use static prefixer as fallback if userAgent can not be resolved
        if (this._useFallback) {
          return fallback(style);
        }

        // only add prefixes if needed
        if (!this._hasPropsRequiringPrefix) {
          return style;
        }

        return this._prefixStyle(style);
      }
    }, {
      key: '_prefixStyle',
      value: function _prefixStyle(style) {
        for (var property in style) {
          var value = style[property];

          // handle nested objects
          if ((0, _isObject2.default)(value)) {
            style[property] = this.prefix(value);
            // handle array values
          } else if (Array.isArray(value)) {
            var combinedValue = [];

            for (var i = 0, len = value.length; i < len; ++i) {
              var processedValue = (0, _prefixValue2.default)(plugins, property, value[i], style, this._metaData);
              (0, _addNewValuesOnly2.default)(combinedValue, processedValue || value[i]);
            }

            // only modify the value if it was touched
            // by any plugin to prevent unnecessary mutations
            if (combinedValue.length > 0) {
              style[property] = combinedValue;
            }
          } else {
            var _processedValue = (0, _prefixValue2.default)(plugins, property, value, style, this._metaData);

            // only modify the value if it was touched
            // by any plugin to prevent unnecessary mutations
            if (_processedValue) {
              style[property] = _processedValue;
            }

            // add prefixes to properties
            if (this._requiresPrefix.hasOwnProperty(property)) {
              style[this._browserInfo.jsPrefix + (0, _capitalizeString2.default)(property)] = value;
              if (!this._keepUnprefixed) {
                delete style[property];
              }
            }
          }
        }

        return style;
      }

      /**
      * Returns a prefixed version of the style object using all vendor prefixes
      * @param {Object} styles - Style object that gets prefixed properties added
      * @returns {Object} - Style object with prefixed properties and values
      */

    }], [{
      key: 'prefixAll',
      value: function prefixAll(styles) {
        return fallback(styles);
      }
    }]);

    return Prefixer;
  }();
}
module.exports = exports['default'];
});

unwrapExports(createPrefixer_1);

var getPrefixedValue_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPrefixedValue;
function getPrefixedValue(prefixedValue, value, keepUnprefixed) {
  if (keepUnprefixed) {
    return [prefixedValue, value];
  }
  return prefixedValue;
}
module.exports = exports["default"];
});

unwrapExports(getPrefixedValue_1);

var cursor_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cursor;



var _getPrefixedValue2 = _interopRequireDefault(getPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var grabValues = {
  grab: true,
  grabbing: true
};


var zoomValues = {
  'zoom-in': true,
  'zoom-out': true
};

function cursor(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  // adds prefixes for firefox, chrome, safari, and opera regardless of
  // version until a reliable browser support info can be found
  // see: https://github.com/rofrischmann/inline-style-prefixer/issues/79
  if (property === 'cursor' && grabValues[value] && (browserName === 'firefox' || browserName === 'chrome' || browserName === 'safari' || browserName === 'opera')) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }

  if (property === 'cursor' && zoomValues[value] && (browserName === 'firefox' && browserVersion < 24 || browserName === 'chrome' && browserVersion < 37 || browserName === 'safari' && browserVersion < 9 || browserName === 'opera' && browserVersion < 24)) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];
});

unwrapExports(cursor_1);

var crossFade_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = crossFade;



var _getPrefixedValue2 = _interopRequireDefault(getPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function crossFade(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (typeof value === 'string' && value.indexOf('cross-fade(') > -1 && (browserName === 'chrome' || browserName === 'opera' || browserName === 'and_chr' || (browserName === 'ios_saf' || browserName === 'safari') && browserVersion < 10)) {
    return (0, _getPrefixedValue2.default)(value.replace(/cross-fade\(/g, cssPrefix + 'cross-fade('), value, keepUnprefixed);
  }
}
module.exports = exports['default'];
});

unwrapExports(crossFade_1);

var filter_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;



var _getPrefixedValue2 = _interopRequireDefault(getPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filter(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (typeof value === 'string' && value.indexOf('filter(') > -1 && (browserName === 'ios_saf' || browserName === 'safari' && browserVersion < 9.1)) {
    return (0, _getPrefixedValue2.default)(value.replace(/filter\(/g, cssPrefix + 'filter('), value, keepUnprefixed);
  }
}
module.exports = exports['default'];
});

unwrapExports(filter_1);

var flex_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flex;



var _getPrefixedValue2 = _interopRequireDefault(getPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var values = {
  flex: true,
  'inline-flex': true
};
function flex(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (property === 'display' && values[value] && (browserName === 'chrome' && browserVersion < 29 && browserVersion > 20 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 9 && browserVersion > 6 || browserName === 'opera' && (browserVersion === 15 || browserVersion === 16))) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];
});

unwrapExports(flex_1);

var flexboxOld_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxOld;



var _getPrefixedValue2 = _interopRequireDefault(getPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple',
  flex: 'box',
  'inline-flex': 'inline-box'
};


var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
};

var otherProps = ['alignContent', 'alignSelf', 'order', 'flexGrow', 'flexShrink', 'flexBasis', 'flexDirection'];
var properties = Object.keys(alternativeProps).concat(otherProps);

function flexboxOld(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed,
      requiresPrefix = _ref.requiresPrefix;

  if ((properties.indexOf(property) > -1 || property === 'display' && typeof value === 'string' && value.indexOf('flex') > -1) && (browserName === 'firefox' && browserVersion < 22 || browserName === 'chrome' && browserVersion < 21 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion <= 6.1 || browserName === 'android' && browserVersion < 4.4 || browserName === 'and_uc')) {
    delete requiresPrefix[property];

    if (!keepUnprefixed && !Array.isArray(style[property])) {
      delete style[property];
    }
    if (property === 'flexDirection' && typeof value === 'string') {
      if (value.indexOf('column') > -1) {
        style.WebkitBoxOrient = 'vertical';
      } else {
        style.WebkitBoxOrient = 'horizontal';
      }
      if (value.indexOf('reverse') > -1) {
        style.WebkitBoxDirection = 'reverse';
      } else {
        style.WebkitBoxDirection = 'normal';
      }
    }
    if (property === 'display' && alternativeValues.hasOwnProperty(value)) {
      return (0, _getPrefixedValue2.default)(cssPrefix + alternativeValues[value], value, keepUnprefixed);
    }
    if (alternativeProps.hasOwnProperty(property)) {
      style[alternativeProps[property]] = alternativeValues[value] || value;
    }
  }
}
module.exports = exports['default'];
});

unwrapExports(flexboxOld_1);

var gradient_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gradient;



var _getPrefixedValue2 = _interopRequireDefault(getPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;
function gradient(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (typeof value === 'string' && values.test(value) && (browserName === 'firefox' && browserVersion < 16 || browserName === 'chrome' && browserVersion < 26 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 7 || (browserName === 'opera' || browserName === 'op_mini') && browserVersion < 12.1 || browserName === 'android' && browserVersion < 4.4 || browserName === 'and_uc')) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];
});

unwrapExports(gradient_1);

var imageSet_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = imageSet;



var _getPrefixedValue2 = _interopRequireDefault(getPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function imageSet(property, value, style, _ref) {
  var browserName = _ref.browserName,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (typeof value === 'string' && value.indexOf('image-set(') > -1 && (browserName === 'chrome' || browserName === 'opera' || browserName === 'and_chr' || browserName === 'and_uc' || browserName === 'ios_saf' || browserName === 'safari')) {
    return (0, _getPrefixedValue2.default)(value.replace(/image-set\(/g, cssPrefix + 'image-set('), value, keepUnprefixed);
  }
}
module.exports = exports['default'];
});

unwrapExports(imageSet_1);

var position_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = position;



var _getPrefixedValue2 = _interopRequireDefault(getPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function position(property, value, style, _ref) {
  var browserName = _ref.browserName,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (property === 'position' && value === 'sticky' && (browserName === 'safari' || browserName === 'ios_saf')) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];
});

unwrapExports(position_1);

var sizing_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sizing;



var _getPrefixedValue2 = _interopRequireDefault(getPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};

var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true

  // TODO: chrome & opera support it
};function sizing(property, value, style, _ref) {
  var cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  // This might change in the future
  // Keep an eye on it
  if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];
});

unwrapExports(sizing_1);

/* eslint-disable no-var, prefer-template */
var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
var cache = {};

function toHyphenLower(match) {
  return '-' + match.toLowerCase()
}

function hyphenateStyleName(name) {
  if (cache.hasOwnProperty(name)) {
    return cache[name]
  }

  var hName = name.replace(uppercasePattern, toHyphenLower);
  return (cache[name] = msPattern.test(hName) ? '-' + hName : hName)
}

var hyphenateProperty_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hyphenateProperty;



var _hyphenateStyleName2 = _interopRequireDefault(hyphenateStyleName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hyphenateProperty(property) {
  return (0, _hyphenateStyleName2.default)(property);
}
module.exports = exports['default'];
});

unwrapExports(hyphenateProperty_1);

var transition_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transition;



var _hyphenateProperty2 = _interopRequireDefault(hyphenateProperty_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var properties = {
  transition: true,
  transitionProperty: true,
  WebkitTransition: true,
  WebkitTransitionProperty: true,
  MozTransition: true,
  MozTransitionProperty: true
};


var requiresPrefixDashCased = void 0;

function transition(property, value, style, _ref) {
  var cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed,
      requiresPrefix = _ref.requiresPrefix;

  if (typeof value === 'string' && properties.hasOwnProperty(property)) {
    // memoize the prefix array for later use
    if (!requiresPrefixDashCased) {
      requiresPrefixDashCased = Object.keys(requiresPrefix).map(function (prop) {
        return (0, _hyphenateProperty2.default)(prop);
      });
    }

    // only split multi values, not cubic beziers
    var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

    requiresPrefixDashCased.forEach(function (prop) {
      multipleValues.forEach(function (val, index) {
        if (val.indexOf(prop) > -1 && prop !== 'order') {
          multipleValues[index] = val.replace(prop, cssPrefix + prop) + (keepUnprefixed ? ',' + val : '');
        }
      });
    });

    return multipleValues.join(',');
  }
}
module.exports = exports['default'];
});

unwrapExports(transition_1);

var prefixProperty_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixProperty;



var _capitalizeString2 = _interopRequireDefault(capitalizeString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prefixProperty(prefixProperties, property, style) {
  if (prefixProperties.hasOwnProperty(property)) {
    var requiredPrefixes = prefixProperties[property];
    for (var i = 0, len = requiredPrefixes.length; i < len; ++i) {
      style[requiredPrefixes[i] + (0, _capitalizeString2.default)(property)] = style[property];
    }
  }
}
module.exports = exports['default'];
});

unwrapExports(prefixProperty_1);

var createPrefixer_1$1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPrefixer;



var _prefixProperty2 = _interopRequireDefault(prefixProperty_1);



var _prefixValue2 = _interopRequireDefault(prefixValue_1);



var _addNewValuesOnly2 = _interopRequireDefault(addNewValuesOnly_1);



var _isObject2 = _interopRequireDefault(isObject_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createPrefixer(_ref) {
  var prefixMap = _ref.prefixMap,
      plugins = _ref.plugins;

  function prefixAll(style) {
    for (var property in style) {
      var value = style[property];

      // handle nested objects
      if ((0, _isObject2.default)(value)) {
        style[property] = prefixAll(value);
        // handle array values
      } else if (Array.isArray(value)) {
        var combinedValue = [];

        for (var i = 0, len = value.length; i < len; ++i) {
          var processedValue = (0, _prefixValue2.default)(plugins, property, value[i], style, prefixMap);
          (0, _addNewValuesOnly2.default)(combinedValue, processedValue || value[i]);
        }

        // only modify the value if it was touched
        // by any plugin to prevent unnecessary mutations
        if (combinedValue.length > 0) {
          style[property] = combinedValue;
        }
      } else {
        var _processedValue = (0, _prefixValue2.default)(plugins, property, value, style, prefixMap);

        // only modify the value if it was touched
        // by any plugin to prevent unnecessary mutations
        if (_processedValue) {
          style[property] = _processedValue;
        }

        (0, _prefixProperty2.default)(prefixMap, property, style);
      }
    }

    return style;
  }

  return prefixAll;
}
module.exports = exports['default'];
});

unwrapExports(createPrefixer_1$1);

var staticData = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var w = ["Webkit"];
var m = ["Moz"];
var ms = ["ms"];
var wm = ["Webkit", "Moz"];
var wms = ["Webkit", "ms"];
var wmms = ["Webkit", "Moz", "ms"];

exports.default = {
  plugins: [],
  prefixMap: { "appearance": wm, "userSelect": wmms, "textEmphasisPosition": w, "textEmphasis": w, "textEmphasisStyle": w, "textEmphasisColor": w, "boxDecorationBreak": w, "clipPath": w, "maskImage": w, "maskMode": w, "maskRepeat": w, "maskPosition": w, "maskClip": w, "maskOrigin": w, "maskSize": w, "maskComposite": w, "mask": w, "maskBorderSource": w, "maskBorderMode": w, "maskBorderSlice": w, "maskBorderWidth": w, "maskBorderOutset": w, "maskBorderRepeat": w, "maskBorder": w, "maskType": w, "textDecorationStyle": w, "textDecorationSkip": w, "textDecorationLine": w, "textDecorationColor": w, "filter": w, "fontFeatureSettings": w, "breakAfter": wmms, "breakBefore": wmms, "breakInside": wmms, "columnCount": wm, "columnFill": wm, "columnGap": wm, "columnRule": wm, "columnRuleColor": wm, "columnRuleStyle": wm, "columnRuleWidth": wm, "columns": wm, "columnSpan": wm, "columnWidth": wm, "writingMode": wms, "flex": w, "flexBasis": w, "flexDirection": w, "flexGrow": w, "flexFlow": w, "flexShrink": w, "flexWrap": w, "alignContent": w, "alignItems": w, "alignSelf": w, "justifyContent": w, "order": w, "transform": w, "transformOrigin": w, "transformOriginX": w, "transformOriginY": w, "backfaceVisibility": w, "perspective": w, "perspectiveOrigin": w, "transformStyle": w, "transformOriginZ": w, "animation": w, "animationDelay": w, "animationDirection": w, "animationFillMode": w, "animationDuration": w, "animationIterationCount": w, "animationName": w, "animationPlayState": w, "animationTimingFunction": w, "backdropFilter": w, "fontKerning": w, "scrollSnapType": wms, "scrollSnapPointsX": wms, "scrollSnapPointsY": wms, "scrollSnapDestination": wms, "scrollSnapCoordinate": wms, "shapeImageThreshold": w, "shapeImageMargin": w, "shapeImageOutside": w, "hyphens": wmms, "flowInto": wms, "flowFrom": wms, "regionFragment": wms, "textAlignLast": m, "tabSize": m, "wrapFlow": ms, "wrapThrough": ms, "wrapMargin": ms, "gridTemplateColumns": ms, "gridTemplateRows": ms, "gridTemplateAreas": ms, "gridTemplate": ms, "gridAutoColumns": ms, "gridAutoRows": ms, "gridAutoFlow": ms, "grid": ms, "gridRowStart": ms, "gridColumnStart": ms, "gridRowEnd": ms, "gridRow": ms, "gridColumn": ms, "gridColumnEnd": ms, "gridColumnGap": ms, "gridRowGap": ms, "gridArea": ms, "gridGap": ms, "textSizeAdjust": wms, "borderImage": w, "borderImageOutset": w, "borderImageRepeat": w, "borderImageSlice": w, "borderImageSource": w, "borderImageWidth": w, "transitionDelay": w, "transitionDuration": w, "transitionProperty": w, "transitionTimingFunction": w }
};
module.exports = exports["default"];
});

unwrapExports(staticData);

var cursor_1$1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cursor;
var prefixes = ['-webkit-', '-moz-', ''];

var values = {
  'zoom-in': true,
  'zoom-out': true,
  grab: true,
  grabbing: true
};

function cursor(property, value) {
  if (property === 'cursor' && values.hasOwnProperty(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];
});

unwrapExports(cursor_1$1);

var isPrefixedValue_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPrefixedValue;
var regex = /-webkit-|-moz-|-ms-/;

function isPrefixedValue(value) {
  return typeof value === 'string' && regex.test(value);
}
module.exports = exports['default'];
});

unwrapExports(isPrefixedValue_1);

var crossFade_1$1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = crossFade;



var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#search=cross-fade
var prefixes = ['-webkit-', ''];
function crossFade(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('cross-fade(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/cross-fade\(/g, prefix + 'cross-fade(');
    });
  }
}
module.exports = exports['default'];
});

unwrapExports(crossFade_1$1);

var filter_1$1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;



var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#feat=css-filter-function
var prefixes = ['-webkit-', ''];
function filter(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('filter(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/filter\(/g, prefix + 'filter(');
    });
  }
}
module.exports = exports['default'];
});

unwrapExports(filter_1$1);

var flex_1$1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flex;
var values = {
  flex: ['-webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex', 'flex'],
  'inline-flex': ['-webkit-inline-box', '-moz-inline-box', '-ms-inline-flexbox', '-webkit-inline-flex', 'inline-flex']
};

function flex(property, value) {
  if (property === 'display' && values.hasOwnProperty(value)) {
    return values[value];
  }
}
module.exports = exports['default'];
});

unwrapExports(flex_1$1);

var flexboxOld_1$1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxOld;
var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple'
};

var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
};

function flexboxOld(property, value, style) {
  if (property === 'flexDirection' && typeof value === 'string') {
    if (value.indexOf('column') > -1) {
      style.WebkitBoxOrient = 'vertical';
    } else {
      style.WebkitBoxOrient = 'horizontal';
    }
    if (value.indexOf('reverse') > -1) {
      style.WebkitBoxDirection = 'reverse';
    } else {
      style.WebkitBoxDirection = 'normal';
    }
  }
  if (alternativeProps.hasOwnProperty(property)) {
    style[alternativeProps[property]] = alternativeValues[value] || value;
  }
}
module.exports = exports['default'];
});

unwrapExports(flexboxOld_1$1);

var gradient_1$1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gradient;



var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixes = ['-webkit-', '-moz-', ''];

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

function gradient(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && values.test(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];
});

unwrapExports(gradient_1$1);

var imageSet_1$1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = imageSet;



var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#feat=css-image-set
var prefixes = ['-webkit-', ''];
function imageSet(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('image-set(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/image-set\(/g, prefix + 'image-set(');
    });
  }
}
module.exports = exports['default'];
});

unwrapExports(imageSet_1$1);

var position_1$1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = position;
function position(property, value) {
  if (property === 'position' && value === 'sticky') {
    return ['-webkit-sticky', 'sticky'];
  }
}
module.exports = exports['default'];
});

unwrapExports(position_1$1);

var sizing_1$1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sizing;
var prefixes = ['-webkit-', '-moz-', ''];

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};
var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true
};

function sizing(property, value) {
  if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];
});

unwrapExports(sizing_1$1);

var transition_1$1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transition;



var _hyphenateProperty2 = _interopRequireDefault(hyphenateProperty_1);



var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);



var _capitalizeString2 = _interopRequireDefault(capitalizeString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var properties = {
  transition: true,
  transitionProperty: true,
  WebkitTransition: true,
  WebkitTransitionProperty: true,
  MozTransition: true,
  MozTransitionProperty: true
};


var prefixMapping = {
  Webkit: '-webkit-',
  Moz: '-moz-',
  ms: '-ms-'
};

function prefixValue(value, propertyPrefixMap) {
  if ((0, _isPrefixedValue2.default)(value)) {
    return value;
  }

  // only split multi values, not cubic beziers
  var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

  for (var i = 0, len = multipleValues.length; i < len; ++i) {
    var singleValue = multipleValues[i];
    var values = [singleValue];
    for (var property in propertyPrefixMap) {
      var dashCaseProperty = (0, _hyphenateProperty2.default)(property);

      if (singleValue.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {
        var prefixes = propertyPrefixMap[property];
        for (var j = 0, pLen = prefixes.length; j < pLen; ++j) {
          // join all prefixes and create a new value
          values.unshift(singleValue.replace(dashCaseProperty, prefixMapping[prefixes[j]] + dashCaseProperty));
        }
      }
    }

    multipleValues[i] = values.join(',');
  }

  return multipleValues.join(',');
}

function transition(property, value, style, propertyPrefixMap) {
  // also check for already prefixed transitions
  if (typeof value === 'string' && properties.hasOwnProperty(property)) {
    var outputValue = prefixValue(value, propertyPrefixMap);
    // if the property is already prefixed
    var webkitOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
      return !/-moz-|-ms-/.test(val);
    }).join(',');

    if (property.indexOf('Webkit') > -1) {
      return webkitOutput;
    }

    var mozOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
      return !/-webkit-|-ms-/.test(val);
    }).join(',');

    if (property.indexOf('Moz') > -1) {
      return mozOutput;
    }

    style['Webkit' + (0, _capitalizeString2.default)(property)] = webkitOutput;
    style['Moz' + (0, _capitalizeString2.default)(property)] = mozOutput;
    return outputValue;
  }
}
module.exports = exports['default'];
});

unwrapExports(transition_1$1);

var _static = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});



var _createPrefixer2 = _interopRequireDefault(createPrefixer_1$1);



var _staticData2 = _interopRequireDefault(staticData);



var _cursor2 = _interopRequireDefault(cursor_1$1);



var _crossFade2 = _interopRequireDefault(crossFade_1$1);



var _filter2 = _interopRequireDefault(filter_1$1);



var _flex2 = _interopRequireDefault(flex_1$1);



var _flexboxOld2 = _interopRequireDefault(flexboxOld_1$1);



var _gradient2 = _interopRequireDefault(gradient_1$1);



var _imageSet2 = _interopRequireDefault(imageSet_1$1);



var _position2 = _interopRequireDefault(position_1$1);



var _sizing2 = _interopRequireDefault(sizing_1$1);



var _transition2 = _interopRequireDefault(transition_1$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plugins = [_crossFade2.default, _cursor2.default, _filter2.default, _flexboxOld2.default, _gradient2.default, _imageSet2.default, _position2.default, _sizing2.default, _transition2.default, _flex2.default];

exports.default = (0, _createPrefixer2.default)({
  prefixMap: _staticData2.default.prefixMap,
  plugins: plugins
});
module.exports = exports['default'];
});

unwrapExports(_static);

var dynamicData = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  plugins: [],
  prefixMap: { "chrome": { "appearance": 64, "userSelect": 53, "textEmphasisPosition": 64, "textEmphasis": 64, "textEmphasisStyle": 64, "textEmphasisColor": 64, "boxDecorationBreak": 64, "clipPath": 54, "maskImage": 64, "maskMode": 64, "maskRepeat": 64, "maskPosition": 64, "maskClip": 64, "maskOrigin": 64, "maskSize": 64, "maskComposite": 64, "mask": 64, "maskBorderSource": 64, "maskBorderMode": 64, "maskBorderSlice": 64, "maskBorderWidth": 64, "maskBorderOutset": 64, "maskBorderRepeat": 64, "maskBorder": 64, "maskType": 64, "textDecorationStyle": 56, "textDecorationSkip": 56, "textDecorationLine": 56, "textDecorationColor": 56, "filter": 52, "fontFeatureSettings": 47, "breakAfter": 49, "breakBefore": 49, "breakInside": 49, "columnCount": 49, "columnFill": 49, "columnGap": 49, "columnRule": 49, "columnRuleColor": 49, "columnRuleStyle": 49, "columnRuleWidth": 49, "columns": 49, "columnSpan": 49, "columnWidth": 49, "writingMode": 47 }, "safari": { "flex": 8, "flexBasis": 8, "flexDirection": 8, "flexGrow": 8, "flexFlow": 8, "flexShrink": 8, "flexWrap": 8, "alignContent": 8, "alignItems": 8, "alignSelf": 8, "justifyContent": 8, "order": 8, "transform": 8, "transformOrigin": 8, "transformOriginX": 8, "transformOriginY": 8, "backfaceVisibility": 8, "perspective": 8, "perspectiveOrigin": 8, "transformStyle": 8, "transformOriginZ": 8, "animation": 8, "animationDelay": 8, "animationDirection": 8, "animationFillMode": 8, "animationDuration": 8, "animationIterationCount": 8, "animationName": 8, "animationPlayState": 8, "animationTimingFunction": 8, "appearance": 11, "userSelect": 11, "backdropFilter": 11, "fontKerning": 9, "scrollSnapType": 10.1, "scrollSnapPointsX": 10.1, "scrollSnapPointsY": 10.1, "scrollSnapDestination": 10.1, "scrollSnapCoordinate": 10.1, "boxDecorationBreak": 11, "clipPath": 11, "maskImage": 11, "maskMode": 11, "maskRepeat": 11, "maskPosition": 11, "maskClip": 11, "maskOrigin": 11, "maskSize": 11, "maskComposite": 11, "mask": 11, "maskBorderSource": 11, "maskBorderMode": 11, "maskBorderSlice": 11, "maskBorderWidth": 11, "maskBorderOutset": 11, "maskBorderRepeat": 11, "maskBorder": 11, "maskType": 11, "textDecorationStyle": 11, "textDecorationSkip": 11, "textDecorationLine": 11, "textDecorationColor": 11, "shapeImageThreshold": 10, "shapeImageMargin": 10, "shapeImageOutside": 10, "filter": 9, "hyphens": 11, "flowInto": 11, "flowFrom": 11, "breakBefore": 8, "breakAfter": 8, "breakInside": 8, "regionFragment": 11, "columnCount": 8, "columnFill": 8, "columnGap": 8, "columnRule": 8, "columnRuleColor": 8, "columnRuleStyle": 8, "columnRuleWidth": 8, "columns": 8, "columnSpan": 8, "columnWidth": 8, "writingMode": 11 }, "firefox": { "appearance": 58, "userSelect": 58, "textAlignLast": 48, "tabSize": 58, "hyphens": 42, "breakAfter": 51, "breakBefore": 51, "breakInside": 51, "columnCount": 51, "columnFill": 51, "columnGap": 51, "columnRule": 51, "columnRuleColor": 51, "columnRuleStyle": 51, "columnRuleWidth": 51, "columns": 51, "columnSpan": 51, "columnWidth": 51 }, "opera": { "flex": 16, "flexBasis": 16, "flexDirection": 16, "flexGrow": 16, "flexFlow": 16, "flexShrink": 16, "flexWrap": 16, "alignContent": 16, "alignItems": 16, "alignSelf": 16, "justifyContent": 16, "order": 16, "transform": 22, "transformOrigin": 22, "transformOriginX": 22, "transformOriginY": 22, "backfaceVisibility": 22, "perspective": 22, "perspectiveOrigin": 22, "transformStyle": 22, "transformOriginZ": 22, "animation": 29, "animationDelay": 29, "animationDirection": 29, "animationFillMode": 29, "animationDuration": 29, "animationIterationCount": 29, "animationName": 29, "animationPlayState": 29, "animationTimingFunction": 29, "appearance": 49, "userSelect": 40, "fontKerning": 19, "textEmphasisPosition": 49, "textEmphasis": 49, "textEmphasisStyle": 49, "textEmphasisColor": 49, "boxDecorationBreak": 49, "clipPath": 41, "maskImage": 49, "maskMode": 49, "maskRepeat": 49, "maskPosition": 49, "maskClip": 49, "maskOrigin": 49, "maskSize": 49, "maskComposite": 49, "mask": 49, "maskBorderSource": 49, "maskBorderMode": 49, "maskBorderSlice": 49, "maskBorderWidth": 49, "maskBorderOutset": 49, "maskBorderRepeat": 49, "maskBorder": 49, "maskType": 49, "textDecorationStyle": 43, "textDecorationSkip": 43, "textDecorationLine": 43, "textDecorationColor": 43, "filter": 39, "fontFeatureSettings": 34, "breakAfter": 36, "breakBefore": 36, "breakInside": 36, "columnCount": 36, "columnFill": 36, "columnGap": 36, "columnRule": 36, "columnRuleColor": 36, "columnRuleStyle": 36, "columnRuleWidth": 36, "columns": 36, "columnSpan": 36, "columnWidth": 36, "writingMode": 34 }, "ie": { "userSelect": 11, "wrapFlow": 11, "wrapThrough": 11, "wrapMargin": 11, "scrollSnapType": 11, "scrollSnapPointsX": 11, "scrollSnapPointsY": 11, "scrollSnapDestination": 11, "scrollSnapCoordinate": 11, "hyphens": 11, "flowInto": 11, "flowFrom": 11, "breakBefore": 11, "breakAfter": 11, "breakInside": 11, "regionFragment": 11, "gridTemplateColumns": 11, "gridTemplateRows": 11, "gridTemplateAreas": 11, "gridTemplate": 11, "gridAutoColumns": 11, "gridAutoRows": 11, "gridAutoFlow": 11, "grid": 11, "gridRowStart": 11, "gridColumnStart": 11, "gridRowEnd": 11, "gridRow": 11, "gridColumn": 11, "gridColumnEnd": 11, "gridColumnGap": 11, "gridRowGap": 11, "gridArea": 11, "gridGap": 11, "textSizeAdjust": 11, "writingMode": 11 }, "edge": { "userSelect": 16, "wrapFlow": 16, "wrapThrough": 16, "wrapMargin": 16, "scrollSnapType": 16, "scrollSnapPointsX": 16, "scrollSnapPointsY": 16, "scrollSnapDestination": 16, "scrollSnapCoordinate": 16, "hyphens": 16, "flowInto": 16, "flowFrom": 16, "breakBefore": 16, "breakAfter": 16, "breakInside": 16, "regionFragment": 16, "gridTemplateColumns": 15, "gridTemplateRows": 15, "gridTemplateAreas": 15, "gridTemplate": 15, "gridAutoColumns": 15, "gridAutoRows": 15, "gridAutoFlow": 15, "grid": 15, "gridRowStart": 15, "gridColumnStart": 15, "gridRowEnd": 15, "gridRow": 15, "gridColumn": 15, "gridColumnEnd": 15, "gridColumnGap": 15, "gridRowGap": 15, "gridArea": 15, "gridGap": 15 }, "ios_saf": { "flex": 8.1, "flexBasis": 8.1, "flexDirection": 8.1, "flexGrow": 8.1, "flexFlow": 8.1, "flexShrink": 8.1, "flexWrap": 8.1, "alignContent": 8.1, "alignItems": 8.1, "alignSelf": 8.1, "justifyContent": 8.1, "order": 8.1, "transform": 8.1, "transformOrigin": 8.1, "transformOriginX": 8.1, "transformOriginY": 8.1, "backfaceVisibility": 8.1, "perspective": 8.1, "perspectiveOrigin": 8.1, "transformStyle": 8.1, "transformOriginZ": 8.1, "animation": 8.1, "animationDelay": 8.1, "animationDirection": 8.1, "animationFillMode": 8.1, "animationDuration": 8.1, "animationIterationCount": 8.1, "animationName": 8.1, "animationPlayState": 8.1, "animationTimingFunction": 8.1, "appearance": 11, "userSelect": 11, "backdropFilter": 11, "fontKerning": 11, "scrollSnapType": 11, "scrollSnapPointsX": 11, "scrollSnapPointsY": 11, "scrollSnapDestination": 11, "scrollSnapCoordinate": 11, "boxDecorationBreak": 11, "clipPath": 11, "maskImage": 11, "maskMode": 11, "maskRepeat": 11, "maskPosition": 11, "maskClip": 11, "maskOrigin": 11, "maskSize": 11, "maskComposite": 11, "mask": 11, "maskBorderSource": 11, "maskBorderMode": 11, "maskBorderSlice": 11, "maskBorderWidth": 11, "maskBorderOutset": 11, "maskBorderRepeat": 11, "maskBorder": 11, "maskType": 11, "textSizeAdjust": 11, "textDecorationStyle": 11, "textDecorationSkip": 11, "textDecorationLine": 11, "textDecorationColor": 11, "shapeImageThreshold": 10, "shapeImageMargin": 10, "shapeImageOutside": 10, "filter": 9, "hyphens": 11, "flowInto": 11, "flowFrom": 11, "breakBefore": 8.1, "breakAfter": 8.1, "breakInside": 8.1, "regionFragment": 11, "columnCount": 8.1, "columnFill": 8.1, "columnGap": 8.1, "columnRule": 8.1, "columnRuleColor": 8.1, "columnRuleStyle": 8.1, "columnRuleWidth": 8.1, "columns": 8.1, "columnSpan": 8.1, "columnWidth": 8.1, "writingMode": 11 }, "android": { "borderImage": 4.2, "borderImageOutset": 4.2, "borderImageRepeat": 4.2, "borderImageSlice": 4.2, "borderImageSource": 4.2, "borderImageWidth": 4.2, "flex": 4.2, "flexBasis": 4.2, "flexDirection": 4.2, "flexGrow": 4.2, "flexFlow": 4.2, "flexShrink": 4.2, "flexWrap": 4.2, "alignContent": 4.2, "alignItems": 4.2, "alignSelf": 4.2, "justifyContent": 4.2, "order": 4.2, "transition": 4.2, "transitionDelay": 4.2, "transitionDuration": 4.2, "transitionProperty": 4.2, "transitionTimingFunction": 4.2, "transform": 4.4, "transformOrigin": 4.4, "transformOriginX": 4.4, "transformOriginY": 4.4, "backfaceVisibility": 4.4, "perspective": 4.4, "perspectiveOrigin": 4.4, "transformStyle": 4.4, "transformOriginZ": 4.4, "animation": 4.4, "animationDelay": 4.4, "animationDirection": 4.4, "animationFillMode": 4.4, "animationDuration": 4.4, "animationIterationCount": 4.4, "animationName": 4.4, "animationPlayState": 4.4, "animationTimingFunction": 4.4, "appearance": 56, "userSelect": 4.4, "fontKerning": 4.4, "textEmphasisPosition": 56, "textEmphasis": 56, "textEmphasisStyle": 56, "textEmphasisColor": 56, "boxDecorationBreak": 56, "clipPath": 4.4, "maskImage": 56, "maskMode": 56, "maskRepeat": 56, "maskPosition": 56, "maskClip": 56, "maskOrigin": 56, "maskSize": 56, "maskComposite": 56, "mask": 56, "maskBorderSource": 56, "maskBorderMode": 56, "maskBorderSlice": 56, "maskBorderWidth": 56, "maskBorderOutset": 56, "maskBorderRepeat": 56, "maskBorder": 56, "maskType": 56, "filter": 4.4, "fontFeatureSettings": 4.4, "breakAfter": 4.4, "breakBefore": 4.4, "breakInside": 4.4, "columnCount": 4.4, "columnFill": 4.4, "columnGap": 4.4, "columnRule": 4.4, "columnRuleColor": 4.4, "columnRuleStyle": 4.4, "columnRuleWidth": 4.4, "columns": 4.4, "columnSpan": 4.4, "columnWidth": 4.4, "writingMode": 4.4 }, "and_chr": { "appearance": 61, "textEmphasisPosition": 61, "textEmphasis": 61, "textEmphasisStyle": 61, "textEmphasisColor": 61, "boxDecorationBreak": 61, "maskImage": 61, "maskMode": 61, "maskRepeat": 61, "maskPosition": 61, "maskClip": 61, "maskOrigin": 61, "maskSize": 61, "maskComposite": 61, "mask": 61, "maskBorderSource": 61, "maskBorderMode": 61, "maskBorderSlice": 61, "maskBorderWidth": 61, "maskBorderOutset": 61, "maskBorderRepeat": 61, "maskBorder": 61, "maskType": 61 }, "and_uc": { "flex": 11.4, "flexBasis": 11.4, "flexDirection": 11.4, "flexGrow": 11.4, "flexFlow": 11.4, "flexShrink": 11.4, "flexWrap": 11.4, "alignContent": 11.4, "alignItems": 11.4, "alignSelf": 11.4, "justifyContent": 11.4, "order": 11.4, "transform": 11.4, "transformOrigin": 11.4, "transformOriginX": 11.4, "transformOriginY": 11.4, "backfaceVisibility": 11.4, "perspective": 11.4, "perspectiveOrigin": 11.4, "transformStyle": 11.4, "transformOriginZ": 11.4, "animation": 11.4, "animationDelay": 11.4, "animationDirection": 11.4, "animationFillMode": 11.4, "animationDuration": 11.4, "animationIterationCount": 11.4, "animationName": 11.4, "animationPlayState": 11.4, "animationTimingFunction": 11.4, "appearance": 11.4, "userSelect": 11.4, "textEmphasisPosition": 11.4, "textEmphasis": 11.4, "textEmphasisStyle": 11.4, "textEmphasisColor": 11.4, "clipPath": 11.4, "maskImage": 11.4, "maskMode": 11.4, "maskRepeat": 11.4, "maskPosition": 11.4, "maskClip": 11.4, "maskOrigin": 11.4, "maskSize": 11.4, "maskComposite": 11.4, "mask": 11.4, "maskBorderSource": 11.4, "maskBorderMode": 11.4, "maskBorderSlice": 11.4, "maskBorderWidth": 11.4, "maskBorderOutset": 11.4, "maskBorderRepeat": 11.4, "maskBorder": 11.4, "maskType": 11.4, "textSizeAdjust": 11.4, "filter": 11.4, "hyphens": 11.4, "fontFeatureSettings": 11.4, "breakAfter": 11.4, "breakBefore": 11.4, "breakInside": 11.4, "columnCount": 11.4, "columnFill": 11.4, "columnGap": 11.4, "columnRule": 11.4, "columnRuleColor": 11.4, "columnRuleStyle": 11.4, "columnRuleWidth": 11.4, "columns": 11.4, "columnSpan": 11.4, "columnWidth": 11.4, "writingMode": 11.4 }, "op_mini": {} }
};
module.exports = exports["default"];
});

unwrapExports(dynamicData);

var dynamic = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});



var _createPrefixer2 = _interopRequireDefault(createPrefixer_1);



var _cursor2 = _interopRequireDefault(cursor_1);



var _crossFade2 = _interopRequireDefault(crossFade_1);



var _filter2 = _interopRequireDefault(filter_1);



var _flex2 = _interopRequireDefault(flex_1);



var _flexboxOld2 = _interopRequireDefault(flexboxOld_1);



var _gradient2 = _interopRequireDefault(gradient_1);



var _imageSet2 = _interopRequireDefault(imageSet_1);



var _position2 = _interopRequireDefault(position_1);



var _sizing2 = _interopRequireDefault(sizing_1);



var _transition2 = _interopRequireDefault(transition_1);



var _static2 = _interopRequireDefault(_static);



var _dynamicData2 = _interopRequireDefault(dynamicData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plugins = [_crossFade2.default, _cursor2.default, _filter2.default, _flexboxOld2.default, _gradient2.default, _imageSet2.default, _position2.default, _sizing2.default, _transition2.default, _flex2.default];

var Prefixer = (0, _createPrefixer2.default)({
  prefixMap: _dynamicData2.default.prefixMap,
  plugins: plugins
}, _static2.default);
exports.default = Prefixer;
module.exports = exports['default'];
});

unwrapExports(dynamic);

var prefixAll_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


function prefixAll(userAgent) {
    var isServer = IS_NODE_ENV_1.default;
    if (userAgent === false) {
        return function (style) { return style; };
    }
    if (!isServer && userAgent === void 0) {
        userAgent = navigator.userAgent;
    }
    if (!isServer || (isServer && (userAgent !== void 0 && userAgent !== "all"))) {
        var prefixer_1 = new dynamic({ userAgent: userAgent });
        return function (style) {
            if (!style)
                return;
            return prefixer_1.prefix(style);
        };
    }
    else {
        return function (style) {
            if (!style)
                return;
            var stylePrefixed = dynamic.prefixAll(style);
            var isFlex = ["flex", "inline-flex"].includes(style.display);
            // We can't apply this join with react-dom:
            // #https://github.com/facebook/react/issues/6467
            if (isFlex) {
                stylePrefixed.display = stylePrefixed.display.join("; display: ") + ";";
            }
            return stylePrefixed;
        };
    }
}
exports.default = prefixAll;

});

unwrapExports(prefixAll_1);

/*
    StackBlur - a fast almost Gaussian Blur For Canvas

    Version:     0.5
    Author:        Mario Klingemann
    Contact:     mario@quasimondo.com
    Website:    http://www.quasimondo.com/StackBlurForCanvas
    Twitter:    @quasimondo

    In case you find this class useful - especially in commercial projects -
    I am not totally unhappy for a small donation to my PayPal account
    mario@quasimondo.de

    Or support me on flattr:
    https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript

    Copyright (c) 2010 Mario Klingemann

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation
    files (the "Software"), to deal in the Software without
    restriction, including without limitation the rights to use,
    copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
    OTHER DEALINGS IN THE SOFTWARE.
    */


var mul_table = [
    512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,
    454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,
    482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,
    437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,
    497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,
    320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,
    446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,
    329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,
    505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,
    399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,
    324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,
    268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,
    451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,
    385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,
    332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,
    289,287,285,282,280,278,275,273,271,269,267,265,263,261,259];


var shg_table = [
    9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17,
    17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
    19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
    20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
    21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
    21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22,
    22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
    22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24 ];


function processImage(img, canvas, radius, blurAlphaChannel)
{
    if (typeof(img) == 'string') {
        var img = document.getElementById(img);
    }
    else if (typeof HTMLImageElement !== 'undefined' && !img instanceof HTMLImageElement) {
        return;
    }
    var w = img.naturalWidth;
    var h = img.naturalHeight;

    if (typeof(canvas) == 'string') {
        var canvas = document.getElementById(canvas);
    }
    else if (typeof HTMLCanvasElement !== 'undefined' && !canvas instanceof HTMLCanvasElement) {
        return;
    }

    canvas.style.width  = w + 'px';
    canvas.style.height = h + 'px';
    canvas.width = w;
    canvas.height = h;

    var context = canvas.getContext('2d');
    context.clearRect(0, 0, w, h);
    context.drawImage(img, 0, 0);

    if (isNaN(radius) || radius < 1) return;

    if (blurAlphaChannel)
        processCanvasRGBA(canvas, 0, 0, w, h, radius);
    else
        processCanvasRGB(canvas, 0, 0, w, h, radius);
}

function getImageDataFromCanvas(canvas, top_x, top_y, width, height)
{
    if (typeof(canvas) == 'string')
        var canvas  = document.getElementById(canvas);
    else if (typeof HTMLCanvasElement !== 'undefined' && !canvas instanceof HTMLCanvasElement)
        return;

    var context = canvas.getContext('2d');
    var imageData;

    try {
        try {
            imageData = context.getImageData(top_x, top_y, width, height);
        } catch(e) {
            throw new Error("unable to access local image data: " + e);
            return;
        }
    } catch(e) {
        throw new Error("unable to access image data: " + e);
    }

    return imageData;
}

function processCanvasRGBA(canvas, top_x, top_y, width, height, radius)
{
    if (isNaN(radius) || radius < 1) return;
    radius |= 0;

    var imageData = getImageDataFromCanvas(canvas, top_x, top_y, width, height);

    imageData = processImageDataRGBA(imageData, top_x, top_y, width, height, radius);

    canvas.getContext('2d').putImageData(imageData, top_x, top_y);
}

function processImageDataRGBA(imageData, top_x, top_y, width, height, radius)
{
    var pixels = imageData.data;

    var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum,
        r_out_sum, g_out_sum, b_out_sum, a_out_sum,
        r_in_sum, g_in_sum, b_in_sum, a_in_sum,
        pr, pg, pb, pa, rbs;

    var div = radius + radius + 1;
    var widthMinus1  = width - 1;
    var heightMinus1 = height - 1;
    var radiusPlus1  = radius + 1;
    var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

    var stackStart = new BlurStack();
    var stack = stackStart;
    for (i = 1; i < div; i++)
    {
        stack = stack.next = new BlurStack();
        if (i == radiusPlus1) var stackEnd = stack;
    }
    stack.next = stackStart;
    var stackIn = null;
    var stackOut = null;

    yw = yi = 0;

    var mul_sum = mul_table[radius];
    var shg_sum = shg_table[radius];

    for (y = 0; y < height; y++)
    {
        r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;

        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi+1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi+2]);
        a_out_sum = radiusPlus1 * (pa = pixels[yi+3]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;
        a_sum += sumFactor * pa;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++)
        {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack.a = pa;
            stack = stack.next;
        }

        for (i = 1; i < radiusPlus1; i++)
        {
            p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
            r_sum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = (pg = pixels[p+1])) * rbs;
            b_sum += (stack.b = (pb = pixels[p+2])) * rbs;
            a_sum += (stack.a = (pa = pixels[p+3])) * rbs;

            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;
            a_in_sum += pa;

            stack = stack.next;
        }


        stackIn = stackStart;
        stackOut = stackEnd;
        for (x = 0; x < width; x++)
        {
            pixels[yi+3] = pa = (a_sum * mul_sum) >> shg_sum;
            if (pa != 0)
            {
                pa = 255 / pa;
                pixels[yi]   = ((r_sum * mul_sum) >> shg_sum) * pa;
                pixels[yi+1] = ((g_sum * mul_sum) >> shg_sum) * pa;
                pixels[yi+2] = ((b_sum * mul_sum) >> shg_sum) * pa;
            } else {
                pixels[yi] = pixels[yi+1] = pixels[yi+2] = 0;
            }

            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;
            a_sum -= a_out_sum;

            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;
            a_out_sum -= stackIn.a;

            p =  (yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;

            r_in_sum += (stackIn.r = pixels[p]);
            g_in_sum += (stackIn.g = pixels[p+1]);
            b_in_sum += (stackIn.b = pixels[p+2]);
            a_in_sum += (stackIn.a = pixels[p+3]);

            r_sum += r_in_sum;
            g_sum += g_in_sum;
            b_sum += b_in_sum;
            a_sum += a_in_sum;

            stackIn = stackIn.next;

            r_out_sum += (pr = stackOut.r);
            g_out_sum += (pg = stackOut.g);
            b_out_sum += (pb = stackOut.b);
            a_out_sum += (pa = stackOut.a);

            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;
            a_in_sum -= pa;

            stackOut = stackOut.next;

            yi += 4;
        }
        yw += width;
    }


    for (x = 0; x < width; x++)
    {
        g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;

        yi = x << 2;
        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi+1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi+2]);
        a_out_sum = radiusPlus1 * (pa = pixels[yi+3]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;
        a_sum += sumFactor * pa;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++)
        {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack.a = pa;
            stack = stack.next;
        }

        yp = width;

        for (i = 1; i <= radius; i++)
        {
            yi = (yp + x) << 2;

            r_sum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = (pg = pixels[yi+1])) * rbs;
            b_sum += (stack.b = (pb = pixels[yi+2])) * rbs;
            a_sum += (stack.a = (pa = pixels[yi+3])) * rbs;

            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;
            a_in_sum += pa;

            stack = stack.next;

            if(i < heightMinus1)
            {
                yp += width;
            }
        }

        yi = x;
        stackIn = stackStart;
        stackOut = stackEnd;
        for (y = 0; y < height; y++)
        {
            p = yi << 2;
            pixels[p+3] = pa = (a_sum * mul_sum) >> shg_sum;
            if (pa > 0)
            {
                pa = 255 / pa;
                pixels[p]   = ((r_sum * mul_sum) >> shg_sum) * pa;
                pixels[p+1] = ((g_sum * mul_sum) >> shg_sum) * pa;
                pixels[p+2] = ((b_sum * mul_sum) >> shg_sum) * pa;
            } else {
                pixels[p] = pixels[p+1] = pixels[p+2] = 0;
            }

            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;
            a_sum -= a_out_sum;

            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;
            a_out_sum -= stackIn.a;

            p = (x + (((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width)) << 2;

            r_sum += (r_in_sum += (stackIn.r = pixels[p]));
            g_sum += (g_in_sum += (stackIn.g = pixels[p+1]));
            b_sum += (b_in_sum += (stackIn.b = pixels[p+2]));
            a_sum += (a_in_sum += (stackIn.a = pixels[p+3]));

            stackIn = stackIn.next;

            r_out_sum += (pr = stackOut.r);
            g_out_sum += (pg = stackOut.g);
            b_out_sum += (pb = stackOut.b);
            a_out_sum += (pa = stackOut.a);

            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;
            a_in_sum -= pa;

            stackOut = stackOut.next;

            yi += width;
        }
    }
    return imageData;
}

function processCanvasRGB(canvas, top_x, top_y, width, height, radius)
{
    if (isNaN(radius) || radius < 1) return;
    radius |= 0;

    var imageData = getImageDataFromCanvas(canvas, top_x, top_y, width, height);
    imageData = processImageDataRGB(imageData, top_x, top_y, width, height, radius);

    canvas.getContext('2d').putImageData(imageData, top_x, top_y);
}

function processImageDataRGB(imageData, top_x, top_y, width, height, radius)
{
    var pixels = imageData.data;

    var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum,
        r_out_sum, g_out_sum, b_out_sum,
        r_in_sum, g_in_sum, b_in_sum,
        pr, pg, pb, rbs;

    var div = radius + radius + 1;
    var widthMinus1  = width - 1;
    var heightMinus1 = height - 1;
    var radiusPlus1  = radius + 1;
    var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

    var stackStart = new BlurStack();
    var stack = stackStart;
    for (i = 1; i < div; i++)
    {
        stack = stack.next = new BlurStack();
        if (i == radiusPlus1) var stackEnd = stack;
    }
    stack.next = stackStart;
    var stackIn = null;
    var stackOut = null;

    yw = yi = 0;

    var mul_sum = mul_table[radius];
    var shg_sum = shg_table[radius];

    for (y = 0; y < height; y++)
    {
        r_in_sum = g_in_sum = b_in_sum = r_sum = g_sum = b_sum = 0;

        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi+1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi+2]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++)
        {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack = stack.next;
        }

        for (i = 1; i < radiusPlus1; i++)
        {
            p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
            r_sum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = (pg = pixels[p+1])) * rbs;
            b_sum += (stack.b = (pb = pixels[p+2])) * rbs;

            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;

            stack = stack.next;
        }


        stackIn = stackStart;
        stackOut = stackEnd;
        for (x = 0; x < width; x++)
        {
            pixels[yi]   = (r_sum * mul_sum) >> shg_sum;
            pixels[yi+1] = (g_sum * mul_sum) >> shg_sum;
            pixels[yi+2] = (b_sum * mul_sum) >> shg_sum;

            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;

            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;

            p =  (yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;

            r_in_sum += (stackIn.r = pixels[p]);
            g_in_sum += (stackIn.g = pixels[p+1]);
            b_in_sum += (stackIn.b = pixels[p+2]);

            r_sum += r_in_sum;
            g_sum += g_in_sum;
            b_sum += b_in_sum;

            stackIn = stackIn.next;

            r_out_sum += (pr = stackOut.r);
            g_out_sum += (pg = stackOut.g);
            b_out_sum += (pb = stackOut.b);

            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;

            stackOut = stackOut.next;

            yi += 4;
        }
        yw += width;
    }


    for (x = 0; x < width; x++)
    {
        g_in_sum = b_in_sum = r_in_sum = g_sum = b_sum = r_sum = 0;

        yi = x << 2;
        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi+1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi+2]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++)
        {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack = stack.next;
        }

        yp = width;

        for (i = 1; i <= radius; i++)
        {
            yi = (yp + x) << 2;

            r_sum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = (pg = pixels[yi+1])) * rbs;
            b_sum += (stack.b = (pb = pixels[yi+2])) * rbs;

            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;

            stack = stack.next;

            if(i < heightMinus1)
            {
                yp += width;
            }
        }

        yi = x;
        stackIn = stackStart;
        stackOut = stackEnd;
        for (y = 0; y < height; y++)
        {
            p = yi << 2;
            pixels[p]   = (r_sum * mul_sum) >> shg_sum;
            pixels[p+1] = (g_sum * mul_sum) >> shg_sum;
            pixels[p+2] = (b_sum * mul_sum) >> shg_sum;

            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;

            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;

            p = (x + (((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width)) << 2;

            r_sum += (r_in_sum += (stackIn.r = pixels[p]));
            g_sum += (g_in_sum += (stackIn.g = pixels[p+1]));
            b_sum += (b_in_sum += (stackIn.b = pixels[p+2]));

            stackIn = stackIn.next;

            r_out_sum += (pr = stackOut.r);
            g_out_sum += (pg = stackOut.g);
            b_out_sum += (pb = stackOut.b);

            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;

            stackOut = stackOut.next;

            yi += width;
        }
    }

    return imageData;
}

function BlurStack()
{
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
    this.next = null;
}

var stackblur = {
    image: processImage,
    canvasRGBA: processCanvasRGBA,
    canvasRGB: processCanvasRGB,
    imageDataRGBA: processImageDataRGBA,
    imageDataRGB: processImageDataRGB
};

var generateAcrylicTexture_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


function generateAcrylicTexture(image, tintColor, tintOpacity, blurSize, noiseSize, noiseOpacity, callback) {
    if (tintColor === void 0) { tintColor = "#fff"; }
    if (tintOpacity === void 0) { tintOpacity = 0.4; }
    if (blurSize === void 0) { blurSize = 24; }
    if (noiseSize === void 0) { noiseSize = 1; }
    if (noiseOpacity === void 0) { noiseOpacity = 0.2; }
    if (callback === void 0) { callback = function (image) { }; }
    if (!image)
        return "none";
    var id = "react-uwp-AcrylicTexture-" + tintColor + "-" + tintOpacity;
    var canvas = document.getElementById(id);
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = id;
        document.body.appendChild(canvas);
    }
    canvas.style.display = "none";
    var context = canvas.getContext("2d");
    var imageNode = new Image();
    imageNode.crossOrigin = "Anonymous";
    imageNode.onload = function () {
        var naturalWidth = imageNode.naturalWidth, naturalHeight = imageNode.naturalHeight;
        if (naturalWidth > 1000) {
            naturalHeight = naturalHeight / naturalWidth * 1000;
            naturalWidth = 1000;
        }
        if (naturalHeight > 1000) {
            naturalWidth = naturalWidth / naturalHeight * 1000;
            naturalHeight = 1000;
        }
        canvas.width = naturalWidth;
        canvas.height = naturalHeight;
        context.drawImage(imageNode, 0, 0, naturalWidth, naturalHeight);
        stackblur.canvasRGBA(canvas, 0, 0, naturalWidth, naturalHeight, blurSize);
        context.fillStyle = tinycolor(tintColor).setAlpha(tintOpacity).toRgbString();
        context.fillRect(0, 0, naturalWidth, naturalHeight);
        // const noiseWidth = 40;
        // const noiseHeight = 40;
        // const noiseImageDate = generateNoise(canvas, context, noiseWidth, noiseHeight, noiseSize, noiseOpacity);
        if (HTMLCanvasElement.prototype.toBlob) {
            canvas.toBlob(function (blob) {
                var url = URL.createObjectURL(blob);
                callback(url);
            });
        }
        else if (HTMLCanvasElement.prototype.msToBlob) {
            var blob = canvas.msToBlob();
            var url = URL.createObjectURL(blob);
            callback(url);
        }
        else {
            callback(canvas.toDataURL("image/jpg"));
        }
    };
    imageNode.src = image;
}
exports.default = generateAcrylicTexture;

});

unwrapExports(generateAcrylicTexture_1);

var getTheme_1 = createCommonjsModule(function (module, exports) {
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });





if (!IS_NODE_ENV_1.default) {
    segoeMdl2Assets.default();
}
function darken(color, coefficient) {
    var hsl = tinycolor(color).toHsl();
    hsl.l = hsl.l * (1 - coefficient);
    return tinycolor(hsl).toRgbString();
}
exports.darken = darken;
function lighten(color, coefficient) {
    var hsl = tinycolor(color).toHsl();
    hsl.l = hsl.l + (100 - hsl.l) * coefficient;
    return tinycolor(hsl).toRgbString();
}
exports.lighten = lighten;
function getTheme(themeConfig) {
    themeConfig = themeConfig || {};
    var themeName = themeConfig.themeName, accent = themeConfig.accent, useFluentDesign = themeConfig.useFluentDesign, desktopBackgroundImage = themeConfig.desktopBackgroundImage, userAgent = themeConfig.userAgent, useInlineStyle = themeConfig.useInlineStyle;
    themeName = themeName || "dark";
    accent = accent || "#0078D7";
    useFluentDesign = useFluentDesign === void 0 ? false : useFluentDesign;
    var isDark = themeName === "dark";
    var baseHigh = isDark ? "#fff" : "#000";
    var altHigh = isDark ? "#000" : "#fff";
    var baseHighColor = tinycolor(baseHigh);
    var altHighColor = tinycolor(altHigh);
    var accentColor = tinycolor(accent);
    var accentColorHsl = accentColor.toHsl();
    var altMediumLow = altHighColor.setAlpha(0.4).toRgbString();
    var altMedium = altHighColor.setAlpha(0.6).toRgbString();
    var altMediumHigh = altHighColor.setAlpha(0.8).toRgbString();
    var theme = {
        themeName: themeName,
        fonts: {
            sansSerifFonts: "Segoe UI, Microsoft YaHei, Open Sans, sans-serif, Hiragino Sans GB, Arial, Lantinghei SC, STHeiti, WenQuanYi Micro Hei, SimSun",
            segoeMDL2Assets: "Segoe MDL2 Assets"
        },
        useInlineStyle: Boolean(useInlineStyle),
        styleManager: void 0,
        useFluentDesign: useFluentDesign,
        desktopBackground: void 0,
        desktopBackgroundImage: desktopBackgroundImage,
        haveAcrylicTextures: false,
        acrylicTexture40: {
            background: altMediumLow
        },
        acrylicTexture60: {
            background: altMedium
        },
        acrylicTexture80: {
            background: altMediumHigh
        },
        scrollReveals: [],
        scrollRevealListener: void 0,
        accent: accent,
        accentLighter1: lighten(accentColor.toHexString(), 0.5),
        accentLighter2: lighten(accentColor.toHexString(), 0.7),
        accentLighter3: lighten(accentColor.toHexString(), 0.9),
        accentDarker1: darken(accentColor.toHexString(), 0.5),
        accentDarker2: darken(accentColor.toHexString(), 0.7),
        accentDarker3: darken(accentColor.toHexString(), 0.9),
        baseLow: baseHighColor.setAlpha(0.2).toRgbString(),
        baseMediumLow: baseHighColor.setAlpha(0.4).toRgbString(),
        baseMedium: baseHighColor.setAlpha(0.6).toRgbString(),
        baseMediumHigh: baseHighColor.setAlpha(0.8).toRgbString(),
        baseHigh: baseHigh,
        altLow: altHighColor.setAlpha(0.2).toRgbString(),
        altMediumLow: altMediumLow,
        altMedium: altMedium,
        altMediumHigh: altMediumHigh,
        altHigh: altHigh,
        listLow: baseHighColor.setAlpha(0.1).toRgbString(),
        listMedium: baseHighColor.setAlpha(0.2).toRgbString(),
        listAccentLow: accentColor.setAlpha(0.6).toRgbString(),
        listAccentMedium: accentColor.setAlpha(0.8).toRgbString(),
        listAccentHigh: accentColor.setAlpha(0.9).toRgbString(),
        chromeLow: isDark ? "#171717" : "#f2f2f2",
        chromeMediumLow: isDark ? "#2b2b2b" : "#f2f2f2",
        chromeMedium: isDark ? "#1f1f1f" : "#e6e6e6",
        chromeHigh: isDark ? "#767676" : "#ccc",
        chromeAltLow: isDark ? "#f2f2f2" : "#171717",
        chromeDisabledLow: isDark ? "#858585" : "#7a7a7a",
        chromeDisabledHigh: isDark ? "#333" : "#ccc",
        chromeBlackLow: tinycolor("#000").setAlpha(0.2).toRgbString(),
        chromeBlackMediumLow: tinycolor("#000").setAlpha(0.4).toRgbString(),
        chromeBlackMedium: tinycolor("#000").setAlpha(0.8).toRgbString(),
        chromeBlackHigh: "#000",
        chromeWhite: "#fff",
        isDarkTheme: isDark,
        prefixStyle: prefixAll_1.default(userAgent),
        prepareStyle: function (config, callback) {
            if (!this.styleManager)
                return;
            var extendsClassName = config.extendsClassName, managerConfig = __rest(config, ["extendsClassName"]);
            if (this.useInlineStyle) {
                managerConfig.className += extendsClassName ? " " + extendsClassName : "";
                return managerConfig;
            }
            else {
                var styleClasses = this.styleManager.setStyleToManager(managerConfig, callback);
                styleClasses.className += extendsClassName ? " " + extendsClassName : "";
                return styleClasses;
            }
        },
        prepareStyles: function (config, callback) {
            if (!this.styleManager)
                return;
            if (this.useInlineStyle) {
                var styles = config.styles;
                var result = {};
                for (var key in styles) {
                    result[key] = { style: styles[key] };
                }
                return result;
            }
            else {
                var styleClasses = this.styleManager.setStylesToManager(config, callback);
                return styleClasses;
            }
        },
        classNames: function () {
            var classNames = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                classNames[_i] = arguments[_i];
            }
            return classNames.reduce(function (prev, curr) { return (prev || "") + (curr ? " " + curr : ""); });
        },
        generateAcrylicTextures: function (currTheme, themeCallback) {
            var _this = this;
            this.acrylicTextureCount = 0;
            var baseConfig = {
                blurSize: 24,
                noiseSize: 1,
                noiseOpacity: 0.2
            };
            var callback = function (image, key) {
                if (key === 4) {
                    _this.acrylicTextureCount += 1;
                    Object.assign(currTheme.acrylicTexture40, __assign({ tintColor: currTheme.chromeMediumLow, tintOpacity: 0.4, background: "url(" + image + ") no-repeat fixed top left / cover" }, baseConfig));
                }
                if (key === 6) {
                    _this.acrylicTextureCount += 1;
                    Object.assign(currTheme.acrylicTexture60, __assign({ tintColor: currTheme.chromeLow, tintOpacity: 0.6, background: "url(" + image + ") no-repeat fixed top left / cover" }, baseConfig));
                }
                if (key === 8) {
                    _this.acrylicTextureCount += 1;
                    Object.assign(currTheme.acrylicTexture80, __assign({ tintColor: currTheme.chromeLow, tintOpacity: 0.8, background: "url(" + image + ") no-repeat fixed top left / cover" }, baseConfig));
                }
                if (_this.acrylicTextureCount === 3) {
                    currTheme.haveAcrylicTextures = true;
                    if (themeCallback)
                        themeCallback(currTheme);
                    if (_this.generateAcrylicTextures.callback) {
                        _this.generateAcrylicTextures.callback(currTheme);
                    }
                    return currTheme;
                }
            };
            generateAcrylicTexture_1.default(currTheme.desktopBackgroundImage, currTheme.chromeMediumLow, 0.4, void 0, void 0, void 0, function (image) { return callback(image, 4); });
            generateAcrylicTexture_1.default(currTheme.desktopBackgroundImage, currTheme.chromeLow, 0.6, void 0, void 0, void 0, function (image) { return callback(image, 6); });
            generateAcrylicTexture_1.default(currTheme.desktopBackgroundImage, currTheme.chromeLow, 0.8, void 0, void 0, void 0, function (image) { return callback(image, 8); });
        },
        toasts: [],
        typographyStyles: {
            header: {
                fontWeight: "lighter",
                fontSize: 46,
                lineHeight: "56px"
            },
            subHeader: {
                fontWeight: "lighter",
                fontSize: 34,
                lineHeight: "40px"
            },
            title: {
                fontWeight: "lighter",
                fontSize: 24,
                lineHeight: "28px"
            },
            subTitle: {
                fontWeight: "normal",
                fontSize: 20,
                lineHeight: "24px"
            },
            subTitleAlt: {
                fontWeight: "normal",
                fontSize: 18,
                lineHeight: "20px"
            },
            base: {
                fontWeight: 300,
                fontSize: 15,
                lineHeight: "20px"
            },
            baseAlt: {
                fontWeight: "bold",
                fontSize: 15,
                lineHeight: "20px"
            },
            body: {
                fontWeight: 200,
                fontSize: 15,
                lineHeight: "20px"
            },
            captionAlt: {
                fontWeight: "lighter",
                fontSize: 13,
                lineHeight: "16px"
            },
            caption: {
                fontWeight: "lighter",
                fontSize: 12,
                lineHeight: "14px"
            }
        },
        zIndex: {
            listView: 10,
            calendarView: 20,
            dropDownMenu: 102,
            commandBar: 200,
            tooltip: 201,
            flyout: 202,
            contentDialog: 300,
            header: 301,
            mediaPlayer: 2147483647,
            toast: 310
        }
    };
    return theme;
}
exports.default = getTheme;

});

unwrapExports(getTheme_1);
var getTheme_2 = getTheme_1.darken;
var getTheme_3 = getTheme_1.lighten;

var darkTheme_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

var darkTheme = getTheme_1.default({ themeName: "dark" });
exports.default = darkTheme;

});

unwrapExports(darkTheme_1);

var RenderToBody_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });



var RenderToBody = /** @class */ (function (_super) {
    __extends(RenderToBody, _super);
    function RenderToBody() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rootElm = IS_NODE_ENV_1.default ? null : document.createElement("div");
        _this.renderComponent = function () {
            var children = _this.props.children;
            if (children) {
                reactDom.unstable_renderSubtreeIntoContainer(_this, children, _this.rootElm);
            }
        };
        _this.unRenderComponent = function () {
            if (!_this.rootElm)
                return;
            reactDom.unmountComponentAtNode(_this.rootElm);
        };
        _this.getRootElement = function () { return _this.rootElm; };
        return _this;
    }
    RenderToBody.prototype.componentDidMount = function () {
        if (IS_NODE_ENV_1.default)
            this.rootElm = document.createElement("div");
        var _a = this.props, style = _a.style, className = _a.className;
        Object.assign(this.rootElm.style, style);
        if (className)
            this.rootElm.setAttribute("class", className);
        document.body.appendChild(this.rootElm);
        this.renderComponent();
    };
    RenderToBody.prototype.componentDidUpdate = function () {
        this.renderComponent();
        var _a = this.props, style = _a.style, className = _a.className;
        Object.assign(this.rootElm.style, style);
        if (className)
            this.rootElm.setAttribute("class", className);
    };
    RenderToBody.prototype.componentWillUnmount = function () {
        if (this.props.children) {
            this.unRenderComponent();
        }
        document.body.removeChild(this.rootElm);
        this.rootElm = null;
    };
    RenderToBody.prototype.render = function () {
        return null;
    };
    return RenderToBody;
}(react.Component));
exports.default = RenderToBody;

});

unwrapExports(RenderToBody_1);

var ToastWrapper_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });


var ToastWrapper = /** @class */ (function (_super) {
    __extends(ToastWrapper, _super);
    function ToastWrapper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            toasts: []
        };
        _this.addToast = function (toast) {
            var theme = _this.context.theme;
            var toasts = _this.state.toasts;
            var key = theme.toasts.length;
            theme.toasts.push(react.cloneElement(toast, { key: key }));
            _this.setState({ toasts: theme.toasts });
        };
        _this.updateToast = function (toastId, toast) {
            var theme = _this.context.theme;
            theme.toasts[toastId] = react.cloneElement(toast, { key: toastId });
            _this.setState({ toasts: theme.toasts });
        };
        return _this;
    }
    ToastWrapper.prototype.render = function () {
        var _a = this.props, style = _a.style, className = _a.className, attributes = __rest(_a, ["style", "className"]);
        var toasts = this.state.toasts;
        var theme = this.context.theme;
        var rootStyleClasses = theme.prepareStyle({
            className: "toast-wrapper",
            style: theme.prefixStyle(__assign({ top: 0, right: 0, height: "100%", width: 360, padding: "10px 4px", position: "fixed", display: "flex", flexDirection: "column-reverse", alignItems: "flex-end", justifyContent: "flex-start", pointerEvents: "none", overflowY: "auto", overflowX: "hidden", zIndex: theme.zIndex.toast }, style)),
            extendsClassName: className
        });
        return (toasts && toasts.length > 0 && (react.createElement("div", __assign({}, attributes, rootStyleClasses), toasts)));
    };
    ToastWrapper.contextTypes = { theme: propTypes.object };
    return ToastWrapper;
}(react.Component));
exports.ToastWrapper = ToastWrapper;
exports.default = ToastWrapper;

});

unwrapExports(ToastWrapper_1);
var ToastWrapper_2 = ToastWrapper_1.ToastWrapper;

var getBaseCSSText = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
function getBaseCSS(theme, themeClassName, scrollBarStyleSelector) {
    if (themeClassName === void 0) { themeClassName = "uwp-base"; }
    if (scrollBarStyleSelector === void 0) { scrollBarStyleSelector = "*"; }
    return "* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\n." + themeClassName + " * {\n  font-family: " + theme.fonts.sansSerifFonts.split(", ").map(function (font) { return "\"" + font + "\""; }).join(", ") + ";\n}\n\nbody {\n  margin: 0;\n}\n\n" + scrollBarStyleSelector + "::-webkit-scrollbar-track {\n  background-color: " + theme.chromeLow + ";\n}\n\n" + scrollBarStyleSelector + "::-webkit-scrollbar-thumb {\n  background-color: " + (theme.useFluentDesign ? theme.baseLow : theme.baseMediumLow) + ";\n}\n\n" + scrollBarStyleSelector + "::-webkit-scrollbar:vertical {\n  width: 6px;\n}\n\n" + scrollBarStyleSelector + "::-webkit-scrollbar:horizontal {\n  height: 6px\n}\n\n" + scrollBarStyleSelector + "::-webkit-scrollbar {\n  -webkit-appearance: none\n}\n\n." + themeClassName + " *:after, ." + themeClassName + " *:before {\n  box-sizing: border-box;\n}\n\n." + themeClassName + " {\n  -webkit-text-size-adjust: none;\n  -webkit-font-smoothing: antialiased;\n  text-rendering: optimizeLegibility;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n." + themeClassName + " input, ." + themeClassName + " textarea {\n  box-shadow: none;\n  border-radius: none;\n}\n";
}
exports.default = getBaseCSS;

});

unwrapExports(getBaseCSSText);

var Theme_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });





exports.getTheme = getTheme_1.default;





var customLocalStorageName = "__REACT_UWP__";
var baseClassName = "react-uwp-theme";
var themeCallback = function () { };
var Theme = /** @class */ (function (_super) {
    __extends(Theme, _super);
    function Theme() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.acrylicTextureCount = 0;
        _this.themeClassName = "react-uwp-theme-dark";
        _this.prevStyleManager = null;
        _this.getDefaultTheme = function () {
            var _a = _this.props, theme = _a.theme, autoSaveTheme = _a.autoSaveTheme;
            if (!IS_NODE_ENV_1.default && autoSaveTheme && !theme) {
                theme = _this.getLocalStorageTheme();
            }
            else {
                theme = theme || darkTheme_1.default;
            }
            return theme;
        };
        _this.getLocalStorageTheme = function () {
            var themeConfig = {};
            var theme = _this.props.theme;
            if (theme) {
                Object.assign(themeConfig, {
                    themeName: theme.themeName,
                    accent: theme.accent,
                    useFluentDesign: theme.useFluentDesign,
                    desktopBackgroundImage: theme.desktopBackgroundImage
                });
            }
            var storageString = localStorage.getItem(customLocalStorageName);
            if (storageString) {
                var data = {};
                try {
                    data = JSON.parse(storageString);
                    var themeName = data.themeName, accent = data.accent, useFluentDesign = data.useFluentDesign, desktopBackgroundImage = data.desktopBackgroundImage;
                    theme = getTheme_1.default({
                        themeName: themeName === void 0 ? themeConfig.themeName : themeName,
                        accent: accent === void 0 ? themeConfig.accent : accent,
                        useFluentDesign: useFluentDesign === void 0 ? themeConfig.useFluentDesign : useFluentDesign,
                        desktopBackgroundImage: desktopBackgroundImage === void 0 ? themeConfig.desktopBackgroundImage : desktopBackgroundImage
                    });
                }
                catch (error) {
                    theme = _this.props.theme || darkTheme_1.default;
                }
            }
            else {
                theme = _this.props.theme || darkTheme_1.default;
            }
            return theme;
        };
        _this.bindNewThemeMethods = function (theme) {
            var scrollBarStyleSelector = _this.props.scrollBarStyleSelector;
            var styleManager = new StyleManager_1.default({ theme: theme });
            styleManager.addCSSTextWithUpdate(getBaseCSSText.default(theme, "uwp-base", scrollBarStyleSelector));
            Object.assign(theme, {
                desktopBackground: "url(" + theme.desktopBackgroundImage + ") no-repeat fixed top left / cover",
                updateTheme: _this.updateTheme,
                saveTheme: _this.saveTheme,
                addToast: _this.addToast,
                updateToast: _this.updateToast,
                deleteToast: _this.deleteToast,
                scrollRevealListener: _this.handleScrollReveal,
                forceUpdateTheme: _this.forceUpdateTheme,
                styleManager: styleManager
            });
        };
        _this.handleNewTheme = function (theme) {
            _this.props.themeWillUpdate(theme);
        };
        _this.state = {
            currTheme: (function () {
                var theme = _this.getDefaultTheme();
                _this.handleNewTheme(theme);
                return theme;
            })()
        };
        _this.getChildContext = function () {
            return { theme: _this.state.currTheme };
        };
        _this.updateTheme = function (newTheme, callback) {
            if (callback === void 0) { callback = themeCallback; }
            var needGenerateAcrylic = _this.sureNeedGenerateAcrylic(newTheme);
            _this.handleNewTheme(newTheme);
            _this.setState({
                currTheme: newTheme
            }, function () {
                callback(newTheme);
                if (needGenerateAcrylic) {
                    _this.handleNewTheme(newTheme);
                    newTheme.generateAcrylicTextures(newTheme, function (currTheme) { return _this.setState({ currTheme: currTheme }); });
                }
            });
        };
        _this.forceUpdateTheme = function (currTheme) { return _this.setState({ currTheme: currTheme }); };
        _this.saveTheme = function (newTheme, callback) {
            if (callback === void 0) { callback = themeCallback; }
            localStorage.setItem(customLocalStorageName, JSON.stringify({
                themeName: newTheme.themeName,
                accent: newTheme.accent,
                useFluentDesign: newTheme.useFluentDesign,
                desktopBackgroundImage: newTheme.desktopBackgroundImage
            }));
            var needGenerateAcrylic = _this.sureNeedGenerateAcrylic(newTheme);
            _this.handleNewTheme(newTheme);
            _this.setState({
                currTheme: newTheme
            }, function () {
                callback(newTheme);
                if (needGenerateAcrylic) {
                    _this.handleNewTheme(newTheme);
                    newTheme.generateAcrylicTextures(newTheme, function (currTheme) { return _this.setState({ currTheme: currTheme }); });
                }
            });
        };
        _this.sureNeedGenerateAcrylic = function (newTheme) {
            var currTheme = _this.state.currTheme;
            var needGenerateAcrylic = newTheme.desktopBackgroundImage && _this.props.needGenerateAcrylic;
            if (needGenerateAcrylic &&
                newTheme.desktopBackgroundImage === currTheme.desktopBackgroundImage) {
                if (currTheme.useFluentDesign) {
                    Object.assign(currTheme.isDarkTheme ? _this.cacheDarkAcrylicTextures : _this.cacheLightAcrylicTextures, {
                        acrylicTexture40: currTheme.acrylicTexture40,
                        acrylicTexture60: currTheme.acrylicTexture60,
                        acrylicTexture80: currTheme.acrylicTexture80
                    });
                    needGenerateAcrylic = false;
                }
                if (newTheme.useFluentDesign) {
                    if (newTheme.isDarkTheme && _this.cacheDarkAcrylicTextures.acrylicTexture40 || (!newTheme.isDarkTheme && _this.cacheLightAcrylicTextures.acrylicTexture40)) {
                        Object.assign(newTheme, newTheme.isDarkTheme ? _this.cacheDarkAcrylicTextures : _this.cacheLightAcrylicTextures);
                        needGenerateAcrylic = false;
                    }
                    else {
                        needGenerateAcrylic = true;
                    }
                }
                else {
                    needGenerateAcrylic = false;
                    Object.assign(newTheme, {
                        acrylicTexture40: currTheme.acrylicTexture40,
                        acrylicTexture60: currTheme.acrylicTexture60,
                        acrylicTexture80: currTheme.acrylicTexture80
                    });
                }
            }
            needGenerateAcrylic = needGenerateAcrylic && newTheme.useFluentDesign && _this.props.needGenerateAcrylic;
            return needGenerateAcrylic;
        };
        _this.findToastNodeTimers = [];
        _this.toastId = -1;
        _this.addToast = function (toast, callback, increaseId, currToastId) {
            if (increaseId === void 0) { increaseId = true; }
            var toastId = currToastId !== void 0 ? currToastId : _this.toastId;
            if (increaseId) {
                toastId += 1;
                _this.toastId = toastId;
            }
            if (_this.toastWrapper) {
                clearTimeout(_this.findToastNodeTimers[toastId]);
                _this.toastWrapper.addToast(toast);
                if (callback)
                    callback(toastId);
            }
            else {
                _this.findToastNodeTimers[toastId] = setTimeout(function () {
                    _this.addToast(toast, callback, false, toastId);
                }, 100);
            }
        };
        _this.updateToast = function (toastId, toast) {
            if (_this.toastWrapper)
                _this.toastWrapper.updateToast(toastId, toast);
        };
        _this.deleteToast = function (toastId) {
            _this.state.currTheme.toasts[toastId] = void 0;
        };
        _this.handleScrollReveal = function (e) {
            var currTheme = _this.state.currTheme;
            for (var _i = 0, _a = currTheme.scrollReveals; _i < _a.length; _i++) {
                var scrollReveal = _a[_i];
                var rootElm = scrollReveal.rootElm, animated = scrollReveal.animated, setEnterStyle = scrollReveal.setEnterStyle, setLeaveStyle = scrollReveal.setLeaveStyle, _b = scrollReveal.props, topOffset = _b.topOffset, bottomOffset = _b.bottomOffset;
                if (!rootElm)
                    return;
                var _c = rootElm.getBoundingClientRect(), top_1 = _c.top, height = _c.height;
                var innerHeight_1 = window.innerHeight;
                var isIn = false;
                if (height > innerHeight_1) {
                    isIn = top_1 < innerHeight_1 - height * height && top_1 > -height * 0.5;
                }
                else {
                    isIn = top_1 > 0 + topOffset && top_1 + height + bottomOffset < innerHeight_1;
                }
                if (isIn) {
                    if (!animated) {
                        setEnterStyle();
                        scrollReveal.animated = true;
                    }
                }
                else {
                    if (animated) {
                        setLeaveStyle();
                        scrollReveal.animated = false;
                    }
                }
            }
        };
        _this.cleanLocalStorage = function () {
            localStorage.setItem(customLocalStorageName, "");
        };
        return _this;
    }
    Theme.prototype.componentDidMount = function () {
        var _this = this;
        var currTheme = this.state.currTheme;
        if (IS_NODE_ENV_1.default && this.props.autoSaveTheme) {
            var currTheme_1 = this.getLocalStorageTheme();
            this.props.themeWillUpdate(currTheme_1);
            this.setState({ currTheme: currTheme_1 });
        }
        if (IS_NODE_ENV_1.default)
            segoeMdl2Assets.setSegoeMDL2AssetsFonts();
        if (currTheme.useFluentDesign && currTheme.desktopBackgroundImage && this.props.needGenerateAcrylic) {
            this.handleNewTheme(currTheme);
            currTheme.generateAcrylicTextures(currTheme, function (currTheme) { return _this.setState({ currTheme: currTheme }); });
        }
        window.addEventListener("scroll", this.handleScrollReveal);
    };
    Theme.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        var theme = nextProps.theme;
        var currTheme = this.state.currTheme;
        var needGenerateAcrylic = this.sureNeedGenerateAcrylic(theme);
        if (nextProps && nextProps.theme && !this.props.autoSaveTheme) {
            if (theme.accent !== currTheme.accent ||
                theme.themeName !== currTheme.themeName ||
                theme.useFluentDesign !== currTheme.useFluentDesign ||
                theme.desktopBackgroundImage !== currTheme.desktopBackgroundImage) {
                this.handleNewTheme(theme);
                this.setState({
                    currTheme: theme
                }, function () {
                    if (needGenerateAcrylic) {
                        _this.handleNewTheme(theme);
                        theme.generateAcrylicTextures(theme, function (currTheme) { return _this.setState({ currTheme: currTheme }); });
                    }
                });
            }
        }
    };
    Theme.prototype.componentWillUpdate = function (nextProps, nextState) {
        this.prevStyleManager = this.state.currTheme.styleManager;
    };
    Theme.prototype.componentDidUpdate = function () {
        this.prevStyleManager.cleanStyleSheet();
        this.prevStyleManager = null;
    };
    Theme.prototype.componentWillUnmount = function () {
        var _a = this.state.currTheme, acrylicTexture40 = _a.acrylicTexture40, acrylicTexture60 = _a.acrylicTexture60, acrylicTexture80 = _a.acrylicTexture80;
        URL.revokeObjectURL(acrylicTexture40.background);
        URL.revokeObjectURL(acrylicTexture60.background);
        URL.revokeObjectURL(acrylicTexture80.background);
        this.state.currTheme.styleManager.cleanStyleSheet();
        window.removeEventListener("scroll", this.handleScrollReveal);
    };
    Theme.prototype.render = function () {
        var _this = this;
        var _a = this.props, autoSaveTheme = _a.autoSaveTheme, theme = _a.theme, onGeneratedAcrylic = _a.onGeneratedAcrylic, children = _a.children, style = _a.style, className = _a.className, needGenerateAcrylic = _a.needGenerateAcrylic, themeWillUpdate = _a.themeWillUpdate, scrollBarStyleSelector = _a.scrollBarStyleSelector, attributes = __rest(_a, ["autoSaveTheme", "theme", "onGeneratedAcrylic", "children", "style", "className", "needGenerateAcrylic", "themeWillUpdate", "scrollBarStyleSelector"]);
        var currTheme = this.state.currTheme;
        this.themeClassName = baseClassName + "-" + currTheme.themeName;
        this.bindNewThemeMethods(currTheme);
        var rootStyle = darkTheme_1.default.prefixStyle(__assign({ fontSize: 14, fontFamily: currTheme.fonts.sansSerifFonts, color: currTheme.baseHigh, display: "inline-block", verticalAlign: "middle", background: currTheme.useFluentDesign ? (this.acrylicTextureCount === 3 ? "none" : (needGenerateAcrylic ? currTheme.altMediumHigh : "none")) : currTheme.altHigh, width: "100%", height: "100%" }, style));
        var backgroundStyle = {
            position: "fixed",
            zIndex: -1,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: (currTheme.useFluentDesign && currTheme.desktopBackgroundImage) ? currTheme.desktopBackground : currTheme.altHigh,
            pointerEvents: "none"
        };
        currTheme.generateAcrylicTextures.callback = function (theme) {
            if (_this.backgroundEl) {
                Object.assign(_this.backgroundEl.rootElm.style, backgroundStyle, { background: theme.desktopBackground });
            }
            if (onGeneratedAcrylic)
                onGeneratedAcrylic();
        };
        return (react.createElement("div", __assign({}, attributes, currTheme.prepareStyle({
            style: rootStyle,
            className: "theme-root",
            extendsClassName: className ? this.themeClassName + " " + className : this.themeClassName
        })),
            react.createElement(RenderToBody_1.default, __assign({ ref: function (backgroundEl) { return _this.backgroundEl = backgroundEl; } }, currTheme.prepareStyle({
                style: backgroundStyle,
                className: "fluent-background"
            }))),
            react.createElement(RenderToBody_1.default, null,
                react.createElement(ToastWrapper_1.default, { ref: function (toastWrapper) { return _this.toastWrapper = toastWrapper; } })),
            children));
    };
    Theme.defaultProps = {
        needGenerateAcrylic: true,
        onGeneratedAcrylic: themeCallback,
        themeWillUpdate: themeCallback,
        scrollBarStyleSelector: "*"
    };
    Theme.childContextTypes = {
        theme: propTypes.object
    };
    return Theme;
}(react.Component));
exports.Theme = Theme;
exports.default = Theme;

});

unwrapExports(Theme_1);
var Theme_2 = Theme_1.getTheme;
var Theme_3 = Theme_1.Theme;

function TypographySpan(props = {}) {
    return react.createElement("div", { style: Object.assign({ margin: 6 }, props) });
}
class Typography extends react.Component {
    render() {
        const child = this.props.children(this.context.theme.typographyStyles, this.context.theme);
        if (this.props.withSpan)
            return (react.createElement(react.Fragment, null,
                child,
                react.createElement(TypographySpan, Object.assign({}, (this.props.withSpan === true ? {} : { margin: this.props.withSpan })))));
        return child;
    }
}
Typography.contextTypes = { theme: propTypes.object };

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

var TextBox_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });


var emptyFunc = function () { };
var TextBox = /** @class */ (function (_super) {
    __extends(TextBox, _super);
    function TextBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.handleClick = function (e) {
            _this.setState({ hovered: false });
        };
        _this.handleHover = function (e) {
            _this.setState({ hovered: true });
            _this.handleBlur = function () { };
        };
        _this.handleUnHover = function (e) {
            _this.setState({ hovered: false });
            _this.handleBlur = function (e) {
                _this.setState({ focused: false });
                _this.props.onBlur(e);
            };
        };
        _this.handleFocus = function (e) {
            _this.setState({ focused: true });
            _this.props.onFocus(e);
        };
        _this.handleBlur = function (e) {
            _this.setState({ focused: false });
            _this.props.onBlur(e);
        };
        _this.setValue = function (value) { return _this.inputElm.value = value; };
        _this.getValue = function () { return _this.inputElm.value; };
        return _this;
    }
    TextBox.prototype.render = function () {
        var _this = this;
        var _a = this.props, hoverStyle = _a.hoverStyle, focusStyle = _a.focusStyle, leftNode = _a.leftNode, rightNode = _a.rightNode, style = _a.style, className = _a.className, textBoxStyle = _a.textBoxStyle, onChange = _a.onChange, onChangeValue = _a.onChangeValue, children = _a.children, background = _a.background, attributes = __rest(_a, ["hoverStyle", "focusStyle", "leftNode", "rightNode", "style", "className", "textBoxStyle", "onChange", "onChangeValue", "children", "background"]);
        var _b = this.state, hovered = _b.hovered, focused = _b.focused;
        var haveChild = leftNode || rightNode || children;
        var theme = this.context.theme;
        var currBackground = (background === void 0 ? theme.altHigh : background);
        var hoverProps = {
            onMouseEnter: this.handleHover,
            onMouseLeave: this.handleUnHover
        };
        var rootWrapperStyle = {
            lineHeight: "32px",
            height: 32,
            width: 296,
            padding: !haveChild ? "0 8px" : 0,
            fontSize: 14,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            color: focused ? "#000" : theme.baseHigh,
            background: focused ? "#fff" : currBackground || "none",
            boxShadow: focused ? "inset 0px 0px 0 2px " + this.context.theme.accent : hovered ? "inset 0px 0px 0 2px " + theme.baseMedium : "inset 0px 0px 0 2px " + theme.baseLow,
            border: "none",
            transition: "all .25s"
        };
        var inlineStyles = {
            root: haveChild ? theme.prefixStyle(__assign({}, rootWrapperStyle, style)) : {},
            input: theme.prefixStyle(__assign({}, (haveChild ? {
                paddingLeft: rightNode ? 8 : void 0,
                paddingRight: leftNode ? 8 : void 0,
                width: "100%",
                height: "100%",
                background: "none",
                border: "none",
                outline: "none",
                color: "inherit",
                transition: "all .25s"
            } : rootWrapperStyle), (haveChild ? void 0 : style), textBoxStyle))
        };
        var styles = theme.prepareStyles({
            className: "text-box",
            styles: inlineStyles
        });
        var normalRender = (react.createElement("input", __assign({ ref: function (inputElm) {
                _this.inputElm = inputElm;
                if (!haveChild)
                    _this.rootElm = inputElm;
            } }, attributes, { style: styles.input.style, className: theme.classNames(className, styles.input.className), onChange: function (e) {
                onChangeValue(e.currentTarget.value);
                onChange(e);
            }, onFocus: this.handleFocus, onBlur: this.handleBlur }, (haveChild ? void 0 : hoverProps))));
        return haveChild ? (react.createElement("div", __assign({ ref: function (rootElm) { return _this.rootElm = rootElm; } }, attributes, hoverProps, styles.root, { onClick: this.handleClick }),
            leftNode,
            normalRender,
            children,
            rightNode)) : normalRender;
    };
    TextBox.defaultProps = {
        background: "none",
        textBoxStyle: {
            fontSize: "inherit",
            outline: "none",
            transition: "all .25s"
        },
        onFocus: emptyFunc,
        onBlur: emptyFunc,
        onChange: emptyFunc,
        onChangeValue: emptyFunc
    };
    TextBox.contextTypes = { theme: propTypes.object };
    return TextBox;
}(react.Component));
exports.TextBox = TextBox;
exports.default = TextBox;

});

var TextBox = unwrapExports(TextBox_1);
var TextBox_2 = TextBox_1.TextBox;

var setStyleToElement_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var isUnitlessNumber = [
    "animationIterationCount",
    "borderImageOutset",
    "borderImageSlice",
    "borderImageWidth",
    "boxFlex",
    "boxFlexGroup",
    "boxOrdinalGroup",
    "columnCount",
    "flex",
    "flexGrow",
    "flexPositive",
    "flexShrink",
    "flexNegative",
    "flexOrder",
    "gridRow",
    "gridColumn",
    "fontWeight",
    "lineClamp",
    "lineHeight",
    "opacity",
    "order",
    "orphans",
    "tabSize",
    "widows",
    "zIndex",
    "zoom",
    // SVG-related properties
    "fillOpacity",
    "floodOpacity",
    "stopOpacity",
    "strokeDasharray",
    "strokeDashoffset",
    "strokeMiterlimit",
    "strokeOpacity",
    "strokeWidth"
];
function setStyleToElement(elm, style, setToCSSText) {
    if (setToCSSText === void 0) { setToCSSText = false; }
    var cssText = "";
    if (setToCSSText) {
        for (var property in style) {
            var propertyNow = [].map.call(property, function (str) { return str === str.toUpperCase() ? "-" + str.toLowerCase() : str; }).join("");
            var value = style[property];
            if (typeof value === "number" && !isUnitlessNumber.includes(property))
                value = value + "px";
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    value = value[value.length - 1];
                }
                else {
                    throw Error(propertyNow + ": " + value + " is Wrong!");
                }
            }
            cssText += propertyNow + ": " + value + ";";
        }
        elm.style.cssText = cssText;
    }
    else {
        for (var property in style) {
            var value = style[property];
            if (typeof value === "number" && !isUnitlessNumber.includes(property)) {
                style[property] = value + "px";
            }
        }
        Object.assign(elm.style, style);
    }
}
exports.default = setStyleToElement;

});

unwrapExports(setStyleToElement_1);

var ElementState_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });




var emptyFunc = function () { };
var ElementState = /** @class */ (function (_super) {
    __extends(ElementState, _super);
    function ElementState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.visitedStyle = {};
        _this.setStyle = function (style) {
            setStyleToElement_1.default(_this.rootElm, _this.context.theme.prefixStyle(__assign({}, _this.props.style, style)));
        };
        _this.hover = function () {
            var child = _this.props.children;
            _this.setStyle(_this.props.hoverStyle);
            _this.props.onMouseEnter();
            _this.props.onHover();
        };
        _this.unHover = function () {
            _this.resetStyle();
            _this.props.onMouseLeave();
            _this.props.unHover();
        };
        _this.active = function () {
            _this.setStyle(_this.props.activeStyle);
            _this.props.onMouseDown();
            _this.props.onActive();
        };
        _this.unActive = function () {
            _this.setStyle(_this.props.hoverStyle);
            _this.props.onMouseUp();
            _this.props.unActive();
        };
        _this.focus = function () {
            _this.setStyle(_this.props.focusStyle);
            _this.props.onFocus();
        };
        _this.unFocus = function () {
            _this.resetStyle();
            _this.props.unFocus();
        };
        _this.visited = function () {
            _this.setStyle(_this.props.visitedStyle);
            _this.props.onClick();
            _this.props.onVisited();
            _this.visitedStyle = _this.props.visitedStyle;
        };
        _this.unVisited = function () {
            _this.resetStyle(true);
            _this.props.onClick();
            _this.props.unVisited();
        };
        _this.resetStyle = function (resetVisited) {
            if (resetVisited === void 0) { resetVisited = false; }
            if (resetVisited) {
                _this.visitedStyle = void 0;
            }
            setStyleToElement_1.default(_this.rootElm, __assign({}, _this.props.style, _this.visitedStyle), true);
        };
        return _this;
    }
    ElementState.prototype.componentDidMount = function () {
        this.rootElm = reactDom.findDOMNode(this);
        this.originStyle = __assign({}, this.rootElm.style);
    };
    ElementState.prototype.componentDidUpdate = function () {
        this.rootElm = reactDom.findDOMNode(this);
        this.originStyle = __assign({}, this.rootElm.style);
    };
    ElementState.prototype.render = function () {
        var _a = this.props, style = _a.style, hoverStyle = _a.hoverStyle, focusStyle = _a.focusStyle, activeStyle = _a.activeStyle, visitedStyle = _a.visitedStyle, disabledStyle = _a.disabledStyle, onMouseEnter = _a.onMouseEnter, onMouseLeave = _a.onMouseLeave, onMouseDown = _a.onMouseDown, onMouseUp = _a.onMouseUp, onClick = _a.onClick, onHover = _a.onHover, onFocus = _a.onFocus, onActive = _a.onActive, onVisited = _a.onVisited, unHover = _a.unHover, unFocus = _a.unFocus, unActive = _a.unActive, unVisited = _a.unVisited, visited = _a.visited, children = _a.children, disabled = _a.disabled, attributes = __rest(_a, ["style", "hoverStyle", "focusStyle", "activeStyle", "visitedStyle", "disabledStyle", "onMouseEnter", "onMouseLeave", "onMouseDown", "onMouseUp", "onClick", "onHover", "onFocus", "onActive", "onVisited", "unHover", "unFocus", "unActive", "unVisited", "visited", "children", "disabled"]);
        return react.cloneElement(children, __assign({}, attributes, { style: this.context.theme.prefixStyle(__assign({ transition: "all .25s" }, style, (disabled ? disabledStyle : void 0))), onMouseEnter: (hoverStyle && !disabled) ? this.hover : onMouseEnter, onMouseLeave: (hoverStyle && !disabled) ? this.unHover : onMouseLeave, onMouseDown: (activeStyle && !disabled) ? this.active : onMouseDown, onMouseUp: (activeStyle && !disabled) ? this.unActive : onMouseUp, onClick: (visitedStyle && !disabled) ? this.visited : onClick, onFocus: (focusStyle && !disabled) ? this.focus : onFocus }));
    };
    ElementState.defaultProps = {
        onHover: emptyFunc,
        onFocus: emptyFunc,
        onActive: emptyFunc,
        onVisited: emptyFunc,
        unHover: emptyFunc,
        unFocus: emptyFunc,
        unActive: emptyFunc,
        unVisited: emptyFunc,
        onMouseEnter: emptyFunc,
        onMouseLeave: emptyFunc,
        onMouseDown: emptyFunc,
        onMouseUp: emptyFunc,
        onClick: emptyFunc
    };
    ElementState.contextTypes = { theme: propTypes.object };
    return ElementState;
}(react.Component));
exports.default = ElementState;

});

unwrapExports(ElementState_1);

var spreadObject_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
function spreadObject(obj, keys) {
    var primaryObject = {};
    var secondaryObject = {};
    var canCheckObjectSymbol = obj !== null && typeof Object.getOwnPropertySymbols === "function";
    var symbols = canCheckObjectSymbol ? Object.getOwnPropertySymbols(obj) : null;
    var symbolsSize = canCheckObjectSymbol ? symbols.length : 0;
    for (var property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property) && keys.indexOf(property) < 0) {
            primaryObject[property] = obj[property];
        }
        else {
            secondaryObject[property] = obj[property];
        }
        if (canCheckObjectSymbol) {
            for (var i = 0; i < symbolsSize; i++) {
                if (keys.indexOf(symbols[i]) < 0) {
                    primaryObject[property[i]] = obj[property[i]];
                }
                else {
                    secondaryObject[property[i]] = obj[property[i]];
                }
            }
        }
    }
    return { primaryObject: primaryObject, secondaryObject: secondaryObject };
}
exports.spreadObject = spreadObject;
exports.default = spreadObject;

});

unwrapExports(spreadObject_1);
var spreadObject_2 = spreadObject_1.spreadObject;

var PseudoClasses_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });





var pseudoClassesNames = ["&:hover", "&:active", "&:visited", "&:focus", "&:disabled"];
var PseudoClasses = /** @class */ (function (_super) {
    __extends(PseudoClasses, _super);
    function PseudoClasses() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rootElm = null;
        return _this;
    }
    PseudoClasses.prototype.componentDidMount = function () {
        var _a = this, theme = _a.context.theme, _b = _a.props, style = _b.style, children = _b.children;
        if (theme.useInlineStyle || style) {
            this.rootElm = reactDom.findDOMNode(this);
        }
    };
    PseudoClasses.prototype.render = function () {
        var _this = this;
        var _a = this.props, style = _a.style, children = _a.children, attributes = __rest(_a, ["style", "children"]);
        if (this.context.theme.useInlineStyle && style) {
            var _b = spreadObject_1.default(style, pseudoClassesNames), primaryObject = _b.primaryObject, secondaryObject = _b.secondaryObject;
            return (react.createElement(ElementState_1.default, __assign({}, attributes, { ref: function (elementState) { return _this.rootElm = elementState ? elementState.rootElm : null; }, style: primaryObject }, {
                hoverStyle: secondaryObject["&:hover"],
                activeStyle: secondaryObject["&:active"],
                visitedStyle: secondaryObject["&:visited"],
                focusStyle: secondaryObject["&:focus"],
                disabledStyle: secondaryObject["&:disabled"]
            }), children));
        }
        else {
            return react.cloneElement(children, __assign({}, children.props, attributes, { style: style }));
        }
    };
    PseudoClasses.contextTypes = { theme: propTypes.object };
    return PseudoClasses;
}(react.Component));
exports.PseudoClasses = PseudoClasses;
exports.default = PseudoClasses;

});

unwrapExports(PseudoClasses_1);
var PseudoClasses_2 = PseudoClasses_1.PseudoClasses;

var icons = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "CheckMarkLegacy": "\uE001",
    "CheckboxFillLegacy": "\uE002",
    "CheckboxLegacy": "\uE003",
    "CheckboxIndeterminateLegacy": "\uE004",
    "CheckboxCompositeReversedLegacy": "\uE005",
    "HeartLegacy": "\uE006",
    "HeartBrokenLegacy": "\uE007",
    "CheckMarkZeroWidthLegacy": "\uE008",
    "CheckboxFillZeroWidthLegacy": "\uE009",
    "RatingStarFillZeroWidthLegacy": "\uE00A",
    "HeartFillZeroWidthLegacy": "\uE00B",
    "HeartBrokenZeroWidthLegacy": "\uE00C",
    "ScrollChevronLeftLegacy": "\uE00E",
    "ScrollChevronRightLegacy": "\uE00F",
    "ScrollChevronUpLegacy": "\uE010",
    "ScrollChevronDownLegacy": "\uE011",
    "ChevronLeft3Legacy": "\uE012",
    "ChevronRight3Legacy": "\uE013",
    "ChevronUp3Legacy": "\uE014",
    "ChevronDown3Legacy": "\uE015",
    "ScrollChevronLeftBoldLegacy": "\uE016",
    "ScrollChevronRightBoldLegacy": "\uE017",
    "ScrollChevronUpBoldLegacy": "\uE018",
    "ScrollChevronDownBoldLegacy": "\uE019",
    "RevealPasswordLegacy": "\uE052",
    "EaseOfAccessLegacy": "\uE07F",
    "CheckmarkListviewLegacy": "\uE081",
    "RatingStarFillReducedPaddingHTMLLegacy": "\uE082",
    "KeyboardStandardLegacy": "\uE087",
    "KeyboardSplitLegacy": "\uE08F",
    "SearchboxLegacy": "\uE094",
    "ChevronLeft1Legacy": "\uE096",
    "ChevronRight1Legacy": "\uE097",
    "ChevronUp1Legacy": "\uE098",
    "ChevronDown1Legacy": "\uE099",
    "ChevronLeft2Legacy": "\uE09A",
    "ChevronRight2Legacy": "\uE09B",
    "ChevronUp2Legacy": "\uE09C",
    "ChevronDown2Legacy": "\uE09D",
    "ChevronLeft4Legacy": "\uE09E",
    "ChevronRight4Legacy": "\uE09F",
    "ChevronUp4Legacy": "\uE0A0",
    "ChevronDown4Legacy": "\uE0A1",
    "CheckboxCompositeLegacy": "\uE0A2",
    "HeartFillLegacy": "\uE0A5",
    "BackBttnArrow42Legacy": "\uE0A6",
    "BackBttnMirroredArrow42Legacy": "\uE0AB",
    "BackBttnMirroredArrow20Legacy": "\uE0AD",
    "ArrowHTMLLegacyMirrored": "\uE0AE",
    "RatingStarFillLegacy": "\uE0B4",
    "RatingStarFillSmallLegacy": "\uE0B5",
    "SemanticZoomLegacy": "\uE0B8",
    "BackBttnArrow20Legacy": "\uE0C4",
    "ArrowHTMLLegacy": "\uE0D5",
    "ChevronFlipLeftLegacy": "\uE0E2",
    "ChevronFlipRightLegacy": "\uE0E3",
    "ChevronFlipUpLegacy": "\uE0E4",
    "ChevronFlipDownLegacy": "\uE0E5",
    "CheckmarkMenuLegacy": "\uE0E7",
    "PreviousLegacy": "\uE100",
    "NextLegacy": "\uE101",
    "PlayLegacy": "\uE102",
    "PauseLegacy": "\uE103",
    "EditLegacy": "\uE104",
    "SaveLegacy": "\uE105",
    "ClearLegacy": "\uE106",
    "DeleteLegacy": "\uE107",
    "RemoveLegacy": "\uE108",
    "AddLegacy": "\uE109",
    "CancelLegacy": "\uE10A",
    "AcceptLegacy": "\uE10B",
    "MoreLegacy": "\uE10C",
    "RedoLegacy": "\uE10D",
    "UndoLegacy": "\uE10E",
    "HomeLegacy": "\uE10F",
    "UpLegacy": "\uE110",
    "ForwardLegacy": "\uE111",
    "BackLegacy": "\uE112",
    "FavoriteLegacy": "\uE113",
    "CameraLegacy": "\uE114",
    "SettingsLegacy": "\uE115",
    "VideoLegacy": "\uE116",
    "SyncLegacy": "\uE117",
    "DownloadLegacy": "\uE118",
    "MailLegacy": "\uE119",
    "FindLegacy": "\uE11A",
    "HelpLegacy": "\uE11B",
    "UploadLegacy": "\uE11C",
    "EmojiLegacy": "\uE11D",
    "TwoPageLegacy": "\uE11E",
    "LeaveChatLegacy": "\uE11F",
    "MailForwardLegacy": "\uE120",
    "ClockLegacy": "\uE121",
    "SendLegacy": "\uE122",
    "CropLegacy": "\uE123",
    "RotateCameraLegacy": "\uE124",
    "PeopleLegacy": "\uE125",
    "ClosePaneLegacy": "\uE126",
    "OpenPaneLegacy": "\uE127",
    "WorldLegacy": "\uE128",
    "FlagLegacy": "\uE129",
    "PreviewLinkLegacy": "\uE12A",
    "GlobeLegacy": "\uE12B",
    "TrimLegacy": "\uE12C",
    "AttachCameraLegacy": "\uE12D",
    "ZoomInLegacy": "\uE12E",
    "BookmarksLegacy": "\uE12F",
    "DocumentLegacy": "\uE130",
    "ProtectedDocumentLegacy": "\uE131",
    "PageFillLegacy": "\uE132",
    "MultiSelectLegacy": "\uE133",
    "CommentLegacy": "\uE134",
    "MailFillLegacy": "\uE135",
    "ContactInfoLegacy": "\uE136",
    "HangUpLegacy": "\uE137",
    "ViewAllLegacy": "\uE138",
    "MapPinLegacy": "\uE139",
    "PhoneLegacy": "\uE13A",
    "VideoChatLegacy": "\uE13B",
    "SwitchLegacy": "\uE13C",
    "ContactLegacy": "\uE13D",
    "RenameLegacy": "\uE13E",
    "ExpandTileLegacy": "\uE13F",
    "ReduceTileLegacy": "\uE140",
    "PinLegacy": "\uE141",
    "MusicInfoLegacy": "\uE142",
    "GoLegacy": "\uE143",
    "KeyBoardLegacy": "\uE144",
    "DockLeftLegacy": "\uE145",
    "DockRightLegacy": "\uE146",
    "DockBottomLegacy": "\uE147",
    "RemoteLegacy": "\uE148",
    "RefreshLegacy": "\uE149",
    "RotateLegacy": "\uE14A",
    "ShuffleLegacy": "\uE14B",
    "ListLegacy": "\uE14C",
    "ShopLegacy": "\uE14D",
    "SelectAllLegacy": "\uE14E",
    "OrientationLegacy": "\uE14F",
    "ImportLegacy": "\uE150",
    "ImportAllLegacy": "\uE151",
    "ShowAllFiles3Legacy": "\uE152",
    "ShowAllFiles1Legacy": "\uE153",
    "ShowAllFilesLegacy": "\uE154",
    "BrowsePhotosLegacy": "\uE155",
    "WebcamLegacy": "\uE156",
    "PictureLegacy": "\uE158",
    "SaveLocalLegacy": "\uE159",
    "CaptionLegacy": "\uE15A",
    "StopLegacy": "\uE15B",
    "ShowResultsLegacy": "\uE15C",
    "VolumeLegacy": "\uE15D",
    "RepairLegacy": "\uE15E",
    "MessageLegacy": "\uE15F",
    "PageLegacy": "\uE160",
    "CalendarDayLegacy": "\uE161",
    "CalendarWeekLegacy": "\uE162",
    "CalendarLegacy": "\uE163",
    "CharactersLegacy": "\uE164",
    "MailReplyAllLegacy": "\uE165",
    "ReadLegacy": "\uE166",
    "LinkLegacy": "\uE167",
    "AccountsLegacy": "\uE168",
    "ShowBccLegacy": "\uE169",
    "HideBccLegacy": "\uE16A",
    "CutLegacy": "\uE16B",
    "AttachLegacy": "\uE16C",
    "PasteLegacy": "\uE16D",
    "FilterLegacy": "\uE16E",
    "CopyLegacy": "\uE16F",
    "Emoji2Legacy": "\uE170",
    "ImportantLegacy": "\uE171",
    "MailReplyLegacy": "\uE172",
    "SlideshowLegacy": "\uE173",
    "SortLegacy": "\uE174",
    "ListLegacyMirrored": "\uE175",
    "ExpandTileLegacyMirrored": "\uE176",
    "ReduceTileLegacyMirrored": "\uE177",
    "ManageLegacy": "\uE178",
    "AllAppsLegacy": "\uE179",
    "DisconnectDriveLegacy": "\uE17A",
    "MapDriveLegacy": "\uE17B",
    "NewWindowLegacy": "\uE17C",
    "OpenWithLegacy": "\uE17D",
    "ContactPresenceLegacy": "\uE181",
    "PriorityLegacy": "\uE182",
    "UploadSkyDriveLegacy": "\uE183",
    "GotoTodayLegacy": "\uE184",
    "FontLegacy": "\uE185",
    "FontColorLegacy": "\uE186",
    "Contact2Legacy": "\uE187",
    "FolderLegacy": "\uE188",
    "AudioLegacy": "\uE189",
    "PlaceFolderLegacy": "\uE18A",
    "ViewLegacy": "\uE18B",
    "SetlockScreenLegacy": "\uE18C",
    "SetTileLegacy": "\uE18D",
    "CCJapanLegacy": "\uE18E",
    "CCEuroLegacy": "\uE18F",
    "CCLegacy": "\uE190",
    "StopSlideshowLegacy": "\uE191",
    "PermissionsLegacy": "\uE192",
    "HighlightLegacy": "\uE193",
    "DisableUpdatesLegacy": "\uE194",
    "UnfavoriteLegacy": "\uE195",
    "UnpinLegacy": "\uE196",
    "OpenLocalLegacy": "\uE197",
    "MuteLegacy": "\uE198",
    "ItalicLegacy": "\uE199",
    "UnderlineLegacy": "\uE19A",
    "BoldLegacy": "\uE19B",
    "MoveToFolderLegacy": "\uE19C",
    "LikeDislikeLegacy": "\uE19D",
    "DislikeLegacy": "\uE19E",
    "LikeLegacy": "\uE19F",
    "AlignRightLegacy": "\uE1A0",
    "AlignCenterLegacy": "\uE1A1",
    "AlignLeftLegacy": "\uE1A2",
    "ZoomLegacy": "\uE1A3",
    "ZoomOutLegacy": "\uE1A4",
    "OpenFileLegacy": "\uE1A5",
    "OtherUserLegacy": "\uE1A6",
    "AdminLegacy": "\uE1A7",
    "MailForwardLegacyMirrored": "\uE1A8",
    "GoLegacyMirrored": "\uE1AA",
    "DockLeftLegacyMirrored": "\uE1AB",
    "DockRightLegacyMirrored": "\uE1AC",
    "ImportLegacyMirrored": "\uE1AD",
    "ImportAllLegacyMirrored": "\uE1AE",
    "MailReplyLegacyMirrored": "\uE1AF",
    "ItalicCLegacy": "\uE1B0",
    "BoldGLegacy": "\uE1B1",
    "UnderlineSLegacy": "\uE1B2",
    "BoldFLegacy": "\uE1B3",
    "ItalicKLegacy": "\uE1B4",
    "UnderlineULegacy": "\uE1B5",
    "ItalicILegacy": "\uE1B6",
    "BoldNLegacy": "\uE1B7",
    "UnderlineRussianLegacy": "\uE1B8",
    "BoldRussionLegacy": "\uE1B9",
    "FontStyleKoreanLegacy": "\uE1BA",
    "UnderlineLKoreanLegacy": "\uE1BB",
    "ItalicKoreanLegacy": "\uE1BC",
    "BoldKoreanLegacy": "\uE1BD",
    "FontColorKoreanLegacy": "\uE1BE",
    "ClosePaneLegacyMirrored": "\uE1BF",
    "OpenPaneLegacyMirrored": "\uE1C0",
    "EditLegacyMirrored": "\uE1C2",
    "StreetLegacy": "\uE1C3",
    "MapLegacy": "\uE1C4",
    "ClearSelectionLegacy": "\uE1C5",
    "FontDecreaseLegacy": "\uE1C6",
    "FontIncreaseLegacy": "\uE1C7",
    "FontSizeLegacy": "\uE1C8",
    "CellPhoneLegacy": "\uE1C9",
    "ReshareLegacy": "\uE1CA",
    "TagLegacy": "\uE1CB",
    "RepeatOneLegacy": "\uE1CC",
    "RepeatAllLegacy": "\uE1CD",
    "OutlineStarLegacy": "\uE1CE",
    "SolidStarLegacy": "\uE1CF",
    "CalculatorLegacy": "\uE1D0",
    "DirectionsLegacy": "\uE1D1",
    "LocationLegacy": "\uE1D2",
    "LibraryLegacy": "\uE1D3",
    "PhoneBookLegacy": "\uE1D4",
    "MemoLegacy": "\uE1D5",
    "MicrophoneLegacy": "\uE1D6",
    "PostUpdateLegacy": "\uE1D7",
    "BackToWindowLegacy": "\uE1D8",
    "FullScreenLegacy": "\uE1D9",
    "NewFolderLegacy": "\uE1DA",
    "CalendarReplyLegacy": "\uE1DB",
    "CalendarLegacyMirrored": "\uE1DC",
    "UnsyncFolderLegacy": "\uE1DD",
    "ReportHackedLegacy": "\uE1DE",
    "SyncFolderLegacy": "\uE1DF",
    "BlockContactLegacy": "\uE1E0",
    "SwitchAppsLegacy": "\uE1E1",
    "AddFriendLegacy": "\uE1E2",
    "TouchPointerLegacy": "\uE1E3",
    "GoToStartLegacy": "\uE1E4",
    "ZeroBarsLegacy": "\uE1E5",
    "OneBarLegacy": "\uE1E6",
    "TwoBarsLegacy": "\uE1E7",
    "ThreeBarsLegacy": "\uE1E8",
    "FourBarsLegacy": "\uE1E9",
    "ItalicRussianLegacy": "\uE1EA",
    "AllAppsLegacyMirrored": "\uE1EC",
    "OpenWithLegacyMirrored": "\uE1ED",
    "BookmarksLegacyMirrored": "\uE1EE",
    "MultiSelectLegacyMirrored": "\uE1EF",
    "ShowResultsLegacyMirrored": "\uE1F1",
    "MailReplyAllLegacyMirrored": "\uE1F2",
    "HelpLegacyMirrored": "\uE1F3",
    "ClearSelectionLegacyMirrored": "\uE1F4",
    "RecordLegacy": "\uE1F5",
    "LockLegacy": "\uE1F6",
    "UnlockLegacy": "\uE1F7",
    "DownLegacy": "\uE1FD",
    "CommentInlineLegacy": "\uE206",
    "FavoriteInlineLegacy": "\uE208",
    "LikeInlineLegacy": "\uE209",
    "VideoInlineLegacy": "\uE20A",
    "MailMessageLegacy": "\uE20B",
    "PC1Legacy": "\uE211",
    "DevicesLegacy": "\uE212",
    "RatingStarLegacy": "\uE224",
    "ChevronDownSmLegacy": "\uE228",
    "ReplyLegacy": "\uE248",
    "Favorite2Legacy": "\uE249",
    "Unfavorite2Legacy": "\uE24A",
    "MobileContactLegacy": "\uE25A",
    "BlockedLegacy": "\uE25B",
    "TypingIndicatorLegacy": "\uE25C",
    "PresenceChickletVideoLegacy": "\uE25D",
    "PresenceChickletLegacy": "\uE25E",
    "ChevronRightSmLegacy": "\uE26B",
    "ChevronLeftSmLegacy": "\uE26C",
    "SaveAsLegacy": "\uE28F",
    "DecreaseIndentLegacy": "\uE290",
    "IncreaseIndentLegacy": "\uE291",
    "BulletedListLegacy": "\uE292",
    "ScanLegacy": "\uE294",
    "PreviewLegacy": "\uE295",
    "DecreaseIndentLegacyMirrored": "\uE297",
    "IncreaseIndentLegacyMirrored": "\uE298",
    "BulletedListLegacyMirrored": "\uE299",
    "PlayOnLegacy": "\uE29B",
    "ResolutionLegacy": "\uE2AC",
    "LengthLegacy": "\uE2AD",
    "LayoutLegacy": "\uE2AE",
    "Contact3Legacy": "\uE2AF",
    "TypeLegacy": "\uE2B0",
    "ColorLegacy": "\uE2B1",
    "SizeLegacy": "\uE2B2",
    "ReturnToWindowLegacy": "\uE2B3",
    "OpenInNewWindowLegacy": "\uE2B4",
    "PrintLegacy": "\uE2F6",
    "Printer3DLegacy": "\uE2F7",
    "GlobalNavButton": "\uE700",
    "Wifi": "\uE701",
    "Bluetooth": "\uE702",
    "Connect": "\uE703",
    "InternetSharing": "\uE704",
    "VPN": "\uE705",
    "Brightness": "\uE706",
    "MapPin": "\uE707",
    "QuietHours": "\uE708",
    "Airplane": "\uE709",
    "Tablet": "\uE70A",
    "QuickNote": "\uE70B",
    "RememberedDevice": "\uE70C",
    "ChevronDown": "\uE70D",
    "ChevronUp": "\uE70E",
    "Edit": "\uE70F",
    "Add": "\uE710",
    "Cancel": "\uE711",
    "More": "\uE712",
    "Settings": "\uE713",
    "Video": "\uE714",
    "Mail": "\uE715",
    "People": "\uE716",
    "Phone": "\uE717",
    "Pin": "\uE718",
    "Shop": "\uE719",
    "Stop": "\uE71A",
    "Link": "\uE71B",
    "Filter": "\uE71C",
    "AllApps": "\uE71D",
    "Zoom": "\uE71E",
    "ZoomOut": "\uE71F",
    "Microphone": "\uE720",
    "Search": "\uE721",
    "Camera": "\uE722",
    "Attach": "\uE723",
    "Send": "\uE724",
    "SendFill": "\uE725",
    "WalkSolid": "\uE726",
    "InPrivate": "\uE727",
    "FavoriteList": "\uE728",
    "PageSolid": "\uE729",
    "Forward": "\uE72A",
    "Back": "\uE72B",
    "Refresh": "\uE72C",
    "Share": "\uE72D",
    "Lock": "\uE72E",
    "ReportHacked": "\uE730",
    "FavoriteStar": "\uE734",
    "FavoriteStarFill": "\uE735",
    "Remove": "\uE738",
    "Checkbox": "\uE739",
    "CheckboxComposite": "\uE73A",
    "CheckboxFill": "\uE73B",
    "CheckboxIndeterminate": "\uE73C",
    "CheckboxCompositeReversed": "\uE73D",
    "CheckMark": "\uE73E",
    "BackToWindow": "\uE73F",
    "FullScreen": "\uE740",
    "ResizeTouchLarger": "\uE741",
    "ResizeTouchSmaller": "\uE742",
    "ResizeMouseSmall": "\uE743",
    "ResizeMouseMedium": "\uE744",
    "ResizeMouseWide": "\uE745",
    "ResizeMouseTall": "\uE746",
    "ResizeMouseLarge": "\uE747",
    "SwitchUser": "\uE748",
    "Print": "\uE749",
    "Up": "\uE74A",
    "Down": "\uE74B",
    "OEM": "\uE74C",
    "Delete": "\uE74D",
    "Save": "\uE74E",
    "Mute": "\uE74F",
    "BackSpaceQWERTY": "\uE750",
    "ReturnKey": "\uE751",
    "UpArrowShiftKey": "\uE752",
    "Cloud": "\uE753",
    "Flashlight": "\uE754",
    "RotationLock": "\uE755",
    "CommandPrompt": "\uE756",
    "SIPMove": "\uE759",
    "SIPUndock": "\uE75A",
    "SIPRedock": "\uE75B",
    "EraseTool": "\uE75C",
    "UnderscoreSpace": "\uE75D",
    "GripperTool": "\uE75E",
    "Dialpad": "\uE75F",
    "PageLeft": "\uE760",
    "PageRight": "\uE761",
    "MultiSelect": "\uE762",
    "KeyboardLeftHanded": "\uE763",
    "KeyboardRightHanded": "\uE764",
    "KeyboardClassic": "\uE765",
    "KeyboardSplit": "\uE766",
    "Volume": "\uE767",
    "Play": "\uE768",
    "Pause": "\uE769",
    "ChevronLeft": "\uE76B",
    "ChevronRight": "\uE76C",
    "InkingTool": "\uE76D",
    "Emoji2": "\uE76E",
    "GripperBarHorizontal": "\uE76F",
    "System": "\uE770",
    "Personalize": "\uE771",
    "Devices": "\uE772",
    "SearchAndApps": "\uE773",
    "Globe": "\uE774",
    "TimeLanguage": "\uE775",
    "EaseOfAccess": "\uE776",
    "UpdateRestore": "\uE777",
    "HangUp": "\uE778",
    "ContactInfo": "\uE779",
    "Unpin": "\uE77A",
    "Contact": "\uE77B",
    "Memo": "\uE77C",
    "Paste": "\uE77F",
    "PhoneBook": "\uE780",
    "LEDLight": "\uE781",
    "Error": "\uE783",
    "GripperBarVertical": "\uE784",
    "Unlock": "\uE785",
    "Slideshow": "\uE786",
    "Calendar": "\uE787",
    "GripperResize": "\uE788",
    "Megaphone": "\uE789",
    "Trim": "\uE78A",
    "NewWindow": "\uE78B",
    "SaveLocal": "\uE78C",
    "Color": "\uE790",
    "DataSense": "\uE791",
    "SaveAs": "\uE792",
    "Light": "\uE793",
    "AspectRatio": "\uE799",
    "DataSenseBar": "\uE7A5",
    "Redo": "\uE7A6",
    "Undo": "\uE7A7",
    "Crop": "\uE7A8",
    "OpenWith": "\uE7AC",
    "Rotate": "\uE7AD",
    "SetlockScreen": "\uE7B5",
    "MapPin2": "\uE7B7",
    "Package": "\uE7B8",
    "Warning": "\uE7BA",
    "ReadingList": "\uE7BC",
    "Education": "\uE7BE",
    "ShoppingCart": "\uE7BF",
    "Train": "\uE7C0",
    "Flag": "\uE7C1",
    "Page": "\uE7C3",
    "Multitask": "\uE7C4",
    "BrowsePhotos": "\uE7C5",
    "HalfStarLeft": "\uE7C6",
    "HalfStarRight": "\uE7C7",
    "Record": "\uE7C8",
    "TouchPointer": "\uE7C9",
    "LangJPN": "\uE7DE",
    "Ferry": "\uE7E3",
    "Highlight": "\uE7E6",
    "ActionCenterNotification": "\uE7E7",
    "PowerButton": "\uE7E8",
    "ResizeTouchNarrower": "\uE7EA",
    "ResizeTouchShorter": "\uE7EB",
    "DrivingMode": "\uE7EC",
    "RingerSilent": "\uE7ED",
    "OtherUser": "\uE7EE",
    "Admin": "\uE7EF",
    "CC": "\uE7F0",
    "SDCard": "\uE7F1",
    "CallForwarding": "\uE7F2",
    "SettingsDisplaySound": "\uE7F3",
    "TVMonitor": "\uE7F4",
    "Speakers": "\uE7F5",
    "Headphone": "\uE7F6",
    "DeviceLaptopPic": "\uE7F7",
    "DeviceLaptopNoPic": "\uE7F8",
    "DeviceMonitorRightPic": "\uE7F9",
    "DeviceMonitorLeftPic": "\uE7FA",
    "DeviceMonitorNoPic": "\uE7FB",
    "Game": "\uE7FC",
    "HorizontalTabKey": "\uE7FD",
    "StreetsideSplitMinimize": "\uE802",
    "StreetsideSplitExpand": "\uE803",
    "Car": "\uE804",
    "Walk": "\uE805",
    "Bus": "\uE806",
    "TiltUp": "\uE809",
    "TiltDown": "\uE80A",
    "RotateMapRight": "\uE80C",
    "RotateMapLeft": "\uE80D",
    "Home": "\uE80F",
    "ParkingLocation": "\uE811",
    "MapCompassTop": "\uE812",
    "MapCompassBottom": "\uE813",
    "IncidentTriangle": "\uE814",
    "Touch": "\uE815",
    "MapDirections": "\uE816",
    "StartPoint": "\uE819",
    "StopPoint": "\uE81A",
    "EndPoint": "\uE81B",
    "History": "\uE81C",
    "Location": "\uE81D",
    "MapLayers": "\uE81E",
    "Accident": "\uE81F",
    "Work": "\uE821",
    "Construction": "\uE822",
    "Recent": "\uE823",
    "Bank": "\uE825",
    "DownloadMap": "\uE826",
    "InkingToolFill2": "\uE829",
    "HighlightFill2": "\uE82A",
    "EraseToolFill": "\uE82B",
    "EraseToolFill2": "\uE82C",
    "Dictionary": "\uE82D",
    "DictionaryAdd": "\uE82E",
    "ToolTip": "\uE82F",
    "ChromeBack": "\uE830",
    "ProvisioningPackage": "\uE835",
    "AddRemoteDevice": "\uE836",
    "Ethernet": "\uE839",
    " ShareBroadband": "\uE83A",
    "DirectAccess": "\uE83B",
    " DialUp": "\uE83C",
    "DefenderApp": "\uE83D",
    "BatteryCharging9": "\uE83E",
    "Battery10": "\uE83F",
    "Pinned": "\uE840",
    "PinFill": "\uE841",
    "PinnedFill": "\uE842",
    "PeriodKey": "\uE843",
    "PuncKey": "\uE844",
    "RevToggleKey": "\uE845",
    "RightArrowKeyTime1": "\uE846",
    "RightArrowKeyTime2": "\uE847",
    "LeftQuote": "\uE848",
    "RightQuote": "\uE849",
    "DownShiftKey": "\uE84A",
    "UpShiftKey": "\uE84B",
    "PuncKey0": "\uE84C",
    "PuncKeyLeftBottom": "\uE84D",
    "RightArrowKeyTime3": "\uE84E",
    "RightArrowKeyTime4": "\uE84F",
    "Battery0": "\uE850",
    "Battery1": "\uE851",
    "Battery2": "\uE852",
    "Battery3": "\uE853",
    "Battery4": "\uE854",
    "Battery5": "\uE855",
    "Battery6": "\uE856",
    "Battery7": "\uE857",
    "Battery8": "\uE858",
    "Battery9": "\uE859",
    "BatteryCharging0": "\uE85A",
    "BatteryCharging1": "\uE85B",
    "BatteryCharging2": "\uE85C",
    "BatteryCharging3": "\uE85D",
    "BatteryCharging4": "\uE85E",
    "BatteryCharging5": "\uE85F",
    "BatteryCharging6": "\uE860",
    "BatteryCharging7": "\uE861",
    "BatteryCharging8": "\uE862",
    "BatterySaver0": "\uE863",
    "BatterySaver1": "\uE864",
    "BatterySaver2": "\uE865",
    "BatterySaver3": "\uE866",
    "BatterySaver4": "\uE867",
    "BatterySaver5": "\uE868",
    "BatterySaver6": "\uE869",
    "BatterySaver7": "\uE86A",
    "BatterySaver8": "\uE86B",
    "SignalBars1": "\uE86C",
    "SignalBars2": "\uE86D",
    "SignalBars3": "\uE86E",
    "SignalBars4": "\uE86F",
    "SignalBars5": "\uE870",
    "SignalNotConnected": "\uE871",
    "Wifi1": "\uE872",
    "Wifi2": "\uE873",
    "Wifi3": "\uE874",
    "SIMLock": "\uE875",
    "SIMMissing": "\uE876",
    "Vibrate": "\uE877",
    "RoamingInternational": "\uE878",
    "RoamingDomestic": "\uE879",
    "CallForwardInternational": "\uE87A",
    "CallForwardRoaming": "\uE87B",
    "JpnRomanji": "\uE87C",
    "JpnRomanjiLock": "\uE87D",
    "JpnRomanjiShift": "\uE87E",
    "JpnRomanjiShiftLock": "\uE87F",
    "StatusDataTransfer": "\uE880",
    "StatusDataTransferVPN": "\uE881",
    "StatusDualSIM2": "\uE882",
    "StatusDualSIM2VPN": "\uE883",
    "StatusDualSIM1": "\uE884",
    "StatusDualSIM1VPN": "\uE885",
    "StatusSGLTE": "\uE886",
    "StatusSGLTECell": "\uE887",
    "StatusSGLTEDataVPN": "\uE888",
    "StatusVPN": "\uE889",
    "WifiHotspot": "\uE88A",
    "LanguageKor": "\uE88B",
    "LanguageCht": "\uE88C",
    "LanguageChs": "\uE88D",
    "USB": "\uE88E",
    "InkingToolFill": "\uE88F",
    "View": "\uE890",
    "HighlightFill": "\uE891",
    "Previous": "\uE892",
    "Next": "\uE893",
    "Clear": "\uE894",
    "Sync": "\uE895",
    "Download": "\uE896",
    "Help": "\uE897",
    "Upload": "\uE898",
    "Emoji": "\uE899",
    "TwoPage": "\uE89A",
    "LeaveChat": "\uE89B",
    "MailForward": "\uE89C",
    "RotateCamera": "\uE89E",
    "ClosePane": "\uE89F",
    "OpenPane": "\uE8A0",
    "PreviewLink": "\uE8A1",
    "AttachCamera": "\uE8A2",
    "ZoomIn": "\uE8A3",
    "Bookmarks": "\uE8A4",
    "Document": "\uE8A5",
    "ProtectedDocument": "\uE8A6",
    "OpenInNewWindow": "\uE8A7",
    "MailFill": "\uE8A8",
    "ViewAll": "\uE8A9",
    "VideoChat": "\uE8AA",
    "Switch": "\uE8AB",
    "Rename": "\uE8AC",
    "Go": "\uE8AD",
    "SurfaceHub": "\uE8AE",
    "Remote": "\uE8AF",
    "Click": "\uE8B0",
    "Shuffle": "\uE8B1",
    "Movies": "\uE8B2",
    "SelectAll": "\uE8B3",
    "Orientation": "\uE8B4",
    "Import": "\uE8B5",
    "ImportAll": "\uE8B6",
    "Folder": "\uE8B7",
    "Webcam": "\uE8B8",
    "Picture": "\uE8B9",
    "Caption": "\uE8BA",
    "ChromeClose": "\uE8BB",
    "ShowResults": "\uE8BC",
    "Message": "\uE8BD",
    "Leaf": "\uE8BE",
    "CalendarDay": "\uE8BF",
    "CalendarWeek": "\uE8C0",
    "Characters": "\uE8C1",
    "MailReplyAll": "\uE8C2",
    "Read": "\uE8C3",
    "ShowBcc": "\uE8C4",
    "HideBcc": "\uE8C5",
    "Cut": "\uE8C6",
    "Copy": "\uE8C8",
    "Important": "\uE8C9",
    "MailReply": "\uE8CA",
    "Sort": "\uE8CB",
    "MobileTablet": "\uE8CC",
    "DisconnectDrive": "\uE8CD",
    "MapDrive": "\uE8CE",
    "ContactPresence": "\uE8CF",
    "Priority": "\uE8D0",
    "GotoToday": "\uE8D1",
    "Font": "\uE8D2",
    "FontColor": "\uE8D3",
    "Contact2": "\uE8D4",
    "FolderFill": "\uE8D5",
    "Audio": "\uE8D6",
    "Permissions": "\uE8D7",
    "DisableUpdates": "\uE8D8",
    "Unfavorite": "\uE8D9",
    "OpenLocal": "\uE8DA",
    "Italic": "\uE8DB",
    "Underline": "\uE8DC",
    "Bold": "\uE8DD",
    "MoveToFolder": "\uE8DE",
    "LikeDislike": "\uE8DF",
    "Dislike": "\uE8E0",
    "Like": "\uE8E1",
    "AlignRight": "\uE8E2",
    "AlignCenter": "\uE8E3",
    "AlignLeft": "\uE8E4",
    "OpenFile": "\uE8E5",
    "ClearSelection": "\uE8E6",
    "FontDecrease": "\uE8E7",
    "FontIncrease": "\uE8E8",
    "FontSize": "\uE8E9",
    "CellPhone": "\uE8EA",
    "Reshare": "\uE8EB",
    "Tag": "\uE8EC",
    "RepeatOne": "\uE8ED",
    "RepeatAll": "\uE8EE",
    "Calculator": "\uE8EF",
    "Directions": "\uE8F0",
    "Library": "\uE8F1",
    "ChatBubbles": "\uE8F2",
    "PostUpdate": "\uE8F3",
    "NewFolder": "\uE8F4",
    "CalendarReply": "\uE8F5",
    "UnsyncFolder": "\uE8F6",
    "SyncFolder": "\uE8F7",
    "BlockContact": "\uE8F8",
    "SwitchApps": "\uE8F9",
    "AddFriend": "\uE8FA",
    "Accept": "\uE8FB",
    "GoToStart": "\uE8FC",
    "BulletedList": "\uE8FD",
    "Scan": "\uE8FE",
    "Preview": "\uE8FF",
    "ZeroBars": "\uE904",
    "OneBar": "\uE905",
    "TwoBars": "\uE906",
    "ThreeBars": "\uE907",
    "FourBars": "\uE908",
    "World": "\uE909",
    "Comment": "\uE90A",
    "MusicInfo": "\uE90B",
    "DockLeft": "\uE90C",
    "DockRight": "\uE90D",
    "DockBottom": "\uE90E",
    "Repair": "\uE90F",
    "Accounts": "\uE910",
    "DullSound": "\uE911",
    "Manage": "\uE912",
    "Street": "\uE913",
    "Printer3D": "\uE914",
    "RadioBullet": "\uE915",
    "Stopwatch": "\uE916",
    "Photo": "\uE91B",
    "ActionCenter": "\uE91C",
    "FullCircleMask": "\uE91F",
    "ChromeMinimize": "\uE921",
    "ChromeMaximize": "\uE922",
    "ChromeRestore": "\uE923",
    "Annotation": "\uE924",
    "BackSpaceQWERTYSm": "\uE925",
    "BackSpaceQWERTYMd": "\uE926",
    "Swipe": "\uE927",
    "Fingerprint": "\uE928",
    "Handwriting": "\uE929",
    "ChromeBackToWindow": "\uE92C",
    "ChromeFullScreen": "\uE92D",
    "KeyboardStandard": "\uE92E",
    "KeyboardDismiss": "\uE92F",
    "Completed": "\uE930",
    "ChromeAnnotate": "\uE931",
    "Label": "\uE932",
    "IBeam": "\uE933",
    "IBeamOutline": "\uE934",
    "FlickDown": "\uE935",
    "FlickUp": "\uE936",
    "FlickLeft": "\uE937",
    "FlickRight": "\uE938",
    "FeedbackApp": "\uE939",
    "MusicAlbum": "\uE93C",
    "Streaming": "\uE93E",
    "Code": "\uE943",
    "ReturnToWindow": "\uE944",
    "LightningBolt": "\uE945",
    "Info": "\uE946",
    "CalculatorMultiply": "\uE947",
    "CalculatorAddition": "\uE948",
    "CalculatorSubtract": "\uE949",
    "CalculatorDivide": "\uE94A",
    "CalculatorSquareroot": "\uE94B",
    "CalculatorPercentage": "\uE94C",
    "CalculatorNegate": "\uE94D",
    "CalculatorEqualTo": "\uE94E",
    "CalculatorBackspace": "\uE94F",
    "Component": "\uE950",
    "DMC": "\uE951",
    "Dock": "\uE952",
    "MultimediaDMS": "\uE953",
    "MultimediaDVR": "\uE954",
    "MultimediaPMP": "\uE955",
    "PrintfaxPrinterFile": "\uE956",
    "Sensor": "\uE957",
    "StorageOptical": "\uE958",
    "Communications": "\uE95A",
    "Headset": "\uE95B",
    "Projector": "\uE95D",
    "Health": "\uE95E",
    "Webcam2": "\uE960",
    "Input": "\uE961",
    "Mouse": "\uE962",
    "Smartcard": "\uE963",
    "SmartcardVirtual": "\uE964",
    "MediaStorageTower": "\uE965",
    "ReturnKeySm": "\uE966",
    "GameConsole": "\uE967",
    "Network": "\uE968",
    "StorageNetworkWireless": "\uE969",
    "StorageTape": "\uE96A",
    "ChevronUpSmall": "\uE96D",
    "ChevronDownSmall": "\uE96E",
    "ChevronLeftSmall": "\uE96F",
    "ChevronRightSmall": "\uE970",
    "ChevronUpMed": "\uE971",
    "ChevronDownMed": "\uE972",
    "ChevronLeftMed": "\uE973",
    "ChevronRightMed": "\uE974",
    "Devices2": "\uE975",
    "ExpandTile": "\uE976",
    "PC1": "\uE977",
    "PresenceChicklet": "\uE978",
    "PresenceChickletVideo": "\uE979",
    "Reply": "\uE97A",
    "SetTile": "\uE97B",
    "Type": "\uE97C",
    "Korean": "\uE97D",
    "HalfAlpha": "\uE97E",
    "FullAlpha": "\uE97F",
    "Key12On": "\uE980",
    "ChineseChangjie": "\uE981",
    "QWERTYOn": "\uE982",
    "QWERTYOff": "\uE983",
    "ChineseQuick": "\uE984",
    "Japanese": "\uE985",
    "FullHiragana": "\uE986",
    "FullKatakana": "\uE987",
    "HalfKatakana": "\uE988",
    "ChineseBoPoMoFo": "\uE989",
    "ChinesePinyin": "\uE98A",
    "ConstructionCone": "\uE98F",
    "XboxOneConsole": "\uE990",
    "Volume0": "\uE992",
    "Volume1": "\uE993",
    "Volume2": "\uE994",
    "Volume3": "\uE995",
    "BatteryUnknown": "\uE996",
    "WifiAttentionOverlay": "\uE998",
    "Robot": "\uE99A",
    "TapAndSend": "\uE9A1",
    "PasswordKeyShow": "\uE9A8",
    "PasswordKeyHide": "\uE9A9",
    "BidiLtr": "\uE9AA",
    "BidiRtl": "\uE9AB",
    "ForwardSm": "\uE9AC",
    "CommaKey": "\uE9AD",
    "DashKey": "\uE9AE",
    "DullSoundKey": "\uE9AF",
    "HalfDullSound": "\uE9B0",
    "RightDoubleQuote": "\uE9B1",
    "LeftDoubleQuote": "\uE9B2",
    "PuncKeyRightBottom": "\uE9B3",
    "PuncKey1": "\uE9B4",
    "PuncKey2": "\uE9B5",
    "PuncKey3": "\uE9B6",
    "PuncKey4": "\uE9B7",
    "PuncKey5": "\uE9B8",
    "PuncKey6": "\uE9B9",
    "PuncKey9": "\uE9BA",
    "PuncKey7": "\uE9BB",
    "PuncKey8": "\uE9BC",
    "Frigid": "\uE9CA",
    "Diagnostic": "\uE9D9",
    "Process": "\uE9F3",
    "DisconnectDisplay": "\uEA14",
    "Info2": "\uEA1F",
    "ActionCenterAsterisk": "\uEA21",
    "Beta": "\uEA24",
    "SaveCopy": "\uEA35",
    "List": "\uEA37",
    "Asterisk": "\uEA38",
    "ErrorBadge": "\uEA39",
    "CircleRing": "\uEA3A",
    "CircleFill": "\uEA3B",
    "AllAppsMirrored": "\uEA40",
    "BookmarksMirrored": "\uEA41",
    "BulletedListMirrored": "\uEA42",
    "CallForwardInternationalMirrored": "\uEA43",
    "CallForwardRoamingMirrored": "\uEA44",
    "ChromeBackMirrored": "\uEA47",
    "ClearSelectionMirrored": "\uEA48",
    "ClosePaneMirrored": "\uEA49",
    "ContactInfoMirrored": "\uEA4A",
    "DockRightMirrored": "\uEA4B",
    "DockLeftMirrored": "\uEA4C",
    "ExpandTileMirrored": "\uEA4E",
    "GoMirrored": "\uEA4F",
    "GripperResizeMirrored": "\uEA50",
    "HelpMirrored": "\uEA51",
    "ImportMirrored": "\uEA52",
    "ImportAllMirrored": "\uEA53",
    "LeaveChatMirrored": "\uEA54",
    "ListMirrored": "\uEA55",
    "MailForwardMirrored": "\uEA56",
    "MailReplyMirrored": "\uEA57",
    "MailReplyAllMirrored": "\uEA58",
    "OpenPaneMirrored": "\uEA5B",
    "OpenWithMirrored": "\uEA5C",
    "ParkingLocationMirrored": "\uEA5E",
    "ResizeMouseMediumMirrored": "\uEA5F",
    "ResizeMouseSmallMirrored": "\uEA60",
    "ResizeMouseTallMirrored": "\uEA61",
    "ResizeTouchNarrowerMirrored": "\uEA62",
    "SendMirrored": "\uEA63",
    "SendFillMirrored": "\uEA64",
    "ShowResultsMirrored": "\uEA65",
    "Media": "\uEA69",
    "SyncError": "\uEA6A",
    "Devices3": "\uEA6C",
    "Lightbulb": "\uEA80",
    "StatusCircle": "\uEA81",
    "StatusTriangle": "\uEA82",
    "StatusError": "\uEA83",
    "StatusWarning": "\uEA84",
    "Puzzle": "\uEA86",
    "CalendarSolid": "\uEA89",
    "HomeSolid": "\uEA8A",
    "ParkingLocationSolid": "\uEA8B",
    "ContactSolid": "\uEA8C",
    "ConstructionSolid": "\uEA8D",
    "AccidentSolid": "\uEA8E",
    "Ringer": "\uEA8F",
    "ThoughtBubble": "\uEA91",
    "HeartBroken": "\uEA92",
    "BatteryCharging10": "\uEA93",
    "BatterySaver9": "\uEA94",
    "BatterySaver10": "\uEA95",
    "CallForwardingMirrored": "\uEA97",
    "MultiSelectMirrored": "\uEA98",
    "Broom": "\uEA99",
    "Trackers": "\uEADF",
    "PieSingle": "\uEB05",
    "StockDown": "\uEB0F",
    "StockUp": "\uEB11",
    "Drop": "\uEB42",
    "BusSolid": "\uEB47",
    "FerrySolid": "\uEB48",
    "StartPointSolid": "\uEB49",
    "StopPointSolid": "\uEB4A",
    "EndPointSolid": "\uEB4B",
    "AirplaneSolid": "\uEB4C",
    "TrainSolid": "\uEB4D",
    "WorkSolid": "\uEB4E",
    "ReminderFill": "\uEB4F",
    "Reminder": "\uEB50",
    "Heart": "\uEB51",
    "HeartFill": "\uEB52",
    "EthernetError": "\uEB55",
    "EthernetWarning": "\uEB56",
    "StatusConnecting1": "\uEB57",
    "StatusConnecting2": "\uEB58",
    "StatusUnsecure": "\uEB59",
    "WifiError0": "\uEB5A",
    "WifiError1": "\uEB5B",
    "WifiError2": "\uEB5C",
    "WifiError3": "\uEB5D",
    "WifiError4": "\uEB5E",
    "WifiWarning0": "\uEB5F",
    "WifiWarning1": "\uEB60",
    "WifiWarning2": "\uEB61",
    "WifiWarning3": "\uEB62",
    "WifiWarning4": "\uEB63",
    "Devices4": "\uEB66",
    "NUIIris": "\uEB67",
    "NUIFace": "\uEB68",
    "EditMirrored": "\uEB7E",
    "NUIFPStartSlideHand": "\uEB82",
    "NUIFPStartSlideAction": "\uEB83",
    "NUIFPContinueSlideHand": "\uEB84",
    "NUIFPContinueSlideAction": "\uEB85",
    "NUIFPRollRightHand": "\uEB86",
    "NUIFPRollRightHandAction": "\uEB87",
    "NUIFPRollLeftHand": "\uEB88",
    "NUIFPRollLeftAction": "\uEB89",
    "NUIFPPressHand": "\uEB8A",
    "NUIFPPressAction": "\uEB8B",
    "NUIFPPressRepeatHand": "\uEB8C",
    "NUIFPPressRepeatAction": "\uEB8D",
    "StatusErrorFull": "\uEB90",
    "MultitaskExpanded": "\uEB91",
    "Certificate": "\uEB95",
    "BackSpaceQWERTYLg": "\uEB96",
    "ReturnKeyLg": "\uEB97",
    "FastForward": "\uEB9D",
    "Rewind": "\uEB9E",
    "Photo2": "\uEB9F",
    " MobBattery0": "\uEBA0",
    " MobBattery1": "\uEBA1",
    " MobBattery2": "\uEBA2",
    " MobBattery3": "\uEBA3",
    " MobBattery4": "\uEBA4",
    " MobBattery5": "\uEBA5",
    " MobBattery6": "\uEBA6",
    " MobBattery7": "\uEBA7",
    " MobBattery8": "\uEBA8",
    " MobBattery9": "\uEBA9",
    "MobBattery10": "\uEBAA",
    " MobBatteryCharging0": "\uEBAB",
    " MobBatteryCharging1": "\uEBAC",
    " MobBatteryCharging2": "\uEBAD",
    " MobBatteryCharging3": "\uEBAE",
    " MobBatteryCharging4": "\uEBAF",
    " MobBatteryCharging5": "\uEBB0",
    " MobBatteryCharging6": "\uEBB1",
    " MobBatteryCharging7": "\uEBB2",
    " MobBatteryCharging8": "\uEBB3",
    " MobBatteryCharging9": "\uEBB4",
    " MobBatteryCharging10": "\uEBB5",
    " MobBatterySaver0": "\uEBB6",
    " MobBatterySaver1": "\uEBB7",
    " MobBatterySaver2": "\uEBB8",
    " MobBatterySaver3": "\uEBB9",
    " MobBatterySaver4": "\uEBBA",
    " MobBatterySaver5": "\uEBBB",
    " MobBatterySaver6": "\uEBBC",
    " MobBatterySaver7": "\uEBBD",
    " MobBatterySaver8": "\uEBBE",
    " MobBatterySaver9": "\uEBBF",
    " MobBatterySaver10": "\uEBC0",
    "DictionaryCloud": "\uEBC3",
    "ResetDrive": "\uEBC4",
    "VolumeBars": "\uEBC5",
    "Project": "\uEBC6",
    "AdjustHologram": "\uEBD2",
    "WifiCallBars": "\uEBD4",
    "WifiCall0": "\uEBD5",
    "WifiCall1": "\uEBD6",
    "WifiCall2": "\uEBD7",
    "WifiCall3": "\uEBD8",
    "WifiCall4": "\uEBD9",
    "DeviceDiscovery": "\uEBDE",
    "WindDirection": "\uEBE6",
    "RightArrowKeyTime0": "\uEBE7",
    "TabletMode": "\uEBFC",
    "StatusCircleLeft": "\uEBFD",
    "StatusTriangleLeft": "\uEBFE",
    "StatusErrorLeft": "\uEBFF",
    "StatusWarningLeft": "\uEC00",
    "MobBatteryUnknown": "\uEC02",
    "NetworkTower": "\uEC05",
    "CityNext": "\uEC06",
    "CityNext2": "\uEC07",
    "Courthouse": "\uEC08",
    "Groceries": "\uEC09",
    "Sustainable": "\uEC0A",
    "BuildingEnergy": "\uEC0B",
    "ToggleFilled": "\uEC11",
    "ToggleBorder": "\uEC12",
    "SliderThumb": "\uEC13",
    "ToggleThumb": "\uEC14",
    "MiracastLogoSmall": "\uEC15",
    "MiracastLogoLarge": "\uEC16",
    "PLAP": "\uEC19",
    "Badge": "\uEC1B",
    "SignalRoaming": "\uEC1E",
    "MobileLocked": "\uEC20",
    "InsiderHubApp": "\uEC24",
    "PersonalFolder": "\uEC25",
    "HomeGroup": "\uEC26",
    "MyNetwork": "\uEC27",
    "KeyboardFull": "\uEC31",
    "MobSignal1": "\uEC37",
    "MobSignal2": "\uEC38",
    "MobSignal3": "\uEC39",
    "MobSignal4": "\uEC3A",
    "MobSignal5": "\uEC3B",
    "MobWifi1": "\uEC3C",
    "MobWifi2": "\uEC3D",
    "MobWifi3": "\uEC3E",
    "MobWifi4": "\uEC3F",
    "MobAirplane": "\uEC40",
    "MobBluetooth": "\uEC41",
    "MobActionCenter": "\uEC42",
    "MobLocation": "\uEC43",
    "MobWifiHotspot": "\uEC44",
    "LanguageJpn": "\uEC45",
    "MobQuietHours": "\uEC46",
    "MobDrivingMode": "\uEC47",
    "SpeedOff": "\uEC48",
    "SpeedMedium": "\uEC49",
    "SpeedHigh": "\uEC4A",
    "ThisPC": "\uEC4E",
    "MusicNote": "\uEC4F",
    "FileExplorer": "\uEC50",
    "FileExplorerApp": "\uEC51",
    "LeftArrowKeyTime0": "\uEC52",
    "MicOff": "\uEC54",
    "MicSleep": "\uEC55",
    "MicError": "\uEC56",
    "PlaybackRate1x": "\uEC57",
    "PlaybackRateOther": "\uEC58",
    "CashDrawer": "\uEC59",
    "BarcodeScanner": "\uEC5A",
    "ReceiptPrinter": "\uEC5B",
    "MagStripeReader": "\uEC5C",
    "CompletedSolid": "\uEC61",
    "CompanionApp": "\uEC64",
    "SwipeRevealArt": "\uEC6D",
    "MicOn": "\uEC71",
    "MicClipping": "\uEC72",
    "TabletSelected": "\uEC74",
    "MobileSelected": "\uEC75",
    "LaptopSelected": "\uEC76",
    "TVMonitorSelected": "\uEC77",
    "DeveloperTools": "\uEC7A",
    "MobCallForwarding": "\uEC7E",
    "MobCallForwardingMirrored": "\uEC7F",
    "BodyCam": "\uEC80",
    "PoliceCar": "\uEC81",
    "Draw": "\uEC87",
    "DrawSolid": "\uEC88",
    "LowerBrightness": "\uEC8A",
    "ScrollUpDown": "\uEC8F",
    "DateTime": "\uEC92",
    "Tiles": "\uECA5",
    "PartyLeader": "\uECA7",
    "AppIconDefault": "\uECAA",
    "AddSurfaceHub": "\uECC4",
    "DevUpdate": "\uECC5",
    "Unit": "\uECC6",
    "AddTo": "\uECC8",
    "RemoveFrom": "\uECC9",
    "RadioBtnOff": "\uECCA",
    "RadioBtnOn": "\uECCB",
    "RadioBullet2": "\uECCC",
    "ExploreContent": "\uECCD",
    "ScrollMode": "\uECE7",
    "ZoomMode": "\uECE8",
    "PanMode": "\uECE9",
    "WiredUSB ": "\uECF0",
    "WirelessUSB": "\uECF1",
    "USBSafeConnect": "\uECF3",
    "ActionCenterNotificationMirrored": "\uED0C",
    "ActionCenterMirrored": "\uED0D",
    "ResetDevice": "\uED10",
    "Feedback": "\uED15",
    "Subtitles": "\uED1E",
    "SubtitlesAudio": "\uED1F",
    "CalendarMirrored": "\uED28",
    "eSIM": "\uED2A",
    "eSIMNoProfile": "\uED2B",
    "eSIMLocked": "\uED2C",
    "eSIMBusy": "\uED2D",
    "SignalError": "\uED2E",
    "StreamingEnterprise": "\uED2F",
    "Headphone0": "\uED30",
    "Headphone1": "\uED31",
    "Headphone2": "\uED32",
    "Headphone3": "\uED33",
    "KeyboardBrightness": "\uED39",
    "KeyboardLowerBrightness": "\uED3A",
    "SkipBack10": "\uED3C",
    "SkipForward30": "\uED3D",
    "TreeFolderFolder": "\uED41",
    "TreeFolderFolderFill": "\uED42",
    "TreeFolderFolderOpen": "\uED43",
    "TreeFolderFolderOpenFill": "\uED44",
    "MultimediaDMP": "\uED47",
    "KeyboardOneHanded": "\uED4C",
    "Narrator": "\uED4D",
    "EmojiTabPeople": "\uED53",
    "EmojiTabSmilesAnimals": "\uED54",
    "EmojiTabCelebrationObjects": "\uED55",
    "EmojiTabFoodPlants": "\uED56",
    "EmojiTabTransitPlaces": "\uED57",
    "EmojiTabSymbols": "\uED58",
    "EmojiTabTextSmiles": "\uED59",
    "EmojiTabFavorites": "\uED5A",
    "EmojiSwatch": "\uED5B",
    "ConnectApp": "\uED5C",
    "CompanionDeviceFramework": "\uED5D",
    "Ruler": "\uED5E",
    "FingerInking": "\uED5F",
    "StrokeErase": "\uED60",
    "PointErase": "\uED61",
    "ClearAllInk": "\uED62",
    "Pencil": "\uED63",
    "Marker": "\uED64",
    "InkingCaret": "\uED65",
    "InkingColorOutline": "\uED66",
    "InkingColorFill": "\uED67",
    "HardDrive": "\uEDA2",
    "NetworkAdapter": "\uEDA3",
    "Touchscreen": "\uEDA4",
    "NetworkPrinter": "\uEDA5",
    "CloudPrinter": "\uEDA6",
    "KeyboardShortcut": "\uEDA7",
    "BrushSize": "\uEDA8",
    "NarratorForward": "\uEDA9",
    "NarratorForwardMirrored": "\uEDAA",
    "SyncBadge12": "\uEDAB",
    "RingerBadge12": "\uEDAC",
    "AsteriskBadge12": "\uEDAD",
    "ErrorBadge12": "\uEDAE",
    "CircleRingBadge12": "\uEDAF",
    "CircleFillBadge12": "\uEDB0",
    "ImportantBadge12": "\uEDB1",
    "MailBadge12": "\uEDB3",
    "PauseBadge12": "\uEDB4",
    "PlayBadge12": "\uEDB5",
    "PenWorkspace": "\uEDC6",
    "Export": "\uEDE1",
    "ExportMirrored": "\uEDE2",
    "CaligraphyPen": "\uEDFB",
    "ReplyMirrored": "\uEE35",
    "LockscreenDesktop": "\uEE3F",
    "Multitask16": "\uEE40",
    "Play36": "\uEE4A",
    "PenPalette": "\uEE56",
    "GuestUser": "\uEE57",
    "SettingsBattery": "\uEE63",
    "TaskbarPhone": "\uEE64",
    "LockScreenGlance": "\uEE65",
    "ImageExport": "\uEE71",
    "WifiEthernet": "\uEE77",
    "ActionCenterQuiet": "\uEE79",
    "ActionCenterQuietNotification": "\uEE7A",
    "TrackersMirrored": "\uEE92",
    "DateTimeMirrored": "\uEE93",
    "Wheel": "\uEE94",
    "PenWorkspaceMirrored": "\uEF15",
    "PenPaletteMirrored": "\uEF16",
    "StrokeEraseMirrored": "\uEF17",
    "PointEraseMirrored": "\uEF18",
    "ClearAllInkMirrored": "\uEF19",
    "BackgroundToggle": "\uEF1F",
    "Marquee": "\uEF20"
};

});

unwrapExports(icons);

var Icon_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });




var icons$$1 = icons.default;
exports.icons = icons$$1;
var emptyFunc = function () { };
var Icon = /** @class */ (function (_super) {
    __extends(Icon, _super);
    function Icon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            hovered: false
        };
        _this.handleMouseEnter = function (e) {
            _this.props.onMouseEnter(e);
            _this.setState({
                hovered: true
            });
        };
        _this.handleMouseLeave = function (e) {
            _this.props.onMouseLeave(e);
            _this.setState({
                hovered: false
            });
        };
        return _this;
    }
    Icon.prototype.render = function () {
        var _a = this.props, size = _a.size, className = _a.className, style = _a.style, hoverStyle = _a.hoverStyle, activeStyle = _a.activeStyle, children = _a.children, useSVGElement = _a.useSVGElement, attributes = __rest(_a, ["size", "className", "style", "hoverStyle", "activeStyle", "children", "useSVGElement"]);
        var theme = this.context.theme;
        var hovered = this.state.hovered;
        var inlineStyle = theme.prefixStyle(__assign({ display: "inline-block", textAlign: "center", verticalAlign: "middle", fontFamily: theme.fonts.segoeMDL2Assets, transition: "all .25s", border: "none", outline: "none", userSelect: "none", width: size, height: size, lineHeight: size ? size + "px" : "inherit", fontSize: size || "inherit", color: "inherit" }, style, { "&:hover": hovered ? hoverStyle : void 0, "&:active": activeStyle }));
        var styleClasses = theme.prepareStyle({
            className: "icon",
            style: inlineStyle,
            extendsClassName: className
        });
        var icon = icons$$1[children] || children;
        return (react.createElement(PseudoClasses_1.default, __assign({}, attributes, { onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave }, styleClasses), useSVGElement ? (react.createElement("text", null, icon)) : (react.createElement("span", null, icon))));
    };
    Icon.defaultProps = {
        useSVGElement: false,
        onMouseEnter: emptyFunc,
        onMouseLeave: emptyFunc
    };
    Icon.contextTypes = { theme: propTypes.object };
    return Icon;
}(react.Component));
exports.Icon = Icon;
exports.default = Icon;

});

var Icon = unwrapExports(Icon_1);
var Icon_2 = Icon_1.icons;
var Icon_3 = Icon_1.Icon;

var chainFunction = function chain(){
  var len = arguments.length;
  var args = [];

  for (var i = 0; i < len; i++)
    args[i] = arguments[i];

  args = args.filter(function(fn){ return fn != null });

  if (args.length === 0) return undefined
  if (args.length === 1) return args[0]

  return args.reduce(function(current, next){
    return function chainedFunction() {
      current.apply(this, arguments);
      next.apply(this, arguments);
    };
  })
};

/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

var browser = warning;

var ChildMapping = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.getChildMapping = getChildMapping;
exports.mergeChildMappings = mergeChildMappings;



/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {*} children `this.props.children`
 * @return {object} Mapping of key to child
 */
function getChildMapping(children) {
  if (!children) {
    return children;
  }
  var result = {};
  react.Children.map(children, function (child) {
    return child;
  }).forEach(function (child) {
    result[child.key] = child;
  });
  return result;
}

/**
 * When you're adding or removing children some may be added or removed in the
 * same render pass. We want to show *both* since we want to simultaneously
 * animate elements in and out. This function takes a previous set of keys
 * and a new set of keys and merges them with its best guess of the correct
 * ordering. In the future we may expose some of the utilities in
 * ReactMultiChild to make this easy, but for now React itself does not
 * directly have this concept of the union of prevChildren and nextChildren
 * so we implement it here.
 *
 * @param {object} prev prev children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param {object} next next children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return {object} a key set that contains all keys in `prev` and all keys
 * in `next` in a reasonable order.
 */
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};

  function getValueForKey(key) {
    if (next.hasOwnProperty(key)) {
      return next[key];
    }

    return prev[key];
  }

  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  var nextKeysPending = {};

  var pendingKeys = [];
  for (var prevKey in prev) {
    if (next.hasOwnProperty(prevKey)) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }

  var i = void 0;
  var childMapping = {};
  for (var nextKey in next) {
    if (nextKeysPending.hasOwnProperty(nextKey)) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }

  // Finally, add the keys which didn't appear before any key in `next`
  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }

  return childMapping;
}
});

unwrapExports(ChildMapping);
var ChildMapping_1 = ChildMapping.getChildMapping;
var ChildMapping_2 = ChildMapping.mergeChildMappings;

var TransitionGroup_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _chainFunction2 = _interopRequireDefault(chainFunction);



var _react2 = _interopRequireDefault(react);



var _propTypes2 = _interopRequireDefault(propTypes);



var _warning2 = _interopRequireDefault(browser);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes$$1 = {
  component: _propTypes2.default.any,
  childFactory: _propTypes2.default.func,
  children: _propTypes2.default.node
};

var defaultProps = {
  component: 'span',
  childFactory: function childFactory(child) {
    return child;
  }
};

var TransitionGroup = function (_React$Component) {
  _inherits(TransitionGroup, _React$Component);

  function TransitionGroup(props, context) {
    _classCallCheck(this, TransitionGroup);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.performAppear = function (key, component) {
      _this.currentlyTransitioningKeys[key] = true;

      if (component.componentWillAppear) {
        component.componentWillAppear(_this._handleDoneAppearing.bind(_this, key, component));
      } else {
        _this._handleDoneAppearing(key, component);
      }
    };

    _this._handleDoneAppearing = function (key, component) {
      if (component.componentDidAppear) {
        component.componentDidAppear();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, ChildMapping.getChildMapping)(_this.props.children);

      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        // This was removed before it had fully appeared. Remove it.
        _this.performLeave(key, component);
      }
    };

    _this.performEnter = function (key, component) {
      _this.currentlyTransitioningKeys[key] = true;

      if (component.componentWillEnter) {
        component.componentWillEnter(_this._handleDoneEntering.bind(_this, key, component));
      } else {
        _this._handleDoneEntering(key, component);
      }
    };

    _this._handleDoneEntering = function (key, component) {
      if (component.componentDidEnter) {
        component.componentDidEnter();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, ChildMapping.getChildMapping)(_this.props.children);

      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        // This was removed before it had fully entered. Remove it.
        _this.performLeave(key, component);
      }
    };

    _this.performLeave = function (key, component) {
      _this.currentlyTransitioningKeys[key] = true;

      if (component.componentWillLeave) {
        component.componentWillLeave(_this._handleDoneLeaving.bind(_this, key, component));
      } else {
        // Note that this is somewhat dangerous b/c it calls setState()
        // again, effectively mutating the component before all the work
        // is done.
        _this._handleDoneLeaving(key, component);
      }
    };

    _this._handleDoneLeaving = function (key, component) {
      if (component.componentDidLeave) {
        component.componentDidLeave();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, ChildMapping.getChildMapping)(_this.props.children);

      if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
        // This entered again before it fully left. Add it again.
        _this.keysToEnter.push(key);
      } else {
        _this.setState(function (state) {
          var newChildren = _extends({}, state.children);
          delete newChildren[key];
          return { children: newChildren };
        });
      }
    };

    _this.childRefs = Object.create(null);

    _this.state = {
      children: (0, ChildMapping.getChildMapping)(props.children)
    };
    return _this;
  }

  TransitionGroup.prototype.componentWillMount = function componentWillMount() {
    this.currentlyTransitioningKeys = {};
    this.keysToEnter = [];
    this.keysToLeave = [];
  };

  TransitionGroup.prototype.componentDidMount = function componentDidMount() {
    var initialChildMapping = this.state.children;
    for (var key in initialChildMapping) {
      if (initialChildMapping[key]) {
        this.performAppear(key, this.childRefs[key]);
      }
    }
  };

  TransitionGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var nextChildMapping = (0, ChildMapping.getChildMapping)(nextProps.children);
    var prevChildMapping = this.state.children;

    this.setState({
      children: (0, ChildMapping.mergeChildMappings)(prevChildMapping, nextChildMapping)
    });

    for (var key in nextChildMapping) {
      var hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
      if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
        this.keysToEnter.push(key);
      }
    }

    for (var _key in prevChildMapping) {
      var hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(_key);
      if (prevChildMapping[_key] && !hasNext && !this.currentlyTransitioningKeys[_key]) {
        this.keysToLeave.push(_key);
      }
    }

    // If we want to someday check for reordering, we could do it here.
  };

  TransitionGroup.prototype.componentDidUpdate = function componentDidUpdate() {
    var _this2 = this;

    var keysToEnter = this.keysToEnter;
    this.keysToEnter = [];
    keysToEnter.forEach(function (key) {
      return _this2.performEnter(key, _this2.childRefs[key]);
    });

    var keysToLeave = this.keysToLeave;
    this.keysToLeave = [];
    keysToLeave.forEach(function (key) {
      return _this2.performLeave(key, _this2.childRefs[key]);
    });
  };

  TransitionGroup.prototype.render = function render() {
    var _this3 = this;

    // TODO: we could get rid of the need for the wrapper node
    // by cloning a single child
    var childrenToRender = [];

    var _loop = function _loop(key) {
      var child = _this3.state.children[key];
      if (child) {
        var isCallbackRef = typeof child.ref !== 'string';
        var factoryChild = _this3.props.childFactory(child);
        var ref = function ref(r) {
          _this3.childRefs[key] = r;
        };

        // Always chaining the refs leads to problems when the childFactory
        // wraps the child. The child ref callback gets called twice with the
        // wrapper and the child. So we only need to chain the ref if the
        // factoryChild is not different from child.
        if (factoryChild === child && isCallbackRef) {
          ref = (0, _chainFunction2.default)(child.ref, ref);
        }

        // You may need to apply reactive updates to a child as it is leaving.
        // The normal React way to do it won't work since the child will have
        // already been removed. In case you need this behavior you can provide
        // a childFactory function to wrap every child, even the ones that are
        // leaving.
        childrenToRender.push(_react2.default.cloneElement(factoryChild, {
          key: key,
          ref: ref
        }));
      }
    };

    for (var key in this.state.children) {
      _loop(key);
    }

    // Do not forward TransitionGroup props to primitive DOM nodes
    var props = _extends({}, this.props);
    delete props.transitionLeave;
    delete props.transitionName;
    delete props.transitionAppear;
    delete props.transitionEnter;
    delete props.childFactory;
    delete props.transitionLeaveTimeout;
    delete props.transitionEnterTimeout;
    delete props.transitionAppearTimeout;
    delete props.component;

    return _react2.default.createElement(this.props.component, props, childrenToRender);
  };

  return TransitionGroup;
}(_react2.default.Component);

TransitionGroup.displayName = 'TransitionGroup';


TransitionGroup.propTypes = {};
TransitionGroup.defaultProps = defaultProps;

exports.default = TransitionGroup;
module.exports = exports['default'];
});

unwrapExports(TransitionGroup_1);

var interopRequireDefault = createCommonjsModule(function (module) {
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = _interopRequireDefault;
});

unwrapExports(interopRequireDefault);

var hasClass_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.default = hasClass;

function hasClass(element, className) {
  if (element.classList) return !!className && element.classList.contains(className);else return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}

module.exports = exports["default"];
});

unwrapExports(hasClass_1);

var addClass_1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = addClass;

var _hasClass = interopRequireDefault(hasClass_1);

function addClass(element, className) {
  if (element.classList) element.classList.add(className);else if (!(0, _hasClass.default)(element, className)) if (typeof element.className === 'string') element.className = element.className + ' ' + className;else element.setAttribute('class', (element.className && element.className.baseVal || '') + ' ' + className);
}

module.exports = exports["default"];
});

unwrapExports(addClass_1);

function replaceClassName(origClass, classToRemove) {
  return origClass.replace(new RegExp('(^|\\s)' + classToRemove + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
}

var removeClass = function removeClass(element, className) {
  if (element.classList) element.classList.remove(className);else if (typeof element.className === 'string') element.className = replaceClassName(element.className, className);else element.setAttribute('class', replaceClassName(element.className && element.className.baseVal || '', className));
};

var inDOM = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.default = void 0;

var _default = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

exports.default = _default;
module.exports = exports["default"];
});

unwrapExports(inDOM);

var requestAnimationFrame$1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = void 0;

var _inDOM = interopRequireDefault(inDOM);

var vendors = ['', 'webkit', 'moz', 'o', 'ms'];
var cancel = 'clearTimeout';
var raf = fallback;
var compatRaf;

var getKey = function getKey(vendor, k) {
  return vendor + (!vendor ? k : k[0].toUpperCase() + k.substr(1)) + 'AnimationFrame';
};

if (_inDOM.default) {
  vendors.some(function (vendor) {
    var rafKey = getKey(vendor, 'request');

    if (rafKey in window) {
      cancel = getKey(vendor, 'cancel');
      return raf = function raf(cb) {
        return window[rafKey](cb);
      };
    }
  });
}
/* https://github.com/component/raf */


var prev = new Date().getTime();

function fallback(fn) {
  var curr = new Date().getTime(),
      ms = Math.max(0, 16 - (curr - prev)),
      req = setTimeout(fn, ms);
  prev = curr;
  return req;
}

compatRaf = function compatRaf(cb) {
  return raf(cb);
};

compatRaf.cancel = function (id) {
  window[cancel] && typeof window[cancel] === 'function' && window[cancel](id);
};

var _default = compatRaf;
exports.default = _default;
module.exports = exports["default"];
});

unwrapExports(requestAnimationFrame$1);

var properties = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = exports.animationEnd = exports.animationDelay = exports.animationTiming = exports.animationDuration = exports.animationName = exports.transitionEnd = exports.transitionDuration = exports.transitionDelay = exports.transitionTiming = exports.transitionProperty = exports.transform = void 0;

var _inDOM = interopRequireDefault(inDOM);

var transform = 'transform';
exports.transform = transform;
var prefix, transitionEnd, animationEnd;
exports.animationEnd = animationEnd;
exports.transitionEnd = transitionEnd;
var transitionProperty, transitionDuration, transitionTiming, transitionDelay;
exports.transitionDelay = transitionDelay;
exports.transitionTiming = transitionTiming;
exports.transitionDuration = transitionDuration;
exports.transitionProperty = transitionProperty;
var animationName, animationDuration, animationTiming, animationDelay;
exports.animationDelay = animationDelay;
exports.animationTiming = animationTiming;
exports.animationDuration = animationDuration;
exports.animationName = animationName;

if (_inDOM.default) {
  var _getTransitionPropert = getTransitionProperties();

  prefix = _getTransitionPropert.prefix;
  exports.transitionEnd = transitionEnd = _getTransitionPropert.transitionEnd;
  exports.animationEnd = animationEnd = _getTransitionPropert.animationEnd;
  exports.transform = transform = prefix + "-" + transform;
  exports.transitionProperty = transitionProperty = prefix + "-transition-property";
  exports.transitionDuration = transitionDuration = prefix + "-transition-duration";
  exports.transitionDelay = transitionDelay = prefix + "-transition-delay";
  exports.transitionTiming = transitionTiming = prefix + "-transition-timing-function";
  exports.animationName = animationName = prefix + "-animation-name";
  exports.animationDuration = animationDuration = prefix + "-animation-duration";
  exports.animationTiming = animationTiming = prefix + "-animation-delay";
  exports.animationDelay = animationDelay = prefix + "-animation-timing-function";
}

var _default = {
  transform: transform,
  end: transitionEnd,
  property: transitionProperty,
  timing: transitionTiming,
  delay: transitionDelay,
  duration: transitionDuration
};
exports.default = _default;

function getTransitionProperties() {
  var style = document.createElement('div').style;
  var vendorMap = {
    O: function O(e) {
      return "o" + e.toLowerCase();
    },
    Moz: function Moz(e) {
      return e.toLowerCase();
    },
    Webkit: function Webkit(e) {
      return "webkit" + e;
    },
    ms: function ms(e) {
      return "MS" + e;
    }
  };
  var vendors = Object.keys(vendorMap);
  var transitionEnd, animationEnd;
  var prefix = '';

  for (var i = 0; i < vendors.length; i++) {
    var vendor = vendors[i];

    if (vendor + "TransitionProperty" in style) {
      prefix = "-" + vendor.toLowerCase();
      transitionEnd = vendorMap[vendor]('TransitionEnd');
      animationEnd = vendorMap[vendor]('AnimationEnd');
      break;
    }
  }

  if (!transitionEnd && 'transitionProperty' in style) transitionEnd = 'transitionend';
  if (!animationEnd && 'animationName' in style) animationEnd = 'animationend';
  style = null;
  return {
    animationEnd: animationEnd,
    transitionEnd: transitionEnd,
    prefix: prefix
  };
}
});

unwrapExports(properties);
var properties_1 = properties.animationEnd;
var properties_2 = properties.animationDelay;
var properties_3 = properties.animationTiming;
var properties_4 = properties.animationDuration;
var properties_5 = properties.animationName;
var properties_6 = properties.transitionEnd;
var properties_7 = properties.transitionDuration;
var properties_8 = properties.transitionDelay;
var properties_9 = properties.transitionTiming;
var properties_10 = properties.transitionProperty;
var properties_11 = properties.transform;

var PropTypes = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.nameShape = undefined;
exports.transitionTimeout = transitionTimeout;



var _react2 = _interopRequireDefault(react);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transitionTimeout(transitionType) {
  var timeoutPropName = 'transition' + transitionType + 'Timeout';
  var enabledPropName = 'transition' + transitionType;

  return function (props) {
    // If the transition is enabled
    if (props[enabledPropName]) {
      // If no timeout duration is provided
      if (props[timeoutPropName] == null) {
        return new Error(timeoutPropName + ' wasn\'t supplied to CSSTransitionGroup: ' + 'this can cause unreliable animations and won\'t be supported in ' + 'a future version of React. See ' + 'https://fb.me/react-animation-transition-group-timeout for more ' + 'information.');

        // If the duration isn't a number
      } else if (typeof props[timeoutPropName] !== 'number') {
        return new Error(timeoutPropName + ' must be a number (in milliseconds)');
      }
    }

    return null;
  };
}

var nameShape = exports.nameShape = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
  enter: _propTypes2.default.string,
  leave: _propTypes2.default.string,
  active: _propTypes2.default.string
}), _propTypes2.default.shape({
  enter: _propTypes2.default.string,
  enterActive: _propTypes2.default.string,
  leave: _propTypes2.default.string,
  leaveActive: _propTypes2.default.string,
  appear: _propTypes2.default.string,
  appearActive: _propTypes2.default.string
})]);
});

unwrapExports(PropTypes);
var PropTypes_1 = PropTypes.nameShape;
var PropTypes_2 = PropTypes.transitionTimeout;

var CSSTransitionGroupChild_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _addClass2 = _interopRequireDefault(addClass_1);



var _removeClass2 = _interopRequireDefault(removeClass);



var _requestAnimationFrame2 = _interopRequireDefault(requestAnimationFrame$1);





var _react2 = _interopRequireDefault(react);



var _propTypes2 = _interopRequireDefault(propTypes);





function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var events = [];
if (properties.transitionEnd) events.push(properties.transitionEnd);
if (properties.animationEnd) events.push(properties.animationEnd);

function addEndListener(node, listener) {
  if (events.length) {
    events.forEach(function (e) {
      return node.addEventListener(e, listener, false);
    });
  } else {
    setTimeout(listener, 0);
  }

  return function () {
    if (!events.length) return;
    events.forEach(function (e) {
      return node.removeEventListener(e, listener, false);
    });
  };
}

var propTypes$$1 = {
  children: _propTypes2.default.node,
  name: PropTypes.nameShape.isRequired,

  // Once we require timeouts to be specified, we can remove the
  // boolean flags (appear etc.) and just accept a number
  // or a bool for the timeout flags (appearTimeout etc.)
  appear: _propTypes2.default.bool,
  enter: _propTypes2.default.bool,
  leave: _propTypes2.default.bool,
  appearTimeout: _propTypes2.default.number,
  enterTimeout: _propTypes2.default.number,
  leaveTimeout: _propTypes2.default.number
};

var CSSTransitionGroupChild = function (_React$Component) {
  _inherits(CSSTransitionGroupChild, _React$Component);

  function CSSTransitionGroupChild() {
    var _temp, _this, _ret;

    _classCallCheck(this, CSSTransitionGroupChild);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.componentWillAppear = function (done) {
      if (_this.props.appear) {
        _this.transition('appear', done, _this.props.appearTimeout);
      } else {
        done();
      }
    }, _this.componentWillEnter = function (done) {
      if (_this.props.enter) {
        _this.transition('enter', done, _this.props.enterTimeout);
      } else {
        done();
      }
    }, _this.componentWillLeave = function (done) {
      if (_this.props.leave) {
        _this.transition('leave', done, _this.props.leaveTimeout);
      } else {
        done();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  CSSTransitionGroupChild.prototype.componentWillMount = function componentWillMount() {
    this.classNameAndNodeQueue = [];
    this.transitionTimeouts = [];
  };

  CSSTransitionGroupChild.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unmounted = true;

    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.transitionTimeouts.forEach(function (timeout) {
      clearTimeout(timeout);
    });

    this.classNameAndNodeQueue.length = 0;
  };

  CSSTransitionGroupChild.prototype.transition = function transition(animationType, finishCallback, timeout) {
    var node = (0, reactDom.findDOMNode)(this);

    if (!node) {
      if (finishCallback) {
        finishCallback();
      }
      return;
    }

    var className = this.props.name[animationType] || this.props.name + '-' + animationType;
    var activeClassName = this.props.name[animationType + 'Active'] || className + '-active';
    var timer = null;
    var removeListeners = void 0;

    (0, _addClass2.default)(node, className);

    // Need to do this to actually trigger a transition.
    this.queueClassAndNode(activeClassName, node);

    // Clean-up the animation after the specified delay
    var finish = function finish(e) {
      if (e && e.target !== node) {
        return;
      }

      clearTimeout(timer);
      if (removeListeners) removeListeners();

      (0, _removeClass2.default)(node, className);
      (0, _removeClass2.default)(node, activeClassName);

      if (removeListeners) removeListeners();

      // Usually this optional callback is used for informing an owner of
      // a leave animation and telling it to remove the child.
      if (finishCallback) {
        finishCallback();
      }
    };

    if (timeout) {
      timer = setTimeout(finish, timeout);
      this.transitionTimeouts.push(timer);
    } else if (properties.transitionEnd) {
      removeListeners = addEndListener(node, finish);
    }
  };

  CSSTransitionGroupChild.prototype.queueClassAndNode = function queueClassAndNode(className, node) {
    var _this2 = this;

    this.classNameAndNodeQueue.push({
      className: className,
      node: node
    });

    if (!this.rafHandle) {
      this.rafHandle = (0, _requestAnimationFrame2.default)(function () {
        return _this2.flushClassNameAndNodeQueue();
      });
    }
  };

  CSSTransitionGroupChild.prototype.flushClassNameAndNodeQueue = function flushClassNameAndNodeQueue() {
    if (!this.unmounted) {
      this.classNameAndNodeQueue.forEach(function (obj) {
        // This is for to force a repaint,
        // which is necessary in order to transition styles when adding a class name.
        /* eslint-disable no-unused-expressions */
        obj.node.scrollTop;
        /* eslint-enable no-unused-expressions */
        (0, _addClass2.default)(obj.node, obj.className);
      });
    }
    this.classNameAndNodeQueue.length = 0;
    this.rafHandle = null;
  };

  CSSTransitionGroupChild.prototype.render = function render() {
    var props = _extends({}, this.props);
    delete props.name;
    delete props.appear;
    delete props.enter;
    delete props.leave;
    delete props.appearTimeout;
    delete props.enterTimeout;
    delete props.leaveTimeout;
    delete props.children;
    return _react2.default.cloneElement(_react2.default.Children.only(this.props.children), props);
  };

  return CSSTransitionGroupChild;
}(_react2.default.Component);

CSSTransitionGroupChild.displayName = 'CSSTransitionGroupChild';


CSSTransitionGroupChild.propTypes = {};

exports.default = CSSTransitionGroupChild;
module.exports = exports['default'];
});

unwrapExports(CSSTransitionGroupChild_1);

var CSSTransitionGroup_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(react);



var _propTypes2 = _interopRequireDefault(propTypes);



var _TransitionGroup2 = _interopRequireDefault(TransitionGroup_1);



var _CSSTransitionGroupChild2 = _interopRequireDefault(CSSTransitionGroupChild_1);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes$$1 = {
  transitionName: PropTypes.nameShape.isRequired,

  transitionAppear: _propTypes2.default.bool,
  transitionEnter: _propTypes2.default.bool,
  transitionLeave: _propTypes2.default.bool,
  transitionAppearTimeout: (0, PropTypes.transitionTimeout)('Appear'),
  transitionEnterTimeout: (0, PropTypes.transitionTimeout)('Enter'),
  transitionLeaveTimeout: (0, PropTypes.transitionTimeout)('Leave')
};

var defaultProps = {
  transitionAppear: false,
  transitionEnter: true,
  transitionLeave: true
};

var CSSTransitionGroup = function (_React$Component) {
  _inherits(CSSTransitionGroup, _React$Component);

  function CSSTransitionGroup() {
    var _temp, _this, _ret;

    _classCallCheck(this, CSSTransitionGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this._wrapChild = function (child) {
      return _react2.default.createElement(_CSSTransitionGroupChild2.default, {
        name: _this.props.transitionName,
        appear: _this.props.transitionAppear,
        enter: _this.props.transitionEnter,
        leave: _this.props.transitionLeave,
        appearTimeout: _this.props.transitionAppearTimeout,
        enterTimeout: _this.props.transitionEnterTimeout,
        leaveTimeout: _this.props.transitionLeaveTimeout
      }, child);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // We need to provide this childFactory so that
  // ReactCSSTransitionGroupChild can receive updates to name, enter, and
  // leave while it is leaving.


  CSSTransitionGroup.prototype.render = function render() {
    return _react2.default.createElement(_TransitionGroup2.default, _extends({}, this.props, { childFactory: this._wrapChild }));
  };

  return CSSTransitionGroup;
}(_react2.default.Component);

CSSTransitionGroup.displayName = 'CSSTransitionGroup';


CSSTransitionGroup.propTypes = {};
CSSTransitionGroup.defaultProps = defaultProps;

exports.default = CSSTransitionGroup;
module.exports = exports['default'];
});

unwrapExports(CSSTransitionGroup_1);

var reactTransitionGroup = createCommonjsModule(function (module) {



var _CSSTransitionGroup2 = _interopRequireDefault(CSSTransitionGroup_1);



var _TransitionGroup2 = _interopRequireDefault(TransitionGroup_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  TransitionGroup: _TransitionGroup2.default,
  CSSTransitionGroup: _CSSTransitionGroup2.default
};
});

unwrapExports(reactTransitionGroup);
var reactTransitionGroup_1 = reactTransitionGroup.TransitionGroup;
var reactTransitionGroup_2 = reactTransitionGroup.CSSTransitionGroup;

var CustomAnimateChild_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });



var CustomAnimateChild = /** @class */ (function (_super) {
    __extends(CustomAnimateChild, _super);
    function CustomAnimateChild() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.componentWillAppear = _this.props.appearAnimate ? function (callback) {
            if (_this.props.mode !== "out") {
                _this.setLeaveStyle(callback);
            }
            else {
                callback();
            }
        } : void 0;
        _this.componentDidAppear = _this.props.appearAnimate ? function () {
            if (_this.props.mode !== "out") {
                _this.enterTimer = setTimeout(function () {
                    _this.setEnterStyle();
                }, _this.props.enterDelay);
            }
        } : void 0;
        _this.setEnterStyle = function (callback) {
            if (callback === void 0) { callback = function () { }; }
            var _a = _this.props, speed = _a.speed, enterDelay = _a.enterDelay, enterStyle = _a.enterStyle;
            var style = _this.getRootElmOrComponentStyle(_this.rootElm);
            Object.assign(style, _this.context.theme.prefixStyle(enterStyle));
            _this.enterTimer = setTimeout(callback, speed + enterDelay);
        };
        _this.setLeaveStyle = function (callback, revers) {
            if (callback === void 0) { callback = function () { }; }
            if (revers === void 0) { revers = false; }
            var _a = _this.props, speed = _a.speed, leaveDelay = _a.leaveDelay;
            var style = _this.getRootElmOrComponentStyle(_this.rootElm);
            Object.assign(style, _this.context.theme.prefixStyle(_this.props.leaveStyle));
            callback();
        };
        _this.getRootElmOrComponentStyle = function (rootElm) {
            var style = rootElm.style;
            if (style) {
                return style;
            }
            else {
                rootElm = reactDom.findDOMNode(rootElm);
                style = rootElm.style;
                if (style) {
                    return style;
                }
                else if (rootElm) {
                    return _this.getRootElmOrComponentStyle(rootElm);
                }
                else {
                    return {};
                }
            }
        };
        return _this;
    }
    CustomAnimateChild.prototype.componentWillEnter = function (callback) {
        var _this = this;
        var _a = this.props, mode = _a.mode, speed = _a.speed, enterDelay = _a.enterDelay;
        clearTimeout(this.leaveTimer);
        var style = this.rootElm.style;
        var display = style.display;
        style.display = "none";
        this.displayStyleTimer = setTimeout(function () {
            style.display = display;
        }, (mode === "in" ? 0 : speed) + enterDelay);
        if (mode === "out") {
            this.enterTimer = setTimeout(function () {
                _this.setEnterStyle();
                callback();
            }, speed);
            return;
        }
        this.setLeaveStyle();
        this.enterTimer = setTimeout(function () {
            style.display = display;
            _this.setEnterStyle();
            callback();
        }, mode === "in" ? 40 + enterDelay : speed + 40 + enterDelay);
    };
    CustomAnimateChild.prototype.componentWillLeave = function (callback) {
        var _this = this;
        if (this.props.mode !== "in") {
            this.setLeaveStyle();
            this.leaveTimer = setTimeout(function () {
                _this.rootElm.style.display = "none";
                callback();
            }, this.props.speed + this.props.leaveDelay);
        }
        else {
            this.rootElm.style.display = "none";
            callback();
        }
    };
    CustomAnimateChild.prototype.componentWillUnmount = function () {
        clearTimeout(this.enterTimer);
        clearTimeout(this.leaveTimer);
        clearTimeout(this.displayStyleTimer);
    };
    CustomAnimateChild.prototype.render = function () {
        var _this = this;
        var _a = this.props, appearAnimate = _a.appearAnimate, children = _a.children, enterDelay = _a.enterDelay, leaveDelay = _a.leaveDelay, mode = _a.mode, speed = _a.speed, style = _a.style, leaveStyle = _a.leaveStyle, enterStyle = _a.enterStyle, transitionTimingFunction = _a.transitionTimingFunction, attributes = __rest(_a, ["appearAnimate", "children", "enterDelay", "leaveDelay", "mode", "speed", "style", "leaveStyle", "enterStyle", "transitionTimingFunction"]);
        var theme = this.context.theme;
        var currStyle = theme.prefixStyle(__assign({ transition: "all " + speed + "ms" + (transitionTimingFunction ? " " + transitionTimingFunction : "") }, style, children.props.style, (appearAnimate ? leaveStyle : Object.assign({}, leaveStyle, enterStyle))));
        return typeof children !== "object" ? (react.createElement("span", __assign({}, attributes, { ref: function (rootElm) { return _this.rootElm = rootElm; }, style: currStyle }), children)) : react.cloneElement(children, {
            style: currStyle,
            ref: function (rootElm) { return _this.rootElm = rootElm; }
        });
    };
    CustomAnimateChild.contextTypes = { theme: propTypes.object };
    return CustomAnimateChild;
}(react.Component));
exports.default = CustomAnimateChild;

});

unwrapExports(CustomAnimateChild_1);

var CustomAnimate_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });




var baseStyle = {
    display: "inline-block",
    verticalAlign: "middle"
};
function FirstChild(props) {
    var childrenArray = react.Children.toArray(props.children);
    return childrenArray[0] || null;
}
var CustomAnimate = /** @class */ (function (_super) {
    __extends(CustomAnimate, _super);
    function CustomAnimate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.customAnimateChildArray = [];
        _this.setLeaveStyle = function () {
            for (var _i = 0, _a = _this.customAnimateChildArray; _i < _a.length; _i++) {
                var customAnimateChild = _a[_i];
                customAnimateChild.setLeaveStyle();
            }
        };
        _this.setEnterStyle = function () {
            for (var _i = 0, _a = _this.customAnimateChildArray; _i < _a.length; _i++) {
                var customAnimateChild = _a[_i];
                customAnimateChild.setEnterStyle();
            }
        };
        return _this;
    }
    CustomAnimate.prototype.render = function () {
        var _this = this;
        var _a = this.props, appearAnimate = _a.appearAnimate, children = _a.children, enterDelay = _a.enterDelay, leaveDelay = _a.leaveDelay, mode = _a.mode, speed = _a.speed, style = _a.style, leaveStyle = _a.leaveStyle, enterStyle = _a.enterStyle, transitionTimingFunction = _a.transitionTimingFunction, wrapperStyle = _a.wrapperStyle, component = _a.component, useWrapper = _a.useWrapper, others = __rest(_a, ["appearAnimate", "children", "enterDelay", "leaveDelay", "mode", "speed", "style", "leaveStyle", "enterStyle", "transitionTimingFunction", "wrapperStyle", "component", "useWrapper"]);
        return (react.createElement(reactTransitionGroup.TransitionGroup, __assign({}, others, { style: __assign({}, baseStyle, (useWrapper ? wrapperStyle : leaveStyle)), component: useWrapper ? component : FirstChild }), react.Children.map(children, function (child, index) { return (react.createElement(CustomAnimateChild_1.default, { ref: function (customAnimateChild) { return _this.customAnimateChildArray[index] = customAnimateChild; }, key: child.key, enterDelay: enterDelay, leaveDelay: leaveDelay, mode: mode, style: style, speed: speed, appearAnimate: appearAnimate, leaveStyle: style ? __assign({}, style, leaveStyle) : leaveStyle, enterStyle: style ? __assign({}, style, enterStyle) : enterStyle, transitionTimingFunction: transitionTimingFunction }, useWrapper ? react.createElement("span", { style: __assign({}, baseStyle, { width: "100%" }) }, child) : child)); })));
    };
    CustomAnimate.defaultProps = {
        leaveStyle: { opacity: 0 },
        enterStyle: { opacity: 1 },
        appearAnimate: true,
        enterDelay: 0,
        leaveDelay: 0,
        mode: "in-out",
        speed: 500,
        component: "span",
        useWrapper: true
    };
    CustomAnimate.contextTypes = { theme: propTypes.object };
    return CustomAnimate;
}(react.Component));
exports.CustomAnimate = CustomAnimate;
var slideBottomInProps = {
    leaveStyle: {
        transform: "translateY(100%)",
        opacity: 0
    },
    enterStyle: {
        transform: "translateY(0)",
        opacity: 1
    },
    wrapperStyle: { overflow: "hidden" },
    speed: 500,
    useWrapper: true
};
exports.slideBottomInProps = slideBottomInProps;
var slideTopInProps = {
    leaveStyle: {
        transform: "translateY(-100%)",
        opacity: 0
    },
    enterStyle: {
        transform: "translateY(0)",
        opacity: 1
    },
    wrapperStyle: { overflow: "hidden" },
    speed: 500,
    useWrapper: true
};
exports.slideTopInProps = slideTopInProps;
var slideLeftInProps = {
    leaveStyle: {
        transform: "translateX(-100%)",
        opacity: 0
    },
    enterStyle: {
        transform: "translateX(0)",
        opacity: 1
    },
    wrapperStyle: { overflow: "hidden" },
    speed: 500,
    useWrapper: true
};
exports.slideLeftInProps = slideLeftInProps;
var slideRightInProps = {
    leaveStyle: {
        transform: "translateX(100%)",
        opacity: 0
    },
    enterStyle: {
        transform: "translateX(0)",
        opacity: 1
    },
    wrapperStyle: { overflow: "hidden" },
    appearAnimate: true,
    speed: 500,
    useWrapper: true
};
exports.slideRightInProps = slideRightInProps;
var scaleInProps = {
    leaveStyle: {
        transform: "scale(0)",
        opacity: 0
    },
    enterStyle: {
        transform: "scale(1)",
        opacity: 1
    },
    appearAnimate: true,
    speed: 500,
    useWrapper: true
};
exports.scaleInProps = scaleInProps;
var fadeInProps = {
    leaveStyle: {
        opacity: 0
    },
    enterStyle: {
        opacity: 1
    },
    appearAnimate: true,
    speed: 500,
    useWrapper: true
};
exports.fadeInProps = fadeInProps;
exports.default = CustomAnimate;

});

var CustomAnimate = unwrapExports(CustomAnimate_1);
var CustomAnimate_2 = CustomAnimate_1.CustomAnimate;
var CustomAnimate_3 = CustomAnimate_1.slideBottomInProps;
var CustomAnimate_4 = CustomAnimate_1.slideTopInProps;
var CustomAnimate_5 = CustomAnimate_1.slideLeftInProps;
var CustomAnimate_6 = CustomAnimate_1.slideRightInProps;
var CustomAnimate_7 = CustomAnimate_1.scaleInProps;
var CustomAnimate_8 = CustomAnimate_1.fadeInProps;

var Toast_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });





var emptyFunc = function () { };
var Toast = /** @class */ (function (_super) {
    __extends(Toast, _super);
    function Toast() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showToast: _this.props.defaultShow
        };
        _this.addCloseDelay = function () {
            clearTimeout(_this.closeTimer);
            var _a = _this.props, closeDelay = _a.closeDelay, onToggleShowToast = _a.onToggleShowToast;
            if (closeDelay !== void 0 && _this.state.showToast) {
                _this.closeTimer = setTimeout(function () {
                    _this.setState({ showToast: false });
                    onToggleShowToast(false);
                }, closeDelay);
            }
        };
        _this.toggleShowToast = function (showToast) {
            var onToggleShowToast = _this.props.onToggleShowToast;
            if (typeof showToast === "boolean") {
                if (showToast !== _this.state.showToast) {
                    _this.setState({ showToast: showToast });
                    onToggleShowToast(showToast);
                }
            }
            else {
                _this.setState(function (prevState, prevProps) {
                    showToast = !prevState.showToast;
                    onToggleShowToast(showToast);
                    return { showToast: showToast };
                });
            }
        };
        _this.trueRender = function () {
            var _a = _this.props, children = _a.children, defaultShow = _a.defaultShow, logoNode = _a.logoNode, title = _a.title, description = _a.description, onToggleShowToast = _a.onToggleShowToast, closeDelay = _a.closeDelay, showCloseIcon = _a.showCloseIcon, className = _a.className, key = _a.key, attributes = __rest(_a, ["children", "defaultShow", "logoNode", "title", "description", "onToggleShowToast", "closeDelay", "showCloseIcon", "className", "key"]);
            var theme = _this.context.theme;
            var styles = getStyles(_this);
            var styleClasses = theme.prepareStyles({
                className: "toast",
                styles: styles
            });
            return (react.createElement(CustomAnimate_1.default, __assign({}, CustomAnimate_1.slideRightInProps, { leaveStyle: CustomAnimate_1.slideRightInProps, appearAnimate: false, wrapperStyle: styles.root, ref: function (customAnimate) { return _this.customAnimate = customAnimate; }, key: key }),
                react.createElement("div", __assign({}, attributes, { style: styleClasses.wrapper.style, className: theme.classNames(styleClasses.wrapper.className, className) }),
                    react.createElement("div", __assign({}, styleClasses.card),
                        logoNode,
                        react.createElement("span", __assign({}, styleClasses.descContent),
                            react.createElement("p", __assign({}, styleClasses.title), title),
                            typeof description === "string" ? (react.createElement("p", __assign({}, styleClasses.description), description)) : (description && description.map(function (desc, index) { return (react.createElement("p", __assign({}, styleClasses.description, { key: "" + index }), desc)); })))),
                    showCloseIcon && (react.createElement(Icon_1.default, { style: styles.closeIcon, hoverStyle: { color: theme.baseHigh }, onClick: function () { return _this.toggleShowToast(false); } }, "ClearLegacy")),
                    children)));
        };
        return _this;
    }
    Toast.prototype.componentWillReceiveProps = function (nextProps) {
        var defaultShow = nextProps.defaultShow, closeDelay = nextProps.closeDelay;
        if (defaultShow !== this.state.showToast) {
            this.setState({ showToast: defaultShow });
        }
    };
    Toast.prototype.componentDidMount = function () {
        var _this = this;
        var theme = this.context.theme;
        theme.addToast(this.trueRender(), function (toastId) {
            _this.toastId = toastId;
            _this.customAnimateElm = reactDom.findDOMNode(_this.customAnimate);
            _this.addCloseDelay();
        });
    };
    Toast.prototype.componentDidUpdate = function () {
        var _this = this;
        if (this.toastId !== void 0) {
            this.context.theme.updateToast(this.toastId, this.trueRender());
        }
        if (!this.customAnimateElm) {
            this.customAnimateElm = reactDom.findDOMNode(this.customAnimate);
        }
        var style = (this.customAnimateElm || {}).style;
        if (this.state.showToast && this.customAnimateElm && style) {
            Object.assign(style, {
                height: "auto",
                margin: "10px 0"
            });
            clearTimeout(this.hiddenTimer);
        }
        else if ((!this.state.showToast) && this.customAnimateElm && style) {
            this.hiddenTimer = setTimeout(function () {
                Object.assign(style, {
                    height: "0px",
                    margin: "0px"
                });
                clearTimeout(_this.hiddenTimer);
            }, 250);
        }
        this.addCloseDelay();
    };
    Toast.prototype.componentWillUnmount = function () {
        var deleteToast = this.context.theme.deleteToast;
        deleteToast(this.toastId);
        clearTimeout(this.hiddenTimer);
        clearTimeout(this.closeTimer);
    };
    Toast.prototype.render = function () {
        return null;
    };
    Toast.defaultProps = {
        defaultShow: false,
        onToggleShowToast: emptyFunc,
        showCloseIcon: false
    };
    Toast.contextTypes = { theme: propTypes.object };
    return Toast;
}(react.Component));
exports.Toast = Toast;
function getStyles(Toast) {
    var theme = Toast.context.theme, _a = Toast.props, style = _a.style, showCloseIcon = _a.showCloseIcon, showToast = Toast.state.showToast;
    var prefixStyle = theme.prefixStyle;
    return {
        root: {
            display: "inherit",
            overflow: "hidden",
            transition: "transform .75s, opacity .75s",
            margin: "10px 0",
            opacity: showToast ? 1 : .5,
            transform: "translate3d(" + (showToast ? 0 : "100%") + ", 0, 0)"
        },
        wrapper: prefixStyle(__assign({ width: 320, padding: 10, position: "relative", fontSize: 14, color: theme.baseMediumHigh, background: theme.chromeLow, border: "1px solid " + theme.listLow, pointerEvents: "all", flex: "0 0 auto", overflow: "hidden", height: "auto" }, style)),
        closeIcon: {
            fontSize: 12,
            position: "absolute",
            top: 10,
            right: 10,
            cursor: "pointer"
        },
        card: prefixStyle({
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            fontSize: 18,
            lineHeight: 1.6
        }),
        descContent: {
            marginLeft: 10,
            marginRight: showCloseIcon ? 16 : 0,
            width: "100%"
        },
        title: {
            fontSize: 14,
            color: theme.baseHigh,
            lineHeight: 1.6
        },
        description: {
            fontSize: 12,
            color: theme.baseMedium,
            lineHeight: 1.4
        }
    };
}
exports.default = Toast;

});

var Toast = unwrapExports(Toast_1);
var Toast_2 = Toast_1.Toast;

function _Input(_, ref) {
    const [value, setValue] = react.useState('');
    const { onCommit, clearOnCommit, icon } = _, origProps = __rest(_, ["onCommit", "clearOnCommit", "icon"]);
    const localRef = react_2(null);
    react_3(ref, () => (val) => setValue(val));
    const send = () => {
        if (value) {
            if (_.pattern) {
                const match = value.match(_.pattern);
                if (!match || match[0] !== value)
                    return (localRef.current.inputElm.parentElement.style.boxShadow =
                        'rgba(255, 0, 0, 0.7) 0px 0px 0px 1px inset');
                else
                    localRef.current.inputElm.parentElement.style.boxShadow =
                        'rgba(0, 120, 215) 0px 0px 0px 2px inset';
            }
            onCommit(value);
            if (clearOnCommit) {
                setValue('');
                localRef.current.inputElm.focus();
            }
        }
    };
    return (react.createElement(TextBox, Object.assign({ ref: localRef, onChangeValue: setValue, onKeyPressCapture: event => (event.key === 'Enter' && send()) || event.stopPropagation(), rightNode: icon ? (react.createElement(Icon, { onClick: send, style: { margin: '0 8px', cursor: 'pointer' }, size: 16 }, icon)) : (undefined) }, origProps, { value })));
}
const Input = react_4(_Input);
const messages = {
    JOINED: '__JOINED__',
    PAUSED: '__PAUSED__',
    RESUMED: '__RESUMED__',
    JUMPED(time) {
        return '__JUMPED__' + time;
    },
    getString(msg) {
        if (msg.text === this.JOINED)
            return { text: `${msg.from} 加入了`, type: 'system', from: '' };
        if (msg.text === this.PAUSED)
            return { text: `${msg.from} 暂停了视频`, type: 'system', from: '' };
        if (msg.text === this.RESUMED)
            return { text: `${msg.from} 开始了视频`, type: 'system', from: '' };
        if (msg.text.startsWith('__JUMPED__')) {
            const time = parseFloat(msg.text.replace(/^__JUMPED__/g, ''));
            if (isNaN(time))
                return null;
            const mins = ~~(time / 60);
            const secs = (time % 60).toPrecision(2);
            return { text: `${msg.from} 跳转视频位置到 ${mins}:${secs}`, type: 'system', from: '' };
        }
        return null;
    },
};
const clipboard = {
    async writeText(text) {
        const input = document.createElement('input');
        input.value = text;
        document.execCommand('copy');
        document.body.appendChild(input);
        input.select();
        document.execCommand('Copy');
        document.body.removeChild(input);
    },
} ||
    navigator.clipboard || {
    writeText: () => Promise.reject(),
};
let showToast = (name) => { };
function GlobalToast() {
    const [text, setText] = react_1('');
    const [show, setShow] = react_1(false);
    showToast = text => {
        setText(text);
        setShow(true);
    };
    return react.createElement(Toast, { defaultShow: show, showCloseIcon: true, onToggleShowToast: setShow, title: text, closeDelay: 3000 });
}

var Tooltip_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });


var Tooltip = /** @class */ (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showTooltip: false
        };
        _this.timer = null;
        _this.unShowTimer = null;
        _this.showTooltip = function (e) {
            clearTimeout(_this.unShowTimer);
            var show = function () {
                _this.setState({
                    showTooltip: true
                });
            };
            if (_this.props.autoClose) {
                show();
                _this.timer = setTimeout(function () {
                    _this.setState({
                        showTooltip: false
                    });
                }, _this.props.autoCloseTimeout);
            }
            else {
                show();
            }
        };
        _this.unShowTooltip = function (e) {
            _this.timer = setTimeout(function () {
                _this.setState({
                    showTooltip: false
                });
            }, _this.props.closeDelay);
        };
        _this.getStyle = function (showTooltip, positionStyle) {
            if (showTooltip === void 0) { showTooltip = false; }
            if (positionStyle === void 0) { positionStyle = {}; }
            var _a = _this, theme = _a.context.theme, _b = _a.props, style = _b.style, background = _b.background;
            return theme.prefixStyle(__assign({ height: 28, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", padding: "4px 8px", transition: "all .25s 0s ease-in-out", border: "1px solid " + (theme.useFluentDesign ? theme.listLow : theme.baseLow), color: theme.baseMediumHigh, background: background || theme.chromeMedium, opacity: showTooltip ? 1 : 0, transform: "translateY(" + (showTooltip ? "0px" : "10px") + ")", position: "absolute", fontSize: 14, pointerEvents: showTooltip ? "all" : "none", zIndex: theme.zIndex.tooltip }, style, positionStyle));
        };
        _this.getTooltipStyle = function () {
            var _a = _this, rootElm = _a.rootElm, tooltipElm = _a.tooltipElm;
            if (!(rootElm && tooltipElm))
                return _this.getStyle();
            var theme = _this.context.theme;
            var _b = _this.props, verticalPosition = _b.verticalPosition, horizontalPosition = _b.horizontalPosition, margin = _b.margin;
            var _c = rootElm.getBoundingClientRect(), width = _c.width, height = _c.height;
            var containerWidth = tooltipElm.getBoundingClientRect().width;
            var containerHeight = tooltipElm.getBoundingClientRect().height;
            var showTooltip = _this.state.showTooltip;
            var positionStyle = {};
            var isVerticalCenter = verticalPosition === "center";
            if (width !== void (0) && height !== void (0)) {
                switch (horizontalPosition) {
                    case "left": {
                        positionStyle.right = isVerticalCenter ? (width + margin) : 0;
                        break;
                    }
                    case "center": {
                        positionStyle.left = (width - containerWidth) / 2;
                        break;
                    }
                    case "right": {
                        positionStyle.left = isVerticalCenter ? (-width - margin) : 0;
                        break;
                    }
                    default: {
                        break;
                    }
                }
                switch (verticalPosition) {
                    case "top": {
                        positionStyle.top = -containerHeight - margin;
                        break;
                    }
                    case "center": {
                        positionStyle.top = (height - containerHeight) / 2;
                        break;
                    }
                    case "bottom": {
                        positionStyle.top = height + margin;
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
            return _this.getStyle(showTooltip, positionStyle);
        };
        return _this;
    }
    Tooltip.prototype.componentWillUnmount = function () {
        clearTimeout(this.timer);
    };
    Tooltip.prototype.render = function () {
        var _this = this;
        var _a = this.props, verticalPosition = _a.verticalPosition, autoCloseTimeout = _a.autoCloseTimeout, autoClose = _a.autoClose, margin = _a.margin, horizontalPosition = _a.horizontalPosition, children = _a.children, content = _a.content, contentNode = _a.contentNode, closeDelay = _a.closeDelay, background = _a.background, className = _a.className, attributes = __rest(_a, ["verticalPosition", "autoCloseTimeout", "autoClose", "margin", "horizontalPosition", "children", "content", "contentNode", "closeDelay", "background", "className"]);
        var theme = this.context.theme;
        var tooltipStyle = this.getTooltipStyle();
        return (react.createElement("div", { style: { position: "relative", display: "inline-block" }, ref: function (rootElm) { return _this.rootElm = rootElm; }, onMouseEnter: this.showTooltip, onClick: this.showTooltip, onMouseLeave: this.unShowTooltip },
            react.createElement("span", __assign({ ref: function (tooltipElm) { return _this.tooltipElm = tooltipElm; } }, attributes, theme.prepareStyle({
                className: "tooltip",
                style: tooltipStyle,
                extendsClassName: className
            })), content || contentNode),
            children));
    };
    Tooltip.defaultProps = {
        verticalPosition: "top",
        horizontalPosition: "center",
        margin: 4,
        autoClose: false,
        autoCloseTimeout: 750,
        closeDelay: 0
    };
    Tooltip.contextTypes = { theme: propTypes.object };
    return Tooltip;
}(react.Component));
exports.Tooltip = Tooltip;
exports.default = Tooltip;

});

unwrapExports(Tooltip_1);
var Tooltip_2 = Tooltip_1.Tooltip;

var Button_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });





var labelStyle = {
    verticalAlign: "middle"
};
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.render = function () {
        var _a = this.props, borderSize = _a.borderSize, style = _a.style, className = _a.className, hoverStyle = _a.hoverStyle, children = _a.children, icon = _a.icon, iconStyle = _a.iconStyle, iconPosition = _a.iconPosition, disabled = _a.disabled, tooltip = _a.tooltip, background = _a.background, activeStyle = _a.activeStyle, attributes = __rest(_a, ["borderSize", "style", "className", "hoverStyle", "children", "icon", "iconStyle", "iconPosition", "disabled", "tooltip", "background", "activeStyle"]);
        var theme = this.context.theme;
        var buttonStyles = theme.prepareStyle({
            className: "button-root",
            style: __assign({ display: "inline-block", verticalAlign: "middle", cursor: "pointer", color: theme.baseHigh, outline: "none", padding: "4px 16px", transition: "all .25s", border: borderSize + " solid transparent", background: background || theme.baseLow }, theme.prefixStyle(style), { "&:hover": disabled ? void 0 : {
                    border: "2px solid " + theme.baseMediumLow
                }, "&:active": disabled ? void 0 : {
                    background: theme.baseMediumLow
                }, "&:disabled": {
                    background: theme.baseMedium,
                    cursor: "not-allowed",
                    color: theme.baseMedium
                } }),
            extendsClassName: className
        });
        var iconStyles = theme.prepareStyle({
            className: "button-icon",
            style: __assign({ padding: "0 4px", display: "inline-block" }, theme.prefixStyle(iconStyle))
        });
        var normalRender = (react.createElement(PseudoClasses_1.default, __assign({}, attributes, { disabled: disabled }, buttonStyles), (icon ? (iconPosition === "right" ? (react.createElement("button", null,
            react.createElement("span", { style: labelStyle }, children),
            react.createElement(Icon_1.default, __assign({}, iconStyles), icon))) : (react.createElement("button", null,
            react.createElement(Icon_1.default, __assign({}, iconStyles), icon),
            react.createElement("span", { style: labelStyle }, children)))) : (react.createElement("button", null, children)))));
        return tooltip ? (react.createElement(Tooltip_1.default, { contentNode: tooltip }, normalRender)) : normalRender;
    };
    Button.defaultProps = {
        borderSize: "2px",
        iconPosition: "left"
    };
    Button.contextTypes = { theme: propTypes.object };
    return Button;
}(react.Component));
exports.Button = Button;
exports.default = Button;

});

var Button = unwrapExports(Button_1);
var Button_2 = Button_1.Button;

var rngBrowser = createCommonjsModule(function (module) {
// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}
});

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

var bytesToUuid_1 = bytesToUuid;

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rngBrowser();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid_1(b);
}

var v1_1 = v1;

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rngBrowser)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid_1(rnds);
}

var v4_1 = v4;

var uuid = v4_1;
uuid.v1 = v1_1;
uuid.v4 = v4_1;

var uuid_1 = uuid;

var gun = createCommonjsModule(function (module) {
(function(){

  /* UNBUILD */
  var root;
  if(typeof window !== "undefined"){ root = window; }
  if(typeof commonjsGlobal !== "undefined"){ root = commonjsGlobal; }
  root = root || {};
  var console = root.console || {log: function(){}};
  function USE(arg, req){
    return req? commonjsRequire(arg) : arg.slice? USE[R(arg)] : function(mod, path){
      arg(mod = {exports: {}});
      USE[R(path)] = mod.exports;
    }
    function R(p){
      return p.split('/').slice(-1).toString().replace('.js','');
    }
  }
  { var common = module; }
USE(function(module){
		// Generic javascript utilities.
		var Type = {};
		//Type.fns = Type.fn = {is: function(fn){ return (!!fn && fn instanceof Function) }}
		Type.fn = {is: function(fn){ return (!!fn && 'function' == typeof fn) }};
		Type.bi = {is: function(b){ return (b instanceof Boolean || typeof b == 'boolean') }};
		Type.num = {is: function(n){ return !list_is(n) && ((n - parseFloat(n) + 1) >= 0 || Infinity === n || -Infinity === n) }};
		Type.text = {is: function(t){ return (typeof t == 'string') }};
		Type.text.ify = function(t){
			if(Type.text.is(t)){ return t }
			if(typeof JSON !== "undefined"){ return JSON.stringify(t) }
			return (t && t.toString)? t.toString() : t;
		};
		Type.text.random = function(l, c){
			var s = '';
			l = l || 24; // you are not going to make a 0 length random number, so no need to check type
			c = c || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXZabcdefghijklmnopqrstuvwxyz';
			while(l > 0){ s += c.charAt(Math.floor(Math.random() * c.length)); l--; }
			return s;
		};
		Type.text.match = function(t, o){ var r = false;
			t = t || '';
			o = Type.text.is(o)? {'=': o} : o || {}; // {'~', '=', '*', '<', '>', '+', '-', '?', '!'} // ignore case, exactly equal, anything after, lexically larger, lexically lesser, added in, subtacted from, questionable fuzzy match, and ends with.
			if(Type.obj.has(o,'~')){ t = t.toLowerCase(); o['='] = (o['='] || o['~']).toLowerCase(); }
			if(Type.obj.has(o,'=')){ return t === o['='] }
			if(Type.obj.has(o,'*')){ if(t.slice(0, o['*'].length) === o['*']){ r = true; t = t.slice(o['*'].length); } else { return false }}
			if(Type.obj.has(o,'!')){ if(t.slice(-o['!'].length) === o['!']){ r = true; } else { return false }}
			if(Type.obj.has(o,'+')){
				if(Type.list.map(Type.list.is(o['+'])? o['+'] : [o['+']], function(m){
					if(t.indexOf(m) >= 0){ r = true; } else { return true }
				})){ return false }
			}
			if(Type.obj.has(o,'-')){
				if(Type.list.map(Type.list.is(o['-'])? o['-'] : [o['-']], function(m){
					if(t.indexOf(m) < 0){ r = true; } else { return true }
				})){ return false }
			}
			if(Type.obj.has(o,'>')){ if(t > o['>']){ r = true; } else { return false }}
			if(Type.obj.has(o,'<')){ if(t < o['<']){ r = true; } else { return false }}
			function fuzzy(t,f){ var n = -1, i = 0, c; for(;c = f[i++];){ if(!~(n = t.indexOf(c, n+1))){ return false }} return true } // via http://stackoverflow.com/questions/9206013/javascript-fuzzy-search
			if(Type.obj.has(o,'?')){ if(fuzzy(t, o['?'])){ r = true; } else { return false }} // change name!
			return r;
		};
		Type.list = {is: function(l){ return (l instanceof Array) }};
		Type.list.slit = Array.prototype.slice;
		Type.list.sort = function(k){ // creates a new sort function based off some key
			return function(A,B){
				if(!A || !B){ return 0 } A = A[k]; B = B[k];
				if(A < B){ return -1 }else if(A > B){ return 1 }
				else { return 0 }
			}
		};
		Type.list.map = function(l, c, _){ return obj_map(l, c, _) };
		Type.list.index = 1; // change this to 0 if you want non-logical, non-mathematical, non-matrix, non-convenient array notation
		Type.obj = {is: function(o){ return o? (o instanceof Object && o.constructor === Object) || Object.prototype.toString.call(o).match(/^\[object (\w+)\]$/)[1] === 'Object' : false }};
		Type.obj.put = function(o, k, v){ return (o||{})[k] = v, o };
		Type.obj.has = function(o, k){ return o && Object.prototype.hasOwnProperty.call(o, k) };
		Type.obj.del = function(o, k){
			if(!o){ return }
			o[k] = null;
			delete o[k];
			return o;
		};
		Type.obj.as = function(o, k, v, u){ return o[k] = o[k] || (u === v? {} : v) };
		Type.obj.ify = function(o){
			if(obj_is(o)){ return o }
			try{o = JSON.parse(o);
			}catch(e){o={};}			return o;
		}
		;(function(){ var u;
			function map(v,k){
				if(obj_has(this,k) && u !== this[k]){ return }
				this[k] = v;
			}
			Type.obj.to = function(from, to){
				to = to || {};
				obj_map(from, map, to);
				return to;
			};
		}());
		Type.obj.copy = function(o){ // because http://web.archive.org/web/20140328224025/http://jsperf.com/cloning-an-object/2
			return !o? o : JSON.parse(JSON.stringify(o)); // is shockingly faster than anything else, and our data has to be a subset of JSON anyways!
		}
		;(function(){
			function empty(v,i){ var n = this.n;
				if(n && (i === n || (obj_is(n) && obj_has(n, i)))){ return }
				if(i){ return true }
			}
			Type.obj.empty = function(o, n){
				if(!o){ return true }
				return obj_map(o,empty,{n:n})? false : true;
			};
		}());
(function(){
			function t(k,v){
				if(2 === arguments.length){
					t.r = t.r || {};
					t.r[k] = v;
					return;
				} t.r = t.r || [];
				t.r.push(k);
			}			var keys = Object.keys;
			Type.obj.map = function(l, c, _){
				var u, i = 0, x, r, ll, lle, f = fn_is(c);
				t.r = null;
				if(keys && obj_is(l)){
					ll = keys(l); lle = true;
				}
				if(list_is(l) || ll){
					x = (ll || l).length;
					for(;i < x; i++){
						var ii = (i + Type.list.index);
						if(f){
							r = lle? c.call(_ || this, l[ll[i]], ll[i], t) : c.call(_ || this, l[i], ii, t);
							if(r !== u){ return r }
						} else {
							//if(Type.test.is(c,l[i])){ return ii } // should implement deep equality testing!
							if(c === l[lle? ll[i] : i]){ return ll? ll[i] : ii } // use this for now
						}
					}
				} else {
					for(i in l){
						if(f){
							if(obj_has(l,i)){
								r = _? c.call(_, l[i], i, t) : c(l[i], i, t);
								if(r !== u){ return r }
							}
						} else {
							//if(a.test.is(c,l[i])){ return i } // should implement deep equality testing!
							if(c === l[i]){ return i } // use this for now
						}
					}
				}
				return f? t.r : Type.list.index? 0 : -1;
			};
		}());
		Type.time = {};
		Type.time.is = function(t){ return t? t instanceof Date : (+new Date().getTime()) };

		var fn_is = Type.fn.is;
		var list_is = Type.list.is;
		var obj = Type.obj, obj_is = obj.is, obj_has = obj.has, obj_map = obj.map;
		module.exports = Type;
	})(USE, './type');
USE(function(module){
		// On event emitter generic javascript utility.
		module.exports = function onto(tag, arg, as){
			if(!tag){ return {to: onto} }
			var u, tag = (this.tag || (this.tag = {}))[tag] ||
			(this.tag[tag] = {tag: tag, to: onto._ = {
				next: function(arg){ var tmp;
					if((tmp = this.to)){
						tmp.next(arg);
				}}
			}});
			if(arg instanceof Function){
				var be = {
					off: onto.off ||
					(onto.off = function(){
						if(this.next === onto._.next){ return !0 }
						if(this === this.the.last){
							this.the.last = this.back;
						}
						this.to.back = this.back;
						this.next = onto._.next;
						this.back.to = this.to;
						if(this.the.last === this.the){
							delete this.on.tag[this.the.tag];
						}
					}),
					to: onto._,
					next: arg,
					the: tag,
					on: this,
					as: as,
				};
				(be.back = tag.last || tag).to = be;
				return tag.last = be;
			}
			if((tag = tag.to) && u !== arg){ tag.next(arg); }
			return tag;
		};
	})(USE, './onto');
USE(function(module){
		/* Based on the Hypothetical Amnesia Machine thought experiment */
		function HAM(machineState, incomingState, currentState, incomingValue, currentValue){
			if(machineState < incomingState){
				return {defer: true}; // the incoming value is outside the boundary of the machine's state, it must be reprocessed in another state.
			}
			if(incomingState < currentState){
				return {historical: true}; // the incoming value is within the boundary of the machine's state, but not within the range.

			}
			if(currentState < incomingState){
				return {converge: true, incoming: true}; // the incoming value is within both the boundary and the range of the machine's state.

			}
			if(incomingState === currentState){
				incomingValue = Lexical(incomingValue) || "";
				currentValue = Lexical(currentValue) || "";
				if(incomingValue === currentValue){ // Note: while these are practically the same, the deltas could be technically different
					return {state: true};
				}
				/*
					The following is a naive implementation, but will always work.
					Never change it unless you have specific needs that absolutely require it.
					If changed, your data will diverge unless you guarantee every peer's algorithm has also been changed to be the same.
					As a result, it is highly discouraged to modify despite the fact that it is naive,
					because convergence (data integrity) is generally more important.
					Any difference in this algorithm must be given a new and different name.
				*/
				if(incomingValue < currentValue){ // Lexical only works on simple value types!
					return {converge: true, current: true};
				}
				if(currentValue < incomingValue){ // Lexical only works on simple value types!
					return {converge: true, incoming: true};
				}
			}
			return {err: "Invalid CRDT Data: "+ incomingValue +" to "+ currentValue +" at "+ incomingState +" to "+ currentState +"!"};
		}
		if(typeof JSON === 'undefined'){
			throw new Error(
				'JSON is not included in this browser. Please load it first: ' +
				'ajax.cdnjs.com/ajax/libs/json2/20110223/json2.js'
			);
		}
		var Lexical = JSON.stringify;
		module.exports = HAM;
	})(USE, './HAM');
USE(function(module){
		var Type = USE('./type');
		var Val = {};
		Val.is = function(v){ // Valid values are a subset of JSON: null, binary, number (!Infinity), text, or a soul relation. Arrays need special algorithms to handle concurrency, so they are not supported directly. Use an extension that supports them if needed but research their problems first.
			if(v === u){ return false }
			if(v === null){ return true } // "deletes", nulling out keys.
			if(v === Infinity){ return false } // we want this to be, but JSON does not support it, sad face.
			if(text_is(v) // by "text" we mean strings.
			|| bi_is(v) // by "binary" we mean boolean.
			|| num_is(v)){ // by "number" we mean integers or decimals.
				return true; // simple values are valid.
			}
			return Val.rel.is(v) || false; // is the value a soul relation? Then it is valid and return it. If not, everything else remaining is an invalid data type. Custom extensions can be built on top of these primitives to support other types.
		};
		Val.link = Val.rel = {_: '#'};
(function(){
			Val.rel.is = function(v){ // this defines whether an object is a soul relation or not, they look like this: {'#': 'UUID'}
				if(v && v[rel_] && !v._ && obj_is(v)){ // must be an object.
					var o = {};
					obj_map(v, map, o);
					if(o.id){ // a valid id was found.
						return o.id; // yay! Return it.
					}
				}
				return false; // the value was not a valid soul relation.
			};
			function map(s, k){ var o = this; // map over the object...
				if(o.id){ return o.id = false } // if ID is already defined AND we're still looping through the object, it is considered invalid.
				if(k == rel_ && text_is(s)){ // the key should be '#' and have a text value.
					o.id = s; // we found the soul!
				} else {
					return o.id = false; // if there exists anything else on the object that isn't the soul, then it is considered invalid.
				}
			}
		}());
		Val.rel.ify = function(t){ return obj_put({}, rel_, t) }; // convert a soul into a relation and return it.
		Type.obj.has._ = '.';
		var rel_ = Val.link._, u;
		var bi_is = Type.bi.is;
		var num_is = Type.num.is;
		var text_is = Type.text.is;
		var obj = Type.obj, obj_is = obj.is, obj_put = obj.put, obj_map = obj.map;
		module.exports = Val;
	})(USE, './val');
USE(function(module){
		var Type = USE('./type');
		var Val = USE('./val');
		var Node = {_: '_'};
		Node.soul = function(n, o){ return (n && n._ && n._[o || soul_]) }; // convenience function to check to see if there is a soul on a node and return it.
		Node.soul.ify = function(n, o){ // put a soul on an object.
			o = (typeof o === 'string')? {soul: o} : o || {};
			n = n || {}; // make sure it exists.
			n._ = n._ || {}; // make sure meta exists.
			n._[soul_] = o.soul || n._[soul_] || text_random(); // put the soul on it.
			return n;
		};
		Node.soul._ = Val.link._;
(function(){
			Node.is = function(n, cb, as){ var s; // checks to see if an object is a valid node.
				if(!obj_is(n)){ return false } // must be an object.
				if(s = Node.soul(n)){ // must have a soul on it.
					return !obj_map(n, map, {as:as,cb:cb,s:s,n:n});
				}
				return false; // nope! This was not a valid node.
			};
			function map(v, k){ // we invert this because the way we check for this is via a negation.
				if(k === Node._){ return } // skip over the metadata.
				if(!Val.is(v)){ return true } // it is true that this is an invalid node.
				if(this.cb){ this.cb.call(this.as, v, k, this.n, this.s); } // optionally callback each key/value.
			}
		}());
(function(){
			Node.ify = function(obj, o, as){ // returns a node from a shallow object.
				if(!o){ o = {}; }
				else if(typeof o === 'string'){ o = {soul: o}; }
				else if(o instanceof Function){ o = {map: o}; }
				if(o.map){ o.node = o.map.call(as, obj, u, o.node || {}); }
				if(o.node = Node.soul.ify(o.node || {}, o)){
					obj_map(obj, map, {o:o,as:as});
				}
				return o.node; // This will only be a valid node if the object wasn't already deep!
			};
			function map(v, k){ var o = this.o, tmp, u; // iterate over each key/value.
				if(o.map){
					tmp = o.map.call(this.as, v, ''+k, o.node);
					if(u === tmp){
						obj_del(o.node, k);
					} else
					if(o.node){ o.node[k] = tmp; }
					return;
				}
				if(Val.is(v)){
					o.node[k] = v;
				}
			}
		}());
		var obj = Type.obj, obj_is = obj.is, obj_del = obj.del, obj_map = obj.map;
		var text = Type.text, text_random = text.random;
		var soul_ = Node.soul._;
		var u;
		module.exports = Node;
	})(USE, './node');
USE(function(module){
		var Type = USE('./type');
		var Node = USE('./node');
		function State(){
			var t;
			/*if(perf){
				t = start + perf.now(); // Danger: Accuracy decays significantly over time, even if precise.
			} else {*/
				t = time();
			//}
			if(last < t){
				return N = 0, last = t + State.drift;
			}
			return last = t + ((N += 1) / D) + State.drift;
		}
		var time = Type.time.is, last = -Infinity, N = 0, D = 1000; // WARNING! In the future, on machines that are D times faster than 2016AD machines, you will want to increase D by another several orders of magnitude so the processing speed never out paces the decimal resolution (increasing an integer effects the state accuracy).
		var perf = (typeof performance !== 'undefined')? (performance.timing && performance) : false, start = (perf && perf.timing && perf.timing.navigationStart) || (perf = false);
		State._ = '>';
		State.drift = 0;
		State.is = function(n, k, o){ // convenience function to get the state on a key on a node and return it.
			var tmp = (k && n && n[N_] && n[N_][State._]) || o;
			if(!tmp){ return }
			return num_is(tmp = tmp[k])? tmp : -Infinity;
		};
		State.lex = function(){ return State().toString(36).replace('.','') };
		State.ify = function(n, k, s, v, soul){ // put a key's state on a node.
			if(!n || !n[N_]){ // reject if it is not node-like.
				if(!soul){ // unless they passed a soul
					return;
				}
				n = Node.soul.ify(n, soul); // then make it so!
			}
			var tmp = obj_as(n[N_], State._); // grab the states data.
			if(u !== k && k !== N_){
				if(num_is(s)){
					tmp[k] = s; // add the valid state.
				}
				if(u !== v){ // Note: Not its job to check for valid values!
					n[k] = v;
				}
			}
			return n;
		};
		State.to = function(from, k, to){
			var val = (from||{})[k];
			if(obj_is(val)){
				val = obj_copy(val);
			}
			return State.ify(to, k, State.is(from, k), val, Node.soul(from));
		}
		;(function(){
			State.map = function(cb, s, as){ var u; // for use with Node.ify
				var o = obj_is(o = cb || s)? o : null;
				cb = fn_is(cb = cb || s)? cb : null;
				if(o && !cb){
					s = num_is(s)? s : State();
					o[N_] = o[N_] || {};
					obj_map(o, map, {o:o,s:s});
					return o;
				}
				as = as || obj_is(s)? s : u;
				s = num_is(s)? s : State();
				return function(v, k, o, opt){
					if(!cb){
						map.call({o: o, s: s}, v,k);
						return v;
					}
					cb.call(as || this || {}, v, k, o, opt);
					if(obj_has(o,k) && u === o[k]){ return }
					map.call({o: o, s: s}, v,k);
				}
			};
			function map(v,k){
				if(N_ === k){ return }
				State.ify(this.o, k, this.s) ;
			}
		}());
		var obj = Type.obj, obj_as = obj.as, obj_has = obj.has, obj_is = obj.is, obj_map = obj.map, obj_copy = obj.copy;
		var num = Type.num, num_is = num.is;
		var fn = Type.fn, fn_is = fn.is;
		var N_ = Node._, u;
		module.exports = State;
	})(USE, './state');
USE(function(module){
		var Type = USE('./type');
		var Val = USE('./val');
		var Node = USE('./node');
		var Graph = {};
(function(){
			Graph.is = function(g, cb, fn, as){ // checks to see if an object is a valid graph.
				if(!g || !obj_is(g) || obj_empty(g)){ return false } // must be an object.
				return !obj_map(g, map, {cb:cb,fn:fn,as:as}); // makes sure it wasn't an empty object.
			};
			function map(n, s){ // we invert this because the way'? we check for this is via a negation.
				if(!n || s !== Node.soul(n) || !Node.is(n, this.fn, this.as)){ return true } // it is true that this is an invalid graph.
				if(!this.cb){ return }
				nf.n = n; nf.as = this.as; // sequential race conditions aren't races.
				this.cb.call(nf.as, n, s, nf);
			}
			function nf(fn){ // optional callback for each node.
				if(fn){ Node.is(nf.n, fn, nf.as); } // where we then have an optional callback for each key/value.
			}
		}());
(function(){
			Graph.ify = function(obj, env, as){
				var at = {path: [], obj: obj};
				if(!env){
					env = {};
				} else
				if(typeof env === 'string'){
					env = {soul: env};
				} else
				if(env instanceof Function){
					env.map = env;
				}
				if(env.soul){
					at.rel = Val.rel.ify(env.soul);
				}
				env.shell = (as||{}).shell;
				env.graph = env.graph || {};
				env.seen = env.seen || [];
				env.as = env.as || as;
				node(env, at);
				env.root = at.node;
				return env.graph;
			};
			function node(env, at){ var tmp;
				if(tmp = seen(env, at)){ return tmp }
				at.env = env;
				at.soul = soul;
				if(Node.ify(at.obj, map, at)){
					at.rel = at.rel || Val.rel.ify(Node.soul(at.node));
					if(at.obj !== env.shell){
						env.graph[Val.rel.is(at.rel)] = at.node;
					}
				}
				return at;
			}
			function map(v,k,n){
				var at = this, env = at.env, is, tmp;
				if(Node._ === k && obj_has(v,Val.rel._)){
					return n._; // TODO: Bug?
				}
				if(!(is = valid(v,k,n, at,env))){ return }
				if(!k){
					at.node = at.node || n || {};
					if(obj_has(v, Node._) && Node.soul(v)){ // ? for safety ?
						at.node._ = obj_copy(v._);
					}
					at.node = Node.soul.ify(at.node, Val.rel.is(at.rel));
					at.rel = at.rel || Val.rel.ify(Node.soul(at.node));
				}
				if(tmp = env.map){
					tmp.call(env.as || {}, v,k,n, at);
					if(obj_has(n,k)){
						v = n[k];
						if(u === v){
							obj_del(n, k);
							return;
						}
						if(!(is = valid(v,k,n, at,env))){ return }
					}
				}
				if(!k){ return at.node }
				if(true === is){
					return v;
				}
				tmp = node(env, {obj: v, path: at.path.concat(k)});
				if(!tmp.node){ return }
				return tmp.rel; //{'#': Node.soul(tmp.node)};
			}
			function soul(id){ var at = this;
				var prev = Val.link.is(at.rel), graph = at.env.graph;
				at.rel = at.rel || Val.rel.ify(id);
				at.rel[Val.rel._] = id;
				if(at.node && at.node[Node._]){
					at.node[Node._][Val.rel._] = id;
				}
				if(obj_has(graph, prev)){
					graph[id] = graph[prev];
					obj_del(graph, prev);
				}
			}
			function valid(v,k,n, at,env){ var tmp;
				if(Val.is(v)){ return true }
				if(obj_is(v)){ return 1 }
				if(tmp = env.invalid){
					v = tmp.call(env.as || {}, v,k,n);
					return valid(v,k,n, at,env);
				}
				env.err = "Invalid value at '" + at.path.concat(k).join('.') + "'!";
				if(Type.list.is(v)){ env.err += " Use `.set(item)` instead of an Array."; }
			}
			function seen(env, at){
				var arr = env.seen, i = arr.length, has;
				while(i--){ has = arr[i];
					if(at.obj === has.obj){ return has }
				}
				arr.push(at);
			}
		}());
		Graph.node = function(node){
			var soul = Node.soul(node);
			if(!soul){ return }
			return obj_put({}, soul, node);
		}
		;(function(){
			Graph.to = function(graph, root, opt){
				if(!graph){ return }
				var obj = {};
				opt = opt || {seen: {}};
				obj_map(graph[root], map, {obj:obj, graph: graph, opt: opt});
				return obj;
			};
			function map(v,k){ var tmp, obj;
				if(Node._ === k){
					if(obj_empty(v, Val.rel._)){
						return;
					}
					this.obj[k] = obj_copy(v);
					return;
				}
				if(!(tmp = Val.rel.is(v))){
					this.obj[k] = v;
					return;
				}
				if(obj = this.opt.seen[tmp]){
					this.obj[k] = obj;
					return;
				}
				this.obj[k] = this.opt.seen[tmp] = Graph.to(this.graph, tmp, this.opt);
			}
		}());
		var fn_is = Type.fn.is;
		var obj = Type.obj, obj_is = obj.is, obj_del = obj.del, obj_has = obj.has, obj_empty = obj.empty, obj_put = obj.put, obj_map = obj.map, obj_copy = obj.copy;
		var u;
		module.exports = Graph;
	})(USE, './graph');
USE(function(module){
		// request / response module, for asking and acking messages.
		USE('./onto'); // depends upon onto!
		module.exports = function ask(cb, as){
			if(!this.on){ return }
			if(!(cb instanceof Function)){
				if(!cb || !as){ return }
				var id = cb['#'] || cb, tmp = (this.tag||empty)[id];
				if(!tmp){ return }
				tmp = this.on(id, as);
				clearTimeout(tmp.err);
				return true;
			}
			var id = (as && as['#']) || Math.random().toString(36).slice(2);
			if(!cb){ return id }
			var to = this.on(id, cb, as);
			to.err = to.err || setTimeout(function(){
				to.next({err: "Error: No ACK received yet.", lack: true});
				to.off();
			}, (this.opt||{}).lack || 9000);
			return id;
		};
	})(USE, './ask');
USE(function(module){
		var Type = USE('./type');
		function Dup(opt){
			var dup = {s:{}};
			opt = opt || {max: 1000, age: 1000 * 9};//1000 * 60 * 2};
			dup.check = function(id){ var tmp;
				if(!(tmp = dup.s[id])){ return false }
				if(tmp.pass){ return tmp.pass = false }
				return dup.track(id);
			};
			dup.track = function(id, pass){
				var it = dup.s[id] || (dup.s[id] = {});
				it.was = time_is();
				if(pass){ it.pass = true; }
				if(!dup.to){
					dup.to = setTimeout(function(){
						var now = time_is();
						Type.obj.map(dup.s, function(it, id){
							if(it && opt.age > (now - it.was)){ return }
							Type.obj.del(dup.s, id);
						});
						dup.to = null;
					}, opt.age + 9);
				}
				return it;
			};
			return dup;
		}
		var time_is = Type.time.is;
		module.exports = Dup;
	})(USE, './dup');
USE(function(module){

		function Gun(o){
			if(o instanceof Gun){ return (this._ = {gun: this, $: this}).$ }
			if(!(this instanceof Gun)){ return new Gun(o) }
			return Gun.create(this._ = {gun: this, $: this, opt: o});
		}

		Gun.is = function($){ return ($ instanceof Gun) || ($ && $._ && ($ === $._.$)) || false };

		Gun.version = 0.9;

		Gun.chain = Gun.prototype;
		Gun.chain.toJSON = function(){};

		var Type = USE('./type');
		Type.obj.to(Type, Gun);
		Gun.HAM = USE('./HAM');
		Gun.val = USE('./val');
		Gun.node = USE('./node');
		Gun.state = USE('./state');
		Gun.graph = USE('./graph');
		Gun.on = USE('./onto');
		Gun.ask = USE('./ask');
		Gun.dup = USE('./dup');
(function(){
			Gun.create = function(at){
				at.root = at.root || at;
				at.graph = at.graph || {};
				at.on = at.on || Gun.on;
				at.ask = at.ask || Gun.ask;
				at.dup = at.dup || Gun.dup();
				var gun = at.$.opt(at.opt);
				if(!at.once){
					at.on('in', root, at);
					at.on('out', root, {at: at, out: root});
					Gun.on('create', at);
					at.on('create', at);
				}
				at.once = 1;
				return gun;
			};
			function root(msg){
				//add to.next(at); // TODO: MISSING FEATURE!!!
				var ev = this, as = ev.as, at = as.at || as, gun = at.$, dup, tmp;
				if(!(tmp = msg['#'])){ tmp = msg['#'] = text_rand(9); }
				if((dup = at.dup).check(tmp)){
					if(as.out === msg.out){
						msg.out = u;
						ev.to.next(msg);
					}
					return;
				}
				dup.track(tmp);
				if(!at.ask(msg['@'], msg)){
					if(msg.get){
						Gun.on.get(msg, gun); //at.on('get', get(msg));
					}
					if(msg.put){
						Gun.on.put(msg, gun); //at.on('put', put(msg));
					}
				}
				ev.to.next(msg);
				if(!as.out){
					msg.out = root;
					at.on('out', msg);
				}
			}
		}());
(function(){
			Gun.on.put = function(msg, gun){
				var at = gun._, ctx = {$: gun, graph: at.graph, put: {}, map: {}, souls: {}, machine: Gun.state(), ack: msg['@'], cat: at, stop: {}};
				if(!Gun.graph.is(msg.put, null, verify, ctx)){ ctx.err = "Error: Invalid graph!"; }
				if(ctx.err){ return at.on('in', {'@': msg['#'], err: Gun.log(ctx.err) }) }
				obj_map(ctx.put, merge, ctx);
				if(!ctx.async){ obj_map(ctx.map, map, ctx); }
				if(u !== ctx.defer){
					setTimeout(function(){
						Gun.on.put(msg, gun);
					}, ctx.defer - ctx.machine);
				}
				if(!ctx.diff){ return }
				at.on('put', obj_to(msg, {put: ctx.diff}));
			};
			function verify(val, key, node, soul){ var ctx = this;
				var state = Gun.state.is(node, key);
				if(!state){ return ctx.err = "Error: No state on '"+key+"' in node '"+soul+"'!" }
				var vertex = ctx.graph[soul] || empty, was = Gun.state.is(vertex, key, true), known = vertex[key];
				var HAM = Gun.HAM(ctx.machine, state, was, val, known);
				if(!HAM.incoming){
					if(HAM.defer){ // pick the lowest
						ctx.defer = (state < (ctx.defer || Infinity))? state : ctx.defer;
					}
					return;
				}
				ctx.put[soul] = Gun.state.to(node, key, ctx.put[soul]);
				(ctx.diff || (ctx.diff = {}))[soul] = Gun.state.to(node, key, ctx.diff[soul]);
				ctx.souls[soul] = true;
			}
			function merge(node, soul){
				var ctx = this, cat = ctx.$._, at = (cat.next || empty)[soul];
				if(!at){
					if(!(cat.opt||empty).super){
						ctx.souls[soul] = false;
						return;
					}
					at = (ctx.$.get(soul)._);
				}
				var msg = ctx.map[soul] = {
					put: node,
					get: soul,
					$: at.$
				}, as = {ctx: ctx, msg: msg};
				ctx.async = !!cat.tag.node;
				if(ctx.ack){ msg['@'] = ctx.ack; }
				obj_map(node, each, as);
				if(!ctx.async){ return }
				if(!ctx.and){
					// If it is async, we only need to setup one listener per context (ctx)
					cat.on('node', function(m){
						this.to.next(m); // make sure to call other context's listeners.
						if(m !== ctx.map[m.get]){ return } // filter out events not from this context!
						ctx.souls[m.get] = false; // set our many-async flag
						obj_map(m.put, patch, m); // merge into view
						if(obj_map(ctx.souls, function(v){ if(v){ return v } })){ return } // if flag still outstanding, keep waiting.
						if(ctx.c){ return } ctx.c = 1; // failsafe for only being called once per context.
						this.off();
						obj_map(ctx.map, map, ctx); // all done, trigger chains.
					});
				}
				ctx.and = true;
				cat.on('node', msg); // each node on the current context's graph needs to be emitted though.
			}
			function each(val, key){
				var ctx = this.ctx, graph = ctx.graph, msg = this.msg, soul = msg.get, node = msg.put, at = (msg.$._);
				graph[soul] = Gun.state.to(node, key, graph[soul]);
				if(ctx.async){ return }
				at.put = Gun.state.to(node, key, at.put);
			}
			function patch(val, key){
				var msg = this, node = msg.put, at = (msg.$._);
				at.put = Gun.state.to(node, key, at.put);
			}
			function map(msg, soul){
				if(!msg.$){ return }
				this.cat.stop = this.stop; // temporary fix till a better solution?
				(msg.$._).on('in', msg);
				this.cat.stop = null; // temporary fix till a better solution?
			}

			Gun.on.get = function(msg, gun){
				var root = gun._, get = msg.get, soul = get[_soul], node = root.graph[soul], has = get[_has], tmp;
				var next = root.next || (root.next = {}), at = next[soul];
				if(obj_has(soul, '*')){ // TEMPORARY HACK FOR MARTTI, TESTING
					var graph = {};
					Gun.obj.map(root.graph, function(node, s){
						if(Gun.text.match(s, soul)){
							graph[s] = Gun.obj.copy(node);
						}
					});
					if(!Gun.obj.empty(graph)){
						root.on('in', {
							'@': msg['#'],
							how: '*',
							put: graph,
							$: gun
						});
					}
				} // TEMPORARY HACK FOR MARTTI, TESTING
				if(!node){ return root.on('get', msg) }
				if(has){
					if(!obj_has(node, has)){ return root.on('get', msg) }
					node = Gun.state.to(node, has);
					// If we have a key in-memory, do we really need to fetch?
					// Maybe... in case the in-memory key we have is a local write
					// we still need to trigger a pull/merge from peers.
				} else {
					node = Gun.obj.copy(node);
				}
				node = Gun.graph.node(node);
				tmp = (at||empty).ack;
				root.on('in', {
					'@': msg['#'],
					how: 'mem',
					put: node,
					$: gun
				});
				//if(0 < tmp){ return }
				root.on('get', msg);
			};
		}());
(function(){
			Gun.chain.opt = function(opt){
				opt = opt || {};
				var gun = this, at = gun._, tmp = opt.peers || opt;
				if(!obj_is(opt)){ opt = {}; }
				if(!obj_is(at.opt)){ at.opt = opt; }
				if(text_is(tmp)){ tmp = [tmp]; }
				if(list_is(tmp)){
					tmp = obj_map(tmp, function(url, i, map){
						map(url, {url: url});
					});
					if(!obj_is(at.opt.peers)){ at.opt.peers = {};}
					at.opt.peers = obj_to(tmp, at.opt.peers);
				}
				at.opt.peers = at.opt.peers || {};
				obj_to(opt, at.opt); // copies options on to `at.opt` only if not already taken.
				Gun.on('opt', at);
				at.opt.uuid = at.opt.uuid || function(){ return state_lex() + text_rand(12) };
				return gun;
			};
		}());

		var list_is = Gun.list.is;
		var text = Gun.text, text_is = text.is, text_rand = text.random;
		var obj = Gun.obj, obj_is = obj.is, obj_has = obj.has, obj_to = obj.to, obj_map = obj.map, obj_copy = obj.copy;
		var state_lex = Gun.state.lex, _soul = Gun.val.rel._, _has = '.', node_ = Gun.node._, rel_is = Gun.val.link.is;
		var empty = {}, u;

		console.debug = function(i, s){ return (console.debug.i && i === console.debug.i && console.debug.i++) && (console.log.apply(console, arguments) || s) };

		Gun.log = function(){ return (!Gun.log.off && console.log.apply(console, arguments)), [].slice.call(arguments).join(' ') };
		Gun.log.once = function(w,s,o){ return (o = Gun.log.once)[w] = o[w] || 0, o[w]++ || Gun.log(s) }

		;		Gun.log.once("welcome", "Hello wonderful person! :) Thanks for using GUN, feel free to ask for help on https://gitter.im/amark/gun and ask StackOverflow questions tagged with 'gun'!");

		if(typeof window !== "undefined"){ (window.GUN = window.Gun = Gun).window = window; }
		try{ if(typeof common !== "undefined"){ common.exports = Gun; } }catch(e){}
		module.exports = Gun;

		/*Gun.on('opt', function(ctx){ // FOR TESTING PURPOSES
			this.to.next(ctx);
			if(ctx.once){ return }
			ctx.on('node', function(msg){
				var to = this.to;
				//Gun.node.is(msg.put, function(v,k){ msg.put[k] = v + v });
				setTimeout(function(){
					to.next(msg);
				},1);
			});
		});*/
	})(USE, './root');
USE(function(module){
		var Gun = USE('./root');
		Gun.chain.back = function(n, opt){ var tmp;
			n = n || 1;
			if(-1 === n || Infinity === n){
				return this._.root.$;
			} else
			if(1 === n){
				return (this._.back || this._).$;
			}
			var gun = this, at = gun._;
			if(typeof n === 'string'){
				n = n.split('.');
			}
			if(n instanceof Array){
				var i = 0, l = n.length, tmp = at;
				for(i; i < l; i++){
					tmp = (tmp||empty)[n[i]];
				}
				if(u !== tmp){
					return opt? gun : tmp;
				} else
				if((tmp = at.back)){
					return tmp.$.back(n, opt);
				}
				return;
			}
			if(n instanceof Function){
				var yes, tmp = {back: at};
				while((tmp = tmp.back)
				&& u === (yes = n(tmp, opt))){}
				return yes;
			}
			if(Gun.num.is(n)){
				return (at.back || at).$.back(n - 1);
			}
			return this;
		};
		var empty = {}, u;
	})(USE, './back');
USE(function(module){
		// WARNING: GUN is very simple, but the JavaScript chaining API around GUN
		// is complicated and was extremely hard to build. If you port GUN to another
		// language, consider implementing an easier API to build.
		var Gun = USE('./root');
		Gun.chain.chain = function(sub){
			var gun = this, at = gun._, chain = new (sub || gun).constructor(gun), cat = chain._, root;
			cat.root = root = at.root;
			cat.id = ++root.once;
			cat.back = gun._;
			cat.on = Gun.on;
			cat.on('in', input, cat); // For 'in' if I add my own listeners to each then I MUST do it before in gets called. If I listen globally for all incoming data instead though, regardless of individual listeners, I can transform the data there and then as well.
			cat.on('out', output, cat); // However for output, there isn't really the global option. I must listen by adding my own listener individually BEFORE this one is ever called.
			return chain;
		};

		function output(msg){
			var put, get, at = this.as, back = at.back, root = at.root, tmp;
			if(!msg.$){ msg.$ = at.$; }
			this.to.next(msg);
			if(get = msg.get){
				/*if(u !== at.put){
					at.on('in', at);
					return;
				}*/
				if(get['#'] || at.soul){
					get['#'] = get['#'] || at.soul;
					msg['#'] || (msg['#'] = text_rand(9));
					back = (root.$.get(get['#'])._);
					if(!(get = get['.'])){
						tmp = back.ack;
						if(!tmp){ back.ack = -1; }
						if(obj_has(back, 'put')){
							back.on('in', back);
						}
						if(tmp){ return }
						msg.$ = back.$;
					} else
					if(obj_has(back.put, get)){
						put = (back.$.get(get)._);
						if(!(tmp = put.ack)){ put.ack = -1; }
						back.on('in', {
							$: back.$,
							put: Gun.state.to(back.put, get),
							get: back.get
						});
						if(tmp){ return }
					}
					root.ask(ack, msg);
					return root.on('in', msg);
				}
				if(root.now){ root.now[at.id] = root.now[at.id] || true; at.pass = {}; }
				if(get['.']){
					if(at.get){
						msg = {get: {'.': at.get}, $: at.$};
						//if(back.ask || (back.ask = {})[at.get]){ return }
						(back.ask || (back.ask = {}));
						back.ask[at.get] = msg.$._; // TODO: PERFORMANCE? More elegant way?
						return back.on('out', msg);
					}
					msg = {get: {}, $: at.$};
					return back.on('out', msg);
				}
				at.ack = at.ack || -1;
				if(at.get){
					msg.$ = at.$;
					get['.'] = at.get;
					(back.ask || (back.ask = {}))[at.get] = msg.$._; // TODO: PERFORMANCE? More elegant way?
					return back.on('out', msg);
				}
			}
			return back.on('out', msg);
		}

		function input(msg){
			var eve = this, cat = eve.as, root = cat.root, gun = msg.$, at = (gun||empty)._ || empty, change = msg.put, rel, tmp;
			if(cat.get && msg.get !== cat.get){
				msg = obj_to(msg, {get: cat.get});
			}
			if(cat.has && at !== cat){
				msg = obj_to(msg, {$: cat.$});
				if(at.ack){
					cat.ack = at.ack;
					//cat.ack = cat.ack || at.ack;
				}
			}
			if(u === change){
				tmp = at.put;
				eve.to.next(msg);
				if(cat.soul){ return } // TODO: BUG, I believee the fresh input refactor caught an edge case that a `gun.get('soul').get('key')` that points to a soul that doesn't exist will not trigger val/get etc.
				if(u === tmp && u !== at.put){ return }
				echo(cat, msg, eve);
				if(cat.has){
					not(cat, msg);
				}
				obj_del(at.echo, cat.id);
				obj_del(cat.map, at.id);
				return;
			}
			if(cat.soul){
				eve.to.next(msg);
				echo(cat, msg, eve);
				if(cat.next){ obj_map(change, map, {msg: msg, cat: cat}); }
				return;
			}
			if(!(rel = Gun.val.link.is(change))){
				if(Gun.val.is(change)){
					if(cat.has || cat.soul){
						not(cat, msg);
					} else
					if(at.has || at.soul){
						(at.echo || (at.echo = {}))[cat.id] = at.echo[at.id] || cat;
						(cat.map || (cat.map = {}))[at.id] = cat.map[at.id] || {at: at};
						//if(u === at.put){ return } // Not necessary but improves performance. If we have it but at does not, that means we got things out of order and at will get it. Once at gets it, it will tell us again.
					}
					eve.to.next(msg);
					echo(cat, msg, eve);
					return;
				}
				if(cat.has && at !== cat && obj_has(at, 'put')){
					cat.put = at.put;
				}				if((rel = Gun.node.soul(change)) && at.has){
					at.put = (cat.root.$.get(rel)._).put;
				}
				tmp = (root.stop || {})[at.id];
				//if(tmp && tmp[cat.id]){ } else {
					eve.to.next(msg);
				//}
				relate(cat, msg, at, rel);
				echo(cat, msg, eve);
				if(cat.next){ obj_map(change, map, {msg: msg, cat: cat}); }
				return;
			}
			var was = root.stop;
			tmp = root.stop || {};
			tmp = tmp[at.id] || (tmp[at.id] = {});
			//if(tmp[cat.id]){ return }
			tmp.is = tmp.is || at.put;
			tmp[cat.id] = at.put || true;
			//if(root.stop){
				eve.to.next(msg);
			//}
			relate(cat, msg, at, rel);
			echo(cat, msg, eve);
		}

		function relate(at, msg, from, rel){
			if(!rel || node_ === at.get){ return }
			var tmp = (at.root.$.get(rel)._);
			if(at.has){
				from = tmp;
			} else
			if(from.has){
				relate(from, msg, from, rel);
			}
			if(from === at){ return }
			if(!from.$){ from = {}; }
			(from.echo || (from.echo = {}))[at.id] = from.echo[at.id] || at;
			if(at.has && !(at.map||empty)[from.id]){ // if we haven't seen this before.
				not(at, msg);
			}
			tmp = from.id? ((at.map || (at.map = {}))[from.id] = at.map[from.id] || {at: from}) : {};
			if(rel === tmp.link){
				if(!(tmp.pass || at.pass)){
					return;
				}
			}
			if(at.pass){
				Gun.obj.map(at.map, function(tmp){ tmp.pass = true; });
				obj_del(at, 'pass');
			}
			if(tmp.pass){ obj_del(tmp, 'pass'); }
			if(at.has){ at.link = rel; }
			ask(at, tmp.link = rel);
		}
		function echo(at, msg, ev){
			if(!at.echo){ return } // || node_ === at.get ?
			//if(at.has){ msg = obj_to(msg, {event: ev}) }
			obj_map(at.echo, reverb, msg);
		}
		function reverb(to){
			if(!to || !to.on){ return }
			to.on('in', this);
		}
		function map(data, key){ // Map over only the changes on every update.
			var cat = this.cat, next = cat.next || empty, via = this.msg, chain, at, tmp;
			if(node_ === key && !next[key]){ return }
			if(!(at = next[key])){
				return;
			}
			//if(data && data[_soul] && (tmp = Gun.val.rel.is(data)) && (tmp = (cat.root.$.get(tmp)._)) && obj_has(tmp, 'put')){
			//	data = tmp.put;
			//}
			if(at.has){
				//if(!(data && data[_soul] && Gun.val.rel.is(data) === Gun.node.soul(at.put))){
				if(u === at.put || !Gun.val.link.is(data)){
					at.put = data;
				}
				chain = at.$;
			} else
			if(tmp = via.$){
				tmp = (chain = via.$.get(key))._;
				if(u === tmp.put || !Gun.val.link.is(data)){
					tmp.put = data;
				}
			}
			at.on('in', {
				put: data,
				get: key,
				$: chain,
				via: via
			});
		}
		function not(at, msg){
			if(!(at.has || at.soul)){ return }
			var tmp = at.map, root = at.root;
			at.map = null;
			if(at.has){
				if(at.dub && at.root.stop){ at.dub = null; }
				at.link = null;
			}
			//if(!root.now || !root.now[at.id]){
			if(!at.pass){
				if((!msg['@']) && null === tmp){ return }
				//obj_del(at, 'pass');
			}
			if(u === tmp && Gun.val.link.is(at.put)){ return } // This prevents the very first call of a thing from triggering a "clean up" call. // TODO: link.is(at.put) || !val.is(at.put) ?
			obj_map(tmp, function(proxy){
				if(!(proxy = proxy.at)){ return }
				obj_del(proxy.echo, at.id);
			});
			tmp = at.put;
			obj_map(at.next, function(neat, key){
				if(u === tmp && u !== at.put){ return true }
				neat.put = u;
				if(neat.ack){
					neat.ack = -1;
				}
				neat.on('in', {
					get: key,
					$: neat.$,
					put: u
				});
			});
		}
		function ask(at, soul){
			var tmp = (at.root.$.get(soul)._);
			if(at.ack){
				tmp.on('out', {get: {'#': soul}});
				if(!at.ask){ return } // TODO: PERFORMANCE? More elegant way?
			}
			tmp = at.ask; Gun.obj.del(at, 'ask');
			obj_map(tmp || at.next, function(neat, key){
				neat.on('out', {get: {'#': soul, '.': key}});
			});
			Gun.obj.del(at, 'ask'); // TODO: PERFORMANCE? More elegant way?
		}
		function ack(msg, ev){
			var as = this.as, get = as.get || empty, at = as.$._, tmp = (msg.put||empty)[get['#']];
			if(at.ack){ at.ack = (at.ack + 1) || 1; }
			if(!msg.put || (get['.'] && !obj_has(tmp, at.get))){
				if(at.put !== u){ return }
				at.on('in', {
					get: at.get,
					put: at.put = u,
					$: at.$,
					'@': msg['@']
				});
				return;
			}
			if(node_ == get['.']){ // is this a security concern?
				at.on('in', {get: at.get, put: Gun.val.link.ify(get['#']), $: at.$, '@': msg['@']});
				return;
			}
			Gun.on.put(msg, at.root.$);
		}
		var empty = {}, u;
		var obj = Gun.obj, obj_has = obj.has, obj_put = obj.put, obj_del = obj.del, obj_to = obj.to, obj_map = obj.map;
		var text_rand = Gun.text.random;
		var _soul = Gun.val.rel._, node_ = Gun.node._;
	})(USE, './chain');
USE(function(module){
		var Gun = USE('./root');
		Gun.chain.get = function(key, cb, as){
			var gun, tmp;
			if(typeof key === 'string'){
				var back = this, cat = back._;
				var next = cat.next || empty;
				if(!(gun = next[key])){
					gun = cache(key, back);
				}
				gun = gun.$;
			} else
			if(key instanceof Function){
				if(true === cb){ return soul(this, key, cb, as) }
				gun = this;
				var at = gun._, root = at.root, tmp = root.now, ev;
				as = cb || {};
				as.at = at;
				as.use = key;
				as.out = as.out || {};
				as.out.get = as.out.get || {};
				(ev = at.on('in', use, as)).rid = rid;
				(root.now = {$:1})[as.now = at.id] = ev;
				var mum = root.mum; root.mum = {};
				at.on('out', as.out);
				root.mum = mum;
				root.now = tmp;
				return gun;
			} else
			if(num_is(key)){
				return this.get(''+key, cb, as);
			} else
			if(tmp = rel.is(key)){
				return this.get(tmp, cb, as);
			} else {
				(as = this.chain())._.err = {err: Gun.log('Invalid get request!', key)}; // CLEAN UP
				if(cb){ cb.call(as, as._.err); }
				return as;
			}
			if(tmp = cat.stun){ // TODO: Refactor?
				gun._.stun = gun._.stun || tmp;
			}
			if(cb && cb instanceof Function){
				gun.get(cb, as);
			}
			return gun;
		};
		function cache(key, back){
			var cat = back._, next = cat.next, gun = back.chain(), at = gun._;
			if(!next){ next = cat.next = {}; }
			next[at.get = key] = at;
			if(back === cat.root.$){
				at.soul = key;
			} else
			if(cat.soul || cat.has){
				at.has = key;
				//if(obj_has(cat.put, key)){
					//at.put = cat.put[key];
				//}
			}
			return at;
		}
		function soul(gun, cb, opt, as){
			var cat = gun._, acks = 0, tmp;
			if(tmp = cat.soul || cat.link || cat.dub){ return cb(tmp, as, cat), gun }
			gun.get(function(msg, ev){
				if(u === msg.put && (tmp = (obj_map(cat.root.opt.peers, function(v,k,t){t(k);})||[]).length) && ++acks < tmp){
					return;
				}
				ev.rid(msg);
				var at = ((at = msg.$) && at._) || {};
				tmp = at.link || at.soul || rel.is(msg.put) || node_soul(msg.put) || at.dub;
				cb(tmp, as, msg, ev);
			}, {out: {get: {'.':true}}});
			return gun;
		}
		function use(msg){
			var eve = this, as = eve.as, cat = as.at, root = cat.root, gun = msg.$, at = (gun||{})._ || {}, data = msg.put || at.put, tmp;
			if((tmp = root.now) && eve !== tmp[as.now]){ return eve.to.next(msg) }
			//console.log("USE:", cat.id, cat.soul, cat.has, cat.get, msg, root.mum);
			//if(at.async && msg.root){ return }
			//if(at.async === 1 && cat.async !== true){ return }
			//if(root.stop && root.stop[at.id]){ return } root.stop && (root.stop[at.id] = true);
			//if(!at.async && !cat.async && at.put && msg.put === at.put){ return }
			//else if(!cat.async && msg.put !== at.put && root.stop && root.stop[at.id]){ return } root.stop && (root.stop[at.id] = true);


			//root.stop && (root.stop.id = root.stop.id || Gun.text.random(2));
			//if((tmp = root.stop) && (tmp = tmp[at.id] || (tmp[at.id] = {})) && tmp[cat.id]){ return } tmp && (tmp[cat.id] = true);
			if(eve.seen && at.id && eve.seen[at.id]){ return eve.to.next(msg) }
			//if((tmp = root.stop)){ if(tmp[at.id]){ return } tmp[at.id] = msg.root; } // temporary fix till a better solution?
			if((tmp = data) && tmp[rel._] && (tmp = rel.is(tmp))){
				tmp = ((msg.$$ = at.root.gun.get(tmp))._);
				if(u !== tmp.put){
					msg = obj_to(msg, {put: data = tmp.put});
				}
			}
			if((tmp = root.mum) && at.id){ // TODO: can we delete mum entirely now?
				var id = at.id + (eve.id || (eve.id = Gun.text.random(9)));
				if(tmp[id]){ return }
				if(u !== data && !rel.is(data)){ tmp[id] = true; }
			}
			as.use(msg, eve);
			if(eve.stun){
				eve.stun = null;
				return;
			}
			eve.to.next(msg);
		}
		function rid(at){
			var cat = this.on;
			if(!at || cat.soul || cat.has){ return this.off() }
			if(!(at = (at = (at = at.$ || at)._ || at).id)){ return }
			var map = cat.map, tmp, seen;
			//if(!map || !(tmp = map[at]) || !(tmp = tmp.at)){ return }
			if(tmp = (seen = this.seen || (this.seen = {}))[at]){ return true }
			seen[at] = true;
			return;
			//tmp.echo[cat.id] = {}; // TODO: Warning: This unsubscribes ALL of this chain's listeners from this link, not just the one callback event.
			//obj.del(map, at); // TODO: Warning: This unsubscribes ALL of this chain's listeners from this link, not just the one callback event.
			return;
		}
		var obj = Gun.obj, obj_map = obj.map, obj_has = obj.has, obj_to = Gun.obj.to;
		var num_is = Gun.num.is;
		var rel = Gun.val.link, node_soul = Gun.node.soul, node_ = Gun.node._;
		var empty = {}, u;
	})(USE, './get');
USE(function(module){
		var Gun = USE('./root');
		Gun.chain.put = function(data, cb, as){
			// #soul.has=value>state
			// ~who#where.where=what>when@was
			// TODO: BUG! Put probably cannot handle plural chains!
			var gun = this, at = (gun._), root = at.root.$, tmp;
			as = as || {};
			as.data = data;
			as.via = as.$ = as.via || as.$ || gun;
			if(typeof cb === 'string'){
				as.soul = cb;
			} else {
				as.ack = as.ack || cb;
			}
			if(at.soul){
				as.soul = at.soul;
			}
			if(as.soul || root === gun){
				if(!obj_is(as.data)){
					(as.ack||noop).call(as, as.out = {err: Gun.log("Data saved to the root level of the graph must be a node (an object), not a", (typeof as.data), 'of "' + as.data + '"!')});
					if(as.res){ as.res(); }
					return gun;
				}
				as.soul = as.soul || (as.not = Gun.node.soul(as.data) || (as.via.back('opt.uuid') || Gun.text.random)());
				if(!as.soul){ // polyfill async uuid for SEA
					as.via.back('opt.uuid')(function(err, soul){ // TODO: improve perf without anonymous callback
						if(err){ return Gun.log(err) } // TODO: Handle error!
						(as.ref||as.$).put(as.data, as.soul = soul, as);
					});
					return gun;
				}
				as.$ = root.get(as.soul);
				as.ref = as.$;
				ify(as);
				return gun;
			}
			if(Gun.is(data)){
				data.get(function(soul, o, msg){
					if(!soul && Gun.val.is(msg.put)){
						return Gun.log("The reference you are saving is a", typeof msg.put, '"'+ msg.put +'", not a node (object)!');
					}
					gun.put(Gun.val.rel.ify(soul), cb, as);
				}, true);
				return gun;
			}
			if(at.has && (tmp = Gun.val.link.is(data))){ at.dub = tmp; }
			as.ref = as.ref || (root._ === (tmp = at.back))? gun : tmp.$;
			if(as.ref._.soul && Gun.val.is(as.data) && at.get){
				as.data = obj_put({}, at.get, as.data);
				as.ref.put(as.data, as.soul, as);
				return gun;
			}
			as.ref.get(any, true, {as: as});
			if(!as.out){
				// TODO: Perf idea! Make a global lock, that blocks everything while it is on, but if it is on the lock it does the expensive lookup to see if it is a dependent write or not and if not then it proceeds full speed. Meh? For write heavy async apps that would be terrible.
				as.res = as.res || stun; // Gun.on.stun(as.ref); // TODO: BUG! Deal with locking?
				as.$._.stun = as.ref._.stun;
			}
			return gun;
		};

		function ify(as){
			as.batch = batch;
			var opt = as.opt||{}, env = as.env = Gun.state.map(map, opt.state);
			env.soul = as.soul;
			as.graph = Gun.graph.ify(as.data, env, as);
			if(env.err){
				(as.ack||noop).call(as, as.out = {err: Gun.log(env.err)});
				if(as.res){ as.res(); }
				return;
			}
			as.batch();
		}

		function stun(cb){
			if(cb){ cb(); }
			return;
			var as = this;
			if(!as.ref){ return }
			if(cb){
				as.after = as.ref._.tag;
				as.now = as.ref._.tag = {};
				cb();
				return;
			}
			if(as.after){
				as.ref._.tag = as.after;
			}
		}

		function batch(){ var as = this;
			if(!as.graph || obj_map(as.stun, no)){ return }
			as.res = as.res || function(cb){ if(cb){ cb(); } };
			as.res(function(){
				var cat = (as.$.back(-1)._), ask = cat.ask(function(ack){
					cat.root.on('ack', ack);
					if(ack.err){ Gun.log(ack); }
					if(!ack.lack){ this.off(); } // One response is good enough for us currently. Later we may want to adjust this.
					if(!as.ack){ return }
					as.ack(ack, this);
				}, as.opt);
				// NOW is a hack to get synchronous replies to correctly call.
				// and STOP is a hack to get async behavior to correctly call.
				// neither of these are ideal, need to be fixed without hacks,
				// but for now, this works for current tests. :/
				var tmp = cat.root.now; obj.del(cat.root, 'now');
				var mum = cat.root.mum; cat.root.mum = {};
				(as.ref._).on('out', {
					$: as.ref, put: as.out = as.env.graph, opt: as.opt, '#': ask
				});
				cat.root.mum = mum? obj.to(mum, cat.root.mum) : mum;
				cat.root.now = tmp;
			}, as);
			if(as.res){ as.res(); }
		} function no(v,k){ if(v){ return true } }

		function map(v,k,n, at){ var as = this;
			var is = Gun.is(v);
			if(k || !at.path.length){ return }
			(as.res||iife)(function(){
				var path = at.path, ref = as.ref, opt = as.opt;
				var i = 0, l = path.length;
				for(i; i < l; i++){
					ref = ref.get(path[i]);
				}
				if(is){ ref = v; }
				var id = (ref._).dub;
				if(id || (id = Gun.node.soul(at.obj))){
					ref.back(-1).get(id);
					at.soul(id);
					return;
				}
				(as.stun = as.stun || {})[path] = true;
				ref.get(soul, true, {as: {at: at, as: as, p:path}});
			}, {as: as, at: at});
			//if(is){ return {} }
		}

		function soul(id, as, msg, eve){
			var as = as.as, cat = as.at; as = as.as;
			var at = ((msg || {}).$ || {})._ || {};
			id = at.dub = at.dub || id || Gun.node.soul(cat.obj) || Gun.node.soul(msg.put || at.put) || Gun.val.rel.is(msg.put || at.put) || (as.via.back('opt.uuid') || Gun.text.random)(); // TODO: BUG!? Do we really want the soul of the object given to us? Could that be dangerous?
			if(eve){ eve.stun = true; }
			if(!id){ // polyfill async uuid for SEA
				at.via.back('opt.uuid')(function(err, id){ // TODO: improve perf without anonymous callback
					if(err){ return Gun.log(err) } // TODO: Handle error.
					solve(at, at.dub = at.dub || id, cat, as);
				});
				return;
			}
			solve(at, at.dub = id, cat, as);
		}

		function solve(at, id, cat, as){
			at.$.back(-1).get(id);
			cat.soul(id);
			as.stun[cat.path] = false;
			as.batch();
		}

		function any(soul, as, msg, eve){
			as = as.as;
			if(!msg.$ || !msg.$._){ return } // TODO: Handle
			if(msg.err){ // TODO: Handle
				console.log("Please report this as an issue! Put.any.err");
				return;
			}
			var at = (msg.$._), data = at.put, opt = as.opt||{}, tmp;
			if((tmp = as.ref) && tmp._.now){ return }
			if(eve){ eve.stun = true; }
			if(as.ref !== as.$){
				tmp = (as.$._).get || at.get;
				if(!tmp){ // TODO: Handle
					console.log("Please report this as an issue! Put.no.get"); // TODO: BUG!??
					return;
				}
				as.data = obj_put({}, tmp, as.data);
				tmp = null;
			}
			if(u === data){
				if(!at.get){ return } // TODO: Handle
				if(!soul){
					tmp = at.$.back(function(at){
						if(at.link || at.soul){ return at.link || at.soul }
						as.data = obj_put({}, at.get, as.data);
					});
				}
				tmp = tmp || at.soul || at.link || at.dub;// || at.get;
				at = tmp? (at.root.$.get(tmp)._) : at;
				as.soul = tmp;
				data = as.data;
			}
			if(!as.not && !(as.soul = as.soul || soul)){
				if(as.path && obj_is(as.data)){
					as.soul = (opt.uuid || as.via.back('opt.uuid') || Gun.text.random)();
				} else {
					//as.data = obj_put({}, as.$._.get, as.data);
					if(node_ == at.get){
						as.soul = (at.put||empty)['#'] || at.dub;
					}
					as.soul = as.soul || at.soul || at.link || (opt.uuid || as.via.back('opt.uuid') || Gun.text.random)();
				}
				if(!as.soul){ // polyfill async uuid for SEA
					as.via.back('opt.uuid')(function(err, soul){ // TODO: improve perf without anonymous callback
						if(err){ return Gun.log(err) } // Handle error.
						as.ref.put(as.data, as.soul = soul, as);
					});
					return;
				}
			}
			as.ref.put(as.data, as.soul, as);
		}
		var obj = Gun.obj, obj_is = obj.is, obj_put = obj.put, obj_map = obj.map;
		var u, empty = {}, noop = function(){}, iife = function(fn,as){fn.call(as||empty);};
		var node_ = Gun.node._;
	})(USE, './put');
USE(function(module){
		var Gun = USE('./root');
		USE('./chain');
		USE('./back');
		USE('./put');
		USE('./get');
		module.exports = Gun;
	})(USE, './index');
USE(function(module){
		var Gun = USE('./index');
		Gun.chain.on = function(tag, arg, eas, as){
			var gun = this, at = gun._, act;
			if(typeof tag === 'string'){
				if(!arg){ return at.on(tag) }
				act = at.on(tag, arg, eas || at, as);
				if(eas && eas.$){
					(eas.subs || (eas.subs = [])).push(act);
				}
				return gun;
			}
			var opt = arg;
			opt = (true === opt)? {change: true} : opt || {};
			opt.at = at;
			opt.ok = tag;
			//opt.last = {};
			gun.get(ok, opt); // TODO: PERF! Event listener leak!!!?
			return gun;
		};

		function ok(msg, ev){ var opt = this;
			var gun = msg.$, at = (gun||{})._ || {}, data = at.put || msg.put, cat = opt.at, tmp;
			if(u === data){
				return;
			}
			if(tmp = msg.$$){
				tmp = (msg.$$._);
				if(u === tmp.put){
					return;
				}
				data = tmp.put;
			}
			if(opt.change){ // TODO: BUG? Move above the undef checks?
				data = msg.put;
			}
			// DEDUPLICATE // TODO: NEEDS WORK! BAD PROTOTYPE
			//if(tmp.put === data && tmp.get === id && !Gun.node.soul(data)){ return }
			//tmp.put = data;
			//tmp.get = id;
			// DEDUPLICATE // TODO: NEEDS WORK! BAD PROTOTYPE
			//at.last = data;
			if(opt.as){
				opt.ok.call(opt.as, msg, ev);
			} else {
				opt.ok.call(gun, data, msg.get, msg, ev);
			}
		}

		Gun.chain.val = function(cb, opt){
			Gun.log.once("onceval", "Future Breaking API Change: .val -> .once, apologies unexpected.");
			return this.once(cb, opt);
		};
		Gun.chain.once = function(cb, opt){
			var gun = this, at = gun._, data = at.put;
			if(0 < at.ack && u !== data){
				(cb || noop).call(gun, data, at.get);
				return gun;
			}
			if(cb){
				(opt = opt || {}).ok = cb;
				opt.at = at;
				opt.out = {'#': Gun.text.random(9)};
				gun.get(val, {as: opt});
				opt.async = true; //opt.async = at.stun? 1 : true;
			} else {
				Gun.log.once("valonce", "Chainable val is experimental, its behavior and API may change moving forward. Please play with it and report bugs and ideas on how to improve it.");
				var chain = gun.chain();
				chain._.nix = gun.once(function(){
					chain._.on('in', gun._);
				});
				return chain;
			}
			return gun;
		};

		function val(msg, eve, to){
			var opt = this.as, cat = opt.at, gun = msg.$, at = gun._, data = at.put || msg.put, link, tmp;
			if(tmp = msg.$$){
				link = tmp = (msg.$$._);
				if(u !== link.put){
					data = link.put;
				}
			}
			if((tmp = eve.wait) && (tmp = tmp[at.id])){ clearTimeout(tmp); }
			if((!to && (u === data || at.soul || at.link || (link && !(0 < link.ack))))
			|| (u === data && (tmp = (obj_map(at.root.opt.peers, function(v,k,t){t(k);})||[]).length) && (!to && (link||at).ack <= tmp))){
				tmp = (eve.wait = {})[at.id] = setTimeout(function(){
					val.call({as:opt}, msg, eve, tmp || 1);
				}, opt.wait || 99);
				return;
			}
			if(link && u === link.put && (tmp = rel.is(data))){ data = Gun.node.ify({}, tmp); }
			eve.rid(msg);
			opt.ok.call(gun || opt.$, data, msg.get);
		}

		Gun.chain.off = function(){
			// make off more aggressive. Warning, it might backfire!
			var gun = this, at = gun._, tmp;
			var cat = at.back;
			if(!cat){ return }
			if(tmp = cat.next){
				if(tmp[at.get]){
					obj_del(tmp, at.get);
				}
			}
			if(tmp = cat.ask){
				obj_del(tmp, at.get);
			}
			if(tmp = cat.put){
				obj_del(tmp, at.get);
			}
			if(tmp = at.soul){
				obj_del(cat.root.graph, tmp);
			}
			if(tmp = at.map){
				obj_map(tmp, function(at){
					if(at.link){
						cat.root.$.get(at.link).off();
					}
				});
			}
			if(tmp = at.next){
				obj_map(tmp, function(neat){
					neat.$.off();
				});
			}
			at.on('off', {});
			return gun;
		};
		var obj = Gun.obj, obj_map = obj.map, obj_has = obj.has, obj_del = obj.del, obj_to = obj.to;
		var rel = Gun.val.link;
		var noop = function(){}, u;
	})(USE, './on');
USE(function(module){
		var Gun = USE('./index');
		Gun.chain.map = function(cb, opt, t){
			var gun = this, cat = gun._, chain;
			if(!cb){
				if(chain = cat.each){ return chain }
				cat.each = chain = gun.chain();
				chain._.nix = gun.back('nix');
				gun.on('in', map, chain._);
				return chain;
			}
			Gun.log.once("mapfn", "Map functions are experimental, their behavior and API may change moving forward. Please play with it and report bugs and ideas on how to improve it.");
			chain = gun.chain();
			gun.map().on(function(data, key, at, ev){
				var next = (cb||noop).call(this, data, key, at, ev);
				if(u === next){ return }
				if(data === next){ return chain._.on('in', at) }
				if(Gun.is(next)){ return chain._.on('in', next._) }
				chain._.on('in', {get: key, put: next});
			});
			return chain;
		};
		function map(msg){
			if(!msg.put || Gun.val.is(msg.put)){ return this.to.next(msg) }
			if(this.as.nix){ this.off(); } // TODO: Ugly hack!
			obj_map(msg.put, each, {at: this.as, msg: msg});
			this.to.next(msg);
		}
		function each(v,k){
			if(n_ === k){ return }
			var msg = this.msg, gun = msg.$, at = this.at, tmp = (gun.get(k)._);
			(tmp.echo || (tmp.echo = {}))[at.id] = tmp.echo[at.id] || at;
		}
		var obj_map = Gun.obj.map, noop = function(){}, n_ = Gun.node._, u;
	})(USE, './map');
USE(function(module){
		var Gun = USE('./index');
		Gun.chain.set = function(item, cb, opt){
			var gun = this, soul;
			cb = cb || function(){};
			opt = opt || {}; opt.item = opt.item || item;
			if(soul = Gun.node.soul(item)){ item = Gun.obj.put({}, soul, Gun.val.link.ify(soul)); }
			if(!Gun.is(item)){
				if(Gun.obj.is(item)){					item = gun.back(-1).get(soul = soul || Gun.node.soul(item) || gun.back('opt.uuid')()).put(item);
				}
				return gun.get(soul || (Gun.state.lex() + Gun.text.random(7))).put(item, cb, opt);
			}
			item.get(function(soul, o, msg){
				if(!soul){ return cb.call(gun, {err: Gun.log('Only a node can be linked! Not "' + msg.put + '"!')}) }
				gun.put(Gun.obj.put({}, soul, Gun.val.link.ify(soul)), cb, opt);
			},true);
			return item;
		};
	})(USE, './set');
USE(function(module){
		if(typeof Gun === 'undefined'){ return } // TODO: localStorage is Browser only. But it would be nice if it could somehow plugin into NodeJS compatible localStorage APIs?

		var noop = function(){}, store;
		try{store = (Gun.window||noop).localStorage;}catch(e){}
		if(!store){
			console.log("Warning: No localStorage exists to persist data to!");
			store = {setItem: function(k,v){this[k]=v;}, removeItem: function(k){delete this[k];}, getItem: function(k){return this[k]}};
		}
		/*
			NOTE: Both `lib/file.js` and `lib/memdisk.js` are based on this design!
			If you update anything here, consider updating the other adapters as well.
		*/

		Gun.on('create', function(root){
			// This code is used to queue offline writes for resync.
			// See the next 'opt' code below for actual saving of data.
			var ev = this.to, opt = root.opt;
			if(root.once){ return ev.next(root) }
			//if(false === opt.localStorage){ return ev.next(root) } // we want offline resynce queue regardless!
			opt.prefix = opt.file || 'gun/';
			var gap = Gun.obj.ify(store.getItem('gap/'+opt.prefix)) || {};
			var empty = Gun.obj.empty, id, to;
			// add re-sync command.
			if(!empty(gap)){
				var disk = Gun.obj.ify(store.getItem(opt.prefix)) || {}, send = {};
				Gun.obj.map(gap, function(node, soul){
					Gun.obj.map(node, function(val, key){
						send[soul] = Gun.state.to(disk[soul], key, send[soul]);
					});
				});
				setTimeout(function(){
					root.on('out', {put: send, '#': root.ask(ack)});
				},1);
			}

			root.on('out', function(msg){
				if(msg.lS){ return }
				if(Gun.is(msg.$) && msg.put && !msg['@'] && !empty(opt.peers)){
					id = msg['#'];
					Gun.graph.is(msg.put, null, map);
					if(!to){ to = setTimeout(flush, opt.wait || 1); }
				}
				this.to.next(msg);
			});
			root.on('ack', ack);

			function ack(ack){ // TODO: This is experimental, not sure if we should keep this type of event hook.
				if(ack.err || !ack.ok){ return }
				var id = ack['@'];
				setTimeout(function(){
					Gun.obj.map(gap, function(node, soul){
						Gun.obj.map(node, function(val, key){
							if(id !== val){ return }
							delete node[key];
						});
						if(empty(node)){
							delete gap[soul];
						}
					});
					flush();
				}, opt.wait || 1);
			}			ev.next(root);

			var map = function(val, key, node, soul){
				(gap[soul] || (gap[soul] = {}))[key] = id;
			};
			var flush = function(){
				clearTimeout(to);
				to = false;
				try{store.setItem('gap/'+opt.prefix, JSON.stringify(gap));
				}catch(e){ Gun.log(err = e || "localStorage failure"); }
			};
		});

		Gun.on('create', function(root){
			this.to.next(root);
			var opt = root.opt;
			if(root.once){ return }
			if(false === opt.localStorage){ return }
			opt.prefix = opt.file || 'gun/';
			var graph = root.graph, acks = {}, count = 0, to;
			var disk = Gun.obj.ify(store.getItem(opt.prefix)) || {};
			root.on('localStorage', disk); // NON-STANDARD EVENT!

			root.on('put', function(at){
				this.to.next(at);
				Gun.graph.is(at.put, null, map);
				if(!at['@']){ acks[at['#']] = true; } // only ack non-acks.
				count += 1;
				if(count >= (opt.batch || 1000)){
					return flush();
				}
				if(to){ return }
				to = setTimeout(flush, opt.wait || 1);
			});

			root.on('get', function(msg){
				this.to.next(msg);
				var lex = msg.get, soul, data, u;
				function to(){
				if(!lex || !(soul = lex['#'])){ return }
				//if(0 >= msg.cap){ return }
				var has = lex['.'];
				data = disk[soul] || u;
				if(data && has){
					data = Gun.state.to(data, has);
				}
				if(!data && !Gun.obj.empty(opt.peers)){ // if data not found, don't ack if there are peers.
					return; // Hmm, what if we have peers but we are disconnected?
				}
				//console.log("lS get", lex, data);
				root.on('in', {'@': msg['#'], put: Gun.graph.node(data), how: 'lS', lS: msg.$ || root.$});
				}				Gun.debug? setTimeout(to,1) : to();
			});

			var map = function(val, key, node, soul){
				disk[soul] = Gun.state.to(node, key, disk[soul]);
			};

			var flush = function(data){
				var err;
				count = 0;
				clearTimeout(to);
				to = false;
				var ack = acks;
				acks = {};
				if(data){ disk = data; }
				try{store.setItem(opt.prefix, JSON.stringify(disk));
				}catch(e){
					Gun.log(err = (e || "localStorage failure") + " Consider using GUN's IndexedDB plugin for RAD for more storage space, temporary example at https://github.com/amark/gun/blob/master/test/tmp/indexedDB.html .");
					root.on('localStorage:error', {err: err, file: opt.prefix, flush: disk, retry: flush});
				}
				if(!err && !Gun.obj.empty(opt.peers)){ return } // only ack if there are no peers.
				Gun.obj.map(ack, function(yes, id){
					root.on('in', {
						'@': id,
						err: err,
						ok: 0 // localStorage isn't reliable, so make its `ok` code be a low number.
					});
				});
			};
		});
	})(USE, './adapters/localStorage');
USE(function(module){
		var Type = USE('../type');

		function Mesh(ctx){
			var mesh = function(){};
			var opt = ctx.opt || {};
			opt.log = opt.log || console.log;
			opt.gap = opt.gap || opt.wait || 1;
			opt.pack = opt.pack || (opt.memory? (opt.memory * 1000 * 1000) : 1399000000) * 0.3; // max_old_space_size defaults to 1400 MB.

			mesh.out = function(msg){ var tmp;
				if(this.to){ this.to.next(msg); }
				//if(mesh.last != msg['#']){ return mesh.last = msg['#'], this.to.next(msg) }
				if((tmp = msg['@'])
				&& (tmp = ctx.dup.s[tmp])
				&& (tmp = tmp.it)
				&& tmp._){
					mesh.say(msg, (tmp._).via, 1);
					tmp['##'] = msg['##'];
					return;
				}
				// add hook for AXE?
				//if (Gun.AXE && opt && opt.super) { Gun.AXE.say(msg, mesh.say, this); return; } // rogowski
				mesh.say(msg);
			};

			ctx.on('create', function(root){
				root.opt.pid = root.opt.pid || Type.text.random(9);
				this.to.next(root);
				ctx.on('out', mesh.out);
			});

			mesh.hear = function(raw, peer){
				if(!raw){ return }
				var dup = ctx.dup, id, hash, msg, tmp = raw[0];
				if(opt.pack <= raw.length){ return mesh.say({dam: '!', err: "Message too big!"}, peer) }
				try{msg = JSON.parse(raw);
				}catch(e){opt.log('DAM JSON parse error', e);}
				if('{' === tmp){
					if(!msg){ return }
					if(dup.check(id = msg['#'])){ return }
					dup.track(id, true).it = msg; // GUN core also dedups, so `true` is needed.
					if((tmp = msg['@']) && msg.put){
						hash = msg['##'] || (msg['##'] = mesh.hash(msg));
						if((tmp = tmp + hash) != id){
							if(dup.check(tmp)){ return }
							(tmp = dup.s)[hash] = tmp[id];
						}
					}
					(msg._ = function(){}).via = peer;
					if((tmp = msg['><'])){
						(msg._).to = Type.obj.map(tmp.split(','), function(k,i,m){m(k,true);});
					}
					if(msg.dam){
						if(tmp = mesh.hear[msg.dam]){
							tmp(msg, peer, ctx);
						}
						return;
					}
					ctx.on('in', msg);

					return;
				} else
				if('[' === tmp){
					if(!msg){ return }
					var i = 0, m;
					while(m = msg[i++]){
						mesh.hear(m, peer);
					}

					return;
				}
			}

			;(function(){
				mesh.say = function(msg, peer, o){
					/*
						TODO: Plenty of performance optimizations
						that can be made just based off of ordering,
						and reducing function calls for cached writes.
					*/
					if(!peer){
						Type.obj.map(opt.peers, function(peer){
							mesh.say(msg, peer);
						});
						return;
					}
					var tmp, wire = peer.wire || ((opt.wire) && opt.wire(peer)), msh, raw;// || open(peer, ctx); // TODO: Reopen!
					if(!wire){ return }
					msh = (msg._) || empty;
					if(peer === msh.via){ return }
					if(!(raw = msh.raw)){ raw = mesh.raw(msg); }
					if((tmp = msg['@'])
					&& (tmp = ctx.dup.s[tmp])
					&& (tmp = tmp.it)){
						if(tmp.get && tmp['##'] && tmp['##'] === msg['##']){ // PERF: move this condition outside say?
							return; // TODO: this still needs to be tested in the browser!
						}
					}
					if((tmp = msh.to) && (tmp[peer.url] || tmp[peer.id]) && !o){ return } // TODO: still needs to be tested
					if(peer.batch){
						peer.tail = (peer.tail || 0) + raw.length;
						if(peer.tail <= opt.pack){
							peer.batch.push(raw);
							return;
						}
						flush(peer);
					}
					peer.batch = [];
					setTimeout(function(){flush(peer);}, opt.gap);
					send(raw, peer);
				};
				function flush(peer){
					var tmp = peer.batch;
					if(!tmp){ return }
					peer.batch = peer.tail = null;
					if(!tmp.length){ return }
					try{send(JSON.stringify(tmp), peer);
					}catch(e){opt.log('DAM JSON stringify error', e);}
				}
				function send(raw, peer){
					var wire = peer.wire;
					try{
						if(wire.send){
							wire.send(raw);
						} else
						if(peer.say){
							peer.say(raw);
						}
					}catch(e){
						(peer.queue = peer.queue || []).push(raw);
					}
				}

			}());
(function(){

				mesh.raw = function(msg){
					if(!msg){ return '' }
					var dup = ctx.dup, msh = (msg._) || {}, put, hash, tmp;
					if(tmp = msh.raw){ return tmp }
					if(typeof msg === 'string'){ return msg }
					if(msg['@'] && (tmp = msg.put)){
						if(!(hash = msg['##'])){
							put = $(tmp, sort) || '';
							hash = mesh.hash(msg, put);
							msg['##'] = hash;
						}
						(tmp = dup.s)[hash = msg['@']+hash] = tmp[msg['#']];
						msg['#'] = hash || msg['#'];
						if(put){ (msg = Type.obj.to(msg)).put = _; }
					}
					var i = 0, to = []; Type.obj.map(opt.peers, function(p){
						to.push(p.url || p.id); if(++i > 9){ return true } // limit server, fast fix, improve later!
					}); msg['><'] = to.join();
					var raw = $(msg);
					if(u !== put){
						tmp = raw.indexOf(_, raw.indexOf('put'));
						raw = raw.slice(0, tmp-1) + put + raw.slice(tmp + _.length + 1);
						//raw = raw.replace('"'+ _ +'"', put); // https://github.com/amark/gun/wiki/@$$ Heisenbug
					}
					if(msh){
						msh.raw = raw;
					}
					return raw;
				};

				mesh.hash = function(msg, hash){
					return Mesh.hash(hash || $(msg.put, sort) || '') || msg['#'] || Type.text.random(9);
				};

				function sort(k, v){ var tmp;
					if(!(v instanceof Object)){ return v }
					Type.obj.map(Object.keys(v).sort(), map, {to: tmp = {}, on: v});
					return tmp;
				}

				function map(k){
					this.to[k] = this.on[k];
				}
				var $ = JSON.stringify, _ = ':])([:';

			}());

			mesh.hi = function(peer){
				var tmp = peer.wire || {};
				if(peer.id || peer.url){
					opt.peers[peer.url || peer.id] = peer;
					Type.obj.del(opt.peers, tmp.id);
				} else {
					tmp = tmp.id = tmp.id || Type.text.random(9);
					mesh.say({dam: '?'}, opt.peers[tmp] = peer);
				}
				if(!tmp.hied){ ctx.on(tmp.hied = 'hi', peer); }
				tmp = peer.queue; peer.queue = [];
				Type.obj.map(tmp, function(msg){
					mesh.say(msg, peer);
				});
			};
			mesh.bye = function(peer){
				Type.obj.del(opt.peers, peer.id); // assume if peer.url then reconnect
				ctx.on('bye', peer);
			};

			mesh.hear['!'] = function(msg, peer){ opt.log('Error:', msg.err); };
			mesh.hear['?'] = function(msg, peer){
				if(!msg.pid){ return mesh.say({dam: '?', pid: opt.pid, '@': msg['#']}, peer) }
				peer.id = peer.id || msg.pid;
				mesh.hi(peer);
			};

			return mesh;
		}

		Mesh.hash = function(s){ // via SO
			if(typeof s !== 'string'){ return {err: 1} }
	    var c = 0;
	    if(!s.length){ return c }
	    for(var i=0,l=s.length,n; i<l; ++i){
	      n = s.charCodeAt(i);
	      c = ((c<<5)-c)+n;
	      c |= 0;
	    }
	    return c; // Math.abs(c);
	  };

	  var empty = {}, u;
	  Object.keys = Object.keys || function(o){ return map(o, function(v,k,t){t(k);}) };

	  try{ module.exports = Mesh; }catch(e){}

	})(USE, './adapters/mesh');
USE(function(module){
		var Gun = USE('../index');
		Gun.Mesh = USE('./mesh');

		Gun.on('opt', function(root){
			this.to.next(root);
			var opt = root.opt;
			if(root.once){ return }
			if(false === opt.WebSocket){ return }

			var env;
			if(typeof window !== "undefined"){ env = window; }
			if(typeof commonjsGlobal !== "undefined"){ env = commonjsGlobal; }
			env = env || {};

			var websocket = opt.WebSocket || env.WebSocket || env.webkitWebSocket || env.mozWebSocket;
			if(!websocket){ return }
			opt.WebSocket = websocket;

			var mesh = opt.mesh = opt.mesh || Gun.Mesh(root);

			var wire = opt.wire;
			opt.wire = open;
			function open(peer){ try{
				if(!peer || !peer.url){ return wire && wire(peer) }
				var url = peer.url.replace('http', 'ws');
				var wire = peer.wire = new opt.WebSocket(url);
				wire.onclose = function(){
					opt.mesh.bye(peer);
					reconnect(peer);
				};
				wire.onerror = function(error){
					reconnect(peer); // placement?
					if(!error){ return }
					if(error.code === 'ECONNREFUSED');
				};
				wire.onopen = function(){
					opt.mesh.hi(peer);
				};
				wire.onmessage = function(msg){
					if(!msg){ return }
					opt.mesh.hear(msg.data || msg, peer);
				};
				return wire;
			}catch(e){}}

			function reconnect(peer){
				clearTimeout(peer.defer);
				peer.defer = setTimeout(function(){
					open(peer);
				}, 2 * 1000);
			}
		});
	})(USE, './adapters/websocket');

}());
});

(function(){
	var Gun = (typeof window !== "undefined")? window.Gun : gun;
	var ify = Gun.node.ify, u;
	Gun.chain.time = function(data, a, b){
		if(data instanceof Function){
			return travel(data, a, b, this);
		}
		var gun$$1 = this, root = gun$$1.back(-1);
		var cb = (a instanceof Function && a) || (b instanceof Function && b);
		if(Gun.is(data)){
			data.get(function(soul){
				if(!soul){
					return cb && cb({err: "Timegraph cannot link `undefined`!"});
				}
				gun$$1.time(Gun.val.link.ify(soul), a, b);
			}, true);
			return gun$$1;
		}
		opt = (cb === a)? b : a;
		opt = Gun.text.is(opt)? {key: opt} : opt || {};
		var t = new Date(Gun.state()).toISOString().split(/[\-t\:\.z]/ig);
		var p, tmp = t.pop();
		gun$$1.get(function(soul){
			var id = soul;
			p = id;
			if(!p){ id = p = (gun$$1.back('opt.uuid') || Gun.text.random)(9); }
			// could shrink this into a loop. Do later?
			t = [p].concat(t);
			var rid = opt.key || (gun$$1.back('opt.uuid') || Gun.text.random)(9);
			var milli = ify({}, t.join(':'));
			milli[rid] = data;
			tmp = t.pop();
			var sec = ify({}, t.join(':'));
			sec[tmp] = milli;
			tmp = t.pop();
			var min = ify({}, t.join(':'));
			min[tmp] = sec;
			tmp = t.pop();
			var hour = ify({}, t.join(':'));
			hour[tmp] = min;
			tmp = t.pop();
			var day = ify({}, t.join(':'));
			day[tmp] = hour;
			tmp = t.pop();
			var month = ify({}, t.join(':'));
			month[tmp] = day;
			tmp = t.pop();
			var year = ify({}, t.join(':'));
			year[tmp] = month;
			tmp = t.pop();
			var time = ify({}, t.join(':') || id);
			time[tmp] = year;
			gun$$1.put(time, cb);
		}, true);
		return gun$$1;
	};
	function travel(cb, opt, b, gun$$1){
		var root = gun$$1.back(-1);
		(opt = Gun.num.is(opt)? {last: opt} : opt || {}).seen = opt.seen || {};
		var t = now(opt.start);
		gun$$1.on(function(data, key, msg, eve){
			var at = msg.$._, id = at.link || at.soul || Gun.node.soul(data);
			if(!id){ return }
			if(false === opt.next){ eve.off(); }
			else { opt.next = true; }
			opt.start = [opt.id = id].concat(t);
			opt.low = opt.low || opt.start;
			opt.top = opt.top || opt.start;
			opt.now = [id].concat(now());
			//console.log("UPDATE");
			find(opt, cb, root, opt.at? opt.now : opt.at = opt.start);
		});
		return gun$$1;
	}
	function now(t){
		return new Date(t || Gun.state()).toISOString().split(/[\-t\:\.z]/ig).slice(0,-1);
	}
	function find(o, cb, root, at, off){
		var at = at || o.at, t = at.join(':');
		if(!off){
			if(o.seen[t]){ return }
			o.seen[t] = true;
		}
		var next = (o.low || o.start)[at.length];
		root.get(t).get(function(msg, ev){
			if(off){ ev.off(); }
			//console.log(at, msg.put);
			if(u === msg.put){
				find(o, cb, root, at.slice(0,-1), off);
				return;
			}
			if(7 < at.length){
				var l = Object.keys(msg.put).length;
				if(l === o.seen[t]){ return }
				var when = +(toDate(at));
				Gun.node.is(msg.put, function(v, k){
					cb(v, k, when, ev);
					if(o.last){ --o.last; }
				});
				o.seen[t] = l;
				if(!o.last){ return }
				if(o.last <= 0){ return }
				o.low = at;
				var tmp = at.slice(0,-1);
				find(o, cb, root, tmp, true);
				return;
			}
			if(o.last && false !== off){
				var keys = Object.keys(msg.put).sort().reverse();
				var less = Gun.list.map(keys, function(k){
					if(parseFloat(k) < parseFloat(next)){ return k }
				});
				if(!less){
					find(o, cb, root, at.slice(0,-1), true);
				} else {
					var tmp = (at || o.at).slice();
					tmp.push(less);
					(o.low = tmp.slice()).push(Infinity);
					find(o, cb, root, tmp, true);
				}
			}
			if(off){ return }
			if(!o.next){ return }
			if(at < o.start.slice(0, at.length)){ return }
			var n = [o.id].concat(now()), top = n[at.length];
			Gun.node.is(msg.put, function(v, k){
				if(k > top){ return }
				(v = at.slice()).push(k);
				find(o, cb, root, v, false);
			});
		});
	}
	function toDate(at){
		at = at.slice(-7);
		return new Date(Date.UTC(at[0], parseFloat(at[1])-1, at[2], at[3], at[4], at[5], at[6]));
	}
}());

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
var events = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject$1(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject$1(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject$1(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject$1(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject$1(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject$1(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}
var events_1 = events.EventEmitter;

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

/**
 * Creates a slice of `array` with `n` elements taken from the end.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [n=1] The number of elements to take.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.takeRight([1, 2, 3]);
 * // => [3]
 *
 * _.takeRight([1, 2, 3], 2);
 * // => [2, 3]
 *
 * _.takeRight([1, 2, 3], 5);
 * // => [1, 2, 3]
 *
 * _.takeRight([1, 2, 3], 0);
 * // => []
 */
function takeRight(array, n, guard) {
  var length = array ? array.length : 0;
  if (!length) {
    return [];
  }
  n = (guard || n === undefined) ? 1 : toInteger(n);
  n = length - n;
  return baseSlice(array, n < 0 ? 0 : n, length);
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$2(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject$2(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject$2(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var lodash_takeright = takeRight;

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto$1 = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$1 = objectProto$1.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map$1 = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$1.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty$1.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map$1 || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject$3(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction$1(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction$1(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject$3(value) ? objectToString$1.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$3(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

var lodash_memoize = memoize;

let gunServer = window.__sync_watch__ || '/gun';
const conn = gun(gunServer);
// export const conn = Gun<Record<string, State>>()
const getStore = lodash_memoize((session) => conn.get('sync_watch_' + session));
class Chat extends events_1 {
    constructor(chat, username) {
        super();
        this.chat = chat;
        this.username = username;
        this.MAX = 60;
        this._m = [];
        this.broadcastLocal = (text) => {
            this._m.push({ data: { from: '', text: text, type: 'system' }, time: Date.now() });
            this.emit('new-all', this.messages);
            this.emit('new', this.messages);
        };
        this.broadcast = (text) => {
            this.chat.time(JSON.stringify({
                text: text,
                type: 'chat',
                from: this.username,
            }));
        };
        chat.time((data, key, time) => {
            data = JSON.parse(data);
            data.type = 'chat';
            if (data.text === messages.JOINED)
                dispatchEvent(new Event('sync-progress'));
            this._m.push({ data, time });
            this.emit('new-all', this.messages);
            this.emit('new', this.messages);
        }, this.MAX);
        addEventListener('clear-notification', () => {
            this._m = this._m.filter(x => x.data.type === 'chat' && !messages.getString(x.data));
            this.emit('new-all', this.messages);
            this.emit('new', this.messages);
        });
        this.broadcastLocal(`最多显示 ${this.MAX} 条消息`);
        this.broadcast(messages.JOINED);
    }
    get messages() {
        return lodash_takeright(this._m.sort((a, b) => a.time - b.time), this.MAX);
    }
    addAllMessageChangeListener(cb) {
        return this.addListener('new-all', cb);
    }
    removeAllMessageChangeListener(cb) {
        return this.removeListener('new-all', cb);
    }
}
const getChatroom = lodash_memoize((session, username) => new Chat(getStore(session).get('chatRoom'), username));
window.onunload = () => localStorage.clear();

function ChooseVideo(props) {
    const input = react.useRef(null);
    const dialog = react.useRef(null);
    const [showOnline, setShowOnline] = react_1(true);
    let url = '';
    const store = getStore(props.session).get('onlineVideo');
    store.once(onNext);
    react_5(() => (store.once(onNext), () => store.off()));
    function onNext(url) {
        if (!url)
            return;
        if (url === 'blob://')
            return showOnline && setShowOnline(false);
        if (url.startsWith('https://') || url.startsWith('http://'))
            store.put(url);
        props.onNext(url);
    }
    function getBlob(event) {
        URL.revokeObjectURL(url);
        const files = (event.dataTransfer || event.currentTarget).files;
        if (!files)
            return;
        const file = files.item(0);
        if (!file)
            return;
        url = URL.createObjectURL(file);
        store.put('blob://'); // 告诉其他实例不要显示在线选项
        return url;
    }
    function onEnter(e) {
        if (!dialog.current)
            return;
        e.preventDefault();
        dialog.current.style.transform = 'scale(0.95)';
        dialog.current.style.opacity = '0.8';
    }
    function onLeave() {
        if (!dialog.current)
            return;
        dialog.current.style.transform = '';
        dialog.current.style.opacity = '1';
    }
    return (react.createElement("main", null,
        react.createElement("form", { hidden: true },
            react.createElement("input", { type: "file", ref: input, accept: "video/*", onChange: e => onNext(getBlob(e)) })),
        react.createElement("div", { ref: dialog, className: "dialog", onDragEnterCapture: onEnter, onDragLeaveCapture: onLeave, onDropCapture: e => {
                e.preventDefault();
                setTimeout(onLeave, 200);
                setTimeout(() => onNext(getBlob(e)), 600);
            }, onDragOverCapture: onEnter },
            react.createElement(Typography, { withSpan: true }, ty => react.createElement("h1", { style: ty.subHeader }, "\u60F3\u770B\u4EC0\u4E48\uFF1F")),
            react.createElement(Typography, { withSpan: true }, ty => react.createElement("h2", { style: ty.subTitleAlt }, "\u672C\u5730\u89C6\u9891")),
            react.createElement(Typography, { withSpan: true }, ty => (react.createElement("span", { style: ty.body },
                react.createElement(Button, { tabIndex: 1, onClick: () => input.current && input.current.click() }, "\u9009\u62E9\u89C6\u9891"),
                react.createElement("div", { style: { display: 'inline-block', marginLeft: 6, transform: 'translateY(1px)' } }, "\u6216\u8005\u5C06\u89C6\u9891\u62D6\u653E\u5230\u8FD9\u91CC\u3002")))),
            react.createElement(Typography, { withSpan: true }, ty => react.createElement("h1", { style: ty.subTitleAlt }, "\u7F51\u7EDC\u89C6\u9891")),
            showOnline ? (react.createElement(Typography, { withSpan: true }, ty => (react.createElement(Input, { autoFocus: true, onCommit: onNext, type: "url", icon: "Link", placeholder: "\u89C6\u9891\u6587\u4EF6\u5730\u5740\uFF0C\u6216 Youtube \u94FE\u63A5" })))) : (react.createElement(Typography, { withSpan: true }, ty => react.createElement("h1", { style: ty.body }, "\u4E0D\u53EF\u7528\uFF0C\u5176\u4ED6\u5B9E\u4F8B\u5DF2\u7ECF\u9009\u62E9\u4E86\u672C\u5730\u89C6\u9891\u3002"))))));
}
function AskName(props) {
    return (react.createElement("main", null,
        react.createElement("div", { className: "dialog" },
            react.createElement(Typography, { withSpan: true }, ty => react.createElement("h1", { style: ty.subHeader }, "\u600E\u4E48\u79F0\u547C\u60A8\uFF1F")),
            react.createElement(Typography, { withSpan: true }, ty => react.createElement("span", { style: ty.body }, "\u8FD9\u4F1A\u5411\u5176\u4ED6\u4EBA\u5C55\u793A\u3002")),
            react.createElement(Typography, { withSpan: true }, () => (react.createElement(Input, { onCommit: props.onNext, autoComplete: "name", autoFocus: true, icon: "CheckMark", placeholder: "\u60A8\u7684\u540D\u79F0" }))),
            react.createElement(Typography, null, ty => (react.createElement("div", null,
                "\u61D2\u5F97\u6253\uFF0C\u7ED9\u6211\u968F\u4FBF",
                ' ',
                react.createElement(Button, { onClick: () => props.onNext(uuid_1().match(/[a-z0-9]{5}/)[0]), tabIndex: 1 }, "\u6574\u4E00\u4E2A")))))));
}
const uuidRegex = /^([a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12})$/g;
function AskSession(props) {
    const [shareCode, setShareCode] = react_1('');
    const ref = react_2(null);
    react_5(() => {
        const val = location.hash.slice(1);
        if (shareCode !== val && val.match(uuidRegex)) {
            // Mystery, we need a timer
            return (x => () => clearTimeout(x))(setTimeout(() => {
                if (shareCode)
                    return;
                setShareCode(val);
                ref.current(val);
            }, 400));
        }
    }, [location.hash]);
    return (react.createElement("main", null,
        react.createElement("div", { className: "dialog" },
            react.createElement(Typography, { withSpan: true }, ty => react.createElement("h1", { style: ty.subHeader }, "\u6B22\u8FCE\u4F7F\u7528 Sync Watch\uFF0C\u60A8\u7684\u5171\u4EAB\u7801\u662F\uFF1F")),
            react.createElement(Typography, { withSpan: true }, () => (react.createElement(Input, { onCommit: props.onNext, icon: "Forward", autoFocus: true, pattern: uuidRegex, placeholder: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", ref: ref, spellCheck: false, style: { maxWidth: 350, width: '100%' } }))),
            react.createElement(Typography, { withSpan: true }, ty => react.createElement("p", { style: ty.body }, "\u5982\u679C\u662F\u5176\u4ED6\u4EBA\u9080\u8BF7\u60A8\u524D\u6765\uFF0C\u4ED6\u4EEC\u4F1A\u5411\u4F60\u63D0\u4F9B\u4E00\u4E2A\u5171\u4EAB\u7801\u3002")),
            react.createElement(Typography, { withSpan: true }, ty => (react.createElement("p", { style: ty.body },
                "\u5982\u679C\u60A8\u5E0C\u671B\u9080\u8BF7\u5176\u4ED6\u4EBA\uFF0C\u8BF7\u70B9\u51FB\u8FD9\u91CC",
                ' ' /** 别删除这个空格。排版用。 */,
                react.createElement(Button, { onClick: () => {
                        const u = uuid_1();
                        setShareCode(u);
                        ref.current && ref.current(u);
                        location.hash = u;
                        clipboard.writeText(location.href).then(() => {
                            showToast('分享码已经复制到剪贴板');
                            props.onNext(u);
                        }, () => showToast('复制到剪贴板失败'));
                    } }, "\u83B7\u53D6\u5171\u4EAB\u7801")))),
            react.createElement(Typography, { withSpan: true }, ty => (react.createElement("span", { style: Object.assign({}, ty.caption, { color: 'yellow', opacity: 0.7 }) }, "\u4F7F\u7528\u4E0D\u540C\u5171\u4EAB\u7801\u7684\u4EBA\u4E0D\u4F1A\u52A0\u5165\u540C\u4E00\u4E2A\u623F\u95F4\uFF0C\u4F46\u5171\u4EAB\u7801\u4E0D\u662F\u5BC6\u7801\uFF0C\u5176\u4ED6\u4EBA\u4ECD\u7136\u6709\u53EF\u80FD\u83B7\u77E5\u623F\u95F4\u5185\u7684\u804A\u5929\u5185\u5BB9\u3002 \u8BF7\u6CE8\u610F\u4FDD\u62A4\u4E2A\u4EBA\u9690\u79C1\u3002"))))));
}

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag$1 = '[object Function]',
    genTag$1 = '[object GeneratorFunction]',
    symbolTag$1 = '[object Symbol]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar$1 = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor$1 = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf$1 = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$1 = freeGlobal$1 || freeSelf$1 || Function('return this')();

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array ? array.length : 0;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return baseFindIndex(array, baseIsNaN, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a cache value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue$1(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject$1(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var arrayProto$1 = Array.prototype,
    funcProto$1 = Function.prototype,
    objectProto$2 = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData$1 = root$1['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey$1 = (function() {
  var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$2 = objectProto$2.toString;

/** Used to detect if a method is native. */
var reIsNative$1 = RegExp('^' +
  funcToString$1.call(hasOwnProperty$2).replace(reRegExpChar$1, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol$1 = root$1.Symbol,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    propertyIsEnumerable = objectProto$2.propertyIsEnumerable,
    splice$1 = arrayProto$1.splice,
    spreadableSymbol = Symbol$1 ? Symbol$1.isConcatSpreadable : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeMax = Math.max;

/* Built-in method references that are verified to be native. */
var Map$2 = getNative$1(root$1, 'Map'),
    nativeCreate$1 = getNative$1(Object, 'create');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash$1(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear$1() {
  this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete$1(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$1) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? undefined : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== undefined : hasOwnProperty$2.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet$1(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate$1 && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

// Add methods to `Hash`.
Hash$1.prototype.clear = hashClear$1;
Hash$1.prototype['delete'] = hashDelete$1;
Hash$1.prototype.get = hashGet$1;
Hash$1.prototype.has = hashHas$1;
Hash$1.prototype.set = hashSet$1;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache$1(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear$1() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete$1(key) {
  var data = this.__data__,
      index = assocIndexOf$1(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice$1.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet$1(key) {
  var data = this.__data__,
      index = assocIndexOf$1(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas$1(key) {
  return assocIndexOf$1(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet$1(key, value) {
  var data = this.__data__,
      index = assocIndexOf$1(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache$1.prototype.clear = listCacheClear$1;
ListCache$1.prototype['delete'] = listCacheDelete$1;
ListCache$1.prototype.get = listCacheGet$1;
ListCache$1.prototype.has = listCacheHas$1;
ListCache$1.prototype.set = listCacheSet$1;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache$1(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear$1() {
  this.__data__ = {
    'hash': new Hash$1,
    'map': new (Map$2 || ListCache$1),
    'string': new Hash$1
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete$1(key) {
  return getMapData$1(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet$1(key) {
  return getMapData$1(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas$1(key) {
  return getMapData$1(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet$1(key, value) {
  getMapData$1(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache$1.prototype.clear = mapCacheClear$1;
MapCache$1.prototype['delete'] = mapCacheDelete$1;
MapCache$1.prototype.get = mapCacheGet$1;
MapCache$1.prototype.has = mapCacheHas$1;
MapCache$1.prototype.set = mapCacheSet$1;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache$1;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED$1);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$2.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf$1(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative$1(value) {
  if (!isObject$4(value) || isMasked$1(value)) {
    return false;
  }
  var pattern = (isFunction$2(value) || isHostObject$1(value)) ? reIsNative$1 : reIsHostCtor$1;
  return pattern.test(toSource$1(value));
}

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject$4(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$2.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property identifiers to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, props) {
  object = Object(object);
  return basePickBy(object, props, function(value, key) {
    return key in object;
  });
}

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property identifiers to pick from.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, props, predicate) {
  var index = -1,
      length = props.length,
      result = {};

  while (++index < length) {
    var key = props[index],
        value = object[key];

    if (predicate(value, key)) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData$1(map, key) {
  var data = map.__data__;
  return isKeyable$1(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative$1(object, key) {
  var value = getValue$1(object, key);
  return baseIsNative$1(value) ? value : undefined;
}

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

/**
 * Creates an array of the own and inherited enumerable symbol properties
 * of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable$1(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked$1(func) {
  return !!maskSrcKey$1 && (maskSrcKey$1 in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$2;

  return value === proto;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol$1(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource$1(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq$1(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty$2.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString$2.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction$2(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike$1(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction$2(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject$4(value) ? objectToString$2.call(value) : '';
  return tag == funcTag$1 || tag == genTag$1;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$4(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike$1(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol$1(value) {
  return typeof value == 'symbol' ||
    (isObjectLike$1(value) && objectToString$2.call(value) == symbolTag$1);
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable string keyed properties of `object` that are
 * not omitted.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [props] The property identifiers to omit.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
var omit = baseRest(function(object, props) {
  if (object == null) {
    return {};
  }
  props = arrayMap(baseFlatten(props, 1), toKey);
  return basePick(object, baseDifference(getAllKeysIn(object), props));
});

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

var lodash_omit = omit;

var props = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultProps = exports.propTypes = undefined;



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var string = _propTypes2['default'].string,
    bool = _propTypes2['default'].bool,
    number = _propTypes2['default'].number,
    array = _propTypes2['default'].array,
    oneOfType = _propTypes2['default'].oneOfType,
    shape = _propTypes2['default'].shape,
    object = _propTypes2['default'].object,
    func = _propTypes2['default'].func;
var propTypes$$1 = exports.propTypes = {
  url: oneOfType([string, array]),
  playing: bool,
  loop: bool,
  controls: bool,
  volume: number,
  playbackRate: number,
  width: oneOfType([string, number]),
  height: oneOfType([string, number]),
  style: object,
  progressFrequency: number,
  playsinline: bool,
  soundcloudConfig: shape({
    clientId: string,
    showArtwork: bool
  }),
  youtubeConfig: shape({
    playerVars: object,
    preload: bool
  }),
  facebookConfig: shape({
    appId: string
  }),
  dailymotionConfig: shape({
    params: object,
    preload: bool
  }),
  vimeoConfig: shape({
    iframeParams: object,
    preload: bool
  }),
  vidmeConfig: shape({
    format: string
  }),
  fileConfig: shape({
    attributes: object,
    tracks: array,
    forceAudio: bool,
    forceHLS: bool,
    forceDASH: bool
  }),
  wistiaConfig: shape({
    options: object
  }),
  onReady: func,
  onStart: func,
  onPlay: func,
  onPause: func,
  onBuffer: func,
  onEnded: func,
  onError: func,
  onDuration: func,
  onProgress: func
};

var defaultProps = exports.defaultProps = {
  playing: false,
  loop: false,
  controls: false,
  volume: 0.8,
  playbackRate: 1,
  width: 640,
  height: 360,
  hidden: false,
  progressFrequency: 1000,
  playsinline: false,
  soundcloudConfig: {
    clientId: 'e8b6f84fbcad14c301ca1355cae1dea2',
    showArtwork: true
  },
  youtubeConfig: {
    playerVars: {},
    preload: false
  },
  facebookConfig: {
    appId: '1309697205772819'
  },
  dailymotionConfig: {
    params: {},
    preload: false
  },
  vimeoConfig: {
    iframeParams: {},
    preload: false
  },
  vidmeConfig: {
    format: null
  },
  fileConfig: {
    attributes: {},
    tracks: [],
    forceAudio: false,
    forceHLS: false,
    forceDASH: false
  },
  wistiaConfig: {
    options: {}
  },
  onReady: function onReady() {},
  onStart: function onStart() {},
  onPlay: function onPlay() {},
  onPause: function onPause() {},
  onBuffer: function onBuffer() {},
  onEnded: function onEnded() {},
  onError: function onError() {},
  onDuration: function onDuration() {},
  onProgress: function onProgress() {}
};
});

unwrapExports(props);
var props_1 = props.defaultProps;
var props_2 = props.propTypes;

var loadScript = function load (src, opts, cb) {
  var head = document.head || document.getElementsByTagName('head')[0];
  var script = document.createElement('script');

  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  opts = opts || {};
  cb = cb || function() {};

  script.type = opts.type || 'text/javascript';
  script.charset = opts.charset || 'utf8';
  script.async = 'async' in opts ? !!opts.async : true;
  script.src = src;

  if (opts.attrs) {
    setAttributes(script, opts.attrs);
  }

  if (opts.text) {
    script.text = '' + opts.text;
  }

  var onend = 'onload' in script ? stdOnEnd : ieOnEnd;
  onend(script, cb);

  // some good legacy browsers (firefox) fail the 'in' detection above
  // so as a fallback we always set onload
  // old IE will ignore this and new IE will set onload
  if (!script.onload) {
    stdOnEnd(script, cb);
  }

  head.appendChild(script);
};

function setAttributes(script, attrs) {
  for (var attr in attrs) {
    script.setAttribute(attr, attrs[attr]);
  }
}

function stdOnEnd (script, cb) {
  script.onload = function () {
    this.onerror = this.onload = null;
    cb(null, script);
  };
  script.onerror = function () {
    // this.onload = null here is necessary
    // because even IE9 works not like others
    this.onerror = this.onload = null;
    cb(new Error('Failed to load ' + this.src), script);
  };
}

function ieOnEnd (script, cb) {
  script.onreadystatechange = function () {
    if (this.readyState != 'complete' && this.readyState != 'loaded') return
    this.onreadystatechange = null;
    cb(null, script); // there is no way to catch loading errors in IE8
  };
}

var Base_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props$$1) { for (var i = 0; i < props$$1.length; i++) { var descriptor = props$$1[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();





function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SEEK_ON_PLAY_EXPIRY = 5000;

var Base = function (_Component) {
  _inherits(Base, _Component);

  function Base() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Base);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Base.__proto__ || Object.getPrototypeOf(Base)).call.apply(_ref, [this].concat(args))), _this), _this.isReady = false, _this.startOnPlay = true, _this.durationOnPlay = false, _this.seekOnPlay = null, _this.onPlay = function () {
      var _this$props = _this.props,
          volume = _this$props.volume,
          onStart = _this$props.onStart,
          onPlay = _this$props.onPlay,
          onDuration = _this$props.onDuration,
          playbackRate = _this$props.playbackRate;

      if (_this.startOnPlay) {
        _this.setPlaybackRate(playbackRate);
        _this.setVolume(volume);
        onStart();
        _this.startOnPlay = false;
      }
      onPlay();
      if (_this.seekOnPlay) {
        _this.seekTo(_this.seekOnPlay);
        _this.seekOnPlay = null;
      }
      if (_this.durationOnPlay) {
        onDuration(_this.getDuration());
        _this.durationOnPlay = false;
      }
    }, _this.onReady = function () {
      var _this$props2 = _this.props,
          onReady = _this$props2.onReady,
          playing = _this$props2.playing,
          onDuration = _this$props2.onDuration;

      _this.isReady = true;
      _this.loadingSDK = false;
      onReady();
      if (playing || _this.preloading) {
        _this.preloading = false;
        if (_this.loadOnReady) {
          _this.load(_this.loadOnReady);
          _this.loadOnReady = null;
        } else {
          _this.play();
        }
      }
      var duration = _this.getDuration();
      if (duration) {
        onDuration(duration);
      } else {
        _this.durationOnPlay = true;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Base, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var url = this.props.url;

      this.mounted = true;
      if (url) {
        this.load(url);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stop();
      this.mounted = false;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props,
          url = _props.url,
          playing = _props.playing,
          volume = _props.volume,
          playbackRate = _props.playbackRate;
      // Invoke player methods based on incoming props

      if (url !== nextProps.url && nextProps.url) {
        this.seekOnPlay = null;
        this.startOnPlay = true;
        this.load(nextProps.url);
      } else if (url && !nextProps.url) {
        this.stop();
        clearTimeout(this.updateTimeout);
      } else if (!playing && nextProps.playing) {
        this.play();
      } else if (playing && !nextProps.playing) {
        this.pause();
      } else if (volume !== nextProps.volume) {
        this.setVolume(nextProps.volume);
      } else if (playbackRate !== nextProps.playbackRate) {
        this.setPlaybackRate(nextProps.playbackRate);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.url !== nextProps.url;
    }
  }, {
    key: 'seekTo',
    value: function seekTo(amount) {
      var _this2 = this;

      // When seeking before player is ready, store value and seek later
      if (!this.isReady && amount !== 0) {
        this.seekOnPlay = amount;
        setTimeout(function () {
          _this2.seekOnPlay = null;
        }, SEEK_ON_PLAY_EXPIRY);
      }
      // Return the seconds to seek to
      if (amount > 0 && amount < 1) {
        // Convert fraction to seconds based on duration
        return this.getDuration() * amount;
      }
      return amount;
    }
  }]);

  return Base;
}(react.Component);

Base.propTypes = props.propTypes;
Base.defaultProps = props.defaultProps;
exports['default'] = Base;
});

unwrapExports(Base_1);

var utils = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.parseStartTime = parseStartTime;
var MATCH_START_QUERY = /[?&#](?:start|t)=([0-9hms]+)/;
var MATCH_START_STAMP = /(\d+)(h|m|s)/g;
var MATCH_NUMERIC = /^\d+$/;

// Parse YouTube URL for a start time param, ie ?t=1h14m30s
// and return the start time in seconds
function parseStartTime(url) {
  var match = url.match(MATCH_START_QUERY);
  if (match) {
    var stamp = match[1];
    if (stamp.match(MATCH_START_STAMP)) {
      return parseStartStamp(stamp);
    }
    if (MATCH_NUMERIC.test(stamp)) {
      return parseInt(stamp, 10);
    }
  }
  return 0;
}

function parseStartStamp(stamp) {
  var seconds = 0;
  var array = MATCH_START_STAMP.exec(stamp);
  while (array !== null) {
    var _array = array,
        _array2 = _slicedToArray(_array, 3),
        count = _array2[1],
        period = _array2[2];

    if (period === 'h') seconds += parseInt(count, 10) * 60 * 60;
    if (period === 'm') seconds += parseInt(count, 10) * 60;
    if (period === 's') seconds += parseInt(count, 10);
    array = MATCH_START_STAMP.exec(stamp);
  }
  return seconds;
}
});

unwrapExports(utils);
var utils_1 = utils.parseStartTime;

var YouTube_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };



var _react2 = _interopRequireDefault(react);



var _loadScript2 = _interopRequireDefault(loadScript);



var _Base3 = _interopRequireDefault(Base_1);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = 'https://www.youtube.com/iframe_api';
var SDK_GLOBAL = 'YT';
var SDK_GLOBAL_READY = 'onYouTubeIframeAPIReady';
var MATCH_URL = /^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
var BLANK_VIDEO_URL = 'https://www.youtube.com/watch?v=GlCmAC4MHek';
var DEFAULT_PLAYER_VARS = {
  autoplay: 0,
  playsinline: 1,
  showinfo: 0,
  rel: 0,
  iv_load_policy: 3
};

var YouTube = function (_Base) {
  _inherits(YouTube, _Base);

  function YouTube() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, YouTube);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = YouTube.__proto__ || Object.getPrototypeOf(YouTube)).call.apply(_ref, [this].concat(args))), _this), _this.onStateChange = function (_ref2) {
      var data = _ref2.data;
      var _this$props = _this.props,
          onPause = _this$props.onPause,
          onBuffer = _this$props.onBuffer;
      var _window$SDK_GLOBAL$Pl = window[SDK_GLOBAL].PlayerState,
          PLAYING = _window$SDK_GLOBAL$Pl.PLAYING,
          PAUSED = _window$SDK_GLOBAL$Pl.PAUSED,
          BUFFERING = _window$SDK_GLOBAL$Pl.BUFFERING,
          ENDED = _window$SDK_GLOBAL$Pl.ENDED,
          CUED = _window$SDK_GLOBAL$Pl.CUED;

      if (data === PLAYING) _this.onPlay();
      if (data === PAUSED) onPause();
      if (data === BUFFERING) onBuffer();
      if (data === ENDED) _this.onEnded();
      if (data === CUED) _this.onReady();
    }, _this.onEnded = function () {
      var _this$props2 = _this.props,
          loop = _this$props2.loop,
          onEnded = _this$props2.onEnded;

      if (loop) {
        _this.seekTo(0);
      }
      onEnded();
    }, _this.ref = function (container) {
      _this.container = container;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(YouTube, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          url = _props.url,
          youtubeConfig = _props.youtubeConfig;

      if (!url && youtubeConfig.preload) {
        this.preloading = true;
        this.load(BLANK_VIDEO_URL);
      }
      _get(YouTube.prototype.__proto__ || Object.getPrototypeOf(YouTube.prototype), 'componentDidMount', this).call(this);
    }
  }, {
    key: 'getSDK',
    value: function getSDK() {
      if (window[SDK_GLOBAL] && window[SDK_GLOBAL].loaded) {
        return Promise.resolve(window[SDK_GLOBAL]);
      }
      return new Promise(function (resolve, reject) {
        var previousOnReady = window[SDK_GLOBAL_READY];
        window[SDK_GLOBAL_READY] = function () {
          if (previousOnReady) previousOnReady();
          resolve(window[SDK_GLOBAL]);
        };
        (0, _loadScript2['default'])(SDK_URL, function (err) {
          if (err) reject(err);
        });
      });
    }
  }, {
    key: 'load',
    value: function load(url) {
      var _this2 = this;

      var _props2 = this.props,
          playsinline = _props2.playsinline,
          controls = _props2.controls,
          youtubeConfig = _props2.youtubeConfig,
          _onError = _props2.onError;

      var id = url && url.match(MATCH_URL)[1];
      if (this.isReady) {
        this.player.cueVideoById({
          videoId: id,
          startSeconds: (0, utils.parseStartTime)(url)
        });
        return;
      }
      if (this.loadingSDK) {
        this.loadOnReady = url;
        return;
      }
      this.loadingSDK = true;
      this.getSDK().then(function (YT) {
        _this2.player = new YT.Player(_this2.container, {
          width: '100%',
          height: '100%',
          videoId: id,
          playerVars: _extends({}, DEFAULT_PLAYER_VARS, {
            controls: controls ? 1 : 0,
            start: (0, utils.parseStartTime)(url),
            origin: window.location.origin,
            playsinline: playsinline
          }, youtubeConfig.playerVars),
          events: {
            onReady: _this2.onReady,
            onStateChange: _this2.onStateChange,
            onError: function onError(event) {
              return _onError(event.data);
            }
          }
        });
      }, _onError);
    }
  }, {
    key: 'play',
    value: function play() {
      if (!this.isReady || !this.player.playVideo) return;
      this.player.playVideo();
    }
  }, {
    key: 'pause',
    value: function pause() {
      if (!this.isReady || !this.player.pauseVideo) return;
      this.player.pauseVideo();
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (!this.isReady || !this.player.stopVideo) return;
      if (!document.body.contains(this.player.getIframe())) return;
      this.player.stopVideo();
    }
  }, {
    key: 'seekTo',
    value: function seekTo(amount) {
      var seconds = _get(YouTube.prototype.__proto__ || Object.getPrototypeOf(YouTube.prototype), 'seekTo', this).call(this, amount);
      if (!this.isReady || !this.player.seekTo) return;
      this.player.seekTo(seconds);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      if (!this.isReady || !this.player.setVolume) return;
      this.player.setVolume(fraction * 100);
    }
  }, {
    key: 'setPlaybackRate',
    value: function setPlaybackRate(rate) {
      if (!this.isReady || !this.player.setPlaybackRate) return;
      this.player.setPlaybackRate(rate);
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      if (!this.isReady || !this.player.getDuration) return null;
      return this.player.getDuration();
    }
  }, {
    key: 'getFractionPlayed',
    value: function getFractionPlayed() {
      if (!this.isReady || !this.getDuration()) return null;
      return this.player.getCurrentTime() / this.getDuration();
    }
  }, {
    key: 'getFractionLoaded',
    value: function getFractionLoaded() {
      if (!this.isReady || !this.player.getVideoLoadedFraction) return null;
      return this.player.getVideoLoadedFraction();
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        width: '100%',
        height: '100%',
        display: this.props.url ? 'block' : 'none'
      };
      return _react2['default'].createElement(
        'div',
        { style: style },
        _react2['default'].createElement('div', { ref: this.ref })
      );
    }
  }], [{
    key: 'canPlay',
    value: function canPlay(url) {
      return MATCH_URL.test(url);
    }
  }]);

  return YouTube;
}(_Base3['default']);

YouTube.displayName = 'YouTube';
exports['default'] = YouTube;
});

unwrapExports(YouTube_1);

var fetchJsonp = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  {
    factory(exports, module);
  }
})(commonjsGlobal, function (exports, module) {

  var defaultOptions = {
    timeout: 5000,
    jsonpCallback: 'callback',
    jsonpCallbackFunction: null
  };

  function generateCallbackFunction() {
    return 'jsonp_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);
  }

  function clearFunction(functionName) {
    // IE8 throws an exception when you try to delete a property on window
    // http://stackoverflow.com/a/1824228/751089
    try {
      delete window[functionName];
    } catch (e) {
      window[functionName] = undefined;
    }
  }

  function removeScript(scriptId) {
    var script = document.getElementById(scriptId);
    if (script) {
      document.getElementsByTagName('head')[0].removeChild(script);
    }
  }

  function fetchJsonp(_url) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    // to avoid param reassign
    var url = _url;
    var timeout = options.timeout || defaultOptions.timeout;
    var jsonpCallback = options.jsonpCallback || defaultOptions.jsonpCallback;

    var timeoutId = undefined;

    return new Promise(function (resolve, reject) {
      var callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();
      var scriptId = jsonpCallback + '_' + callbackFunction;

      window[callbackFunction] = function (response) {
        resolve({
          ok: true,
          // keep consistent with fetch API
          json: function json() {
            return Promise.resolve(response);
          }
        });

        if (timeoutId) clearTimeout(timeoutId);

        removeScript(scriptId);

        clearFunction(callbackFunction);
      };

      // Check if the user set their own params, and if not add a ? to start a list of params
      url += url.indexOf('?') === -1 ? '?' : '&';

      var jsonpScript = document.createElement('script');
      jsonpScript.setAttribute('src', '' + url + jsonpCallback + '=' + callbackFunction);
      if (options.charset) {
        jsonpScript.setAttribute('charset', options.charset);
      }
      jsonpScript.id = scriptId;
      document.getElementsByTagName('head')[0].appendChild(jsonpScript);

      timeoutId = setTimeout(function () {
        reject(new Error('JSONP request to ' + _url + ' timed out'));

        clearFunction(callbackFunction);
        removeScript(scriptId);
        window[callbackFunction] = function () {
          clearFunction(callbackFunction);
        };
      }, timeout);

      // Caught if got 404/500
      jsonpScript.onerror = function () {
        reject(new Error('JSONP request to ' + _url + ' failed'));

        clearFunction(callbackFunction);
        removeScript(scriptId);
        if (timeoutId) clearTimeout(timeoutId);
      };
    });
  }

  // export as global function
  /*
  let local;
  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }
  local.fetchJsonp = fetchJsonp;
  */

  module.exports = fetchJsonp;
});
});

var FilePlayer_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };



var _react2 = _interopRequireDefault(react);



var _Base3 = _interopRequireDefault(Base_1);



var _loadScript2 = _interopRequireDefault(loadScript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AUDIO_EXTENSIONS = /\.(m4a|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i;
var HLS_EXTENSIONS = /\.(m3u8)($|\?)/i;
var HLS_SDK_URL = 'https://cdn.jsdelivr.net/hls.js/latest/hls.min.js';
var HLS_GLOBAL = 'Hls';
var DASH_EXTENSIONS = /\.(mpd)($|\?)/i;
var DASH_SDK_URL = 'https://cdnjs.cloudflare.com/ajax/libs/dashjs/2.5.0/dash.all.min.js';
var DASH_GLOBAL = 'dashjs';

var FilePlayer = function (_Base) {
  _inherits(FilePlayer, _Base);

  function FilePlayer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FilePlayer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FilePlayer.__proto__ || Object.getPrototypeOf(FilePlayer)).call.apply(_ref, [this].concat(args))), _this), _this.renderSource = function (source) {
      if (typeof source === 'string') {
        return _react2['default'].createElement('source', { key: source, src: source });
      }
      var src = source.src,
          type = source.type;

      return _react2['default'].createElement('source', { key: src, src: src, type: type });
    }, _this.renderTrack = function (track, index) {
      return _react2['default'].createElement('track', _extends({ key: index }, track));
    }, _this.ref = function (player) {
      _this.player = player;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FilePlayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          playsinline = _props.playsinline,
          onPause = _props.onPause,
          onEnded = _props.onEnded,
          onError = _props.onError;

      this.player.addEventListener('canplay', this.onReady);
      this.player.addEventListener('play', this.onPlay);
      this.player.addEventListener('pause', function () {
        if (_this2.mounted) {
          onPause();
        }
      });
      this.player.addEventListener('ended', onEnded);
      this.player.addEventListener('error', onError);
      if (playsinline) {
        this.player.setAttribute('playsinline', '');
        this.player.setAttribute('webkit-playsinline', '');
      }
      _get(FilePlayer.prototype.__proto__ || Object.getPrototypeOf(FilePlayer.prototype), 'componentDidMount', this).call(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _props2 = this.props,
          onPause = _props2.onPause,
          onEnded = _props2.onEnded,
          onError = _props2.onError;

      this.player.removeEventListener('canplay', this.onReady);
      this.player.removeEventListener('play', this.onPlay);
      this.player.removeEventListener('pause', onPause);
      this.player.removeEventListener('ended', onEnded);
      this.player.removeEventListener('error', onError);
      _get(FilePlayer.prototype.__proto__ || Object.getPrototypeOf(FilePlayer.prototype), 'componentWillUnmount', this).call(this);
    }
  }, {
    key: 'shouldUseHLS',
    value: function shouldUseHLS(url) {
      return HLS_EXTENSIONS.test(url) || this.props.fileConfig.forceHLS;
    }
  }, {
    key: 'shouldUseDASH',
    value: function shouldUseDASH(url) {
      return DASH_EXTENSIONS.test(url) || this.props.fileConfig.forceDASH;
    }
  }, {
    key: 'load',
    value: function load(url) {
      var _this3 = this;

      if (this.shouldUseHLS(url)) {
        loadSDK(HLS_SDK_URL, HLS_GLOBAL).then(function (Hls) {
          _this3.hls = new Hls();
          _this3.hls.loadSource(url);
          _this3.hls.attachMedia(_this3.player);
        });
      }
      if (this.shouldUseDASH(url)) {
        loadSDK(DASH_SDK_URL, DASH_GLOBAL).then(function (dashjs) {
          var player = dashjs.MediaPlayer().create();
          player.initialize(_this3.player, url, true);
        });
      }
    }
  }, {
    key: 'play',
    value: function play() {
      this.player.play()['catch'](this.props.onError);
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.player.pause();
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.player.removeAttribute('src');
      if (this.hls) {
        this.hls.detachMedia();
      }
    }
  }, {
    key: 'seekTo',
    value: function seekTo(amount) {
      var seconds = _get(FilePlayer.prototype.__proto__ || Object.getPrototypeOf(FilePlayer.prototype), 'seekTo', this).call(this, amount);
      this.player.currentTime = seconds;
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.player.volume = fraction;
    }
  }, {
    key: 'setPlaybackRate',
    value: function setPlaybackRate(rate) {
      this.player.playbackRate = rate;
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      if (!this.isReady) return null;
      return this.player.duration;
    }
  }, {
    key: 'getFractionPlayed',
    value: function getFractionPlayed() {
      if (!this.isReady) return null;
      return this.player.currentTime / this.getDuration();
    }
  }, {
    key: 'getFractionLoaded',
    value: function getFractionLoaded() {
      if (!this.isReady || this.player.buffered.length === 0) return null;
      return this.player.buffered.end(0) / this.getDuration();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          url = _props3.url,
          loop = _props3.loop,
          controls = _props3.controls,
          fileConfig = _props3.fileConfig,
          width = _props3.width,
          height = _props3.height;

      var useAudio = AUDIO_EXTENSIONS.test(url) || fileConfig.forceAudio;
      var useHLS = this.shouldUseHLS(url);
      var useDASH = this.shouldUseDASH(url);
      var Element = useAudio ? 'audio' : 'video';
      var src = url instanceof Array || useHLS || useDASH ? undefined : url;
      var style = {
        width: !width || width === 'auto' ? width : '100%',
        height: !height || height === 'auto' ? height : '100%',
        display: url ? 'block' : 'none'
      };
      return _react2['default'].createElement(
        Element,
        _extends({
          ref: this.ref,
          src: src,
          style: style,
          preload: 'auto',
          controls: controls,
          loop: loop
        }, fileConfig.attributes),
        url instanceof Array && url.map(this.renderSource),
        fileConfig.tracks instanceof Array && fileConfig.tracks.map(this.renderTrack)
      );
    }
  }], [{
    key: 'canPlay',
    value: function canPlay(url) {
      return true;
    }
  }]);

  return FilePlayer;
}(_Base3['default']);

FilePlayer.displayName = 'FilePlayer';
exports['default'] = FilePlayer;


function loadSDK(url, globalVar) {
  if (window[globalVar]) {
    return Promise.resolve(window[globalVar]);
  }
  return new Promise(function (resolve, reject) {
    (0, _loadScript2['default'])(url, function (err) {
      if (err) reject(err);
      resolve(window[globalVar]);
    });
  });
}
});

unwrapExports(FilePlayer_1);

var SoundCloud_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props$$1) { for (var i = 0; i < props$$1.length; i++) { var descriptor = props$$1[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };



var _react2 = _interopRequireDefault(react);



var _fetchJsonp2 = _interopRequireDefault(fetchJsonp);



var _FilePlayer3 = _interopRequireDefault(FilePlayer_1);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RESOLVE_URL = '//api.soundcloud.com/resolve.json';
var MATCH_URL = /^https?:\/\/(soundcloud.com|snd.sc)\/([a-z0-9-_]+\/[a-z0-9-_]+)$/;

var songData = {}; // Cache song data requests

var SoundCloud = function (_FilePlayer) {
  _inherits(SoundCloud, _FilePlayer);

  function SoundCloud() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SoundCloud);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SoundCloud.__proto__ || Object.getPrototypeOf(SoundCloud)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      image: null
    }, _this.clientId = _this.props.soundcloudConfig.clientId || props.defaultProps.soundcloudConfig.clientId, _this.ref = function (player) {
      _this.player = player;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SoundCloud, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return _get(SoundCloud.prototype.__proto__ || Object.getPrototypeOf(SoundCloud.prototype), 'shouldComponentUpdate', this).call(this, nextProps, nextState) || this.state.image !== nextState.image;
    }
  }, {
    key: 'getSongData',
    value: function getSongData(url) {
      var _this2 = this;

      if (songData[url]) {
        return Promise.resolve(songData[url]);
      }
      return (0, _fetchJsonp2['default'])(RESOLVE_URL + '?url=' + url + '&client_id=' + this.clientId).then(function (response) {
        if (response.ok) {
          songData[url] = response.json();
          return songData[url];
        } else {
          _this2.props.onError(new Error('SoundCloud track could not be resolved'));
        }
      });
    }
  }, {
    key: 'load',
    value: function load(url) {
      var _this3 = this;

      var _props = this.props,
          soundcloudConfig = _props.soundcloudConfig,
          onError = _props.onError;

      this.stop();
      this.getSongData(url).then(function (data) {
        if (!_this3.mounted) return;
        if (!data.streamable) {
          onError(new Error('SoundCloud track is not streamable'));
          return;
        }
        var image = data.artwork_url || data.user.avatar_url;
        if (image && soundcloudConfig.showArtwork) {
          _this3.setState({ image: image.replace('-large', '-t500x500') });
        }
        _this3.player.src = data.stream_url + '?client_id=' + _this3.clientId;
      }, onError);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          url = _props2.url,
          loop = _props2.loop,
          controls = _props2.controls;

      var style = {
        display: url ? 'block' : 'none',
        height: '100%',
        backgroundImage: this.state.image ? 'url(' + this.state.image + ')' : null,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
      return _react2['default'].createElement(
        'div',
        { style: style },
        _react2['default'].createElement('audio', {
          ref: this.ref,
          type: 'audio/mpeg',
          preload: 'auto',
          style: {
            width: '100%',
            height: '100%'
          },
          controls: controls,
          loop: loop
        })
      );
    }
  }], [{
    key: 'canPlay',
    value: function canPlay(url) {
      return MATCH_URL.test(url);
    }
  }]);

  return SoundCloud;
}(_FilePlayer3['default']);

SoundCloud.displayName = 'SoundCloud';
exports['default'] = SoundCloud;
});

unwrapExports(SoundCloud_1);

var Vimeo_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };



var _react2 = _interopRequireDefault(react);



var _loadScript2 = _interopRequireDefault(loadScript);



var _Base3 = _interopRequireDefault(Base_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = 'https://player.vimeo.com/api/player.js';
var SDK_GLOBAL = 'Vimeo';
var MATCH_URL = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
var BLANK_VIDEO_URL = 'https://vimeo.com/127250231';

var DEFAULT_OPTIONS = {
  autopause: false,
  autoplay: false,
  byline: false,
  portrait: false,
  title: false
};

var Vimeo = function (_Base) {
  _inherits(Vimeo, _Base);

  function Vimeo() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Vimeo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Vimeo.__proto__ || Object.getPrototypeOf(Vimeo)).call.apply(_ref, [this].concat(args))), _this), _this.ref = function (container) {
      _this.container = container;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Vimeo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          url = _props.url,
          vimeoConfig = _props.vimeoConfig;

      if (!url && vimeoConfig.preload) {
        this.preloading = true;
        this.load(BLANK_VIDEO_URL);
      }
      _get(Vimeo.prototype.__proto__ || Object.getPrototypeOf(Vimeo.prototype), 'componentDidMount', this).call(this);
    }
  }, {
    key: 'getSDK',
    value: function getSDK() {
      if (window[SDK_GLOBAL]) {
        return Promise.resolve(window[SDK_GLOBAL]);
      }
      return new Promise(function (resolve, reject) {
        (0, _loadScript2['default'])(SDK_URL, function (err) {
          if (err) reject(err);else resolve(window[SDK_GLOBAL]);
        });
      });
    }
  }, {
    key: 'load',
    value: function load(url) {
      var _this2 = this;

      var id = url.match(MATCH_URL)[3];
      this.duration = null;
      if (this.isReady) {
        this.player.loadVideo(id);
        return;
      }
      if (this.loadingSDK) {
        this.loadOnReady = url;
        return;
      }
      this.loadingSDK = true;
      this.getSDK().then(function (Vimeo) {
        _this2.player = new Vimeo.Player(_this2.container, _extends({}, DEFAULT_OPTIONS, _this2.props.vimeoConfig.playerOptions, {
          url: url,
          loop: _this2.props.loop
        }));
        _this2.player.on('loaded', function () {
          _this2.onReady();
          var iframe = _this2.container.querySelector('iframe');
          iframe.style.width = '100%';
          iframe.style.height = '100%';
        });
        _this2.player.on('play', function (_ref2) {
          var duration = _ref2.duration;

          _this2.duration = duration;
          _this2.onPlay();
        });
        _this2.player.on('pause', _this2.props.onPause);
        _this2.player.on('ended', _this2.props.onEnded);
        _this2.player.on('error', _this2.props.onError);
        _this2.player.on('timeupdate', function (_ref3) {
          var percent = _ref3.percent;

          _this2.fractionPlayed = percent;
        });
        _this2.player.on('progress', function (_ref4) {
          var percent = _ref4.percent;

          _this2.fractionLoaded = percent;
        });
      }, this.props.onError);
    }
  }, {
    key: 'play',
    value: function play() {
      if (!this.isReady) return;
      this.player.play();
    }
  }, {
    key: 'pause',
    value: function pause() {
      if (!this.isReady) return;
      this.player.pause();
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (!this.isReady) return;
      this.player.unload();
    }
  }, {
    key: 'seekTo',
    value: function seekTo(amount) {
      var seconds = _get(Vimeo.prototype.__proto__ || Object.getPrototypeOf(Vimeo.prototype), 'seekTo', this).call(this, amount);
      if (!this.isReady || !this.player.setCurrentTime) return;
      this.player.setCurrentTime(seconds);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.player.setVolume(fraction);
    }
  }, {
    key: 'setPlaybackRate',
    value: function setPlaybackRate(rate) {
      return null;
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.duration;
    }
  }, {
    key: 'getFractionPlayed',
    value: function getFractionPlayed() {
      return this.fractionPlayed || null;
    }
  }, {
    key: 'getFractionLoaded',
    value: function getFractionLoaded() {
      return this.fractionLoaded || null;
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        height: '100%',
        display: this.props.url ? 'block' : 'none'
      };
      return _react2['default'].createElement('div', { style: style, ref: this.ref });
    }
  }], [{
    key: 'canPlay',
    value: function canPlay(url) {
      return MATCH_URL.test(url);
    }
  }]);

  return Vimeo;
}(_Base3['default']);

Vimeo.displayName = 'Vimeo';
exports['default'] = Vimeo;
});

unwrapExports(Vimeo_1);

var Facebook = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };



var _react2 = _interopRequireDefault(react);



var _loadScript2 = _interopRequireDefault(loadScript);



var _Base3 = _interopRequireDefault(Base_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = '//connect.facebook.net/en_US/sdk.js';
var SDK_GLOBAL = 'FB';
var SDK_GLOBAL_READY = 'fbAsyncInit';
var MATCH_URL = /^https:\/\/www\.facebook\.com\/([^/?].+\/)?video(s|\.php)[/?].*$/;
var PLAYER_ID_PREFIX = 'facebook-player-';

var YouTube = function (_Base) {
  _inherits(YouTube, _Base);

  function YouTube() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, YouTube);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = YouTube.__proto__ || Object.getPrototypeOf(YouTube)).call.apply(_ref, [this].concat(args))), _this), _this.playerID = PLAYER_ID_PREFIX + randomString(), _this.onEnded = function () {
      var _this$props = _this.props,
          loop = _this$props.loop,
          onEnded = _this$props.onEnded;

      if (loop) {
        _this.seekTo(0);
      }
      onEnded();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(YouTube, [{
    key: 'getSDK',
    value: function getSDK() {
      if (window[SDK_GLOBAL]) {
        return Promise.resolve(window[SDK_GLOBAL]);
      }
      return new Promise(function (resolve, reject) {
        var previousOnReady = window[SDK_GLOBAL_READY];
        window[SDK_GLOBAL_READY] = function () {
          if (previousOnReady) previousOnReady();
          resolve(window[SDK_GLOBAL]);
        };
        (0, _loadScript2['default'])(SDK_URL, function (err) {
          if (err) reject(err);
        });
      });
    }
  }, {
    key: 'load',
    value: function load(url) {
      var _this2 = this;

      if (this.isReady) {
        this.getSDK().then(function (FB) {
          return FB.XFBML.parse();
        });
        return;
      }
      this.getSDK().then(function (FB) {
        FB.init({
          appId: _this2.props.facebookConfig.appId,
          xfbml: true,
          version: 'v2.5'
        });
        FB.Event.subscribe('xfbml.ready', function (msg) {
          if (msg.type === 'video' && msg.id === _this2.playerID) {
            _this2.player = msg.instance;
            _this2.player.subscribe('startedPlaying', _this2.onPlay);
            _this2.player.subscribe('paused', _this2.props.onPause);
            _this2.player.subscribe('finishedPlaying', _this2.onEnded);
            _this2.player.subscribe('startedBuffering', _this2.props.onBuffer);
            _this2.player.subscribe('error', _this2.props.onError);
            _this2.onReady();
          }
        });
      });
    }
  }, {
    key: 'play',
    value: function play() {
      if (!this.isReady) return;
      this.player.play();
    }
  }, {
    key: 'pause',
    value: function pause() {
      if (!this.isReady) return;
      this.player.pause();
    }
  }, {
    key: 'stop',
    value: function stop() {
      // No need to stop
    }
  }, {
    key: 'seekTo',
    value: function seekTo(amount) {
      var seconds = _get(YouTube.prototype.__proto__ || Object.getPrototypeOf(YouTube.prototype), 'seekTo', this).call(this, amount);
      if (!this.isReady) return;
      this.player.seek(seconds);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      if (!this.isReady) return;
      if (fraction !== 0) {
        this.player.unmute();
      }
      this.player.setVolume(fraction);
    }
  }, {
    key: 'setPlaybackRate',
    value: function setPlaybackRate() {
      return null;
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      if (!this.isReady) return null;
      return this.player.getDuration();
    }
  }, {
    key: 'getFractionPlayed',
    value: function getFractionPlayed() {
      if (!this.isReady || !this.getDuration()) return null;
      return this.player.getCurrentPosition() / this.getDuration();
    }
  }, {
    key: 'getFractionLoaded',
    value: function getFractionLoaded() {
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        width: '100%',
        height: '100%',
        backgroundColor: 'black'
      };
      return _react2['default'].createElement('div', {
        style: style,
        id: this.playerID,
        className: 'fb-video',
        'data-href': this.props.url,
        'data-allowfullscreen': 'true',
        'data-controls': !this.props.controls ? 'false' : undefined
      });
    }
  }], [{
    key: 'canPlay',
    value: function canPlay(url) {
      return MATCH_URL.test(url);
    }
  }]);

  return YouTube;
}(_Base3['default']);

// http://stackoverflow.com/a/38622545


YouTube.displayName = 'Facebook';
exports['default'] = YouTube;
function randomString() {
  return Math.random().toString(36).substr(2, 5);
}
});

unwrapExports(Facebook);

var Streamable_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _FilePlayer3 = _interopRequireDefault(FilePlayer_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RESOLVE_URL = 'https://api.streamable.com/videos/';
var MATCH_URL = /^https?:\/\/streamable.com\/([a-z0-9]+)$/;

var cache = {}; // Cache song data requests

var Streamable = function (_FilePlayer) {
  _inherits(Streamable, _FilePlayer);

  function Streamable() {
    _classCallCheck(this, Streamable);

    return _possibleConstructorReturn(this, (Streamable.__proto__ || Object.getPrototypeOf(Streamable)).apply(this, arguments));
  }

  _createClass(Streamable, [{
    key: 'getData',
    value: function getData(url) {
      var onError = this.props.onError;

      var id = url.match(MATCH_URL)[1];
      if (cache[id]) {
        return Promise.resolve(cache[id]);
      }
      return window.fetch(RESOLVE_URL + id).then(function (response) {
        if (response.status === 200) {
          cache[id] = response.json();
          return cache[id];
        } else {
          onError(new Error('Streamable track could not be resolved'));
        }
      });
    }
  }, {
    key: 'load',
    value: function load(url) {
      var _this2 = this;

      var onError = this.props.onError;

      this.stop();
      this.getData(url).then(function (data) {
        if (!_this2.mounted) return;
        _this2.player.src = data.files.mp4.url;
      }, onError);
    }
  }], [{
    key: 'canPlay',
    value: function canPlay(url) {
      return MATCH_URL.test(url);
    }
  }]);

  return Streamable;
}(_FilePlayer3['default']);

Streamable.displayName = 'Streamable';
exports['default'] = Streamable;
});

unwrapExports(Streamable_1);

var Vidme_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _FilePlayer3 = _interopRequireDefault(FilePlayer_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RESOLVE_URL = 'https://api.vid.me/videoByUrl/';
var MATCH_URL = /^https?:\/\/vid.me\/([a-z0-9]+)$/i;

var cache = {}; // Cache song data requests

var Vidme = function (_FilePlayer) {
  _inherits(Vidme, _FilePlayer);

  function Vidme() {
    _classCallCheck(this, Vidme);

    return _possibleConstructorReturn(this, (Vidme.__proto__ || Object.getPrototypeOf(Vidme)).apply(this, arguments));
  }

  _createClass(Vidme, [{
    key: 'getData',
    value: function getData(url) {
      var onError = this.props.onError;

      var id = url.match(MATCH_URL)[1];
      if (cache[id]) {
        return Promise.resolve(cache[id]);
      }
      return window.fetch(RESOLVE_URL + id).then(function (response) {
        if (response.status === 200) {
          cache[id] = response.json();
          return cache[id];
        } else {
          onError(new Error('Vidme track could not be resolved'));
        }
      });
    }
  }, {
    key: 'getURL',
    value: function getURL(_ref) {
      var video = _ref.video;
      var vidmeConfig = this.props.vidmeConfig;

      if (vidmeConfig.format && video.formats && video.formats.length !== 0) {
        var index = video.formats.findIndex(function (f) {
          return f.type === vidmeConfig.format;
        });
        if (index !== -1) {
          return video.formats[index].uri;
        } else {
          console.warn('Vidme format "' + vidmeConfig.format + '" was not found for ' + video.full_url);
        }
      }
      return video.complete_url;
    }
  }, {
    key: 'load',
    value: function load(url) {
      var _this2 = this;

      var onError = this.props.onError;

      this.stop();
      this.getData(url).then(function (data) {
        if (!_this2.mounted) return;
        _this2.player.src = _this2.getURL(data);
      }, onError);
    }
  }], [{
    key: 'canPlay',
    value: function canPlay(url) {
      return MATCH_URL.test(url);
    }
  }]);

  return Vidme;
}(_FilePlayer3['default']);

Vidme.displayName = 'Vidme';
exports['default'] = Vidme;
});

unwrapExports(Vidme_1);

var Wistia_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };



var _react2 = _interopRequireDefault(react);



var _loadScript2 = _interopRequireDefault(loadScript);



var _Base3 = _interopRequireDefault(Base_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = '//fast.wistia.com/assets/external/E-v1.js';
var SDK_GLOBAL = 'Wistia';
var MATCH_URL = /^https?:\/\/(.+)?(wistia.com|wi.st)\/(medias|embed)\/(.*)$/;

var Wistia = function (_Base) {
  _inherits(Wistia, _Base);

  function Wistia() {
    _classCallCheck(this, Wistia);

    return _possibleConstructorReturn(this, (Wistia.__proto__ || Object.getPrototypeOf(Wistia)).apply(this, arguments));
  }

  _createClass(Wistia, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          onStart = _props.onStart,
          onPause = _props.onPause,
          onEnded = _props.onEnded,
          wistiaConfig = _props.wistiaConfig;

      this.loadingSDK = true;
      this.getSDK().then(function () {
        window._wq = window._wq || [];
        window._wq.push({
          id: _this2.getID(_this2.props.url),
          options: wistiaConfig.options,
          onReady: function onReady(player) {
            _this2.player = player;
            _this2.player.bind('start', onStart);
            _this2.player.bind('play', _this2.onPlay);
            _this2.player.bind('pause', onPause);
            _this2.player.bind('end', onEnded);
            _this2.onReady();
          }
        });
      });
    }
  }, {
    key: 'getSDK',
    value: function getSDK() {
      return new Promise(function (resolve, reject) {
        if (window[SDK_GLOBAL]) {
          resolve();
        } else {
          (0, _loadScript2['default'])(SDK_URL, function (err, script) {
            if (err) reject(err);
            resolve(script);
          });
        }
      });
    }
  }, {
    key: 'getID',
    value: function getID(url) {
      return url && url.match(MATCH_URL)[4];
    }
  }, {
    key: 'load',
    value: function load(url) {
      var id = this.getID(url);
      if (this.isReady) {
        this.player.replaceWith(id);
        this.props.onReady();
        this.onReady();
      }
    }
  }, {
    key: 'play',
    value: function play() {
      if (!this.isReady || !this.player) return;
      this.player.play();
    }
  }, {
    key: 'pause',
    value: function pause() {
      if (!this.isReady || !this.player) return;
      this.player && this.player.pause();
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (!this.isReady || !this.player) return;
      this.player.pause();
    }
  }, {
    key: 'seekTo',
    value: function seekTo(amount) {
      var seconds = _get(Wistia.prototype.__proto__ || Object.getPrototypeOf(Wistia.prototype), 'seekTo', this).call(this, amount);
      if (!this.isReady || !this.player) return;
      this.player.time(seconds);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      if (!this.isReady || !this.player || !this.player.volume) return;
      this.player.volume(fraction);
    }
  }, {
    key: 'setPlaybackRate',
    value: function setPlaybackRate(rate) {
      if (!this.isReady || !this.player || !this.player.playbackRate) return;
      this.player.playbackRate(rate);
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      if (!this.isReady || !this.player || !this.player.duration) return;
      return this.player.duration();
    }
  }, {
    key: 'getFractionPlayed',
    value: function getFractionPlayed() {
      if (!this.isReady || !this.player || !this.player.percentWatched) return null;
      return this.player.time() / this.player.duration();
    }
  }, {
    key: 'getFractionLoaded',
    value: function getFractionLoaded() {
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var id = this.getID(this.props.url);
      var className = 'wistia_embed wistia_async_' + id;
      var style = {
        width: '100%',
        height: '100%',
        display: this.props.url ? 'block' : 'none'
      };
      return _react2['default'].createElement('div', { className: className, style: style });
    }
  }], [{
    key: 'canPlay',
    value: function canPlay(url) {
      return MATCH_URL.test(url);
    }
  }]);

  return Wistia;
}(_Base3['default']);

Wistia.displayName = 'Wistia';
exports['default'] = Wistia;
});

unwrapExports(Wistia_1);

var DailyMotion_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };



var _react2 = _interopRequireDefault(react);



var _loadScript2 = _interopRequireDefault(loadScript);



var _Base3 = _interopRequireDefault(Base_1);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = 'https://api.dmcdn.net/all.js';
var SDK_GLOBAL = 'DM';
var SDK_GLOBAL_READY = 'dmAsyncInit';
var MATCH_URL = /^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/;
var BLANK_VIDEO_URL = 'http://www.dailymotion.com/video/x522udb';
var DEFAULT_PLAYER_VARS = {
  autoplay: 0,
  api: 1,
  'endscreen-enable': false
};

var DailyMotion = function (_Base) {
  _inherits(DailyMotion, _Base);

  function DailyMotion() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DailyMotion);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DailyMotion.__proto__ || Object.getPrototypeOf(DailyMotion)).call.apply(_ref, [this].concat(args))), _this), _this.onDurationChange = function (event) {
      var onDuration = _this.props.onDuration;

      var duration = _this.getDuration();
      onDuration(duration);
    }, _this.onEnded = function () {
      var _this$props = _this.props,
          loop = _this$props.loop,
          onEnded = _this$props.onEnded;

      if (loop) {
        _this.seekTo(0);
      }
      onEnded();
    }, _this.ref = function (container) {
      _this.container = container;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DailyMotion, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          url = _props.url,
          dailymotionConfig = _props.dailymotionConfig;

      if (!url && dailymotionConfig.preload) {
        this.preloading = true;
        this.load(BLANK_VIDEO_URL);
      }
      _get(DailyMotion.prototype.__proto__ || Object.getPrototypeOf(DailyMotion.prototype), 'componentDidMount', this).call(this);
    }
  }, {
    key: 'getSDK',
    value: function getSDK() {
      if (window[SDK_GLOBAL] && window[SDK_GLOBAL].player) {
        return Promise.resolve(window[SDK_GLOBAL]);
      }
      return new Promise(function (resolve, reject) {
        var previousOnReady = window[SDK_GLOBAL_READY];
        window[SDK_GLOBAL_READY] = function () {
          if (previousOnReady) previousOnReady();
          resolve(window[SDK_GLOBAL]);
        };
        (0, _loadScript2['default'])(SDK_URL, function (err) {
          if (err) {
            reject(err);
          }
        });
      });
    }
  }, {
    key: 'parseId',
    value: function parseId(url) {
      var m = url.match(MATCH_URL);
      return m[4] || m[2];
    }
  }, {
    key: 'load',
    value: function load(url) {
      var _this2 = this;

      var _props2 = this.props,
          controls = _props2.controls,
          dailymotionConfig = _props2.dailymotionConfig,
          onError = _props2.onError,
          playing = _props2.playing;

      var id = this.parseId(url);
      if (this.player) {
        this.player.load(id, {
          start: (0, utils.parseStartTime)(url),
          autoplay: playing
        });
        return;
      }
      if (this.loadingSDK) {
        this.loadOnReady = url;
        return;
      }
      this.loadingSDK = true;
      this.getSDK().then(function (DM) {
        var Player = DM.player;
        _this2.player = new Player(_this2.container, {
          width: '100%',
          height: '100%',
          video: id,
          params: _extends({}, DEFAULT_PLAYER_VARS, {
            controls: controls,
            autoplay: _this2.props.playing,
            start: (0, utils.parseStartTime)(url),
            origin: window.location.origin
          }, dailymotionConfig.params),
          events: {
            apiready: function apiready() {
              _this2.loadingSDK = false;
            },
            video_end: _this2.onEnded,
            durationchange: _this2.onDurationChange,
            pause: _this2.props.onPause,
            playing: _this2.onPlay,
            waiting: _this2.props.onBuffer,
            loadedmetadata: _this2.onReady,
            error: function error(event) {
              return onError(event);
            }
          }
        });
      }, onError);
    }
  }, {
    key: 'play',
    value: function play() {
      if (!this.isReady || !this.player.play) return;
      this.player.play();
    }
  }, {
    key: 'pause',
    value: function pause() {
      if (!this.isReady || !this.player.pause) return;
      this.player.pause();
    }
  }, {
    key: 'stop',
    value: function stop() {
      // Nothing to do
    }
  }, {
    key: 'seekTo',
    value: function seekTo(amount) {
      var seconds = _get(DailyMotion.prototype.__proto__ || Object.getPrototypeOf(DailyMotion.prototype), 'seekTo', this).call(this, amount);
      if (!this.isReady || !this.player.seek) return;
      this.player.seek(seconds);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      if (!this.isReady || !this.player.setVolume) return;
      this.player.setVolume(fraction);
    }
  }, {
    key: 'setPlaybackRate',
    value: function setPlaybackRate() {
      return null;
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      if (!this.isReady || !this.player.duration) return null;
      return this.player.duration;
    }
  }, {
    key: 'getFractionPlayed',
    value: function getFractionPlayed() {
      if (!this.isReady || !this.getDuration()) return null;
      return this.player.currentTime / this.getDuration();
    }
  }, {
    key: 'getFractionLoaded',
    value: function getFractionLoaded() {
      if (!this.isReady || !this.getDuration() || !this.player.bufferedTime) return null;
      return this.player.bufferedTime / this.getDuration();
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        display: this.props.url ? 'block' : 'none'
      };
      return _react2['default'].createElement(
        'div',
        { style: style },
        _react2['default'].createElement('div', { ref: this.ref })
      );
    }
  }], [{
    key: 'canPlay',
    value: function canPlay(url) {
      return MATCH_URL.test(url);
    }
  }]);

  return DailyMotion;
}(_Base3['default']);

DailyMotion.displayName = 'DailyMotion';
exports['default'] = DailyMotion;
});

unwrapExports(DailyMotion_1);

var ReactPlayer_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props$$1) { for (var i = 0; i < props$$1.length; i++) { var descriptor = props$$1[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _react2 = _interopRequireDefault(react);



var _lodash2 = _interopRequireDefault(lodash_omit);





var _YouTube2 = _interopRequireDefault(YouTube_1);



var _SoundCloud2 = _interopRequireDefault(SoundCloud_1);



var _Vimeo2 = _interopRequireDefault(Vimeo_1);



var _Facebook2 = _interopRequireDefault(Facebook);



var _FilePlayer2 = _interopRequireDefault(FilePlayer_1);



var _Streamable2 = _interopRequireDefault(Streamable_1);



var _Vidme2 = _interopRequireDefault(Vidme_1);



var _Wistia2 = _interopRequireDefault(Wistia_1);



var _DailyMotion2 = _interopRequireDefault(DailyMotion_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactPlayer = function (_Component) {
  _inherits(ReactPlayer, _Component);

  function ReactPlayer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ReactPlayer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ReactPlayer.__proto__ || Object.getPrototypeOf(ReactPlayer)).call.apply(_ref, [this].concat(args))), _this), _this.seekTo = function (fraction) {
      if (_this.player) {
        _this.player.seekTo(fraction);
      }
    }, _this.getDuration = function () {
      if (!_this.player) return null;
      return _this.player.getDuration();
    }, _this.getCurrentTime = function () {
      if (!_this.player) return null;
      var duration = _this.player.getDuration();
      var fractionPlayed = _this.player.getFractionPlayed();
      if (duration === null || fractionPlayed === null) {
        return null;
      }
      return fractionPlayed * duration;
    }, _this.progress = function () {
      if (_this.props.url && _this.player) {
        var loaded = _this.player.getFractionLoaded() || 0;
        var played = _this.player.getFractionPlayed() || 0;
        var duration = _this.player.getDuration();
        var progress = {};
        if (loaded !== _this.prevLoaded) {
          progress.loaded = loaded;
          if (duration) {
            progress.loadedSeconds = progress.loaded * duration;
          }
        }
        if (played !== _this.prevPlayed) {
          progress.played = played;
          if (duration) {
            progress.playedSeconds = progress.played * duration;
          }
        }
        if (progress.loaded || progress.played) {
          _this.props.onProgress(progress);
        }
        _this.prevLoaded = loaded;
        _this.prevPlayed = played;
      }
      _this.progressTimeout = setTimeout(_this.progress, _this.props.progressFrequency);
    }, _this.ref = function (player) {
      _this.player = player;
    }, _this.renderPlayer = function (Player) {
      var active = Player.canPlay(_this.props.url);

      var _this$props = _this.props,
          youtubeConfig = _this$props.youtubeConfig,
          vimeoConfig = _this$props.vimeoConfig,
          dailymotionConfig = _this$props.dailymotionConfig,
          activeProps = _objectWithoutProperties(_this$props, ['youtubeConfig', 'vimeoConfig', 'dailymotionConfig']);

      var props$$1 = active ? _extends({}, activeProps, { ref: _this.ref }) : {};
      // Only youtube and vimeo config passed to
      // inactive players due to preload behaviour
      return _react2['default'].createElement(Player, _extends({
        key: Player.displayName,
        youtubeConfig: youtubeConfig,
        vimeoConfig: vimeoConfig,
        dailymotionConfig: dailymotionConfig
      }, props$$1));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ReactPlayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.progress();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.progressTimeout);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.url !== nextProps.url || this.props.playing !== nextProps.playing || this.props.volume !== nextProps.volume || this.props.playbackRate !== nextProps.playbackRate || this.props.height !== nextProps.height || this.props.width !== nextProps.width || this.props.hidden !== nextProps.hidden;
    }
  }, {
    key: 'renderPlayers',
    value: function renderPlayers() {
      // Build array of players to render based on URL and preload config
      var _props = this.props,
          url = _props.url,
          youtubeConfig = _props.youtubeConfig,
          vimeoConfig = _props.vimeoConfig,
          dailymotionConfig = _props.dailymotionConfig;

      var players = [];
      if (_YouTube2['default'].canPlay(url)) {
        players.push(_YouTube2['default']);
      } else if (_SoundCloud2['default'].canPlay(url)) {
        players.push(_SoundCloud2['default']);
      } else if (_Vimeo2['default'].canPlay(url)) {
        players.push(_Vimeo2['default']);
      } else if (_Facebook2['default'].canPlay(url)) {
        players.push(_Facebook2['default']);
      } else if (_DailyMotion2['default'].canPlay(url)) {
        players.push(_DailyMotion2['default']);
      } else if (_Streamable2['default'].canPlay(url)) {
        players.push(_Streamable2['default']);
      } else if (_Vidme2['default'].canPlay(url)) {
        players.push(_Vidme2['default']);
      } else if (_Wistia2['default'].canPlay(url)) {
        players.push(_Wistia2['default']);
      } else if (url) {
        // Fall back to FilePlayer if nothing else can play the URL
        players.push(_FilePlayer2['default']);
      }
      // Render additional players if preload config is set
      if (!_YouTube2['default'].canPlay(url) && youtubeConfig.preload) {
        players.push(_YouTube2['default']);
      }
      if (!_Vimeo2['default'].canPlay(url) && vimeoConfig.preload) {
        players.push(_Vimeo2['default']);
      }
      if (!_DailyMotion2['default'].canPlay(url) && dailymotionConfig.preload) {
        players.push(_DailyMotion2['default']);
      }
      return players.map(this.renderPlayer);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          style = _props2.style,
          width = _props2.width,
          height = _props2.height;

      var otherProps = (0, _lodash2['default'])(this.props, Object.keys(props.propTypes));
      var players = this.renderPlayers();
      return _react2['default'].createElement(
        'div',
        _extends({ style: _extends({}, style, { width: width, height: height }) }, otherProps),
        players
      );
    }
  }]);

  return ReactPlayer;
}(react.Component);

ReactPlayer.displayName = 'ReactPlayer';
ReactPlayer.propTypes = props.propTypes;
ReactPlayer.defaultProps = props.defaultProps;
exports['default'] = ReactPlayer;
});

unwrapExports(ReactPlayer_1);

var IconButton_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });



var IconButton = /** @class */ (function (_super) {
    __extends(IconButton, _super);
    function IconButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IconButton.prototype.render = function () {
        var _a = this.props, style = _a.style, hoverStyle = _a.hoverStyle, activeStyle = _a.activeStyle, children = _a.children, size = _a.size, disabled = _a.disabled, attributes = __rest(_a, ["style", "hoverStyle", "activeStyle", "children", "size", "disabled"]);
        var theme = this.context.theme;
        return (react.createElement(Icon_1.default, __assign({}, attributes, { style: __assign({ display: "inline-block", fontFamily: theme.fonts.segoeMDL2Assets, verticalAlign: "middle", textAlign: "center", userSelect: "none", background: disabled ? theme.baseLow : "none", border: "none", outline: "none", fontSize: size / 2, width: size, height: size, cursor: "pointer", color: disabled ? theme.baseMedium : theme.baseHigh, padding: 0, flexShrink: 0, lineHeight: size + "px", transition: "background .25s ease-in-out" }, style), hoverStyle: disabled ? void 0 : hoverStyle || {
                background: theme.listLow
            }, activeStyle: disabled ? void 0 : activeStyle || {
                background: theme.baseLow
            } }), children));
    };
    IconButton.defaultProps = {
        size: 48
    };
    IconButton.contextTypes = { theme: propTypes.object };
    return IconButton;
}(react.Component));
exports.IconButton = IconButton;
exports.default = IconButton;

});

unwrapExports(IconButton_1);
var IconButton_2 = IconButton_1.IconButton;

var Slider_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });



var emptyFunc = function () { };
var Slider = /** @class */ (function (_super) {
    __extends(Slider, _super);
    function Slider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.originBodyStyle = IS_NODE_ENV_1.default ? void 0 : __assign({}, document.body.style);
        _this.state = {
            currValue: _this.props.initValue,
            valueRatio: _this.props.initValue / (_this.props.maxValue - _this.props.minValue)
        };
        _this.throttleNow = null;
        _this.throttleNowTimer = null;
        _this.onChangedValueTimer = null;
        _this.handelMouseEnter = function (e) {
            _this.setState({ hovered: true });
        };
        _this.handelMouseLeave = function (e) {
            _this.setState({ hovered: false });
        };
        _this.handelOnClick = function (e) {
            _this.setValueByEvent(e);
        };
        _this.handleDraggingStart = function (e) {
            e.preventDefault();
            Object.assign(document.body.style, {
                userSelect: "none",
                msUserSelect: "none",
                webkitUserSelect: "none",
                cursor: "default"
            });
            document.documentElement.addEventListener("mousemove", _this.setValueByEvent);
            document.documentElement.addEventListener("touchmove", _this.setValueByEvent);
            document.documentElement.addEventListener("mouseup", _this.handleDragged);
            document.documentElement.addEventListener("touchend", _this.handleDragged);
        };
        _this.handleDragged = function (e) {
            Object.assign(document.body.style, __assign({ userSelect: void 0, msUserSelect: void 0, webkitUserSelect: void 0, cursor: void 0 }, _this.originBodyStyle));
            if (_this.state.dragging) {
                _this.setState({ dragging: false });
            }
            document.documentElement.removeEventListener("mousemove", _this.setValueByEvent);
            document.documentElement.removeEventListener("touchmove", _this.setValueByEvent);
            document.documentElement.removeEventListener("mouseup", _this.handleDragged);
            document.documentElement.removeEventListener("touchend", _this.handleDragged);
        };
        _this.setValueByEvent = function (e, type) {
            var isTouchEvent = e.type.includes("touch");
            clearTimeout(_this.onChangedValueTimer);
            var isDraggingEvent = e.type === "mousemove" || e.type === "touchmove";
            if (isDraggingEvent && !_this.state.dragging) {
                e.preventDefault();
                _this.setState({ dragging: true });
            }
            if (isDraggingEvent) {
                var nowTime = performance ? performance.now() : Date.now();
                if (!_this.throttleNow || (nowTime - _this.throttleNow > _this.props.throttleTimer)) {
                    clearTimeout(_this.throttleNowTimer);
                    _this.throttleNow = nowTime;
                }
                else {
                    _this.throttleNowTimer = setTimeout(function () {
                        _this.setValueByEvent(e, type);
                    }, _this.props.throttleTimer);
                    return;
                }
            }
            var _a = _this.props, displayMode = _a.displayMode, maxValue = _a.maxValue, minValue = _a.minValue, barBackground = _a.barBackground, barBackgroundImage = _a.barBackgroundImage, label = _a.label, numberToFixed = _a.numberToFixed, unit = _a.unit, onChangeValue = _a.onChangeValue, onChangedValue = _a.onChangedValue, onChangeValueRatio = _a.onChangeValueRatio;
            var isHorizonMode = displayMode === "horizon";
            var useCustomBackground = barBackground || barBackgroundImage;
            var _b = _this.rootElm.getBoundingClientRect(), left = _b.left, width = _b.width, bottom = _b.bottom, height = _b.height;
            var _c = isTouchEvent ? e.changedTouches[0] : e, clientX = _c.clientX, clientY = _c.clientY;
            var controllerClientRect = _this.controllerElm.getBoundingClientRect();
            var controllerWidth = controllerClientRect.width;
            var controllerHeight = controllerClientRect.height;
            var valueRatio = isHorizonMode ? (clientX - left) / (width - controllerWidth) : -(clientY - bottom) / (height - controllerHeight);
            valueRatio = valueRatio < 0 ? 0 : (valueRatio > 1 ? 1 : valueRatio);
            var currValue = minValue + (maxValue - minValue) * valueRatio;
            _this.state.currValue = currValue;
            _this.state.valueRatio = valueRatio;
            if (e.type === "click" || e.type === "touchstart") {
                _this.setState({ currValue: currValue });
            }
            else {
                if (!useCustomBackground) {
                    var barTransform = "translate" + (isHorizonMode ? "X" : "Y") + "(" + (isHorizonMode ? (valueRatio - 1) : (1 - valueRatio)) * 100 + "%)";
                    Object.assign(_this.barElm.style, {
                        transform: barTransform,
                        webKitTransform: barTransform,
                        msTransform: barTransform,
                        mozTransform: barTransform
                    });
                }
                var transform = "translate" + (isHorizonMode ? "X" : "Y") + "(" + (isHorizonMode ? valueRatio : 1 - valueRatio) * 100 + "%)";
                Object.assign(_this.controllerWrapperElm.style, {
                    transform: transform,
                    webKitTransform: transform,
                    msTransform: transform,
                    mozTransform: transform
                });
                if (label)
                    _this.labelElm.innerText = "" + currValue.toFixed(numberToFixed) + unit;
            }
            onChangeValue(currValue);
            onChangeValueRatio(valueRatio);
            _this.onChangedValueTimer = setTimeout(function () {
                onChangedValue(currValue);
                onChangeValueRatio(valueRatio);
            }, 0);
        };
        return _this;
    }
    Slider.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.state.currValue !== nextProps.initValue) {
            this.setState({ currValue: nextProps.initValue });
        }
    };
    Slider.prototype.componentDidMount = function () {
        this.rootElm.addEventListener("touchstart", this.handleDraggingStart, false);
        this.rootElm.addEventListener("touchend", this.handleDragged, false);
    };
    Slider.prototype.componentWillUnmount = function () {
        clearTimeout(this.throttleNowTimer);
        clearTimeout(this.onChangedValueTimer);
        this.rootElm.removeEventListener("touchstart", this.handleDraggingStart, false);
        this.rootElm.removeEventListener("touchend", this.handleDragged, false);
    };
    Slider.prototype.render = function () {
        var _this = this;
        var _a = this.props, minValue = _a.minValue, maxValue = _a.maxValue, initValue = _a.initValue, onChangeValue = _a.onChangeValue, onChangeValueRatio = _a.onChangeValueRatio, onChangedValue = _a.onChangedValue, onChangedValueRatio = _a.onChangedValueRatio, barHeight = _a.barHeight, controllerWidth = _a.controllerWidth, barBackground = _a.barBackground, barBackgroundImage = _a.barBackgroundImage, useSimpleController = _a.useSimpleController, showValueInfo = _a.showValueInfo, numberToFixed = _a.numberToFixed, unit = _a.unit, customControllerStyle = _a.customControllerStyle, transition = _a.transition, throttleTimer = _a.throttleTimer, displayMode = _a.displayMode, attributes = __rest(_a, ["minValue", "maxValue", "initValue", "onChangeValue", "onChangeValueRatio", "onChangedValue", "onChangedValueRatio", "barHeight", "controllerWidth", "barBackground", "barBackgroundImage", "useSimpleController", "showValueInfo", "numberToFixed", "unit", "customControllerStyle", "transition", "throttleTimer", "displayMode"]);
        var currValue = this.state.currValue;
        var theme = this.context.theme;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "slider",
            styles: inlineStyles
        });
        var normalRender = (react.createElement("div", __assign({ ref: function (elm) { return _this.rootElm = elm; } }, styles.root, { onMouseEnter: this.handelMouseEnter, onMouseLeave: this.handelMouseLeave, onClick: this.setValueByEvent, onTouchStart: this.setValueByEvent, onMouseDown: this.handleDraggingStart, onMouseUp: this.handleDragged }),
            react.createElement("div", __assign({}, styles.barContainer),
                react.createElement("div", __assign({}, styles.bar, { ref: function (elm) { return _this.barElm = elm; } }))),
            react.createElement("div", __assign({}, styles.controllerWrapper, { ref: function (controllerWrapperElm) { return _this.controllerWrapperElm = controllerWrapperElm; } }),
                react.createElement("div", __assign({}, styles.controller, { ref: function (controllerElm) { return _this.controllerElm = controllerElm; } })))));
        return (react.createElement("div", __assign({}, attributes, styles.wrapper), showValueInfo ? (react.createElement("div", __assign({}, styles.infoWrapper),
            normalRender,
            react.createElement("span", __assign({ ref: function (labelElm) { return _this.labelElm = labelElm; } }, styles.label), "" + currValue.toFixed(numberToFixed) + unit))) : normalRender));
    };
    Slider.defaultProps = {
        displayMode: "horizon",
        minValue: 0,
        maxValue: 1,
        initValue: 0,
        onChangeValue: emptyFunc,
        onChangedValue: emptyFunc,
        onChangeValueRatio: emptyFunc,
        onChangedValueRatio: emptyFunc,
        height: 24,
        barHeight: 2,
        controllerWidth: 8,
        showValueInfo: false,
        numberToFixed: 0,
        unit: "",
        transition: "all 0.25s",
        throttleTimer: 120 / 1000
    };
    Slider.contextTypes = { theme: propTypes.object };
    return Slider;
}(react.Component));
exports.Slider = Slider;
function getStyles(slider) {
    var theme = slider.context.theme, _a = slider.props, transition = _a.transition, maxValue = _a.maxValue, style = _a.style, height = _a.height, barHeight = _a.barHeight, controllerWidth = _a.controllerWidth, barBackground = _a.barBackground, barBackgroundImage = _a.barBackgroundImage, useSimpleController = _a.useSimpleController, customControllerStyle = _a.customControllerStyle, showValueInfo = _a.showValueInfo, displayMode = _a.displayMode, _b = slider.state, currValue = _b.currValue, dragging = _b.dragging, hovered = _b.hovered;
    var prefixStyle = theme.prefixStyle;
    var isHorizonMode = displayMode === "horizon";
    var height2px = Number.parseFloat(height);
    var barHeight2px = Number.parseFloat(barHeight);
    var controllerWidth2px = Number.parseFloat(controllerWidth);
    var currTransition = dragging ? void 0 : (transition || void 0);
    var useCustomBackground = barBackground || barBackgroundImage;
    var valueRatio = currValue / maxValue;
    return {
        wrapper: prefixStyle(__assign({ width: isHorizonMode ? 320 : height2px, height: isHorizonMode ? height2px : 320, display: "inline-block", verticalAlign: "middle" }, style)),
        root: prefixStyle({
            flex: showValueInfo ? "0 0 auto" : void 0,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: isHorizonMode ? "100%" : height2px,
            height: isHorizonMode ? height2px : "100%",
            cursor: "default",
            position: "relative"
        }),
        barContainer: {
            background: theme.baseLow,
            position: "absolute",
            width: isHorizonMode ? "100%" : barHeight,
            height: isHorizonMode ? barHeight : "100%",
            overflow: "hidden",
            left: isHorizonMode ? 0 : "calc(50% - " + barHeight2px / 2 + "px)",
            top: isHorizonMode ? "calc(50% - " + barHeight2px / 2 + "px)" : 0
        },
        infoWrapper: prefixStyle({
            display: "flex",
            flexDirection: displayMode === "horizon" ? "row" : "column",
            alignItems: "center"
        }),
        bar: prefixStyle({
            transition: currTransition,
            background: useCustomBackground ? barBackground : theme.listAccentLow,
            backgroundImage: barBackgroundImage,
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            dynamicStyle: {
                transform: useCustomBackground ? void 0 : "translate" + (isHorizonMode ? "X" : "Y") + "(" + (isHorizonMode ? (valueRatio - 1) : (1 - valueRatio)) * 100 + "%)"
            }
        }),
        controllerWrapper: prefixStyle({
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            transition: currTransition,
            dynamicStyle: {
                transform: "translate" + (isHorizonMode ? "X" : "Y") + "(" + (isHorizonMode ? valueRatio : 1 - valueRatio) * 100 + "%)"
            }
        }),
        controller: prefixStyle(__assign({ pointerEvents: "none", transition: currTransition, display: "inline-block", background: (useSimpleController || dragging || hovered) ? theme.baseHigh : theme.accent, borderRadius: controllerWidth2px / 2, width: isHorizonMode ? controllerWidth2px : height2px, height: isHorizonMode ? height2px : controllerWidth2px, float: "left", transform: "translate3d(" + (isHorizonMode ? -controllerWidth2px / 2 : 0) + "px, 0, 0)" }, customControllerStyle)),
        label: {
            flex: showValueInfo ? "0 0 auto" : void 0,
            display: "inline-block",
            marginLeft: 12,
            fontSize: height2px / 1.5,
            lineHeight: height2px / 1.5 + "px",
            color: theme.baseMediumHigh
        }
    };
}
exports.default = Slider;

});

unwrapExports(Slider_1);
var Slider_2 = Slider_1.Slider;

var FlyoutContent_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });


var emptyFunc = function () { };
var FlyoutContent = /** @class */ (function (_super) {
    __extends(FlyoutContent, _super);
    function FlyoutContent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showFlyoutContent: _this.props.show
        };
        _this.autoHideTimer = null;
        _this.hideTimer = null;
        _this.showFlyoutContent = function () {
            clearTimeout(_this.autoHideTimer);
            clearTimeout(_this.hideTimer);
            _this.toggleShowFlyoutContent(true);
            if (_this.props.autoClose) {
                _this.autoHideTimer = setTimeout(function () {
                    _this.hideFlyoutContent();
                }, _this.props.autoCloseTimeout);
            }
        };
        _this.hideFlyoutContent = function () {
            _this.hideTimer = setTimeout(function () {
                _this.toggleShowFlyoutContent(false);
            }, 250);
        };
        _this.toggleShowFlyoutContent = function (showFlyoutContent) {
            if (typeof showFlyoutContent === "boolean") {
                if (showFlyoutContent !== _this.state.showFlyoutContent) {
                    _this.setState({ showFlyoutContent: showFlyoutContent });
                }
            }
            else {
                _this.setState({
                    showFlyoutContent: !_this.state.showFlyoutContent
                });
            }
        };
        _this.getStaticStyle = function (showFlyoutContent) {
            if (showFlyoutContent === void 0) { showFlyoutContent = _this.state.showFlyoutContent; }
            var _a = _this, theme = _a.context.theme, style = _a.props.style;
            var enterDelay = showFlyoutContent ? _this.props.enterDelay : 0;
            return theme.prefixStyle(__assign({ width: 280, boxSizing: "content-box", padding: 8, border: "1px solid " + theme.baseLow, color: theme.baseMediumHigh, background: theme.chromeLow, pointerEvents: showFlyoutContent ? "all" : "none", opacity: showFlyoutContent ? 1 : 0, transform: "translateY(" + (showFlyoutContent ? "0px" : "10px") + ")", position: "absolute", zIndex: theme.zIndex.flyout, transition: "transform .25s " + enterDelay + "ms ease-in-out, opacity .25s " + enterDelay + "ms ease-in-out, border " + enterDelay + "ms .25s ease-in-out" }, style));
        };
        _this.getDynamicStyle = function (unit) {
            if (unit === void 0) { unit = ""; }
            var rootElm = _this.rootElm;
            if (!rootElm)
                return;
            var parentElement = rootElm.parentElement;
            var _a = _this.props, verticalPosition = _a.verticalPosition, horizontalPosition = _a.horizontalPosition, margin = _a.margin;
            var showFlyoutContent = _this.state.showFlyoutContent;
            var _b = parentElement.getBoundingClientRect(), width = _b.width, height = _b.height;
            var containerWidth = rootElm.getBoundingClientRect().width;
            var containerHeight = rootElm.getBoundingClientRect().height;
            var positionStyle = {};
            if (width !== void (0) && height !== void (0)) {
                switch (horizontalPosition) {
                    case "left": {
                        positionStyle.right = unit ? "0" + unit : 0;
                        break;
                    }
                    case "center": {
                        var left = (width - containerWidth) / 2;
                        positionStyle.left = unit ? "" + left + unit : left;
                        break;
                    }
                    case "right": {
                        positionStyle.left = unit ? "0" + unit : 0;
                        break;
                    }
                    default: {
                        break;
                    }
                }
                switch (verticalPosition) {
                    case "top": {
                        var top_1 = -containerHeight - margin;
                        positionStyle.top = unit ? "" + top_1 + unit : top_1;
                        break;
                    }
                    case "center": {
                        var top_2 = (height - containerHeight) / 2;
                        positionStyle.top = unit ? "" + top_2 + unit : top_2;
                        break;
                    }
                    case "bottom": {
                        var top_3 = height + margin;
                        positionStyle.top = unit ? "" + top_3 + unit : top_3;
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
            return positionStyle;
        };
        _this.handelMouseEnter = function (e) {
            clearTimeout(_this.autoHideTimer);
            clearTimeout(_this.hideTimer);
            e.currentTarget.style.border = "1px solid " + _this.context.theme.listAccentLow;
            if (!_this.props.isControlled)
                _this.showFlyoutContent();
            _this.props.onMouseEnter(e);
        };
        _this.handelMouseLeave = function (e) {
            e.currentTarget.style.border = "1px solid " + _this.context.theme.baseLow;
            _this.hideFlyoutContent();
            _this.props.onMouseLeave(e);
        };
        return _this;
    }
    FlyoutContent.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.state.showFlyoutContent !== nextProps.show) {
            this.setState({ showFlyoutContent: nextProps.show });
        }
    };
    FlyoutContent.prototype.componentDidMount = function () {
        Object.assign(this.rootElm.style, this.getDynamicStyle("px"));
        if (!this.props.isControlled) {
            this.rootElm.parentElement.addEventListener("mouseenter", this.showFlyoutContent);
            this.rootElm.parentElement.addEventListener("mouseleave", this.hideFlyoutContent);
        }
    };
    FlyoutContent.prototype.componentWillUnmount = function () {
        clearTimeout(this.autoHideTimer);
        if (!this.props.isControlled) {
            this.rootElm.parentElement.removeEventListener("mouseenter", this.showFlyoutContent);
            this.rootElm.parentElement.removeEventListener("mouseleave", this.hideFlyoutContent);
        }
    };
    FlyoutContent.prototype.render = function () {
        var _this = this;
        var _a = this.props, verticalPosition = _a.verticalPosition, enterDelay = _a.enterDelay, isControlled = _a.isControlled, margin = _a.margin, horizontalPosition = _a.horizontalPosition, show = _a.show, autoClose = _a.autoClose, autoCloseTimeout = _a.autoCloseTimeout, children = _a.children, attributes = __rest(_a, ["verticalPosition", "enterDelay", "isControlled", "margin", "horizontalPosition", "show", "autoClose", "autoCloseTimeout", "children"]);
        var theme = this.context.theme;
        var staticStyle = this.getStaticStyle();
        var stylesClasses = theme.prepareStyle({
            className: "flyout-content",
            style: staticStyle
        });
        var dynamicStyle = this.getDynamicStyle();
        return (react.createElement("div", __assign({}, attributes, { onMouseEnter: this.handelMouseEnter, onMouseLeave: this.handelMouseLeave, ref: function (rootElm) { return _this.rootElm = rootElm; }, style: dynamicStyle ? __assign({}, stylesClasses.style, dynamicStyle) : stylesClasses.style, className: stylesClasses.className }), children));
    };
    FlyoutContent.defaultProps = {
        verticalPosition: "top",
        horizontalPosition: "center",
        margin: 4,
        isControlled: false,
        enterDelay: 0,
        onMouseLeave: emptyFunc,
        onMouseEnter: emptyFunc,
        autoClose: false,
        autoCloseTimeout: 1250
    };
    FlyoutContent.contextTypes = { theme: propTypes.object };
    return FlyoutContent;
}(react.Component));
exports.default = FlyoutContent;

});

unwrapExports(FlyoutContent_1);

var Flyout_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });



var Flyout = /** @class */ (function (_super) {
    __extends(Flyout, _super);
    function Flyout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Flyout.prototype.render = function () {
        var _a = this.props, style = _a.style, children = _a.children, attributes = __rest(_a, ["style", "children"]);
        var theme = this.context.theme;
        var flyoutContents = [];
        var renderChild = [];
        react.Children.map(children, function (child) {
            if (child.type === FlyoutContent_1.default) {
                flyoutContents.push(child);
            }
            else {
                renderChild.push(child);
            }
        });
        return (react.createElement("div", __assign({}, attributes, { style: theme.prefixStyle(__assign({ display: "inline-block" }, style, { position: "relative" })) }),
            flyoutContents,
            renderChild));
    };
    Flyout.contextTypes = { theme: propTypes.object };
    return Flyout;
}(react.Component));
exports.Flyout = Flyout;
exports.default = Flyout;

});

unwrapExports(Flyout_1);
var Flyout_2 = Flyout_1.Flyout;

var ListView_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });



var emptyFunc = function () { };
var ListView = /** @class */ (function (_super) {
    __extends(ListView, _super);
    function ListView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            focusIndex: _this.props.defaultFocusListIndex
        };
        _this.inlineStyles = null;
        _this.getItemNode = function (itemNode, index, disabled, focus, style, onClick) {
            var inlineStyles = _this.inlineStyles;
            var theme = _this.context.theme;
            var _a = _this.props, onChooseItem = _a.onChooseItem, background = _a.background;
            var focusIndex = _this.state.focusIndex;
            var isDarkTheme = theme.isDarkTheme;
            var isFocus = focus || focusIndex === index;
            var defaultBG = isFocus ? theme.listAccentLow : "none";
            var focusBG = isFocus ? theme.listAccentHigh : (theme.useFluentDesign ? theme.acrylicTexture40.background : theme.listLow);
            var clickBG = isFocus ? theme.accent : theme.chromeHigh;
            var itemStyles = theme.prepareStyle({
                className: "list-view-item",
                style: theme.prefixStyle(__assign({ background: defaultBG, color: disabled ? theme.baseLow : theme.baseHigh, "&:hover": {
                        background: focusBG
                    }, "&:active": {
                        transform: "scale(0.99)"
                    } }, inlineStyles.item, style))
            });
            return (react.createElement(PseudoClasses_1.default, __assign({}, itemStyles, { key: "" + index }),
                react.createElement("div", { onClick: onClick, onMouseDown: disabled ? void 0 : function (e) {
                        onChooseItem(index);
                    } }, itemNode)));
        };
        return _this;
    }
    ListView.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.defaultFocusListIndex !== this.state.focusIndex) {
            this.setState({ focusIndex: nextProps.defaultFocusListIndex });
        }
    };
    ListView.prototype.render = function () {
        var _this = this;
        var _a = this.props, listSource = _a.listSource, listItemStyle = _a.listItemStyle, onChooseItem = _a.onChooseItem, background = _a.background, defaultFocusListIndex = _a.defaultFocusListIndex, attributes = __rest(_a, ["listSource", "listItemStyle", "onChooseItem", "background", "defaultFocusListIndex"]);
        var theme = this.context.theme;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "list-view",
            styles: inlineStyles
        });
        this.inlineStyles = inlineStyles;
        var listSourceAny = listSource;
        return (react.createElement("div", __assign({ ref: function (rootElm) { return _this.rootElm = rootElm; } }, attributes, styles.root), listSourceAny && listSourceAny.map(function (listItem, index) {
            if (react.isValidElement(listItem)) {
                var props = listItem.props;
                var disabled = props.disabled, focus_1 = props.focus, style = props.style, onClick = props.onClick;
                return _this.getItemNode(listItem, index, disabled, focus_1, style, onClick);
            }
            else if (typeof listItem === "string" || typeof listItem === "number") {
                return _this.getItemNode(listItem, index);
            }
            else if (typeof listItem === "object" && listItem.itemNode) {
                var itemNode = listItem.itemNode, disabled = listItem.disabled, focus_2 = listItem.focus, style = listItem.style, onClick = listItem.onClick;
                return _this.getItemNode(itemNode, index, disabled, focus_2, style, onClick);
            }
            else {
                return null;
            }
        })));
    };
    ListView.defaultProps = {
        onChooseItem: emptyFunc
    };
    ListView.contextTypes = { theme: propTypes.object };
    return ListView;
}(react.Component));
exports.ListView = ListView;
function getStyles(listView) {
    var context = listView.context, _a = listView.props, listItemStyle = _a.listItemStyle, background = _a.background, style = _a.style;
    var theme = context.theme;
    var prefixStyle = theme.prefixStyle;
    return {
        root: theme.prefixStyle(__assign({ width: 320, display: "inline-block", verticalAlign: "middle", fontSize: 14, padding: "8px 0", color: theme.baseMediumHigh, border: "1px solid " + (theme.useFluentDesign ? theme.listLow : theme.altHigh), background: background || (theme.useFluentDesign ? theme.acrylicTexture60.background : theme.chromeLow), transition: "all .25s" }, style)),
        item: theme.prefixStyle(__assign({ cursor: "default", padding: 8, width: "100%", transition: "all 0.25s" }, listItemStyle))
    };
}
exports.default = ListView;

});

var ListView = unwrapExports(ListView_1);
var ListView_2 = ListView_1.ListView;

var Control_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });









var emptyFunc = function () { };
var Control = /** @class */ (function (_super) {
    __extends(Control, _super);
    function Control() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showVolumeSlider: false,
            showPlaybackChoose: false
        };
        _this.toggleShowPlaybackChoose = function (showPlaybackChoose) {
            if (typeof showPlaybackChoose === "boolean") {
                if (showPlaybackChoose !== _this.state.showPlaybackChoose) {
                    _this.setState({ showPlaybackChoose: showPlaybackChoose });
                }
            }
            else {
                _this.setState(function (prevState, prevProps) { return ({
                    showPlaybackChoose: !prevState.showPlaybackChoose
                }); });
            }
        };
        _this.toggleShowVolumeSlider = function (showVolumeSlider) {
            if (typeof showVolumeSlider === "boolean") {
                if (showVolumeSlider !== _this.state.showVolumeSlider) {
                    _this.setState({ showVolumeSlider: showVolumeSlider });
                }
            }
            else {
                _this.setState(function (prevState, prevProps) { return ({
                    showVolumeSlider: !prevState.showVolumeSlider
                }); });
            }
        };
        _this.second2HHMMSS = function (second) {
            var s = (second % 60).toFixed(0);
            var m = parseInt("" + second / 60);
            m %= 60;
            var h = parseInt("" + second / 3600);
            if (s < 10)
                s = "0" + s;
            if (m < 10)
                m = "0" + m;
            if (h < 10)
                h = "0" + h;
            return h + ":" + m + ":" + s;
        };
        return _this;
    }
    Control.prototype.render = function () {
        var _this = this;
        var _a = this.props, displayMode = _a.displayMode, playing = _a.playing, played = _a.played, volume = _a.volume, playbackRate = _a.playbackRate, duration = _a.duration, playOrPauseAction = _a.playOrPauseAction, fullScreenAction = _a.fullScreenAction, skipBackAction = _a.skipBackAction, skipForwardAction = _a.skipForwardAction, onChangePlaybackRate = _a.onChangePlaybackRate, onChangeVolume = _a.onChangeVolume, onChangeSeek = _a.onChangeSeek, className = _a.className, attributes = __rest(_a, ["displayMode", "playing", "played", "volume", "playbackRate", "duration", "playOrPauseAction", "fullScreenAction", "skipBackAction", "skipForwardAction", "onChangePlaybackRate", "onChangeVolume", "onChangeSeek", "className"]);
        var _b = this.state, showPlaybackChoose = _b.showPlaybackChoose, showVolumeSlider = _b.showVolumeSlider;
        var theme = this.context.theme;
        played = played || 0;
        duration = duration || 0;
        var playedValue = played * duration;
        var isDefaultMode = displayMode === "default";
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "media-player-control",
            styles: inlineStyles
        });
        var playButton = react.createElement(IconButton_1.default, { onClick: playOrPauseAction }, playing ? "Pause" : "Play");
        var playSlider = (react.createElement(Slider_1.default, { style: { width: "100%", padding: "0 16px" }, initValue: played || 0, minValue: 0, maxValue: 1, controllerWidth: 16, customControllerStyle: {
                width: 16,
                height: 16,
                marginTop: 4
            }, transition: "all .25s", onChangeValue: function (value) {
                onChangeSeek(Number(value.toFixed(1)));
            } }));
        var volumeButton = (react.createElement(Flyout_1.default, null,
            react.createElement(IconButton_1.default, { onClick: this.toggleShowVolumeSlider }, "Volume"),
            react.createElement(FlyoutContent_1.default, { style: theme.prefixStyle({
                    width: isDefaultMode ? void 0 : 30
                }), isControlled: true, show: showVolumeSlider, verticalPosition: "top", horizontalPosition: "right" },
                react.createElement(Slider_1.default, { displayMode: isDefaultMode ? "horizon" : "vertical", style: {
                        width: isDefaultMode ? 240 : 24,
                        height: isDefaultMode ? 24 : 120
                    }, onChangeValue: onChangeVolume, initValue: volume }))));
        var subtitleButton = (react.createElement(Tooltip_1.default, { content: "Subtitles" },
            react.createElement(IconButton_1.default, null, "Subtitles")));
        var moreLegacyButton = (react.createElement(Flyout_1.default, null,
            react.createElement(IconButton_1.default, { onClick: this.toggleShowPlaybackChoose }, "MoreLegacy"),
            react.createElement(FlyoutContent_1.default, { style: { width: 120, cursor: "pointer", padding: 0 }, isControlled: true, show: showPlaybackChoose, verticalPosition: "top", horizontalPosition: "left" },
                react.createElement(Tooltip_1.default, { style: { height: "auto", padding: 0, border: "none" }, margin: 0, horizontalPosition: "left", background: theme.chromeLow, contentNode: react.createElement(ListView_1.default, { background: theme.chromeLow, style: { width: 80 }, listSource: [{
                                itemNode: "2x",
                                onClick: function () {
                                    onChangePlaybackRate(2);
                                    _this.toggleShowPlaybackChoose(false);
                                }
                            }, {
                                itemNode: "1.5x",
                                onClick: function () {
                                    onChangePlaybackRate(1.5);
                                    _this.toggleShowPlaybackChoose(false);
                                }
                            }, {
                                itemNode: "1.25x",
                                onClick: function () {
                                    onChangePlaybackRate(1.25);
                                    _this.toggleShowPlaybackChoose(false);
                                }
                            }, {
                                itemNode: "Normal",
                                onClick: function () {
                                    onChangePlaybackRate(1);
                                    _this.toggleShowPlaybackChoose(false);
                                }
                            }, {
                                itemNode: "0.75x",
                                onClick: function () {
                                    onChangePlaybackRate(0.75);
                                    _this.toggleShowPlaybackChoose(false);
                                }
                            }, {
                                itemNode: "0.5x",
                                onClick: function () {
                                    onChangePlaybackRate(0.5);
                                    _this.toggleShowPlaybackChoose(false);
                                }
                            }] }) },
                    react.createElement("div", { style: { padding: 8, width: 120 } },
                        react.createElement("span", null, "Playback Rate"),
                        react.createElement(Icon_1.default, null, "ScrollChevronRightLegacy")),
                    react.createElement(FlyoutContent_1.default, { margin: 0, style: { width: 60, padding: 0 }, verticalPosition: "top", horizontalPosition: "left" })))));
        return isDefaultMode ? (react.createElement("div", __assign({}, attributes, { className: theme.classNames(styles.root.className, className), style: styles.root.style }),
            react.createElement("div", __assign({}, styles.sliderContainer),
                playSlider,
                react.createElement("span", { style: { marginLeft: 16 } }, this.second2HHMMSS(playedValue)),
                react.createElement("span", { style: { float: "right", marginRight: 16 } }, this.second2HHMMSS(duration))),
            react.createElement("div", __assign({}, styles.controlsGroup),
                react.createElement("div", null,
                    volumeButton,
                    subtitleButton),
                react.createElement("div", null,
                    react.createElement(Tooltip_1.default, { content: "Skip Back", background: theme.chromeLow },
                        react.createElement(IconButton_1.default, { onClick: skipBackAction }, "SkipBack10")),
                    playButton,
                    react.createElement(Tooltip_1.default, { content: "Skip Forward", background: theme.chromeLow },
                        react.createElement(IconButton_1.default, { onClick: skipForwardAction }, "SkipForward30"))),
                react.createElement("div", null,
                    react.createElement(Tooltip_1.default, { content: "Full Screen", background: theme.chromeLow },
                        react.createElement(IconButton_1.default, { onClick: fullScreenAction }, "FullScreen")),
                    moreLegacyButton)))) : (react.createElement("div", __assign({}, styles.controlsGroup),
            playButton,
            playSlider,
            volumeButton,
            displayMode === "reset" ? subtitleButton : null,
            moreLegacyButton));
    };
    Control.defaultProps = {
        displayMode: "default",
        playOrPauseAction: emptyFunc,
        fullScreenAction: emptyFunc,
        skipBackAction: emptyFunc,
        skipForwardAction: emptyFunc,
        onChangePlaybackRate: emptyFunc,
        onChangeVolume: emptyFunc,
        onChangeSeek: emptyFunc
    };
    Control.contextTypes = { theme: propTypes.object };
    return Control;
}(react.Component));
exports.default = Control;
function getStyles(mock) {
    var theme = mock.context.theme, _a = mock.props, displayMode = _a.displayMode, style = _a.style;
    var prefixStyle = theme.prefixStyle;
    var rootStyle = __assign({ fontSize: 14, color: theme.baseHigh, height: 96, width: "100%", position: "absolute", left: 0, bottom: 0, backgroundImage: "linear-gradient(transparent, " + theme.altMedium + ")", transition: "all .75s" }, style);
    return {
        root: prefixStyle(rootStyle),
        sliderContainer: {
            overflow: "hidden",
            position: "relative",
            height: 48
        },
        controlsGroup: prefixStyle(__assign({ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }, (displayMode !== "default" ? {
            background: theme.altHigh
        } : void 0), { height: 48 }))
    };
}

});

unwrapExports(Control_1);

var MediaPlayer_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });





var ReactPlayer = ReactPlayer_1.default;
var emptyFunc = function () { };
var MediaPlayer = /** @class */ (function (_super) {
    __extends(MediaPlayer, _super);
    function MediaPlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getProps2State = function (props) { return ({
            currShowControl: props.showControl,
            currPlaying: props.playing,
            currVolume: props.volume,
            currPlaybackRate: props.playbackRate
        }); };
        _this.state = Object.assign({
            currShowControl: false,
            currPlaying: false,
            currVolume: 0.8,
            currPlayed: 0,
            currLoaded: 0,
            currPlaybackRate: 1.0
        }, _this.getProps2State(_this.props));
        _this.showControlTimer = null;
        _this.mouseMoveTimer = null;
        _this.endTimer = null;
        _this.handleMouseEnter = function (e) {
            clearTimeout(_this.showControlTimer);
            _this.toggleShowControl(true);
            _this.props.onMouseEnter(e);
        };
        _this.handleMouseLeave = function (e) {
            _this.showControlTimer = setTimeout(function () {
                _this.toggleShowControl(false);
            }, 3500);
            _this.props.onMouseLeave(e);
        };
        _this.handleMouseMove = function (e) {
            clearTimeout(_this.mouseMoveTimer);
            clearTimeout(_this.showControlTimer);
            _this.mouseMoveTimer = setTimeout(function () {
                _this.toggleShowControl(true);
            }, 200);
            _this.showControlTimer = setTimeout(function () {
                _this.toggleShowControl(false);
            }, 3500);
            _this.props.onMouseMove(e);
        };
        _this.handleTouchStart = function (e) {
            _this.toggleShowControl(true);
            _this.props.onTouchStart(e);
        };
        _this.toggleShowControl = function (currShowControl) {
            if (typeof currShowControl === "boolean") {
                if (currShowControl !== _this.state.currShowControl) {
                    _this.setState({ currShowControl: currShowControl });
                }
            }
            else {
                _this.setState(function (prevState, prevProps) { return ({
                    currShowControl: !prevState.currShowControl
                }); });
            }
        };
        _this.togglePlaying = function (currPlaying) {
            if (typeof currPlaying === "boolean") {
                if (currPlaying !== _this.state.currPlaying) {
                    _this.setState({ currPlaying: currPlaying });
                }
            }
            else {
                _this.setState(function (prevState, prevProps) { return ({
                    currPlaying: !prevState.currPlaying
                }); });
            }
        };
        _this.handleFullScreenAction = function () {
            if (_this.state.fullScreenMode) {
                _this.existFullscreen();
            }
            var rootElm = reactDom.findDOMNode(_this.reactPlayer).children[0];
            if (rootElm.requestFullscreen) {
                rootElm.requestFullscreen();
            }
            else if (rootElm.msRequestFullscreen) {
                rootElm.msRequestFullscreen();
            }
            else if (rootElm.mozRequestFullScreen) {
                rootElm.mozRequestFullScreen();
            }
            else if (rootElm.webkitRequestFullscreen) {
                rootElm.webkitRequestFullscreen();
            }
            _this.setState({ currShowControl: true });
        };
        _this.existFullscreen = function () {
            var document = window.document;
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        };
        _this.handleKeyDown = function (e) {
            if (e.keyCode === 13 || e.keyCode === 27) {
                _this.existFullscreen();
            }
        };
        _this.exitFullScreen = function () {
            var document = window.document;
            var haveFullScreenElm = document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement !== null;
            if (haveFullScreenElm) {
                _this.setState(function (prevState, prevProps) { return ({ fullScreenMode: !_this.state.fullScreenMode }); });
            }
        };
        _this.handleEnded = function () {
            _this.endTimer = setTimeout(function () {
                _this.setState({
                    currPlaying: false,
                    currShowControl: true,
                    played: 0
                });
            }, 1000);
        };
        return _this;
    }
    MediaPlayer.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState(Object.assign(this.state, this.getProps2State(nextProps)));
    };
    MediaPlayer.prototype.componentDidMount = function () {
        document.documentElement.addEventListener("keydown", this.handleKeyDown, false);
        document.documentElement.addEventListener("webkitfullscreenchange", this.exitFullScreen, false);
        document.documentElement.addEventListener("mozfullscreenchange", this.exitFullScreen, false);
        document.documentElement.addEventListener("fullscreenchange", this.exitFullScreen, false);
        document.documentElement.addEventListener("MSFullscreenChange", this.exitFullScreen, false);
    };
    MediaPlayer.prototype.componentWillUnmount = function () {
        document.documentElement.removeEventListener("keydown", this.handleKeyDown, false);
        document.documentElement.removeEventListener("webkitfullscreenchange", this.exitFullScreen, false);
        document.documentElement.removeEventListener("mozfullscreenchange", this.exitFullScreen, false);
        document.documentElement.removeEventListener("fullscreenchange", this.exitFullScreen, false);
        document.documentElement.removeEventListener("MSFullscreenChange", this.exitFullScreen, false);
        clearTimeout(this.mouseMoveTimer);
        clearTimeout(this.showControlTimer);
        clearTimeout(this.endTimer);
    };
    MediaPlayer.prototype.componentWillUpdate = function () {
        clearTimeout(this.showControlTimer);
    };
    MediaPlayer.prototype.render = function () {
        var _this = this;
        var _a = this.props, width = _a.width, height = _a.height, url = _a.url, playing = _a.playing, loop = _a.loop, controls = _a.controls, volume = _a.volume, playbackRate = _a.playbackRate, progressFrequency = _a.progressFrequency, soundcloudConfig = _a.soundcloudConfig, youtubeConfig = _a.youtubeConfig, vimeoConfig = _a.vimeoConfig, fileConfig = _a.fileConfig, onReady = _a.onReady, onStart = _a.onStart, onPlay = _a.onPlay, onPause = _a.onPause, onBuffer = _a.onBuffer, onEnded = _a.onEnded, onError = _a.onError, onDuration = _a.onDuration, onProgress = _a.onProgress, showControl = _a.showControl, displayMode = _a.displayMode, className = _a.className, attributes = __rest(_a, ["width", "height", "url", "playing", "loop", "controls", "volume", "playbackRate", "progressFrequency", "soundcloudConfig", "youtubeConfig", "vimeoConfig", "fileConfig", "onReady", "onStart", "onPlay", "onPause", "onBuffer", "onEnded", "onError", "onDuration", "onProgress", "showControl", "displayMode", "className"]);
        var _b = this.state, currShowControl = _b.currShowControl, currPlaying = _b.currPlaying, currVolume = _b.currVolume, currPlayed = _b.currPlayed, currLoaded = _b.currLoaded, currPlaybackRate = _b.currPlaybackRate, duration = _b.duration, played = _b.played, fullScreenMode = _b.fullScreenMode;
        var theme = this.context.theme;
        var styles = getStyles(this);
        var styleClasses = theme.prepareStyle({
            className: "media-player",
            style: styles.root,
            extendsClassName: className
        });
        return (react.createElement("div", __assign({ ref: function (rootElm) { return _this.rootElm = rootElm; } }, attributes, { onMouseEnter: this.handleMouseEnter, onMouseMove: this.handleMouseMove, onMouseLeave: this.handleMouseLeave, onTouchStart: this.handleTouchStart }, styleClasses),
            react.createElement(ReactPlayer, __assign({}, {
                width: width,
                height: height,
                url: url,
                playing: playing,
                loop: loop,
                controls: controls,
                volume: volume,
                playbackRate: playbackRate,
                progressFrequency: progressFrequency,
                soundcloudConfig: soundcloudConfig,
                youtubeConfig: youtubeConfig,
                vimeoConfig: vimeoConfig,
                fileConfig: fileConfig,
                onReady: onReady,
                onStart: onStart,
                onPlay: onPlay,
                onPause: onPause,
                onBuffer: onBuffer,
                onEnded: onEnded,
                onError: onError,
                onDuration: onDuration,
                onProgress: onProgress
            }, { onEnded: this.handleEnded, onPlay: function () { return _this.setState({ currPlaying: true }); }, onPause: function () { return _this.setState({ currPlaying: false }); }, ref: function (reactPlayer) { return _this.reactPlayer = reactPlayer; }, volume: currVolume, playing: currPlaying, playbackRate: currPlaybackRate, onProgress: function (state) { return _this.setState({ played: state.played }); }, onDuration: function (duration) { return _this.setState({ duration: duration }); } })),
            react.createElement(Control_1.default, { duration: duration, played: played, displayMode: displayMode, style: {
                    opacity: currShowControl ? 1 : 0,
                    zIndex: fullScreenMode ? theme.zIndex.mediaPlayer : void 0,
                    position: fullScreenMode ? "fixed" : "absolute"
                }, fullScreenAction: this.handleFullScreenAction, playing: currPlaying, playOrPauseAction: function () { return _this.setState(function (prevState, prevProps) { return ({ currPlaying: !prevState.currPlaying }); }); }, volume: currVolume, onChangeVolume: function (currVolume) {
                    _this.setState({ currVolume: currVolume });
                }, onChangePlaybackRate: function (currPlaybackRate) {
                    _this.setState({ currPlaybackRate: currPlaybackRate });
                }, onChangeSeek: function (seek) { return _this.reactPlayer.seekTo(seek); }, skipBackAction: function () {
                    var currPlayed = played - 0.01;
                    _this.setState({ played: currPlayed });
                    _this.reactPlayer.seekTo(currPlayed);
                }, skipForwardAction: function () {
                    var currPlayed = played + 0.03;
                    _this.setState({ played: currPlayed });
                    _this.reactPlayer.seekTo(currPlayed);
                } })));
    };
    MediaPlayer.defaultProps = {
        displayMode: "default",
        width: 640,
        height: 360,
        loop: false,
        showControl: true,
        playing: false,
        volume: 0.8,
        playbackRate: 1.0,
        onTouchStart: emptyFunc,
        onMouseEnter: emptyFunc,
        onMouseLeave: emptyFunc,
        onMouseMove: emptyFunc
    };
    MediaPlayer.contextTypes = { theme: propTypes.object };
    return MediaPlayer;
}(react.Component));
exports.MediaPlayer = MediaPlayer;
function getStyles(mock) {
    var theme = mock.context.theme, style = mock.props.style, fullScreenMode = mock.state.fullScreenMode;
    var prefixStyle = theme.prefixStyle;
    return {
        root: prefixStyle(fullScreenMode ? {
            pointerEvents: "all",
            position: "fixed",
            display: "inline-block",
            width: "100%",
            height: "100%",
            fontSize: 14,
            color: theme.baseHigh,
            background: theme.altHigh
        } : __assign({ pointerEvents: "all", position: "relative", display: "inline-block", fontSize: 14, color: theme.baseHigh, background: theme.altHigh }, style))
    };
}
exports.default = MediaPlayer;

});

var MediaPlayer = unwrapExports(MediaPlayer_1);
var MediaPlayer_2 = MediaPlayer_1.MediaPlayer;

/* 将 Youtube 播放器和本地播放器抽象为 Partial<HTMLVideoElement> */
class AbstractVideoElement extends events_1 {
    constructor(ref, url = ref instanceof HTMLVideoElement ? ref.src : ref.props.url, player = ref instanceof HTMLVideoElement ? null : ref.reactPlayer) {
        super();
        this.ref = ref;
        this.url = url;
        this.player = player;
        this.registeredEvents = new Map();
        this.UnknownState = new Error('Unknown Video Player State');
        this.destroyed = false;
        this.timers = [];
        this.untilReady = new Promise((resolve, reject) => ((this.ready = () => (resolve(), this.onReady())), (this.readyFail = reject)));
        this.isTrustedSeek = true;
        this.isTrustedStatus = true;
        let timer;
        this.timers.push((timer = setInterval(() => {
            if (this.rawPlayer) {
                clearInterval(timer);
                this.destroyed ? this.readyFail() : this.ready();
            }
        }, 200)));
    }
    get rawPlayer() {
        if (this.ref instanceof HTMLVideoElement)
            return this.ref;
        if (this.player.player && this.player.player.player) {
            if (this.player.player.player instanceof HTMLVideoElement)
                return this.player.player.player;
            else if (this.player.player.player.getPlayerState)
                return this.player.player.player;
        }
    }
    onReady() {
        const player = this.rawPlayer;
        //#region Seeked Event
        if (this.isPlayerNative(player)) {
            player.addEventListener('seeked', event => {
                if (this.destroyed)
                    return;
                this.emitComposedEvent('seeked');
                this.isTrustedSeek = true;
            });
        }
        else if (this.isPlayerYoutube(player)) {
            let lastTime = this.currentTime;
            this.timers.push(setInterval(() => {
                if (this.destroyed)
                    return;
                if (Math.abs(this.currentTime - lastTime) > 2) {
                    this.emitComposedEvent('seeked');
                }
                this.isTrustedSeek = true;
                lastTime = this.currentTime;
            }, 1000));
        }
        //#endregion
        //#region Play Event
        if (this.isPlayerNative(player)) {
            player.addEventListener('play', event => {
                if (this.destroyed)
                    return;
                this.emitComposedEvent('play');
                this.isTrustedStatus = true;
            });
            player.addEventListener('pause', event => {
                if (this.destroyed)
                    return;
                this.emitComposedEvent('pause');
                this.isTrustedStatus = true;
            });
        }
        else if (this.isPlayerYoutube(player)) {
            player.addEventListener('onStateChange', event => {
                if (this.destroyed)
                    return;
                if (player.getPlayerState() !== 1 && player.getPlayerState() !== 2)
                    return;
                if (this.paused)
                    this.emitComposedEvent('pause');
                else
                    this.emitComposedEvent('play');
            });
        }
        //#endregion
    }
    emitComposedEvent(type) {
        this.emit(type, {
            currentTarget: this,
            type: type,
            isTrusted: type === 'seeked' ? this.isTrustedSeek : this.isTrustedStatus,
        });
    }
    isPlayerNative(player) {
        return player instanceof HTMLVideoElement;
    }
    isPlayerYoutube(player) {
        return !!this.url.match('youtube.');
    }
    get currentTime() {
        if (this.isPlayerNative(this.rawPlayer))
            return this.rawPlayer.currentTime;
        else if (this.isPlayerYoutube(this.rawPlayer))
            return this.player.getCurrentTime();
        throw this.UnknownState;
    }
    set currentTime(time) {
        this.isTrustedSeek = false;
        if (this.isPlayerNative(this.rawPlayer))
            this.rawPlayer.currentTime = time;
        else if (this.isPlayerYoutube(this.rawPlayer))
            this.player.seekTo(time);
    }
    get paused() {
        if (this.isPlayerNative(this.rawPlayer))
            return this.rawPlayer.paused;
        else if (this.isPlayerYoutube(this.rawPlayer)) {
            const state = this.rawPlayer.getPlayerState();
            this.isTrustedStatus = state === 1 || state === 2;
            return state === 2;
        }
        throw this.UnknownState;
    }
    pause() {
        this.isTrustedStatus = false;
        if (this.isPlayerNative(this.rawPlayer))
            this.rawPlayer.pause();
        else if (this.isPlayerYoutube(this.rawPlayer))
            this.rawPlayer.pauseVideo();
    }
    async play() {
        this.isTrustedStatus = false;
        if (this.isPlayerNative(this.rawPlayer))
            this.rawPlayer.play();
        else if (this.isPlayerYoutube(this.rawPlayer))
            this.rawPlayer.playVideo();
    }
    //#region Events
    addEventListener(type, listener) {
        const current = this.registeredEvents.get(type) || [];
        this.registeredEvents.set(type, current.concat(listener));
        this.addListener(type, listener);
    }
    destory() {
        for (const [event, listeners] of this.registeredEvents.entries()) {
            for (const x of listeners) {
                this.removeListener(event, x);
            }
        }
        for (const i of this.timers)
            clearInterval(i);
        this.timers = [];
        this.destroyed = true;
    }
}

const orig = document.exitFullscreen;
document.exitFullscreen = async () => {
    try {
        await orig.bind(document)();
    }
    catch (e) {
        if (e.message !== 'Document not active')
            throw e;
    }
};
let firstLoad = true;
function useVideo(session, name, ref) {
    const store = getStore(session);
    const chatRoom = getChatroom(session, name);
    react_5(() => {
        if (!ref)
            return;
        const video = new AbstractVideoElement(ref);
        let node = store.get('currentTime');
        let node2 = store.get('isPlaying');
        const PublishProgressToRemote = () => {
            store.get('currentTime').put(video.currentTime);
        };
        video.untilReady.then(() => {
            // 同步远程的进度
            node = node.on(time => {
                console.info(`远程进度=${time} 本地进度=${video.currentTime}`);
                if (Math.abs(time - video.currentTime) < 2)
                    return;
                console.info(`与远程同步进度 ${time}`);
                video.currentTime = time;
            });
            // 同步播放状态
            node2 = node2.on(data => {
                if (data === undefined)
                    return false;
                console.info(`播放状态 远程=${data}, 本地=${!video.paused}`);
                if (!video.paused !== data)
                    data ? video.play() : video.pause();
            });
            // 广播本地事件
            video.addEventListener('seeked', event => {
                if (!event.isTrusted)
                    return;
                const time = video.currentTime;
                store.get('currentTime').put(time);
                chatRoom.broadcast(messages.JUMPED(time));
            });
            const playingStatus = (event) => {
                if (!event.isTrusted)
                    return;
                store.get('isPlaying').put(!video.paused);
                getChatroom(session, name).broadcast(!video.paused ? messages.RESUMED : messages.PAUSED);
                console.info('同步播放状态', !video.paused);
            };
            video.addEventListener('play', playingStatus);
            video.addEventListener('pause', playingStatus);
            addEventListener('sync-progress', PublishProgressToRemote);
        });
        return () => {
            video.destory();
            node.off();
            node2.off();
            removeEventListener('sync-progress', PublishProgressToRemote);
        };
    });
}
function Site(props) {
    const chatRoom = getChatroom(props.session, props.name);
    const ref = react.useRef(null);
    if (firstLoad && props.src.match('youtube.')) {
        chatRoom.broadcastLocal('Youtube 视频如果黑屏，请尝试刷新重新进入');
        firstLoad = false;
    }
    useVideo(props.session, props.name, ref.current);
    const media = matchMedia('(max-width: 850px)');
    const [height, setHeight] = react_1(media.matches ? '50vh' : '100vh');
    react_5(() => {
        const l = () => setHeight(media.matches ? '50vh' : '100vh');
        media.addListener(l);
        return () => media.removeListener(l);
    });
    return (react.createElement("div", { style: { flex: 7 }, className: "videoPlayer" },
        react.createElement(MediaPlayer, { ref: ref, width: '100%', height: height, url: props.src })));
}
function Extension(props) {
    useVideo(props.session, props.name, props.workWith);
    return react.createElement(react.Fragment, null, " ");
}
function MediaPlayer$1 (props) {
    if (props.workWith)
        return react.createElement(Extension, Object.assign({}, props));
    else
        return react.createElement(Site, Object.assign({}, props));
}

var keycode = createCommonjsModule(function (module, exports) {
// Source: http://jsfiddle.net/vWx8V/
// http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes

/**
 * Conenience method returns corresponding value for given keyName or keyCode.
 *
 * @param {Mixed} keyCode {Number} or keyName {String}
 * @return {Mixed}
 * @api public
 */

function keyCode(searchInput) {
  // Keyboard Events
  if (searchInput && 'object' === typeof searchInput) {
    var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode;
    if (hasKeyCode) searchInput = hasKeyCode;
  }

  // Numbers
  if ('number' === typeof searchInput) return names[searchInput]

  // Everything else (cast to string)
  var search = String(searchInput);

  // check codes
  var foundNamedKey = codes[search.toLowerCase()];
  if (foundNamedKey) return foundNamedKey

  // check aliases
  var foundNamedKey = aliases[search.toLowerCase()];
  if (foundNamedKey) return foundNamedKey

  // weird character?
  if (search.length === 1) return search.charCodeAt(0)

  return undefined
}

/**
 * Compares a keyboard event with a given keyCode or keyName.
 *
 * @param {Event} event Keyboard event that should be tested
 * @param {Mixed} keyCode {Number} or keyName {String}
 * @return {Boolean}
 * @api public
 */
keyCode.isEventKey = function isEventKey(event, nameOrCode) {
  if (event && 'object' === typeof event) {
    var keyCode = event.which || event.keyCode || event.charCode;
    if (keyCode === null || keyCode === undefined) { return false; }
    if (typeof nameOrCode === 'string') {
      // check codes
      var foundNamedKey = codes[nameOrCode.toLowerCase()];
      if (foundNamedKey) { return foundNamedKey === keyCode; }
    
      // check aliases
      var foundNamedKey = aliases[nameOrCode.toLowerCase()];
      if (foundNamedKey) { return foundNamedKey === keyCode; }
    } else if (typeof nameOrCode === 'number') {
      return nameOrCode === keyCode;
    }
    return false;
  }
};

exports = module.exports = keyCode;

/**
 * Get by name
 *
 *   exports.code['enter'] // => 13
 */

var codes = exports.code = exports.codes = {
  'backspace': 8,
  'tab': 9,
  'enter': 13,
  'shift': 16,
  'ctrl': 17,
  'alt': 18,
  'pause/break': 19,
  'caps lock': 20,
  'esc': 27,
  'space': 32,
  'page up': 33,
  'page down': 34,
  'end': 35,
  'home': 36,
  'left': 37,
  'up': 38,
  'right': 39,
  'down': 40,
  'insert': 45,
  'delete': 46,
  'command': 91,
  'left command': 91,
  'right command': 93,
  'numpad *': 106,
  'numpad +': 107,
  'numpad -': 109,
  'numpad .': 110,
  'numpad /': 111,
  'num lock': 144,
  'scroll lock': 145,
  'my computer': 182,
  'my calculator': 183,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  "'": 222
};

// Helper aliases

var aliases = exports.aliases = {
  'windows': 91,
  '⇧': 16,
  '⌥': 18,
  '⌃': 17,
  '⌘': 91,
  'ctl': 17,
  'control': 17,
  'option': 18,
  'pause': 19,
  'break': 19,
  'caps': 20,
  'return': 13,
  'escape': 27,
  'spc': 32,
  'spacebar': 32,
  'pgup': 33,
  'pgdn': 34,
  'ins': 45,
  'del': 46,
  'cmd': 91
};

/*!
 * Programatically add the following
 */

// lower case chars
for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32;

// numbers
for (var i = 48; i < 58; i++) codes[i - 48] = i;

// function keys
for (i = 1; i < 13; i++) codes['f'+i] = i + 111;

// numpad keys
for (i = 0; i < 10; i++) codes['numpad '+i] = i + 96;

/**
 * Get by code
 *
 *   exports.name[13] // => 'Enter'
 */

var names = exports.names = exports.title = {}; // title for backward compat

// Create reverse mapping
for (i in codes) names[codes[i]] = i;

// Add aliases
for (var alias in aliases) {
  codes[alias] = aliases[alias];
}
});
var keycode_1 = keycode.code;
var keycode_2 = keycode.codes;
var keycode_3 = keycode.aliases;
var keycode_4 = keycode.names;
var keycode_5 = keycode.title;

var AddBlurEvent_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var AddBlurEvent = /** @class */ (function () {
    function AddBlurEvent() {
        var _this = this;
        this.cleanEvent = function () {
            if (_this.clickListener) {
                document.documentElement.removeEventListener("click", _this.clickListener);
                _this.clickListener = null;
            }
            if (_this.keydownListener) {
                document.documentElement.removeEventListener("keydown", _this.keydownListener);
                _this.keydownListener = null;
            }
        };
        this.setConfig = function (config) {
            var addListener = config.addListener, blurCallback = config.blurCallback, clickIncludeElm = config.clickIncludeElm, clickExcludeElm = config.clickExcludeElm, blurKeyCodes = config.blurKeyCodes;
            if (addListener) {
                if (!_this.clickListener) {
                    _this.clickListener = function (e) {
                        if (clickIncludeElm) {
                            if (Array.isArray(clickIncludeElm) ? clickIncludeElm.some(function (elm) { return elm === e.target; }) : clickIncludeElm === e.target) {
                                _this.cleanEvent();
                                blurCallback(e);
                            }
                            return;
                        }
                        if (clickExcludeElm) {
                            if (Array.isArray(clickExcludeElm) ? clickExcludeElm.some(function (elm) { return elm.contains(e.target); }) : clickExcludeElm.contains(e.target)) {
                                return;
                            }
                            else {
                                _this.cleanEvent();
                                blurCallback(e);
                            }
                        }
                    };
                    document.documentElement.addEventListener("click", _this.clickListener);
                }
                if (!_this.keydownListener && blurKeyCodes) {
                    _this.keydownListener = function (e) {
                        var keyCode = e.keyCode;
                        if (blurKeyCodes.includes(keyCode)) {
                            blurCallback(e);
                        }
                        _this.cleanEvent();
                    };
                    document.documentElement.addEventListener("keydown", _this.keydownListener);
                }
            }
            else {
                _this.cleanEvent();
            }
        };
    }
    return AddBlurEvent;
}());
exports.default = AddBlurEvent;

});

unwrapExports(AddBlurEvent_1);

var AppBarButton = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });




var AppBarButtonButton = /** @class */ (function (_super) {
    __extends(AppBarButtonButton, _super);
    function AppBarButtonButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppBarButtonButton.prototype.render = function () {
        var _a = this.props, icon = _a.icon, iconStyle = _a.iconStyle, hoverStyle = _a.hoverStyle, label = _a.label, className = _a.className, labelPosition = _a.labelPosition, attributes = __rest(_a, ["icon", "iconStyle", "hoverStyle", "label", "className", "labelPosition"]);
        var theme = this.context.theme;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            styles: inlineStyles,
            className: "app-bar-button"
        });
        var rootProps = __assign({}, attributes, { style: styles.root.style, className: theme.classNames(className, styles.root.className) });
        return (react.createElement(PseudoClasses_1.default, __assign({}, attributes, { style: styles.root.style, className: theme.classNames(className, styles.root.className) }),
            react.createElement("div", null,
                react.createElement(Icon_1.default, { style: inlineStyles.icon }, icon),
                labelPosition !== "collapsed" && react.createElement("p", __assign({}, styles.label), label))));
    };
    AppBarButtonButton.defaultProps = {
        labelPosition: "bottom"
    };
    AppBarButtonButton.contextTypes = { theme: propTypes.object };
    return AppBarButtonButton;
}(react.Component));
exports.AppBarButtonButton = AppBarButtonButton;
function getStyles(AppBarButtonButton) {
    var context = AppBarButtonButton.context, _a = AppBarButtonButton.props, labelPosition = _a.labelPosition, style = _a.style, iconStyle = _a.iconStyle, hoverStyle = _a.hoverStyle;
    var theme = context.theme;
    var prefixStyle = theme.prefixStyle;
    var flexDirection = {
        "bottom": "column",
        "right": "row",
        "left": "row-reverse"
    };
    var isRight = labelPosition === "right";
    return {
        root: prefixStyle(__assign({ fontSize: 14, color: theme.baseMediumHigh, background: "none", display: "flex", flexDirection: flexDirection[labelPosition], alignItems: "center", justifyContent: "flex-start", flex: "0 0 auto", height: "100%", padding: "0 10px", maxWidth: isRight ? 120 : 72, cursor: "default", transition: "all .25s", "&:hover": hoverStyle || {
                background: theme.listAccentLow
            } }, style)),
        label: {
            lineHeight: isRight ? void 0 : 1,
            height: isRight ? void 0 : 28,
            fontSize: 12,
            width: "100%",
            textAlign: "center",
            textOverflow: "ellipsis",
            overflow: "hidden"
        },
        icon: prefixStyle(__assign({ width: 48, height: 48, lineHeight: "48px", fontSize: 18 }, iconStyle))
    };
}
exports.default = AppBarButtonButton;

});

var AppBarButton$1 = unwrapExports(AppBarButton);
var AppBarButton_1 = AppBarButton.AppBarButtonButton;

var Separator_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });


var Separator = /** @class */ (function (_super) {
    __extends(Separator, _super);
    function Separator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Separator.prototype.render = function () {
        var _a = this.props, direction = _a.direction, style = _a.style, className = _a.className, attributes = __rest(_a, ["direction", "style", "className"]);
        var isColumn = direction === "column";
        var theme = this.context.theme;
        var styleClasses = theme.prepareStyle({
            style: theme.prefixStyle(__assign({ display: isColumn ? "inline-block" : "block", flex: "0 0 auto", width: isColumn ? 1 : "100%", height: isColumn ? "100%" : 1, background: theme.baseLow, margin: "0 auto" }, style)),
            className: "separator",
            extendsClassName: className
        });
        return (react.createElement("span", __assign({}, attributes, styleClasses)));
    };
    Separator.defaultProps = {
        direction: "row"
    };
    Separator.contextTypes = { theme: propTypes.object };
    return Separator;
}(react.Component));
exports.Separator = Separator;
exports.default = Separator;

});

unwrapExports(Separator_1);
var Separator_2 = Separator_1.Separator;

var AppBarSeparator_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });


var AppBarSeparator = /** @class */ (function (_super) {
    __extends(AppBarSeparator, _super);
    function AppBarSeparator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppBarSeparator.prototype.render = function () {
        return (react.createElement(Separator_1.default, { direction: this.props.direction, style: __assign({ margin: "10px 0" }, this.props.style) }));
    };
    AppBarSeparator.defaultProps = {
        direction: "column"
    };
    return AppBarSeparator;
}(react.Component));
exports.default = AppBarSeparator;

});

unwrapExports(AppBarSeparator_1);

var CommandBar_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });







var CommandBar = /** @class */ (function (_super) {
    __extends(CommandBar, _super);
    function CommandBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            currExpanded: _this.props.expanded
        };
        _this.addBlurEvent = new AddBlurEvent_1.default();
        _this.addBlurEventMethod = function () {
            _this.addBlurEvent.setConfig({
                addListener: _this.state.currExpanded,
                clickExcludeElm: _this.rootElm,
                blurCallback: function () {
                    _this.setState({
                        currExpanded: false
                    });
                },
                blurKeyCodes: [keycode.codes.esc]
            });
        };
        _this.toggleExpanded = function (currExpanded) {
            if (typeof currExpanded === "boolean") {
                if (currExpanded !== _this.state.currExpanded)
                    _this.setState({ currExpanded: currExpanded });
            }
            else {
                _this.setState(function (prevState, prevProps) { return ({ currExpanded: !prevState.currExpanded }); });
            }
        };
        return _this;
    }
    CommandBar.prototype.componentWillReceiveProps = function (nextProps) {
        var expanded = nextProps.expanded;
        if (this.state.currExpanded !== expanded) {
            this.setState({ currExpanded: expanded });
        }
    };
    CommandBar.prototype.componentDidMount = function () {
        this.addBlurEventMethod();
    };
    CommandBar.prototype.componentDidUpdate = function () {
        this.addBlurEventMethod();
    };
    CommandBar.prototype.componentWillUnmount = function () {
        this.addBlurEvent.cleanEvent();
    };
    CommandBar.prototype.render = function () {
        var _this = this;
        var _a = this.props, content = _a.content, contentStyle = _a.contentStyle, contentNode = _a.contentNode, labelPosition = _a.labelPosition, primaryCommands = _a.primaryCommands, secondaryCommands = _a.secondaryCommands, flowDirection = _a.flowDirection, expanded = _a.expanded, isMinimal = _a.isMinimal, verticalPosition = _a.verticalPosition, background = _a.background, attributes = __rest(_a, ["content", "contentStyle", "contentNode", "labelPosition", "primaryCommands", "secondaryCommands", "flowDirection", "expanded", "isMinimal", "verticalPosition", "background"]);
        var currExpanded = this.state.currExpanded;
        var theme = this.context.theme;
        var defaultHeight = isMinimal ? 24 : 48;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "command-bar",
            styles: inlineStyles
        });
        return (react.createElement("div", __assign({}, styles.wrapper, { ref: function (rootElm) { return _this.rootElm = rootElm; } }),
            react.createElement("div", __assign({}, attributes, styles.root),
                (content !== void 0 || contentNode !== void 0) && (react.createElement("div", __assign({}, styles.content), content || contentNode)),
                react.createElement("div", __assign({}, styles.commands),
                    (isMinimal && !currExpanded) || react.Children.toArray(primaryCommands).filter(function (child) { return (child.type === AppBarButton.default || child.type === AppBarSeparator_1.default); }).map(function (child, index) { return (react.cloneElement(child, {
                        labelPosition: labelPosition,
                        key: index,
                        style: child.type === AppBarSeparator_1.default ? {
                            height: 24
                        } : void 0
                    })); }),
                    react.createElement(AppBarButton.default, { labelPosition: "bottom", style: inlineStyles.moreLegacy, iconStyle: {
                            maxWidth: defaultHeight,
                            height: defaultHeight,
                            lineHeight: isMinimal ? (expanded ? "48px" : "24px") : "48px"
                        }, icon: "MoreLegacy", onClick: this.toggleExpanded }),
                    secondaryCommands && (react.createElement(ListView_1.default, { style: inlineStyles.secondaryCommands, listSource: secondaryCommands.map(function (itemNode) {
                            if (itemNode.type === AppBarSeparator_1.default) {
                                itemNode = react.cloneElement(itemNode, { direction: "row" });
                                return { itemNode: itemNode, disabled: true, style: { padding: "0 8px" } };
                            }
                            return { itemNode: itemNode, onClick: _this.toggleExpanded };
                        }) }))))));
    };
    CommandBar.defaultProps = {
        labelPosition: "bottom",
        verticalPosition: "top"
    };
    CommandBar.contextTypes = { theme: propTypes.object };
    return CommandBar;
}(react.Component));
exports.CommandBar = CommandBar;
function getStyles(commandBar) {
    var theme = commandBar.context.theme, _a = commandBar.props, style = _a.style, flowDirection = _a.flowDirection, labelPosition = _a.labelPosition, content = _a.content, contentNode = _a.contentNode, contentStyle = _a.contentStyle, primaryCommands = _a.primaryCommands, isMinimal = _a.isMinimal, verticalPosition = _a.verticalPosition, background = _a.background, currExpanded = commandBar.state.currExpanded;
    var prefixStyle = theme.prefixStyle;
    var inBottom = verticalPosition !== "top";
    var notChangeHeight = labelPosition !== "bottom";
    var haveContent = content || contentNode;
    var transition = "all .125s ease-in-out";
    var isReverse = flowDirection === "row-reverse";
    var defaultHeight = isMinimal ? 24 : 48;
    var expandedHeight = 72;
    var changedHeight;
    if (isMinimal) {
        changedHeight = currExpanded ? (notChangeHeight ? 48 : 72) : defaultHeight;
    }
    else {
        changedHeight = (currExpanded && !notChangeHeight && primaryCommands) ? expandedHeight : defaultHeight;
    }
    return {
        wrapper: theme.prefixStyle(__assign({ height: inBottom ? "auto" : defaultHeight, display: "block", zIndex: currExpanded ? theme.zIndex.commandBar : void 0 }, style)),
        root: prefixStyle({
            position: "relative",
            display: "flex",
            flexDirection: flowDirection || (haveContent ? "row" : "row-reverse"),
            alignItems: "flex-start",
            justifyContent: haveContent ? "space-between" : "flex-start",
            fontSize: 14,
            color: theme.baseMediumHigh,
            background: background || (theme.useFluentDesign ? theme.listLow : theme.altHigh),
            height: changedHeight,
            transition: transition
        }),
        content: prefixStyle(__assign({ height: defaultHeight, lineHeight: defaultHeight + "px", paddingLeft: 10, paddingRight: 10 }, contentStyle)),
        commands: prefixStyle({
            display: "flex",
            flexDirection: flowDirection,
            alignItems: "flex-start",
            height: "100%"
        }),
        moreLegacy: theme.prefixStyle({
            height: changedHeight,
            transition: transition
        }),
        secondaryCommands: {
            width: "auto",
            maxWidth: 240,
            zIndex: theme.zIndex.commandBar,
            position: "absolute",
            right: isReverse ? void 0 : 0,
            left: isReverse ? 0 : void 0,
            top: inBottom ? void 0 : changedHeight,
            bottom: inBottom ? changedHeight : void 0,
            transform: "translate3d(0, " + (currExpanded ? 0 : -8) + "px, 0)",
            opacity: currExpanded ? 1 : 0,
            pointerEvents: currExpanded ? "all" : "none"
        }
    };
}
exports.default = CommandBar;

});

var CommandBar = unwrapExports(CommandBar_1);
var CommandBar_2 = CommandBar_1.CommandBar;

const ListNode = function (data) {
    const _ = messages.getString(data.data) || data.data;
    const node = {
        chat: data => `${data.from}: ${data.text}`,
        system: data => (react.createElement(Typography, null, ty => react.createElement("span", { style: Object.assign({}, ty.caption, { color: 'rgba(255, 255, 255, 0.6)' }) }, data.text))),
    };
    return {
        itemNode: (react.createElement(CustomAnimate, { key: data.time, children: (node[_.type] || node.chat)(_), leaveStyle: {
                opacity: 0,
                transform: 'translateY(-48px)',
                willChange: 'margin-top',
            }, enterStyle: {
                opacity: 1,
                transform: 'translateY(0)',
                willChange: 'margin-top',
            } })),
        disabled: _.type === 'system',
        style: _.type === 'system' ? {} : {},
    };
};
function Chatboard(props) {
    const data = props.data.map(ListNode);
    return (react.createElement("aside", null,
        react.createElement(CommandBar, { labelPosition: "right", flowDirection: "row", contentNode: react.createElement(Typography, null, ty => react.createElement("h5", { style: Object.assign({}, ty.title, { lineHeight: '48px' }) }, "Chat")), primaryCommands: [
                react.createElement(AppBarButton$1, { icon: "Upload", label: "\u540C\u6B65\u8FDB\u5EA6", onClick: () => dispatchEvent(new Event('sync-progress')) }),
            ], secondaryCommands: [
                react.createElement(AppBarButton$1, { icon: "Clear", label: "\u6E05\u9664\u901A\u77E5", onClick: () => dispatchEvent(new Event('clear-notification')) }),
            ] }),
        react.createElement(Input, { onCommit: props.onNewMessage, autoFocus: true, clearOnCommit: true, icon: "Send", style: { width: '100%' } }),
        react.createElement("div", { className: "list" },
            react.createElement(ListView, { listSource: data, style: {
                    width: '100%',
                    border: 'none',
                    wordBreak: 'break-all',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    padding: 0,
                } }))));
}
function ChatboardLogic(props) {
    const chatRoom = getChatroom(props.session, name);
    const [data, setData] = react.useState(chatRoom.messages);
    react.useEffect(() => {
        chatRoom.addAllMessageChangeListener(setData);
        return () => (chatRoom.removeAllMessageChangeListener(setData), void 0);
    });
    return react.createElement(Chatboard, { max: chatRoom.MAX, data: data, onNewMessage: chatRoom.broadcast });
}

function Main(props) {
    return (react.createElement("main", null,
        react.createElement(MediaPlayer$1, { session: props.session, name: props.name, src: props.src, workWith: props.workWith }),
        react.createElement(ChatboardLogic, { session: props.session, name: props.name })));
}

var AppState;
(function (AppState) {
    AppState[AppState["ChooseVideo"] = 0] = "ChooseVideo";
    AppState[AppState["SetName"] = 1] = "SetName";
    AppState[AppState["SetSessionID"] = 2] = "SetSessionID";
    AppState[AppState["Main"] = 3] = "Main";
})(AppState || (AppState = {}));
function Application({ workWith }) {
    const [state, setState] = react_1(AppState.SetSessionID);
    const [video, setVideo] = react_1('https://www.youtube.com/watch?v=MOrwW6avyGU');
    const [name, setName] = react_1(Math.random().toString());
    const [session, setSession] = react_1('test-session' + new Date().getDate() + new Date().getHours());
    if (workWith && state === AppState.ChooseVideo)
        setState(AppState.SetName);
    switch (state) {
        case AppState.SetSessionID:
            return react.createElement(AskSession, { onNext: val => (setSession(val), setState(AppState.ChooseVideo)) });
        case AppState.ChooseVideo:
            return react.createElement(ChooseVideo, { session: session, onNext: val => (setVideo(val), setState(AppState.SetName)) });
        case AppState.SetName:
            return react.createElement(AskName, { onNext: val => (setName(val), setState(AppState.Main)) });
        case AppState.Main:
            return react.createElement(Main, { workWith: workWith, name: name, src: video, session: session });
        default:
            throw new TypeError('Invalid application state');
    }
}

function App(props) {
    return (react.createElement(Theme_3, { theme: Object.assign({}, Theme_2({
            themeName: 'dark',
            useFluentDesign: true,
        }), { fonts: {
                sansSerifFonts: 'NO-Segoe UI, Microsoft YaHei, Open Sans, sans-serif, Hiragino Sans GB, Arial, Lantinghei SC, STHeiti, WenQuanYi Micro Hei, SimSun',
                segoeMDL2Assets: 'Segoe MDL2 Assets',
            } }) },
        react.createElement(Application, { workWith: props.video }),
        react.createElement(GlobalToast, null)));
}
const container = document.createElement('div');
container.style.position = 'absolute';
container.style.bottom = '0';
container.style.right = '0';
document.body.append(container);
const shadowRoot = container.attachShadow({ mode: 'open' });
window.shadowRoot = shadowRoot;
function Switch() {
    const [video, setVideo] = react_1(null);
    if (video)
        return react.createElement(App, { video: video });
    return (react.createElement(Theme_3, { theme: Theme_2({
            themeName: 'light',
            desktopBackgroundImage: 'https://sync-watch.vola.xyz/abstract-3205415_1920.jpg',
        }) },
        react.createElement(Button, { onClick: () => {
                const video = document.querySelector('video');
                container.style.width = '30vw';
                container.style.height = '100vh';
                container.style.zIndex = '1000';
                container.style.background = 'black';
                container.dataset.syncWatch = 'extension';
                const player = document.querySelector('.player');
                player.style.position = 'absolute';
                player.style.width = '70vw';
                player.style.left = '0';
                player.style.top = '0';
                player.style.zIndex = '1000000';
                document.body.style.overflow = 'hidden';
                document.querySelector('.bilibili-player-video-btn-widescreen').style.display =
                    'none';
                document.querySelector('.bilibili-player-video-web-fullscreen').style.display =
                    'none';
                setVideo(video);
                // setTimeout(() => {
                //     const styles = [...document.querySelectorAll('style')]
                //         .filter(
                //             x =>
                //                 x &&
                //                 x.innerText &&
                //                 (x.innerText.match('theme-root') || x.innerText.match('text-box-input')),
                //         )
                //         .map(x => x.innerText)
                //         .reduce((x, y) => x + y)
                //     setStyle(styles)
                // }, 200)
            } }, "\u6253\u5F00 Sync watch")));
}
reactDom.render(react.createElement(Switch, null), shadowRoot);
