import { AuthorizationRow, setError, setFormToShow, updateAuthorization } from "./authorizationSlice";
import React, { useState } from 'react';
import { validateAuthorization } from "./authorizationRequest";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { formatDate } from "../../utils/utilityFunctions";

const AuthorizationDetails: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [authorization, setAuthorization] = useState<any>(useSelector((state: RootState) => state.authorizations.selectedAuthorization));
    const client = useSelector((state: RootState) => state.clients.selectedClient);  

    const [isUpdate, setIsUpdate] = React.useState<boolean>(false)

    const inputBindHandler = (key: keyof AuthorizationRow) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthorization({ ...authorization, [key]: e.target.value });    
    };

    const handleUpdate = () => {
        if (!isUpdate) {
            setIsUpdate(true)
        } else {
            let error = validateAuthorization(authorization);
            if (error) {
                dispatch(setError(error));
            } else {
                dispatch(updateAuthorization({authorization, clientId: client?.id || 0}))
                setIsUpdate(false)
            }    
        }
    }
    
    return (
        <div>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                  تعديل التوكيل 
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
                            value={authorization.principal} onChange={inputBindHandler('principal')}
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
                            value={authorization.principalType} onChange={inputBindHandler('principalType')}
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

export default AuthorizationDetails;