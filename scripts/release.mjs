import bundle from "./util/bundle.mjs";
import { pkg, resolve } from "./util/env.mjs";
import { writeToFileSync } from "./util/file.mjs";
import fs from "fs";

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

  // 提取CHANGELOG
  const changelogs = fs.readFileSync(resolve("CHANGELOG.md"), "utf8");
  writeToFileSync(
    resolve("CHANGELOG"),
    changelogs
      .split("---")
      .map(log => log.trim())
      .filter(log => log.startsWith(`## v${pkg.version}`))
      .filter(Boolean)?.[0] ?? ""
  );
})();
