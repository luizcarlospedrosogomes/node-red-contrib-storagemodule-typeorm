import { AppDataSource } from "./data-source"
import { Flows } from './flows.entity'

let connection = null;

const init = async (settings, runtime) => { 
    try {
        connection = await AppDataSource(settings).initialize();   
        console.log()
        console.log("INICIOU TYPEORM")
        console.log()
    } catch (error) {
        console.log(error)
    }
}

const getFlows =  async() => {
    const flows = await connection.manager.find(Flows)
    return flows;
}
export { init, getFlows }