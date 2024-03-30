-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Мар 30 2024 г., 13:14
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `event_lents`
--

-- --------------------------------------------------------

--
-- Структура таблицы `events`
--

CREATE TABLE `events` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `image` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `events`
--

INSERT INTO `events` (`id`, `title`, `category`, `date`, `image`, `url`) VALUES
(1, 'О возможностях ТОР «Чусовой»', 'Прямая линия', '28.03.2024', 'https://www.permkrai.ru/upload/iblock/f9a/8en2zhu7bbw8biumk7pbggc2up9vwxvf/cropped.png', 'https://www.permkrai.ru/events/o_vozmozhnostyakh_tor_chusovoy/'),
(2, 'О возможностях ТОР «Нытва»', 'Прямая линия', '28.03.2024', 'https://www.permkrai.ru/upload/iblock/f40/ykfj4166oonaxou4cpu99mymineneedi/cropped.png', 'https://www.permkrai.ru/events/o_vozmozhnostyakh_tor_nytva/'),
(3, 'Отсрочка платежа по контракту - как использовать преимущество и опередить конкурентов', 'Вебинар', '28.03.2024', 'https://www.permkrai.ru/upload/iblock/5ff/v23tns36ae84kswh09pqwxcakxpq7eja/cropped.png', 'https://www.permkrai.ru/events/otsrochka_platezha_po_kontraktu_kak_ispolzovat_preimushchestvo_i_operedit_konkurentov/'),
(4, 'Грантовый конкурс «Студенческий стартап»: что нужно знать, чтобы подготовить качественную заявку?', 'Вебинар', '27.03.2024', 'https://www.permkrai.ru/upload/iblock/ccb/qgwoy129pedfu3owxfg9rd4uktwupby7/cropped.png', 'https://www.permkrai.ru/events/grantovyy_konkurs_studencheskiy_startap_chto_nuzhno_znat_chtoby_podgotovit_kachestvennuyu_zayavku/'),
(5, 'Варианты оплаты в рамках внешнеторговых сделок в текущих условиях: безналичные расчёты, наличные расчёты, использование цифро...', 'Вебинар', '25.03.2024', 'https://www.permkrai.ru/upload/iblock/975/nggjag4vrnax18lz035kacf6r8o0micv/cropped.png', 'https://www.permkrai.ru/events/varianty_oplaty_v_ramkakh_vneshnetorgovykh_sdelok_v_tekushchikh_usloviyakh_beznalichnye_raschyety_nalichnye_raschyety_ispolzovanie_tsifrovykh_finansov/'),
(6, 'Школа предпринимательства', 'Образовательная программа', '25.03.2024', 'https://www.permkrai.ru/upload/iblock/0fb/lmljcbxsmhh3tc1m32v4qu3uk1nb1j9b/cropped.png', 'https://www.permkrai.ru/events/shkola_predprinimatelstva/'),
(7, 'Как продавать лучшее решение, а не цену', 'Семинар', '22.03.2024', 'https://www.permkrai.ru/upload/iblock/a0f/hr9t1h0v7dp6sa4hsa911bc8dys3c1p1/cropped.png', 'https://www.permkrai.ru/events/kak_prodavat_luchshee_reshenie_a_ne_tsenu/'),
(8, 'Снижение издержек бизнеса при безналичной оплате. СБП', 'Круглый стол', '21.03.2024', 'https://www.permkrai.ru/upload/iblock/483/dcce0bixwbv2sy6yisnw1d69hjdobj74/cropped.png', 'https://www.permkrai.ru/events/snizhenie_izderzhek_biznesa_pri_beznalichnoy_oplate_sbp/'),
(9, 'Товарный знак как инструмент эффективного развития бизнеса', 'Вебинар', '20.03.2024', 'https://www.permkrai.ru/upload/iblock/5d0/0ybxocm6wve3bqjb0le8bk862jjpajcc/cropped.png', 'https://www.permkrai.ru/events/tovarnyy_znak_kak_instrument_effektivnogo_razvitiya_biznesa/'),
(10, 'Применение спецрежимов: УСН, ПСН, ЕСХН. Порядок и сроки представления деклараций и уведомлений. Возможности личного кабинета ...', 'Вебинар', '14.03.2024', 'https://www.permkrai.ru/upload/iblock/a9a/rn0xs07hni9s0kaaoggoj0rzbn19fhjj/cropped.png', 'https://www.permkrai.ru/events/primenenie_spetsrezhimov_usn_psn_eskhn_poryadok_i_sroki_predstavleniya_deklaratsiy_i_uvedomleniy_vozmozhnosti_lichnogo_kabineta_nalogoplatelshchika/'),
(11, 'Цифровая упаковка личного бренда: ресурсы и лайфхаки', 'Вебинар', '14.03.2024', 'https://www.permkrai.ru/upload/iblock/9eb/b5mwwzvo0qcf6s4af2f4kz1engu9wjv1/cropped.png', 'https://www.permkrai.ru/events/tsifrovaya_upakovka_lichnogo_brenda_resursy_i_layfkhaki/'),
(12, 'Кубок Пермского края по стратегии и управлению бизнесом Global Management Challenge', 'Деловая игра', '14.03.2024', 'https://www.permkrai.ru/upload/iblock/ee6/utachixts0xo3hid3f363tj3813ujj5h/cropped.png', 'https://www.permkrai.ru/events/kubok_permskogo_kraya_po_strategii_i_upravleniyu_biznesom_global_management_challenge/'),
(13, 'Этикет в продажах – основа долгосрочных отношений с клиентами', 'Тренинг', '13.03.2024', 'https://www.permkrai.ru/upload/iblock/1ec/etjmrg4x42nefa4vsb690v3qu3970o42/cropped.png', 'https://www.permkrai.ru/events/etiket_v_prodazhakh_osnova_dolgosrochnykh_otnosheniy_s_klientami/'),
(14, 'Личный бренд как ресурс к росту', 'Вебинар', '12.03.2024', 'https://www.permkrai.ru/upload/iblock/cbc/8ukthfh37gwwlpg012nl1jkub61o3acf/cropped.png', 'https://www.permkrai.ru/events/lichnyy_brend_kak_resurs_k_rostu/'),
(15, 'Самозанятость: инструкция по применению', 'Семинар', '12.03.2024', 'https://www.permkrai.ru/upload/iblock/07b/j7w9rlcac1w6dctrdnpjxdk5vsqbcdbf/cropped.png', 'https://www.permkrai.ru/events/samozanyatost_instruktsiya_po_primeneniyu/'),
(16, 'Очная консультация специалистов Центра занятости населения Пермского края ', 'Консультация', '11.03.2024', 'https://www.permkrai.ru/upload/iblock/fc2/1478b2fzqonqynqbld8wuxep5lc5a9ks/cropped.png', 'https://www.permkrai.ru/events/ochnaya_konsultatsiya_spetsialistov_tsentra_zanyatosti_naseleniya_permskogo_kraya_/'),
(17, 'Экспорт 2024: новые рынки. Изучаем регион MENА', 'Семинар', '06.03.2024', 'https://www.permkrai.ru/upload/iblock/a06/ai1rt2ehmk6npzyatif41w4hjvyoobkk/cropped.png', 'https://www.permkrai.ru/events/eksport_2024_novye_rynki_izuchaem_region_mena/'),
(18, 'Интернет-продвижение в социальном предпринимательстве. Виды контента. О чем писать в соцсетях?', 'Вебинар', '06.03.2024', 'https://www.permkrai.ru/upload/iblock/83b/qsjel1l9wzaizrxn92x2va4on170wzmi/cropped.png', 'https://www.permkrai.ru/events/internet_prodvizhenie_v_sotsialnom_predprinimatelstve_vidy_kontenta_o_chem_pisat_v_sotssetyakh/'),
(19, 'Интернет-продвижение в социальном предпринимательстве. Платные и бесплатные методы продвижения', 'Вебинар', '04.03.2024', 'https://www.permkrai.ru/upload/iblock/b8e/1jgpvj0c7tburkhado5b3oebq479yetl/cropped.png', 'https://www.permkrai.ru/events/internet_prodvizhenie_v_sotsialnom_predprinimatelstve_platnye_i_besplatnye_metody_prodvizheniya/'),
(20, 'МОЙ ПЕРВЫЙ БИЗНЕС: с чего начать?', 'Деловая игра', '04.03.2024', 'https://www.permkrai.ru/upload/iblock/621/lna2bm080nuippkougtjinfpdvqvqqsj/cropped.png', 'https://www.permkrai.ru/events/moy_pervyy_biznes_s_chego_nachat/'),
(21, 'День Рождения Свободы: Найк Борзов', 'svoboda_perm', '30.03.2024', 'https://svoboda-perm.ru/wp-content/uploads/2023/09/nb-gor-1024x515.jpg', 'https://svoboda-perm.ru/event/najk-borzov/'),
(22, 'Экскурсия Театр-Театр', 'teatr_teatr', '30.03.2024', 'https://teatr-teatr.com/upload/webp/resize_cache/iblock/14a/61zaeqg0rbx091cvrxkciaueu51593vw/949_463_0/1cdfc4c50329e6d578ef2b0dd610a5b1.webp', 'https://teatr-teatr.com/performances/ekskursiya-teatr-teatr/?event=9084'),
(23, 'Гастроли. Восемь женщин', 'teatr_teatr', '30.03.2024', 'https://teatr-teatr.com/upload/webp/resize_cache/iblock/218/fama1f55ghchwpiwd606uauym1bittzs/949_463_0/8-zhenshchin_1920kh1284_glavnaya-banner.webp', 'https://teatr-teatr.com/performances/gastroli-vosem-zhenshchin/?event=9114'),
(24, 'Гастроли. Зойкина квартира', 'teatr_teatr', '30.03.2024', 'https://teatr-teatr.com/upload/webp/resize_cache/iblock/3c3/kbm4go9jmusfliojv2itfaj38abfn8xt/949_463_0/xvx2mj4yftfu8o5nj2y2xu080msxx8b6.webp', 'https://teatr-teatr.com/performances/gastroli-zoykina-kvartira/?event=8921'),
(25, 'Премьера. Пьяный «космонавт»', 'teatr_teatr', '30.03.2024', 'https://teatr-teatr.com/upload/webp/resize_cache/iblock/a5c/m68zrtk0t7c0w4r0hmvgr3khgpz23tmk/949_463_0/TOM_4507.webp', 'https://teatr-teatr.com/performances/premera-pyanyy-kosmonavt/?event=8961'),
(26, 'Гастроли. Щелкунчик', 'teatr_teatr', '31.03.2024', 'https://teatr-teatr.com/upload/webp/resize_cache/iblock/2ea/a7plh2io61mhfu0ytkb29b22462msjzi/949_463_0/SHCH1.webp', 'https://teatr-teatr.com/performances/gastroli-shchelkunchik/?event=9124');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `events`
--
ALTER TABLE `events`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
