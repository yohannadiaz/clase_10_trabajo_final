db   		    = 	require('./database'),
db.conectaDatabase();

var getQuestions =  function(req, res)
{
		db.queryMysql("Select numpregunta, pregunta, opcion1, opcion2, opcion3, opcion4 from preguntas Order by rand();", function(err, data){
			if (err) throw err;
			res.json(data);
		});
};
var isValid =  function (req, res)
{
	db.queryMysql("Select correcta from preguntas where numpregunta = " + req.body.numPregunta + ";", function(err, data){
		if (err) throw err;
		res.json({
					respuestaCorrecta : data[0].correcta,
					correcta : data[0].correcta === req.body.respuesta ? true : false
		});
	});
};
//Exportar las rutas...
module.exports.getQuestions = getQuestions;
module.exports.isValid = isValid;
