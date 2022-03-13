import _ from 'lodash';

const formatItem = (item) => {
  if (_.isObject(item)) return '[complex value]';
  return _.isString(item) ? `'${item}'` : item;
};

const formatToPlain = (data) => {
  const getItems = (items, path) => items.flatMap((item) => {
    const newPath = [...path, item.key];
    switch (item.type) {
      case 'haveChildren':
        return getItems(item.children, newPath);
      case 'added':
        return `Property '${newPath.join('.')}' was added with value: ${formatItem(item.value)}`;
      case 'deleted':
        return `Property '${newPath.join('.')}' was removed`;
      case 'changed':
        return `Property '${newPath.join('.')}' was updated. From ${formatItem(item.oldValue)} to ${formatItem(item.newValue)}`;
      default:
        return [];
    }
  });
  return getItems(data, []).join('\n');
};

export default formatToPlain;
