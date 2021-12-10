import React from 'react';
import { Dialog, TextField, Box, Grid } from '@material-ui/core';
import { Formik, Field } from 'formik';
import * as yup from 'yup';

export const NewTaskModal = ({ isOpen, onSubmit, closeModal }) => {
    const initialValues = {
        name: '',
        description: '',
        priority: 'Low',
        date: null,
        completed: false,
    };

    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .required('This fields is required')
            .max(100, 'Max number of characters is 100'),
        description: yup.string().max(1000, 'Max number of characters is 1000'),
        priority: yup.string().oneOf(['Low', 'Medium', 'High']),
        date: yup
            .date()
            .required('This fields is required')
            .test((date) => {
                if (date) {
                    return date > new Date();
                } else {
                    return false;
                }
            }),
    });

    return (
        <Dialog open={isOpen} onClose={closeModal}>
            <Box className="modal">
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => onSubmit(values)}
                    validationSchema={validationSchema}
                >
                    <Grid container className="modal__container">
                        <Grid item xs={12} className="modal__fieldbox">
                            <Field name="name">
                                {(fieldProps) => (
                                    <TextField
                                        {...fieldProps.field}
                                        className="modal__field"
                                        placeholder="Enter name"
                                        variant="outlined"
                                    />
                                )}
                            </Field>
                        </Grid>
                        <Grid item xs={12} className="modal__fieldbox">
                            <Field name="description">
                                {(fieldProps) => (
                                    <TextField
                                        {...fieldProps.field}
                                        className="modal__field"
                                        placeholder="Enter description"
                                        variant="outlined"
                                    />
                                )}
                            </Field>
                        </Grid>
                        <Grid item xs={12} className="modal__fieldbox">
                            <Field name="priority">
                                {(fieldProps) => (
                                    <TextField
                                        {...fieldProps.field}
                                        select
                                        className="modal__field"
                                        title="Enter priority"
                                        variant="outlined"
                                    >
                                        <option value={'Low'}>Low</option>
                                        <option value={'Medium'}>Medium</option>
                                        <option value={'High'}>High</option>
                                    </TextField>
                                )}
                            </Field>
                        </Grid>
                    </Grid>
                </Formik>
            </Box>
        </Dialog>
    );
};