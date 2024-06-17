## v1.18.6

### Changes

- 新增: `trojan`出站配置 新增配置项 `ss-opts` 以支持 Shadowsocks AEAD加密
- 新增: `dns` 新增配置项 `respect-rules`
- 新增: `wireguard` 配置项 `refresh-server-ip-interval`
- 调整: `rules` 正则表达式
- 新增: `proxy-provider` 新增覆写配置项 `tfo`、`mptcp`、`udp-over-tcp`

### Bugs Fixes

- 修复: `bind-address` 类型错误
- 修复: 字符串数组提示错误

---

## v1.18.5

### Changes

- 新增: `dns` 新增配置项 `use-system-hosts`
- 调整: 调整部分配置描述
- 移除: Clash Verge Merge 配置移除`prepend-rule-providers`、`prepend-proxy-providers`、`append-rule-providers`、`append-proxy-providers`
- 新增: `sniffer` 未配置 `sniff` 警告
- 新增: `vless` 使用旧版 `XTLS` 协议警告
- 新增: `rules` 新增规则 `PROCESS-NAME-REGEX` 、 `PROCESS-PATH-REGEX`

### Bugs Fixes

- 修复: cipher 缺少 `none`
- 修复: `default-nameserver`类型错误
- 修复: `nameserver-policy` 不支持配置单个DNS服务器字符串
- 修复: 域名通配格式错误

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
