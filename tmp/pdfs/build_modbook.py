from pathlib import Path
import re, json, math, html

ROOT=Path(r'C:/Users/User/Documents/ChatGPT/Bloxorz New Mechanics')
NOTES=ROOT/'research_notes/Dual Grid mod kitabxanası'
OUT=ROOT/'reports/Dual Grid mod kitabxanası.md'
PDF=ROOT/'output/pdf/Dual Grid mod kitabxanası.pdf'
TMP=ROOT/'tmp/pdfs'

def clean(s):
    for c in '\u00ad\u200b\ufeff': s=s.replace(c,'')
    for c in '\u2010\u2011\u2012\u2013\u2014\u2212': s=s.replace(c,'-')
    return s.strip()

a=clean((NOTES/'originals-a.md').read_text(encoding='utf-8-sig'))
b=clean((NOTES/'originals-b.md').read_text(encoding='utf-8-sig'))
n=clean((NOTES/'new-modules.md').read_text(encoding='utf-8-sig'))
c=clean((NOTES/'combos.md').read_text(encoding='utf-8-sig'))

items={}
for text in (a,b,n):
    pat=r'(?:\*\*|#### )((?:M[1-6]|N[1-4])\.\d+)\s+([^\n]+)'
    hits=list(re.finditer(pat,text))
    for h in hits:
        ident,title=h.group(1),h.group(2)
        start=h.end()
        if h.group(0).startswith('**'):
            title=title.split('**')[0]
            body=text[h.start():]
            body=body.split('**',2)[2]
            body=re.split(r'\n\n(?:\*\*(?:M|N)\d\.\d|### |## )',body)[0]
        else:
            body=text[start:]
            body=re.split(r'\n(?:#### |### |## )',body)[0]
        items[ident]={'id':ident,'title':title.rstrip('.'),'body':clean(body)}

expected=[f'M{k}.{j}' for k,count in enumerate([6,4,6,5,5,4],1) for j in range(1,count+1)]+[f'N{k}.{j}' for k in range(1,5) for j in range(1,5)]
assert set(items)==set(expected),(set(expected)-set(items),len(items))
items['M5.5']['body']=items['M5.5']['body'].split('**Bütün modlar üçün')[0].strip()

# Resolve policies consistently across the library. These are proposals, not code.
items['M6.1']['body']=items['M6.1']['body'].replace('Destination doludursa addım bütöv rədd edilir, boş amma dəstəksizdirsə ölüm','Destination dolu və ya dəstəksizdirsə giriş əmri bütöv rədd edilir, dünya saatı irəliləmir')
items['M6.4']['body']=items['M6.4']['body'].replace('destination footprint qaydası M6.1 kimi','destination footprint qaydası M6.1 kimi: dolu və ya dəstəksiz ünvan girişi bütöv rədd edir')
items['M4.4']['body']+=' Klon dəstəksiz yerə çatarsa həmin cəhdin qalan hissəsi üçün sönür; qəhrəmanlar buna görə ölmür, R ilə klon yenidən yaranır. Undo sönməni də qaytarır. Klonun forma və izi real blokla eyni həndəsə yoxlamasına tabedir.'
items['M4.1']['body']+=' Kub üçün növbə birxanalıq, domino üçün U/X/Z aşma əmrlərini daşıyır. H tam queue-nu görməli, Z növbə başı və sonunu əvvəlki vəziyyətə qaytarmalıdır.'
items['M4.2']['body']+=' Kub bir xana güzgülü addım atır, domino öz duruşundan aşır. H əvvəl dünya komandasını, sonra klonun güzgü nəticəsini göstərir; Z ikisini birlikdə qaytarır.'
items['M4.3']['body']+=' Kub və domino WAIT-də yerini/duruşunu saxlayır; dünya isə irəliləyir. H gözləməni açıq addım kimi təklif edə bilər, Z bütün faza və queue dəyişməsini ləğv edir.'
items['M4.5']['body']+=' Kubda bir, uzanmış dominoda iki hüceyrə təması yoxlanır. Real-time H saatı dondurur, amma yenidən işə salınanda əvvəlki addım sertifikatı avtomatik etibarlı sayılmır.'
for ident in ['M3.1','M3.2','M3.3','M3.4','M3.6']:
    items[ident]['body']+=' H cari forma, lövbər və bütün yeni hüceyrələri hesablamalıdır; Z uğurlu ölçü dəyişməsini və nəticələrini bir dəfə geri qaytarır. Qanunsuz genişlənmə nə növbə, nə resurs xərcləyir.'
