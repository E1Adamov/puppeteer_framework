import { BasePageWithUrl } from "../base_with_url.page";

export class ForYouPage extends BasePageWithUrl {
    url = 'https://x.com/home';
    uniqueElementSelector = 'a[href="/explore/tabs/for_you"][aria-selected="true"]';
    components = {};
    locators = {
    };
}