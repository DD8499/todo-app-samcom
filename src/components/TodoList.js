import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'
import useTodoContext from '../hooks/useTodoContext'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoList = () => {
    const [searchValue, setSearchValue] = useState('')
    const { todos, deleteTodo, isCompleted, editTodo, handleEdit } = useTodoContext()
    const [sortBy, setSortBy] = useState('taskName')

    //for search using task name
    const searchData = todos?.filter((todo) => {
        return todo?.taskName.toLowerCase().includes(searchValue.toLowerCase())
    })

    //for sorting defult we use sorting by task name 

    const sortFunc = (todo) => {
        if (sortBy === 'taskName') {
            return todo?.sort((a, b) => a?.taskname?.localeCompare(b?.taskName))
        }
        else if (sortBy === 'priority') {
            return todo?.sort((a, b) => a?.priority?.localeCompare(b?.priority))
        }
        else if (sortBy === 'date') {
            return todo?.sort((a, b) => new Date(a?.date) - new Date(b?.date))
        }
    }
    const sortData = sortFunc(todos)
    const mainData = searchData ? searchData : sortData
    return (
        <div>
            <div className='filters'>
                <div className='search-filter'>
                    <label>Search</label>
                    <input type='search' onChange={(e) => setSearchValue(e?.target?.value)} />
                </div>
                <div className='search-filter' >
                    <label>Sort</label>
                    <select onChange={(e) => setSortBy(e?.target?.value)}>
                        <option value='taskName'>Task Name</option>
                        <option value='priority'>Priority</option>
                        <option value='date'>Date</option>
                    </select>
                </div>

            </div>
            <TableContainer component={Paper}>
                <TableHead>
                    <TableRow>
                        <TableCell>Task No</TableCell>
                        <TableCell>Task Name</TableCell>
                        <TableCell>Task Priority</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell>Is Completed</TableCell>
                        <TableCell>Task Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        mainData?.map((item, index) => (
                            <TableRow key={item?.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item?.taskName}</TableCell>
                                <TableCell>{item?.priority}</TableCell>
                                <TableCell>{item?.date}</TableCell>
                                <TableCell>
                                    <input type='checkbox' checked={item?.completed} onChange={() => isCompleted(item?.id)} />
                                </TableCell>
                                <TableCell>{item?.status}</TableCell>
                                <TableCell>
                                    <DeleteIcon onClick={() => deleteTodo(item?.id)} />
                                    <EditIcon onClick={() => handleEdit(item)} />
                                </TableCell>

                            </TableRow>

                        ))
                    }
                </TableBody>
            </TableContainer>
        </div>
    )
}

export default TodoList