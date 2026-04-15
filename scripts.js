const M = 1e6;

const rows = [
  {tipo:'Royalties - Estadual', nome:'Outras Transf. Comp. Financeiras',    orc26:155748592,  mar26:20951127, tri26:29940887,  tri25:38012728},
  {tipo:'Royalties - Federal',  nome:'Cota-parte Petróleo',                 orc26:131109109,  mar26:7767932,  tri26:21478256,  tri25:28385691},
  {tipo:'Royalties - Federal',  nome:'Excedente Produção Petróleo',          orc26:8198291,    mar26:0,        tri26:0,         tri25:0},
  {tipo:'Royalties - Federal',  nome:'Participação Especial Petróleo',       orc26:2604466,    mar26:274278,   tri26:810047,    tri25:1175527},
  {tipo:'Royalties - Federal',  nome:'FEP - Principal',                      orc26:500000,     mar26:112566,   tri26:487748,    tri25:660582},
  {tipo:'Transf. Estaduais',    nome:'Cota-Parte ICMS (líq.)',               orc26:1480801156, mar26:77782555, tri26:238365507, tri25:320442445},
  {tipo:'Transf. Estaduais',    nome:'Cota-Parte IPVA (líq.)',               orc26:80202497,   mar26:14574090, tri26:44543593,  tri25:40120877},
  {tipo:'Transf. Estaduais',    nome:'Cota-Parte IPI (líq.)',                orc26:49035917,   mar26:1985757,  tri26:5934998,   tri25:9289748},
  {tipo:'Outras Transf.',       nome:'CIDE',                                 orc26:412889,     mar26:0,        tri26:107410,    tri25:88632},
  {tipo:'Outras Transf.',       nome:'CFEM (Minerais)',                      orc26:1757679,    mar26:28353,    tri26:327872,    tri25:354277},
  {tipo:'Outras Transf.',       nome:'FPM (líq.)',                           orc26:117092386,  mar26:7348557,  tri26:29135432,  tri25:27748651},
  {tipo:'IR Federal Retido',    nome:'IRPF',                                 orc26:3311,       mar26:2005222,  tri26:3489114,   tri25:3865150},
  {tipo:'IR Federal Retido',    nome:'IRPJ',                                 orc26:78274099,   mar26:12065,    tri26:24204,     tri25:8655088},
  {tipo:'IR Federal Retido',    nome:'IR Retido — Trabalho',                 orc26:146098859,  mar26:20789032, tri26:27900811,  tri25:42216046},
  {tipo:'IR Federal Retido',    nome:'IR Retido — Outros',                   orc26:568362,     mar26:46781,    tri26:104931,    tri25:47496},
  {tipo:'Tributos Municipais',  nome:'ITBI',                                 orc26:60535948,   mar26:827167,   tri26:3159492,   tri25:9832237},
  {tipo:'Tributos Municipais',  nome:'ISS',                                  orc26:559224082,  mar26:47336312, tri26:150017840, tri25:149292644},
  {tipo:'Tributos Municipais',  nome:'IPTU',                                 orc26:145276447,  mar26:13996607, tri26:77219723,  tri25:84487303},
  {tipo:'Tributos Municipais',  nome:'Taxas',                                orc26:42544584,   mar26:4911314,  tri26:14850553,  tri25:16061897},
  {tipo:'Tributos Municipais',  nome:'CIP — AMPLA',                          orc26:22488546,   mar26:1784251,  tri26:5284061,   tri25:5226387},
  {tipo:'Tributos Municipais',  nome:'CIP — LIGHT',                          orc26:35470338,   mar26:2760822,  tri26:8125259,   tri25:8257812},
];

const tipoCls = {
  'Royalties - Estadual':'t-roy','Royalties - Federal':'t-roy',
  'Transf. Estaduais':'t-est','Outras Transf.':'t-out',
  'IR Federal Retido':'t-ir','Tributos Municipais':'t-trib',
};

