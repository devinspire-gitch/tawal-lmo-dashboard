import { ExtendedStaticPersistedModel } from "../types-and-interfaces/ExtendedPersistedModel";
import { NextFunction } from "express";

interface ModelObserveContext {
  Model: {
    definition: {
      rawProperties: {
        [key: string]: { type: string; postgresql: { dataType: string } };
      };
    };
  };
  data: { [key: string]: string | number };
  instance: { data: { [key: string]: string | number } };
}

export default (Model: ExtendedStaticPersistedModel): void => {
  Model.observe(
    "loaded",
    (ctx: ModelObserveContext, next: NextFunction): void => {
      // Get the original properties configuration for this model
      const { rawProperties } = ctx.Model.definition;
      const propertiesArray = Object.keys(rawProperties);

      // Filter only the numeric types specified for PostgreSQL
      const numericProps = propertiesArray.filter(
        (prop): boolean =>
          rawProperties[prop].type === "number" &&
          rawProperties[prop].postgresql &&
          rawProperties[prop].postgresql.dataType === "numeric"
      );

      // Modify the numeric fields in our instance
      if (ctx.data) {
        numericProps.forEach((prop): void => {
          ctx.data[prop] = Number(ctx.data[prop]);
        });
      } else if (ctx.instance) {
        numericProps.forEach((prop): void => {
          ctx.instance.data[prop] = Number(ctx.instance.data[prop]);
        });
      }

      // Next callback in the stack.
      next();
    }
  );
};
