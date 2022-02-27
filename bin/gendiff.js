#!/usr/bin/env node

import _ from 'lodash';
import  { Command }  from 'commander';

const program = new Command();

program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .option('-f, --format <type>', 'output format')
    .argument('<filepath1> <filepath2>');

program.parse();