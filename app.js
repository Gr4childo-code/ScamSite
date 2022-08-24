import puppeteer from 'puppeteer-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
import array from './array.js';
puppeteer.use(stealth());

const SITE = 'https://new.abb.com/search/results#query=';

let obj;
let arr = [];
async function script() {
	try {
		for (let index = 0; index < array.length; ++index) {
			obj = {};
			const browser = await puppeteer.launch({
				headless: false,
				executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
				userDataDir: 'C:/Users/samoh/AppData/Local/Google/Chrome/User Data/',
				args: [
					'--no-sandbox',
					'--disable-setuid-sandbox',
					'--disable-dev-shm-usage',
					'--disable-accelerated-2d-canvas',
					'--disable-gpu',
					'--window-size=1920x1080',
				],
			});
			const url = `${SITE}${array[index]}`;
			const page = await browser.newPage();
			await page.goto(url);
			console.log(array[index]);
			await page.click(
				'#PublicWrapper > main > section:nth-child(2) > div > div > div > ul.OneABBSearchList > li:nth-child(3) > a'
			);

			await page.waitForSelector('.display-name-repeat');
			const title = await page.$eval('.display-name-repeat', (el) => el.innerText);
			obj['id'] = array[index];
			obj['title'] = title;
			arr.push(obj);
			await browser.close();
		}
	} catch (error) {
		console.log(error);
	}
	console.log(arr);
}
script();
