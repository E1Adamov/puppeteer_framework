import assert from "assert";

import { TIMEOUT_3 } from "../../shared/constants";
import { page } from "../page_object/pages/page_factory";
import { config } from "../puppeteer.config";

/**
 * The browser saves data in {@link config.userDataDir} which is persistant during and across sessions.
 * This function will try to go to the home page using cached auth.
 * If it fails (e.g. auth cookie expired) - then it will log in through UI,
 * and auth data will be updated in the local storage to be picked up later automatically
 */
export async function performCachedLogin(): Promise<void> {
    const forYouPage = page('forYou');
    await forYouPage.goToUrl();

    const signInPage = page('signIn');
    const isSignInOpen = await signInPage.isOpen(TIMEOUT_3);
    const isOpen = await forYouPage.isOpen(TIMEOUT_3);

    if (isSignInOpen) {
        await performUiLogin();
    }

    await forYouPage.context.goto('about:blank');

}

export async function performUiLogin(): Promise<void> {
    const signInPage = page('signIn');
    await signInPage.goToUrl();
    await signInPage.enterLogin(config.users.Ivan.login);
    await signInPage.clickNext();

    const enterPhoneOrEmailPage = page('enterPhoneOrEmail');

    if (await enterPhoneOrEmailPage.isOpen()) {
        // await enterPhoneOrEmailPage.enterEmail(config.users.Ivan.email); // '[data-testid="ocfEnterTextTextInput"]'
        // await enterPhoneOrEmailPage.clickNext(); // '[data-testid="ocfEnterTextNextButton"]'
    }

    const enterPasswordPage = page('enterPassword');
    await enterPasswordPage.enterPassword(config.users.Ivan.password);
    await enterPasswordPage.clickLogIn();

    const forYouPage = page('forYou');
    const isOpen = forYouPage.isOpen();
    
    assert.strictEqual(isOpen, true);
}