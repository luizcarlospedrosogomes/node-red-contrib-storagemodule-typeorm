# node-red-contrib-storagemodule-typeorm
A module to provide Node-RED persistence using typeorm.


### How to use:
Add to your settings.js (normally found in '/home/yourHomeDirectory/.node-red/'):
``` js    
    storageModule: require("node-red-contrib-storagemodule-typeorm"),
    dataSource: { type: 'hana', ...hanaOptions },//hana-cloud schema
    dataSource:{ 
        type:'postgres'
        , name: process.env.POSTGRES_DB
        , username: process.env.POSTGRES_USER
        , password: process.env.POSTGRES_PASS 
        , host: process.env.POSTGRES_HOST
        , ssl: { rejectUnauthorized: false}
    },//postgres
    dataSource: { type: 'sqlite', name: 'node-red.db'},//sqlie
    autoInstallModules: true,

    userDir: '/home/yourHomeDirectory/.node-red/', //required to install nodes via the palette manager
```
In the same directory ('/home/yourHomeDirectory/.node-red/'), run:
```sh
npm install node-red-contrib-storagemodule-postgres
```

### How it works:
This module creates 2 new tables in your postgres database:
- flows
- library

### Currently not implemented:
- sessions
- projects
- Doesn't log nicely, doesn't throw errors (just prints them)
