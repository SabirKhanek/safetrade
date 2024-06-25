"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = exports.Cookies = void 0;
var Cookies;
(function (Cookies) {
    Cookies["SystemAuthCookie"] = "sts_at";
    Cookies["UserAuthCookie"] = "stu_at";
    Cookies["UserState"] = "stu_st";
})(Cookies || (exports.Cookies = Cookies = {}));
var LocalStorage;
(function (LocalStorage) {
    LocalStorage["UserState"] = "itu_st";
    LocalStorage["SystemUserState"] = "itu_st";
    LocalStorage["ThemeVar"] = "itsour-theme";
})(LocalStorage || (exports.LocalStorage = LocalStorage = {}));
