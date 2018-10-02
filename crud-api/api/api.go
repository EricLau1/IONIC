package main

/* 
	import package:

	# go get github.com/gorilla/mux

*/

import (
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"encoding/json"
	"time"
	"strconv"
	"io/ioutil"
)


type Produto struct {
	Id int `json:id`
	Descricao string `json:descricao`
	Quantidade int `json:quantidade`
	Valor float64 `json:valor`
}

var produtos = []Produto{
	Produto{Id: 1, Descricao: "item 1", Quantidade: 10, Valor: 100},
	Produto{Id: 2, Descricao: "item 2", Quantidade: 20, Valor: 200},
	Produto{Id: 3, Descricao: "item 3", Quantidade: 30, Valor: 300},
}

func main() {

	fmt.Print("Server start: http://localhost:3000, ")
	now := time.Now();
	fmt.Printf("Date: %d-%d-%d, Hour: %d:%d:%d, %s", 
			now.Day(), now.Month(), now.Year(),
			now.Hour(), now.Minute(), now.Second(),
			boldText("running..."))

	r := mux.NewRouter().StrictSlash(true)

	r.HandleFunc("/", index).Methods("GET")

	r.HandleFunc("/produtos", getProdutos).Methods("GET")

	r.HandleFunc("/produtos/{id}", getProduto).Methods("GET")

	r.HandleFunc("/produtos/create", postProduto).Methods("POST")

	r.HandleFunc("/produtos/update/{id}", putProduto).Methods("POST")

	r.HandleFunc("/produtos/delete/{id}", deleteProduto).Methods("GET")

	log.Fatal(http.ListenAndServe(":3000", r))
}

func boldText(text string) string {
	return "\033[1m" + text + "\033[0m"
}

type Rota struct {
	Url string `json:url`
	Method string `json:method`
}

var rotas = []Rota{
	Rota{ Url: "http://localhost:3000/produtos", Method: "GET" },
	Rota{ Url: "http://localhost:3000/produtos/id", Method: "GET" },
	Rota{ Url: "http://localhost:3000/produtos/create", Method: "POST" },
	Rota{ Url: "http://localhost:3000/produtos/update/id", Method: "PUT" },
	Rota{ Url: "http://localhost:3000/produtos/delete/id", Method: "DELETE" },
}

func index(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-type", "application/json")

	json.NewEncoder(w).Encode(rotas)

}

func getProdutos(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-type", "application/json")

	json.NewEncoder(w).Encode(produtos)	

}

func getProduto(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-type", "application/json")

	param := mux.Vars(r)

	id, _ := strconv.Atoi(param["id"])

	for _, produto := range produtos {

		if produto.Id == id {

			json.NewEncoder(w).Encode(produto)
			return

		} 
	}

	json.NewEncoder(w).Encode(&Produto{})
}

func postProduto(w http.ResponseWriter, r *http.Request){

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-type", "application/json")

	var produto Produto

	body, _ := ioutil.ReadAll(r.Body)

	json.Unmarshal(body, &produto)

	produtos = append(produtos, produto)

	json.NewEncoder(w).Encode(produtos)

}

func putProduto(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-type", "application/json")

	param := mux.Vars(r)

	id, _ := strconv.Atoi(param["id"])

	for index, produto := range produtos {


		if produto.Id == id {

			var prod Produto

			_ = json.NewDecoder(r.Body).Decode(&prod)

			fmt.Println(prod);

			produtos[index].Descricao = prod.Descricao
			produtos[index].Quantidade = prod.Quantidade
			produtos[index].Valor = prod.Valor

			json.NewEncoder(w).Encode(produtos[index])

			return
		}

	}

	json.NewEncoder(w).Encode(produtos)

}


func deleteProduto(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-type", "application/json")

	param := mux.Vars(r)

	id, _ := strconv.Atoi(param["id"])

	for index, produto := range produtos {

		if id == produto.Id {

			produtos = append(produtos[:index], produtos[index + 1:]...)

		}

	}

	json.NewEncoder(w).Encode(produtos)
}
