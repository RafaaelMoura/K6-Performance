///Modulo utilizado 
import {chromium} from 'k6/experimental/browser';

///Configuração////////////////////////////////////////////////////////////////

export const options = {
    vus: 1,
    duration: '5s'

};

///Execução////////////////////////////////////////////////////////////////////

export default async function(){
    const browser = chromium.launch ({ headless: true });
    const context = browser.newContext();
    const page = context.newPage();

    try {
        await page.goto('https://test.k6.io/my_messages.php', {waitUntil:'networkidle'})

        page.locator('input[name="login"]').type('admin');
        page.locator('input[name="password"]').type('123');

        page.screenshot({path: 'screenshot.png'})

    } finally {
        page.close();
        browser.close();
    }


};
//// para "RUN" de script web usa-se no terminal o código K6_BROWSER_ENABLED=true k6 run (Exemplo:K6_BROWSER_ENABLED=true k6 run test_aplication_web_1.js)
