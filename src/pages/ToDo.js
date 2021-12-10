import React, { useState } from 'react';
import { Grid, Box, Button } from '@material-ui/core';

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

    return (
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
                            <Button>Edit</Button>
                            <Button>Delete</Button>
                            {!task.completed && (
                                <Button onClick={() => setCompleted(task.id)}>
                                    Complete
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};
