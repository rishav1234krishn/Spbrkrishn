import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { tmdbClient } from './tmdb.ts';
import { jikanClient } from './jikan.ts';

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

      const contentType = req.headers['content-type'] || '';
      if (!contentType.toLowerCase().includes('application/json')) {
        return res.status(415).json({
          error: 'Unsupported Media Type',
          message: 'Content-Type must be application/json',
        });
      }

      if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Request body must be a valid JSON object',
        });
      }

      const { message } = req.body;

      if (message === undefined || message === null) {
        return res.status(400).json({
          error: 'Bad Request',
          message: "Field 'message' is required",
        });
      }

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

  // GET /api/tmdb/status
  router.get('/tmdb/status', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    const isConfigured = tmdbClient.isConfigured();
    return res.status(200).json({
      status: 'ok',
      provider: 'TMDB',
      configured: isConfigured,
      message: isConfigured
        ? 'TMDB API key is configured. Live queries enabled.'
        : 'TMDB_API_KEY environment variable is not configured. Serving verified real TMDB catalog records.',
      attribution: 'This product uses the TMDB API but is not endorsed or certified by TMDB.',
    });
  });

  // GET /api/movies/trending
  router.get('/movies/trending', async (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const { items, isLive } = await tmdbClient.getTrendingMovies();
      return res.status(200).json({
        status: 'ok',
        source: isLive ? 'tmdb_live' : 'tmdb_verified',
        total: items.length,
        data: items,
      });
    } catch (err: any) {
      return res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
  });

  // GET /api/movies/popular
  router.get('/movies/popular', async (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const genre = req.query.genre ? String(req.query.genre) : undefined;
      const { items, isLive } = await tmdbClient.getPopularMovies(genre);
      return res.status(200).json({
        status: 'ok',
        source: isLive ? 'tmdb_live' : 'tmdb_verified',
        total: items.length,
        data: items,
      });
    } catch (err: any) {
      return res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
  });

  // GET /api/movies/top-rated
  router.get('/movies/top-rated', async (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const { items, isLive } = await tmdbClient.getTopRatedMovies();
      return res.status(200).json({
        status: 'ok',
        source: isLive ? 'tmdb_live' : 'tmdb_verified',
        total: items.length,
        data: items,
      });
    } catch (err: any) {
      return res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
  });

  // GET /api/tv/popular
  router.get('/tv/popular', async (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const { items, isLive } = await tmdbClient.getPopularTvSeries();
      return res.status(200).json({
        status: 'ok',
        source: isLive ? 'tmdb_live' : 'tmdb_verified',
        total: items.length,
        data: items,
      });
    } catch (err: any) {
      return res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
  });

  // GET /api/anime/trending
  router.get('/anime/trending', async (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const { items, isLive } = await jikanClient.getTopAnime();
      return res.status(200).json({
        status: 'ok',
        source: isLive ? 'jikan_live' : 'jikan_verified',
        total: items.length,
        data: items,
      });
    } catch (err: any) {
      return res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
  });

  // GET /api/anime/airing
  router.get('/anime/airing', async (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const genre = req.query.genre ? String(req.query.genre) : undefined;
      const { items, isLive } = await jikanClient.getCurrentlyAiring(genre);
      return res.status(200).json({
        status: 'ok',
        source: isLive ? 'jikan_live' : 'jikan_verified',
        total: items.length,
        data: items,
      });
    } catch (err: any) {
      return res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
  });

  // GET /api/anime/schedule
  router.get('/anime/schedule', async (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const day = req.query.day ? String(req.query.day).toUpperCase() : 'FRI';
      const { items, isLive } = await jikanClient.getSimulcastSchedule(day);
      return res.status(200).json({
        status: 'ok',
        day,
        source: isLive ? 'jikan_live' : 'jikan_verified',
        total: items.length,
        data: items,
      });
    } catch (err: any) {
      return res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
  });

  // GET /api/search?q=...&type=...
  router.get('/search', async (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    const query = req.query.q ? String(req.query.q).trim() : '';
    const type = (req.query.type ? String(req.query.type).toLowerCase() : 'all') as 'all' | 'movie' | 'tv' | 'anime';

    if (!query) {
      return res.status(200).json({
        status: 'ok',
        query: '',
        total: 0,
        data: [],
      });
    }

    try {
      const results: any[] = [];

      if (type === 'all' || type === 'movie' || type === 'tv') {
        const tmdbType = type === 'all' ? 'all' : type;
        const tmdbResults = await tmdbClient.searchTitles(query, tmdbType);
        results.push(...tmdbResults.items);
      }

      if (type === 'all' || type === 'anime') {
        const animeResults = await jikanClient.searchAnime(query);
        results.push(...animeResults.items);
      }

      return res.status(200).json({
        status: 'ok',
        query,
        type,
        total: results.length,
        data: results,
      });
    } catch (err: any) {
      return res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
  });

  // GET /api/details/:category/:id
  router.get('/details/:category/:id', async (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    const { category, id } = req.params;

    try {
      if (category === 'anime') {
        const item = await jikanClient.getAnimeDetails(id);
        if (!item) {
          return res.status(404).json({ error: 'Not Found', message: `Anime record with ID "${id}" was not found.` });
        }
        return res.status(200).json({ status: 'ok', data: item });
      }

      const mediaType = category === 'tv' ? 'tv' : 'movie';
      const item = await tmdbClient.getTitleDetails(id, mediaType);
      if (!item) {
        return res.status(404).json({ error: 'Not Found', message: `Title record with ID "${id}" was not found.` });
      }
      return res.status(200).json({ status: 'ok', data: item });
    } catch (err: any) {
      return res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
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
