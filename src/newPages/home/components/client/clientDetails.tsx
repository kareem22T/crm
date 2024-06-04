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
import { GeneralTaxRow, GeneralTaxType, createGeneralTax, deleteGeneralTax, getGeneralTaxs } from "../../../../services/generalTaxServices";
import GeneralTaxList from "../generalTaxes/generalTaxes";
import GeneralTaxForm from "../generalTaxes/createGeneralTax";
import { SocialInsuranceRow, SocialInsuranceType, createSocialInsurance, deleteSocialInsurance, getSocialInsurances } from "../../../../services/socialInsuranceServices";
import SocialInsuranceList from "../socialInsurance/socialInsurancesTable";
import SocialInsuranceForm from "../socialInsurance/createSocialInsurance";
import PartnerList from "../partner/partnersTable";
import PartnerForm from "../partner/createPartner";
import { PartnerRow, PartnerType, createPartner, deletePartner, getPartners } from "../../../../services/partnerServices";
import { TaxExaminationRow, TaxExaminationType, createTaxExamination, deleteTaxExamination, getTaxExaminations } from "../../../../services/taxExaminationServices";
import TaxExaminationList from "../taxExamination/taxExaminationsTable";
import TaxExaminationForm from "../taxExamination/createTaxExamination";
import { ContractRow, ContractType, createContract, deleteContract, getContracts } from "../../../../services/contractServices";
import ContractList from "../contract/contractsTable";
import ContractForm from "../contract/createContract";
import AuthorizationForm from "../Authorization/createAuthorization";
import AuthorizationList from "../Authorization/authorizationTables";
import { AuthorizationRow, AuthorizationType, createAuthorization, deleteAuthorization, getAuthorizations } from "../../../../services/AuthorizationServices";

interface formProps {
    client_prop: clientRow,
    goBack: () => void
}

const showSuccessMsg = (msg:string) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  
const showErrorMessage = (msg:string) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  
  
