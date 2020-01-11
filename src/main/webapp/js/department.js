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
//初始化
function init()
{
    getCookie();
    getURL();

}
//获取URL信息
function getURL()
{
    var  thisURL = document.URL;
    var  getval =thisURL.split('?');
    if(getval[1]==null)
    {
     createUser('内科');
    }
    else
    {
          var showval = getval[1].split('=');
          if(isNaN(showval[1]))
          {
              var diy = document.getElementById('diy');
              tab_css(diy);
              createUser(decodeURIComponent(showval[1]));
          }
          else
          {
              var li = document.getElementsByTagName('li');
              getKey(li[showval[1]]);
          }
    }
}
//获取Cookie 处理top
var ID;
function getCookie()
{
    if(document.cookie.length>0)
    {
      var info = document.cookie.split('=');
      ID=info[1];
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
//样式转换
function tab_css(e)
{
    var parent = e.parentElement;
    var child = parent.children;
    for(var i=0;i<child.length;i++)
        if(child[i].hasAttribute("class"))
        child[i].removeAttribute("class");
    e.setAttribute("class","xuan");
}
var list;
//创建医生信息
function createUser(key)
{    
    var department = ['妇科','儿科','内科','皮肤性病科','营养科','骨伤科','男科','外科','肿瘤及防治科','中医科','口腔颌面科','眼科','整形美容科','精神心理科','产科'];
    var url="http://localhost:8080/api/search/depInfo/?words="+key;
    console.log(key);
    loadXMLDoc(url,"POST",function(){
        if(xmlhttp.readyState==4)
        {
            console.log(xmlhttp.responseText);
            if(xmlhttp.status==200)
            {
                var text = xmlhttp.responseText;
                var temp =JSON.parse(text);
                console.log(temp);
                list = temp['doctors'];
                console.log(list);
                 var num=100;
                 var people=1000;
                for(var i in list)
         {
           
            var div_doctor = document.createElement("div");
            div_doctor.setAttribute("class","doctor");
            //第一行
            var div_name = document.createElement("div");
            
            var span = document.createElement("span");
            span.innerHTML=list[i]['id'];
            span.style.display = 'none';
            div_name.appendChild(span);
            
            var span = document.createElement("span");
            span.setAttribute("class","doctor-name");
            span.setAttribute("onclick","get_illness(this)");
            span.innerHTML=list[i]['name'];
            div_name.appendChild(span);

            var span = document.createElement("span");
            span.setAttribute("class","doctor-level");
            span.innerHTML=department[list[i]['departmentId']-1]+"【"+list[i]['level']+"】";
            div_name.appendChild(span);
            div_doctor.appendChild(div_name);
            //第二行
            var div_phone = document.createElement("div");
            div_phone.setAttribute("class","doctor-phone");

            var span = document.createElement("span");
            span.innerHTML="电话："+list[i]['phone'];
            div_phone.appendChild(span);

            var span = document.createElement("span");
            span.setAttribute("class","doctor-hosptal");
            span.innerHTML=list[i]['hospital'];
            div_phone.appendChild(span);
            div_doctor.appendChild(div_phone);
            //第三行
            var div_phone = document.createElement("div");
            div_phone.setAttribute("class","doctor-people");

            var span = document.createElement("span");
            span.innerHTML="服务人次："+list[i]['people'];
            span.innerHTML="服务人次："+people--;
            div_phone.appendChild(span);

            var span = document.createElement("span");
            span.setAttribute("class","doctor-good");
            // span.innerHTML="好评率：<font color="+"red"+">"+list[i]['good']+"%</font>";
            span.innerHTML="好评率：<font color="+"red"+">"+num--+"%</font>";
            div_phone.appendChild(span);
            div_doctor.appendChild(div_phone);
            //第四行
            var hr = document.createElement("hr");
            div_doctor.appendChild(hr);
            //第五行
            var div_add = document.createElement("div");
            div_add.setAttribute("class","doctor-skill");
            div_add.innerHTML="擅长："+list[i]['skill'];
            div_doctor.appendChild(div_add);
            //放到info
            info.appendChild(div_doctor);
    }
            }
        }
    },null)
    var info = document.getElementById("info");    
}
//获得关键字
function getKey(e)
{
    var key = e.innerHTML;
    tab_css(e);
    clear_info();
    console.log(key);
    //通过keyId获得医生列表list
    createUser(key);    
}
//清除信息
function clear_info()
{
    var info = document.getElementById("info");
     while(info.firstElementChild)
        info.removeChild(info.firstElementChild);
}
//填写病例
function get_illness(e)
{
    var patient_id = ID;
    var doctor_id = e.previousElementSibling.innerHTML;
    OpenWindow("illness.html?="+patient_id+"="+doctor_id,  '500','310');
}
function OpenWindow(pageURL, innerWidth, innerHeight)
{
	var ScreenWidth = screen.availWidth
	var ScreenHeight = screen.availHeight
	var StartX = (ScreenWidth - innerWidth) / 2
	var StartY = (ScreenHeight - innerHeight) / 2
	wins = window.open(pageURL, 'OpenWin', 'left='+ StartX + ', top='+ StartY + ', Width=' + innerWidth +', height=' + innerHeight + ', resizable=no, scrollbars=yes, status=no, toolbar=no, menubar=no, location=no')
	wins.focus();
}