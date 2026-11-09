# DUAL GRID — 200 səviyyə ideyası və yenidənqurma qaydası

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

## M1 — Zəmin, yük və yol yaddaşı

### M1-01 — İki sahilli bərə

**Quruluş:** U formalı körfəz, iki ayrı eniş.

**Qərar və maneə:** A tərk edəndə orta plitə sınır; B əvvəl alt sahilə keçib geri körpüsünü saxlamalıdır. Tək blokla iki sahilin sensorları eyni vaxtda tutulmur.

### M1-02 — Ehtiyat giriş

**Quruluş:** Üç qollu terminal, ortada iki girişlik xana.

**Qərar və maneə:** İlk girişlə qərb açarı çıxarılır, ikinci giriş son qayıdış üçün saxlanır. Şərq qolu açılmadan final qapısı bağlıdır.

### M1-03 — Yükün paylanması

**Quruluş:** Enli qabıq yolu ilə paralel yüngül cığır.

**Qərar və maneə:** A domino uzanaraq həddi keçmir, B dar cığırdan forma stansiyasını açır. Dik A qabığı çökdürür, B isə ağır final sensorunu işə sala bilmir.

### M1-04 — Sökülən dairə

**Quruluş:** Halqa, dörd diş, bir mərkəzi boşluq.

**Qərar və maneə:** Üç kilidi açmaq üçün halqanın hansı hissəsini sonuncu tərk edəcəyini seç. Yanlış sökülmə qapını deyil, qayıdışın özünü kəsir.

### M1-05 — Müşahidə estafeti

**Quruluş:** Paralel əyri sahillər və şəffaf ara yol.

**Qərar və maneə:** A ilə B növbə ilə yaxınlıq dayağını qabağa daşıyır. Sahillərdə çıxıntılar olduğuna görə sabit məsafə ilə düz yerimək kifayət etmir.

### M1-06 — Sahilsiz açar

**Quruluş:** T formalı asma budaq, ucunda açar.

**Qərar və maneə:** A açara gedərkən B dəstəyi yan qola ötürür; geri dönəndə A dəstəkçi olur. Sensorun özü çıxış deyil, iki mərhələli mübadilə lazımdır.

### M1-07 — Sonuncu keçən

**Quruluş:** Y formalı ayrıc və təkistifadəlik boğaz.

**Qərar və maneə:** İki blok boğazdan hansı ardıcıllıqla keçəcəyini seçir. Uzaq tərəfdə ağır və yüngül girişlər əks ardıcıllıq tələb edir.

### M1-08 — Çatın altında yol

**Quruluş:** Yuxarı qabıqla aşağı servis dövrəsi.

**Qərar və maneə:** A qəsdən müəyyən qabığı sındıraraq B-nin aşağı qapısına yük siqnalını kəsir. Sındırılacaq hissə final üçün lazım olan hissədən ayrıdır; yeni qırılma-trigger qaydası tələb edir.

### M1-09 — Üç körpü, iki can

**Quruluş:** Üç ada üçbucağı.

**Qərar və maneə:** Hər körpü bir dəfə istifadə olunur; başlanğıcdakı iki blok bütün sensorları bitirib eyni adada görüşməlidir. Körpü ardıcıllığı Euler gəzintisi deyil, iki marşrutun bölüşdürülməsidir.

### M1-10 — Yük karantini

**Quruluş:** İki meydanı bağlayan dama-dama zolaq.

**Qərar və maneə:** A yalnız uzanmış, B yalnız kub kimi müxtəlif təhlükəsiz xanaları seçir. Ortada forma dəyişmək mümkün olmadığı üçün giriş duruşu öncədən hazırlanır.

### M1-11 — Boşaldılmayan dayaq

**Quruluş:** Dar səkkiz şəkilli döngə.

**Qərar və maneə:** B keçənədək A bir dəfəlik xananı tam boşaltmamalıdır. Dominonun yarım izi saxlanır, sonra A digər istiqamətə yuvarlanıb çıxır.

### M1-12 — Qayıdış üçün bir haqq

**Quruluş:** İki mərtəbə hissi verən pilləli meydanlar.

**Qərar və maneə:** İki girişlik plitənin ilk istifadəsini B-yə yox, A-ya vermək lazımdır: A üst qolun kilidini açır. Son giriş B-ni aşağı finala qaytarır.

### M1-13 — Çəkilən xalça

**Quruluş:** Ziqzaq yol və üç təhlükəsiz dayanacaq.

**Qərar və maneə:** Arxa hissə hər çıxışda sökülür; dayanacaqlarda iki blokun yerini dəyişmək üçün yan ciblər lazımdır. Sonuncu kimin irəlilədiyi final nişanlarının tərəfi ilə məhdudlaşır.

### M1-14 — Qabıq anbarı

**Quruluş:** Dörd otaq, yük-həddi fərqli üç boğaz.

**Qərar və maneə:** A bir dəfə böyüyür, sonradan stansiyaya qayıda bilmir. Hansı boğazı hansı formada keçmək lazım olduğu bütün marşrutu müəyyən edir.

### M1-15 — Bölünən müşahidə

**Quruluş:** Dairəvi xarici yol, içəridə iki qırıq diaqonal.

**Qərar və maneə:** B kənarda dayananda yalnız bir diaqonal realdır. A mərkəzə çatdıqdan sonra rollar dəyişir; birbaşa mərkəzə tələsmək B-ni dayağından məhrum edir.

### M1-16 — Möhürlü adacıq

**Quruluş:** Beş yarpaqlı ada dəstəsi.

**Qərar və maneə:** Hər yarpaqdan çıxış plitəsi bir dəfəlikdir; yalnız iki yarpaqda daimi geri yol var. Açarların yığılma sırası gələcək sığınacağı qoruyur.

### M1-17 — İşıqdan asılı döşəmə

**Quruluş:** İki otaq və ortasında deşikli meydan.

**Qərar və maneə:** İki relay eyni zolağın müxtəlif yarılarını açır. B bütöv yolu açmağa çalışmır; A aralıq adada dayanıb ikinci yarını özü işə salır.

### M1-18 — Kütlə növbəsi

**Quruluş:** Əyri dar kanal, iki enli cib.

**Qərar və maneə:** Eyni qabıqdan yüngül B ilk keçib yük stansiyasını açır; A yüngülləşir, lakin B ağırlaşdığı üçün əvvəlki cığırdan qayıda bilmir. Qayıdış başqa cibdən qurulur.

### M1-19 — Giriş deyil, çıxış

**Quruluş:** Çarpaz körpülər, ortada saxlanılan blok.

**Qərar və maneə:** Plitə basanda deyil, son blok çıxanda qırılır. Bir blok ortada gözləyərək digərinin yan qol səfərini mümkün edir; ikisini də erkən çıxarmaq yolu kəsir.

### M1-20 — Sınmadan əvvəl möhür

**Quruluş:** Spiral xarici yol və qısa iç boğaz.

**Qərar və maneə:** İç boğazın üstündə dayanaraq uzaq qapını möhürlə, sonra boğazı qırıb xarici yoldan dön. Möhür əvvəl vurulmasa geri yol qapısı açılmır.

## M2 — Koordinatlar və idarə yaddaşı

### M2-01 — İki kompaslı liman

**Quruluş:** Bir-birinə perpendikulyar iki dar yol.

**Qərar və maneə:** A x oxunda, B z oxunda çevrilir; relay təhvili ilə hər birinin çıxış duruşu dəyişir. Təhlükə sürət deyil, fərqli dünya hərəkətlərini planlamaqdır.

### M2-02 — Rotordan sonra körpü

**Quruluş:** L formalı iki boğaz və geniş dönmə meydanı.

**Qərar və maneə:** Domino 90° zonaya hansı vəziyyətdə girdiyinə görə körpüyə dik və ya uzanmış çıxır. Körpü yalnız uzanmış girişi götürür.

### M2-03 — Yadda qalan sərhəd

**Quruluş:** İki halqalı yol, bir polarite qapısı.

**Qərar və maneə:** Sərhədə yenidən tam giriş biti çevirir; sağ halqaya getməzdən əvvəl sol halqada biti hazırla. Qapı tələb olunan bit yoxdursa fiziki bağlıdır.

### M2-04 — Kompas mübadiləsi

**Quruluş:** Aşağı keçidli iki otaq.

**Qərar və maneə:** İki blokun polaritesini görüş terminalında dəyişmək olar. B dar çıxış üçün A-nın bitini götürür, A isə qayıdış rotorunu başqa bitlə keçir; yeni bit-mübadiləsi qaydasıdır.

