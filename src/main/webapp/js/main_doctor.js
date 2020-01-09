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
//初始化
function init()
{
    getCookie();
    createInfo('北京',1);
    createQuestion();
}
//用户标识
var user_flag=1;
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
            url="hospitals.html?key="+key;
            window.location.href=encodeURI(url);
            break;
        case 2:
            url="departemt.htmls.html?key="+key;
            window.location.href=encodeURI(url);
            break;
        case 3:
             url="disease.html?key="+key;
            window.location.href=encodeURI(url);
            break;
    }
    console.log(search_info);
}
//清楚信息
function clear_info(e)
{
    while(e.firstElementChild)
        e.removeChild(e.firstElementChild);
}
//清除所有信息
function clear_all()
{
  var info1 = document.getElementById('info1');
  var info2 = document.getElementById('info2'); 
  var info3 = document.getElementById('info3');
  var list = [info1,info2,info3];
  for(var i=0;i<list.length;i++)
     clear_info(list[i]);
}
function createInfo(key,flag)
{
    var department = ['妇科','儿科','内科','皮肤性病科','营养科','骨伤科','男科','外科','肿瘤及防治科','中医科','口腔颌面科','眼科','整形美容科','精神心理科','产科'];
    var info = document.getElementById('info'+flag);
    clear_all();
    //获取信息存储在list
    var list = [
        {"name":"梅长林","departmentId":6,"level":"副主任医师","phone":"12345678999","hospital":"上海什么医院","good":98,"people":"1230","skill":"肿瘤、慢性阻塞性肺疾病、感冒、细菌感染、咽喉炎、咳痰"},
        {"name":"梅长林","departmentId":6,"level":"副主任医师","phone":"12345678999","hospital":"上海什么医院","good":98,"people":"1230","skill":"肿瘤、慢性阻塞性肺疾病、感冒、细菌感染、咽喉炎、咳痰"},
        {"name":"梅长林","departmentId":6,"level":"副主任医师","phone":"12345678999","hospital":"上海什么医院","good":98,"people":"1230","skill":"肿瘤、慢性阻塞性肺疾病、感冒、细菌感染、咽喉炎、咳痰"},
        {"name":"梅长林","departmentId":6,"level":"副主任医师","phone":"12345678999","hospital":"上海什么医院","good":98,"people":"1230","skill":"肿瘤、慢性阻塞性肺疾病、感冒、细菌感染、咽喉炎、咳痰"},
        {"name":"梅长林","departmentId":6,"level":"副主任医师","phone":"12345678999","hospital":"上海什么医院","good":98,"people":"1230","skill":"肿瘤、慢性阻塞性肺疾病、感冒、细菌感染、咽喉炎、咳痰"},
        {"name":"梅长林","departmentId":6,"level":"副主任医师","phone":"12345678999","hospital":"上海什么医院","good":98,"people":"1230","skill":"肿瘤、慢性阻塞性肺疾病、感冒、细菌感染、咽喉炎、咳痰"}
    ]
    for(var i in list)
    {
            var div_item = document.createElement("div");
            div_item.setAttribute("class","item");
            //第一行
            var div_name = document.createElement("div");
            div_name.setAttribute("class","item-name");

            var span = document.createElement("span");
            span.innerHTML=list[i]['name'];
            div_name.appendChild(span);

            var span = document.createElement("span");
            span.setAttribute("class","item-level");
            span.innerHTML=department[list[i]['departmentId']-1]+"【"+list[i]['level']+"】";
            div_name.appendChild(span);
            div_item.appendChild(div_name);
            //第二行
            var div_phone = document.createElement("div");
            div_phone.setAttribute("class","item-phone");

            var span = document.createElement("span");
            span.innerHTML="电话："+list[i]['phone'];
            div_phone.appendChild(span);

            var span = document.createElement("span");
            span.setAttribute("class","item-level");
            span.innerHTML=list[i]['hospital'];
            div_phone.appendChild(span);
            div_item.appendChild(div_phone);
            //第三行
            var div_phone = document.createElement("div");
            div_phone.setAttribute("class","item-phone");

            var span = document.createElement("span");
            span.innerHTML="服务人次："+list[i]['people'];
            div_phone.appendChild(span);

            var span = document.createElement("span");
            span.setAttribute("class","item-level");
            span.innerHTML="好评率：<font color="+"red"+">"+list[i]['good']+"%</font>";
            div_phone.appendChild(span);
            div_item.appendChild(div_phone);
            //第四行
            var hr = document.createElement("hr");
            div_item.appendChild(hr);
            //第五行
            var div_add = document.createElement("div");
            div_add.setAttribute("class","item-address");
            div_add.innerHTML="擅长："+list[i]['skill'];
            div_item.appendChild(div_add);
            //放到info
            info.appendChild(div_item);
    }
    var a = document.createElement("a");
    a.href="#";
    a.setAttribute("class","block-more");
    a.innerHTML="更多医生";
    info.appendChild(a);
}
//获取点击关键字
function getKey(e,flag)
{
    var key = e.innerHTML;
    tab_css(e);
    console.log(key);
    createInfo(key,flag);
}
//跳转小样式
function tab_css(e)
{
    var parent = e.parentElement;
    var child = parent.children;
    for(var i=0;i<child.length;i++)
    {
        child[i].removeAttribute("class");
        child[i].setAttribute("class","block-capiton-item");
    }
    e.setAttribute("class","block-capiton-item block-capiton-item_focus");
}
//跳转大样式
function tab_Css(e)
{
    var parent = e.parentElement;
    var child = parent.children;
    for(var i=0;i<child.length;i++)
    {
        child[i].removeAttribute("class");
        child[i].setAttribute("class","item");
    }
    e.setAttribute("class","item item_focus");
}
//医院找医生
function hospital(e)
{
    var hospital = document.getElementById('hospital');
    var department = document.getElementById('department');
    var disease = document.getElementById('disease');
    hospital.style.display = 'block';
    department.style.display = 'none';
    disease.style.display = 'none';
    tab_Css(e);
    tab_css(hospital.firstElementChild.firstElementChild);
    createInfo('北京',1);
}
//科室找医生
function departments(e)
{
    var hospital = document.getElementById('hospital');
    var department = document.getElementById('department');
    var disease = document.getElementById('disease');
    hospital.style.display = 'none';
    department.style.display = 'block';
    disease.style.display = 'none';
    tab_Css(e);
    tab_css(department.firstElementChild.firstElementChild);
    createInfo('内科',2);
}
//疾病找医生
function disease(e)
{
    var hospital = document.getElementById('hospital');
    var department = document.getElementById('department');
    var disease = document.getElementById('disease');
    hospital.style.display = 'none';
    department.style.display = 'none';
    disease.style.display = 'block';
    tab_Css(e);
    tab_css(disease.firstElementChild.firstElementChild);
    createInfo('小儿感冒',3);
}

