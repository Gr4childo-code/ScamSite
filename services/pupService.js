import puppeteer from 'puppeteer-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
puppeteer.use(stealth());

export async function getPage(url) {
	try {
		const browser = await puppeteer.launch({
			headless: false,
			executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
			userDataDir: 'C:/Users/samoh/AppData/Local/Google/Chrome/User Data/',
		});
		const page = await browser.newPage();
		await page.goto(url);
		const content = await page.content();
		browser.close();
	} catch (error) {
		console.log(error);
	}
}
