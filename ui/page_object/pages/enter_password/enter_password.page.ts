import { BasePage } from "../base.page";

export class EnterPasswordPage extends BasePage {
    uniqueElementSelector = 'input[name=password]';
    components = {};
    locators = {
        passwordEntry: 'input[name=password]',
        buttonLogIn: '[data-testid="LoginForm_Login_Button"]'
    };

    async enterPassword(password: string): Promise<void> {
        const input = await this.$(this.locators.passwordEntry);
        await input.type(password);
    }

    async clickLogIn(): Promise<void> {
        const button = await this.$x(this.locators.buttonLogIn);
        await button.click();
    }

}