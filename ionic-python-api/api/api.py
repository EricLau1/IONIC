# download do plugin Flask: pip install flask
# download CORS: pip install -U flask-cors
from flask import Flask, jsonify, request
from flask_cors import CORS
import db 

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

conn = db.getConnection()
cur = conn.cursor()

produtoList = []

def map_produto(dados):

    produtos = []

    for produto in dados:

        produtos.append({
            "id": produto[0],
            "descricao": produto[1],
            "preco": produto[2],
            "quantidade": produto[3]
        })
    #end for

    return produtos
#end map_produto

@app.route('/', methods=['GET'])
def index():

    data = db.getAll(cur)

    produtoList = map_produto(data)

    return jsonify(produtoList)
#end index

@app.route('/produto/<int:id>', methods=['GET'])
def getProduto(id):

    cur = conn.cursor()

    data = db.find(id, cur)
    
    if data != None:

        produto = {
            "id" : data[0],
            "descricao" : data[1],
            "quantidade" : data[2],
            "preco" : data[3]
        }
        return jsonify(produto)
    
    return jsonify({"message": "Item não existe."})
#end getProduto

@app.route('/produto', methods=['POST'])
def postProduto():

    dados = request.get_json(force=True)

    if dados['descricao'] != '':

        cur = conn.cursor()

        if db.create(dados, cur):

            db.applyCommit(conn)

            return jsonify(db.getAll(cur)), 201
        #end if
    #end if
    return jsonify({ "message": "Erro. Operação inválida." })
#end postProduto

@app.route('/update/<int:id>', methods=['PUT'])
def putProduto(id):

    dados = request.get_json(force=True)

    if dados['descricao'] != '':

        dados['id'] = id

        cur = conn.cursor()

        if db.update(dados, cur):

            db.applyCommit(conn)

            return jsonify(db.find(id, cur))
        #end if    
    #end if
    return jsonify({ "message": "Erro. Operação inválida." })
#end putProduto

@app.route('/delete/<int:id>', methods=['DELETE'])
def deleteProduto(id):

    cur = conn.cursor()

    if db.delete(id, cur):
        db.applyCommit(conn)
        return jsonify( db.getAll(cur) )

    return jsonify( { "message" : "Nenhum dado foi excluido" } )
#end deleteProduto

@app.route('/register', methods=['POST'])
def cadastro():

    dados = request.get_json(force=True)

    if dados['nome'] != '' and dados['senha'] != '':

        cur = conn.cursor()

        if db.register(dados, cur):
            db.applyCommit(conn)
            return jsonify({ "message" : "OK" }), 201
        #end if
    #end if
    return jsonify({"message": "Failed"})
#end cadastro

@app.route('/login', methods=['POST'])
def logar():

    dados = request.get_json(force=True)

    if dados['nome'] != '' and dados['senha'] != '':

        cur = conn.cursor()

        user = db.auth(dados, cur)

        print(user)

        if user != None:
            return jsonify(dados)
        #end if

    #end if
    return jsonify( {"message" : "dados inválidos."} )

#end login   


# URL PATH's
# http://localhost:5000/          ~ lista produtos [retorna uma lista de produtos] -> GET
# http://localhost:5000/produto/1 ~ recupera produto pelo numero do id [retorna o produto encontrado ou uma mensagem] -> GET
# http://localhost:5000/produto   ~ cria um nome produto [retorna uma lista de produtos ou uma mensagem] -> POST
# http://localhost:5000/update/1  ~ atualiza um produto pelo id [retorna o item atualizado ou uma mensagem] -> PUT
# http://localhost:5000/delete/1  ~ delete um item pelo id [retorna uma lista de produtos ou mensagem] -> DELETE
# http://localhost:5000/register  ~ cadastra um novo usuário [retona uma mensagem de OK ou Failed] -> POST
# http://localhost:5000/login     ~ autentica um usuario para logar no sistema [retorna os dados do usuario ou uma mensagem] -> POST

if __name__ == '__main__':
    app.run(debug=True)