items['M3.5']['body']+=' Kub/domino və ya seçilən 2×2 forma eyni açıq büdcəni paylaşır; H qalan ehtiyatı state-in hissəsi sayır və tükənmiş resursu yox sayan köhnə yol vermir.'
for ident in ['M5.1','M5.2','M5.4','M5.5']:
    items[ident]['body']+=' Kubun bir, uzanmış dominonun iki xanası və bütöv həcmi təhlükəyə görə yoxlanır. Z divar fazası/sayğacını qaytarır; H cari fazanı görür və passiv bloku da təhlükədən kənar saxlamalıdır.'
items['M5.3']['body']+=' Kiçik kub bir cibə sığa bilər, domino üçün bütün uzanmış iz tələb olunur. H yalnız son anchor-a deyil gövdəyə baxır; Z divar və duruşu birgə bərpa edir.'
for ident in [f'N{k}.{j}' for k in range(1,5) for j in range(1,5)]:
    items[ident]['body']+=' H bu qaydanın gələcəyi dəyişən vəziyyətini nəzərə alır; Z bir əmrin bütün nəticələrini qaytarır. Yeni alt-element üçün ayrıca həll və insan sınağı tələb olunur.'
items['N2.1']['body']=items['N2.1']['body'].replace('E ötürmə əmri','ayrıca Enerji ötürmə əmri')
items['N1.1']['body']+=' Kubda bütün üzlər bərabər ölçüdədir; dominoda uzun/qısa üz kontaktı sensor sahəsinə uyğun gəlməlidir.'
items['N1.2']['body']+=' Kub birxanalıq terminalda, domino isə uzun üzün və hündürlüyün həqiqi kontakt sahəsi ilə yoxlanır.'
items['N1.3']['body']+=' Kubun bir alt üzü, dominonun iki xananı örtən bütöv alt üzü qorunmalıdır.'
items['N1.4']['body']+=' Kub və domino eyni ikon ardıcıllığını fərqli yuvarlanma dövrəsi ilə əldə edir.'
for ident in ['N2.1','N2.2','N2.3','N2.4']:
    items[ident]['body']+=' Kub və dominonun enerji tutumu ölçüyə görə avtomatik dəyişmir; lövbərli terminal və ya tam pad təması səviyyədə nişanlanır.'
items['N4.1']['body']+=' Kub həmişə dikdir; domino üçün U şərti real orientasiya məhdudiyyətidir.'
items['N4.3']['body']+=' Bu alt-element iki domino tələb edir; kubu səssizcə X/Z saymaq olmaz, kub səviyyəsində başqa dərs seçilir.'
items['M6.3']['body']+=' Teleport qərarı üçün icazə sensoru növbənin BAŞLANĞIC snapshot-undan götürülür; final flag son sensorlardan sonra yenilənir. Eyni növbədə yeni basılan sensor geri dönüb artıq verilmiş portal qərarını dəyişmir.'
items['M4.4']['body']+=' Baza queue yalnız güzgülənən dünya MOVE və WAIT saxlayır. Resize, transfer və teleportla nəticələnən bütün mənbə əmri WAIT yazır; teleport klona ayrıca köçürülmür. Mənbənin keçmiş footprint snapshot-u ilə klonun bədənini dəyişmək bu variantda yoxdur.'
items['M3.2']['title']='Dörd xanalıq plitə'
items['M5.2']['body']=items['M5.2']['body'].replace('periodların ən kiçik ortaq vurğu','periodların ən kiçik ortaq bölünəni (ƏKOB)')
# Shared contracts carry repeated technical requirements once, for readability.
repeat_n=' H bu qaydanın gələcəyi dəyişən vəziyyətini nəzərə alır; Z bir əmrin bütün nəticələrini qaytarır. Yeni alt-element üçün ayrıca həll və insan sınağı tələb olunur.'
repeat_m3=' H cari forma, lövbər və bütün yeni hüceyrələri hesablamalıdır; Z uğurlu ölçü dəyişməsini və nəticələrini bir dəfə geri qaytarır. Qanunsuz genişlənmə nə növbə, nə resurs xərcləyir.'
for ident in items:
    items[ident]['body']=items[ident]['body'].replace(repeat_n,'').replace(repeat_m3,'')

