import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SocialInsurancesList from './getSocialInsurances';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store'
import CreateSocialInsurance from './createSocialInsurance';
import 'react-toastify/dist/ReactToastify.css';
import SocialInsuranceDetails from './socialInsuranceDetails';
import { setError, setSuccess } from './socialInsuranceSlice';

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
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (socialInsuranceError)
      showErrorMessage(socialInsuranceError);
      dispatch(setSuccess('')); // Reset the success message state

    if (socialInsuranceSuccessMsg)
      showSuccessMsg(socialInsuranceSuccessMsg);
      dispatch(setError("")); // Reset the error state

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