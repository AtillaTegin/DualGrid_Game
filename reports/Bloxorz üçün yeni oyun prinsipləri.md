# İki blok bir dünyanın qaydalarını dəyişsin

Bu layihənin ən güclü istiqaməti Bloxorz-a çoxlu element və rejim əlavə etmək deyil: **iki aşan blokun mövqeyi, duruşu və dəyişdirilə bilən rolları vasitəsilə bir-birinə yol yaratmasını oyunun mərkəzinə qoymaqdır**. Sənəddəki Bloxorz × Atəş və Su başlanğıcı bunun üçün yaxşı əsasdır, amma təkcə iki personaj və fərqli rəng kifayət qədər fərdi kimlik vermir. Bloxorz-un özündə iki hissəyə bölünmə və aralarında idarə keçidi var; Death Squared isə rəngli blok personajları uyğun hədəflərə çatdıran solo və kooperativ puzzle təqdim edir. Mənim tövsiyəm sabit 2.5D izometrik görünüşdə, tələsmədən oynanan, dəqiq diskret dünya qurmaq; əvvəl həndəsə və ağır/yüngül rolların mübadiləsini, sonra partnyorun sürüşməyə əyləc olmasını sınamaqdır. Aşağıda mənbəli faktlar, onlardan çıxardığım nəticələr və layihə üçün təkliflər ayrılır. Təklif olunan səviyyələr koordinat xəritəsi və prototiplə təsdiqlənməyib. Oyunun hazırlanmasına başlanmayıb və ilkin GDD dəyişdirilməyib.

## 1. Mövcud oyunlardan obrazı yox, qərarın strukturunu götürək

### Bloxorz-un əsl nüvəsi orientasiyadır

GDD-nin güclü tərəfi aydın şəbəkə hərəkətini iki fərqli subyektin qarşılıqlı ehtiyacı ilə birləşdirməsidir. Məncə ən yaxşı fikir od və su mövzusu yox, öz yolunu açmaq üçün digər cismin gələcək mövqeyini də düşünmək məcburiyyətidir. Bu həm solo planlama, həm kooperativ ünsiyyət yarada bilər; əyləncəliliyi hələ yoxlanmayıb.

