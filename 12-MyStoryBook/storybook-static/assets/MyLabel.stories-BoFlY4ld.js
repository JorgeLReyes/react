import{j as o}from"./jsx-runtime-D_zvdyIk.js";const f=({label:l,size:b="normal",allCaps:x=!1,color:z,fontColor:v})=>o.jsx(o.Fragment,{children:o.jsx("span",{className:`${b} ${z}`,style:{color:v},children:x?l.toUpperCase():l})});f.__docgenInfo={description:"",methods:[],displayName:"MyLabel",props:{label:{required:!0,tsType:{name:"string"},description:"Text to display"},size:{required:!1,tsType:{name:"union",raw:'"h1" | "h2" | "h3" | "normal"',elements:[{name:"literal",value:'"h1"'},{name:"literal",value:'"h2"'},{name:"literal",value:'"h3"'},{name:"literal",value:'"normal"'}]},description:"Label size",defaultValue:{value:'"normal"',computed:!1}},allCaps:{required:!1,tsType:{name:"boolean"},description:"Label cappitalization",defaultValue:{value:"false",computed:!1}},color:{required:!1,tsType:{name:"union",raw:'"text-primary" | "text-secondary" | "text-tertiary"',elements:[{name:"literal",value:'"text-primary"'},{name:"literal",value:'"text-secondary"'},{name:"literal",value:'"text-tertiary"'}]},description:"Label color"},fontColor:{required:!1,tsType:{name:"string"},description:"Label font color"}}};const L={title:"MyLabel",component:f,tags:["autodocs"],parameters:{layout:"centered"},argTypes:{size:{control:"inline-radio",options:["h1","h2","h3","normal"]},color:{control:"select"}}},e={args:{label:"Basic",size:"h1"}},a={args:{label:"AllCaps",size:"h1",allCaps:!0}},r={args:{label:"Secondary",size:"h2",color:"text-secondary"}},s={args:{label:"CustomColor",size:"h1",fontColor:"#147346"}};var t,n,c;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    label: "Basic",
    size: "h1"
  }
}`,...(c=(n=e.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};var i,p,m;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    label: "AllCaps",
    size: "h1",
    allCaps: true
  }
}`,...(m=(p=a.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var d,u,y;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    label: "Secondary",
    size: "h2",
    color: "text-secondary"
  }
}`,...(y=(u=r.parameters)==null?void 0:u.docs)==null?void 0:y.source}}};var h,C,g;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    label: "CustomColor",
    size: "h1",
    fontColor: "#147346"
  }
}`,...(g=(C=s.parameters)==null?void 0:C.docs)==null?void 0:g.source}}};const T=["Basic","AllCaps","Secondary","CustomColor"];export{a as AllCaps,e as Basic,s as CustomColor,r as Secondary,T as __namedExportsOrder,L as default};
