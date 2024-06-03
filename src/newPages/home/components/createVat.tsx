import { VatType } from "../../../services/vatServices";
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateVat } from "../vatRequest";

interface formProps {
createMethod: (vat: VatType) => void;
}

const showErrorMessage = (msg:string) => {
toast.error(msg, {
position: toast.POSITION.TOP_RIGHT,
});
};

const VatForm: React.FC<formProps> = ({createMethod}) => {
const [vat, setVat] = useState<VatType>({
status: "",
vatNumber: "",
jurisdiction: "",
registrationDate: "",
expiryDate: "",
});

const inputBindHandler = (key: keyof VatType) => (e: React.ChangeEvent<HTMLInputElement>) => {
setVat({ ...vat, [key]: e.target.value });
};

const handleValidateNCreate = () => {
let error = validateVat(vat)
if (error) {
showErrorMessage(error)
} else {
createMethod(vat)
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
                    الحالة
                </label>
                <input type="text" placeholder="الحالة"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={vat.status} onChange={inputBindHandler('status')} />
            </div>
        </div>
        <div className="flex flex-col gap-5.5 p-3">
            {/* Input for "ضريبة الشراء" */}
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    ضريبة الشراء
                </label>
                <input type="text" placeholder="ضريبة الشراء"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={vat.vatNumber} onChange={inputBindHandler('vatNumber')} />
            </div>
        </div>
        <div className="flex flex-col gap-5.5 p-3">
            {/* Input for "الاختصاص القضائي" */}
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    الاختصاص القضائي
                </label>
                <input type="text" placeholder="الاختصاص القضائي"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={vat.jurisdiction} onChange={inputBindHandler('jurisdiction')} />
            </div>
        </div>
        <div className="flex flex-col gap-5.5 p-3">
            {/* Input for "تاريخ الانتهاء" */}
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    تاريخ التسجيل
                </label>
                <input type="date" placeholder="تاريخ التسجيل"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={vat.registrationDate} onChange={inputBindHandler('registrationDate')} />
            </div>
        </div>
        <div className="flex flex-col gap-5.5 p-3">
            {/* Input for "تاريخ الانتهاء" */}
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    تاريخ الانتهاء
                </label>
                <input type="date" placeholder="تاريخ الانتهاء"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={vat.expiryDate} onChange={inputBindHandler('expiryDate')} />
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

export default VatForm;