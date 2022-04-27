import "reflect-metadata"
require('dotenv').config()
import { appDataSource} from './dbConfig'
const createServer = require('./app')

const PORT = process.env.APP_PORT || 3009;

appDataSource.initialize().then(() => {
    const app = createServer();

    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
}).catch(error => {
    console.log(error);
});


