import http from 'node:http';
import { generateRequestSchema } from './validate';
import { generateLearningResult } from './generate';
import { serverConfig } from './config';

function sendJson(res: http.ServerResponse, statusCode: number, payload: unknown) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(payload));
}

async function readBody(req: http.IncomingMessage) {
  const chunks: Buffer[] = [];
  let totalSize = 0;

  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    chunks.push(buffer);
    totalSize += buffer.length;

    if (totalSize > 30 * 1024 * 1024) {
      throw new Error('Request body too large.');
    }
  }

  return Buffer.concat(chunks).toString('utf8');
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  if (req.method === 'GET' && url.pathname === '/health') {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/generate') {
    try {
      const rawBody = await readBody(req);
      const parsedBody = generateRequestSchema.parse(JSON.parse(rawBody));
      const result = await generateLearningResult(parsedBody);
      sendJson(res, 200, result);
      return;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown server error.';
      const statusCode = message.includes('body too large') ? 413 : message.includes('Invalid') ? 400 : 502;
      sendJson(res, statusCode, { error: message });
      return;
    }
  }

  sendJson(res, 404, { error: 'Not found' });
});

server.listen(serverConfig.port, () => {
  console.log(`snapspeak AI proxy listening on http://127.0.0.1:${serverConfig.port}`);
});
