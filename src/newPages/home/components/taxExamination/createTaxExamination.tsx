import { TaxExaminationType } from "../../../../services/taxExaminationServices";
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateTaxExamination } from "./taxExaminationRequest";

interface formProps {
createMethod: (taxExamination: TaxExaminationType) => void;
}

const showErrorMessage = (msg:string) => {
toast.error(msg, {
position: toast.POSITION.TOP_RIGHT,
});
};

const TaxExaminationForm: React.FC<formProps> = ({createMethod}) => {
const [taxExamination, setTaxExamination] = useState<TaxExaminationType>({
    status: "",
    industrialProfits: 0,
    salaryTax: 0,
    stampDuty: 0,
    year: ''
});

const inputBindHandler = (key: keyof TaxExaminationType) => (e: React.ChangeEvent<HTMLInputElement>) => {
setTaxExamination({ ...taxExamination, [key]: e.target.value });
};

const handleValidateNCreate = () => {
let error = validateTaxExamination(taxExamination)
if (error) {
showErrorMessage(error)
} else {
createMethod(taxExamination)
}
}

return (
<div className="flex flex-col gap-9">
    <div
        className="p-5 grid grid-cols-1 gap-2 sm:grid-cols-2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-5.5 p-3">
            <div>
                <label className="mb-3 block text-black dark:text-white">
                موقف الفحص الضريبي 
                </label>
                <input type="text" placeholder="موقف الفحص الضريبي "
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={taxExamination.status} onChange={inputBindHandler('status')} />
            </div>
        </div>
        <div className="flex flex-col gap-5.5 p-3">
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    أرباح تجاريه وصناعيه
                </label>
                <input type="text" placeholder="أرباح تجاريه وصناعيه"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={taxExamination.industrialProfits} onChange={inputBindHandler('industrialProfits')} />
            </div>
        </div>
        <div className="flex flex-col gap-5.5 p-3">
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    ضريبه الأجور والمرتبات
                </label>
                <input type="text" placeholder="ضريبه الأجور والمرتبات"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={taxExamination.salaryTax} onChange={inputBindHandler('salaryTax')} />
            </div>
        </div>
        <div className="flex flex-col gap-5.5 p-3">
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    ضريبه الدمغه
                </label>
                <input type="text" placeholder="ضريبه الدمغه"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={taxExamination.stampDuty} onChange={inputBindHandler('stampDuty')} />
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
        <div className="flex flex-col gap-5.5 p-3" style={{gridColumn: "span 2" }}>
            <button onClick={()=> handleValidateNCreate()} className="w-75 inline-flex items-center
                justify-center gap-2.5 rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white
                hover:bg-opacity-90 lg:px-8 xl:px-10" style={{margin: "auto"}}>اضافة </button>
        </div>
    </div>
    <ToastContainer />
</div>
)
}

export default TaxExaminationForm;