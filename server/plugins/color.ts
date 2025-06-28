export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', (response, { event }) => {
    const req = event.node?.req;
    const cookies = req?.headers?.cookie || '';
    
    // Funkcja do parsowania ciasteczek
    const parseCookies = (cookieString: string) => {
      return Object.fromEntries(
        cookieString.split(';').map(c => {
          const [key, value] = c.trim().split('=');
          return [key, value];
        })
      );
    };
    
    const cookieData = parseCookies(cookies);
    const darkMode = cookieData['nuxt-color-mode'] === 'dark';

    if(darkMode && typeof response.body === 'string' && response.body.includes('body--light')){
      response.body = response.body.replace(/body--light/g, 'body--dark');
    }

  });
});