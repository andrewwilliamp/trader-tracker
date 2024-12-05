# TraderTracker

TraderTracker is a basic Angular web application that utilizes Yahoo Financials stock data. The application allows users to quickly view stock information such as Low, High, Open, and Closing prices. It also provides various time metrics to filter on, a search tool for stocks, a chart, and a table for easy consumption of the stock information. 



This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.

## Setup 

Create a RapidAPI account by following the setps in this link: https://docs.rapidapi.com/v1.0/docs/account-creation-and-settings#:~:text=How%20to%20create%20a%20RapidAPI,%2C%20Facebook%2C%20or%20Google%20account.

Login and navigate to the Yahu Financials API: https://rapidapi.com/apidojo/api/yahoo-finance1

Subscribe to the stock/v3/get-chart API and generate your own API key: https://rapidapi.com/apidojo/api/yahoo-finance1/playground/apiendpoint_55ded4a7-600c-4133-8d63-552b777ee28d

In the root level of the project, create an environment.ts file.
In the environment.ts file, paste the following code:

`export const environment = {
  production: false,
  apiKey: 'YOUR_API_KEY'
};`

Build and run the project locally! Test out the search tool for various stocks or select them from the paginated list :)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