### M2-05 — Buzda dönüş

**Quruluş:** Üç dayanacaqlı əyri buz kanalı.

**Qərar və maneə:** İdarə əvvəl dünya istiqamətinə çevrilir, sonra buz sürüşdürür. Dayanacağı partnyor tutaraq A-nın növbəti rotor girişini dəyişir.

### M2-06 — Yanlış tərəfdən doğru giriş

**Quruluş:** U şəkilli otaq və tək yönlü rotor girişi.

**Qərar və maneə:** Çıxışa yaxınlaşmaq əvəzinə arxa dövrədən girmək lazımdır; rotorun tam-iz şərti dominoya yan giriş vermir. Kub B qıfılı açıb həmin arxa dövrəni saxlayır.

### M2-07 — Sabit düymə, dəyişən xəritə

**Quruluş:** Ortası dönən kvadrat və dörd qol.

**Qərar və maneə:** Yerli oxları bir terminal dəyişir, dünya qapıları yerində qalır. Növbəti qolu açan niyyət cari transformda yalnız bir təhlükəsiz meydandan icra olunur; yeni yönlü-komanda sensorudur.

### M2-08 — İki sərhədin pariteti

**Quruluş:** Üçbucaq halqa içində ayrı iki zona.

**Qərar və maneə:** Birinci sərhəd x-i, ikinci z-ni çevirir. Final üçün hər ikisini yox, yalnız birini aktiv saxlayan dövrə seçilməlidir.

### M2-09 — Tərs tərəzi

**Quruluş:** Mərkəzdə ağır sensor, kənarda güzgülü dəhlizlər.

**Qərar və maneə:** A sensoru tərk edəndə B-nin idarəsi dərhal normallaşır. B əvvəl təhlükəsiz cibə girməsə növbəti düzgün görünən əmr onu boşluğa aparır.

### M2-10 — Rotasiya kilidi

**Quruluş:** Üç ayrı kompaslı otaq.

**Qərar və maneə:** Çıxış qapısı müəyyən orientasiya tələb edir, ancaq son otaqda dönüş üçün yer yoxdur. Həmin orientasiya əvvəlki otaqda hazırlanır.

### M2-11 — Bir blok, iki tarix

**Quruluş:** Qarmaqşəkilli yol və polariteyə bağlı körpü.

**Qərar və maneə:** Eyni yerə iki dəfə qayıtmaq lazımdır, lakin ikinci dəfə bit fərqlidir. Körpü yalnız ikinci vəziyyətdə real olduğundan koordinatın özü həll deyil.

### M2-12 — Kompası söndür

**Quruluş:** Xarici düzbucaqlı yol və daxili dar spiral.

**Qərar və maneə:** B kənardan generatoru saxlayır, A spirala girir; ortadakı relay təhvil alınanda generator sönür. A-nın qayıdışı artıq normal oxlarla planlanır.

### M2-13 — Dördüncü tərəf

**Quruluş:** Çıxışı üç tərəfdən divarlı rotor meydanı.

**Qərar və maneə:** Domino bir neçə yan yuvarlanma ilə qapının tələb etdiyi üzü hazırlayır. Sadəcə ox çevrilməsini bilmək kifayət etmir, N1 orientasiyası da tələb olunur.

### M2-14 — Sərhədi paylaşma

**Quruluş:** Daraqşəkilli iki paralel koridor.

**Qərar və maneə:** Sensor iki blok tam zonada olanda aktivdir. B dişlərdən birində gözləyir, A öz footprint-ini içəri tamamlayır; yarım giriş heç nə açmır.

### M2-15 — Əks istiqamətli enerji

**Quruluş:** İki enerji terminalı və arada çevrilən yol.

**Qərar və maneə:** Enerjili blokun idarəsi invers, boşunki normaldır. Enerji ötürməsi növbəti hərəkət xəritəsini də dəyişir; yeni enerji-transform bağlantısı tələb edir.

### M2-16 — Şalterin baxdığı tərəf

**Quruluş:** Pilləli üç balkon.

**Qərar və maneə:** Şalteri yalnız doğru yan üzü ilə yaxınlaşan domino aktivləşdirir. Rotor zəruri istiqaməti hazırlayır, aşağı balkonda təsadüfi F kifayət etmir.

### M2-17 — Qapalı kompas dövrəsi

**Quruluş:** İki keçidli səkkiz otaq.

**Qərar və maneə:** Hər tam zona girişi növbəti körpünün istiqamətini seçir. Dörd mərhələli dövrəni tamamlamadan başlanğıc çıxışı açılmır; yeni görünən dövr sayğacı tələb edir.

### M2-18 — Sabit partnyor

**Quruluş:** Tək dayanacaqlı S kanalı.

**Qərar və maneə:** A-nın transformu B-nin hansı sətirdə olduğundan asılıdır. B-ni irəli aparmaq A-nın çıxışını kəsir; öncə A-nı aralıq sığınacağa çıxartmaq lazımdır.

### M2-19 — İki ayrı final əmri

**Quruluş:** Ayrılan çəngəl, hər ucda başqa sensor.

**Qərar və maneə:** Bloklar eyni giriş əmri ilə müxtəlif dünya istiqamətlərinə gedirlər. N4 cüt addımı hər ikisini eyni vaxtda sensorlara qoymalıdır, ayrı-ayrı qoymaq qapını saxlamır.

### M2-20 — Xəritəni deyil, yaddaşı dəyiş

**Quruluş:** İç-içə iki düzbucaqlı, bağlanan qısayol.

**Qərar və maneə:** Qısayol ilk istifadə zamanı polariteni möhürləyir. Son məqsəd üçün lazım olan bit əvvəlcədən hazırlanmalıdır; qısayoldan sonra əlavə çevrilmə imkanı yoxdur.

## M3 — Ölçü və forma

### M3-01 — Dörd kontaktlı təhvil

**Quruluş:** Aşağı tunel və yuxarı enli körpü.

**Qərar və maneə:** A 2×2 izi ilə dörd kontaktı tutur, B yuxarı keçir. B uzaq relay-i tutandan sonra A kiçilib aşağı tuneldən çıxır.

### M3-02 — Böyümə küncü

**Quruluş:** Sütunlu həyət və küncdə forma stansiyası.

**Qərar və maneə:** Böyümə sağa-aşağı iz açır; A düzgün küncə yanaşmalıdır. Yanlış küncdə divar genişlənməni bloklayır, final isə böyük kub istəyir.

### M3-03 — Hündürlük borcu

**Quruluş:** Üç alçaq darvaza və bir dik sensor.

**Qərar və maneə:** Kub alçaq darvazalardan keçir, domino ağır sensoru dik tutur. Son darvazadan əvvəl yenidən kiçilmək və çıxışdan sonra böyümək üçün stansiyalar fərqli qollardadır.

### M3-04 — Enli, amma alçaq

**Quruluş:** Yastı tavanlı meydan və iki kontakt cütü.

**Qərar və maneə:** 2×2×1 plitə keçir, 2×2×2 kub tavana dəyir. A yastı formada kontaktları tutarkən B final yüksəldicisini açır.

### M3-05 — Ölçü anbarı

**Quruluş:** Üç qapılı servis otaqları.

**Qərar və maneə:** Bir stansiya yalnız kiçildir, digəri yalnız böyüdür. Yol seçimi ölçü dövrəsinin geri dönməz ardıcıllığı ilə məhdudlaşır.

### M3-06 — Uzanmaq üçün yer

**Quruluş:** İki enli meydanı bağlayan dar dirsək.

**Qərar və maneə:** Domino dirsəkdə dönə bilmir; əvvəl kuba çevrilir, o tərəfdə yenidən domino olur. Stansiyanı açan B isə dirsəyin əks tərəfində başlamalıdır.

### M3-07 — Daşınan tavan kilidi

**Quruluş:** Açıq həyət, içində üç alçaq tağ.

**Qərar və maneə:** B şalterlə tavanlardan birini qaldırır. A böyük formada sensorun yükünü saxlayaraq yalnız qaldırılmış tağdan keçə bilər; kiçilmə kilidi yenidən bağlayır.

### M3-08 — Körpünün eni

**Quruluş:** İki paralel yol, biri dar, biri zəif.

**Qərar və maneə:** B dar yoldan keçir, A geniş izə yayılıb zəif yoldan keçir. Görüşdən sonra məqsədlər əks sahildə olduğuna görə relay təhvili lazımdır.

