# İstifadəçinin M3 M4 M5 modlarının təhlili

## M3 Dinamik kiçilmə və böyümə nəyi dəyişir?

### Takeaway
İstifadəçinin əsas ideyası oyun içində ölçünün dəyişməsidir. M3.1–M3.6 bizim analitik alt-element təkliflərimizdir; istifadəçinin ayrıca adlandırdığı alt-modlar deyil. Cari demoda 1×1×1 kub və 1×1×2 blok var, lakin ölçülər levelin başlanğıcından sabitdir; level daxilində dəyişmə YENİ sistemdir.

### Cited Findings
- Cari `demo/src/logic.js`: `initial` ölçünü level.sizes-dan alır, `roll` yalnız size=1 və qalan uzun blokları ayırır, `cells` yalnız U/X/Z izlərini bilir; dinamik böyümə əmri yoxdur. `demo/README.md` 60 səviyyə, H ilə cari vəziyyətdən worker-də kömək və canlı animasiyalı dərsləri təsvir edir. Bunlar lokal mənbə oxunuşudur, bu tapşırıqda testlər yenidən icra edilməyib.
- Pillow Castle proqramçısı Superliminal-da görünüşə bağlı ölçü dəyişməsinin mühitlə toqquşma yoxlamasını mürəkkəbləşdirdiyini, böyük cismin kütlə kimi digər xassələrini də dəyişdirdiklərini izah edir. Bizim grid transformasiyası eyni mexanika deyil; götürülən prinsip ölçünün dekorativ yox, qaydalara təsir edən vəziyyət olmasıdır. — [Pillow Castle developer məqaləsi](https://blog.playstation.com/2020/06/30/breaking-down-the-tech-behind-superliminals-mind-bending-illusions/)
- Baba Is You-nun müəllifi oyunun qaydalarını fiziki obyektlərlə dəyişmək və obyektləri başqa məqsədlə işlətmək üzərində qurulduğunu bildirir. Buradakı dərs az qaydanın qarşılıqlı nəticələridir, bizim ölçü modunun həmin oyundan gəlməsi iddiası deyil. — [Hempuli rəsmi sayt](https://hempuli.com/baba/)

### Inferences
**Əvvəl həll edilməli məna fərqi.** “1×1-dən 2×2-yə” yalnız yer izi deyirsə nəticə 2×2×1 alçaq plitədir; bütün ölçüləri ikiqatdırsa 2×2×2 kubdur. Bunlar fərqli cismlərdir. Alçaq plitə çevriləndə 2×1 yer izi və 2 hündürlük alır; böyük kub hər üzündə 2×2 iz saxlayır və aşanda 2 xana irəliləyir. İlk sınaqda kub1 ↔ uzun1×1×2 daha az yeni forma tələb edir; bu, istifadəçinin 2×2 ideyasını əvəz edən qərar deyil, əvvəlki hazırlıq addımı təklifidir. Əsas 2×2 nümunəsində hansı formanın seçildiyi hər level metadata-sında göstərilsin.

**Ümumi transformasiya müqaviləsi.** Yalnız sabit dayanmış vəziyyətdə dəyişmək olar. İnteqer gridə bağlı “lövbər küncü” dəyişmir; böyüyən xanalar bu küncdən levelin oxları üzrə +x,+z-yə yaranır, köhnə mərkəzin ətrafında qeyri-müəyyən sürüşmə olmur. Alternativ lövbər yönünü seçmək ayrıca M3.6-dır. Bütün yeni həcm, tavan, digər blok, divar, dayaq və transformasiya sahəsinin sərhədi əvvəl yoxlanır. Uyğunsuzluqda dəyişmə rədd edilir, blok avtomatik öldürülmür və növbə keçmir. Uğurlu dəyişmə bir növbədir. Qəfil kütlə artımı baza qəbul deyil: ölçü və heavy rolu cari oyundakı kimi ayrı saxlanır; başqa qərar açıq yeni qayda olmalıdır.

#### M3.1 Sıxılma meydançası
**Qayda:** xüsusi meydançada dik 1×1×2 blok əmrlə 1×1×1 kuba çevrilir; aşağı kubun xanası lövbərdir. Hərəkətdən sonra öz-özünə yenidən uzanmır. **Məna/nümunə:** uzun blokun keçmədiyi dar dəhlizdən kub keçir, amma o tərəfdə uzanmaq üçün yer saxlanmalıdır. **İzahla öyrətmə:** əvvəl təhlükəsiz səhnədə uzun/kub ölçü konturları və “bir xana yer tutur” göstərilir. **Sinerji:** tərs idarə və hərəkətli divarlarla dar keçid planı. **Risk/xərc:** orta; kubu kiçiltməyin hər dəfə üstün seçim olmasına qarşı uzun forma üçün ayrıca fayda lazımdır.

#### M3.2 Genişlənən körpü gövdəsi
**Qayda:** 1 kub → 2×2×1 plitə; yalnız bütün dörd alt xana dəstəklənəndə böyüyür. Bu obyektin bir xanalıq boşluğu havada örtməsi baza qaydasına daxil deyil. Xüsusi yuvarlanmada ölçülər `(a,b,c)` kimi saxlanır; x istiqamətində aşma alt enlə hündürlüyü dəyişir. **Məna:** plitə eyni anda iki ayrı sensoru örtür, sonra dar çıxış üçün kiçilir. **Vizual dərs:** şəffaf 2×2 iz, yaşıl dörd dayaq, tavan varsa qırmızı həcm. **Sinerji:** iki sensorlu qapı və M5 sığınacağı. **Risk/xərc:** yüksək; yalnız mesh-i böyütmək kifayət deyil, ümumi prizma collision/roll lazımdır.

#### M3.3 Böyük kubun addımı
**Qayda:** 1×1×1 ↔ 2×2×2 kub; böyük kub hər aşmada istiqamət üzrə 2 xana yer dəyişir, 2×2 iz və 2 hündürlük saxlayır. Lövbər küncü aydın işarələnir. **Məna:** böyük addım hədəf koordinatına çatmağı dəyişir; kiçilmə mövqeyi addım fazasını düzəltmək üçün istifadə olunur. Böyük kub birxanalıq boşluğun üstündən təhlükəsiz tullanmış sayılmır. **Dərs:** eyni xəttdə bir və iki xanlıq hədəf kölgəsi. **Sinerji:** M3.6 lövbər, M5 hərəkət büdcəsi. **Risk/xərc:** yüksək; hədəfin böyük cismi necə qəbul etdiyi müəyyən edilməli, adi birxanalıq çıxış yalnız kiçik kub qəbul etməlidir.

#### M3.4 Ölçüyə uyğun kilid
**Qayda:** bir keçid maksimum en/hündürlük, başqa sensor isə konkret forma/duruş tələb edir; sensor “böyük” deyə heavy rolunu avtomatik qəbul etmir. **Məna:** kiçik halda daxilə gir, geniş otaqda böyük ol, ölçü sensorunu saxlayıb partnyorun yolunu aç. **Dərs:** qapıda en×hündürlük nişanı, sensorda forma silueti; rol işarəsi ayrıca. **Sinerji:** mövcud ağır/yüngül mübadilə ilə “ölçü ayrı, rol ayrı” tapmacası. **Risk/xərc:** orta; çoxsaylı xüsusi istisnalar oxunaqlılığı azaldar. Bir leveldə bir ölçü kilidi növü öyrədilsin.

#### M3.5 Məhdud transformasiya ehtiyatı
**Qayda:** levelə, məsələn, iki uğurlu ölçü dəyişmə nişanı verilir; rədd edilmiş böyümə nişan xərcləmir. Undo nişanı qaytarır. Nişan real pul və ya reklamla alınmır. **Məna:** ən qısa yol yerinə transformasiyaların düzgün ardıcıllığı seçilir; dar yolu tez keçmək son ölçü dəyişməsini boş yerə xərcləyə bilər. **Dərs:** iki nişan və eyni nümunənin bir/sıfır qalıqla müqayisəsi. **Sinerji:** M4 kölgənin ölçüsü ayrıca dəyişmirsə asimmetriya. **Risk/xərc:** orta; resurs sadəcə təkrara məcbur etməsin, qalan ehtiyat daim görünməlidir.

#### M3.6 Seçilən böyümə lövbəri
**Qayda:** genişlənmə meydançasında böyümədən əvvəl dörd künc istiqamətindən biri seçilir; seçim ayrıca növbə deyil, transformasiya əmrinə daxildir. Baza avtomatik +x,+z lövbərinin mürəkkəb uzantısıdır. **Məna:** eyni xananı saxlayıb gövdəni sağ və ya sol sensor cütünə yaymaq mümkündür. **Dərs:** dörd kontur, seçilən yalnız biri; hər birinin tutacağı xanalar göstərilir. **Sinerji:** M5 daralan otaqda təhlükəsiz böyümə və N1 kontakt orientasiyası. **Risk/xərc:** yüksək interfeys yükü; ilk ölçü dərslərində olmasın, sərbəst dəyişmə exploitinə çevrilməməsi üçün yalnız meydançada işləsin.

### Gaps
Bu nümunələr həlli solverlə təsdiqlənmiş koordinat səviyyələri deyil. Cari `cells/roll/win/stateKey` bütün bu formaları dəstəkləmir; mövcud 60 səviyyə sertifikatları yeni forma qaydalarının sertifikatı sayılmır.

## M4 Shadow Doppelganger necə proqnozlaşdırıla bilən olmalıdır?

### Takeaway
İstifadəçinin orijinal modunda qırmızı klon hərəkəti iki saniyə gecikmə və güzgü istiqaməti ilə təkrarlayır, təmas səviyyəni sıfırlayır. Kampaniya üçün N uğurlu əmr gecikməsi və ayrıca WAIT təklif edirəm; bu orijinalın əvəzinə gizli qərar deyil, məntiq yönümlü variantdır. İki saniyəlik versiya ayrıca real-time challenge qala bilər.

### Cited Findings
- Jonathan Blow-un Braid rewind təqdimatı keçmiş səhnənin etibarlı və dəqiq bərpasının əsas dizayn tələbi olduğunu bildirir. Buradan çıxarılan nəticə: klonun növbəsi və gecikməsi də undo vəziyyətinə daxildir; Braid-in texniki həllini bizim üçün hazır həll saymırıq. — [Müəllifin GDC sessiyası](https://www.gdcvault.com/play/1012210/The-Implementation-of-Rewind-inJonathan)
- Lokal `hint-worker.js` memo açarını `stateKey`-dən alır; cari açar blok mövqeyi/duruş/rol/ölçüdən ibarətdir. Queue və klon olmadığı üçün hazır açar M4 üçün yetərli deyil. — lokal mənbə oxunuşu.

### Inferences
#### M4.1 Gecikmə növbəsi
**Qayda:** level bir mənbə blok və N=3 kimi gecikmə seçir; növbə əvvəl N WAIT ilə doludur. Hər uğurlu qlobal gedişdə köhnə növbənin başı klon üçün götürülür, həmin gedişin mənbə əmri sona əlavə olunur. Mənbə əvəzinə partnyor oynanırsa WAIT yazılır. Rədd edilmiş komanda saatı irəli aparmır. **Məna:** təhlükəni yalnız məsafə ilə deyil, gələcək əmr sırası ilə idarə etmək. **Dərs:** ekranda “WAIT, →, ↑” növbəsi və icra olunacaq baş əmrin çərçivəsi. **Sinerji:** M5 növbəli divar. **Risk/xərc:** yüksək vəziyyət artımı; müxtəlif queue-lar eyni mövqedə müxtəlif gələcəkdir.

#### M4.2 Açıq güzgü oxu
**Qayda:** şaquli xəritə oxunda sol↔sağ, yuxarı/aşağı dəyişmir; üfüqi oxda bunun əksi. Level oxu sabitdir, kamera çevrilməsi onu dəyişmir. Mənbə əmri əvvəl tərs idarə effektindən keçirilir, sonra alınan DÜNYA istiqaməti güzgülənib klona verilir; fiziki klaviş ikinci dəfə yozulmur. **Məna:** “sağa basdım” deyil, “mənbə dünyada sola getdi, klon sağa gedəcək” düşüncəsi. **Dərs:** mənbə və klon oxları yanaşı, incə güzgü xətti. **Sinerji:** tərs idarə moduyla güclü, amma gec öyrədilməli kombinasiya. **Risk/xərc:** orta; hərəkət trayektoriyası teleport güzgüsü deyil, klon öz vəziyyətindən normal roll edir.

#### M4.3 WAIT və təhlükəsiz məsafə
**Qayda:** ayrıca WAIT bir uğurlu qlobal gedişdir; mənbə yerində qalır, queue/divar irəliləyir. TAB, menyu, kamera və kömək WAIT deyil. **Məna:** bir gediş gözləmək klonun əvvəlki əmrlə uzaqlaşmasını təmin edə bilər; amma M5 büdcəsini sərf edir. **Dərs:** təhlükəsiz otaqda bir WAIT və queue-nun dəyişməsi; düymə açıq yazılır. **Sinerji:** dövri divar və elektrik fazası. **Risk/xərc:** orta; WAIT döngələrinin solver tərəfindən düzgün birləşdirilməsi vacibdir, yalnız koordinata görə visited işarəsi səhvdir.

#### M4.4 Klonun bədəni və maneə davranışı
**Qayda:** klon ilkin forması və orientasiyası ilə başlayır; öz roll/slide qaydasından istifadə edir. Maneəyə gedən klon əmri həmin dəfə WAIT kimi xərclənir, queue-dan çıxır; sonradan təkrar sınanmır. Klon adi platformalarda hərəkət edir, aktorlarla fiziki itələşmir; qırmızı təmas təhlükədir. Ölçü hadisəsinin təkrarı ayrıca açılmayıbsa M3 əmri queue-ya WAIT yazır. **Məna:** klonu divarda saxlayaraq məsafə yaratmaq, sonra yanlış istiqamətdə azad etməmək. **Dərs:** qırmızı kontur maneəyə dəyib bir vuruş dayanır. **Sinerji:** M3-də mənbə kiçik, klon uzun qala bilər. **Risk/xərc:** yüksək; asimmetriya açıq göstərilməsə oyunçu bug sanacaq.

#### M4.5 Təmas və zaman variantı
**Qayda:** final xanaların üst-üstə düşməsi, eyni atomik mərhələdə aktorların yerlərini dəyişib bir-birindən keçməsi və fırlanma zamanı həcm kəsişməsi təhlükə sayılır. Təmasda istifadəçinin nəzərdə tutduğu level reset icra olunur; kampaniya rahatlıq variantında əvvəl qısa “tutuldun” vəziyyəti və Undo verilir. İki saniyəlik variant sabit simulyasiya tick-i, timestamp-li queue, pause və countdown ilə ayrıca qayda profilidir. **Məna:** qabaqcadan yol ayırmaq; refleks variantında vaxt təzyiqi. **Dərs:** təhlükə konturu, gələcək klon yeri və reset qaydası əvvəldən. **Sinerji:** gizli yol modunda klonun görünürlüğünü gizlətmək çox ağır kombinasiya, yalnız ixtiyari. **Risk/xərc:** çox yüksək; real-time rejimdə hazır addımlı H optimal həll vədi verə bilməz.

### Gaps
N=3 sınaq parametri, iki saniyənin ideal alternativi olduğuna dair ölçü deyil. Real-time və növbəli variantların eyni leaderboard-da müqayisəsi ədalətli olmaz; profillər ayrı saxlanmalıdır.

## M5 Hərəkətli və sıxan divarlar necə ədalətli təzyiq yaradır?

### Takeaway
İstifadəçinin divar ideyası məkanı zamanla dəyişir. Növbə əsaslı variant “düşünməyə tələsmə, əmrləri qənaətlə seç”; real-time variant “vaxtında hərəkət et” tələb edir. Bunları bir qayda kimi təqdim etməmək lazımdır. M5.1–M5.5 təklif etdiyimiz alt bölgülərdir.

### Cited Findings
- Braid müəllifinin rewind təsvirində dəqiq keçmiş vəziyyətin bərpası mühüm tələbdir; hərəkətli mühitin fazasının undo ilə qayıtması bizim dizayn nəticəmizdir. — [GDC](https://www.gdcvault.com/play/1012210/The-Implementation-of-Rewind-inJonathan)
- Mövcud oyunda `step` statik wall xanalarını collision kimi yoxlayır, hərəkətli divar fazası yoxdur; `actions` istiqamətləri və exchange verir, WAIT vermir. — lokal `demo/src/logic.js`.

### Inferences
#### M5.1 Növbə ilə daralma
**Qayda:** hər K uğurlu gedişdən sonra göstərilən divar sərhədi bir xana irəliləyir; WAIT və exchange sayılır, rədd olunmuş addım sayılmır. Geri dönməyən divar son həddə dayanır. **Məna:** uzun yol təhlükəsiz görünsə də gələcək daralmaya çatmaya bilər. **Dərs:** “2 gediş sonra bu zolaq bağlanır” və döşəmədə zolaq; ilk nümunədə limitsiz undo. **Sinerji:** M3 böyük addım və kiçik dəhliz. **Risk/xərc:** orta/yüksək; bütün daralma parametrləri əvvəldən göstərilməlidir, gizli sürət artımı olmasın.

#### M5.2 Dövri piston
**Qayda:** divar fazaları `[geri, xəbərdarlıq, irəli, xəbərdarlıq]`; hər uğurlu növbə bir fazadır. Xəbərdarlıq mövqeyi collision deyil. İrəli fazasında tutulan xana blokla kəsişərsə sıxılma olur. **Məna:** WAIT ilə pəncərəyə uyğunlaşmaq, partnyoru təhlükəsiz yerdə saxlamaq. **Dərs:** dörd fazalı ikon və növbəti mövqe konturu. **Sinerji:** M4 queue sinxronlaşdırması. **Risk/xərc:** yüksək; periodların ən kiçik ortaq vurğu faza sayını artırır, bir leveldə çox müxtəlif period olmasın.

#### M5.3 Duruşa uyğun sığınacaq
**Qayda:** döşəmədə qorunan ciblər var; yalnız gövdənin bütöv həcmi cibdədirsə divardan qorunur. Uzun blokun bir xanasının cibdə olması kifayət deyil. **Məna:** yaxın cibli düz yol yerinə əvvəl duruş dəyişib geri girmək. **Dərs:** bütün gövdə yaşıl olanda təhlükəsiz nişanı; qismən yerləşmə qırmızı. **Sinerji:** M3 kiçilmə; həcm anlayışını təbii öyrədir. **Risk/xərc:** orta; izometrik örtülmə üçün divar şəffaflaşması lazımdır, collision vizual şəffaflıqla yox olmur.

#### M5.4 Partnyor əyləci və idarə olunan divar
**Qayda:** xüsusi sensor növbənin əvvəlində basılıdırsa həmin divar həmin növbə faza irəliləmir; sensoru bu növbədə basmaq növbəti növbədən saxlayır. Dayanma fazası və sonrakı bərpa qaldığı yerdəndir, sıfırdan deyil. **Məna:** bir blok divarı saxlayır, o biri keçir, sonra təhlükəsiz təhvil planlanır. **Dərs:** sensor-divar əlaqəsi və “gələn növbədən dayanır” nümunəsi. **Sinerji:** rol mübadiləsi və M4 clone sensoru baza variantda AKTİVLƏŞDİRMİR. **Risk/xərc:** orta; indiki körpü sensoru ilə fərqli gecikmə eyni ikonla göstərilməsin.

#### M5.5 Real vaxt sıxılması
**Qayda:** ixtiyari challenge profilində divar hər T saniyə bir grid mərhələsi keçir; countdown məntiqi simulyasiya saatıdır, render FPS deyil. Pause, dərs, H sorğusu, menyu və fokus itməsi saatı dondurur; qayıdanda qısa geri sayım olur. Növbə versiyasının hesabı ilə qarışdırılmır. **Məna:** planı əvvəl qurub vaxtında icra etmək. **Dərs:** təhlükəsiz training və dəyişən sürət deyil, sabit görünən T. **Sinerji:** iki saniyəlik M4 ayrı advanced challenge-da. **Risk/xərc:** çox yüksək; məntiq oyununun refleks tələbini artırır, əsas kampaniyanın məcburi şərti olmasın.

**Bütün modlar üçün təklif etdiyim tam deterministik sıra:**

1. Menyu/dərs/H/undo/camera aktor əmri deyil; world clock işləməz. Dünya versiyası və snapshot alınır. Xam input → cari tərs idarə → dünya istiqaməti yalnız bir dəfə çevrilir.
2. Başlanğıc snapshot-dan aktiv bridge və divar əyləci siqnalları götürülür; M4 queue-nun əvvəlki başı oxunur. M3 transformasiya əvvəl həcm/dayaq baxımından yoxlanır. Rədd edilmiş oyunçu əmri bütün növbəni rədd edir: queue/divar/resurs dəyişmir.
3. Oyunçu və vaxtı çatmış klon üçün niyyətlər eyni başlanğıc vəziyyətindən hesablanır. Adi aktor collision-u manedir; klonla kəsişmə təhlükədir. Roll və məcburi buz sürüşməsi sabit mikroaddımlarla həll olunur; klonun maneəli əmri xərclənən WAIT-dir. Birbaşa keçiş, swap və süpürülən həcm təhlükəsi yoxlanır.
4. Qəbul edilən aktor mövqeləri və transformasiyalar birgə commit olunur. Mənbə əmri/WAIT növbəyə əlavə olunur; məhdud transformasiya ehtiyatı yenilənir. Son yerləşmədə sensorlar yenidən hesablanır, körpülər dəyişir; klon baza qaydasında adi sensorları basmır.
5. M5 divar fazası başlanğıcdakı əyləc siqnalı və uğurlu qlobal tick ilə irəliləyir; yeni divarın bütöv həcmi aktorlarla yoxlanır. Divar itələməz, kəsişmə sıxılmadır. Sonrakı xüsusi itələyən divar ayrıca ailə olmalıdır.
6. Yeni körpü/divar vəziyyətində BÜTÜN aktorların dayağı və təhlükəsi yoxlanır; passiv blok da düşə bilər. Ölüm varsa qələbədən üstün tutulur. Sağdırsa bütün məqsəd şərtləri eyni sabit vəziyyətdə yoxlanır. Bu səviyyədə gizli chain-trigger yoxdur: sensorun divar əyləcinə təsiri növbəti tick-ədir.
7. Tək atomik gediş tarixçəyə yazılır, sonra yalnız vizual animasiya oynayır. Dünya növbəsi animasiyanın uzunluğundan asılı deyil. Real-time profilində bu sıra fixed simulation tick-ə tətbiq edilir və müxtəlif tick-də qəbul olunan input vaxtı da state-in hissəsidir.

Bu gələcək qayda müqaviləsidir; hazır engine-in belə işlədiyi iddia edilmir. Qaydaların versiyası saxlanmalı, köhnə 60 səviyyənin davranışı səbəbsiz dəyişdirilməməlidir.

**Tam state və həllçi nəticələri.** Blok kimliyi, lövbər, ölçü vektoru və fiziki orientation; heavy rol; aktiv idarə; transformasiya ehtiyatı; klon mövqeyi/orientasiyası/forması, mənbəsi, güzgü oxu, queue və gecikmə; divar fazası, sayğac və əyləc latch-i; qapı/körpü və dünya trigger-ləri; tick və terminal status snapshot-a daxildir. Hash gələcəyi fərqləndirən hər şeyi daxil etməlidir. `moves` mexanikaya təsir edirsə modulo period və ya qalan büdcə state-də olmalıdır; sonsuz absolute sayğac axtarışı lazımsız böyüdə bilər. Qayda versiyası və level versiyası memo cache açarının hissəsidir.

Hazır A* heuristikası ölçüləri leveldə sabit hesab edir. Dinamik forma, eyni növbədə iki aktorun irəliləməsi və teleport əlavə ediləndə mövcud məsafələrin cəmi artıq aşağı sərhəd olmaya bilər. Əvvəl yeni transition graph və admissible lower bound; alınmırsa zəif/sıfır heuristika. H cari TAM vəziyyətdən hesablasın, queue və divar fazasını görməyən əvvəlki həll sertifikatını işlətməsin. Vaxt/limit bitməsi “həll yoxdur” deyil. Real-time H-də saat dondurulmalı və tövsiyə olunan “gözlə” əmri də fazaya bağlı olmalıdır; avtomatik optimal vəd verilməsin.

**Undo və görünməyən məlumat.** WorldUndo snapshot-u bütün queue, forma, resurs, divar və trigger-ləri qaytarır. Ayrı KnowledgeState isə görülmüş həqiqi yol, sınanmış saxta çıxış, baxılmış dərs kimi oyunçunun öyrəndiyini saxlayır; undo onu unutdurmur. Buna görə gizli yolun fiziki görünürlük maskası dünya qaydasına, “bu xana əvvəllər təhlükəli idi” yaddaş nişanı biliyə aiddir. Full reset də biliyi default silməsin; ayrıca yeni cəhd/replay profili siyasəti göstərilsin. Solver tam dünyanı bilə bilər, amma adi hint oyunçunun görmədiyi həqiqəti səbəbsiz açmasın: əvvəl “yolu müşahidə et”, sonra istifadəçinin seçdiyi açıq həll mərhələsi. Tam həll istəyi ilə məlumatı gizlətmək arasında seçim ayrıca aydın olsun.

### Gaps
Heç bir M3–M5 prototipi burada hazırlanmayıb, yeni səviyyə və həll hesablanmayıb. Xərc dərəcələri nisbidir, iş günü və büdcə təklifi deyil. Hər kombinasiya əvvəl iki qaydalı kiçik otaqlarda insanlarla oxunaqlılıq və həll məntiqi baxımından yoxlanmalıdır.
