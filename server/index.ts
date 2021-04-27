import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';
import * as https from 'https';
import * as projects from './data/projects.json';

const BASE_URL = 'https://planner5d.com/api';

const app = express();

app.use(cors());

const PORT = 3000;

app.get('/projects', function (request, response) {
    response.header('Content-Type', 'application/json');
    response.json(projects);
});

app.get('/project/:id', function (request, response) {
    https.get(path.join(BASE_URL, `project/${request.params.id}`), (proxyResponse: any) => {
        let data = '';
        proxyResponse.setEncoding('utf8');
        proxyResponse.on('data', (chunk: string) => {
            data += chunk;
        });
        proxyResponse.on('end', () => {
            response.send(data);
        });
    });
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