### M3-09 — Bir stansiyanın iki tərəfi

**Quruluş:** Divarla ayrılan iki yarım həyət.

**Qərar və maneə:** Stansiyanın iki yaxınlaşma küncü ayrı boş sahələrə böyüdür. A ortaq bir nöqtədə dayanıb ölçü dəyişməklə digər tərəfə qanunsuz keçə bilməz; tam footprint və swept collision yoxlanır.

### M3-10 — Üç forma, bir açar

**Quruluş:** U formalı qala, içində aşağı tunel.

**Qərar və maneə:** A kubla açarı alır, domino ilə körpünü keçir, plitə ilə final dövrəsini birləşdirir. Stansiyalar bu ardıcıllığı fiziki məsafələrlə məcbur edir.

### M3-11 — Geri sığmayan

**Quruluş:** Dar girişdən geniş altıbucaqlı otağa keçid.

**Qərar və maneə:** B giriş şalterini bağladıqdan sonra A böyük qalır. Çıxış üçün digər tərəfdə kiçilmə stansiyasını B-yə açdırmaq lazımdır; girişdən geri dönmək həll deyil.

### M3-12 — Kütlə yox, iz

**Quruluş:** Həddli dörd plitə və ağır ayrıca düymə.

**Qərar və maneə:** Eyni kütlə müxtəlif izlə paylanır; qabıqda yastı, sensor üzərində dik forma lazımdır. Sadəcə böyük olmaq bütün şərtləri ödəmir.

### M3-13 — Böyümənin açdığı yol

**Quruluş:** Aralı dayaq adaları və kontakt boşluğu.

**Qərar və maneə:** 2×2 plitə dörd sensoru tutub ayrıca körpünü açır; özü boşluq üzərində körpü sayılmır. B bu açılan yoldan o tərəfə keçir.

### M3-14 — İki kiçikdən bir böyük

**Quruluş:** İki görüş meydanı, arada qapalı boğaz.

**Qərar və maneə:** A-nın böyümə icazəsi yalnız B yaxın terminalda olanda verilir. Böyüdükdən sonra B-nin qayıdışı üçün A başqa kontaktı tutmalıdır; yeni icazə-terminalı qaydasıdır.

### M3-15 — Forma möhürləri

**Quruluş:** Üç fərqli formalı nişanı olan qollar.

**Qərar və maneə:** Möhürlər kub→plitə→dik domino ardıcıllığında vurulur. Hər möhür başqa qolun qapısını açır, istənilən sırada toxunmaq nəticə vermir.

### M3-16 — Tərs ölçü seçimi

**Quruluş:** Biri qısa, biri uzun olan iki dövrə.

**Qərar və maneə:** Qısa yol böyük iz tələb edir, amma böyük iz çıxış tağına sığmır. Əvvəl uzun yoldakı kiçilmə stansiyasının kilidini açıb sonra qısayoldan istifadə etmək lazımdır.

### M3-17 — Sütunlar arasındakı diaqonal

**Quruluş:** Sərbəst həyət içində ofset sütunlar.

**Qərar və maneə:** Son iz boş olsa da yuvarlanmanın qövsü sütuna dəyir. A aralıq formada başqa tərəfdən yaxınlaşır; yalnız end-position yoxlaması qəbul edilmir.

### M3-18 — Bir dəfə böyü

**Quruluş:** Spiral qapılar və biristifadəlik stansiya.

**Qərar və maneə:** Böyümə yalnız bir dəfə mümkündür; hansı otaqda etmək lazım olduğu son sensorla tunellərin sırası ilə müəyyənləşir. Yeni stansiya-istifadə biti undo-da saxlanır.

### M3-19 — Çıxışı saxlayan çəki

**Quruluş:** İki final platforması, ortada alçaq körpü.

**Qərar və maneə:** A finala böyük formada çatanda B-nin yolu açılır; sonra A-nın kiçilməsi B-ni sala bilər. Son yerləşmələr eyni vaxtda sabit olmalıdır.

### M3-20 — Forma ilə portal

**Quruluş:** Dar portal önü və geniş çıxış meydanı.

**Qərar və maneə:** Portal tam çıxış footprint-ini yoxlayır. Kiçik keçib uzaqda böyümək lazımdır; dolu çıxışı zorla itələmək və ya divardan keçmək mümkün deyil.

## M4 — Yazılmış hərəkət və faydalı əks-səda

### M4-01 — İki açarın eyni anı

**Quruluş:** Ayrı otaqlarda eyni anda tutulmalı düymələr.

**Qərar və maneə:** Əvvəl bir otaqda üç əmrlik kölgə proqramı yaz, sonra digər otaqda öz hərəkətini onunla uyğunlaşdır. Kölgə qapını açdığı üçün zəruridir, sadəcə arxadan gəlmir.

### M4-02 — Tərs izlə keçid

**Quruluş:** Güzgülü yox, fərqli maneəli iki balkon.

**Qərar və maneə:** Yazılmış marşrutun güzgüsü ikinci balkonda relay-ə çatmalıdır. Orijinal marşrut həm öz yoluna, həm əks izdəki maneələrə uyğun seçilir.

### M4-03 — Gözlə düyməsi

**Quruluş:** Bir uzun və bir qısa yan yol.

**Qərar və maneə:** Əks-səda düyməni dörd gediş sonra tutur; A qısa yolun təhlükəsiz cibində WAIT ilə fazanı uyğunlaşdırır. Gözləmə görünən proqram addımıdır, gizli saniyə deyil.

### M4-04 — Yazını yarıda kəs

**Quruluş:** Üç qollu qeyd meydanı.

**Qərar və maneə:** Proqram uzunluğunu oyunçu seçir; çox uzun yazı kölgəni düymədən çıxarır. Doğru son nöqtə və uzunluq birlikdə tapılır.

### M4-05 — Qeyd edilən forma

**Quruluş:** Geniş qeyd həyəti, dar icra dəhlizi.

**Qərar və maneə:** Kölgə resize əmrlərini də icra edir. Proqram icra sahəsində sığmalı, orijinal blok isə həmin vaxt ayrı sensoru saxlamalıdır; yeni forma-qeyd dəstəyi tələb edir.

### M4-06 — Gecikən körpü

**Quruluş:** Pilləli üç ada.

**Qərar və maneə:** Kölgə keçmiş mövqedə dayaq relay-ni saxlayır, A növbəti adaya keçir. Gecikmə boyunca dayaqsız qalan aralıq üçün əvvəlcədən WAIT yazılır.

### M4-07 — İki yazıdan biri

**Quruluş:** İki proqram terminalı, bir dar boğaz.

**Qərar və maneə:** Sol proqram qapını açır, sağ proqram körpünü saxlayır; yalnız biri aktiv ola bilər. A aralıq adada proqram dəyişdirən fiziki terminala çatmalıdır.

### M4-08 — Əks-sədanı park et

**Quruluş:** Dairəvi otaq və mərkəzi ağır sensor.

**Qərar və maneə:** Son əmrdən sonra kölgə yerində qalır. Qeyd sonu sensor üzərində hazırlanır, A isə boşalan xarici dövrədən çıxır.

### M4-09 — Söndürülən qeyd

**Quruluş:** Açılan divarların ayırdığı iki sektor.

**Qərar və maneə:** Kölgə birinci sektoru açır, ancaq finalda onun saxladığı qapı bağlı olmalıdır. A uzaq terminaldan kölgəni söndürüb başqa yolla qayıdır.

### M4-10 — Yaddaş releləri

**Quruluş:** Dörd otaqdan ibarət zəncir.

**Qərar və maneə:** Qeyd birinci düyməni saxlayır, A ikinciyə çatıb yeni qeydlə təhvil alır. Qeydləri sərhədsiz çoxaltmaq olmaz, yalnız bir aktiv yuva var.

### M4-11 — Yazının kəsişməsi

**Quruluş:** Çarpaz iki koridor və iki yan cib.

**Qərar və maneə:** Kölgə ilə eyni xanaya eyni addımda girmək bloklanır. A cibi seçərək kəsişmənin vaxtını dəyişir; ölüm yox, əvvəlcədən görünən konflikt var.

### M4-12 — Fərqli başlanğıc məsafəsi

**Quruluş:** İki uzunluğu bərabər olmayan sahil.

**Qərar və maneə:** Eyni proqram uzaq balkonda boşluğa düşməməlidir. Qeyd meydanında əlavə dolama proqramın sonunu düzgün relay-ə gətirir.

