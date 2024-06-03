import { clientRow, updateClient } from "../../../../services/clientServices";
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { BranchRow, BranchType, createBranch, deleteBranch, getBranches } from "../../../../services/branchesServices";
import BranchesList from "../branchs/branchesTable";
import BranchForm from "../branchs/createBranch";
import { VatRow, VatType, createVat, deleteVat, getVats } from "../../../../services/vatServices";
import VatList from "../vats/vatsTable";
import VatForm from "../vats/createVat";
import { formatDate } from "../../../../services/globalMethods";

interface formProps {
    client_prop: clientRow,
    goBack: () => void
}

const showSuccessMsg = (msg:string) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  
  
const Client: React.FC<formProps> = ({client_prop, goBack}) => {
    const [client, setClient] = useState<clientRow>(client_prop);
    const [slectedTab, setSelectedTab] = React.useState(1);
    const [brnaches, setBranches] = React.useState<BranchRow[]>([]);
    const [vats, setVats] = React.useState<VatRow[]>([]);
    const [showBranchForm, setShowBranchForm] = React.useState<boolean>(false)
    const [showVatForm, setShowVatForm] = React.useState<boolean>(false)
    const [isUpdate, setIsUpdate] = React.useState<boolean>(false)
    
    const inputBindHandler = (key: keyof clientRow) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setClient({ ...client, [key]: e.target.value });    
    };

    const handleToggleTabs = (
      event: React.MouseEvent<HTMLElement>,
      slectedTabE: number,
    ) => {
      setSelectedTab(slectedTabE || slectedTab);
      if (slectedTabE = 2) 
            setShowBranchForm(false)
      if (slectedTabE = 3) 
            setShowVatForm(false)
    };

    const handleClickUpdateBtn = () => {
        if (!isUpdate) {
            setIsUpdate(true)
        } else {
            updateClient(client).then(res => {
                if (res.data.isSuccess == true) {
                    // got to client details
                    showSuccessMsg("تم التحديث بنجاح")
                    setIsUpdate(false)
                }
            })
        }
      }
    
    const handleCreateBranch = (branch: BranchType) => {
            createBranch(branch, client.id).then(res => {
                if (res.data.isSuccess == true) {
                    getBranches(10, 1, client.id).then(data => {
                        setBranches(data.data.data)
                        setShowBranchForm(false)
                        showSuccessMsg("تم اضافة الفرع بنجاح")
                }).catch(error => {
                    console.error(error);
                });
            }
        })        
    }

    const handleDeleteBranch = (id: number) => {
        deleteBranch(id, client.id).then(res => {
            if(res.data.isSuccess) {
                showSuccessMsg("تم حذف الفرع بنجاح")
                getBranches(10, 1, client.id).then(data => {
    
                    setBranches(data.data.data)
            
                }).catch(error => {
                    console.error(error);
                });        
            }
        })
    }

    const handleCreateVat = (vat: VatType) => {
                createVat(vat, client.id).then(res => {
                    if (res.data.isSuccess == true) {
                        getVats(10, 1, client.id).then(data => {
                            setVats(data.data.data)
                            setShowVatForm(false)
                            showSuccessMsg("تم اضافة بنجاح")
                    }).catch(error => {
                        console.error(error);
                    });
                }
            })        
    }

    const handleDeleteVat = (id: number) => {
        deleteVat(id, client.id).then(res => {
            if(res.data.isSuccess) {
                showSuccessMsg("تم الحذف بنجاح")
                getVats(10, 1, client.id).then(data => {
    
                    setVats(data.data.data)
            
                }).catch(error => {
                    console.error(error);
                });        
            }
        })
    }


    React.useEffect(() => {

        getBranches(10, 1, client.id).then(data => {
    
            setBranches(data.data.data)
    
        }).catch(error => {
            console.error(error);
        });

        getVats(10, 1, client.id).then(data => {
    
            setVats(data.data.data)
    
        }).catch(error => {
            console.error(error);
        });
    
    }, [slectedTab]);     
    return (
        <>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                عرض بيانات {client.companyName}
              </h2>
                <nav>
                  <button className="inline-flex items-center justify-center gap-2.5 rounded-full bg-black py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-5" onClick={goBack}>رجوع للقائمة</button>
                </nav>
            </div>

            <div className="flex flex-col gap-9">
                <div style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
                    <ToggleButtonGroup
                        color="standard"
                        value={slectedTab}
                        exclusive
                        onChange={handleToggleTabs}
                        aria-label="Platform"
                        >
                        <ToggleButton value={3}>
                            <span className="text-black dark:text-white">
                                قيمة مضافة
                            </span>
                        </ToggleButton>
                        <ToggleButton value={2}>
                            <span className="text-black dark:text-white">
                                الفروع
                            </span>
                        </ToggleButton>
                        <ToggleButton value={1}>
                            <span className="text-black dark:text-white">
                                البيانات    
                            </span>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
                
                {
                    slectedTab == 1 && (
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
                                        disabled={!isUpdate || false}
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
                                        disabled={!isUpdate || false}
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
                                        disabled={!isUpdate || false}
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
                                        disabled={!isUpdate || false}
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
                                        disabled={!isUpdate || false}
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
                                        disabled={!isUpdate || false}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-5.5 p-3" >
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        تاريخ القيد بالسجل التجاري 
                                    </label>
                                    <input
                                        type="date"
                                        placeholder="تاريخ القيد بالسجل التجاري "
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        value={formatDate(client.entryDate)}
                                        onChange={inputBindHandler('entryDate')}
                                        disabled={!isUpdate || false}
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
                                        disabled={!isUpdate || false}
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
                                        disabled={!isUpdate || false}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-5.5 p-3" >
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        تاريخ صدورة 
                                    </label>
                                    <input
                                        type="date"
                                        placeholder="تاريخ صدورة "
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        value={formatDate(client.releaseDate)}
                                        onChange={inputBindHandler('releaseDate')}
                                        disabled={!isUpdate || false}
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
                                        value={formatDate(client.dateLastRenewal)}
                                        onChange={inputBindHandler('dateLastRenewal')}
                                        disabled={!isUpdate || false}
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
                                        value={formatDate(client.dateLastRecord)}
                                        onChange={inputBindHandler('dateLastRecord')}
                                        disabled={!isUpdate || false}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-5.5 p-3" >
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        رأس المال 
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="رأس المال"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        value={client.investedCapital}
                                        onChange={inputBindHandler('investedCapital')}
                                        disabled={!isUpdate || false}
                                    />
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
                                        disabled={!isUpdate || false}
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
                                        disabled={!isUpdate || false}
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
                                        disabled={!isUpdate || false}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-5.5 p-3" style={{gridColumn: "span 2"}}>
                                <button onClick={() => handleClickUpdateBtn()} className="w-75 inline-flex items-center justify-center gap-2.5 rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" style={{margin: "auto"}}>{ isUpdate ? "تحديث" : "تعديل" }</button>
                            </div>
                        </div>
                    )
                }

                {
                    slectedTab == 2 && (
                        (
                            brnaches && brnaches.length > 0 && !showBranchForm ? (
                                <>
                                    <BranchesList branchs={brnaches} client_id={client.id} goToAdd={() => setShowBranchForm(true)} deleteBranch={handleDeleteBranch}/>
                                </>
                            ) : (
                                <BranchForm createMethod={handleCreateBranch}/>
                            )
                        )
                    )
                }
                {
                    slectedTab == 3 && (
                        (
                            vats && vats.length > 0 && !showVatForm ? (
                                <>
                                    <VatList vats={vats} client_id={client.id} deleteVat={handleDeleteVat} goToAdd={() => setShowVatForm(true)}/>
                                </>
                            ) : (
                                <VatForm createMethod={handleCreateVat}/>
                            )
                        )
                    )
                }
                <ToastContainer />
            </div>
        </>
    )
}

export default Client;