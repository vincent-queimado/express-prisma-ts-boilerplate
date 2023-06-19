import postmanToOpenApi from 'postman-to-openapi';
import yaml from 'yamljs';
import path from 'path';

import apiUri from '@utils/global_api_path/global_api_path';
import logger from '@utils/logger/winston/logger';
import { name, version, description, author, license } from '@packagejson';

const openApi = 'docs/openapi/swagger.yml';
const postmanCollection = 'docs/postman/postman_collection.json';

const url = `${apiUri()}/`;

const servers = [{ url: `${url}`, description: 'Api Ver. 1' }];

export default async () => {
    const generateOpenapi = await postmanToOpenApi(postmanCollection, path.join(openApi), {
        defaultTag: 'General',
        info: {
            title: name,
            version,
            description,
            license: { name: license, url: author.url },
            contact: { name: author.name, email: author.email },
        },
        servers,
    })
        .then((data) => {
            return { success: true, data: data, error: null };
        })
        .catch((err) => /* istanbul ignore next */ {
            logger.error(`Swagger generation stopped due to some error'. ${err}`);
            return { success: false, data: null, error: err };
        });

    if (generateOpenapi.success) {
        const result = await yaml.load(openApi);
        return result;
    }
};
