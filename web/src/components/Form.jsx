import {useFormik} from 'formik';
import * as Yup from 'yup';
import '../App.css'
import {useRef, useState} from "react";
import {responsibilitiesAPI} from "../services/FormService";

const validationSchema = Yup.object({
    responsibilitiesField: Yup.string().required('Поле обязательно для заполнения'),
});

export const MyForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [textData, setTextData] = useState(null)
    const [splitResponsibilities, {data, error, isLoading}] = responsibilitiesAPI.useSplitResponsibilitiesMutation()
    const [isCopied, setIsCopied] = useState(false);

    // for copying text from fields
    const h2Ref1 = useRef(null);
    const h2Ref2 = useRef(null);
    const h2Ref3 = useRef(null);
    const h2Ref4 = useRef(null);
    const pRef1 = useRef(null);
    const pRef2 = useRef(null);
    const pRef3 = useRef(null);
    const pRef4 = useRef(null);

    const copyToClipboard = () => {
        let textToCopy = '';

        if (h2Ref1.current) {
            textToCopy += h2Ref1.current.innerText + '\n';
        }
        if (pRef1.current) {
            textToCopy += pRef1.current.innerText + '\n';
        }

        if (h2Ref2.current) {
            textToCopy += h2Ref2.current.innerText + '\n';
        }
        if (pRef2.current) {
            textToCopy += pRef2.current.innerText + '\n';
        }

        if (h2Ref3.current) {
            textToCopy += h2Ref3.current.innerText + '\n';
        }
        if (pRef3.current) {
            textToCopy += pRef3.current.innerText + '\n';
        }

        if (h2Ref4.current) {
            textToCopy += h2Ref4.current.innerText + '\n';
        }
        if (pRef4.current) {
            textToCopy += pRef4.current.innerText + '\n';
        }

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setIsCopied(true)
            })
            .catch((error) => {
                console.error('Ошибка при копировании текста:', error);
            });
    };

    //on submit of the textarea form
    const onSubmit = async (values) => {
        setSubmitted(true)
        setIsCopied(false)
        const data = await splitResponsibilities({text: values.responsibilitiesField})
        setTextData(data)
    }

    //random vacancies
    const vacancies = ['В стабильную, развивающуюся компанию требуются Бетонщики-Арматурщики на строительные ' +
            'объекты в Москве  Рассмотрим кандидатов как с опытом работы, так и без него. ' +
            ' ВАХТОВЫЙ МЕТОД РАБОТЫ 60/30  З/п за месяц - 67 000 на руки  З/п за вахту - 134 000 ' +
            'на руки  Обязанности:  - Армирование, бетонирование;  - Монтаж опалубки.  Требования:  ' +
            '- Соблюдение трудовой и бытовой дисциплины;  Условия:  - ВАХТА! 60/30;  - График работы 7/0 ' +
            'по 11 часов  - Прямой работодатель, ОФИЦИАЛЬНОЕ трудоустройство по ТК РФ  - Выплата заработной ' +
            'платы БЕЗ ЗАДЕРЖЕК. Оплата по часовой ставке , выплачивается стабильно 2 раза в месяц ;  ' +
            '- Проживание за счет компании  - Питание за счет компании  - Спецодежда за счет компании  ' +
            '- Покупаем билеты на вахту/с вахты',
            'Вахта в г. Москва.  Обязанности: - армирование каркаса;  ' +
            'Требования: - опыт в строительстве приветствуется; - работа в бригаде;  ' +
            'Условия: - продолжительность вахты 60/30 (продление вахты возможно); ' +
            '- Официальное трудоустройство; - ЗП в срок и без задержек; ' +
            '- Авансирование дважды в месяц по 15 000 рублей, 15 и 30 числа; ' +
            '- Питание трехразовое за счет организации; - Выдача спецодежды и ' +
            'Сизов без вычета из заработной платы; - Организованные отправки до объекта ' +
            '(покупка билетов); - Помощь в прохождение медицинского осмотра; ' +
            '- Возможность получить квалификационные удостоверения; - Карьерный рост до бригадира/мастера;',
            'Бетонирование бетонных и железобетонных монолитных конструкций. Земляные работы под устройство фундамента. Устройство опалубки. Армирование. Демонтажные работы.',
            'Требуются маляры на производство вахтой.  Покупаем билеты Зарплата указана за 1 месяц Обязанности: Выполнять шпатлевание, воздушная покраска на высоте до 20 метров, проолифливание и грунтование поверхностей вручную. Окрашивать оштукатуренные поверхности и металлоконструкции масляными составами кистями и валиками. Окрашивать водными составами поверхности стен и потолков с использованием ручных краскопультов. Работа в паре 3-4 человек Требования: - Удостоверение промышленный альпинист - Официальный опыт работы',
            'Работа Штукатур - маляр в компании ПИК-РЕМОНТ на м. Бунинская Аллея! Мы - технологичная компания, специализирующаяся на комплексных решениях в сфере ремонта помещений.  Открыт набор для отделочников-штукатуров/маляров/шпаклевщиков! Есть вахта Маляр Условия:   — График работы 5/2 или 6/1, на выбор  — Выплаты официально на карту  — Есть работа с проживанием     — Штукатурка 300 руб м2  — Шпатлевка 1 слой 120 руб м2  — Оставшаяся смета в офисе  — Инструменты выдаются бесплатно  Мы входим в группу компаний &quot;ПИК&quot; и строим систему для управления отделкой с использованием разработанных IT инструментов.  Обязанности:  — Выполнение отделочных работ, устройство стяжки, настилка пола (линолеум, паркет, паркетная доска, ламинат) облицовка покрытий плиткой, оклейка перегородок обоями, стеклохолстом и прочее;  — Выполнение комплексных малярных работ: высококачественная подготовка стен под покраску, шпатлевка, покраска, штукатурка/выравнивание стен и другие.  Требования:   — Аналогичный опыт работы от 1 года;  — Ответственность, аккуратность, желание развиваться.  — Следить за сохранностью покрасочных материалов и инструментов, не допускать повышенного расхода, самостоятельно осуществлять переноску материалов и инструментов на объекте.'
    ]

    const formik = useFormik({
        initialValues: {
            responsibilitiesField: '',
        },
        validationSchema,
        onSubmit
    });

    const handleButtonClick = () => {
        const randomText = vacancies[Math.floor(Math.random() * vacancies.length)];
        formik.setFieldValue('responsibilitiesField', randomText);
        setIsCopied(false);
    };

    return (
        <>
            {!submitted ? (<form onSubmit={formik.handleSubmit} className="form w-11/12 md:w-9/12 lg:w-2/4
            shadow-2xl m-auto my-2 last:text-right bg-sky-400 bg-opacity-30
            p-4 rounded-2xl">
                <h1 className='text-3xl text-center font-bold mt-2'>
                    Ваша вакансия
                </h1>

                <button type='button' className="bg-blue-500 hover:bg-blue-400 text-white py-3 outline-0 px-6 border-b-4 border-blue-700
                hover:border-blue-500 rounded transition-all mt-4" onClick={handleButtonClick}>
                    Случайная вакансия
                </button>

                <label htmlFor="responsibilitiesField" className="block mb-2 mt-6 text-lg font-medium text-left">
                    Должностные обязанности <span className="text-red-600">*</span>
                </label>
                <textarea
                    id="responsibilitiesField"
                    name="responsibilitiesField"
                    rows="6"
                    className="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border
                          border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-0"
                    placeholder="Напишите ваш текст здесь..."
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.responsibilitiesField}
                />
                {formik.touched.responsibilitiesField && formik.errors.responsibilitiesField ? (
                    <div className="text-red-500 mt-2">{formik.errors.responsibilitiesField}</div>
                ) : null}

                <button
                    className="bg-blue-500 hover:bg-blue-400 text-white py-3 outline-0 px-6 border-b-4 border-blue-700
                hover:border-blue-500 rounded transition-all mt-4"
                    type="submit"
                >
                    Отправить
                </button>
            </form>) : null}

            {isLoading ? <div
                className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 animate-spin">
                <div className="h-9 w-9 rounded-full bg-gray-200"></div>
            </div> : null}

            {submitted && !isLoading ? (
                <div className='form w-11/12 md:w-9/12 lg:w-2/4
                shadow-2xl m-auto my-2 last:text-right bg-sky-400 bg-opacity-30
                p-4 rounded-2xl'>
                    <button onClick={(value) => setSubmitted(!value)} className='hover:underline'> {`<`} Назад к форме
                    </button>

                    <h2 className="block mb-2 mt-6 text-lg font-medium text-left font-semibold" ref={h2Ref1}>
                        Должностные обязанности:
                    </h2>
                    <p className="text-left" ref={pRef1}>{data.responsibilities}</p>

                    <h2 className="block mb-2 mt-6 text-lg font-medium text-left font-semibold" ref={h2Ref2}>
                        Примечания:
                    </h2>
                    <p className="text-left" ref={pRef2}>{data.notes}</p>

                    <h2 className="block mb-2 mt-6 text-lg font-medium text-left font-semibold" ref={h2Ref3}>
                        Условия:
                    </h2>
                    <p className="text-left" ref={pRef3}>{data.terms}</p>

                    <h2 className="block mb-2 mt-6 text-lg font-medium text-left font-semibold" ref={h2Ref4}>
                        Требования к соискателям:
                    </h2>
                    <p className="text-left" ref={pRef4}>{data.requirements}</p>

                    <button className="bg-blue-500 hover:bg-blue-400 text-white py-3 outline-0
                    px-6 border-b-4 border-blue-700
                    hover:border-blue-500 rounded transition-all mt-4"
                            onClick={copyToClipboard}>
                        {isCopied ? <span>&#10004;</span> : 'Копировать'}
                    </button>
                </div>
            ) : null}
        </>
    );
};