import getValue from "get-value";
import { ExtendedLoopbackApplication } from "../types-and-interfaces/ExtendedLoopBackApplication";

export default (app: ExtendedLoopbackApplication): void => {
  const Role = app.models.Role;

  Role.registerResolver("channel", function(
    role,
    context,
    cb
  ): Promise<boolean> | void {
    const channelId = getValue(context, "accessToken.channelId");
    return process.nextTick((): void => cb(null, !!channelId));
  });
};
