import { ClientType, createClient, setError, setFormToShow } from "./clientSlice";
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { validateClient } from "./clientRequest";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";

const CreateClient: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [client, setClient] = useState({
        code: "",
        fileStatus: "",
        companyName: "",
        tradeName: "",
        activity: "",
        legalEntity: "",
        entryDate: "",
        issuingAuthority: "",
        commercialRegisterNum: "",
        releaseDate: "",
        dateLastRenewal: "",
        dateLastRecord: "",
        licensed: "",
        source: "",
        paid: "",
        establishmentNewspaper: "",
        establishmentAttach: ""
      });
    
    const inputBindHandler = (key: keyof ClientType) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setClient({ ...client, [key]: e.target.value });    
    };

    const handleValidateNCreate = () => {
        let error = validateClient(client)
        if (error) {
            dispatch(setError({error: error}));
        } else {
            dispatch(createClient(client));
        }
    }

    return (
        <div className="flex flex-col gap-9">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    اضافة عميل
                </h2>
                <nav>
                  <button className="inline-flex items-center justify-center gap-2.5 rounded-full bg-black py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-5" onClick={() => dispatch(setFormToShow({ formToShow: 1 }))} >رجوع للقائمة</button>
                </nav>
            </div>

            <div className="p-5 grid grid-cols-1 gap-2 sm:grid-cols-2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-col gap-5.5 p-3" >
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            كود العميل
                        </label>
                        <input
                            type="text"
                            placeholder="كود العميل"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={client.code}
                            onChange={inputBindHandler('code')}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-3" >
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            حاله الملف
                        </label>
                        <input
                            type="text"
                            placeholder="حاله الملف"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={client.fileStatus}
                            onChange={inputBindHandler('fileStatus')}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-3" >
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            أسم الشركه
                        </label>
                        <input
                            type="text"
                            placeholder="أسم الشركه"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={client.companyName}
                            onChange={inputBindHandler('companyName')}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-3" >
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            السمه التجاريه
                        </label>
                        <input
                            type="text"
                            placeholder="السمه التجاريه"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={client.tradeName}
                            onChange={inputBindHandler('tradeName')}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-3" >
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            النشاط
                        </label>
                        <input
                            type="text"
                            placeholder="النشاط"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={client.activity}
                            onChange={inputBindHandler('activity')}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-3" >
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            الكيان القانوني
                        </label>
                        <input
                            type="text"
                            placeholder="الكيان القانوني"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={client.legalEntity}
                            onChange={inputBindHandler('legalEntity')}
                        />
                    </div>
                </div>
                <div className="p-5 grid grid-cols-1 gap-2 sm:grid-cols-2 rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark my-4" style={{gridColumn: "span 2"}}>
                    <h2 className="text-black dark:text-white mb-5 text-center border-b pb-4 border-b-stroke" style={{gridColumn: 'span 2', fontWeight: 600, fontSize: 22}}>
                        بيانات السجل الضريبي
                    </h2>
                    <div className="flex flex-col gap-5.5 p-3" >
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                تاريخ القيد بالسجل التجاري 
                            </label>
                            <input
                                type="date"
                                placeholder="تاريخ القيد بالسجل التجاري "
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={client.entryDate}
                                onChange={inputBindHandler('entryDate')}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5.5 p-3" >
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                جهه صدورة
                            </label>
                            <input
                                type="text"
                                placeholder="جهه صدورة"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={client.issuingAuthority}
                                onChange={inputBindHandler('issuingAuthority')}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5.5 p-3" >
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                رقم السجل التجاري 
                            </label>
                            <input
                                type="text"
                                placeholder="رقم السجل التجاري"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={client.commercialRegisterNum}
                                onChange={inputBindHandler('commercialRegisterNum')}
                            />
                        </div>
                    </div >
                    <div className="flex flex-col gap-5.5 p-3" >
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                تاريخ صدورة 
                            </label>
                            <input
                                type="date"
                                placeholder="تاريخ صدورة "
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={client.releaseDate}
                                onChange={inputBindHandler('releaseDate')}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5.5 p-3" >
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                تاريخ أخر تجديد 
                            </label>
                            <input
                                type="date"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={client.dateLastRenewal}
                                onChange={inputBindHandler('dateLastRenewal')}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5.5 p-3" >
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                تاريخ اخر سجل
                            </label>
                            <input
                                type="date"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={client.dateLastRecord}
                                onChange={inputBindHandler('dateLastRecord')}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-3" >
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            مرخص به 
                        </label>
                        <input
                            type="text"
                            placeholder="مرخص به"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={client.licensed}
                            onChange={inputBindHandler('licensed')}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-3" >
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            مصدر
                        </label>
                        <input
                            type="text"
                            placeholder="مصدر"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={client.source}
                            onChange={inputBindHandler('source')}
                            />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-3" >
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            مدفوع
                        </label>
                        <input
                            type="text"
                            placeholder="مدفوع"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={client.paid}
                            onChange={inputBindHandler('paid')}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-3">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                        عقد التأسيس
                        </label>
                        <input type="text" placeholder="عقد التأسيس"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={client.establishmentAttach} onChange={inputBindHandler('establishmentAttach')} 
                            />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-3" style={{gridColumn: "span 2"}}>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            صحيفه الشركات بالتأسيس
                        </label>
                        <input type="text" placeholder="صحيفه الشركات بالتأسيس"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={client.establishmentNewspaper} onChange={inputBindHandler('establishmentNewspaper')} 
                            
                            />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-3" style={{gridColumn: "span 2"}}>
                    <button onClick={() => handleValidateNCreate()} className="w-75 inline-flex items-center justify-center gap-2.5 rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" style={{margin: "auto"}}>اضافة العميل</button>
                </div>
            </div>
        </div>
    )
}

export default CreateClient;
