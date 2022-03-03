import _ from 'lodash';

const formatToStylish = (obj1, obj2) => {
  const makeChangesToString = (key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    let str = '';
    if (!_.has(obj2, key)) {
      str = `  - ${key}: ${value1}`;
    } else if (!_.has(obj1, key)) {
      str = `  + ${key}: ${value2}`;
    } else if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      str = `  ${key}: ${formatToStylish(value1, value2)}`;
    } else if (!_.isEqual(value1, value2)) {
      str = `  - ${key}: ${value1}\n  + ${key}: ${value2}`;
    } else str = `    ${key}: ${value1}`;
    return str;
  };
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const result = _.sortBy(keys).map(makeChangesToString);
  return `{\n${result.join('\n')}\n}`;
};

export default formatToStylish;
