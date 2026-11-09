export const families = {
  M1: [
    "Phantom Floor - saxta zəmin",
    "Sənin ideyan: təhlükəsiz görünən zəminə daxil olanda onun çökməsi və bloku itirməsi. Güclü sürpriz və marşrut yaddaşı yaradır, amma gizli məlumatla ilk ölüm planlama səhvi deyil. Orijinal rage variantı saxlanılır; əsas kampaniya üçün öyrənilən çat/işıq nişanı, önbaxış və tam undo tövsiyə olunur. Altı alt-element aşağıda bizim genişləndirməmizdir.",
  ],
  M2: [
    "Reversing Controls - dəyişən idarə xəritəsi",
    "Sənin ideyan: müəyyən zonalarda sağ/sol və yuxarı/aşağı idarəsinin tərsinə çevrilməsi. Təkcə refleks çaşdırırsa tez yorucu olar; başqa məkan qaydası ilə birləşəndə koordinat düşüncəsi yaradır. Dörd alt-element bizim təklifimizdir. İdarə transformu remap edilmiş gameplay niyyətinə yalnız bir dəfə tətbiq edilir; H, Z, TAB və menyu heç vaxt tərsinə çevrilmir.",
  ],
  M3: [
    "Dynamic Shrinking/Growing - dinamik ölçü",
    "Sənin ideyan: oyun zamanı 1×1 kubun böyüməsi və kiçilməsi, o cümlədən 2×2 forma. Bu ölçünü dekor yox, marşrut və sensor qərarına çevirir. Dəqiqləşdirmə: 2×2 yer izi 2×2×1 alçaq plitə və ya 2×2×2 böyük kub demək ola bilər; hər level bunu açıq seçməlidir. Aşağıdakı altı variant bizim dizayn genişləndirməmizdir. Kub↔domino sadə hazırlıq pilləsidir, sənin 2×2 fikrini əvəz etmir.",
  ],
  M4: [
    "Shadow Doppelganger - gecikən güzgü klonu",
    "Sənin orijinal ideyan: qırmızı kölgə hərəkətləri iki saniyə gecikmə ilə güzgülü təkrar edir; təmas ölümü və səviyyə resetini yaradır. Bu real-time təzyiq forması ayrıca Chaos/challenge seçimi kimi saxlanılır. Əsas məntiq kampaniyası üçün N qəbul edilmiş əmr gecikməsi və açıq WAIT alternativini təklif edirik; bu iki saniyənin gizlicə əvəzlənməsi deyil. Beş alt-element bizimdir. Queue, təmas, sönmə və undo birlikdə dəqiq müəyyən edilməlidir.",
  ],
  M5: [
    "Moving/Squeezing Walls - dəyişən divarlar",
    "Sənin ideyan: timer-lə hərəkət edən, sahəni daraldan və bloku sıxan divarlar. Bu, məkana zaman məhdudiyyəti əlavə edir. Növbəli variant düşünməni yox, gediş seçimini; saniyəlik variant icra sürətini sınağa çəkir. Aşağıdakı beş alt-element bizim analitik bölgümüzdür. Kampaniyada görünən faza və sərbəst düşünmə, real-time challenge-da sabit simulyasiya saatı və pause siyasəti seçilir.",
  ],
  M6: [
    "Fake Goal - teleport edən saxta final",
    "Sənin ideyan: çıxışa bənzəyən hədəfə çatanda qələbə əvəzinə teleport tələsi işləməsi. Optional Chaos-da gözlənti pozuntusu saxlanılır; əsas kampaniyada əvvəldən etibarlı olduğu öyrədilən bütün çıxışlar sonradan əsassız tələyə çevrilmir. Dörd alt-element bizimdir. Kampaniya variantı teleportu faydalı yol qərarına çevirə bilər; yeni saxta nişan ayrı öyrədilir, öyrənilmiş yer yaddaşda qalır.",
  ],
  N1: [
    "Üz yaddaşı və kontaktlar",
    "Bu ailə bütövlükdə bizim əlavə təklifimizdir. Yer və U/X/Z izi ilə yanaşı hansı fiziki üzün aşağı və ya yana baxdığı izlənir. Tam etiketli sərt cismin 6 üst üz × 4 dönmə = 24 orientasiyası öz həndəsi sayımımızdır, hazır engine dəstəyi deyil. Gizli alt üz əzbərlətmək əvəzinə HUD və önbaxış göstərilir; resize zamanı üz işarələri qorunur.",
  ],
  N2: [
    "Qorunan enerji ehtiyatı",
    "Bu ailə bizimdir: ümumi enerji nişanları itmir və sərbəst yaranmır, bloklar və terminallar arasında bölüşdürülür. Qorunma ideyasından ilhamlanır, real gərginlik/cərəyan simulyasiyası deyil. Bir görüşdən sonra hansı blokun hansı resursla hansı tərəfdə qalacağı əsas qərardır. Mövcud E rol mübadiləsi ilə eyni əmri gizli paylaşmayan ayrıca idarə göstərilir.",
  ],
  N3: [
    "Məkan tikişləri və topoloji bağlantılar",
    "Bu ailə bizim əlavə təklifimizdir. M6-dan fərqli olaraq təyinatı açıq olan bağlantını planlaşdırır, aldatmır. Məkan qrafının kənarları dəyişir; qeyri-Evklid fizika iddiası yoxdur. Bir keçid bir əmrdir; portalda avtomatik sonsuz ping-pong yoxdur. Dolu və dəstəksiz çıxış bütün giriş əmrinə mane olur, təsadüfi fallback axtarılmır.",
  ],
  N4: [
    "Nisbi rezonans və bağlar",
    "Bu ailə bizimdir. Açılma şərti sabit düymədən çox iki cismin nisbi sətir, məsafə və orientasiyasıdır. Maqnit/ip estetikası verilə bilər, amma gizli real qüvvə yoxdur. Kub və domino fərqləri şərtdə açıq yazılır. İlk sınaq üçün N4.1 münasibdir; cüt addım N4.4 ayrıca eyni anda niyyət qaydası tələb edir.",
  ],
};
export const catalog = {
  "M1.1": {
    title: "Ani illüziya",
    body: "Qayda: görünən saxta xana support hesabında real deyil; qəbul edilmiş hərəkətin və hər buz alt-addımının footprint-i yoxlananda bir hissə də buraya düşərsə ölüm. Kub bir xanadan, domino iki xananın hər hansı birindən zərər görür; domino boşluğu körpü kimi keçmir. Konsept: təhlükəsiz qısa yol kimi görünən zolaq yan dolanmanı tələb edir. Öyrətmə: rage-də əvvəlcədən ümumi “zəmin aldadır” xəbərdarlığı və qısa respawn; kampaniyada saxta xananın kənar parıldaması və H ilə həqiqi dayağın göstərilməsi. Çətinlik aşağı məntiq/yüksək sürpriz, xərc aşağı. Undo ölümdən əvvəlki yerə; H açılanda gizlini açacağını bildirsin. Gizli xananı ilk dəfə bilməmək səhv planlama adlandırılmasın.",
  },
  "M1.2": {
    title: "Arxanca qırılan yol",
    body: "Qayda: real dayaq olan plitə onun üzərindən bütün blok footprint-ləri çıxan ilk qəbul edilmiş gedişin sonunda daimi yox olur. Domino iki xanadan yalnız birini boşaldıbsa həmin xana ayrıca boşalmış sayılır; digər blok hələ oradadırsa çökmür. Konsept: A keçdikdən sonra B-nin yolu bağlanacağından əvvəl ikincinin yerləşməsi planlanır. İşarə biristifadəlik körpü tikişi, önbaxışda boşaldılacaq xanalar. Çətinlik orta, xərc orta: sınıq xanalara vəziyyət yaddaşı lazımdır. Buz aralıq izləri də tərk edilən yol sayılır. Z bütün çökmələri qaytarır; H broken set ilə işləyir, lazım olsa əvvəlki gedişə qaytarsın.",
  },
  "M1.3": {
    title: "Yük həddində çökən qabıq",
    body: "Qayda: hər sabit yerləşmə və buz alt-addımında hüceyrə yükü hesablanır; təklif olunan oyun vahidləri ağır=2, yüngül=1, uzanmış domino iki xanaya bərabər bölür. Hədd=1 seçiləndə ağır kub/dik domino çökdürür, ağır uzanmış domino həddi keçmir. Bu real material simulyasiyası deyil. Konsept: körpüyə yüngül rolda və ya uzun bloku uzadaraq giriş. Nişan yük vahidini və təhlükəli nəticəni göstərir; dərs dik/uzanmış fərqini yanaşı canlandırır. Çətinlik orta, xərc orta. H rol+ölçü+duruşu hesablayır; Z qırılma və ölümü qaytarır. Kubun uzanma alternativi olmadığı üçün rol yolu da olmalıdır.",
  },
  "M1.4": {
    title: "Relay-in həqiqətə çevirdiyi zəmin",
    body: "Qayda: saxta qrup yalnız ayrıca görünən sensor basılı ikən real dayaqdır; sensor hər gedişin sonunda yenidən hesablanır. Hərəkətə əvvəlki sabit dayaqlarla başlanır, sonra sensor/körpü yenilənir və bütün bloklar təkrar yoxlanır. Kub bir, domino bütün iki xanasını real etməlidir. Konsept: A görünməz kimi işarəli yol qrupunu saxlayır, B qarşı tərəfdən alternativ sensorla onu təhvil alır. Ön cue: xəttlə bağlı sensor və holografik grid. Çətinlik orta, xərc aşağı/orta; mövcud bridge məntiqinə bənzəsə də illüziya vizualı ayrı öyrədilir. Z sensor və dayağı birgə qaytarır; H passiv blokun düşməsini də proqnozlaşdırır.",
  },
  "M1.5": {
    title: "Partnyorun müşahidə dairəsi",
    body: "Qayda: ikinci blokun anchor hüceyrəsindən Manhattan məsafəsi ≤2 olan phantom xanalar realdır; hər iki blok üçün müşahidəçi yalnız digər blokdur. Domino bütün footprint-i dairəyə sığmalıdır; uzun bədən dairəni özündən böyütmür. Birbloklu səviyyədə tətbiq edilməsin. Konsept: B irəliləmək üçün A-nı yan dəhliz boyunca müşayiət etdirir. Dünya növbə sonu yenilənir, yeni dayaqlar sonra hamıda yoxlanır. Cue hər müşahidəçinin aydın sərhəd konturu, təhlükəli footprint rəngi. Çətinlik yüksək, xərc orta/yüksək; qarşılıqlı dairə və geri dönüş çətinləşir. Z hərəkətlə birlikdə dayağı qaytarır; H hər iki mövqeyi hesablayır. Görünüş kamerasının istiqaməti trigger deyil.",
  },
  "M1.6": {
    title: "Ziyarət büdcəli plitə",
    body: "Qayda: hər xana c=2 giriş haqqı ilə başlayır; footprint həmin xanaya əvvəlki alt-addımda yox ikən daxil olduqda 1 azalır. c=0 olan xanada hazırda duran blok çıxana qədər dayaq qalır, sonrakı yenidən giriş ölüm yaradır. Yerində qalan blok və TAB haqq yemir; domino hər yeni footprint xanasını ayrıca xərcləyir, buz alt-addımı da girişdir. Konsept: kub qısa yolu iki dəfə istifadə edə bilər, domino yan yuvarlanması əlavə xanalara xərclənir; geriyə lazım olan keçid saxlanır. Cue iki aşınma nişanı və next-step sayğacı. Çətinlik yüksək, xərc orta; sadəcə timer variantı deyil, marşrut resursudur. Z sayğacları qaytarır; H counters daxil tam state tələb edir, həll yoxdursa undo təklif edir.",
  },
  "M2.1": {
    title: "180° inversiya zonası",
    body: "Qayda: remap edilmiş kardinal niyyət (dx,dz) zonada (-dx,-dz)-yə çevrilir; zonaya giriş həmin gedişdən sonra növbəti əmrə təsir edir. Kub anchoru, domino isə bütün footprint-i zonada olanda transform aktivdir; yarım giriş normaldır. Konsept: kənarı dar sahədə çıxışa düzgün yuvarlanma. Cue transformlu canlı oxlar və girişdən əvvəl sərhəd. Çətinlik aşağı/orta, xərc aşağı. Z inputu deyil dünya vəziyyətini qaytarır; H “sağ bas, blok sola gedəcək” deyir. Rage-də qəfil ilk dəyişmə mümkündür, ayrıca rejim seçimi ilə; normal kampaniyada xəbərdarlıq verilsin.",
  },
  "M2.2": {
    title: "90° koordinat rotoru",
    body: "Qayda: zona tam örtüləndə (dx,dz)→(-dz,dx); kamera fırlanmır. Kub və domino eyni transformu alır, domino roll-u transformdan SONRA hesablanır. Konsept: L dəhlizdə “yuxarı” basmaqla sağa aşan dominonun çıxış duruşunu planlamaq. Cue dördtərəfli kompas və növbəti footprint; təhlükəsiz geniş meydanda animasiyalı dərs. Çətinlik orta, xərc aşağı/orta. Undo tam bərpa; H düymə və dünya oxunu ayrı göstərir. Rotasiya ilə vizual kamera rotasiyası eyni vaxtda tətbiq edilməsin.",
  },
  "M2.3": {
    title: "Sərhəddən keçəndə yadda qalan polarite",
    body: "Qayda: əvvəlki tam footprint zonadan kənar, son tam footprint zona daxilində olanda həmin blokun polarity biti çevrilir; çıxanda dəyişmir, sonra yenidən tam girişdə çevrilir. Aralıq yarım footprint trigger deyil; sürüşmədə hər alt-addım tam giriş yarada bilər. Kub daha tez trigger alır, domino giriş üçün iki xanaya yer istəyir. Konsept: çıxışdan əvvəl rotora girib çıxmaqla blokun gələcək idarəsini hazırlamaq. Cue blok üstündə normal/tərs kompas və sərhəddə çevrilmə önbaxışı. Çətinlik yüksək, xərc orta: tarix bitini stateKey/undo/H saxlayır. Sonsuz buz çevrilmə döngəsi təkrar vəziyyət kimi tanınmalıdır. Bu sadə zona variantından fərqli yaddaş tapmacasıdır.",
  },
  "M2.4": {
    title: "İki blok üçün fərqli dünya xəritəsi",
    body: "Qayda: xüsusi sensor aktiv ikən A-nın yalnız x əmri, B-nin yalnız z əmri çevrilir; aktiv blokdan asılı gizli dəyişiklik yoxdur, sensor hər son vəziyyətdə hesablanır. Kub/domino fərqi hərəkət həndəsəsində qalır, ölçüyə görə əlavə istisna yoxdur. Konsept: A sensoru saxlayıb B-ni çıxarır, sonra B sensoru təhvil alır və A başqa transformda geriyə dönür. Cue hər kartda öz ox xəritəsi. Çətinlik orta/yüksək, xərc orta; sadəcə rəng fərqi deyil, iki müxtəlif xətti transformdur. Z sensoru və mövqeləri bərpa edir; H konkret blokun input-to-world xəritəsini göstərir. Controller və ekran düymələri eyni qaydanı izləyir.",
  },
  "M6.1": {
    title: "Sabit ünvanlı saxta çıxış",
    body: "Qayda: uyğun blok saxta çıxışda U vəziyyətində anchor ilə dayandıqda teleport olur; real qələbə yoxlanmasından ƏVVƏL. Məqsəd koordinatı sabitdir, orientation və rol dəyişmir; kub U qalır, domino iki hüceyrəli uzanmış təmasla aktivləşmir. Destination dolu və ya dəstəksizdirsə giriş əmri bütöv rədd edilir, dünya saatı irəliləmir; bu fərq önbaxışda göstərilir. Konsept: rage-də “çatdım” sürprizi; kampaniyada həmin portal uzaq sensor arxasına yol verir. İlk açılışdan sonra saxta nişan davamlı tanınır; H həqiqi endpoint göstərir. Çətinlik aşağı/orta, xərc orta. Teleport zənciri bu variantda yoxdur; Z girişdən əvvəlki tam vəziyyətə qaytarır.",
  },
  "M6.2": {
    title: "Dövrəli ünvanlı çıxış şəbəkəsi",
    body: "Qayda: eyni nişanlı saxta qapı her aktivləşəndə sabit [P,Q,R] siyahısının növbəti ünvanına ötürür; indeks qlobal və görünəndir. U/anchor trigger, duruş və ölçü saxlanır; tam destination footprint validasiya edilir. Konsept: kub birinci marşrutu götürür, ikinci aktivləşmə dominonu başqa tərəfə göndərir; növbəti dönüş üçün indeks hazırlanır. Cue qapı üstündə növbəti ünvan simvolu və xətt. Çətinlik yüksək, xərc orta/yüksək; RNG deyil. R indeks=0, Z indeks daxil hamısını qaytarır; H şəbəkə indeksini state-də saxlayır və bir gedişdə yalnız bir teleport işləyir.",
  },
  "M6.3": {
    title: "Partnyor hazır deyilsə aldadan çıxış",
    body: "Qayda: qapı U girişində başqa blokun xüsusi “icazə” sensorunda olub-olmadığını yoxlayır; sensor aktivdirsə qapı həqiqi exit flag verir, deyilsə sabit geri platformasına teleport edir. İlk həqiqi flag bloku udmur; sensor sonradan buraxılsa flag silinir. Kub bir xana ilə, domino yalnız dik işləyir. Konsept: çıxışa tələsmək əvəzinə iki blokun final yerləşməsini planlamaq. Cue qapıda kilid və sensor əlaqəsi; rage-də niyyətli sürpriz, kampaniyada aydın status. Çətinlik orta, xərc orta/yüksək: goals yoxlaması genişlənir. Z flag/teleportu bərpa edir; H “A-nı hələ bitirmə” məntiqini izah edir. Həll üçün sensoru kimin saxlayacağı konkret xəritədə sübut edilməlidir. Teleport qərarı üçün icazə sensoru növbənin BAŞLANĞIC snapshot-undan götürülür; final flag son sensorlardan sonra yenilənir. Eyni növbədə yeni basılan sensor geri dönüb artıq verilmiş portal qərarını dəyişmir.",
  },
  "M6.4": {
    title: "Yol açan məcburi saxta final",
    body: "Qayda: ilk U girişi bloku sabit staging yerinə teleport edir və bir geri yol qıfılını birdəfəlik açır; qapı bundan sonra açıq portal nişanına çevrilir, real çıxış başqa yerdədir. Sonrakı giriş eyni staging yerinə ötürür, qıfıl artıq açıq qalır. Kub/domino U; destination footprint qaydası M6.1 kimi: dolu və ya dəstəksiz ünvan girişi bütöv rədd edir. Konsept: aldatma yalnız cəza deyil, ikinci blokun yolunu açan zəruri mərhələdir; sonra birlikdə əsl finala gedirlər. Cue reveal animasiyası və açılan körpü xətti, ilk dərsdə təhlükəsiz staging. Çətinlik orta, xərc orta; saxta məqsədin faydalı funksiyası var. Z qıfılı da bağlayır; H reveal bitinə və yeni yola əsaslanır. İrəliləyişi avtomatik disk checkpoint kimi saxlamır.",
  },
  "M3.1": {
    title: "Sıxılma meydançası",
    body: "**Qayda:** xüsusi meydançada dik 1×1×2 blok əmrlə 1×1×1 kuba çevrilir; aşağı kubun xanası lövbərdir. Hərəkətdən sonra öz-özünə yenidən uzanmır. **Məna/nümunə:** uzun blokun keçmədiyi dar dəhlizdən kub keçir, amma o tərəfdə uzanmaq üçün yer saxlanmalıdır. **İzahla öyrətmə:** əvvəl təhlükəsiz səhnədə uzun/kub ölçü konturları və “bir xana yer tutur” göstərilir. **Sinerji:** tərs idarə və hərəkətli divarlarla dar keçid planı. **Risk/xərc:** orta; kubu kiçiltməyin hər dəfə üstün seçim olmasına qarşı uzun forma üçün ayrıca fayda lazımdır.",
  },
  "M3.2": {
    title: "Dörd xanalıq plitə",
    body: "**Qayda:** 1 kub → 2×2×1 plitə; yalnız bütün dörd alt xana dəstəklənəndə böyüyür. Bu obyektin bir xanalıq boşluğu havada örtməsi baza qaydasına daxil deyil. Xüsusi yuvarlanmada ölçülər `(a,b,c)` kimi saxlanır; x istiqamətində aşma alt enlə hündürlüyü dəyişir. **Məna:** plitə eyni anda iki ayrı sensoru örtür, sonra dar çıxış üçün kiçilir. **Vizual dərs:** şəffaf 2×2 iz, yaşıl dörd dayaq, tavan varsa qırmızı həcm. **Sinerji:** iki sensorlu qapı və M5 sığınacağı. **Risk/xərc:** yüksək; yalnız mesh-i böyütmək kifayət deyil, ümumi prizma collision/roll lazımdır.",
  },
  "M3.3": {
    title: "Böyük kubun addımı",
    body: "**Qayda:** 1×1×1 ↔ 2×2×2 kub; böyük kub hər aşmada istiqamət üzrə 2 xana yer dəyişir, 2×2 iz və 2 hündürlük saxlayır. Lövbər küncü aydın işarələnir. **Məna:** böyük addım hədəf koordinatına çatmağı dəyişir; kiçilmə mövqeyi addım fazasını düzəltmək üçün istifadə olunur. Böyük kub birxanalıq boşluğun üstündən təhlükəsiz tullanmış sayılmır. **Dərs:** eyni xəttdə bir və iki xanlıq hədəf kölgəsi. **Sinerji:** M3.6 lövbər, M5 hərəkət büdcəsi. **Risk/xərc:** yüksək; hədəfin böyük cismi necə qəbul etdiyi müəyyən edilməli, adi birxanalıq çıxış yalnız kiçik kub qəbul etməlidir.",
  },
  "M3.4": {
    title: "Ölçüyə uyğun kilid",
    body: "**Qayda:** bir keçid maksimum en/hündürlük, başqa sensor isə konkret forma/duruş tələb edir; sensor “böyük” deyə heavy rolunu avtomatik qəbul etmir. **Məna:** kiçik halda daxilə gir, geniş otaqda böyük ol, ölçü sensorunu saxlayıb partnyorun yolunu aç. **Dərs:** qapıda en×hündürlük nişanı, sensorda forma silueti; rol işarəsi ayrıca. **Sinerji:** mövcud ağır/yüngül mübadilə ilə “ölçü ayrı, rol ayrı” tapmacası. **Risk/xərc:** orta; çoxsaylı xüsusi istisnalar oxunaqlılığı azaldar. Bir leveldə bir ölçü kilidi növü öyrədilsin.",
  },
  "M3.5": {
    title: "Məhdud transformasiya ehtiyatı",
    body: "**Qayda:** levelə, məsələn, iki uğurlu ölçü dəyişmə nişanı verilir; rədd edilmiş böyümə nişan xərcləmir. Undo nişanı qaytarır. Nişan real pul və ya reklamla alınmır. **Məna:** ən qısa yol yerinə transformasiyaların düzgün ardıcıllığı seçilir; dar yolu tez keçmək son ölçü dəyişməsini boş yerə xərcləyə bilər. **Dərs:** iki nişan və eyni nümunənin bir/sıfır qalıqla müqayisəsi. **Sinerji:** M4 kölgənin ölçüsü ayrıca dəyişmirsə asimmetriya. **Risk/xərc:** orta; resurs sadəcə təkrara məcbur etməsin, qalan ehtiyat daim görünməlidir. Kub/domino və ya seçilən 2×2 forma eyni açıq büdcəni paylaşır; H qalan ehtiyatı state-in hissəsi sayır və tükənmiş resursu yox sayan köhnə yol vermir.",
  },
  "M3.6": {
    title: "Seçilən böyümə lövbəri",
    body: "**Qayda:** genişlənmə meydançasında böyümədən əvvəl dörd künc istiqamətindən biri seçilir; seçim ayrıca növbə deyil, transformasiya əmrinə daxildir. Baza avtomatik +x,+z lövbərinin mürəkkəb uzantısıdır. **Məna:** eyni xananı saxlayıb gövdəni sağ və ya sol sensor cütünə yaymaq mümkündür. **Dərs:** dörd kontur, seçilən yalnız biri; hər birinin tutacağı xanalar göstərilir. **Sinerji:** M5 daralan otaqda təhlükəsiz böyümə və N1 kontakt orientasiyası. **Risk/xərc:** yüksək interfeys yükü; ilk ölçü dərslərində olmasın, sərbəst dəyişmə exploitinə çevrilməməsi üçün yalnız meydançada işləsin.",
  },
  "M4.1": {
    title: "Gecikmə növbəsi",
    body: "**Qayda:** level bir mənbə blok və N=3 kimi gecikmə seçir; növbə əvvəl N WAIT ilə doludur. Hər uğurlu qlobal gedişdə köhnə növbənin başı klon üçün götürülür, həmin gedişin mənbə əmri sona əlavə olunur. Mənbə əvəzinə partnyor oynanırsa WAIT yazılır. Rədd edilmiş komanda saatı irəli aparmır. **Məna:** təhlükəni yalnız məsafə ilə deyil, gələcək əmr sırası ilə idarə etmək. **Dərs:** ekranda “WAIT, →, ↑” növbəsi və icra olunacaq baş əmrin çərçivəsi. **Sinerji:** M5 növbəli divar. **Risk/xərc:** yüksək vəziyyət artımı; müxtəlif queue-lar eyni mövqedə müxtəlif gələcəkdir. Kub üçün növbə birxanalıq, domino üçün U/X/Z aşma əmrlərini daşıyır. H tam queue-nu görməli, Z növbə başı və sonunu əvvəlki vəziyyətə qaytarmalıdır.",
  },
  "M4.2": {
    title: "Açıq güzgü oxu",
    body: "**Qayda:** şaquli xəritə oxunda sol↔sağ, yuxarı/aşağı dəyişmir; üfüqi oxda bunun əksi. Level oxu sabitdir, kamera çevrilməsi onu dəyişmir. Mənbə əmri əvvəl tərs idarə effektindən keçirilir, sonra alınan DÜNYA istiqaməti güzgülənib klona verilir; fiziki klaviş ikinci dəfə yozulmur. **Məna:** “sağa basdım” deyil, “mənbə dünyada sola getdi, klon sağa gedəcək” düşüncəsi. **Dərs:** mənbə və klon oxları yanaşı, incə güzgü xətti. **Sinerji:** tərs idarə moduyla güclü, amma gec öyrədilməli kombinasiya. **Risk/xərc:** orta; hərəkət trayektoriyası teleport güzgüsü deyil, klon öz vəziyyətindən normal roll edir. Kub bir xana güzgülü addım atır, domino öz duruşundan aşır. H əvvəl dünya komandasını, sonra klonun güzgü nəticəsini göstərir; Z ikisini birlikdə qaytarır.",
  },
  "M4.3": {
    title: "WAIT və təhlükəsiz məsafə",
    body: "**Qayda:** ayrıca WAIT bir uğurlu qlobal gedişdir; mənbə yerində qalır, queue/divar irəliləyir. TAB, menyu, kamera və kömək WAIT deyil. **Məna:** bir gediş gözləmək klonun əvvəlki əmrlə uzaqlaşmasını təmin edə bilər; amma M5 büdcəsini sərf edir. **Dərs:** təhlükəsiz otaqda bir WAIT və queue-nun dəyişməsi; düymə açıq yazılır. **Sinerji:** dövri divar və elektrik fazası. **Risk/xərc:** orta; WAIT döngələrinin solver tərəfindən düzgün birləşdirilməsi vacibdir, yalnız koordinata görə visited işarəsi səhvdir. Kub və domino WAIT-də yerini/duruşunu saxlayır; dünya isə irəliləyir. H gözləməni açıq addım kimi təklif edə bilər, Z bütün faza və queue dəyişməsini ləğv edir.",
  },
  "M4.4": {
    title: "Klonun bədəni və maneə davranışı",
    body: "**Qayda:** klon ilkin forması və orientasiyası ilə başlayır; öz roll/slide qaydasından istifadə edir. Maneəyə gedən klon əmri həmin dəfə WAIT kimi xərclənir, queue-dan çıxır; sonradan təkrar sınanmır. Klon adi platformalarda hərəkət edir, aktorlarla fiziki itələşmir; qırmızı təmas təhlükədir. Ölçü hadisəsinin təkrarı ayrıca açılmayıbsa M3 əmri queue-ya WAIT yazır. **Məna:** klonu divarda saxlayaraq məsafə yaratmaq, sonra yanlış istiqamətdə azad etməmək. **Dərs:** qırmızı kontur maneəyə dəyib bir vuruş dayanır. **Sinerji:** M3-də mənbə kiçik, klon uzun qala bilər. **Risk/xərc:** yüksək; asimmetriya açıq göstərilməsə oyunçu bug sanacaq. Klon dəstəksiz yerə çatarsa həmin cəhdin qalan hissəsi üçün sönür; qəhrəmanlar buna görə ölmür, R ilə klon yenidən yaranır. Undo sönməni də qaytarır. Klonun forma və izi real blokla eyni həndəsə yoxlamasına tabedir. Baza queue yalnız güzgülənən dünya MOVE və WAIT saxlayır. Resize, transfer və teleportla nəticələnən bütün mənbə əmri WAIT yazır; teleport klona ayrıca köçürülmür. Mənbənin keçmiş footprint snapshot-u ilə klonun bədənini dəyişmək bu variantda yoxdur.",
  },
  "M4.5": {
    title: "Təmas və zaman variantı",
    body: "**Qayda:** final xanaların üst-üstə düşməsi, eyni atomik mərhələdə aktorların yerlərini dəyişib bir-birindən keçməsi və fırlanma zamanı həcm kəsişməsi təhlükə sayılır. Təmasda istifadəçinin nəzərdə tutduğu level reset icra olunur; kampaniya rahatlıq variantında əvvəl qısa “tutuldun” vəziyyəti və Undo verilir. İki saniyəlik variant sabit simulyasiya tick-i, timestamp-li queue, pause və countdown ilə ayrıca qayda profilidir. **Məna:** qabaqcadan yol ayırmaq; refleks variantında vaxt təzyiqi. **Dərs:** təhlükə konturu, gələcək klon yeri və reset qaydası əvvəldən. **Sinerji:** gizli yol modunda klonun görünürlüğünü gizlətmək çox ağır kombinasiya, yalnız ixtiyari. **Risk/xərc:** çox yüksək; real-time rejimdə hazır addımlı H optimal həll vədi verə bilməz. Kubda bir, uzanmış dominoda iki hüceyrə təması yoxlanır. Real-time H saatı dondurur, amma yenidən işə salınanda əvvəlki addım sertifikatı avtomatik etibarlı sayılmır.",
  },
  "M5.1": {
    title: "Növbə ilə daralma",
    body: "**Qayda:** hər K uğurlu gedişdən sonra göstərilən divar sərhədi bir xana irəliləyir; WAIT və exchange sayılır, rədd olunmuş addım sayılmır. Geri dönməyən divar son həddə dayanır. **Məna:** uzun yol təhlükəsiz görünsə də gələcək daralmaya çatmaya bilər. **Dərs:** “2 gediş sonra bu zolaq bağlanır” və döşəmədə zolaq; ilk nümunədə limitsiz undo. **Sinerji:** M3 böyük addım və kiçik dəhliz. **Risk/xərc:** orta/yüksək; bütün daralma parametrləri əvvəldən göstərilməlidir, gizli sürət artımı olmasın. Kubun bir, uzanmış dominonun iki xanası və bütöv həcmi təhlükəyə görə yoxlanır. Z divar fazası/sayğacını qaytarır; H cari fazanı görür və passiv bloku da təhlükədən kənar saxlamalıdır.",
  },
  "M5.2": {
    title: "Dövri piston",
    body: "**Qayda:** divar fazaları `[geri, xəbərdarlıq, irəli, xəbərdarlıq]`; hər uğurlu növbə bir fazadır. Xəbərdarlıq mövqeyi collision deyil. İrəli fazasında tutulan xana blokla kəsişərsə sıxılma olur. **Məna:** WAIT ilə pəncərəyə uyğunlaşmaq, partnyoru təhlükəsiz yerdə saxlamaq. **Dərs:** dörd fazalı ikon və növbəti mövqe konturu. **Sinerji:** M4 queue sinxronlaşdırması. **Risk/xərc:** yüksək; periodların ən kiçik ortaq bölünəni (ƏKOB) faza sayını artırır, bir leveldə çox müxtəlif period olmasın. Kubun bir, uzanmış dominonun iki xanası və bütöv həcmi təhlükəyə görə yoxlanır. Z divar fazası/sayğacını qaytarır; H cari fazanı görür və passiv bloku da təhlükədən kənar saxlamalıdır.",
  },
  "M5.3": {
    title: "Duruşa uyğun sığınacaq",
    body: "**Qayda:** döşəmədə qorunan ciblər var; yalnız gövdənin bütöv həcmi cibdədirsə divardan qorunur. Uzun blokun bir xanasının cibdə olması kifayət deyil. **Məna:** yaxın cibli düz yol yerinə əvvəl duruş dəyişib geri girmək. **Dərs:** bütün gövdə yaşıl olanda təhlükəsiz nişanı; qismən yerləşmə qırmızı. **Sinerji:** M3 kiçilmə; həcm anlayışını təbii öyrədir. **Risk/xərc:** orta; izometrik örtülmə üçün divar şəffaflaşması lazımdır, collision vizual şəffaflıqla yox olmur. Kiçik kub bir cibə sığa bilər, domino üçün bütün uzanmış iz tələb olunur. H yalnız son anchor-a deyil gövdəyə baxır; Z divar və duruşu birgə bərpa edir.",
  },
  "M5.4": {
    title: "Partnyor əyləci və idarə olunan divar",
    body: "**Qayda:** xüsusi sensor növbənin əvvəlində basılıdırsa həmin divar həmin növbə faza irəliləmir; sensoru bu növbədə basmaq növbəti növbədən saxlayır. Dayanma fazası və sonrakı bərpa qaldığı yerdəndir, sıfırdan deyil. **Məna:** bir blok divarı saxlayır, o biri keçir, sonra təhlükəsiz təhvil planlanır. **Dərs:** sensor-divar əlaqəsi və “gələn növbədən dayanır” nümunəsi. **Sinerji:** rol mübadiləsi və M4 clone sensoru baza variantda AKTİVLƏŞDİRMİR. **Risk/xərc:** orta; indiki körpü sensoru ilə fərqli gecikmə eyni ikonla göstərilməsin. Kubun bir, uzanmış dominonun iki xanası və bütöv həcmi təhlükəyə görə yoxlanır. Z divar fazası/sayğacını qaytarır; H cari fazanı görür və passiv bloku da təhlükədən kənar saxlamalıdır.",
  },
  "M5.5": {
    title: "Real vaxt sıxılması",
    body: "**Qayda:** ixtiyari challenge profilində divar hər T saniyə bir grid mərhələsi keçir; countdown məntiqi simulyasiya saatıdır, render FPS deyil. Pause, dərs, H sorğusu, menyu və fokus itməsi saatı dondurur; qayıdanda qısa geri sayım olur. Növbə versiyasının hesabı ilə qarışdırılmır. **Məna:** planı əvvəl qurub vaxtında icra etmək. **Dərs:** təhlükəsiz training və dəyişən sürət deyil, sabit görünən T. **Sinerji:** iki saniyəlik M4 ayrı advanced challenge-da. **Risk/xərc:** çox yüksək; məntiq oyununun refleks tələbini artırır, əsas kampaniyanın məcburi şərti olmasın. Kubun bir, uzanmış dominonun iki xanası və bütöv həcmi təhlükəyə görə yoxlanır. Z divar fazası/sayğacını qaytarır; H cari fazanı görür və passiv bloku da təhlükədən kənar saxlamalıdır.",
  },
  "N1.1": {
    title: "Aşağı üz açarı",
    body: "**Qayda:** bir üz nişanlıdır; uyğun sensor yalnız həmin üz aşağı və bütöv kontakt sensor üzərində olanda işləyir. **Qərar/nümunə:** qapıya qısa yol düzgün üz vermir; kiçik dövrə ilə həmin koordinata başqa üzlə qayıtmaq lazımdır. **Dərs:** iki fiziki addım, dəyişən üz diaqramı və aşağı kontaktın HUD ikonası; rəng tək siqnal deyil. **Sinerji:** M3 böyük kub eyni üzlə daha geniş sahəni örtür. **Risk/xərc:** orta/yüksək; görünməyən alt üz əzbərlətməsin, hover və proqnozla göstərilsin. Kubda bütün üzlər bərabər ölçüdədir; dominoda uzun/qısa üz kontaktı sensor sahəsinə uyğun gəlməlidir.",
  },
  "N1.2": {
    title: "Yan terminal cütü",
    body: "**Qayda:** divar terminalları ilə təmas yalnız uyğun nişanlı yan üz, eyni hündürlük və tam qonşuluqda baş verir; diaqonal toxunma işləmir. **Qərar:** sensoru basmaq üçün dik durmaqla yan terminalı qoşmaq üçün uzanmaq arasında seçim. **Nümunə:** bir blok terminalı bağlayır, digəri körpünü keçir, sonra birinci kontaktı dəyişir. **Dərs:** kontakt işıq xətti və “yan üz uyğun deyil” işarəsi. **Sinerji:** N4 nisbi düzülüş. **Risk/xərc:** yüksək; izometrik arxa kontaktlar kəsik görüntüdə göstərilsin. Baza variantında həqiqi elektrik cərəyanı yox, açıq ikili əlaqə qaydasıdır. Kub birxanalıq terminalda, domino isə uzun üzün və hündürlüyün həqiqi kontakt sahəsi ilə yoxlanır.",
  },
  "N1.3": {
    title: "İzolyasiya üzü",
    body: "**Qayda:** təhlükəli səth yalnız aşağıda qalxan işarəli üz olanda keçilir; gövdənin qalan üzü toxunanda ölüm. Bütün tutulan xanalar yoxlanır. **Qərar:** qorunan üzlə düz getmək mümkündür, amma növbəti çevrilmə üzünü dəyişir; təhlükəsiz platformada marşrut hazırlamaq lazımdır. **Dərs:** tək təhlükə xanası və dərhal undo, növbəti alt üz konturu. **Sinerji:** görünməyən yol üçün artıq görünən bədən qaydası; eyni anda gizli təhlükə ilə ilk dəfə öyrədilməsin. **Risk/xərc:** orta; real material simulyasiyası kimi təqdim edilməsin. Kubun bir alt üzü, dominonun iki xananı örtən bütöv alt üzü qorunmalıdır.",
  },
  "N1.4": {
    title: "Üz ardıcıllığı yaddaşı",
    body: "**Qayda:** üç dayanacaq sensoru aşağı üzü məsələn dairə→üçbucaq→xətt ardıcıllığında istəyir; yalnız həmin sensorlarda uğurlu yoxlama mərhələni irəlilədir. Səhv yoxlama mərhələni sıfırlayır, dünya ölümə getmir; undo mərhələni qaytarır. **Qərar:** hədəfə çatmaqla yanaşı orientasiya tarixçəsini planlamaq. **Dərs:** üç aydın ikon, hər mərhələnin aktiv işığı. **Sinerji:** M4 queue iki müxtəlif yaddaşı birləşdirir, yalnız advanced səviyyə. **Risk/xərc:** yüksək state artımı və yaddaş yükü; təkrar gediş yox, bir aydın orientasiya kəşfi tələb etsin. Kub və domino eyni ikon ardıcıllığını fərqli yuvarlanma dövrəsi ilə əldə edir.",
  },
  "N2.1": {
    title: "Toxunaraq enerji ötürmə",
    body: "**Qayda:** bloklar xüsusi transfer pad-da ortaq kənarla qonşudursa ayrıca Enerji ötürmə əmri bir vahidi seçilən blokdan digərinə keçirir; tutum aşılmır, ümumi enerji dəyişmir. Ötürmə bir növbədir. **Qərar:** qapıya enerji aparmaq üçün əvvəl blokları uyğun nöqtədə görüşdürmək. **Dərs:** A-da 2, B-də 0 → A-da 1, B-də 1, toplam sayğac sabit. **Sinerji:** M5 büdcəsi görüş yerinin dəyərini artırır. **Risk/xərc:** orta; mövcud rol exchange ilə düymə və termin fərqi göstərilsin. Kub və dominonun enerji tutumu ölçüyə görə avtomatik dəyişmir; lövbərli terminal və ya tam pad təması səviyyədə nişanlanır.",
  },
  "N2.2": {
    title: "Enerji saxlayan keçid",
    body: "**Qayda:** körpü iki nişan yatırılanadək bağlıdır; yatırılan nişan anbarda qalır. Geri çəkmə yalnız həmin terminalda əmrlə mümkündür; körpü dərhal bağlanır və dayaq yenidən yoxlanır. **Qərar:** enerjini hazır keçiddə qoymaq, yoxsa geri götürüb növbəti qapıya aparmaq. **Dərs:** blokdakı və anbardakı sayın toplamı, bağlı körpü preview. **Sinerji:** mövcud sensor təhvilinin resurslu variasiyası. **Risk/xərc:** orta/yüksək; sonsuz enerji spawn və itki olmasın; anbar state/undo hash-də saxlanmalıdır. Kub və dominonun enerji tutumu ölçüyə görə avtomatik dəyişmir; lövbərli terminal və ya tam pad təması səviyyədə nişanlanır.",
  },
  "N2.3": {
    title: "Bölüşdürmə kilidi",
    body: "**Qayda:** iki hədəf eyni sabit vəziyyətdə A-da məhz 1, B-də məhz 2 enerji tələb edir; toplam üçdür. Sayı aşmaq da uyğun deyil. **Qərar:** “daha çox həmişə yaxşıdır” deyil, düzgün paylanma və marşrut. **Nümunə:** bir sensoru keçmək üçün A müvəqqəti 2 alır, sonra çıxışdan əvvəl birini B-yə qaytarır. **Dərs:** çıxışda 1/2 ikon və cari sayla müqayisə. **Sinerji:** M3 ölçü ilə enerji tutumu baza qaydasında əlaqəsizdir. **Risk/xərc:** aşağı/orta; arifmetika məkan qərarını əvəz etməsin. Kub və dominonun enerji tutumu ölçüyə görə avtomatik dəyişmir; lövbərli terminal və ya tam pad təması səviyyədə nişanlanır.",
  },
  "N2.4": {
    title: "Qapalı dövriyyə açarı",
    body: "**Qayda:** tək battery nişanı A terminalından götürüləndə qapı A bağlanır, B terminalına qoyulanda qapı B açılır; iki terminal eyni resursu paylaşır, eyni vaxtda ikisi açıq ola bilməz. **Qərar:** partnyor qapı A-nın hansı tərəfində dayanmalıdır ki, dəyişiklikdən sonra ilişməsin? **Dərs:** iki qapılı təhlükəsiz otaqda resurs xətti; ikisinin birgə açılmaması göstərilir. **Sinerji:** M4 təhlükəni başqa dəhlizə yönləndirmək. **Risk/xərc:** orta; sırf bir açarlı rəng qapısı təkrarına çevrilməməsi üçün iki blokun yerinin səbəb olduğu qərar vacibdir. Kub və dominonun enerji tutumu ölçüyə görə avtomatik dəyişmir; lövbərli terminal və ya tam pad təması səviyyədə nişanlanır.",
  },
  "N3.1": {
    title: "Cüt tikiş qapısı",
    body: "**Qayda:** aktor sabit vəziyyətdə qapı meydançasına tam yerləşdikdən sonra ayrıca ENTER əmri ilə göstərilən cüt meydançaya eyni duruş/orientasiya ilə keçir. Çıxışda bütün həcm və dayaq yoxlanır; yer doludursa əmr rədd edilir. **Qərar:** partnyoru çıxış ağzından çıxarmadan ötürmə mümkün deyil. **Dərs:** iki meydançanın eyni işarəsi, çıxış gövdəsinin canlı konturu. **Sinerji:** M3 böyük gövdənin qapıya sığması. **Risk/xərc:** orta; avtomatik sonsuz portal ping-pong olmur, bir ENTER bir keçiddir.",
  },
  "N3.2": {
    title: "Dönən tikiş",
    body: "**Qayda:** qapı yerli koordinat sistemini leveldə yazılan 90° bucaqla döndərir; gövdənin istiqaməti və bütün üz işarələri də eyni çevrilmə ilə yenilənir. Həndəsi forma dəyişmir. **Qərar:** uzaqlaşmaq üçün yox, çıxışda düzgün uzanma və kontakt üzü almaq üçün qapıdan keçmək. **Dərs:** giriş-çıxış oxları və “90°” ikon; ilk səviyyədə yalnız bir dönüş. **Sinerji:** N1 kontakt puzzle. **Risk/xərc:** yüksək; mesh dönüb state dönməsə ciddi bug. Solver keçidi vahid edge kimi bilməlidir.",
  },
  "N3.3": {
    title: "Açıq sarınan sərhəd",
    body: "**Qayda:** ilk versiyada yalnız 1×1×1 kub üçün xəritənin işarəli sağ/sol kənarları bağlıdır; kənardan bir addım qarşı kənardakı uyğun xananı hədəfləyir. Gövdə eyni anda iki kənarı tutmur. Uzun və 2×2 cisimlər bu variantda qapı olmadan sərhədi keçə bilməz. **Qərar:** ən yaxın görünən yol həmişə ən qısa deyil; sərhəd dolayı çıxış verir. **Dərs:** bütöv lent çərçivəsi və hədəf oxu. **Sinerji:** M3 kublaşma. **Risk/xərc:** orta/yüksək; uzun blok üçün ayrıca tam seam geometry lazımdır, gizli yarım-teleport edilməsin.",
  },
  "N3.4": {
    title: "Dəyişən bağlantı seçicisi",
    body: "**Qayda:** A girişinin iki açıq etiketli çıxışı var; partnyorun sabit sensoru hansı çıxışa bağlandığını müəyyən edir. Keçid əmri başlanğıc snapshot-dakı bağlantını götürür; gediş ortasında istiqamət dəyişmir. **Qərar:** partnyor bir yolu açmaq üçün əvvəl hazır sensorunu tərk etməlidir; keçən blok geri dönüşü yenidən bağlaya bilər. **Dərs:** yalnız aktiv çıxışa çəkilən işıq xətti və növbəti landing preview. **Sinerji:** iki bloklu əməkdaşlıq, M5 təhlükəsiz çıxış seçimi. **Risk/xərc:** yüksək, gizli yol ilə birləşdirilsə həm bağlantı, həm zəmin görünməz olmasın.",
  },
  "N4.1": {
    title: "Eyni xətt rezonansı",
    body: "**Qayda:** hər iki blok dikdirsə, lövbərləri eyni sətir və ya sütunda və aralarında solid divar yoxdursa rezonans qapısı açılır. Aralıq maksimum məsafə ayrıca göstərilir; əgər limitsizdirsə limit ikonu qoyulmur. **Qərar:** blok hədəfə yaxınlaşarkən xəttdən çıxır və partnyorun keçidi bağlana bilər. **Dərs:** aralarında işıq şüası, divarın onu kəsməsi. **Sinerji:** M3 uzun formaya qayıdanda diklik itir. **Risk/xərc:** orta; şüa divarın arxasında gizli işləməsin, görmə xətti deterministik grid ray olsun. Kub həmişə dikdir; domino üçün U şərti real orientasiya məhdudiyyətidir.",
  },
  "N4.2": {
    title: "Sonlu məsafə bağı",
    body: "**Qayda:** blok lövbərlərinin Manhattan məsafəsi L-dən böyük ola bilməz. Qadağan addım rədd edilir, partnyoru dartmır və növbə sərf etmir. Formanın lövbəri dəyişməz; böyük gövdənin mərkəzi ilə ölçmək başqa, bu bazadan fərqli qaydadır. **Qərar:** əvvəl arxadakı bloku irəli gətirmək lazımdır; bir blokun sərbəst görünən yolu cütlüyü ayırır. **Dərs:** L və qalan məsafə, qırmızı proposed link. **Sinerji:** N3 portal yalnız çıxış məsafə şərtini ödəyirsə işləyir. **Risk/xərc:** orta; real ip kimi dolaşma/obstacle simulation yoxdur.",
  },
  "N4.3": {
    title: "Qarşılıqlı orientasiya kilidi",
    body: "**Qayda:** iki uzun blok uzanmış və biri X, biri Z istiqamətindədirsə qapı açıqdır; yerə/sensora bağlı deyil. Dik və ya paralel olduqda bağlanır. **Qərar:** keçən blok çevriləndə qapını bağlaya bilər; digər blokun orientasiyasını əvvəl hazırlamaq lazımdır. **Dərs:** paralel ×, perpendikulyar ✓ siluetləri, aktiv qapıya xətt. **Sinerji:** M4 klon baza cütlüyün üzvü sayılmır; əlavə üzv variantı ayrıca tədris tələb edər. **Risk/xərc:** aşağı/orta; həmişə ucqar küncdə blok saxlamaqla triviallaşmaması üçün trayektoriya daraldılmalıdır. Bu alt-element iki domino tələb edir; kubu səssizcə X/Z saymaq olmaz, kub səviyyəsində başqa dərs seçilir.",
  },
  "N4.4": {
    title: "Cüt addım bağlaması",
    body: "**Qayda:** xüsusi bağ rejimində seçilən blok üçün istiqamət əmri o biri bloka leveldə yazılan eyni və ya əks dünya istiqamətini verir; iki niyyət eyni snapshot-dan hesablanır. İkisindən biri fiziki maneəyə dəysə hər ikisi rədd edilir; dəstəksiz nəticə isə qəbul edilmiş təhlükəli gedişdir. **Qərar:** birinin böyük/uzun addımı o birinin yoluna uyğun gəlmir; rejimi aktivləşdirmədən əvvəl başlanğıc mövqeləri hazırlamaq. **Dərs:** iki hədəf konturu, qırmızı bir maneənin hər ikisini saxlaması. **Sinerji:** M3 müxtəlif ölçülər, M4 güzgü yalnız sonra. **Risk/xərc:** yüksək; eyni anda aktor yer dəyişmə və həcm kəsişmələri açıq qadağan edilməlidir.",
  },
};
