export default defineNuxtRouteMiddleware((to) => {
  const localePath = useLocalePath();
  const cookieLang = useCookie('i18n_redirected');
  
  if (!to.params.locale && cookieLang.value) {
    return navigateTo(localePath(cookieLang.value), { replace: true });
  }
});