parents={
'M1':('Phantom Floor - saxta zəmin','Sənin ideyan: təhlükəsiz görünən zəminə daxil olanda onun çökməsi və bloku itirməsi. Güclü sürpriz və marşrut yaddaşı yaradır, amma gizli məlumatla ilk ölüm planlama səhvi deyil. Orijinal rage variantı saxlanılır; əsas kampaniya üçün öyrənilən çat/işıq nişanı, önbaxış və tam undo tövsiyə olunur. Altı alt-element aşağıda bizim genişləndirməmizdir.'),
'M2':('Reversing Controls - dəyişən idarə xəritəsi','Sənin ideyan: müəyyən zonalarda sağ/sol və yuxarı/aşağı idarəsinin tərsinə çevrilməsi. Təkcə refleks çaşdırırsa tez yorucu olar; başqa məkan qaydası ilə birləşəndə koordinat düşüncəsi yaradır. Dörd alt-element bizim təklifimizdir. İdarə transformu remap edilmiş gameplay niyyətinə yalnız bir dəfə tətbiq edilir; H, Z, TAB və menyu heç vaxt tərsinə çevrilmir.'),
'M3':('Dynamic Shrinking/Growing - dinamik ölçü','Sənin ideyan: oyun zamanı 1×1 kubun böyüməsi və kiçilməsi, o cümlədən 2×2 forma. Bu ölçünü dekor yox, marşrut və sensor qərarına çevirir. Dəqiqləşdirmə: 2×2 yer izi 2×2×1 alçaq plitə və ya 2×2×2 böyük kub demək ola bilər; hər level bunu açıq seçməlidir. Aşağıdakı altı variant bizim dizayn genişləndirməmizdir. Kub↔domino sadə hazırlıq pilləsidir, sənin 2×2 fikrini əvəz etmir.'),
'M4':('Shadow Doppelganger - gecikən güzgü klonu','Sənin orijinal ideyan: qırmızı kölgə hərəkətləri iki saniyə gecikmə ilə güzgülü təkrar edir; təmas ölümü və səviyyə resetini yaradır. Bu real-time təzyiq forması ayrıca Chaos/challenge seçimi kimi saxlanılır. Əsas məntiq kampaniyası üçün N qəbul edilmiş əmr gecikməsi və açıq WAIT alternativini təklif edirik; bu iki saniyənin gizlicə əvəzlənməsi deyil. Beş alt-element bizimdir. Queue, təmas, sönmə və undo birlikdə dəqiq müəyyən edilməlidir.'),
'M5':('Moving/Squeezing Walls - dəyişən divarlar','Sənin ideyan: timer-lə hərəkət edən, sahəni daraldan və bloku sıxan divarlar. Bu, məkana zaman məhdudiyyəti əlavə edir. Növbəli variant düşünməni yox, gediş seçimini; saniyəlik variant icra sürətini sınağa çəkir. Aşağıdakı beş alt-element bizim analitik bölgümüzdür. Kampaniyada görünən faza və sərbəst düşünmə, real-time challenge-da sabit simulyasiya saatı və pause siyasəti seçilir.'),
'M6':('Fake Goal - teleport edən saxta final','Sənin ideyan: çıxışa bənzəyən hədəfə çatanda qələbə əvəzinə teleport tələsi işləməsi. Optional Chaos-da gözlənti pozuntusu saxlanılır; əsas kampaniyada əvvəldən etibarlı olduğu öyrədilən bütün çıxışlar sonradan əsassız tələyə çevrilmir. Dörd alt-element bizimdir. Kampaniya variantı teleportu faydalı yol qərarına çevirə bilər; yeni saxta nişan ayrı öyrədilir, öyrənilmiş yer yaddaşda qalır.')}
newparents={
'N1':('Üz yaddaşı və kontaktlar','Bu ailə bütövlükdə bizim əlavə təklifimizdir. Yer və U/X/Z izi ilə yanaşı hansı fiziki üzün aşağı və ya yana baxdığı izlənir. Tam etiketli sərt cismin 6 üst üz × 4 dönmə = 24 orientasiyası öz həndəsi sayımımızdır, hazır engine dəstəyi deyil. Gizli alt üz əzbərlətmək əvəzinə HUD və önbaxış göstərilir; resize zamanı üz işarələri qorunur.'),
'N2':('Qorunan enerji ehtiyatı','Bu ailə bizimdir: ümumi enerji nişanları itmir və sərbəst yaranmır, bloklar və terminallar arasında bölüşdürülür. Qorunma ideyasından ilhamlanır, real gərginlik/cərəyan simulyasiyası deyil. Bir görüşdən sonra hansı blokun hansı resursla hansı tərəfdə qalacağı əsas qərardır. Mövcud E rol mübadiləsi ilə eyni əmri gizli paylaşmayan ayrıca idarə göstərilir.'),
'N3':('Məkan tikişləri və topoloji bağlantılar','Bu ailə bizim əlavə təklifimizdir. M6-dan fərqli olaraq təyinatı açıq olan bağlantını planlaşdırır, aldatmır. Məkan qrafının kənarları dəyişir; qeyri-Evklid fizika iddiası yoxdur. Bir keçid bir əmrdir; portalda avtomatik sonsuz ping-pong yoxdur. Dolu və dəstəksiz çıxış bütün giriş əmrinə mane olur, təsadüfi fallback axtarılmır.'),
'N4':('Nisbi rezonans və bağlar','Bu ailə bizimdir. Açılma şərti sabit düymədən çox iki cismin nisbi sətir, məsafə və orientasiyasıdır. Maqnit/ip estetikası verilə bilər, amma gizli real qüvvə yoxdur. Kub və domino fərqləri şərtdə açıq yazılır. İlk sınaq üçün N4.1 münasibdir; cüt addım N4.4 ayrıca eyni anda niyyət qaydası tələb edir.')}

