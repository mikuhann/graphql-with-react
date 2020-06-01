const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('../schema/schema');

const app = express();
const PORT = 3005;

mongoose.connect('mongodb+srv://admin:admin@cluster0-uhdrz.mongodb.net/test?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  dbName: 'react-with-graphql'
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

const dbConnection = mongoose.connection;

dbConnection.on(`error`, (err) => console.log(`Connection error: ${err}`));
dbConnection.once(`open`, () => console.log(`Db connected!`));

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server started on port: ${PORT}`);
});
