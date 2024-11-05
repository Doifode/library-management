import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

interface PageNotFoundProps {
    statusCode: number;
    title: string;
    subTitle: string;
    buttonLabel: string;
    navigatePath?: string;
}

const PageNotFound: React.FC<PageNotFoundProps> = ({
    statusCode,
    title,
    subTitle,
    buttonLabel,
    navigatePath
}) => {
    const navigate = useNavigate();

    const handleGoToLogin = () => {
        if (navigatePath) {
            navigate(navigatePath);
        } else {
            navigate(-1);
        }
    };

    return (
        <Container
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ minHeight: '100vh', textAlign: 'center' }}
        >
            <Row>
                <Col>
                    <h1 className="text-danger">{statusCode}</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className="text-secondary">{title}</h5>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="mt-2 mb-4">{subTitle}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button color="primary" onClick={handleGoToLogin}>
                        {buttonLabel}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default PageNotFound;