### M4-13 — Yaddaşın qapısı

**Quruluş:** Girişə bağlanan proqram otağı.

**Qərar və maneə:** Yazı ilk icra olunanda giriş kilidlənir. Proqram gələcək qayıdış düyməsini də əhatə etməlidir, yalnız çıxışı açan qısa yazı kifayət etmir.

### M4-14 — Kölgənin yükü

**Quruluş:** Qabıq və ağır sensor arasında ayrıc.

**Qərar və maneə:** Əks-səda forma və kütlənin qeyd anındakı vəziyyətini saxlayır. Yüngül qeydlə qabıq keçilir, ağır final isə canlı bloka qalır; yeni snapshot-kütlə qaydasıdır.

### M4-15 — Tərs sırada lent

**Quruluş:** Bir girişli spiral və yan şalterlər.

**Qərar və maneə:** Terminal lentin əmrlərini tərs sıra ilə icra edir, istiqamətləri çevirmir. Proqram bu fərqə uyğun yazılır; UI hər iki yolu göstərir.

### M4-16 — Yarım sürətli lent

**Quruluş:** İki paralel cığır və aralı relay-lər.

**Qərar və maneə:** Kölgə hər iki qəbul edilmiş əmrdən bir addımlayır. A addım büdcəsi ilə relay pəncərələrini uyğunlaşdırır; saniyəlik yarış yoxdur.

### M4-17 — Qeyd və enerji

**Quruluş:** Terminal, enerji qapısı və uzaq sensor.

**Qərar və maneə:** Kölgəni işlədən batareya məhduddur; terminala geri qoyulan enerji ikinci mərhələ üçün saxlanır. Proqramı lüzumsuz uzun yazmaq resursu tükəndirir; yeni enerji xərci açıq göstərilir.

### M4-18 — Fazalı divardan keç

**Quruluş:** İki fazalı dar otaq və təhlükəsiz yan meydan.

**Qərar və maneə:** Kölgə növbəli divarın şalterini hər üçüncü addım tutur. A keçidə həmin mərhələdən əvvəl girib təhlükəsiz meydanda çıxmalıdır.

### M4-19 — Yazı daşıyan portal

**Quruluş:** Ayrı qeyd adası və iki icra adası.

**Qərar və maneə:** Portal proqramı saxlayır, icra başlanğıcını dəyişir. Eyni proqramı iki adada işlətmək məcburidir, adaların maneələri fərqli rol bölüşdürməsi yaradır.

### M4-20 — Son yazını sil

**Quruluş:** Üç qapılı final meydanı.

**Qərar və maneə:** Qeyd bir qapını açır, eyni zamanda finalı kilidləyir. A əvvəl daxil olur, sonra içəridəki silmə terminalını işə salaraq əsl çıxışı açır.

## M5 — Divarlar və məkanın yenidən qurulması

### M5-01 — Üç fazalı pres

**Quruluş:** Üç təhlükəsiz ciblə bölünən uzun koridor.

**Qərar və maneə:** Divar hər qəbul edilmiş əmrdə bir faza dəyişir. A ciblər arasında planla keçir, B yan şalterlə bir fazanı saxlayır; düşünərkən saat işləmir.

### M5-02 — Birini aç, birini daralt

**Quruluş:** İki alternativ dövrə və mərkəzi şalter.

**Qərar və maneə:** Şalter bir yolu açıb digərini daraldır. Blokları eyni tərəfdə saxlamaq çıxışı kəsir, əvvəl ayırmaq lazımdır.

### M5-03 — Sürüşən arakəsmə

**Quruluş:** Dörd otaqlı xaç planı.

**Qərar və maneə:** Arakəsmə mərkəzdən yalnız boş olanda keçir. A və B fərqli otaqlara əvvəlcədən yerləşərək keçid istiqamətini dəyişirlər.

### M5-04 — Divarın arxasındakı şalter

**Quruluş:** Zəncirvari üç kilidli kamera.

**Qərar və maneə:** Birinci şalter ikinci kameranı, ikinci üçüncünü açır; üçüncü əvvəlki qayıdış yolunu azad edir. Başlanğıc finalı ən son kiliddən asılıdır.

### M5-05 — Hərəkətli tavan

**Quruluş:** İki hündür zal və arada enən tağ.

**Qərar və maneə:** B tavanı qaldıranda A domino keçir; B özü çıxmaq üçün A-nın uzaq düyməni tutmasını gözləyir. Ölçü və təhvil birlikdə işləyir.

### M5-06 — Daralan anbar

**Quruluş:** Kənarlardan deyil, seçilən sütundan gələn divar.

**Qərar və maneə:** Oyunçu divarın hansı kanala çəkiləcəyini seçir. Kanal seçimi sonrakı böyük footprint üçün boş meydanı saxlamalıdır.

### M5-07 — Əks çəkili iki divar

**Quruluş:** Bir geniş otaqda bir-birinə bağlı iki panel.

**Qərar və maneə:** Biri sağa gedəndə digəri sola gedir. İki blok panel arxalarında ilişməmək üçün fərqli vaxtda cibi dəyişir.

### M5-08 — Yolu uzadan təhlükəsizlik

**Quruluş:** Qısa pres dəhlizi və uzun servis halqası.

**Qərar və maneə:** Uzun yoldakı şalter presi söndürür, amma servis çıxışını bağlayır. A presdən keçir, B servisə geri dönmədən ikinci kilidi açır.

### M5-09 — Sabitlənən faza

**Quruluş:** Üç fazalı dişli zal.

**Qərar və maneə:** Mərkəzi ağır sensor cari divar fazasını dondurur. A doğru fazada sensoru tutmalı, B qapıları keçəndən sonra onu buraxmalıdır.

### M5-10 — Buzun son divarı

**Quruluş:** Buz xətti və sürüşdürülən stop paneli.

**Qərar və maneə:** Panelin mövqeyi sürüşmənin harada bitəcəyini müəyyən edir. Əvvəl uzaq şalteri, sonra yaxın finalı əldə etmək üçün iki müxtəlif stop lazımdır.

### M5-11 — Bağlanan pəncərə

**Quruluş:** Üst və alt yolu olan səkkizşəkilli plan.

**Qərar və maneə:** Pəncərə iki gediş açıq qalır. A yaxınlıqda əvvəlcədən dayanır, B açan kimi keçir; sonrakı mərhələdə rollar əksinədir.

### M5-12 — Bir istiqamətli arakəsmə

**Quruluş:** Daraq otaqlar və yalnız sağa sürüşən panel.

**Qərar və maneə:** Panel geri çəkilmir; hər hərəkət bir otağı itirib yenisini açır. Açarların yığılma sırası itiriləcək otaqlara görə seçilir.

### M5-13 — Kilidli dayaq sütunu

**Quruluş:** İki körpünün ortaq dayağı olan həyət.

**Qərar və maneə:** Panel çəkiləndə bir körpü açılır, o biri dayaq itirir. B uzaq dayaq sensorunu əvvəl tutmalıdır ki, A-nın yolu çökməsin.

### M5-14 — Divarla çevrilən kompas

**Quruluş:** Asimmetrik rotor zalı.

**Qərar və maneə:** Panel rotor zonasının girişini dəyişir; domino eyni transforma başqa duruşda daxil olur. Panelin dəyişməsi həllə həndəsi təsir göstərir.

### M5-15 — İki səviyyəli icazə

**Quruluş:** Üç otaq və iki şalter nişi.

**Qərar və maneə:** Birinci şalter panel motorunu, ikinci onun hədəf mövqeyini açır. Sonuncu qapının arxasına blok göndərməzdən əvvəl geri idarə imkanı saxlanır.

### M5-16 — Boşluq yaradan divar

**Quruluş:** Dairəvi yolun sürüşən iki parçası.

**Qərar və maneə:** Panel bir tərəfi döşəmə ilə doldurub arxada boşluq yaradır. Son vəziyyət hər iki blok üçün dayaq verməlidir; üstündə blok varkən teleport yoxdur, yeni hərəkətli-döşəmə sistemi tələb edir.

### M5-17 — Sıxışma deyil, çeşidləmə

**Quruluş:** Üç enli cib və ölçüyə görə keçən boğazlar.

**Qərar və maneə:** Divar böyük A-nı geniş cibdə, kiçik B-ni dar cibdə saxlayır. Məqsəd ölməmək deyil, doğru blokları doğru tərəfə ayırmaqdır.

### M5-18 — Geri qapının kilidi

