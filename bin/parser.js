import yaml from 'js-yaml';

const parse = (type, content) => {
  switch (type) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
      return yaml.load(content);
    default:
      throw new Error(`File format ${type} not supported`);
  }
};

export default parse;
