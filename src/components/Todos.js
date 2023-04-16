import React, { useEffect, useState } from 'react'
import { TodoContext } from '../hooks/useTodoContext';
import TodoForm from './TodoForm';
import { Button } from '@mui/material';
import TodoList from './TodoList';

const Todos = () => {
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [updateData, setUpdateData] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [todos, setTodos] = useState([])

    const addTodo = (newTodo) => {
        setTodos([...todos, newTodo])
    }
    const deleteTodo = (id) => {
        const newData = todos?.filter((item) => item?.id !== id)
        setTodos(newData)
    }

    const handleEdit = (item) => {
        handleOpen()
        setEdit(true)
        setUpdateData(item)
    }

    const editTodo = (item) => {
        const updatedTodo = todos?.map((todo) => {
            if (item?.id === todo?.id) {
                return {
                    ...todo,
                    taskName: item?.taskName,
                    priority: item?.priority,
                    date: item?.date,
                    completed: item?.completed,
                    status: item?.status,
                    id: item?.id
                }
            }
            return todo;
        })
        setTodos(updatedTodo)
        setUpdateData([])
        setEdit(false)
        handleClose()
    }


    const isCompleted = (id) => {
        setTodos(
            todos?.map((item) => {
                if (item?.id === id) {
                    console.log(!item?.completed, 'item?.completed')
                    return {
                        ...item,
                        completed: !item?.completed
                    }
                }
                return item
            })
        )
        console.log(id)
    }

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    useEffect(() => {
        const storeTodos = JSON.parse(localStorage.getItem('todos'))
        if (storeTodos) {
            setTodos(storeTodos)
        }
    }, [])
    const value = {
        open,
        setOpen,
        handleClose,
        handleOpen,
        todos,
        setTodos,
        addTodo,
        deleteTodo,
        isCompleted,
        editTodo,
        edit,
        setEdit,
        updateData,
        setUpdateData,
        handleEdit
    }
    return (
        <TodoContext.Provider value={value}>
            <Button onClick={handleOpen} variant='contained'>Create Todo Task</Button>
            <TodoForm />
            <TodoList />
        </TodoContext.Provider>
    )
}

export default Todos