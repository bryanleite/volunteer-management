# Angular Admin for AntDesign 

This project is an admin template based on [AntDesign](https://ant.design/docs/spec/introduce) and [NG-ZORRO](https://ng.ant.design/docs/introduce/en) that provides some modules to help starting projects.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Version

The version file will be generated in `src/environments/versions.ts` and will be displayed in the layout footer following the structures: 

*DEV:* 
```typescript
//1.0.0-3328695-develop-201809121832
`${PACKAGE_JSON_VERSION}-${GIT_REVISION}-${GIT_BRANCH}-${CURRENT_TIMESTAMP}`
```   
*PROD:* 
```typescript
//1.0.0-201809121832
 `${PACKAGE_JSON_VERSION}-${CURRENT_TIMESTAMP}`
 ```

Run `npm run app-version` to generate the version file and `npm run start` or `npm run build` to start/build project and the app will automatically generate build version file.

## API 

This project is consuming data from the JSON file in src/assets/mock/db.json. Download [json-server](https://github.com/typicode/json-server) to run the API: 

`npm install -g json-server`
`json-server --watch db.json`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
