// API privada 
        /// Buscando todos os crocodilos
/// Critérios:
        /// Teste de Perfomance
                /// 10s com 10VU
        ///Limites
                /// Requisição com falha inferior a 1%
                /// Duração da requisição p(95) < 250 milesegundos


/// Configuração /////////////////////////////////////////////////////////////////////////////////////////             
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    vus: 100,
     duration: '10s',     /// 10s com 10VU
    thresholds: {     ///Limites
        http_req_failed: ['rate < 0.01'],   /// Requisição com falha inferior a 1%
        http_req_duration: ['p(95) < 250']  /// Duração da requisição p(95) < 250 milesegundos
    }
}

/// Configuração "Funções externas" /////////////////////////////////////////////////////////////////////////////////////////
const BASE_URL = 'https://test-api.k6.io';

export function setup(){
    const loginRes = http.post(`${BASE_URL}/auth/token/login/`, {
        username: '0.868886995687286@mail.com',
        password: 'user123'
    });
    const token = loginRes.json('access');
    return token;
}


/// Execução //////////////////////////////////////////////////////////////////////////////////////////////

export default function(token){
    
    const params = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json'
        }
    }

    const res = http.get(`${BASE_URL}/my/crocodiles/`, params); ///OBS:. Para que a requisição seja realizada deverá ser aplicada alguns parametros na requisição Ex: "Token de autenticação"

    check(res, {
        'status code 200': (r) => r.status === 200
    });
}



