export default function FormInput({formText}) {
    return (
        <>
            <label htmlFor="message" className="block mb-2 mt-6 text-lg font-medium text-left">
                {formText}
            </label>
            <textarea id="message" rows="4"
                      className="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border
                          border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-0"
                      placeholder="Напишите ваш текст здесь...">
            </textarea>
        </>

    )
}