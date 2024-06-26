import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { validateTaxExamination } from "./taxExaminationRequest";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { TaxExaminationStatus, TaxExaminationType, createTaxExamination, setError, setFormToShow } from './taxExaminationSlice';

const TaxExaminationForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const client = useSelector((state: RootState) => state.clients.selectedClient);  

    const [taxExamination, setTaxExamination] = useState<TaxExaminationType>({
        status: TaxExaminationStatus.IndustrialProfits,
        statusName:'',
        amount: 0,
        year: 0
    });
    
    const inputBindHandler = (key: keyof TaxExaminationType) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaxExamination({ ...taxExamination, [key]: e.target.value });
    };

   
   

    const handleCreate = () => {
        let error = validateTaxExamination(taxExamination);
        if (error) {
            dispatch(setError(error));
        } else {
            dispatch(createTaxExamination({taxExamination, clientId: client?.id || 0}));
        }
    };

    return (
        <div>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                   اضافة موقف فحص ضريبى
                </h2>

                <nav>
                    <button className="inline-flex bg-primary items-center justify-center gap-2.5 rounded-full bg-meta-3 py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-5" onClick={() => dispatch(setFormToShow(1))}>رجوع للقائمة</button>
                </nav>
              </div>
            <div className="flex flex-col gap-9">
                <div className="p-5 grid grid-cols-1 gap-2 sm:grid-cols-2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-col gap-5.5 p-3">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            حالة الفحص الضريبي
                        </label>
                        <select className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={taxExamination.status || ""} 
                                onChange={(v)=>{setTaxExamination({ ...taxExamination, "status": (v.target.value as TaxExaminationStatus) });}} >
                                <option value={TaxExaminationStatus.IndustrialProfits.toString()}>أرباح تجاريه وصناعيه</option>
                                <option value={TaxExaminationStatus.SalaryTax.toString()}>ضريبه الأجور والمرتبات</option>
                                <option value={TaxExaminationStatus.StampDuty.toString()}>ضريبه الدمغه</option>
                        </select>
                    </div>
                </div>
            
                <div className="flex flex-col gap-5.5 p-3">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            القيمة 
                        </label>
                        <input type="text" placeholder="القيمة"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={taxExamination.amount} onChange={inputBindHandler('amount')} />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-3">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            السنة
                        </label>
                        <input type="text" placeholder="السنة"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={taxExamination.year} onChange={inputBindHandler('year')} />
                    </div>
                </div>
                    <div className="flex flex-col gap-5.5 p-3" style={{gridColumn: "span 2"}}>
                        <button onClick={handleCreate} className="w-75 inline-flex items-center justify-center gap-2.5 rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" style={{margin: "auto"}}>اضافة الفحص</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaxExaminationForm;