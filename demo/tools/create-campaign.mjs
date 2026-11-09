import fs from 'node:fs';
import {legacyLevels} from '../src/legacy-levels.js';
import {solve,key,initial,step} from '../src/logic.js';
const rect=(w,h)=>Array.from({length:h},()=>'.'.repeat(w));
const islands=(w,h,areas)=>{const a=Array.from({length:h},()=>Array(w).fill(' '));for(const[x,z,ww,hh]of areas)for(let j=z;j<z+hh;j++)for(let i=x;i<x+ww;i++)a[j][i]='.';return a.map(r=>r.join(''));};
const lane=(x,z,n,type='bridge',group=0)=>Object.fromEntries(Array.from({length:n},(_,i)=>[key(x+i,z),{type,group}]));
const campaign=[], certificates=[];
function normalise(l){l=structuredClone(l);l.specials??={};l.plates??=[];l.sizes??=l.starts.map(()=>2);for(const k of Object.keys(l.specials)){const[x,z]=k.split(',').map(Number);const row=l.map[z].split('');row[x]='.';l.map[z]=row.join('');}return l;}
function certify(raw,id){const l=normalise({...raw,id});const r=solve(l,initial(l),160000);if(!r.path)return null;let s=initial(l);for(const a of r.path){const n=step(l,s,a);if(!n.ok||n.state.dead)throw Error('Invalid certificate');s=n.state;}if(!s.won)throw Error('Incomplete certificate');return {l,r};}
function commit(c){c.l.par=c.r.path.length;campaign.push(c.l);certificates.push({id:c.l.id,moves:c.r.path.length,path:c.r.path});console.log(`${String(c.l.id).padStart(2,'0')} ${c.l.title}: ${c.l.par}`);}
function add(title,map,starts,goals,sizes,extra={}){const id=campaign.length+1,l={title,subtitle:'Bir qayda. Bir aydın addım.',map,starts,goals,sizes,intro:'Öz nişanına çat. Addım-addım kömək istənilən anda açıqdır.',hint:'',...extra};const c=certify(l,id);if(!c)throw Error(`Unsolvable ${id} ${title}`);if(id<29&&c.r.path.length>=22)throw Error(`Too early for long puzzle ${id}: ${c.r.path.length}`);commit(c);}
function legacy(id){const raw=structuredClone(legacyLevels[id-1]);raw.legacyId=id;const c=certify(raw,campaign.length+1);if(!c)throw Error('Legacy broke');commit(c);}
add('İlk addım',rect(3,3),[[0,1]],[[1,1]],[1]);
add('Öz işarənə çat',rect(4,3),[[0,1]],[[2,1]],[1]);
add('Səhvdən qorxma',['....','.. .','....'],[[0,1]],[[2,0]],[1]);
add('Küncü dön',['... ','  . ','  ..'],[[0,0]],[[3,2]],[1]);
add('Yolu oxu',['.....','.   .','.....'],[[0,2]],[[4,0]],[1]);
add('Özün sına',['....',' . .',' ...'],[[0,0]],[[3,2]],[1]);
add('İkinci yaddaş',rect(5,4),[[0,1],[4,2]],[[2,1],[2,2]],[1,1]);
add('İki ayrı çıxış',rect(5,4),[[0,0],[4,3]],[[3,0],[1,3]],[1,1]);
add('Bir-birinə yol ver',['.....',' ... ','.....'],[[1,1],[3,1]],[[3,1],[1,1]],[1,1]);
add('Sensor nə edir?',islands(6,3,[[0,0,2,3],[4,0,2,3]]),[[0,0],[1,2]],[[0,1],[5,1]],[1,1],{plates:[{x:0,z:1,group:0}],specials:lane(2,1,2)});
add('Ağır və yüngül',rect(5,4),[[0,0],[4,3]],[[3,1],[1,2]],[1,1],{showRoles:true,intro:'A ağırdır, B yüngüldür. Bu rollar ölçüdən ayrıdır. İndi hər birini öz çıxışına apar.'});
add('Ağırlığın işi',islands(6,3,[[0,0,2,3],[4,0,2,3]]),[[0,0],[1,2]],[[0,1],[5,1]],[1,1],{showRoles:true,plates:[{x:0,z:1,group:0,heavy:true}],specials:lane(2,1,2)});
add('A böyüyür',rect(7,4),[[1,1],[5,3]],[[4,1],[5,3]],[2,1],{intro:'A artıq 1×1×2-dir. Ölçüsü sabitdir; çevriləndə yerdə tutduğu sahə dəyişir. B hələ ki kiçik kubdur.'});
add('Dik və uzanmış',rect(7,5),[[1,1],[5,3]],[[4,2],[5,1]],[2,1]);
add('Fərqli addımlar',rect(7,5),[[1,1],[5,3]],[[4,3],[1,3]],[2,1]);
add('Gələcək yeri saxla',rect(7,5),[[1,3],[5,1]],[[4,1],[1,3]],[2,1]);
add('Ağır və dik',islands(9,5,[[0,0,4,5],[6,0,3,5]]),[[1,3],[2,3]],[[1,1],[7,2]],[2,1],{plates:[{x:1,z:1,group:0,heavy:true}],specials:lane(4,2,2)});
add('Yüngülün üstünlüyü',islands(9,5,[[0,0,4,5],[6,0,3,5]]),[[1,3],[2,3]],[[1,1],[7,1]],[2,1],{specials:lane(4,2,2,'light')});
add('Köməkçi də yol açır',islands(10,5,[[0,0,4,5],[6,0,4,5]]),[[1,3],[2,3]],[[7,2],[1,1]],[2,1],{plates:[{x:1,z:1,group:0}],specials:lane(4,2,2)});
add('Görüşmədən keçin',rect(7,6),[[1,1],[5,4]],[[5,1],[1,4]],[2,1]);
legacy(1);campaign.at(-1).title='İkisi də uzundur';
legacy(2);
legacy(3);
{
 const l=structuredClone(legacyLevels[2]);l.title='Dik qal, yolu saxla';l.starts=[[1,3],[2,3]];l.goals=[[1,0],[7,2]];l.plates=[{x:1,z:0,group:0,heavy:true}];delete l.legacyId;const c=certify(l,24);if(!c||c.r.path.length>=22)throw Error('24');commit(c);
}
legacy(4);
{
 const l=structuredClone(legacyLevels[3]);l.title='Yeni rol, eyni kimlik';l.starts=[[1,5],[2,3]];l.goals=[[7,4],[2,3]];l.pads=[[1,3],[2,3]];const c=certify(l,26);if(!c||c.r.path.length>=22)throw Error('26');commit(c);
}
legacy(5);legacy(6);legacy(7);

