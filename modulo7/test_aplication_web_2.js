import { chromium } from 'k6/experimental/browser';
import { check } from 'k6';

export const options = {
    vus: 1,
    duration: '5s',
    thresholds: {
        checks: ["rate > 0.99"]
    }
};

export default  async function(){
    const browser = chromium.launch({headless: false});
    const context = browser.newContext();
    const page = context.newPage();

    try {
        await page.goto('https://test.k6.io', { waitUntil: 'networkidle' });

        await Promise.all([
            page.waitForNavigation(),
            page.locator('a[href="/my_messages.php"]').click(),
        ]);

        page.locator('input[name="login"]').type('admin');
        page.locator('input[name="password"]').type('123');

        await Promise.all([
            page.waitForNavigation(),
            page.locator('input[type="submit"]').click(),
        ]);

        check(page, {
            'header': page.locator('h2').textContent() == 'Welcome, admin!',
        });

    } finally {
        page.close();
        browser.close();
    }
};


////Para "RUN" de script web usa-se no terminal do "Gitbash" o código K6_BROWSER_ENABLED=true k6 run (Exemplo:K6_BROWSER_ENABLED=true k6 run test_aplication_web_2.js)
//// Para teste em perfomance usa-se o k6 na versão acima do 0.43