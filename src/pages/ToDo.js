import React, { useState } from 'react';
import { Grid, Box, Button } from '@material-ui/core';

import { NewTaskModal } from '../components/NewTaskModal';
import { v4 as uuidv4 } from 'uuid';

const mockTasks = [
    {
        id: 1,
        name: 'Task 1',
        description: 'Buy something',
        date: new Date(),
        priority: 'Low',
        completed: false,
    },
    {
        id: 2,
        name: 'Task 2',
        description: 'Sell something',
        date: new Date(),
        priority: 'High',
        completed: true,
    },
];

export const ToDo = () => {
    const [tasks, setTasks] = useState(mockTasks);
    const [newTaskModal, setNewTaskModal] = useState(false);
    const [editData, setEditData] = useState({});

    const setCompleted = (id) => {
        const newTasks = tasks.map((task) => {
            if (task.id === id) {
                return { ...task, completed: true };
            } else {
                return task;
            }
        });
        setTasks(newTasks);
    };




    const setUncompleted = (id) => {
      const uncomplete = tasks.map((task) => {
          if (task.id === id) {
              return { ...task, completed: false}
          } else {
              return task;
          }
      });
      setTasks(uncomplete)
    };


    // const handleUpdate = () => {
    //     const updatedTasks = tasks.findIndex()
    // }

    const submitForm = (values) => {
        if (values.id) {
            const newTasks = tasks.map((task) => {
                if (task.id === values.id) {
                    return { ...values };
                } else {
                    return task;
                }
            });
            setTasks(newTasks);
        } else {
            setTasks([...tasks, { ...values, id: uuidv4() }]);
        }
        setNewTaskModal(false);
        setEditData({}); //zaboravio
    };

    const deleteTask = (id) => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    };

    const editTask = (task) => {
        setEditData(task);
        setNewTaskModal(true);
    };


    return (
        <>
            <NewTaskModal
                isOpen={newTaskModal}
                onSubmit={submitForm}
                closeModal={() => setNewTaskModal(false)}
                editData={editData}
            />
            <Grid container className="todo-container">
                {tasks.map((task, i) => (
                    <Grid item key={i} xs={12} sm={10} md={8}>
                        <Box
                            className={`todo-item ${
                                task.completed ? 'todo-item--completed' : ''
                            }`}
                        >
                            <Box>{task.name}</Box>
                            <Box display="flex">
                                <Button onClick={() => editTask(task)}>
                                    Edit
                                </Button>
                                <Button onClick={() => deleteTask(task.id)}>
                                    Delete
                                </Button>
                                {!task.completed && (
                                    <Button
                                        onClick={() => setCompleted(task.id)}
                                    >
                                        Complete
                                    </Button>
                                )}
                                {task.completed  && <Button onClick={() => setUncompleted(task.id)}>Uncomplete</Button>}
                            </Box>
                        </Box>
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center">
                        <Button onClick={() => setNewTaskModal(true)}>
                            Add new task
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};
