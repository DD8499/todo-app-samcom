import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useTodoContext from '../hooks/useTodoContext';
import { Field, Form, Formik } from 'formik';
import '../App.css'


const TodoForm = () => {

    const { open, handleClose, addTodo, updateData, editTodo, edit } = useTodoContext()
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const initialValue = {
        taskName: updateData?.taskName || '',
        priority: updateData?.priority || 'high',
        date: updateData?.date || '',
        completed: updateData?.completed || true,
        status: updateData?.status || 'not_started',
        id: updateData?.id || Date.now()
    }
    const handleSubmit = (value) => {
        addTodo(value)
        handleClose()
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Formik
                        initialValues={initialValue}
                        onSubmit={(value) => edit ? editTodo(value) : handleSubmit(value)}
                    >
                        {(value) => (
                            <Form>
                                <div className='form'>
                                    <div className='form-input'>
                                        <label>Task Name</label>
                                        <Field name='taskName' as='input' />
                                    </div>
                                    <div className='form-input'>
                                        <label>Task Priority</label>
                                        <Field name='priority' as='select'>
                                            <option value='high'>High</option>
                                            <option value='medium'>Medium</option>
                                            <option value='low'>Low</option>
                                        </Field>
                                    </div>
                                    <div className='form-input'>
                                        <label>Date</label>
                                        <Field name='date' type='date' />
                                    </div>
                                </div>
                                <Button variant='contained' type='submit' >{edit ? 'Update Task' : 'Create Task'}</Button>
                            </Form>

                        )}
                    </Formik>

                </Box>
            </Modal>
        </div >
    )
}

export default TodoForm

