let setCookie = function(key, value, expiry) {
   
    let dt = new Date();
    dt.setTime(dt.getTime() + (expiry*1000));
    let expires = 'expires='+ dt.toUTCString();
  
    document.cookie = key + '=' + value + ';' + expires + ';path=/';
 
}

let getCookie = function(key) {
    let name = key + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let decodedCookieParts = decodedCookie.split(';');
    
    for(let i = 0; i < decodedCookieParts.length; i++) {
        let c = decodedCookieParts[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }

    return null;
}

let deleteCookie = function(key) {
    setCookie(key, '', 0);
}

export default {
    setCookie,
    getCookie,
    deleteCookie
}