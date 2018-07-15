//T485.js

// Fix dropdown menu bug on iOS
$('.dropdown a').click(function() {
    if ($(this).parent().hasClass('open')) {
        $(this).parent().removeClass('open');
    }
    else {
        $('.dropdown').removeClass('open');
        $(this).parent().addClass('open');
    }
});

// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getQuery(e) {
    e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    let c = new RegExp("[\\?&]" + e + "=([^&#]*)"),
        n = c.exec(location.search);
    return null === n ? "" : decodeURIComponent(n[1].replace(/\+/g, " "))
}


//http://stackoverflow.com/a/17606289/5511561s
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(escapeRegExp(search), 'g'), replacement);
};

//http://stackoverflow.com/a/17606289/5511561s (footnote), 

function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
  }

//google anylatics

(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-102375833-1', 'auto');
ga('send', 'pageview');
