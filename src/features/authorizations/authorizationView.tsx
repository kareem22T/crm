import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthorizationsList from './getAuthorization';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store'
import CreateAuthorization from './createAuthorization';
import 'react-toastify/dist/ReactToastify.css';
import AuthorizationDetails from './authorizationDetails';
import { setSuccess } from './authorizationSlice';

export default function AuthorizationsView() {
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
  
  
  const formToShow = useSelector((state: RootState) => state.authorizations.formToShow);
  const authorizationError = useSelector((state: RootState) => state.authorizations.error);
  const authorizationSuccessMsg = useSelector((state: RootState) => state.authorizations.successMsg);
  
  React.useEffect(() => {
    if (authorizationError)
      showErrorMessage(authorizationError);
      dispatch(setSuccess('')); // Reset the success message state

    if (authorizationSuccessMsg)
      showSuccessMsg(authorizationSuccessMsg);
      dispatch(setSuccess('')); // Reset the success message state
  }, [authorizationError, authorizationSuccessMsg])
  
  return (
    <>
      <ToastContainer />
          {
            formToShow == 1 && (
              <AuthorizationsList />
            )
          }
          {
            formToShow == 2 && (
              <CreateAuthorization />
            )
          }
          {
            formToShow == 3 && (
              <AuthorizationDetails />
            )
          }
    </>
  );
}