// JavaScript Document
// JavaScript Document
var xmlhttp;
function loadXMLDoc(url,method,cfunc,msg)
{
    if (window.XMLHttpRequest)
    {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp=new XMLHttpRequest();
    }
    else
    {
        // IE6, IE5 浏览器执行代码
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=cfunc;
    xmlhttp.open(method,url,true);
    xmlhttp.setRequestHeader("Content-type","application/json");
    xmlhttp.send(msg);
    // xmlhttp.onreadystatechange=cfunc;
}
function init()
{
    getCookie();
}
//获取Cookie 处理top
function getCookie()
{
    if(document.cookie.length>0)
    {
      var info = document.cookie.split('=');
      console.log(info);
      getUser(info);
      return info;
    }
}
//改登录为名字
function getUser(user)
{
    var top = document.getElementById('top');
    var div = top.firstElementChild;
    var childs = div.children;
    var child = childs[1].children;
    var id = child[0];
    var name = child[1];
    id.innerHTML=user[1];
    id.style.display='none';
    name.innerHTML=user[0];
    console.log(user);
}
//搜索
function Search(e)
{
    var info = {"医院":1,"科室":2,"疾病":3};
    var search_elem = e.parentElement.firstElementChild;
    var search_info = search_elem.innerHTML;
    var key = e.previousElementSibling.value;
    console.log(key);
    switch (info[search_info])
    {
        case 1:
            var yy={'北京':0,'上海':1,'浙江':2,'天津':3,'重庆':4,'长春':5,'绵阳':6,'青岛':7,'河北':8,'辽宁':9,'山东':10,'河南':11,'湖南':12,'湖北':13};
            if(key in yy)
                key=yy[key];
            url="hospitals.html?key="+key;
            window.location.href=encodeURI(url);
            break;
        case 2:
            var ks={'内科':0,'外科':1,'妇科':2,'皮肤性病科':3,'骨伤科':4,'肿瘤及防治科':5,'儿科':6,'口腔颌面科':7,'中医科':8,'精神心理科':9,'眼科':10,'男科':11,'营养科':12,'整形美容科':13,'产科':14};
            if(key in ks)
                key=ks[key];
            url="departmet.html?key="+key;
            window.location.href=encodeURI(url);
            break;
        case 3:
             var jb={'十二指肠炎':0,'胆石症':1,'宫颈妊娠':2,'慢性肝炎':3,'肠道功能紊乱':4,'痢疾':5,'反流性食管炎':6,'结肠炎':7,'营养不良':8,'坐骨神经损伤':9,'农药中毒':10,'儿童癫痫':11,'麻风病':12,'高血压脑病':13,'帕金森综合征':14,'煤气中毒':15,'弱智':16,'重症肌无力':17,'慢性心衰':18,'小儿感冒':19,'手足口病':20,'百日咳':21,'遗尿症':22,'子宫炎':23};
             if(key in jb)
                key=jb[key];
             url="disease.html?key="+key;
            window.location.href=encodeURI(url);
            break;
    }
    console.log(search_info);
}
var xuan = document.getElementById("xuan");
console.log(xuan);
var sheng = document.getElementById("sheng");
console.log(sheng);
var rong = document.getElementById("rong");
console.log(rong);
sheng.style.display = 'none';
rong.style.display = 'none';
function jing(e)
{
   var parent = e.parentElement;
   var child = parent.children;
   for(var i=0;i<child.length;i++)
   if(child[i].hasAttribute('class'))
       child[i].removeAttribute('class');
    e.setAttribute('class','xuan');
    xuan.style.display = 'block'
    sheng.style.display = 'none';
    rong.style.display = 'none';
}
function yang(e)
{
    var parent = e.parentElement;
   var child = parent.children;
   for(var i=0;i<child.length;i++)
   if(child[i].hasAttribute('class'))
       child[i].removeAttribute('class');
    e.setAttribute('class','xuan');
    sheng.style.display = 'block'
    xuan.style.display = 'none'
    rong.style.display = 'none';
}
function mei(e)
{
    var parent = e.parentElement;
   var child = parent.children;
   for(var i=0;i<child.length;i++)
   if(child[i].hasAttribute('class'))
       child[i].removeAttribute('class');
    e.setAttribute('class','xuan');
    rong.style.display = 'block';
    xuan.style.display = 'none';
     sheng.style.display = 'none';
}