**Quruluş:** Yuxarı çıxışlı U qala.

**Qərar və maneə:** İlk keçid qapını arxadan bağlayır; uzaq iki şalterdən biri divarı çəkir, o biri geri qapını açır. İkisini qarışdırmaq təhlükəsiz, amma həllsiz yerləşmə yaradır və undo tələb edir.

### M5-19 — Faza ötürən portal

**Quruluş:** Bir pres otağı və ayrı sakit ada.

**Qərar və maneə:** Portalın girişi də qəbul edilmiş addımdır, divarı bir faza irəlilədir. Çıxış meydanına doğru fazada qayıtmaq üçün sakit adada faza hazırlanır.

### M5-20 — Sonuncu boş cib

**Quruluş:** Sütunlu terminal və tək panel saxlama nişi.

**Qərar və maneə:** Paneli park etdiyin niş sonradan A-nın böyümə yeridir. B uzaq qıfılı açandan sonra paneli yenidən çəkmək lazımdır; bir şalterlə bitmir.

## M6 — Hədəflər və şərtli portal qərarları

### M6-01 — İcazəli final

**Quruluş:** İki final otağı və uzaq razılıq sensoru.

**Qərar və maneə:** B razılıq sensorunu tutmadan A-nın qapısı onu geri adaya göndərir. Razılıq açıq göstərilir, sürpriz cəza yox, qarşılıqlı yerləşmə tapmacasıdır.

### M6-02 — Üç ünvanlı seçim

**Quruluş:** Üç ada və ünvan indeksi olan portal.

**Qərar və maneə:** A ilk keçidlə B-nin adasını açır, B növbəti keçidlə finala gedir. Portalın qlobal indeksi final qayıdış üçün əvvəlcədən hazırlanır.

### M6-03 — Faydalı yanlış qapı

**Quruluş:** Başlanğıc meydanı və bağlı alt dövrə.

**Qərar və maneə:** Aralıq qapıdan keçmək geri yol kilidini açır. Həqiqi final əvvəlki meydandadır, amma kilid açılmadan ona daxil olmaq mümkün deyil.

### M6-04 — Dolu ünvan

**Quruluş:** İki kiçik portal adası və bir servis qolu.

**Qərar və maneə:** B çıxış xanasını tutur; A keçə bilmir. B-ni servis qoluna çıxarıb portalı boşaltmaq və sonra geri relay təhvili etmək lazımdır.

### M6-05 — Forma gömrüyü

**Quruluş:** Dar giriş adası və tavanlı çıxış.

**Qərar və maneə:** Portal ölçünü saxlayır. A böyük gedə bilmədiyi üçün əvvəl kiçilir, uzaqda yenidən böyüyüb ağır sensoru tutur.

### M6-06 — Bir dəfəlik bilet

**Quruluş:** Çarpaz dörd ada.

**Qərar və maneə:** İlk teleportdan sonra giriş sönür. A-nın yolu ilə B-nin bileti fərqli təyinatlara yönəldilməlidir; yeni biristifadəlik portal biti lazımdır.

### M6-07 — Geri ünvanı saxla

**Quruluş:** İki halqa və bir indeks terminalı.

**Qərar və maneə:** Qapını hər aktivləşdirmək indeksi dəyişir. Əvvəl çıxışa yaxınlaşmaq deyil, geri gəlmək üçün düzgün ünvanı ehtiyatda saxlamaq lazımdır.

### M6-08 — Sensorla seçilən liman

**Quruluş:** Uzaq iki ada, başlanğıcda iki sensor.

**Qərar və maneə:** B hansı sensoru tutursa A ora ötürülür. A birinci adadan B üçün başqa yol açır, B seçimi dəyişib A-nı ikinci adaya yönəldir.

### M6-09 — Qapı arxasında şalter

**Quruluş:** Bir-birinə portal ilə bağlanan üç kamera.

**Qərar və maneə:** Birinci portal şalterin arxasına, ikinci portal birinci qapının önünə çıxarır. Şalter zənciri tamamlanmadan son portal aktiv olmur.

### M6-10 — Güzgü çıxışlı qaçış

**Quruluş:** Asimmetrik iki zal.

**Qərar və maneə:** Portal giriş orientasiyasını dəyişmir, amma çıxış divarları yalnız bir duruşa yer verir. Orientasiya əvvəlki zaldakı dövrədə hazırlanır.

### M6-11 — Finalı söndürən razılıq

**Quruluş:** İki sensorlu yan cib və tək qapı.

**Qərar və maneə:** A-nın final bayrağı B sensoru buraxanda silinir. B öz çıxışına gedərkən alternativ sensoru A özü tutmalı və bayrağı bərpa etməlidir.

### M6-12 — İki keçid, bir dönüş

**Quruluş:** İki portal və aralarında qırılan boğaz.

**Qərar və maneə:** Bir portal irəli, digəri geri üçündür. Boğazı erkən qırmaq ikinci portalın icazə sensoruna yolu kəsir.

### M6-13 — Üzə görə ünvan

**Quruluş:** Altı kontaktlı başlanğıc zalı.

**Qərar və maneə:** Portalın ünvanı aşağı üz işarəsinə bağlıdır. Doğru adaya çatmaq üçün N1 dövrəsi lazımdır; yeni üz-ünvan bağlantısı tələb edir.

### M6-14 — Enerji bileti

**Quruluş:** Batareya anbarı və uzaq final adası.

**Qərar və maneə:** Teleport bir token xərcləyib çıxış deposuna ötürür, enerji itmir. B son səfər üçün depodan tokeni geri götürməlidir; xərc əvəzinə transfer qaydası açıqdır.

### M6-15 — Eyni qapının ikinci işi

**Quruluş:** Geniş başlanğıc otağı və kiçik yan ada.

**Qərar və maneə:** İlk giriş portalı açır, ikinci giriş şəbəkə şalterini işə salır. Aralıq adada hazırlıq etmədən ikinci girişi aktivləşdirmək final yolunu açmır.

### M6-16 — Çıxış deyil, görüş

**Quruluş:** Ayrı başlayan iki blok üçün ortaq ada.

**Qərar və maneə:** İki saxta final hər bloku görüş yerinə gətirir. Görüşdə enerji dəyişilir, sonra hər biri fərqli həqiqi çıxışına yönəlir.

### M6-17 — Qayıdış möhürü

**Quruluş:** Dörd pilləli portal zənciri.

**Qərar və maneə:** Hər adada fərqli forma möhürü var; son qapı bütün möhürləri yoxlayır. Ünvanlar birbaşa finala qısayol vermir.

### M6-18 — Portalın çəkisi

**Quruluş:** İki ada, birində həddli döşəmə.

**Qərar və maneə:** Teleport olunmuş domino çıxışda dik qalırsa qabıq çökür. Yüngül rol və ya geniş forma hazırlanmadan keçmək mümkün deyil.

### M6-19 — Uzaqdan bağlanan final

**Quruluş:** İki platforma və arada növbəli divar.

**Qərar və maneə:** B final icazəsini verir, A keçir; A içəridən divar fazasını dondurub B-ni buraxır. Hər blokun finalı digərinin yerləşməsinə bağlıdır.

### M6-20 — Son ünvan başlanğıcdır

**Quruluş:** Beş adalı, bir neçə istiqamətli portal qrafı.

**Qərar və maneə:** Başlanğıc çıxışı üç adadan icazə aldıqdan sonra açılır. Təkrar adaya getmək indeksi pozur, plan qraf üzərində qurulur, xal yerlərini dəyişmək deyil.

## N1 — Üz, orientasiya və kontakt

### N1-01 — Üç rəngin sırası

**Quruluş:** Üç qollu möhür zalı.

**Qərar və maneə:** A alt üzlə qırmızı→mavi→ağ kontaktları basır. Sadəcə xanaya çatmaq sayılmır, doğru fiziki üz aşağı olmalıdır.

### N1-02 — Yan kontakt

**Quruluş:** Divar boyunca L formalı dəhliz.

**Qərar və maneə:** Düymə döşəmədə deyil, divardadır. Domino doğru yan üzü ilə yaxınlaşır; bunun üçün geniş başlanğıc meydanında dövrə vurulur.

### N1-03 — Eyni yerdə başqa üz

**Quruluş:** Ortası boş halqa.

**Qərar və maneə:** Tam dövrədən qayıdan blok eyni koordinatda fərqli orientasiyaya sahib olmalıdır. Final sensoru həmin üzü tələb edir; koordinat əsaslı həll yanlışdır.

