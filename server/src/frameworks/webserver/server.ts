import { Server } from "http";
import configKeys from "../../config";

const serverConfig = (server:Server) => {
    const startServer = () => {
        server.listen(configKeys.PORT, () => {
            console.log('\x1b[44m%s\x1b[0m',`Server listening on Port ${configKeys.PORT}`);
        })
    }
    return {
        startServer
    }
}

export default serverConfig
