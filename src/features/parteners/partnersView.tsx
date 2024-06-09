import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PartnersList from './getPartners';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store'
import CreatePartner from './createPartner';
import 'react-toastify/dist/ReactToastify.css';
import PartnerDetails from './partnerDetails';

export default function PartnersView() {

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
  
  
  const formToShow = useSelector((state: RootState) => state.partners.formToShow);
  const partnerError = useSelector((state: RootState) => state.partners.error);
  const partnerSuccessMsg = useSelector((state: RootState) => state.partners.successMsg);
  
  React.useEffect(() => {
    if (partnerError)
      showErrorMessage(partnerError);

    if (partnerSuccessMsg)
      showSuccessMsg(partnerSuccessMsg);

  }, [partnerError, partnerSuccessMsg])
  
  return (
    <>
      <ToastContainer />
          {
            formToShow == 1 && (
              <PartnersList />
            )
          }
          {
            formToShow == 2 && (
              <CreatePartner />
            )
          }
          {
            formToShow == 3 && (
              <PartnerDetails />
            )
          }
    </>
  );
}