intro='''Bu sənəd sənin altı mexanikanı əvvəl öz mənasında təhlil edir, sonra onların daxilində 30 fərqli alt-element təklif edir. Bundan SONRA bizim dörd yeni ailəmiz və onların 16 alt-elementi gəlir: cəmi 46 konsept. Sənin ana ideyalarınla bizim alt bölgü və yeni ideyalarımız qarışdırılmır. Hər konsept qayda, düşüncə, nümunə, öyrətmə siqnalı və texniki xərc baxımından qiymətləndirilir. Heç biri bu tapşırıqda oyuna əlavə edilməyib, koordinatlı həll və insan sınağı ilə təsdiqlənməyib. Məqsəd siyahını böyütmək yox, hansı ideyanın gələcək sınağa dəyəcəyini seçməkdir.'''
baseline='''Mövcud baza 60 səviyyəli lokal PC demosudur. README-yə görə 1-6 tək kub, 7-12 iki kub, 13-20 domino+kub, 21-dən iki domino gəlir; ilk 22-gedişlik həll 30-cu səviyyədədir. Canlı animasiyalı dərs və H ilə cari vəziyyətdən konkret addım var. logic.js oxunuşu size=1 birxanalıq hərəkəti, domino U/X/Z aşmasını, rol, körpü və buz davranışını təsdiqləyir. Burada mövcud testlər yenidən işə salınmayıb; README-də yazılan test sayı yeni modların yoxlanması sayılmır.

Əsas kampaniya üçün prioritetim öyrənilən, proqnozlaşdırılan qayda və tam geri almadır. Sürpriz, qəfil inversiya, iki saniyəlik klon və sıxan timer ləğv edilmir: qısa optional Chaos/challenge profilində, açıq gözlənti və sürətli cəhdlə saxlanılır. Etibarlı final işarəsi bütün kampaniyada təsadüfən yalan danışmamalıdır. İlk sürprizdən sonra öyrənilən məlumat saxlanır; dünya undo-su ilə oyunçu biliyi eyni şey deyil.

Burada footprint gövdənin zəmin izidir: kubda bir, dik dominoda bir, uzanmış dominoda iki xana. Qəbul edilmiş gameplay əmri bir qlobal növbədir. TAB, H, kamera, dərs və rədd edilmiş giriş növbə sayılmır; buz alt-addımları eyni əmrin içindədir. Uğurlu resize, transfer, ENTER və WAIT uyğun profildə bir növbədir. Heç bir alt-elementdə açıq yazılmayıbsa boşluğu dayaqsız körpüləmə yoxdur. Qiymətlər nisbi dizayn/texniki xərcdir, iş günü və büdcə deyil.'''
baseline+='''

Qısa lüğət: anchor/lövbər cismin hesablandığı sabit xana/küncdür; queue gələcəkdə icra olunacaq əmrlər növbəsidir; snapshot dünyanın bir andakı tam surətidir; latch dəyişəndən sonra yadda qalan açar bitidir; phase/faza mexanizmin dövr addımıdır; stateKey gələcəyi fərqləndirən vəziyyət açarıdır; collision gövdələrin toqquşma yoxlamasıdır. Resize ölçü dəyişməsi, preview növbəti nəticənin önbaxışıdır. Bütün ailələrdə H bu tam vəziyyəti bilməli, Z bir əmrin bütün nəticələrini qaytarmalıdır; konkret maddə yalnız öz əlavə ehtiyacını vurğulayır.'''

