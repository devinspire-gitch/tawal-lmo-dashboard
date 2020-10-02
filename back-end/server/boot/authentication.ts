import { ExtendedLoopbackApplication } from "../types-and-interfaces/ExtendedLoopBackApplication";

export default function enableAuthentication(
  app: ExtendedLoopbackApplication
): void {
  app.enableAuth();
}
