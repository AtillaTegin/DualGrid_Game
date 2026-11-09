# İki bloklu oyunun dizayn təməli

## Mövcud sənəddə hansı qərarlar möhkəmləndirilməlidir?

### Takeaway
Şəxsi dizayn tövsiyəm: layihənin kimliyini “iki nostalji oyunun qarışığı”ndan “iki cismin mövqe və rol mübadiləsi ilə bir-birinə yol yaratması”na keçirmək. İzometrik görünüş saxlanılsın, qaydalar isə növbəli, diskret və əvvəlcədən proqnozlaşdırılan olsun. Aşağıdakı təkliflər sınaqdan keçirilməmiş dizayn hipotezləridir.

### Cited Findings
- Patrick Traynorun öz oyun səhifəsi Patrick’s Parabox-u qutuların bir-birinə daxil olması ilə dünyanın strukturunu dəyişmək kimi təqdim edir. Səhifədə səviyyələrin sistemi öyrətmək və nümayiş etdirmək üçün qurulduğu, hər tapmacanın yeni ideya daşıdığı bildirilir. Bu, “çox mexanika” əvəzinə bir qaydanın çox nəticəsini araşdıran yanaşmaya real nümunədir. — [Patrick’s Parabox, rəsmi səhifə](https://www.patricksparabox.com/)
- Traynorun GDC çıxışının rəsmi təsviri mexanika iterasiyası, səviyyə qurulması və oyunçu sınağını oyunun əsas sistemi göstərmək məqsədinə bağlayır. Burada yalnız açıq sessiya təsviri oxunub; videonun tam məzmunu yoxlanmayıb. — [System-Centric Puzzle Design in Patrick’s Parabox](https://gdcvault.com/play/1034415/System-Centric-Puzzle-Design-in)
- Jonathan Blow NYU müsahibəsində oyunçu sınağını öz dizayn fərziyyələrinin reallıqla uyğunluğunu yoxlamaq kimi izah edir; tanış qaydaları yeni ideya üçün struktur kimi istifadə etdiyini deyir. Bu şəxsi yaradıcı mövqedir, universal uğur resepti deyil. — [NYU Game Center müsahibəsi](https://gamecenter.nyu.edu/game-designers-in-detail-jonathan-blow/)

### Inferences

**GDD-nin güclü tərəfləri:** 1×1×2 cismin yuvarlanması aydın məkan problemi yaradır; iki cismin fərqli imkanları əməkdaşlığı zəruri edə bilər; passiv cismin düymə üzərində saxlanması sadə qarşılıqlı asılılıq yaradır. Bunlar sənədin təhlilindən çıxan qiymətləndirmədir.

**Düzəldilməli dəqiqliklər:**

1. Blokun ölçüsü yuvarlanarkən dəyişmir. Dəyişən onun istiqaməti, hündürlüyü və zəminlə təmas sahəsidir. “1×1 matris üzrə hərəkət” hər girişin məhz bir hüceyrə irəliləməsi demək olmamalıdır: dik vəziyyətdən yatanda cismin iki yeni hüceyrəyə ehtiyacı var.
2. Daş/od və buz/su bir-birindən ayrı dörd anlayışdır. Ağır olmaq avtomatik od keçirməzlik, yüngül olmaq avtomatik buz üzərində sürüşmək demək deyil. Bunlar real fizika yox, dizayn qaydası kimi açıq təqdim edilməlidir. İlk versiyada rolları “ağır” və “yüngül” adlandırmaq daha təmizdir; istilik sonrakı ayrıca sistem ola bilər.
3. “Hər iki blok eyni anda qapıya daxil olur” solo növbəli idarədə literal şərt kimi problemlidir. Tövsiyə: hər hərəkət həll edildikdən sonra hər iki cismin uyğun çıxışda dik vəziyyətdə olması yoxlanılsın. Birinci gələn çıxışda dayanır, ikinci gələndə səviyyə bitir. Əgər qapı bloku udursa, o blokun dünyadakı təsiri və geri qaytarılma qaydası ayrıca yazılmalıdır.
4. Passiv blok “donur” ifadəsi yalnız giriş almaması kimi yazılmalıdır. Körpü altından çəkilirsə və ya zəmin sınırsa, passiv blok da dünyanın qaydalarına tabe olmalıdır. Əks halda oyunçu gizli istisnalar öyrənir.
5. Ağır düymə kütləni, yoxsa təzyiqi ölçür? Kütlə düyməsində ağır blok dik və uzanmış halda işləyə bilər. Təzyiq düyməsində kontakt sahəsi də rol oynayır. İkisini eyni vizual simvolla təqdim etməmək lazımdır.
6. Şüşənin sınması hərəkətin hansı anında olur; yatan blokun bir yarısı boşluqda qala bilərmi; iki blok toqquşanda itələyirmi; sürüşən blok digər bloka dəyəndə dayanırmı? Bunlar səviyyə hazırlamadan əvvəl qayda cədvəlinə çevrilməlidir.

**Təklif olunan mərkəzi kimlik:** “Güc sabit xarakter deyil, iki cismin bölüşdüyü resursdur.” İki 1×1×2 blokdan həmişə biri ağır, digəri yüngüldür. Xüsusi iki qonşu kontakt plitəsinin hərəsində bir blok dik dayandıqda, ayrıca əmrlə rolları dəyişmək olar. Mövqelər və geometrik istiqamətlər dəyişmir. İstənilən yerdən uzaqdan dəyişmək olmaz. Bu, cisimləri yalnız çıxışa aparmaq yox, lazımi yerdə görüşdürmək problemini də yaradır. Orijinallıq və əyləncəlilik hələ sübut edilməyib.

**İlk sınaqda yalnız üç sistem:** (1) dəyişməyən 1×1×2 yuvarlanma həndəsəsi; (2) ağır/yüngül rol və kontaktla rol mübadiləsi; (3) bu rollara cavab verən ağır düymə və yüngül keçid. Körpü bunların nəticəsidir, ayrıca onlarla yeni material sistemi deyil. Buz sürüşməsi bu nüvə işlədikdən sonra ilk genişlənmə namizədidir.

**Hələlik təxirə salınsın:** splitter, elektrik şəbəkələri, sərbəst cazibə dəyişməsi, portal, zaman surətləri, istilik yayılması, onlayn oyun. Splitter iki subyekti üç-dörd subyektə çevirə, əsas iki tərəfli əməkdaşlığın oxunaqlılığını poza bilər. Bir səviyyədə həmin sistemlərin hamısını birləşdirmək araşdırılacaq fikri bulanıqlaşdırar.

### Gaps
- GDD-dəki “ilk dəfə”, “tamamilə boş niş”, bütün rəqiblərin yeniliksiz klon olması iddiaları üçün bazar inventarı, satış məlumatı və oyunçu araşdırması verilməyib. Bunlar təsdiqlənmiş nəticə deyil; marketinq hipotezi kimi yenidən yazılmalıdır.
- Rol mübadiləsi ideyası üçün bu araşdırma tam prior-art axtarışı etmir və bənzər mexanikanın başqa oyunda olmadığı iddia edilmir.
- Sənəddə verilən tarixlər işçi sayı, büdcə və bacarıq səviyyəsi ilə əsaslandırılmayıb. Təqvimə zəmanət vermək mümkün deyil.

## Solo, kooperativ idarə və vizual oxunaqlılıq necə işləməlidir?

### Takeaway
İlk versiya bir oyunçulu, vaxt təzyiqi olmayan düşünmə oyunu olsun. Sabit izometrik kamera və hər iki cismin görünməsi bu qarşılıqlı asılılığı izləməyi asanlaşdıra bilər; bunu istifadəçi sınağı ilə yoxlamaq lazımdır.

### Cited Findings
- Game Accessibility Guidelines sadə və dəyişdirilə bilən idarələri, interaktiv öyrətməni, xatırladıla bilən məqsədləri, böyük və aralı toxunma düymələrini tövsiyə edir; dəqiq zamanlamaya və bir neçə eyni vaxtlı əmələ alternativ göstərir. — [Game Accessibility Guidelines](https://gameaccessibilityguidelines.com/full-list/)
- Microsoft-un oyun əlçatanlığı təlimatı vacib informasiyanı yalnız rənglə kodlaşdırmamağı; forma, simvol və başqa kanallarla möhkəmləndirməyi tövsiyə edir. Rəng simulyatorunu real istifadəçi sınağının əvəzi saymır. — [Xbox Accessibility Guideline 103](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/103)
- PuzzleScript-in rəsmi giriş sənədi eyni girişin bir neçə player obyektinə göndərilə bildiyini izah edir. Bu, çox subyektli idarənin mütləq real vaxt fizikasına bağlı olmadığını göstərən konkret alət nümunəsidir. — [PuzzleScript input](https://www.puzzlescript.net/Documentation/input.html)

### Inferences

**Kamera:** istifadəçinin danışığındakı bucaq təsvirini GDD-yə əsasən sabit 2.5D izometrik görünüş kimi şərh edirəm. İki blok arasında hər TAB basışında kameranın kəskin yer dəyişməsi əlaqələri izləməyi çətinləşdirə bilər. Kiçik səviyyələr bütöv göstərilsin; böyük səviyyədə yumşaq panoram, böyütmə və “bütün lövhəni göstər” əmri olsun. Kamera istiqaməti oyun qaydasını dəyişməsin. Divarlar arxanı örtürsə yarımşəffaflaşsın. Zəruri hüceyrələrdə duman və depth-of-field işlədilməsin.

**İdarə:** dörd xəritə istiqaməti + aktiv bloku dəyiş + geri al + yenidən başla. Ekranda istiqamət oxları grid-in diaqonal ekran proyeksiyasını göstərsin. Bloku kliklə seçmək əlavə imkan ola bilər; klaviatura bütün işi görə bilməlidir. Yatan blokun tutacağı hüceyrələri göstərən könüllü hərəkət proqnozu həlli vermədən idarə səhvini azalda bilər.

**Solo növbə:** bir giriş → hərəkətin və avtomatik sürüşmənin tam həlli → düymələr/körpülər/təhlükələr → sabit son vəziyyət → qələbə yoxlaması. Hər altmərhələnin dəqiq sırası yazılmalıdır. Hərəkət zamanı yeni girişlərin növbəyə alınıb-alınmaması ayrıca idarə seçimi olsun. Kamera keçidi oyun vaxtını və mexaniki vəziyyəti dəyişməsin, gediş sayılmasın.

**Kooperativ üçün ilk seçim:** iki oyunçu eyni diskret dünyada növbə ilə blokunu hərəkət etdirir; seçim ardıcıllığı aydın görünür. Hər iki oyunçunun eyni anda əmr göndərməsi avtomatik “kooperativ” keyfiyyət yaratmır. Daha sonra planla-icra et rejimi araşdırıla bilər: hər oyunçu hərəkət və ya gözlə seçir, ikisi hazır olanda birgə həll edilir. Eyni yerə girmək, yer dəyişmək, körpünün altını bağlamaq kimi konfliktlər üçün ayrıca qayda lazımdır. Bu rejim əsas kampaniyanın bütün səviyyələrini avtomatik uyğunlaşdırmaya bilər.

**Vizual dil:** ağır blokda çəkic/daş işarəsi və kobud siluet, yüngüldə lələk/kristal işarəsi və fərqli kənar forması. Rol ötürüləndə rəngdən əlavə bu nişan dəyişsin. Ağır düymə üzərində çəki simvolu; yalnız dik vəziyyət istəyən düymədə şaquli düzbucaqlı; körpüyə gedən incə görünən bağlantı xətti olsun. Qırmızı-göy palitra atmosfer yarada bilər, lakin qaydanın yeganə daşıyıcısı olmamalıdır.

**Mod ardıcıllığı (şəxsi prioritet):** əvvəl solo kampaniya; sonra minimum gedişli ayrıca tapmacalar; sonra yerli kooperativ. Speedrun refleks əsaslı deyil, təcrübəli oyunçu üçün seçim olsun. Gündəlik tapmaca yalnız səviyyələrin həllolunması və keyfiyyəti yoxlanandan sonra; təsadüfi generasiya keyfiyyət təminatı deyil. Səviyyə redaktoru gələcəkdə dəyərli ola bilər, amma ilk prototipin şərti deyil.

**PC və mobil:** ilk davranış sınağını bir platformada aparmaq daha az dəyişən yaradır. Sonra telefonda hüceyrə ölçüsü, iki cismin bir ekrana sığması, barmağın örtməsi, toxunma düymələrinin aralığı yoxlanmalıdır. Eyni tapmaca nüvəsi iki platformada işləyə bilər, eyni interfeys isə avtomatik uyğun deyil.

### Gaps
- İzləyən kamera ilə sabit kameranın bu layihədə müqayisəli sınağı yoxdur.
- Yerli kooperativin daha yaxşı olub-olmayacağı oyunçu sınağına qədər məlum deyil. Bir oyunçunun bütün həlli diktə etməsi riski konkret komanda ilə ölçülməlidir.

## Tapmacalar necə öyrədilməli və prototip necə qiymətləndirilməlidir?

### Takeaway
100 səviyyə hədəfindən əvvəl bir qayda sisteminin ən azı bir neçə fərqli dərk anı yaradıb-yaratmadığını yoxlamaq lazımdır. Geri alma və dəqiq vəziyyət modeli sonradan əlavə ediləcək rahatlıq yox, sərbəst düşünmə və etibarlı səviyyə dizaynının dayağıdır.

### Cited Findings
- PuzzleScript qayda sənədi dəyişiklikləri bir tam növbənin hissəsi kimi ləğv edən cancel əmri və saxlanmış vəziyyətə qaytaran checkpoint/restart mexanizmini izah edir. Bu konkret arxitektura nümunəsidir; layihənin mütləq PuzzleScript ilə yazılması təklifi deyil. — [PuzzleScript rules](https://www.puzzlescript.net/Documentation/rules.html)
- Patrick’s Parabox rəsmi səhifəsində hər səviyyənin ayrıca ideya daşıması və boş doldurucu səviyyə olmaması müəllifin məqsədi kimi göstərilir. — [Patrick’s Parabox](https://www.patricksparabox.com/)
- Jonathan Blow müsahibəsində tapmacanın tələb etdiyi səylə oyunçuya qaytardığı dəyərin əlaqəsini vurğulayır. — [NYU müsahibəsi](https://gamecenter.nyu.edu/game-designers-in-detail-jonathan-blow/)

### Inferences

**Təklif olunan 12 səviyyəlik öyrətmə xətti:**

| Səviyyə | Tək əsas yeni fikir | Yoxlanılan anlama |
|---|---|---|
| 1 | Tək blokun yuvarlanması, geniş təhlükəsiz meydan | Dik və uzanmış vəziyyətin izi fərqlidir |
| 2 | Dar keçid və çıxış istiqaməti | Məqsədə yaxınlaşmaq həmişə düzgün orientasiya vermir |
| 3 | İkinci bloka keçid | İdarəni dəyişmək vəziyyəti sıfırlamır |
| 4 | Passiv blokun saxladığı sadə körpü | Hərəkətsizlik də qərardır |
| 5 | Ağır düymə | İki subyekt eyni işi görə bilmir |
| 6 | Yüngül keçid | Gücün məhdudiyyəti var |
| 7 | Təhlükəsiz kontakt meydanı və rol dəyişməsi | İmkanlar bədənə əbədi bağlı deyil |
| 8 | Bir istiqamətdən görüşmək | Görüşün yeri qədər duruş da əhəmiyyətlidir |
| 9 | Çıxışa tez getməyin tələsi | Partnyora gələcək yol saxlamaq lazımdır |
| 10 | İki görüş nöqtəsindən düzgününü seçmək | Ən yaxın görüş ən faydalısı olmaya bilər |
| 11 | Əvvəlki ağır blokun yüngül keçiddən qayıtması | Eyni yer başqa rol ilə yeni məna daşıyır |
| 12 | Yeni qaydasız yekun | Öyrənilənlərin qarşılıqlı tətbiqi |

Bu say istehsal vədi deyil. Bir səviyyə iki fikir izah etməyə məcbur edirsə bölünə, əvvəlki fikir öz-özünə aydındırsa birləşdirilə bilər. İlk beş prototip səviyyəsi 1, 3, 5, 7 və 11-in kiçik variantlarını yoxlaya bilər, amma öyrətmə boşluqlarını ayrıca müşahidə etmək lazımdır.

**Üç konkret konsept ssenarisi — bunlar koordinatları və həll yolu yoxlanmış səviyyələr DEYİL:**

1. **“Gücü qarşı sahilə apar.”** Başlanğıc sahilində A ağır, B yüngüldür. A başlanğıcdakı ağır düymədə qalanda B-nin o biri sahilə keçəcəyi körpü açılır. O biri sahildə B üçün geri açılan daimi qıfıl yerləşir; B onu açdıqdan sonra A da keçə bilir. Qarşıda iki kontakt plitəsi var: hər iki blok dik dayanıb rolları dəyişir. Son hissədə yalnız indi yüngül olan A keçə biləcəyi şüşə qolundan gedib B üçün çıxış körpüsünü açır. Əsas dərk: bir dəfə kömək etmiş blok sonrakı hissədə kömək almalıdır. Qıfılın əlavə qayda olması ilk nüvə testində istənmirsə onu sabit geridönüş yolu ilə əvəzləmək olar.
2. **“Çıxışdan əvvəl görüş.”** A-nın çıxışı yaxındadır, lakin çıxış qolunun dar həndəsəsi A-nı B ilə yan-yana dik görüşməkdən məhrum edir. B-nin son qolu yalnız ağır rol üçün işləyən düymə tələb edir, başlanğıcda B yüngüldür. Görüş meydanı çıxışın əks istiqamətində yerləşir. Oyunçu əvvəl A-nı məqsəddən uzaqlaşdırıb orada B ilə rolları dəyişməli, sonra hər ikisini uyğun qollara yönəltməlidir. Əsas dərk: məqsədə monoton yaxınlaşmaq düzgün strategiya deyil. Xəritədə başqa görüş yolu və ya düymədən yan keçmə olmaması yoxlanmalıdır.
3. **“Dayanacağın özü alətdir” — sonrakı buz genişlənməsi.** Yüngül B düz buz zolağında orientasiyası dəyişmədən hüceyrə-hüceyrə sürüşür; bir hüceyrəlik boşluğa düşmədən dayanması üçün başqa cismin maneəsi lazımdır. Ağır A zolağın təhlükəsiz son dayanacaq hüceyrəsinə yerləşir. B A-ya çatmazdan əvvəl son qanuni izdə dayanır, yan normal zəminə yuvarlanıb düyməni basır; sonra A geri çəkilə bilir. Əsas dərk: partnyor yalnız düymə basan deyil, məkanın müvəqqəti sərhədidir. Dəqiq qayda: A itələnmir; B-nin növbəti bütöv izi A ilə kəsişəcəksə sürüşmə əvvəlki tam dəstəklənən vəziyyətdə dayanır. Bu, real buz fizikasının simulyasiyası yox, seçilən grid qaydasıdır.

**Qayda yoxlaması:** oyun məntiqi tam ədədi hüceyrə koordinatları və diskret vəziyyətlər üzərində qurula bilər; 3D model bu vəziyyətlər arasını animasiya edər. Saxlanmalı vəziyyətə hər blokun lövbər hüceyrəsi, dik/iki uzanma istiqaməti, rol, düymə və qıfıl vəziyyətləri, sınıq zəminlər və varsa davam edən sürüşmə daxildir. Yalnız üç həndəsi vəziyyət kifayət etməz, əgər gələcəkdə üzlər fərqlənirsə hansı üzün altda olması da izlənməlidir.

**Geri al:** bir istifadəçi əmri və onun yaratdığı bütün avtomatik nəticələr birlikdə geri qaytarılsın. Buzda beş hüceyrəlik sürüşmə bir əmrdirsə beş dəfə yox, bir dəfə undo ilə əvvəlki vəziyyətə qayıtsın. Sonsuz sürüşmə döngəsinin eyni tam vəziyyəti təkrar etməsi aşkarlana bilər. Animasiya vaxtı oyun məntiqinin nəticəsini dəyişməsin.

**Avtomatik həll yoxlaması:** kiçik lövhədə vəziyyətlər qrafının BFS axtarışı ən az əmrli həll göstərə bilər; hər əmrin xərci eynidirsə. Sürüşmənin hər hüceyrəsini ayrıca xərc sayırıqsa, yaxud rol dəyişməsi fərqli qiymətə malikdirsə uyğun çəkili axtarış lazımdır. Həlledici həllin mövcudluğunu yoxlayır; gözəl tapmaca olduğunu sübut etmir. İki blokun mövqe və orientasiya kombinasiyaları, üstəgəl hər müstəqil ikilik qıfılın mümkün vəziyyətləri axtarışı sürətlə böyüdür. Ona görə splitter və çoxlu persistent materiallar erkən daxil edilməməlidir.

**Sınaqda soruşulacaq yoxlamalar:** oyunçu niyə düymənin işləmədiyini başa düşürmü; rol dəyişməsini təxmin edə bilirmi; eyni qaydanı yeni xəritədə köməksiz tətbiq edirmi; məğlubiyyət aydın qərarın nəticəsidir, yoxsa gizli hadisə; iki blok həqiqətən bir-birinə lazımdırmı; puzzle həllini başa düşəndən sonra onu icra etmək uzun və təkrarlıdırmı? Müşahidədə yanlış düymə basışı ilə yanlış məntiqi fərziyyə ayrı qeyd edilsin.

**Prototip üçün davam qərarı:** cəlbedici qrafikadan əvvəl 5–8 kiçik tapmacada ən azı bir neçə fərqli yeni dərk anı alınmalı, yad oyunçular əsas qaydaları müəllifin şifahi müdaxiləsi olmadan tətbiq edə bilməlidir. Bu rəqəmlər mənim işçi sınaq hədəfimdir, tədqiqatla müəyyən edilmiş uğur həddi deyil. Nəticə zəifdirsə 100 səviyyə istehsalı əvəzinə rol mübadiləsinin məhdudiyyəti dəyişdirilsin və yenidən sınaq aparılsın.

### Gaps
- Heç bir təklif hələ playable prototipdə yoxlanmayıb. Səviyyə həllolunması, balans, öyrənmə sürəti və əyləncə barədə nəticə çıxarmaq olmaz.
- Avtomatik həlledicinin konkret performansı lövhə ölçüsü və seçilən qaydalardan asılıdır; burada ölçmə yoxdur.
- Oyunçu sayı, satış hədəfi və qiymət üzrə qərar vermək üçün bu dizayn araşdırması yetərli deyil.
