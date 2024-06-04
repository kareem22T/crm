import { AuthorizationType } from "../../../../services/AuthorizationServices";
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {validateAuthorization} from "./AuthorizationRequest"
interface formProps {
    createMethod: (Authorization: AuthorizationType) => void,
    Back: () => void
}

const showErrorMessage = (msg: string) => {
    toast.error(msg, {
        position: toast.POSITION.TOP_RIGHT,
    });
};

const AuthorizationForm: React.FC<formProps> = ({ createMethod, Back }) => {
    const [Authorization, setAuthorization] = useState<AuthorizationType>({
        authorizationNum: "",
        dateAuthorization: "",
        principal: "",
        principalType: "",
        attached: "",
    });


    const handleBack = () => {
        Back();
    }
    const inputBindHandler = (key: keyof AuthorizationType) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthorization({ ...Authorization, [key]: e.target.value });
    };

    const handleValidateNCreate = () => {
        let error = validateAuthorization(Authorization)
        if (error) {
            showErrorMessage(error)
        } else {
            createMethod(Authorization)
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
                            رقم التوكيل
                        </label>
                        <input type="text" placeholder="رقم التوكيل"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={Authorization.authorizationNum} onChange={inputBindHandler('authorizationNum')} />
                    </div>
                </div>

                <div className="flex flex-col gap-5.5 p-3">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            تاريخ التوكيل
                        </label>
                        <input type="date" placeholder="تاريخ التوكيل"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={Authorization.dateAuthorization} onChange={inputBindHandler('dateAuthorization')} />
                    </div>
                </div>

                <div className="flex flex-col gap-5.5 p-3">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            الموكل  
                        </label>
                        <input type="text" placeholder="الموكل"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={Authorization.principal} onChange={inputBindHandler('principal')} />
                    </div>
                </div>

                <div className="flex flex-col gap-5.5 p-3">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                        بالصفة
                        </label>
                        <input type="text" placeholder="بالصفة"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={Authorization.principalType} onChange={inputBindHandler('principalType')} />
                    </div>
                </div>

               

               
                <div className="flex flex-col gap-5.5 p-3" >
                    <button onClick={() => handleValidateNCreate()} className="w-75 inline-flex items-center
                justify-center gap-2.5 rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white
                hover:bg-opacity-90 lg:px-8 xl:px-10" style={{ margin: "auto" }}>اضافة </button>
                </div>
                <div className="flex flex-col gap-5.5 p-3" >
                    <button onClick={() => handleBack()} className="w-75 inline-flex items-center justify-center gap-2.5 rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" style={{ margin: "auto", backgroundColor: "#1C2434" }}>رجوع</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AuthorizationForm;