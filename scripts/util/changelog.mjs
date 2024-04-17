import fs from 'fs';
import { resolve } from './env.mjs';
import { writeToFileSync } from './file.mjs';

export const changelogOutput = (version, outputDir) => {
  const markdown = fs.readFileSync(resolve('./CHANGELOG.md'), 'utf8');
  // prettier-ignore
  let changelog = 
    `
    ## ${version}
    
    ### Features
    
    - 日常维护
    
    ### Bugs Fixes
    `;

  if (markdown) {
    // 分割符分割
    const history = markdown.split('---');
    // 寻找对应版本的changelog
    const changelogs = history.filter(content => content.startsWith(`## ${version}`));
    if (changelogs.length > 0) {
      changelog = changelogs[0];
    }
  }

  // 输出changelog
  const output = resolve(outputDir, 'CHANGELOG.md');
  writeToFileSync(output, changelog, true);

  console.log(`📝 Changelog output: ${output}`);
};
