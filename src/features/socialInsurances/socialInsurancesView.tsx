import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SocialInsurancesList from './getSocialInsurances';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store'
import CreateSocialInsurance from './createSocialInsurance';
import 'react-toastify/dist/ReactToastify.css';
import SocialInsuranceDetails from './socialInsuranceDetails';

export default function SocialInsurancesView() {

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
  
  
  const formToShow = useSelector((state: RootState) => state.socialInsurances.formToShow);
  const socialInsuranceError = useSelector((state: RootState) => state.socialInsurances.error);
  const socialInsuranceSuccessMsg = useSelector((state: RootState) => state.socialInsurances.successMsg);
  
  React.useEffect(() => {
    if (socialInsuranceError)
      showErrorMessage(socialInsuranceError);

    if (socialInsuranceSuccessMsg)
      showSuccessMsg(socialInsuranceSuccessMsg);

  }, [socialInsuranceError, socialInsuranceSuccessMsg])
  
  return (
    <>
      <ToastContainer />
          {
            formToShow == 1 && (
              <SocialInsurancesList />
            )
          }
          {
            formToShow == 2 && (
              <CreateSocialInsurance />
            )
          }
          {
            formToShow == 3 && (
              <SocialInsuranceDetails />
            )
          }
    </>
  );
}