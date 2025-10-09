# Playwright Learning Project

This project serves as a personal exercise for developing skills in automated testing using [Playwright](https://playwright.dev/).  
The goal is to learn how to write effective, clear, and maintainable tests according to best practices while also learning how to work with GitHub—including version control, creating branches, and working with pull requests.

---
## Install dependencies
npm install

---
## Run tests

#### Run all tests in headless mode
npx playwright test

#### Run tests with UI (for better overview)
npx playwright test --ui

#### Run a specific test file
npx playwright test tests/example.spec.js

## View test results
npx playwright show-report


---
## Project Structure

<pre> 
pages/ 
 ├── loginPage.ts
 ├── inventoryPage.ts
 ├── CartPage.ts
 ├── CheckoutPage.ts

tests/
 ├── basicUserJourney.test.ts
 ├── numberOfItemsInCart.test.ts
 ├── login.test.ts
 ├── priceCheck.test.ts
 ├── sortingHilo.test.ts
 ├── sortingLohi.test.ts
 ├── verifyPricesPom.test.ts

data/
 ├── checkout.ts
 ├── loginUser.ts
playwright.config.ts
package.json

</pre>
--- 

## Covered scenarios 

### Login tests: 
- Successful login using valid credentials
- Handling of incorrect login credentials
- Display of correct error messages

### Basic User Journey:
- User Login
- Add item(s) in Cart
- Verification of the number of items in the cart
- Display of the order summary

### Validation of the basket contents
- Correct display of added products
- Comparison of prices and quantities

---

## What I learned in the project

- Working with Page Object Model and its advantages
- Using Playwright Test Runner and playwright.config.ts
- Structuring tests for better readability and reusability
- Basics of working with Git and GitHub (committing, creating new branches, PR, writing Read me and using Markdow :D)


