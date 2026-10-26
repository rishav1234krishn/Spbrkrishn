import { test, describe } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import { createExpressApp } from '../server/api.ts';

const app = createExpressApp();

describe('Backend API: GET /api/health', () => {
  test('returns HTTP 200 with status ok, service website-api, and valid ISO timestamp', async () => {
    const res = await request(app)
      .get('/api/health')
      .expect('Content-Type', /json/)
      .expect(200);

    assert.strictEqual(res.body.status, 'ok');
    assert.strictEqual(res.body.service, 'website-api');
    assert.ok(res.body.timestamp, 'timestamp must exist');

    // Verify timestamp is a valid ISO 8601 string
    const parsedDate = new Date(res.body.timestamp);
    assert.ok(!isNaN(parsedDate.getTime()), 'timestamp must be a valid date');
    assert.strictEqual(res.body.timestamp, parsedDate.toISOString(), 'timestamp must match ISO 8601');
  });

  test('negative test: rejects unsupported HTTP methods on /api/health with HTTP 405', async () => {
    const postRes = await request(app)
      .post('/api/health')
      .set('Content-Type', 'application/json')
      .send({ some: 'data' })
      .expect('Content-Type', /json/)
      .expect(405);

    assert.strictEqual(postRes.body.error, 'Method Not Allowed');
    assert.strictEqual(postRes.headers['allow'], 'GET');

    const putRes = await request(app)
      .put('/api/health')
      .expect(405);

    assert.strictEqual(putRes.body.error, 'Method Not Allowed');

    const deleteRes = await request(app)
      .delete('/api/health')
      .expect(405);

    assert.strictEqual(deleteRes.body.error, 'Method Not Allowed');
  });
});

describe('Backend API: POST /api/echo', () => {
  test('positive test: accepts {"message":"Hello from my website"} and returns HTTP 200 with the same message', async () => {
    const payload = { message: 'Hello from my website' };
    const res = await request(app)
      .post('/api/echo')
      .set('Content-Type', 'application/json')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(200);

    assert.strictEqual(res.body.status, 'ok');
    assert.strictEqual(res.body.message, 'Hello from my website');
    assert.ok(res.body.timestamp);
  });

  test('negative test: missing message returns HTTP 400 Bad Request', async () => {
    const res = await request(app)
      .post('/api/echo')
      .set('Content-Type', 'application/json')
      .send({})
      .expect('Content-Type', /json/)
      .expect(400);

    assert.strictEqual(res.body.error, 'Bad Request');
    assert.strictEqual(res.body.message, "Field 'message' is required");
  });

  test('negative test: empty message returns HTTP 400 Bad Request', async () => {
    const resEmpty = await request(app)
      .post('/api/echo')
      .set('Content-Type', 'application/json')
      .send({ message: '' })
      .expect('Content-Type', /json/)
      .expect(400);

    assert.strictEqual(resEmpty.body.error, 'Bad Request');
    assert.strictEqual(resEmpty.body.message, "Field 'message' must be a non-empty string");

    const resWhitespace = await request(app)
      .post('/api/echo')
      .set('Content-Type', 'application/json')
      .send({ message: '   ' })
      .expect('Content-Type', /json/)
      .expect(400);

    assert.strictEqual(resWhitespace.body.error, 'Bad Request');
    assert.strictEqual(resWhitespace.body.message, "Field 'message' must be a non-empty string");
  });

  test('negative test: invalid JSON returns HTTP 400 Bad Request', async () => {
    const res = await request(app)
      .post('/api/echo')
      .set('Content-Type', 'application/json')
      .send('{"message": "incomplete string ...')
      .expect('Content-Type', /json/)
      .expect(400);

    assert.strictEqual(res.body.error, 'Bad Request');
    assert.strictEqual(res.body.message, 'Invalid JSON format in request body');
  });

  test('negative test: wrong content type returns HTTP 415 Unsupported Media Type', async () => {
    const resText = await request(app)
      .post('/api/echo')
      .set('Content-Type', 'text/plain')
      .send('message=hello')
      .expect('Content-Type', /json/)
      .expect(415);

    assert.strictEqual(resText.body.error, 'Unsupported Media Type');
    assert.strictEqual(resText.body.message, 'Content-Type must be application/json');

    const resForm = await request(app)
      .post('/api/echo')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send('message=hello')
      .expect('Content-Type', /json/)
      .expect(415);

    assert.strictEqual(resForm.body.error, 'Unsupported Media Type');
  });

  test('negative test: unsupported HTTP method returns HTTP 405 Method Not Allowed', async () => {
    const getRes = await request(app)
      .get('/api/echo')
      .expect('Content-Type', /json/)
      .expect(405);

    assert.strictEqual(getRes.body.error, 'Method Not Allowed');
    assert.strictEqual(getRes.headers['allow'], 'POST');

    const deleteRes = await request(app)
      .delete('/api/echo')
      .expect(405);

    assert.strictEqual(deleteRes.body.error, 'Method Not Allowed');

    const putRes = await request(app)
      .put('/api/echo')
      .expect(405);

    assert.strictEqual(putRes.body.error, 'Method Not Allowed');
  });

  test('negative test: payload exceeding 10kb limit returns HTTP 413 Payload Too Large', async () => {
    const hugeMessage = 'x'.repeat(12 * 1024);
    const res = await request(app)
      .post('/api/echo')
      .set('Content-Type', 'application/json')
      .send({ message: hugeMessage })
      .expect('Content-Type', /json/)
      .expect(413);

    assert.strictEqual(res.body.error, 'Payload Too Large');
  });
});

