# Dual Grid üçün qiymət və platforma iqtisadiyyatı

## Steam qiyməti və satışdan qalan məbləğ necə modelləşdirilməlidir?

### Takeaway
İlkin işçi qiymət tövsiyəm güclü tam oyun üçün $14.99, daha yığcam məhsul üçün $12.99-dur. Bu qiymətlər satış zəmanəti deyil; oyunun demo keyfiyyəti, real oynama dəyəri və müqayisə edilən məhsullarla yoxlanmalı hipotezlərdir. $19.99 yalnız ciddi fərqləndirmə və təqdimatla müdafiə olunmalıdır.

### Cited Findings
- Steam Direct hər məhsul üçün $100 tələb edir; məhsul ən az $1,000 adjusted gross revenue əldə etdikdən sonra ödənişdə geri hesablanır. Bank və vergi məlumatlarının təsdiqi tələb olunur. — [Steam Direct](https://partner.steamgames.com/steamdirect)
- Valve qiymətləri tərəfdaşın seçdiyini, regional qiymətlərin və çevirmə alətlərinin olduğunu izah edir. ABŞ baza qiyməti dünya üzrə eyni dollar gəliri demək deyil. — [Steam qiymət sənədi](https://partner.steamgames.com/doc/store/pricing)
- Valve ödənişi gross revenue-dan vergi, qaytarma və chargeback düzəlişlərini çıxarıb revenue-share faizini tətbiq etməklə hesablayır. VAT tətbiq edilən ölkələrdə qiymətə daxildir; ABŞ sales tax uyğun yurisdiksiyalarda qiymətin üzərinə əlavə olunur. — [Steam vergi FAQ](https://partner.steamgames.com/doc/finance/taxfaq)
- Steam-in standart qaytarma siyasəti alışdan 14 gün və iki saatdan az oynama şərtini göstərir; kənar hallarda da müraciətlər nəzərdən keçirilə bilər. — [Steam Refunds](https://store.steampowered.com/steam_refunds/)
- 70% developer payı üçün ilkin tərəfdaş sübutu Starbreeze illik hesabatıdır: Steam satış payının 70%-dən 75%-ə qalxdığını bildirir. Valve-nin öz tier elanının səhifəsi tapıldı, lakin bu araşdırma alətində yalnız şəkil qaytardı; cari müqavilənin faizlərini hesab açılarkən Steam Distribution Agreement-dən təsdiqləmək lazımdır. Aşağıdakı hesab 30% platforma payını açıq model fərziyyəsi kimi götürür. — [Starbreeze 2019 illik hesabat, s.6](https://media.starbreeze.com/2020/04/Starbreeze-Annual-Report-2019_web.pdf), [Valve-nin tier elanı](https://steamcommunity.com/groups/steamworks/announcements/detail/1697191267930157838)
- Steam ödəniş FAQ-sı bank vasitəçiləri və qəbul edən bankın komissiya tuta biləcəyini, ABŞ mənbəli hissənin vergi tutulması üçün ayrıca əhəmiyyətli olduğunu bildirir. — [Payments FAQ](https://partner.steamgames.com/doc/finance/payments_salesreporting/faq)

### Inferences
**Qiymət mövqeləri — şəxsi kommersiya tövsiyəsi, bazardan ölçülmüş tələb deyil:**

| ABŞ baza qiyməti | Uyğun təqdimat hipotezi | Qərar |
|---|---|---|
| $9.99 | Kiçik, fokuslanmış, sadə vizuallı məntiq oyunu | Büdcə/əhatə yığcamdırsa mümkündür; ucuzluq görünürlüğü avtomatik yaratmır |
| $12.99 | Öz mexanikası aydın görünən yığcam premium oyun | İlk oyun üçün ehtiyatlı alternativ |
| $14.99 | Cilalanmış vizual üslub, yaxşı tutorial, müxtəlif həll ideyaları və kifayət qədər güclü məzmun | Əsas işçi hipotezim |
| $19.99 | Yüksək təqdimat keyfiyyəti, yadda qalan konsept, dərin kampaniya və ya həqiqətən yaxşı işləyən co-op | Baza mexanika sübut edilməmişkən erkən seçim olmasın |

Bu qiymət mövqeləri müəyyən level sayına və ya süni saat minimumuna bağlı deyil. 100 təkrar level 40 güclü leveldən daha dəyərli olmaya bilər. Qiyməti yüksəltmək satış sayını azalda bilər: aşağıdakı cədvəl satış sayını sabit tutduğundan qiymət elastikliyini sübut etmir.

**Şəffaf sadələşdirilmiş hesab:** bir ilkin satış vahidindən developer üçün qalan məbləğ = P × r × d × (1−q) ÷ (1+t) × (1−s).

- P ABŞ baza qiyməti; r regionların orta qiymət amili; d endirimdən sonra orta qiymət amili; q refund/chargeback dəyərinin payı; t vergi-daxil qiymətlər üçün effektiv vergi amili; s mağaza komissiyasıdır.
- r, d, q və t faktiki ölçülər deyil. Hesabda satışların tam geri qaytarma baxımından orta qiyməti eyni, faktorlar təxminən ayrılan qəbul edilir. Əsl büdcədə region və satış kohortu üzrə ayrı hesab lazımdır; ABŞ-ın qiymətə əlavə olunan sales tax-ını səhvən iki dəfə çıxmamaq lazımdır.
- Əsas ssenari: r=0.80, d=0.80, q=5%, t=10%, s=30%. Beləliklə P-nin 38.69%-i qalır. Bu “Steam həmişə 61.31% kəsir” demək deyil: regional qiymət və endirim mağaza komissiyası deyil.
- Aşağı gəlir/vahid ssenarisi: r=.65, d=.65, q=10%, t=15%, s=30% → P-nin 23.15%-i.
- Yüksək gəlir/vahid ssenarisi: r=.95, d=.90, q=2%, t=5%, s=30% → P-nin 55.86%-i.

| Baza qiyməti | Aşağı gəlir/vahid | Əsas gəlir/vahid | Yüksək gəlir/vahid |
|---|---:|---:|---:|
| $9.99 | $2.31 | $3.87 | $5.58 |
| $12.99 | $3.01 | $5.03 | $7.26 |
| $14.99 | $3.47 | $5.80 | $8.37 |
| $19.99 | $4.63 | $7.73 | $11.17 |

Rəqəmlər developerə vergi tutulmasından ƏVVƏL mağaza payından sonra qalan məbləğdir; şirkət/mənfəət vergisi, ABŞ withholding-i, bank, publisher payı, əmək və marketinq çıxılmayıb. Azərbaycanda yaşayan konkret istifadəçinin müqavilə/vergi/bank uyğunluğunu bu hesab təsdiq etmir.

**$14.99 əsas ssenarisində sadəcə miqyas nümunəsi:** 1,000 ilkin satış ≈ $5,800; 10,000 ≈ $58,000; 50,000 ≈ $290,000. Bunlar proqnoz deyil, seçilmiş satış sayı baş verərsə alınan hesabdır. $149,900 gross “10 min nüsxə × $14.99” hesabını xalis qazanc kimi təqdim etmək olmaz.

### Gaps
- Dual Grid üçün ödənişə hazırlıq, qiymət elastikliyi, satış sayı və refund səviyyəsi ölçülməyib. “Kommersiya baxımından uğurlu qiymət” hazırda təmin edilə bilməz.
- Steam müqaviləsinin cari standart faizi public docs-da tam açıq göstərilmədiyindən 30% model fərziyyəsi və tarixi tərəfdaş təsdiqi ayrılıb; milyonlarla gəlir tierləri bu kiçik layihənin baza büdcəsində istifadə edilməməlidir.

## Layihə neçə satışdan sonra xərcini çıxara bilər?

### Takeaway
Qiymət qərarını “neçə sata bilərik?” sualından əvvəl “hansı tam xərc səviyyəsini daşıya bilərik?” sualı ilə bağlamaq lazımdır. Öz əməyini sıfır sayan cash break-even ilə iqtisadi mənfəət ayrı anlayışdır.

### Cited Findings
- Steam-in gross hesabatı refund, chargeback və vergi çıxılmamış rəqəm göstərə bilər; aylıq hesabatda düzəlişlər çıxılır və developer payı tətbiq olunur. — [Steam payments FAQ](https://partner.steamgames.com/doc/finance/payments_salesreporting/faq)
- Qiymət artırılması endirim imkanına 30 günlük cooldown yarada bilər; qiymət və endirim planı birlikdə qurulmalıdır. — [Steam pricing FAQ](https://partner.steamgames.com/doc/store/pricing), [discount qaydaları](https://partner.steamgames.com/doc/marketing/discounts)

### Inferences
Break-even vahid sayı = yuxarı yuvarlaqlaşdır(C / (v−a)). C sabit tam xərc, v ilkin satışdan orta qalıq, a hər satışa görə əlavə xidmət və dəyişən marketinq xərci. Aşağıdakı cədvəl a=0 götürür; marketinq və ehtiyat artıq C-də olmalıdır. Reklam xərci həm C-də, həm a-da təkrarlanmamalıdır.

| Baza qiyməti | C=$10,000 | C=$30,000 | C=$60,000 |
|---|---:|---:|---:|
| $9.99 | 2,588 | 7,762 | 15,524 |
| $12.99 | 1,990 | 5,970 | 11,939 |
| $14.99 | 1,725 | 5,173 | 10,346 |
| $19.99 | 1,293 | 3,879 | 7,758 |

Bunlar əvvəlki əsas gəlir/vahid fərziyyəsindən hesablanmış tələb olunan İLKİN satışlardır, bazarın verəcəyi satış proqnozu deyil. Refund düzəlişi artıq v-də var. Satışdan sonra yalnız retained copies sayılırsa q yenidən çıxılmamalıdır.

Nümunə tam xərc büdcəsi (qiymət təklifi deyil): 6 ay × 2 nəfər × ayda $1,000 əmək = $12,000; xarici art/səs/QA/lokalizasiya $5,000; marketinq $4,000; alət/cihaz $1,000; 20% ehtiyat $4,400 → C=$26,400. $14.99 əsas ssenarisində təxminən 4,552 ilkin satış tələb edər. Əgər ailə yaşayışı üçün götürülməyən əmək “sıfır cash” sayılsa da layihənin iqtisadi xərci itməz.

$14.99-dan $12.99-a enmək eyni vahid qalıq faktorunda gəliri qorumaq üçün təxminən 15.4% daha çox satış tələb edir. $9.99-a enmək təxminən 50.1% əlavə satış tələb edir. $19.99 təxminən 25% az satışla $14.99 gəlirinə çata bilər, amma real azalma 25%-dən böyük olsa gəlir aşağı düşər. Bu arifmetika ucuzlaşdırmanın həmişə yaxşı olduğu fikrini yoxlamaq üçündür.

### Gaps
- Faktiki komanda, vaxt, məvacib, publisher müqaviləsi və marketinq büdcəsi məlum deyil; verilən xərc sətirləri bazar qiyməti və ya konkret təklif deyil.
- Xalis mənfəət üçün hüquqi şəxs və vergi vəziyyəti dəqiqləşməlidir. Araşdırma istifadəçiyə xüsusi vergi dərəcəsi müəyyən etmir.

## Mobil model Steam-dən daha gəlirli ola bilərmi?

### Takeaway
Mobil bazarın böyük olması bu konkret premium məntiq oyununun daha çox qazanacağı demək deyil. Mənim işçi strategiyam: əvvəl Steam-də premium məhsulu və auditoriyanı sübut etmək, sonra toxunma idarəetməsi yaxşı işləyirsə reklamız pulsuz giriş + birdəfəlik tam açılma və ya premium mobil portu yoxlamaqdır.

### Cited Findings
- Apple Small Business Program ödənişli tətbiqlər və IAP üçün 15% komissiya verir; uyğunluq/enrollment və əlaqəli developer hesablarının gəlir həddi şərtləri var. Əvvəlki ildə $1 milyonadək proceeds və cari il həddi qaydaları tətbiq olunur; avtomatik hamıya 15% deyil. — [Apple SBP](https://developer.apple.com/app-store/small-business-program/)
- Google-un hazırkı rəsmi səhifəsi ABŞ/EEA/UK üçün 30 iyun 2026, Avstraliya/Yaponiya üçün 30 sentyabr 2026 tarixli region rollout-u göstərir. Yeni/köhnə install, billing və proqramlara görə faizlər dəyişir. Müvafiq ilk $1M tierində 10%+5% billing; digər bazarlarda rollout-a qədər enrolled 15% tierinin ilk $1M üçün 15%, üstündə 30% qaydası var. Bütün ölkələr və bütün hesablar üçün vahid 15% iddiası düzgün deyil. — [Google service fees](https://support.google.com/googleplay/android-developer/answer/112622?hl=en)
- Apple Developer Program standart üzvlüyü ildə $99, Google Play developer qeydiyyatı birdəfəlik $25-dır; region və uyğunluq ayrıca yoxlanmalıdır. — [Apple](https://developer.apple.com/programs/enroll/), [Google](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en)
- Sensor Tower-in 26 fevral 2026 hesabatı 2025 mobil IAP gəlirini təxminən $82 milyard kimi təqdim edir və retention/live-ops istiqamətini vurğulayır. Bu bütün mobile gaming IAP ölçüsüdür, premium spatial-puzzle TAM-ı deyil; reklam gəliri də eyni ölçü deyil. — [Sensor Tower 2026](https://sensortower.com/press/press-release-sensor-tower-state-of-gaming-gaming-drove-52-billion-downloads-82b-iap-revenue-on-mobile-and-12b-premium-revenue-on-steam)
- Sensor Tower-in əvvəlki hesabatı qərb bazarlarında casual puzzle gəlirlərinə Royal Match kimi oyunların rəhbərlik etdiyini qeyd edir. Belə economy/live-service puzzle ilə bizim sonlu, düşünülmüş spatial logic oyunun gəlir modeli eyni deyil. — [Sensor Tower 2025](https://sensortower.com/press/press-release-sensor-tower-mobile-gaming-rebounds-in-2024-as-player-engagement-and-spending-reach-new-highs)
- Google AdMob rewarded reklamı istifadəçinin mükafat əvəzində könüllü baxdığı format kimi təsvir edir; bu formatın mövcudluğu konkret oyunda retention və gəlir nəticəsinə zəmanət deyil. — [AdMob](https://admob.google.com/home/resources/rewarded-ads-win-for-everyone/)

### Inferences
**Mobil variantların müqayisəsi — strategiya qiymətləndirməm:**

| Model | Uyğunluq | Əsas risk |
|---|---|---|
| Premium, məsələn $4.99–$6.99 | Sakit və bütöv puzzle təcrübəsinə uyğundur; reklam yoxdur | Oyunçu yoxlamadan pul ödəməlidir; discoverability çətinliyi |
| İlk fəsil pulsuz + $4.99–$6.99 non-consumable unlock | İdarə və əsas mexanika əvvəl sınaqdan keçirilir | Çox download, az unlock; restore purchase və platforma QA işi |
| F2P + reklam/IAP | Yalnız reklam və uzunmüddətli geri dönüş üçün ayrıca məhsul dizaynı varsa | Sonsuz undo və rahat düşünməni reklamla bloklamaq oyun vədi ilə toqquşur; UA/live-ops yükü |

Qiymətlər test hipotezidir; USD dünya qiyməti deyil. Steam ilə mobil qiymət fərqi eyni məzmunun müxtəlif bazarlardakı dəyərini müzakirə etməyi tələb edir. Daha ucuz mobil port Steam auditoriyasını avtomatik məhv etmir, lakin premium marka təqdimatı aydın olsun.

**Unlock modeli nümunəsi — proqnoz deyil:** $4.99 qiymət, regional faktor .80, refund .03, effektiv vergi .10, uyğun proqramda mağaza faizi .15 → hər ödənişdən ≈$2.99 qalıq. 100,000 pulsuz install olarsa:

- 1% unlock → 1,000 alıcı → təxminən $2,992;
- 3% unlock → 3,000 alıcı → təxminən $8,976;
- 5% unlock → 5,000 alıcı → təxminən $14,961.

Konversiya faizləri nümunədir, janr benchmark-ı deyil. 3% nümunəsində hər install üzrə unlock gəliri təxminən $0.09 olur. Ödənişli install xərci bunun üzərindədirsə yalnız bu unlock gəliri ilə reklam alışını mənfəətlə böyütmək olmaz. Organik install pulsuz marketinq əməyini də sıfır iqtisadi xərcə çevirmir.

Portun ƏLAVƏ xərci hipotetik $5,000 olsa, $2.99/alıcı ilə təxminən 1,672 əlavə alıcı tələb olunur; 3% unlock fərziyyəsində təxminən 55.7 min install. Steam-də artıq yaranmış bütün development xərcini mobilə ikinci dəfə yükləmək olmaz, amma əlavə port və support xərcini görməzliyə vurmaq da olmaz.

**Reklam modeli:** ad LTV = ömürboyu hər install üçün həqiqətən göstərilmiş reklam sayı × developer üçün realised eCPM / 1000. Hipotetik 30 reklam × $5 eCPM /1000 = $0.15/install. 100,000 install → $15,000 reklam gəliri; hələ UA/support/port xərclərindən əvvəl. Buradakı 30 və $5 bazar proqnozu deyil. “Reklam cəhdi” sayı götürülərsə fill/show rate ayrıca vurulur; faktiki impression sayına onu yenidən vurmaq olmaz. Developer realised eCPM mağaza 15/30% IAP komissiyası ilə avtomatik bir daha kəsilmir.

**Ödənişli böyümə şərti:** realised lifetime contribution per install > CPI + dəyişən xidmət xərci. Təkcə D1 retention və ya çox download buna sübut deyil; D7/D30 retention, hər cohort-un unlock konversiyası, reklam impression-u, realised LTV və payback müddəti ölçülməlidir. Sonlu kampaniyada uzun LTV fərziyyəsi xüsusilə ehtiyat tələb edir. Subscription və ya Apple Arcade kimi müqavilə yolu ayrıca danışıqlardır; ödənişi açıq bilinmədiyinə görə büdcəyə zəmanətli gəlir kimi salınmasın.

### Gaps
- Steam və mobile üçün bu janrın ölçülmüş əldəolunan bazar ölçüsü, Dual Grid CPI/LTV/retention və unlock benchmark-ı yoxdur. Bütün mobil “puzzle” gəlirini bizim TAM kimi istifadə etmək olmaz.
- Azərbaycandan developer qeydiyyatı, merchant ödənişləri, bank transferi və konkret vergi tutulmasının uyğunluğu bu araşdırmada yoxlanılmayıb; istifadəçinin hüquqi hesab məlumatları olmadan uyğunluq fərz edilmir.
- Konkret mobile eCPM və CPI demək üçün ölkə, OS, auditoriya, reklam formatı və ölçülmüş kampaniya lazımdır. Vendor uğur hekayələri tipik nəticə deyil.
