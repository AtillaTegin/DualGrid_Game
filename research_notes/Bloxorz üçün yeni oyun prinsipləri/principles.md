# Tarixi tapmacalar və riyazi fiziki prinsiplər

## Hansı tarixi prinsiplər bizim oyuna köçürülə bilər?

### Takeaway
Ən məhsuldar irs qədim görünüş və ya nostalji ad deyil: məhdud hərəkət, boş yerin resurs olması, gedişlərin sırasının əhəmiyyəti və görünməyən vəziyyət məhdudiyyətləridir. Aşağıdakı əlaqələr dizayn analogiyasıdır; Bloxorz-un bu oyunlardan birbaşa törədiyini iddia etmirəm.

### Cited Findings
- Sokoban-un rəsmi tarix səhifəsi ilk nəşrləri 1982-ci ilin dekabrında Thinking Rabbit və PC-8801/FM-7/PC-8001mk2 üçün göstərir. Ana səhifədə müəllif Hiroyuki Imabayashi kimi qeyd edilir. — [Rəsmi tarix](https://www.sokoban.jp/history.html), [rəsmi sayt](https://www.sokoban.jp/)
- Rush Hour-da maşın və yük maşınlarını öz zolaqları boyunca hərəkət etdirib qırmızı maşının çıxış yolunu açmaq lazımdır. Bu, digər fiqurların mövqeyini dəyişərək əsas yolun qurulması prinsipidir. — [ThinkFun](https://www.thinkfun.co.uk/en-GB/products/logic-games/rush-hour-76436)
- Ənənəvi sliding-block tapmacalarında çərçivə içindəki fiqurlar sürüşdürülür; çevirmək, qaldırmaq və üstündən tullanmaq qadağandır. Bu baxımdan Bloxorz-un çevrilməsi ayrıca qərar dəyişənidir. Mənbənin tarixi müəlliflik iddiaları burada istifadə olunmur. — [CIMT qayda təsviri](https://www.cimt.org.uk/resources/puzzles/slideblk/sbint.htm)
- Demaine və Rudoy-un məqaləsi 15 tapmacasını üst-üstə düşmədən hədəf düzülüşünə sürüşdürülən nömrəli vahid kvadratlar sistemi kimi formalizasiya edir. Bütün mümkün düzülüşlərə sərbəst çatmaq fərziyyəsi düzgün deyil; paritet haqqında ayrıca riyazi mənbələr var. — [Müəlliflərin tədqiqatı](https://arxiv.org/abs/1707.03146)
- Bloxorz haqqında van der Zanden və Bodlaender-in tədqiqatı düymə və açılıb-bağlanan döşəmələri olan ümumiləşdirilmiş səviyyələrin həllolunmasını PSPACE-complete göstərir. Bu, hər konkret kiçik levelin çətin olması və ya insanın çətinlik hissini ölçməsi demək deyil. — [Məqalə](https://arxiv.org/abs/1411.5951)

### Inferences
- **Sokoban-dan götürüləcək fikir:** sadəcə hədəfə yaxınlaşmaq kifayət deyil; geri çıxış və gələcək çevrilmə yeri saxlamaq lazımdır. Bloklar bir-birini itələmədən də dəhliz və dayanma mövqeləri uğrunda rəqabət yarada bilər.
- **Rush Hour-dan götürüləcək fikir:** müvəqqəti olaraq hədəfdən uzaqlaşmaq digərinin yolunu açır. İki blok bir-birinin həm köməkçisi, həm maneəsi olsun.
- **15 tapmacasından götürüləcək fikir:** oyunçuya görünən mövqe ilə həqiqi əldəolunan vəziyyət fərqlidir. Pariteti birbaşa Bloxorz-a köçürmək olmaz: öz vəziyyət qrafımızda ayrıca yoxlama lazımdır.
- İki blok və k körpü açarı üçün baza vəziyyəti S=(pA,oA,pB,oB,b1...bk) kimi təsvir etmək olar. Bir blok üçün təxminən 3N yerləşmə üst həddi qəbul etsək, iki blokun sadələşdirilmiş üst həddi təxminən 9N²·2^k-dir; toqquşma və xəritə bunu azaldır. Aktiv blok seçimi, səth izləri, enerji və üz işarələri əlavə dəyişənlərdir. Bu hesab müəllifin dizayn modelidir, məqalənin nəticəsi deyil.
- “Yeni mexanika sayı” yerinə “eyni qayda neçə fərqli nəticə doğurur?” sualı əsas meyar olsun. İki blok + çevrilmə + bir münasibət qaydası artıq dərin sistem yarada bilər.

### Gaps
- Klotski/Huarong Dao üçün qədim mənşə iddiasını təsdiq edən ilkin mənbə tapılmadı; onu “qədim Çin oyunu” kimi təqdim etmək düzgün olmaz. Tarixi mifə layihənin yenilik əsaslandırmasını bağlamamaq lazımdır.
- Bu araşdırma bütün oyunların və patentlərin tam yenilik axtarışı deyil; təkliflərin dünyada ilk olduğu iddia edilmir.

## Bloxorz-un dəqiq məntiqi və fizika ilə sərhədi nədir?

### Takeaway
Blokun ölçüsü dəyişmir: 1×1×2 prizmanın yerə toxunan sahəsi və istiqaməti dəyişir. Sabit, hesablana bilən grid qaydası əsas model olmalı, animasiya bu qərarın təsviri kimi işləməlidir.

### Cited Findings
- Bloxorz 1×1×2 blokun ikiölçülü grid üzərində aşırılmasıdır. Dikdən uzanmışa, uzanmışdan dikə və uzanmış vəziyyətdə yan istiqamətdə yuvarlanma fərqlənir; son mövqe tam dəstəklənməlidir, hədəfə dik çatılır. — [Bloxorz tədqiqatının 1.1 bölməsi](https://arxiv.org/pdf/1411.5951)
- Təzyiq normal qüvvənin sahəyə nisbətidir: p=F/A. Sabit çəki daha böyük sahəyə paylananda orta təzyiq azalır. — [OpenStax](https://openstax.org/books/university-physics-volume-1/pages/14-1-fluids-density-and-pressure)
- Statik tarazlıq həm qüvvələrin, həm fırlanma momentlərinin cəminin sıfır olmasını tələb edir. Ağırlıq mərkəzi və dayaq sahəsi sabitlik üçün əhəmiyyətlidir. — [OpenStax statika](https://openstax.org/books/university-physics-volume-1/pages/12-1-conditions-for-static-equilibrium), [sabitlik](https://openstax.org/books/college-physics-ap-courses-2e/pages/9-3-stability)
- Sadə sürtünmə modeli f_k=μ_k N-dir; horizontal səthdə N=mg olduqda yavaşıma μ_k g alınır. Eyni material və başlanğıc sürət üçün “ağırdır, ona görə heç sürüşmür” nəticəsi bu modeldən çıxmır. — [OpenStax sürtünmə](https://openstax.org/books/university-physics-volume-1/pages/6-2-friction)
- Elektrikdə Kirchhoff düyün qaydası yükün, kontur qaydası enerjinin qorunması ilə bağlıdır. Sadə rəngli bağlantı qrafı bu qanunların tam simulyasiyası deyil. — [UMass dərsliyi](https://openbooks.library.umass.edu/funee/chapter/2-6/)

### Inferences
**Dəqiq diskret hərəkət modeli — müəllifin formalizasiyası.** U(x,y) dik blokdur; X(x,y) (x,y) və (x+1,y) xanalarını tutur; Y(x,y) (x,y) və (x,y+1) xanalarını tutur. Şərq +x, şimal +y-dir. Kamera bu qaydanı dəyişmir.

| Vəziyyət | Şərq | Qərb | Şimal | Cənub |
|---|---|---|---|---|
| U(x,y) | X(x+1,y) | X(x−2,y) | Y(x,y+1) | Y(x,y−2) |
| X(x,y) | U(x+2,y) | U(x−1,y) | X(x,y+1) | X(x,y−1) |
| Y(x,y) | Y(x+1,y) | Y(x−1,y) | U(x,y+2) | U(x,y−1) |

Hər nəticədə bütün tutulan xanalar dəstəklənməli və o biri blokla üst-üstə düşməməlidir. Hündür divarlar varsa yalnız son mövqenin boşluğu yetməz: çevrilmə animasiyasının süpürdüyü həcm üçün də qayda tələb olunur. İlk prototipdə alçaq xəritə və aydın qadağan olunmuş kənarlar bu problemi azaldar.

- **Üzlər:** baza hərəkət üçün U/X/Y kifayətdir. Rəngli/mis/isti üz əlavə olunanda hansı fiziki üzün aşağı baxdığını da saxlamaq lazımdır; eyni U/X/Y görünüşü eyni üz düzülüşü demək deyil.
- **Şüşə təklifi:** qırılma həddini orta yükə bağlamaq mümkündür. Məsələn çəkini sadələşdirilmiş “yük vahidi” kimi 2 seçək: dik halda xananın yükü 2, simmetrik uzananda hər xananın yükü 1. Hədd 1.5 olsa uzanmış keçir, dik sındırır. Bu bərabər yük bölgüsü idealizə edilmiş oyun qaydasıdır; real kövrək materialın əyilmə, qüsur və dinamik zərbə davranışı deyil.
- **Buz üçün tövsiyə olunan qayda:** blok tam buz üstündə bir gedişi bitirirsə, son istiqamətdə duruşu dəyişmədən bir xana-bir xana sürüşür. Növbəti yerləşmə divar/başqa blokla toqquşsa cari vəziyyətdə dayanır; dəstəksiz olsa düşür; tam buz örtüyündən çıxan ilk dəstəklənən mövqedə dayanır. Beləliklə yarım buz/yarım daş mövqeyi əyləcdir. Başlama şərti, qarışıq səth və kənar açıq göstərilməlidir.
- **Alternativ:** buzda eyni istiqamətdə avtomatik təkrar yuvarlanma. Bu ayrıca qaydadır və U/X/Y ardıcıllığını dəyişir. İkisini eyni vizual buzla qarışdırmamaq lazımdır.
- Daş blokun buzda dayanması üçün “ağır olduğuna görə” izahı əvəzinə kobud altlıq, mıx və ya element sehrinin qaydası göstərilsin.
- “Passiv blok donur” yalnız idarə verilmədiyi mənasına gəlsin. Altındakı körpü yox olanda havada qalması ciddi səbəb-nəticə qırılması yaradar; bütün dünya hər gedişdən sonra yenilənməlidir.
- Deterministik addım ardıcıllığı seçilsin: komanda → yerləşmə → məcburi sürüşmənin həlli → sensorlar və körpülər → dayaq/təhlükə → tamamlanma. Aralıq sürüşmə xanalarının düyməni aktivləşdirib-aktivləşdirmədiyi ayrıca qərardır; ilkin versiyada yalnız sabit dayanma vəziyyətləri aktivləşdirsin.

### Gaps
- Sənəddə buzun sürüşmə, yoxsa məcburi yuvarlanma olması, şüşənin kütlə, təzyiq və ya duruş həddi olması müəyyən edilməyib. Bunlar koddan qabaq dizayn qərarlarıdır.
- Qeyri-bərabər kütləli və ya dayaqdan çıxan bloklar üçün real fizika ayrıca analiz tələb edir; erkən mərhələdə dəqiq fizika simulyasiyası vədi verilməsin.

## Hansı yeni mexanikalar ən məhsuldar görünür?

### Takeaway
Aşağıdakılar mənim layihə üçün konsept təkliflərimdir, mənbədə mövcud olduğu və ya dünyada ilk olduğu iddia edilmir. Ən güclü ilk sınaq cütlüyü “digər blok əyləcdir” və “xüsusiyyət mübadiləsi”dir: ikisi də blokların həqiqi qarşılıqlı asılılığını yaradır.

### Cited Findings
- Məkan tapmacalarının az sayda məhdudiyyətlə mürəkkəb vəziyyət əlaqələri yaratması sliding-block üzrə nəzəri işlərdə görünür; nəzəri çətinlik oyuncu zövqünə təminat deyil. — [Hearn və Demaine](https://arxiv.org/abs/cs/0205005)
- Həqiqi elektrik dövrəsinin qorunma qanunlarını sadələşdirilmiş oyun resursundan ayırmaq vacibdir. — [Kirchhoff qaydaları](https://openstax.org/books/university-physics-volume-2/pages/10-3-kirchhoffs-rules)

### Inferences
1. **Canlı əyləc.** Buz bloku sürüşür; daş blok maneə kimi onu düzgün yerdə saxlayır. Nümunə: buz dəhlizinin sonunda boşluq var, daş yan cibdən gəlib bir xana erkən dayanma yaradır; sonra buz düyməsi daşın çıxışını açır. Dəyər: aşağı/orta. Risk: hər səviyyə sadəcə əyləci qoymağa çevrilər; müxtəlif duruşlar dayanma nöqtəsini dəyişsin. İlkin namizəd.
2. **Xüsusiyyət mübadiləsi.** İki blok cüt “mübadilə” meydançalarında dik dayananda ağır/ankorlu və yüngül/sürüşən xassələri dəyişir, şəxsiyyətləri və hədəf nişanları dəyişmir. Nümunə: soldakı blok ağır düyməni basıb keçidi açır, qarşı tərəfə yüngül kimi keçəndən sonra xassələr dəyişdirilir ki, geri yol mümkün olsun. Dəyər: orta. Risk: rəng həm şəxsiyyəti, həm materialı ifadə edərsə qarışıqlıq; şəxsiyyət üçün işarə, material üçün səth teksturası istifadə olunsun. Güclü fərqləndirici namizəd.
3. **Duruşla yük paylama.** Eyni ağır blok dikdə şüşəni sındırır, uzananda keçir; yalnız dikdə dərin sensoru basır. Nümunə: şüşə körpünü uzanmış keçib kiçik geniş platformada dikəlmək lazımdır; ikinci blok çevrilmə sahəsini açır. Dəyər: aşağı/orta. Risk: “təzyiq düyməsi” ilə “yalnız dik düymə” ayrı nişanlansın. İlkin namizəd, lakin Bloxorz-dan kifayət qədər fərqlənməsi təkbaşına zəifdir.
4. **Keçirici üz.** Blokun bir uzun üzündə iki kontaktı bağlayan mis zolaq var; yalnız uyğun üz aşağı baxanda dövrə bağlanır. Nümunə: bir blok cərəyan körpüsü olur, o biri keçidə çatır; sonra birinci yerini dəyişmədən əvvəl ikinci ehtiyat dövrəni tamamlayır. Dəyər: orta/yüksək, üz izləmə tələb edir. Risk: görünməyən alt üz yaddaş yükü; blok kənarında kiçik üz xəritəsi və proqnoz verilsin. Sonrakı fəsil.
5. **Qorunan enerji nişanları.** Cəmi üç enerji nişanı var; körpü 2, qapı 1 istəyir. Bloklar yalnız toxunma meydançasında nişan ötürür. Nümunə: bir blok körpünü 2 vahidlə saxlayır, digərində qalan 1 çıxışı açır; tamamlanmadan əvvəl enerji ardıcıllığını yenidən bölüşdürmək lazımdır. Dəyər: orta. Risk: tam elektrik simulyasiyası kimi təqdim edilməsin və hər dövrə yeni gizli istisna yaratmasın. “İki fərqli blok” fikrini dəyişən rollara çevirmək üçün uyğundur.
6. **İki qatlı yollar.** Eyni x,y koordinatı üst və alt yolda müxtəlifdir; lift yalnız dik bloku qatlar arasında keçirir. Nümunə: aşağıdakı blok üst körpünün dayağını aktivləşdirir, yuxarıdakı blok altdakı çıxışı açır. Dəyər: yüksək. Risk: izometrik örtülmə və dayaq qeyri-müəyyənliyi; qat görünüşü və gizli blok konturu lazımdır. Baza sübutundan sonra.
7. **Növbəli əks səda.** Bir blok üçün son üç uğurlu komanda yadda saxlanır; echo platformasında o biri blok hər qlobal gedişdə sıradakı əmri təkrar edir. Gözləmə açıq komanda olmalı, qanunsuz addımın dayanma və ya bütün cütü bloklama davranışı sabit olmalıdır. Nümunə: üç addımlıq marşrut qeyd edilir, sonra oyunçu digər bloku idarə edib eyni gedişdə iki ayrı sensoru uyğunlaşdırır. Dəyər: yüksək. Risk: undo/eyni anda əmrlər/aktiv dünya səbəb-nəticəsi ağırlaşır. Ayrı rejim və ya gec fəsil; MVP-yə salınmasın.
8. **Topoloji tikiş.** Xəritənin iki sərhədi açıq nişanlı şəkildə birləşir; çıxan blok başqa kənarda eyni duruş və tutduğu sahəyə uyğun görünür. Nümunə: düz yolla hədəfə yanlış duruşda çatan blok tikişli dövrəni gəzib başqa giriş qazanır. Dəyər: yüksək. Risk: sərhədi keçən 1×2 cismin yarılarının xəritələnməsi və toqquşması əvvəlcədən formal müəyyən edilməlidir; portal tək xananı deyil bütöv cismi qəbul etsin. Sonrakı eksperimental mod.

**Prioritet:** əvvəl canlı əyləc + duruşla yük + iki blokun qarşılıqlı körpü açması; sonra yalnız xüsusiyyət mübadiləsi prototipdə ayrıca müqayisə edilsin. Üzlər, echo və topoloji tikiş eyni erkən səviyyəyə yığılmasın. Əvvəl 5–8 kiçik qayda sınağı, sonra yaxşı nəticə verən iki mexanikanın 3–4 kombinasiyası: bu rəqəmlər iş planı təklifidir, təsdiqlənmiş istehsal norması deyil.

**Tamamlanma qaydası:** tək oyunçuda “hər ikisi eyni anda qapıya daxil olsun” əvəzinə “hər ikisi eyni sabit dünya vəziyyətində öz hədəfində dik olsun” seçilsin. Birincisi hədəfə girəndə yox olmasın və idarəsi kilidlənməsin; lazım gəlsə geri çıxa bilsin. Reaksiya sürəti tələb olunmadan koordinasiya saxlanır.

**Undo:** sonsuz geri alma əsas rahatlıq funksiyası olsun. Echo və zamanla oynamaq ayrı mexanikadır; normal undo-ya məhdudiyyət qoymaq məntiqin yerinə təkrar əməliyyat yükü yarada bilər. Bu normativ dizayn mövqeyidir.

### Gaps
- Təkliflər işlək səviyyələr və oyunçu testləri ilə yoxlanılmayıb; nümunələr məntiq skeletidir, həlli təsdiqlənmiş koordinat xəritələri deyil.
- Əyləc/mübadilə kombinasiyasının bazardakı bütün oyunlarda olub-olmadığı ayrıca rəqib və yenilik araşdırması olmadan qəti deyil.
