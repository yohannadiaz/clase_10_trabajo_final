var express 		= 	require("express"),
	app				= 	express(),
	cons 			=	require("consolidate"),
	puerto 			= 	process.env.PORT || 3000,
	bodyParser  	=   require('body-parser'),
	db   			= 	require('./modulos/database'),
	rutas			=	require('./modulos/rutas');
	db.conectaDatabase();

	app.engine("html", cons.swig); //
	app.set("view engine", "html");
	app.set("views", __dirname + "/vistas");
	app.use(express.static('public'));

    //Para indicar que se envía y recibe información por medio de Json...
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));

	app.get("/", function(req, res)
	{
		res.render("index");
	});

	//Traer todas las tareas...
	app.get('/getQuestions', rutas.getQuestions);

	app.post('/isValid', rutas.isValid);
	//Iniciar el Servidor...
	var server = app.listen(puerto, function(err) {
	   if(err) throw err;
	   var message = 'Servidor corriendo en @ http://localhost:' + server.address().port;
		console.log(message);
	});
