import { ElementHandle, Page } from 'puppeteer';

import { config } from '../../puppeteer.config';
import { BaseUiContainer } from '../base_ui.container';
import { BaseComponent } from '../components/base.component';

export abstract class BasePage extends BaseUiContainer {
    context: Page;
    abstract components: {[key: string]: BaseComponent}

    constructor(page: Page) {
        super();
        this.context = page;
    }

    async $x(xpath: string, options: { timeout: number } = { timeout: config.elementTimeout }): Promise<ElementHandle<Element>> {
        const handle = await this.context.evaluateHandle((xp) => {
            return document.evaluate(
                xp,
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            ).singleNodeValue;
        }, xpath);

        if (!handle) {
            throw new Error(`Element not found: ${xpath}`);
        }

        return handle.asElement() as ElementHandle<Element>;
    }

}