İlk dəqiqləşdirmə: Bloxorz-da blokun ölçüsü dəyişmir. Blok həmişə **1×1×2 prizmadır**; dik duranda bir, uzananda iki xana tutur. Dəyişən təmas sahəsi, uzun oxun istiqaməti və növbəti hərəkətdə tutacağı yerdir. Elmi formalizasiyada oyun ikiölçülü şəbəkədə cismin aşırılması kimi təsvir edilir; çıxışa dik çatılır. Həqiqi ölçü dəyişməsi əlavə etsək, bu ayrıca mexanika olacaq. ([Bloxorz tədqiqatı](https://arxiv.org/abs/1411.5951))

Oyunu yayımlayan platformanın təlimatında yumşaq düymə istənilən təmasla, ağır düymə dik blokla işləyir; narıncı zəmin dik blok altında çökür. Düymələrin hamısı basılı saxlanmır: toggle və daimi açılma da var. Splitter iki kiçik kub yaradır; Space ilə seçim dəyişir, yanaşı gələndə birləşirlər. Deməli, bizim fərqlənməmiz yalnız iki obyekt arasında keçid ola bilməz. Həmin səhifənin tarix metadatası ilə mətnində uyğunsuzluq olduğundan dəqiq ilk buraxılış günü burada arqument kimi istifadə edilmir. ([Bloxorz təlimatı](https://www.coolmathgames.com/0-bloxorz))

Atəş və Su-dan götürüləsi prinsip asimmetrik əməkdaşlıqdır: birinin təhlükəsiz yolu digərinə uyğun olmur və fəaliyyətləri bir həll ardıcıllığında birləşir. Oslo Albet-in səhifəsi solo və eyni cihazda kooperativ oyunu göstərir; oradakı 2026 tarixi Steam buraxılışıdır. Platforma təlimatı elementlərə uyğun keçidləri və personaj dəyişməsini izah edir. Biz bunu tullanma refleksindən ayırıb həndəsi planlamaya çevirə bilərik. ([Developer səhifəsi](https://store.steampowered.com/app/5084260/Fireboy__Watergirl_1_The_Forest_Temple/), [təlimat](https://www.coolmathgames.com/0-fireboy-and-water-girl-in-the-forest-temple))

### Tarixi tapmacalardan gələn üç məhsuldar fikir

Buradakı əlaqələr dizayn analogiyasıdır; Bloxorz-un birbaşa bu oyunlardan törədiyini iddia etmirəm. Sokoban-un rəsmi tarixçəsi ilk nəşrləri 1982-ci ilin dekabrına bağlayır, müəllifi Hiroyuki Imabayashi kimi göstərir. Bizim çıxardığımız dərs: hədəfə yaxınlaşmaqdan əlavə gələcək çevrilmə və geri dönüş yeri də saxlanmalıdır. İki blok bir-birini itələməsə belə dar dəhliz və dayanma sahəsi uğrunda rəqabət yarada bilər. ([Sokoban tarixçəsi](https://www.sokoban.jp/history.html), [rəsmi sayt](https://www.sokoban.jp/))

Rush Hour-da başqa maşınları öz zolaqları boyunca hərəkət etdirərək qırmızı maşının çıxışı açılır. Bizdə A öz məqsədindən uzaqlaşmalıdır ki, B çevrilsin və sonra A-ya yol açsın. Klassik sliding-block tapmacalarında çevirmək və qaldırmaq qadağandır; Bloxorz-un aşması buna əlavə qərar ölçüsü verir. ([ThinkFun](https://www.thinkfun.co.uk/en-GB/products/logic-games/rush-hour-76436), [CIMT](https://www.cimt.org.uk/resources/puzzles/slideblk/sbint.htm))

15 tapmacası ailəsi görünən düzülüşlə əldə edilə bilən vəziyyətin fərqli olduğunu xatırladır. Onun paritet qaydasını Bloxorz-a olduğu kimi köçürmək olmaz: bizim iki blok və körpü sistemimizin ayrıca vəziyyət qrafı var. Klotski/Huarong Dao üçün etibarlı ilkin mənbə ilə qədim mənşə təsdiqlənmədiyindən qədim Çin oyunu iddiası irəli sürmürəm. ([Sliding-square tədqiqatı](https://arxiv.org/abs/1707.03146))

### Müasir oyunlardan götürüləsi prinsiplər

Cədvəldə mənbədəki sistem fakt, bizim tətbiq isə dizayn təklifidir. Məqsəd bütün oyunları bir məhsula yığmaq deyil.

| Oyun və prinsip | Bizim tətbiqimiz | Risk |
|---|---|---|
| [Stephen’s Sausage Roll](https://www.stephenssausageroll.com/about.html): yuvarlanan cisim | Hansı üzün aşağı olduğunu vacib etmək | Gizli üz yaddaş yükü yaradır; rəsmi səhifə bütün qril qaydalarını yazılı izah etmir |
| [Patrick’s Parabox](https://www.patricksparabox.com/): qutular dünyaları ehtiva edir | Bir qaydanın çox nəticəsini araşdırmaq | Rekursiyanın özünü gətirmək scope-u böyüdər |
| [Baba Is You](https://store.steampowered.com/app/736260/Baba_Is_You/): qayda manipulyasiya edilir | Məhdud material/rol mübadiləsi | Hər qaydanı dəyişmək nüvəni bulanıqlaşdırar |
| [Snakebird](https://store.steampowered.com/app/357300/Snakebird/): bədən forması tapşırığın alətidir | Bloku əyləc və sonradan dayaq etmək | Üst-üstə çıxma yeni fiziki qaydalar istəyir |
| [Bonfire Peaks](https://store.steampowered.com/app/1147890/Bonfire_Peaks/): sıx məkan və seçilmiş məzmun | Hər səviyyədə fərqli məkan fikri | Uzun geri daşımanı çətinlik saymamaq |
| [Portal 2](https://store.steampowered.com/app/620/Portal_2/): ayrıca co-op kampaniya | Birgə düşünülən səviyyələr | Solo səviyyə avtomatik yaxşı co-op deyil |
| [Monument Valley](https://ustwo.com/work/monument-valley/): Escher-dən gələn qeyri-mümkün memarlıq | Baxışın qaydaya çevrildiyi ayrıca dünya | Kamera və məkan əlaqəsini qarışdırmaq |
| [Death Squared](https://store.steampowered.com/app/471810/Death_Squared/): blok robotlar və rəngli hədəflər | Ən yaxın geniş müqayisə | İki blok və iki çıxış təkbaşına fərqlənmə deyil |

Patrick Traynor birbaşa müsahibəsində qaydanın təbii hiss edilməsini, maraqlı puzzle yaratmasını və yadda saxlanmasının asan olmasını üstün tutur. İdeyanı göstərən ən asan səviyyəni axtardığını, zəif səviyyələri sildiyini deyir. Məncə rəhbər sual da “daha nə əlavə edək?”dən əvvəl **“bu qayda hansı yeni dərk anını yaradır?”** olmalıdır. ([Developer müsahibəsi](https://www.gamedeveloper.com/design/patrick-s-parabox-))

## 2. Riyaziyyat və fizika qaydanı aydınlaşdırmalıdır

### Hərəkət ölçü dəyişməsi deyil, diskret vəziyyət keçididir

Aşağıdakı model layihə üçün formal təklifdir. Şərq +x, şimal +y-dir. U(x,y) dik blok; X(x,y) (x,y) və (x+1,y), Y(x,y) isə (x,y) və (x,y+1) xanalarını tutur. Kamera bu əlaqəni dəyişmir.

| Vəziyyət | Şərq | Qərb | Şimal | Cənub |
|---|---|---|---|---|
| U(x,y) | X(x+1,y) | X(x−2,y) | Y(x,y+1) | Y(x,y−2) |
| X(x,y) | U(x+2,y) | U(x−1,y) | X(x,y+1) | X(x,y−1) |
| Y(x,y) | Y(x+1,y) | Y(x−1,y) | U(x,y+2) | U(x,y−1) |

Bir giriş həmişə bir xana irəliləmək deyil. İlkin versiyada son tutulan sahənin hamısı dəstəklənsin, bloklar itələməsin və üst-üstə çıxmasın. Hündür divarlar varsa yalnız son yerləşmə yox, aşma zamanı keçilən həcm də hesablanmalıdır; ilk lövhələrdə sadə, alçaq maneələr daha münasibdir. Sonradan üz mexanikası gələndə U/X/Y yetməyəcək: hansı fiziki üzün aşağı olduğunu da saxlamaq lazımdır.

Təzyiq p=F/A-dır. Oyun üçün ağır blokun yükünü 2 vahid seçsək, dik halda bir xanaya 2, uzananda hər xanaya 1 verə bilərik. Həddi 1.5 olan səth uzanmış bloku saxlayar. **Bu idealizə edilmiş yük bölgüsü qaydasıdır, real şüşənin əyilmə və zərbə simulyasiyası deyil.** ([OpenStax təzyiq](https://openstax.org/books/university-physics-volume-1/pages/14-1-fluids-density-and-pressure))

İlk nüvədə bunu da sadələşdirərdim: ağır üçün bağlı, yüngül üçün açıq yük məhdudiyyətli keçid. İlkin keçid sınmasın, qanunsuz gediş xəbərdarlıqla rədd edilsin. Sonra kövrək şüşə və duruşla yük bölgüsü ayrıca öyrədilsin. Beləliklə kütlə, təzyiq və duruş eyni anda qarışmır.

“Ağırdır, ona görə buzda sürüşmür” real fizikanın avtomatik nəticəsi deyil. Sadə sürtünmədə f=μN və N=mg olduğundan yavaşıma μg-dir; kütlə ixtisar edilir. Daş blokun dayanmasını kobud altlıq, dişli səth və ya ankor izah edə bilər. Bu rolları paketləmək şüurlu oyun qaydası kimi göstərilməlidir. ([OpenStax sürtünmə](https://openstax.org/books/university-physics-volume-1/pages/6-2-friction))

Real sabitlik qüvvələrə əlavə fırlanma momenti və dayaq münasibətindən asılıdır; ilk modeldə isə tam sahə dəstəyi seçirik. Elektrik modulunda da kontaktların bağlantı qrafı və enerji nişanlarının bölgüsü tam dövrə simulyasiyası sayılmamalıdır. Kirchhoff qanunları yük və enerji qorunması ilə bağlıdır; bizim götürəcəyimiz məhsuldar fikir məhdud resursun bölüşdürülməsidir. ([OpenStax statika](https://openstax.org/books/university-physics-volume-1/pages/12-1-conditions-for-static-equilibrium), [Kirchhoff](https://openstax.org/books/university-physics-volume-2/pages/10-3-kirchhoffs-rules))

Bloxorz-un düyməli ümumiləşdirilmiş səviyyələri üçün PSPACE-tamlıq sübutu var. Bu, hər kiçik səviyyənin çətinliyi və ya əyləncənin ölçüsü deyil. Öz sadələşdirilmiş hesabımızda N xanalı lövhədə bir blokun təxminən 3N mövqe-orientasiya üst həddi iki blok üçün 9N² edir; k müstəqil ikilik qıfıl 2^k vuruğu əlavə edir. Bu mənim izah modelimdir: qanunsuz yerlər sayı azaldır, üzlər və sınmış səthlər artırır. Splitter əlavə etmək buna görə kiçik dekor qərarı deyil. ([İlkin tədqiqat](https://arxiv.org/abs/1411.5951))

## 3. Üç istiqamətdən rol mübadiləsini əsas namizəd seçərdim

### Birinci istiqamət: partnyor məkanın sərhədidir

Biri buzda dayanır, digəri sürüşür; duran blok canlı əyləc olur. Əsas fikir: “Partnyorum sadəcə düymə basmır, mənim dayana biləcəyim yeri yaradır.” Gücü əlaqənin dərhal görünməsidir. Risk hər səviyyənin eyni “daşı qoy, buz gəlsin” həllinə çevrilməsidir. Duruş və dar həndəsə müxtəlif fikir yaratmasa tez tükənər. Bunu kiçik müqayisə sınağı kimi saxlamağı təklif edirəm.

### İkinci istiqamət: güc iki bədən arasında ötürülür

**Əsas namizədim budur.** İki blokdan biri ağır, digəri yüngüldür; xüsusi meydançada rolları dəyişir. Şəxsiyyət, çıxış nişanı və mövqe dəyişmir. Oyunçu gücü doğru bədənə, doğru tərəfdə, doğru vaxtda çatdırmalıdır. Qısa məhsul vədi: **“İki bloku çıxışa apar; əvvəlcə hansının nə vaxt güclü olacağını həll et.”**

Mübadilə üçün hər iki blok müəyyən hüceyrələrdə dik dayanır. Sadəcə yanından keçmək kifayət deyil; görüşün həndəsəsi də həllin hissəsidir. Bir blok əvvəl ağır düyməni basır, sonra yüngül rola keçərək kömək alır. Risk kimliklə rolun qarışmasıdır: çıxış simvolu sabit kimliyi, çəkic/lələk işarəsi dəyişən rolu göstərməlidir.

### Üçüncü istiqamət: lövhənin quruluşu dəyişir

Qatlar, bağlı sərhədlər və xüsusi baxışdan birləşən yollar əsas olur. Monument Valley və Parabox burada düşüncə nümunələridir. Fərqlənmə potensialı yüksəkdir, amma topologiya, kamera və oxunaqlılıq birlikdə həll edilməlidir. Mən bunu başlanğıc məhsul üçün seçməzdim; sonrakı eksperimental dünya daha münasibdir.

| İstiqamət | Əsas qərar | Risk | Seçim |
|---|---|---|---|
| Canlı əyləc | Partnyor məni harada saxlamalıdır? | Orta; sürüşmə qaydası | Kiçik müqayisə sınağı |
| Rol mübadiləsi | Güc hansı bədəndə olmalıdır? | Orta; rol/kimlik dili | Əsas namizəd |
| Dəyişən məkan | Hansı bağlantı yolu mümkün edir? | Yüksək; kamera və topologiya | Sonrakı mərhələ |

### Minimal qayda müqaviləsi

Bu cədvəl yeni layihə təklifidir, mövcud oyundan fakt deyil. Məqsəd rol mübadiləsinin dəyərini ayrıca görməkdir.

| Sahə | İlkin qayda |
|---|---|
| Həndəsə | İki 1×1×2 blok; U/X/Y aşma; tam dayaq |
| Kimlik | A və B sabit simvollarla tanınır, öz çıxışları var |
| Rol | Həmişə biri ağır, biri yüngüldür |
| Mübadilə | Xəttlə birləşmiş iki xüsusi yanaşı plitədə hərəsi dik dayanır; ayrıca əmr rolları dəyişir |
| Məhdudiyyət | İstənilən yerdən uzaq mübadilə və təsadüfi toxunuşla dəyişmə yoxdur |
| Ağır düymə | Yalnız dik və ağır blok basır; hər iki tələb nişanlanır |
| Yüngül keçid | Yalnız yüngül keçir; ağırın gedişi rədd edilir, ilkin mərhələdə sınmır |
| Körpü | Əlaqəli düymənin sabit son vəziyyətindən asılıdır |
| Toqquşma | İtələmə və üst-üstə çıxma yoxdur |
| Passiv blok | Əmr almır, amma dünya qaydaları ona da təsir edir |
| Qələbə | Eyni sabit vəziyyətdə ikisi də öz çıxışında dikdir; əvvəl gələn yox olmur və kilidlənmir |
| Məğlubiyyət | Dayaq itirilsə cəhd dayanır; geri alma açıq qalır |

Ağır düymə burada iki şərtlidir; onu real təzyiq cihazı adlandırmırıq. Sonrakı təzyiq sensoru ayrıca nişanlanmalıdır. İlk testdə istilik, od keçirməzlik və keçiriciliyi ağır/yüngül rollara əlavə etməzdim. Daş, od, buz və su dörd ayrı anlayışdır; rəng mövzusu hər birinə avtomatik fiziki xüsusiyyət vermir.

### On iki mexanika ideyası və onların yeri

Bunlar sınaqdan keçməmiş təkliflərdir; dünyada ilkinlik iddiası yoxdur. Xərc nisbi mürəkkəblikdir, təqvim hesabı deyil.

| Mexanika | Yeni qərar | Nüvə ilə əlaqə | Xərc və prioritet |
|---|---|---|---|
| Rol mübadiləsi | Gücü kimə, harada ötürüm? | Görüş və asimmetriya | Orta; əsas sınaq |
| Canlı əyləc | Harada dayana bilərəm? | Bloklar birbaşa lazımdır | Orta; ilk genişlənmə |
| Duruşla yük bölgüsü | Hansı vəziyyətdə keçim? | Sabit ölçüdən yeni nəticə | Aşağı/orta; sonrakı fəsil |
| Qarşılıqlı körpü | İndi açsam sonra çıxa bilərəmmi? | Hərəkətsizlik qərardır | Aşağı; nüvədə |
| Keçirici üz | Hansı üz aşağı baxmalıdır? | Orientasiya dərinləşir | Orta/yüksək |
| Məhdud enerji | Resursu hansı keçidə ayırım? | Dəyişən rolların alternativi | Orta; ayrıca modul |
| İki qat və dik lift | Hansı bədən hansı qatda lazımdır? | Məkan və duruş | Yüksək; sonra |
| Blokdan dayaq | Bədən nə vaxt yol olur? | Fiziki əməkdaşlıq | Yüksək; yeni dayaq qaydası |
| Qeyd edilmiş əks-səda | Əvvəlki əmrlər necə uyğunlaşsın? | Ardıcıllıq və zaman planı | Yüksək; ayrıca rejim |
| Topoloji tikiş | Başqa kənardan hansı vəziyyətdə çıxım? | Yeni məkan əlaqəsi | Yüksək; eksperiment |
| Qayda laboratoriyası | Bir qayda dəyişəndə nə dəyişir? | Sistemi anlama | Orta/yüksək; əlavə məzmun |
| Güzgülü cüt komanda | Bir əmrlə ikisini necə yönəldim? | Məhdud girişdən koordinasiya | Orta; ayrıca ailə |

Enerji nişanları üçün üç vahid ümumi resurs, iki vahid istəyən körpü və bir vahid istəyən qapı nümunəsi düşünmək olar. Nişanların ötürülməsi yalnız xüsusi meydançada baş versə yenə görüş problemi yaranar. Keçirici üz variantında mis zolaqlı üz yerə baxanda iki kontaktı birləşdirər. Bunlar rol mübadiləsinə paralel alternativlərdir; hamısını eyni səviyyəyə yığmaq yoxlanacaq fikri itirər.

Topoloji tikişdə 1×2 blokun sərhədi keçən iki yarısının xəritələnməsi ayrıca müəyyən edilməlidir; tək hüceyrəni teleport etmək cismin bütövlüyünü pozar. Əks-sədada “gözlə”, qanunsuz təkrar əmri və geri alma növbəsi aydın olmalıdır. Blokdan dayaq yaratmaqda isə altdakı cismin tərpənməsi yuxarıdakını necə təsirləndirir sualı cavab istəyir. Buna görə bu ideyalar hazır funksiya siyahısı deyil, araşdırma bankıdır.

## 4. On iki səviyyə nüvənin nə qədər fikir yaratdığını yoxlasın

100 səviyyə hazırda məzmun hipotezidir. Əvvəl sistemin fərqli dərk anları yaratdığını görmək lazımdır. Patrick’s Parabox-un rəsmi səhifəsində hər puzzle-da ayrıca ideya və doldurucu məzmunun olmaması müəllif məqsədi kimi verilir; bu bizə keyfiyyət istiqamətidir. ([Rəsmi səhifə](https://www.patricksparabox.com/))

| Səviyyə | Tək əsas yeni fikir | Yoxlanılan anlama |
|---|---|---|
| 1 | Geniş meydanda tək blok | Dik və uzanmış iz fərqlənir |
| 2 | Dar keçid və çıxış duruşu | Yaxınlıq düzgün orientasiya deyil |
| 3 | İkinci bloka keçid | İdarə dəyişir, dünya qalır |
| 4 | Passiv blokun saxladığı körpü | Yerində qalmaq faydalıdır |
| 5 | Ağır və dik düymə | Cari rol və duruş önəmlidir |
| 6 | Yüngül keçid | Güc həmişə üstünlük deyil |
| 7 | Təhlükəsiz cüt mübadilə plitəsi | Rol bədənə bağlı deyil |
| 8 | Düzgün tərəfdən dik görüş | Görüşün həndəsəsi planlanır |
| 9 | Çıxışa tez getməyin maneəsi | Partnyora gələcək yol saxlanır |
| 10 | İki görüş yerindən seçim | Ən yaxın görüş ən yaxşısı deyil |
| 11 | Əvvəl ağırın yüngül yoldan qayıtması | Eyni yer yeni rolda yeni məna alır |
| 12 | Yeni qaydasız yekun | Əvvəlki münasibətlər birləşir |

Buz bu xəttə qəsdən daxil edilmir; rol mübadiləsinin özü qiymətləndirilir. Saylar müqavilə deyil: iki ideya bir səviyyəyə sığmırsa bölünür, təkrar varsa silinir. Oyunçu yeddincini təsadüfən həll edə bilər; səkkizinci və onuncuda eyni prinsipi başqa məkanda özü tətbiq etməlidir. Jonathan Blow-un sınağı dizayn fərziyyələrinin reallıqla uyğunluğunu yoxlamaq kimi təsviri burada faydalı iş prinsipidir. ([NYU müsahibəsi](https://gamecenter.nyu.edu/game-designers-in-detail-jonathan-blow/))

### Üç konsept tapmaca — koordinat və həll yolu təsdiqlənməyib

**Çıxışdan əvvəl görüş.** A ağırdır, onun çıxışı yaxındır. B yüngüldür, son qapının sensoru üçün ağır rol lazımdır. Mübadilə meydanı A-nın çıxışından əks tərəfdədir. A əvvəl məqsəddən uzaqlaşmalı, B ilə dik görüşməli, rolları dəyişməli və yüngül yoldan qayıtmalıdır. Əsas dərk məqsədə monoton yaxınlaşmanın səhv olmasıdır. Alternativ görüş və sensordan yan keçmə yoxlanmalıdır; sensor buraxılanda son keçidin açıq qalması xəritədə ayrıca həll edilməlidir.

**Köməyi geri qaytar.** A ağır düymədə qalaraq B-ni yan platformaya keçirir. B orada A üçün alternativ çıxış yolunu saxlayan sensora çatır. A təhlükəsiz görüş sahəsinə gəlir, B qoşulur, rollar dəyişir. İndi A yüngül keçiddən gedib B üçün yol açır. Dərk: əvvəl kömək alan sonradan kömək edir. Görüş yolları və körpülər səhv qurulsa kilidlənmə yaranar; bu mətn həllolunma sübutu deyil. Daimi qıfıl lazım olsa əlavə qayda kimi ayrıca öyrədilməlidir.

**Dayanacağın özü alətdir.** Sonrakı buz modulunda B uzun zolaqda sürüşür, sonunda boşluq var. A uyğun yerdə dayanıb sərhəd yaradır. B A-nı itələmədən əvvəlki tam yerləşmədə dayanır, yan normal zəminə yuvarlanır və A-nın çıxışını açır. Duruş dayanma nöqtəsini dəyişir. A-nın oraya gəlişi, B-nin yan çıxışı və hər iki çıxışa son yol konkret grid-də yoxlanmalıdır.

### Deterministik növbə və geri alma

Təklif olunan sıra: əmr qəbul edilir, əvvəlki tam vəziyyət saxlanır; namizəd aşma hesablanır; divar, blok və rol qadağası varsa rədd edilir; qanuni hərəkət tətbiq olunur; məcburi sürüşmə həll edilir; bütün blokların sabit yerlərində sensorlar hesablanır; körpülər yenilənir; hamının dayağı və təhlükəsi yoxlanır; sonra qələbə yoxlanır. Dəstəksiz yerə aşmaq məğlubiyyət, dolu yerə aşmaq rədd yaradır; fərq önbaxışda görünməlidir. İlkin sensorlar birbaşa körpülərə bağlansın, dövrəli məntiq olmasın. Passiv blokun altındakı körpü yox olarsa o da düşür.

Buz üçün vahid seçim: blok bir gedişi **tam buz üstündə** bitirirsə son istiqamətdə, duruşunu dəyişmədən hüceyrə-hüceyrə sürüşür. Növbəti yerləşmə divar/başqa blokla kəsişirsə dayanır; dəstəksizdirsə düşür; ilk tam dəstəklənən, bütövlükdə buz olmayan yerdə dayanır. Yarım buz/yarım daş əyləcdir. Sensor yalnız son dayanacaqda işləyir. Bu translasiya qaydasıdır; təkrar avtomatik aşma başqa qayda olardı.

Bir əmr və avtomatik nəticələri bir undo ilə geri qaytarılmalıdır. Rol, qıfıl, səth, çıxış və sayğac da qaytarılır. Seçim dəyişməsi və rədd edilən əmr gediş sayılmasın; uğurlu aşma və mübadilə sayılsın. Sonsuz undo əsas kampaniyada qalsın. Beş xanalıq sürüşmə beş dəfə deyil bir dəfə geri alınsın. Animasiya sürəti nəticəni dəyişməsin. PuzzleScript sənədlərində tam növbəni ləğv etmə və saxlanmış vəziyyətə qayıtma konkret alət nümunəsidir; həmin alətlə yazmaq məcburiyyəti deyil. ([PuzzleScript qaydaları](https://www.puzzlescript.net/Documentation/rules.html))

Kiçik lövhədə vəziyyət qrafı üzrə bərabər əmr xərcli axtarış həllin mövcudluğunu və ən az əmr sayını yoxlaya bilər; fərqli xərcdə çəkili axtarış lazımdır. Həlledici gözəl puzzle sübut etmir. İnsan sınağı qərarın maraqlı, səbəbin aydın və icranın təkrarsız olub-olmadığını müəyyənləşdirir.

## 5. Rejimlər, görünüş və istehsal eyni fikrə xidmət etsin

### Əvvəl solo, sonra məqsədli kooperativ

İlk versiyanı vaxt təzyiqsiz solo seçərdim. Sonra minimum gediş və yerli co-op gəlir. Speedrun könüllü məqsəd olsun. Gündəlik tapmaca yalnız həll və keyfiyyət yoxlamasından sonra dəyərlidir; təsadüfi generasiya maraqlı ideyaya zəmanət vermir. Redaktor uzunömürlülük verə bilər, nüvəni sübut etmir.

| Rejim | Fərqli dəyər | Mərhələ |
|---|---|---|
| Solo kampaniya | Qaydanı öyrənmək və dərk etmək | İlk sınaq |
| Minimum gediş | Daha zərif həll | Sayım sabitləşəndə |
| Növbəli yerli co-op | Planı danışaraq bölüşmək | Solo nüvədən sonra |
| Planla və birlikdə icra et | İki əmrin qarşılıqlı nəticəsi | Ayrı konflikt qaydaları ilə |
| Qayda laboratoriyası | Bir dəyişiklikdən yeni nəticə | Əsas sistem tanış olanda |
| Gündəlik/redaktor | Yeni məzmun və paylaşım | Keyfiyyət alətləri olanda |

İlkin co-op-da hər kəs öz blokuna sahib olsun, əmrlər aydın növbə ilə həll edilsin. Eyni anda gələn girişlər gizli texniki yarışa çevrilməsin. Planla-icra et variantında hər kəs hərəkət və ya gözlə seçir. Burada eyni yerə girmək, yer dəyişmək və birinin qanunsuz əmri üçün ayrıca qayda lazımdır. Bunu sadəcə əlavə klaviatura kimi kampaniyaya yapışdırmaq olmaz. Portal 2-nin ayrıca co-op kampaniyası bu ayrımın real nümunəsidir. ([Valve](https://store.steampowered.com/app/620/Portal_2/))

### İzometriya oxunaqlılığı qorumalıdır

İstifadəçinin bucaq təsvirini GDD-yə əsasən 2.5D izometrik görünüş kimi qəbul edirəm; dəqiq dərəcə ilkin qərar deyil. Kiçik səviyyələr bütöv görünsün, TAB kameranı kəskin tərpətməsin. Seçilən blok kontur və nişanla göstərilsin. Böyük xəritədə yumşaq panoram və bütün lövhəni göstər əmri olsun. Kamera fırlanarsa istiqamət oxları uyğun göstərilsin; kamera özü mexaniki hadisə yaratmasın.

Futuristik-etnik istiqamət maraqlıdır: həndəsi naxışlar mübadilə plitələrini və sensor-körpü əlaqəsini göstərən dilə çevrilə bilər. Lakin vacib xanalarda duman və parıltı qaydanı örtməsin. Sabit kimlik üçün fərqli simvol, dəyişən rol üçün çəkic/lələk nişanı və tekstura istifadə edilsin. Bu estetik təklifdir, sınaq nəticəsi deyil.

Microsoft vacib informasiyanı yalnız rənglə daşımamağı tövsiyə edir. Ümumi əlçatanlıq təlimatı dəyişən idarə, interaktiv öyrətmə və dəqiq zamanlamaya alternativlər göstərir. Bizdə bu, istiqamət oxları, dəyişdirilən düymələr, könüllü yerləşmə proqnozu və böyük toxunma hədəfləridir. PC və mobil eyni məntiqi paylaşa bilər, eyni interfeys ayrıca yoxlanmalıdır. ([Xbox qaydası 103](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/103), [Game Accessibility Guidelines](https://gameaccessibilityguidelines.com/full-list/))

### Bazar və təqvim iddiaları ölçməyə bağlıdır

GDD-də bütün klonların yeniliksiz, nişin tam boş və iki subyektli 3D sintezin ilk olduğu iddiaları təsdiqlənmir. Death Squared rəngli hədəflərə blok robotları çatdıran solo/kooperativ puzzle-dır. Bu, Bloxorz aşma mexanikası ilə eyni olması demək deyil; geniş ilkinlik iddiasını müdafiəsiz qoyur. Bu araşdırma bütün oyunların və patentlərin tam inventarı deyil. ([SMG Studio](https://store.steampowered.com/app/471810/Death_Squared/))

Daha əsaslı mövqeləndirmə: **“İki aşan blokun duruşu və dəyişən ağır/yüngül rolları ilə qurulan qarşılıqlı məntiq oyunu.”** Bunu görünən davranışla yoxlamaq olur. Nostalji ilkin diqqət fərziyyəsidir; oynamağa davam səbəbi öz sistemimizdən gəlməlidir. Satış, qiymət və auditoriyanın üst-üstə düşməsi üçün ölçmə yoxdur. Komanda, büdcə və bacarıq məlum olmadan dekabr 2026–yanvar 2027 planı etibarlı təqvim deyil.

Razılıq verilərsə əvvəl beş-səkkiz kiçik qayda sınağı, sonra seçilən nüvənin kombinasiyalarını təklif edirəm. **Ardıcıllıq: həndəsə və sabit rollar → cüt plitədə rol mübadiləsi → ayrıca canlı əyləc genişlənməsi.** Əyləc variantı kiçik alternativ sınaqda müqayisə edilə bilər, lakin əsas 12 səviyyəlik xətt mübadilə nüvəsidir. Saylar elmi uğur norması deyil, işçi hədəfdir.

| Fərziyyə | Müşahidə | Yenidən baxmağa səbəb |
|---|---|---|
| Aşma oxunaqlıdır | Növbəti iz düzgün təxmin edilir | Səhvlər idarə proyeksiyasındandır |
| Rol aydındır | Kimlik və güc ayrılır | Mübadilədən sonra qarışıqlıq qalır |
| Mübadilə dərinlik verir | Yeni xəritədə görüş planlanır | Məcburi düymə basmaq kimi qalır |
| İki blok lazımdır | Həll qarşılıqlı kömək tələb edir | Biri uzun müddət sərnişindir |
| Məğlubiyyət aydındır | Oyunçu səbəbi izah edir | Gizli hadisə hiss olunur |
| İcra qısadır | Dərk etdikdən sonra az təkrar var | Geri daşıma üstün gəlir |
| Co-op dəyər verir | İkisi də qərara qatılır | Biri diktə edir, digəri icra edir |

Mən layihənin gücünü **bir üstünlüyün iki bədən arasında bölüşdürülməsində** görürəm. Bu həm oynanışa, həm vizual dilə, həm də “gücün kimdə olduğundan çox nə vaxt kimə lazım olması” mövzusuna çevrilə bilər. İndiki qərar bütün ideyaları qəbul etmək deyil: əvvəl rol mübadiləsinin yaratdığı görüş və qarşılıqlı yol açma problemini sınamaq istəyirikmi? Müsbət qərardan sonra ilk iş geniş istehsal yox, bu fərziyyəni doğruldan və ya rədd edən kiçik puzzle dəsti olmalıdır.

## Mənbə reyestri və sərhədlər

Araşdırma 7 noyabr 2026-da yoxlanmış açıq mənbələrə və istifadəçinin GDD-sinə əsaslanır. Faktlar inline göstərilib. Developer məhsul təsvirləri müstəqil satış sübutu sayılmır. Konsept nümunələrinin həllolunması, təkliflərin dünyada ilkinliyi və kommersiya uğuru təsdiqlənməyib.

| Mənbə | İstifadə |
|---|---|
| [Bloxorz tədqiqatı](https://arxiv.org/abs/1411.5951) | Həndəsə və ümumiləşdirilmiş çətinlik |
| [Bloxorz təlimatı](https://www.coolmathgames.com/0-bloxorz) | Düymə, splitter, zəmin |
| [Atəş və Su](https://store.steampowered.com/app/5084260/Fireboy__Watergirl_1_The_Forest_Temple/) | Solo/co-op |
| [Atəş və Su təlimatı](https://www.coolmathgames.com/0-fireboy-and-water-girl-in-the-forest-temple) | Elementlər və seçim |
| [Sokoban tarixi](https://www.sokoban.jp/history.html) | Erkən nəşrlər |
| [Rush Hour](https://www.thinkfun.co.uk/en-GB/products/logic-games/rush-hour-76436) | Yol açma |
| [CIMT](https://www.cimt.org.uk/resources/puzzles/slideblk/sbint.htm) | Sliding-block məhdudiyyətləri |
| [Sliding-square araşdırması](https://arxiv.org/abs/1707.03146) | Formal vəziyyət düşüncəsi |
| [Stephen’s Sausage Roll](https://www.stephenssausageroll.com/about.html) | Cisim və yuvarlanma |
| [Patrick’s Parabox](https://www.patricksparabox.com/) | Rekursiya, səviyyə məqsədi |
| [Traynor müsahibəsi](https://www.gamedeveloper.com/design/patrick-s-parabox-) | Qayda seçimi |
| [Baba Is You](https://store.steampowered.com/app/736260/Baba_Is_You/) | Qaydanın dəyişməsi |
| [Snakebird](https://store.steampowered.com/app/357300/Snakebird/) | Forma və uzunluq |
| [Bonfire Peaks](https://store.steampowered.com/app/1147890/Bonfire_Peaks/) | Məkan, məzmun seçimi |
| [Portal 2](https://store.steampowered.com/app/620/Portal_2/) | Co-op kampaniya |
| [Monument Valley](https://ustwo.com/work/monument-valley/) | Escher, optik memarlıq |
| [Death Squared](https://store.steampowered.com/app/471810/Death_Squared/) | Yaxın müqayisə |
| [OpenStax təzyiq](https://openstax.org/books/university-physics-volume-1/pages/14-1-fluids-density-and-pressure) | Qüvvə/sahə |
| [OpenStax sürtünmə](https://openstax.org/books/university-physics-volume-1/pages/6-2-friction) | Kütlə və sürüşmə |
| [OpenStax statika](https://openstax.org/books/university-physics-volume-1/pages/12-1-conditions-for-static-equilibrium) | Tarazlıq |
| [OpenStax Kirchhoff](https://openstax.org/books/university-physics-volume-2/pages/10-3-kirchhoffs-rules) | Elektrik modelinin sərhədi |
| [NYU müsahibəsi](https://gamecenter.nyu.edu/game-designers-in-detail-jonathan-blow/) | Dizayn sınağı |
| [PuzzleScript](https://www.puzzlescript.net/Documentation/rules.html) | Diskret növbə və geri qayıtma |
| [Xbox 103](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/103) | Rəngdən əlavə informasiya |
| [Əlçatanlıq təlimatı](https://gameaccessibilityguidelines.com/full-list/) | İdarə və öyrətmə |
