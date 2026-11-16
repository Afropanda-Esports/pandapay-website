import type { Consent } from "./consent";

/** Events PostHog may send before a choice or after Decline: anonymous, cookieless visit counts only. */
const COOKIELESS_EVENTS = new Set(["$pageview", "$pageleave"]);

export function allowEvent(event: string, consent: Consent): boolean {
  return consent === "granted" || COOKIELESS_EVENTS.has(event);
}

type CaptureResult = { event: string } & Record<string, unknown>;

/**
 * PostHog init options.
 * cookieless_mode "on_reject" + opt_out_capturing_by_default: no cookies or browser storage until
 * opt_in_capturing(); before a choice and after Decline, visitors are counted with a hash computed on
 * PostHog's servers. Requires "cookieless tracking" enabled in the
 * PostHog project (Settings → Project → Web analytics), otherwise cookieless events are dropped.
 */
export function posthogConfig(apiHost: string, consent: () => Consent) {
  return {
    api_host: apiHost,
    defaults: "2025-11-30",
    cookieless_mode: "on_reject" as const,
    // Required for pre-choice counting: with "on_reject" alone, consent stays "pending" and the SDK
    // sends nothing until Accept/Decline. Opting out by default makes pending visits cookieless.
    opt_out_capturing_by_default: true,
    person_profiles: "identified_only" as const,
    autocapture: false,
    disable_session_recording: true,
    capture_exceptions: false,
    before_send: <T extends CaptureResult>(event: T | null): T | null =>
      event && allowEvent(event.event, consent()) ? event : null,
  };
}

export interface PostHogClient {
  init: (key: string, config: ReturnType<typeof posthogConfig>) => void;
  capture: (event: string, properties?: Record<string, unknown>) => void;
  opt_in_capturing: () => void;
  opt_out_capturing: () => void;
}

/**
 * PostHog's official loader stub: defines window.posthog immediately (calls are queued) and loads
 * the SDK from `${api_host}/static/array.js` asynchronously. No npm dependency or bundle cost.
 */
export function installPostHogStub(): PostHogClient {
  /* eslint-disable */
  // prettier-ignore
  (function(t:any,e:any){var o:any,n:any,p:any,r:any;e.__SV||((window as any).posthog=e,e._i=[],e.init=function(i:any,s:any,a:any){function g(t:any,e:any){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],Object.defineProperty(u,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(t:any){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e}}),Object.defineProperty(u.people,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(){return u.toString(1)+".people (stub)"}}),o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)})(document,(window as any).posthog||[]);
  /* eslint-enable */
  return (window as any).posthog as PostHogClient;
}
