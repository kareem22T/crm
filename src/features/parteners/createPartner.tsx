import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validatePartner } from "./partnerRequest";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { PartnerType, createPartner, setError, setFormToShow } from './partnerSlice';

const PartnerForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const client = useSelector((state: RootState) => state.clients.selectedClient);  

    const [partner, setPartner] = useState<PartnerType>({
        name: "",
        contributionRatio: 0,
        contributionValue: 0,
        nationalId: ""
    });
    
    const inputBindHandler = (key: keyof PartnerType) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setPartner({ ...partner, [key]: e.target.value });
    };

    const handleCreate = () => {
        let error = validatePartner(partner);
        if (error) {
            dispatch(setError(error));
        } else {
            dispatch(createPartner({partner, clientId: client?.id || 0}));
        }
    };

    return (
        <div>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                  اضافة شريك
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
                    أسم الشريك 
                </label>
                <input type="text" placeholder="أسم الشريك"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={partner.name} onChange={inputBindHandler('name')} />
            </div>
        </div>
        <div className="flex flex-col gap-5.5 p-3">
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    نسبه المساهمه
                </label>
                <input type="text" placeholder="نسبه المساهمه"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={partner.contributionRatio} onChange={inputBindHandler('contributionRatio')} />
            </div>
        </div>
        <div className="flex flex-col gap-5.5 p-3">

            <div>
                <label className="mb-3 block text-black dark:text-white">
                    قيمه المساهمه 
                </label>
                <input type="text" placeholder="قيمه المساهمه "
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={partner.contributionValue} onChange={inputBindHandler('contributionValue')} />
            </div>
        </div>
        <div className="flex flex-col gap-5.5 p-3">

            <div>
                <label className="mb-3 block text-black dark:text-white">
                    الرقم القومي
                </label>
                <input type="text" placeholder="الرقم القومي"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={partner.nationalId} onChange={inputBindHandler('nationalId')} />
            </div>
        </div>
                    <div className="flex flex-col gap-5.5 p-3" style={{gridColumn: "span 2"}}>
                        <button onClick={handleCreate} className="w-75 inline-flex items-center justify-center gap-2.5 rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" style={{margin: "auto"}}>اضافة الشريك</button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default PartnerForm;
