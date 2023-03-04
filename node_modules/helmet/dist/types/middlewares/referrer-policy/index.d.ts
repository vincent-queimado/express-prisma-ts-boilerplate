import { IncomingMessage, ServerResponse } from "http"
declare type ReferrerPolicyToken = "no-referrer" | "no-referrer-when-downgrade" | "same-origin" | "origin" | "strict-origin" | "origin-when-cross-origin" | "strict-origin-when-cross-origin" | "unsafe-url" | ""
export interface ReferrerPolicyOptions {
	policy?: ReferrerPolicyToken | ReferrerPolicyToken[]
}
declare function referrerPolicy(options?: Readonly<ReferrerPolicyOptions>): (_req: IncomingMessage, res: ServerResponse, next: () => void) => void
export default referrerPolicy