describe('Backend API: Real Content Endpoints', () => {
  test('GET /api/tmdb/status returns JSON with provider configuration state and attribution', async () => {
    const res = await request(app)
      .get('/api/tmdb/status')
      .expect('Content-Type', /json/)
      .expect(200);

    assert.strictEqual(typeof res.body.configured, 'boolean');
    assert.ok(res.body.attribution.includes('TMDB'));
  });

  test('GET /api/movies/trending returns verified real movies with real TMDB IDs and poster URLs', async () => {
    const res = await request(app)
      .get('/api/movies/trending')
      .expect('Content-Type', /json/)
      .expect(200);

    assert.strictEqual(res.body.status, 'ok');
    assert.ok(Array.isArray(res.body.data));
    assert.ok(res.body.data.length > 0);

    // Verify first movie has real fields
    const movie = res.body.data[0];
    assert.ok(movie.title, 'Movie must have a title');
    assert.ok(movie.tmdbId, 'Movie must have a real tmdbId');
    assert.ok(movie.posterUrl.includes('image.tmdb.org'), 'Poster URL must use real TMDB image CDN');
    assert.strictEqual(movie.sourceProvider, 'tmdb');

    // Verify no fictional titles are present
    const titles = res.body.data.map((m: any) => m.title.toLowerCase());
    assert.ok(!titles.includes('chrono dynasty: infinite veil'), 'Fictional Chrono Dynasty must not exist');
    assert.ok(!titles.includes('vortex protocol'), 'Fictional Vortex Protocol must not exist');
  });

  test('GET /api/anime/trending returns verified real anime with real MyAnimeList scores and studios', async () => {
    const res = await request(app)
      .get('/api/anime/trending')
      .expect('Content-Type', /json/)
      .expect(200);

    assert.strictEqual(res.body.status, 'ok');
    assert.ok(Array.isArray(res.body.data));
    assert.ok(res.body.data.length > 0);

    const anime = res.body.data[0];
    assert.ok(anime.title, 'Anime must have a title');
    assert.ok(anime.malId, 'Anime must have a real malId');
    assert.ok(anime.rating > 8.0, 'Top anime must have realistic MAL rating');
    assert.ok(anime.sourceProvider, 'Must specify source provider');

    // Verify no fictional anime titles are present
    const titles = res.body.data.map((a: any) => a.title.toLowerCase());
    assert.ok(!titles.includes('blade of celestial gods'), 'Fictional Blade of Celestial Gods must not exist');
    assert.ok(!titles.includes('neo-shinjuku 2099'), 'Fictional Neo-Shinjuku 2099 must not exist');
  });

  test('GET /api/anime/schedule returns verified weekly Tokyo broadcast schedule', async () => {
    const res = await request(app)
      .get('/api/anime/schedule?day=FRI')
      .expect('Content-Type', /json/)
      .expect(200);

    assert.strictEqual(res.body.status, 'ok');
    assert.ok(Array.isArray(res.body.data));
    assert.ok(res.body.data.length > 0);

    const item = res.body.data[0];
    assert.strictEqual(item.day, 'FRI');
    assert.ok(item.timeJST, 'Must have JST broadcast time');
    assert.ok(item.network, 'Must have Japanese network name');
  });

  test('GET /api/search returns real matching titles for "Dune" or "Frieren"', async () => {
    const res = await request(app)
      .get('/api/search?q=Dune')
      .expect('Content-Type', /json/)
      .expect(200);

    assert.strictEqual(res.body.status, 'ok');
    assert.ok(Array.isArray(res.body.data));
    assert.ok(res.body.data.some((t: any) => t.title.toLowerCase().includes('dune')));
  });
});

