// API Public: Exemplo 1
    /// Buscar todos os crocodilos
// Critérios:
    /// Smoke Test
        /// 1º - 30 s com 1VU 
    ///Limites 
        /// 2º - Requisição com sucesso > 99% 

        
/// Configuração /////////////////////////////////////////////////////////////////////////////////////////

import http from 'k6/http';
 import {check} from 'k6';

 export const options = {
    vus:1, duration:'30s', /// 1º - 30 s com 1VU

    thresholds: {   ///Limites 
        checks: ['rate > 0.99']    /// 2º Requisição com sucesso > 99%
    }
 }

 /// Exeução /////////////////////////////////////////////////////////////////////////////////////////
 export default function(){
    const BASE_URL = 'https://test-api.k6.io/public/crocodiles/';

    const res = http.get(BASE_URL);

    check(res, {
        'status code 200': (r) => r.status === 200
    });
 }