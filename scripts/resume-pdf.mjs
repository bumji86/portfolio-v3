// Prints /{locale}/resume to public/pdf/resume-{locale}.pdf with headless Chrome.
// Usage: start the site (npm run dev or npm start), then `npm run resume:pdf`.
// Env: BASE_URL (default http://localhost:3000), CHROME (path to Chrome), LOCALES (default "en,ko").
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';
const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const LOCALES = (process.env.LOCALES ?? 'en,ko').split(',');
const PORT = 9340;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(CHROME, [
  '--headless=new',
  '--disable-gpu',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${mkdtempSync(join(tmpdir(), 'resume-pdf-'))}`,
  'about:blank',
]);

try {
  let ws;
  for (let i = 0; i < 50 && !ws; i++) {
    await sleep(200);
    ws = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' })
      .then((r) => r.json())
      .then((j) => j.webSocketDebuggerUrl)
      .catch(() => undefined);
  }
  if (!ws) throw new Error('Chrome did not start');

  const sock = new WebSocket(ws);
  await new Promise((r) => (sock.onopen = r));
  let id = 0;
  const pending = new Map();
  sock.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) {
      pending.get(m.id)(m);
      pending.delete(m.id);
    }
  };
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const i = ++id;
      pending.set(i, (m) => (m.error ? reject(new Error(m.error.message)) : resolve(m.result)));
      sock.send(JSON.stringify({ id: i, method, params }));
    });

  mkdirSync('public/pdf', { recursive: true });
  for (const locale of LOCALES) {
    await send('Page.navigate', { url: `${BASE_URL}/${locale}/resume` });
    await sleep(2500);
    await send('Runtime.evaluate', { expression: 'document.fonts.ready', awaitPromise: true });
    const { data } = await send('Page.printToPDF', {
      preferCSSPageSize: true,
      printBackground: true,
      displayHeaderFooter: false,
    });
    const out = `public/pdf/resume-${locale}.pdf`;
    writeFileSync(out, Buffer.from(data, 'base64'));
    console.log(`✓ ${out}`);
  }
  sock.close();
} finally {
  chrome.kill();
}
