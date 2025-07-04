import * as constants from "../shared/constants";
import { requiredEnv } from "../shared/utils/env";

export const config = {
    default: {
        headless: 'true',
        screenWidth: 1980,
        screenHeight: 1080,
    },
    elementTimeout: constants.TIMEOUT_10,
    navigationTimeout: constants.TIMEOUT_20,
    users: {
        Ivan: {
            email: requiredEnv('X_EMAIL'),
            login: requiredEnv('X_LOGIN'),
            password: requiredEnv('X_PASSWORD'),
        },
    },
    userDataDir: './temp/browser_data'

} as const;