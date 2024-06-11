import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaxExaminationsList from './getTaxExaminations';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store'
import CreateTaxExamination from './createTaxExamination';
import 'react-toastify/dist/ReactToastify.css';
import TaxExaminationDetails from './taxExaminationDetails';
import { setError, setSuccess } from './taxExaminationSlice';

export default function TaxExaminationsView() {

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
  const formToShow = useSelector((state: RootState) => state.taxExaminations.formToShow);
  const taxExaminationError = useSelector((state: RootState) => state.taxExaminations.error);
  const taxExaminationSuccessMsg = useSelector((state: RootState) => state.taxExaminations.successMsg);
  
  React.useEffect(() => {
    if (taxExaminationError)
      showErrorMessage(taxExaminationError);
      dispatch(setError("")); // Reset the error state
    if (taxExaminationSuccessMsg)
      showSuccessMsg(taxExaminationSuccessMsg);
      dispatch(setSuccess('')); // Reset the success message state

  }, [taxExaminationError, taxExaminationSuccessMsg])
  
  return (
    <>
      <ToastContainer />
          {
            formToShow == 1 && (
              <TaxExaminationsList />
            )
          }
          {
            formToShow == 2 && (
              <CreateTaxExamination />
            )
          }
          {
            formToShow == 3 && (
              <TaxExaminationDetails />
            )
          }
    </>
  );
}