import app = require("teem");
import Cultura = require("../../models/cultura");

class CulturaApiRoute {
  public async listar(req: app.Request, res: app.Response) {
      let lista = await Cultura.listar();

      res.json(lista);
  }

  
  @app.route.methodName("/obter/:id")
  public async obter(req: app.Request, res: app.Response) {
      let erro: string = null;

      let id = parseInt(req.params["id"]);

      let cultura: Cultura = null;

      if (isNaN(id)) {
          erro = "Id inválido";
      } else {
          cultura = await Cultura.obter(id);

          if (!cultura) {
              erro = "Cultura não encontrado!";
          }
      }

      if (erro) {
          res.status(400).json(erro);
      } else {
          res.json(cultura);
      }
  }

  @app.http.post()
  public async criar(req: app.Request, res: app.Response) {
      let erro: string = null;

      let cultura = req.body as Cultura;

      erro = await Cultura.criar(cultura);

      if(erro){
          res.status(400).json(erro);
      }else{
          res.json(true);
      }
  }

  @app.http.post()
  public async alterar(req: app.Request, res: app.Response) {
      let erro: string = null;

      let cultura = req.body as Cultura;

      erro = await Cultura.alterar(cultura);

      if(erro){
          res.status(400).json(erro);
      }else{
          res.json(true);
      }
  }

  @app.route.methodName("/excluir/:id")
  public async excluir(req: app.Request, res: app.Response) {
      let erro: string = null;

      let id = parseInt(req.params["id"]);

      if(isNaN(id)){
          erro = "Id inválido";
      } else{
          erro = await Cultura.excluir(id);
      }
      if(erro){
          res.status(400).json(erro);
      }else{
          res.json(true);
      }
  }
}

export = CulturaApiRoute;