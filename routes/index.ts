import app = require("teem");

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
  @app.route.methodName( app.root + "/mapa")
  public async mapa(req: app.Request, res: app.Response) {
    res.render("mapa.ejs", {
      layout: "layout-mapa",
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
