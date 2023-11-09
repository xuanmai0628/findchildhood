(function (doc, win) {
    var width = 1624;
    var height = 750;
    var rootValue = 100; // 此处值与postcss配置中'postcss-pxtorem'的值一样

    var rszEvt = "orientationchange" in window ? "orientationchange" : "resize";
    var reCalc = (function () {
        var reCalc = function () {
            var docEl = doc.documentElement;
            var winWidth = docEl.clientWidth;
            var winHeight = docEl.clientHeight;
            if (!winWidth) return;
            var fontSize;
            if (winWidth < winHeight) {
                if ((winWidth / winHeight) > (height / width)) {
                    fontSize = (rootValue * (winHeight / height));
                } else {
                    fontSize = (rootValue * (winWidth / width));
                }
            } else {
                if ((winWidth / winHeight) > (height / width)) {
                    fontSize = (rootValue * (winWidth / height));
                } else {
                    fontSize = (rootValue * (winHeight / width));
                }
            }

            var k = 750;
            let min = Math.min(docEl.clientHeight, docEl.clientWidth);
            fontSize = min / k * 100;
            docEl.style.fontSize = min / k * 100 + "px";

            // var htmlFontSize = window.parseFloat(window.getComputedStyle(docEl).fontSize).toFixed(2);
            // if (htmlFontSize !== fontSize) {
            //     docEl.style.fontSize = (fontSize / (htmlFontSize / fontSize)).toFixed(2) + 'px';
            // }
            window.fontSize = fontSize;
            return reCalc;
        };
        return reCalc();
    })();
    reCalc();
    setTimeout(function () {
        reCalc();
    }, 300);
    win.addEventListener('load', reCalc, false);
    win.addEventListener('resize', reCalc, false);
    if (!doc.addEventListener) return;
    doc.addEventListener('DOMContentLoaded', reCalc, false);

    // (function (win, doc) {
    //     if (!win.addEventListener) return;
    //     var html = document.documentElement;
    //     function setFont() {
    //         var html = document.documentElement;
    //         var k = 750;
    //         let min = Math.min(html.clientHeight, html.clientWidth);
    //         html.style.fontSize = min / k * 100 + "px";
    //     }
    //     setFont();
    //     setTimeout(function () {
    //         setFont();
    //     }, 300);
    //     doc.addEventListener('DOMContentLoaded', setFont, false);
    //     win.addEventListener('resize', setFont, false);
    //     win.addEventListener('load', setFont, false);
    // })(window, document);
})(document, window);
