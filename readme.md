# UI Testing Framework

A UI testing framework built with **TypeScript**, **Jest**, and **Puppeteer**.  
Includes page object model, reusable auth, ESLint setup, and extended Puppeteer features.

---

## 🔧 Required Environment Variables

Set the following environment variables before running tests:

- `X_LOGIN` — your login/username  
- `X_PASSWORD` — your password  
- `X_EMAIL` — email for verification, if applicable

These are used in login/auth flows or for user-related test data.

---

## 📁 Project Structure

```
/tests
/pages          # Page Object classes (one per major page)
/components     # Smaller UI components reused across pages
/utils          # Auth helpers, browser launch, wait utils
/config         # Jest + ESLint configs
```

---

## 💡 Features

### ✅ Page Object Pattern

- Clean, isolated classes for each screen/page
- Reusable components (e.g., buttons, inputs, modals)

### 🔍 XPath Support Restored

- Puppeteer removed `$x()` in recent versions
- This framework **restores XPath lookup** via `document.evaluate`
  
```ts
// Example usage
await page.$x('//button[text()="Submit"]');
```

### 🕒 Automatic Waits

- Waits for elements before interacting
- Prevents flakiness due to timing/race conditions

```ts
await page.waitForSelector('button[type="submit"]');
await page.click('button[type="submit"]');
```

---

## 🔐 Reusable Auth Helpers

- Log in once and reuse the session across tests
- Optionally store login state in a file
- Handles common login flows automatically

```ts
await loginHelper.loginWithEnv();
```

---

## 🧹 ESLint Configuration

- Written in `eslint.config.mjs` using `typescript-eslint`
- Enforces:
  - 4-space indentation
  - Semicolons
  - Correct import order

Example:
```ts
import fs from 'fs';
import { test, expect } from '@jest/globals';
import { LoginPage } from './pages/LoginPage';
```

---

## 📦 Scripts

```bash
npm install       # Install dependencies
npm test          # Run tests via Jest
npm run lint      # Run ESLint
```

---

## 🚀 Coming Soon

- Parallel browser execution
- Visual regression testing
- CI integration (GitHub Actions)

---
