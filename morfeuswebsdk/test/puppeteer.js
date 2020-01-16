const puppeteer = require('puppeteer');
const assert = require('chai').assert;
const demoURL = process.env.npm_config_url || "https://demo.active.ai/morfeuswebsdk/";
const morfeuswebsdkURL = "https://morfeus-dev.active.ai/morfeuswebsdk2/";
let browser;
let page;


before(async () => {
    browser = await puppeteer.launch({
        headless: true
    })
    page = await browser.newPage()
})

describe('Web-SDK testing', async () => {

    it('Init params:Web-SDK Should Load', async () => {
        const response = await page.goto(demoURL);
        assert.strictEqual(response.status(), 200);
    });

    it('Start over chat:Web-SDK Should Respond', async () => {
        await page.goto(demoURL, {
            waitUntil: 'domcontentloaded'
        });
        await page.waitFor(2000);
        const frame = await page.frames().find(f => f.name() == 'chatBoxFrame');
        const button = await frame.$('#deny-permission');
        button.click();
        await frame.click('#query');
        await frame.type('#query', 'hey');
        await page.waitFor(2000);
        await frame.click('#send');
        await page.waitFor(2000);
        const element = await frame.$("#botMessage");
        const text = await frame.evaluate(element => element.textContent, element);
        assert.equal(text.includes('Hi'), true);
    });

    it('Check for cookies:Web-SDK has cookies', async () => {
        await page.goto(demoURL, {
            waitUntil: 'domcontentloaded'
        });
        await page.waitFor(2000);
        const cookie = await page.cookies();
        assert.equal(cookie.length > 0, true);
    });
    it('Check bot dimension', async () => {
        await page.goto(demoURL, {
            waitUntil: 'domcontentloaded'
        });
        await page.waitFor(2000);
        const frame = await page.frames().find(f => f.name() == 'chatBoxFrame');
        const button = await frame.$('#deny-permission');
        button.click();
        const bot = await frame.evaluate(() => {
            const btn = document.querySelector('#chatBoxContainer');
            return (JSON.parse(JSON.stringify(getComputedStyle(btn))));
        });
        assert.equal(bot.width > '300px' && bot.height > '500px', true);
    });

    it('Destroy on close', async () => {
        await page.goto(morfeuswebsdkURL, {
            waitUntil: 'domcontentloaded'
        });
        await page.waitFor(2000);
        const frame = await page.frames().find(f => f.name() == 'chatBoxFrame');
        await frame.waitForSelector('#chatBoxLogout');
        await frame.click('#chatBoxLogout');
    });

    it('Hide chat box', async () => {
        await page.goto(morfeuswebsdkURL, {
            waitUntil: 'domcontentloaded'
        });
        await page.waitFor(2000);
        const frame = await page.frames().find(f => f.name() == 'chatBoxFrame');
        await frame.waitForSelector('#chatbox-header > section > h3 > span.pull-right.openicon > span.minimize > img');
        await frame.click('#chatbox-header > section > h3 > span.pull-right.openicon > span.minimize > img');
    });

    it('Log-in and Log-out: User should be able to login and logout', async () => {
        await page.goto(demoURL, {
            waitUntil: 'domcontentloaded'
        });
        await page.waitFor(5000);
        const frame = await page.frames().find(f => f.name() == 'chatBoxFrame');
        await frame.waitForSelector('#query');
        await frame.click('#query');
        await frame.type('#query', 'login');
        await page.waitFor(2000)
        await frame.click('#send');
        await page.waitFor(2000);
        await frame.evaluate(() => {
            document.querySelector('button[type=button]').click();
        });
        await page.waitFor(2000);
        const webFrame = await page.frames().find(f => f.name() == 'webviewFrame');
        await webFrame.waitForSelector('#loginid');
        await webFrame.click('#loginid');
        await webFrame.type('#loginid', 'testuser1');
        await page.waitFor(2000);
        await webFrame.waitForSelector('#password');
        await webFrame.click('#password');
        await webFrame.type('#password', 'password');
        await page.waitFor(2000);
        await webFrame.click('#logintabsubmit');
        await page.waitFor(3000);
        const element = await frame.$("#botMessage");
        const text = await frame.evaluate(element => element.textContent, element);
        await frame.waitForSelector('#query');
        await frame.click('#query');
        await frame.type('#query', 'logout');
        await page.waitFor(2000);
        await frame.click('#send');
        await page.waitFor(2000);
        const logOutElement = await frame.$("#botMessage > div > div > div.custom-panel-radius.panel-body.list-temp-heading > h4");
        const logOutText = await frame.evaluate(logOutElement => logOutElement.textContent, logOutElement);
        assert.equal(text.includes('Welcome to Active Bank!')&& logOutText.includes('Thanks for using Active Ai') , true);
    });

    it('Logout chat', async () => {
        await page.goto(demoURL, {
            waitUntil: 'domcontentloaded'
        });
        await page.waitFor(2000);
        const frame = await page.frames().find(f => f.name() == 'chatBoxFrame');
        const button = await frame.$('#deny-permission');
        button.click();
        await frame.click('#query');
        await frame.type('#query', 'logout');
        await page.waitFor(2000);
        await frame.click('#send');
        await page.waitFor(2000);
        const element = await frame.$("#botMessage");
        const text = await frame.evaluate(element => element.textContent, element);
        await frame.waitFor(2000);
        assert.equal(text.includes('You have no active session to logout!'), true);
    });

    it('Emoji', async () =>{
        await page.goto(demoURL, {
            waitUntil: 'domcontentloaded'
        });
        await page.waitFor(2000);
        const frame = await page.frames().find(f => f.name() == 'chatBoxFrame');
        const button = await frame.$('#deny-permission');
        button.click();
        await frame.click('#query');
        await frame.type('#query', 'ðŸ˜‚');
        await page.waitFor(2000);
        await frame.click('#send');
        await page.waitFor(2000);
        const element = await frame.$("#botMessage");
        const text = await frame.evaluate(element => element.textContent, element);
        assert.equal(text.includes('Hey, I am having a trouble'), true);
    });

    it('Minimize state', async () =>{
        await page.goto(morfeuswebsdkURL, {
            waitUntil: 'domcontentloaded'
        });
        await page.waitFor(2000);
        const frame = await page.frames().find(f => f.name() == 'chatBoxFrame');
        await frame.waitForSelector('#chatbox-header > section > h3 > span.pull-right.openicon > span.minimize > img');
        await frame.click('#chatbox-header > section > h3 > span.pull-right.openicon > span.minimize > img');
        await page.waitFor(2000);
        const chatButton=await page.frames().find(f => f.name() == 'chatButtonFrame');
        await chatButton.type('input[type=text]', 'Hey');
        await page.waitFor(2000);
        await chatButton.evaluate(() => {
            document.querySelector('button[type=button]').click();
        });
        assert.equal(true, true);
    });

    it('Slim scroll', async () =>{
        await page.goto(morfeuswebsdkURL, {
            waitUntil: 'domcontentloaded'
        });
        await page.waitFor(2000);
        const frame = await page.frames().find(f => f.name() == 'chatBoxFrame');
        await frame.waitForSelector('#query');
        await frame.click('#query');
        await frame.type('#query', 'Testing slim scroll by typing a message ');
        await page.waitFor(2000);
        await frame.click('#send');
        await page.waitFor(2000);
        await frame.waitForSelector('#query');
        await frame.click('#query');
        await frame.type('#query', 'Testing slim scroll by typing second message ');
        await page.waitFor(2000);
        await frame.click('#send');
        await page.waitFor(2000);
        await frame.evaluate(_ => {
            // document.querySelector('#messages').scrollBy(50, window.innerHeight);
            document.querySelector('#messages').scrollBy(-100, document.body.scrollHeight);
          });
        await page.waitFor(6000);
    });

    it('Popular query', async () =>{
        await page.goto(morfeuswebsdkURL, {
            waitUntil: 'domcontentloaded'
        });
        await page.waitFor(2000);
        const frame = await page.frames().find(f => f.name() == 'chatBoxFrame');
        await frame.waitForSelector('#chatBoxContainer > div.messageAndFooter > footer > div.display-flex.footerInput > div.footer-menu > button');
        await frame.click('#chatBoxContainer > div.messageAndFooter > footer > div.display-flex.footerInput > div.footer-menu > button');
        await frame.waitForSelector('#popularquery > div:nth-child(1) > div.main-menu > div > p.chat-menu__item-main-title');
        await frame.click('#popularquery > div:nth-child(1) > div.main-menu > div > p.chat-menu__item-main-title');
        // await frame.waitForSelector('#popularquery > div:nth-child(1) > div.submenu-list > div:nth-child(3) > div > span > img');
        // await frame.click('#popularquery > div:nth-child(1) > div.submenu-list > div:nth-child(3) > div > span > img');
        // await page.waitFor(10000);
    });
    it('should render image', async () => {
        const imageWidth = 288;
        const imageHeight = 144;
        await page.goto(demoURL, {
            waitUntil: 'domcontentloaded'
        });
        await page.waitFor(2000);
        const frame = await page.frames().find(f => f.name() == 'chatBoxFrame');
        await frame.evaluate(() => {
            const responseData = {
                "inDeveloperMode": true,
                "conversation": {
                    "from": "1288w90024163868",
                    "to": "478452239112100",
                    "requestId": "mid.dpsus41c"
                },
                "messages": [{
                    "id": "mid.1544685443900121263798658421",
                    "message": {
                        "type": "image",
                        "text": "",
                        "speechData": "",
                        "url": "https://s3.ap-south-1.amazonaws.com/activeai/activewelcome.png",
                        "payload": {}
                    },
                    "response": null
                }],
                "debugData": {
                    "aiModel": {
                        "intent": {
                            "name": "faq",
                            "feature": null,
                            "confidence": 100,
                            "classifierName": "ruleEngine",
                            "adversarialScore": null,
                            "starter": true,
                            "userSelection": false
                        },
                        "state": "FULFILLMENT",
                        "cacheTriniti": true,
                        "ignoreSignatureCheck": false,
                        "continueLastTransaction": true,
                        "tokenCount": 0,
                        "compoundQuery": false
                    },
                    "defaultLangCode": null,
                    "externalCalls": [{
                        "requestDate": 1544685441390,
                        "responseTime": 2493,
                        "serviceName": "SPOTTER",
                        "request": "URI: http://vr9lm2mn9j.triniti.ai/v/1/spotter/process?domain=TrinitiTrainer&version=1 Method: POST Headers: Content-Type:application/json; charset=UTF-8, APIKey:1, UserID:478452239112100, MessageId:mid.dpsus41c, X-API-KEY:vr9lm2mn9j Body: { \"input\" : \"What should I do if my vehicle is involved in an accident in the tunnel/on the expressway?\", \"intent\" : \"faq\", \"contextedEntities\" :\n\n{\"product-type\":\"\"}\n, \"previousInput\" : \"\"}",
                        "response": "{\"Status\":200,\"Body\":\"{\\\"paraphrases\\\": \\\"What should I do if my vehicle is involved in an accident in the tunnel/on the expressway?\\\", \\\"what should i do if my vehicle is involved in an expressway ?\\\", \\\"top_candidates\\\": [\n\n{\\\"question\\\": \\\"what should i do if my vehicle is involved in an accident in the tunnel on the expressway\\\", \\\"probability\\\": 0.9700000941753387, \\\"faq_id\\\": \\\"dc6622ce-9e3f-46ad-96f1-a9ce4faf4ddb\\\", \\\"actual_product_tag\\\": [\\\"generic\\\"]}\n,\n\n{\\\"question\\\": \\\"what should i do if my vehicle has broken down in the tunnel on the expressway\\\", \\\"probability\\\": 0.8388854116201401, \\\"faq_id\\\": \\\"faq_12\\\", \\\"actual_product_tag\\\": [\\\"generic\\\"]}\n,\n\n{\\\"question\\\": \\\"what should i do if my vehicle is on fire or emitting smoke in the tunnel on the expressway\\\", \\\"probability\\\": 0.6284090250730514, \\\"faq_id\\\": \\\"faq_14\\\", \\\"actual_product_tag\\\": [\\\"generic\\\"]}\n], \\\"composite_score\\\": 0.9700000941753387, \\\"product_extracted\\\": \\\"generic\\\", \\\"message\\\": \\\"[{\\\\\\\"language\\\\\\\":\\\\\\\"en\\\\\\\",\\\\\\\"channel\\\\\\\":\\\\\\\"default\\\\\\\",\\\\\\\"messages\\\\\\\":[{\\\\\\\"type\\\\\\\":\\\\\\\"image\\\\\\\",\\\\\\\"content\\\\\\\":\n\n{\\\\\\\"image\\\\\\\":\\\\\\\"https://s3.ap-south-1.amazonaws.com/activeai/activewelcome.png\\\\\\\"}\n,\\\\\\\"quick_replies\\\\\\\":[]}]}]\\\", \\\"api_version\\\": \\\"Spotter-V1.0-17-08-2018\\\"}\"}"
                    }]
                },
                "initData": {},
                "quick_replies": [],
                "inputProperties": {
                    "keyboardState": "none"
                }
            }
          document.querySelector('#chatBoxContainer');
          processResponse(responseData);
        });
        await page.waitFor(2000);
        const image = await frame.evaluate(() =>{
            const result = document.querySelector('.img-container img');
            return {
                width:result.width,
                height:result.height
            }
        })
        assert.equal(image.width,imageWidth);
        assert.equal(image.height,imageHeight);
    })
});

after(async () => {
    await browser.close()
});
