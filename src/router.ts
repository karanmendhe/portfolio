/**
 * Minimal history-sync helper.
 *
 * This app has no routing library — "pages" (project case study, blog,
 * blog category, blog post) are just React state toggles. That meant the
 * browser's native Back button had nothing to go back *to* inside the
 * site, so it exited the site entirely instead of returning to the
 * previous internal view.
 *
 * navigate() pushes a real history entry whenever the user moves forward
 * into a project/blog/category/post view, and goBack() is what every
 * in-app "Back" button should call so it consumes that entry the same
 * way the native Back gesture does. Components stay the source of truth
 * for what to *render*; this only keeps the browser's history in sync
 * with that.
 */

/** Navigate forward to `path`, pushing a new history entry. */
export function navigate(path: string): void {
  if (window.location.pathname === path) return;
  window.history.pushState({}, '', path);
  // pushState does not fire 'popstate' on its own, so notify listeners
  // manually — this lets every route-parsing effect (App.tsx, Blog.tsx)
  // react to a programmatic navigate() exactly the way it reacts to a
  // real back/forward navigation.
  window.dispatchEvent(new PopStateEvent('popstate'));
}

/** Go back one step, same as the native Back button/gesture. */
export function goBack(): void {
  window.history.back();
}

/** Subscribe to route changes (native back/forward + programmatic navigate()). */
export function onRouteChange(handler: () => void): () => void {
  window.addEventListener('popstate', handler);
  return () => window.removeEventListener('popstate', handler);
}