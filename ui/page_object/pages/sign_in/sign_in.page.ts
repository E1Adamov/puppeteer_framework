import { BasePageWithUrl } from "../base_with_url.page";

export class SignInPage extends BasePageWithUrl {
    url = 'https://x.com/i/flow/login';
    uniqueElementSelector = '[data-testid="google_sign_in_container"]';
    components = {};
    locators = {
        loginEntry: '[autocomplete="username"]',
        buttonNext: '//button[.//text()[normalize-space() = "Next"]]'
    };

    async enterLogin(login: string): Promise<void> {
        const input = await this.$(this.locators.loginEntry);
        await input.type(login);
    }

    async clickNext(): Promise<void> {
        const button = await this.$x(this.locators.buttonNext);
        await button.click();
    }

}