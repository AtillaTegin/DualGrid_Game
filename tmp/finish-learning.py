from pathlib import Path
p=Path('demo/src/campaign-catalog.js');s=p.read_text();s=s.replace("return campaignCourse[campaignOrdinal(kind,id)]||null;","const pos=campaignOrdinal(kind,id);return pos>0?campaignCourse[pos]||null:null;");p.write_text(s)
p=Path('demo/src/app.js');s=p.read_text();s=s.replace('  campaignTotal,','  campaignTotal,\n  campaignOrdinal,\n  nextCampaignLevel,');s=s.replace('activeCampaignIds.indexOf(l.id) + 1','campaignOrdinal("legacy", l.id)');a=s.index('  $("#next").onclick = () =>\n    won');b=s.index('  $("#result-secondary").onclick',a);s=s[:a]+'''  $("#next").onclick = () => {
    if (!won) return undo();
    const next=nextCampaignLevel('legacy',levels[index].id);
    if(next?.kind==='legacy') load(Number(next.id)-1);
    else location.href=next?.href||'index.html?levels=1';
  };
'''+s[b:];s=s.replace('    b.querySelector("small").textContent = l.difficulty || "ORTA";','    b.querySelector("small").textContent = l.difficulty + (l.learning.optional ? " · İSTƏYƏ BAĞLI" : "");');s += '''\nconst initialLevel=Number(new URLSearchParams(location.search).get('level'));
if(initialLevel && retainedLegacyIds.includes(initialLevel)) load(initialLevel-1);
''';# move chapter sections into course order
marker='$("#levels-menu").onclick = () => {'
s=s.replace(marker,'''// Keep the first five introductory stages before the new learning chapters.
const courseMenu=$('#campaign-grid'), menuSections=[...courseMenu.children];
for(const section of menuSections.filter(s=>s.querySelector('[data-tower]'))) courseMenu.insertBefore(section, menuSections[1]||null);
'''+marker);p.write_text(s)
p=Path('demo/src/lab-app.js');s=p.read_text().replace('campaignTotal, rememberPage','campaignTotal, campaignOrdinal, nextCampaignLevel, rememberPage').replace('activeCampaignIds.indexOf(Number(l.id)) + 1','campaignOrdinal("combination",l.id)');s=s.replace('  if (campaign && next === experiments.length) {\n    location.href = "tower.html#V1";\n    return;\n  }','  if(campaign){ location.href=nextCampaignLevel("combination",l.id)?.href||"index.html?levels=1"; return; }');p.write_text(s)
p=Path('demo/src/tower-app.js');s=p.read_text().replace('  campaignTotal,','  campaignTotal,\n  nextCampaignLevel,');s=s.replace('${level.keys.length}', '${new Set([...level.keys.map(k=>k.id),...(level.chests||[]).map(c=>c.reward)]).size}');s=s.replace('  $("#resources").textContent = [','''  $('#learning').textContent = `${level.difficulty}${level.learning.optional?' · İstəyə bağlı ekspert sınağı':''} · ${level.learning.teaches}`;
  $('#interact').textContent = level.chests?.length?'F · Sandıq / lift / şalter':'F · Lift / şalter';
  $("#resources").textContent = [
    ...(level.chests||[]).map((c,i)=>`Sandıq ${i+1}: ${state.opened.includes(c.id)?'AÇILIB':'KİLİDLİ'}`),
    ...(state.keys||[]).map(k=>level.keyNames?.[k]||k),''');s=s.replace('    level === towerLevels.at(-1)\n      ? "Sınaqlar siyahısına qayıt"','    !nextCampaignLevel("tower",level.id)\n      ? "Səyahət xəritəsinə qayıt"');a=s.index('$("#next").onclick = () => {');b=s.index('$("#layers").onclick',a);s=s[:a]+'''$("#next").onclick = () => {
  const next=nextCampaignLevel('tower',level.id);
  if(next?.kind==='tower') location.hash=next.id;
  else location.href=next?.href||'index.html?levels=1';
};
'''+s[b:];s=s.replace('F bas — şalteri və ya lifti işə sal.','F bas — qonşu sandığı, şalteri və ya lifti işə sal.');p.write_text(s)
p=Path('demo/tower.html');s=p.read_text().replace('<p id="focus"></p>','<p id="learning" class="learning-step"></p>\n          <p id="focus"></p>').replace('şalter<br />P','şalter / sandıq<br />P').replace('Əsas kampaniya dəyişdirilməyib.','Öyrənmə pillələri ilə ardıcıl səyahət.');p.write_text(s)
p=Path('demo/index.html');p.write_text(p.read_text().replace('77','98'))
p=Path('demo/src/tower.css');p.write_text(p.read_text()+'\n.learning-step { border-left: 3px solid #7dddc5; padding: 10px 12px; background: #16333a; color: #bde8dc; font-size: .85rem; line-height: 1.6; }\n')
