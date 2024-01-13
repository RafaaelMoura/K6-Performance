import http from 'k6/http';

export default function(){
    http.get('http//test.k6.io');
}

//Para dar um "rum" vá em novo terminal e coloque o código "cd modulo" e logo depois "k6 run aula2.js"