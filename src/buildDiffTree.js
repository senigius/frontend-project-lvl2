import _ from 'lodash';

// Я не совсем понял, что имелось ввиду по добавлением на верхний уровень объекта с типом рут
// Я добавил, но получилось просто больше строк кода и в formatters/index.js теперь
// идёт обращение не к data а, к data.root
// Можно поподробнее объяснить, что именно от меня требуется?
const buildDiffTree = (obj1, obj2, root = true) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(keys);
  const tree = sortedKeys.map((key) => {
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
  return (root === false) ? tree : { root: tree };
};

export default buildDiffTree;
