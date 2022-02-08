const express = require('express');
const localhost = require('./localhost/connection');
const { department, role, employee } = require('./routes/apiRoutes');
const promptUser = require('./inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(expressjson());

// app.use('api', apiRoutes);
app.use('api', department);
app.use('api', role);
app.use('api', employee);

app.use((req, res) => {
    res.status(404).end();
});

localhost.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
});