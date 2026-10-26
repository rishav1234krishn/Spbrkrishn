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