const fmtM = v => {
  const a = Math.abs(v);
  if(a >= 1e9) return (v<0?'−':'')+'R$ '+(a/1e9).toFixed(2)+' bi';
  if(a >= 1e6) return (v<0?'−':'')+'R$ '+(a/1e6).toFixed(1)+' mi';
  if(a >= 1e3) return (v<0?'−':'')+'R$ '+(a/1e3).toFixed(0)+' k';
  return (v<0?'−':'')+'R$ '+a.toFixed(0);
};

const tbody = document.getElementById('tbody');
rows.forEach(r => {
  const exec = r.orc26 > 0 ? (r.tri26/r.orc26*100) : 0;
  const vari = r.tri25 > 0 ? ((r.tri26-r.tri25)/r.tri25*100) : null;
  const variStr = vari !== null ? (vari>=0?'+':'')+vari.toFixed(1)+'%' : '—';
  const variCls = vari === null ? '' : (vari>=0?'badge-pos':'badge-neg');
  const barW = Math.min(exec*4, 100);
  tbody.innerHTML += `<tr>
    <td><span class="tipo-pill ${tipoCls[r.tipo]||'t-out'}">${r.tipo}</span></td>
    <td style="max-width:220px;overflow:hidden;text-overflow:ellipsis;color:var(--text2)">${r.nome}</td>
    <td>${fmtM(r.orc26)}</td>
    <td>${fmtM(r.mar26)}</td>
    <td>${fmtM(r.tri26)}</td>
    <td style="color:var(--text2)">${fmtM(r.tri25)}</td>
    <td class="${variCls}">${variStr}</td>
    <td>
      <span style="font-size:10px;color:var(--text2)">${exec.toFixed(1)}%</span>
      <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${barW}%"></div></div>
    </td>
  </tr>`;
});

Chart.defaults.color = 'rgba(15,17,23,0.55)';
Chart.defaults.borderColor = 'rgba(0,0,0,0.06)';
Chart.defaults.font.family = "'Montserrat', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.font.weight = '500';

const grupos = [
  {label:'Royalties',              tri26:(29940887+21478256+0+810047+487748)/M,                   tri25:(38012728+28385691+0+1175527+660582)/M},
  {label:'Transf. Estaduais',      tri26:(238365507+44543593+5934998)/M,                          tri25:(320442445+40120877+9289748)/M},
  {label:'Outras Transferências',  tri26:(107410+327872+29135432)/M,                              tri25:(88632+354277+27748651)/M},
  {label:'IR Retido',              tri26:(3489114+24204+27900811+104931)/M,                       tri25:(3865150+8655088+42216046+47496)/M},
  {label:'Tributos Municipais',    tri26:(3159492+150017840+77219723+14850553+5284061+8125259)/M, tri25:(9832237+149292644+84487303+16061897+5226387+8257812)/M},
];

new Chart(document.getElementById('cDona'), {
  type:'doughnut',
  data:{
    labels:grupos.map(g=>g.label),
    datasets:[{data:grupos.map(g=>+g.tri26.toFixed(1)),backgroundColor:['rgba(196,125,14,0.85)','rgba(0,119,204,0.85)','rgba(100,100,120,0.7)','rgba(0,168,107,0.85)','rgba(214,48,49,0.85)'],borderWidth:0,hoverOffset:6}]
  },
  options:{
    responsive:true,maintainAspectRatio:false,cutout:'72%',
    plugins:{
      legend:{display:true,position:'bottom',labels:{boxWidth:8,padding:14,color:'rgba(15,17,23,0.65)',font:{size:12,weight:'500'}}},
      tooltip:{callbacks:{label:c=>`${c.label}: R$ ${c.raw} mi`}}
    }
  }
});

