import formatToStylish from './stylish.js';
import formatToJSON from './JSON.js';

const formatOutput = (data, format) => {
  const newFormat = format.toLowerCase();
  if (newFormat === 'json') return formatToJSON(data);
  if (newFormat === 'stylish') return formatToStylish(data);
  throw new Error(`File format ${format} not supported`);
};

export default formatOutput;
