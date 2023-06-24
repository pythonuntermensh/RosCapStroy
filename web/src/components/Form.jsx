import {useFormik} from 'formik';
import * as Yup from 'yup';
import '../App.css'
import {useEffect, useRef, useState} from "react";
import {responsibilitiesAPI} from "../services/FormService";

const validationSchema = Yup.object({
    responsibilitiesField: Yup.string().required('Поле обязательно для заполнения'),
});

export const MyForm = () => {
    // const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [textData, setTextData] = useState(null)
    const [splitResponsibilities, {data, error, isLoading}] = responsibilitiesAPI.useSplitResponsibilitiesMutation()

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
                console.log('Текст скопирован в буфер обмена');
            })
            .catch((error) => {
                console.error('Ошибка при копировании текста:', error);
            });
    };


    const onSubmit = async (values) => {
        setSubmitted(true)
        const data = await splitResponsibilities({text: values.responsibilitiesField})
        setTextData(data)
        console.log(textData)
    }

    const formik = useFormik({
        initialValues: {
            responsibilitiesField: '',
        },
        validationSchema,
        onSubmit
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

                    <h2 className="block mb-2 mt-6 text-lg font-medium text-left" ref={h2Ref1}>
                        Должностные обязанности:
                    </h2>
                    <p className="text-left" ref={pRef1}>{data.responsibilities}</p>

                    <h2 className="block mb-2 mt-6 text-lg font-medium text-left" ref={h2Ref2}>
                        Примечания:
                    </h2>
                    <p className="text-left" ref={pRef2}>{data.notes}</p>

                    <h2 className="block mb-2 mt-6 text-lg font-medium text-left" ref={h2Ref3}>
                        Условия:
                    </h2>
                    <p className="text-left" ref={pRef3}>{data.terms}</p>

                    <h2 className="block mb-2 mt-6 text-lg font-medium text-left" ref={h2Ref4}>
                        Требования к соискателям:
                    </h2>
                    <p className="text-left" ref={pRef4}>{data.requirements}</p>

                    <button onClick={copyToClipboard}>Копировать</button>
                </div>
            ) : null}
        </>
    );
};