const topMar = [...rows].filter(r=>r.mar26>100000).sort((a,b)=>b.mar26-a.mar26).slice(0,8);
new Chart(document.getElementById('cBar'), {
  type:'bar',
  data:{
    labels:topMar.map(r=>r.nome.length>30?r.nome.slice(0,30)+'…':r.nome),
    datasets:[{
      label:'Mar/2026',
      data:topMar.map(r=>+(r.mar26/M).toFixed(2)),
      backgroundColor:topMar.map((_,i)=>`hsla(${155+i*18},60%,36%,0.80)`),
      borderRadius:5,borderSkipped:false
    }]
  },
  options:{
    indexAxis:'y',responsive:true,maintainAspectRatio:false,
    plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>'R$ '+c.raw+' mi'}}},
    scales:{
      x:{ticks:{callback:v=>'R$'+v+'mi',font:{size:11,weight:'500'},color:'rgba(15,17,23,0.65)'},grid:{color:'rgba(0,0,0,0.04)'}},
      y:{ticks:{font:{size:11,weight:'500'},color:'rgba(15,17,23,0.70)'},grid:{display:false}}
    }
  }
});

let rubricaChart = null;
let currentMetric = 'tri26';
let currentTypeFilter = 'all';
const metricLabels = {tri26:'1ºTri 2026',tri25:'1ºTri 2025',mar26:'Março 2026',orc26:'Orçado 2026'};
const metricColors = {tri26:'rgba(0,168,107,0.75)',tri25:'rgba(0,119,204,0.65)',mar26:'rgba(196,125,14,0.75)',orc26:'rgba(100,80,200,0.65)'};

function getRubricaData() {
  const filtered = currentTypeFilter==='all' ? rows : rows.filter(r=>r.tipo===currentTypeFilter);
  return {
    labels:filtered.map(r=>r.nome.length>34?r.nome.slice(0,34)+'…':r.nome),
    data:filtered.map(r=>+(r[currentMetric]/M).toFixed(2)),
  };
}

function buildRubricaChart() {
  const {labels,data} = getRubricaData();
  rubricaChart = new Chart(document.getElementById('cRubrica'), {
    type:'bar',
    data:{
      labels,
      datasets:[{label:metricLabels[currentMetric],data,backgroundColor:metricColors[currentMetric],borderRadius:5,borderSkipped:false}]
    },
    options:{
      indexAxis:'y',responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>`${metricLabels[currentMetric]}: R$ ${c.raw} mi`}}},
      scales:{
        x:{ticks:{callback:v=>'R$'+v+'mi',font:{size:11,weight:'500'},color:'rgba(15,17,23,0.65)'},grid:{color:'rgba(0,0,0,0.04)'}},
        y:{ticks:{font:{size:11,weight:'500'},color:'rgba(15,17,23,0.70)'},grid:{display:false}}
      }
    }
  });
}

function updateRubricaChart() {
  if(!rubricaChart) return;
  const {labels,data} = getRubricaData();
  rubricaChart.data.labels = labels;
  rubricaChart.data.datasets[0].data = data;
  rubricaChart.data.datasets[0].label = metricLabels[currentMetric];
  rubricaChart.data.datasets[0].backgroundColor = metricColors[currentMetric];
  rubricaChart.update();
}

function setMetric(metric, btn) {
  currentMetric = metric;
  document.getElementById('metric-filters').querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  updateRubricaChart();
}

function setTypeFilter(tipo, btn) {
  currentTypeFilter = tipo;
  document.getElementById('type-filters').querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  updateRubricaChart();
}

