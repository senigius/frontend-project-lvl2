#!/usr/bin/env node

import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import  { Command }  from 'commander';
import findDiff from './findDiff.js';

const program = new Command();

const getFixturePath = (filepath) => path.resolve(process.cwd(), '__fixtures__', filepath);
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
        const absolutePath1 = path.isAbsolute(filepath1) ? filepath1 : getFixturePath(filepath1, 'utf8');
        const absolutePath2 = path.isAbsolute(filepath2) ? filepath2 : getFixturePath(filepath2, 'utf8');
        if (options.format === 'json' || isJson(filepath1, filepath2)) {
            const file1 = JSON.parse(fs.readFileSync(absolutePath1));
            const file2 = JSON.parse(fs.readFileSync(absolutePath2));
            const difference = findDiff(file1, file2);
            console.log(difference);
        } else console.log('Wrong file format');
    });
program.parse();