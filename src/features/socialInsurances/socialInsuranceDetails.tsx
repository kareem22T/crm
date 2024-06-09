import { SocialInsuranceRow, setError, setFormToShow, updateSocialInsurance } from "./socialInsuranceSlice";
import React, { useState } from 'react';
import { validateSocialInsurance } from "./socialInsuranceRequest";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";

const SocialInsuranceDetails: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [socialInsurance, setSocialInsurance] = useState<any>(useSelector((state: RootState) => state.socialInsurances.selectedSocialInsurance));
    const client = useSelector((state: RootState) => state.clients.selectedClient);  

    const [isUpdate, setIsUpdate] = React.useState<boolean>(false)

    const inputBindHandler = (key: keyof SocialInsuranceRow) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setSocialInsurance({ ...socialInsurance, [key]: e.target.value });    
    };

    const handleUpdate = () => {
        if (!isUpdate) {
            setIsUpdate(true)
        } else {
            let error = validateSocialInsurance(socialInsurance);
            if (error) {
                dispatch(setError(error));
            } else {
                dispatch(updateSocialInsurance({socialInsurance, clientId: client?.id || 0}))
                setIsUpdate(false)
            }    
        }
    }
    
    return (
        <div>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                  تعديل التأمين
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
                    موقف التامينات 
                    </label>
                    <input type="text" placeholder="موقف التامينات "
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={socialInsurance.insuranceStatus} onChange={inputBindHandler('insuranceStatus')} 
                        disabled={!isUpdate || false}
                        />
                </div>
            </div>

            <div className="flex flex-col gap-5.5 p-3">
                <div>
                    <label className="mb-3 block text-black dark:text-white">
                    رقم التأمينات الاجتماعية  
                    </label>
                    <input type="text" placeholder="رقم التأمينات الاجتماعية  "
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={socialInsurance.socialInsuranceNum} onChange={inputBindHandler('socialInsuranceNum')} 
                        disabled={!isUpdate || false}
                        />
                </div>
            </div>

            <div className="flex flex-col gap-5.5 p-3">
                <div>
                    <label className="mb-3 block text-black dark:text-white">
                    تابع لتامينات 
                    </label>
                    <input type="text" placeholder="تابع لتامينات "
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={socialInsurance.associatedInsurance} onChange={inputBindHandler('associatedInsurance')} 
                        disabled={!isUpdate || false}
                        />
                </div>
            </div>

            <div className="flex flex-col gap-5.5 p-3">
                <div>
                    <label className="mb-3 block text-black dark:text-white">
                    مرفق
                    </label>
                    <input type="text" placeholder="مرفق"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={socialInsurance.attached} onChange={inputBindHandler('attached')} 
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

export default SocialInsuranceDetails;