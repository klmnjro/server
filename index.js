const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json())

app.listen(
    PORT,
() => console.log(`it's alive on http://localhost:${PORT}`)
)

function currentTime() {
    let currentDate = new Date();
    let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    return time;
};

let garageDoor = {
    status: "closed",
    
    getStatus: function() {
        return garageDoor.status;
    },

    setStatus: function(moddedStatus) {
        garageDoor.status = moddedStatus;
    }
}

function toggleGarage() {
    if (garageDoor.getStatus() == "closed") {
        garageDoor.setStatus("open");
    }
    return garageDoor.getStatus();
}

app.get('/status', (req, res) => {
    res.status(200).send({
        serverStatus: `online`,
        garageStatus: garageDoor.getStatus(),
        time: currentTime()
    })
})

app.post('/testScript', (req, res) => {
    const { command } = req.body;
    
    if (!command) {
        res.status(418).send({ message: "We need a command!"})
    };
    
    console.log(command);
    
    res.send({
        time: currentTime(),
        command: command
    })
})

app.post('/garageDoor/trigger', (req, res) => {
    const { action } = req.body;
    
    if (!action) {
        res.status(418).send({ message: "We need an action!"})
    }
    else if (action != "trigger") {
        res.status(418).send({ message: "Incorrect action provided."})
    };
    
    toggleGarage();
    
    res.send({
        serverStatus: 'online',
        time: currentTime(),
        action: action
    })
    
})

app.post('/tshirt/:id', (req, res) => {
    
    const { id } = req.params;
    const { logo } = req.body;
    
    if (!logo) {
        res.status(418).send({ message: 'We need a logo!'})
    };
    
    res.send({
        tshirt: `👕 with your ${logo} and ID of ${id}`,
    });
});