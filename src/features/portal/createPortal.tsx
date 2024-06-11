import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { PortalType, createPortal, setError, setFormToShow } from './portalSlice';
import { validatePortal } from './portalRequest';

const PortalForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const client = useSelector((state: RootState) => state.clients.selectedClient);

    const [portal, setPortal] = useState<PortalType>({
        portalType: "",
        email: "",
        passwordEmail: "",
        username: "",
        passwordWebsite: "",
        salariesTaxPassWord: "",
        accountantCode: "",
        portalSubscriptionExpiry: false
    });

    const inputBindHandler = (key: keyof PortalType) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = key === 'portalSubscriptionExpiry' ? e.target.checked : e.target.value;
        setPortal({ ...portal, [key]: value });
    };

    const handleCreate = () => {
        // Assuming a validatePortal function exists similar to validatePartner
        let error = validatePortal(portal);
        if (error) {
            dispatch(setError(error));
        } else {
            dispatch(createPortal({ portal, clientId: client?.id || 0 }));
        }
    };

    return (
        <div>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    بيانات البوابة
                </h2>
            </div>
            <div className="flex flex-col gap-9">
                <div className="p-5 grid grid-cols-1 gap-2 sm:grid-cols-2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="flex flex-col gap-5.5 p-3">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                نوع البوابة
                            </label>
                            <input type="text" placeholder="نوع البوابة"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={portal.portalType} onChange={inputBindHandler('portalType')} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5.5 p-3">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                البريد الإلكتروني
                            </label>
                            <input type="email" placeholder="البريد الإلكتروني"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={portal.email} onChange={inputBindHandler('email')} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5.5 p-3">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                كلمة مرور البريد الإلكتروني
                            </label>
                            <input type="password" placeholder="كلمة مرور البريد الإلكتروني"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={portal.passwordEmail} onChange={inputBindHandler('passwordEmail')} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5.5 p-3">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                اسم المستخدم
                            </label>
                            <input type="text" placeholder="اسم المستخدم"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={portal.username} onChange={inputBindHandler('username')} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5.5 p-3">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                كلمة مرور الموقع
                            </label>
                            <input type="password" placeholder="كلمة مرور الموقع"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={portal.passwordWebsite} onChange={inputBindHandler('passwordWebsite')} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5.5 p-3">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                كلمة مرور ضرائب الرواتب
                            </label>
                            <input type="password" placeholder="كلمة مرور ضرائب الرواتب"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={portal.salariesTaxPassWord} onChange={inputBindHandler('salariesTaxPassWord')} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5.5 p-3">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                رمز المحاسب
                            </label>
                            <input type="text" placeholder="رمز المحاسب"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={portal.accountantCode} onChange={inputBindHandler('accountantCode')} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5.5 p-3">
                        <div className="flex items-center">
                            <label className="ml-2 text-black dark:text-white">
                                    انتهاء اشتراك البوابة
                            </label>
                            <br />
                        </div>
                        <input type="checkbox" 
                            className="w-5 h-5 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        checked={portal.portalSubscriptionExpiry} onChange={inputBindHandler('portalSubscriptionExpiry')} />
                    </div>
                    <div className="flex flex-col gap-5.5 p-3" style={{ gridColumn: "span 2" }}>
                        <button onClick={handleCreate} className="w-75 inline-flex items-center justify-center gap-2.5 rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" style={{ margin: "auto" }}>حفظ البوابة</button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default PortalForm;
