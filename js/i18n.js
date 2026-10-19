/**
 * DV2027.UZ - Internationalization (i18n) Engine
 * O'zbekcha (UZ) va Ruscha (RU) tillari to'liq qo'llab-quvvatlanadi
 */

const translations = {
  uz: {
    // Navigation
    nav_about: "Dastur haqida",
    nav_features: "Afzalliklar",
    nav_steps: "Bosqichlar",
    nav_photo: "Foto talablari",
    nav_pricing: "Tariflar",
    nav_faq: "Savollar",
    nav_apply: "Anketa to'ldirish",

    // Hero Section
    hero_badge_status: "DV-2027 MAVSUMI QABULI OCHIQ",
    hero_badge_gov: "AQSH DAVLAT DASTURI",
    hero_badge_chance: "🔥 2 ta Anketa (Er-xotin 2X Imkoniyat)",
    hero_title: "Amerika Orzusiga Ishonchli Qadam.<br><span class=\"highlight-red\">Tez</span>, <span class=\"highlight-blue\">Qonuniy</span> va 100% Xatosiz.",
    hero_subtitle: "AQSh Davlat Departamenti dasturida qatnashing. Uydan chiqmasdan 5 daqiqa ichida anketa to'ldiring. Mutaxassislarimiz ma'lumotlaringizni tekshirib, rasmiy bazadan o'tkazishadi va shaxsiy Confirmation Number kodini Telegram orqali taqdim etishadi.",
    hero_btn_apply: "Anketa to'ldirish",
    hero_btn_tg: "Telegram kanalimiz (@greencarddv_2027)",

    // Quick Bar
    quick_tab_single: "Bo'ydoq (Yolg'iz)",
    quick_tab_family: "Oilali (2X Imkoniyat)",
    quick_badge_hot: "Yutuq 2x",
    quick_lbl_name: "Ism va Familiya",
    quick_ph_name: "Masalan: Alisher Valiyev",
    quick_lbl_birth: "Tug'ilgan sana",
    quick_lbl_region: "Yashash viloyati",
    quick_lbl_phone: "Telefon raqam",
    quick_btn_submit: "Arizani boshlash",
    quick_trust_text: "100% rasmiy tasdiqlangan Confirmation Number beriladi",
    quick_trust_sub: "To'lov faqat ariza tekshirilib muvaffaqiyatli topshirilgach to'lanadi.",

    // Features Section
    feat_tag: "Ishonch va Natija",
    feat_title: "Nega DV2027.UZ Orqali Ro'yxatdan O'tish Kerak?",
    feat_desc: "Har bir anketani AQSh immigratsion talablariga to'liq moslab, 100% xatosiz va rasmiy tartibda topshiramiz.",
    feat_card1_badge: "Yillik Viza Kvotasi",
    feat_card1_title: "55,000 Yillik Rasmiy Kvota",
    feat_card1_desc: "Har yili dunyo bo'yicha 55 ming kishi bepul doimiy yashash va ishlash huquqini qo'lga kiritadi.",
    feat_card2_badge: "2 Barobar Imkon",
    feat_card2_title: "2X Yutish Imkoniyati",
    feat_card2_desc: "Oilali fuqarolar uchun er va xotinga 2 ta mustaqil anketa to'ldiriladi va yutuq ehtimoli 200% oshadi.",
    feat_card3_badge: "100% Rasmiy Kod",
    feat_card3_title: "Rasmiy Confirmation Number",
    feat_card3_desc: "AQSh Davlat Departamenti travel.state.gov bazasidan olingan individual kod to'liq sizga taqdim etiladi.",
    feat_card4_badge: "Ekspert Nazorati",
    feat_card4_title: "Qat'iy Foto Nazorat va Audit",
    feat_card4_desc: "Fotosuratlaringiz 600x600 px va 5x5 sm formatiga, yuz proporsiyalariga to'liq professional moslanadi.",

    // Stats
    stat_1_num: "55,000+",
    stat_1_lbl: "Yillik rasmiy viza kvotasi",
    stat_2_num: "99.8%",
    stat_2_lbl: "Arizalarning xatosiz tasdiqlanishi",
    stat_3_num: "15,000+",
    stat_3_lbl: "Muvaffaqiyatli topshirilgan anketalar",
    stat_4_num: "24/7",
    stat_4_lbl: "Telegram @greencarddv_2027 yordam",

    // Steps
    steps_tag: "Bosqichma-bosqich",
    steps_title: "Anketa Topshirishdan Viza Olishgacha",
    steps_desc: "Amerika vizasini qo'lga kiritish jarayoni qanday kechishini sodda 5 ta qadamda bilib oling.",
    step1_title: "Onlayn Ariza",
    step1_desc: "Saytimiz orqali anketani to'ldirasiz va oddiy smartfon suratini yuklaysiz.",
    step2_title: "Ekspert Auditi",
    step2_desc: "Mutaxassislarimiz barcha ma'lumotlarni ingliz tiliga tarjima qilib, rasmingizni 600x600 px formatiga moslaydi.",
    step3_title: "Rasmiy Ro'yxat",
    step3_desc: "Ma'lumotlar AQSh Davlat departamenti rasmiy bazasiga kiritiladi va Confirmation Number beriladi.",
    step4_title: "Natija Chiqishi",
    step4_desc: "May oyida shaxsiy kodingiz orqali rasmiy natijangizni tekshirib beramiz va g'oliblik xushxabarini yetkazamiz.",
    step5_title: "Elchixona & Viza",
    step5_desc: "G'olib bo'lgach, DS-260 anketasi to'ldiriladi, tibbiy ko'rik va AQSh elchixonasidagi suhbatdan so'ng viza olasiz.",

    // Photo Rules
    photo_tag: "Rasmiy Standart",
    photo_heading: "Green Card Rasmiga Qo'yiladigan Talablar",
    photo_subheading: "Noto'g'ri fotosurat sababli arizalarning 30% dan ko'prog'i avtomatik bekor qilinadi. Quyidagi 5 ta asosiy qoidaga e'tibor bering:",
    rule_1: "<strong>Oq yoki och fon:</strong> Orqa fonda hech qanday soya, naqsh yoki begona buyumlar bo'lmasligi kerak.",
    rule_2: "<strong>So'nggi 6 oy ichida tushilgan:</strong> Surat hozirgi tashqi ko'rinishingizga to'liq mos bo'lishi shart.",
    rule_3: "<strong>Ko'zoynak va bosh kiyimsiz:</strong> Quyosh yoki optik ko'zoynak, quloqchin va shlyapalarga ruxsat berilmaydi (diniy hijobda yuz to'liq ochiq bo'lishi zarur).",
    rule_4: "<strong>To'g'riga qaragan neytral mimika:</strong> Yuz kameraga to'g'ri qaragan, tabassumsiz va og'iz yopiq bo'lishi kerak.",
    rule_5: "<strong>Tabiiy yorug'lik:</strong> Hech qanday go'zallik filtrlari, retush yoki sun'iy fotoshop ishlatilmagan bo'lishi lozim.",
    photo_note: "<strong>Eslatma:</strong> Rasm o'lchamini o'zingiz to'g'rilashingiz shart emas! Shunchaki oq devor oldida tushgan rasmingizni yuklang — mutaxassislarimiz uni 600x600 px va 5x5 sm xalqaro standartiga o'zlari moslashtirib berishadi.",
    sample_good_badge: "✓ To'g'ri namuna",
    sample_good_title: "Standartga to'liq mos",
    sample_good_desc: "Oq fon, to'g'ri nigoh, tiniq yorug'lik",
    sample_bad_badge: "✕ Noto'g'ri namuna",
    sample_bad_title: "Rad etiladi (Bekor bo'ladi)",
    sample_bad_desc: "Ko'zoynak, qorong'u, selfi va soya",

    // Pricing
    pricing_tag: "Shaffof Narxlar",
    pricing_title: "O'zingizga Mos Tarifni Tanlang",
    pricing_desc: "Hech qanday yashirin to'lovlarsiz. To'lov faqat anketa to'liq tekshirilib rasmiy tizimdan o'tkazilgach amalga oshiriladi.",
    plan1_name: "Bo'ydoq (Yolg'iz) Anketa",
    plan1_desc: "Turmush qurmagan yoki yolg'iz ishtirokchilar uchun",
    plan1_currency: "so'm / 1 marta",
    plan1_f1: "1 kishi uchun to'liq rasmiy ro'yxatdan o'tkazish",
    plan1_f2: "Fotosuratni 600x600 px formatiga professional moslash",
    plan1_f3: "Ma'lumotlarni ingliz tiliga rasmiy transliteratsiya qilish",
    plan1_f4: "Telegram orqali rasmiy Confirmation Number taqdim etish",
    plan1_f5: "May oyida natijalarni bepul tekshirib berish",
    plan1_btn: "Anketani boshlash",

    plan2_badge: "Eng Mashhur / Yutuq 2x",
    plan2_name: "Oilaviy Anketa (2X Imkoniyat)",
    plan2_desc: "Er-xotin va 21 yoshgacha bo'lgan barcha farzandlar uchun",
    plan2_currency: "so'm / Oila uchun",
    plan2_f1: "<strong>Er va xotin nomiga alohida 2 ta to'liq anketa</strong> (yutish ehtimoli 2 barobar yuqori)",
    plan2_f2: "21 yoshgacha barcha bolalar anketaga bepul kiritiladi",
    plan2_f3: "Barcha oila a'zolari fotosuratlarini 600x600 standartiga moslash",
    plan2_f4: "Telegram orqali 2 ta alohida rasmiy Confirmation kod taqdim etish",
    plan2_f5: "G'olib bo'lgach elchixona va hujjatlar bo'yicha bepul yo'l-yo'riq",
    plan2_btn: "Shu tarifni tanlash (Yutuq 2X)",

    // Main Form
    form_top_badge: "DV-2027 Rasmiy Anketa",
    form_title: "Green Card DV-2027 Onlayn Anketa Formasi",
    form_desc: "Barcha ma'lumotlarni xorijiy yoki ichki pasportingizdagidek lotin harflarida to'ldiring. Mutaxassislarimiz arizani tekshirib, tasdiq kodini Telegram orqali yuborishadi.",
    step_node_1: "Asosiy Arizachi",
    step_node_2: "Oila Ma'lumotlari",
    step_node_3: "Tasdiqlash",
    form_sec1_title: "1. Asosiy Ariza Beruvchi Ma'lumotlari",
    lbl_last_name: "Familiya (Last Name)",
    lbl_first_name: "Ism (First Name)",
    lbl_middle_name: "Otasining ismi (Middle Name)",
    ph_last_name: "Lotincha (masalan: Valiyev)",
    ph_first_name: "Lotincha (masalan: Alisher)",
    ph_middle_name: "Mavjud bo'lsa (ixtiyoriy)",
    lbl_gender: "Jinsi",
    gender_male: "Erkak (Male)",
    gender_female: "Ayol (Female)",
    lbl_birth_date: "Tug'ilgan sana (Kun, Oy, Yil)",
    lbl_country: "Tug'ilgan mamlakat",
    lbl_region: "Tug'ilgan viloyat",
    lbl_city: "Tug'ilgan tuman yoki shahar",
    ph_city: "Masalan: Chilonzor tumani",
    lbl_education: "Ta'lim darajangiz",
    lbl_address: "Hozirgi yashash manzili",
    ph_address: "Shahar, ko'cha, uy/xonadon raqami",
    lbl_phone: "Telefon raqamingiz",
    hint_phone: "Confirmation Number va natijalar ushbu raqamga yuboriladi",
    lbl_telegram: "Telegram Username (@username)",
    hint_telegram: "Mutaxassislarimiz aloqaga chiqishi uchun",
    lbl_photo_main: "Asosiy arizachining 5x5 (600x600 px) fotosurati",
    upload_title: "Suratni yuklash uchun bosing yoki bu yerga tashlang",
    upload_desc: "Oq fonda, so'nggi 6 oy ichida olingan tiniq surat (JPG, PNG)",
    upload_ready: "Surat muvaffaqiyatli yuklandi (Auditga yuboriladi)",
    btn_remove: "O'chirish",

    form_sec2_title: "2. Oilaviy Holat va Bolalar",
    lbl_marital: "Oilaviy holatingiz",
    opt_single: "Turmush qurmagan (Bo'ydoq)",
    opt_married: "Oilali (Turmush qurgan)",
    opt_divorced: "Qonuniy ajrashgan",
    opt_widowed: "Beva (Turmush o'rtog'i vafot etgan)",
    lbl_children: "21 yoshgacha bo'lgan bo'ydoq farzandlaringiz soni",
    opt_child_0: "0 ta (Farzandlarim yo'q)",
    opt_child_1: "1 ta farzand",
    opt_child_2: "2 ta farzand",
    opt_child_3: "3 ta farzand",
    opt_child_4: "4 ta farzand",
    opt_child_5: "5 ta farzand",

    spouse_block_title: "Turmush o'rtog'ingiz ma'lumotlari (2X Imkoniyat)",
    lbl_spouse_photo: "Turmush o'rtog'ingizning 5x5 (600x600 px) fotosurati",

    consent_text: "Kiritilgan barcha shaxsiy ma'lumotlar haqiqiy va fotosuratlar AQSh Davlat Departamenti talablariga muvofiq ekanligini tasdiqlayman. Ma'lumotlarimni DV-2027 lotereyasiga rasmiy topshirish uchun mutaxassislar xizmatidan foydalanishga roziman.",
    btn_submit_form: "Anketani Rasmiylashtirish va Yuborish",
    form_guarantee_text: "🔒 Ma'lumotlaringiz shifrlangan kanal orqali 100% maxfiy saqlanadi va uchinchi shaxslarga berilmaydi.",

    // FAQ
    faq_tag: "Savol-Javoblar",
    faq_title: "DV-2027 Dasturi Bo'yicha Barcha Savollar",
    faq_desc: "Lotereya qoidalari, talablar va jarayon bo'yicha eng muhim ma'lumotlar.",
    faq_q1: "Qizil (xorijiy) pasport shartmi yoki oddiy pasport yetarlimi?",
    faq_a1: "Yo'q, yangilangan rasmiy qoidalarga ko'ra ariza topshirish vaqtida xorijiy qizil pasport majburiy emas. Siz O'zbekiston ID-kartasi yoki oddiy ichki pasportingiz bilan bemalol ariza to'ldirishingiz mumkin. Faqatgina g'olib bo'lganingizdan so'ng viza olish uchun xorijiy pasport talab etiladi.",
    faq_q2: "Rasmiy Confirmation Number qachon va qanday beriladi?",
    faq_a2: "Anketangiz va fotosuratingiz mutaxassislarimiz tomonidan qat'iy tekshirilib, AQSh Davlat Departamentining rasmiy dvprogram.state.gov portaliga kiritilgach, tizim tomonidan berilgan tasdiqlangan rasmiy Confirmation Number (tasdiqlash kodi) shaxsan sizga Telegram orqali taqdim etiladi.",
    faq_q3: "Oilali bo'lsam \"2 ta imkoniyat\" nima degani?",
    faq_a3: "Qonuniy nikohda bo'lgan er-xotinlar uchun alohida 2 ta to'liq anketa topshiriladi: birinchi anketada er asosiy arizachi, xotin oila a'zosi bo'ladi. Ikkinchi anketada esa xotin asosiy arizachi, er oila a'zosi bo'ladi. Ikkisidan biri yutgan taqdirda ham, butun oila (er, xotin va 21 yoshgacha bo'lgan barcha farzandlar) birdek Green Card olib AQShga jo'naydi!",
    faq_q4: "Kichik chaqaloqlar va bolalar uchun ham fotosurat kerakmi?",
    faq_a4: "Ha, AQSh immigratsion qoidalariga ko'ra oilaning barcha 21 yoshgacha bo'lgan farzandlari (hatto yangi tug'ilgan chaqaloqlar ham) anketaga alohida 5x5 fotosurati bilan kiritilishi shart. Aks holda kelgusida suhbatda anketa rad etilishi mumkin.",
    faq_q5: "May oyida natijalarni qanday tekshiramiz?",
    faq_a5: "Har yili may oyida rasmiy portalda natijalar e'lon qilinadi. Sizga taqdim etilgan Confirmation kod orqali natijani o'zingiz tekshirishingiz mumkin yoki mutaxassislarimiz uni siz uchun bepul tekshirib, g'olib bo'lsangiz darhol xabar berishadi.",

    // Telegram Card
    tg_badge: "Rasmiy Kanalimiz",
    tg_title: "Rasmiy Telegram Kanalimizga Qo'shiling",
    tg_desc: "Eng so'nggi yangiliklar, lotereya sanalari, bepul viza maslahatlari va yutuq natijalarini birinchilardan bo'lib bilib boring.",
    tg_box_title: "Rasmiy Kanal Manzili",
    tg_btn_join: "Kanalga A'zo Bo'lish (@greencarddv_2027)",

    // Footer
    footer_about: "AQSh Green Card DV-2027 Diversity Visa dasturi uchun fuqarolarga qonuniy, tezkor va professional onlayn ro'yxatdan o'tish xizmati.",
    footer_col1: "Tezkor Havolalar",
    footer_col2: "Bog'lanish & Yordam",
    footer_hours: "Ish vaqti: 24/7 Onlayn qabul",
    footer_coverage: "Barcha viloyatlar bo'yicha",
    footer_disclaimer: "<strong>Rasmiy Bildirishnoma (Disclaimer):</strong> DV2027.UZ xususiy konsalting va axborot-texnologiya xizmati hisoblanadi hamda AQSh Davlat Departamenti (US Department of State) yoki AQSh Elchixonasining rasmiy portali emas. Saytimiz arizalarni xalqaro standartlar asosida xatosiz rasmiylashtirish va texnik yordam ko'rsatish vazifasini bajaradi.",
    footer_copy: "DV2027.UZ. Barcha huquqlar himoyalangan.",
    footer_rights: "Xavfsiz va Qonuniy Green Card Ro'yxatdan O'tish Xizmati",

    // Modal
    modal_title: "Arizangiz Qabul Qilindi!",
    modal_subtitle: "Ma'lumotlaringiz va fotosuratlaringiz mutaxassislarimizga yetib bordi. Arizangiz tekshirilib, rasmiy tasdiqlash kodi beriladi.",
    modal_code_lbl: "Sizning Shaxsiy Ariza Raqamingiz:",
    modal_lbl_applicant: "Arizachi:",
    modal_lbl_plan: "Tanlangan tarif:",
    modal_lbl_price: "To'lov summasi:",
    modal_btn_tg: "Telegram orqali tasdiqlash (@greencarddv_2027)",
    modal_btn_copy: "Kodni nusxalash",
    modal_btn_close: "Yopish",
    modal_pay_note: "To'lov rekvizitlari (Click / Payme) va rasmiy Confirmation Number arizangiz tekshirilgach operatorimiz tomonidan Telegram orqali taqdim etiladi."
  },

  ru: {
    // Navigation
    nav_about: "О программе",
    nav_features: "Преимущества",
    nav_steps: "Этапы",
    nav_photo: "Требования к фото",
    nav_pricing: "Тарифы",
    nav_faq: "Вопросы (FAQ)",
    nav_apply: "Заполнить анкету",

    // Hero Section
    hero_badge_status: "ПРИЁМ ЗАЯВОК DV-2027 ОТКРЫТ",
    hero_badge_gov: "ГОСПРОГРАММА США",
    hero_badge_chance: "🔥 2 анкеты (2X Шанс для супругов)",
    hero_title: "Надёжный шаг к Американской Мечте.<br><span class=\"highlight-red\">Быстро</span>, <span class=\"highlight-blue\">Законно</span> и без Ошибок.",
    hero_subtitle: "Участвуйте в официальной программе Госдепартамента США. Заполните анкету за 5 минут, не выходя из дома. Наши эксперты проверят данные, зарегистрируют в официальной базе и отправят Confirmation Number в Telegram.",
    hero_btn_apply: "Заполнить анкету",
    hero_btn_tg: "Наш Telegram-канал (@greencarddv_2027)",

    // Quick Bar
    quick_tab_single: "Холост (Один заявитель)",
    quick_tab_family: "В браке (Шанс 2X)",
    quick_badge_hot: "Выигрыш 2X",
    quick_lbl_name: "Имя и Фамилия",
    quick_ph_name: "Например: Алишер Валиев",
    quick_lbl_birth: "Дата рождения",
    quick_lbl_region: "Регион проживания",
    quick_lbl_phone: "Номер телефона",
    quick_btn_submit: "Начать заявку",
    quick_trust_text: "Выдаётся 100% официальный подтверждённый Confirmation Number",
    quick_trust_sub: "Оплата производится только после успешной проверки и регистрации заявки.",

    // Features Section
    feat_tag: "Доверие и Результат",
    feat_title: "Почему стоит подавать заявку через DV2027.UZ?",
    feat_desc: "Каждая анкета оформляется в строгом соответствии с требованиями иммиграционной службы США, без ошибок и официально.",
    feat_card1_badge: "Ежегодная квота виз",
    feat_card1_title: "55,000 Ежегодная квота виз",
    feat_card1_desc: "Ежегодно 55 тысяч человек со всего мира получают право на постоянное проживание и работу в США.",
    feat_card2_badge: "Двойной шанс",
    feat_card2_title: "2X Шанс на выигрыш",
    feat_card2_desc: "Для состоящих в браке подаются 2 независимые анкеты от мужа и жены, удваивая вероятность выигрыша на 200%.",
    feat_card3_badge: "100% Официальный код",
    feat_card3_title: "Официальный Confirmation Number",
    feat_card3_desc: "Индивидуальный номер подтверждения из официальной базы travel.state.gov передаётся лично вам.",
    feat_card4_badge: "Экспертный аудит",
    feat_card4_title: "Строгий фотоконтроль и аудит",
    feat_card4_desc: "Ваши фотографии профессионально адаптируются под международный формат 600x600 px и 5x5 см.",

    // Stats
    stat_1_num: "55,000+",
    stat_1_lbl: "Ежегодная официальная квота виз",
    stat_2_num: "99.8%",
    stat_2_lbl: "Безошибочное утверждение заявок",
    stat_3_num: "15,000+",
    stat_3_lbl: "Успешно зарегистрированных анкет",
    stat_4_num: "24/7",
    stat_4_lbl: "Поддержка в Telegram @greencarddv_2027",

    // Steps
    steps_tag: "Пошаговый процесс",
    steps_title: "От подачи анкеты до получения визы",
    steps_desc: "Узнайте, как проходит весь процесс получения визы в США в 5 простых шагов.",
    step1_title: "Онлайн заявка",
    step1_desc: "Вы заполняете простую анкету на сайте и прикрепляете обычную фотографию со смартфона.",
    step2_title: "Экспертный аудит",
    step2_desc: "Наши специалисты переводят данные на английский язык и форматируют фото под стандарт 600x600 px.",
    step3_title: "Официальная регистрация",
    step3_desc: "Данные вносятся в базу Госдепартамента США, и вам выдаётся личный номер подтверждения.",
    step4_title: "Объявление итогов",
    step4_desc: "В мае мы бесплатно проверяем ваш статус по коду и сразу сообщаем радостную новость о победе.",
    step5_title: "Посольство и Виза",
    step5_desc: "После победы заполняется форма DS-260, проходятся медосмотр и собеседование в посольстве США.",

    // Photo Rules
    photo_tag: "Официальный стандарт",
    photo_heading: "Требования к фотографии на Green Card",
    photo_subheading: "Более 30% анкет дисквалифицируются роботом из-за неправильной фотографии. Обратите внимание на 5 правил:",
    rule_1: "<strong>Белый или светлый однородный фон:</strong> Без теней, узоров, предметов и посторонних лиц на заднем плане.",
    rule_2: "<strong>Сделана за последние 6 месяцев:</strong> Фотография должна точно отражать ваш текущий внешний вид.",
    rule_3: "<strong>Без очков и головных уборов:</strong> Солнцезащитные и оптические очки запрещены (в хиджабе лицо должно быть полностью открыто).",
    rule_4: "<strong>Нейтральное выражение лица:</strong> Взгляд направлен строго в камеру, без улыбки, рот закрыт.",
    rule_5: "<strong>Естественное освещение:</strong> Без фильтров красоты, ретуши и искусственной обработки в Photoshop.",
    photo_note: "<strong>Примечание:</strong> Вам не нужно самостоятельно подгонять размер! Просто загрузите фото на светлом фоне — наши эксперты бесплатно адаптируют его под стандарт 600x600 px и 5x5 см.",
    sample_good_badge: "✓ Правильный образец",
    sample_good_title: "Полное соответствие стандарту",
    sample_good_desc: "Белый фон, прямой взгляд, равномерный свет",
    sample_bad_badge: "✕ Неправильный образец",
    sample_bad_title: "Дисквалификация (Отказ)",
    sample_bad_desc: "Очки, темнота, селфи и тени",

    // Pricing
    pricing_tag: "Прозрачные цены",
    pricing_title: "Выберите подходящий тариф",
    pricing_desc: "Никаких скрытых платежей. Оплата производится только после полной проверки и успешной регистрации анкеты.",
    plan1_name: "Холост (Индивидуальная анкета)",
    plan1_desc: "Для не состоящих в браке или индивидуальных участников",
    plan1_currency: "сум / 1 раз",
    plan1_f1: "Полная официальная регистрация для 1 человека",
    plan1_f2: "Профессиональная адаптация фото под стандарт 600x600 px",
    plan1_f3: "Официальная транслитерация паспортных данных",
    plan1_f4: "Выдача официального Confirmation Number в Telegram",
    plan1_f5: "Бесплатная проверка результатов в мае",
    plan1_btn: "Начать анкету",

    plan2_badge: "Самый популярный / Шанс 2X",
    plan2_name: "Семейная анкета (Шанс 2X)",
    plan2_desc: "Для супругов и всех неженатых детей до 21 года",
    plan2_currency: "сум / На семью",
    plan2_f1: "<strong>2 отдельные полные анкеты на мужа и жену</strong> (шанс на выигрыш увеличивается в 2 раза)",
    plan2_f2: "Все дети до 21 года бесплатно включаются в анкеты",
    plan2_f3: "Аудит и адаптация фотографий всех членов семьи",
    plan2_f4: "Выдача 2 отдельных официальных кодов подтверждения",
    plan2_f5: "Бесплатные первичные консультации по посольству при выигрыше",
    plan2_btn: "Выбрать этот тариф (Шанс 2X)",

    // Main Form
    form_top_badge: "Официальная анкета DV-2027",
    form_title: "Онлайн анкета Green Card DV-2027",
    form_desc: "Заполняйте все данные латинскими буквами в точности как в паспорте или ID-карте. Наши эксперты проверят заявку и отправят код подтверждения.",
    step_node_1: "Основной заявитель",
    step_node_2: "Семья и дети",
    step_node_3: "Подтверждение",
    form_sec1_title: "1. Данные основного заявителя",
    lbl_last_name: "Фамилия (Last Name)",
    lbl_first_name: "Имя (First Name)",
    lbl_middle_name: "Отчество (Middle Name)",
    ph_last_name: "Латиницей (например: Valiyev)",
    ph_first_name: "Латиницей (например: Alisher)",
    ph_middle_name: "Если есть (необязательно)",
    lbl_gender: "Пол",
    gender_male: "Мужской (Male)",
    gender_female: "Женский (Female)",
    lbl_birth_date: "Дата рождения (День, Месяц, Год)",
    lbl_country: "Страна рождения",
    lbl_region: "Область рождения",
    lbl_city: "Город или район рождения",
    ph_city: "Например: Чиланзарский район",
    lbl_education: "Уровень образования",
    lbl_address: "Текущий адрес проживания",
    ph_address: "Город, улица, номер дома/квартиры",
    lbl_phone: "Номер телефона",
    hint_phone: "Confirmation Number и результаты будут отправлены на этот номер",
    lbl_telegram: "Telegram Username (@username)",
    hint_telegram: "Для связи с нашими специалистами",
    lbl_photo_main: "Фотография основного заявителя 5х5 (600х600 px)",
    upload_title: "Нажмите для загрузки или перетащите фото сюда",
    upload_desc: "На белом фоне, сделано за последние 6 месяцев (JPG, PNG)",
    upload_ready: "Фотография успешно загружена (Готова к аудиту)",
    btn_remove: "Удалить",

    form_sec2_title: "2. Семейное положение и дети",
    lbl_marital: "Семейное положение",
    opt_single: "Холост / Не замужем",
    opt_married: "В браке (Женат / Замужем)",
    opt_divorced: "В официальном разводе",
    opt_widowed: "Вдовец / Вдова",
    lbl_children: "Количество детей до 21 года, не состоящих в браке",
    opt_child_0: "0 (Нет детей)",
    opt_child_1: "1 ребенок",
    opt_child_2: "2 ребенка",
    opt_child_3: "3 ребенка",
    opt_child_4: "4 ребенка",
    opt_child_5: "5 детей",

    spouse_block_title: "Данные супруга / супруги (Шанс 2X)",
    lbl_spouse_photo: "Фотография супруга / супруги 5х5 (600х600 px)",

    consent_text: "Подтверждаю достоверность всех указанных данных и соответствие фотографий требованиям Госдепартамента США. Даю согласие на использование услуг экспертов для официальной подачи заявки на лотерею DV-2027.",
    btn_submit_form: "Оформить и отправить анкету",
    form_guarantee_text: "🔒 Ваши данные хранятся в зашифрованном виде, на 100% конфиденциальны и не передаются третьим лицам.",

    // FAQ
    faq_tag: "Вопросы и Ответы",
    faq_title: "Все вопросы по программе DV-2027",
    faq_desc: "Самая важная информация о правилах, требованиях и процессе лотереи.",
    faq_q1: "Нужен ли загранпаспорт при подаче анкеты?",
    faq_a1: "Нет! По обновленным правилам Госдепартамента США загранпаспорт на этапе подачи анкеты не требуется. Вы можете заполнить анкету по внутреннему паспорту или ID-карте Узбекистана. Загранпаспорт понадобится только после победы для получения визы.",
    faq_q2: "Когда и как выдаётся официальный Confirmation Number?",
    faq_a2: "После того как ваша анкета и фотографии будут проверены нашими экспертами и успешно зарегистрированы на государственном портале dvprogram.state.gov, индивидуальный подтверждающий код (Confirmation Number) отправляется лично вам в Telegram.",
    faq_q3: "Что означает «2 шанса на выигрыш» для семейных?",
    faq_a3: "Для супругов, состоящих в официальном браке, подаются 2 отдельные полноценные анкеты: в одной муж основной заявитель, жена член семьи; во второй — жена основной заявитель, муж член семьи. В случае выигрыша любого из них Green Card получает вся семья (муж, жена и все дети до 21 года)!",
    faq_q4: "Нужны ли фотографии маленьких детей и младенцев?",
    faq_a4: "Да, согласно правилам Госдепартамента США абсолютно все неженатые дети до 21 года (включая новорожденных младенцев) должны быть обязательно внесены в анкету с индивидуальным фото 5х5 см. Иначе на собеседовании будет отказ.",
    faq_q5: "Как проверять результаты в мае?",
    faq_a5: "Каждый год в мае результаты публикуются на официальном портале. Вы сможете проверить статус самостоятельно по выданному нами коду, либо наши специалисты бесплатно проверят его и сразу сообщат вам о выигрыше.",

    // Telegram Card
    tg_badge: "Наш официальный канал",
    tg_title: "Присоединяйтесь к нашему Telegram-каналу",
    tg_desc: "Самые свежие новости, даты проведения лотереи, бесплатные консультации и результаты розыгрышей из первых уст.",
    tg_box_title: "Адрес официального канала",
    tg_btn_join: "Подписаться на канал (@greencarddv_2027)",

    // Footer
    footer_about: "Официальный онлайн-сервис для граждан по быстрой, законной и профессиональной регистрации в программе Green Card DV-2027 Diversity Visa.",
    footer_col1: "Быстрые ссылки",
    footer_col2: "Контакты и Поддержка",
    footer_hours: "Режим работы: 24/7 Онлайн приём",
    footer_coverage: "По всем областям и городам",
    footer_disclaimer: "<strong>Официальное уведомление (Disclaimer):</strong> DV2027.UZ является частной консалтинговой IT-службой и не является официальным сайтом Государственного департамента США или Посольства США. Наш сервис помогает безошибочно оформить анкеты в соответствии с международными стандартами.",
    footer_copy: "DV2027.UZ. Все права защищены.",
    footer_rights: "Безопасная и Законная регистрация на Green Card",

    // Modal
    modal_title: "Ваша заявка принята!",
    modal_subtitle: "Ваши данные и фотографии успешно поступили специалистам. Заявка проверяется, после чего вам будет выдан официальный код.",
    modal_code_lbl: "Ваш личный номер заявки:",
    modal_lbl_applicant: "Заявитель:",
    modal_lbl_plan: "Выбранный тариф:",
    modal_lbl_price: "Сумма к оплате:",
    modal_btn_tg: "Подтвердить в Telegram (@greencarddv_2027)",
    modal_btn_copy: "Копировать код",
    modal_btn_close: "Закрыть",
    modal_pay_note: "Реквизиты для оплаты (Click / Payme) и официальный номер подтверждения (Confirmation Number) будут отправлены через Telegram после проверки анкеты."
  }
};

let currentLanguage = localStorage.getItem('dv2027_lang') || 'uz';

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLanguage = lang;
  localStorage.setItem('dv2027_lang', lang);

  document.documentElement.setAttribute('lang', lang);

  // Update text contents
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Update input placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (translations[lang][key]) {
      el.setAttribute('placeholder', translations[lang][key]);
    }
  });

  // Update button active state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Dispatch global event for other components (e.g., dynamic children generator)
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

function getCurrentLanguage() {
  return currentLanguage;
}

// Auto-run on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('dv2027_lang') || 'uz';
  setLanguage(savedLang);

  // Bind clicks for any language switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang) {
        setLanguage(targetLang);
      }
    });
  });
});

// Export to window
window.i18n = {
  translations,
  setLanguage,
  getCurrentLanguage
};
