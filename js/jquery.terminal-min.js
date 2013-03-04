/*

 |       __ _____                     ________                              __
 |      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 |  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 | /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 | \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 |           \/              /____/                              version 0.4.23
 http://terminal.jcubic.pl

 Licensed under GNU LGPL Version 3 license
 Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>

 Includes:

 Storage plugin Distributed under the MIT License
 Copyright (c) 2010 Dave Schindler

 jQuery Timers licenced with the WTFPL
 <http://jquery.offput.ca/every/>

 Cross-Browser Split 1.1.1
 Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 Available under the MIT License

 Date: Mon, 04 Mar 2013 16:38:45 +0000
*/
(function(k,H){function aa(c,g){var f;if(typeof c==="string"&&typeof g==="string"){localStorage[c]=g;return true}else if(typeof c==="object"&&typeof g==="undefined"){for(f in c)if(c.hasOwnProperty(f))localStorage[f]=c[f];return true}return false}function W(c,g){var f,h;f=new Date;f.setTime(f.getTime()+31536E6);f="; expires="+f.toGMTString();if(typeof c==="string"&&typeof g==="string"){document.cookie=c+"="+g+f+"; path=/";return true}else if(typeof c==="object"&&typeof g==="undefined"){for(h in c)if(c.hasOwnProperty(h))document.cookie=
h+"="+c[h]+f+"; path=/";return true}return false}function ba(c){return localStorage[c]}function ca(c){var g,f,h;c+="=";g=document.cookie.split(";");for(f=0;f<g.length;f++){for(h=g[f];h.charAt(0)===" ";)h=h.substring(1,h.length);if(h.indexOf(c)===0)return h.substring(c.length,h.length)}return null}function da(c){return delete localStorage[c]}function ea(c){return W(c,"",-1)}function U(c,g){var f=[],h=c.length;if(h<g)return[c];for(var i=0;i<h;i+=g)f.push(c.substring(i,i+g));return f}function X(c){return k("<div>"+
k.terminal.strip(c)+"</div>").text().length}function Y(c){var g=c instanceof Array?c:c?[c]:[],f=0;k.extend(this,{left:function(){if(f===0)f=g.length-1;else--f;return g[f]},right:function(){if(f===g.length-1)f=0;else++f;return g[f]},current:function(){return g[f]},data:function(){return g},length:function(){return g.length},reset:function(){f=0},append:function(h){g.push(h);this.reset()}})}function fa(c){var g=c?[c]:[];k.extend(this,{size:function(){return g.length},pop:function(){if(g.length===0)return null;
else{var f=g[g.length-1];g=g.slice(0,g.length-1);return f}},push:function(f){g=g.concat([f]);return f},top:function(){return g.length>0?g[g.length-1]:null}})}function ga(c){var g=true;if(typeof c==="string"&&c!=="")c+="_";var f=k.Storage.get(c+"commands"),h=new Y(f?eval("("+f+")"):[""]);k.extend(this,{append:function(i){if(g){h.append(i);k.Storage.set(c+"commands",k.json_stringify(h.data()))}},data:function(){return h.data()},next:function(){return h.right()},last:function(){h.reset()},previous:function(){return h.left()},
clear:function(){h=new Y;k.Storage.remove(c+"commands")},enable:function(){g=true},disable:function(){g=false}})}k.omap=function(c,g){var f={};k.each(c,function(h,i){f[h]=g.call(c,h,i)});return f};var R=typeof window.localStorage!=="undefined";k.extend({Storage:{set:R?aa:W,get:R?ba:ca,remove:R?da:ea}});jQuery.fn.extend({everyTime:function(c,g,f,h,i){return this.each(function(){jQuery.timer.add(this,c,g,f,h,i)})},oneTime:function(c,g,f){return this.each(function(){jQuery.timer.add(this,c,g,f,1)})},
stopTime:function(c,g){return this.each(function(){jQuery.timer.remove(this,c,g)})}});jQuery.extend({timer:{guid:1,global:{},regex:/^([0-9]+)\s*(.*s)?$/,powers:{ms:1,cs:10,ds:100,s:1E3,das:1E4,hs:1E5,ks:1E6},timeParse:function(c){if(c===H||c===null)return null;var g=this.regex.exec(jQuery.trim(c.toString()));return g[2]?parseInt(g[1],10)*(this.powers[g[2]]||1):c},add:function(c,g,f,h,i,o){var t=0;if(jQuery.isFunction(f)){i||(i=h);h=f;f=g}g=jQuery.timer.timeParse(g);if(!(typeof g!=="number"||isNaN(g)||
g<=0)){if(i&&i.constructor!==Number){o=!!i;i=0}i=i||0;o=o||false;if(!c.$timers)c.$timers={};c.$timers[f]||(c.$timers[f]={});h.$timerID=h.$timerID||this.guid++;var m=function(){if(!(o&&m.inProgress)){m.inProgress=true;if(++t>i&&i!==0||h.call(c,t)===false)jQuery.timer.remove(c,f,h);m.inProgress=false}};m.$timerID=h.$timerID;c.$timers[f][h.$timerID]||(c.$timers[f][h.$timerID]=window.setInterval(m,g));this.global[f]||(this.global[f]=[]);this.global[f].push(c)}},remove:function(c,g,f){var h=c.$timers,
i;if(h){if(g){if(h[g]){if(f){if(f.$timerID){window.clearInterval(h[g][f.$timerID]);delete h[g][f.$timerID]}}else for(var o in h[g])if(h[g].hasOwnProperty(o)){window.clearInterval(h[g][o]);delete h[g][o]}for(i in h[g])if(h[g].hasOwnProperty(i))break;if(!i){i=null;delete h[g]}}}else for(var t in h)h.hasOwnProperty(t)&&this.remove(c,t,f);for(i in h)if(h.hasOwnProperty(i))break;if(!i)c.$timers=null}}}});if(jQuery.browser.msie)jQuery(window).one("unload",function(){var c=jQuery.timer.global,g;for(g in c)if(c.hasOwnProperty(g))for(var f=
c[g],h=f.length;--h;)jQuery.timer.remove(f[h],g)});(function(c){if(String.prototype.split.toString().match(/\[native/)){var g=String.prototype.split,f=/()??/.exec("")[1]===c,h;h=function(i,o,t){if(Object.prototype.toString.call(o)!=="[object RegExp]")return g.call(i,o,t);var m=[],v=(o.ignoreCase?"i":"")+(o.multiline?"m":"")+(o.extended?"x":"")+(o.sticky?"y":""),w=0,A,x,C;o=RegExp(o.source,v+"g");i+="";f||(A=RegExp("^"+o.source+"$(?!\\s)",v));for(t=t===c?4294967295:t>>>0;x=o.exec(i);){v=x.index+x[0].length;
if(v>w){m.push(i.slice(w,x.index));!f&&x.length>1&&x[0].replace(A,function(){for(var E=1;E<arguments.length-2;E++)if(arguments[E]===c)x[E]=c});x.length>1&&x.index<i.length&&Array.prototype.push.apply(m,x.slice(1));C=x[0].length;w=v;if(m.length>=t)break}o.lastIndex===x.index&&o.lastIndex++}if(w===i.length){if(C||!o.test(""))m.push("")}else m.push(i.slice(w));return m.length>t?m.slice(0,t):m};String.prototype.split=function(i,o){return h(this,i,o)};return h}})();k.json_stringify=function(c,g){var f=
"",h;g=g===H?1:g;switch(typeof c){case "function":f+=c;break;case "boolean":f+=c?"true":"false";break;case "object":if(c===null)f+="null";else if(c instanceof Array){f+="[";var i=c.length;for(h=0;h<i-1;++h)f+=k.json_stringify(c[h],g+1);f+=k.json_stringify(c[i-1],g+1)+"]"}else{f+="{";for(i in c)if(c.hasOwnProperty(i))f+='"'+i+'":'+k.json_stringify(c[i],g+1);f+="}"}break;case "string":i=c;var o={"\\\\":"\\\\",'"':'\\"',"/":"\\/","\\n":"\\n","\\r":"\\r","\\t":"\\t"};for(h in o)if(o.hasOwnProperty(h))i=
i.replace(RegExp(h,"g"),o[h]);f+='"'+i+'"';break;case "number":f+=String(c)}f+=g>1?",":"";if(g===1)f=f.replace(/,([\]}])/g,"$1");return f.replace(/([\[{]),/g,"$1")};k.fn.cmd=function(c){function g(){I.toggleClass("inverted")}function f(){y="(reverse-i-search)`"+C+"': ";F()}function h(d){var q=D.data(),M=RegExp("^"+C),K=q.length;if(d&&E>0)K-=E;for(d=K;d--;)if(M.test(q[d])){E=q.length-d;b=0;m.set(q[d],true);l();break}}function i(d){var q=d.substring(0,w-A);d=d.substring(w-A);return[q].concat(U(d,w))}
function o(){v.focus();m.oneTime(1,function(){m.insert(v.val());v.blur().val("")})}function t(d){if(c.keydown){var q=c.keydown(d);if(q!==H)return q}if(J){if(x&&(d.which===35||d.which===36||d.which===37||d.which===38||d.which===39||d.which===40||d.which===66||d.which===13||d.which===27)){y=P;x=false;E=null;C="";F();if(d.which===27)p="";l();t.call(this,d)}else if(d.altKey){if(d.which===68){m.set(p.slice(0,b)+p.slice(b).replace(/[^ ]+ |[^ ]+$/,""),true);return false}return true}else if(d.keyCode===13){if(D&&
p&&(c.historyFilter&&c.historyFilter(p)||!c.historyFilter))D.data().slice(-1)[0]!==p&&D.append(p);D.last();d=p;m.set("");c.commands&&c.commands(d);typeof y==="function"&&F()}else if(d.which===32)if(x){C+=" ";f()}else m.insert(" ");else if(d.which===8)if(x){C=C.slice(0,-1);f()}else{if(p!==""&&b>0){p=p.slice(0,b-1)+p.slice(b,p.length);--b;l()}}else if(d.which===9&&!(d.ctrlKey||d.altKey))m.insert("\t");else if(d.which===46){if(p!==""&&b<p.length){p=p.slice(0,b)+p.slice(b+1,p.length);l()}return true}else if(D&&
d.which===38||d.which===80&&d.ctrlKey)m.set(D.previous());else if(D&&d.which===40||d.which===78&&d.ctrlKey)m.set(D.next());else if(d.which===37||d.which===66&&d.ctrlKey)if(d.ctrlKey&&d.which!==66){q=b-1;d=0;for(p[q]===" "&&--q;q>0;--q)if(p[q]===" "&&p[q+1]!==" "){d=q+1;break}else if(p[q]==="\n"&&p[q+1]!=="\n"){d=q;break}m.position(d)}else{if(b>0){--b;l()}}else if(d.which===82&&d.ctrlKey)if(x)h(true);else{P=y;f();p="";l();x=true}else if(d.which===39||d.which===70&&d.ctrlKey)if(d.ctrlKey&&d.which!==
70){p[b]===" "&&++b;d=p.slice(b).match(/\S[\n\s]{2,}|[\n\s]+\S?/);if(!d||d[0].match(/^\s+$/))b=p.length;else if(d[0][0]!==" ")b+=d.index+1;else{b+=d.index+d[0].length-1;d[0][d[0].length-1]!==" "&&--b}l()}else{if(b<p.length){++b;l()}}else if(d.which===123)return true;else if(d.which===36)m.position(0);else if(d.which===35)m.position(p.length);else if(d.shiftKey&&d.which==45){o();return true}else if(d.ctrlKey||d.metaKey)if(d.shiftKey){if(d.which===84)return true}else if(d.which===65)m.position(0);else if(d.which===
69)m.position(p.length);else if(d.which===88||d.which===67||d.which===87||d.which===84)return true;else if(d.which===86){o();return true}else if(d.which===75)if(b===0)m.set("");else b!==p.length&&m.set(p.slice(0,b));else if(d.which===85){m.set(p.slice(b,p.length));m.position(0)}else{if(d.which===17)return true}else return true;return false}}var m=this;m.addClass("cmd");m.append('<span class="prompt"></span><span></span><span class="cursor">&nbsp;</span><span></span>');var v=k("<textarea/>").addClass("clipboard").appendTo(m);
c.width&&m.width(c.width);var w,A,x=false,C="",E=null,P,G=c.mask||false,p="",b=0,y,J=c.enabled,T,D,I=m.find(".cursor"),l=function(d){function q(n,a){if(a===n.length){L.html(k.terminal.encode(n));I.html("&nbsp;");B.html("")}else if(a===0){L.html("");I.html(k.terminal.encode(n.slice(0,1)));B.html(k.terminal.encode(n.slice(1)))}else{var e=k.terminal.encode(n.slice(0,a));L.html(e);e=n.slice(a,a+1);I.html(e===" "?"&nbsp;":k.terminal.encode(e));a===n.length-1?B.html(""):B.html(k.terminal.encode(n.slice(a+
1)))}}function M(n){return"<div>"+k.terminal.encode(n)+"</div>"}function K(n){var a=B;k.each(n,function(e,j){a=k(M(j)).insertAfter(a).addClass("clear")})}function S(n){k.each(n,function(a,e){L.before(M(e))})}var L=I.prev(),B=I.next();return function(){var n=G?p.replace(/./g,"*"):p,a,e;d.find("div").remove();L.html("");if(n.length>w-A-1||n.match(/\n/)){var j,u=n.match(/\t/g),r=u?u.length*3:0;if(u)n=n.replace(/\t/g,"\u0000\u0000\u0000\u0000");if(n.match(/\n/)){var s=n.split("\n");e=w-A-1;for(a=0;a<
s.length-1;++a)s[a]+=" ";if(s[0].length>e){j=[s[0].substring(0,e)];j=j.concat(U(s[0].substring(e),w))}else j=[s[0]];for(a=1;a<s.length;++a)if(s[a].length>w)j=j.concat(U(s[a],w));else j.push(s[a])}else j=i(n);if(u)j=k.map(j,function(N){return N.replace(/\x00\x00\x00\x00/g,"\t")});e=j[0].length;if(b<e){q(j[0],b);K(j.slice(1))}else if(b===e){L.before(M(j[0]));q(j[1],0);K(j.slice(2))}else{a=j.length;if(b<e){q(j[0],b);K(j.slice(1))}else if(b===e){L.before(M(j[0]));q(j[1],0);K(j.slice(2))}else{u=j.slice(-1)[0];
s=n.length-b;var z=u.length;n=0;if(s<=z){S(j.slice(0,-1));q(u,(z===s?0:z-s)+r)}else if(a===3){L.before("<div>"+k.terminal.encode(j[0])+"</div>");q(j[1],b-e-1);B.after('<div class="clear">'+k.terminal.encode(j[2])+"</div>")}else{n=b;for(a=0;a<j.length;++a){e=j[a].length;if(n>e)n-=e;else break}e=j[a];r=a;if(n===e.length){n=0;e=j[++r]}q(e,n);S(j.slice(0,r));K(j.slice(r+1))}}}}else if(n===""){L.html("");I.html("&nbsp;");B.html("")}else q(n,b)}}(m),F=function(){var d=m.find(".prompt");return function(){if(typeof y===
"string"){A=X(y);d.html(k.terminal.format(y))}else y(function(q){A=X(q);d.html(k.terminal.format(q))})}}();k.extend(m,{name:function(d){if(d!==H){T=d;D=new ga(d)}else return T},history:function(){return D},set:function(d,q){if(d!==H){p=d;if(!q)b=p.length;l();if(typeof c.onCommandChange==="function")c.onCommandChange(p)}},insert:function(d,q){if(b===p.length)p+=d;else p=b===0?d+p:p.slice(0,b)+d+p.slice(b);q||(b+=d.length);l();if(typeof c.onCommandChange==="function")c.onCommandChange(p)},get:function(){return p},
commands:function(d){if(d)c.commands=d;else return d},destroy:function(){k(document.documentElement).unbind(".commandline");m.find(".prompt").remove()},prompt:function(d){if(d===H)return y;else{if(typeof d==="string"||typeof d==="function")y=d;else throw"prompt must be a function or string";F();l()}},position:function(d){if(typeof d==="number"){b=d<0?0:d>p.length?p.length:d;l()}else return b},visible:function(){var d=m.visible;return function(){d.apply(m,[]);l();F()}}(),show:function(){var d=m.show;
return function(){d.apply(m,[]);l();F()}}(),resize:function(d){if(d)w=d;else{d=m.width();var q=I.innerWidth();w=Math.floor(d/q)}l()},enable:function(){if(!J){I.addClass("inverted");m.everyTime(500,"blink",g);J=true}},isenabled:function(){return J},disable:function(){if(J){m.stopTime("blink",g);I.removeClass("inverted");J=false}},mask:function(d){if(typeof d==="boolean"){G=d;l()}else return G}});m.name(c.name||"");y=c.prompt||"> ";F();if(c.enabled===H||c.enabled===true)m.enable();k(k.browser.msie?
document.documentElement:window).keypress(function(d){var q;if(d.ctrlKey&&d.which===99)return true;if(!x&&c.keypress)q=c.keypress(d);if(q===H||q){if(J)if(k.inArray(d.which,[38,32,13,0,8])>-1&&d.keyCode!==123&&!(d.which===38&&d.shiftKey))return false;else if(!d.ctrlKey&&!(d.altKey&&d.which===100)){if(x){C+=String.fromCharCode(d.which);f();h()}else m.insert(String.fromCharCode(d.which));return false}else if(d.altKey)if(x){C+=String.fromCharCode(d.which);f();h()}else m.insert(String.fromCharCode(d.which))}else return q}).keydown(t);
return m};var ha=/(\[\[[gbius]*;[^;]*;[^\]]*\](?:[^\]\[]*|\[*(?!\[)[^\]]*\][^\]]*)\])/g,Z=/\[\[([gbius]*);([^;]*);([^;\]]*;|[^\]]*);?([^\]]*)\]([^\]\[]*|[^\[]*\[(?!\[)*[^\]]*\][^\]]*)\]/g,$=/#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})/,ia=/(https?:((?!&[^;]+;)[^\s:"'<)])+)/g,ja=/((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))/g;k.terminal={split_equal:function(c,g){for(var f=c.split(/\n/g),h=/(\[\[[gbius]*;[^;]*;[^\]]*\][^\]\[]*\]?)/g,
i=/(\[\[[gbius]*;[^;]*;[^\]]*\])/,o=/\[\[[gbius]*;?[^;]*;?[^\]]*\]?$/,t=false,m=false,v="",w=[],A=0,x=f.length;A<x;++A){if(v!=="")if(f[A]===""){w.push(v+"]");continue}else{f[A]=v+f[A];v=""}else if(f[A]===""){w.push("");continue}for(var C=f[A],E=0,P=0,G=0,p=C.length;G<p;++G){if(C[G]==="["&&C[G+1]==="[")t=true;else if(t&&C[G]==="]")if(m)m=t=false;else m=true;else if(t&&m||!t)++P;if(P===g||G===p-1){var b=C.substring(E,G+1);if(v){b=v+b;if(b.match("]"))v=""}E=G+1;P=0;var y=b.match(h);if(y){y=y[y.length-
1];if(y[y.length-1]!=="]"){v=y.match(i)[1];b+="]"}else if(b.match(o)){b=b.replace(o,"");v=y.match(i)[1]}}w.push(b)}}}return w},encode:function(c){return c.replace(/&(?!#[0-9]+;|[a-zA-Z]+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br/>").replace(/ /g,"&nbsp;").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;")},format:function(c){if(typeof c==="string"){c=k.terminal.encode(k.terminal.from_ansi(c));var g=c.split(ha);if(g&&g.length>1)c=k.map(g,function(f){return f===""?f:f.substring(0,
1)==="["?f.replace(Z,function(h,i,o,t,m,v){if(v==="")return"<span>&nbsp;</span>";h="";if(i.indexOf("b")!==-1)h+="font-weight:bold;";var w="text-decoration:";if(i.indexOf("u")!==-1)w+="underline ";if(i.indexOf("s")!==-1)w+="line-through";if(i.indexOf("s")!==-1||i.indexOf("u")!==-1)h+=w+";";if(i.indexOf("i")!==-1)h+="font-style:italic;";if(o.match($)){h+="color:"+o+";";if(i.indexOf("g")!==-1)h+="text-shadow: 0 0 5px "+o+";"}if(t.match($))h+="background-color:"+t;return'<span style="'+h+'"'+(m!=""?' class="'+
m+'"':"")+">"+v+"</span>"}):"<span>"+f+"</span>"}).join("");return c.replace(ia,function(f){var h=f.match(/\.$/);f=f.replace(/\.$/,"");return'<a target="_blank" href="'+f+'">'+f+"</a>"+(h?".":"")}).replace(ja,'<a href="mailto:$1">$1</a>').replace(/<span><br\/?><\/span>/g,"<br/>")}else return""},strip:function(c){return c.replace(Z,"$5")},active:function(){return O.front()},ansi_colors:{normal:{black:"#000",red:"#AA0000",green:"#008400",yellow:"#AA5500",blue:"#0000AA",magenta:"#AA00AA",cyan:"#00AAAA",
white:"#fff"},bold:{white:"#fff",red:"#FF5555",green:"#44D544",yellow:"#FFFF55",blue:"#5555FF",magenta:"#FF55FF",cyan:"#55FFFF",black:"#000"}},from_ansi:function(){function c(h){var i=h.split(";"),o;h=[];var t="",m="",v;for(v in i){o=parseInt(i[v],10);o===1&&h.push("b");o===4&&h.push("u");if(f[o])m=f[o];if(g[o])t=g[o]}o=i=k.terminal.ansi_colors.normal;for(v=h.length;v--;)if(h[v]=="b"){if(t=="")t="white";o=k.terminal.ansi_colors.bold;break}return"[["+[h.join(""),o[t],i[m]].join(";")+"]"}var g={30:"black",
31:"red",32:"green",33:"yellow",34:"blue",35:"magenta",36:"cyan",37:"white"},f={40:"black",41:"red",42:"green",43:"yellow",44:"blue",45:"magenta",46:"cyan",47:"white"};return function(h){var i=h.split(/(\[[0-9;]*m)/g);if(i.length==1)return h;h=[];if(i.length>3&&i.slice(0,3).join("")=="[0m")i=i.slice(3);for(var o=false,t=0;t<i.length;++t){var m=i[t].match(/^\[([0-9;]*)m$/);if(m){if(m[1]!="")if(o){h.push("]");if(m[1]=="0")o=false;else h.push(c(m[1]))}else{o=true;h.push(c(m[1]))}}else h.push(i[t])}o&&
h.push("]");return h.join("")}}()};k.fn.visible=function(){return this.css("visibility","visible")};k.fn.hidden=function(){return this.css("visibility","hidden")};k.jrpc=function(c,g,f,h,i,o){g=k.json_stringify({jsonrpc:"2.0",method:f,params:h,id:g});return k.ajax({url:c,data:g,success:i,error:o,contentType:"application/json",dataType:"json",async:true,cache:false,type:"POST"})};R=/ {14}$/;var ka=[["jQuery Terminal","(c) 2011-2012 jcubic"],["jQuery Terminal Emulator v. 0.4.23","Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>".replace(/ *<.*>/,
"")],["jQuery Terminal Emulator version version 0.4.23","Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>"],["      _______                 ________                        __","     / / _  /_ ____________ _/__  ___/______________  _____  / /"," __ / / // / // / _  / _/ // / / / _  / _/     / /  \\/ / _ \\/ /","/  / / // / // / ___/ // // / / / ___/ // / / / / /\\  / // / /__","\\___/____ \\\\__/____/_/ \\__ / /_/____/_//_/ /_/ /_/  \\/\\__\\_\\___/","         \\/          /____/                                   ".replace(R,
"")+"version 0.4.23","Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>"],["      __ _____                     ________                              __","     / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /"," __ / // // // // // _  // _// // / / // _  // _//     // //  \\/ // _ \\/ /","/  / // // // // // ___// / / // / / // ___// / / / / // // /\\  // // / /__","\\___//____ \\\\___//____//_/ _\\_  / /_//____//_/ /_/ /_//_//_/ /_/ \\__\\_\\___/","          \\/              /____/                                          ".replace(R,
"")+"version 0.4.23","Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>"]],V=[],O=new function(c){var g=c?[c]:[],f=0;k.extend(this,{rotate:function(){if(g.length===1)return g[0];else{if(f===g.length-1)f=0;else++f;return g[f]}},length:function(){return g.length},set:function(h){for(var i=g.length;i--;)if(g[i]===h){f=i;return}this.append(h)},front:function(){return g[f]},append:function(h){g.push(h)}})};k.fn.terminal=function(c,g){function f(){return b.get(0).scrollHeight>b.innerHeight()}
function h(){var a=b.find(".cursor").width(),e=Math.floor(b.width()/a);if(f()){var j=b.innerWidth()-b.width();e-=Math.ceil((20-j/2)/(a-1))}return e}function i(a,e){if(l.displayExceptions){b.error("&#91;"+e+"&#93;: "+(typeof a==="string"?a:typeof a.fileName==="string"?a.fileName+": "+a.message:a.message));if(typeof a.fileName==="string"){b.pause();k.get(a.fileName,function(j){b.resume();var u=a.lineNumber-1;(j=j.split("\n")[u])&&b.error("&#91;"+a.lineNumber+"&#93;: "+j)})}a.stack&&b.error(a.stack)}}
function o(a,e){try{if(typeof e==="function")e(function(){});else if(typeof e!=="string")throw a+" must be string or function";}catch(j){i(j,a.toUpperCase());return false}return true}function t(){var a=b.prop?b.prop("scrollHeight"):b.attr("scrollHeight");b.scrollTop(a)}function m(a){a=typeof a==="string"?a:String(a);var e,j;if(a.length>D){var u=k.terminal.split_equal(a,D);a=k("<div></div>");e=0;for(j=u.length;e<j;++e)u[e]===""||u[e]==="\r"?a.append("<div>&nbsp;</div>"):k("<div/>").html(k.terminal.format(u[e])).appendTo(a)}else a=
k("<div/>").html("<div>"+k.terminal.format(a)+"</div>");J.append(a);a.width("100%");t();return a}function v(){if(g.greetings===H)b.echo(b.signature);else g.greetings&&b.echo(g.greetings)}function w(a,e){var j=1,u=function(r,s){e.pause();k.jrpc(a,j++,r,s,function(z){if(z.error)e.error("&#91;RPC&#93; "+z.error.message);else if(typeof z.result==="string")e.echo(z.result);else if(z.result instanceof Array)e.echo(z.result.join(" "));else if(typeof z.result==="object"){var N="",Q;for(Q in z.result)if(z.result.hasOwnProperty(Q))N+=
Q+": "+z.result[Q]+"\n";e.echo(N)}e.resume()},function(z,N){e.error("&#91;AJAX&#93; "+N+" - Server reponse is: \n"+z.responseText);e.resume()})};return function(r,s){if(r!==""){var z,N;if(r.match(/[^ ]* /)){r=r.split(/ +/);z=r[0];N=r.slice(1)}else{z=r;N=[]}if(!l.login||z==="help")u(z,N);else{var Q=s.token();Q?u(z,[Q].concat(N)):s.error("&#91;AUTH&#93; Access denied (no token)")}}}}function A(a){a=a.replace(/\[/g,"&#91;").replace(/\]/g,"&#93;");var e=n.prompt();if(n.mask())a=a.replace(/./g,"*");typeof e===
"function"?e(function(j){b.echo(j+a)}):b.echo(e+a)}function x(a,e){try{var j=B.top();if(a==="exit"&&l.exit)if(B.size()===1)if(l.login)E();else{e||A(a);b.echo("You can exit from main interpeter")}else b.pop("exit");else{e||A(a);a==="clear"&&l.clear?b.clear():j.eval(a,b)}}catch(u){i(u,"USER");b.resume();throw u;}}function C(){var a=null;n.prompt("login: ");l.history&&n.history().disable();n.commands(function(e){try{A(e);if(a){n.mask(false);b.pause();if(typeof l.login!=="function")throw"Value of login property must be a function";
l.login(a,e,function(u){if(u){var r=l.name;r=r?"_"+r:"";k.Storage.set("token"+r,u);k.Storage.set("login"+r,a);n.commands(x);G()}else{b.error("Wrong password try again");n.prompt("login: ");a=null}b.resume();l.history&&n.history().enable()})}else{a=e;n.prompt("password: ");n.mask(true)}}catch(j){i(j,"LOGIN",b);throw j;}})}function E(){if(typeof l.onBeforelogout==="function")try{if(l.onBeforelogout(b)==false)return}catch(a){i(a,"onBeforelogout");throw a;}var e=l.name;e=e?"_"+e:"";k.Storage.remove("token"+
e,null);k.Storage.remove("login"+e,null);l.history&&n.history().disable();C();if(typeof l.onAfterlogout==="function")try{l.onAfterlogout(b)}catch(j){i(j,"onAfterlogout");throw j;}}function P(){var a=B.top(),e="";if(a.name!==H&&a.name!=="")e+=a.name+"_";e+=T;n.name(e);typeof a.prompt=="function"?n.prompt(function(j){a.prompt(j,b)}):n.prompt(a.prompt);l.history&&n.history().enable();n.set("");if(typeof a.onStart==="function")a.onStart(b)}function G(){P();v();if(typeof l.onInit==="function")try{l.onInit(b)}catch(a){i(a,
"OnInit");throw a;}}function p(a){b.oneTime(5,function(){q()});if(l.keydown){var e=l.keydown(a,b);if(e!==H)return e}if(b.paused()){if(a.which===68&&a.ctrlKey){for(a=V.length;a--;){e=V[a];if(4!==e.readyState)try{e.abort()}catch(j){b.error("error in aborting ajax")}}b.resume();return false}}else{if(a.which!==9)M=0;if(a.which===68&&a.ctrlKey){if(n.get()==="")if(B.size()>1||l.login!==H)b.pop("");else{b.resume();b.echo("")}else b.set_command("");return false}else if(l.tabcompletion&&a.which===9){++M;e=
n.get();if(!e.match(" ")){var u=RegExp("^"+e),r=B.top().command_list,s=[];for(a=r.length;a--;)u.test(r[a])&&s.push(r[a]);if(s.length===1)b.set_command(s[0]);else if(s.length>1)if(M>=2){A(e);b.echo(s.join("\t"));M=0}}return false}else if(a.which===86&&a.ctrlKey)b.oneTime(1,function(){t()});else if(a.which===9&&a.ctrlKey){O.length()>1&&b.focus(false);return false}else if(a.which===34)b.scroll(b.height());else a.which===33?b.scroll(-b.height()):b.attr({scrollTop:b.attr("scrollHeight")})}}var b=this,
y=[],J,T=O.length(),D,I=[],l=k.extend({name:"",prompt:"> ",history:true,exit:true,clear:true,enabled:true,displayExceptions:true,cancelableAjax:true,login:null,tabcompletion:null,historyFilter:null,onInit:k.noop,onClear:k.noop,onBlur:k.noop,onFocus:k.noop,onTerminalChange:k.noop,onExit:k.noop,keypress:k.noop,keydown:k.noop},g||{});l.width&&b.width(l.width);l.height&&b.height(l.height);var F=!l.enabled;if(b.length===0)throw'Sorry, but terminal said that "'+b.selector+'" is not valid selector!';b.ajaxSend(function(a,
e){V.push(e)});if(b.data("terminal"))return b.data("terminal");J=k("<div>").addClass("terminal-output").appendTo(b);b.addClass("terminal").append("<div/>");b.click(function(){b.find("textarea").focus()});var d=[];k.extend(b,k.omap({clear:function(){J.html("");n.set("");y=[];try{l.onClear(b)}catch(a){i(a,"onClear");throw a;}b.attr({scrollTop:0});return b},exec:function(a,e){F?d.push([a,e]):x(a,e);return b},commands:function(){return B.top().eval},greetings:function(){v();return b},paused:function(){return F},
pause:function(){if(n){F=true;b.disable();n.hidden()}return b},resume:function(){if(n){b.enable();var a=d;for(d=[];a.length;){var e=a.shift();b.exec.apply(b,e)}n.visible();t()}return b},cols:function(){return D},rows:function(){return y.length},history:function(){return n.history()},next:function(){if(O.length()===1)return b;else{var a=b.offset().top;b.height();b.scrollTop();var e=b,j=k(window).scrollTop(),u=j+k(window).height(),r=k(e).offset().top;if(r+k(e).height()>=j&&r<=u){O.front().disable();
a=O.rotate().enable();e=a.offset().top-50;k("html,body").animate({scrollTop:e},500);try{l.onTerminalChange(a)}catch(s){i(s,"onTerminalChange");throw s;}return a}else{b.enable();k("html,body").animate({scrollTop:a-50},500);return b}}},focus:function(a,e){b.oneTime(1,function(){if(O.length()===1)if(a===false)try{!e&&l.onBlur(b)!==false&&b.disable()}catch(j){i(j,"onBlur");throw j;}else try{!e&&l.onFocus(b)!==false&&b.enable()}catch(u){i(u,"onFocus");throw u;}else if(a===false)b.next();else{var r=O.front();
if(r!=b){r.disable();if(!e)try{l.onTerminalChange(b)}catch(s){i(s,"onTerminalChange");throw s;}}O.set(b);b.enable()}});return b},enable:function(){D===H&&b.resize();if(F)if(n){n.enable();F=false}return b},disable:function(){if(n){F=true;n.disable()}return b},enabled:function(){return F},signature:function(){var a=b.cols();a=a<15?null:a<35?0:a<55?1:a<64?2:a<75?3:4;return a!==null?ka[a].join("\n")+"\n":""},version:function(){return"0.4.23"},get_command:function(){return n.get()},insert:function(a){if(typeof a===
"string"){n.insert(a);return b}else throw"insert function argument is not a string";},set_prompt:function(a){if(o("prompt",a)){typeof a=="function"?n.prompt(function(e){a(e,b)}):n.prompt(a);B.top().prompt=a}return b},get_prompt:function(){return B.top().prompt},set_command:function(a){n.set(a);return b},set_mask:function(a){n.mask(a);return b},get_output:function(a){return a?y:k.map(y,function(e,j){return typeof j=="function"?j():j}).join("\n")},resize:function(a,e){if(a&&e){b.width(a);b.height(e)}D=
h();n.resize(D);var j=J.detach();J.html("");k.each(y,function(u,r){m(r&&typeof r=="function"?r():r)});b.prepend(j);t();return b},echo:function(a){y.push(a);m(typeof a==="function"?a():a);q();return b},error:function(a){return b.echo("[[;#f00;]"+a.replace(/\[/g,"&#91;").replace(/\]/g,"&#93;")+"]")},scroll:function(a){var e;a=Math.round(a);if(b.prop){a>b.prop("scrollTop")&&a>0&&b.prop("scrollTop",0);e=b.prop("scrollTop");b.prop("scrollTop",e+a)}else{a>b.attr("scrollTop")&&a>0&&b.attr("scrollTop",0);
e=b.attr("scrollTop");b.attr("scrollTop",e+a)}return b},logout:l.login?function(){for(;B.size()>1;)B.pop();E();return b}:function(){throw"You don't have login function";},token:l.login?function(){var a=l.name;return k.Storage.get("token"+(a?"_"+a:""))}:k.noop,login_name:l.login?function(){var a=l.name;return k.Storage.get("login"+(a?"_"+a:""))}:k.noop,name:function(){return l.name},push:function(a,e){if(e&&(!e.prompt||o("prompt",e.prompt))||!e){if(typeof a==="string")a=w(e.eval,b);B.push(k.extend({eval:a},
e));P()}return b},reset:function(){for(b.clear();B.size()>1;)B.pop();G()},pop:function(a){a!==H&&A(a);if(B.top().name===l.name){if(l.login){E();if(typeof l.onExit==="function")try{l.onExit(b)}catch(e){i(e,"onExit");throw e;}}}else{a=B.pop();P();if(typeof a.onExit==="function")try{a.onExit(b)}catch(j){i(j,"onExit");throw j;}}return b}},function(a,e){return function(){try{return e.apply(this,Array.prototype.slice.apply(arguments))}catch(j){i(j,"TERMINAL")}}}));var q=function(){var a=f();return function(){if(a!==
f()){b.resize();a=f()}}}(),M=0,K;if(l.login&&typeof l.onBeforeLogin==="function")try{l.onBeforeLogin(b)}catch(S){i(S,"onBeforeLogin");throw S;}if(typeof c=="string"){K=c;c=w(c,b)}else if(typeof c=="object"&&c.constructor===Array)throw"You can't use array as eval";else if(typeof c==="object"){for(var L in c)c.hasOwnProperty(L)&&I.push(L);c=function a(e){return function(j){if(j!==""){j=j.split(/ +/);var u=j[0],r=j.slice(1);j=e[u];var s=typeof j;if(s==="function")j.apply(b,r);else if(s==="object"||s===
"string"){r=[];if(s==="object"){for(var z in j)j.hasOwnProperty(z)&&r.push(z);j=a(j)}b.push(j,{prompt:u+"> ",name:u,command_list:r})}else b.error("Command '"+u+"' Not Found")}}}(c)}else if(typeof c!=="function")throw'Unknow object "'+String(c)+'" passed as eval';if(K&&(typeof l.login==="string"||l.login))l.login=function(a){var e=1;return function(j,u,r){b.pause();k.jrpc(K,e++,a,[j,u],function(s){b.resume();!s.error&&s.result?r(s.result):r(null)},function(s,z){b.resume();b.error("&#91;AJAX&#92; Response: "+
z+"\n"+s.responseText)})}}(typeof l.login==="boolean"?"login":l.login);if(o("prompt",l.prompt)){var B=new fa({name:l.name,eval:c,prompt:l.prompt,command_list:I,greetings:l.greetings}),n=b.find(".terminal-output").next().cmd({prompt:l.prompt,history:l.history,historyFilter:l.historyFilter,width:"100%",keydown:p,keypress:l.keypress?function(a){return l.keypress(a,b)}:null,onCommandChange:function(a){if(typeof l.onCommandChange==="function")try{l.onCommandChange(a,b)}catch(e){i(e,"onCommandChange");
throw e;}t()},commands:x});O.append(b);l.enabled===true?b.focus(H,true):b.disable();k(window).resize(b.resize);b.click(function(){F&&O.length()>1&&b===k.terminal.active()||b.focus()});g.login&&b.token&&!b.token()&&b.login_name&&!b.login_name()?C():G();typeof k.fn.init.prototype.mousewheel==="function"&&b.mousewheel(function(a,e){e>0?b.scroll(-40):b.scroll(40);return false},true)}b.data("terminal",b);return b}})(jQuery);