import app = require("teem");
import Regiao = require("../../models/Regiao");

class RegiaoApiRoute {
  public async listar(req: app.Request, res: app.Response) {
      let lista = await Regiao.listar();

      res.json(lista);
  }

  
  @app.route.methodName("/obter/:id")
  public async obter(req: app.Request, res: app.Response) {
      let erro: string = null;

      let id = parseInt(req.params["id"]);

      let Regiao: Regiao = null;

      if (isNaN(id)) {
          erro = "Id inválido";
      } else {
          Regiao = await Regiao.obter(id);

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

      let Regiao = req.body as Regiao;

      erro = await Regiao.criar(Regiao);

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

      let Regiao = req.body as Regiao;

      erro = await Regiao.alterar(Regiao);

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