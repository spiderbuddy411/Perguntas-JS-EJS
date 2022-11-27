const express = require ("express");
const app = express();
const bodyParser = require("body-parser")
const conn = require("./database/database");
const PerguntaModel = require("./database/Pergunta");
const RespostaModel = require ("./database/Resposta")

//database
conn.authenticate()
.then(() => {
    console.log("Conectado ao banco de dados");
})
.catch((msgErro) => {
    console.log(msgErro);
})
//database

//Rodando NOJS em backgroud 
// npm install -g pm2
// -> pm2 start index.js <= Iniciar o site
//-*-----------




//----------------------------------------------------------
// Estou dizendo para o express usar o EJS como View Engine
app.set('view engine', 'ejs');
//Carregar itens staticos css, javascript, imagens etc.
app.use(express.static("public"));
// BodyParser vai traduzir os dados passado para uma estrutura js e ela entender e salvar da mesma forma que digitamos
app.use(bodyParser.urlencoded({extended: false}));
// Permite leia dados enviado em json
app.use(bodyParser.json());
//----------------------------------------------------------

//rotas
app.get("/", (req, res) => {
    PerguntaModel.findAll({raw: true, order: [
        ['id', 'DESC'] // ASC = Cresente || DESC = Descrecente
    ]}).then(perguntas =>{
            res.render('index', {
            perguntas: perguntas
        });
    });
    
});


app.get("/perguntar", (req, res) =>{
    res.render('perguntar');

});

// app.post => Receber dados de forma Anonymous
app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    PerguntaModel.create({
        titulo: titulo,
        descricao: descricao
        
    }).then(() => {
        res.redirect("/");
    })
});

app.get("/pergunta/:id", (req, res) =>{
    var id = req.params.id;
    
    PerguntaModel.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ //Pergunta encontrada   
            RespostaModel.findAll({ 
                where: {perguntaId: pergunta.id},
                order: [['id', 'DESC']]
            }).then(respostas =>{
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas

                });  
            });

        }else{ //Nao encontrada
            res.redirect('/');
        }

    })
    

});

app.post("/responder",(req,res) => {

    var corpo = req.body.corpo;
    var perguntaId = req.body.perguntaID;   

    RespostaModel.create({
        corpo: corpo,
        perguntaId: perguntaId,

    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    });

});




app.listen(80, () => {
    console.log("Rodando na Porta 8080")
})