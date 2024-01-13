import http from 'k6/http';
import { check } from 'k6';
import { Counter} from 'k6/metrics';
//import { Gauge } from 'k6/metrics';
import { Rate } from 'k6/metrics';

export const options = {
    vus: 1,
    duration: '3s'
}

const chamadas = new Counter ('quantity');
//const myGauge = new Gauge('Tempo bloqueado');
const myRate = new Rate('Taxa req 200')

export default function(){
    const res = http.get('https://test.k6.io/');
    chamadas.add(1);
    //myGauge.sdd(req.timings.blocked);
    myRate.add(req.status === 200);
}
