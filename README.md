## 用法

<details>
<summary>Visual Studio Code中使用</summary>

1. 安装YAML语法支持插件`redhat.vscode-yaml`。
2. 在`.vscode`目录下的`settings.json`文件中（如不存在则手动创建），填入以下内容。其中，key为schema文件的地址，value为路径通配符，可根据自身需要自行修改。
   ```json
   {
     "yaml.schemas": {
       "https://fastly.jsdelivr.net/gh/dongchengjie/airport@main/    meta-json-schema.json": "**/*.yaml"
     }
   }
   ```

</details>
<details>
<summary>Monaco Editor中使用</summary>

1.  安装`monaco-editor`（编辑器）和`monaco-yaml`（YAML支持）。

    ```
    npm install monaco-editor
    npm install monaco-yaml
    ```

2.  如果是vite项目，可通过安装插件简化初始化（其他构建工具如`webpack`请参考[monaco-yaml文档](https://github.com/remcohaszing/monaco-yaml?tab=readme-ov-file#using-monaco-webpack-loader-plugin)）。

    1.  安装`vite-plugin-monaco-editor`。

    ```
    npm install vite-plugin-monaco-editor
    ```

    2.  配置`vite.config.ts`。

    ```javascript
    import { defineConfig } from 'vite';
    import monacoEditor from 'vite-plugin-monaco-editor';
    export default defineConfig({
      plugins: [
        monacoEditor({
          languageWorkers: ['editorWorkerService'],
          customWorkers: [
            {
              label: 'yaml',
              entry: 'monaco-yaml/yaml.worker'
            }
          ]
        })
      ]
    });
    ```

    3.  代码中配置schema

    ```javascript
    import * as monaco from 'monaco-editor';
    import { configureMonacoYaml } from 'monaco-yaml';

    configureMonacoYaml(monaco, {
      validate: true,
      enableSchemaRequest: true,
      schemas: [
        {
          uri: 'https://fastly.jsdelivr.net/gh/dongchengjie/airport@main/meta-json-schema.json',
          fileMatch: ['**/*.clash.yaml']
        }
      ]
    });
    ```

</details>

## 可视化

[meta-json-schema](https://dongchengjie.github.io/meta-json-schema/?schema=https://raw.githubusercontent.com/dongchengjie/airport/main/meta-json-schema.json)可视化

## 语法

<details>
<summary>JSON Schema标准语法</summary>

项目使用的JSON Schema版本为[`draft-07`](https://json-schema.org/draft-07/json-schema-release-notes)，语法请参考[JSON Schema Reference](https://json-schema.org/understanding-json-schema/reference)。

</details>

<details>
<summary>Monaco Editor扩展语法</summary>

> Monaco 编辑器是为 VS Code 提供支持的开源代码编辑器，使用下列属性提供更丰富的`Snippet`支持。

```typescript
interface JSONSchema {
  // 自定义Snippet建议(数组)
  defaultSnippets?: {
    label?: string; // 标题
    description?: string; // 描述
    markdownDescription?: string; // 描述(markdown格式)
    body?: any; // 内容
    bodyText?: string; // 内容文本
  }[];
  errorMessage?: string; // 错误信息
  patternErrorMessage?: string; // 格式错误信息(优先级高于errorMessage)
  deprecationMessage?: string; // 过时错误信息
  enumDescriptions?: string[]; // 枚举描述信息(数组)
  markdownEnumDescriptions?: string[]; // 枚举描述信息(markdown格式)
  markdownDescription?: string; // 描述信息(markdown格式)
  doNotSuggest?: boolean; // 不显示建议
  suggestSortText?: string; // 属性值建议排序符(默认为属性名)
  allowComments?: boolean; // 允许注释
  allowTrailingCommas?: boolean; // 允许尾随逗号
}
```

</details>

### FAQ

### definitions中的`compatible.json`文件的用途是什么？

YAML支持`Folded Style`和`Inline Style`的写法。例如使用`"type": "boolean"`来定义某个属性,那么`'true'`和`'false'`就会提示`Incorrect type. Expected "boolean".`。

因此引入compatible类型,兼容多种风格。由于这种情况多发生于`proxies`配置部分，所以目前仅`proxies`配置中使用了`compatible.json`,其余地方可视情况使用。

Inline Style

```
proxies:
  - {name: 'proxy1', type: 'ss', cipher: 'auto', tls: 'true'}
  - {name: proxy2, type: ss, cipher: auto, tls: true}
```

Folded Style

```
proxies:
- name: 'proxy1'
  type: 'ss'
  cipher: 'auto'
  tls: 'true'
- name: proxy1
  type: ss
  cipher: auto
  tls: true
```
