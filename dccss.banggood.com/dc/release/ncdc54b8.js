!function(e){function t(i){if(o[i])return o[i].exports;var r=o[i]={exports:{},id:i,loaded:!1};return e[i].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var o={};return t.modules=e,t.cache=o,t.p="",t(0)}([function(e,t,o){"use strict";function i(e){return 864e5*e}function r(e){return 36e5*e}var s=o(1),n=s.getJSONP,a=s.baseUrl,c=o(2),u=c.main,h=s.getSeo,l=s.getDomain(),p=window.nDC={C:{},set:function d(e,t){this.C[e]=t},get:function f(e){return void 0!==this.C[e]?this.C[e]:null},os:function g(){var e=/(win|android|linux|nokia|ipad|iphone|ipod|mac|sunos|solaris)/.exec(navigator.platform.toLowerCase());return null==e?"other":e[0]},browser:function m(){var e={name:"other",version:"0"},t=navigator.userAgent.toLowerCase(),o={ie:/msie[ ]([\w.]+)/,firefox:/firefox[|\/]([\w.]+)/,chrome:/chrome[|\/]([\w.]+)/,safari:/version[|\/]([\w.]+)(\s\w.+)?\s?safari/,opera:/opera[|\/]([\w.]+)/};for(var i in o){var r=o[i].exec(t);if(r){e.name=i,e.version=r[1]||"0";break}}return e},config:function _(){var e={},t=window.navigator,o=window.screen;return e.D=o?o.width+"x"+o.height:"-",e.language=(t&&(t.language||t.browserLanguage)||"-").toLowerCase(),e.characterSet=document.characterSet||document.charset||"-",e},setSource:function b(e){var t=document.location.search,o=document.referrer,i=0==this.Vv("__bgvisit").length,r=h(),s=this.parameter(t,"utm_source").toLowerCase(),n=this.parameter(t,"bid"),a=this.parameter(t,"admitad_uid"),c=this.parameter(t,"zf"),u=this.parameter(t,"p"),l=this.parameter(t,"ref"),p=this.parameter(t,"utm_design"),d=this.parameter(t,"utm_sid"),f=this.parameter(t,"dckf").toLowerCase(),g=this.parameter(t,"utm_medium").toLowerCase(),m=this.parameter(t,"utm_campaign").toLowerCase(),_=this.parameter(t,"utm_content").toLowerCase(),b=[],v="";e&&(u=e.p,m=m||e.utm_campaign,_=_||e.utm_content,v=e.aff_admin),(c||u)&&this.Wv("affiliate_code",c||decodeURIComponent(decodeURIComponent(u)),this.get(9),1296e6),document.location.href.indexOf("?")>-1&&""==t&&(t=document.location.href.split("?")[1]),this.set(18,n||0),this.set(30,f||"");var y=o.split("/")[2];if(y&&(y.indexOf("paypal.com")>-1||y.indexOf("oceanpayment.com")>-1||y.indexOf("globebill.com")>-1||y.indexOf("cybersource.com")>-1||y.indexOf("braintreegateway.com")>-1||y.indexOf("cashu.com")>-1||y.indexOf("adyen.com")>-1)){var w=this.parameter(t,"utmid");return this.set(28,w||0),this.set(25,0),!1}if(o&&o.indexOf("forum.banggood.com")<0&&o.indexOf("blog.banggood.com")<0&&y.indexOf(this.get(9))>-1){var w=this.parameter(t,"utmid");this.set(28,w||0),this.set(25,0)}if(!s||e||u)if("cityads"==l||"cityads_br"==l)b.push(l),b.push(this.parameter(t,"prx")||"-"),b.push(this.parameter(t,"aip")||"-"),b.push(this.parameter(t,"click_id")||"-"),b.push(0);else if(a)b.push("admitad"),b.push("aff"),b.push("-"),b.push(a||"-"),b.push(0);else if(c)b.push("bg_affiliate"),b.push("aff"),b.push("zf"),b.push(c),b.push(p||0);else if(u){var k="test",C=decodeURIComponent(decodeURIComponent(u)),x=/.{6}(.*)20.+?(\d{3,4})(.{0,2})$/.exec(C);if(/^(?![a-zA-Z]+$)[0-9A-Za-z]{19,20}$/.test(C)){b.push("bg_affiliate"),b.push("aff");var S="";/p-[0-9]+.html/.test(location.pathname)?S="p":(S=location.pathname,S=S.substr(1),S=S.replace(".html","")),_?_=x[1]+"_"+_:(_=x[1],v&&(_+="_"+v)),b.push(m||S||"p"),b.push(_),b.push(p||0)}}else{if(y&&y.indexOf(this.get(9))>-1)return!1;var O=!1;if(y){for(var q=0;q<r.length;q++){var j=r[q].split(":");if(y.indexOf(j[0].toLowerCase())>-1){var I=this.parameter(o,j[1]);b.push(j[0]),b.push("organic"),b.push("-"),b.push(I||"-"),b.push(0),O=!0;break}}if(!O)if(y.indexOf("shareasale.com")>-1){var I=this.parameter(o,"u");b.push("shareasale"),b.push("aff"),b.push("-"),b.push(I||"-"),b.push(0)}else b.push(y),b.push("refer"),b.push("-"),b.push("-"),b.push(0)}}else{if("google"==s)s="shopping"==g&&"googleshopping"||"youtube"==g&&"youtube_cpc"||"adwords";else if("bing"==s&&/^(cpc|shopping|mail_christmas2013_cpc)$/.test(g))s="bing_cpc";else if("facebook"==s){s="cpc_fashion"==g&&"facebook_cpc_fashion"||"cpc_elc"==g&&"facebook_cpc_electro"||"cpc_other"==g&&"facebook_cpc_contras"||"fb_cpc"==g&&/^(lin|tone|justin|lincoln)$/.test(_)&&"facebook_cpc_fashion"||"fb_cpc"==g&&/^(vivian|tracy|tanya|ruby)$/.test(_)&&"facebook_cpc_electro"||"fb_cpc"==g&&/^(aldo|aaron)$/.test(_)&&"facebook_cpc_electro"||"fb_cpc"==g&&"facebook_cpc"||"cpc_home"==g&&"facebook_cpc_home"||"cpc_ods"==g&&"facebook_cpc_ods"||s;var D=this.parameter(t,"utm_ho");if(D&&this.get(31)){var U=D.split("_"),A=this.get(31).split("_");U[1]&&U[1]-U[0]<A[1]-A[0]&&(this.set(31,D),this.Wv("__utm_ho",D,this.get(9),this.get(12)))}else D&&(this.set(31,D),this.Wv("__utm_ho",D,this.get(9),this.get(12)))}else if(s.indexOf("facebook_cpc")>-1){var D=this.parameter(t,"utm_ho");if(D&&this.get(31)){var U=D.split("-"),A=this.get(31).split("-");U[1]&&U[1]-U[0]<A[1]-A[0]&&(this.set(31,D),this.Wv("__utm_ho",D,this.get(9),this.get(12)))}else D&&(this.set(31,D),this.Wv("__utm_ho",D,this.get(9),this.get(12)))}else"mopubi"==s?(g="aff",m=this.parameter(t,"oid"),_=this.parameter(t,"rqid")):"cpc"==g&&(s+="_cpc");if("refer_friends"==s){s="bg_affiliate",g="aff";var S="";S=location.pathname,S=S.substr(1),S=S.replace(".html",""),m=S,_=this.parameter(t,"click_id")}u&&(s="bg_affiliate"),b.push(s),b.push(g||"-"),b.push(m||"-"),b.push(_||"-"),b.push(p||0)}if((i||!i&&b.length>0&&(b[0]!==this.get(19)||b[1]!==this.get(20)||b[2]!==this.get(21)||b[3]!==this.get(22)))&&(this.set(19,b[0]||"direct"),this.set(20,b[1]||"none"),this.set(21,b[2]||"-"),this.set(22,b[3]||"-"),this.set(23,b[4]||0),this.set(25,1),this.set(32,d||0),this.cancover(u))){var T=this.get(14)+"|"+this.get(19)+"|"+this.get(20)+"|"+this.get(21)+"|"+this.get(22)+"|"+this.get(23)+"|"+this.get(24)+"|"+this.get(32);T+="|"+(this.parameter(t,"ad_id")||""),this.Wv("__bgqueue",T,this.get(9),this.get(12)),this.set(25,2)}},cancover:function v(e){if(this.setLevel(),0===this.Vv("__bgqueue").length)return!0;var t=this.Vv("__bgqueue")[0].split("|"),o=t[6],s=this.get(24),n=this.get(19),a=this.get(20),c=t[1],u=this.get(14)-t[0],h=!1;if(("blog"==a||"sns"==n&&0==/^\d{1,}$/.test(a))&&(h=!0),3==o&&u>=i(15))return!0;if(s>o)return!0;if(s==o){if(!this.isBlacklist(e))return!0;if(u>r(1.5))return!0}if(1==s){if("googleshopping"==c)return!0;if("adwords"==c&&"s"==t[3].substr(0,1))return!0}return!1},isBlacklist:function y(e){var t=document.location.search;e=decodeURIComponent(decodeURIComponent(e));var o=this.parameter(t,"utm_source").toLowerCase(),i=this.parameter(t,"utm_content").toLowerCase(),r=this.parameter(t,"utm_medium").toLowerCase();if("3Y121627829858201855"==e)return!0;if("admitad"==o&&i.indexOf("960899")>-1)return!0;if("admitad"==o&&"aff"==r&&"cherry"==i)return!0;if("tradetracker_global"==o){if("tradetracker_es"==r&&i.indexOf("121038")>-1)return!0;if("tradetracker_es"==r&&i.indexOf("216598")>-1)return!0;if("tradetracker_es"==r&&i.indexOf("322930")>-1)return!0;if("tradetracker_br"==r&&i.indexOf("292495")>-1)return!0;if("tradetracker_br"==r&&i.indexOf("323833")>-1)return!0;if("tradetracker_mx"==r&&i.indexOf("216598")>-1)return!0}return!1},setLevel:function w(){var e=0,t=this.get(20),o=this.get(19);if("none"==t)return this.set(24,e),void 0;if("refer"==t)e=1;else{if(e=2,0==this.get(16))for(var i="facebook_cpc_fashion,facebook_cpc_electro,facebook_cpc_contras,facebook_cpc,adwords,googleshopping".split(","),r=0;r<i.length;r++)if(this.get(19)==i[r]){e=3;break}"/fb-red.html"==location.pathname&&"youtube"==o&&"redid"==t&&(e=2.5)}this.set(24,e)},domain:function k(){for(var e="banggood.com,yoins.com,buyalleasy.com,newchic.com,blitzwolf.com,eachine.com,newchic.in".split(","),t=0;t<e.length;t++)if(window.document.domain.indexOf(e[t])>=0)return e[t];return null},site:function C(){for(var e=this.get(10),t="www.banggood.com:banggood_SID,m.banggood.com:webApp_SID,www.yoins.com:yoins_SID".split(","),o=0;o<t.length;o++){var i=t[o].split(":");if(i[0]==e){this.set(26,this.Vv(i[1])[0]||"");break}}},init:function x(e){this.set(0,document.location.href),this.set(1,e||document.referrer.replace(/\$/g,"")),this.set(2,this.os());var t=this.browser();this.set(3,t.name),this.set(4,t.version);var o=this.config();this.set(5,o.characterSet),this.set(6,o.D),this.set(7,o.language),this.set(8,this.Vv("_bgLang")[0]||"-"),this.set(9,l),this.set(10,document.location.hostname),this.set(11,31104e6),this.set(12,2592e6),this.set(13,144e4);var i=(new Date).getTime();this.set(14,i);var r=this.Vv("__bguser"),s=r.length>0?r[0].split("|"):[],n=this.Vv("__bgvisit"),a=n.length>0?n[0].split("|"):[];a.length>0&&i-a[0]>144e4&&(a=[]),this.set(15,a.length>0&&s[1]?s[1]:0),this.set(16,s[2]||0),this.set(17,s[3]||this.get(14)),this.set(18,0),this.set(19,a[1]||"direct"),this.set(20,a[2]||"none"),this.set(21,a[3]||"-"),this.set(22,a[4]||"-"),this.set(23,a[5]||0),this.set(24,a[6]||0),this.set(25,0),this.set(26,""),this.set(27,this.Vv("COOKIE_ID")[0]||0);var c=this.Vv("__bgcookie"),u=c.length>0?c[0].split("|"):[];this.set(28,u[0]||0),this.set(29,this.Vv("dc_cid")[0]||0),this.set(30,u[1]||""),this.set(31,this.Vv("__utm_ho")[0]||0),this.set(33,s[1]?s[1]:0),this.setBypass(),this.site();var h=this.parameter(document.location.search,"pm");h||(this.setSource(),this.Wv("__bgcookie",this.get(28)+"|"+this.get(30),this.get(9),2592e5))},Wv:function S(e,t,o,i){e=e+"="+t+"; path=/; ",i&&(e+="expires="+new Date((new Date).getTime()+i).toGMTString()+"; "),o&&(e+="domain="+o+";"),document.cookie=e},Vv:function O(e){for(var t=[],o=document.cookie.split(";"),i=RegExp("^\\s*"+e+"=\\s*(.*?)\\s*$"),r=0;r<o.length;r++){var s=o[r]["match"](i);s&&t.push(s[1])}return t},sendSess:function q(){var e=this.get(2)+"|"+this.get(3)+"|"+this.get(4)+"|"+this.get(5)+"|"+this.get(6)+"|"+this.get(7)+"|"+this.get(8)+"|"+this.get(9)+"|"+this.get(16)+"|"+this.get(17)+"|"+this.get(14)+"|"+this.get(10)+"|"+this.get(26)+"|"+this.get(27)+"|"+this.get(30),t=a+"com=sess&t=session&visit="+encodeURIComponent(this.get(0))+"&refer="+encodeURIComponent(this.get(1))+"&info="+e+"&dq="+encodeURIComponent(this.Vv("__bgqueue")[0])+"&ho="+this.get(31)+"&last_sess_id="+this.get(33)+"&callback=?";n(t)},sendShow:function j(){var e=p.product(),t=e[0].join(","),o=a+"com=record&t=aysnCollect&site="+this.get(10)+"&domain="+this.get(9)+"&dcData="+t+"&callback=?";n(o)},oSession:function I(e){this.set(15,e),this.get(16)&&"0"!=this.get(16)||this.set(16,e),this.Wv("__bguser",this.get(14)+"|"+this.get(15)+"|"+this.get(16)+"|"+this.get(17),this.get(9),this.get(11)),this.setBypass(),this.sendVisit(e)},setBypass:function D(){var e=this.get(15);if(!(1>e)){var t=!1;e%2==0&&(t=!0),this.Wv("ncim-bypass",t,this.get(9),1296e6)}},oVisit:function U(e){},parameter:function A(e,t){var o=new RegExp(".*(?:^|&|[?]|[/])"+t+"=([^&]*).*$","i"),i=o.exec(e);return i?encodeURIComponent(i[1]):""}};u(p)},function(e,t,o){"use strict";function i(e,t,o,i){var r=i?i:"nDC"+(new Date).getTime();if(e+=-1==e.indexOf("?")?"?":"&",o&&(e+="callback="+r,window[r]=function(e){o(e),document.getElementsByTagName("head")[0].removeChild(n),n=null,window[r]=null}),t)for(var s in t)e+="&"+s+"="+t[s];var n=document.createElement("script");n.async=!0,n.src=e,document.getElementsByTagName("head")[0].appendChild(n)}function r(e){for(var t=[],o=document.cookie.split(";"),i=RegExp("^\\s*"+e+"=\\s*(.*?)\\s*$"),r=0;r<o.length;r++){var s=o[r]["match"](i);s&&t.push(s[1])}return t}function s(e){"complete"===document.readyState?e():document.addEventListener?document.addEventListener("DOMContentLoaded",function t(){document.removeEventListener("DOMContentLoaded",t,!1),e()},!1):document.attachEvent&&document.attachEvent("onreadystatechange",function o(){"complete"==document.readyState&&(document.detachEvent("onreadystatechange",o),e())})}function n(e,t,o){var i=(new Date).getTime();e="exp_"+e,localStorage.setItem(e,u.stringify({data:t,time:i,exp:o}))}function a(e){e="exp_"+e;var t=localStorage.getItem(e),o=u.parse(t);return o?o.data:o}function c(){void 0;for(var e=localStorage.length-1;e>=0;e--){var t=localStorage.key(e);if(/^exp_/.test(t)){var o=localStorage.getItem(t),i=u.parse(o);(new Date).getTime()-i.time>i.exp&&(void 0,localStorage.removeItem(t))}}void 0}var u=o(3);Array.prototype.indexOf||(Array.prototype.indexOf=function(e){var t=this.length>>>0,o=Number(arguments[1])||0;for(o=0>o?Math.ceil(o):Math.floor(o),0>o&&(o+=t);t>o;o++)if(o in this&&this[o]===e)return o;return-1});var h=("https:"==document.location.protocol?"https://":"http://")+"bi.banggood.com";e.exports.baseDomain=h;var l=h+"/index.php?";e.exports.baseUrl=l;var p=("https:"==document.location.protocol?"https://":"http://")+"clt.banggood.com/";e.exports.cltBaseUrl=p,e.exports.getJSONP=i,e.exports.getCookie=r,e.exports.setCookie=function(e,t,o,i){e=e+"="+t+"; path=/; ",i&&(e+="expires="+new Date((new Date).getTime()+i).toGMTString()+"; "),o&&(e+="domain="+o+";"),document.cookie=e},e.exports.ready=s,e.exports.setStorage=n,e.exports.getStorage=a;var d=function f(e){return"[object Array]"===Object.prototype.toString.call(e)};e.exports.isArray=d,e.exports.checkStorage=c,c(),e.exports.getOS=function(){var e=/(win|android|linux|nokia|ipad|iphone|ipod|mac|sunos|solaris)/.exec(navigator.platform.toLowerCase());return null==e?"other":e[0]},e.exports.getDomain=function(){var e="banggood.com,banggood.in,yoins.com,buyalleasy.com,newchic.com,blitzwolf.com,eachine.com,mybargainz.com,secrexy.com,yoins.in,chic.deals".split(",");e.push("hiselling.com"),e.push("jeteven.net"),e.push("archeer.com"),e.push("atailorbird.com"),e.push("audew.com"),e.push("camtoa.com"),e.push("elegiants.com"),e.push("godmorn.com"),e.push("hizek.net"),e.push("kisslace.net"),e.push("landnics.com"),e.push("liaboe.com"),e.push("meco-ele.com"),e.push("moreslan.com"),e.push("socofy.com"),e.push("thorfiredirect.com"),e.push("tsumbay.com"),e.push("vadiv.com"),e.push("joonmall.com"),e.push("matcc.company"),e.push("mydigoo.com"),e.push("plzmart.com"),e.push("koyye.com"),e.push("augienb.com"),e.push("geekcreit.com"),e.push("charsoon.com"),e.push("racerstar.com"),e.push("irangex.com"),e.push("astroluxlite.com"),e.push("doufit.net"),e.push("gokoo.org"),e.push("domipet.net"),e.push("gracosy.com"),e.push("joseko.net"),e.push("newchic.in"),e.push("joindeal.net"),e.push("elegiants.com"),e.push("kingso.net"),e.push("meco-ele.com"),e.push("insmahomeproduct.com"),e.push("somyfo.com"),e.push("dealsjoin.com");for(var t=0;t<e.length;t++)if(window.document.domain.indexOf(e[t])>=0)return e[t];return null},e.exports.isSiteCluster=function(e){var t=["jeteven.net","archeer.com","atailorbird.com","audew.com","camtoa.com","elegiants.com","godmorn.com","hizek.net","kisslace.net","landnics.com","liaboe.com","meco-ele.com","moreslan.com","thorfiredirect.com","tsumbay.com","vadiv.com","matcc.company","augienb.com","doufit.net","gokoo.org","domipet.net","joseko.net","gracosy.com","socofy.com","joindeal.net","insmahomeproduct.com","kingso.net","plzmart.com","geekcreit.com","charsoon.com","racerstar.com","irangex.com","astroluxlite.com","hiselling.com"];return t.indexOf(e)>-1?!0:!1},e.exports.getBrowser=function(){var e={name:"other",version:"0"},t=navigator.userAgent.toLowerCase(),o={ie:/msie[ ]([\w.]+)/,firefox:/firefox[|\/]([\w.]+)/,chrome:/chrome[|\/]([\w.]+)/,safari:/version[|\/]([\w.]+)(\s\w.+)?\s?safari/,opera:/opera[|\/]([\w.]+)/};for(var i in o){var r=o[i].exec(t);if(r){e.name=i,e.version=r[1]||"0";break}}return e},e.exports.getConfig=function(){var e={},t=window.navigator,o=window.screen;return e.D=o?o.width+"x"+o.height:"-",e.language=(t&&(t.language||t.browserLanguage)||"-").toLowerCase(),e.characterSet=document.characterSet||document.charset||"-",e},e.exports.getSeo=function(){var e="google:q,images.google:q,yandex:text,yahoo:p,yahoo:q,naver:query,bing:q,ask:q,daum:q,baidu:wd,baidu:word,haosou.com:q,so.com:q,360so.com:q,360sou.com:q,m.baidu:w,wap.soso:key,m.so:q,page.yicha:key,sz.roboo:q,i.easou:q,wap.sogou:keyword,soso:w,sogou:query,youdao:q,ucweb:keyword,ucweb:word,114so:kw,live:q,msn:q,aol:query,aol:q,eniro:search_word,pchome:q,lycos:query,netscape:query,cnn:query,about:terms,mamma:q,voila:rdata,virgilio:qs,alice:qs,najdi:q,seznam:q,search:q,wp:szukaj,onet:qt,szukacz:q,yam:k,kvasir:q,ozu:q,terra:query,rambler:query",t=e.split(",");return t.push("excite:q"),t.push("duckduckgo:q"),t.push("wolframalpha:q"),t.push("lycos:q"),t.push("hotbot:q"),t.push("wow:q"),t.push("webcrawler:q"),t.push("mywebsearch:q"),t.push("infospace:q"),t.push("info:q"),t.push("docomo:q"),t.push("rakuten:q"),t.push("startsiden:q"),t.push("biglobe:q"),t.push("centrum:q"),t.push("avg:q"),t.push("babylon:q"),t.push("sougou:q"),t},e.exports.keywordStorage={key:"dc_tw_id_list",clear:function g(){localStorage.removeItem(this.key)},eqKey:function m(e,t){return e==t},get:function _(e){var t=localStorage.getItem(this.key);if(t=u.parse(t),!t||!d(t))return null;if(e){for(var o=0;o<t.length;o++)if(this.eqKey(t[o].key,e))return t[o];return null}return t},getValue:function b(e){var t=this.get(e);return t?t.value:null},set:function v(e){localStorage.setItem(this.key,u.stringify(e))},push:function y(e){var t=localStorage.getItem(this.key);t=u.parse(t),t||(t=[]);var o=(new Date).getTime();e.time=o;for(var i=e.key,r=0;r<t.length;r++)if(this.eqKey(t[r].key,i))return t[r].time=e.time,t[r].value=e.value,this.set(t),void 0;t.push(e),this.set(t)}},e.exports.getUrlParameter=function(e,t){var o=new RegExp(".*(?:^|&|[?]|[/])"+t+"=([^&]*).*$","i"),i=o.exec(e);return i?encodeURIComponent(i[1]):""},e.exports.addHandler=function(e,t,o){e.addEventListener?e.addEventListener(t,o,!1):e.attachEvent?e.attachEvent("on"+t,o):e["on"+t]=o},e.exports.getMByHour=function(e){return 36e5*e},e.exports.getMByDay=function(e){return 864e5*e},e.exports.getUserInfo=function(){var e=r("__bguser"),t=e.length>0?e[0].split("|"):[],o=t[1]||0,i=t[2]||0;return{session_id:o,user_id:i}}},function(e,t,o){"use strict";function i(){var e=q("__bguser"),t=e.length>0?e[0].split("|"):[];return R=t[1]||0,N=t[2]||0,{session_id:R,user_id:N}}function r(e){if(!(isNaN(e)||1>e)){var t=this.get(0),o=this.get(1);t.indexOf("from=nav")>-1&&(t+="&tw_id="+(D.getValue(t)||"")),o.indexOf("from=nav")>-1&&(o+="&tw_id="+(D.getValue(o)||""));var i="&visit="+encodeURIComponent(t)+"&refer="+encodeURIComponent(o)+"&info="+k.getCookie("__bguser")[0]+"&bid="+this.get(18)+"&site="+this.get(10)+"&domain="+L+"&bglang="+this.get(8)+"&utmid="+this.get(28)+"&customers_id="+this.get(29)+"&dckf="+this.get(30)+"&ho="+this.get(31);this.get(25)&&(i+="&dv="+encodeURIComponent(q("__bgvisit")[0])+"&dq="+encodeURIComponent(q("__bgqueue")[0]));var r=j+"com=sess&t=visit"+i+"&test_version="+(window.dc_test_version||"");C(r)}}function s(e,t){e=e.split("?")[0],t=t.split("?")[0];var o=/^(.*)-([0-9]+)\/$/,i=/^(.*)\/p-([0-9]+).html$/,r=/(.*nc\/.*)\/[0-9]+\.html/,s=/^(.*-c-[0-9]+)\/[0-9]+.html/;return o.test(e)&&o.test(t)?o.exec(e)[2]==o.exec(t)[2]:i.test(e)&&i.test(t)?i.exec(e)[2]==i.exec(t)[2]:r.test(t)?e==r.exec(t)[1]+".html":s.test(t)?e==s.exec(t)[1]+"/":e==t}function n(e,t){return e=e.split("?")[0],t=t.split("?")[0],e==t}function a(e,t){e.com="record",e.t="collectBanner",e.vp||(e.vp=encodeURIComponent(document.location.href)),e.rp||(e.rp=encodeURIComponent(document.referrer)),e.rp=e.rp.replace(/\$/g,"");var o=i();e.sess_id=o.session_id,e.user_id=o.user_id,e.domain=L,e.customers_id=this.get(29),e.site=this.get(10);var r=T+"collectBanner";C(r,e,function(){"function"==typeof t&&t()})}function c(e,t){var o=j+"com=record&t=aysnCollectBanner&domain="+L+"&banner_id="+e;t&&(o+="&language="+t),C(o)}function u(e,t){var o=j+"com=record&t=utmDecrypt&pm="+(e||"")+"&p="+(t||""),i=this;C(o,void 0,function(e){200==e.code?(t&&(e.data.p=t),i.setSource(e.data)):i.setSource(),O("__bgcookie",i.get(28)+"|"+i.get(30),L,2592e5),i.sendAnalytics()})}function h(){var e=!this.get(1)&&z?!0:!1;if(null!==L&&!e){var t=this.get(14)+"|"+this.get(19)+"|"+this.get(20)+"|"+this.get(21)+"|"+this.get(22)+"|"+this.get(23)+"|"+this.get(24)+"|"+this.get(32);O("__bgvisit",t,L,this.get(13));var o=this.get(15);0==o?(D.clear(),k.isSiteCluster(L)?this.sendSess():this.sendServiceSession()):k.isSiteCluster(L)?this.sendVisit(o):this.sendServiceVisit(o)}}function l(e,t){this.init(e),e&&this.set(1,e),t&&this.set(0,t),z&&q("site").length>0&&this.set(10,q("site")[0]);var o=U(document.location.search,"pm"),i=U(document.location.search,"p");(o||i)&&"newchic.com"==L?this.pmDecrypt(o,i):this.sendAnalytics()}function p(e){e=e||"",S(e)&&(e=e.join(","));var t=j+"com=record&t=aysnCollect&site="+this.get(10)+"&domain="+L+"&dcData="+e;C(t)}function d(e){if(!(isNaN(e)||1>e)){var t=this.get(0),o=this.get(1);t.indexOf("from=nav")>-1&&(t+="&tw_id="+(D.getValue(t)||"")),o.indexOf("from=nav")>-1&&(o+="&tw_id="+(D.getValue(o)||""));var i="?visit="+encodeURIComponent(t)+"&refer="+encodeURIComponent(o)+"&info="+k.getCookie("__bguser")[0]+"&bid="+this.get(18)+"&site="+this.get(10)+"&domain="+L+"&bglang="+this.get(8)+"&utmid="+this.get(28)+"&customers_id="+this.get(29)+"&dckf="+this.get(30)+"&ho="+this.get(31);i+="&new_interface=1",this.get(25)&&(i+="&dv="+encodeURIComponent(q("__bgvisit")[0])+"&dq="+encodeURIComponent(q("__bgqueue")[0]));var r="https://appanalysis.banggood.com/ServiceDataCollection/Webvisit/visit"+i+"&test_version="+(window.dc_test_version||"");C(r)}}function f(){var e=this,t=this.get(2)+"|"+this.get(3)+"|"+this.get(4)+"|"+this.get(5)+"|"+this.get(6)+"|"+this.get(7)+"|"+this.get(8)+"|"+this.get(9)+"|"+this.get(16)+"|"+this.get(17)+"|"+this.get(14)+"|"+this.get(10)+"|"+this.get(26)+"|"+this.get(27)+"|"+this.get(30),o="https://appanalysis.banggood.com/ServiceDataCollection/Webvisit/w?visit="+encodeURIComponent(this.get(0))+"&refer="+encodeURIComponent(this.get(1))+"&info="+t+"&dq="+encodeURIComponent(k.getCookie("__bgqueue")[0])+"&ho="+this.get(31);o+="&new_interface=1",C(o,null,function(t){e.set(15,t),e.get(16)&&"0"!=e.get(16)||e.set(16,t),k.setCookie("__bguser",e.get(14)+"|"+e.get(15)+"|"+e.get(16)+"|"+e.get(17),e.get(9),e.get(11)),"function"==typeof window.onBguserSet&&window.onBguserSet(),e.sendServiceVisit(t)})}function g(e){var t=i();R=t.session_id,N=t.user_id,e.collectBanner=a,e.sendVisit=r,e.sendServiceSession=f,e.sendServiceVisit=d,"newchic.com"==L?D.eqKey=s:"banggood.com"==L&&(D.eqKey=n),e.keywordStorage=D,e.pmDecrypt=u,e.sendAnalytics=h,e.collectBannerOld=c,e.analytics=l,e.sendShowIds=p,e.getCookie=q,e.setCookie=O}function m(){function e(e){return/^\//.test(e)?!0:/^http/.test(e)?!0:!1}function t(e,t){for(;t;){if((t.nodeName||t.tagName).toLowerCase()===e.toLowerCase())return t;t=t.parentNode}return null}function o(){C(I+"/upf/heat_map_page.js?time="+(new Date).getTime(),null,function(e){for(var t=0;t<e.length;t++){var o=e[t],i=o.site.split(",");if(-1!=i.indexOf(E)){var s=("https:"==document.location.protocol?"https://":"http://")+E+o.url_role;if("0"==o.match_type&&"1"==o.method){if(s==B){r=!0;break}}else if("0"==o.match_type&&"0"==o.method){if(B.indexOf(s)>-1){r=!0;break}}else if("1"==o.match_type){var n=new RegExp(o.url_role);if(n.test(B)){r=!0;break}}}}},"heatMapCallBack")}function i(o){if(r){o=o||window.event;var i=o.pageX||(document.documentElement.scrollLeft||document.body.scrollLeft)+o.clientX,a=o.pageY||(document.documentElement.scrollTop||document.body.scrollTop)+o.clientY;i=parseInt(i/s)*s,a=parseInt(a/s)*s;var c=window.screen,u=c.width,h=c.height,l=o.target,p=l.getAttribute("href")||"";if(!p){var d=t("a",l);d&&(p=d.getAttribute("href")||"")}e(p)||(p="");var f={domain:L,site:E,coordinate_x:i,coordinate_y:a,visit_page:encodeURIComponent(B),click_url:encodeURIComponent(p),win_size:u+"x"+h};C(n,f)}}var r=!1;o();var s=10,n=j+"com=record&t=collectHeatMapClick";return A(document,"click",i),i}function _(){if(top!=self&&["bi.banggood.com","bibeta.banggood.com"].some(function(e){return null!=document.referrer.match(e)})){var e=document.body;e.style.overflow="hidden";var t=null,o=0,i=function r(){cancelAnimationFrame(t),o<e.scrollHeight&&(o=e.scrollHeight,parent.postMessage&&parent.postMessage({height:o},I)),t=requestAnimationFrame(r)};t=window.requestAnimationFrame(i)}}function b(e){e.init(),z=0==q("app_sys").length?!1:!0,g(e),window.datacube_not_auto_send_visit||e.analytics(),y(e),e.collectHeatMapClick=m(),_(),w()}var v=o(4),y=v.init,w=v.run,k=o(1),C=k.getJSONP,x=k.ready,S=k.isArray,O=k.setCookie,q=k.getCookie,j=k.baseUrl,I=k.baseDomain,D=k.keywordStorage,U=k.getUrlParameter,A=k.addHandler,T=k.cltBaseUrl,R=0,N=0,z=!1,L=k.getDomain(),E=document.location.hostname,B=location.href,$="-",M=document.referrer.replace(/\$/g,""),V=!1;"koyye.com"==L&&(V=!0),e.exports.main=b},function(e,t,o){var i;(function(e,o,r){"use strict";var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
(function(){function n(e,t){function o(e){if(o[e]!==b)return o[e];var s;if("bug-string-char-index"==e)s="a"!="a"[0];else if("json"==e)s=o("json-stringify")&&o("json-parse");else{var n;if("json-stringify"==e){s=t.stringify;var a="function"==typeof s&&v;if(a){(n=function m(){return 1}).toJSON=n;try{a="0"===s(0)&&"0"===s(new i)&&'""'==s(new r)&&s(g)===b&&s(b)===b&&s()===b&&"1"===s(n)&&"[1]"==s([n])&&"[null]"==s([b])&&"null"==s(null)&&"[null,null,null]"==s([b,g,null])&&'{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}'==s({a:[n,!0,!1,null,"\x00\b\n\f\r	"]})&&"1"===s(null,n)&&"[\n 1,\n 2\n]"==s([1,2],null,1)&&'"-271821-04-20T00:00:00.000Z"'==s(new u(-864e13))&&'"+275760-09-13T00:00:00.000Z"'==s(new u(864e13))&&'"-000001-01-01T00:00:00.000Z"'==s(new u(-621987552e5))&&'"1969-12-31T23:59:59.999Z"'==s(new u(-1))}catch(c){a=!1}}s=a}if("json-parse"==e){if(s=t.parse,"function"==typeof s)try{if(0===s("0")&&!s(!1)){n=s('{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}');var h=5==n.a.length&&1===n.a[0];if(h){try{h=!s('"	"')}catch(l){}if(h)try{h=1!==s("01")}catch(p){}if(h)try{h=1!==s("1.")}catch(d){}}}}catch(f){h=!1}s=h}}return o[e]=!!s}e||(e=h.Object()),t||(t=h.Object());var i=e.Number||h.Number,r=e.String||h.String,a=e.Object||h.Object,u=e.Date||h.Date,l=e.SyntaxError||h.SyntaxError,p=e.TypeError||h.TypeError,d=e.Math||h.Math,f=e.JSON||h.JSON;"object"==("undefined"==typeof f?"undefined":s(f))&&f&&(t.stringify=f.stringify,t.parse=f.parse);var a=a.prototype,g=a.toString,m,_,b,v=new u(-0xc782b5b800cec);try{v=-109252==v.getUTCFullYear()&&0===v.getUTCMonth()&&1===v.getUTCDate()&&10==v.getUTCHours()&&37==v.getUTCMinutes()&&6==v.getUTCSeconds()&&708==v.getUTCMilliseconds()}catch(y){}if(!o("json")){var w=o("bug-string-char-index");if(!v)var k=d.floor,C=[0,31,59,90,120,151,181,212,243,273,304,334],x=function E(e,t){return C[t]+365*(e-1970)+k((e-1969+(t=+(t>1)))/4)-k((e-1901+t)/100)+k((e-1601+t)/400)};if((m=a.hasOwnProperty)||(m=function B(e){var t={},o;return(t.__proto__=null,t.__proto__={toString:1},t).toString!=g?m=function i(e){var t=this.__proto__;return e=e in(this.__proto__=null,this),this.__proto__=t,e}:(o=t.constructor,m=function r(e){var t=(this.constructor||o).prototype;return e in this&&!(e in t&&this[e]===t[e])}),t=null,m.call(this,e)}),_=function $(e,t){var o=0,i,r,n;(i=function a(){this.valueOf=0}).prototype.valueOf=0,r=new i;for(n in r)m.call(r,n)&&o++;return i=r=null,o?_=2==o?function(e,t){var o={},i="[object Function]"==g.call(e),r;for(r in e)i&&"prototype"==r||m.call(o,r)||!(o[r]=1)||!m.call(e,r)||t(r)}:function(e,t){var o="[object Function]"==g.call(e),i,r;for(i in e)o&&"prototype"==i||!m.call(e,i)||(r="constructor"===i)||t(i);(r||m.call(e,i="constructor"))&&t(i)}:(r="valueOf toString toLocaleString propertyIsEnumerable isPrototypeOf hasOwnProperty constructor".split(" "),_=function u(e,t){var o="[object Function]"==g.call(e),i,n=!o&&"function"!=typeof e.constructor&&c[s(e.hasOwnProperty)]&&e.hasOwnProperty||m;for(i in e)o&&"prototype"==i||!n.call(e,i)||t(i);for(o=r.length;i=r[--o];n.call(e,i)&&t(i));}),_(e,t)},!o("json-stringify")){var S={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"},O=function M(e,t){return("000000"+(t||0)).slice(-e)},q=function V(e){for(var t='"',o=0,i=e.length,r=!w||i>10,s=r&&(w?e.split(""):e);i>o;o++){var n=e.charCodeAt(o);switch(n){case 8:case 9:case 10:case 12:case 13:case 34:case 92:t+=S[n];break;default:if(32>n){t+="\\u00"+O(2,n.toString(16));break}t+=r?s[o]:e.charAt(o)}}return t+'"'},j=function J(e,t,o,i,r,n,a){var c,u,h,l,d,f,v,y,w;try{c=t[e]}catch(C){}if("object"==("undefined"==typeof c?"undefined":s(c))&&c)if(u=g.call(c),"[object Date]"!=u||m.call(c,"toJSON"))"function"==typeof c.toJSON&&("[object Number]"!=u&&"[object String]"!=u&&"[object Array]"!=u||m.call(c,"toJSON"))&&(c=c.toJSON(e));else if(c>-1/0&&1/0>c){if(x){for(l=k(c/864e5),u=k(l/365.2425)+1970-1;x(u+1,0)<=l;u++);for(h=k((l-x(u,0))/30.42);x(u,h+1)<=l;h++);l=1+l-x(u,h),d=(c%864e5+864e5)%864e5,f=k(d/36e5)%24,v=k(d/6e4)%60,y=k(d/1e3)%60,d%=1e3}else u=c.getUTCFullYear(),h=c.getUTCMonth(),l=c.getUTCDate(),f=c.getUTCHours(),v=c.getUTCMinutes(),y=c.getUTCSeconds(),d=c.getUTCMilliseconds();c=(0>=u||u>=1e4?(0>u?"-":"+")+O(6,0>u?-u:u):O(4,u))+"-"+O(2,h+1)+"-"+O(2,l)+"T"+O(2,f)+":"+O(2,v)+":"+O(2,y)+"."+O(3,d)+"Z"}else c=null;if(o&&(c=o.call(t,e,c)),null===c)return"null";if(u=g.call(c),"[object Boolean]"==u)return""+c;if("[object Number]"==u)return c>-1/0&&1/0>c?""+c:"null";if("[object String]"==u)return q(""+c);if("object"==("undefined"==typeof c?"undefined":s(c))){for(e=a.length;e--;)if(a[e]===c)throw p();if(a.push(c),w=[],t=n,n+=r,"[object Array]"==u){for(h=0,e=c.length;e>h;h++)u=J(h,c,o,i,r,n,a),w.push(u===b?"null":u);e=w.length?r?"[\n"+n+w.join(",\n"+n)+"\n"+t+"]":"["+w.join(",")+"]":"[]"}else _(i||c,function(e){var t=J(e,c,o,i,r,n,a);t!==b&&w.push(q(e)+":"+(r?" ":"")+t)}),e=w.length?r?"{\n"+n+w.join(",\n"+n)+"\n"+t+"}":"{"+w.join(",")+"}":"{}";return a.pop(),e}};t.stringify=function(e,t,o){var i,r,n,a;if(c["undefined"==typeof t?"undefined":s(t)]&&t)if("[object Function]"==(a=g.call(t)))r=t;else if("[object Array]"==a){n={};for(var u=0,h=t.length,l;h>u;l=t[u++],a=g.call(l),("[object String]"==a||"[object Number]"==a)&&(n[l]=1));}if(o)if("[object Number]"==(a=g.call(o))){if(0<(o-=o%1))for(i="",o>10&&(o=10);i.length<o;i+=" ");}else"[object String]"==a&&(i=10>=o.length?o:o.slice(0,10));return j("",(l={},l[""]=e,l),r,n,i,"",[])}}if(!o("json-parse")){var I=r.fromCharCode,D={92:"\\",34:'"',47:"/",98:"\b",116:"	",110:"\n",102:"\f",114:"\r"},U,A,T=function P(){throw U=A=null,l()},R=function F(){for(var e=A,t=e.length,o,i,r,s,n;t>U;)switch(n=e.charCodeAt(U),n){case 9:case 10:case 13:case 32:U++;break;case 123:case 125:case 91:case 93:case 58:case 44:return o=w?e.charAt(U):e[U],U++,o;case 34:for(o="@",U++;t>U;)if(n=e.charCodeAt(U),32>n)T();else if(92==n)switch(n=e.charCodeAt(++U),n){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:o+=D[n],U++;break;case 117:for(i=++U,r=U+4;r>U;U++)n=e.charCodeAt(U),n>=48&&57>=n||n>=97&&102>=n||n>=65&&70>=n||T();o+=I("0x"+e.slice(i,U));break;default:T()}else{if(34==n)break;for(n=e.charCodeAt(U),i=U;n>=32&&92!=n&&34!=n;)n=e.charCodeAt(++U);o+=e.slice(i,U)}if(34==e.charCodeAt(U))return U++,o;T();default:if(i=U,45==n&&(s=!0,n=e.charCodeAt(++U)),n>=48&&57>=n){for(48==n&&(n=e.charCodeAt(U+1),n>=48&&57>=n)&&T();t>U&&(n=e.charCodeAt(U),n>=48&&57>=n);U++);if(46==e.charCodeAt(U)){for(r=++U;t>r&&(n=e.charCodeAt(r),n>=48&&57>=n);r++);r==U&&T(),U=r}if(n=e.charCodeAt(U),101==n||69==n){for(n=e.charCodeAt(++U),43!=n&&45!=n||U++,r=U;t>r&&(n=e.charCodeAt(r),n>=48&&57>=n);r++);r==U&&T(),U=r}return+e.slice(i,U)}if(s&&T(),"true"==e.slice(U,U+4))return U+=4,!0;if("false"==e.slice(U,U+5))return U+=5,!1;if("null"==e.slice(U,U+4))return U+=4,null;T()}return"$"},N=function W(e){var t,o;if("$"==e&&T(),"string"==typeof e){if("@"==(w?e.charAt(0):e[0]))return e.slice(1);if("["==e){for(t=[];e=R(),"]"!=e;o||(o=!0))o&&(","==e?(e=R(),"]"==e&&T()):T()),","==e&&T(),t.push(W(e));return t}if("{"==e){for(t={};e=R(),"}"!=e;o||(o=!0))o&&(","==e?(e=R(),"}"==e&&T()):T()),","!=e&&"string"==typeof e&&"@"==(w?e.charAt(0):e[0])&&":"==R()||T(),t[e.slice(1)]=W(R());return t}T()}return e},z=function H(e,t,o){o=L(e,t,o),o===b?delete e[t]:e[t]=o},L=function K(e,t,o){var i=e[t],r;if("object"==("undefined"==typeof i?"undefined":s(i))&&i)if("[object Array]"==g.call(i))for(r=i.length;r--;)z(i,r,o);else _(i,function(e){z(i,e,o)});return o.call(e,t,i)};t.parse=function(e,t){var o,i;return U=0,A=""+e,o=N(R()),"$"!=R()&&T(),U=A=null,t&&"[object Function]"==g.call(t)?L((i={},i[""]=o,i),"",t):o}}}return t.runInContext=n,t}var a=e(5),c={"function":!0,object:!0},u=c[s(t)]&&t&&!t.nodeType&&t,h=c["undefined"==typeof window?"undefined":s(window)]&&window||this,l=u&&c[s(o)]&&o&&!o.nodeType&&"object"==("undefined"==typeof r?"undefined":s(r))&&r;if(!l||l.global!==l&&l.window!==l&&l.self!==l||(h=l),u&&!a)n(h,u);else{var p=h.JSON,d=h.JSON3,f=!1,g=n(h,h.JSON3={noConflict:function m(){return f||(f=!0,h.JSON=p,h.JSON3=d,p=d=null),g}});h.JSON={parse:g.parse,stringify:g.stringify}}a&&(i=function(){return g}.call(t,e,t,o),!(void 0!==i&&(o.exports=i)))}).call(void 0)}).call(t,o,o(6)(e),function(){return this}())},function(e,t,o){"use strict";function i(e){for(var t in e)void 0==e[t]&&(e[t]="")}function r(){window.dc_need_searches&&"string"==typeof window.dc_need_searches?C=window.report_search_data=f.parse(window.dc_need_searches):window.report_search_data&&"object"==d(window.report_search_data)&&(C=window.report_search_data)}function s(e){e&&(C=e),C.reportId=0;var e={};e.brandIdStr=C.brandIdStr,e.selBrandStr=C.selBrandStr,e.fuzzy_keyword=C.fuzzy_keyword,e.fuzzy_num=C.fuzzy_num,e.fuzzy_keyword_num=C.fuzzy_keyword_num,e.is_refine=C.is_refine,e.priority_cid=C.priority_cid,e.rec_cid=C.rec_cid,e.fuzzy_num=C.fuzzy_num,e.options=C.options,e.ac_num=C.ac_num,e.c_id=C.c_id,e.keyword=C.keyword,e.lang=C.lang,e.p_id=C.p_id,e.page=C.page,e.rel_keyword=C.rel_keyword,e.p_num=C.p_num,e.selFiltersStr=C.selFiltersStr,e.brand_word=C.brand_word,e.selItemStr=C.selItemStr,e.sug_word=C.sug_word,e.cor_word=C.cor_word,e.limited_cid=C.limited_cid,e.customer_id=C.customer_id;var t=y();e.session_id=t.session_id,e.user_id=t.user_id,i(e);var o=_+"com=sess&t=ajaxReportDataToDC";g.isSiteCluster(k)||(o="https://appanalysis.banggood.com/ServiceDataCollection/WebSearch/ajaxReportDataToDC?new_interface=1"),m(o,e,function(e){e.sid>0&&(C.sid=C.reportId=e.sid,sessionStorage.setItem("report_search_data",f.stringify(C)))})}function n(e,t){if(0!=e.reportId&&0!=e.p_num){var o={};o.pId=t.pid,o.type=t.type,o.pos=t.pos,o.act_word=t.act_word,o.click_pro_cid=t.click_pro_cid,o.repId=e.reportId,o.page=e.page||e.currentPage,o.p_cid=t.p_cid,o.customer_id=e.customer_id;var r=y();o.session_id=r.session_id,o.user_id=r.user_id,o.item=t.name;var s=_+"com=sess&t=ajaxReportClickToDC";g.isSiteCluster(k)||(s="https://appanalysis.banggood.com/ServiceDataCollection/WebSearch/ajaxReportClickToDC?new_interface=1"),i(o),m(s,o,function(e){if(e.sid>0){var t=f.stringify({sid:e.sid,pid:e.pid});sessionStorage.setItem("search_click_"+e.pid,t)}})}}function a(e,t,o){var i=1296e6,r=_+"com=sess&t=RecordClick";g.isSiteCluster(k)||(r="https://appanalysis.banggood.com/ServiceDataCollection/WebSearch/sessRecordClick?new_interface=1"),w(t)||(t=[t]);var s={},n=y();if(s.session_id=n.session_id,s.user_id=n.user_id,"[object Object]"==Object.prototype.toString.call(o)){s.searchList=1;for(var a in o)o.hasOwnProperty(a)&&(s[a]=o[a])}for(var c=function(){return"function"==typeof nDC.searchAc?nDC.searchAc():[]}(),u=0;u<t.length;u++){var h=t[u];if(-1!=["wish","cart","preorder","buynow"].indexOf(e)){var l=sessionStorage.getItem("search_click_"+h),p="";if(l)p=f.parse(l).sid;else if(1==s.searchList){var d=sessionStorage.getItem("report_search_data"),C=f.parse(d);C&&(p=C.sid,s.customer_id=C.customer_id)}p&&h&&(s.search_id=p,s.products_id=h,s.ac=e,m(r,s,function(e){e&&200==e.code&&v("search_click_"+h,{sid:p,pid:h},i)}))}else if(-1!=["checkout","paypal","placeOrder","placeTheOrder","proceedToCheckout"].indexOf(e)||/^paypal_|^checkout_/.test(e)||-1!=c.indexOf(e)){var l=b("search_click_"+h);if(l&&h){var p=l.sid;s.search_id=p,s.products_id=h,s.ac=e,m(r,s)}}}}function c(e){if(1==e)s();else if(2==e){var t=sessionStorage.getItem("report_search_data"),o=sessionStorage.getItem("report_search_click_data"),i=f.parse(o),r=f.parse(t);r&&i&&n(r,i)}}function u(e){var t=sessionStorage.getItem("report_search_data"),o=f.parse(t);o&&e&&n(o,e)}function h(e){e.RecordClick=a,e.reportDataToDC=s,e.reportClickData=u,e.searchAnalytics=l}function l(e){r(),c(e)}function p(){r(),void 0,null!=C?c(1):(/rmmds=search/.test(location.search)||/rmmds=buy/.test(location.search))&&c(2)}var d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f=o(3),g=o(1),m=g.getJSONP,_=g.baseUrl,b=g.getStorage,v=g.setStorage,y=g.getUserInfo,w=function x(e){return"[object Array]"===Object.prototype.toString.call(e)},k=g.getDomain(),C=null;e.exports.init=h,e.exports.run=p},function(e,t,o){(function(t,o){e.exports=o}).call(t,o,{})},function(e,t,o){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}}]);