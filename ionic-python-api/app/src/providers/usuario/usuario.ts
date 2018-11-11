import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class UsuarioProvider {

  private URI_ROOT     = "http://localhost:5000/";
  private URI_LOGIN    = this.URI_ROOT + "login";
  private URI_REGISTER = this.URI_ROOT + "register";

  constructor(public http: HttpClient) {
    
  }

  cadastrar(user) {

    return this.http.post( this.URI_REGISTER, JSON.stringify(user));

  }

  login(user) {

    return this.http.post( this.URI_LOGIN, JSON.stringify(user));

  }

}

