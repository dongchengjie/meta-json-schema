import fs from 'fs';
import path from 'path';

// package.json对象
export const pkg = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf8'));

// resolve路径
const workspace = path.dirname(path.resolve('package.json'));
export const resolve = (...args) => path.resolve(workspace, ...args);
