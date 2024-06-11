import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store'
import CreatePortal from './createPortal';
import PortalDetails from './portalDetails';
import { setError, setSuccess } from './portalSlice';

export default function PortalView() {
  const dispatch = useDispatch();
  const formToShow = useSelector((state: RootState) => state.portal.formToShow);
  const portalError = useSelector((state: RootState) => state.portal.error);
  const portalSuccessMsg = useSelector((state: RootState) => state.portal.successMsg);

  React.useEffect(() => {
    if (portalError) {
      toast.error(portalError, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(setError("")); // Reset the error state
    }

    if (portalSuccessMsg) {
      toast.success(portalSuccessMsg, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(setSuccess('')); // Reset the success message state
    }
  }, [portalError, portalSuccessMsg, dispatch]);

  return (
    <>
      {formToShow === 2 && <CreatePortal />}
      {formToShow === 3 && <PortalDetails />}
      <ToastContainer />
    </>
  );
}
