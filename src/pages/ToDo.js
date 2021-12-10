import React, { useState } from 'react';
import { Grid, Box, Button } from '@material-ui/core';

const mockTasks = [
    {
        name: 'Task 1',
        description: 'Buy something',
        date: new Date(),
        priority: 'Low',
        completed: false,
    },
    {
        name: 'Task 2',
        description: 'Sell something',
        date: new Date(),
        priority: 'High',
        completed: true,
    },
];

export const ToDo = () => {
    const [tasks, setTasks] = useState(mockTasks);

    return (
        <Grid container className="todo-container">
            {tasks.map((task, i) => (
                <Grid item key={i} xs={12} sm={10} md={8}>
                    <Box className="todo-item">
                        <Box>{task.name}</Box>
                        <Box display="flex">
                            <Button>Edit</Button>
                            <Button>Delete</Button>
                            {!task.completed && <Button>Complete</Button>}
                        </Box>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};