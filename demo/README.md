# DUAL GRID · Müxtəlif məntiq kombinasiyaları · v0.7.0

Əsas oyunda 28 seçilmiş mərhələ var: ilk 5 təlim, 14 fərqli klassik xəritə və 9 ayrıca dizayn edilmiş kombinasiya (65–73). Nömrələr əvvəlki linklərin qorunması üçün saxlanılıb.

## Təkrarsız seçim

Eyni xəritənin dönmüş/güzgülü versiyaları, yalnız başlanğıc/hədəfi dəyişən variantları və hər mərhələyə tətbiq olunan eyni açar–xal–şalter dövrəsi əsas oyundan çıxarılıb. 6–22 məşq arxivi və təkrarlanan klassik səhnələr menyuda göstərilmir. Köhnə klassik nömrə çağırıldıqda onun saxlanmış əsas nümunəsi açılır.

65 bir dəfəlik körpü, açar və qapı nümunəsi kimi qalır. 66–73 onun davam klonları deyil:

- 66: relay təhvili + bloklara görə fərqli idarə oxları + qırılan dayaq.
- 67: kütləni bölüşdürmə + domino/kub ölçüsü + alçaq tir + forma kilidi.
- 68: yalnız yüngül blokun ala bildiyi açar + birtərəfli qırılan gediş + dörd kontaktlı AND körpüsü.
- 69: iki vəziyyətli F şalteri bir qapını açıb digərini bağlayır; hər iki bloku əvvəl orta otağa yerləşdirmək lazımdır.
- 70: sensor ardıcıllığı + ziyarət büdcəsi + 90° rotor + mərhələ ilə açılan yan yollar.
- 71: böyük kub və kiçik blok üçün iki fərqli körpü, yük həddi və relay.
- 72: böyümə küncü + dörd kontakt + relay təhvili + kiçilib alçaq keçiddən keçmək və yenidən böyümək.
- 73: iki perpendikulyar boşluqda partnyor yaxınlığı + orta adada dönən koordinatlar.

Qırmızı kölgə/klon ailəsi M4 bütün aktiv oyun və laboratoriya siyahılarından çıxarılıb. Gecikən təqibçi və görünməyən zaman növbəsi yoxdur. İki idarə olunan A/B qəhrəmanı qalır.

Yeni tapmacaların sertifikatlı ən qısa həlləri 15–38 əmrdir. Çətinlik yalnız yol uzunluğu ilə ölçülmür; insanlarla playtest yenə lazımdır. Bütün yeni xəritələrdə eyni mükafat toplama dövrəsi yoxdur: açar/xal yalnız onu tələb edən tapmacada görünür.

## Açmaq və idarə

START-DEMO.cmd yerli serveri və brauzeri açır. Mənbədən npm start; ünvan http://127.0.0.1:4173. Yeni kombinasiyalar campaign.html səhifəsindədir. Paket Windows x64 Node runtime və lokal Three.js ehtiva edir; oyun zamanı internet/npm lazım deyil. Bitirəndə STOP-DEMO.cmd serveri bağlayır.

Oxlar/WASD: yuvarlan. Tab/kart: A/B seç. G: yalnız meydançada ölçü dəyiş. X: böyümə küncü. F: yaxın şalter. H: cari vəziyyətdən konkret addım. Z: bütün son əmri geri al. R: sıfırdan başla. Şalter qapının üstündəki bloku sıxmır: belə bağlanma rədd edilir. Mənfi işarəli meydança yalnız kiçilməyə icazə verir.

Açarlar yalnız olduqları səhnədə məcburidir. Z/R inventarı, dövrəni, qırılan plitəni və ölçünü də qaytarır. Statistikalar brauzerdə saxlanır; dəyişmiş mərhələlərin köhnə rekordları yeni rekord sayılmır.

## Yoxlamalar

npm test — həll sertifikatları, təkrarsız xəritə yoxlaması, fiziki toqquşma, iki vəziyyətli qapı təhlükəsizliyi və əsas mexanikaların yan keçilməməsi.
node tests/browser.mjs — seçilmiş klassik və yeni səhnələrin həqiqi brauzer nəzarətçisində oynanması, kömək worker-i və vizual nəzarət.
node tests/build-journey.mjs — ayrıca dizayn edilmiş səhnələrin həllərini və istinad laboratoriyası sertifikatlarını hazırlayır.
powershell -File build-portable.ps1 — portativ Windows ZIP-i hazırlayır.

Təkrar yoxlaması başlanğıc/hədəf/əşyaları saymır; xəritələr səkkiz dönmə/güzgüləmə altında müqayisə olunur. Bir səhnənin başlanğıcını dəyişmək yeni səhnə sayılmır.

43 sınaqlı köhnə mod istinad laboratoriyası lab.html-də arxiv kimi qalır; əsas oyun menyusuna daxil deyil. M5 və N ailəsinin əvvəl yoxlanmamış tərifləri dəyişdirilməyib. M4 orada da çıxarılıb.

## Yeni yoxlama bölməsi: tower.html

İlk məkan paketindəki səviyyələr: V1–V2 lift, S1–S5 ölçü, H1 biristifadəlik zəmin, H2 əks qapılar və alternativ qayıdış, H3 enerji təlimi, H4 iki blok arasında enerji bölgüsü, H5 portal təlimi, H6 çoxmərtəbəli enerji və portal kombinasiyası. V3 və S6 qazıntılı nümunələri aktiv siyahıdan çıxarılıb; yalnız keçmiş məlumat və geriyə uyğunluq testləri üçün saxlanır.

