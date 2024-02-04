import { AppDataSource } from "./data-source"

const init = async (settings, runtime) => {
    AppDataSource(settings).initialize().then(async () => {
        console.log()
        console.log()
        console.log("INICIOU TYPEORM")
        console.log()
        console.log()
    
    }).catch(error => console.log(error))
    
}
export { init }