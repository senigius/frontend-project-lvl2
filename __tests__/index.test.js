import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

/* eslint-disable no-underscore-dangle */

const getFixturePath = (filename) => path.join('__fixtures__', filename);

const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

const filesForTests = [
  ['file1.json', 'file2.json', 'stylish'],
  ['file1.yml', 'file2.yml', 'plain'],
  ['file1.json', 'file2.yml', 'json'],
];

test.each(filesForTests)('Check gendiff %#', (file1, file2, format) => {
  const result = genDiff(getFixturePath(file1), getFixturePath(file2), format);
  const expectResult = readFixture(`${format}.txt`);
  expect(result).toEqual(expectResult);
});

test('Default output format', () => {
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expectResult = readFixture('stylish.txt');
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
