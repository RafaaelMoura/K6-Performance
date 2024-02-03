// #Registro:
     ///- Realização de novo úsuario
// #Critérios:
     /// Perfomance test ///
            /// 1º - Carga 10s com 10VU
    /// Limites ///
            /// 2º - Requisição com sucesso superior a 95%
            /// 3º - Requisição com falha inferior a 1%
            /// 4º - Duração de requisição p(95) < 500 milisegundos


/// Configuração /////////////////////////////////////////////////////////////////////////////////////////

import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    stages: [{duration: '10s', target: 10}],  ///1º - Carga 10s com 10VU
    thresholds: {    /// Limites ///
        checks: ['rate > 0.95'],  /// 2º - Requisição com sucesso superior a 95%
        http_req_failed: ['rate < 0.01'],   /// 3º - Requisição com falha inferior a 1% 
        http_req_duration: ['p(95) < 500']  /// 4º - Duração de requisição p(95) < 500 milisegundos
    }
}

/// Execução ////////////////////////////////////////////////////////////////////////////////////////////

export default function(){
    
    const USER = `${Math.random()}@mail.com`   ///  A formula "${Math.random()}" É usado para gerar nomes aleatorios.
    const PASS = 'user123'
    const BASE_URL = 'https://test-api.k6.io';

    console.log(USER + PASS);  

    const res = http.post(`${BASE_URL}/user/register/`,{
        username: USER,
        first_name: 'crocodilo',
        last_name: 'dino',
        email: USER,
        password: PASS
    });

    check(res, {
        'sucesso ao registrar': (r) => r.status === 201
    });

    sleep(1)
}



///OBS - Path para uso:

    /// /user/register/
    /// *{
    /// "username": "",
    /// "first_name": "",
    /// "last_name": "",
    /// "email": "",
    /// "password": ""
    /// }*

    /// Caso de duvidas acessar documentação k6 "https://test-api.k6.io/" acessar "Registration and authentication" --> 'Raw Data"
 