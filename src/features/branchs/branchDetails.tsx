import { BranchRow, setError, setFormToShow, updateBranch } from "./branchSlice";
import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import { validateBranch } from "./branchRequest";
import { formatDate } from "../../utils/utilityFunctions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";

const BranchDetails: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [branch, setBranch] = useState<any>(useSelector((state: RootState) => state.branches.selectedBranch));
    const client = useSelector((state: RootState) => state.clients.selectedClient);  

    const [isUpdate, setIsUpdate] = React.useState<boolean>(false)

    const inputBindHandler = (key: keyof BranchRow) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setBranch({ ...branch, [key]: e.target.value });    
    };

    const handleChangeIsMain = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBranch({...branch, ["isMain"]: event.target.checked});
      };

    const handleUpdate = () => {
        if (!isUpdate) {
            setIsUpdate(true)
        } else {
            let error = validateBranch(branch);
            if (error) {
                dispatch(setError(error));
            } else {
                dispatch(updateBranch({branch, clientId: client?.id || 0}))
                setIsUpdate(false)
            }    
        }
    }
    
    return (
        <div>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                  تعديل الفرع
                </h2>

                <nav>
                    <button className="inline-flex bg-primary items-center justify-center gap-2.5 rounded-full bg-meta-3 py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-5" onClick={() => dispatch(setFormToShow(1))}>رجوع للقائمة</button>
                </nav>
              </div>
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
                                disabled={!isUpdate || false}
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
                                disabled={!isUpdate || false}
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
                                disabled={!isUpdate || false}
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
                                disabled={!isUpdate || false}
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
                                value={formatDate(branch.dateRentalContract)}
                                onChange={inputBindHandler('dateRentalContract')}
                                disabled={!isUpdate || false}
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
                                disabled={!isUpdate || false}
                                />
                                <span style={{marginRight: 8}}> 
                                غير رئيسي
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5.5 p-3" style={{gridColumn: "span 2"}}>
                        <button onClick={() => handleUpdate()} className="w-75 inline-flex items-center justify-center gap-2.5 rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" style={{margin: "auto"}}>{ isUpdate ? "تحديث" : "تعديل" }</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BranchDetails;