import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './lang/en-US.json';
import zh from './lang/zh-CH.json';
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    .init({
        // the translations
        // (tip move them in a JSON file and import them)
        resources: {
            en,
            zh
        },
        lng: window.navigator.language,
        fallbackLng: 'zh',

        interpolation: {
            escapeValue: false
        }
    });
export default i18n;
