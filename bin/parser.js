import yaml from 'js-yaml';

const parse = (type, data) => {
  if (type === 'json') return JSON.parse(data);
  if (type === 'yml') return yaml.load(data);
  throw new Error(`File format ${type} not supported`);
};

export default parse;
