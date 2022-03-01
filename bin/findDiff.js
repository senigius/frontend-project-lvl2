import _ from 'lodash';

const findDiff = (obj1, obj2) => {
  const buildNode = (key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (!_.has(obj2, key)) {
      return `  - ${key}: ${value1}`;
    }
    if (!_.has(obj1, key)) {
        return `  + ${key}: ${value2}`;
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return `  ${key}: ${findDiff(value1, value2)}`;
    }
    if (!_.isEqual(value1, value2)) {
      return `  - ${key}: ${value1}\n  + ${key}: ${value2}`;
    }
    return `    ${key}: ${value1}`;
  };

  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const result = _.sortBy(keys).map(buildNode);
  return `{ \n${result.join('\n')}\n}`;
};

export default findDiff;