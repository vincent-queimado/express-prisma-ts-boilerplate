export default {
    http200(data) {
        const params = {
            success: true,
            message: 'Sucesso',
            content: data || null,
        };
        return { httpStatusCode: 200, data: params };
    },
    http201(data) {
        const params = {
            success: true,
            message: 'Criado com sucesso',
            content: data || null,
        };
        return { httpStatusCode: 201, data: params };
    },
    http204(data) {
        const params = {
            success: true,
            message: 'Excluído com sucesso',
            content: data || null,
        };
        return { httpStatusCode: 204, data: params };
    },
    http401(error) {
        const params = {
            success: false,
            message: 'Acesso não autorizado',
            error: error || null,
        };
        return { httpStatusCode: 401, data: params };
    },
    http422(customMsg, error) {
        const params = {
            success: false,
            message: customMsg || 'Falha',
            error: error || null,
        };
        return { httpStatusCode: 422, data: params };
    },
};
