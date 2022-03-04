import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import searchForDiff from './searchForDiff.js';
import formatOutput from './outputFormat/index.js';

const parseData = (type, data) => {
  if (type === 'json') return JSON.parse(data);
  if (type === 'yml') return yaml.load(data);
  throw new Error(`File format ${type} not supported`);
};

const fileFormat = (filepath) => path.extname(filepath).slice(1);

const getData = (filepath) => {
  const getFixturePath = (normalPath) => path.resolve(process.cwd(), '__tests__/__fixtures__', normalPath);
  const absPath = path.isAbsolute(filepath) ? filepath : getFixturePath(filepath);
  return fs.readFileSync(absPath, 'utf8');
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseData(fileFormat(filepath1), getData(filepath1));
  const data2 = parseData(fileFormat(filepath2), getData(filepath2));
  const result = searchForDiff(data1, data2);
  return formatOutput(result, format);
};

export default genDiff;
