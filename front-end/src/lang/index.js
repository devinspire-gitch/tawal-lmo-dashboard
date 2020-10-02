import { addLocaleData } from "react-intl";
import enLang from "./entries/en-US";
import arLang from "./entries/ar-SA";

const AppLocale = {
  en: enLang,
  ar: arLang
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.ar.data);

export default AppLocale;
