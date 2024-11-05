import { useFormik } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import * as Yup from 'yup';
import { IStudents } from '../constants/Types';
import api from '../httpConfig/apiInstance';

interface AddEditStudentProps {
    initialValues: IStudents,
    setOpen: Dispatch<SetStateAction<boolean>>
}
const AddEditStudent: React.FC<AddEditStudentProps> = ({ initialValues, setOpen }) => {
    // Define validation schema with Yup
    const validationSchema = Yup.object({
        firstName: Yup.string()
            .min(2, 'First name must be at least 2 characters')
            .required('First name is required'),
        lastName: Yup.string()
            .min(2, 'Last name must be at least 2 characters')
            .required('Last name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        mobile: Yup.string()
            .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
            .required('Mobile number is required'),
        prn: Yup.string()
            .matches(/^\d{10}$/, 'PRN must be 10 digits')
            .required('PRN is required'),
        username: Yup.string()
            .min(5, 'Username must be at least 5 characters')
            .required('Username is required'),
    });

    // Initialize Formik with useFormik hook
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit: (values) => handleRegisterStudent(values),
    });

    const handleRegisterStudent = async (values: IStudents) => {
        try {
            let registerStudentResponse
            if (initialValues.studentId) {
                registerStudentResponse = await api.put("/student", values);
            } else {
                registerStudentResponse = await api.post("/student", values);
            }
            if (registerStudentResponse.data.success) {
                toast.success(registerStudentResponse.data.message);
            } else {
                toast.error(registerStudentResponse.data.message)
            }
        } catch (error: any) {
            toast.error(error.response.data.message)
        } finally {
            setOpen(false)
        }
    }



    return (
        <Form onSubmit={formik.handleSubmit}>
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Label for="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            invalid={formik.touched.firstName && !!formik.errors.firstName}
                        />
                        {formik.touched.firstName && formik.errors.firstName && (
                            <FormFeedback>{formik.errors?.firstName}</FormFeedback>
                        )}
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            invalid={formik.touched.lastName && !!formik.errors.lastName}
                        />
                        {formik.touched.lastName && formik.errors.lastName && (
                            <FormFeedback>{formik.errors.lastName}</FormFeedback>
                        )}
                    </FormGroup>
                </Col>
            </Row>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={formik.touched.email && !!formik.errors.email}
                />
                {formik.touched.email && formik.errors.email && (
                    <FormFeedback>{formik.errors.email}</FormFeedback>
                )}
            </FormGroup>

            <FormGroup>
                <Label for="mobile">Mobile</Label>
                <Input
                    id="mobile"
                    name="mobile"
                    type="text"
                    value={formik.values.mobile}
                    onChange={(e) => { formik.handleChange(e); formik.setFieldValue("password", e.target.value) }}
                    onBlur={formik.handleBlur}
                    invalid={formik.touched.mobile && !!formik.errors.mobile}
                />
                {formik.touched.mobile && formik.errors.mobile && (
                    <FormFeedback>{formik.errors.mobile}</FormFeedback>
                )}
            </FormGroup>

            <FormGroup>
                <Label for="prn">PRN</Label>
                <Input
                    disabled={true}
                    id="prn"
                    name="prn"
                    type="text"
                    value={formik.values.prn}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={formik.touched.prn && !!formik.errors.prn}
                />
                {formik.touched.prn && formik.errors.prn && (
                    <FormFeedback>{formik.errors.prn}</FormFeedback>
                )}
            </FormGroup>

            <FormGroup>
                <Label for="username">Username</Label>
                <Input
                    id="username"
                    name="username"
                    type="text"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={formik.touched.username && !!formik.errors.username}
                />
                {formik.touched.username && formik.errors.username && (
                    <FormFeedback>{formik.errors.username}</FormFeedback>
                )}
            </FormGroup>
            <FormGroup hidden={formik.values.studentId !== 0}>
                <Label for="password">Password</Label>
                <Input
                    id="password"
                    name="password"
                    type="text"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={formik.touched.password && !!formik.errors.password}
                />

            </FormGroup>

            <Button type="submit" color="primary">
                {formik.values.studentId ? 'Update Student' : 'Add Student'}
            </Button>
        </Form>
    );
};

export default AddEditStudent;