function buildIndicatorCharts() {
  const execPct = [
    {label:'Royalties',              pct:17.7},
    {label:'Transf. Estaduais',      pct:17.9},
    {label:'Outras Transferências',  pct:24.8},
    {label:'IR Retido',              pct:14.0},
    {label:'Tributos Municipais',    pct:29.9},
  ];

  const line25Plugin = {
    id:'line25',
    afterDraw(chart) {
      const {ctx, chartArea:{left,right}, scales:{y}} = chart;
      const yPos = y.getPixelForValue(25);
      ctx.save();
      ctx.beginPath();
      ctx.setLineDash([7,4]);
      ctx.moveTo(left, yPos);
      ctx.lineTo(right, yPos);
      ctx.strokeStyle = 'rgba(214,48,49,0.65)';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(214,48,49,0.85)';
      ctx.font = "600 10px 'Montserrat', sans-serif";
      ctx.textAlign = 'right';
      ctx.fillText('meta 25%', right - 6, yPos - 6);
      ctx.restore();
    }
  };

  new Chart(document.getElementById('cExec'), {
    type:'bar',
    data:{
      labels: execPct.map(g=>g.label),
      datasets:[{
        label:'Execução %',
        data:execPct.map(g=>g.pct),
        backgroundColor:execPct.map(g=>{
          if(g.pct>=25) return 'rgba(0,168,107,0.78)';
          if(g.pct>=15) return 'rgba(196,125,14,0.78)';
          return 'rgba(214,48,49,0.78)';
        }),
        borderRadius:6,borderSkipped:false
      }]
    },
    options:{
      responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>c.raw+'% do orçamento'}}},
      scales:{
        x:{ticks:{autoSkip:false,maxRotation:0,font:{size:12,weight:'600'},color:'rgba(15,17,23,0.75)'},grid:{display:false}},
        y:{ticks:{callback:v=>v+'%',font:{size:11,weight:'500'},color:'rgba(15,17,23,0.60)'},grid:{color:'rgba(0,0,0,0.04)'},min:0,max:36}
      }
    },
    plugins:[line25Plugin]
  });

  new Chart(document.getElementById('cEvol'), {
    type:'bar',
    data:{
      labels:['Royalties','Transf. Estaduais','Outras Transf.','IR Retido','Tributos Municipais'],
      datasets:[
        {label:'2025',data:[68.2,369.8,28.2,54.8,273.2],backgroundColor:'rgba(0,0,0,0.18)',borderRadius:5,borderSkipped:false},
        {label:'2026',data:[52.7,289.0,29.6,31.5,258.7],backgroundColor:'rgba(0,168,107,0.78)',borderRadius:5,borderSkipped:false},
      ]
    },
    options:{
      responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>c.dataset.label+': R$ '+c.raw+' mi'}}},
      scales:{
        x:{ticks:{autoSkip:false,maxRotation:0,font:{size:11,weight:'600'},color:'rgba(15,17,23,0.75)'},grid:{display:false}},
        y:{ticks:{callback:v=>'R$'+v+'mi',font:{size:11,weight:'500'},color:'rgba(15,17,23,0.60)'},grid:{color:'rgba(0,0,0,0.04)'}}
      }
    }
  });
}

function switchTab(id, btn) {
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
  if(id==='tab-rubrica' && !rubricaChart) buildRubricaChart();
  if(id==='tab-icms' && !icmsBuilt) buildIcmsCharts();
}

buildIndicatorCharts();

let icmsBuilt = false;
let icmsDiarioChart = null, icmsMensalChart = null;
let currentIcmsView = 'diario';

