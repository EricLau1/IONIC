Consumindo uma Api Rest Python com Ionic

API

Instalar as bibliotecas:

\> pip install pymsql

\> pip install flask

\> pip install -U flask-cors

- Instalar MySQL

- Executar as Query do arquivo 'sql.sql'

Executar a Python API:

\> py api.py

URL's DISPONÍVEIS:

*http://localhost:5000/          ~ lista produtos [retorna uma lista de produtos] -> GET*

*http://localhost:5000/produto/1 ~ recupera produto pelo numero do id [retorna o produto encontrado ou uma mensagem] -> GET*

*http://localhost:5000/produto   ~ cria um nome produto [retorna uma lista de produtos ou uma mensagem] -> POST*

*http://localhost:5000/update/1  ~ atualiza um produto pelo id [retorna o item atualizado ou uma mensagem] -> PUT*

*http://localhost:5000/delete/1  ~ delete um item pelo id [retorna uma lista de produtos ou mensagem] -> DELETE*

*http://localhost:5000/register  ~ cadastra um novo usuário [retona uma mensagem de OK ou Failed] -> POST*

*http://localhost:5000/login     ~ autentica um usuario para logar no sistema [retorna os dados do usuario ou uma mensagem] -> POST*

IONIC

iniciando o projeto ionic

\> ionic start myApp blank

\> ionic g provider usuario

PASSOS:

- importar o HttpClientModule no AppModule

- Fazer os métodos de logar e cadastrar no provider de usuario

- Fazer o formulario de login na HOME

- Utilizar o mesmo formulario de login para cadastrar usuario

\> ionic g provider produto

- Fazer os métodos CRUD no provider

\> ionic g page produto-list

- Chame a página do ProdutoList dentro do método de login caso os dados sejam autenticados

- Importar o Provider de Produto

- Fazer uma lista de produtos

- Fazer o método para chamar o formulário para cadastro de produtos

\> ionic g page produto

- Fazer o método para  chamar o formulário para atualizar dados dos produtos

\> ionic g page produto-edit