def get_matrix():
    lines=c.splitlines(); start=next(i for i,l in enumerate(lines) if l.startswith('| Cüt |'))
    rows=[]
    for l in lines[start+2:]:
        if not l.startswith('|'): break
        rows.append([clean(x) for x in l.strip('|').split('|')])
    assert len(rows)==15
    return rows
matrix=get_matrix()
for row in matrix:
    if row[0]=='M3+M4': row[3]='Klonun bədəni level başlanğıcındakı sabit formadır; resize əmri WAIT yazılır. Cari böyük blokla kiçik klon fərqi açıq göstərilir.'
    if row[0]=='M4+M6': row[3]='Teleportla nəticələnən mənbə əmri queue-ya WAIT yazılır; klon teleport olmur. Dünya snapshot-u tamdır, replay payload isə MOVE/WAIT-dir.'

recipes=[]
for m in re.finditer(r'\*\*(R\d)\s+[-—]\s+([^*]+)\*\*',c):
    end=c.find('\n\n',m.end()); end=len(c) if end<0 else end
    recipes.append({'id':m.group(1),'title':m.group(2),'body':clean(c[m.end():end])})
assert len(recipes)==8,len(recipes)
recipes[3]['body']='A birdəfəlik yolu tərk edir; iki qəbul edilmiş gediş sonra həmin istiqamətə gələn klon boşalmış hüceyrədə dayağını itirib cəhd bitənədək sönür. Qəhrəmanlar sırf buna görə ölmür. Dərk: dəyişən yol həm öz marşrutunu, həm gələcək təhlükəni formalaşdırır. Kölgə plitəni özü qırmır; real blokun tərk etməsi qırır. Queue önbaxışı həmin sönməni də göstərir. Z qırılmış səthi və klonu birlikdə qaytarır, R klonu yenidən yaradır. Bu konseptdə klonun təhlükəsini söndürmək B üçün yol açır; geri çıxışın kilidlənməməsi konkret xəritədə yoxlanmalıdır. Yüksək çətinlik, ayrıca iki qaydalı laboratoriya; ölməz havada gedən klon bu variantın gizli qaydası deyil.'
recipes[5]['body']='İki blokun lövbərləri eyni sətirdə və aralarında divar olmadıqda N4.1 rezonansı ayrıca keçidi açır; M1.5 phantom sahənin dayağını isə yalnız partnyorun Manhattan radiusu saxlayır. Oyunçu həm yaxın qalmağı, həm xəttdən çıxmamağı planlayır. Domino uzananda rezonansın diklik şərti itir, müşahidə radiusu isə anchor-dan hesablanmağa davam edir. İki şərt fərqli xətt və dairə ilə göstərilir. H hər iki predikatı, Z onların dünya nəticələrini birlikdə nəzərə alır. İlk otaqda radius və rezonans ayrıca öyrədilir; sonra bir qısa marşrutda birləşir. Bu ikiqat şərtin hər iki çıxışa imkan verməsi hələ koordinatla yoxlanmayıb. Orta/yüksək çətinlik; ailələr ayrıca tanış olandan sonra.'
recipes[7]['body']='Kiçik A M6.4 saxta finalını açır, staging yerinə ötürülür və geri yol qıfılı açılır. Bu teleport mənbə queue-suna WAIT yazır; klon özü teleport olmur və başlanğıcdakı kiçik formasını saxlayır. Sonra A açıq cihazda domino olur; resize da queue-da WAIT-dir. İndi real böyük bədənlə kiçik klon fərqli dəhlizlərə sığır, B açılmış yol ilə çıxış hazırlayır. Dərk keçmiş əmrlərlə cari formanın ayrı qaydalar olmasıdır, tarixi forma replay-i deyil. H klonun dəyişməz bədəni, queue, latch və cari böyük footprint-i göstərir. Z hamısını birlikdə qaytarır. Bu üçlü sınaq yalnız hər ailə tanış olanda verilsin; qısa yolda kəsişmə və həllolunma hələ konkret xəritə ilə yoxlanmayıb. Yüksək çətinlik, optional laboratoriya.'

