import swaggerJSDoc from 'swagger-jsdoc';
import globalUrl from '@utils/global_http_url/global_http_url';
import { name, version, description, author, license } from '@packagejson';

const url = `${globalUrl()}`;

const openapi = '3.0.0';
const endpointsFiles = ['./src/routes/*.ts'];
const servers = [
    { url: `${url}`, description: 'API Commons' },
    { url: `${url}/api/v1`, description: 'API Routes v1' },
];
const basePath = '/v1';
const schemes = ['http', 'https'];
const consumes = ['application/json'];
const produces = ['application/json'];

const swaggerDefinition = {
    openapi,
    info: {
        title: name,
        version,
        description,
        license: { name: license, url: author.url },
        contact: { name: author.name, email: author.email },
    },
    servers,
    host: url,
    basePath,
    schemes,
    consumes,
    produces,
};

const JSDocOptions: swaggerJSDoc.Options = {
    definition: swaggerDefinition,
    apis: endpointsFiles,
};

const specs = swaggerJSDoc(JSDocOptions);

export default specs;
