import STATUS from "http-status";
import { SETTING_TYPE } from "common/constants";
import { LoopbackError } from "../classes/LoopbackError";
import {
  ExtendedPersistedModel,
  ExtendedStaticPersistedModel
} from "../types-and-interfaces/ExtendedPersistedModel";

/** Represents a setting for the system. */
export interface Setting extends ExtendedPersistedModel {
  id: number;
  name: string;
  value: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

/** Represents a setting for the system. */
export interface SettingModel extends ExtendedStaticPersistedModel {
  getValueById<T extends number | string | number[] | string[] | JSON>(
    id: number
  ): Promise<T>;
}

/**
 * Checks if the setting value is a positive number. If not, fails the validation.
 * The validator function must be declared as local function, not as a variable arrow function.
 */
function checkIfNumericValueIsPositive(err: () => void): void {
  const setting: Setting = this;

  if (setting.type !== SETTING_TYPE.NUMERIC) return;

  const settingValueAsNumber = Number(setting.value);

  if (!isNaN(settingValueAsNumber) && settingValueAsNumber < 0) err();
}

/**
 * Checks if the setting value have a valid JSON structure. If not, fails the validation.
 * The validator function must be declared as local function, not as a variable arrow function.
 */
function checkIfJSONValueIsValid(err: () => void): void {
  const setting: Setting = this;

  if (setting.type !== SETTING_TYPE.JSON) return;

  try {
    JSON.parse(setting.value);
  } catch (e) {
    err();
  }
}

export default (Model: SettingModel): void => {
  Model.validate("value", checkIfNumericValueIsPositive, {
    message: "needs to be positive"
  });

  Model.validate("value", checkIfJSONValueIsValid, {
    message: "needs to be a valid JSON structure"
  });

  Model.observe(
    "before save",
    async (ctx): Promise<void> => {
      const contextModel: Setting = ctx.instance || ctx.data;

      // Defines the default setting type as numeric
      if (!contextModel.type) contextModel.type = SETTING_TYPE.NUMERIC;
    }
  );

  Model.getValueById = async <
    T extends number | string | number[] | string[] | JSON
  >(
    id: number
  ): Promise<T> => {
    const setting: Setting = await Model.findById(id);
    if (!setting) {
      const error = new LoopbackError();
      error.status = STATUS.NOT_FOUND;
      error.name = "SETTING_NOT_FOUND";
      error.message = "No setting were found with this id.";
      throw error;
    }

    switch (setting.type) {
      case SETTING_TYPE.NUMERIC:
        return Number(setting.value) as T;

      case SETTING_TYPE.JSON:
        return JSON.parse(setting.value) as T;

      case SETTING_TYPE.STRING:
      default:
        return setting.value as T;
    }
  };
};