const Client: React.FC<formProps> = ({client_prop, goBack}) => {
    const [client, setClient] = useState<clientRow>(client_prop);
    const [slectedTab, setSelectedTab] = React.useState(1);
    const [brnaches, setBranches] = React.useState<BranchRow[]>([]);
    const [vats, setVats] = React.useState<VatRow[]>([]);
    const [generalTaxes, setGeneralTaxes] = React.useState<GeneralTaxRow[]>([]);
    const [socialInsurances, setSocialInsurances] = React.useState<SocialInsuranceRow[]>([]);
    const [partners, setPartners] = React.useState<PartnerRow[]>([]);
    const [taxExaminations, setTaxExaminations] = React.useState<TaxExaminationRow[]>([]);
    const [Authorizations, setAuthorizations] = React.useState<AuthorizationRow[]>([]);
    const [contracts, setContracts] = React.useState<ContractRow[]>([]);
    const [showBranchForm, setShowBranchForm] = React.useState<boolean>(false)
    const [showSocialInsuranceForm, setShowSocialInsurance] = React.useState<boolean>(false)
    const [showGeneralTaxForm, setShowGeneralTaxForm] = React.useState<boolean>(false)
    const [showAuthorizationsForm, setShowAuthorizationsForm] = React.useState<boolean>(false)
    const [showVatForm, setShowVatForm] = React.useState<boolean>(false)
    const [showPartner, setShowPartner] = React.useState<boolean>(false)
    const [showTaxExamination, setShowTaxExamination] = React.useState<boolean>(false)
    const [showContractsForm, setShowContractsForm] = React.useState<boolean>(false)
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
      if (slectedTabE = 4) 
            setShowSocialInsurance(false)
      if (slectedTabE = 5) 
            setShowGeneralTaxForm(false)
      if (slectedTabE = 6) 
            setShowPartner(false)
      if (slectedTabE = 7) 
            setShowTaxExamination(false)
      if (slectedTabE = 8) 
            setShowContractsForm(false)
      if (slectedTabE = 9) 
        setShowAuthorizationsForm(false)
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
            .catch(() => {
                showErrorMessage("حدث خطا ما حاول مرة اخري")
              });              
        }
      }
    
    const handleCreateBranch = (branch: BranchType) => {
            createBranch(branch, client.id).then(res => {
                if (res.data.isSuccess == true) {
                    getBranches(10, 1, client.id).then(data => {
                        setBranches(data.data.data)
                        setShowBranchForm(false)
                        showSuccessMsg("تم الاضافة الفرع بنجاح")
                }).catch(error => {
                    console.error(error);
                });
            }
        })        
        .catch(() => {
            showErrorMessage("حدث خطا ما حاول مرة اخري")
          });          
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
        .catch(() => {
            showErrorMessage("حدث خطا ما حاول مرة اخري")
          });          
    }

    const handleCreateVat = (vat: VatType) => {
                createVat(vat, client.id).then(res => {
                    if (res.data.isSuccess == true) {
                        getVats(10, 1, client.id).then(data => {
                            setVats(data.data.data)
                            setShowVatForm(false)
                            showSuccessMsg("تم الاضافة بنجاح")
                    }).catch(error => {
                        console.error(error);
                    });
                }
            })        
            .catch(() => {
                showErrorMessage("حدث خطا ما حاول مرة اخري")
              });          
    
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
        .catch(() => {
            showErrorMessage("حدث خطا ما حاول مرة اخري")
          });          
    }

    const handleDeleteGeneralTax = (id: number) => {
        deleteGeneralTax(id, client.id).then(res => {
            if(res.data.isSuccess) {
                showSuccessMsg("تم الحذف بنجاح")
                getGeneralTaxs(10, 1, client.id).then(data => {
    
                    setGeneralTaxes(data.data.data)
            
                }).catch(error => {
                    console.error(error);
                });
            }
        })
        .catch(() => {
            showErrorMessage("حدث خطا ما حاول مرة اخري")
          });          
    }

    const handleCreateGeneralTax = (generalTax: GeneralTaxType) => {
        createGeneralTax(generalTax, client.id).then(res => {
                if (res.data.isSuccess == true) {
                    showSuccessMsg("تم الاضافة بنجاح")
                    getGeneralTaxs(10, 1, client.id).then(data => {
                        setGeneralTaxes(data.data.data)
                        setShowGeneralTaxForm(false)
                    }).catch(error => {
                        console.error(error);
                    });
                }
        })  
        .catch(() => {
            showErrorMessage("حدث خطا ما حاول مرة اخري")
          });                
    }

    const handleDeleteSocialInsurance = (id: number) => {
        deleteSocialInsurance(id, client.id).then(res => {
            if(res.data.isSuccess) {
                showSuccessMsg("تم الحذف بنجاح")
                getSocialInsurances(10, 1, client.id).then(data => {
    
                    setSocialInsurances(data.data.data)
            
                }).catch(error => {
                    console.error(error);
                });
            }
        })
        .catch(() => {
            showErrorMessage("حدث خطا ما حاول مرة اخري")
          });          
    }

    const handleCreateSocialInsurance = (socialInsurance: SocialInsuranceType) => {
        createSocialInsurance(socialInsurance, client.id).then(res => {
                if (res.data.isSuccess == true) {
                    showSuccessMsg("تم الاضافة بنجاح")
                    getSocialInsurances(10, 1, client.id).then(data => {
    
                        setSocialInsurances(data.data.data)
                        setShowSocialInsurance(false)

                    }).catch(error => {
                        console.error(error);
                    });
                }
        })        
        .catch(() => {
            showErrorMessage("حدث خطا ما حاول مرة اخري")
          });          
    }

    const handleDeletePartner = (id: number) => {
        deletePartner(id, client.id).then(res => {
            if(res.data.isSuccess) {
                showSuccessMsg("تم الحذف بنجاح")
                getPartners(10, 1, client.id).then(data => {
    
                    setPartners(data.data.data)
            
                }).catch(error => {
                    console.error(error);
                });
            }
        })
        .catch(() => {
            showErrorMessage("حدث خطا ما حاول مرة اخري")
          });          
    }

    const handleCreatePartner = (partner: PartnerType) => {
        createPartner(partner, client.id).then(res => {
                if (res.data.isSuccess == true) {
                    showSuccessMsg("تم الاضافة بنجاح")
                    getPartners(10, 1, client.id).then(data => {
    
                        setPartners(data.data.data)
                        setShowPartner(false)

                    }).catch(error => {
                        console.error(error);
                    });
                }
        })        
        .catch(() => {
            showErrorMessage("حدث خطا ما حاول مرة اخري")
          });          
    }

    const handleDeleteTaxExamination = (id: number) => {
        deleteTaxExamination(id, client.id).then(res => {
            if(res.data.isSuccess) {
                showSuccessMsg("تم الحذف بنجاح")
                getTaxExaminations(10, 1, client.id).then(data => {
    
                    setTaxExaminations(data.data.data)
            
                }).catch(error => {
                    console.error(error);
                });
            
            }
        })
        .catch(() => {
            showErrorMessage("حدث خطا ما حاول مرة اخري")
          });          
    }

    const handleCreateTaxExamination = (taxExamination: TaxExaminationType) => {
        createTaxExamination(taxExamination, client.id).then(res => {
            if (res.data.isSuccess == true) {
                showSuccessMsg("تم الاضافة بنجاح")
                getTaxExaminations(10, 1, client.id).then(data => {

                    setTaxExaminations(data.data.data)
                    setShowTaxExamination(false)
            
                }).catch(error => {
                    console.error(error);
                });
            
            }
        })    
        .catch(() => {
            showErrorMessage("حدث خطا ما حاول مرة اخري")
          });          
    }

    const handleDeleteContract = (id: number) => {
        deleteContract(id, client.id).then(res => {
            if(res.data.isSuccess) {
                showSuccessMsg("تم الحذف بنجاح")
                getContracts(10, 1, client.id)
                .then(data => {
                    setContracts(data.data.data)
                })
                .catch(error => {
                    console.error(error);
                });
            
            }
        })
        .catch(() => {
            showErrorMessage("حدث خطا ما حاول مرة اخري")
          });          
    }

    const handleCreateContract = (contract: ContractType) => {
        createContract(contract, client.id).then(res => {
            if (res.data.isSuccess == true) {
                showSuccessMsg("تم الاضافة بنجاح")
                getContracts(10, 1, client.id)
                .then(data => {
                    setContracts(data.data.data)
                    setShowContractsForm(false);
                })
                .catch(error => {
                    console.error(error);
                });
            
            }
        })        
        .catch(() => {
            showErrorMessage("حدث خطا ما حاول مرة اخري")
          });          
    }

    const handleDeleteAuthorization = (id: number) => {
        deleteAuthorization(id, client.id).then(res => {
            if(res.data.isSuccess) {
                showSuccessMsg("تم الحذف بنجاح")
                getAuthorizations(10, 1, client.id)
                .then(data => {
                    setAuthorizations(data.data.data)
                })
                .catch(error => {
                    console.error(error);
                });            
            }
        })
        .catch(() => {
            showErrorMessage("حدث خطا ما حاول مرة اخري")
          });          
    }

    const handleCreateAuthorization = (authorization: AuthorizationType) => {
        createAuthorization(authorization, client.id).then(res => {
            if (res.data.isSuccess == true) {
                showSuccessMsg("تم الاضافة بنجاح")
                getAuthorizations(10, 1, client.id)
                .then(data => {
                    setAuthorizations(data.data.data)
                    setShowAuthorizationsForm(false);
                })
                .catch(error => {
                    console.error(error);
                });
            }
        })        
        .catch(() => {
            showErrorMessage("حدث خطا ما حاول مرة اخري")
          });          
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
    
        getGeneralTaxs(10, 1, client.id).then(data => {
    
            setGeneralTaxes(data.data.data)
    
        }).catch(error => {
            console.error(error);
        });

        getSocialInsurances(10, 1, client.id).then(data => {
    
            setSocialInsurances(data.data.data)
    
        }).catch(error => {
            console.error(error);
        });

        getPartners(10, 1, client.id).then(data => {
    
            setPartners(data.data.data)
    
        }).catch(error => {
            console.error(error);
        });
    
        getTaxExaminations(10, 1, client.id).then(data => {
    
            setTaxExaminations(data.data.data)
    
        }).catch(error => {
            console.error(error);
        });

        getContracts(10, 1, client.id)
        .then(data => {
            setContracts(data.data.data)
        })
        .catch(error => {
            console.error(error);
        });

        getAuthorizations(10, 1, client.id)
        .then(data => {
            setAuthorizations(data.data.data)
        })
        .catch(error => {
            console.error(error);
        });
    }, []);     

    React.useEffect(() => {
        if (slectedTab === 2) {
            getBranches(10, 1, client.id)
                .then(data => {
                    setBranches(data.data.data)
                })
                .catch(error => {
                    console.error(error);
                });
        } else if (slectedTab === 3) {
            getVats(10, 1, client.id)
                .then(data => {
                    setVats(data.data.data)
                })
                .catch(error => {
                    console.error(error);
                });
        } else if (slectedTab === 4) {
            getSocialInsurances(10, 1, client.id)
                .then(data => {
                    setSocialInsurances(data.data.data)
                })
                .catch(error => {
                    console.error(error);
                });
        } else if (slectedTab === 5) {
            getGeneralTaxs(10, 1, client.id)
            .then(data => {
                setGeneralTaxes(data.data.data)
            })
            .catch(error => {
                console.error(error);
            });
        } else if (slectedTab === 6) {
            getPartners(10, 1, client.id)
                .then(data => {
                    setPartners(data.data.data)
                })
                .catch(error => {
                    console.error(error);
                });
        } else if (slectedTab === 7) {
            getTaxExaminations(10, 1, client.id)
                .then(data => {
                    setTaxExaminations(data.data.data)
                })
                .catch(error => {
                    console.error(error);
                });
        } else if (slectedTab === 8) {
            getContracts(10, 1, client.id)
                .then(data => {
                    setContracts(data.data.data)
                })
                .catch(error => {
                    console.error(error);
                });
        } else if (slectedTab === 9) {
            getAuthorizations(10, 1, client.id)
                .then(data => {
                    setAuthorizations(data.data.data)
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [slectedTab]);
        return (
        <>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-9">
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
                        <ToggleButton value={9}>
                            <span className="text-black dark:text-white">
                            التوكيلات
                            </span>
                        </ToggleButton>
                        <ToggleButton value={8}>
                            <span className="text-black dark:text-white">
                                عقود التاسيس
                            </span>
                        </ToggleButton>
                        <ToggleButton value={7}>
                            <span className="text-black dark:text-white">
                                الفحص الضريبي
                            </span>
                        </ToggleButton>
                        <ToggleButton value={6}>
                            <span className="text-black dark:text-white">
                                الشركاء
                            </span>
                        </ToggleButton>
                        <ToggleButton value={5}>
                            <span className="text-black dark:text-white">
                                الضرائب العامة
                            </span>
                        </ToggleButton>
                        <ToggleButton value={4}>
                            <span className="text-black dark:text-white">
                                التأمينات الاجتماعية
                            </span>
                        </ToggleButton>
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
                                <BranchForm Back={()=> setShowBranchForm(false)} createMethod={handleCreateBranch}/>
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
                                <VatForm Back={() => setShowVatForm(false)} createMethod={handleCreateVat}/>
                            )
                        )
                    )
                }
                {
                    slectedTab == 4 && (
                        (
                            socialInsurances && socialInsurances.length > 0 && !showSocialInsuranceForm ? (
                                <>
                                    <SocialInsuranceList socialInsurances={socialInsurances} client_id={client.id} deleteSocialInsurance={handleDeleteSocialInsurance} goToAdd={() => setShowSocialInsurance(true)}/>
                                </>
                            ) : (
                                <SocialInsuranceForm Back={() => setShowSocialInsurance(false)} createMethod={handleCreateSocialInsurance}/>
                            )
                        )
                    )
                }
                {
                    slectedTab == 5 && (
                        (
                            generalTaxes && generalTaxes.length > 0 && !showGeneralTaxForm ? (
                                <>
                                    <GeneralTaxList generalTaxs={generalTaxes} client_id={client.id} deleteGeneralTax={handleDeleteGeneralTax} goToAdd={() => setShowGeneralTaxForm(true)}/>
                                </>
                            ) : (
                                <GeneralTaxForm Back={() => setShowGeneralTaxForm(false)} createMethod={handleCreateGeneralTax}/>
                            )
                        )
                    )
                }
                {
                    slectedTab == 6 && (
                        (
                            partners && partners.length > 0 && !showPartner ? (
                                <>
                                    <PartnerList partners={partners} client_id={client.id} deletePartner={handleDeletePartner} goToAdd={() => setShowPartner(true)}/>
                                </>
                            ) : (
                                <PartnerForm Back={() => setShowPartner(false)} createMethod={handleCreatePartner}/>
                            )
                        )
                    )
                }
                {
                    slectedTab == 7 && (
                        (
                            taxExaminations && taxExaminations.length > 0 && !showTaxExamination ? (
                                <>
                                    <TaxExaminationList taxExaminations={taxExaminations} client_id={client.id} deleteTaxExamination={handleDeleteTaxExamination} goToAdd={() => setShowTaxExamination(true)}/>
                                </>
                            ) : (
                                <TaxExaminationForm Back={() => setShowTaxExamination(false)} createMethod={handleCreateTaxExamination}/>
                            )
                        )
                    )
                }
                {
                    slectedTab == 8 && (
                        (
                            contracts && contracts.length > 0 && !showContractsForm ? (
                                <>
                                    <ContractList contracts={contracts} client_id={client.id} deleteContract={handleDeleteContract} goToAdd={() => setShowContractsForm(true)}/>
                                </>
                            ) : (
                                <ContractForm Back={() => setShowContractsForm(false)} createMethod={handleCreateContract}/>
                            )
                        )
                    )
                }
                 
                {
                    slectedTab == 9 && (
                        (
                            Authorizations && Authorizations.length > 0 && !showAuthorizationsForm ? (
                                <>
                                    <AuthorizationList Authorizations={Authorizations} client_id={client.id} deleteAuthorization={handleDeleteAuthorization} goToAdd={() => setShowAuthorizationsForm(true)}/>
                                </>
                            ) : (
                                <AuthorizationForm Back={() => setShowAuthorizationsForm(false)} createMethod={handleCreateAuthorization}/>
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