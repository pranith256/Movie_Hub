const express = require('express')
const {graphqlHTTP}  = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors=require('cors');
//connect to MongoDB
mongoose.connect('mongodb+srv://user1:123@todo.7jwtork.mongodb.net/GraphQL_DB?retryWrites=true&w=majority&appName=GraphQL_DB').then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

const app =express()

//allows cors request
app.use(cors())
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true

}));

app.listen(4000,()=>{
    console.log("Listening requests on port 4000")
})