### N1-04 — İki blokun imzası

**Quruluş:** İki paralel niş meydanı.

**Qərar və maneə:** A və B eyni vaxtda fərqli üzləri göstərir. A hazır olanda B-nin dönüşü A-nın dayağını kəsməməlidir.

### N1-05 — Damğalı körpü

**Quruluş:** Dar körpüdən əvvəl geniş həyət.

**Qərar və maneə:** Körpü girişində müəyyən alt üz, çıxışda başqa yan üz tələb olunur. Giriş yolu orientasiya ilə seçilir, dar körpüdə düzəliş yeri yoxdur.

### N1-06 — Ölçüdə saxlanan üz

**Quruluş:** Forma stansiyası olan iki kamera.

**Qərar və maneə:** Resize üz etiketlərini qoruyur; kubda hazırlanan işarə domino finalında yan kontakt olur. Etiket çevrilməsi əvvəlcədən göstərilir.

### N1-07 — Dörd tərəfli prizma

**Quruluş:** Xaç zalı, hər qolda divar kontaktı.

**Qərar və maneə:** Dörd kontaktı eyni orientasiya ilə sırayla basmaq mümkün deyil. Hər qol arasında fərqli dövrə seçmək lazımdır, mərkəz möhür sayğacını saxlayır.

### N1-08 — Qütblü portal

**Quruluş:** Portal ilə ayrılmış iki tavanlı otaq.

**Qərar və maneə:** Üz işarəsi portalda qorunur. Uzaq otaqda dönmək üçün yer olmadığından girişdən əvvəl oriyentasiya tamamlanır.

### N1-09 — İzolyasiya üzü

**Quruluş:** Enerjili döşəmə ilə parçalanmış yol.

**Qərar və maneə:** Yalnız izolyasiya işarəli üz elektrik zolağına toxuna bilər. Digər üzü kontaktı açdığı üçün zolaqdan sonra yenidən dönüş lazımdır; yeni üz-təhlükə qaydasıdır.

### N1-10 — Yük və imza

**Quruluş:** Ağır kontakt, iki alçaq yan kanal.

**Qərar və maneə:** Doğru alt üz ilə dik qalmaq tələb olunur. Yüngül B yaxın yolu keçir, ağır A orientasiya üçün uzun xarici dövrədən gəlir.

### N1-11 — Üz təhvili

**Quruluş:** İki terminal və bir görüş meydanı.

**Qərar və maneə:** Terminal A-nın üst üz kodunu B üçün qapı icazəsi kimi yadda saxlayır. Sonra B həmin kodla başqa kontaktı basır; yeni yaddaş terminalıdır.

### N1-12 — Əks nişanlar

**Quruluş:** Səkkizşəkilli zal, iki zidd kontakt.

**Qərar və maneə:** Bir kontakt yuxarı, digəri aşağı üz kodunu yoxlayır. İkisini tutmaq üçün eyni dövrəni təkrarlamaq yox, fərqli halqaları birləşdirmək lazımdır.

### N1-13 — Dik qapının imzası

**Quruluş:** Pilləli dar boğazlar.

**Qərar və maneə:** A yalnız dik halda və şimal üzü müəyyən kod olanda keçə bilir. Uzun tərəfə yatıb qıfıldan keçmək mümkün deyil.

### N1-14 — Fazaya görə üz

**Quruluş:** Növbəli divarlı üç cib.

**Qərar və maneə:** Hər faza başqa kontaktı əlçatan edir. Orientasiya planı ilə faza planı birlikdə uyğunlaşdırılır, WAIT özü orientasiyanı dəyişmir.

### N1-15 — Unudulmayan möhür

**Quruluş:** Şalterlə bağlanan iki dönmə meydanı.

**Qərar və maneə:** İlk möhürdən sonra birinci meydan bağlanır. İkinci möhür üçün lazım olan üz əvvəlki dövrənin sonunda hazırlanmalıdır.

### N1-16 — Kontakt cütü

**Quruluş:** Enli plitə izi olan son zal.

**Qərar və maneə:** 2×2 plitənin altındakı iki fərqli işarə iki sensorla uyğun gəlir. Sadəcə dörd xananı örtmək kifayət deyil; yeni hüceyrə-kontakt etiketləri tələb edir.

### N1-17 — Buzdan sonra yan üz

**Quruluş:** İki buz xətti, arada quru dönmə cibi.

**Qərar və maneə:** Sürüşmə roll yox, tərcümə kimi orientasiyanı saxlayır. Quru cibi seçmək final yan kontaktını hazırlayır.

### N1-18 — İki imzalı açar

**Quruluş:** Bir mərkəzi qapı və iki uzaq möhür.

**Qərar və maneə:** A bir möhürü, B digərini doğru üzlə vurur; hər biri yalnız öz roluna icazə verir. Bir blokla hər ikisini tamamlamaq olmaz.

### N1-19 — Orientasiya karantini

**Quruluş:** Əyri xarici yol və kiçik iç meydan.

**Qərar və maneə:** İç meydana düşəndə oriyentasiya dəyişdirmək üçün yer yoxdur. Portal çıxışında lazımi alt üz yoxlanır; xarici yol uyğun hazırlıq üçündür.

### N1-20 — Son üç toxunuş

**Quruluş:** Fərqli istiqamətli üç dar son qol.

**Qərar və maneə:** Möhür ardıcıllığı yalnız son üç düzgün toxunuşu saxlayır. Artıq yanlış kontakt əvvəldən hazırlanmış sıranı pozur; görünən sürüşən yaddaş tələb edir.

## N2 — Qorunan enerji və bölgü

### N2-01 — İki qapının büdcəsi

**Quruluş:** İki enerji qapılı qollar və ortaq depo.

**Qərar və maneə:** Cəmi üç token var, qapılar iki və bir istəyir. Tokenləri qapılarda itirmədən uzaq depoya köçürüb son bölgünü qurmaq lazımdır.

### N2-02 — Boş qayıdan

**Quruluş:** Bir ağır enerji körpüsü və dar yüngül yol.

**Qərar və maneə:** A enerjini uzağa daşıyır, B onu götürür. A boşalıb yüngül yoldan qayıdır, B dolu halda ağır finalı açır.

### N2-03 — Enerji lifti

**Quruluş:** Üç ayrı ada və tək transfer nöqtəsi.

**Qərar və maneə:** Transfer yalnız qonşu bloklar arasında mümkündür. Adaların ölçüsü hər görüşü fərqli yerdə təşkil etməyə məcbur edir.

### N2-04 — Son token depozitdə

**Quruluş:** Dairəvi yol, üç terminal.

**Qərar və maneə:** Finalda A və B boş, depo dolu olmalıdır. Əvvəlki qapılar dolu blok istədiyi üçün hər şeyi erkən depoya qoymaq olmaz.

### N2-05 — İki bərabər pay

**Quruluş:** Paralel iki koridor və ayrı çıxışlar.

**Qərar və maneə:** Hər çıxış iki token istəyir, görüşdən sonra transfer yoxdur. Bölüşdürmə son ayrıcda düzgün tamamlanmalıdır.

### N2-06 — Ödənişsiz daşınma

**Quruluş:** Biristifadəlik portal və uzaq depo.

**Qərar və maneə:** Token portal keçidində yox olmur, çıxış deposuna köçürülür. B onu geri dövrədən götürür; bir blok öz enerjisini özü geri ala bilmir.

### N2-07 — Yük həddində batareya

**Quruluş:** Qabıq yol və enli servis həyəti.

**Qərar və maneə:** Token kütləyə əlavə olunur. Körpüdən boş keçmək, uzaqda doldurulmaq və finala ağır çatmaq lazımdır; yeni token-kütlə əlaqəsidir.

### N2-08 — İki terminalın kilidi

**Quruluş:** Zəncirvari üç otaq.

**Qərar və maneə:** Birinci depoda bir token saxlananda ikinci qapı açılır. Depodan hamısını götürmək A-nı üçüncü otaqda tələyə salır.

### N2-09 — Tərs icazə

**Quruluş:** Şarjlı yol və yalnız boş bloku keçirən tunel.

**Qərar və maneə:** A doldurulub şalteri açır, sonra enerjini B-yə verməlidir. B-nin keçidi dolu, A-nın çıxışı boş vəziyyət tələb edir.

### N2-10 — Fazanın yanacağı

**Quruluş:** Növbəli divar zalı və iki depo.

