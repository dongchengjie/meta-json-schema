## v1.19.13

### Changes

- 新增: vless 新增 `encryption` 配置项（vless encryption 客户端配置）
- 新增: listener vless 新增 `encryption` 配置项（vless encryption 服务端配置）
- 新增: mieru 新增 `handshake-mode` 配置项（握手模式）
- 新增: wireguard 新增 `i1`、`i2`、`i3`、`i4`、`i5`、`j1`、`j2`、`j3`、`itime` 配置项（AmneziaWG v1.5）

---

## v1.19.12

### Changes

- 新增: 规则 新增 `DOMAIN-WILDCARD` 规则的支持（匹配域名通配符）
- 新增: TUN 新增 Darwin 平台特殊配置 `recvmsgx` 和 `sendmsgx`
- 新增: DNS 新增 配置项 `cache-max-size` （最大缓存大小）

---

## v1.19.11

### Changes

- 新增: TUN 新增 `loopback-address` 配置项

### Bugs Fixes

- 修复: `sniffer` 配置的 `force-domain` 配置项不支持 `geosite:` 和 `rule-set:`

---

## v1.19.10

### Changes

- 调整: 路由规则的参数部分（no-resolve、src），其前后支持任意个数的空格
- 调整: IPv6 支持 `IPv4-mapped IPv6` 格式

### Bugs Fixes

- 修复: `external-controller-cors` 配置的 `allow-origins` 配置项误写成 `allow-origin`
- 修复: TUN 配置项 `inet4-address`、`inet6-address` 类型错误（应为 CIDR 数组）

---

## v1.19.9

### Changes

- 新增: reality 新增 `support-x25519mlkem768` 配置项
- 新增: anytls/shadowsocks/trojan/vmess/vless/hysteria/hysteria2/tuic 协议 新增 `ech-opts` 配置项
- 新增: listener anytls/http/hysteria2/mixed/socks/trojan/tuic/vless/vmess 新增 `ech-key` 配置项
- 新增: tls(external-controller-tls) 新增 `ech-key` 配置项

---

## v1.19.6

### Changes

- 新增: `shadowsocks` 的 `shadow-tls` 插件 新增 `alpn` 配置项
- 新增: listener `shadowsocks` 新增 `shadow-tls` 配置项
- 移除: 代理组移除 `routing-mark` 、`interface-name` 配置项

### Bugs Fixes

- 修复: 域名正则松散，支持单段/自定义域名，如：localhost、internal 等

---

## v1.19.5

### Changes

- 新增: TUN 新增 `exclude-src-port`、`exclude-src-port-range`、`exclude-dst-port`、`exclude-dst-port-range` 配置项

---

## v1.19.4

### Changes

- 新增: ss 协议 新增 `gost-plugin` 插件支持
- 新增: mieru 协议 新增 `udp` 支持

### Bugs Fixes

- 修复: 代理组类型配置项 `type` 枚举重复显示

---

## v1.19.3

### Changes

- 调整: `external-ui-url` 补充说明支持的压缩包格式
- 新增: proxy 新增 `anytls` 协议
- 新增: inbound 新增 anytls、trojan `listeners` 配置项
- 新增: inbound（trojan、vless、vmess） 部分新增 `grpc-service-name` 配置项
- 调整: inbound 端口支持使用 ports 格式
- 调整: inbound （socks5、http、mixed）支持 tls 配置

### Bugs Fixes

- 修复: inbound （socks5、http、mixed）缺失 `reality-config` 配置项

---

## v1.19.2

### Changes

- 新增: hy2 新增 `initial-stream-receive-window`、`max-stream-receive-window`、`initial-connection-receive-window`、`max-connection-receive-window` quic-go 配置项
- 新增: inbound 新增 vless `listeners` 配置项

### Bugs Fixes

- 修复: 枚举 `cipher` 缺失加密方法 `2022-blake3-aes-128-ccm`、`2022-blake3-aes-256-ccm`、`2022-blake3-chacha8-poly1305`、`chacha20-poly1305`、`chacha8-ietf-poly1305`、`xchacha8-ietf-poly1305`、`zero`

---

## v1.19.1

### Changes

