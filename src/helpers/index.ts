

import cookie from 'js-cookie';
import { User } from '../../types/request';

// set in cookie
export const setCookie = (key:string, value:string) => {
    if (typeof window !== 'undefined') {
        cookie.set(key, value, {
            expires: 1
        });
    }
};
// remove from cookie
export const removeCookie = (key:string) => {
    if (typeof window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        });
    }
};
// get from cookie such as stored token
// will be useful when we need to make request to server with token
export const getCookie = (key:string) => {
    if (typeof window !== 'undefined') {
        return cookie.get(key);
    }
};
// set in localstorage
export const setLocalStorage = (key:string, value:User) => {
    if (typeof window !== 'undefined') {
    
        window.localStorage.setItem(key, JSON.stringify(value));
    }
};
// remove from localstorage
export const removeLocalStorage = (key:string) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
};
// authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response: User) => {
    console.log('meotod autenticate',response)
    setLocalStorage('user', response);
    
};
// access user info from localstorage
export const isAuth = () => {
    if (typeof window !== 'undefined') {
        const cookieChecked = getCookie('jwt');
        const localStorageChecked =  localStorage.getItem('user')
        console.log('existe o noo',localStorageChecked)
        if (cookieChecked && localStorageChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user') || "");
            } else {
                return false;
            }
        }else{
            return false
        }
    }
};

export const signout = ():void => {
    removeCookie('token');
    removeLocalStorage('user');

};

