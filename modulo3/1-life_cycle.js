//inicialização
import sleep from 'k6';

//configuação
export const options ={
    vus:1,
    duratio:'10s'
}
//execução ou código vu
export default function (){
    console.log("testando o k6");
    sleep(1);
}
//desmontagem
export function teardown(data){

}