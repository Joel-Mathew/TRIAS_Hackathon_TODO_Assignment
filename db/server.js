const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8950;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'task_list',
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

app.post('/task', (req, res) => {
    const { name, description, date, time } = req.body;
    const taskName = name;
    const taskDescription = description;

    // Get current date and time
    const currentDate = new Date();

    // Assuming you have separate variables for date and time
    const taskDate = new Date(date); // Date in 'YYYY-MM-DD' format
    const taskTime = time; // Time in 'HH:mm:ss' format

    // Format date and time strings
    const formattedDate = `${taskDate.getFullYear()}-${(taskDate.getMonth() + 1).toString().padStart(2, '0')}-${taskDate.getDate().toString().padStart(2, '0')}`;
    const formattedTime = taskTime;

    // Construct datetime string
    const taskDateTime = `${formattedDate} ${formattedTime}`;

    // Now you can use taskDateTime in your SQL query
    const sql = 'INSERT INTO tasks (taskName, taskDescription, taskDate) VALUES (?, ?, ?)';

    db.query(sql, [name, description,taskDateTime], (err, result) => {
        if (err) {
            console.error('Error inserting task: ' + err.stack);
            res.status(500).send('Error inserting task');
            return;
        }
        console.log('Task inserted:', result);
        res.status(200).send('Task inserted successfully');
    });
});
  
app.get('/task', (req, res) => {
    const sql = 'SELECT * FROM tasks';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching tasks: ' + err.stack);
            res.status(500).send('Error fetching tasks');
            return;
        }
        console.log('Tasks fetched:', result);
        res.status(200).json(result);
    });
});

app.delete('/task/:id', (req, res) => {
    const taskId = req.params.id;
    const sql = 'DELETE FROM tasks WHERE idTasks = ?';
    db.query(sql, [taskId], (err, result) => {
        if (err) {
            console.error('Error deleting task: ' + err.stack);
            res.status(500).send('Error deleting task');
            return;
        }
        console.log('Task deleted:', result);
        res.status(200).send('Task deleted successfully');
    });
});

app.put('/task/:id', (req, res) => {
    const taskId = req.params.id;
    const { taskName, taskDescription, taskDate, taskTime} = req.body;
    // Get current date and time
    const currentDate = new Date();

    // Assuming you have separate variables for date and time
    const TaskDate = new Date(taskDate); // Date in 'YYYY-MM-DD' format
    const TaskTime = taskTime; // Time in 'HH:mm:ss' format

    // Format date and time strings
    const formattedDate = `${TaskDate.getFullYear()}-${(TaskDate.getMonth() + 1).toString().padStart(2, '0')}-${TaskDate.getDate().toString().padStart(2, '0')}`;
    const formattedTime = TaskTime;

    // Construct datetime string
    const taskDateTime = `${formattedDate} ${formattedTime}`;
    const sql = 'UPDATE tasks SET taskName = ?, taskDescription = ?, taskDate = ? WHERE idTasks = ?';
    db.query(sql, [taskName, taskDescription, taskDateTime, taskId], (err, result) => {
        if (err) {
            console.error('Error updating task: ' + err.stack);
            res.status(500).send('Error updating task');
            return;
        }
        console.log('Task updated:', result);
        res.status(200).send('Task updated successfully');
    });
});


app.listen(port, () => {
console.log(`Server listening at http://localhost:${port}`);
});