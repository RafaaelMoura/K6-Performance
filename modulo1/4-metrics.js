//Metricas//

import http from 'k6/http';
import { check } from 'k6';
import { Counter} from 'k6/metrics'; //metrica contador
import { Gauge } from 'k6/metrics'; //metrica medidor
import { Rate } from 'k6/metrics'; //metrica taxa
import { Trend } from 'k6/metrics'; //metrica tendencia

export const options = {
    vus: 1,
    duration: '3s'
}

const chamadas = new Counter ('quantidade de ligações'); //metrica contador 
const myGauge = new Gauge('Tempo bloqueado'); //metrica medidor
const myRate = new Rate('Taxa req 200'); //metrica taxa
const mytrend = new Trend('Taxa de espera'); //metrica tendencia


export default function(){
    const req = http.get('https://test.k6.io/');
    chamadas.add(1); //metrica contador 
    myGauge.add(req.timings.blocked); //metrica medidor
    myRate.add(req.status === 200); //metrica taxa
    mytrend.add(req.timings.waiting); //metrica tendencia

}
