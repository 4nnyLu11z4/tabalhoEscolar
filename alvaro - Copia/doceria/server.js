const express = require("express");
const cors = require("cors"); //mecanismo de segurança q permite ou bloqueia a comunicação entre recursos de diferentes

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Servidor funcionando!");
});

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
});

let produtos = [
    {
        id: 1,
        nome: "Cupcake de Chocolate",
        preco: 8.00
    }
];

app.get("/produtos", (req, res) => {
    res.json(produtos);
});