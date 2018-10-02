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

//https://stackoverflow.com/a/901144/5511561
function getQuery(name) {
    let url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//https://stackoverflow.com/a/10997390/5511561
function setQuery(name, value) {
    if (value !== null && value !== undefined ) value = "" + value;//we want falsey values to be used literally, as a string (e.g. 0 -> "0", false -> "false).
    let search = window.location.search;
    let regex = new RegExp("([?;&])" + name + "[^&;]*[;&]?");
    let query = search.replace(regex, "$1").replace(/&$/, '');

    return (query.length > 2 ? query + "&" : "?") + (value ? name + "=" + value : '');
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



// show fixed navbar once user scrolls past regular navbar
$(function () {
    $(window).scroll(function () {
        console.log($(this).scrollTop());
        // set distance user needs to scroll before we fadeIn navbar
        if ($(this).scrollTop() > 150) {
            $('.navbar').addClass('sticky-top');
        } else {
            $('.navbar').removeClass('sticky-top');
        }
    });
});