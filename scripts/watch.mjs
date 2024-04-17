import fs from 'fs';
import path from 'path';
import bundle from './util/bundle.mjs';
import { pkg, resolve } from './util/env.mjs';

const watchPath = resolve('./src');
(async () => {
  console.log(`♻️  Watching for: ${watchPath} ...`);

  for (let source of pkg.config.watches) {
    const target = resolve(`./.temp/${source.substr(source.lastIndexOf('/') + 1)}`);

    // 监测目录及子目录的文件变动
    fs.watch(watchPath, { recursive: true }, async (_type, filename) => {
      const file = path.resolve(watchPath, filename);
      if (fs.existsSync(file)) {
        try {
          console.log(`Changes in: ${file}`);

          // 执行bundle
          await bundle(source, target, false, false);
        } catch (error) {
          console.error(`Error watching: ${file}: `, error);
        }
      }
    });
  }
})();
