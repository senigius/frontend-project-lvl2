import yaml from 'js-yaml';

export default (data, type) => {
  if (type === 'json') return JSON.parse(data);
  if (type === 'yml') return yaml.load(data);
  if (type === 'yaml') return yaml.load(data);
  throw new Error(`File format ${type} not supported`);
};
