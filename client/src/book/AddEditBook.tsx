import { useFormik } from 'formik';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import * as Yup from 'yup';
import { IBooks } from '../constants/Types';
import api from '../httpConfig/apiInstance';

interface AddEditBookProps {
    initialValues: IBooks;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddEditBook: React.FC<AddEditBookProps> = ({ initialValues, setOpen }) => {
    const [imageError, setImageError] = useState(false); // New state to track image error

    // Define validation schema with Yup
    const validationSchema = Yup.object({
        bookName: Yup.string()
            .min(2, 'Book Name must be at least 2 characters')
            .required('Book Name is required'),
        author: Yup.string()
            .min(2, 'Author Name must be at least 2 characters')
            .required('Author Name is required'),
        quantity: Yup.number()
            .min(1, "Please enter quantity more than 0.")
            .required('Quantity is required'),
        image: Yup.string()
            .required('Image is required'),
    });

    // Initialize Formik with useFormik hook
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit: (values) => handleRegisterBook(values),
    });

    const handleRegisterBook = async (values: IBooks) => {
        try {
            let registerBookResponse;
            if (initialValues.bookId) {
                registerBookResponse = await api.put("/Book", values);
            } else {
                registerBookResponse = await api.post("/Book", values);
            }
            if (registerBookResponse.data.success) {
                toast.success(registerBookResponse.data.message);
            } else {
                toast.error(registerBookResponse.data.message);
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        } finally {
            setOpen(false);
        }
    };

    // Handle image load error
    const handleImageError = () => {
        setImageError(true); // Set image error to true if loading fails
    };

    // Reset image error when the URL changes
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(e);
        setImageError(false); // Reset image error on URL change
    };

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Label for="bookName">Book Name</Label>
                        <Input
                            id="bookName"
                            name="bookName"
                            type="text"
                            value={formik.values.bookName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            invalid={formik.touched.bookName && !!formik.errors.bookName}
                        />
                        {formik.touched.bookName && formik.errors.bookName && (
                            <FormFeedback>{formik.errors.bookName}</FormFeedback>
                        )}
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="author">Author Name</Label>
                        <Input
                            id="author"
                            name="author"
                            type="text"
                            value={formik.values.author}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            invalid={formik.touched.author && !!formik.errors.author}
                        />
                        {formik.touched.author && formik.errors.author && (
                            <FormFeedback>{formik.errors.author}</FormFeedback>
                        )}
                    </FormGroup>
                </Col>
            </Row>
            <FormGroup>
                <Label for="quantity">Quantity</Label>
                <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={formik.touched.quantity && !!formik.errors.quantity}
                />
                {formik.touched.quantity && formik.errors.quantity && (
                    <FormFeedback>{formik.errors.quantity}</FormFeedback>
                )}
            </FormGroup>
            <FormGroup>
                <Label for="image">Book Image</Label>
                <Input
                    id="image"
                    name="image"
                    type="text"
                    placeholder="Enter image URL"
                    value={formik.values.image}
                    onChange={handleImageChange}
                    onBlur={formik.handleBlur}
                    invalid={(formik.touched.image && !!formik.errors.image) || imageError}
                />
                {formik.touched.image && formik.errors.image && (
                    <FormFeedback>{formik.errors.image}</FormFeedback>
                )}
                {imageError && <FormFeedback>Invalid image URL</FormFeedback>}
                {formik.values.image && !imageError && (
                    <div style={{ marginTop: '10px' }}>
                        <img
                            src={formik.values.image}
                            alt="Preview"
                            style={{ maxWidth: '100%', height: 'auto' }}
                            onError={handleImageError} // Call handleImageError on load failure
                        />
                    </div>
                )}
            </FormGroup>
            <Button type="submit" color="primary">
                {formik.values.bookId ? 'Update Book' : 'Add Book'}
            </Button>
        </Form>
    );
};

export default AddEditBook;
