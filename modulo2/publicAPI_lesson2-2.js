                                ///Segunda Parte///

// API publica: Exemplo 2      
        /// Buscar Crocodilo po ID
// Critérios:
        ///Teste de Performance/carga
                /// 1º - Ramp up (acréscimo de úsuario) 10s com 10VU
                /// 2º - Carga (constante) 10s com 10VU
                /// 3º - Ramp down (decréscimo de úsuario) 10s com 0VU
        /// Limetes:
                ///Requisição com sucesso > 95%
                ///Tempo requisição p(90) < 200 milisegundos


/// Configuração ///////////////////////////////////////////////////////////////////////////////////////// 

import http from 'k6/http';
import {check, sleep} from 'k6';
import { SharedArray } from 'k6/data';

export const options = {
   stages: [            ///Teste de Performance/carga
    {duration:'10s', target: 10},       /// 1º - Ramp up (acréscimo de úsuario) 10 com 10VU
    {duration:'10s', target: 10},       /// 2º - Carga (constante) 10s com 10VU
    {duration:'10s', target: 0}         /// 3º - Ramp down (decréscimo de úsuario) 10s com 0VU
   ],
   thresholds: {
       checks: ['rate > 0.95'],         ///Requisição com sucesso > 95%
       http_req_duration: ['p(95) < 200']       ///Tempo requisição p(90) < 200 milisegundos
   }
}

/// Execução ////////////////////////////////////////////////////////////////////////////////////////////

const data = new SharedArray('Leitura do json', function(){
    return JSON.parse(open('/dados.json')).crocodilos
})

export default function(){
    const crocodilos = data [Math.floor(Math.random() * data.length)].id
    console.log(crocodilos)
   const BASE_URL = `https://test-api.k6.io/public/crocodiles/${crocodilos}`; ///OBS - Segunda parte é referente a varias ID por unidades

   const res = http.get(BASE_URL);

   check(res, {
       'status code 200': (r) => r.status === 200
   });

   sleep(1)
}