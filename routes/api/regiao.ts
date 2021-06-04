import app = require("teem");
import Regiao = require("../../models/Mapa");

class RegiaoApiRoute {
  public async listar(req: app.Request, res: app.Response) {
      let lista = await Regiao.listar();

      res.json(lista);
  }

  
  @app.route.methodName("/obter/:id")
  public async obter(req: app.Request, res: app.Response) {
      let erro: string = null;

      let id = parseInt(req.params["id"]);

      let regiao: Regiao = null;

      if (isNaN(id)) {
          erro = "Id inválido";
      } else {
          regiao = await Regiao.obter(id);

          if (!Regiao) {
              erro = "Regiao não encontrado!";
          }
      }

      if (erro) {
          res.status(400).json(erro);
      } else {
          res.json(Regiao);
      }
  }

  @app.http.post()
  @app.route.formData()
  public async criar(req: app.Request, res: app.Response) {
      let erro: string = null;

      let regiao = req.body as Regiao;

      erro = await Regiao.criar(regiao);

      if(erro){
          res.status(400).json(erro);
      }else{
          res.json(true);
      }
  }

  @app.http.post()
  @app.route.formData()
  public async alterar(req: app.Request, res: app.Response) {
      let erro: string = null;

      let regiao = req.body as Regiao;

      erro = await Regiao.alterar(regiao);

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
          erro = await Regiao.excluir(id);
      }
      if(erro){
          res.status(400).json(erro);
      }else{
          res.json(true);
      }
  }
}

export = RegiaoApiRoute;