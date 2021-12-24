import React from 'react';
import {
    Dialog,
    TextField,
    Box,
    Grid,
    Button,
    Typography,
} from '@material-ui/core';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export const NewTaskModal = ({ isOpen, onSubmit, closeModal, editData }) => {
    const initialValues = {
        name: '',
        description: '',
        priority: 'Low',
        date: new Date(),
        completed: false,
        ...editData,
    };

    const validationSchema = yup.object().shape({
        name: yup
            .string() //mora biti string
            .required('This fields is required')
            .max(100, 'Max number of characters is 100'),
        description: yup.string().max(1000, 'Max number of characters is 1000'),
        priority: yup.string().oneOf(['Low', 'Medium', 'High']),
        date: yup
            .date()
            .required('This fields is required')
            .test((date) => {
                if (date) {
                    return date.getTime() > new Date().getTime();
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
                    enableReinitialize={true}
                >
                    <Grid container className="modal__container">
                        <Grid item xs={12} className="modal__fieldbox">
                            <Typography variant="caption">Name</Typography>
                            <Field name="name">
                                {(fieldProps) => (
                                    <TextField
                                        {...fieldProps.field}
                                        className="modal__field"
                                        placeholder="Enter name"
                                        variant="outlined"
                                        // ako je nesto ukucano, a nije validno, daj mi error
                                        error={
                                            fieldProps.meta.touched &&
                                            Boolean(fieldProps.meta.error)
                                        }
                                        helperText={
                                            fieldProps.meta.touched &&
                                            fieldProps.meta.error
                                        }
                                    />
                                )}
                            </Field>
                        </Grid>
                        <Grid item xs={12} className="modal__fieldbox">
                            <Typography variant="caption">
                                Description
                            </Typography>
                            <Field name="description">
                                {(fieldProps) => (
                                    <TextField
                                        {...fieldProps.field}
                                        className="modal__field"
                                        placeholder="Enter description"
                                        variant="outlined"
                                        error={
                                            fieldProps.meta.touched &&
                                            Boolean(fieldProps.meta.error)
                                        }
                                        helperText={
                                            fieldProps.meta.touched &&
                                            fieldProps.meta.error
                                        }
                                    />
                                )}
                            </Field>
                        </Grid>
                        <Grid item xs={12} className="modal__fieldbox">
                            <Typography variant="caption">Date</Typography>
                            <Field name="date">
                                {(fieldProps) => {
                                    return (
                                        <DatePicker
                                            name="date"
                                            selected={fieldProps.field.value}
                                            onSelect={(val) => {
                                                fieldProps.form.setFieldValue(
                                                    'date',
                                                    val
                                                );
                                            }}
                                            minDate={new Date()}
                                        />
                                    );
                                }}
                            </Field>
                        </Grid>
                        <Grid item xs={12} className="modal__fieldbox">
                            <Typography variant="caption">Priority</Typography>
                            <Field name="priority">
                                {(fieldProps) => (
                                    <TextField
                                        {...fieldProps.field}
                                        select={true}
                                        className="modal__field"
                                        title="Enter priority"
                                        variant="outlined"
                                        error={
                                            fieldProps.meta.touched &&
                                            Boolean(fieldProps.meta.error)
                                        }
                                        helperText={
                                            fieldProps.meta.touched &&
                                            fieldProps.meta.error
                                        }
                                    >
                                        <option value={'Low'}>Low</option>
                                        <option value={'Medium'}>Medium</option>
                                        <option value={'High'}>High</option>
                                    </TextField>
                                )}
                            </Field>
                        </Grid>
                        <Grid item xs={12} className="modal__fieldbox">
                            <Field>
                                {(fieldProps) => {
                                    return (
                                        <Button
                                            onClick={() => {
                                                fieldProps.form.submitForm();
                                            }}
                                            disabled={!fieldProps.form.isValid}
                                        >
                                            Submit
                                        </Button>
                                    );
                                }}
                            </Field>
                            <Button onClick={() => closeModal()}>Close</Button>
                        </Grid>
                    </Grid>
                </Formik>
            </Box>
        </Dialog>
    );
};
