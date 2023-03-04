import { IncomingMessage, ServerResponse } from "http"
export interface XFrameOptionsOptions {
	action?: "deny" | "sameorigin"
}
declare function xFrameOptions(options?: Readonly<XFrameOptionsOptions>): (_req: IncomingMessage, res: ServerResponse, next: () => void) => void
export default xFrameOptions
