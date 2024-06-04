import React from 'react';
import { ContractRow, updateContract } from '../../../../services/contractServices';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ContractDetails from './contractDetails';

interface TableProps {
    contracts: ContractRow[],
    client_id: number,
    deleteContract: (id: number) => void,
    goToAdd: () => void,
  }
  
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  
const ContractList: React.FC<TableProps> = ({ contracts, client_id, deleteContract, goToAdd }) => {  
  const [showContractDetails, setShowContractDetails] = React.useState<boolean>(false)
  const [currentContract, setCurrentContract] = React.useState<ContractRow>()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [contractDletet, setContractDelete] = React.useState<ContractRow>()
  const HandleBackTable = ()=>{
    setShowContractDetails(!showContractDetails);
  }
  const showConfirmDelete = (contract: ContractRow) => {
    setContractDelete(contract)
    handleOpen()
  }

  const showContract = (contract: ContractRow) => {
    setCurrentContract(contract)
    setShowContractDetails(true)
  }

  const handleDelete = (id: number) => {
    deleteContract(id)
    handleClose()
  }

  const handleClickUpdateBtn = (contract: ContractRow) : boolean => {
      if (currentContract) {
        updateContract(contract, client_id).then(res => {
          if (res.data.isSuccess == true) {
            return true
          } else {
            return false
          }
        })
      }
      return true
  }

    return (
      <>
        {
          contractDletet && (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <h1 className='text-center ' style={{fontSize: 20, fontWeight: 600}}>
                  هل انت متاكد من هذف  
                  <br />
                  ({contractDletet.establishmentNewspaper})
                </h1>
                <div className="btns flex gap-3 mt-8 justify-center">
                    <button onClick={handleClose} className='inline-flex items-center justify-center gap-2.5 rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10'>
                      الغاء
                    </button>
                    <button onClick={() => handleDelete(contractDletet.id)} className='inline-flex items-center justify-center gap-2.5 rounded-full py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10' style={{background: "#fb5454"}}>
                      حذف
                    </button>
                </div>
              </Box>
            </Modal>
          )
        }
        {
          !showContractDetails ? (
            <>
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                  <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="bg-gray-2 text-right dark:bg-meta-4" style={{whiteSpace: "nowrap"}}>
                            <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">عقد التأسيس</th>
                            <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">صحيفه الشركات بالتأسيس</th>
                            <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">عقود  التعديل</th>
                            <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">صحيفه الشركات بالتعديل</th>
                            <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">التحكم</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contracts.map((contract:ContractRow) => (
                            <tr key={contract.id}>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">{contract.establishmentNewspaper}</p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">{contract.editedNewspaper}</p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">{contract.establishmentAttach}</p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">{contract.editedAttach}</p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <button onClick={() => showContract(contract)} className="inline-flex bg-blck items-center justify-center gap-2.5 rounded-full bg-meta-3 py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-4">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                    <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                  </svg>
                                </button>
                                <button onClick={() => showConfirmDelete(contract)}  style={{background: "#fb5454"}} className="inline-flex items-center justify-center rounded-full bg-black py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-4 mr-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M4 7l16 0" />
                                    <path d="M10 11l0 6" />
                                    <path d="M14 11l0 6" />
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="flex flex-col gap-5.5 p-3" style={{gridColumn: "span 2"}}>
                    <button onClick={goToAdd} className="w-75 inline-flex items-center justify-center gap-2.5 rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" style={{margin: "auto"}}>اضافة  </button>
                </div>
              </>     
          ) :
          (
            currentContract && (
              <ContractDetails Back={HandleBackTable} contract_prop={currentContract} updateMethod={handleClickUpdateBtn} />
            )
          )
        }
      </>
  );
};

export default ContractList;
