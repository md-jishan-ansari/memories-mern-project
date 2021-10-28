import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SUCCESS, WARNING, ERROR, INFO } from './constants/userConstants';

const AlertOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

export const Alert = (type, message) => {
    if (type === SUCCESS)
        toast.success(`${message}`, AlertOptions)

    else if (type === WARNING)
        toast.warn(`${message}`, AlertOptions);

    else if (type === ERROR)
        toast.error(`${message}`, AlertOptions);

    else if (type === INFO)
        toast.info(`${message}`, AlertOptions);
};