G ölçü; F lift/şalter; P portal; Q/E terminala enerji qoy/götür; T qonşu partnyora token ver; H hazırkı vəziyyətdən konkret növbəti addım; Z tam vəziyyəti geri alır. A işarəli terminaldan yalnız A enerji götürür. A/B işarəli portallar həmin blok üçündür. Siçan təkəri böyüdür/kiçildir, iki klik görünüşü sıfırlayır.

BFS həlləri, enerji qorunması, məcburi mexanizm yoxlamaları və 13 xəritənin dönmə/güzgü müqayisəsi tests/advanced-chapter.test.mjs-də yoxlanır. tests/tower-browser.mjs real klaviatura ilə oynayır, kömək və undo-nu sınaqdan keçirir. Səviyyələrin dizayn çətinliyi ilkin qiymətdir, oyunçu rəyi ilə düzəldilməlidir. Yekun buraxılış qrafikası deyil.

Əsas kampaniyada 28, bu bölmədə 13 aktiv səviyyə var: cəmi 41. Arxiv laboratoriyası bu saya daxil deyil. Növbəti paketlər mərhələli hazırlanır; məqsəd təkrar şablonlarla say doldurmaq deyil.

2026-11-09 ikinci əlavə: F1–F6 üzlər bölməsi — alt kontakt, yan terminal, izolyasiya və möhür sırası ayrıca, sonra ölçü/lift və enerji/portal ilə birlikdə. Blokun altı üzü nömrələnir; cari və növbəti alt üz paneldə göstərilir. Yeni bölmə 19, əsas kampaniya ilə birlikdə 47 aktiv səviyyədir. Modların və 46 alt elementin statusu reports/MOD-STATUS.md-dədir (layihə kökündə).


Koordinat bölməsi R1–R6: tərs zona, 90 dərəcə rotor, yadda qalan polarite və iki blokun ayrı oxları; sonra lift/enerji və üz/forma/portal kombinasiyaları. Canlı kompas düymə əmri ilə dünya hərəkətini ayırır, hint real basılacaq düyməni deyir. Yeni bölmədə 25, əsas kampaniya ilə birlikdə 53 aktiv səviyyə var. 127 test keçib.


Divar bölməsi W1–W6: K pultu ilə panel, SPACE ilə növbəli piston, geri dönməyən daralma, ölçüyə uyğun alçaq tir, partnyor əyləci və qarışıq ekspert. Real vaxt sayğacı yoxdur; panel yalnız qəbul edilmiş əmrdən sonra hərəkət edir. Hərəkətin bütün süpürdüyü yol yoxlanır, blokun içindən keçmək rədd edilir. Qızılı tel kontur növbəti yeri göstərir. Yeni bölmə 31, əsas kampaniya ilə birlikdə 59 aktiv səviyyədir. 133 test keçib.


Rezonans bölməsi B1–B6: eyni xətt, Manhattan məsafə limiti, iki həqiqi domino üçün perpendikulyar orientasiya, eyni/əks cüt addım və enerji/portal/panel kombinasiyaları. L rejimi yalnız iki blok bağ stansiyasında olanda dəyişir. Uyğunsuz cüt addımda hər iki blok yerində qalır. Domino ölçüləri və bütün məqsəd izi həqiqidir. Yeni bölmə 37, əsas Səyahət xəritəsi 65 aktiv səviyyədir. 139 test keçib.


Bağlantı bölməsi T1–T6: cüt portal, 90/270 dərəcə dönən tikiş, kiçik kub üçün açıq sarınan kənar, sensorla seçilən ünvan, ölçü/üz və domino/enerji kombinasiyaları. Bir P yalnız bir keçid edir; təyinat başlanğıc vəziyyətindən seçilir. Tam bədən, boş yer və dayaq keçiddən sonra yoxlanır. Aktiv ünvan və çıxış gövdəsi göstərilir. Yeni bölmədə 43, əsas Səyahət xəritəsində 71 aktiv səviyyə var. 145 test keçib.


Zəmin yaddaşı G1–G6: hər hüceyrənin giriş büdcəsi, iki rejimli enerji döşəməsi, digər blokun Manhattan müşahidəsi, açar sırası, uzaq portal adasının sabitləşməsi və enerji/relay/birtərəfli qayıdış kombinasiyası. Son giriş plitəsi son blok çıxana qədər dayanır; oyuncu öz müşahidəsi ilə özünə dayaq yarada bilməz. Boşluq tel konturla, işlək dayaq dolu plitə ilə göstərilir. Yeni bölmə 70, əsas Səyahət xəritəsi 98 aktiv səviyyədir.



## Yumşaq öyrənmə ardıcıllığı — 2026-11-09

21 yeni fərqli xəritə, 7 çətinlik pilləsi: asan, asan+, ortaya keçid, orta, orta+, çətin, ekspert. İlk beş giriş səviyyəsindən sonra V0-a keçilir; hər ailədə ayrıca məşq və kombinasiya var. Beş ekspert sınağı yeni mexanizm kursunun sonundadır. Bütün səviyyələr menyudan sərbəst açılır.

TC1–TC3: açarı götür, sandığa eyni mərtəbədə üfüqi qonşuluqda F ilə yaxınlaş, yeni açarı al, P ilə portalı aç. Sandıq fiziki maneə olaraq qalır; qapaq açılır və mükafat bloka doğru uçur. TC2 lift, TC3 iki sandıq və dörd ada/ünvan seçicisi əlavə edir. Undo açarları və sandığın vəziyyətini də qaytarır.
