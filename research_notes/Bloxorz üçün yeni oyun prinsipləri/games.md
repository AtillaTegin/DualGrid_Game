# Bloxorz və əlaqəli oyunların dizayn prinsipləri

## Bloxorz və Atəş və Su əslində nəyi həll etdirir?

### Takeaway
Bloxorz-un nüvəsi dəyişən ölçü deyil: sabit 1×1×2 cismin orientasiyasına görə dayaq sahəsinin dəyişməsidir. Atəş və Su-dan götürüləsi prinsip isə rənglərdən çox bir-birindən asılı iki agentin fərqli imkanları və düzgün əməliyyat ardıcıllığıdır.

### Cited Findings
- Bloxorz-da blok 1×1×2 ölçülüdür, kvadrat şəbəkədə aşırılaraq yeriyir; çıxışa dik çatmalıdır. Düymələr keçidləri açıb-bağlayır. Ümumiləşdirilmiş səviyyələrin həllolunmasını müəyyənləşdirmək PSPACE-tamdır. Bu nəticə konkret 33 səviyyənin hamısının həddən artıq çətin olması demək deyil. — [van der Zanden və Bodlaender, ilkin elmi məqalə](https://arxiv.org/abs/1411.5951)
- Orijinalın yayımlandığı oyun platformasının təlimatına görə yumşaq düymə istənilən təmasla, ağır düymə dik blokla işləyir; narıncı zəmin dik blokun altında çökür. Bəzi düymələr toggle, bəziləri daimi açılma yaradır: üstündə dayanmaq hamısında tələb deyil. Splitter bloku iki idarə olunan kiçik kuba ayırır; Space ilə seçim edilir, yanaşı gələndə birləşirlər, kiçik kublar çıxışdan keçə bilmir. — [Coolmath Games, Bloxorz təlimatı](https://www.coolmathgames.com/0-bloxorz)
- Oslo Albet-in Steam səhifəsi Forest Temple üçün solo, eyni cihazda iki oyunçu və Remote Play Together göstərir; puzzle həlli, vaxt və almaz toplama vardır. 1 sentyabr 2026 Steam buraxılışıdır, orijinal Flash oyununun ilk çıxış tarixi kimi göstərilməməlidir. — [Müəllifin Steam səhifəsi](https://store.steampowered.com/app/5084260/Fireboy__Watergirl_1_The_Forest_Temple/)
- Oyunu yayımlayan Coolmath təlimatında personaj dəyişməsi, Fireboy-un od, Watergirl-in su ilə uyğunluğu və yaşıl mayenin təhlükəsi izah edilir. — [Fireboy and Watergirl təlimatı](https://www.coolmathgames.com/0-fireboy-and-water-girl-in-the-forest-temple)

### Inferences
- GDD-də “blokun ölçüsü dəyişir” ifadəsini “orientasiya və zəminlə təmas sahəsi dəyişir” kimi dəqiqləşdirmək lazımdır. Həqiqi ölçü dəyişməsi ayrıca mexanika olardı.
- Bloxorz-un splitter hissəsində artıq tək oyunçunun iki subyekti növbə ilə idarə etməsi mövcuddur. Ona görə yalnız TAB və ikinci blok əlavə etmək güclü yenilik arqumenti deyil.
- Əsas yeni dərinlik iki tam ölçülü blokun orientasiya vəziyyətləri ilə qarşılıqlı asılılığın birləşməsindən gələ bilər: A-nı hansı hüceyrədə saxlamaqdan əlavə hansı vəziyyətdə saxlamaq da B-nin yolunu dəyişməlidir.
- Atəş və Su-nun tullanma və refleks yükünü ilk mərhələdə daşımaq lazım deyil. İstifadəçinin istədiyi aşırılaraq hərəkət üçün diskret gedişlər daha uyğun ilkin fərziyyədir.

### Gaps
- Bloxorz-un öz yaradıcısının hazırda işlək orijinal qayda səhifəsini tapmadım. Coolmath təlimatı birbaşa oyunu yayımlayan mənbədir, lakin müəllifin dizayn gündəliyi deyil. Həmin səhifənin metadata buraxılış tarixi ilə mətndəki 2007 tarixi ziddiyyətlidir; dəqiq gün/ay iddiası verilməsin.
- Bu qeydlər Atəş və Su-nun hansısa sonrakı temple versiyasının bütün xüsusi mexanikalarını təsdiqləmir.

## Başqa puzzle oyunlarından hansı prinsiplər götürülə bilər?

### Takeaway
Ən yararlı nümunələr çox mexanika yığmır; bir qaydanı sistemin müxtəlif hissələrinə tətbiq edərək yeni nəticələr çıxarır. Hər nümunədən obraz və dekor deyil, qərarın strukturu götürülməlidir.

### Cited Findings
- **Stephen’s Sausage Roll:** yaradıcının öz saytında Stephen Lavelle-in 3D puzzle oyunu kimi təqdim olunur, cismin yuvarlana bilməsi əsas vizual ideyadır. Mənbə konkret bütün bişirmə və dayaq qaydalarını yazılı izah etmir. — [Rəsmi sayt](https://www.stephenssausageroll.com/about.html)
- **Patrick’s Parabox:** qutuların içində qutular; qutuları bir-birinə daxil və xaric etməklə dünyanın quruluşu dəyişir, hətta özünü ehtiva edən qutu araşdırılır. Rəsmi səhifə 350-dən çox əl işi puzzle və hər puzzle-da yeni ideya məqsədini bildirir. — [Rəsmi sayt](https://www.patricksparabox.com/)
- **Patrick Traynor-un dizayn prinsipləri:** sistemi təbii hiss etdirən davranış, maraqlı puzzle yaradan qayda, yadda qalan və düşünülməsi asan davranış, həyata keçirmə imkanları. O, ideyanı göstərən ən asan puzzle versiyasını axtardığını, səviyyələr əlavə etməklə yanaşı böyük qruplarını sildiyini deyir. — [Birbaşa developer müsahibəsi](https://www.gamedeveloper.com/design/patrick-s-parabox-)
- **Baba Is You:** qaydalar səviyyənin içində hərəkət etdirilən bloklardır; oyunçu bunları dəyişərək cismin xassəsini, maneəni və hətta qələbə məqsədini dəyişir. — [Hempuli-nin Steam səhifəsi](https://store.steampowered.com/app/736260/Baba_Is_You/)
- **Snakebird:** müəllif təsviri düzgün formaya düşməyi əsas problem kimi göstərir; itələmə, qaldırma, teleportasiya və meyvədən uzunluq artımı sadalanır. Xəritə qeyri-xəttidir. — [Noumenon Games Steam səhifəsi](https://store.steampowered.com/app/357300/Snakebird/)
- **Bonfire Peaks:** Corey Martin-in Draknek ilə hazırlanmış voxel puzzle oyunu; əşyaları yandırmaq məqsədi var. Developer artıq məzmunun çıxarıldığını, yeni nəticə və mexanikaları önə çəkir. — [Developer Steam səhifəsi](https://store.steampowered.com/app/1147890/Bonfire_Peaks/)
- **Portal 2:** iki oyunçulu rejimin ayrıca kampaniyası, personajları və puzzle otaqları var. Valve təsvirində əməkdaşlıqla hərəkət etməklə yanaşı əməkdaşlıqla düşünmək vurğulanır. — [Valve Steam səhifəsi](https://store.steampowered.com/app/620/Portal_2/)
- **Monument Valley:** ustwo oyunun Escher-in qeyri-mümkün memarlığından ilhamlandığını bildirir; baxış və optik illüziya yol tapma məntiqinin hissəsidir. — [ustwo-nun layihə izahı](https://ustwo.com/work/monument-valley/)

### Inferences
Aşağıdakılar oyunların təsdiqlənmiş mövcud xüsusiyyətləri deyil, bu layihə üçün təkliflərimdir:

| Mənbə prinsip | Bizim oyuna konkret çevrilmə | Qərar və risk |
|---|---|---|
| Stephen’s Sausage Roll: cismin orientasiyası nəticəni dəyişir | Blokun 6 üzündə fərqli keçiricilik; hansı üz aşağıdırsa zəminə o təsir edir | Güclü uyğunluq. Üz orientasiyası sadəcə dik/uzanmışdan daha geniş vəziyyət yaddaşı tələb edir; vizual önbaxış vacibdir |
| Parabox: bir məkan obyekti başqa məkanın konteyneridir | İki blok ayrı xəritə qatını təmsil edir; xüsusi girişdə blokun içində kiçik puzzle | Çox böyük scope və oxunaqlılıq riski; nüvəyə deyil ayrıca sonrakı modul |
| Baba: qayda fiziki manipulyasiya edilə bilir | Tam söz sistemi əvəzinə bir relay üzərində A və B-nin material xassələrini dəyişmək | Orta mürəkkəblik; “çəki dəyişdi, yoxsa element?” dəqiq göstərilməlidir |
| Snakebird: bədən həm məhdudiyyət, həm alətdir | Uzanmış A qısa boşluğu tutan dayaq olur, B onun üstündən keçir | Bloxorz ölçü və dayaq məntiqinə uyğundur; üstə çıxma, toqquşma və altdakı blokun tərpənməsi ayrıca dəqiq qayda istəyir |
| Bonfire Peaks: sıx məkanda cismin vəziyyəti | Dar künclərdə dönmək üçün B əvvəlcə A-nın yolunu boşaldır | Yeni element tələb etmədən geometriya dərinliyi verir; təkrar geriyədaşıma yorucu olmamalıdır |
| Portal 2: əməkdaşlıq ayrıca düşüncədir | A sensoru aktivləşdirir, B keçib ikinci sensorla A-nın geriyə çıxışını açır | Hər blok o birinə real xidmət edir; birinin düymə üstündə uzun gözləməsinə çevrilməməlidir |
| Monument Valley: görünüş yolun qaydasıdır | Müəyyən pedestalda lövhəni 90° döndərib iki qat arasında əlaqə yaratmaq | Kamera sadəcə görünüşü dəyişirsə məntiq dəyişməməlidir. Optik bağlantı seçilirsə bunu ayrıca fəsildə aydın öyrətmək lazımdır |

**Ən yaxşı ilkin seçimim:** orientasiya + qarşılıqlı dayaq + məhdud xassə mübadiləsi. Rekursiya, sərbəst qravitasiya, portal və tam qayda redaktəsi eyni ilk prototipdə birləşdirilməsin. Bu, ilkin sınaq fərziyyəsidir; playtest nəticəsi yoxdur.

**Bir puzzle nümunəsi:** A ağır blokdur, B kövrək körpüdən keçir. B o biri tərəfdən relay açır; A və B-nin ağırlıq xassəsi dəyişir. İndi A həmin körpünü keçə bilir, amma B ağırlaşdığı üçün əvvəlki təhlükəsiz marşrutunu itirir. Son həll iki blokun yolunu və orientasiyasını mübadilədən əvvəl planlamaqdır. Belə puzzle üçün əvvəlcə körpü məhv olmamalı, yük həddi açıq göstərilməli, mübadilə anında təsirlər vahid ardıcıllıqla hesablanmalıdır. Bu nümunənin həll edilən grid quruluşu hələ qurulmayıb; ideya sübut olunmuş səviyyə kimi təqdim edilməsin.

### Gaps
- Bu oyunların birlikdə tanınması satış və ya bizim hədəf auditoriyamızın üst-üstə düşməsini sübut etmir. Onları dizayn müqayisəsi kimi istifadə edirik.
- Stephen’s Sausage Roll-un xüsusi qril üzləri və fork toqquşmaları üçün bu araşdırmada birbaşa developer tərəfindən yazılmış dolğun qayda mənbəyi tapılmadı. Əlavə yoxlanmadan detallı fakt kimi verilməsin.

## GDD-dəki unikallıq və məhsul qərarları nə dərəcədə əsaslıdır?

### Takeaway
Sənəddəki ən riskli hissə ideyanın özü yox, bazarın tam boş və kombinasiyanın ilk olduğu barədə qəti hökmlərdir. Daha inandırıcı fərqlənmə müəyyənləşdirilə və prototiplə ölçülə bilər.

### Cited Findings
- **Death Squared** ən yaxın müqayisələrdəndir: SMG Studio-nun oyunu 1, 2 və ya 4 oyunçuya nəzərdə tutulur, rəngə uyğun hədəfə robotları çatdırmaq və bir-birini sağ saxlamaq üçün koordinasiya tələb edir. Developer özü oyunda oyunçunun blokları idarə etdiyini və başqa blokları itələdiyini yazır. Əsas kampaniya solo və ya iki nəfərlə oynanır. — [SMG Studio-nun Steam səhifəsi](https://store.steampowered.com/app/471810/Death_Squared/)
- Müəllif eyni səhifədə Switch buraxılışının maliyyə nəticəsinə ciddi təsirini və illərlə davam edən kiçik satış axınını qeyd edir. Bu bir oyunun developer müşahidəsidir, bütöv bazar üçün ölçü deyil. — [Death Squared developer açıqlaması](https://store.steampowered.com/app/471810/Death_Squared/)
- Portal 2 solo və co-op üçün ayrıca kampaniya qurur; bu, multiplayer-in yalnız əlavə idarəetmə düymələri olmadığına praktik nümunədir. — [Valve](https://store.steampowered.com/app/620/Portal_2/)

### Inferences
- Death Squared birbaşa Bloxorz-un 1×1×2 aşma mexanikasının eynisi olduğunu göstərmir. Lakin “iki fərqli subyektin 3D kooperativ puzzle sintezi ilk dəfədir” kimi geniş iddianı müdafiəsiz qoyur.
- “Bütün klonlar 1:1-dir”, “tamamilə boş nişdir”, “ilk dəfə” ifadələri sübutlanmayıb. Təklif edilən mövqeləndirmə: **İki aşan blokun orientasiyası, dayaq sahəsi və dəyişdirilə bilən material xassələri ilə qurulan qarşılıqlı məntiq oyunu.** Bu müşahidə edilə bilən məhsul vədidir; dünya üzrə ilkinlik iddiası deyil.
- GDD-də ağır-daş-od və yüngül-buz-su eyni paketə bağlanır. Tematik yaxınlıq mexaniki zərurət deyil: daşın sürüşməməsi yalnız ağır olduğundan nəticə çıxarmır. Bloklara ayrı çəki, sürtünmə, temperatur, keçiricilik xassələri verilə bilər, amma ilk sınaqda bunlardan yalnız bir-ikisi seçilməlidir.
- “Eyni anda çıxışa daxil olmaq” solo növbəli oyunda qeyri-müəyyəndir. İlkin qayda: gediş tam həll olunandan sonra hər iki blok öz hədəfində dikdirsə qələbə. Eyni kadrda hərəkət tələb olunmur.
- Aktiv bloka hər dəfə kamera yaxınlaşdırmaq qarşılıqlı mexanizmi gizlədə bilər. Kiçik ilkin səviyyələrdə bütün puzzle görünməli, seçilmiş blok kontur/işarə ilə fərqləndirilməlidir.
- Splitter iki bloku dörd idarə olunan hissəyə çevirəcək; qarşılıqlı xassələr və dayaq ilə birlikdə idrak yükü sürətlə artır. Bunu ilkin nümayişdən çıxarmaq nüvəni qoruyar.
- İlk mərhələdə 100 səviyyə öhdəliyi mexanikanın yetərincə ideya istehsal etdiyini bilmədən qoyulur. Əvvəl 8–12 fərqli fikirli nümunə, sonra təkrarsız məzmun sayına qərar vermək daha əsaslı dizayn yanaşmasıdır; saylar mənim tövsiyəmdir.
- Qələbəyə qədər gediş sayı ilə real vaxt speedrun ayrı məqsədlərdir. Məntiq kampaniyasında vaxt təzyiqini əsas qaydaya çevirməyib könüllü challenge kimi saxlamaq mümkündür.

### Gaps
- Satış həcmi, bazar ölçüsü, oyunçu willingness-to-pay, retention və konkret buraxılış büdcəsi məlum deyil. Bazar uğuru və 2026–2027 tarixləri üçün təminat çıxarıla bilməz.
- Dünya üzrə bu kombinasiyanın tam eynisinin mövcud olmaması sübut olunmayıb. Buna patent/unikallıq yoxlaması və ya tam bazar siyahısı kimi baxılmamalıdır.
