import fs from 'fs';
import path from 'path';
import findDiff from './findDiff.js';

const isJSON = (file) => file.slice(-5) === '.json';

const normalizePath = (filepath) => {
  const getFixturePath = (normalPath) => path.resolve(process.cwd(), '__fixtures__', normalPath);
  return path.isAbsolute(filepath) ? filepath : getFixturePath(filepath, 'utf8');
};

const genDiff = (filepath1, filepath2, format) => {
  const path1 = normalizePath(filepath1);
  const path2 = normalizePath(filepath2);
  if (format === 'json' || (isJSON(path1) && isJSON(path2))) {
    const data1 = JSON.parse(fs.readFileSync(path1));
    const data2 = JSON.parse(fs.readFileSync(path2));
    return findDiff(data1, data2);
  }
  return 'Wrond format';
};

export default genDiff;
