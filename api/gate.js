export default function handler(req, res) {
  const { authorization } = req.headers;
  const [user, pass] = Buffer.from((authorization || '').replace('Basic ', ''), 'base64').toString().split(':');
  if (user === 'storyhub' && pass === 'ensemble') {
    res.setHeader('Set-Cookie', 'sh_auth=1; Path=/; Max-Age=86400; HttpOnly; SameSite=Lax');
    res.writeHead(302, { Location: '/' });
    return res.end();
  }
  res.setHeader('WWW-Authenticate', 'Basic realm="StoryHub"');
  res.status(401).send('Unauthorized');
}
