import fs from 'node:fs';import {catalog,families} from '../demo/src/lab-catalog.js';
const map={
 'M1.1':['lab','Yalnız istinad; gizli ölüm kampaniyaya daşınmayıb.'],
 'M1.2':['H1','Bir dəfəlik yol hazırdır; çətin kombinasiyalar qalıb.'],
 'M1.3':['S4, C67, C68, C71','Yük həddi işləyir.'],
 'M1.4':['V2, S3, C66','Sensorla dayaq və təhvil işləyir.'],
 'M1.5':['C73','Yaxınlıq dayağı işləyir; geniş ekspert paketi qalıb.'],
 'M1.6':['C70','Giriş haqqı işləyir; ayrıca geniş kurs qalıb.'],
 'M2.1':['R1','Tərs zona ayrıca təlim və canlı kompasla hazırdır.'],
 'M2.2':['R2, C70','90 dərəcə rotor ayrıca təlimdə və əvvəlki kombinasiyada işləyir.'],
 'M2.3':['R3, R5, R6','Yadda qalan qütb ayrıca, lift/enerji və üz/portal kombinasiyalarında işləyir.'],
 'M2.4':['R4, C66','İki ayrı kompas və məcburi relay təhvili işləyir.'],
 'M3.1':['S1, S2','Kiçilmə stansiyaları işləyir.'],
 'M3.2':['C68, C72','Yastı 2×2×1 plitə əvvəlki kombinasiya bölməsində var; tower bölməsində yoxdur.'],
 'M3.3':['S1–S5','2×2×2 böyük kub və uzun addım işləyir.'],
 'M3.4':['S1, S2, S5, F5','Forma kilidləri işləyir.'],
 'M3.5':['təxirə salınıb','Transformasiya ehtiyatı əvvəl çıxarılıb; keyfiyyətli yeni tətbiq olmadan geri qaytarılmır.'],
 'M3.6':['C72','Böyümə lövbəri var; yeni mürəkkəb tətbiqlər qalıb.'],
 'M6.1':['H5','Görünən ünvanlı portal variantı hazırdır; əsassız saxta final yoxdur.'],
 'M6.2':['lab','Dövrəli ünvanı olan yeni kampaniya tapmacaları qalıb.'],
 'M6.3':['H6, F6','Şərtli portal var; aldadıb geri atan köhnə variantla eyniləşdirilmir.'],
 'M6.4':['lab','Keçidlə dünya kilidini açan ayrıca yeni tətbiq qalıb.'],
 'N1.1':['F1, F5','Alt üz kontaktı ayrıca və kombinasiyada işləyir.'],
 'N1.2':['F2, F6','Yan üz kontaktı və sağ üz möhürü işləyir.'],
 'N1.3':['F3','İzolyasiya alt üzü var; yanlış giriş təhlükəsiz rədd olunur, ölüm variantı deyil.'],
 'N1.4':['F4, F5, F6','F ilə təsdiqlənən sıralı möhür yaddaşı işləyir.'],
 'N2.1':['H4, H6','Qonşu bloklar arasında T ilə ötürmə işləyir.'],
 'N2.2':['H3, H6, F6','Terminal ehtiyatı və enerji şərtli keçid işləyir.'],
 'N2.3':['H4, H6','Bölgü kilidi işləyir.'],
 'N2.4':['H6, F6','Qorunan cəmi və son bölgü yoxlanır; daha fərqli dövriyyə tapmacaları qalıb.'],
 'N3.1':['H5','Açıq ünvanlı ayrı əlaqələr var; bütün topoloji ailə hazır sayılmır.'],
 'N3.2':['lab','Döndərilən çıxış və orientasiya transformu qalıb.'],
 'N3.3':['lab','Sarınan sərhəd kampaniyası qalıb.'],
 'N3.4':['lab','Bağlantı seçicisi kampaniyası qalıb.'],
};
map['M5.1']=['W3','Geri dönməyən panel, görünən növbə büdcəsi və marşrut sırası.'];
map['M5.2']=['W2, W5','Dövri piston, SPACE ilə gözləmə və təhlükəsiz faza planı.'];
map['M5.3']=['W4','Alçaq tirin altında kiçik kub sığınır, böyük forma və yuvarlanma qövsü dəyməməlidir.'];
map['M5.4']=['W1, W5, W6','Pult, partnyor əyləci və panelin bütün hərəkət yolu yoxlanır.'];
map['M5.5']=['əlavə edilmir','Real vaxt sıxılması kampaniyanın sərbəst düşünmə prinsipinə uyğun deyil; növbəli variantlar seçilib.'];
map['N4.1']=['B1, B6','Eyni sətir/sütun, bərk maneənin kəsdiyi şüa, qapı və panel motoru.'];
map['N4.2']=['B2, B6','Sonlu Manhattan bağı; portal da çıxış məsafəsinə tabedir, bloklar dartılmır.'];
map['N4.3']=['B3','İki həqiqi domino, dik/uzanmış vəziyyət və perpendikulyar X/Z kilidi.'];
map['N4.4']=['B4, B5','Eyni və əks cüt addım, L stansiyasında rejim, atomik rədd və enerji kombinasiyası.'];
map['N3.1']=['T1','Cüt portal, dolu çıxışın rəddi və bir P üçün bir keçid.'];
map['N3.2']=['T2, T6','90/270 dərəcə yaw, həqiqi domino izi və bütün yan üzlərin dönüşü.'];
map['N3.3']=['T3, T5','Açıq işarəli kənar, bir yuvarlanma ilə sarınma, yalnız kiçik kub.'];
map['N3.4']=['T4, T6','B sensoru aktiv ünvanı seçir; P başlanğıc snapshot-unu götürür.'];
map['M1.4']=['G2, G5, G6, V2, S3, C66','Dayaq döşəməsi, iki vəziyyətli yol və sensorların enerji təhvili.'];
map['M1.5']=['G3, G5, C73','Digər blokun müşahidə dairəsi, özünə dayaq yoxdur, portal adasının daimiləşdirilməsi.'];
map['M1.6']=['G1, G4, G6, C70','Hər xanaya giriş büdcəsi; son girişdə üstündə qalmaq olar, çıxandan sonra yeni giriş yoxdur.'];
for(const id of Object.keys(catalog))if(!map[id])map[id]=id.startsWith('M4')?['yenidən dizayn gözləyir','Mənasız təqibçi çıxarılıb. Faydalı əmrlər yaddaşı ayrıca gələcək sistemdir.']:id.startsWith('M5')?['lab','İstinad nümunəsi var; məntiqli, növbəli kampaniya tətbiqi qalıb. Real vaxt yarışını avtomatik əlavə etmə.']:['lab','Nisbi əlaqə istinad nümunəsi var; ayrıca yeni orta/çətin kurs qalıb.'];
map['M3.6']=['S1b, C72','Böyümə lövbəri ayrıca məşqdə dörd kontaktlı forma hədəfi ilə işləyir.'];
map['M6.3']=['TC1–TC3, H6, F6','Açar → qonşu sandıq → yeni açar → şərtli portal ayrıca üç tapmacada, sonra lift və ünvan seçimi ilə işləyir.'];
let md='# Mod və alt-elementlərin real vəziyyəti\n\n2026-11-09. Əsas kampaniya 28, yeni məkan bölməsi 70: **98 aktiv səviyyə**. Laboratoriyadakı kiçik istinadlar bu saya daxil deyil. C işarəsi campaign.html-dəki, V/S/H/F/R/W/B/T/G işarələri tower.html-dəki səviyyələrdir.\n\nBu siyahı “hamısı hazırdır” demir. Hazır mexanizm, əvvəlki istinad prototipi və gələcək iş ayrıdır. Yeni F bölməsi üzlər ailəsinin dörd alt elementini ayrı-ayrı, sonra başqa mexanizmlərlə göstərir. Yeni mod ailəsinə keçməzdən əvvəl istifadəçiyə hansı modun başlanacağı və nələrin qaldığı bildirilməlidir. Bu siyahı işlək nümunələri göstərir; bəzi nümunələr orijinal modun uyğunlaşdırılmış variantıdır. Çıxarılmış mənasız elementlər sırf say üçün geri qaytarılmır.\n';
for(const f of Object.keys(families)){md+=`\n## ${f} — ${families[f][0]}\n\n| Alt element | Mövcud yer / status | Qeyd |\n|---|---|---|\n`;for(const [id,c] of Object.entries(catalog).filter(([id])=>id.startsWith(f+'.')))md+=`| ${id} · ${c.title} | ${map[id][0]} | ${map[id][1]} |\n`;}
md+='\n## Əlavə ideyalar\n\nMaqnit, lava/buz və portal adasında blokla kəsişməyən rəng yolları hazır oyun kimi təqdim edilmir. Niyyətlər research_notes/FUTURE-MECHANICS.md-də saxlanır. Bu hissədə onların yerinə sadəcə kosmetik oxşar əlavə edilməyib. Qazıntı V3/S6 aktiv siyahıdan çıxarılıb.\n\n## Öyrənmə keçidləri\n\n21 yeni müəllif xəritəsi əlavə olunub: V0/V0b, S1b/S2b, H4b/H3b, F1b/F3b, R1b/R3b, W1b/W2b, B1b/B3b, T1b/T3b, G1b/G3b və TC1–TC3. Yeddi çətinlik etiketi və hər xəritənin öyrənmə məqsədi var; ekspertlər əsas yeni mexanizm məşqlərindən sonraya keçirilib. Bu say hər gələcək modun tamamlandığını bildirmir.\n\n## Ardıcıllıq\n\nQalan istiqamətlər: məhdud transformasiya ehtiyatı üçün mənalı tapmacalar; dövrəli portal ünvanı və keçidlə kilid açılması; klonsuz faydalı əmrlər yaddaşı; maqnit və lava/buz qarşılıqlı təsirləri; blokla çəkilən rəng yolları adası. Mövcud modların daha dərin orta/çətin/ekspert kombinasiyaları da genişləndirilməlidir. Hər paket əvvəl təhlükəsiz dərs, sonra fərqli orta/çətin problemlər, sonra iki və daha çox ailənin kombinasiyası ilə qəbul olunur. Bu sıra iş prioritetidir, hazır olmayan səviyyələrin sayı kimi təqdim edilmir.\n';
fs.writeFileSync(new URL('./MOD-STATUS.md',import.meta.url),md);fs.writeFileSync(new URL('./mod-status.json',import.meta.url),JSON.stringify(map,null,2));console.log(Object.keys(map).length+' sub-elements inventoried');






