import bundle from './util/bundle.mjs';
import { pkg, resolve } from './util/env.mjs';

(async () => {
  // 读取release配置
  const releases = pkg.config.releases;
  for (let release of releases) {
    if (release.enabled) {
      const source = resolve(release.source);
      const target = resolve(release.target);
      const optimization = release.optimization;
      // 执行bundle
      await bundle(source, target, optimization, true);
    }
  }
})();
