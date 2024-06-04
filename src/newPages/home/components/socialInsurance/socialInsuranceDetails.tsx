import { SocialInsuranceRow } from "../../../../services/socialInsuranceServices";
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Switch from '@mui/material/Switch';
import { validateSocialInsurance } from "./socialInsuranceRequest";
import { formatDate } from "../../../../services/globalMethods";

interface formProps {
    updateMethod: (socialInsurance: SocialInsuranceRow) => boolean,
    socialInsurance_prop: SocialInsuranceRow
}

const showErrorMessage = (msg:string) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
};
const showSuccessMsg = (msg:string) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  


const SocialInsuranceDetails: React.FC<formProps> = ({updateMethod, socialInsurance_prop}) => {
    const [socialInsurance, setSocialInsurance] = useState<SocialInsuranceRow>(socialInsurance_prop);
    const [isUpdate, setIsUpdate] = React.useState<boolean>(false)

    const inputBindHandler = (key: keyof SocialInsuranceRow) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setSocialInsurance({ ...socialInsurance, [key]: e.target.value });    
    };
    
    const handleUpdate = () => {
        
        if (isUpdate) {
            let error = validateSocialInsurance(socialInsurance)
                if (error) {
                    showErrorMessage(error)
            } else {                
                let update = updateMethod(socialInsurance)
                if (update) {
                    showSuccessMsg("تم التحديث بنجاح")
                    setIsUpdate(false)
                }
            }
        } else {
            setIsUpdate(true)
        }
    }
    return (
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

                <div className="flex flex-col gap-5.5 p-3" style={{gridColumn: "span 2"}}>
                    <button onClick={() => handleUpdate()} className="w-75 inline-flex items-center justify-center gap-2.5 rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" style={{margin: "auto"}}>{ isUpdate ? "تحديث" : "تعديل" }</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default SocialInsuranceDetails;