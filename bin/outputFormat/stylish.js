import _ from 'lodash';

const formatItem = (value, depth) => {
  if (!_.isObjectLike(value)) {
    return value;
  }
  const indent = depth * 4;
  const newIndent = ' '.repeat(indent); // отступ в 4 пробела для вложенных объектов
  const keys = Object.keys(value);
  const result = keys.map((key) => {
    if (_.isObjectLike(value[key])) {
      return `${newIndent}    ${key}: ${formatItem(value[key], depth + 1)}`;
    }
    return `${newIndent}    ${key}: ${value[key]}`;
  });
  return ['{', ...result, `${newIndent}}`].join('\n');
};

const formatToStylish = (data) => {
  const getItems = (items, depth) => items.flatMap((item) => {
    const newDepth = depth + 1;
    const indent = ' '.repeat(depth * 4); // отступ в 4 пробела перед открывающей скобкой для вложенных объектов
    const backIndent = ' '.repeat((depth * 4) + 4); // и для закрывающей скобки
    switch (item.type) {
      case 'haveChildren':
        return `${indent}    ${item.key}: ${['{', ...getItems(item.children, newDepth), `${backIndent}}`].join('\n')}`;
      case 'changed':
        return [`${indent}  - ${item.key}: ${formatItem(item.oldValue, newDepth)}`,
          `${indent}  + ${item.key}: ${formatItem(item.newValue, newDepth)}`];
      case 'deleted':
        return `${indent}  - ${item.key}: ${formatItem(item.value, newDepth)}`;
      case 'added':
        return `${indent}  + ${item.key}: ${formatItem(item.value, newDepth)}`;
      default:
        return `${indent}    ${item.key}: ${formatItem(item.value, newDepth)}`;
    }
  });
  const result = getItems(data, 0);
  return ['{', ...result, '}'].join('\n');
};

export default formatToStylish;
