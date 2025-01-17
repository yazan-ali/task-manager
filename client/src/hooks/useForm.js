import { useState } from 'react';
import dayjs from 'dayjs';

const useForm = (initialValues, onSubmit) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const toggleIsLoading = () => {
        setIsLoading(prev => !prev);
    }

    const handleChange = (evt) => {
        const { name, value } = evt.target || evt;

        setValues({
            ...values,
            [name]: value,
        });

        // check if the dueDate is before today date
        if (name === 'dueDate') {
            const today = dayjs();
            if (dayjs(value).isBefore(today, 'day')) {
                setErrors({ ...errors, dueDate: "Due date can be set at least to today date" })
            }
        }
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (validateForm()) {
            toggleIsLoading();
            const shouldEmptyInputFields = await onSubmit(values);
            toggleIsLoading();
            if (shouldEmptyInputFields) {
                setValues(initialValues);
            }
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
        isLoading,
        handleChange,
        handleSubmit,
        setValues
    };
};

export default useForm;
