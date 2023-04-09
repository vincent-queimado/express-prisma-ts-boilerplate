import pkg from '../../../../package.json';

export default () => {
    const data = {
        name: pkg.name,
        description: pkg.description,
        version: pkg.version,
    };
    return { success: true, data, error: null };
};