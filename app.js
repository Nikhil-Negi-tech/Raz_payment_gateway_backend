// const path = require('path');
const express = require('express');		
const cors = require('cors');
const router = require('./routes/payments_routes');	
const app = express();
const PORT = 7777;

// app.set('view engine', 'hbs');
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '')));

app.use(express.json());
app.use(cors());

app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`http://localhost:`+ PORT);
});
