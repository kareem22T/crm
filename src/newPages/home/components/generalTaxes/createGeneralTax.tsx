import { GeneralTaxType } from "../../../../services/generalTaxServices";
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateGeneralTax } from "./generalTaxRequest";

interface formProps {
    createMethod: (generalTax: GeneralTaxType) => void,
    Back: () => void
}

const showErrorMessage = (msg: string) => {
    toast.error(msg, {
        position: toast.POSITION.TOP_RIGHT,
    });
};

const GeneralTaxForm: React.FC<formProps> = ({ createMethod, Back }) => {
    const [generalTax, setGeneralTax] = useState<GeneralTaxType>({
        jurisdiction: "",
        activityStartDate: "",
        taxCardIssueDate: "",
        taxCardExpiryDate: "",
        subjectAdvancePayments: "",
        periodSubjectAdvancePayments: ""
    });


    const handleBack = () => {
        Back();
    }
    const inputBindHandler = (key: keyof GeneralTaxType) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setGeneralTax({ ...generalTax, [key]: e.target.value });
    };

    const handleValidateNCreate = () => {
        let error = validateGeneralTax(generalTax)
        if (error) {
            showErrorMessage(error)
        } else {
            createMethod(generalTax)
        }
    }

    return (
        <div className="flex flex-col gap-9">
            {/* <!-- Input Fields --> */}
            <div
                className="p-5 grid grid-cols-1 gap-2 sm:grid-cols-2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-col gap-5.5 p-3">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            المأموريه التابع لها
                        </label>
                        <input type="text" placeholder="المأموريه التابع لها"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={generalTax.jurisdiction} onChange={inputBindHandler('jurisdiction')} />
                    </div>
                </div>

                <div className="flex flex-col gap-5.5 p-3">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            تاريخ بدء النشاط
                        </label>
                        <input type="date" placeholder="تاريخ بدء النشاط "
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={generalTax.activityStartDate} onChange={inputBindHandler('activityStartDate')} />
                    </div>
                </div>

                <div className="flex flex-col gap-5.5 p-3">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            تاريخ البطاقه الضريبيه
                        </label>
                        <input type="date" placeholder="تاريخ البطاقه الضريبيه "
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={generalTax.taxCardIssueDate} onChange={inputBindHandler('taxCardIssueDate')} />
                    </div>
                </div>

                <div className="flex flex-col gap-5.5 p-3">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            تاريخ أنتهاء البطاقه الضريبيه
                        </label>
                        <input type="date" placeholder="تاريخ أنتهاء البطاقه الضريبيه "
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={generalTax.taxCardExpiryDate} onChange={inputBindHandler('taxCardExpiryDate')} />
                    </div>
                </div>

                <div className="flex flex-col gap-5.5 p-3">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            الخضوع للدفعات المقدمة
                        </label>
                        <input type="text" placeholder="الخضوع للدفعات المقدمة "
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={generalTax.subjectAdvancePayments} onChange={inputBindHandler('subjectAdvancePayments')} />
                    </div>
                </div>

                <div className="flex flex-col gap-5.5 p-3">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            فترة الخضوع للدفعات المقدمة
                        </label>
                        <input type="date" placeholder="فترة الخضوع للدفعات المقدمة"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={generalTax.periodSubjectAdvancePayments} onChange={inputBindHandler('periodSubjectAdvancePayments')} />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-3" >
                    <button onClick={() => handleValidateNCreate()} className="w-75 inline-flex items-center
                justify-center gap-2.5 rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white
                hover:bg-opacity-90 lg:px-8 xl:px-10" style={{ margin: "auto" }}>اضافة </button>
                </div>
                <div className="flex flex-col gap-5.5 p-3" >
                    <button onClick={() => handleBack()} className="w-75 inline-flex items-center justify-center gap-2.5 rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" style={{ margin: "auto", backgroundColor: "#1C2434" }}>رجوع</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default GeneralTaxForm;