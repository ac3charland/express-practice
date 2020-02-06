const express = require('express')
const app = express()
const port = 3000

let birds = require('./birds')

// 3. Serving static files
    // https://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))                                               // curl localhost:3000/index.html

// 1. Hello world example
    // https://expressjs.com/en/starter/hello-world.html
app.get('/', (req, res) => res.send('Hello world!'))                            // curl localhost:3000
app.get('/goodbye', (req, res) => res.send('Goodbye world!'))                   // curl localhost:3000/goodbye

// 2. Basic routing                                                             // Note: --request and -X both specify the type of request in curl syntax
    // https://expressjs.com/en/starter/basic-routing.html
app.post('/', (req, res) => res.send('Got a POST request'))                     // curl --request POST localhost:3000
app.put('/user', (req, res) => res.send('Got a PUT request at /user'))          // curl -X PUT localhost:3000/user
app.delete('/user', (req, res) => res.send('Got a DELETE request at /user'))    // curl -X DELETE localhost:3000/user

// 4. Intermediate routing
    // https://expressjs.com/en/guide/routing.html

// express.all()
app.all('/method/does/not/matter', (req, res) => {                              // curl -X [PUT, POST, DELETE, GET] localhost:3000/method/does/not/matter
    res.send(`Got a ${req.method} request at /method/does/not/matter. This endpoint can handle GET, POST, PUT, and DELETE requests.`)
})

// Special Characters
app.get('/wildcard/*', (req, res) => {                                          // curl localhost:3000/wildcard/[random string]
    res.send(`Got a GET request at ${req.originalUrl}`)
})

// Route Parameters
app.get('/widget/:id', (req, res) => {                                          // curl localhost:3000/widget/1234
    const {id} = req.params
    res.send('Got a GET request for Widget id #' + id)
})
app.get('/flights/:from-:to', (req, res) => {                                   // curl localhost:3000/flights/MSP-LAX
    const {from, to} = req.params
    res.send(`Sending flights from ${from} to ${to}`)
})
app.get('/organisms/:genus.:species', (req, res) => {                           // curl localhost:3000/organisms/Homo.ergaster
    const {genus, species} = req.params
    res.send(`Searching for organism ${genus} ${species}`)
})

// Multiple Route Handlers
const h1 = (req, res, next) => {
    console.log(`Request to ${req.originalUrl} will be handled by the next function`)
    next()
}
const h2 = (req, res) => {
    res.send(`Hello from h2! You sent a ${req.method} request to ${req.originalUrl}`)
}
app.get('/multiple/handlers/', h1, h2)                                          // curl localhost:3000/multiple/handlers/
app.get('/multiple/handlers/array/', [h1, h2])                                  // curl localhost:3000/multiple/handlers/array/

// Route
app.route('/book')
    .get((req, res) => res.send('Get a random book'))                           // curl localhost:3000/book
    .post((req, res) => res.send('Add a random book'))                          // curl -X POST localhost:3000/book
    .put((req, res) => res.send('Update the book'))                             // curl -X PUT localhost:3000/book

// Importing routes
app.use('/birds', birds)                                                        // curl localhost:3000/birds/about
                                                                                // curl localhost:3000/birds

/*
*  1. App listens for requests to the specified port.
*  2. When a request is received, the app checks if it matches any
*  of the endpoints (URIs) specified by app.get, .post, .put, .delete, etc.
*  3. If a match is detected, the callback function of that endpoint is called.
*/
app.listen(port, () => console.log(`Example app listening on port ${port}!`))