const icmsDiario = {
  labels: ["11/01/22","18/01/22","25/01/22","01/02/22","08/02/22","15/02/22","22/02/22","25/02/22","03/03/22","15/03/22","22/03/22","29/03/22","05/04/22","12/04/22","19/04/22","26/04/22","28/04/22","03/05/22","10/05/22","17/05/22","24/05/22","31/05/22","07/06/22","14/06/22","21/06/22","28/06/22","05/07/22","12/07/22","19/07/22","26/07/22","02/08/22","09/08/22","16/08/22","23/08/22","30/08/22","09/09/22","13/09/22","20/09/22","27/09/22","04/10/22","11/10/22","18/10/22","25/10/22","01/11/22","08/11/22","11/11/22","22/11/22","29/11/22","06/12/22","13/12/22","20/12/22","27/12/22","04/01/23","10/01/23","11/01/23","12/01/23","17/01/23","24/01/23","31/01/23","07/02/23","14/02/23","17/02/23","28/02/23","07/03/23","14/03/23","21/03/23","28/03/23","04/04/23","11/04/23","18/04/23","25/04/23","02/05/23","09/05/23","16/05/23","23/05/23","30/05/23","06/06/23","14/06/23","20/06/23","27/06/23","04/07/23","11/07/23","18/07/23","25/07/23","01/08/23","08/08/23","15/08/23","22/08/23","29/08/23","05/09/23","12/09/23","19/09/23","26/09/23","03/10/23","10/10/23","17/10/23","24/10/23","31/10/23","07/11/23","14/11/23","21/11/23","28/11/23","05/12/23","12/12/23","19/12/23","26/12/23","28/12/23","09/01/24","16/01/24","23/01/24","30/01/24","06/02/24","09/02/24","20/02/24","27/02/24","05/03/24","12/03/24","19/03/24","26/03/24","02/04/24","09/04/24","16/04/24","19/04/24","30/04/24","07/05/24","14/05/24","21/05/24","28/05/24","03/06/24","04/06/24","11/06/24","18/06/24","25/06/24","02/07/24","09/07/24","16/07/24","23/07/24","30/07/24","06/08/24","13/08/24","20/08/24","27/08/24","03/09/24","10/09/24","17/09/24","24/09/24","01/10/24","02/10/24","08/10/24","15/10/24","22/10/24","29/10/24","05/11/24","12/11/24","14/11/24","26/11/24","01/12/24","03/12/24","10/12/24","17/12/24","20/12/24","30/12/24","07/01/25","14/01/25","21/01/25","28/01/25","04/02/25","11/02/25","18/02/25","25/02/25","28/02/25","11/03/25","18/03/25","25/03/25","01/04/25","08/04/25","15/04/25","17/04/25","29/04/25","01/05/25","06/05/25","13/05/25","20/05/25","27/05/25","01/06/25","01/06/25","03/06/25","10/06/25","17/06/25","24/06/25","01/07/25","04/07/25","15/07/25","22/07/25","29/07/25","05/08/25","12/08/25","19/08/25","26/08/25","02/09/25","09/09/25","16/09/25","23/09/25","30/09/25","07/10/25","14/10/25","21/10/25","28/10/25","04/11/25","11/11/25","18/11/25","25/11/25","02/12/25","09/12/25","16/12/25","23/12/25","30/12/25","06/01/26","13/01/26","19/01/26","27/01/26","03/02/26","10/02/26","13/02/26","24/02/26","03/03/26","10/03/26","17/03/26","24/03/26","31/03/26"],
  values: [18.99,49.48,15.88,11.27,0.87,30.54,3.19,9.4,7.03,26.91,32.32,10.04,4.44,16.44,48.68,12.27,0.47,11.88,8.41,52.81,6.72,15.07,8.88,13.7,48.77,22.41,5.82,13.99,46.16,18.2,3.38,5.45,53.52,6.68,0.86,6.17,14.68,55.89,17.01,6.22,11.03,40.16,8.29,1.31,8.68,26.4,27.17,8.55,11.19,12.91,3.98,11.01,5.23,2.78,2.97,0.43,54.12,8.51,11.29,5.49,20.43,44.57,8.65,6.73,16.15,46.95,11.18,4.05,7.13,59.25,6.39,11.63,11.33,50.0,6.67,10.06,6.62,11.46,48.38,13.6,0.4,13.59,44.1,8.36,10.26,4.9,30.8,29.73,10.47,6.44,14.85,46.55,13.08,4.96,8.66,54.42,11.97,10.74,6.65,17.21,43.72,10.9,0.92,14.57,46.53,14.09,6.82,8.66,97.97,17.12,16.05,11.63,22.35,64.25,22.13,0.9,18.65,6.51,20.39,5.0,8.51,81.5,17.58,11.91,10.03,46.36,83.17,17.21,0.69,6.88,21.6,88.07,14.09,23.41,1.04,89.88,16.54,10.33,14.68,1.64,8.47,22.16,14.71,9.31,91.87,13.57,23.13,1.73,10.35,50.37,58.17,20.56,6.78,24.24,86.63,18.03,-0.0,24.78,23.32,94.73,17.97,21.54,0.77,23.29,10.6,19.82,11.12,20.4,71.33,13.53,19.69,19.14,72.52,16.01,1.46,23.76,47.27,65.03,15.29,23.76,11.51,21.42,74.09,19.03,-23.76,11.39,8.1,9.18,0.69,11.75,17.13,0.09,34.2,45.62,10.51,7.81,15.93,60.69,16.28,7.84,6.97,70.25,11.17,2.28,11.96,15.83,65.63,13.34,6.14,15.88,64.16,12.76,15.12,6.43,76.81,18.46,16.57,1.57,14.12,65.87,18.82,14.12,7.05,0.71,7.76,12.57,8.79,54.05,9.88,11.94]
};

