import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import * as Yup from 'yup';
import { IAssignBooks, IBooks, IStudents } from '../constants/Types';
import api from '../httpConfig/apiInstance';

interface AddEditAssignBookProps {
    initialValues: IAssignBooks;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddEditAssignBook: React.FC<AddEditAssignBookProps> = ({ initialValues, setOpen }) => {
    const [students, setStudents] = useState<IStudents[]>([]);
    const [books, setBooks] = useState<IBooks[]>([]);
    const [returnDate, setReturnDate] = useState<Date | null>(null);


    useEffect(() => {
        // Fetch students and books for Autocomplete options
        async function fetchData() {
            const studentResponse = await api.get('/student');
            const bookResponse = await api.get('/book');
            setStudents(studentResponse.data.data);
            setBooks(bookResponse.data.data);
            // Set return date to 14 days from today
            const defaultReturnDate = new Date();
            defaultReturnDate.setDate(defaultReturnDate.getDate() + 14);
            setReturnDate(defaultReturnDate);
        }
        fetchData();
        const currentDate = new Date();
        const initialDate = new Date(currentDate.toISOString());
        const returnDateVal = new Date(initialDate);
        returnDateVal.setDate(initialDate.getDate() + 10)
        setReturnDate(returnDateVal);
    }, []);

    const validationSchema = Yup.object({
        studentId: Yup.number().required('Student selection is required'),
        bookId: Yup.number().required('Book selection is required'),
    });

    const formik = useFormik({
        initialValues: {
            ...initialValues,
            returnDate: returnDate ? returnDate.toISOString().slice(0, 10) : '', // Ensure returnDate is in the correct format
        },
        validationSchema,
        onSubmit: (values) => handleRegisterAssignBook(values),
    });

    const handleRegisterAssignBook = async (values: IAssignBooks) => {
        try {
            let registerAssignBookResponse;
            if (initialValues.studentBookMapId) {
                registerAssignBookResponse = await api.put('/studentBookMap', values);
            } else {
                registerAssignBookResponse = await api.post('/studentBookMap', values);
            }
            if (registerAssignBookResponse.data.success) {
                toast.success(registerAssignBookResponse.data.message);
            } else {
                toast.error(registerAssignBookResponse.data.message);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'An error occurred');
        } finally {
            setOpen(false);
        }
    };
    return (
        <Form onSubmit={formik.handleSubmit}>
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Label>Student Name</Label>
                        <Autocomplete
                            options={students}
                            value={students.find((item) => item.studentId === (initialValues.studentId || formik.values.studentId)) || null}
                            getOptionLabel={(option: IStudents) => `${option.firstName} ${option.lastName}`}
                            onChange={(_, value) => formik.setFieldValue('studentId', value ? value.studentId : '')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    name="studentId"
                                    error={formik.touched.studentId && !!formik.errors.studentId}
                                    helperText={formik.touched.studentId && formik.errors.studentId}
                                    label="Select Student"
                                    variant="outlined"
                                    onBlur={formik.handleBlur}
                                />
                            )}
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label>Book Name</Label>
                        <Autocomplete
                            options={books}
                            value={books.find((item) => item.bookId === (initialValues.bookId || formik.values.bookId)) || null}
                            getOptionLabel={(option: IBooks) => option.bookName}
                            onChange={(_, value) => formik.setFieldValue('bookId', value ? value.bookId : '')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    name="bookId"
                                    error={formik.touched.bookId && !!formik.errors.bookId}
                                    helperText={formik.touched.bookId && formik.errors.bookId}
                                    label="Select Book"
                                    variant="outlined"
                                    onBlur={formik.handleBlur}
                                />
                            )}
                        />
                    </FormGroup>
                </Col>
            </Row>

            <FormGroup>
                <Label for="returnDate">Return Date</Label>
                <h5>Expected return date is {returnDate?.toDateString()} </h5>
            </FormGroup>

            <Button type="submit" color="primary">
                {initialValues.studentBookMapId ? 'Update Assignment' : 'Assign Book'}
            </Button>
        </Form>
    );
};

export default AddEditAssignBook;
