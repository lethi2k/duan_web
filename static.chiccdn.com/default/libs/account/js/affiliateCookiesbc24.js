
//写cookies
function setCookie(name,value){
var Days = 30;
var exp = new Date();
exp.setTime(exp.getTime() + Days*24*60*60*1000);
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name){
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return unescape(arr[2]);
else
return null;
}

function parameter(p,l){
	//路径中的参数获取
	var s=new RegExp(".*(?:^|&|[?]|[/])"+l+"=([^&]*).*$");var g=s.exec(p);return g?encodeURIComponent(g[1]):""
}

var str_href= window.location.href;
var s=document.location.search;

var pid = parameter(s,"pid");
var affiliate_code ;
var pmCode = parameter(s, "pm");
if(!pmCode) {
	affiliate_code = parameter(s, "p") || parameter(s, "P");
}
var from_site = parameter(s,"site");
var bid = parameter(s,"bid");
var cat_id = parameter(s,"cat_id");
var coupon_id = parameter(s,"coupon_id");

var params = "s=1";
if(pmCode){
	params = params + "&pm="+pmCode +"&site="+from_site;
}else{
	if(affiliate_code){
		params = params + "&affiliate_code="+affiliate_code +"&site="+from_site;
	}
}

if(pid){
	params = params + "&pid="+pid;
}
if(bid){
	params = params + "&bid="+bid;
}
if(cat_id){
	params = params + "&cat_id="+cat_id;
}
if(coupon_id){
	params = params + "&coupon_id="+coupon_id;
}

if(cat_id || bid || pid || affiliate_code || pmCode || coupon_id){
	$.ajax({
		type: 'get',
		url: '/api/account/affiliateCookies/',
		data: params,
		success: function(res){
			//alert(res);
		}
	});
}


