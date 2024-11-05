import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Table } from 'reactstrap';
import { IAssignBooks, IAssignBooksDefaultValue, IAssignBooksList } from '../constants/Types';
import api from '../httpConfig/apiInstance';
import ModalPopup from '../utils/ModalPopup';
import AddEditAssignBook from './AddEditAssignBook';

const AssignBookList = () => {
    const [AssignBooks, setAssignBooks] = useState<IAssignBooksList[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAssignBook, setSelectedAssignBook] = useState<IAssignBooks>(IAssignBooksDefaultValue)

    const getAllAssignBooks = async () => {
        try {
            const AssignBooksResponse = await api.get("/studentBookMap");
            if (AssignBooksResponse.data.success) {
                setAssignBooks(AssignBooksResponse.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = (AssignBook: IAssignBooksList) => {
        const data: IAssignBooks =
        {
            bookId: AssignBook.bookId,
            returnDate: AssignBook.returnedDate || "",
            studentBookMapId: AssignBook.studentBookMapId,
            studentId: AssignBook.studentId
        }
        setSelectedAssignBook(data);
        setIsModalOpen(true);
    };
    const handleReturnBook = async (AssignBook: IAssignBooksList) => {
        if (window.confirm(`${AssignBook.firstName} ${AssignBook.firstName} is returning ${AssignBook.bookName}`)) {
            const returnResponse = await api.delete(`/studentBookMap/${AssignBook.studentBookMapId}`);
            if (returnResponse.data.success) {
                toast.success(returnResponse.data.message);
            }
        }
    };

    const handleOpenAddEditForm = () => {
        // setSelectedAssignBook(IAssignBooksDefaultValue);
        setIsModalOpen(true);
    }

    useEffect(() => { getAllAssignBooks() }, [isModalOpen]);

    return (
        <div className="table-responsive container my-3">
            <Button color="info" className='my-4' onClick={handleOpenAddEditForm}>Add AssignBook</Button>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Book Name</th>
                        <th>Assigned Date</th>
                        <th>Returning Date</th>
                        <th>Is Returned</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {AssignBooks.map((AssignBook) => (
                        <tr key={AssignBook.bookId}>
                            <td>{AssignBook.firstName}</td>
                            <td>{AssignBook.lastName}</td>
                            <td>{AssignBook.bookName}</td>
                            <td>{AssignBook.assignedDate.split("T")[0]}</td>
                            <td>{AssignBook.expectedReturnDate.split("T")[0]}</td>
                            <td>{AssignBook.isReturned ? "YES" : "NO"}</td>
                            <td>
                                {AssignBook.isReturned ? <h6>Returned</h6> :
                                    <>
                                        <Button color="warning" size="sm" className="me-2" onClick={() => handleReturnBook(AssignBook)}>
                                            Return
                                        </Button>
                                        <Button color="warning" size="sm" className="me-2" onClick={() => handleEdit(AssignBook)}>
                                            Edit
                                        </Button>
                                    </>
                                }

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ModalPopup title={selectedAssignBook.studentBookMapId ? 'Edit AssignBook' : 'Add AssignBook'} isOpen={isModalOpen} toggle={() => setIsModalOpen(!isModalOpen)}  >
                <AddEditAssignBook setOpen={setIsModalOpen} initialValues={selectedAssignBook}></AddEditAssignBook>
            </ModalPopup>
        </div>
    );
};

export default AssignBookList;
