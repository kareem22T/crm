import * as React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import "./style.css"
import { clientRow, creteClient, getClients, ClientType, deleteClient } from '../../services/clientServices';
import Table from './components/client/table';
import ClientForm from './components/client/createClient';
import Client from './components/client/clientDetails';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showSuccessMsg = (msg:string) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export default function Home() {
  const [clients, setClints] = React.useState<clientRow[]>([]);
  const [showClientForm, setShowClientForm] = React.useState<boolean>(false)

  const [selectedClient, setSelectedClient] = React.useState<clientRow>();
  const [showClientDetails, setShowClientDetails] = React.useState<boolean>(false)

  // Create Client
  const handleCreateClient = (client: ClientType) => {
    creteClient(client).then(res => {
      if (res.data.isSuccess == true) {
        // got to client details
        setSelectedClient(res.data.data)
        setShowClientDetails(true)
        setShowClientForm(false)
        showSuccessMsg("تم اضافة العميل بنجاح")
      }
    })
  }

  // show client
  const handleShowClient = (client: clientRow) => {    
    setSelectedClient(client)
    setShowClientDetails(true)
    setShowClientForm(false)
  }

  const handleDeleteClient = (id: number) => {
    deleteClient(id).then(res => {
        if (res.data.isSuccess == true) {
          showSuccessMsg("تم حذف العميل بنجاح")
          getClients(10, 1).then(data => {

            setClints(data.data.data)
      
          }).catch(error => {
              console.error(error);
          });      
        }
    })
  }

  // show client
  const handleGoToList = () => {
    setShowClientDetails(false)
    setShowClientForm(false)
  }

  React.useEffect(() => {

    getClients(10, 1).then(data => {

      setClints(data.data.data)
      if (data.data.data.length === 0)
        setShowClientForm(true)

    }).catch(error => {
        console.error(error);
    });

  }, [showClientDetails]); 

  return (
    <DefaultLayout>
      <ToastContainer />
      {
        clients && clients.length > 0 && !showClientForm && !showClientDetails && (
          <>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                العملاء
              </h2>

              <nav>
                <button className="inline-flex bg-primary items-center justify-center gap-2.5 rounded-full bg-meta-3 py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-5" onClick={() => setShowClientForm(true)}>اضافة عميل</button>
              </nav>
            </div>
            <Table clients={clients} deleteClient={handleDeleteClient} showClient={handleShowClient} />
          </>
        )
      }
      {
        (showClientForm || !clients || clients.length == 0) && (
          <>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                اضافة عميل
              </h2>
              {clients && clients.length > 0 && (
                <nav>
                  <button className="inline-flex items-center justify-center gap-2.5 rounded-full bg-black py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-5" onClick={() => setShowClientForm(false)}>رجوع للقائمة</button>
                </nav>
              )}
            </div>
            <ClientForm createMethod={handleCreateClient}/>
          </>
        )
      }
      {
        showClientDetails && selectedClient && (
          <>
            <Client client_prop={selectedClient} goBack={() => handleGoToList()} />
          </>
        )
      }
    </DefaultLayout>
  );
}