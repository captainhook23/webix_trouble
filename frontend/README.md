Webix Jet Demo App
===================

### How to run

- run ```npm i``` or ```npm ci```
- run ```npm start```
- open ```http://localhost:6067```

For more details, check https://www.gitbook.com/book/webix/webix-jet/details

### Other commands

#### Run lint

```
npm run lint
```

#### Run Package-Updates

```
npm run update
```

#### Run format-check

```
npm run format-check
```

#### Run format-write

```
npm run format-write
```

#### Build production files

```
npm run build
```

After that you can copy the "codebase" folder to the production server

### Difference from WebPack version

- .env file added, it stores global constants
- app.js contains section that imports all files from "views" folder and assigns custom view resolver to the app class
- optional, app.js contains custom locale loader

### License

MIT