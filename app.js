const express = require('express')
const app = express()
const port = 3000

// 3. Serving static files
app.use(express.static('public'))                                               // curl localhost:3000/fizzbuzz.js

// 1. Hello world example
app.get('/', (req, res) => res.send('Hello world!'))                            // curl localhost:3000
app.get('/goodbye', (req, res) => res.send('Goodbye world!'))                   // curl localhost:3000/goodbye

// 2. Basic routing                                                             // Note: --request and -X both specify the type of request in curl syntax
app.post('/', (req, res) => res.send('Got a POST request'))                     // curl --request POST localhost:3000
app.put('/user', (req, res) => res.send('Got a PUT request at /user'))          // curl -X PUT localhost:3000/user
app.delete('/user', (req, res) => res.send('Got a DELETE request at /user'))    // curl -X DELETE localhost:3000/user

app.listen(port, () => console.log(`Example app listening on port ${port}!`))