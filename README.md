You can try the app here, it is live [here](https://patwadeepak.github.io/mini-cart-app/).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm test -- --coverage --watchAll`

Launches the test runner similar to `npm test` but also generates `coverage report` in the interactive watch mode.<br />

### Coverage

| File                         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
| ---------------------------- | ------- | -------- | ------- | ------- | ----------------- |
| All files                    | 72.95   | 46.15    | 73.01   | 70.74   |
| src                          | 16.66   | 0        | 11.76   | 16.66   |
| App.js                       | 100     | 100      | 100     | 100     |
| index.js                     | 0       | 100      | 100     | 0       | 9-18              |
| serviceWorker.js             | 0       | 0        | 0       | 0       | 13-134            |
| testUtils.js                 | 100     | 100      | 100     | 100     |
| src/app                      | 88.88   | 100      | 50      | 88.88   |
| store.js                     | 88.88   | 100      | 50      | 88.88   | 28                |
| src/features/counter         | 100     | 66.66    | 100     | 100     |
| Counter.js                   | 100     | 66.66    | 100     | 100     | 11                |
| src/features/header          | 95.65   | 83.33    | 88.88   | 95.23   |
| Header.js                    | 95.65   | 83.33    | 88.88   | 95.23   | 58                |
| src/features/miniCart        | 100     | 92.85    | 100     | 100     |
| MiniCart.js                  | 100     | 100      | 100     | 100     |
| miniCartSlice.js             | 100     | 91.66    | 100     | 100     | 41                |
| src/features/miniCartItem    | 100     | 100      | 100     | 100     |
| MiniCartItem.js              | 100     | 100      | 100     | 100     |
| src/features/miniCartPopOver | 100     | 100      | 100     | 100     |
| MiniCartPopOver.js           | 100     | 100      | 100     | 100     |
| src/features/productList     | 95.83   | 100      | 100     | 95.45   |
| ProductList.js               | 100     | 100      | 100     | 100     |
| productListAPI.js            | 100     | 100      | 100     | 100     |
| productListSlice.js          | 90      | 100      | 100     | 90      | 13                |
| src/features/productRow      | 100     | 100      | 100     | 100     |
| ProductRow.js                | 100     | 100      | 100     | 100     |

Test Suites: 7 passed, 7 total <br>
Tests: 29 passed, 29 total <br>
Snapshots: 0 total <br>
Time: 2.963 s, estimated 4 s

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

To learn RTK, check out the [Redux Toolkit Documentation](https://redux-toolkit.js.org/).
