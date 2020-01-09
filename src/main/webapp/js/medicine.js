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
    createMedicine('胃肠用药');
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
            else
                key=-1;
            url="hospitals.html?key="+key;
            window.location.href=encodeURI(url);
            break;
        case 2:
            var ks={'内科':0,'外科':1,'妇科':2,'皮肤性病科':3,'骨伤科':4,'肿瘤及防治科':5,'儿科':6,'口腔颌面科':7,'中医科':8,'精神心理科':9,'眼科':10,'男科':11,'营养科':12,'整形美容科':13,'产科':14};
            if(key in ks)
                key=ks[key];
            else
                key=-1;
            url="departmet.html?key="+key;
            window.location.href=encodeURI(url);
            break;
        case 3:
             var jb={'十二指肠炎':0,'胆石症':1,'宫颈妊娠':2,'慢性肝炎':3,'肠道功能紊乱':4,'痢疾':5,'反流性食管炎':6,'结肠炎':7,'营养不良':8,'坐骨神经损伤':9,'农药中毒':10,'儿童癫痫':11,'麻风病':12,'高血压脑病':13,'帕金森综合征':14,'煤气中毒':15,'弱智':16,'重症肌无力':17,'慢性心衰':18,'小儿感冒':19,'手足口病':20,'百日咳':21,'遗尿症':22,'子宫炎':23};
             if(key in jb)
                key=jb[key];
            else
                key=-1;
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
//创建药品信息
function createMedicine(key)
{
    var list = [
        {"id":1,"name":"铝碳酸镁咀嚼片","price":"18.00","description":"用于消化不良、腹胀、嗳气、恶心、呕吐、腹部胀痛啊"},
        {"id":2,"name":"铝碳酸镁咀嚼片","price":"18.00","description":"用于消化不良、腹胀、嗳气、恶心、呕吐、腹部胀痛"},
        {"id":3,"name":"铝碳酸镁咀嚼片","price":"18.00","description":"用于消化不良、腹胀、嗳气、恶心、呕吐、腹部胀痛"},
        {"id":4,"name":"铝碳酸镁咀嚼片","price":"18.00","description":"用于消化不良、腹胀、嗳气、恶心、呕吐、腹部胀痛"},
        {"id":5,"name":"铝碳酸镁咀嚼片","price":"18.00","description":"用于消化不良、腹胀、嗳气、恶心、呕吐、腹部胀痛"},
        {"id":6,"name":"铝碳酸镁咀嚼片","price":"18.00","description":"用于消化不良、腹胀、嗳气、恶心、呕吐、腹部胀痛"},
    ]
    var info = document.getElementById("info");
    for(var i in list)
    {
            var div_medicine = document.createElement("div");
            div_medicine.setAttribute("class","medicine");
            //第一行
            var div_name = document.createElement("div");
            
            var span = document.createElement("span");
            span.innerHTML=list[i]['id'];
            span.style.display = 'none';
            div_name.appendChild(span);
            var span = document.createElement("span");
            span.setAttribute("class","name");
            span.innerHTML=list[i]['name'];
            div_name.appendChild(span);

            var span = document.createElement("span");
            span.setAttribute("class","price");
            span.innerHTML="￥"+list[i]['price'];
            div_name.appendChild(span);
            div_medicine.appendChild(div_name);
            //第二行
            var div_phone = document.createElement("div");
            div_phone.setAttribute("class","guge");

            var span = document.createElement("span");
            span.innerHTML="规格：10mgx30片/盒";
            div_phone.appendChild(span);

            var span = document.createElement("span");
            span.innerHTML="剂型：片剂";
            div_phone.appendChild(span);
            
            var span = document.createElement("span");
            span.innerHTML="批准文号：国药准字H10910003 ";
            div_phone.appendChild(span);
            div_medicine.appendChild(div_phone);
            //第三行
            var dis = document.createElement("div");
            dis.setAttribute("class","dis");
            if(list[i]["description"].length>23)
                dis.innerHTML=list[i]["description"].substring(0,23)+"......";
            else
                dis.innerHTML=list[i]["description"];
            div_medicine.appendChild(dis);
        
            //第四行
            var div_add = document.createElement("div");
            div_add.setAttribute("class","gouwu");
            var input = document.createElement("input");
            input.setAttribute("type","number");
            input.setAttribute("value","1");
            div_add.innerHTML="数量：";
            div_add.appendChild(input);
            var button = document.createElement("button");
            button.setAttribute("onclick","add_one(this)");
            button.innerHTML="加入购物车";
            div_add.appendChild(button);
            div_medicine.appendChild(div_add);
            //放到info
            info.appendChild(div_medicine);
    }
}
//获得关键字
function getKey(e)
{
    var info = document.getElementById("info");
    var key = e.innerHTML;
    tab_css(e);
    clear_info(info);
    console.log(key);
    //通过keyId获得药品列表list
    createMedicine(key);    
}
//清除信息
function clear_info(info)
{
     while(info.firstElementChild)
        info.removeChild(info.firstElementChild);
}
//购物车订单
var shopCar ={};
function add_one(e)
{
    var flag=1;
    //获取Id 药名 价钱
    var medicine;
    var medicine_info = e.parentElement.parentElement.firstElementChild.children;
    if(medicine_info[0].innerHTML in shopCar)
    {
        medicine = shopCar[medicine_info[0].innerHTML];
    }
    else
    {
        medicine = new Object();
        medicine.medicineNum=0;
    }    
    medicine.id=medicine_info[0].innerHTML;
    medicine.medicineName=medicine_info[1].innerHTML;
    medicine.price=medicine_info[2].innerHTML.substring(1);
    
    var carNum = document.getElementById('carNum');
    var num = parseInt(carNum.innerHTML);
    var value_num = e.previousElementSibling.value;
    var temp = medicine.medicineNum;
    if((temp+=parseInt(value_num))<0)
    {
        alert("数量不能为负");
        flag=0;
    }
    else
    {
        medicine.medicineNum+=parseInt(value_num);
        flag=1;
    }
    if(medicine.id in shopCar||parseInt(value_num)>0)
        num+=parseInt(value_num);
    if(medicine.medicineNum>0)
        shopCar[medicine.id]=medicine;
    else
        delete shopCar[medicine.id];
    if(num<10&&num>=0&&flag)
        carNum.innerHTML="0"+num;
    else if(num>0)
        carNum.innerHTML=num;
}
//购物清单
function listing()
{
    var sum=0;
    var div = document.getElementById('list');
    div.style.display = 'block';
    clear_info(div);
    for(var i in shopCar)
    {
        var list = document.createElement("div");
        var span = document.createElement("span");
        span.setAttribute("class","list_name");
        span.innerHTML=shopCar[i]['medicineName'];
        list.appendChild(span);
        
        var span = document.createElement("span");
        span.setAttribute("class","list_num");
        span.innerHTML="数量："+shopCar[i]['medicineNum'];
        list.appendChild(span);
        
        var span = document.createElement("span");
        span.setAttribute("class","list_price");
        span.innerHTML=shopCar[i]['price'];
        list.appendChild(span);
        
        div.appendChild(list);
        
        sum+=shopCar[i]['medicineNum']*shopCar[i]['price'];
    }
    var span = document.createElement('span');
    span.setAttribute("class","sum");
    span.innerHTML="总价："+sum+"（元）";
    div.appendChild(span);
    
    var button = document.createElement("button");
    button.setAttribute("onclick","pay(this)")
    button.innerHTML="结算";
    div.appendChild(button);                                
}
//清空购物车
function clearCar()
{
    var div = document.getElementById('list');
    div.style.display = 'none';
    clear_info(div);
}
function pay()
{
    console.log(shopCar);
}