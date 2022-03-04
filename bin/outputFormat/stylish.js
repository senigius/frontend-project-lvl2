import _ from 'lodash';

const setValueFormat = (value, depth) => {
  if (!_.isObjectLike(value)) {
    return value;
  }
  const indent = depth * 4;
  const newIndent = ' '.repeat(indent);
  const keys = Object.keys(value);
  const result = keys.map((key) => {
    if (!_.isObjectLike(value[key])) {
      return `${newIndent}    ${key}: ${value[key]}`;
    }
    return `${newIndent}    ${key}: ${setValueFormat(value[key], depth + 1)}`;
  });
  return ['{', ...result, `${newIndent}}`].join('\n');
};

const formatToStylish = (data) => {
  const getItems = (items, depth) => items.flatMap((node) => {
    const newDepth = depth + 1;
    const indent = ' '.repeat(depth * 4);
    const backIndent = ' '.repeat((depth * 4) + 4);
    switch (node.type) {
      case 'haveChildren':
        return `${indent}    ${node.key}: ${['{', ...getItems(node.children, newDepth), `${backIndent}}`].join('\n')}`;
      case 'changed':
        return [`${indent}  - ${node.key}: ${setValueFormat(node.oldValue, newDepth)}`,
          `${indent}  + ${node.key}: ${setValueFormat(node.newValue, newDepth)}`];
      case 'deleted':
        return `${indent}  - ${node.key}: ${setValueFormat(node.value, newDepth)}`;
      case 'added':
        return `${indent}  + ${node.key}: ${setValueFormat(node.value, newDepth)}`;
      case 'unchanged':
        return `${indent}    ${node.key}: ${setValueFormat(node.value, newDepth)}`;
      default:
        throw new Error(`Wrong node type: ${node.type}!`);
    }
  });
  const result = getItems(data, 0);
  return ['{', ...result, '}'].join('\n');
};

export default formatToStylish;
