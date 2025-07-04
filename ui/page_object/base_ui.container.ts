import { ElementHandle, Page } from "puppeteer";

import { CssLocator, Locators, XPathLocator } from "./locators";
import { config } from "../puppeteer.config";
import { detectSelectorType } from "../utils/selectors";

export abstract class BaseUiContainer {
    abstract locators: Locators
    abstract uniqueElementSelector: CssLocator
    abstract context: Page | ElementHandle
    abstract $x(xpath: XPathLocator, options?: { timeout: number }): Promise<ElementHandle<Element>>

    async isOpen(timeout: number = config.elementTimeout): Promise<boolean> {
        const selectorType = detectSelectorType(this.uniqueElementSelector);

        try {
            let result: ElementHandle | null;
            if (selectorType === 'css') {
                result = await this.context.waitForSelector(this.uniqueElementSelector, { timeout: timeout });
            } else {
                result = await this.$x(this.uniqueElementSelector, { timeout: timeout });
            }

            return result !== null;

        } catch {
            return false;
        }
    }

    async screenshot() {
        const screenshot = await this.context.screenshot();
        console.log(screenshot);
    }

    async $(selector: CssLocator | XPathLocator, options: { timeout: number } = { timeout: config.elementTimeout }): Promise<ElementHandle> {
        const element = await this.context.waitForSelector(selector, options);
        if (!element) throw new Error(`Element not found: ${selector}`);
        return element;
    }

    async $$(selector: CssLocator | XPathLocator, options: { timeout: number } = { timeout: config.elementTimeout }): Promise<ElementHandle[]> {
        try {
            await this.context.waitForSelector(selector, options);
        } catch {
            return [];
        }

        return this.context.$$(selector);
    }

}