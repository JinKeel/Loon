var LoonType=$resourceType;
var include="",exclude="",del="",rename="",ua=false,UserAgent="";

function LoonBase64(s){
try{
var p=s.length%4;
if(p===2)s+="==";
else if(p===3)s+="=";
var b=atob(s.replace(/_/g,"/").replace(/-/g,"+")),a=[];
for(var i=0;i<b.length;i++)a.push("%"+("00"+b.charCodeAt(i).toString(16)).slice(-2));
return decodeURIComponent(a.join(""));
}catch(e){return"";}
}

(function LoonInit(){
var arg=typeof $argument!=="undefined"?$argument:null;

if(arg&&typeof arg==="object"){
ua=arg.ua===true||String(arg.ua).toLowerCase()==="true"||arg.ua==="1"||arg.ua==="yes"||arg.ua==="on";
if(arg.UserAgent!==undefined)UserAgent=String(arg.UserAgent);
if(arg.userAgent!==undefined)UserAgent=String(arg.userAgent);
if(arg.include!==undefined)include=String(arg.include);
if(arg.exclude!==undefined)exclude=String(arg.exclude);
if(arg.del!==undefined)del=String(arg.del);
if(arg.rename!==undefined)rename=String(arg.rename);
}

var src=$resource||"";

if(ua&&LoonType===1&&$httpClient&&$resourceUrl){
$httpClient.get({url:String($resourceUrl),headers:{"User-Agent":UserAgent}},function(e,r,d){
$done(LoonType===1?LoonProcess(d||src):String(d||""));
});
}else{
$done(LoonType===1?LoonProcess(src):String(src));
}
})();

function LoonProcess(c){
var s=String(c||"");
if(s.charCodeAt(0)===0xFEFF)s=s.slice(1);
var t=s.replace(/\r\n/g,"\n").replace(/\r/g,"\n").trim();
if(!t)return"";

var ex=exclude?new RegExp(exclude):null,
inr=include?new RegExp(include):null,
dl=del?new RegExp(del,"g"):null;

var r=[];
if(rename){
var a=rename.split(",");
for(var i=0;i<a.length;i++){
var m=a[i].indexOf("+");
if(m>-1){
var k=a[i].slice(0,m).trim();
if(k)r.push([new RegExp(k,"g"),a[i].slice(m+1).trim()]);
}
}
}

var p=t.replace(/\s+/g,"");
if(p&&p.length>=16&&p.length%4===0&&/^[A-Za-z0-9+/=_-]+$/.test(p)){
return LoonDecode(p);
}
return LoonPlain(t);

function LoonDecode(p){
var d=LoonBase64(p);
if(!d)return t;
if(d.charCodeAt(0)===0xFEFF)d=d.slice(1);

var l=d.split("\n"),o=[];
for(var i=0;i<l.length;i++){
var x=l[i].trim();if(!x)continue;o.push(LoonLine(x));
}
return o.join("\n");
}

function LoonPlain(t){
var l=t.split("\n"),o=[];
for(var i=0;i<l.length;i++){
var x=l[i].trim();
if(!x||x[0]==="#"){o.push(x);continue;}
var e=x.indexOf("=");
if(e>0){
var n=x.slice(0,e).trim();
if(skip(n))continue;
n=apply(n);
o.push(n+"="+x.slice(e+1).trim());
}else o.push(x);
}
return o.join("\n");
}

function LoonLine(x){
var h=x.lastIndexOf("#"),n="",f=0;
if(h>-1&&h<x.length-1){
try{n=decodeURIComponent(x.slice(h+1));}catch(e){n=x.slice(h+1);}
f=1;
}else{
var m=x.match(/[?&]remark=([^&#]*)/);
if(m){try{n=decodeURIComponent(m[1]);}catch(e){n=m[1];}}
}
if(!n)return x;
if(skip(n))return"";
n=apply(n);
return f?x.slice(0,h+1)+encodeURIComponent(n):x+"#"+encodeURIComponent(n);
}

function skip(n){
if(ex&&ex.test(n))return 1;
if(inr&&!inr.test(n))return 1;
return 0;
}

function apply(n){
if(dl)n=n.replace(dl,"");
for(var i=0;i<r.length;i++)n=n.replace(r[i][0],r[i][1]);
return n.trim();
}
}
