(this["webpackJsonpsocial-network-start2"]=this["webpackJsonpsocial-network-start2"]||[]).push([[3],{294:function(e,a,t){e.exports={dialogs:"Dialogs_dialogs__3XOsK",dialogsItems:"Dialogs_dialogsItems__3y4Zk",messages:"Dialogs_messages__bENN2"}},295:function(e,a,t){e.exports={item:"DialogItem_item__3JCnx",active:"DialogItem_active__15kWL"}},296:function(e,a,t){e.exports={message:"Message_message__2GKTy"}},300:function(e,a,t){"use strict";t.r(a);var n=t(0),s=t.n(n),i=t(131),r=t(294),c=t.n(r),o=t(295),l=t.n(o),m=t(20),u=function(e){var a="/dialogs/"+e.id;return s.a.createElement("div",{className:l.a.item},s.a.createElement(m.b,{to:a,activeClassName:l.a.active},e.name))},g=t(296),d=t.n(g),b=function(e){return s.a.createElement("div",{className:d.a.message},e.message)},f=t(10),E=t(90),p=t(128),v=t(66),_=t(54),h=Object(_.a)(50),O=Object(p.a)({form:"dialogAddMessageForm"})((function(e){return s.a.createElement("form",{onSubmit:e.handleSubmit},s.a.createElement("div",null,s.a.createElement(E.a,{component:v.b,validate:[_.b,h],name:"newMessageText",placeholder:"Enter message"})),s.a.createElement("div",null,s.a.createElement("button",null,"Send message")))})),j=function(e){var a=e.dialogsPage,t=a.dialogs.map((function(e){return s.a.createElement(u,{name:e.name,key:e.id,id:e.id})})),n=a.messages.map((function(e){return s.a.createElement(b,{message:e.message,key:e.id})}));return e.isAuth?s.a.createElement("div",{className:c.a.dialogs},s.a.createElement("div",{className:c.a.dialogsItems},t),s.a.createElement("div",{className:c.a.messages},s.a.createElement("div",null,n)),s.a.createElement(O,{onSubmit:function(a){e.addMessage(a.newMessageText)}})):s.a.createElement(f.a,{to:"/login"})},k=t(15),N=t(33),w=t(34),x=t(36),y=t(35),M=function(e){return{isAuth:e.auth.isAuth}},A=t(8);a.default=Object(A.d)(Object(k.b)((function(e){return{dialogsPage:e.dialogsPage}}),(function(e){return{addMessage:function(a){e(Object(i.a)(a))}}})),(function(e){var a=function(a){Object(x.a)(n,a);var t=Object(y.a)(n);function n(){return Object(N.a)(this,n),t.apply(this,arguments)}return Object(w.a)(n,[{key:"render",value:function(){return this.props.isAuth?s.a.createElement(e,this.props):s.a.createElement(f.a,{to:"/login"})}}]),n}(s.a.Component);return Object(k.b)(M)(a)}))(j)}}]);
//# sourceMappingURL=3.e05beb01.chunk.js.map