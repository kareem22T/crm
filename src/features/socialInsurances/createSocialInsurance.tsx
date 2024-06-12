import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { validateSocialInsurance } from "./socialInsuranceRequest";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { SocialInsuranceType, createSocialInsurance, setError, setFormToShow } from './socialInsuranceSlice';
import { getBranches } from '../branchs/branchSlice';

const SocialInsuranceForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const client = useSelector((state: RootState) => state.clients.selectedClient);  

    const [socialInsurance, setSocialInsurance] = useState<SocialInsuranceType>({
        insuranceStatus: "",
        socialInsuranceNum: "",
        associatedInsurance: "",
        attached: "",
        BranchId: 0,
    });
    
    const branchs = useSelector((state: RootState) => state.branches.branches);  


    const inputBindHandler = (key: keyof SocialInsuranceType) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSocialInsurance({ ...socialInsurance, [key]: e.target.value });
    };

    const handleCreate = () => {
        let error = validateSocialInsurance(socialInsurance);
        if (error) {
            dispatch(setError(error));
        } else {
            dispatch(createSocialInsurance({socialInsurance, clientId: client?.id || 0}));
        }
    };

    useEffect (() => {
        dispatch(getBranches({ PageSize: 100, PageNumber: 1,  clientId: client?.id || 0}));
      }, [dispatch]);
    
  
    return (
        <div>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                  اضافة تأمين
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
                موقف التامينات 
                </label>
                <input type="text" placeholder="موقف التامينات "
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={socialInsurance.insuranceStatus} onChange={inputBindHandler('insuranceStatus')} />
            </div>
        </div>

        <div className="flex flex-col gap-5.5 p-3">
            <div>
                <label className="mb-3 block text-black dark:text-white">
                رقم التأمينات الاجتماعية  
                </label>
                <input type="text" placeholder="رقم التأمينات الاجتماعية  "
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={socialInsurance.socialInsuranceNum} onChange={inputBindHandler('socialInsuranceNum')} />
            </div>
        </div>

        <div className="flex flex-col gap-5.5 p-3">
            <div>
                <label className="mb-3 block text-black dark:text-white">
                تابع لتامينات 
                </label>
                <input type="text" placeholder="تابع لتامينات "
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={socialInsurance.associatedInsurance} onChange={inputBindHandler('associatedInsurance')} />
            </div>
        </div>

        <div className="flex flex-col gap-5.5 p-3">
            <div>
                    <label className="mb-3 block text-black dark:text-white">
                            مرفق
                    </label>
                            <input type="text" placeholder="مرفق"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={socialInsurance.attached} onChange={inputBindHandler('attached')} />
                        </div>
                    </div>
        <div className="flex flex-col gap-5.5 p-3">
            <div>
            <label className="mb-3 block text-black dark:text-white">
                    الفرع
            </label>
                <select name="branch" id="branch" className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary' value={socialInsurance.BranchId} onChange={inputBindHandler('BranchId')}>
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
                        <button onClick={handleCreate} className="w-75 inline-flex items-center justify-center gap-2.5 rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" style={{margin: "auto"}}>اضافة التأمين</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SocialInsuranceForm;
