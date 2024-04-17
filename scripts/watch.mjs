import fs from 'fs';
import path from 'path';
import bundle from './util/bundle.mjs';
import { pkg, resolve } from './util/env.mjs';

const source = resolve(pkg.config.schemaSource);
const dest = resolve('./dest/meta-json-schema.json');

const watchPath = resolve('./src');
(async () => {
  console.log(`♻️  Watching for: ${watchPath} ...`);

  // 监测目录及子目录的文件变动
  fs.watch(watchPath, { recursive: true }, async (_type, filename) => {
    const file = path.resolve(watchPath, filename);
    if (fs.existsSync(file)) {
      try {
        console.log(`Changes in: ${file}`);

        // 执行bundle(不压缩、不打印budle成功信息)
        await bundle(source, dest, false, false);
      } catch (error) {
        console.error(`Error watching: ${file}: `, error);
      }
    }
  });
})();