**Qərar və maneə:** Motorun enerjisi terminalda saxlanır; tokeni çıxarmaq divarı cari fazada dondurur. Doğru faza həm A, həm B üçün yol saxlamalıdır.

### N2-11 — Körpü üçün ortaq ehtiyat

**Quruluş:** Üç ada və iki enerji körpüsü.

**Qərar və maneə:** İki körpünü eyni anda işlətməyə enerji çatmır. Aralıq adada ehtiyatı bir körpüdən digərinə köçürmək üçün relay təhvili qurulur.

### N2-12 — Üzlə açılan batareya

**Quruluş:** Möhür otağı və enerji saxlanan yan qol.

**Qərar və maneə:** Enerjini yalnız doğru kontakt üzü terminala toxunanda götürmək olar. N1 orientasiyası daşınma ardıcıllığını məhdudlaşdırır.

### N2-13 — Bir transferlik görüş

**Quruluş:** Çökən görüş körpüsü.

**Qərar və maneə:** Bloklar yalnız bir dəfə görüşə bilirlər. Sonrakı iki qapının enerji tələbi əvvəlcədən hesablanıb həmin görüşdə bölünür.

### N2-14 — Enerji valfi

**Quruluş:** Bir halqa üzərində istiqamətli üç depo.

**Qərar və maneə:** Token bir terminaldan yalnız növbətiyə ötürülür. Blokun özünə götürməsi üçün fiziki həmin terminala çatması lazımdır; yeni istiqamətli depo sistemi tələb edir.

### N2-15 — Minimum və maksimum

**Quruluş:** Geniş otaqdan ayrılan üç dar qol.

**Qərar və maneə:** Bir qapı ən az iki, digəri ən çox bir tokenə icazə verir. Sadəcə maksimum doldurmaq həll deyil, yol boyu bölgü dəyişir.

### N2-16 — Finalı saxlayan depo

**Quruluş:** İki çıxış arasında mərkəzi anbar.

**Qərar və maneə:** Depo bir token saxladıqca körpü realdır. B çıxışa çatana qədər A son tokeni götürə bilməz, sonra başqa qapı üçün götürməlidir.

### N2-17 — Uzaq şarj

**Quruluş:** Yaxınlıq dayaqlı əyri adalar.

**Qərar və maneə:** B A-nı müşayiət edir, amma enerji transferi üçün bir xana yaxınlaşmaq lazımdır. Dar sahədə həm dayaq, həm görüş məsafəsini saxlamaq tələb olunur.

### N2-18 — Enerjinin kompası

**Quruluş:** İki rotor və bir görüş cibi.

**Qərar və maneə:** Dolanda idarə 90° çevrilir. Görüşdə enerjini ötürmək növbəti yolun koordinat sistemini də dəyişir; N2+M2 bağlantısı açıq öyrədilir.

### N2-19 — Anbarın arxa qapısı

**Quruluş:** Üç qapılı U plan.

**Qərar və maneə:** Bir depo həm qapının ehtiyatıdır, həm B-nin son yüküdür. A içəridən mexaniki kilidi açmadan B həmin ehtiyatı götürə bilməz.

### N2-20 — Heç nə itmir

**Quruluş:** Dörd adalı son bölgü tapmacası.

**Qərar və maneə:** Altı token üç depo və iki blok arasında bölünür. Hər final fərqli pay istəyir; qapı ehtiyatları da ümumi altıya daxildir, gizli enerji yaranmır.

## N3 — Məkan tikişləri və topologiya

### N3-01 — Qatlanmış halqa

**Quruluş:** İki ayrı yarımdairə, iki açıq tikiş.

**Qərar və maneə:** Bir tikiş çıxışını dəyişəndə qrafın dövrəsi qırılır. A bir tərəfdə qalaraq B-yə yeni bağlantını açır; ünvanlar həmişə görünür.

### N3-02 — Dörd limanlı keçid

**Quruluş:** Mərkəzi terminal və dörd ada.

**Qərar və maneə:** Terminal eyni anda yalnız iki adanı birləşdirir. Blokları ayırıb sonra yenidən görüşdürmək üçün bağlantılar fərqli sırada dəyişir.

### N3-03 — Tək yönlü dairə

**Quruluş:** Üç ada üzərində yönlü portal qrafı.

**Qərar və maneə:** Əks qayıdış yoxdur. Bir blok qapını açır, digəri dövrəni tamamlayıb onun arxa sensoruna gəlir.

### N3-04 — Tikişin iki üzü

**Quruluş:** İki tavanlı otaq, bir döndərilən bağlantı.

**Qərar və maneə:** Bağlantı çıxış orientasiyasını seçilmiş 90° çevirir. Tavan və yan kontaktlar düzgün orientasiya seçimini zəruri edir; yeni orientasiya-tikişi qaydasıdır.

### N3-05 — Boş liman siyasəti

**Quruluş:** İki kiçik ada və saxlama platforması.

**Qərar və maneə:** Dolu çıxış portalı bütöv bloklayır. B-ni saxlama platformasına aparmadan A-nın bağlantısını dəyişmək mümkün deyil.

### N3-06 — Ada körpüsünün mübadiləsi

**Quruluş:** Üç ada, bir daşınan bağlantı cütü.

**Qərar və maneə:** Bir keçidi açmaq o birini bağlayır. Ortada blok saxlayaraq bağlantını ona arxa tərəfdən təhvil vermək lazımdır.

### N3-07 — Yarım xəritə

**Quruluş:** İki ayrı labirint hissəsi.

**Qərar və maneə:** Bir hissənin şimal kənarı digərinin şərqinə bağlanır. Eyni koordinat kimi düşünmək olmaz, çıxış markerləri və yerli duruş birlikdə hesablanır.

### N3-08 — Qayıdışsız açar

**Quruluş:** İki yarpaqlı ağac qrafı.

**Qərar və maneə:** A açarı götürəndə bir istiqamətli kənarı keçir. B kökdən ayrı şalter açıb yeni geri kənar yaradır; açar yeri yox, əlaqə dəyişir.

### N3-09 — İki nəfərlik tikiş

**Quruluş:** Paralel ada cütləri.

**Qərar və maneə:** Bağlantı yalnız hər iki başlanğıc sensoru tutulanda açılır. A keçəndə sensor buraxılır, ona görə uzaq relay əvvəlcədən başqa yol ilə hazırlanır.

### N3-10 — Topoloji kilid

**Quruluş:** Dörd otaqdan ibarət çevrilən qraf.

**Qərar və maneə:** Finala gedən kənar ancaq üç fiziki şalter birlikdə açıldıqda yaranır. Şalterlərə çatmaq üçün qrafı aralıq vəziyyətlərdə dəyişmək lazımdır.

### N3-11 — Böyük cismin limanı

**Quruluş:** Bir dar, bir enli çıxışı olan portal.

**Qərar və maneə:** A böyükdürsə dar çıxış seçimi qadağandır. B terminalı uzaqdan enli limana yönəldir, A keçəndən sonra kiçik B üçün başqa əlaqə açılır.

### N3-12 — Enerji şəbəkəsi

**Quruluş:** Üç terminal adası və enerji ilə açılan kənarlar.

**Qərar və maneə:** Enerji depozitləri bağlantıları açır. Tokenləri köçürəndə arxadakı kənar bağlanır; hər ikisinin qayıdışını saxlamaq şərtdir.

### N3-13 — Düyün əvəzetməsi

**Quruluş:** Dörd girişli mərkəzi ada.

**Qərar və maneə:** Şalter girişlərin cütləşməsini dəyişir: şimal–şərq və cənub–qərb əvəzinə başqa cütlər. Blokların hansı girişdə gözləməsi gələcək yolu müəyyən edir.

### N3-14 — Bir addım uzaqda, çox yol aralı

**Quruluş:** Vizual yaxın iki ada, əlaqəli uzaq dövrə.

**Qərar və maneə:** Yaxınlıq sensoru dünya məsafəsi ilə işləyir, portal məsafəsi ilə deyil. B yaxın adada A-ya dayaq verir, özü ora uzun qraf yolundan gəlməlidir.

### N3-15 — Görüşün xəritəsi

**Quruluş:** Beş düyünlü yönlü şəbəkə.

**Qərar və maneə:** Bloklar əvvəl ayrı düyünlərdədir; enerji ötürməsi üçün eyni görüş düyününə çatmalıdır. Görüşdən sonra çıxış istiqamətləri qıfıllarla dəyişir.

### N3-16 — Sönən tikiş

**Quruluş:** İlk istifadə sonrası bağlanan iki əlaqə.

