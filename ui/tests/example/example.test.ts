import assert from "assert";

import { page } from "../../page_object/pages/page_factory";

describe('x.com', () => {
    it('should be able to log in', async () => {
        const forYouPage = page('forYou');
        await forYouPage.goToUrl();
        const isOpen = forYouPage.isOpen();
        assert.strictEqual(isOpen, true, "Page not open");
        console.log();
    });
});
