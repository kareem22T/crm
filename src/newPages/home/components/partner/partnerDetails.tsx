import { PartnerRow } from "../../../../services/partnerServices";
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validatePartner } from "./partnerRequest";

interface formProps {
    updateMethod: (partner: PartnerRow) => boolean,
    partner_prop: PartnerRow
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
  


const PartnerDetails: React.FC<formProps> = ({updateMethod, partner_prop}) => {
    const [partner, setPartner] = useState<PartnerRow>(partner_prop);
    const [isUpdate, setIsUpdate] = React.useState<boolean>(false)

    const inputBindHandler = (key: keyof PartnerRow) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setPartner({ ...partner, [key]: e.target.value });    
    };
    
    const handleUpdate = () => {
        
        if (isUpdate) {
            let error = validatePartner(partner)
                if (error) {
                    showErrorMessage(error)
            } else {                
                let update = updateMethod(partner)
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
                    أسم الشريك 
                </label>
                <input type="text" placeholder="أسم الشريك"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={partner.name} onChange={inputBindHandler('name')} 
                    disabled={!isUpdate || false}
                    />
            </div>
        </div>
        <div className="flex flex-col gap-5.5 p-3">
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    نسبه المساهمه
                </label>
                <input type="text" placeholder="نسبه المساهمه"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={partner.contributionRatio} onChange={inputBindHandler('contributionRatio')} 
                    disabled={!isUpdate || false}
                    />
            </div>
        </div>
        <div className="flex flex-col gap-5.5 p-3">

            <div>
                <label className="mb-3 block text-black dark:text-white">
                    قيمه المساهمه 
                </label>
                <input type="text" placeholder="قيمه المساهمه "
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={partner.contributionValue} onChange={inputBindHandler('contributionValue')} 
                    disabled={!isUpdate || false}
                    />
            </div>
        </div>
        <div className="flex flex-col gap-5.5 p-3">

            <div>
                <label className="mb-3 block text-black dark:text-white">
                    الرقم القومي
                </label>
                <input type="text" placeholder="الرقم القومي"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={partner.nationalId} onChange={inputBindHandler('nationalId')} 
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

export default PartnerDetails;