**Qərar və maneə:** Hansı blokun hansı əlaqəni işlədəcəyi final rollarına görə seçilir. Eyni adaya çatmaq kifayət etmir, digər blok üçün qalan qraf da keçilən olmalıdır.

### N3-17 — Tikişin kənarındakı üz

**Quruluş:** Divar kontaktı olan uzaq otaq.

**Qərar və maneə:** Portal orientasiyanı qoruyur, uzun roll marşrutu isə dəyişir. İki yol eyni nöqtəyə gətirsə də yalnız biri lazımi üzü hazırlayır.

### N3-18 — Yolun arxasındakı idarə

**Quruluş:** Bir idarə adası, üç oyun adası.

**Qərar və maneə:** B idarədə bağlantı seçir, A adalarda açar zəncirini açır. Son mərhələdə A idarə adasını B üçün əlçatan etməlidir, B orada əbədi qalmır.

### N3-19 — Saatlı əlaqə

**Quruluş:** Üç fazada dəyişən iki tikiş.

**Qərar və maneə:** Faza qəbul edilmiş gedişlə irəliləyir. Portalın özü də fazanı dəyişdirdiyi üçün giriş anı ilə çıxışdan sonrakı qraf fərqlənir.

### N3-20 — Tam dövrənin sübutu

**Quruluş:** Altı düyünlü, iki qısayollu qraf.

**Qərar və maneə:** Hər vacib düyün mexaniki kilid açır, sadəcə “hamısını gəz” yazısı yoxdur. Qısayollar erkən final vermir, yalnız geri dönüşün səmərəsini dəyişir.

## N4 — Nisbi rezonans və əlaqəli hərəkət

### N4-01 — Məsafə nərdivanı

**Quruluş:** Pilləli iki paralel sahil.

**Qərar və maneə:** Körpülər məsafə 2, sonra 3, sonra 1 olanda açılır. Bloklar sabit aralıqla gedə bilmir, hər pillədə münasibəti yenidən qurur.

### N4-02 — Eyni sətir, ayrı yol

**Quruluş:** Ortası boş iki U dəhliz.

**Qərar və maneə:** Qapı eyni sətirdə olanda açıqdır. B xarici yoldan sətiri saxlayır, A iç yoldan keçir; sonra uzaq alternativ kontaktla təhvil edir.

### N4-03 — Diaqonal razılaşma

**Quruluş:** Dörd künclü həyət, ortada divar.

**Qərar və maneə:** Sensorlar eyni diaqonalı tələb edir, amma ortadan keçmək olmaz. Bir blokun dolanması zamanı digərinin təhlükəsiz dayanacağı seçilir.

### N4-04 — İp uzunluğu

**Quruluş:** İki qarmaqşəkilli yol.

**Qərar və maneə:** Manhattan məsafəsi maksimum dörddür. Birini qabağa çox göndərmək o birinin hərəkətini bloklayır; yan cibdən mərhələli yaxınlaşma lazımdır.

### N4-05 — Gərginlik körpüsü

**Quruluş:** İki ada arası şəffaf zolaq.

**Qərar və maneə:** Körpü yalnız məsafə dəqiq üç olanda realdır. A irəlilədikcə B başqa sahildə eyni ritmdə geri çəkilir, son relay bu şərti əvəz edir.

### N4-06 — Cüt addım kilidi

**Quruluş:** İki asimmetrik dar kanal.

**Qərar və maneə:** Eyni anda verilən iki niyyət birlikdə validasiya olunur. Bir tərəfdə divar varsa hər ikisi yerində qalır; iki yolun uyğun addım cütləri tapılır.

### N4-07 — Formaların rezonansı

**Quruluş:** Bir enli, bir dar final meydanı.

**Qərar və maneə:** Qapı A plitə və B dik domino olanda açılır. Bloklar stansiyalara fərqli vaxtda çatıb eyni anda uyğun formaları saxlamalıdır.

### N4-08 — Üzlərin qarşılaşması

**Quruluş:** Yan kontaktlı iki balkon.

**Qərar və maneə:** A-nın şərq üzü B-nin qərb üzü ilə uyğun kod daşımalıdır. Dəqiq orientasiya ilə nisbi yerləşmə birlikdə yoxlanır.

### N4-09 — Bir-birinə baxmadan

**Quruluş:** Xarici halqa və daxili spiral.

**Qərar və maneə:** Qapı bloklar fərqli sətir və sütunda olanda açılır. Son dar boğazdan keçərkən həmin münasibəti qorumaq üçün B-nin cib seçimi vacibdir.

### N4-10 — Yaxınlaşıb ayrıl

**Quruluş:** Üç geniş görüş meydanı.

**Qərar və maneə:** Birinci kilid yaxınlıq, ikinci uzaqlıq, üçüncü eyni sətir tələb edir. Hər kilid növbətinin yolunu açır, dəyişiklik dekorativ deyil.

### N4-11 — Enerji bərabərliyi

**Quruluş:** Ayrı depoları olan iki otaq.

**Qərar və maneə:** Körpü yalnız blokların enerjisi bərabər olanda açılır. Uzaq qapı fərqli pay istədiyi üçün körpünü keçəndən sonra yenidən transfer lazımdır.

### N4-12 — Çəkinin fərqi

**Quruluş:** Həddli döşəmələr və ağır düymələr.

**Qərar və maneə:** Rezonans ümumi kütlə fərqi bir olanda açılır. Ölçü izi yükü dəyişir, amma kütləni dəyişmir; enerji ilə kütlə artırma qaydası ayrıca göstərilir.

### N4-13 — Bir xəttin iki ucu

**Quruluş:** Uzun qırıq kanal və paralel servis yolu.

**Qərar və maneə:** Qapı blokların eyni sütunda və aralarında maneəsiz xətt olanda açılır. Xəttin qarşısındakı panel əvvəl uzaq şalterlə çəkilir; yeni line-of-sight qaydasıdır.

### N4-14 — Qırılan bağ

**Quruluş:** Biristifadəlik boğaz və iki yaxınlıq sensoru.

**Qərar və maneə:** A boğazı tərk edəndə qayıdış kəsilir. B əvvəl aralıq müşahidə nöqtəsinə yerləşməsə uzaqdakı A-nın dayağı sönür.

### N4-15 — İki fərqli miqyas

**Quruluş:** Geniş A meydanı və dar B cığırı.

**Qərar və maneə:** Məsafə anchorla yox, ən yaxın footprint xanası ilə hesablanır. A böyüyərək rezonans məsafəsini azaldır; yeni ölçü-məsafə semantikası ayrıca öyrədilir.

### N4-16 — Güzgü yox, tamamlayıcı

**Quruluş:** Asimmetrik iki yarım labirint.

**Qərar və maneə:** A sağa gedəndə B eyni istiqamət yox, seçilən perpendikulyar istiqamətdə hərəkət edir. Cüt addımlar hər iki maneə sisteminə uyğun gəlməlidir.

### N4-17 — Rezonansı park et

**Quruluş:** Dörd dayaq cibi olan meydan.

**Qərar və maneə:** A sabit nöqtədə qalaraq yalnız iki cibi B üçün təhlükəsiz edir. B uzaq relay-i açdıqdan sonra A-nın park yeri dəyişir və digər iki cib açılır.

### N4-18 — İki finalın ortası

**Quruluş:** Final platformaları müxtəlif yüksəklik görünüşlü adalarda.

**Qərar və maneə:** Hər iki final dolu olanda məsafə şərti də ödənməlidir. İlk yaxın görünən nişan aralıq relay-dir, əsl məqsədlər açıq fərqli işarələnir.

### N4-19 — Bağın kompası

**Quruluş:** İki rotor və ofset aralıq ada.

**Qərar və maneə:** Eyni sütunda olanda idarə dəyişir, uzaqlaşanda normallaşır. A çıxışa yaxınlaşdıqca B-ni fərqli sətirə çəkmək lazımdır ki, növbəti dünya hərəkəti mümkün olsun.

### N4-20 — Beş münasibətin finalı

**Quruluş:** Şaxələnmiş böyük meydan, beş mexaniki kilid.

**Qərar və maneə:** Yaxınlıq, eyni sətir, fərqli sütun, forma cütü və üz uyğunluğu ayrı kilidlər açır. Kilidlərin ardıcıllığını xəritə məcbur edir; hamısını eyni vaxtda tələb edib həllsiz qoymaq olmaz.

## Qarışıq səviyyələr üçün ayrıca seçilən 24 istiqamət

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
