import { AuthorizationRow } from "../../../../services/AuthorizationServices";
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateAuthorization } from "./AuthorizationRequest";
import { formatDate } from "../../../../services/globalMethods";

interface formProps {
    updateMethod: (authorization: AuthorizationRow) => boolean,
    authorization_prop: AuthorizationRow,
    Back: () => void
}

const showErrorMessage = (msg: string) => {
    toast.error(msg, {
        position: toast.POSITION.TOP_RIGHT,
    });
};
const showSuccessMsg = (msg: string) => {
    toast.success(msg, {
        position: toast.POSITION.TOP_RIGHT,
    });
};



const AuthorizationDetails: React.FC<formProps> = ({ updateMethod, authorization_prop, Back }) => {
    const [authorization, setAuthorization] = useState<AuthorizationRow>(authorization_prop);
    const [isUpdate, setIsUpdate] = React.useState<boolean>(false)

    const inputBindHandler = (key: keyof AuthorizationRow) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthorization({ ...authorization, [key]: e.target.value });
    };
    const handleBack = () => {
        Back();
    }
    const handleUpdate = () => {

        if (isUpdate) {
            let error = validateAuthorization(authorization)
            if (error) {
                showErrorMessage(error)
            } else {
                let update = updateMethod(authorization)
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
                            رقم التوكيل
                        </label>
                        <input type="text" placeholder="رقم التوكيل"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={authorization.authorizationNum} onChange={inputBindHandler('authorizationNum')}
                            disabled={!isUpdate || false}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-5.5 p-3">
                    <div>
                    <label className="mb-3 block text-black dark:text-white">
                            تاريخ التوكيل
                        </label>
                        <input type="date" placeholder="تاريخ التوكيل"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={formatDate(authorization.dateAuthorization)} onChange={inputBindHandler('dateAuthorization')} 
                            disabled={!isUpdate || false}/>
                    </div>
                </div>

                <div className="flex flex-col gap-5.5 p-3">
                    <div>
                    <label className="mb-3 block text-black dark:text-white">
                            الموكل  
                        </label>
                        <input type="text" placeholder="الموكل"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={formatDate(authorization.principal)} onChange={inputBindHandler('principal')}
                            disabled={!isUpdate || false}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-5.5 p-3">
                    <div>
                    <label className="mb-3 block text-black dark:text-white">
                        بالصفة
                        </label>
                        <input type="text" placeholder="بالصفة"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={formatDate(authorization.principalType)} onChange={inputBindHandler('principalType')}
                            disabled={!isUpdate || false}
                        />
                    </div>
                </div>

              

                <div className="flex flex-col gap-5.5 p-3" >
                    <button onClick={() => handleUpdate()} className="w-75 inline-flex items-center justify-center gap-2.5 rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" style={{ margin: "auto" }}>{isUpdate ? "تحديث" : "تعديل"}</button>
                </div>
                <div className="flex flex-col gap-5.5 p-3" >
                    <button onClick={() => handleBack()} className="w-75 inline-flex items-center justify-center gap-2.5 rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" style={{ margin: "auto", backgroundColor: "#1C2434" }}>رجوع</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AuthorizationDetails;