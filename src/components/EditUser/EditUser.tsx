import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {editUser as updateUser } from '../../redux/user'; // Adjust this path to your project's structure

// Define your UserInterface here or import it if it's defined elsewhere
interface UserInterface {
  id: string;
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
}

type EditUserProps = {
  editUser: UserInterface;
  setEditUser: (user: UserInterface) => void;
};

// Validation schema for the form
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  mobileNumber: Yup.string().matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Invalid mobile number').required('Mobile number is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const EditUser = ({ editUser, setEditUser }: EditUserProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  // Make sure to set the app element for accessibility reasons
  Modal.setAppElement('#root');

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Edit User</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px',
            maxWidth: '500px',
            width: '90%',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          }
        }}
      >
        <h2>Edit User</h2>
        <Formik
          initialValues={{
            name: editUser.name || '',
            email: editUser.email || '',
            mobileNumber: editUser.mobileNumber || '',
            password: '', // Assuming password should not be pre-filled for security reasons
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(updateUser({
              ...editUser,
              ...values,
            }));
            setEditUser({ ...editUser, ...values });
            setIsModalOpen(false);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label>Name: </label>
                <Field name="name" type="text" />
                <ErrorMessage name="name" component="div" />
              </div>
              <div>
                <label>Email: </label>
                <Field name="email" type="email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <label>Mobile Number: </label>
                <Field name="mobileNumber" type="text" />
                <ErrorMessage name="mobileNumber" component="div" />
              </div>
              <div>
                <label>Password: </label>
                <Field name="password" type="password" />
                <ErrorMessage name="password" component="div" />
              </div>
              <button type="submit" disabled={isSubmitting}>Update User</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default EditUser;
