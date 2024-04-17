import $RefParser from '@apidevtools/json-schema-ref-parser';
import prettier from 'prettier';
import { writeToFileSync } from './file.mjs';

const print = (message, verbose) => {
  if (verbose) console.log(message);
};

// 处理间接引用(引用的内容是另一个内容的引用)
// 间接引用虽然语法正确,但可能会无法被某些解析器正确解析
const handleIndirectReference = async jsonObject => {
  // 先进行格式化,防止出错
  let formatted = await format(JSON.stringify(jsonObject));
  // 获取所有引用
  let references = allReferences(formatted);
  // 找出间接引用
  let indirectReferences;
  while ((indirectReferences = references.map(ref => indirectReference(jsonObject, ref)).filter(Boolean)).length > 0) {
    // 替换间接引用为目标引用
    indirectReferences.forEach(reference => {
      formatted = formatted.replaceAll(reference.path, reference.target);
      jsonObject = JSON.parse(formatted);
      references = allReferences(formatted);
    });
  }
  return formatted;
};

// 获取所有引用
const allReferences = formatted => {
  let references = [];
  const regex = /"\$ref": "(.*)"/gm;
  let matcher;
  while ((matcher = regex.exec(formatted)) !== null) {
    regex.lastIndex += matcher.index === regex.lastIndex ? 1 : 0;
    references.push(matcher[1]);
  }
  return [...new Set(references)];
};

// 获取间接引用
const indirectReference = (jsonObject, ref) => {
  const nodes = ref?.replace('#/', '')?.split('/');
  let path = '#';
  let current = jsonObject;
  let next;
  if (nodes.length > 0) {
    for (let node of nodes) {
      if (!(next = current[node])) break;
      path = `${path}/${node}`;
      current = next;
      if (typeof next === 'object' && next['$ref'] && Object.keys(next).length === 1) {
        return {
          path: path,
          target: next['$ref']
        };
      }
    }
  }
};

const format = async json => {
  // 格式化json内容
  const options = {
    parser: 'json',
    quoteProps: 'as-needed', // 添加引号包裹
    singleQuote: false, //使用单引号
    trailingComma: 'all', // 添加尾随逗号
    bracketSpacing: false, // 添加对象{}之间空格
    proseWrap: 'preserve', // 换行行为
    endOfLine: 'lf', // 换行符
    embeddedLanguageFormatting: 'auto' // 格式化内容中的代码
  };
  return await prettier.format(json, options).then(formatted => formatted);
};

export default async function (input, output, optimization, verbose) {
  // bundle文件片段
  print(`📦 Bundling...(${input})`, verbose);
  await $RefParser.bundle(input).then(async jsonObject => {
    // 间接引用解引用,提高兼容性()
    let dereferred = await handleIndirectReference(jsonObject);

    // 格式化 / 最小化(约缩减40%)
    const schema = optimization ? JSON.stringify(JSON.parse(dereferred)) : (dereferred = await format(dereferred));

    // 输出内容
    writeToFileSync(output, schema, true);
    print(`💾 Saving to: ${output}`, verbose);
  });
}
