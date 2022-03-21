import _ from 'lodash';

const spaceBeforeBracket = 4;

const formatItem = (item, depth) => {
  if (!_.isObject(item)) {
    return item;
  }
  const indent = depth * spaceBeforeBracket;
  const newIndent = ' '.repeat(indent); // отступ в 4 пробела для вложенных объектов
  const keys = Object.keys(item);
  const result = keys.map((key) => {
    if (_.isObject(item[key])) {
      return `${newIndent}    ${key}: ${formatItem(item[key], depth + 1)}`;
    }
    return `${newIndent}    ${key}: ${item[key]}`;
  });
  return ['{', ...result, `${newIndent}}`].join('\n');
};

const formatToStylish = (data) => {
  const getItems = (items, depth) => items.flatMap((item) => {
    const newDepth = depth + 1;
    // indent нужен для вложенных изменений. На нулевом уровне глубины он будет равен 0
    const indent = ' '.repeat(depth * spaceBeforeBracket); // отступ в 4 пробела перед открывающей скобкой для вложенных объектов
    const backIndent = ' '.repeat((depth * spaceBeforeBracket) + spaceBeforeBracket); // и для закрывающей скобки
    switch (item.type) {
      case 'haveChildren':
        // Так как indent равен 0 на плоском объекте, после него добавляются 4 пробела или
        // 3 пробела и знак + или -. При погружении далее в дерево разница, отступ должен
        // увеличиваться, поэтому константа spaceBeforeBracket умножается на глубину и записывается
        // в indent
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
