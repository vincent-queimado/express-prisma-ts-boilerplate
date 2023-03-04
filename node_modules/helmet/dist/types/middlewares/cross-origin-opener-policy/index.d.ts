import { IncomingMessage, ServerResponse } from "http"
export interface CrossOriginOpenerPolicyOptions {
	policy?: "same-origin" | "same-origin-allow-popups" | "unsafe-none"
}
declare function crossOriginOpenerPolicy(options?: Readonly<CrossOriginOpenerPolicyOptions>): (_req: IncomingMessage, res: ServerResponse, next: () => void) => void
export default crossOriginOpenerPolicy
