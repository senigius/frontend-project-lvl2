import _ from 'lodash';

const buildDiffTree = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (!_.has(obj2, key)) {
      return { key, value: value1, type: 'deleted' };
    }
    if (!_.has(obj1, key)) {
      return { key, value: value2, type: 'added' };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, children: buildDiffTree(value1, value2, false), type: 'haveChildren' };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        key, oldValue: value1, newValue: value2, type: 'changed',
      };
    }
    return { key, value: value1, type: 'unchanged' };
  });
};

export default buildDiffTree;
