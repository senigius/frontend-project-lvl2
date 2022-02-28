#!/usr/bin/env node

import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import  { Command }  from 'commander';

const program = new Command();

const isAbsolutePath = (filepath) => (path.isAbsolute(filepath)) ? filepath : path.resolve('__fixture__', filepath);
const isJson = (file1, file2) => {
    if (file1.slice(-5) === '.json' && file2.slice(-5) === '.json') {
        return true;
    }
    return false;
}

program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .option('-f, --format <type>', 'output format')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action((filepath1, filepath2, options) => {
        console.log(path.resolve('__fixture__', filepath1));
        if (options.format === 'json' || isJson(filepath1, filepath2)) {
            const file1 = JSON.parse(fs.readFileSync(isAbsolutePath(filepath1)));
            const file2 = JSON.parse(fs.readFileSync(isAbsolutePath(filepath2)));
        const bothKeys = _.union(Object.keys(file1), Object.keys(file2));
        console.log(bothKeys);
        }
    });
program.parse();