import express from 'express'
import { createNote, getNotes, getSingleNote } from './database.js';

const app = express();
app.use(express.json())
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get('/',(req,res)=>{
    res.send("Hello welcome to home page");
})

app.get('/notes',async (req,res)=>{
    const notes = await getNotes();
    res.send(notes);
})

app.get('/single-note/:id',async (req,res)=>{
    const id = req.params.id;
    const note = await getSingleNote(id);
    res.send(note);
})

app.post('/createNote',async (req,res)=>{
    const {title,content} = req.body;
    const result = await createNote(title,content);
    res.send(result);
})

app.listen(8000,()=>{
    console.log('server is running on port \n http://localhost:8000/');
})
