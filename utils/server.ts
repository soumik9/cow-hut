import { Application } from 'express';
import colors from 'colors';
import connection from './db';

const server = (app: Application, port: number): void => {
    try {
        app.listen(port, () => {
            console.log(colors.magenta(`Server running: http://localhost:${port}/api`));
            (async () => await connection())();
        });
    } catch (error) {
        console.error(error);
        process.exit();
    }
};

export default server;
