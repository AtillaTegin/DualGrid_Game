import fs from 'node:fs';
const root=new URL('./',import.meta.url),raw=fs.readFileSync(new URL('level-ideas.txt',root),'utf8');
let family,heading;const ideas=[],counts={};
for(const line of raw.split(/\r?\n/)){
 if(line.startsWith('[')){[,family,heading]=line.match(/^\[(.+?)\] (.+)$/);counts[family]=0;continue;}
 if(!line.includes('|'))continue;
 const [title,layout,decision]=line.split('|');const n=++counts[family];
 ideas.push({id:`${family}-${String(n).padStart(2,'0')}`,family,title,layout,decision,status:'concept-not-playable-not-solver-certified'});
}
if(ideas.length!==200||Object.values(counts).some(n=>n!==20))throw Error(JSON.stringify(counts));
if(new Set(ideas.map(i=>i.title)).size!==200)throw Error('Repeated title');
if(new Set(ideas.map(i=>i.decision)).size!==200)throw Error('Repeated decision');
fs.writeFileSync(new URL('level-ideas-200.json',root),JSON.stringify({version:1,status:'design proposals, not implemented levels',counts,ideas},null,2));
let md=`# DUAL GRID — 200 səviyyə ideyası və yenidənqurma qaydası

## Bu sənədin statusu

10 əsas mod ailəsi × 20 ayrıca ideya = **200 dizayn namizədi**. Bunlar hazır, oynanıla bilən 200 səviyyə deyil. Ölçülər, koordinatlar və həll gedişləri hələ sertifikatlaşdırılmayıb. Aşağıdakı yol təsvirləri struktur eskizləridir; unikal ad və mətn avtomatik olaraq unikal oyun sübutu sayılmır. Hazır proqram bu sənədə əsasən dəyişdirilməyib.

İlkin 102 səviyyənin hamısı ayrıca [auditdə](AUDIT-102.md) qeydə alınıb. Arxivdəki 61–102 ilə hazır versiyanın yenilənmiş 65–73-ü ayrı saxlanır. Əvvəlki 28 səviyyəli seçim sənin tələb etdiyin 102 səviyyənin yenidən qurulmasının əvəzi deyil.

## Dəyişməyən dizayn müqaviləsi

- İlk 4–5 səviyyə qısa təlim ola bilər; sonra əsas hədəf orta və çətin, amma anlaşılan tapmacalardır. Uzun yol təkbaşına çətinlik sayılmır.
- Başlanğıcı, rəngi, açarın yerini dəyişmək, xəritəni güzgüləmək və ya fırlatmaq ayrıca səviyyə yaratmır.
- Eyni həndəsə yalnız yol bağlantısı, asılılıq sistemi və tələb olunan qərar həqiqətən dəyişəndə nəzərdən keçirilə bilər. Standart seçim fərqli həndəsədir.
- Mətn “körpüdən keç” deyirsə, amma keçmədən qələbə mümkündürsə, dizayn qəbul edilmir. Körpünün arxasında fiziki kilid, lazımi resurs və ya vacib şalter olmalıdır.
- Eyni açar→üç xal→şalter→geri dön dövrəsini müxtəlif dekorla təkrarlamaq qadağandır. Xallar yalnız həllin mənalı hissəsidirsə əlavə olunur.
- Hər mexanizm bir qərarı dəyişməlidir. Mexanizmi söndürəndə plan heç dəyişmirsə, o element çıxarılır və ya səviyyə yenidən qurulur.
- Təsadüfi ölüm, gizli istisna, gecikən mənasız kölgə və sırf bezdirmək üçün saxta final kampaniyaya daxil edilmir.
- Yeni qaydanın ilk istifadəsində təhlükəsiz animasiyalı izah, canlı nəticə önbaxışı və blok+istiqamət göstərən H köməyi var. Undo bütün dünya vəziyyətini qaytarır.
- Düzgün alternativ həll qəbul edilir. Lakin əsas mexanizmdən yan keçən təsadüfi qısayol xəta sayılır. Məqsəd hər səviyyədə məcburi tək həll yaratmaq deyil.

## Modlara münasibət

Bütün ailələr dizayn üçün təsdiqlənmiş hesab edilir; bu, içlərindəki hər köhnə nümunənin avtomatik qəbul edilməsi deyil. M1 gizli ölümü deyil, dayaq və marşrut yaddaşını; M2 çaşdırmanı deyil, koordinat qərarını; M5 saniyə yarışını deyil, məkanın planlı dəyişməsini; M6 əsassız aldatmanı deyil, görünən şərtli keçidi əsas götürür.

M4 əvvəlki təqibçi kimi geri qaytarılmır. Burada yazılmış əmrləri faydalı mexaniki iş üçün icra edən, öncədən görünən yaddaş sistemi təklif olunur. Bu yeni sistem mövcud mühərrikdə hazır deyil. N1–N4 də daha əvvəl təsdiqlənməmiş ailələr kimi gizlədilmir: indiki ümumi təsdiqə əsasən ideya siyahısına daxildir. Yeni semantika tələb edən ideyalarda bu açıq yazılıb.

## İdeyalar

Hər bəndin “Quruluş” hissəsi xəritə eskizini, “Qərar və maneə” hissəsi həllin əsasını göstərir. Alt-elementlər ayrı formal düymə siyahısı kimi yox, məhz istifadə məqsədi ilə təsvir edilir.
`;
for(const f of Object.keys(counts)){
 const title=raw.split(/\r?\n/).find(l=>l.startsWith(`[${f}]`)).split('] ')[1];md+=`\n## ${f} — ${title}\n`;
 for(const i of ideas.filter(i=>i.family===f))md+=`\n### ${i.id} — ${i.title}\n\n**Quruluş:** ${i.layout}.\n\n**Qərar və maneə:** ${i.decision}\n`;
}
md+=`\n## Qarışıq səviyyələr üçün ayrıca seçilən 24 istiqamət

Bunlar yuxarıdakı 200-ün üstünə gələn konsept istiqamətləridir; hələ əlavə işlək səviyyə sayı kimi təqdim edilmir. Mod cütlüyünün fərqli olması təkbaşına yeni səviyyə demək deyil. Hər biri üçün ayrıca blokout və həll lazımdır.

| Kod | Kombinasiya | Ayrı əsas qərar |
|---|---|---|
| X01 | M1+N2+M3 | Biristifadəlik görüşdən qabaq enerjini böl, uzaqda böyük izə yayıl, geri yüngül tuneldən dön. |
| X02 | M2+N1+M5 | Divarı doğru fazada saxlayan şalterə rotor vasitəsilə doğru yan üzü gətir. |
| X03 | M6+N3+N2 | Portal bileti enerjini uzaq depoya daşıyır; bağlantını bağlamadan ehtiyatı ikinci bloka qaytar. |
| X04 | N4+M1+M5 | Panelin çəkilməsi yaxınlıq xəttini dəyişir; dayağı sönən blokdan əvvəl müşayiətçini yeni cibə yerləşdir. |
| X05 | M4+M3+N1 | Qeyd sahəsində üz və forma proqramı hazırla, ayrı geometriyalı sahədə kontaktı saxlat. |
| X06 | M5+M6+N4 | İcazəli teleport blokları ayırır; divar fazasını sabitləyərək yenidən rezonans məsafəsi yarat. |
| X07 | M1+N3+N1 | Tikişdən əvvəl alt üzü hazırla; çıxışda qırılan yolu ikinci dəfə istifadə edə bilməzsən. |
| X08 | M2+N2+N4 | Enerji transferi kompası dəyişir; transferdən sonra cüt addımlar yenidən uyğunlaşdırılmalıdır. |
| X09 | M3+M5+N3 | Paneli limandan çək, böyük cismi enli çıxışa ötür, sonra kiçik partnyora başqa əlaqə aç. |
| X10 | M4+M1+N2 | Qeyd relay-ni saxlayır, canlı blok enerji daşıyır; qeydin bitməsindən əvvəl deyil, düzgün son parkından istifadə et. |
| X11 | M6+N1+M2 | Üzlə seçilən portal ünvanına normal yoldan deyil, polarite yaddaşını hazırlayıb yaxınlaş. |
| X12 | N4+M3+N2 | Böyük iz məsafəni azaldır, enerji yükü artırır; eyni zamanda həm rezonansı, həm döşəmə həddini ödə. |
| X13 | M5+M1+M4 | Qeyd divarı çəkir, amma arxadakı plitə qırılır; canlı blok əvvəl alternativ qayıdışı açmalıdır. |
| X14 | N3+M2+M6 | Dövrəli ünvan və polarite iki ayrı yaddaşdır; onları eyni vaxtda yox, müxtəlif adalarda hazırla. |
| X15 | N1+N2+M1 | Ağır enerjili domino yalnız doğru alt üzü ilə qabıqdan uzanmış keçib divar kontaktını açır. |
| X16 | M3+M4+M5 | Proqram tavanı qaldırır; böyük canlı blok keçir, sonra kiçilərək proqramı söndürən iç terminala çatır. |
| X17 | M6+N4+M1 | Portal partnyoru uzağa göndərməzdən əvvəl yeni müşahidə relay-ni aç; teleport dayağı təsadüfən söndürməsin. |
| X18 | N2+N3+M5 | Enerjini motordan alanda qraf bağlantısı dondurulur; hər iki blok üçün əlçatan final payı saxla. |
| X19 | M2+M3+N1 | Rotor və ölçü stansiyası eyni dövrədədir; forma və alt üz son dar qapıdan əvvəl birlikdə hazırlanır. |
| X20 | M4+N4+N3 | Proqram bir girişin icazəsini saxlayır, canlı blok başqa düyünə keçib cüt məsafə şərtini tamamlayır. |
| X21 | M1+M6+M5 | Geri dönüş portalı açılmadan biristifadəlik boğazı qırma; panelin arxasındakı ikinci şalter əvvəl əlçatan edilməlidir. |
| X22 | N1+N3+N4 | Ayrı adalarda doğru yan üzləri bir xəttə gətir; portal orientasiyasını qoruduğu üçün hazırlıq adası fərqlidir. |
| X23 | M2+M4+N2 | Proqram qeyd anının yox, icra anının görünən kompası ilə işləyir; enerji transferindən sonrakı yol ayrıca önbaxışlanır. |
| X24 | M3+M1+N3 | Enli zəif limana yastı izlə çıx, dar limana kubla qayıt; tikişin dəyişməsi iki fərqli forma dövrəsi tələb edir. |

## İdeyadan oynanıla bilən səviyyəyə qəbul qapısı

1. Əvvəl boz blokout: həqiqi xanalar, startlar, məqsədlər, divarlar, tavanlar və bütün keçid şərtləri yazılır. Bir səviyyənin həndəsəsini ofsetlə köçürmək qəbul deyil.
2. Tam vəziyyət müəyyən edilir: mövqelər, orientasiyalar, forma, enerji, qapı bitləri, portal indeksi, sınıq döşəmə, proqram fazası. H köməyi və undo bunların hamısından istifadə etməlidir.
3. Həll axtarışı ilkin vəziyyətdən qələbəyə konkret əmrlər çıxarmalıdır. Büdcə bitməsi “həll yoxdur” kimi yazılmır. Proqram və yeni mexanizm dəstəyi yoxdursa namizəd oyuna daxil edilmir.
4. Hər vacib mexanizm üçün sui-istifadə yoxlaması: onun açarını götürmədən, şalterini basmadan, körpüsünü keçmədən qələbə mümkündürmü? Mümkündürsə, həmin mexanizm zəruri deyil. Qayda təkcə təlim yazısı ilə məcbur edilmir.
5. Təkrar yoxlaması üç hissəlidir: həndəsə, kilid-asılılıq qrafı, həllin qərar ardıcıllığı. Eyni “get–götür–bas–dön” ardıcıllığına sadəcə yeni dekor vermək rədd edilir. Oxşar qruplar insan tərəfindən yanaşı oynanır.
6. Tam xəritə qrafının bərabərliyini yoxlamaq praktiki filtrdir; bütün gələcək ideyaların heç bir cəhətdən oxşamayacağına riyazi zəmanət verilmir. Eyni əsas qaydaların öyrənilməsi təbiidir, təkrar tapmaca deyil, həmin qaydalardan yeni nəticə tələb olunur.
7. Qısa həll, geri dönüş, ölüm sonrası undo, passiv blokun dayağı, portalın dolu ünvanı, yuvarlanma qövsünün divara dəyməsi və saxta qələbə ayrıca yoxlanır.
8. Sonra vizual dizayn: işıq əlaqə və statusu göstərir, maneəni gizlətmir. Dörd kontaktın dörd işığı, tavanın real hündürlüyü və kilidin bağlı olduğu şalter aydın görünür.
9. Brauzerdə klaviatura və konkret H köməyi ilə real oynanışdan keçməyən səviyyə “hazır” siyahısına girmir. Sertifikat şəklində başlanğıc həlli, mexanizm zəruriliyi və yoxlama nəticəsi saxlanır.

## 102 səviyyənin yenidən qurulma ardıcıllığı

Sabit ID-lər saxlanır, silinən məzmunun yeri boş şablonla doldurulmur. 1–5 öyrətmə; 6–25 tək əsas qərar və həqiqi maneə; 26–60 iki qaydanın qarşılıqlı asılılığı; 61–85 yaddaş və resurs planı; 86–102 üç qaydalı, amma oxunaqlı kombinasiyalar üçün namizəd aralıqlarıdır. Bu, hazır səviyyə bölgüsü yox, blokout seçimi üçün çərçivədir. Sıra yalnız oynanışdan sonra müəyyən edilir; 100 gedişlik boş yol “çətin” sayılmır.

200 ideyanın hamısını sırf say üçün kampaniyaya yığmaq olmaz. Əvvəl ən yaxşı 102-si blokout və zərurilik testindən seçilir, keçməyən namizədlər yenidən yazılır. Qalan keyfiyyətli ideyalar ayrıca paketə çevrilə bilər. Ümumi təsdiq artıq var: hər rutin tətbiq üçün yenidən icazə soruşmaq lazım deyil, amma yoxlanmamış ideya işlək mərhələ kimi təqdim edilmir.
`;
fs.writeFileSync(new URL('LEVEL-DESIGN-200.md',root),md);
console.log(JSON.stringify({ideas:ideas.length,perFamily:counts,extraCombinationDirections:24,playableLevelsAdded:0}));
