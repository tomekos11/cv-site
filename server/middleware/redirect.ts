export default defineEventHandler((event) => {
  const req = event.node.req;
  const host = req.headers.host || '';
  const proto = req.headers['x-forwarded-proto'];
  
  if (proto === 'http' && host === 'tomasz-slapinski.pl') {
    const url = `https://cv.tomasz-slapinski.pl${req.url}`;
    setResponseStatus(event, 301);
    sendRedirect(event, url, 301);
  }
});