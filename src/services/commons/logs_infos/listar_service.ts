import fg from 'fast-glob';
import logger from '@utils/logger/winston/logger';

const logsFolder = 'logs/';
const logsExt = '.log';

export default async () => {
    try {
        const filesInfo = await fg([`${logsFolder}info-*${logsExt}`], {
            stats: true,
        });
        const filesError = await fg([`${logsFolder}error-*${logsExt}`], {
            stats: true,
        });

        const logsInfo = filesInfo.map((el: any) => {
            const item: any = {};
            item.name = el.name;
            item.path = el.path;
            item.size = `${(el.stats.size / 1024).toFixed(2).toString()}kb`;
            item.modified = el.stats.mtime.toLocaleString();
            return item;
        });

        const logsError = filesError.map((el: any) => {
            const item: any = {};
            item.name = el.name;
            item.path = el.path;
            item.size = `${(el.stats.size / 1024).toFixed(2).toString()}kb`;
            item.modified = el.stats.mtime.toLocaleString();
            return item;
        });

        return { success: true, logsInfo, logsError };
    } catch (err: any) {
        logger.error(`Erro ao listar os arquivos de logs de API. ${err.message}`);
        return { success: false, filesInfo: [], filesError: [] };
    }
};
