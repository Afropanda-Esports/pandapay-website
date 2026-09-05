import { readdir, readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const DIST_DIR = new URL('../dist/', import.meta.url);
const TEXT_EXTENSIONS = new Set(['.css', '.html', '.js', '.json', '.map', '.txt']);
const EXPECTED_NUMBER = '2347043864368';

async function collectTextFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory.pathname, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectTextFiles(new URL(`${entry.name}/`, directory))));
    } else if (TEXT_EXTENSIONS.has(extname(entry.name))) {
      files.push(path);
    }
  }

  return files;
}

const files = await collectTextFiles(DIST_DIR);
const bundle = (await Promise.all(files.map((file) => readFile(file, 'utf8')))).join('\n');
const failures = [];

const requireText = (text, description) => {
  if (!bundle.includes(text)) failures.push(`Missing ${description}: ${JSON.stringify(text)}`);
};

const forbid = (pattern, description) => {
  if (pattern.test(bundle)) failures.push(`Found ${description}`);
};

requireText(EXPECTED_NUMBER, 'PandaPay WhatsApp business number');
forbid(/wa\.me\/234X{6,}/i, 'placeholder WhatsApp destination');
forbid(/wa\.me\/2348083262539/, 'test-recipient WhatsApp destination');

forbid(/Our vision AI extracts the amount, reference, and sender details/i, 'vision-AI screenshot claim');
forbid(/Verified in 1\.2 seconds/i, 'guaranteed verification-time claim');
forbid(/The AI confirms your payment in under 2 seconds/i, 'two-second payment claim');
forbid(/Your airtime, data, token, or subscription lands in WhatsApp instantly/i, 'instant VTU fulfillment claim');

for (const [text, description] of [
  ['AI online', 'online navbar status'],
  ['AI assistant · online now', 'online status detail'],
  ['Online — AI active', 'online hero status'],
]) {
  requireText(text, description);
}

forbid(/AI offline/i, 'offline navbar status');
forbid(/AI assistant · offline for now/i, 'offline status detail');
forbid(/Offline — back soon/i, 'offline hero status');
forbid(/People don(?:'|&apos;)t leave reviews\. They leave messages\./i, 'fabricated testimonial heading');
forbid(/5,000\+ TOP-UPS DELIVERED/i, 'fabricated delivery metric');
forbid(/\+200 customers across/i, 'unverified customer-count claim');
forbid(/#testimonials/i, 'testimonial navigation anchor');

for (const [text, description] of [
  ['Start in WhatsApp', 'WhatsApp entry step'],
  ['Browse what is available', 'catalog step'],
  ['Choose an item', 'product-selection step'],
  ['Review your cart', 'cart-review step'],
  ['Complete checkout', 'checkout step'],
  ['Receive confirmation', 'confirmation step'],
  ['email receipt', 'email-receipt distinction'],
]) {
  requireText(text, description);
}

if (failures.length > 0) {
  console.error('Marketing content verification failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Marketing content verified across ${files.length} built text files.`);
}
