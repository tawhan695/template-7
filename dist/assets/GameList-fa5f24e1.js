import{_ as I,J as S,d as y,G as q,e as T,r as w,o as u,c as f,a as e,F as L,l as M,x as C,w as b,s as B,h as k,t as G,p as R,i as V}from"./index-62e784bc.js";const A={name:"VIP GameList",data(){return{SLOT_LIST:S,gameList:[],isRequest:!1,slothack:null,slotgame:null}},setup(){const s=y(),c=q(),h=T();return{auth:s,config:c,option:h}},async created(){this.slothack=this.option.vipgamelist,this.slotgame=this.option.vipgamelist,this.isRequest=!0,(new Date(this.option.code_max_timeout).getTime()-new Date().getTime()<1&&this.option.game_max_list||this.option.code_max_timeout==null)&&this.$router.push("/viphackslot")},mounted(){document.getElementById("intergramRoot").style.display="none";class s{constructor(t){this.el=t,this.chars="!<>-_\\/[]{}—=+*^?#________",this.update=this.update.bind(this)}setText(t){const r=this.el.innerText,n=Math.max(r.length,t.length),_=new Promise(a=>this.resolve=a);this.queue=[];for(let a=0;a<n;a++){const p=r[a]||"",g=t[a]||"",m=Math.floor(Math.random()*40),i=m+Math.floor(Math.random()*40);this.queue.push({from:p,to:g,start:m,end:i})}return cancelAnimationFrame(this.frameRequest),this.frame=0,this.update(),_}update(){let t="",r=0;for(let n=0,_=this.queue.length;n<_;n++){let{from:a,to:p,start:g,end:m,char:i}=this.queue[n];this.frame>=m?(r++,t+=p):this.frame>=g?((!i||Math.random()<.28)&&(i=this.randomChar(),this.queue[n].char=i),t+=`<span class="dud">${i}</span>`):t+=a}this.el.innerHTML=t,r===this.queue.length?this.resolve():(this.frameRequest=requestAnimationFrame(this.update),this.frame++)}randomChar(){return this.chars[Math.floor(Math.random()*this.chars.length)]}}const c=["VIP Hack Slot","","Game Slot"],h=document.querySelector(".text-change"),x=new s(h);let o=0;const d=()=>{x.setText(c[o]).then(()=>{setTimeout(d,3e3)}),o=(o+1)%c.length};d()},methods:{}},l=s=>(R("data-v-d9c70853"),s=s(),V(),s),F={id:"list_"},P=l(()=>e("div",{class:"text-change-container"},[e("div",{class:"text-change"})],-1)),D={class:"d-flex justify-content-center"},H={class:"row",style:{"max-width":"900px"}},O={key:0,class:"d-vip"},E=l(()=>e("p",{class:"hack-vpi"},"HACK VIP",-1)),N=[E],$=["src"],j=l(()=>e("br",null,null,-1)),z=l(()=>e("br",null,null,-1)),J=l(()=>e("br",null,null,-1));function K(s,c,h,x,o,d){const v=w("router-link");return u(),f("div",F,[P,e("div",D,[e("div",H,[(u(!0),f(L,null,M(o.SLOT_LIST,t=>(u(),C(v,{class:"col-6 col-sm-3",key:t.key,value:t.gameId,to:{path:"/viphackslotgames/"+t.gameId}},{default:b(()=>[o.slothack[t.gameId]?(u(),f("div",O,N)):B("",!0),e("img",{class:k([o.slothack[t.gameId]?"w-100 img-game-vip ":"w-100 img-game"]),src:""+t.img},null,10,$),e("p",{class:k([o.slothack[t.gameId]?"text-center  name-vip":"text-center  slot-name"])},G(t.name),3)]),_:2},1032,["value","to"]))),128))])]),j,z,J])}const U=I(A,[["render",K],["__scopeId","data-v-d9c70853"]]);export{U as default};