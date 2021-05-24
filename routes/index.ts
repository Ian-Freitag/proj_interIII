import app = require("teem");
import Usuario = require("../models/usuario");

class IndexRoute {
  public async index(req: app.Request, res: app.Response) {
    res.render("index.ejs", {
     
    });
  }
  
  public async cadastrar(req: app.Request, res: app.Response) {
    res.render("cadastrar.ejs", {
     
    });
  }

}

export = IndexRoute;
