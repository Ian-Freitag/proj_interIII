import app = require("teem");
import Usuario = require("../models/usuario");

class IndexRoute {
  public async index(req: app.Request, res: app.Response) {
    res.render("index.ejs", {
      layout: "layout-home",
    });
  }
  
  @app.route.methodName( app.root + "/cadastrar")
  public async cadastrar(req: app.Request, res: app.Response) {
    res.render("cadastrar.ejs", {
      layout: "layout-home",
    });
  }

  @app.route.methodName( app.root + "/login")
	public async dadosBanca(req: app.Request, res: app.Response) {
		
		
			res.render("login.ejs", {
				layout: "layout-home",
	
			});
			return;
		}


}

export = IndexRoute;
