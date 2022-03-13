import fs from 'fs';
import path from 'path';
import buildDiffTree from './buildDiffTree.js';
import formatOutput from './formatters/index.js';
import parseData from './parser.js';

const getFixturePath = (normalPath) => path.resolve(process.cwd(), '__tests__/__fixtures__', normalPath);

const getData = (filepath) => {
  const absPath = path.isAbsolute(filepath) ? filepath : getFixturePath(filepath);
  const data = fs.readFileSync(absPath, 'utf8');
  const fileType = path.extname(filepath).slice(1);
  return parseData(fileType, data);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const result = buildDiffTree(data1, data2);
  return formatOutput(result, formatName);
};

export default genDiff;
