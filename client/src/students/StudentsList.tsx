import { useEffect, useState } from 'react';
import { Button, Table } from 'reactstrap';
import { IStudents, IStudentsDefaultValue } from '../constants/Types';
import api from '../httpConfig/apiInstance';
import ModalPopup from '../utils/ModalPopup';
import AddEditStudent from './AddEditStudent';
import { toast } from 'react-toastify';

const StudentList = () => {
    const [students, setStudents] = useState<IStudents[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<IStudents>(IStudentsDefaultValue)

    const getAllStudents = async () => {
        try {
            const studentsResponse = await api.get("/student");
            if (studentsResponse.data.success) {
                setStudents(studentsResponse.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = (student: IStudents) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const handleDelete = async (studentId: number) => {
        try {
            const deleteStudentResponse = await api.delete(`/student/${studentId}`);
            if (deleteStudentResponse.data.success) {
                toast.success(deleteStudentResponse.data.message);
                getAllStudents();
            } else {
                toast.error(deleteStudentResponse.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleOpenAddEditForm = () => {
        setSelectedStudent(IStudentsDefaultValue);
        setIsModalOpen(true);
    }

    useEffect(() => { getAllStudents() }, [isModalOpen]);

    return (
        <div className="table-responsive container my-3">
            <Button color="info" className='my-4' onClick={handleOpenAddEditForm}>Add Student</Button>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>PRN</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Username</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.studentId}>
                            <td>{student.studentId}</td>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.prn}</td>
                            <td>{student.email}</td>
                            <td>{student.mobile}</td>
                            <td>{student.username}</td>
                            <td>
                                <Button color="warning" size="sm" className="me-2" onClick={() => handleEdit(student)}>
                                    Edit
                                </Button>
                                <Button color="danger" size="sm" onClick={() => handleDelete(student?.studentId || 0)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ModalPopup title={selectedStudent.studentId ? 'Edit Student' : 'Add Student'} isOpen={isModalOpen} toggle={() => setIsModalOpen(!isModalOpen)} key={879879}>
                <AddEditStudent setOpen={setIsModalOpen} initialValues={selectedStudent}></AddEditStudent>
            </ModalPopup>
        </div>
    );
};

export default StudentList;
