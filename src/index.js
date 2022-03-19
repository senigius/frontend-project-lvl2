import fs from 'fs';
import path from 'path';
import buildDiffTree from './buildDiffTree.js';
import formatOutput from './formatters/index.js';
import parseData from './parser.js';

const getFixturePath = (filepath) => path.resolve(process.cwd(), '__tests__/__fixtures__', filepath);

const getAbsPath = (filepath) => (path.isAbsolute(filepath) ? filepath : getFixturePath(filepath));

const getFileType = (filepath) => path.extname(filepath).slice(1);

const getData = (filepath) => fs.readFileSync(filepath, 'utf8');

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const absPath1 = getAbsPath(filepath1);
  const absPath2 = getAbsPath(filepath2);
  const typeOfFile1 = getFileType(filepath1);
  const typeOfFile2 = getFileType(filepath2);
  const data1 = parseData(getData(absPath1), typeOfFile1);
  const data2 = parseData(getData(absPath2), typeOfFile2);
  const result = buildDiffTree(data1, data2);
  return formatOutput(result, formatName);
};

export default genDiff;
