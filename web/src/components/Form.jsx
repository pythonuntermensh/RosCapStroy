import {useFormik} from 'formik';
import * as Yup from 'yup';
import '../App.css'
import {useState} from "react";
import {responsibilitiesAPI} from "../services/FormService";

const validationSchema = Yup.object({
    responsibilitiesField: Yup.string().required('Поле обязательно для заполнения'),
});

export const MyForm = () => {
    // const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [textData, setTextData] = useState(null)
    const [splitResponsibilities, {data, error, isLoading}] = responsibilitiesAPI.useSplitResponsibilitiesMutation()

    const onSubmit = async (values) => {
        setSubmitted(true)
        const data = await splitResponsibilities({text: values.responsibilitiesField})
        setTextData(data)
        console.log(textData)
    }

    const formik = useFormik({
        initialValues: {
            responsibilitiesField: '',
            // termsField: '',
            // requirementsField: '',
            // notesField: '',
        },
        validationSchema,
        onSubmit
        /*onSubmit: (values) => {
            setLoading(true);
            // Здесь вы можете выполнить запрос к серверу для отправки данных формы
            setSubmitted(true);
            setTimeout(() => {
                console.log(values);
                setLoading(false);
            }, 2000);
        },*/
    });

    return (
        <>
            {!submitted ? (<form onSubmit={formik.handleSubmit} className="form w-11/12 md:w-9/12 lg:w-2/4
            shadow-2xl m-auto my-2 last:text-right bg-sky-400 bg-opacity-30
            p-4 rounded-2xl">
                <h1 className='text-3xl text-center font-bold mt-2'>
                    Ваша вакансия
                </h1>

                <label htmlFor="responsibilitiesField" className="block mb-2 mt-6 text-lg font-medium text-left">
                    Должностные обязанности <span className="text-red-600">*</span>
                </label>
                <textarea
                    id="responsibilitiesField"
                    name="responsibilitiesField"
                    rows="4"
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

                {/*<label htmlFor="termsField" className="block mb-2 mt-6 text-lg font-medium text-left">
                Условия
            </label>
            <textarea
                id="termsField"
                name="termsField"
                rows="4"
                className="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border
                          border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-0"
                placeholder="Напишите ваш текст здесь..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.termsField}
            />

            <label htmlFor="requirementsField" className="block mb-2 mt-6 text-lg font-medium text-left">
                Требование к соискателю
            </label>
            <textarea
                id="requirementsField"
                name="requirementsField"
                rows="4"
                className="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border
                          border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-0"
                placeholder="Напишите ваш текст здесь..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.requirementsField}
            />

            <label htmlFor="notesField" className="block mb-2 mt-6 text-lg font-medium text-left">
                Примечания
            </label>
            <textarea
                id="notesField"
                name="notesField"
                rows="4"
                className="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border
                          border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-0"
                placeholder="Напишите ваш текст здесь..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.notesField}
            />*/}
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
                <div>
                    <button onClick={(value) => setSubmitted(!value)}>Назад к форме</button>
                    <h2>Данные успешно отправлены!</h2>
                    <p>Текст: {data.notes}</p>
                </div>
            ) : null}
        </>
    );
};