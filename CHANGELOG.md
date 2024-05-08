## v1.18.4-beta3

### Changes

- 新增: `dns` 新增配置项 `use-system-hosts`
- 调整: 调整部分配置描述
- 移除: Clash Verge Merge 配置移除`prepend-rule-providers`、`prepend-proxy-providers`、`append-rule-providers`、`append-proxy-providers`

### Bugs Fixes

- 修复: cipher 缺少 `none`
- 修复: `default-nameserver`类型错误

---

## v1.18.4

### Changes

- 新增: `proxy-providers` 新增配置项 `header`
- 调整: `proxy-providers`,`proxy-group` 配置项 `health-check`的`interval` 和 `timeout` 属性类型变更(`integer` --> `string`), 支持配置时间单位
- 新增: 新增配置项`external-controller-unix`,允许使用Unix Socket访问API

### Bugs Fixes

- 字符串数组类型错误
- 监听地址支持`:port`
- sniffer的http ports类型错误

---

## v1.18.3

### Features

- 首个JSON Schema版本

### Bugs Fixes

---
