// Registration e auth: login
        /// Realizar o login com um novo usuário
// Critérios:
        /// Teste de Estresse
                /// Ramp up (acrécimo de usuário) 5s com 5VS
                /// Carga (constante) 5s com 5VU
                /// Ramp up (acrécimo de usuário) 2s com 50VU 
                /// Carga (constante) 2s com 50VU
                /// Ramp down (decréscimo de usuário) 5s com 0VU
        /// Limites:
                ///Requisição com falha inferior a 1%


/// Configuração ////////////////////////////////////////////////////////////////////////////////////////////

import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from "k6/data";
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js'


export const options = {
    stages: [
        {duration: '5s', target: 5},    /// Ramp up (acrécimo de usuário) 5s com 5VS
        {duration: '5s', target: 5},   /// Carga (constante) 5s com 5VU
        {duration: '2s', target: 50},    /// Ramp up (acrécimo de usuário) 2s com 50VU 
        {duration: '2s', target: 50},     /// Carga (constante) 2s com 50VU
        {duration: '5s', target: 0},      /// Ramp down (decréscimo de usuário) 5s com 0VU
],
    thresholds: {
        http_req_failed: ['rate < 0.01']    ///Requisição com falha inferior a 1%
    }
}

const csvData = new SharedArray('ler dados', function(){
        return papaparse.parse(open('./register-lesson3_and_4.csv'), {header: true}).data;  ///arquivo csv sem titulo colocasse "{header: false}" - Títulos aleatorios (Bagunçados)
                                                                                                /// Indica-se colocar titulo e aplicar "{header: true}" - Títulos nomeados (Organizados)
});

/// Execução //////////////////////////////////////////////////////////////////////////////////////////////

export default function() {    
    const USER = csvData[Math.floor(Math.random() * csvData.length)].email
    const PASS = 'user123'
    const BASE_URL = 'https://test-api.k6.io';

    console.log(USER);  

    const res = http.post(`${BASE_URL}/auth/token/login/`,{
        username: USER,
        password: PASS
    });

    check(res, {
        'sucesso login': (r) => r.status === 200,
        'token gerado': (r) => r.json('acess') !== ''
    });

    sleep (1)
}