const icmsMensal = {
  labels: ["Jan/22","Fev/22","Mar/22","Abr/22","Mai/22","Jun/22","Jul/22","Ago/22","Set/22","Out/22","Nov/22","Dez/22","Jan/23","Fev/23","Mar/23","Abr/23","Mai/23","Jun/23","Jul/23","Ago/23","Set/23","Out/23","Nov/23","Dez/23","Jan/24","Fev/24","Mar/24","Abr/24","Mai/24","Jun/24","Jul/24","Ago/24","Set/24","Out/24","Nov/24","Dez/24","Jan/25","Fev/25","Mar/25","Abr/25","Mai/25","Jun/25","Jul/25","Ago/25","Set/25","Out/25","Nov/25","Dez/25","Jan/26","Fev/26","Mar/26"],
  values: [84.35,91.84,76.29,82.29,94.88,93.75,84.17,77.6,93.75,65.69,83.93,74.86,85.33,79.14,81.0,76.83,89.68,80.06,70.01,86.17,80.92,90.76,78.48,91.19,139.81,120.36,113.11,124.5,156.77,131.33,150.53,137.92,129.46,164.32,135.69,182.34,156.82,136.07,107.66,165.92,149.8,85.35,116.25,100.71,119.06,106.76,98.94,133.39,100.38,100.35,97.23]
};

const brentMensal = {
  labels: icmsMensal.labels,
  values: [85.53,94.03,112.46,105.92,111.50,117.66,104.70,97.74,90.32,93.59,91.11,81.34,83.88,83.51,79.21,83.37,75.63,74.93,80.36,85.10,92.77,88.70,82.03,77.32,79.20,81.62,84.67,89.00,82.99,82.89,83.72,78.88,72.64,75.38,73.41,73.13,78.26,74.94,71.47,66.46,63.97,69.35,69.55,67.26,67.55,63.95,63.68,61.63,64.77,69.41,99.60]
};

const ipmData = {
  anos:  ['2022','2023','2024','2025','2026'],
  ipm:   [8.637, 9.29, 14.267, 9.473, 7.483],
  icms:  [1003.4, 989.6, 1686.1, 1476.7, 298.0]
};

const ipmHistorico = {
  anos: ['2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025','2026'],
  ipm:  [8.239, 8.240, 8.455, 8.426, 8.780, 9.257, 9.299, 9.369, 8.939, 8.637, 9.290, 14.267, 9.473, 7.483]
};

