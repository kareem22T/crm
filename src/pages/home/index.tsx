import * as React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import "./style.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientsView from '../../features/clients/getClients';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store'
import CreateClient from '../../features/clients/createClient';
import 'react-toastify/dist/ReactToastify.css';
import ClientDetails from '../../features/clients/clientDetails';

export default function Home() {

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
  
  
  const formToShow = useSelector((state: RootState) => state.clients.formToShow);
  const clientError = useSelector((state: RootState) => state.clients.error);
  const clientSuccessMsg = useSelector((state: RootState) => state.clients.successMsg);
  
  React.useEffect(() => {
    if (clientError)
      showErrorMessage(clientError);

    if (clientSuccessMsg)
      showSuccessMsg(clientSuccessMsg);

  }, [clientError, clientSuccessMsg])
  
  return (
    <DefaultLayout>
      <ToastContainer />
          {
            formToShow == 1 && (
              <ClientsView />
            )
          }
          {
            formToShow == 2 && (
              <CreateClient />
            )
          }
          {
            formToShow == 3 && (
              <ClientDetails />
            )
          }
    </DefaultLayout>
  );
}