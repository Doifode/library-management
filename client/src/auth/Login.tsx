import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button, Form, FormFeedback, FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import * as Yup from 'yup';
import { ILoginDetails } from '../constants/Types';
import { Context } from '../utils/ContextProvider';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { VerifyUser } = useContext(Context)

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Validation schema
    const validationSchema = Yup.object({
        identifier: Yup.string().required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required')
    });

    // Formik setup
    const formik = useFormik({
        initialValues: {
            identifier: '',
            password: ''
        },
        validationSchema,
        onSubmit: (values: ILoginDetails) => {
            VerifyUser(values);
        }
    });




    return (
        <div className="d-flex justify-content-center align-items-center my-5" >
            <Form onSubmit={formik.handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Login</h2>

                <FormGroup>
                    <Label for="identifier">Email / Username</Label>
                    <Input
                        type="text"
                        name="identifier"
                        id="identifier"
                        placeholder="Enter your email / username"
                        value={formik.values.identifier}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        invalid={formik.touched.identifier && !!formik.errors.identifier}
                    />
                    <FormFeedback>{formik.errors.identifier}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="password">Password</Label>
                    <InputGroup>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            invalid={formik.touched.password && !!formik.errors.password}
                        />
                        <InputGroupText onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </InputGroupText>
                        <FormFeedback>{formik.errors.password}</FormFeedback>
                    </InputGroup>
                </FormGroup>

                <div className="d-flex justify-content-between align-items-center">
                    <Button color="primary" type="submit">Login</Button>
                    <a href="/forgot-password" className="text-primary" style={{ textDecoration: 'none' }}>
                        Forgot Password?
                    </a>
                </div>
            </Form>
        </div>
    );
};

export default Login;
