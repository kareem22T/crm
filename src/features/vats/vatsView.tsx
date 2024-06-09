import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VatsList from './getVats';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store'
import CreateVat from './createVat';
import 'react-toastify/dist/ReactToastify.css';
import VatDetails from './vatDetails';

export default function VatsView() {

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
  
  
  const formToShow = useSelector((state: RootState) => state.vats.formToShow);
  const vatError = useSelector((state: RootState) => state.vats.error);
  const vatSuccessMsg = useSelector((state: RootState) => state.vats.successMsg);
  
  React.useEffect(() => {
    if (vatError)
      showErrorMessage(vatError);

    if (vatSuccessMsg)
      showSuccessMsg(vatSuccessMsg);

  }, [vatError, vatSuccessMsg])
  
  return (
    <>
      <ToastContainer />
          {
            formToShow == 1 && (
              <VatsList />
            )
          }
          {
            formToShow == 2 && (
              <CreateVat />
            )
          }
          {
            formToShow == 3 && (
              <VatDetails />
            )
          }
    </>
  );
}