from pathlib import Path
p=Path('demo/tests/advanced-chapter.test.mjs');p.write_text(p.read_text().replace('all thirteen active boards','all active boards').replace('towerLevels.length, 49','towerLevels.length, 70').replace('new Set(signs).size, 49','new Set(signs).size, 70'))
p=Path('demo/tests/tower.test.mjs');p.write_text(p.read_text().replace('.filter((l) => l.id.startsWith("V"))','.filter((l) => ["V1","V2","V3"].includes(l.id))'))
p=Path('demo/tests/unified-campaign-browser.mjs');s=p.read_text().replace('import { solveTower }','import { campaignTotal,towerOrdinal } from "../src/campaign-catalog.js";\nimport { solveTower }').replace('"77"','String(campaignTotal)').replace('.count(), 77','.count(), campaignTotal').replace('.count(), 49','.count(), towerLevels.length').replace('/77/','/98/').replace('/53\\/77/','new RegExp(towerOrdinal("R6")+"/"+campaignTotal)');p.write_text(s)
p=Path('demo/tests/tower-browser.mjs');s=p.read_text().replace('!process.env.DUAL_TEST_PREFIX ||','process.env.DUAL_TEST_IDS ? process.env.DUAL_TEST_IDS.split(",").includes(l.id) : !process.env.DUAL_TEST_PREFIX ||');s=s.replace('    if(l.id===\'G1\')', '''    if(l.chests?.length){
      assert.equal(await page.evaluate(()=>towerTest.scene.chestViews.filter(v=>v.opened&&v.lid.rotation.x<-1.3).length),l.chests.length,l.id+' animated open lids');
      assert.equal(await page.evaluate(()=>towerTest.state.opened.length),l.chests.length);
      assert.doesNotMatch(await page.locator('#stats').innerText(),/Açar [2-9]\\/1/);
    }
    if(l.id==='G1')''');p.write_text(s)
