import { BranchType } from "../../../../services/branchesServices";
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Switch from '@mui/material/Switch';
import { validateBranch } from "./branchRequest";

interface formProps {
    createMethod: (branch: BranchType) => void,
    Back:()=>void
}

const showErrorMessage = (msg:string) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
};

const BranchForm: React.FC<formProps> = ({createMethod,Back}) => {
    const [branch, setBranch] = useState<BranchType>({
        dateRentalContract: "",
        address: "",
        manager: "",
        phoneNumber: "",
        email: "",
        isMain: false
    });
    
    const inputBindHandler = (key: keyof BranchType) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setBranch({ ...branch, [key]: e.target.value });    
    };

    const handleChangeIsMain = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBranch({...branch, ["isMain"]: event.target.checked});
      };
      const handleBack= ()=>{
        Back();
    }
    const handleValidateNCreate = () => {
        let error = validateBranch(branch)
        if (error) {
            showErrorMessage(error)
        } else {
            createMethod(branch)
        }
    }

    return (
        <div className="flex flex-col gap-9">
            {/* <!-- Input Fields --> */}
            <div className="p-5 grid grid-cols-1 gap-2 sm:grid-cols-2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-col gap-5.5 p-3" >
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            عنوان الفروع
                        </label>
                        <input
                            type="text"
                            placeholder="عنوان الفروع"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={branch.address}
                            onChange={inputBindHandler('address')}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-3" >
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            المدير المسئول
                        </label>
                        <input
                            type="text"
                            placeholder="المدير المسئول"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={branch.manager}
                            onChange={inputBindHandler('manager')}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-3" >
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            رقم التليفون  للتواصل
                        </label>
                        <input
                            type="text"
                            placeholder="رقم التليفون  للتواصل"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={branch.phoneNumber}
                            onChange={inputBindHandler('phoneNumber')}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-3" >
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            إيميل للتواصل
                        </label>
                        <input
                            type="text"
                            placeholder="إيميل للتواصل"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={branch.email}
                            onChange={inputBindHandler('email')}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-3" >
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            تاريخ عقد الإيجار
                        </label>
                        <input
                            type="date"
                            placeholder="تاريخ عقد الإيجار"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={branch.dateRentalContract}
                            onChange={inputBindHandler('dateRentalContract')}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-3" >
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            عنوان المركز الرئيسي
                        </label>
                        <div 
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
                        >
                            <span style={{marginLeft: 8}}> 
                                رئيسي
                            </span>
                            <Switch
                            checked={branch.isMain}
                            onChange={handleChangeIsMain}
                            inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <span style={{marginRight: 8}}> 
                            غير رئيسي
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-3" >
                    <button onClick={() => handleValidateNCreate()} className="w-75 inline-flex items-center justify-center gap-2.5 rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" style={{margin: "auto"}}>اضافة الفرع</button>
                </div>
                <div className="flex flex-col gap-5.5 p-3" >
                    <button onClick={() => handleBack()} className="w-75 inline-flex items-center justify-center gap-2.5 rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" style={{margin: "auto",backgroundColor:"#1C2434"}}>رجوع</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default BranchForm;