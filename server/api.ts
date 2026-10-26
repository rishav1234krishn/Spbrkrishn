import express from 'express';
import type { Request, Response, NextFunction } from 'express';

export function createApiRouter() {
  const router = express.Router();

  // /api/health
  router.route('/health')
    .get((_req: Request, res: Response) => {
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json({
        status: 'ok',
        service: 'website-api',
        timestamp: new Date().toISOString(),
      });
    })
    .all((req: Request, res: Response) => {
      res.setHeader('Allow', 'GET');
      res.setHeader('Content-Type', 'application/json');
      return res.status(405).json({
        error: 'Method Not Allowed',
        message: `HTTP method ${req.method} is not allowed on /api/health. Supported methods: GET`,
      });
    });

  // /api/echo
  router.route('/echo')
    .post((req: Request, res: Response) => {
      res.setHeader('Content-Type', 'application/json');

      // 1. Content-Type check (must be application/json)
      const contentType = req.headers['content-type'] || '';
      if (!contentType.toLowerCase().includes('application/json')) {
        return res.status(415).json({
          error: 'Unsupported Media Type',
          message: 'Content-Type must be application/json',
        });
      }

      // 2. Validate body presence
      if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Request body must be a valid JSON object',
        });
      }

      const { message } = req.body;

      // 3. Validate 'message' field existence
      if (message === undefined || message === null) {
        return res.status(400).json({
          error: 'Bad Request',
          message: "Field 'message' is required",
        });
      }

      // 4. Validate 'message' is a non-empty string
      if (typeof message !== 'string') {
        return res.status(400).json({
          error: 'Bad Request',
          message: "Field 'message' must be a non-empty string",
        });
      }

      if (message.trim().length === 0) {
        return res.status(400).json({
          error: 'Bad Request',
          message: "Field 'message' must be a non-empty string",
        });
      }

      // Success response containing the same message
      return res.status(200).json({
        status: 'ok',
        message: message,
        timestamp: new Date().toISOString(),
      });
    })
    .all((req: Request, res: Response) => {
      res.setHeader('Allow', 'POST');
      res.setHeader('Content-Type', 'application/json');
      return res.status(405).json({
        error: 'Method Not Allowed',
        message: `HTTP method ${req.method} is not allowed on /api/echo. Supported methods: POST`,
      });
    });

  // Fallback 404 for unknown /api/* routes
  router.all('*', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    return res.status(404).json({
      error: 'Not Found',
      message: `API route ${req.method} ${req.originalUrl} not found`,
    });
  });

  return router;
}

export function createExpressApp() {
  const app = express();

  // 10kb request body limit to prevent abuse
  app.use(express.json({ limit: '10kb' }));

  // Middleware to catch malformed JSON and payload-too-large errors
  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && 'body' in err) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Invalid JSON format in request body',
      });
    }
    if (err.type === 'entity.too.large' || err.status === 413) {
      return res.status(413).json({
        error: 'Payload Too Large',
        message: 'Request payload exceeds the 10kb limit',
      });
    }
    return next(err);
  });

  // Mount API router
  app.use('/api', createApiRouter());

  return app;
}
