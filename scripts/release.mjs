import bundle from './util/bundle.mjs';
import { pkg, resolve } from './util/env.mjs';
import { changelogOutput } from './util/changelog.mjs';

(async () => {
  // schema文件输入路径
  const source = resolve(pkg.config.schemaSource);
  // 最新版本文件输出路径
  const latestOutputPath = resolve(pkg.config.archiveDir, 'meta-json-schema.json');
  // 历史版本文件输出路径
  const version = (process.env['SCHEMA_VERSION'] || process.env['VERSION'] || pkg.version).trim();
  const historyOutputPath = resolve(pkg.config.archiveDir, version, 'meta-json-schema.json');

  // 打包文件(根据配置决定是否压缩、打印budle成功信息)
  const optimization = process.env['OPTIMIZATION'] || pkg.config.optimization;
  await bundle(source, latestOutputPath, optimization, true);
  await bundle(source, historyOutputPath, optimization, true);

  // 输出changelog
  changelogOutput(version, resolve(pkg.config.archiveDir, version));
})();
