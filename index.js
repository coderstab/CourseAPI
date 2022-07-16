const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'Mathematics'},
    {id: 2, name: 'English'},
    {id: 3, name: 'Hindi'},
    {id: 4, name: 'Social Science'},
    {id: 5, name: 'English'},
    {id: 6, name: 'Science'},
    {id: 7, name: 'History'},
    {id: 7, name: 'Geography'}

]

app.get('/', (req,res) => {
res.send('Node Express API ');
});

app.get('/api/courses', (req, res) => {
res.send(courses);
});

// api course with ID
app.get('/api/courses/:id', (req, res) => {
 const course = courses.find(c => c.id === parseInt(req.params.id));
 if(!course) res.status(404).send('the course is not avilable');
 res.send(course);//404
});

// Post Method 
app.post('/api/courses', (req, res) => {
    const {error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// Update the course
app.put('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
 if(!course) return res.status(404).send('the course is not avilable');
//  error handeling
const {error} = validateCourse(req.body);
if (error) return res.status(400).send(error.details[0].message);
course.name = req.body.name;
res.send(course);
});


// Delete the course 
app.delete('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('the course is not avilable');
    const index =courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
   
});

// Function for error handeling for re-use

function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    
    return schema.validate(course);

}

// Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));