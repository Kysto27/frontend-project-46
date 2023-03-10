import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('gendiff', () => {
  const expectedStylish = readFile('stylishOutput.txt');
  const expectedPlain = readFile('plainOutput.txt');
  const expectedJson = readFile('jsonOutput.json');

  const formats = ['json', 'yml'];

  test.each(formats)('formats', (format) => {
    const filepath1 = getFixturePath(`file1.${format}`);
    const filepath2 = getFixturePath(`file2.${format}`);
    expect(genDiff(filepath1, filepath2)).toBe(expectedStylish);
    expect(genDiff(filepath1, filepath2, 'stylish')).toBe(expectedStylish);
    expect(genDiff(filepath1, filepath2, 'plain')).toBe(expectedPlain);
    expect(genDiff(filepath1, filepath2, 'json')).toBe(expectedJson);
  });
});
