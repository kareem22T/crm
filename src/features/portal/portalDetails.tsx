import React, { useEffect, useState } from 'react';
import { validatePortal } from './portalRequest';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { PortalRow, getPortal, setError, updatePortal } from './portalSlice';

const PortalDetails: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const client = useSelector((state: RootState) => state.clients.selectedClient);  
    const portalFromState = useSelector((state: RootState) => state.portal.portal);

    const [portal, setPortal] = useState<PortalRow | null>(portalFromState);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    useEffect(() => {
        if (client?.id) {
            dispatch(getPortal({ clientId: client.id }));
        }
    }, [dispatch, client?.id]);

    useEffect(() => {
        setPortal(portalFromState);
    }, [portalFromState]);

    const inputBindHandler = (key: keyof PortalRow) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (portal)
            setPortal({ ...portal, [key]: e.target.value });
    };

    const handleUpdate = () => {
        if (!isUpdate) {
            setIsUpdate(true);
        } else {
            let error;
            if (portal)
                error = validatePortal(portal);

            if (error) {
                dispatch(setError(error));
            } else {
                if (portal)
                    dispatch(updatePortal({ portal, clientId: client?.id || 0 }));
                setIsUpdate(false);
            }
        }
    };

    return (
        <div>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    تعديل بيانات البوابة
                </h2>
            </div>
            {portal && (
                <div className="flex flex-col gap-9">
                    <div className="p-5 grid grid-cols-1 gap-2 sm:grid-cols-2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="flex flex-col gap-5.5 p-3">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    نوع البوابة
                                </label>
                                <input type="text" placeholder="نوع البوابة"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    value={portal.portalType} onChange={inputBindHandler('portalType')} 
                                    disabled={!isUpdate || false}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5.5 p-3">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    البريد الإلكتروني
                                </label>
                                <input type="text" placeholder="البريد الإلكتروني"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    value={portal.email} onChange={inputBindHandler('email')} 
                                    disabled={!isUpdate || false}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5.5 p-3">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    كلمة مرور البريد الإلكتروني
                                </label>
                                <input type="text" placeholder="كلمة مرور البريد الإلكتروني"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    value={portal.passwordEmail} onChange={inputBindHandler('passwordEmail')} 
                                    disabled={!isUpdate || false}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5.5 p-3">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    اسم المستخدم
                                </label>
                                <input type="text" placeholder="اسم المستخدم"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    value={portal.username} onChange={inputBindHandler('username')} 
                                    disabled={!isUpdate || false}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5.5 p-3">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    كلمة مرور الموقع
                                </label>
                                <input type="text" placeholder="كلمة مرور الموقع"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    value={portal.passwordWebsite} onChange={inputBindHandler('passwordWebsite')} 
                                    disabled={!isUpdate || false}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5.5 p-3">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    كلمة مرور ضرائب الرواتب
                                </label>
                                <input type="text" placeholder="كلمة مرور ضرائب الرواتب"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    value={portal.salariesTaxPassWord} onChange={inputBindHandler('salariesTaxPassWord')} 
                                    disabled={!isUpdate || false}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5.5 p-3">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    رمز المحاسب
                                </label>
                                <input type="text" placeholder="رمز المحاسب"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    value={portal.accountantCode} onChange={inputBindHandler('accountantCode')} 
                                    disabled={!isUpdate || false}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5.5 p-3">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    انتهاء اشتراك البوابة
                                </label>
                                <input type="checkbox" 
                                    className="w-5 h-5 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    checked={portal.portalSubscriptionExpiry} 
                                    onChange={() => setPortal({ ...portal, portalSubscriptionExpiry: !portal.portalSubscriptionExpiry })} 
                                    disabled={!isUpdate || false}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5.5 p-3" style={{gridColumn: "span 2"}}>
                            <button onClick={() => handleUpdate()} className="w-75 inline-flex items-center justify-center gap-2.5 rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" style={{margin: "auto"}}>{ isUpdate ? "تحديث" : "تعديل" }</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PortalDetails;
