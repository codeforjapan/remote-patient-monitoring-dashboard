(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{269:function(t,e,n){var content=n(297);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(67).default)("8d45604e",content,!0,{sourceMap:!1})},285:function(t,e,n){"use strict";n.r(e);n(42);var r=n(5),c=n(11),o=n(17),l=n(18),f=n(9),d=n(8),v=(n(21),n(35)),_=n(13),h=Object(_.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("svg",t._g({staticClass:"icon-copy_svg__svg-inline--fa icon-copy_svg__fa-copy icon-copy_svg__fa-w-14",attrs:{"aria-hidden":"true","data-prefix":"far","data-icon":"copy",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512"}},t.$listeners),[n("path",{attrs:{fill:"currentColor",d:"M433.941 65.941l-51.882-51.882A48 48 0 00348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 00-14.059-33.941zM266 464H54a6 6 0 01-6-6V150a6 6 0 016-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 01-6 6zm128-96H182a6 6 0 01-6-6V54a6 6 0 016-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 01-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 011.757 4.243V112z"}})])}),[],!1,null,null,null).exports;function y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var c=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var m=function(t,e,n,desc){var r,c=arguments.length,o=c<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(o=(c<3?r(o):c>3?r(e,n,o):r(e,n))||o);return c>3&&o&&Object.defineProperty(e,n,o),o},w=function(t){Object(o.a)(n,t);var e=y(n);function n(){return Object(r.a)(this,n),e.apply(this,arguments)}return Object(c.a)(n,[{key:"copyToClipboard",value:function(){this.$refs.loginUrl.select(),document.execCommand("copy"),alert("コピーしました")}}]),n}(v.c);m([Object(v.b)({default:function(){return{phone:"",memo:"",loginKey:""}}})],w.prototype,"newPatient",void 0),m([Object(v.b)({default:!1})],w.prototype,"sended",void 0);var x=w=m([Object(v.a)({components:{CopyIcon:h}})],w),C=(n(296),Object(_.a)(x,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h2",[t._v("登録完了")]),t._v(" "),t.sended?n("p",[t._v("\n    ログイン用のURLを記載したメッセージを送信しました。"),n("br"),t._v("\n    患者に受信の確認をしてください。\n  ")]):t._e(),t._v(" "),n("dl",{staticClass:"registrationList"},[n("dt",{staticClass:"registrationTitle"},[t._v("携帯電話番号")]),t._v(" "),n("dd",{staticClass:"registrationItem"},[t._v(t._s(t.newPatient.phone))]),t._v(" "),t.newPatient.memo?n("dt",{staticClass:"registrationTitle"},[t._v("メモ")]):t._e(),t._v(" "),t.newPatient.memo?n("dd",{staticClass:"registrationItem"},[t._v("\n      "+t._s(t.newPatient.memo)+"\n    ")]):t._e(),t._v(" "),n("dt",{staticClass:"registrationTitle"},[t._v("患者ログインURL")]),t._v(" "),n("dd",{staticClass:"registrationItem"},[n("div",{staticClass:"fieldWithIcon"},[n("input",{ref:"loginUrl",staticClass:"inputFieldReadOnly",attrs:{type:"text",readonly:""},domProps:{value:t.$config.clientUrl+"/login/"+t.newPatient.loginKey}}),t._v(" "),n("CopyIcon",{staticClass:"icon",on:{click:t.copyToClipboard}})],1)])]),t._v(" "),t.sended?n("div",{staticClass:"registrationMessage"},[t._m(0),t._v(" "),n("a",{staticClass:"registrationTextLink",attrs:{href:""}},[t._v("メッセージを再送する")])]):t._e()])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"registrationText"},[t._v("\n      送信に少々お時間がかかる場合があります。"),n("br"),t._v(" "),n("br"),t._v("\n      しばらく経ってもメッセージが届かない場合は以下をご確認ください。"),n("br"),t._v(" "),n("br"),t._v("\n      • 端末がSMSの受信を制限していないかどうか"),n("br"),t._v("\n      • 電話番号の入力に間違いがないかどうか"),n("br"),t._v(" "),n("br"),t._v("\n      メッセージが届かない場合は、再送をお試しください。\n    ")])}],!1,null,"70c16f15",null));e.default=C.exports},296:function(t,e,n){"use strict";n(269)},297:function(t,e,n){var r=n(66)(!1);r.push([t.i,".registrationTitle[data-v-70c16f15]{margin:24px 0 8px}.registrationItem[data-v-70c16f15]{font-weight:600;margin-left:0}.registrationMessage[data-v-70c16f15]{background-color:#f2f2f2;margin:24px 0 0;padding:16px}.registrationText[data-v-70c16f15]{margin:0 0 32px}.registrationTextLink[data-v-70c16f15]{color:#05a}.fieldWithIcon[data-v-70c16f15]{display:flex;justify-content:space-between;align-items:center}.inputFieldReadOnly[data-v-70c16f15]{width:calc(100% - 30px);padding:8px}.icon[data-v-70c16f15]{width:20px}",""]),t.exports=r}}]);