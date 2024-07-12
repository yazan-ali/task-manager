import { useState, useCallback } from 'react';

const useSnackbar = () => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'info',
    });

    const showSnackbar = (message, severity) => {
        setSnackbar({
            open: true,
            message,
            severity,
        });
    };

    const closeSnackbar = useCallback(() => {
        setSnackbar((prev) => ({
            ...prev,
            open: false,
        }));
    }, []);

    return {
        snackbar,
        showSnackbar,
        closeSnackbar,
    };
};

export default useSnackbar;