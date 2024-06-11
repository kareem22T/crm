import { useDispatch, useSelector } from 'react-redux';
import { getClients, deleteClient, ClientRow, setFormToShow, setSelectedClient } from './clientSlice';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppDispatch, RootState } from '../../store';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ClientsView: React.FC = () => {  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [clientToDelete, SetClientToDelete] = React.useState<ClientRow>()

  const handleConfirmDelete = (client: ClientRow) => {
    SetClientToDelete(client)
    handleOpen()
  }

  const dispatch = useDispatch<AppDispatch>();
  const clients = useSelector((state: RootState) => state.clients.clients);
  const totalPages = useSelector((state: RootState) => state.clients.metaData?.totalPages);
  const currentPage = useSelector((state: RootState) => state.clients.metaData?.currentPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(getClients({ PageSize: 10, PageNumber: value }));
  };


  const handleShowClient = (client: ClientRow) => {
    dispatch(setSelectedClient({client: client}))
    dispatch(setFormToShow({formToShow: 3}))
  }

  useEffect(() => {
    dispatch(getClients({ PageSize: 10, PageNumber: 1 }));
  }, [dispatch]);

  const handleDeleteClient = (id: number) => {
    dispatch(deleteClient(id));
    handleClose()
  };


    return (
      <div>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            العملاء
          </h2>

          <nav>
            <button className="inline-flex bg-primary items-center justify-center gap-2.5 rounded-full bg-meta-3 py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-5" onClick={() => dispatch(setFormToShow({ formToShow: 2 }))}>اضافة عميل</button>
          </nav>
        </div>

        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <ToastContainer />
          {
            clientToDelete && (
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h1 className='text-center ' style={{fontSize: 20, fontWeight: 600}}>
                    هل انت متاكد من هذف العميل 
                    <br />
                    ({clientToDelete.companyName})
                  </h1>
                  <div className="btns flex gap-3 mt-8 justify-center">
                      <button onClick={handleClose} className='inline-flex items-center justify-center gap-2.5 rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10'>
                        الغاء
                      </button>
                      <button onClick={() => handleDeleteClient(clientToDelete.id)} className='inline-flex items-center justify-center gap-2.5 rounded-full py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10' style={{background: "#fb5454"}}>
                        حذف
                      </button>
                  </div>
                </Box>
              </Modal>
            )
          }
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-right dark:bg-meta-4" style={{whiteSpace: "nowrap"}}>
                    <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">كود العميل</th>
                    <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">اسم الشركة</th>
                    <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">الاسم التجاري</th>
                    <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">النشاط</th>
                    <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">رقم السجل التجاري</th>
                    <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">التحكم</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client:ClientRow) => (
                    <tr key={client.id}>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-black dark:text-white">{client.code}</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-black dark:text-white">{client.companyName}</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-black dark:text-white">{client.tradeName}</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-black dark:text-white">{client.activity}</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-black dark:text-white">{client.commercialRegisterNum}</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex">
                          <button onClick={() => handleShowClient(client)} className="inline-flex bg-blck items-center justify-center gap-2.5 rounded-full bg-meta-3 py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                              <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                            </svg>
                          </button>
                          <button onClick={() => handleConfirmDelete(client)}  style={{background: "#fb5454"}} className="inline-flex items-center justify-center rounded-full bg-black py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-4 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M4 7l16 0" />
                              <path d="M10 11l0 6" />
                              <path d="M14 11l0 6" />
                              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                            </svg>
                          </button>
                          </div>
                        </td>
                    </tr>
                ))}
                  {
                      !clients || clients.length === 0 && (
                        <tr>
                          <td colSpan={6}>
                            <h2 className='p-4 mt-4 text-center'>لا يوجد عملاء حتى الان!</h2>
                          </td>
                        </tr>
                      )
                    }
              </tbody>
            </table>
          </div>
            <div style={{margin: "auto", display: "block", marginBottom: 16, width: "max-content"}}>
                {totalPages  && totalPages > 1 ? (
                    <Stack spacing={2} dir="ltr" style={{width: "max-content"}}>
                      <Pagination count={totalPages} page={currentPage} onChange={handleChange} variant="outlined" color='primary' shape="rounded" />
                    </Stack>
                  ) : (
                    <></>
                  )}
            </div>
        </div>
      </div>
  );
};

export default ClientsView;
