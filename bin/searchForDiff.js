import _ from 'lodash';

const searchForDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    let result = { key, value: value1, type: 'unchanged' };
    if (!_.has(obj2, key)) {
      result = { key, value: value1, type: 'deleted' };
    } else if (!_.has(obj1, key)) {
      result = { key, value: value2, type: 'added' };
    } else if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      result = { key, children: searchForDiff(value1, value2), type: 'haveChildren' };
    } else if (!_.isEqual(value1, value2)) {
      result = {
        key, oldValue: value1, newValue: value2, type: 'changed',
      };
    }
    return result;
  });
};

export default searchForDiff;
