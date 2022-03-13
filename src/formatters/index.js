import formatToStylish from './stylish.js';
import formatToJSON from './JSON.js';
import formatToPlain from './plain.js';

const formatOutput = (data, format) => {
  const newFormat = format.toLowerCase();
  if (newFormat === 'json') return formatToJSON(data.root);
  if (newFormat === 'stylish') return formatToStylish(data.root);
  if (newFormat === 'plain') return formatToPlain(data.root);
  throw new Error(`File format ${format} not supported`);
};

export default formatOutput;
