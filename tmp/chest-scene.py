from pathlib import Path
p=Path('demo/src/tower-scene.js');s=p.read_text();marker='    this.doors = l.doors.map((d) =>';s=s.replace(marker,'''    this.chestViews=(l.chests||[]).map((c,i)=>{
      const base=new T.Group();base.position.set(c.at[0]-this.cx,c.at[2]*H,c.at[1]-this.cz);this.root.add(base);
      this.box(.8,.4,.8,0x48656a,0,.2,0,base);
      for(const x of [-.27,.27])this.box(.065,.42,.82,0xbda16b,x,.21,0,base);
      const lid=new T.Group();lid.position.set(0,.42,-.4);base.add(lid);
      this.box(.84,.13,.84,0x739b9d,0,0,.4,lid);
      const lock=this.box(.14,.2,.09,0xffcd69,0,.34,.44,base);
      const reward=new T.Mesh(new T.OctahedronGeometry(.16),this.material(0xffdb85));this.root.add(reward);reward.visible=false;
      const opened=s.opened.includes(c.id);lid.rotation.x=opened?-1.35:0;lock.visible=!opened;
      this.mark('F'+(i+1),c.at[0]-this.cx,c.at[2]*H+.04,c.at[1]-this.cz+.65,'#ffdb85',.45);
      return {base,lid,lock,reward,opened};
    });
'''+marker);s=s.replace('    for (const d of l.doors)\n      for (const id', '''    const keySource=id=>l.keys.find(k=>k.id===id)?.at||(l.chests||[]).find(c=>c.reward===id)?.at;
    for(const target of [...(l.chests||[]),...(l.portals||[])])for(const id of target.requires?.keys||[]){const from=keySource(id);if(from)line(from,target.at);}
    for (const d of l.doors)
      for (const id''');s=s.replace('    for (const [i, o] of this.keys.entries())','''    for(const [i,v] of this.chestViews.entries()){
      const opened=s.opened.includes(this.l.chests[i].id);
      if(opened!==v.opened){
        v.opened=opened;v.start=now;v.fromAngle=v.lid.rotation.x;v.lock.visible=!opened;
        v.reward.visible=opened;v.flightFrom=v.base.position.clone().add(new T.Vector3(0,.8,0));
        const p=s.actors[action?.actor??active];v.flightTo=new T.Vector3(p[0]-this.cx,p[2]*H+.65,p[1]-this.cz);
      }
    }
    for (const [i, o] of this.keys.entries())''');s=s.replace('    this.motions = this.motions.filter((m) => {','''    for(const v of this.chestViews||[]){
      if(v.start==null)continue;
      const t=Math.min(1,(now-v.start)/750),ease=t*t*(3-2*t);
      v.lid.rotation.x=v.fromAngle+((v.opened?-1.35:0)-v.fromAngle)*ease;
      if(v.reward.visible){v.reward.position.lerpVectors(v.flightFrom,v.flightTo,ease);v.reward.position.y+=Math.sin(t*Math.PI)*.65;v.reward.rotation.y+=dt*4;if(t===1)v.reward.visible=false;}
      if(t===1)v.start=null;
    }
    this.motions = this.motions.filter((m) => {''');p.write_text(s)