var question_list;
var doctor_list;
function createQuestion()
{
    var info = document.getElementById('problem');
    var url="http://localhost:8080/api/qa/list?pageSize=3"
    loadXMLDoc(url,"GET",function(){
        if(xmlhttp.readyState==4)
        {
            if(xmlhttp.status==200)
            {
                var text = xmlhttp.responseText;
                var temp = JSON.parse(text);
                var text = xmlhttp.responseText;
                var temp = JSON.parse(text);
                var temp1=temp["lists"];
                var temp2=temp1[0];
                question_list=temp2['records'];
                doctor_list=temp1[1];
                for(var i in  question_list)
              {
                var problem_main = document.createElement("div");
                problem_main.setAttribute("class","problem_main");
                //问题
                var problem = document.createElement("div");
                problem.setAttribute("class","problem");
                
                var wen = document.createElement("span");
                wen.innerHTML="问";
                wen.setAttribute("class","wen");
                
                var problem_info = document.createElement("span");
                problem_info.setAttribute("class","problem_info");
                problem_info.innerHTML= question_list[i]['question'].substring(0,30)+"...";
                
                var time = document.createElement("span");
                time.setAttribute("class","time");
                time.innerHTML= question_list[i]['createTime'].substring(0,10);
                
                problem.appendChild(wen);
                problem.appendChild(problem_info);
                problem.appendChild(time);
                problem_main.appendChild(problem);
                //回答
                var answer = document.createElement("div");
                answer.setAttribute("class","answer");
                
                if(question_list[i]['answer']!=null)
                {
                    var da = document.createElement("span");
                    da.setAttribute("class","da");
                    da.innerHTML="答";

                    var answer_info = document.createElement('span');
                    answer_info.setAttribute("class","answer_info");
                    answer_info.innerHTML =  question_list[i]['answer'].substring(0,30)+"...";

                    var witer = document.createElement("span");
                    witer.setAttribute("class","witer");
                    witer.innerHTML=doctor_list[i].name+"&emsp;"+doctor_list[i].hospital;
                                            
                    answer.appendChild(da);
                    answer.appendChild(answer_info);
                    answer.appendChild(witer);
                }
                problem_main.appendChild(answer);
                info.appendChild(problem_main);
            }
              var a =document.createElement("a");
              a.setAttribute("class","more");
              a.innerHTML="更多问答";
              a.href="answer.html";
              info.appendChild(a);
            }
        }
    },null);
}