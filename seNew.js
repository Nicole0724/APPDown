var os = {};
var url;

function detectUA(userAgent) {
    os.webkit = userAgent.match(/WebKit[\/]?([\d.]+)/) ? true : false;
    os.android = userAgent.match(/(Android)\s+([\d.]+)/) || userAgent.match(/Silk-Accelerated/) ? true : false;
    os.androidICS = os.android && userAgent.match(/(Android)\s4/) ? true : false;
    os.ipad = userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false;
    os.iphone = !os.ipad && userAgent.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false;
    os.webos = userAgent.match(/(webOS|hpwOS)[\s\/]([\d.]+)/) ? true : false;
    os.touchpad = os.webos && userAgent.match(/TouchPad/) ? true : false;
    os.ios = os.ipad || os.iphone;
    os.playbook = userAgent.match(/PlayBook/) ? true : false;
    os.blackberry10 = userAgent.match(/BB10/) ? true : false;
    os.blackberry = os.playbook || os.blackberry10 || userAgent.match(/BlackBerry/) ? true : false;
    os.chrome = userAgent.match(/Chrome/) ? true : false;
    os.opera = userAgent.match(/Opera/) ? true : false;
    os.fennec = userAgent.match(/fennec/i) ? true : userAgent.match(/Firefox/) ? true : false;
    os.ie = userAgent.match(/MSIE 10.0/i) || userAgent.match(/Trident\/7/i) ? true : false;
    os.ieTouch = os.ie && userAgent.toLowerCase().match(/touch/i) ? true : false;
    os.tizen = userAgent.match(/Tizen/i) ? true : false;
    os.supportsTouch = ((window.DocumentTouch && document instanceof window.DocumentTouch) || "ontouchstart" in window);
    os.kindle = userAgent.match(/Silk-Accelerated/) ? true : false;
    if (os.android && !os.webkit)
        os.android = false;
    os.qq = userAgent.match(/MicroMessenger/) ? true : false;
}

detectUA(navigator.userAgent);
// url = "http://" + window.location.host;
// console.log(url);
if (os.ios) {
    /*ios 下载链接*/
    // url = "https://itunes.apple.com/us/app/id1232989165?mt=8";
    // location.href = url;
} else if (os.android) {
    url = "http://120.76.191.33/download/torch.apk";
} else {
    url = null;
}
if (url && url.length > 5 && !os.qq) {
    location.href = url;
}

var el_bodyHeight = document.getElementById('bodyHeight');
var el_uiMask = document.getElementById('uiMask');
var offestHeight = document.documentElement.clientHeight;
el_uiMask.style.height = offestHeight + 'px';
var is_weixin = (function () {
    return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
})();
if (is_weixin) {
    el_uiMask.style.display = "block";
} else {
    el_uiMask.style.display = "none";
}
if (offestHeight >= 568) {
    el_bodyHeight.style.height = offestHeight + 'px';
} else {
    el_bodyHeight.style.height = '568px';
}
var divDownload = document.getElementById("divDownload"),
    android = document.getElementById("android"),
    ios = document.getElementById("ios");
if (os.android) {
    android.style.display = "block";
    divDownload.innerHTML = "<a href=" + url + ">立即下载体验</a>";
} else if (os.ios) {
    ios.style.display = "block";
    // divDownload.innerHTML = "<a href=" + url + ">立即下载体验</a>";
    divDownload.innerHTML = "暂无APP,研发人员正在加紧上线中...";
//        divDownload.innerHTML = "<a href='itms-services://?action=download-manifest&url=/AppDownload/download.plist'>立即下载体验</a>";
}