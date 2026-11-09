# Dual Grid üçün yetkin vizual istiqamət və ölçülü dizayn

## Referansın hansı hissəsi saxlanmalı, hansı hissəsi dəyişməlidir?

### Takeaway
Şəkli texniki oyun xəritəsi deyil, atmosfer və forma referansı kimi götürmək məqsədəuyğundur. Mənim təklifim “qədim dağıntıların üstünə neon” görünüşünü inkişaf etdirərək, vahid dizayn dilinə malik sürreal gələcək memarlığı qurmaqdır: kütləvi tünd daş, incə işlənmiş metal, daxildən işıqlanan keramika, monumental boşluqlar və məhdud siqnal rəngləri.

### Cited Findings
- İstifadəçinin təqdim etdiyi şəkil birbaşa vizual yoxlanılıb: bir neçə hündürlükdə platformalar, körpü və pilləkənlər, sallanan zəncirlər, uzaq neon şəhər, mərkəzi burulğanlar, narıncı və firuzəyi xətlər, qapılar və müxtəlif kiçik kublar görünür. Bu müşahidədir, oyunun reallaşdırılmış funksiyalarına dair sübut deyil. Referans: `C:/Users/User/AppData/Local/Temp/codex-clipboard-0a2323f9-2e2b-4d77-b98b-6cdbe6a4eba3.png`.
- Godot Camera3D sənədi ortografik proyeksiyada obyektin uzaqlaşdıqca ekranda kiçilmədiyini göstərir; kamera ölçüsünün en və ya hündürlük üzrə metr ilə ifadə olunduğunu izah edir. — [Camera3D](https://docs.godotengine.org/en/stable/classes/class_camera3d.html)

### Inferences
**Şəkildə işləyən tərəflər:** böyük boşluq hissi, hündürlük və miqyas, qədim materialla gələcək texnologiyasının kontrastı, isti-soyuq siqnalların ayrılması, platformaların mühəndislik quruluşu. Bunlar mənim bədii qiymətləndirməmdir.

**Oyuna birbaşa köçürüləndə problem yarada bilən hissələr:** dekorla funksional cismin sayı bir-birinə qarışır; kiçik kubların hansının idarə edilən blok, hansının dekor olduğu açıq deyil; zəncir, pilləkən, sütun və arxalar bəzi hüceyrələri örtür; bir neçə hündürlükdə gediş yolu var, amma 1×1×2 cismin pilləkəni hansı qayda ilə keçəcəyi göstərilmir. Mərkəzi burulğanlar güclü diqqət mərkəzidir, lakin onlar əsas mexanika deyilsə aktiv bloklardan diqqəti ala bilər. Bunlar şəkil əsasında oxunaqlılıq ehtimallarıdır, istifadəçi sınağı nəticəsi deyil.

**Peşəkar görünüş barədə şəxsi mövqeyim:** təkcə çoxlu detal və fotorealizm kifayət etmir. Materialların bir-birindən seçilməsi, ölçü sistemi, işığın məqsədi, kameranın sabitliyi və funksional obyektlərin asan tanınması nəticəni daha inandırıcı edər. Hər səthin eyni parlaq hamarlığı və həddindən artıq yumru künclər oyuncaq/plastik hissi yarada bilər; buna görə səth roughness-i, kiçik bevel, doğru metal/dielektrik ayrımı və nəzarətli mikrodetal lazımdır. Lakin bütün parlaq səthləri qadağan etmək də düzgün deyil: az sayda cilalanmış hissə kontrast və material zənginliyi yarada bilər.

**Üç alternativ art istiqaməti:**

1. **“Yaddaş observatoriyası” — əsas tövsiyəm.** Havada asılı qara bazalt bloklar, çox incə oksidləşmiş bürünc konstruksiya, sərt həndəsəli ağımtıl keramika siqnalları. Sürreal hiss ağırlığına zidd asılma, qeyri-mümkün boşluq və dəqiq simmetriyanın pozulmasından gəlir. Neon şəhər yerinə uzaqda sakit iri monolitlər. Bu istiqamət həm qədimlik, həm də gələcək hissini az vizual səs ilə birləşdirə bilər.
2. **“Faza arxivi”.** Tünd sənaye keramikası, titandan incə xətlər, laylı şüşə yalnız seçilən cihazlarda; işıq mənbələri səthin içinə basdırılıb. Referansdakı xarabalıqdan daha futuristik, lakin steril laboratoriya klişesindən yayınmaq üçün asimmetrik böyük formalar və boşluqda yavaş dəyişən kölgələr.
3. **“Səssiz mexaniki məbəd”.** Açıq mineral daş, qara karbon metal, isti mis siqnallar, günəş tutulmasına bənzər istiqamətli işıq. Mobil üçün bütün səhnəni həddən artıq qaranlıq etmədən dramatiklik yaratmaq baxımından ayrıca yoxlanmalı variantdır.

Hər istiqamətdə yerli etnik ornamentlər yalnız tədqiq olunmuş, mənalı detal kimi tətbiq edilməlidir; təsadüfi simvol qarışığı ilə “etnik” təsvir yaratmaq zəif kimlik verər. Bu araşdırma ayrıca ornament tarixi araşdırması aparmır.

### Gaps
- Şəkildən real metr ölçüsü, həqiqi mesh strukturu, işıq parametrləri və oynanıla bilən bağlantılar çıxarmaq mümkün deyil.
- Bu referansın müəlliflik və lisenziya statusu burada yoxlanmayıb. Konkret dizaynları eynilə kopyalamaq əvəzinə kompozisiya və material prinsipləri referans kimi istifadə oluna bilər.

## Dəqiq ölçülü dizayn hansı səviyyədə verilə bilər?

### Takeaway
Bəli: modul ölçüləri, kamera həndəsəsi, görünüş miqyası, mesh konturları, pivotlar, material parametrləri və çıxış formatları dəqiq verilə bilər. Bununla yanaşı AI konsept şəkli, parametrik texniki model və oyunun içində ölçülmüş final renderi ayrı məhsullardır.

### Cited Findings
- glTF 2.0 standartı metr əsaslı xətti ölçüləri, koordinat sistemi və materiallarda metallic–roughness modelini müəyyən edir. — [Khronos glTF 2.0 specification](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html)
- Godot Camera3D-də ortografik ölçünün qorunan aspekt oxuna görə tam en və ya hündürlük kimi ölçüldüyü sənədləşdirilir. — [Camera3D size və keep_aspect](https://docs.godotengine.org/en/stable/classes/class_camera3d.html)

### Inferences
**Təklif olunan başlanğıc ölçü kitabı — aşağıdakı ölçülər layihəyə verdiyim konkret dizayn qərarlarıdır, sənaye standartı və ya istifadəçi tərəfindən təsdiqlənmiş ölçülər deyil:**

| Element | Dəqiq məntiq / texniki həcm | Görünən model üçün təklif |
|---|---|---|
| Grid modulu | 1,000 × 1,000 m | Hər modulun kənarında 0,01–0,02 m vizual tikiş |
| Oyun bloku | 1,000 × 1,000 × 2,000 m | Həcm dəyişmədən künclərdən içəri 0,015 m bevel; 2–3 seqment |
| Zəmin | Üst dəstək müstəvisi y=0 | 0,25 m görünən qalınlıq, aşağı konstruksiya istəyə görə |
| Düymə | 1 hüceyrədə semantik trigger | Mərkəzdə 0,65 × 0,65 m çərçivə; səthdən 0,005–0,015 m hündürlük |
| Siqnal xətti | Collision yaratmır | 0,015–0,025 m enli səth içi zolaq, səthin kiçik hissəsində emissiya |
| Çıxış | 1 hüceyrəlik dik duruş şərti | 0,80 m vizual hədəf nişanı; qapı kimi tikilərsə əlavə real keçid yoxlanması |
| Hərəkətli körpü | Dəstək hüceyrələri ayrıca vəziyyətdir | Aktiv səthin üstü qonşu zəminlə eyni y səviyyəsində |

**Məntiq və mesh eyni şey deyil:** məntiq hüceyrə tutulmasını tam 1×1 və 1×2 sahələr üzrə yoxlasın. Mesh-i 0,95×0,95×1,90 ölçüyə salmaq vizual boşluq yarada bilər, lakin dəqiq yerə söykənən yuvarlanma illüziyasını zəiflədər. İlk nümunədə xarici həcm saxlanıb yalnız künclər içəri bevel edilir. Alternativ vizual inset seçilərsə 0,005–0,01 m kimi kiçik həddən başlanmalı və kontakt/pivot animasiyası ayrıca yoxlanmalıdır; collision ölçüsünə gizli dəyişiklik edilməməlidir.

**Koordinat və kamera:** dünya məntiqində x/z zəmin, y yuxarı seçilə bilər; Blender-də Z yuxarıdır, ixracda çevrilmə nəzərə alınmalıdır. Grid-in hər iki üfüqi oxuna 45° azimutla baxan, üfüqdən α=arctan(1/√2)=35,2643897° yüksəklikli ortografik kamera həqiqi izometrik proyeksiya verir. 30° yüksəklik də işlək bədii seçimdir, lakin geometrik olaraq dimetrikdir; “yanlış izometriya” kimi qadağan etmək lazım deyil. Blender Euler X bucağı kimi birbaşa 35,264 yazmaq bu təriflə eyni olmaya bilər: bucaq burada kameranın baxış xəttinin üfüqlə bucağıdır, local Euler dəyəri yox.

**Piksel miqyası — öz geometrik hesablamam:** H piksel hündürlüyü, S kameranın əhatə etdiyi tam vertikal metr aralığıdırsa s=H/S piksel/metr. Azimut 45° üçün 1 m plitənin ekran rombunun eni W=√2·s, hündürlüyü D=√2·sin(α)·s. Şaquli 2 m blokun tək şaquli kənarının ekrandakı uzunluğu 2·cos(α)·s-dir; bütün blok siluetinin hündürlüyünə üst/alt bazanın dərinliyi də əlavə olunur.

Məsələn, 1920×1080 ekranda S=12 m → s=90 px/m. Həqiqi izometriyada 1 m plitə 127,28×73,48 px romb kimi görünür; blokun şaquli 2 m kənarı 146,97 px-dir. 30° yüksəklikdə plitə 127,28×63,64 px olur. Godot-da KEEP_HEIGHT ilə size=12 m, Unity-də uyğun orthographicSize=6 m eyni tam vertikal span verir; hər iki tətbiqdə aspect və viewport kəsilməsi yoxlanmalıdır. Bu dəyərlər konkret səviyyənin avtomatik kadra sığacağı vədi deyil. Çox böyük lövhə üçün əvvəl bounding box-un proyeksiyası və UI təhlükəsiz sahəsi hesablanmalıdır.

**Real yuvarlanma üçün boşluq:** 1×2 şaquli düzbucaqlı kəsiyi alt kənar ətrafında çevriləndə uzaq küncün pivotdan məsafəsi √5≈2,236 m-dir; çevrilmə boyunca maksimum hündürlük 2,236 m-ə çata bilər. Tavanı yalnız 2,00 m götürmək animasiyanın içindən keçməyə səbəb olar. İlkin tavan boşluğu 2,30 m kimi yoxlanıla bilər; bu, yalnız həmin çevrilmə üçün başlanğıc ehtiyatdır, bütün qonşu maneələrə collision zəmanəti deyil. Yatan blok eninə çevriləndə 1×1 kəsiyin maksimumu √2≈1,414 m olur. Tam sweep həcmi, tək final hüceyrələr yox, dekorun yerləşdirilməsində nəzərə alınmalıdır.

**Pilləkənlər və hündürlük:** referansdakı pilləkənlər bədii motiv ola bilər. Əgər gameplay yolu olacaqlarsa, sadə düz grid qaydası onları həll etmir: hündürlük səviyyəsi, ayaq dəstəyi, keçid orientasiyası və camera occlusion qaydası əlavə edilməlidir. İlk nüvədə oynanılan lövhəni bir səviyyədə saxlayıb çoxmərtəbəliliyi fon və dayaqlarla vermək daha aydın sınaq yaradır. Sonra lift tam blok izini daşıyan 1×2 və ya 2×2 platforma kimi ayrıca qayda ola bilər.

**Hazırlanmış ölçülü nümunə:** [Dual Grid ölçü lövhəsi.svg](../../reports/Dual%20Grid%20ölçü%20lövhəsi.svg). SVG vektor sxemidir: 1 m plitə, 1×1×2 m həcm, 45°/35,264° kamera, həndəsi proyeksiya və palitra göstərilir. Şəkil modelin Cycles və ya oyun daxilində renderi deyil. Bevel ölçüsü qeydlə verilib, ayrıca bevel mesh bu vektor eskizində çəkilməyib. Root istəsə bu lövhəni sonra parametrik .blend/.glb modelinə çevirmək mümkündür; bu tapşırıqda oyun/model istehsalına başlanılmayıb.

### Gaps
- Bu ölçülər telefon ekranda və engine daxilində test edilməyib.
- Ortografik miqyas və istehsal koordinat sisteminin layihə faylında təsdiqlənməsi üçün real kamera testi lazımdır.

## Material, işıq və alətlər render keyfiyyətini necə yüksəldə bilər?

### Takeaway
Əsas tövsiyəm: Blender-də parametrik modul və material nümunəsi, oyun motorunda isə eyni modulların real vaxt yoxlaması. Xüsusi plugin keyfiyyətin əvəzi deyil; faydalı alət işi sürətləndirir, amma art istiqamətini, düzgün ölçünü, işığı və performans ölçməsini avtomatik həll etmir.

### Cited Findings
- Blender rəsmi manualı Cycles-i fiziki əsaslı path tracer, EEVEE-ni fiziki əsaslı real vaxt renderer-i, Workbench-i isə layout/model/preview aləti kimi ayırır. — [Blender 4.5 render introduction](https://docs.blender.org/manual/sr/4.5/render/introduction.html)
- Godot-un renderer müqayisəsi Forward+-u desktop üçün ən geniş imkanlı, Mobile-ı sadə səhnələr və mobil/desktop üçün, Compatibility-ni daha geniş köhnə cihaz dəstəyi üçün göstərir. Volumetrik duman Forward+-da, baked LightmapGI isə fərqli məhdudiyyətlərlə hər üçündə mümkündür. Tam imkan siyahısı versiya ilə dəyişə bilər. — [Godot renderer overview](https://docs.godotengine.org/en/stable/tutorials/rendering/renderers.html)
- Unity rəsmi müqayisəsi URP-ni bütün dəstəklənən platformalar üzrə miqyaslanan, HDRP-ni yüksək səviyyəli desktop/konsol vizualları üçün təqdim edir; material və işıq modelləri fərqləndiyindən sonradan pipeline dəyişməsinin vaxt ala biləcəyini bildirir. — [Unity choose a render pipeline](https://docs.unity.com/en-us/engine/6000.3/manual/render-pipelines/choose-a-render-pipeline/pipeline)
- Godot-un rəsmi import bölməsi model formatları, ixrac konvensiyaları və import parametrlərini ayrıca nəzərdən keçirir. — [Importing 3D scenes](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_3d_scenes/index.html)
- Khronos standartında baseColor/emissive rəng teksturaları ilə roughness/metallic kimi məlumat teksturalarının rəng davranışı fərqləndirilir. PBR materialı sadəcə bütün səthlərə parlaq lak vermək deyil. — [glTF material specification](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html)

### Inferences
**Material başlanğıclarım:** bazalt əsas rəng #24333D, metallic 0, roughness 0,70–0,88; açıq keramika #C4CBC8, metallic 0, roughness 0,35–0,55; bürünc #8C6846, təmiz metal hissələrdə metallic 1, roughness 0,30–0,50; oksid və kir qatlarında ayrı dielektrik maska; siqnal A #69C5CE, B #D4954E; fon #151F29. Hex rənglər sRGB art seçimi kimi verilir, fiziki material albedosunun laborator ölçüsü deyil. Roughness xəritələri materialın təbii istiqamətini izləsin; hər küncə eyni ağ cızıq vurmaq əvəzinə toxunulan bölgələr seçilsin.

**İşıq:** böyük, yumşaq neytral-soyuq əsas mənbə forma və kontaktı oxutsun; zəif isti yan işıq metalı seçsin. Emissiv rənglər əsas funksional siqnallarda saxlanılsın. Bütün plitə perimetrlərini neonla çəkmək əvəzinə dəyişən halı, çıxışı və əlaqəni vurğulamaq daha güclü vizual iyerarxiya yarada bilər. Ambient occlusion və contact shadow blokun hansı hüceyrəyə söykəndiyini dəstəkləsin; qara halo ilə grid sərhədini qarışdırmasın. Baked işıq statik mühit üçün, hərəkətli blok üçün probe/uyğun dinamik işıq və kölgə sınağı lazımdır. Çoxsaylı emissiv materialların oyunda avtomatik səhnəni işıqlandıracağını fərz etmək olmaz.

**Rəng idarəsi:** albedo rəng teksturası kimi, roughness/metallic/normal məlumat kimi düzgün işarələnməlidir. Eyni ekspozisiya və bir display/view transform qərarı saxlanılsın. Blender-də AgX mümkün başlanğıc seçimdir, lakin manual səhifəsinin birbaşa fetch-i alınmadığı üçün burada onun xüsusiyyətlərinə dair yoxlanmamış texniki iddia verilmir. AgX və ya başqa view transform-u təsadüfi dəyişib müqayisə etmək əvəzinə reference look əvvəl sabitləşdirilməlidir. Blender nəticəsinin engine-də piksel-piksel eyni olması gözlənilməməlidir: işıq, tonemapping və shader fərqləri ayrıca tənzimlənir.

**Başlanğıc performans fərziyyələri — bunlar cihaz testi deyil:** 1080p desktop üçün 60 fps hədəfi 16,67 ms tam frame büdcəsi; seçilən mobil cihaz üçün 30 fps hədəfi 33,33 ms-dir, 60 fps ayrıca yoxlanmalıdır. Modul təkrar istifadə və instancing, 1–2K material atlas/trim sheet, yaxın hero blok üçün 2K tekstura ilə başlamaq olar. İlk bədii blok üçün 1–3 min triangle, plitə üçün 100–400 triangle planlaşdırma aralığı ola bilər; sayı yox, real GPU/CPU vaxtı qərar versin. Bir əsas kölgəli işıq və azsaylı əlavə kölgəsiz vurğu işığı ilə başlamaq, mobil variantda volumetrik dumanı və çoxlu transparent qatları tələb etməmək faydalı sınaqdır. Bütün bu limitlər profilingdən sonra yenidən baxılmalıdır.

**Tövsiyə olunan alət zənciri:**

1. **Blender:** metr əsaslı parametrik modul, bevel, UV, material, animasiya/pivot, orthographic render. Cycles yüksək keyfiyyətli sabit beauty render üçün; EEVEE daha sürətli vizual iterasiya üçün seçimdir. Keyfiyyətə nail olmaq üçün ayrıca kommersiya render plugin-i ilkin şərt deyil.
2. **Godot:** GDD-dəki seçim davam edirsə desktop art testi Forward+, sonra ayrıca Mobile/Compatibility profili. Mobil versiya desktop-dakı bütün postprocess-i kopyalamaqla qiymətləndirilməsin. Engine seçimini yalnız bir statik şəkilə görə dəyişmək lazım deyil.
3. **Unity URP:** komanda təcrübəsi Unity-dirsə PC+mobil üçün münasib alternativdir. HDRP-ni yalnız daha yüksək büdcəli desktop/konsol istiqaməti seçiləndə qiymətləndirmək məntiqlidir; mobil planı ilə avtomatik eyni pipeline deyil.
4. **.blend → .glb/.gltf → engine:** tətbiq edilmiş transform, düzgün normals, uyğun UV, məhdud PBR material xəritələri və ayrıca collision qaydası. Blender prosedural node ağaclarının hamısının oyuna eyni şəkildə keçdiyini fərz etməmək; zəruri təsirlər teksturaya bake və ya engine shader-i kimi yenidən qurulur. Final işıq engine-də yoxlanır.
5. **Figma:** UI, menyu, düymə ölçüsü və dizayn sisteminə yaraya bilər; real 3D işıq/render aləti deyil. **fal generative 3D** konsept/yardımçı asset araşdırmasına yaraya bilər, lakin metr dəqiqliyi, topologiya, UV və collision sonradan yoxlanmalıdır. Hər ikisi root-un yoxlamasında təklif oluna bilən, amma bu sessiyada bağlı olmayan plugin kimi çıxıb. Bu qeydlər onların hesab/büdcə icazəsini fərz etmir.
6. **Native imagegen:** yeni konsept görünüşlərini müqayisə etmək üçün mövcud imkan; dəqiq ölçülü mesh, arxadan görünüşün tutarlılığı və oynanıla bilən səviyyənin həllolunması üçün sübut deyil. Bu araşdırma zamanı çağırılmayıb.

**Mühit barədə dürüst status:** root yoxlamasında blender/godot/Unity CLI əmrləri aşkar edilməyib və standart Blender qovluğu görünməyib. Bu, proqramların kompüterdə qətiyyən olmadığı demək deyil; alternativ quraşdırma yeri ola bilər. “İndi Cycles-də render edə bilirəm” deyə iddia edilməməlidir. Root-un plugin axtarışında çıxan “Render” veb deployment xidmətidir, 3D renderer deyil. Parametrik script və dəqiq SVG hazırlamaq mümkündür; real .blend renderinin icrası üçün işlək Blender və render hardware-i ayrıca təsdiqlənməlidir.

**Növbəti reviewable deliverable təklifim:** bir 8×8 və ya daha kiçik test lövhəsi, iki dəqiq 1×1×2 blok, bir ağır düymə, bir körpü; eyni kamerada üç material/işıq variantı. Əvvəl greybox və boz tonlu oxunaqlılıq, sonra material, sonra effekt. Bu, hazırda istifadəçinin başlamasına icazə verdiyi istehsal işi kimi yox, qəbul edə biləcəyi gələcək mərhələ kimi təqdim edilməlidir.

### Gaps
- Blender, Godot və Unity-nin konkret quraşdırılması, GPU modeli, engine versiyası və real render vaxtı bu agent tərəfindən yoxlanmayıb; root auditinin məhdud nəticələri yuxarıda qeyd olunub.
- Material və işıq təklifləri real səhnədə A/B sınaq görməyib. Ekran rəngi və heks dəyəri final görünüş zəmanəti deyil.
- Heç bir plugin bağlanmayıb, pullu xidmət çağırılmayıb, model və oyun hazırlanmayıb. Yalnız texniki SVG nümunəsi və araşdırma qeydləri yaradılıb.
