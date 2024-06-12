import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateVat } from "./vatRequest";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { VatType, createVat, setError, setFormToShow } from './vatSlice';
import { getBranches } from '../branchs/branchSlice';

const VatForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const client = useSelector((state: RootState) => state.clients.selectedClient);  

    const [vat, setVat] = useState<VatType>({
        status: "",
        vatNumber: "",
        jurisdiction: "",
        registrationDate: "",
        expiryDate: "",
        BranchId: 0,
    });
    const branchs = useSelector((state: RootState) => state.branches.branches);  

    const inputBindHandler = (key: keyof VatType) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setVat({ ...vat, [key]: e.target.value });
    };

    useEffect (() => {
        dispatch(getBranches({ PageSize: 100, PageNumber: 1,  clientId: client?.id || 0}));
      }, [dispatch]);


    const handleCreate = () => {
        let error = validateVat(vat);
        if (error) {
            dispatch(setError(error));
        } else {
            dispatch(createVat({vat, clientId: client?.id || 0}));
        }
    };

    return (
        <div>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                  اضافة قيمة مضافة
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
                موقف التسجيل بالقيمة المضافة
                </label>
                <input type="text" placeholder="موقف التسجيل بالقيمة المضافة"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={vat.status} onChange={inputBindHandler('status')} />
            </div>
        </div>
        <div className="flex flex-col gap-5.5 p-3">
            {/* Input for "ضريبة الشراء" */}
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    رقم التسجيل بالقيمة المضافة
                </label>
                <input type="text" placeholder="رقم التسجيل بالقيمة المضافة"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={vat.vatNumber} onChange={inputBindHandler('vatNumber')} />
            </div>
        </div>
        <div className="flex flex-col gap-5.5 p-3">
            {/* Input for "الاختصاص القضائي" */}
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    المأمورية التابع لها
                </label>
                <input type="text" placeholder="المأمورية التابع لها"
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
                <input type="date" placeholder="تاريخ التسجيل "
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={vat.registrationDate} onChange={inputBindHandler('registrationDate')} />
            </div>
        </div>
        <div className="flex flex-col gap-5.5 p-3">
            {/* Input for "تاريخ الانتهاء" */}
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    تاريخ انتهاء شهادة التسجيل 
                </label>
                <input type="date" placeholder="تاريخ انتهاء شهادة التسجيل "
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={vat.expiryDate} onChange={inputBindHandler('expiryDate')} />
            </div>
        </div>
        <div className="flex flex-col gap-5.5 p-3">
            <div>
            <label className="mb-3 block text-black dark:text-white">
                    الفرع
            </label>
                <select name="branch" id="branch" className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary' value={vat.BranchId} onChange={inputBindHandler('BranchId')}>
                    <option value="0" selected disabled>Select ---</option>
                    {
                        branchs && (
                            branchs.map(branch => (
                                <option value={branch.id}>{branch.address}</option>
                            ))
                        )
                    }
                </select>
            </div>
        </div>

                    <div className="flex flex-col gap-5.5 p-3" style={{gridColumn: "span 2"}}>
                        <button onClick={handleCreate} className="w-75 inline-flex items-center justify-center gap-2.5 rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" style={{margin: "auto"}}>اضافة القيمة </button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default VatForm;
