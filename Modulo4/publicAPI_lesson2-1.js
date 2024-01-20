                                ///Primeira Parte///

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

export const options = {        ///Teste de Performance/carga
   stages: [        
    {duration:'10s', target: 10},       /// 1º - Ramp up (acréscimo de úsuario) 10s com 10VU
    {duration:'10s', target: 10},       /// 2º - Carga (constante) 10s com 10VU
    {duration:'10s', target: 0}         /// 3º - Ramp down (decréscimo de úsuario) 10s com 0VU
   ],
   thresholds: {
       checks: ['rate > 0.95'],              ///Requisição com sucesso > 95%
       http_req_duration: ['p(95) < 200']        ///Tempo requisição p(90) < 200 milisegundos
   }
}
 
/// Execução /////////////////////////////////////////////////////////////////////////////////////////

export default function(){
   const BASE_URL = 'https://test-api.k6.io/public/crocodiles/1';   ///OBS - Priemra parte e referente a apenas ID por unidades

   const res = http.get(BASE_URL);

   check(res, {
       'status code 200': (r) => r.status === 200
   });

   sleep(1)
}


///Registro com ID's esão salvos em "dados.jso"