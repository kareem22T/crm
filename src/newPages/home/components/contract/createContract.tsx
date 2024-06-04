import { ContractType } from "../../../../services/contractServices";
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateContract } from "./contractRequest";

interface formProps {
createMethod: (contract: ContractType) => void;
Back:()=>void
}

const showErrorMessage = (msg:string) => {
toast.error(msg, {
position: toast.POSITION.TOP_RIGHT,
});
};

const ContractForm: React.FC<formProps> = ({createMethod,Back}) => {
const [contract, setContract] = useState<ContractType>({
    establishmentNewspaper: "",
    editedNewspaper: "",
    establishmentAttach: "",
    editedAttach: ""
});

const inputBindHandler = (key: keyof ContractType) => (e: React.ChangeEvent<HTMLInputElement>) => {
setContract({ ...contract, [key]: e.target.value });
};
const handleBack= ()=>{
    Back();
}
const handleValidateNCreate = () => {
    let error = validateContract(contract)
    if (error) {
    showErrorMessage(error)
    } else {
    createMethod(contract)
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
                        عقد التأسيس
                        </label>
                        <input type="text" placeholder="عقد التأسيس"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={contract.establishmentNewspaper} onChange={inputBindHandler('establishmentNewspaper')} 
                            
                            />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-3">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            صحيفه الشركات بالتأسيس
                        </label>
                        <input type="text" placeholder="صحيفه الشركات بالتأسيس"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={contract.editedNewspaper} onChange={inputBindHandler('editedNewspaper')} 
                            
                            />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-3">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            عقود  التعديل
                        </label>
                        <input type="text" placeholder="عقود  التعديل"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={contract.establishmentAttach} onChange={inputBindHandler('establishmentAttach')} 
                            
                            />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-3">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            صحيفه الشركات بالتعديل 
                        </label>
                        <input type="text" placeholder="صحيفه الشركات بالتعديل "
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={contract.editedAttach} onChange={inputBindHandler('editedAttach')} 
                            
                            />
                    </div>
                </div>
        <div className="flex flex-col gap-5.5 p-3" >
            <button onClick={()=> handleValidateNCreate()} className="w-75 inline-flex items-center
                justify-center gap-2.5 rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white
                hover:bg-opacity-90 lg:px-8 xl:px-10" style={{margin: "auto"}}>اضافة </button>
        </div>
        <div className="flex flex-col gap-5.5 p-3" >
                    <button onClick={() => handleBack()} className="w-75 inline-flex items-center justify-center gap-2.5 rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" style={{margin: "auto",backgroundColor:"#1C2434"}}>رجوع</button>
                </div>
    </div>
    <ToastContainer />
</div>
)
}

export default ContractForm;