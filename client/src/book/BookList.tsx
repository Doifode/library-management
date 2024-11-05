import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { IBooks, IBooksDefaultValue } from "../constants/Types";
import api from "../httpConfig/apiInstance";
import ModalPopup from "../utils/ModalPopup";
import AddEditBook from "./AddEditBook";
import { Context } from "../utils/ContextProvider";

const BookList = () => {
    const [books, setBooks] = useState<IBooks[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<IBooks>(IBooksDefaultValue);
    const { userDetails } = useContext(Context)
    // Fetch all books from the server
    const getAllBooks = async () => {
        try {
            const data = await api.get("/book");
            if (data.data.data) {
                setBooks(data.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllBooks();
    }, [isModalOpen]);

    // Open modal for adding a new book
    const handleOpenModal = () => {
        setSelectedBook(IBooksDefaultValue);
        setIsModalOpen(true);
    };

    // Open modal for editing a book
    const handleEditBook = (book: IBooks) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    // Delete a book
    const handleDeleteBook = async (bookId: number) => {
        try {
            const response = await api.delete(`/book/${bookId}`);
            if (response.data.success) {
                toast.success("Book deleted successfully");
                setBooks(books.filter((book) => book.bookId !== bookId));
                getAllBooks();
            } else {
                toast.error("Failed to delete book");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while deleting the book");
        }
    };

    return (
        <div className="table-responsive container my-3">
            <Button hidden={!userDetails} variant="info" className="my-4" onClick={handleOpenModal}>Add Book</Button>
            <Container className="mt-4">
                <h2>All Books</h2>
                <Row xs={1} md={3} className="g-4">
                    {books.map((book) => (
                        <Col key={book.bookId}>
                            <Card>
                                <Card.Img
                                    variant="top"
                                    src={book.image?.length ? book.image : 'https://via.placeholder.com/150'}
                                    alt={book.bookName}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <Card.Body>
                                    <Card.Title>{book.bookName}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">by {book.author}</Card.Subtitle>
                                    <Card.Text>Quantity: {book.quantity}</Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <Button variant="primary" onClick={() => handleEditBook(book)}>
                                            Edit
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDeleteBook(book.bookId)}>
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <ModalPopup
                title={selectedBook.bookId ? 'Edit Book' : 'Add Book'}
                isOpen={isModalOpen}
                toggle={() => setIsModalOpen(!isModalOpen)}
            >
                <AddEditBook setOpen={setIsModalOpen} initialValues={selectedBook} />
            </ModalPopup>
        </div>
    );
};

export default BookList;
