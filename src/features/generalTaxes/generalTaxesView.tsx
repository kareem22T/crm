import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GeneralTaxesList from './getGeneralTaxes';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store'
import CreateGeneralTax from './createGeneralTax';
import 'react-toastify/dist/ReactToastify.css';
import GeneralTaxDetails from './generalTaxDetails';

export default function GeneralTaxesView() {

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
  
  
  const formToShow = useSelector((state: RootState) => state.generalTaxes.formToShow);
  const generalTaxError = useSelector((state: RootState) => state.generalTaxes.error);
  const generalTaxSuccessMsg = useSelector((state: RootState) => state.generalTaxes.successMsg);
  
  React.useEffect(() => {
    if (generalTaxError)
      showErrorMessage(generalTaxError);

    if (generalTaxSuccessMsg)
      showSuccessMsg(generalTaxSuccessMsg);

  }, [generalTaxError, generalTaxSuccessMsg])
  
  return (
    <>
      <ToastContainer />
          {
            formToShow == 1 && (
              <GeneralTaxesList />
            )
          }
          {
            formToShow == 2 && (
              <CreateGeneralTax />
            )
          }
          {
            formToShow == 3 && (
              <GeneralTaxDetails />
            )
          }
    </>
  );
}