contract='''Gələcək implementasiya üçün vahid sıra belə təklif edilir. Əvvəl tam snapshot alınır və remap edilmiş niyyət cari input transformundan bir dəfə keçir. Başlanğıcdakı körpü, divar əyləci, portal bağlantısı və kölgə queue başı oxunur. Resize və teleportun bütöv çıxış həcmi/dayağı əvvəl yoxlanır; rədd edilən istifadəçi əmri heç bir saat, resurs və queue dəyişmir.

Oyunçu ilə vaxtı çatmış klon niyyətləri eyni başlanğıcdan hesablanır. Roll və buz sabit mikroaddımlarla həll edilir; klon maneəyə dəyəndə həmin əmri WAIT kimi xərcləyir. İki real blokun swap/sweep kəsişməsi bütün əmri rədd edir; real blokla qırmızı klonun belə təması isə təhlükədir. Qapı U/anchor trigger-i yalnız uyğun sabit yerə çatanda, qələbədən əvvəl işləyir. Bir gedişdə bir teleport; çıxış dolu və ya dəstəksizdirsə giriş bütöv rədd edilir, artıq hesablanmış visit/polarity dəyişmələri də commit edilmir. Təsadüfi boş ünvan axtarılmır. Baza replay payload-u yalnız dünya MOVE/WAIT-dir: teleportla nəticələnən bütün mənbə əmri WAIT yazır, klon teleport olmur. Tam WorldState snapshot-u ilə bu sadə replay payload eyni anlayış deyil.

M1.1 və yük qabığı M1.3 hər real alt-addımda yoxlanır. M1.2 tərk edilmiş alt-addım xanalarını toplayır, çökmə növbə sonunda olur; M1.6 giriş haqlarını alt-addımda xərcləyir. M2.3 polarity biti buz alt-addımında dəyişə bilər, amma yalnız NÖVBƏTİ oyunçu əmrinə təsir edir; davam edən sürüşməni döndərmir. Queue/divar saatı yenə bir qlobal əmr sayılır. Klon baza profilində zəmini dəyişmir və adi sensorları basmır. Son mövqelər commit olunur, sensorlar və körpülər yenilənir. Divarlar başlanğıcdakı əyləc siqnalı ilə faza keçir; bu növbə basılan əyləc növbəti növbədən təsir edir. Bütün real blokların dayağı və bütün həcm təhlükələri yoxlanır; klon dəstəksizdirsə cəhdin sonunadək sönür, Z həmin hadisəni geri alıb onu bərpa edə bilər. Ölüm qələbədən üstündür. Sonra yeni queue, resurs və terminal vəziyyəti birlikdə saxlanır, animasiya yalnız bu qərarı göstərir.

M3 üçün 2×2×1 plitə ilə 2×2×2 kub ayrı formadır. Bütün yeni hüceyrə və həcm dəstəklənir; gizli gap-bridging yoxdur. Retained cell/lövbər ekranda işarələnir, böyümə mərkəzdən sürüşmür. Baza +x,+z küncüdür; dörd istiqamət seçimi yalnız M3.6-da var. Ölçü avtomatik ağır rol və enerji tutumu yaratmır. Üz yaddaşı əlavə edilərsə yerli üzlər resize-da qorunur.

İki saniyəlik real-time M4 və saniyəlik M5 fixed simulation tick, timestamp və pause ilə ayrı profildir. H, dərs, menyu və fokus itkisi zamanı saat dondurulur; qayıdanda görünən qısa sayım verilir. Onların nəticələri növbəli N-gecikmə nəticələri ilə eyni leaderboard-da müqayisə edilmir. N=2 və N=3 nümunə parametrlərdir, iki saniyənin riyazi ekvivalenti deyil. Real-time üçün hazır H optimal həll zəmanəti daşımır; pause-dan sonrakı niyyət təzədən etibarlılıq yoxlamasından keçir. Təklif olunan ayrıca düymələr: E rol mübadiləsi, T enerji ötürmə, Q WAIT, Enter açıq tikiş. Bunlar implementasiya edilməyib və remap edilə bilməlidir.'''

