/// Generation a report ou gerando um relatótio, gera um arquivo com relatório 
///para melhor dimensionar quem não faz o teste e não pode entende///
/// será usado a tarefa "Public API lesson one" como exemplo

import http from 'k6/http';
import {check} from 'k6';
/// Esse iport permite gerar um relatório html /////////////////////////////////////////////////////////

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
   vus:1, duration:'30s', 

   thresholds: { 
       checks: ['rate > 0.99']   
   }
}

export default function(){
   const BASE_URL = 'https://test-api.k6.io/public/crocodiles/';

   const res = http.get(BASE_URL);

   check(res, {
       'status code 200': (r) => r.status === 200
   });
}
///Para que se obtenha o rlatório de saída////////////////////////////////////////////////////////////

export function handleSummary(data) {
    return {
      "generating_report.html": htmlReport(data),
    };
  }
