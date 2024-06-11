import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContractsList from './getContracts';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store'
import CreateContract from './createContract';
import 'react-toastify/dist/ReactToastify.css';
import ContractDetails from './contractDetails';
import { setError, setSuccess } from './contractSlice';

export default function ContractsView() {

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
  
  const dispatch = useDispatch();

  const formToShow = useSelector((state: RootState) => state.contracts.formToShow);
  const contractError = useSelector((state: RootState) => state.contracts.error);
  const contractSuccessMsg = useSelector((state: RootState) => state.contracts.successMsg);
  
  React.useEffect(() => {
    if (contractError)
      showErrorMessage(contractError);
      dispatch(setError("")); // Reset the error state

    if (contractSuccessMsg)
      showSuccessMsg(contractSuccessMsg);
      dispatch(setSuccess('')); // Reset the success message state

  }, [contractError, contractSuccessMsg])
  
  return (
    <>
      <ToastContainer />
          {
            formToShow == 1 && (
              <ContractsList />
            )
          }
          {
            formToShow == 2 && (
              <CreateContract />
            )
          }
          {
            formToShow == 3 && (
              <ContractDetails />
            )
          }
    </>
  );
}