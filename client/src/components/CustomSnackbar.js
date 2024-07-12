import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const CustomSnackbar = ({ snackbar, closeSnackbar }) => {
    return (
        <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={closeSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert
                onClose={closeSnackbar}
                severity={snackbar.severity}
                sx={{
                    width: '100%',
                    backgroundColor:
                        snackbar.severity === "error" ? "#ff2424" :
                            snackbar.severity === "success" ? "#007e00" : "#000"
                }}
            >
                {snackbar.message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackbar;
