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
//获得咨询记录
var record;
var doctor;
var patient;
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
                createWen();;
            }
        }
    },null);
}
var ID;
var Name;
var Hosp;
function getCookie()
{
    if(document.cookie.length>0)
    {
      var info = document.cookie.split('=');
      ID=info[1];
      Hosp=info[2];
      Name=info[3];
      console.log(info);
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
}

//问诊
function createWen()
{
    var doctorId=ID;
    var department = ['妇科','儿科','内科','皮肤性病科','营养科','骨伤科','男科','外科','肿瘤及防治科','中医科','口腔颌面科','眼科','整形美容科','精神心理科','产科'];
    var sex = {"female":"女","male":"男"};
    var info = document.getElementById("info");
    for(var i in record)
    {      
        if(doctorId!=record[i]['doctorId'])
            continue;
        if(record[i]['doctorAdvice']!=null)
            continue;
        var record_info = document.createElement("div");
        record_info.setAttribute("class","record_info");
            //第一行
        var div = document.createElement("div");
            
        var span = document.createElement("span");
        span.innerHTML=record[i]['id']+"+"+record[i]['patientId'];
        span.style.display = 'none';
        div.appendChild(span);
        
        var div_ = document.createElement('div');
        div_.className="div_";
        var span = document.createElement("span");
        span.className="patient_name";
        span.innerHTML="患者姓名："+patient[i]['name'];
        div_.appendChild(span);

        var span = document.createElement("span");
        span.className="patient_name";
        span.innerHTML="患者性别："+sex[patient[i]['sex']];
        div_.appendChild(span);

        var span = document.createElement("span");
        span.className="patient_name";
        span.innerHTML="患者手机号："+patient[i]['phone'];
        div_.appendChild(span);
        div.appendChild(div_);
        record_info.appendChild(div);
        
        var span = document.createElement("span");
        span.setAttribute("class","patient_description");
        span.innerHTML="病情描述";
        div.appendChild(span);

        var p = document.createElement("p");
        p.innerHTML=record[i]['patientStatus'];
        div.appendChild(p);
        record_info.appendChild(div);
            //第二
        var div = document.createElement("div");

        var span = document.createElement("span");
        span.setAttribute("class","doctor_advice");
        span.innerHTML="医生诊断";
        div.appendChild(span);
               
        var p = document.createElement("textarea");
        p.className="";
        div.appendChild(p);
        record_info.appendChild(div);
                
        var button = document.createElement("button");
        button.innerHTML="提交";
        button.className="button";
        button.setAttribute("onclick","save(this)");
        div.appendChild(button);
        
        info.appendChild(record_info);
        
        var div = document.createElement("div");
        div.setAttribute("class","medicine_advice");
        
        var span = document.createElement("span");
        span.setAttribute("class","medicine_title");
        span.innerHTML="药品推荐";
        div.appendChild(span);

        var button = document.createElement("button");
        button.setAttribute("onclick","add_medicine(this)");
        button.innerHTML="添加药品";
        div.appendChild(button);

        var button = document.createElement("button");
        button.className="send_m";
        button.setAttribute("onclick","send_med(this,"+record[i]['id']+")");
        button.innerHTML="提交";
        div.appendChild(button);

        var div_ = document.createElement("div");
        div_.className="div";
        div.appendChild(div_);
        info.appendChild(div);
    }
}
//清除
function clear_info()
{
    var info = document.getElementById("info");
     while(info.firstElementChild)
        info.removeChild(info.firstElementChild);
}
//添加药品
var list;
//点击次数
var n=0;
function add_medicine(e)
{
    //获取对应药list
    var list=['选择药品','AAAA','BBBBB','CCC','DDDD','EEE','FFFFFF','GGG','HHHHHHH'];
    var parent = e.nextElementSibling.nextElementSibling;
    var select = document.createElement("select");
    for(var i in list)
    {
        var option = document.createElement("option");
        option.innerHTML=list[i];
        if(i!=0)
           option.value=list[i];
       else
           option.value=0;
        select.appendChild(option);
    }
    var number = document.createElement("input");
    number.type="number";
    number.value=1;
    
    parent.appendChild(select);
   parent.appendChild(number);
}
//保存信息
function save(e)
{
    var text = e.previousElementSibling.value.trim();
    if(text=="")
    {
        alert("医生建议不能为空");
        return false;
    }
    var parent = e.parentElement.parentElement;
    var id =parent.firstElementChild.firstElementChild.innerHTML.split('+');
    var next = parent.nextElementSibling;
    var medicine = next.children;
    var advice = new Object();
    advice.id=id[0];
    advice.patientId=id[1];
    advice.doctorId=ID;
    advice.doctorAdvice=text;
    var medicine_list=[];
    medicine_list.push(advice);
    // for(var i=1;i<medicine.length-1;i+=2)
    // {
    //     var info={};
    //     info['name']=medicine[i].value;
    //     info['number']=medicine[i+1].value;
    //     medicine_list.unshift(info);
    // }
    // advice.medicine=medicine_list;
    console.log(JSON.stringify(advice));
    n=0;
    if(confirm("确认保存吗"))
    {
        var url="http://localhost:8080/api/mr/batch/update";
        loadXMLDoc(url,"PUT",function(){
            if(xmlhttp.readyState==4)
            {
                console.log(xmlhttp.responseText);
                if(xmlhttp.status==204)
                {
                    alert("保存成功");
                    var info =document.getElementById('info');
                    info.removeChild(parent);
                    info.removeChild(next);
                }
            }
        },JSON.stringify(medicine_list));
        
    }
}

//发送药品
// function send_med(e,id){
//     var medicine = [];
//     var medicine_info = e.nextElementSibling.children;
//     for(var i=0;i<medicine_info.length;i+=2)
//     {
//         var medicine;
//         if(medicine_info[i].value!="0"&&medicine_info[i+1].value>0)
//         {
//             var list={};
//             list['medicalRecordId']=5;
//             list[medicine_info[i].value]=parseInt(medicine_info[i+1].value);
//             medicine.push(list);
//         }
        
//     }
//     console.log(medicine);
//     console.log(JSON.stringify(medicine));
//     var url="http://localhost:8080/api/mo/batch/save";
//     loadXMLDoc(url,"POST",function(){
//         if(xmlhttp.readyState==4)
//         {
//             alert(xmlhttp.status);
//             console.log(xmlhttp.responseText);
//             if(xmlhttp.status==201)
//             {
//                 alert("添加药品成功");
//             }
//         }
//     },JSON.stringify(medicine));
//     // /batch/save
// }