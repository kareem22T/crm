import { GeneralTaxRow, setError, setFormToShow, updateGeneralTax } from "./generalTaxSlice";
import React, { useState } from 'react';
import { validateGeneralTax } from "./generalTaxRequest";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { formatDate } from "../../utils/utilityFunctions";

const GeneralTaxDetails: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [generalTax, setGeneralTax] = useState<any>(useSelector((state: RootState) => state.generalTaxes.selectedGeneralTax));
    const client = useSelector((state: RootState) => state.clients.selectedClient);  

    const [isUpdate, setIsUpdate] = React.useState<boolean>(false)

    const inputBindHandler = (key: keyof GeneralTaxRow) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setGeneralTax({ ...generalTax, [key]: e.target.value });    
    };

    const handleUpdate = () => {
        if (!isUpdate) {
            setIsUpdate(true)
        } else {
            let error = validateGeneralTax(generalTax);
            if (error) {
                dispatch(setError(error));
            } else {
                dispatch(updateGeneralTax({generalTax, clientId: client?.id || 0}))
                setIsUpdate(false)
            }    
        }
    }
    
    return (
        <div>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                  تعديل الضريبة 
                </h2>

                <nav>
                    <button className="inline-flex bg-primary items-center justify-center gap-2.5 rounded-full bg-meta-3 py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-5" onClick={() => dispatch(setFormToShow(1))}>رجوع للقائمة</button>
                </nav>
              </div>
              <div className="flex flex-col gap-9">
            {/* <!-- Input Fields --> */}
            <div className="p-5 grid grid-cols-1 gap-2 sm:grid-cols-2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col gap-5.5 p-3">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            المأموريه التابع لها
                        </label>
                        <input type="text" placeholder="المأموريه التابع لها"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={generalTax.jurisdiction} onChange={inputBindHandler('jurisdiction')}
                            disabled={!isUpdate || false}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-5.5 p-3">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            تاريخ بدء النشاط
                        </label>
                        <input type="date" placeholder="تاريخ بدء النشاط "
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={formatDate(generalTax.activityStartDate)} onChange={inputBindHandler('activityStartDate')} 
                            disabled={!isUpdate || false}/>
                    </div>
                </div>

                <div className="flex flex-col gap-5.5 p-3">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            تاريخ البطاقه الضريبيه
                        </label>
                        <input type="date" placeholder="تاريخ البطاقه الضريبيه "
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={formatDate(generalTax.taxCardIssueDate)} onChange={inputBindHandler('taxCardIssueDate')}
                            disabled={!isUpdate || false}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-5.5 p-3">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            تاريخ أنتهاء البطاقه الضريبيه
                        </label>
                        <input type="date" placeholder="تاريخ أنتهاء البطاقه الضريبيه "
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={formatDate(generalTax.taxCardExpiryDate)} onChange={inputBindHandler('taxCardExpiryDate')}
                            disabled={!isUpdate || false}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-5.5 p-3">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            الخضوع للدفعات المقدمة
                        </label>
                        <input type="text" placeholder="الخضوع للدفعات المقدمة "
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={generalTax.subjectAdvancePayments} onChange={inputBindHandler('subjectAdvancePayments')}
                            disabled={!isUpdate || false}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-5.5 p-3">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            فترة الخضوع للدفعات المقدمة
                        </label>
                        <input type="date" placeholder="فترة الخضوع للدفعات المقدمة"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={formatDate(generalTax.periodSubjectAdvancePayments)} onChange={inputBindHandler('periodSubjectAdvancePayments')}
                            disabled={!isUpdate || false}
                        />
                    </div>
                </div>
            </div>
                <div className="flex flex-col gap-5.5 p-3" style={{gridColumn: "span 2"}}>
                    <button onClick={() => handleUpdate()} className="w-75 inline-flex items-center justify-center gap-2.5 rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" style={{margin: "auto"}}>{ isUpdate ? "تحديث" : "تعديل" }</button>
                </div>
            </div>
        </div>
    )
}

export default GeneralTaxDetails;