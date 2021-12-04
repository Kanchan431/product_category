const config = require('dotenv');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const EcommRoutes = require('./server/routes/EcommRoutes');

config.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 4444;

app.use('/api/v1/ecomm', EcommRoutes);

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
   message: 'Product and Category api...'
}));

app.listen(port, () => {
   console.log(`Server is running on PORT ${port}`);
});
module.exports = app;