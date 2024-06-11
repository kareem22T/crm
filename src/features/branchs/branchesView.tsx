import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BranchesList from './getBranches';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './../../store'
import CreateBranch from '../../features/branchs/createBranch';
import 'react-toastify/dist/ReactToastify.css';
import BranchDetails from './branchDetails';
import { setError, setSuccess } from './branchSlice';

export default function BranchesView() {
  const dispatch = useDispatch();

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
  
  
  const formToShow = useSelector((state: RootState) => state.branches.formToShow);
  const branchError = useSelector((state: RootState) => state.branches.error);
  const branchSuccessMsg = useSelector((state: RootState) => state.branches.successMsg);
  
  React.useEffect(() => {
    if (branchError)
      showErrorMessage(branchError);
      dispatch(setError("")); // Reset the error state

    if (branchSuccessMsg)
      showSuccessMsg(branchSuccessMsg);
      dispatch(setSuccess('')); // Reset the success message state

  }, [branchError, branchSuccessMsg])
  
  return (
    <>
      <ToastContainer />
          {
            formToShow == 1 && (
              <BranchesList />
            )
          }
          {
            formToShow == 2 && (
              <CreateBranch />
            )
          }
          {
            formToShow == 3 && (
              <BranchDetails />
            )
          }
    </>
  );
}