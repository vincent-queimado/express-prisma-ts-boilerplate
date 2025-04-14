/**
 * @swagger
 * /health-check:
 *   get:
 *     summary: Check database health
 *     description: Queries the database to retrieve a list of table names to verify connectivity.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Database health check successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 httpStatusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                     message:
 *                       type: string
 *                       example: Success
 *                     content:
 *                       type: object
 *                       example: "{}"
 *       500:
 *         description: Internal server error
 */
export {};
