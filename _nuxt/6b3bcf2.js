(window.webpackJsonp=window.webpackJsonp||[]).push([[24,8,9,13],{268:function(t,e,n){var content=n(295);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(67).default)("69ebdbb6",content,!0,{sourceMap:!1})},269:function(t,e,n){var content=n(297);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(67).default)("8d45604e",content,!0,{sourceMap:!1})},285:function(t,e,n){"use strict";n.r(e);n(42);var o=n(5),r=n(11),c=n(17),l=n(18),d=n(9),f=n(8),v=(n(21),n(35)),h=n(13),m=Object(h.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("svg",t._g({staticClass:"icon-copy_svg__svg-inline--fa icon-copy_svg__fa-copy icon-copy_svg__fa-w-14",attrs:{"aria-hidden":"true","data-prefix":"far","data-icon":"copy",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512"}},t.$listeners),[n("path",{attrs:{fill:"currentColor",d:"M433.941 65.941l-51.882-51.882A48 48 0 00348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 00-14.059-33.941zM266 464H54a6 6 0 01-6-6V150a6 6 0 016-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 01-6 6zm128-96H182a6 6 0 01-6-6V54a6 6 0 016-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 01-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 011.757 4.243V112z"}})])}),[],!1,null,null,null).exports;function x(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=Object(d.a)(t);if(e){var r=Object(d.a)(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return Object(l.a)(this,n)}}var _=function(t,e,n,desc){var o,r=arguments.length,c=r<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(c=(r<3?o(c):r>3?o(e,n,c):o(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c},w=function(t){Object(c.a)(n,t);var e=x(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(r.a)(n,[{key:"copyToClipboard",value:function(){this.$refs.loginUrl.select(),document.execCommand("copy"),alert("コピーしました")}}]),n}(v.c);_([Object(v.b)({default:function(){return{phone:"",memo:"",loginKey:""}}})],w.prototype,"newPatient",void 0),_([Object(v.b)({default:!1})],w.prototype,"sended",void 0);var y=w=_([Object(v.a)({components:{CopyIcon:m}})],w),C=(n(296),Object(h.a)(y,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h2",[t._v("登録完了")]),t._v(" "),t.sended?n("p",[t._v("\n    ログイン用のURLを記載したメッセージを送信しました。"),n("br"),t._v("\n    患者に受信の確認をしてください。\n  ")]):t._e(),t._v(" "),n("dl",{staticClass:"registrationList"},[n("dt",{staticClass:"registrationTitle"},[t._v("携帯電話番号")]),t._v(" "),n("dd",{staticClass:"registrationItem"},[t._v(t._s(t.newPatient.phone))]),t._v(" "),t.newPatient.memo?n("dt",{staticClass:"registrationTitle"},[t._v("メモ")]):t._e(),t._v(" "),t.newPatient.memo?n("dd",{staticClass:"registrationItem"},[t._v("\n      "+t._s(t.newPatient.memo)+"\n    ")]):t._e(),t._v(" "),n("dt",{staticClass:"registrationTitle"},[t._v("患者ログインURL")]),t._v(" "),n("dd",{staticClass:"registrationItem"},[n("div",{staticClass:"fieldWithIcon"},[n("input",{ref:"loginUrl",staticClass:"inputFieldReadOnly",attrs:{type:"text",readonly:""},domProps:{value:t.$config.clientUrl+"/login/"+t.newPatient.loginKey}}),t._v(" "),n("CopyIcon",{staticClass:"icon",on:{click:t.copyToClipboard}})],1)])]),t._v(" "),t.sended?n("div",{staticClass:"registrationMessage"},[t._m(0),t._v(" "),n("a",{staticClass:"registrationTextLink",attrs:{href:""}},[t._v("メッセージを再送する")])]):t._e()])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"registrationText"},[t._v("\n      送信に少々お時間がかかる場合があります。"),n("br"),t._v(" "),n("br"),t._v("\n      しばらく経ってもメッセージが届かない場合は以下をご確認ください。"),n("br"),t._v(" "),n("br"),t._v("\n      • 端末がSMSの受信を制限していないかどうか"),n("br"),t._v("\n      • 電話番号の入力に間違いがないかどうか"),n("br"),t._v(" "),n("br"),t._v("\n      メッセージが届かない場合は、再送をお試しください。\n    ")])}],!1,null,"70c16f15",null));e.default=C.exports},286:function(t,e,n){"use strict";n.r(e);var o=n(0),r=n(287),c=o.a.extend({components:{CloseIcon:r.a},props:{show:{type:Boolean,default:!1}},data:function(){return{showContent:!1}}}),l=(n(294),n(13)),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"modalWrapTransition"},on:{"after-enter":function(e){t.showContent=!0}}},[t.show?n("div",{staticClass:"modalWrap",on:{click:function(e){t.showContent?t.showContent=!1:t.$emit("close")}}},[n("transition",{attrs:{name:"modalContentTransition"},on:{"after-leave":function(e){return t.$emit("close")}}},[t.showContent?n("div",{staticClass:"modalContent",on:{click:function(t){t.stopPropagation()}}},[n("div",{staticClass:"closeButton",on:{click:function(e){t.showContent=!1}}},[n("CloseIcon")],1),t._v(" "),n("div",{staticClass:"modalContentBody"},[t._t("default")],2)]):t._e()])],1):t._e()])}),[],!1,null,"6fa06916",null);e.default=component.exports},287:function(t,e,n){"use strict";var o=n(13),component=Object(o.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("svg",t._g({attrs:{width:"55",height:"55",viewBox:"0 0 55 55",xmlns:"http://www.w3.org/2000/svg"}},t.$listeners),[n("path",{attrs:{d:"M33.786 27.5l19.17-19.126a4.477 4.477 0 00-6.33-6.331L27.5 21.213 8.373 2.044a4.477 4.477 0 00-6.33 6.33L21.213 27.5 2.043 46.626a4.458 4.458 0 000 6.331 4.459 4.459 0 006.33 0L27.5 33.787l19.126 19.17a4.458 4.458 0 006.33 0 4.458 4.458 0 000-6.33L33.787 27.5z"}})])}),[],!1,null,null,null);e.a=component.exports},294:function(t,e,n){"use strict";n(268)},295:function(t,e,n){var o=n(66)(!1);o.push([t.i,".modalWrap[data-v-6fa06916]{position:fixed;top:0;left:0;z-index:7000;width:100%;height:100%;background-color:rgba(84,84,84,.85)}.modalWrapTransition-enter[data-v-6fa06916],.modalWrapTransition-leave-to[data-v-6fa06916]{opacity:0}.modalWrapTransition-enter-active[data-v-6fa06916],.modalWrapTransition-leave-active[data-v-6fa06916]{transition:all .15s ease-in-out}.modalContent[data-v-6fa06916]{position:absolute;top:0;left:50%;width:80%;max-width:520px;min-height:50%;max-height:calc(100vh - 100px);padding:22px 10px 40px;margin:50px 0;background-color:#fff;border-radius:10px;transform:translate(-50%)}.modalContentTransition-enter[data-v-6fa06916],.modalContentTransition-leave-to[data-v-6fa06916]{opacity:0;transform:translate(-50%,50px)}.modalContentTransition-enter-active[data-v-6fa06916],.modalContentTransition-leave-active[data-v-6fa06916]{transition:all .25s ease-in-out}.modalContentBody[data-v-6fa06916]{max-height:calc(100vh - 200px);padding:0 30px;overflow-y:auto}.closeButton[data-v-6fa06916]{position:absolute;top:24px;right:24px;cursor:pointer}.closeButton svg[data-v-6fa06916]{width:16px;height:16px}",""]),t.exports=o},296:function(t,e,n){"use strict";n(269)},297:function(t,e,n){var o=n(66)(!1);o.push([t.i,".registrationTitle[data-v-70c16f15]{margin:24px 0 8px}.registrationItem[data-v-70c16f15]{font-weight:600;margin-left:0}.registrationMessage[data-v-70c16f15]{background-color:#f2f2f2;margin:24px 0 0;padding:16px}.registrationText[data-v-70c16f15]{margin:0 0 32px}.registrationTextLink[data-v-70c16f15]{color:#05a}.fieldWithIcon[data-v-70c16f15]{display:flex;justify-content:space-between;align-items:center}.inputFieldReadOnly[data-v-70c16f15]{width:calc(100% - 30px);padding:8px}.icon[data-v-70c16f15]{width:20px}",""]),t.exports=o},312:function(t,e,n){var content=n(327);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(67).default)("b2477754",content,!0,{sourceMap:!1})},322:function(t,e,n){"use strict";var o=n(13),component=Object(o.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("svg",t._g({attrs:{width:"10",height:"10",viewBox:"0 0 10 10",xmlns:"http://www.w3.org/2000/svg"}},t.$listeners),[n("path",{attrs:{d:"M9.286 3.929H6.07V.714A.714.714 0 005.357 0h-.714a.714.714 0 00-.714.714V3.93H.714A.714.714 0 000 4.643v.714c0 .395.32.714.714.714H3.93v3.215c0 .394.32.714.714.714h.714c.395 0 .714-.32.714-.714V6.07h3.215c.394 0 .714-.32.714-.714v-.714a.714.714 0 00-.714-.714z"}})])}),[],!1,null,null,null);e.a=component.exports},326:function(t,e,n){"use strict";n(312)},327:function(t,e,n){var o=n(66)(!1);o.push([t.i,".pageHeader[data-v-37b4418c]{display:flex;justify-content:space-between;margin-bottom:20px}.pageTitle[data-v-37b4418c]{margin:0}.newPatientBtn[data-v-37b4418c]{display:block;width:122px}",""]),t.exports=o},351:function(t,e,n){var content=n(364);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(67).default)("c403c882",content,!0,{sourceMap:!1})},358:function(t,e,n){"use strict";n.r(e);var o=n(0),r=n(266),c=n(322),l=n(286),d=n(300),f=n(285),v=o.a.extend({components:{ActionButton:r.default,PlusIcon:c.a,ModalBase:l.default,PatientRegister:d.default,PatientRegistered:f.default},props:{text:{type:String,default:""},isLoggedIn:{type:Boolean,default:!1}},data:function(){return{showModal:!1,registered:!1}}}),h=(n(326),n(13)),component=Object(h.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"pageHeader"},[n("h2",{staticClass:"pageTitle"},[t._v("\n      "+t._s(t.text)+"\n    ")]),t._v(" "),t.isLoggedIn?n("ActionButton",{staticClass:"newPatientBtn",attrs:{theme:"primary",size:"M","is-inline":!0},on:{click:function(e){t.showModal=!0}}},[n("PlusIcon"),t._v("\n      新規患者\n    ")],1):t._e()],1),t._v(" "),n("ModalBase",{attrs:{show:t.showModal},on:{close:function(e){t.showModal=!1}}},[t.registered?n("PatientRegistered",{on:{"click-reset":function(e){t.registered=!1}}}):n("PatientRegister",{on:{"click-register":function(e){t.registered=!0}}})],1)],1)}),[],!1,null,"37b4418c",null);e.default=component.exports;installComponents(component,{ActionButton:n(266).default,PatientRegister:n(300).default,PatientRegistered:n(285).default,ModalBase:n(286).default})},363:function(t,e,n){"use strict";n(351)},364:function(t,e,n){var o=n(66)(!1);o.push([t.i,".logoImage[data-v-7ed10842]{display:block;margin:0 auto;max-width:108px;width:100%;filter:drop-shadow(0 0 20px rgba(196,198,204,.3))}.formArea[data-v-7ed10842]{max-width:600px;width:100%;margin:48px auto 40px;padding:56px 80px;background:#fff;border-radius:10px;box-shadow:0 0 20px 0 rgba(196,198,204,.3)}.pageTitle[data-v-7ed10842]{margin:0 0 40px;text-align:center}.inputContainer[data-v-7ed10842]{margin:40px 0 0;width:100%}.inputItem[data-v-7ed10842]{display:block;margin-bottom:32px}.loginBtn[data-v-7ed10842]{max-width:280px;width:100%;display:block;margin:0 auto}",""]),t.exports=o},376:function(t,e,n){"use strict";n.r(e);n(42);var o=n(5),r=n(11),c=n(17),l=n(18),d=n(9),f=n(8),v=(n(21),n(35)),h=n(358),m=n(291),x=n(49),_=n(189);function w(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=Object(d.a)(t);if(e){var r=Object(d.a)(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return Object(l.a)(this,n)}}var y=function(t,e,n,desc){var o,r=arguments.length,c=r<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(c=(r<3?o(c):r>3?o(e,n,c):o(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c},C=function(t){Object(c.a)(n,t);var e=w(n);function n(){var t;return Object(o.a)(this,n),(t=e.apply(this,arguments)).user={username:"",password:""},t.message="",t.loading=!1,t}return Object(r.a)(n,[{key:"handleLogin",value:function(){var t=this;this.user.username&&this.user.password&&(this.loading=!0,this.$nuxt.$loading.start(),x.authStore.login(this.user).then((function(e){t.$nuxt.$loading.finish(),t.loading=!1,x.nursesStore.load(e.username).then((function(e){var n=e.manageCenters;1===n.length?t.$router.push("/center/".concat(n[0].centerId)):t.$router.push("/")}))}),(function(e){console.error(e),t.$nuxt.$loading.finish(),t.loading=!1,t.message="ログインに失敗しました。"})))}}]),n}(v.c),O=C=y([Object(v.a)({layout:"simple",components:{PageHeader:h.default,InputField:m.default,Logo:_.a}})],C),j=(n(363),n(13)),component=Object(j.a)(O,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Logo",{staticClass:"logoImage"}),t._v(" "),n("div",{staticClass:"formArea"},[n("h2",{staticClass:"pageTitle"},[t._v("ログイン")]),t._v(" "),n("div",{staticClass:"inputContainer"},[n("InputField",{staticClass:"inputItem",attrs:{label:"ログインID"},model:{value:t.user.username,callback:function(e){t.$set(t.user,"username",e)},expression:"user.username"}}),t._v(" "),n("InputField",{staticClass:"inputItem",attrs:{label:"パスワード",type:"password"},model:{value:t.user.password,callback:function(e){t.$set(t.user,"password",e)},expression:"user.password"}})],1),t._v(" "),n("div",[n("ActionButton",{staticClass:"loginBtn",attrs:{theme:"primary",size:"L"},on:{click:function(e){return t.handleLogin()}}},[t._v("\n        ログイン\n      ")])],1)])],1)}),[],!1,null,"7ed10842",null);e.default=component.exports;installComponents(component,{InputField:n(291).default,ActionButton:n(266).default})}}]);