testing='''Tam state-ə blok kimliyi/lövbəri, forma ölçüləri və fiziki üz orientasiyası, rol, floor və ziyarət sayğacları, inversiya latch-i, portal indeksi və qıfılları, enerji və anbarlar, klon pose/forması/sönməsi/queue/timestamp, divar fazası/əyləci, mexaniki tick və terminal status daxil edilməlidir. Eyni koordinat fərqli queue ilə eyni gələcək deyil. Səviyyə və qayda versiyası H cache-in hissəsidir. Mövcud stateKey yalnız hazır blok vəziyyətini saxladığından yeni ailələrə yetmir.

Hazır heuristika sabit ölçülər və mövcud keçidlər üçündür. Dinamik forma, teleport və iki aktorun bir əmrdə hərəkəti köhnə məsafə cəmini təhlükəsiz aşağı sərhəd olmaqdan çıxara bilər. Yeni transition graph və etibarlı lower bound qurulmalı, alınmırsa sıfır/zəif heuristika seçilməlidir. Axtarış limiti həll yoxdur deyil. H tərs idarədə həm hansı düymənin basılacağını, həm dünya istiqamətini göstərir; Show step eyni qaydanı işlətməlidir. Gizli məlumatda adi izah ilə istifadəçinin seçdiyi tam sirri açan kömək ayrı göstərilir.

WorldUndo bir istifadəçi əmri və bütün avtomatik nəticələrini qaytarır. KnowledgeState isə görülmüş trap, açılmış saxta final nişanı və baxılmış dərsi saxlayır; geri alma oyunçuya öyrəndiyini unutdurmur. Ölüm və restart zamanı default bilik qalır; ayrıca təzə sürpriz profili açıq seçilə bilər. Resume yalnız saxlanma müqaviləsi varsa və bütün queue/faza ilə işləməlidir; hazır README cari yarımçıq lövhənin diskdə saxlanmadığını deyir.

İlk sınaq dalğası M1.2, M2.1, M3.1, M5.2 və açıq M6.1; hərəsi əvvəl bir kiçik təhlükəsiz otaqda. Sonra M1.3+M3, M2+M6, M3+M5 münasibətləri. Yeni ailələrdən N1.1 və N4.1 əvvəl, N2 və N3 sonra. M4 ayrıca queue dərsi istəyir; real-time, iki gizli tələ və üçlü reseptlər axırda optional laboratoriyadır. Bütün 46 ideyanın eyni kampaniyada olması məqsəd deyil.

60 səviyyəlik mövcud öyrənmə yolunun üstünə birdən bu ailələr yığılmasın. Tək kub dərsində bir trigger, iki kubda qarşılıqlı asılılıq, qarışıq ölçüdə footprint, sonra domino duruşu öyrədilsin. Mövcud 30-cu səviyyədəki ilk 22 gedişlik həll yeni mod üçün uzunluq hədəfi deyil. Yeni qayda ilk dəfə qısa və animasiyalı göstərilsin; çətinlik məlumatın gizlənməsindən və məcburi uzun icradan deyil, münasibətin dərk edilməsindən gəlsin.

Yoxlama siyahısı: hər forma üçün trigger sərhədi; domino yarım-zona; resize-dayaq/tavan; teleport dolu/dəstəksiz ünvan; kölgə swap/sweep/sönmə; qırılan zəmində passiv blok; rədd input-da saatın sabitliyi; bir undo-da bütün queue/faza/resursun bərpası; restart və bilik ayrımı; H-in tam state-dən yolu; limit və həllsizliyin ayrımı; qayda versiyası dəyişəndə cache-in yenilənməsi. İnsan sınağında niyə uduzduğunu izah etmə, yeni xəritəyə transfer, təkrar icra yükü və iki blokun həqiqi zərurəti ayrıca müşahidə edilir. Bu yoxlamalar hələ icra edilməyib.'''

sources=[
('S1','Mövcud oyun README-si',str(ROOT/'demo/README.md'),'60 səviyyə, öyrənmə yolu, H və dərslər; mənbə oxunuşu, test rerun yox.'),
('S2','Mövcud məntiq',str(ROOT/'demo/src/logic.js'),'Kub/domino, hazır state və solver sərhədi; yeni mod dəstəyi iddia edilmir.'),
('S3','Unept - orijinal Level Devil prototipi','https://unept.itch.io/level-devil-prototype','Birbaşa müəllifdən rəsmi mağazalara keçid.'),
('S4','Level Devil - rəsmi mağaza','https://store.steampowered.com/app/3242750/Level_Devil/','Sürpriz/trap janrının müəllif təqdimatı; bizim əyləncə sübutumuz deyil.'),
('S5','Patrick Traynor - dizayn müsahibəsi','https://www.gamedeveloper.com/design/patrick-s-parabox-','Intuitiv qayda, öyrətmə və səviyyə iterasiyası barədə müəllif mövqeyi.'),
('S6','Xbox Accessibility Guideline 107','https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/107','Giriş alternativləri, remap və sürət/mürəkkəblik baryeri.'),
('S7','Pillow Castle - Superliminal texnologiyası','https://blog.playstation.com/2020/06/30/breaking-down-the-tech-behind-superliminals-mind-bending-illusions/','Ölçü, collision və obyekt xassələri; bizim grid qaydası eyni deyil.'),
('S8','Hempuli - Baba Is You','https://hempuli.com/baba/','Obyekt və qayda qarşılıqlı istifadəsinin müəllif təsviri.'),
('S9','Jonathan Blow - Braid rewind sessiyası','https://www.gdcvault.com/play/1012210/The-Implementation-of-Rewind-inJonathan','Dəqiq keçmiş bərpasının əhəmiyyəti; bu araşdırmada tam video izlənməsi iddia edilmir.'),
('S10','Bloxorz - ilkin tədqiqat','https://arxiv.org/abs/1411.5951','Grid və orientasiya çərçivəsi; ümumiləşdirilmiş çətinlik konkret səviyyə zövqü deyil.'),
('S11','UMass - Kirchhoff qaydaları','https://openbooks.library.umass.edu/funee/chapter/2-6/','Qorunma prinsipi; token sistemi real elektrik simulyasiyası deyil.'),
('S12','OpenStax - statik tarazlıq','https://openstax.org/books/university-physics-volume-1/pages/12-1-conditions-for-static-equilibrium','Real qüvvə/moment ilə diskret rezonansın ayrılması.')]

