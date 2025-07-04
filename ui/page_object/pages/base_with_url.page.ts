import { BasePage } from "./base.page";

export abstract class BasePageWithUrl extends BasePage {
    abstract url: string;

    async goToUrl() {
        await this.context.goto(this.url);
    }
}
