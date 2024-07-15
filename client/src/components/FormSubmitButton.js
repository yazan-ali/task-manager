import React from 'react';
import { Button } from '@mui/material';

function FormSubmitButton(props) {
    const { children, type, variant, isLoading } = props;
    console.log(isLoading)
    return (
        <Button
            type={type}
            variant={variant}
            disabled={isLoading}
        >
            {isLoading ? "loading..." : children}
        </Button>
    )
}

export default FormSubmitButton;