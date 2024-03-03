import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { addUser } from '../../redux/user'; // Make sure this path matches your project structure

// Modal accessibility setup (set this to your root app element)
Modal.setAppElement('#root');

// Validation schema
const UserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  mobileNumber: Yup.string()
    .matches(/^[0-9]+$/, "Mobile number must be only digits")
    .min(10, "Mobile number must be at least 10 digits")
    .required("Mobile number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

const AddUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} style={{ margin: '20px', padding: '10px' }}>
        Add User
      </button>
      
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
            maxWidth: '500px',
            width: '90%',
          },
        }}
        contentLabel="Add User"
      >
        <h2>Add New User</h2>
        <Formik
          initialValues={{ name: '', email: '', mobileNumber: '', password: '' }}
          validationSchema={UserSchema}
          onSubmit={(values, { resetForm }) => {
            dispatch(addUser({ id: uuidv4(), ...values }));
            resetForm();
            setIsModalOpen(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label htmlFor="name">Name</label>
                <Field name="name" type="text" />
                <ErrorMessage name="name" component="div" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Field name="email" type="email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <label htmlFor="mobileNumber">Mobile Number</label>
                <Field name="mobileNumber" type="text" />
                <ErrorMessage name="mobileNumber" component="div" />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" />
                <ErrorMessage name="password" component="div" />
              </div>
              <button type="submit" disabled={isSubmitting} style={{ marginTop: '10px' }}>
                Submit
              </button>
              <button type="button" onClick={() => setIsModalOpen(false)} style={{ marginTop: '10px', marginLeft: '10px' }}>
                Cancel
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default AddUser;
