// Lets just focus on READ request.
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(cors())

// Our database for our Api in objects
const attendee = {
    'client1': {
        'firstName' : 'Marcelo',
        'lastName' : 'Wiley',
        'phone' : '(436) 888-9357',
        'email' : 'marcelo.wiley@marcelo.com',
        'group' : 'Morning',
        'age' : '35',
        'height' : '176cm',
        'startweight' : '118kg',
        'goalweight' : '75kg',
        'injuries' : 'RSI - Repetitive strain injury on left wrist.',
        'currentProgress' : '7/10'
    },
    'client2': {
        'firstName' : 'Tobias',
        'lastName' : 'Klein',
        'phone' : '(549) 438-8177',
        'email' : 'h.klein@hotmail.com',
        'group' : 'Morning',
        'age' : '46',
        'height' : '165cm',
        'startweight' : '82kg',
        'goalweight' : '65kg',
        'injuries' : 'Lower back pain.',
        'currentProgress' : '7/10'
    },
    'client3': {
        'firstName' : 'Meredith',
        'lastName' : 'Conrad',
        'phone' : '(833) 984-0333',
        'email' : 'meredith_conrad@gmail.com',
        'group' : 'Evening',
        'age' : '41',
        'height' : '167cm',
        'startweight' : '95kg',
        'goalweight' : '64kg',
        'injuries' : 'migraine',
        'currentProgress' : ''
    },
    'client4': {
        'firstName' : 'Fabian',
        'lastName' : 'Mcclain',
        'phone' : '(892) 553-6212',
        'email' : 'fabianmcclain@outlook.com',
        'group' : 'Evening',
        'age' : '27',
        'height' : '187cm',
        'startweight' : '56kg',
        'goalweight' : '82kg',
        'injuries' : 'knee pain',
        'currentProgress' : '6/10'
    },
    'client5': {
        'firstName' : 'Isai',
        'lastName' : 'Cooley',
        'phone' : '(891) 811-4451',
        'email' : 'isai.cooley@forestenergy.com',
        'group' : 'Noon',
        'age' : '37',
        'height' : '173cm',
        'startweight' : '54kg',
        'goalweight' : '70kg',
        'injuries' : 'none',
        'currentProgress' : '8/10'
    },
    'client6': {
        'firstName' : 'Ashlynn',
        'lastName' : 'Baker',
        'phone' : '(789) 625-9660',
        'email' : 'ashlynnb89@gmail.com',
        'group' : 'Evening',
        'age' : '28',
        'height' : '159cm',
        'startweight' : '104kg',
        'goalweight' : '73kg',
        'injuries' : 'hip pain',
        'currentProgress' : '8/10'
    }
}

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/:alienName', (request, response) => {
    const aliensName = request.params.alienName.toLowerCase()
    // Conditional Statement to check if name is in Api.
    if(attendee[aliensName]){
        response.json(attendee[aliensName])
    } else {
        response.json(attendee['humans'])
    }
})

// Where to initialise our server, which port or let Heroku pick if not available.
app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is running on ${PORT}! You better go catch it!`)
})


