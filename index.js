const express = require('express')
// const http = require('http');
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb')

const port = process.env.PORT || 5000;
// const httpServer = http.createServer(app);
// const {Server} = require('socket.io');
// const io = new Server(httpServer);

const app = express();

app.use(cors());
app.use(express.json());

// io.on("connection", (socket) => {
//     console.log("new user connected to our app");

//     socket.on("disconnect", (socket) => {
//         console.log("user disconnect")
//     })
// })


const uri = process.env.DB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

try {
    const projectsCollection = client.db('Shuvo').collection('projects');
    const skillsCollection = client.db('Shuvo').collection('skills');

    app.post('/projects', async (req, res) => {
        const projects = await projectsCollection.insertOne(req.body);
        res.send(projects)
    })

    app.get('/projects', async(req, res) => {
        const projects = await projectsCollection.find().toArray();
        res.send(projects);
    })

    app.post('/skills', async (req, res) => {
        const skills = await skillsCollection.insertMany(req.body);
        res.send(skills)
    })

    app.get('/skills/expertise', async (req, res) => {
        const query = {
            track: {
                $eq: "expertise"
            }
        }
        const skills = await skillsCollection.find(query).toArray();
        res.send(skills);
    })

    app.get('/skills/comfortable', async (req, res) => {
        const query = {
            track: {
                $eq: "comfortable"
            }
        }
        const skills = await skillsCollection.find(query).toArray();
        res.send(skills);
    })
    app.get('/skills/tools', async (req, res) => {
        const query = {
            track: {
                $eq: "Tools"
            }
        }
        const skills = await skillsCollection.find(query).toArray();
        res.send(skills);
    })
} catch (error) {
    console.log(err)
} finally {

}

app.get('/', (req, res) => {
    console.log("server running");
})


app.listen(port, () => {
    console.log(`listening on Port ${port}`)
})