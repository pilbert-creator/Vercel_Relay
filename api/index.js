export const config = { runtime: "edge" };

const _0x9f8a2c1d = (() => {
  const _0x1a2b3c4d = "TARGET_DOMAIN";
  let _0x5e6f7g8h = process.env[_0x1a2b3c4d] || "";
  const _0x9i0j1k2l = /\/$/;
  return _0x5e6f7g8h.replace(_0x9i0j1k2l, "");
})();

const _0x3m4n5o6p = new Set([
  "host","connection","keep-alive","proxy-authenticate","proxy-authorization",
  "te","trailer","transfer-encoding","upgrade","forwarded",
  "x-forwarded-host","x-forwarded-proto","x-forwarded-port"
]);

const _0x7q8r9s0t = (s) => {
  const junk = Math.random() * 0x100 | 0;
  return s.split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ junk)).join('');
};

const _0xu1v2w3x = _0x7q8r9s0t("x-vercel-");
const _0x4y5z6a7b = "x-real-ip";
const _0x8c9d0e1f = "x-forwarded-for";

export default async function _0xhandler(_0xreq) {
  const _0x9g0h1i2j = _0x9f8a2c1d;
  
  if (!_0x9g0h1i2j) {
    return new Response("Misconfigured: TARGET_DOMAIN is not set", { status: 500 });
  }

  try {
    const _0xk3l4m5n = _0xreq.url.indexOf("/", 8);
    const _0x6o7p8q9r = _0xk3l4m5n === -1 
      ? _0x9g0h1i2j + "/" 
      : _0x9g0h1i2j + _0xreq.url.slice(_0xk3l4m5n);

    const _0xs0t1u2v = new Headers();
    let _0x3w4x5y6z = null;

    for (const [_0x7a8b9c0d, _0xe1f2g3h4] of _0xreq.headers) {
      if (_0x3m4n5o6p.has(_0x7a8b9c0d)) continue;
      
      if (_0x7a8b9c0d.startsWith(_0x7q8r9s0t("x-vercel-").replace(/./g, (c,i) => 
        String.fromCharCode(c.charCodeAt(0) ^ (i % 7))))) continue;
      
      if (_0x7a8b9c0d === _0x4y5z6a7b) {
        _0x3w4x5y6z = _0xe1f2g3h4;
        continue;
      }
      
      if (_0x7a8b9c0d === _0x8c9d0e1f) {
        if (!_0x3w4x5y6z) _0x3w4x5y6z = _0xe1f2g3h4;
        continue;
      }
      
      _0xs0t1u2v.set(_0x7a8b9c0d, _0xe1f2g3h4);
    }

    if (_0x3w4x5y6z) _0xs0t1u2v.set(_0x8c9d0e1f, _0x3w4x5y6z);

    const _0x9i0j1k2l = _0xreq.method;
    const _0x3m4n5o6p = _0x9i0j1k2l !== "GET" && _0x9i0j1k2l !== "HEAD";

    const _0xoptions = {
      method: _0x9i0j1k2l,
      headers: _0xs0t1u2v,
      body: _0x3m4n5o6p ? _0xreq.body : undefined,
      duplex: "half",
      redirect: "manual"
    };

    // junk noise
    const _0xjunk = Date.now() & 0xff;
    if (_0xjunk === 0xdeadbeef % 0xff) {} // dead branch

    return await fetch(_0x6o7p8q9r, _0xoptions);

  } catch (_0xerr) {
    console.error(_0x7q8r9s0t("relay error:"), _0xerr);
    return new Response("Bad Gateway: Tunnel Failed", { status: 502 });
  }
}
