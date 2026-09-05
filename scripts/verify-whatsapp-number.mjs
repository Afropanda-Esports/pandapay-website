import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const sourceUrl = new URL('../src/whatsappNumber.ts', import.meta.url);
const source = await readFile(sourceUrl, 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
  },
  fileName: sourceUrl.pathname,
});
const moduleUrl = `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`;
const { normalizeWhatsappNumber } = await import(moduleUrl);

const BUSINESS_NUMBER = '2347043864368';

for (const value of [undefined, '', '234XXXXXXXXXX', 'not-a-phone', '123', '2348083262539']) {
  assert.equal(normalizeWhatsappNumber(value), BUSINESS_NUMBER);
}

assert.equal(normalizeWhatsappNumber('+234 704 386 4368'), BUSINESS_NUMBER);
assert.equal(normalizeWhatsappNumber('2347000000000'), '2347000000000');

console.log('WhatsApp number normalization verified across 8 cases.');
