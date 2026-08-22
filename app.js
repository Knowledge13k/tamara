const data = window.TAMARA_DATA;
let activeSegment = 'all';

const byId = id => document.getElementById(id);
const initials = name => name.split(' ').map(p=>p[0]).slice(0,2).join('');
const visibleData = () => activeSegment === 'all' ? data : data.filter(d=>d.group===activeSegment);

function renderKPIs(){
  const rows = visibleData();
  byId('heroCount').textContent = rows.length;
  const pct = (n,d=rows.length) => d ? Math.round((n/d)*100)+'%' : '0%';
  byId('blackShare').textContent = pct(rows.filter(d=>d.group==='black').length);
  byId('founderShare').textContent = pct(rows.filter(d=>d.founder).length);
  byId('executiveShare').textContent = pct(rows.filter(d=>d.executive).length);
  byId('visibilityAvg').textContent = rows.length ? Math.round(rows.reduce((a,b)=>a+b.visibility,0)/rows.length) : 0;
}

function avg(group,key){
  const rows = data.filter(d=>d.group===group);
  return Math.round(rows.reduce((sum,d)=>sum+d[key],0)/rows.length);
}

function renderBars(){
  const metrics=[['Technical influence','technical'],['Leadership','leadership'],['Ecosystem reach','ecosystem'],['Public visibility','visibility']];
  byId('barChart').innerHTML = metrics.map(([label,key])=>`
    <div class="bar-row">
      <div class="bar-label">${label}</div>
      <div class="bar-pair">
        <div class="bar black" style="width:${avg('black',key)}%" title="Black women mock avg: ${avg('black',key)}"></div>
        <div class="bar other" style="width:${avg('other',key)}%" title="Other women mock avg: ${avg('other',key)}"></div>
      </div>
    </div>`).join('');
}

function renderSpotlight(){
  const rows = visibleData();
  const pick = [...rows].sort((a,b)=>(b.technical+b.leadership+b.ecosystem)-(a.technical+a.leadership+a.ecosystem))[0] || data[0];
  byId('spotlight').innerHTML = `<div class="spotlight-card">
      <div class="avatar">${initials(pick.name)}</div>
      <h4>${pick.name}</h4>
      <span class="chip">${pick.field}</span><span class="chip">${pick.group==='black'?'Black woman':'Other woman'}</span>
      <p>${pick.highlight}</p>
    </div>`;
}

function renderRoleMix(){
  const rows = visibleData();
  const founders = rows.filter(d=>d.founder).length;
  const pctFounder = rows.length ? Math.round(founders/rows.length*100) : 0;
  byId('roleMix').innerHTML = `<div class="donut" style="background:conic-gradient(var(--accent) 0 ${pctFounder}%, #ded8cd ${pctFounder}% 100%)">
      <div class="donut-label"><strong>${pctFounder}%</strong><span>founder / investor</span></div>
    </div>`;
}

function renderBubbles(){
  const rows = visibleData();
  byId('bubbleChart').innerHTML = rows.map(d=>{
    const size = 56 + Math.max(0,d.visibility-70)*1.2;
    return `<div class="bubble ${d.group}" style="width:${size}px;height:${size}px" title="${d.name}: mock visibility ${d.visibility}">${d.name}</div>`;
  }).join('');
}

function renderLeaders(filter=''){
  const term = filter.trim().toLowerCase();
  const rows = visibleData().filter(d=> [d.name,d.role,d.field].join(' ').toLowerCase().includes(term));
  byId('leaderGrid').innerHTML = rows.map(d=>`<article class="leader-card">
    <div class="avatar">${initials(d.name)}</div>
    <h3>${d.name}</h3>
    <div class="role">${d.role}</div>
    <span class="chip">${d.field}</span>
    <div class="mini-metrics">
      <div class="mini-metric"><strong>${d.leadership}</strong><span>Leadership*</span></div>
      <div class="mini-metric"><strong>${d.visibility}</strong><span>Visibility*</span></div>
    </div>
  </article>`).join('');
}

function renderComparison(){
  const rows = visibleData();
  byId('comparisonTable').innerHTML = `<table>
    <thead><tr><th>Name</th><th>Segment</th><th>Field</th><th>Technical*</th><th>Leadership*</th><th>Ecosystem*</th><th>Visibility*</th></tr></thead>
    <tbody>${rows.map(d=>`<tr><td><strong>${d.name}</strong></td><td>${d.group==='black'?'Black woman':'Other woman'}</td><td>${d.field}</td><td>${d.technical}</td><td>${d.leadership}</td><td>${d.ecosystem}</td><td>${d.visibility}</td></tr>`).join('')}</tbody>
  </table>`;
}

function renderAll(){
  renderKPIs(); renderBars(); renderSpotlight(); renderRoleMix(); renderBubbles(); renderLeaders(byId('searchInput')?.value||''); renderComparison();
}

document.querySelectorAll('.nav-item').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active-view'));
  btn.classList.add('active'); byId(btn.dataset.view).classList.add('active-view');
}));

byId('segmentFilter').addEventListener('change', e=>{activeSegment=e.target.value; renderAll();});
byId('resetBtn').addEventListener('click',()=>{activeSegment='all'; byId('segmentFilter').value='all'; byId('searchInput').value=''; renderAll();});
byId('searchInput').addEventListener('input',e=>renderLeaders(e.target.value));
renderAll();
