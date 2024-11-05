export interface IBooks {
    image: string,
    bookName: string,
    author: string,
    quantity: number,
    bookId: number,
}
export const IBooksDefaultValue = {
    image: "",
    bookName: "",
    author: "",
    quantity: 0,
    bookId: 0,
}

export interface ILoginDetails {
    identifier: string,
    password: string
}
export interface IStudents {
    "studentId"?: number,
    "firstName": string,
    "lastName": string,
    "prn": string,
    "email": string,
    "mobile": string,
    "username": string,
    password: string
}

function generatePRN() {
    const min = 1000000000; // Smallest 10-digit number
    const max = 9999999999; // Largest 10-digit number
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
};
export const IStudentsDefaultValue = {
    studentId: 0,
    "firstName": "",
    "lastName": "",
    "email": "",
    "prn": generatePRN(),
    "mobile": "",
    "username": "",
    password: ""
}
export interface IAssignBooks {
    studentBookMapId: number
    bookId: number,
    studentId: number,
    returnDate: string
}

export const IAssignBooksDefaultValue = {
    studentBookMapId: 0,
    bookId: 0,
    studentId: 0,
    returnDate: ""
}
export interface IAssignBooksList {
    studentBookMapId: number;
    bookId: number;
    studentId: number;
    isReturned: number; // Assuming this is used as a flag (0 for false, 1 for true)
    assignedDate: string; // ISO string format for date
    returnedDate: string | null; // Can be null if the book hasn't been returned
    expectedReturnDate: string; // ISO string format for date
    bookName: string;
    author: string;
    quantity: number;
    image: string; // URL of the book's image
    firstName: string;
    lastName: string;
    prn: string; // Personal Registration Number or similar
    email: string;
    mobile: string;
    password: string; // This would typically be hashed, but still a string
    username: string;
}

// Example of a default object conforming to the interface
export const defaultStudentBookAssignmentDetails: IAssignBooksList = {
    studentBookMapId: 0,
    bookId: 0,
    studentId: 0,
    isReturned: 0,
    assignedDate: new Date().toISOString(), // Current date in ISO format
    returnedDate: null,
    expectedReturnDate: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString(), // 14 days from now
    bookName: '',
    author: '',
    quantity: 0,
    image: '',
    firstName: '',
    lastName: '',
    prn: '',
    email: '',
    mobile: '',
    password: '',
    username: '',
};