// These are fixed, reviewed variations with changed objectives/starting geometry,
// not rotated copies or runtime-random levels. Candidate alternatives only help
// the author choose a solvable board in the intended move band.
function variant(baseId,title,min,max,mutations){
 const id=campaign.length+1,base=legacyLevels[baseId-1];let closest=null;
 for(const edit of mutations){const l=structuredClone(base);delete l.legacyId;delete l.difficulty;l.title=title;l.subtitle='Əvvəl planla. Sonra bir-birinə yol aç.';l.hint='';l.intro='Qaydalar tanışdır. Məqsədlərin və dayanacaqların yerini əvvəlcədən yoxla. Kömək cari vəziyyətindən konkret addımı göstərəcək.';edit(l);const c=certify(l,id);if(c&&c.r.path.length>=min&&c.r.path.length<=max){commit(c);return;} if(c&&c.r.path.length>=15&&(!closest||Math.abs(c.r.path.length-(min+max)/2)<Math.abs(closest.r.path.length-(min+max)/2)))closest=c;}
 if(closest){commit(closest);return;} throw Error(`No solvable candidate ${id} ${title}`);
}
const goals=(pairs)=>pairs.map(p=>(l)=>{l.goals=p;});
variant(7,'Dar boynun o biri tərəfi',22,29,goals([[[12,0],[8,2]],[[9,0],[12,1]],[[10,0],[8,2]],[[8,0],[10,2]]]));
variant(7,'Əyləci azad et',22,29,goals([[[9,0],[12,2]],[[8,2],[12,0]],[[12,1],[8,3]],[[9,1],[12,3]]]));
variant(8,'Yaxın sensor, uzaq məqsəd',22,29,[1,2,3,4,5].map(z=>l=>{l.plates[0].z=z;l.goals[0]=[9,4];}));
variant(8,'Qarşı sahilin sözü',22,29,[3,4,5,6,2].map(z=>l=>{l.plates[0].z=z;l.plates[1].x=9;l.goals=[[10,4],[9,1]];}));
legacy(8);
variant(9,'İkinci əyləc yeri',28,34,goals([[[10,0],[14,4]],[[12,0],[14,3]],[[11,1],[14,4]],[[10,1],[13,4]]]));
variant(9,'Buzdan sonra görüş',28,34,goals([[[14,0],[10,4]],[[12,1],[14,4]],[[10,2],[14,0]],[[11,0],[12,4]]]));
legacy(9);
variant(10,'Gücü vaxtında ötür',31,43,[5,4,3,6,2].map(z=>l=>{l.plates[0].z=z;l.goals[0]=[11,7];}));
variant(10,'Aşağıdakı görüş',31,43,[4,5,6,2,1].map(z=>l=>{l.pads=[[5,z],[6,z]];l.goals[0]=[11,6];}));
variant(10,'Əvvəl aç, sonra dəyiş',31,43,[4,3,2,5,6].map(z=>l=>{l.plates[0].z=z;l.pads=[[5,5],[6,5]];l.goals[0]=[11,0];}));
variant(15,'İkinci sahildə növbə',31,43,[4,5,3,2,1].map(z=>l=>{l.plates[0].z=z;l.plates[2].z=5;l.goals[0]=[11,5];}));
variant(11,'Dövrənin qısa yolu',33,44,goals([[[1,9],[1,8]],[[2,7],[1,9]],[[3,8],[1,9]],[[0,8],[1,9]]]));
legacy(10);
variant(11,'Üçüncü körpünün qarşılığı',42,48,goals([[[3,10],[1,9]],[[0,7],[2,10]],[[2,8],[0,10]],[[1,7],[3,10]]]));
variant(11,'Son sensora tələsmə',42,48,goals([[[3,7],[0,10]],[[0,10],[3,7]],[[2,9],[0,8]],[[1,10],[3,8]]]));
legacy(11);
variant(12,'Ayrılan yollar',44,50,goals([[[12,0],[10,8]],[[10,1],[12,8]],[[12,1],[10,7]],[[11,0],[11,8]]]));
variant(12,'Yolun iki üzü',44,50,goals([[[10,0],[12,7]],[[12,1],[10,8]],[[10,1],[12,6]],[[12,0],[10,6]]]));
legacy(12);
variant(13,'Dəyişən məsuliyyət',46,53,[2,3,0,1].map(z=>l=>{l.pads=[[9,z],[10,z]];l.goals[0]=[2,8];}));
variant(13,'Son yolu yüngülləşdir',46,53,goals([[[2,10],[9,8]],[[0,8],[9,8]],[[1,10],[9,8]],[[3,7],[9,8]]]));
legacy(13);
variant(14,'Görüşə aparan plan',48,55,goals([[[11,8],[6,7]],[[10,7],[6,7]],[[12,6],[6,7]],[[11,3],[6,7]]]));
variant(14,'Uzaq çıxışın açarı',48,55,[5,6,7,3].map(z=>l=>{l.pads=[[5,z],[6,z]];l.goals[0]=[11,0];}));
legacy(14);
variant(15,'Təhvil zənciri',51,57,goals([[[10,8],[11,1]],[[12,7],[11,1]],[[11,8],[11,1]],[[10,7],[11,1]]]));
variant(15,'İki adadan o tərəfə',51,57,goals([[[11,6],[12,0]],[[10,7],[10,0]],[[12,8],[11,1]],[[11,5],[12,1]]]));
legacy(15);
variant(16,'Son görüşə hazırlıq',53,59,goals([[[3,10],[10,9]],[[1,9],[10,9]],[[0,8],[10,9]],[[4,11],[10,9]]]));
legacy(16);
if(campaign.length!==60)throw Error(`Expected 60 got ${campaign.length}`);
const certificateByDraft = new Map(certificates.map(c=>[c.id,c]));
campaign.splice(28,32,...campaign.slice(28).sort((a,b)=>a.par-b.par));
const finalCertificates=campaign.map((l,i)=>{const c=certificateByDraft.get(l.id);l.id=i+1;return {...c,id:l.id};});
certificates.splice(0,certificates.length,...finalCertificates);
for(const l of campaign){l.showRoles=l.id>=11;l.difficulty=l.id<=20?'ÖYRƏN':l.id<=28?'ASAN':l.id<=37?'ORTA':l.id<=49?'ORTA+':'ÇƏTİN';if(l.id<29&&l.par>=22)throw Error('Early difficulty spike');}
fs.writeFileSync(new URL('../src/campaign-data.js',import.meta.url),'// Fixed campaign data. Rebuild with tools/create-campaign.mjs; all paths are certified.\nexport const campaignData = '+JSON.stringify(campaign,null,2)+';\n');
fs.writeFileSync(new URL('../tests/campaign-solutions.json',import.meta.url),JSON.stringify(certificates,null,2)+'\n');
fs.writeFileSync(new URL('../src/solutions.js',import.meta.url),'// Verified start-state witnesses, used by offline hints.\nexport const solutions = '+JSON.stringify(certificates)+';\n');
console.log('Certified 60 levels.');
