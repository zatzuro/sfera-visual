import { demoData } from "../demo-data.js";

export const TEST_TEAMS = Object.freeze(["NAC1","NAC2","NAC3","NAC4","NAC5","MUS"]);
export const TEST_ROLES = Object.freeze(["dr","ad","ld","vw","dg","ag"]);
const money = (x)=>Math.round(x);

export function testData(role="dr",team="NAC1"){
 if(!TEST_ROLES.includes(role))throw new Error("Unsupported TEST role");
 if(!TEST_TEAMS.includes(team))throw new Error("Unsupported TEST team");
 const base=demoData(role==="dg"||role==="ag"?"dr":role);
 const all=TEST_TEAMS.map((teamId,i)=>{
   const fc=money(190000000+i*17000000),py=30000000+i*1500000,pa=10000000+i*1000000,pl=6000000+i*700000;
   const real=140000000+i*12000000,budget=285000000+i*21000000,prior=265000000+i*16000000;
   return {teamId,fc,py,pa,pl,real,budget,prior,forecast:fc+py+pa};
 });
 const selected=["ld","vw"].includes(role)?all.filter(t=>t.teamId===team):all;
 const national=(rows)=>rows.reduce((o,r)=>{for(const k of ["fc","py","pa","pl","real","budget","prior","forecast"])o[k]=(o[k]||0)+(r[k]||0);return o;},{});
 const items=[
  ["Industrias Aurora TEST","Industria","Radio"],
  ["Servicios Horizonte TEST","Servicios","Digital"],
  ["Academia Futuro TEST","Educación","Radio"],
  ["Viajes Vanguardia TEST","Turismo","Digital"]
 ];
 const working=items.map(([client,group,medium],i)=>{
  const multiplier=TEST_TEAMS.indexOf(team)+1;
  return {rowKey:"TEST-"+team+"-"+i,teamId:team,client,clientId:"C"+i,
   clientRealId:"CR"+i,clientType:i===0?"Continuo creciente":"Nuevo en el periodo",
   unified:client,clientReal:client,executiveId:"E-"+team,executive:"Ejecutivo Simulado",
   medium,group,agency:"Agencia Inventada",holding:"Holding Ficticio",
   real:money(30000000+i*4000000+multiplier*1000000),budget:money(50000000+i*7000000),
   prior:money(28000000+i*3000000),fc:money(32000000+i*3500000),
   py:money(4000000+i*500000),pa:money(1000000+i*250000),pl:money(2000000),
   diligenceStatus:i===1?"PENDING":"CONFIRMED"};
 });
 // Deliberately visible TEST-only data for PR #95: two official source facts
 // lacking editable WORKING lines. Without these, the KPI correction is invisible
 // in SFERA Visual although the production frontend logic has changed.
 const sourceResiduals=[
  {key:"TEST-ONLY-"+team+"-CPD",teamId:team,clientId:"CPD",
   clientRealId:"CR-CPD",unified:"CLIENTE POR DESARROLLAR TEST",
   raw:"CLIENTE POR DESARROLLAR TEST",executiveId:"E-"+team,
   executive:"Ejecutivo Simulado",medium:"Digital",
   agency:"Agencia Inventada",holding:"Holding Ficticio",
   negotiation:"",clientType:"",sourceOnly:true,
   sourceReason:"CLIENTE_POR_DESARROLLAR",
   real:7000000,budget:12000000,prior:0,fc:0,py:0,pa:0,pl:0},
  {key:"TEST-ONLY-"+team+"-SIN-MEDIO",teamId:team,clientId:"CSM",
   clientRealId:"CR-CSM",unified:"FUENTE SIN MEDIO TEST",
   raw:"FUENTE SIN MEDIO TEST",executiveId:"E-"+team,
   executive:"Ejecutivo Simulado",medium:"",
   agency:"Agencia Inventada",holding:"Holding Ficticio",
   negotiation:"",clientType:"",sourceOnly:true,
   sourceReason:"SIN_LINEA_DE_TRABAJO",
   real:5000000,budget:8000000,prior:0,fc:0,py:0,pa:0,pl:0}
 ];
 const exec={executiveId:"E-"+team,executive:"Ejecutivo Simulado",
  totals:{real:working.reduce((s,x)=>s+x.real,0),budget:working.reduce((s,x)=>s+x.budget,0)},
  clients:working.map(w=>({clientId:w.clientId,unified:w.unified,clientType:w.clientType,
   rawClients:[{rawName:w.client,clientRealId:w.clientRealId,lines:[{rowKeys:[w.rowKey],medium:w.medium,
     real:w.real,budget:w.budget,prior:w.prior,fc:w.fc,py:w.py,pa:w.pa,pl:w.pl}]}]}))};
 const overall=national(selected);
 const dimensionRows=working.map((w,i)=>({id:w.executiveId+"-"+i,name:w.client,forecast:w.fc+w.py+w.pa,
  real:w.real,prior:w.prior,budget:w.budget,activeClients:1,growth:5,media:[{name:w.medium}]}));
 return {...base,ok:true,demo:true,mega:false,fullAccess:false,synthetic:true,
  role,teamId:["ld","vw"].includes(role)?team:null,
  period:"2026-10",periods:[{id:"2026-10",label:"Octubre 2026"}],stage:"W2",
  stageLabel:"Semana 2 · TEST",availableStages:["ARR","W1","W2","W3","PRE","LATEST"],
  stageEditable:role==="ld",stageState:"OPEN",stageStates:TEST_TEAMS.map(teamId=>({teamId,stage:"W2",state:"OPEN"})),
  working,previousOfficial:working.map(w=>({...w,fc:w.fc-1500000})),
  workbenchHierarchy:{priorYear:2025,executives:[exec],sourceResiduals},
  summary:{teams:selected,national:overall},
  deliveries:TEST_TEAMS.map((teamId,i)=>({teamId,stage:i%2?"W1":"W2",state:i%2?"SUBMITTED":"OPEN",delivery:i%2?"A TIEMPO":"PENDIENTE",dueAt:"2026-10-30"})),
  history:TEST_TEAMS.map((teamId,i)=>({teamId,stage:"W1",version:1,submittedAt:"2026-10-12 08:00",forecast:all[i].forecast})),
  analytics:{...base.analytics,clients:working.map(w=>({clientName:w.client,forecast:w.fc+w.py+w.pa,prior:w.prior,delta:w.fc+w.py+w.pa-w.prior}))},
  dimensionDashboard:{dimension:"EXECUTIVE",period:"2026-10",rows:dimensionRows,
    totals:{forecast:overall.forecast,real:overall.real,prior:overall.prior,budget:overall.budget},
    reconciliation:{forecast:{matches:true,difference:0},real:{matches:true,difference:0}},comparable:true},
  access:[{id:"SUPERUSUARIO-TEST",role:"TEST",teamId:"FICTICIO",active:true,mega:true,self:true}],
  admin:{...base.admin,audit:[{at:"2026-10-22 10:00",actorRef:"TEST_ONLY",action:"SIMULATED",stage:"W2",entityId:"FICTICIO"}]},
  objectives:TEST_TEAMS.map(x=>({teamId:x,amount:all.find(t=>t.teamId===x).budget,manual:false})),
  certainty:[],canEditCalendar:false,calendarTree:[],
  negData:{ok:true,synthetic:true,negotiations:[],tasks:[],alerts:[],rows:[]}
 };
}
