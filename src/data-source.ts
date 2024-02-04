import "reflect-metadata"
import { DataSource } from "typeorm"
import { Flows } from "./flows.entity"
import { Library } from "./library.entity"

const entities = [Flows, Library];
const types = ['sqlite', 'hana', 'postgres'];

export const AppDataSource = (settings) =>{
    settings = settings.dataSource;
    validate(settings);
    switch (settings.type) {
        case 'sqlite':
            return dataSourceSqlite(settings.name);
            break;
        case 'postgres':
        validateDataSourcePG(settings)
        return dataSourcePG(settings);
        default:
            break;
    }
}

const dataSourceSqlite = (name: string) => new DataSource({
    type: "sqlite",
    database: name,
    synchronize: true,
    logging: false,
    entities,
    migrations: [],
    subscribers: [],
})

const dataSourcePG = (settings) => new DataSource({
    type: "postgres",
    host: settings.host,
    port: settings.port || 5432,
    username: settings.username,
    password: settings.password,
    database: settings.name,
    schema: settings.schema || 'public',
    synchronize:settings.synchronize || true,
    ssl: settings.ssl || false,    
    entities,
})

const validateDataSourcePG = (settings) => {
    const { host, username, password, name } = settings;
    if (!host) {
        throw new Error("The [host] field is required and cannot be empty.");
    }
    if (!username) {
        throw new Error("The [username] field is required and cannot be empty.");
    }
    if (!password) {
        throw new Error("The [password] field is required and cannot be empty.");
    }
    if (!name) {
        throw new Error("The [name] field is required and cannot be empty.");
    }

}

const validate = (settings) =>{
    if( !settings.type){
        throw new Error('[type] is required')
    }
    
    for (let index = 0; index < types.length; index++) {
        const element = types[index];
        if(!element){
            throw new Error(`type is out range ${JSON.stringify(types)}`);
        }
    }

    if (!settings.name){
        throw new Error('[name] is required')
    }
}