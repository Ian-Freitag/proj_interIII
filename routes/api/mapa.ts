/*import app from "teem";

// Isso aqui não é o melhor exemplo de design pattern/arquitetura/divisão em camadas...
// É só um exemplo de como fazer funcionar! :)

export class Mapa {
	

	@app.http.post()
	public async criarPontoBanco(req: app.Request, res: app.Response) {
		const body = req.body;
		if (!body) {
			res.statusCode = 400;
			res.json("Dados inválidos");
			return;
		}

		const nome = body.nome;
		const descricao = body.descricao;
		const lat = parseFloat(body.lat);
		const lng = parseFloat(body.lng);
		const cultura = body.cultura;
		if (!nome || !descricao || isNaN(lat) || isNaN(lng)) {
			res.statusCode = 400;
			res.json("Dados inválidos");
			return;
		}

		await app.sql.connect(async (sql) => {
			await sql.query("insert into mapa (nome, descricao, lat, lng, cultura) values (?, ?, ?, ?, ?)", [ nome, descricao, lat, lng, cultura]);
		});

		// Apenas para não devolver uma resposta vazia de sucesso (204)
		res.json(true);
	}

	public async listarPontosBanco(req: app.Request, res: app.Response) {
		let lista: any[];

		await app.sql.connect(async (sql) => {
			lista = await sql.query("select id, nome, descricao, lat, lng, cultura from mapa");
		});

		res.json(lista);
	}
}*/
