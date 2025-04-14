import swaggerJSDoc from 'swagger-jsdoc';
import pkg from '@packagejson';
import config from '@config/app';


const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: `${pkg.name.toLocaleUpperCase()} Docs`,
      version: 'v1.0.0',
      description: pkg.description,
    },
    servers: [
      {
        url: `http://localhost:${config.app.port}`,
        description: 'Server',
      },
      {
        url: `http://localhost:${config.app.port}/api`,
        description: 'Api Development server',
      },
    ],
  },
  //apis: ['./src/resources/**/*.ts'],
  apis: ['./docs/**/*.yml', './docs/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
