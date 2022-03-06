import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../bin/index.js';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '.', '__fixtures__', filename);

const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

const filesForTests = [
  ['file1.json', 'file2.json'],
  ['file1.yml', 'file2.yml'],
  ['file1.json', 'file2.yml'],
];

test.each(filesForTests)('Format stylish', (file1, file2) => {
  const result = genDiff(getFixturePath(file1), getFixturePath(file2));
  const expectResult = readFixture('resultStylish.txt');
  expect(result).toEqual(expectResult);
});

test.each(filesForTests)('Format plain', (file1, file2) => {
  const result = genDiff(getFixturePath(file1), getFixturePath(file2), 'plain');
  const expectResult = readFixture('resultPlain.txt');
  expect(result).toEqual(expectResult);
});

test.each(filesForTests)('Format json', (file1, file2) => {
  const result = genDiff(getFixturePath(file1), getFixturePath(file2), 'json');
  const expectResult = readFixture('resultJson.txt');
  expect(result).toEqual(expectResult);
});

test('Wrong file format', () => {
  const error = new Error('File format docx not supported');
  expect(() => genDiff(getFixturePath('file1.docx'), getFixturePath('file2.json'))).toThrowError(error);
});

test('Wrong output format', () => {
  const error2 = new Error('File format txt not supported');
  expect(() => genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'txt')).toThrowError(error2);
});
