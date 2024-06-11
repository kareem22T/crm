import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { InvoiceType, createInvoice, setError } from './invoiceSlice';
import { validateInvoice } from './invoiceRequest';

const InvoiceForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const client = useSelector((state: RootState) => state.clients.selectedClient);

    const [invoice, setInvoice] = useState<InvoiceType>({
        id: 0,
        username: '',
        password: '',
        passToken: '',
        subscriptionDate: '',
        renewalDate: '',
        portalActivation: false,
        eInvoiceRegistration: ''
    });

    const inputBindHandler = (key: keyof InvoiceType) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = key === 'portalActivation' ? e.target.checked : e.target.value;
        setInvoice({ ...invoice, [key]: value });
    };

    const handleCreate = () => {
        let error = validateInvoice(invoice);
        if (error) {
            dispatch(setError(error));
        } else {
            dispatch(createInvoice({ invoice, clientId: client?.id || 0 }));
        }
    };

    return (
        <div>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    بيانات الفاتورة
                </h2>
            </div>
            <div className="flex flex-col gap-9">
                <div className="p-5 grid grid-cols-1 gap-2 sm:grid-cols-2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="flex flex-col gap-5.5 p-3">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                اسم المستخدم
                            </label>
                            <input type="text" placeholder="اسم المستخدم"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={invoice.username} onChange={inputBindHandler('username')} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5.5 p-3">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                كلمة المرور
                            </label>
                            <input type="password" placeholder="كلمة المرور"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={invoice.password} onChange={inputBindHandler('password')} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5.5 p-3">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                رمز المرور
                            </label>
                            <input type="text" placeholder="رمز المرور"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={invoice.passToken} onChange={inputBindHandler('passToken')} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5.5 p-3">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                تاريخ الاشتراك
                            </label>
                            <input type="date" placeholder="تاريخ الاشتراك"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={invoice.subscriptionDate} onChange={inputBindHandler('subscriptionDate')} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5.5 p-3">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                تاريخ التجديد
                            </label>
                            <input type="date" placeholder="تاريخ التجديد"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={invoice.renewalDate} onChange={inputBindHandler('renewalDate')} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5.5 p-3">
                        <div className="flex items-center">
                            <label className="ml-2 text-black dark:text-white">
                                تفعيل البوابة
                            </label>
                            <br />
                        </div>
                        <input type="checkbox" 
                            className="w-5 h-5 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            checked={invoice.portalActivation} onChange={inputBindHandler('portalActivation')} />
                    </div>
                    <div className="flex flex-col gap-5.5 p-3" style={{gridColumn: "span 2"}}>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                تسجيل الفاتورة الإلكترونية
                            </label>
                            <input type="text" placeholder="تسجيل الفاتورة الإلكترونية"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={invoice.eInvoiceRegistration} onChange={inputBindHandler('eInvoiceRegistration')} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5.5 p-3" style={{ gridColumn: "span 2" }}>
                        <button onClick={handleCreate} className="w-75 inline-flex items-center justify-center gap-2.5 rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" style={{ margin: "auto" }}>حفظ الفاتورة</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoiceForm;