function buildIcmsCharts() {
  icmsBuilt = true;

  const labelColor = 'rgba(15,17,23,0.65)';
  const labelFont = {size:11,weight:'500'};

  const meanDiario = 21.3;
  const meanLineDiarioPlugin = {
    id:'meanLineDiario',
    afterDraw(chart){
      const {ctx,chartArea:{left,right},scales:{y}} = chart;
      const yPos = y.getPixelForValue(meanDiario);
      ctx.save();
      ctx.beginPath(); ctx.setLineDash([8,4]);
      ctx.moveTo(left,yPos); ctx.lineTo(right,yPos);
      ctx.strokeStyle='rgba(214,48,49,0.75)'; ctx.lineWidth=1.8; ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle='rgba(214,48,49,0.85)';
      ctx.font="600 10px 'Montserrat',sans-serif";
      ctx.textAlign='right';
      ctx.fillText('média R$ '+meanDiario+' mi', right-6, yPos-5);
      ctx.restore();
    }
  };
  icmsDiarioChart = new Chart(document.getElementById('cIcmsDiario'), {
    type:'bar',
    data:{
      labels: icmsDiario.labels,
      datasets:[{
        label:'Lançamento (R$ mi)',
        data: icmsDiario.values,
        backgroundColor: icmsDiario.values.map(v =>
          v >= 80 ? 'rgba(0,119,204,0.85)' :
          v >= 40 ? 'rgba(0,168,107,0.78)' :
          v >= 15 ? 'rgba(196,125,14,0.68)' :
                  'rgba(0,119,204,0.35)'),
        borderRadius:3, borderSkipped:false
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false}, tooltip:{callbacks:{label:c=>'R$ '+c.raw.toFixed(1)+' mi'}}},
      scales:{
        x:{ticks:{autoSkip:true, maxTicksLimit:24, maxRotation:45, font:labelFont, color:labelColor}, grid:{display:false}},
        y:{ticks:{callback:v=>'R$'+v+'mi', font:labelFont, color:labelColor}, grid:{color:'rgba(0,0,0,0.04)'}}
      }
    },
    plugins:[meanLineDiarioPlugin]
  });

  const meanMensal = 106.94;
  const meanLineMensalPlugin = {
    id:'meanLineMensal',
    afterDraw(chart){
      const {ctx,chartArea:{left,right},scales:{y}} = chart;
      const yPos = y.getPixelForValue(meanMensal);
      ctx.save();
      ctx.beginPath(); ctx.setLineDash([8,4]);
      ctx.moveTo(left,yPos); ctx.lineTo(right,yPos);
      ctx.strokeStyle='rgba(214,48,49,0.75)'; ctx.lineWidth=1.8; ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle='rgba(214,48,49,0.85)';
      ctx.font="600 10px 'Montserrat',sans-serif";
      ctx.textAlign='right';
      ctx.fillText('média R$ '+meanMensal+' mi', right-6, yPos-5);
      ctx.restore();
    }
  };
  icmsMensalChart = new Chart(document.getElementById('cIcmsMensal'), {
    type:'bar',
    data:{
      labels: icmsMensal.labels,
      datasets:[{
        label:'ICMS mensal (R$ mi)',
        data: icmsMensal.values,
        backgroundColor: icmsMensal.labels.map(l=>{
          const y=parseInt(l.split('/')[1])+2000;
          return y===2022?'rgba(0,119,204,0.65)':y===2023?'rgba(0,168,107,0.65)':y===2024?'rgba(196,125,14,0.80)':y===2025?'rgba(214,48,49,0.65)':'rgba(90,60,200,0.70)';
        }),
        borderRadius:5, borderSkipped:false
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>'R$ '+c.raw.toFixed(2)+' mi'}}},
      scales:{
        x:{ticks:{autoSkip:true, maxTicksLimit:20, maxRotation:45, font:labelFont, color:labelColor}, grid:{display:false}},
        y:{ticks:{callback:v=>'R$'+v+'mi', font:labelFont, color:labelColor}, grid:{color:'rgba(0,0,0,0.04)'}}
      }
    },
    plugins:[meanLineMensalPlugin]
  });

  new Chart(document.getElementById('cBrentIcms'), {
    type:'line',
    data:{
      labels: brentMensal.labels,
      datasets:[
        {
          label:'ICMS mensal (R$ mi)',
          data: icmsMensal.values,
          borderColor:'#0077cc', backgroundColor:'rgba(0,119,204,0.07)',
          borderWidth:2, pointRadius:3, pointHoverRadius:5,
          fill:true, tension:0.3, yAxisID:'y'
        },
        {
          label:'Brent (USD/bbl)',
          data: brentMensal.values,
          borderColor:'#c47d0e', backgroundColor:'transparent',
          borderWidth:2, pointRadius:2, pointHoverRadius:4,
          borderDash:[5,3], tension:0.3, yAxisID:'y2'
        }
      ]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      interaction:{mode:'index', intersect:false},
      plugins:{legend:{display:false},tooltip:{callbacks:{label:c=> c.datasetIndex===0?'ICMS: R$ '+c.raw.toFixed(2)+' mi':'Brent: USD '+c.raw.toFixed(1)}}},
      scales:{
        x:{ticks:{autoSkip:true, maxTicksLimit:18, maxRotation:45, font:labelFont, color:labelColor}, grid:{display:false}},
        y:{position:'left',ticks:{callback:v=>'R$'+v+'mi',font:labelFont,color:labelColor},grid:{color:'rgba(0,0,0,0.04)'},title:{display:true,text:'ICMS (R$ mi)',font:{size:11,weight:'500'},color:'rgba(15,17,23,0.50)'}},
        y2:{position:'right',ticks:{callback:v=>v+'$',font:labelFont,color:labelColor},grid:{display:false},title:{display:true,text:'Brent (USD)',font:{size:11,weight:'500'},color:'rgba(15,17,23,0.50)'}}
      }
    }
  });

  new Chart(document.getElementById('cIpmIcms'), {
    type:'bar',
    data:{
      labels: ipmHistorico.anos,
      datasets:[
        {
          type:'bar',
          label:'ICMS anual (R$ mi)',
          data: ipmHistorico.anos.map(a => {
            const idx = ipmData.anos.indexOf(a);
            return idx >= 0 ? ipmData.icms[idx] : null;
          }),
          backgroundColor:'rgba(0,119,204,0.68)',
          borderRadius:8, borderSkipped:false, yAxisID:'y'
        },
        {
          type:'line',
          label:'IPM (%)',
          data: ipmHistorico.ipm,
          borderColor:'#d63031', backgroundColor:'rgba(214,48,49,0.07)',
          borderWidth:2.5, pointRadius:5, pointHoverRadius:8,
          pointBackgroundColor: ipmHistorico.ipm.map(v => v >= 12 ? '#c47d0e' : '#d63031'),
          pointBorderColor: ipmHistorico.ipm.map(v => v >= 12 ? '#c47d0e' : '#d63031'),
          fill:true, tension:0.3, yAxisID:'y2'
        }
      ]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      interaction:{mode:'index', intersect:false},
      plugins:{legend:{display:false},tooltip:{callbacks:{label:c=> c.datasetIndex===0?(c.raw!==null?'ICMS: R$ '+c.raw.toFixed(1)+' mi':'ICMS: sem dado'):'IPM: '+c.raw.toFixed(3)+'%'}}},
      scales:{
        x:{ticks:{font:labelFont,color:labelColor}, grid:{display:false}},
        y:{position:'left',ticks:{callback:v=> v!=null?'R$'+v+'mi':'',font:labelFont,color:labelColor},grid:{color:'rgba(0,0,0,0.04)'},title:{display:true,text:'ICMS (R$ mi)',font:{size:11,weight:'500'},color:'rgba(15,17,23,0.50)'}},
        y2:{position:'right',min:6,max:16,ticks:{callback:v=>v+'%',font:labelFont,color:labelColor},grid:{display:false},title:{display:true,text:'IPM (%)',font:{size:11,weight:'500'},color:'rgba(15,17,23,0.50)'}}
      }
    }
  });
}

function setIcmsView(view, btn) {
  currentIcmsView = view;
  document.querySelectorAll('#tab-icms .filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const diarioWrap = document.getElementById('cIcmsDiario').parentElement;
  const mensalWrap = document.getElementById('cIcmsMensal').parentElement;
  if(view==='diario'){
    diarioWrap.style.display='block'; mensalWrap.style.display='none';
  } else {
    diarioWrap.style.display='none'; mensalWrap.style.display='block';
  }
}
