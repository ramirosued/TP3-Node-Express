import Alumno from "./models/alumno.js"
import {sumar, restar, multiplicar, dividir} from "./modules/matematica.js"
import {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID} from
"./modules/wrapper.js"



import express from "express"; // hacer npm i express
import cors from "cors"; // hacer npm i cors
const app = express();
const port = 3000;
// Agrego los Middlewares
app.use(cors()); // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON
//
// Aca pongo todos los EndPoints
//
app.get('/', (req, res) => { // EndPoint "/"
    res.send('Ya estoy respondiendo!');
})

app.get('/saludar', (req, res) => { // EndPoint "/saludar"
    res.send('Hello World!');
})

app.get("/saludar/:nombre", (req, res) =>{
    res.status(200).send(`Hola ${req.params.nombre}`);
})

app.get("/validarfecha/:ano/:mes/:dia",(req,res) =>{
    const {ano,mes,dia} = req.params;
    let fecha = new Date();
    fecha = Date.parse(`${dia}/${mes}/${ano}`);
    if(fecha){
        res.status(200).send("OK. Fecha valida");
    }
    else{
        res.status(400).send("Bad Request")
    }    
})

//Endpoints que reutilizan el módulo matemática.js

app.get("/matematica/sumar" ,(req, res) =>{
    const num1 = parseFloat(req.query.n1);
    const num2 = parseFloat(req.query.n2);
    const resultado = sumar(num1,num2);
    res.status(200).send(`El resultado es: ${resultado}`);
})
app.get("/matematica/restar" ,(req, res) =>{
    const num1 = parseFloat(req.query.n1);
    const num2 = parseFloat(req.query.n2);
    const resultado = restar(num1,num2);
    res.status(200).send(`El resultado es: ${resultado}`);
})
app.get("/matematica/multiplicar" ,(req, res) =>{
    const num1 = parseFloat(req.query.n1);
    const num2 = parseFloat(req.query.n2);
    const resultado = multiplicar(num1,num2);
    res.status(200).send(`El resultado es: ${resultado}`);
})
app.get("/matematica/dividir" ,(req, res) =>{
    const num1 = parseFloat(req.query.n1);
    const num2 = parseFloat(req.query.n2);
    const resultado = dividir(num1,num2);
    res.status(200).send(`El resultado es: ${resultado}`);
    if (n1 == 0) {
        res.status(400).send("Bad Request , el divisor no puede ser cero")
    }
})

// Endpoints que reutilizan el módulo omdb-wrapper.js

app.get("/omdb/omdbsearchbypage" , async (req, res) => {
    const texto = req.query.search;
    const page = req.query.p;
    const resultado = await OMDBSearchByPage(texto,page);
    res.status(200).send(`${resultado}`);

})
app.get("/ombd/searchcomplete" , async (req,res) => {
    const texto = req.query.search
    const resultado = await OMDBSearchComplete(texto);
    res.status(200).send(resultado);

})
app.get("/omdb/getbyomdbid?imdbID={imdb}" , async (req , res) => {
    
    const texto = req.query.imdbID
    const resultado = await OMDBGetByImdbID(texto);
    res.status(200).send(resultado);
})

// Endpoints DE LA CLASE ALUMNO
const alumnosArray = [];
alumnosArray.push(new Alumno("Esteban Dido" , "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao" , "32623391", 18));

app.get("/alumnos", (req, res) => {
    res.status(200).send(alumnosArray);
})

app.get("/alumnos/:dni", (req, res) => {
    const dni = req.params.dni;
    const alumno = alumnosArray.find(alumno => alumno.dni === dni);

    if (alumno) {
        res.status(200).json({ message: 'Operación exitosa', alumno: alumno });
    } else {
        res.status(404).json({ message: 'Alumno no encontrado' });
    }
});

app.post("/alumnos", (req, res) => {
    let nombre = req.body.username;
    let dni = req.body.dni;
    let edad = req.body.edad;
    let nuevoAlumno = new Alumno(nombre, dni, edad);

    if (!nombre || !dni || !edad) {
        res.status(404).send(`Faltan datos del alumno`);
    } else {
        alumnosArray.push(nuevoAlumno);
        res.status(200).json({ message: 'Operación exitosa', alumno: nuevoAlumno });
    }
});

app.delete("/alumnos", (req, res) => {
    const dni = req.body.dni;
    let dniBuscado = -1;
    dniBuscado = alumnosArray.find(alumno => alumno.dni === dni);

    if (dniBuscado !== -1) {
        alumnosArray.splice(dniBuscado, 1);
        res.status(200).send("Se elimino correctamente");
    } else {
        res.status(404).json({ message: 'Alumno no encontrado' });
    }
});


app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})

