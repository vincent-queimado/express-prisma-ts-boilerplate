import rateLimit from 'express-rate-limit';

import config from '@config/app';

const standardHeaders = true;
const legacyHeaders = false;

const limiter = rateLimit({
    windowMs: parseInt(config.ratelimiter.window) * 60 * 1000, // 15 minutes
    max: parseInt(config.ratelimiter.max),
    standardHeaders,
    legacyHeaders,
});

export default { limiter };
