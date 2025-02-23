const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'vinu',
        database: 'postgres'
    }
});

const app = express();

let publicPath = path.join(__dirname, "public");

// Serve static files
app.use(bodyParser.json());
app.use(express.static(publicPath));

app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(publicPath, "login.html"));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(publicPath, "register.html"));
});

// Register route
app.post('/register-user', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json('fill all the fields');
    }

    try {
        const existingUser = await db("users").where({ email }).first();
        if (existingUser) {
            return res.json('email already exists');
        }

        const newUser = await db("users").insert({ name, email, password }).returning(["name", "email"]);
        res.json(newUser[0]);
    } catch (err) {
        console.error(err);
        res.json('Error registering user');
    }
});

// Login route
app.post('/login-user', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db("users").where({ email, password }).first();
        if (user) {
            res.json({ name: user.name, email: user.email });
        } else {
            res.json("email or password is incorrect");
        }
    } catch (err) {
        console.error(err);
        res.json("Error logging in");
    }
});

app.listen(3000, (req,res) => {
    console.log('listening on port 3000...');
});