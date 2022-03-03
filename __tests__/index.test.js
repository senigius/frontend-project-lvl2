import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../bin/index.js';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '.', '__fixtures__', filename);

const readFixture = (filename) => fs.readFileSync(getFixturePath(`${filename}.txt`), 'utf8');

test('formatStylish', () => {
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expectResult = readFixture('stylish');
  expect(result).toEqual(expectResult);
});

test('Wrong file format', () => {
    const error = new Error('File format jsonsuper not supported')
    expect(() => genDiff(getFixturePath('file1.jsonsuper'), getFixturePath('file2.json'))).toThrowError(error);
})

test('Wrong output format', () => {
    const error = 'Output format mp3 not supported';
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'mp3')).toBe(error);
  });