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
//获取Cookie 处理top
function init()
{
    getCookie();
    get_record();
}
//获得问诊记录
var record;
var doctor;
var patient;
var medicine;
function get_record()
{
    var url="http://localhost:8080/api/mr/list?pageSize=100";
    loadXMLDoc(url,"GET",function(){
        if(xmlhttp.readyState==4)
        {
            if(xmlhttp.status==200)
            {
                var text = xmlhttp.responseText;
                var temp = JSON.parse(text);
                var temp1=temp["lists"];
                var temp2=temp1[0];
                record=temp2['records'];
                doctor=temp1[1];
                patient=temp1[2];
                medicine=temp1[3]
                console.log(medicine);
                clear_info();
                createWen(record);
            }
        }
    },null);
}
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
var user_id=1;
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
function tab_css(e)
{
    var parent = e.parentElement;
    var child = parent.children;
    for(var i=0;i<child.length;i++)
        if(child[i].hasAttribute("class"))
        child[i].removeAttribute("class");
    e.setAttribute("class","xuan");
}
function getKey(e)
{
    var key = e.innerHTML;
    tab_css(e);
    clear_info();
    console.log(key);
    //通过keyId获得医生列表list
    if(key=="问诊记录")
        createWen(record);  
    else
        createMedicine();
}
//问诊
function createWen(list)
{
    var department = ['妇科','儿科','内科','皮肤性病科','营养科','骨伤科','男科','外科','肿瘤及防治科','中医科','口腔颌面科','眼科','整形美容科','精神心理科','产科'];
    var info = document.getElementById("info");
    for(var i in list)
    {      
        if(list[i]['patientId']!=ID)
            continue;
        var record_info = document.createElement("div");
        record_info.setAttribute("class","record_info");
            //第一行
        var div = document.createElement("div");
            
        var span = document.createElement("span");
        span.innerHTML=list[i]['id'];
        span.style.display = 'none';
        div.appendChild(span);
           
        var span = document.createElement("span");
        span.setAttribute("class","patient_description");
        span.innerHTML="病情描述";
        div.appendChild(span);

        var p = document.createElement("p");
        p.innerHTML=list[i]['patientStatus'];
        div.appendChild(p);
        record_info.appendChild(div);
            //第二行
        var div = document.createElement("div");

        var span = document.createElement("span");
        span.setAttribute("class","doctor_advice");
        span.innerHTML="医生诊断";
        div.appendChild(span);
       
        var p = document.createElement("p");
        if(list[i]['doctorAdvice']!=null)
            p.innerHTML=list[i]['doctorAdvice'];
        else
             p.innerHTML="医生尚未诊断";
        div.appendChild(p);
        record_info.appendChild(div);
        
        var div = document.createElement("div");
        div.setAttribute("class","write_info");

        var span = document.createElement("span");
        span.innerHTML="医院："+doctor[i]['hospital'];
        div.appendChild(span);
        
        var span = document.createElement("span");
        span.innerHTML="科室："+department[doctor[i]['departmentId']-1];
        div.appendChild(span);
        
        var span = document.createElement("span");
        span.innerHTML="医生："+doctor[i]['name'];
        div.appendChild(span);
        record_info.appendChild(div);
       
        var div = document.createElement("div");
        div.setAttribute("class","evaluation");
        
        var span = document.createElement("span");
        span.innerHTML="评价：";
        div.appendChild(span);
        if(record[i]['patientAppraise']!=null)
        {
            if(list[i]['patientAppraise']==1)
            {
                span.innerHTML+="好评";
                span.style.color="rgb(255,0,0)";
            }
            else
            {
                span.innerHTML+="差评";
                p.style.color="steelblue";
            }
        }
        else
        {
            span.innerHTML+="未评价";
            var button = document.createElement("button");
            button.setAttribute("class","good");
            button.setAttribute("onclick","pingjia(this,1)");
            button.innerHTML="好评";
            div.appendChild(button);
            
            var button = document.createElement("button");
            button.setAttribute("class","bed");
            button.setAttribute("onclick","pingjia(this,-1)");
            button.innerHTML="差评";
            div.appendChild(button);
        }
        record_info.appendChild(div);
        info.appendChild(record_info);
        
        var div = document.createElement("div");
        div.setAttribute("class","medicine_advice");
        
        var span = document.createElement("span");
        span.setAttribute("class","medicine_title");
        span.innerHTML="药品推荐";
        div.appendChild(span);
        
        var button = document.createElement("button");
        button.setAttribute("onclick","goShop()");
        button.innerHTML="购药";
        div.appendChild(button);
        for(var k in medicine)
        {
            if(medicine[k]['medicalRecordId']!=record[i]['id'])
                   continue;
            var div_ = document.createElement("div");
            var span = document.createElement("span");
            span.setAttribute("class","name");
            span.innerHTML=medicine[k]['medicineName'];
            div_.appendChild(span);
            var span = document.createElement("span");
            span.setAttribute("class","number");
            span.innerHTML="数量："+medicine[k]['medicineNum'];
            div_.appendChild(span);
            div.appendChild(div_);
        }
       
        info.appendChild(div);
    }
}
//评价
function pingjia(e,flag)
{
    var parent = e.parentElement;
    var id = parent.parentElement.firstElementChild.firstElementChild.innerHTML;
    var p = parent.firstElementChild;
    var info = new Object();
    info.id=id;
    for(var i in record)
    {
        if(record[i]['id']==id)
        {
           info.patientId=record[i]['patientId'];
           info.doctorId=record[i]['doctorId'];
           break;
        }
    }
    if(flag==1)
    {
        p.innerHTML="评价&emsp;好评";
        p.style.color="rgb(255,0,0)";
    }    
    else
    {
        p.innerHTML+="评价&emsp;差评";
        p.style.color="steelblue";
    }
    var child = parent.children;
    parent.removeChild(child[1]);
    parent.removeChild(child[1]);
    if(flag==1)
        info.patientAppraise=1;
    else
        info.patientAppraise=-1;
    var list = [];
    list.push(info);
    var url="http://localhost:8080/api/mr/batch/update";
    // var msg=JSON.stringify(info);
    loadXMLDoc(url,"PUT",function(){
         if (xmlhttp.readyState == 4) {
            console.log(xmlhttp.responseText)
            if (xmlhttp.status == 204) {
                alert("评价成功");
                get_record();
            }
         }
    },JSON.stringify(list));
}
//药品订单
function createMedicine()
{
    var info = document.getElementById("info");
    var list=[
        {
            "time":"2017-02-25",
            "info":[{"name":"铝碳酸镁咀嚼片","number":10,"price":18.0},
                    {"name":"铝碳酸镁咀嚼片","number":10,"price":18.0}
                   ]
        },
       {
            "time":"2017-02-25",
            "info":[{"name":"铝碳酸镁咀嚼片","number":10,"price":18.0},
                   {"name":"铝碳酸镁咀嚼片","number":10,"price":18.0},
                   {"name":"铝碳酸镁咀嚼片","number":10,"price":18.0},
                   {"name":"铝碳酸镁咀嚼片","number":10,"price":18.0}
                   ]
        },
        {
            "time":"2017-02-25",
            "info":[{"name":"铝碳酸镁咀嚼片","number":10,"price":18.0},
                   {"name":"铝碳酸镁咀嚼片","number":10,"price":18.0},
                   {"name":"铝碳酸镁咀嚼片","number":10,"price":18.0},
                   {"name":"铝碳酸镁咀嚼片","number":10,"price":18.0},
                   {"name":"铝碳酸镁咀嚼片","number":10,"price":18.0}
                   ]
        }
    ];
    for(var i in list)
    {
        var sum = 0;
        var table = document.createElement("table");
        
        var caption = document.createElement("caption");
        caption.innerHTML="购药清单";
        table.appendChild(caption);
        
        var tbody = document.createElement("tbody");
        var tr = document.createElement("tr");
        var th= document.createElement("th");
        th.innerHTML="药品名称";
        tr.appendChild(th);
        var th= document.createElement("th");
        th.innerHTML="数量";
        tr.appendChild(th);
        var th= document.createElement("th");
        th.innerHTML="单价(元)";
        tr.appendChild(th);
        tbody.appendChild(tr);
        for(var j in list[i]['info'])
        {
            var tr = document.createElement("tr");
            var td= document.createElement("td");
            td.innerHTML=list[i]['info'][j]['name'];
            tr.appendChild(td);
            
            var td= document.createElement("td");
            td.innerHTML=list[i]['info'][j]['number'];
            tr.appendChild(td);
            
            var td= document.createElement("td");
            td.innerHTML=list[i]['info'][j]['price'];
            tr.appendChild(td);
            tbody.appendChild(tr);
            
            //计算总价
            sum+=list[i]['info'][j]['number']*list[i]['info'][j]['price'];
        }
        var tr = document.createElement("tr");
        var td= document.createElement("td");
        td.setAttribute("class","time");
        td.innerHTML="购药时间："+list[i]['time'];
        tr.appendChild(td);
            
        var td= document.createElement("td");
        td.innerHTML="";
        tr.appendChild(td);
            
        var td= document.createElement("td");
        td.setAttribute("class","sum");
        td.innerHTML=sum;
        tr.appendChild(td);
        tbody.appendChild(tr);
        table.appendChild(tbody);    
        info.appendChild(table);
    }
}
//清除
function clear_info()
{
    var info = document.getElementById("info");
     while(info.firstElementChild)
        info.removeChild(info.firstElementChild);
}
//购物
function goShop(){
    var url ="medicine.html";
    window.location.href=encodeURI(url);
}