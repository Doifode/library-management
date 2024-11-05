import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

interface ModalPopupProps {
    isOpen: boolean;
    toggle: () => void;
    title: string;
    children: React.ReactNode;
}

const ModalPopup: React.FC<ModalPopupProps> = ({ isOpen, toggle, title, children }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>{title}</ModalHeader>
            <ModalBody>
                {children}
            </ModalBody>
        </Modal>
    );
};

export default ModalPopup;
