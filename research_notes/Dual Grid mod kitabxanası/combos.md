# Altı ilkin modun uyğunluğu və tapmaca reseptləri

## Kombinasiyalar üçün ortaq qərar çərçivəsi nədir?

### Takeaway
Altı ana mexanika istifadəçinindir; onların dəqiq qaydaları, alt-elementləri və aşağıdakı kombinasiyalar bizim dizayn genişləndirməmizdir. Daha çox mod həmişə daha yaxşı puzzle deyil. Eyni vaxtda ən çox iki yeni əlaqə göstərmək, üçlü kombinasiyaları isə qaydalar artıq öyrəniləndən sonra vermək təklif olunur.

### Cited Findings
- Mövcud lokal [README](C:/Users/User/Documents/ChatGPT/Bloxorz%20New%20Mechanics/demo/README.md) öyrənməni tək kubdan iki kuba, qarışıq ölçüdən iki domino­ya keçirir; H cari vəziyyətə hesablanır. Bu baza yeni ailələr üçün də qorunmalı mövcud məhsul xüsusiyyətidir; aşağıdakı reseptlər hazır kampaniyada yoxdur.
- Qaydanın intuitiv, yadda qalan və maraqlı nəticə yaradan olması Traynor-un birbaşa müsahibədə ifadə etdiyi mövqedir. Aşağıdakı prioritetlər bundan çıxardığımız layihə qərarlarıdır. — [Müsahibə](https://www.gamedeveloper.com/design/patrick-s-parabox-)

### Inferences
**Qiymətlər:** “Uyğun” = ortaq problem aydın görünür; “Sına” = bir neçə kənar hal və ya yük var; “Riskli” = ilkin kampaniyada səbəb-nəticə/reaction/hidden-information qarışır. Bunlar playtest nəticəsi deyil. M1 phantom, M2 idarə, M3 ölçü, M4 kölgə, M5 divar, M6 saxta çıxışdır. M4 üçün əsas kampaniya qiyməti iki saniyəlik orijinaldan fərqli, ayrıca etiketlənən diskret iki-gedişlik variant üzərindədir; orijinal iki saniyə öz optional real-time modunda qalır.

### Gaps
- Bütün matris dizayn baxışıdır. M3-də 2×2 forma/hündürlük/çevrilmə və M4/M5-də zaman bazası müəyyən edilmədən texniki uyğunluq sübutu yoxdur.

## Altı modun bütün on beş cütü necə qiymətləndirilir?

### Takeaway
Ən güclü ilk cütlər M1+M3, M2+M6 və diskret M3+M5-dir. Ən riskli cütlər iki gizli cəzanı birləşdirən M1+M6 və zaman sıxlığını ikiqat artıran real-time M4+M5-dir. Riskli demək qadağan deyil: optional Chaos laboratoriyası üçün qısa və geri alınan sınaq deməkdir.

### Cited Findings
Bu cədvəldə xarici oyun faktı və uğur iddiası yoxdur; hamısı orijinal altı ideyanın layihə qiymətləndirməsidir.

### Inferences
| Cüt | Qiymət | Məhsuldar əlaqə | Dəqiq sərhəd və qoruyucu qayda |
|---|---|---|---|
| M1+M2 | Sına | Təhlükəsiz marşrutla input xəritəsini birgə planlama | İlk dərsdə gizli floor yox, aşkar çökmə; H əvvəl transformu, sonra footprint dayağını göstərir |
| M1+M3 | Uyğun | Böyük/kiçik/dik/uzanmış footprint zəmin resursunu dəyişir | Ölçü dəyişməsi vaxtında yeni footprint dəstəyi əvvəl yoxlanır; qırılma idealizə edilmiş yük qaydasıdır |
| M1+M4 | Sına | Əvvəlki yol kölgənin gələcək təhlükəsinə çevrilir | Phantom yalnız real blokdanmı, kölgədənmi tetik alır açıqdır; ilkin seçim kölgə səthi dəyişmir |
| M1+M5 | Sına | Çökən yol və daralan sahə geri dönüşü məhdudlaşdırır | Hər ikisi diskret növbə; çökmə/divar ardıcıllığı göstərilir; gizli floor+real-time squeeze başlanğıca verilməsin |
| M1+M6 | Riskli | Yanlış final başqa yoldan zəmini aşmağa məcbur edir | İki gizli cəza ardıcıl yox; portal ünvanı və son footprint görünür, teleport eyni qırılma qaydasına tabedir |
| M2+M3 | Sına | Eyni niyyət fərqli ölçüdə fərqli son iz verir | Input transform ölçü roll hesabından əvvəl; 2×2 forma ayrıca hərəkət cədvəli olmadan daxil edilmir |
| M2+M4 | Riskli | Keçmiş əmrin başqa idarə xəritəsində təkrarı | Kölgə raw key yox, artıq həll edilmiş dünya komandasını yazır; əks halda çevrilmə iki dəfə tətbiq edilər |
| M2+M5 | Sına | Təzyiq altında yeni input xəritəsi | Kampaniyada divar növbə ilə, H və dərs timer-i dayandırır; real-time variant ayrıca xəbərdarlıq |
| M2+M6 | Uyğun | Portal səni başqa input zonasına salır | Teleport həmin gedişin sonunda zona statusunu dəyişir; çıxışdan sonrakı ilk input üçün kompas yenilənir |
| M3+M4 | Sına | Kölgənin izi ilə real ölçü fərqlənə bilər | Kölgə yazılma anının footprint snapshot-unu saxlayır; bütün tarix indiki ölçüyə zorla çevrilmir |
| M3+M5 | Uyğun | Dar keçid üçün kiçilmə, sensor üçün böyümə | Divar fazası və resize vaxtı aydın; qanunsuz büyümə bütün əmri rədd edir, yarım model sıxılmır |
| M3+M6 | Sına | Saxta final forma dəyişməsini strateji yerləşdirir | Teleport ölçünü gizlicə dəyişmir; açıq resize cihazı varsa başqa trigger kimi göstərilir |
| M4+M5 | Riskli | Həm əvvəlki izdən, həm indiki sıxılmadan qaçış | Real-time iki sistem yüksək reaksiya yükü; əvvəl diskret ayrı dərslər, bütün queue/faza undo olunur |
| M4+M6 | Sına | Teleportla kölgədən ayrılma və geri çatma | Yazılmış teleport hadisəsi açıq nişanla qeydə alınır; kölgə portal çıxışında spawn olarkən real blokla təmas sırası dəqiqdir |
| M5+M6 | Sına | Təhlükəli finaldan geri teleport divar fazasını yeni məkana daşıyır | Teleport global fazanı sıfırlamır; ünvan squeeze altında mümkünsüzdürsə preview xəbərdar edir |

**Qlobal ardıcıllıq üçün tövsiyə:** qəbul edilmiş input → input xəritəsi → resize/roll niyyəti və toqquşma validasiyası → real hərəkət/buz alt-addımları → teleport → mexaniki sensor/floor dəyişiklikləri → diskret queue və divar fazasının irəliləməsi → bütün footprint-lərdə təhlükə/dayaq → qələbə. Bu universal məcburiyyət deyil; final sənəddə bütün ailələr üçün vahid sıralama seçilməlidir. Xüsusilə portal və divar toqquşmasının eyni növbədə nəticəsi görünən olmalıdır. Səhv input, TAB və H mexaniki gedişə çevrilmir.

### Gaps
- İki saniyəlik real-time kölgə, saniyəlik divar və növbəli oyun eyni solver-də sadəcə bir gediş kimi formalizə edilə bilməz. Ayrı zaman modeli və ya diskret kampaniya uyğunlaşdırması lazımdır.

## Səkkiz kurasiya edilmiş resept hansı dərk anlarını sınayır?

### Takeaway
Reseptlər koordinatlı və həlli təsdiqlənmiş level deyil. Hərəsi bir əlaqəni sınamaq üçündür; “mütləq belə işləyəcək” və ya “optimaldır” iddiası yoxdur. Son iki resept üçlü kombinasiyadır; digərləri ikilidir.

### Cited Findings
Xarici mənbədən səviyyə və ya xəritə götürülməyib. Aşağıdakılar layihə təklifləridir.

### Inferences
**R1 — Son keçidi özünə saxla [M1.2 + M3].** A kiçik forma ilə biristifadəlik körpünü keçib B-yə yol hazırlayır; B-nin uzun forması çıxışa giriş orientasiyası üçün başqa tərəfdən gəlməlidir. Tapmaca cəmi bir yolun yox, gələcək footprint-in qorunmasıdır. Resize təhlükəsiz meydançada, yol tərk ediləndə qırılır. Ön cue qırılacaq xanalardır. H current size və broken-set ilə işləyir; heç bir doğru yol ilkin halda koordinatla sübut edilməyib. Orta çətinlik; əsas kampaniya namizədi.

**R2 — Qapıdan sonra kompas [M2.1 + M6.1].** Saxta final bloku sabit inversiya meydanına ötürür. Geri çıxmaq üçün əvvəl “səhv” görünən düymə dünya üzrə doğru aşmanı verir. Dərk portalın ünvanı ilə sonrakı idarəni ayırmaqdır. Portal çıxışa U qoyur, növbəti gedişdə inversiya aktivdir. H basılacaq düymə və dünya oxunu yanaşı verir. İlk nümayiş təhlükəsiz böyük meydanda; orta çətinlik, optional sürprizdən sonra kampaniya versiyası.

**R3 — Böyümək üçün geri çəkil [M3 + M5].** Növbə ilə daralan dəhlizdə kiçik forma yan cibə girir, divar açıq fazaya keçəndə geniş meydanda domino­ya çevrilib ağır dik sensoru basır. Daralma saniyə yox, qəbul edilmiş gediş sayına bağlıdır. Forma kütləni avtomatik dəyişmirsə sensor rol şərti ayrıca saxlanmalıdır. Dərk düzgün gücü düzgün məkanda hazırlamaqdır. H ölçü/faza/rol bilir, qanunsuz böyümə bir əmrlə rədd edilir. Orta/yüksək, bütün qaydalar öyrəniləndən sonra.

**R4 — Əvvəlki izin altı boşdur [M1.2 + M4 diskret].** Real A birdəfəlik yolu tərk edir; kölgə iki gediş sonra həmin footprint xəttini göstərir. Kölgə dayağa ehtiyac duymayan hazard kimi seçilirsə boşalmış zolaqdan keçir və yaxın küncdə A ilə görüşə bilər. Dərk “yol yox oldu, təhlükə də yox oldu” fərziyyəsinin səhvliyidir. Kölgənin səthi dəyişməməsi dərsdə göstərilir. Queue önbaxışı və undo tamdır. Yüksək, solver vəziyyət modeli sübutundan sonra; kölgənin dayağa tabe variantı ilə qarışdırılmır.

**R5 — Portalın ünvanını yox, fazanı da oxu [M5 + M6.2].** Dövrəli saxta qapının növbəti ünvanı açıqdır; ünvanlardan biri növbəti divar fazasında bağlanır. Oyunçu başqa blokla bir faydalı əmr edib qapıya uyğun fazada girir. Qlobal faza teleportla sıfırlanmır. Dərk məkan və zaman hazırlığının ayrılmasıdır. H ünvan indeksi+faza verir, göstərilən addımı et hər ikisini eyni növbə sırası ilə icra edir. Yüksək, kampaniyanın sonrakı sınağı.

**R6 — Partnyor görünürlüyü güc deyil [M1.5 + N4 nisbi rezonans ailəsi].** Yeni ailənin yekun qaydaları ayrıca notes-da dəqiqləşəndən sonra istifadə olunsun. Niyyət: bir blok phantom sahəyə dayaq təmin edən yaxınlıq radiusunu saxlayır, digər nisbi əlaqə sensorunu aktivləşdirir. Rezonans bağını real fiziki itələmə/tether ilə eyniləşdirmədən yalnız məsafə və ya yerləşmə münasibəti seçilsin. İki dəqiq məsafə qaydası eyni vizual dairəyə yığılmasın. H hər iki predikatı yoxlamalıdır. Hazır resept deyil, yeni ailə ilə bağlanacaq test hipotezi; orta/yüksək.

**R7 — Görünən yolun gizli qiyməti [M1.6 + M2.3 + M6.1, üçlü].** Səfər büdcəli plitələrdən keçib polarite zonasına daxil olan A, teleportdan sonra yenə keçidə qayıdır; dəyişmiş idarə ilə yol haqqını ikinci dəfə boş yerə xərcləməməlidir. Teleport polarity-ni sıfırlamır, ziyarət sayğacları da qalır. B alternativ sabit yol saxlayır. Dərk input yaddaşı, məkan dönüşü və məhdud təkrar girişi birləşdirməkdir. Bütün üçü ayrı dərsdə öyrədilmədən verilməsin. H counters+bit+positions ilə tam axtarış tələb edir. Yüksək, əlavə laboratoriya; sürpriz gizlilik söndürülmüş.

**R8 — Keçmişin ölçüsünü ötürmə [M3 + M4 diskret + M6.4, üçlü].** Kiçik A saxta finalı açır, staging yerinə ötürülür və qıfıl açılır; sonra açıq cihazda domino­ya çevrilir. Kölgə keçmişdə yazılmış kiçik footprint-ləri saxlayır, indiki domino ölçüsünə çevrilmir. Oyunçu kölgə trayektoriyasını və yeni böyük bədənin yan keçməsini planlayır, B açılan yoldan keçib çıxışı hazırlayır. Portal keçidi queue-da hadisə kimi göstərilir, ani görünməz hazard spawn yoxdur. Dərk keçmiş vəziyyətlə cari formanın ayrı olmasıdır. Yüksək, əlavə challenge; undo ölçü, queue, latch və teleportu birlikdə qaytarır.

**Prioritet:** əvvəl R2-nin açıq variantı və R1; sonra R3. R4/R5 solver genişlənməsindən sonra; R6 yeni ailə tərifi bitəndən sonra; R7/R8 gec laboratoriya. Resept sayını doldurmaq üçün Chaos-a məcburi yeni gizli cəza əlavə edilmir.

**Bilik və dünya fərqi:** ilk rage ölümündən sonra aşkarlanmış phantom/saxta qapı UI annotasiyası cəhdlər arasında qala bilər. Undo isə həmin dünyada sınıq zəmini, teleport latch-ini və queue-nu geri çevirir. Hər ikisini bir state kimi təsadüfən silmək və ya hər ölümü əvvəlki gizli tələnin yeni RNG seçiminə çevirmək təklif edilmir. Optional “ilk baxışda gizli” rejiminin sürprizi var, amma öyrənilən qayda sabit qalır.

### Gaps
- R6 N4 ailəsinin yekun qaydası ilə uyğunlaşdırılmalıdır; hazırda “nisbi rezonans” adından kənar texniki nəticə fərz edilmir.
- Hər resept konkret koordinat, tam yol, minimal həll və insan sınağı istəyir. Hazır oyunda kod, səviyyə və paketə dəyişiklik edilməyib.
