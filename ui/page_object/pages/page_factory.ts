import { EnterPasswordPage } from "./enter_password/enter_password.page";
import { EnterPhoneOrEmailPage } from "./enter_phone_email/enter_phone_email.page";
import { ForYouPage } from "./for_you/for_you.page";
import { SignInPage } from "./sign_in/sign_in.page";
import { _page } from "../../tests/setup";


export const Pages = {
    signIn: SignInPage,
    enterPassword: EnterPasswordPage,
    forYou: ForYouPage,
    enterPhoneOrEmail: EnterPhoneOrEmailPage,
};

type PageConstructors = typeof Pages;

type PageType = {
  [K in keyof PageConstructors]: InstanceType<PageConstructors[K]>;
};

export function page<K extends keyof PageConstructors>(name: K): PageType[K] {
    const PageClass = Pages[name];
    return new PageClass(_page) as PageType[K];
}
