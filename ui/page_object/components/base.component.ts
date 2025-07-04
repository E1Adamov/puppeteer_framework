import assert from "assert";

import { ElementHandle, Page } from "puppeteer";

import { config } from "../../puppeteer.config";
import { BaseUiContainer } from "../base_ui.container";
import { CssLocator, XPathLocator } from "../locators";
import { BasePage } from "../pages/base.page";

export abstract class BaseComponent extends BaseUiContainer {
    owner: BasePage;
    abstract containerSelector: CssLocator | XPathLocator
    
    constructor (owner: BasePage) {
        super();
        this.owner = owner;
    }

    get uniqueElementSelector() {
        return this.containerSelector;
    }

    get context(): ElementHandle {
        const scope_ = this.owner.context.waitForSelector(this.uniqueElementSelector);
        assert.notEqual(scope_, null, `Element ${this.uniqueElementSelector} disappeared from DOM`);
        return scope_ as unknown as ElementHandle;
    }

    async $x(
        xpath: string,
        options: { timeout?: number } = { timeout: config.elementTimeout }
    ): Promise<ElementHandle<Element>> {
        const timeout = options.timeout ?? config.elementTimeout;
    
        try {
        // Get the parent page from the owner context
            const page = this.owner.context as Page;
        
            // First wait for the element to exist within the timeout
            await page.waitForFunction(
                (element: Element, xp: string) => {
                    return document.evaluate(
                        xp,
                        element,
                        null,
                        XPathResult.FIRST_ORDERED_NODE_TYPE,
                        null
                    ).singleNodeValue !== null;
                },
                { timeout },
                this.context, // Pass the ElementHandle as argument
                xpath
            );

            // Then evaluate to get the actual element handle
            const handle = await this.context.evaluateHandle(
                (element: Element, xp: string) => {
                    return document.evaluate(
                        xp,
                        element,
                        null,
                        XPathResult.FIRST_ORDERED_NODE_TYPE,
                        null
                    ).singleNodeValue;
                },
                xpath
            );

            if (!handle) {
                throw new Error(`Element not found: ${xpath}`);
            }

            return handle.asElement() as ElementHandle<Element>;
        } catch (error) {
            if (error.name === 'TimeoutError') {
                throw new Error(`Timeout of ${timeout}ms exceeded while finding element with XPath: ${xpath}`);
            }
            throw error;
        }
    }
}
