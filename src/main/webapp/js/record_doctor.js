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
                clear_info();
                createWen(record);
            }
        }
    },null);
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
function tab_css(e)
{
    var parent = e.parentElement;
    var child = parent.children;
    for(var i=0;i<child.length;i++)
        if(child[i].hasAttribute("class"))
        child[i].removeAttribute("class");
    e.setAttribute("class","xuan");
}
//问诊
function createWen(list)
{
    var sex = {"female":"女","male":"男"};
    var department = ['妇科','儿科','内科','皮肤性病科','营养科','骨伤科','男科','外科','肿瘤及防治科','中医科','口腔颌面科','眼科','整形美容科','精神心理科','产科'];
    var info = document.getElementById("info");
    for(var i in list)
    {      
        if(list[i]['doctorId']!=ID)
            continue;
        if(list[i]['doctorAdvice']!=null)
       {
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
            p.innerHTML=list[i]['doctorAdvice'];
            div.appendChild(p);
            record_info.appendChild(div);
                
            var div = document.createElement("div");
            div.setAttribute("class","write_info");
            
            var div_ = document.createElement("div");
            div_.className="div_";
            var span = document.createElement("span");
            span.innerHTML="患者姓名："+patient[i]['name'];
            div_.appendChild(span);

            var span = document.createElement("span");
            span.innerHTML="患者性别："+sex[patient[i]['sex']];
            div_.appendChild(span);

            var span = document.createElement("span");
            span.innerHTML="患者电话："+patient[i]['phone'];
            div_.appendChild(span);
            div.appendChild(div_);
            record_info.appendChild(div);
                    
            var span = document.createElement("span");
            span.innerHTML="患者评价：";
            div.appendChild(span);
            if(list[i]['patientAppraise']!=null)
            {
                    
                    if(list[i]['patientAppraise']==1)
                    {
                        span.innerHTML+="好评";
                        span.style.color="rgba(255,0,0,0.7)";
                    }
                    else
                    {
                        span.innerHTML+="差评";
                        span.style.color="steelblue";
                    }
                    div.appendChild(span);
            }
            else
            {
                    span.innerHTML+="未评价";
                    div.appendChild(span);
            }
                record_info.appendChild(div);
        info.appendChild(record_info);
        
        var div = document.createElement("div");
        div.setAttribute("class","medicine_advice");
        
        var span = document.createElement("span");
        span.setAttribute("class","medicine_title");
        span.innerHTML="药品推荐";
        div.appendChild(span);
        
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
}

function clear_info()
{
    var info = document.getElementById("info");
     while(info.firstElementChild)
        info.removeChild(info.firstElementChild);
}