facts='''Mənbəli fon: Unept-in Level Devil təqdimatı sürpriz/trap oyununun nümunəsidir [S3-S4]. Traynor-un müsahibəsində intuitiv, yadda qalan qayda və ideyanı göstərən asan dərs vurğulanır [S5]. XAG107 giriş sürəti/mürəkkəbliyi və alternativ idarə baryerlərini göstərir [S6]. Superliminal developer məqaləsi ölçü ilə collision əlaqəsinin texniki yükünü izah edir [S7]. Braid rewind sessiyası dəqiq tarix bərpasına nümunədir [S9]. Bloxorz tədqiqatı grid/orientasiya çərçivəsidir [S10]. N2 və N4 real elektrik və qüvvə simulyasiyası deyil [S11-S12]. Bu faktlardan konkret alt-elementə keçid bizim sintezimizdir, mənbənin həmin mexanikanı tövsiyə etməsi deyil.'''

doc=['# Dual Grid mod kitabxanası',intro,'## Baza, müəlliflik və dizayn müqaviləsi',baseline,facts]
for k in list(parents)+list(newparents):
    title,body=(parents|newparents)[k]
    doc += [f'## {k} - {title}',body]
    for id in expected:
        if id.startswith(k+'.'): doc += [f'### {id} {items[id]["title"]}',items[id]['body']]
doc += ['## Altı ilkin modun 15 cüt uyğunluğu','Uyğun/Sına/Riskli dizayn qiymətidir, playtest nəticəsi deyil. M4 kampaniya müqayisəsi diskret gecikmədir; orijinal iki saniyə ayrıca real-time profildir.','| Cüt | Qiymət | Dərk əlaqəsi | Sərhəd |','|---|---|---|---|']
doc += ['| '+' | '.join(row)+' |' for row in matrix]
doc+=['## Səkkiz konsept resept','R1-R6 iki sistemlidir, R7-R8 üçlüdür. Bunlar koordinatlı, həlli təsdiqlənmiş səviyyələr deyil.']
for r in recipes: doc += [f'### {r["id"]} {r["title"]}',r['body']]
doc += ['## Vahid hadisə sırası və sərhədlər',contract,'## H, undo, öyrənmə və sınaq planı',testing,'## Mənbələr və araşdırma sərhədi','Araşdırma açıq ilkin mənbələr və lokal mənbə oxunuşuna əsaslanır. Müəlliflik tarixçəsi, dünyada ilkinlik, həllolunma və əyləncə zəmanəti verilmir. Sitatlar geniş köçürülməyib; aşağıdakı əlaqələr yoxlama üçündür.']
for id,title,url,use in sources: doc += [f'### {id} {title}',f'[{title}]({url}) - {use}']
OUT.write_text(clean('\n\n'.join(doc))+'\n',encoding='utf-8')
payload={'intro':intro,'baseline':baseline,'facts':facts,'parents':parents,'newparents':newparents,'items':items,'order':expected,'matrix':matrix,'recipes':recipes,'contract':contract,'testing':testing,'sources':sources}
(TMP/'modbook_data.json').write_text(json.dumps(payload,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'words':len(OUT.read_text(encoding='utf-8').split()),'subelements':len(items),'markdown':str(OUT)},ensure_ascii=True))
