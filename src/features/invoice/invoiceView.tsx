import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store'
import CreateInvoice from './createInvoice';
import InvoiceDetails from './invoiceDetails';
import { setError, setSuccess } from './invoiceSlice';

export default function InvoiceView() {
  const dispatch = useDispatch();
  const formToShow = useSelector((state: RootState) => state.invoice.formToShow);
  const invoiceError = useSelector((state: RootState) => state.invoice.error);
  const invoiceSuccessMsg = useSelector((state: RootState) => state.invoice.successMsg);

  React.useEffect(() => {
    if (invoiceError) {
      toast.error(invoiceError, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(setError("")); // Reset the error state
    }

    if (invoiceSuccessMsg) {
      toast.success(invoiceSuccessMsg, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(setSuccess('')); // Reset the success message state
    }
  }, [invoiceError, invoiceSuccessMsg, dispatch]);

  return (
    <>
      {formToShow === 2 && <CreateInvoice />}
      {formToShow === 3 && <InvoiceDetails />}
      <ToastContainer />
    </>
  );
}
