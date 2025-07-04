import puppeteer, { Browser, Page } from 'puppeteer';

import { getCliArg } from '../../shared/utils/cli';
import { config } from '../puppeteer.config';
import { performCachedLogin } from '../utils/ui_interactions';

export let _browser: Browser;
export let _page: Page;

let pageWidth: number;
let pageHeight: number;


beforeAll(async() => {
    const headlessArg = getCliArg('headless', config.default.headless);
    const headless = headlessArg == 'true';
    [pageWidth, pageHeight] = getCliArg(
        'window-size', 
        `${config.default.screenWidth},${config.default.screenHeight}`,
    ).split(',').map(n => Number(n));

    _browser = await puppeteer.launch({
        headless: headless,
        userDataDir: config.userDataDir, 
        args: [
            `--window-size=${pageWidth},${pageHeight}`,
            '--no-sandbox', 
            '--disable-setuid-sandbox',
        ],
    });
});

beforeEach(async () => {
    const pages = await _browser.pages();
    _page = pages[0];
    await _page.setViewport({ width: pageWidth, height: pageHeight });
    _page.setDefaultTimeout(config.elementTimeout);
    _page.setDefaultNavigationTimeout(config.navigationTimeout);
    await performCachedLogin();
});

afterEach(async () => {
    await _page.close();
});

afterAll(async () => {
    await _browser.close();
});
