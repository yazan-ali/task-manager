import { useState } from 'react';

const useForm = (initialValues, onSubmit) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (evt) => {
        if (evt.target) {
            const { name, value } = evt.target;
            setValues({
                ...values,
                [name]: value,
            });
        } else {
            setValues({
                ...values,
                [evt.name]: evt.value,
            });
        }
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (validateForm()) {
            onSubmit(values);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(values).forEach((key) => {
            if (!values[key]) {
                newErrors[key] = `The ${convertToReadableString(key)} field is required`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const convertToReadableString = (str) => {
        // Insert a space before all capital letters and convert to lowercase
        return str.replace(/([A-Z])/g, ' $1').toLowerCase();
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
        setValues
    };
};

export default useForm;
