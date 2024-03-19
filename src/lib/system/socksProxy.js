import { SocksProxyAgent } from "socks-proxy-agent";

function optionProxy(proxy) {
    if (proxy.socks === 5) {
        return `socks5://${encodeURIComponent(proxy.username)}:${encodeURIComponent(proxy.password)}@${proxy.host}:${proxy.port}`
    } else if (proxy.socks === 4) {
        return `socks4://${encodeURIComponent(proxy.username)}@${proxy.host}:${proxy.port}`
    }
}

export function socksProxy(proxy, url) {
    if (proxy.active) {
        const socks = optionProxy(proxy);
        const httpAgent = new SocksProxyAgent(socks);
        return {
            baseURL: url,
            httpsAgent: httpAgent
        }

    } else {
        return {
            baseURL: url
        }
    }
}