- 新增: rule-providers 新增 `inline` 内联规则配置
- 新增: proxy-providers 新增 `inline` 内联 proxies 配置
- 调整: outbound 的 `header` 配置项宽松，不再限制 value 的类型为 string

### Bugs Fixes

- 修复: `tuic` V4 的 `token` 配置项类型错误

---

## v1.19.0

### Changes

- 新增: proxy-provider 新增 `size-limit` 配置项
- 新增: proxy 新增 `mieru` 协议

---

## v1.18.10

### Changes

- 新增: DNS 新增 `direct-nameserver`、`direct-nameserver-follow-policy` 配置项

### Bugs Fixes

- 修复: `skip-auth-prefixes`、`lan-allowed-ips`、`lan-disallowed-ips` 类型错误

---

## v1.18.9

### Changes

- 新增: 全局配置新增 `etag-support` 开关
- 新增: 外部控制器 新增 `external-controller-pipe` 配置项，支持从 Windows namedpipe 访问 API
- 新增: 外部控制器 新增 `external-controller-cors` 配置跨域响应头
- 新增: proxy-provider 的 `override` 配置项新增 `proxy-name` 配置项，支持正则替换代理名称
- 新增: `wireguard` 新增 `amnezia-wg-option` 配置项

---

## v1.18.8

### Changes

- 新增: 添加对 [clash-nyanpasu](https://github.com/libnyanpasu/clash-nyanpasu) Merge Schema 的支持 [#1](https://github.com/dongchengjie/meta-json-schema/pull/1)
- 新增: `http`、`socks`、`mixed` 入站配置 新增 `users` 认证配置项
- 新增: `sniff` 新增 `skip-src-address`、`skip-dst-address` 配置项
- 新增: `dns` 新增 `fake-ip-filter-mode` 配置项
- 调整: 规则 `GEOIP`、`IP-ASN`、`IP-CIDR`、`IP-CIDR6`、`IP-SUFFIX`、`RULE-SET` 支持追加 `,src` 选项

---

## v1.18.7

### Changes

- 调整: `tun` 配置项 `route-exclude-address` 描述
- 调整: 支持部分 `chacha8` 加密方法
- 新增: 全局配置新增 `external-doh-server`，支持配置提供本地 DOH 服务
- 新增: 规则集新增 `mrs` 格式
- 新增: 全局配置新增 `keep-alive-idle` 和 `disable-keep-alive` 保持连接相关配置
- 移除: 不再支持 `ebpf` 配置

---

## v1.18.6

### Changes

- 新增: `trojan`出站配置 新增配置项 `ss-opts` 以支持 Shadowsocks AEAD 加密
- 新增: `dns` 新增配置项 `respect-rules`
- 新增: `wireguard` 配置项 `refresh-server-ip-interval`
- 调整: `rules` 正则表达式
- 新增: `proxy-provider` 新增覆写配置项 `tfo`、`mptcp`、`udp-over-tcp`
- 调整: `tun` 弃用配置项 `inet4-route-address`、`inet6-route-address`、`inet4-route-exclude-address`、`inet6-route-exclude-address`，使用 `route-address`、`route-exclude-address` 代替
- 调整: `tun` 配置项 `table-index` 重命名为 `iproute2-table-index`
- 新增: `tun` 新增配置项 `iproute2-rule-index`、`auto-redirect`、`auto-redirect-input-mark`、`auto-redirect-output-mark`、`route-address-set`、`route-exclude-address-set`

### Bugs Fixes

- 修复: `bind-address` 类型错误
- 修复: 字符串数组提示错误
- 修复: `route-address` 和 `route-exclude-address` 格式错误

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
- 修复: `nameserver-policy` 不支持配置单个 DNS 服务器字符串
- 修复: 域名通配格式错误

---

## v1.18.4

### Changes

- 新增: `proxy-providers` 新增配置项 `header`
- 调整: `proxy-providers`,`proxy-group` 配置项 `health-check`的`interval` 和 `timeout` 属性类型变更(`integer` --> `string`), 支持配置时间单位
- 新增: 新增配置项`external-controller-unix`,允许使用 Unix Socket 访问 API

### Bugs Fixes

- 字符串数组类型错误
- 监听地址支持`:port`
- sniffer 的 http ports 类型错误

---

## v1.18.3

### Features

- 首个 JSON Schema 版本

---
