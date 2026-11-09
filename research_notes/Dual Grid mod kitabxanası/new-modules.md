# Təklif etdiyimiz dörd əlavə mod ailəsi

## N1 Üz yaddaşı və kontaktlar

### Takeaway
Bu və aşağıdakı N ailələri istifadəçinin altı modundan SONRA təqdim olunacaq bizim konsept təkliflərimizdir. Yenilik və ya dünyada ilk olma iddiası yoxdur. N1 blokun yalnız yerini/duruşunu deyil, hansı üzünün hansı istiqamətə baxdığını tapmacaya çevirir.

### Cited Findings
- Bloxorz tədqiqatı dik/uzanmış həndəsi hərəkətləri ayırır; konkret rəngli fiziki üzlərin yaddaşı ayrıca dizayn qatıdır. — [van der Zanden və Bodlaender](https://arxiv.org/pdf/1411.5951)
- Qaydaları dəyişən sistemlərin obyektləri yenidən istifadə edib fərqli nəticələr yaratması Baba Is You-nun müəllif təsvirində əsas fikirdir; bizim kontakt sistemi həmin oyunun qayda-mətn sistemini təkrarlamır. — [Hempuli](https://hempuli.com/baba/)

### Inferences
**Formal baza:** tam işarələnmiş sərt cismin gridə paralel orientasiyası 24 variantla təsvir olunur: üstə baxan yerli üz üçün 6, onun ətrafında dönmə üçün 4 seçim; 6×4=24. Bu öz həndəsi sayımımızdır. Simmetrik, işarəsiz kubda bu fərqlərin hamısı vizual/funksional fərq deyil. U/X/Z yalnız yer izinin növüdür; eyni yer izində fərqli kontaktlar aşağı baxa bilər. Ölçü dəyişməsində yerli üz işarələri qorunsun; yeni üz “təsadüfən” yaranmasın.

#### N1.1 Aşağı üz açarı
**Qayda:** bir üz nişanlıdır; uyğun sensor yalnız həmin üz aşağı və bütöv kontakt sensor üzərində olanda işləyir. **Qərar/nümunə:** qapıya qısa yol düzgün üz vermir; kiçik dövrə ilə həmin koordinata başqa üzlə qayıtmaq lazımdır. **Dərs:** iki fiziki addım, dəyişən üz diaqramı və aşağı kontaktın HUD ikonası; rəng tək siqnal deyil. **Sinerji:** M3 böyük kub eyni üzlə daha geniş sahəni örtür. **Risk/xərc:** orta/yüksək; görünməyən alt üz əzbərlətməsin, hover və proqnozla göstərilsin.

#### N1.2 Yan terminal cütü
**Qayda:** divar terminalları ilə təmas yalnız uyğun nişanlı yan üz, eyni hündürlük və tam qonşuluqda baş verir; diaqonal toxunma işləmir. **Qərar:** sensoru basmaq üçün dik durmaqla yan terminalı qoşmaq üçün uzanmaq arasında seçim. **Nümunə:** bir blok terminalı bağlayır, digəri körpünü keçir, sonra birinci kontaktı dəyişir. **Dərs:** kontakt işıq xətti və “yan üz uyğun deyil” işarəsi. **Sinerji:** N4 nisbi düzülüş. **Risk/xərc:** yüksək; izometrik arxa kontaktlar kəsik görüntüdə göstərilsin. Baza variantında həqiqi elektrik cərəyanı yox, açıq ikili əlaqə qaydasıdır.

#### N1.3 İzolyasiya üzü
**Qayda:** təhlükəli səth yalnız aşağıda qalxan işarəli üz olanda keçilir; gövdənin qalan üzü toxunanda ölüm. Bütün tutulan xanalar yoxlanır. **Qərar:** qorunan üzlə düz getmək mümkündür, amma növbəti çevrilmə üzünü dəyişir; təhlükəsiz platformada marşrut hazırlamaq lazımdır. **Dərs:** tək təhlükə xanası və dərhal undo, növbəti alt üz konturu. **Sinerji:** görünməyən yol üçün artıq görünən bədən qaydası; eyni anda gizli təhlükə ilə ilk dəfə öyrədilməsin. **Risk/xərc:** orta; real material simulyasiyası kimi təqdim edilməsin.

#### N1.4 Üz ardıcıllığı yaddaşı
**Qayda:** üç dayanacaq sensoru aşağı üzü məsələn dairə→üçbucaq→xətt ardıcıllığında istəyir; yalnız həmin sensorlarda uğurlu yoxlama mərhələni irəlilədir. Səhv yoxlama mərhələni sıfırlayır, dünya ölümə getmir; undo mərhələni qaytarır. **Qərar:** hədəfə çatmaqla yanaşı orientasiya tarixçəsini planlamaq. **Dərs:** üç aydın ikon, hər mərhələnin aktiv işığı. **Sinerji:** M4 queue iki müxtəlif yaddaşı birləşdirir, yalnız advanced səviyyə. **Risk/xərc:** yüksək state artımı və yaddaş yükü; təkrar gediş yox, bir aydın orientasiya kəşfi tələb etsin.

### Gaps
Kontakt formaları və üz dövrəsi üçün prototip/həll sertifikatı yoxdur. 24 orientasiya sayımı ümumi etiketli cismin modelidir, hazır engine dəstəyi deyil.

## N2 Qorunan enerji ehtiyatı

### Takeaway
Bu ailə sərbəst yaranmayan sonlu enerji nişanları ilə iki blok arasında rol bölgüsünü dəyişir. Nişanlar real fizikanın tam simulyasiyası deyil; qorunma ideyasından götürülmüş diskret oyun resursudur.

### Cited Findings
- Kirchhoff qaydaları cərəyan düyünündə yük, qapalı konturda enerji balansını ifadə edir. Buradakı integer token economy bu fizikanın özü deyil. — [UMass elektrik mühəndisliyi dərsliyi](https://openbooks.library.umass.edu/funee/chapter/2-6/)

### Inferences
#### N2.1 Toxunaraq enerji ötürmə
**Qayda:** bloklar xüsusi transfer pad-da ortaq kənarla qonşudursa E ötürmə əmri bir vahidi seçilən blokdan digərinə keçirir; tutum aşılmır, ümumi enerji dəyişmir. Ötürmə bir növbədir. **Qərar:** qapıya enerji aparmaq üçün əvvəl blokları uyğun nöqtədə görüşdürmək. **Dərs:** A-da 2, B-də 0 → A-da 1, B-də 1, toplam sayğac sabit. **Sinerji:** M5 büdcəsi görüş yerinin dəyərini artırır. **Risk/xərc:** orta; mövcud rol exchange ilə düymə və termin fərqi göstərilsin.

#### N2.2 Enerji saxlayan keçid
**Qayda:** körpü iki nişan yatırılanadək bağlıdır; yatırılan nişan anbarda qalır. Geri çəkmə yalnız həmin terminalda əmrlə mümkündür; körpü dərhal bağlanır və dayaq yenidən yoxlanır. **Qərar:** enerjini hazır keçiddə qoymaq, yoxsa geri götürüb növbəti qapıya aparmaq. **Dərs:** blokdakı və anbardakı sayın toplamı, bağlı körpü preview. **Sinerji:** mövcud sensor təhvilinin resurslu variasiyası. **Risk/xərc:** orta/yüksək; sonsuz enerji spawn və itki olmasın; anbar state/undo hash-də saxlanmalıdır.

#### N2.3 Bölüşdürmə kilidi
**Qayda:** iki hədəf eyni sabit vəziyyətdə A-da məhz 1, B-də məhz 2 enerji tələb edir; toplam üçdür. Sayı aşmaq da uyğun deyil. **Qərar:** “daha çox həmişə yaxşıdır” deyil, düzgün paylanma və marşrut. **Nümunə:** bir sensoru keçmək üçün A müvəqqəti 2 alır, sonra çıxışdan əvvəl birini B-yə qaytarır. **Dərs:** çıxışda 1/2 ikon və cari sayla müqayisə. **Sinerji:** M3 ölçü ilə enerji tutumu baza qaydasında əlaqəsizdir. **Risk/xərc:** aşağı/orta; arifmetika məkan qərarını əvəz etməsin.

#### N2.4 Qapalı dövriyyə açarı
**Qayda:** tək battery nişanı A terminalından götürüləndə qapı A bağlanır, B terminalına qoyulanda qapı B açılır; iki terminal eyni resursu paylaşır, eyni vaxtda ikisi açıq ola bilməz. **Qərar:** partnyor qapı A-nın hansı tərəfində dayanmalıdır ki, dəyişiklikdən sonra ilişməsin? **Dərs:** iki qapılı təhlükəsiz otaqda resurs xətti; ikisinin birgə açılmaması göstərilir. **Sinerji:** M4 təhlükəni başqa dəhlizə yönləndirmək. **Risk/xərc:** orta; sırf bir açarlı rəng qapısı təkrarına çevrilməməsi üçün iki blokun yerinin səbəb olduğu qərar vacibdir.

### Gaps
Enerji qiymətləri yalnız ilkin dizayn parametrləridir. Real güc, gərginlik və cərəyan hesabı yoxdur; “fizika dəqiqliyi” iddiası edilməsin.

## N3 Məkan tikişləri və topoloji bağlantılar

### Takeaway
Bu ailə yolun haraya bağlandığını dəyişir. İstifadəçinin saxta hədəf/tələ ideyasından fərqli olaraq çıxış yeri açıq göstərilir; məna aldatma deyil, qonşuluq qrafını planlamaqdır.

### Cited Findings
- Bloxorz üçün formal hərəkət grid altçoxluğu və mövqe/duruş əlaqələridir. Bağlantıları dəyişmək bizim əlavə keçid-qrafı təklifimizdir. — [Bloxorz tədqiqatı](https://arxiv.org/abs/1411.5951)

### Inferences
#### N3.1 Cüt tikiş qapısı
**Qayda:** aktor sabit vəziyyətdə qapı meydançasına tam yerləşdikdən sonra ayrıca ENTER əmri ilə göstərilən cüt meydançaya eyni duruş/orientasiya ilə keçir. Çıxışda bütün həcm və dayaq yoxlanır; yer doludursa əmr rədd edilir. **Qərar:** partnyoru çıxış ağzından çıxarmadan ötürmə mümkün deyil. **Dərs:** iki meydançanın eyni işarəsi, çıxış gövdəsinin canlı konturu. **Sinerji:** M3 böyük gövdənin qapıya sığması. **Risk/xərc:** orta; avtomatik sonsuz portal ping-pong olmur, bir ENTER bir keçiddir.

#### N3.2 Dönən tikiş
**Qayda:** qapı yerli koordinat sistemini leveldə yazılan 90° bucaqla döndərir; gövdənin istiqaməti və bütün üz işarələri də eyni çevrilmə ilə yenilənir. Həndəsi forma dəyişmir. **Qərar:** uzaqlaşmaq üçün yox, çıxışda düzgün uzanma və kontakt üzü almaq üçün qapıdan keçmək. **Dərs:** giriş-çıxış oxları və “90°” ikon; ilk səviyyədə yalnız bir dönüş. **Sinerji:** N1 kontakt puzzle. **Risk/xərc:** yüksək; mesh dönüb state dönməsə ciddi bug. Solver keçidi vahid edge kimi bilməlidir.

#### N3.3 Açıq sarınan sərhəd
**Qayda:** ilk versiyada yalnız 1×1×1 kub üçün xəritənin işarəli sağ/sol kənarları bağlıdır; kənardan bir addım qarşı kənardakı uyğun xananı hədəfləyir. Gövdə eyni anda iki kənarı tutmur. Uzun və 2×2 cisimlər bu variantda qapı olmadan sərhədi keçə bilməz. **Qərar:** ən yaxın görünən yol həmişə ən qısa deyil; sərhəd dolayı çıxış verir. **Dərs:** bütöv lent çərçivəsi və hədəf oxu. **Sinerji:** M3 kublaşma. **Risk/xərc:** orta/yüksək; uzun blok üçün ayrıca tam seam geometry lazımdır, gizli yarım-teleport edilməsin.

#### N3.4 Dəyişən bağlantı seçicisi
**Qayda:** A girişinin iki açıq etiketli çıxışı var; partnyorun sabit sensoru hansı çıxışa bağlandığını müəyyən edir. Keçid əmri başlanğıc snapshot-dakı bağlantını götürür; gediş ortasında istiqamət dəyişmir. **Qərar:** partnyor bir yolu açmaq üçün əvvəl hazır sensorunu tərk etməlidir; keçən blok geri dönüşü yenidən bağlaya bilər. **Dərs:** yalnız aktiv çıxışa çəkilən işıq xətti və növbəti landing preview. **Sinerji:** iki bloklu əməkdaşlıq, M5 təhlükəsiz çıxış seçimi. **Risk/xərc:** yüksək, gizli yol ilə birləşdirilsə həm bağlantı, həm zəmin görünməz olmasın.

### Gaps
Portal/tikiş nümunələri literal qeyri-Evklid fizika simulyasiyası deyil, dəqiq level graph keçidləridir. Heç birinin yeniliyi və həllolunması yoxlanılmayıb.

## N4 Nisbi rezonans və bağlar

### Takeaway
Burada açar sabit yer düyməsi deyil, blokların bir-birinə nisbətidir. Fiziki qüvvə simulyasiyasından istifadə etməyən variantlar seçilir ki, nəticə grid üzərində proqnozlaşdırılsın.

### Cited Findings
- Statik tarazlıq qüvvə və fırlanma momentlərinin balansını tələb edir; aşağıdakı rezonans qaydaları bu qanunların ölçülməsi deyil. “Maqnit” və ya “bağ” estetikası seçilərsə bunun diskret, dizayn edilmiş qayda olduğu göstərilməlidir. — [OpenStax statik tarazlıq](https://openstax.org/books/university-physics-volume-1/pages/12-1-conditions-for-static-equilibrium)

### Inferences
#### N4.1 Eyni xətt rezonansı
**Qayda:** hər iki blok dikdirsə, lövbərləri eyni sətir və ya sütunda və aralarında solid divar yoxdursa rezonans qapısı açılır. Aralıq maksimum məsafə ayrıca göstərilir; əgər limitsizdirsə limit ikonu qoyulmur. **Qərar:** blok hədəfə yaxınlaşarkən xəttdən çıxır və partnyorun keçidi bağlana bilər. **Dərs:** aralarında işıq şüası, divarın onu kəsməsi. **Sinerji:** M3 uzun formaya qayıdanda diklik itir. **Risk/xərc:** orta; şüa divarın arxasında gizli işləməsin, görmə xətti deterministik grid ray olsun.

#### N4.2 Sonlu məsafə bağı
**Qayda:** blok lövbərlərinin Manhattan məsafəsi L-dən böyük ola bilməz. Qadağan addım rədd edilir, partnyoru dartmır və növbə sərf etmir. Formanın lövbəri dəyişməz; böyük gövdənin mərkəzi ilə ölçmək başqa, bu bazadan fərqli qaydadır. **Qərar:** əvvəl arxadakı bloku irəli gətirmək lazımdır; bir blokun sərbəst görünən yolu cütlüyü ayırır. **Dərs:** L və qalan məsafə, qırmızı proposed link. **Sinerji:** N3 portal yalnız çıxış məsafə şərtini ödəyirsə işləyir. **Risk/xərc:** orta; real ip kimi dolaşma/obstacle simulation yoxdur.

#### N4.3 Qarşılıqlı orientasiya kilidi
**Qayda:** iki uzun blok uzanmış və biri X, biri Z istiqamətindədirsə qapı açıqdır; yerə/sensora bağlı deyil. Dik və ya paralel olduqda bağlanır. **Qərar:** keçən blok çevriləndə qapını bağlaya bilər; digər blokun orientasiyasını əvvəl hazırlamaq lazımdır. **Dərs:** paralel ×, perpendikulyar ✓ siluetləri, aktiv qapıya xətt. **Sinerji:** M4 klon baza cütlüyün üzvü sayılmır; əlavə üzv variantı ayrıca tədris tələb edər. **Risk/xərc:** aşağı/orta; həmişə ucqar küncdə blok saxlamaqla triviallaşmaması üçün trayektoriya daraldılmalıdır.

#### N4.4 Cüt addım bağlaması
**Qayda:** xüsusi bağ rejimində seçilən blok üçün istiqamət əmri o biri bloka leveldə yazılan eyni və ya əks dünya istiqamətini verir; iki niyyət eyni snapshot-dan hesablanır. İkisindən biri fiziki maneəyə dəysə hər ikisi rədd edilir; dəstəksiz nəticə isə qəbul edilmiş təhlükəli gedişdir. **Qərar:** birinin böyük/uzun addımı o birinin yoluna uyğun gəlmir; rejimi aktivləşdirmədən əvvəl başlanğıc mövqeləri hazırlamaq. **Dərs:** iki hədəf konturu, qırmızı bir maneənin hər ikisini saxlaması. **Sinerji:** M3 müxtəlif ölçülər, M4 güzgü yalnız sonra. **Risk/xərc:** yüksək; eyni anda aktor yer dəyişmə və həcm kəsişmələri açıq qadağan edilməlidir.

### Gaps
Bütün N ailələri konseptdir, hazır oyuna əlavə edilməyib. 16 alt-element eyni kampaniyaya birlikdə salınmalı məcburi siyahı deyil. İlk sınaq prioritetim N1.1 və N4.1: az yeni UI ilə mövcud yuvarlanma/iki blok təməlini istifadə edir. N2 üçün iqtisadi resurs state-i, N3 üçün teleport heuristikası, N4.4 üçün eyni anda iki aktor keçidi həllçidə ayrıca nəzərə alınmalıdır.
