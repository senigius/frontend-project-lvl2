import fs from 'fs';
import path from 'path';
import formatToStylish from './stylishFormat.js';
import parse from './parser.js';

const fileFormat = (filepath) => path.extname(filepath).slice(1);

const getData = (filepath) => {
  const getFixturePath = (normalPath) => path.resolve(process.cwd(), '__tests__/__fixtures__', normalPath);
  const absPath = path.isAbsolute(filepath) ? filepath : getFixturePath(filepath, 'utf8');
  return fs.readFileSync(absPath);
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  if (format === 'stylish') {
    const data1 = parse(fileFormat(filepath1), getData(filepath1));
    const data2 = parse(fileFormat(filepath2), getData(filepath2));
    return formatToStylish(data1, data2);
  }
  return `Output format ${format} not supported`;
};

export default genDiff;
