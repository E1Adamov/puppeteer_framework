export type CssLocator = string;
export type XPathLocator = string;

export interface Locators {
    [key: string]: CssLocator | XPathLocator | ((...args: unknown[]) => CssLocator | XPathLocator)
}
