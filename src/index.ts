import { AppDataSource } from "./data-source"
import { Flows } from './flows.entity'
import { Library } from "./library.entity";

let connection = null;

const init = async (settings) => { 
    try {
        connection = await AppDataSource(settings).initialize();   
        initialize();
    } catch (error) {
        console.log(error)
    }
}

const initialize = async () => {
    const flows = await connection.manager.find(Flows)
    if(flows.length === 0){
        const flowsEntity = new Flows();
        flowsEntity.flows = '[]';
        flowsEntity.settings = '{}'
        flowsEntity.credentials = '{}';
        const flowsRepository = connection.getRepository(Flows)
        await flowsRepository.save(flowsEntity)
    }
}
const getFlows =  async() => {
    const flows = await connection.manager.find(Flows)
    if(flows.length === 0) { 
        return []
    }
    return JSON.parse(flows[0].flows);
}

const saveFlows =async (flows) => {    
    const flowsRepository = connection.getRepository(Flows)
    const flowsToUpdate = await flowsRepository.findOneBy({ id: 1 });
    flowsToUpdate.flows = JSON.stringify(flows); 
    await flowsRepository.save(flowsToUpdate)
}

const getCredentials = async() => {
    const flows = await connection.manager.find(Flows)
    if(flows.length === 0) { 
        return {}
    }
    if(flows[0].credentials === null){
        return {}
    }
    return JSON.parse(flows[0].credentials);
}

const saveCredentials = async (credentials) => {    
    const flowsRepository = connection.getRepository(Flows)
    const flowsToUpdate = await flowsRepository.findOneBy({ id: 1 });
    flowsToUpdate.credentials = JSON.stringify(credentials);
    await flowsRepository.save(flowsToUpdate)
}

const getSettings = async () => {
    const flows = await connection.manager.find(Flows)
    if(flows.length === 0) { 
        return {}
    }
    if(flows[0].settings === null){
        return {}
    }
    return JSON.parse(flows[0].settings);
}

const saveSettings = async (settings) => { 
    const flowsRepository = connection.getRepository(Flows)
    const flowsToUpdate = await flowsRepository.findOneBy({ id: 1 });
    flowsToUpdate.settings = JSON.stringify(settings);
    await flowsRepository.save(flowsToUpdate);
}

const getLibraryEntry = async function(type,path) {
    //console.log('getLibraryEntry',type,path);
    if ((type !== "flows")&&(type !== "functions")) {
        return; //throw new err;
    }
    let toReturn = [];
    let foldersPushed = new Set();
    //onst sqlRes = (await this.pool.query(`SELECT * FROM ${this.schema}.noderedlibrary WHERE type=$1`,[type])).rows;
    const sqlRes = await connection.manager.find(Library)
    for (let row of sqlRes) {
        if (path == `${row.filepath}${row.filename}`) {
            return row.file;
        } else if (path == row.filepath) {
            toReturn.push({'fn': row.filename});
        } else if (row.filepath.startsWith(path)) {
            const folderName = row.filepath.replace(path,'').split('/')[0];
            if (!(foldersPushed.has(folderName))) {
                foldersPushed.add(folderName);
                toReturn.push(folderName);
            }
        } 
    }
    return toReturn;
}

const saveLibraryEntry = async (type,path,meta,body) => {
    //console.log('saveLibraryEntry',type,path,meta,body);
    if ((type !== "flows")&&(type !== "functions")) {
        return; //throw new err;
    }
    let splitPath = path.split('/');
    const filename = splitPath[splitPath.length-1];
    const filepath = path.replace(filename,'');
    //return await this.pool.query(`INSERT INTO ${this.schema}.noderedlibrary (type, filepath, filename, meta, file) VALUES ($1,$2,$3,$4,$5)`,[type,filepath,filename,meta,body]);
    const library = new Library();
    library.filename = filename;
    library.filepath = filepath;
    library.file     = body;
    library.meta     = meta;
    const flowsRepository = connection.getRepository(Library)
    await flowsRepository.save(library)
}


export { 
    init
    , getFlows
    , getCredentials
    , saveFlows
    , saveCredentials  
    , getSettings
    , saveSettings
    , getLibraryEntry
    , saveLibraryEntry
}