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
    getQuestion();
}
//获取Cookie 处理top
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
var question_list;
var doctor_list;
function getQuestion()
{
    var info = document.getElementById('problem');
    var url="http://localhost:8080/api/qa/list?sortBy=create_time&pageSize=100&sortOf=DESC";
    loadXMLDoc(url,"GET",function(){
        if(xmlhttp.readyState==4)
        {
            if(xmlhttp.status==200)
            {
                var text = xmlhttp.responseText;
                var temp = JSON.parse(text);
                var temp1=temp["lists"];
                var temp2=temp1[0];
                question_list=temp2['records'];
                doctor_list=temp1[1];
                console.log(doctor_list);
                console.log(question_list);
                createQuestion();
            }
        }
    },null,true);
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
//创建回答信息
function createQuestion()
{
    var info = document.getElementById('prolem');
  for(var i in question_list)
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
    problem_info.innerHTML=question_list[i]['question'];
    
    var time = document.createElement("span");
    time.setAttribute("class","time");
    time.innerHTML=question_list[i]['createTime'];
    
    problem.appendChild(wen);
    problem.appendChild(problem_info);
    problem.appendChild(time);
    problem_main.appendChild(problem);
    //回答
    var answer = document.createElement("div");
    answer.setAttribute("class","answer");
    problem_main.appendChild(answer);
    info.appendChild(problem_main);
    if(question_list[i]['answer']!=null)
    {
        var da = document.createElement("span");
        da.setAttribute("class","da");
        da.innerHTML="答";

        var answer_info = document.createElement('span');
        answer_info.setAttribute("class","answer_info");
        answer_info.innerHTML = question_list[i]['answer'];

        var witer = document.createElement("span");
        witer.setAttribute("class","witer");
        witer.innerHTML=doctor_list[i]['name']+"&emsp;"+doctor_list[i]['hospital'];
                                
        answer.appendChild(da);
        answer.appendChild(answer_info);
        answer.appendChild(witer);
    }
    else
    {
        var id =document.createElement("span");
        id.innerHTML=question_list[i]['id'];
        id.style.display = 'none';
        answer.appendChild(id);
        
        var button = document.createElement("button");
        button.setAttribute("onclick","answer(this)");
        button.innerHTML="回答";
        answer.appendChild(button);
    }

    }
}
//问题ID
var problem_id;
function answer(e)
{
    problem_id = e.previousElementSibling.innerHTML;
    var parent=e.parentElement;
    parent.removeChild(e);
    var textarea = document.createElement("textarea");
    var button = document.createElement("button");
    button.innerHTML="保存";
    button.setAttribute("class","save");
    button.setAttribute("onclick","save(this)");
    parent.appendChild(textarea);
    parent.appendChild(button);
}
function save(e)
{
    var id = problem_id;
    //回答信息
    var value = e.previousElementSibling.value.trim();
    if(value=="")
    {
        alert("回答信息不能为空");
        return false;
    }
    var answer = e.parentElement;
    
    var da = document.createElement("span");
    da.setAttribute("class","da");
    da.innerHTML="答";

    var answer_info = document.createElement('span');
    answer_info.setAttribute("class","answer_info");
    answer_info.innerHTML = value;

    var witer = document.createElement("span");
    witer.setAttribute("class","witer");
        //数据库获取
    witer.innerHTML=Name+"&emsp;"+Hosp;

    while(answer.firstElementChild)
        answer.removeChild(answer.firstElementChild);

    answer.appendChild(da);
    answer.appendChild(answer_info);
    answer.appendChild(witer);
        
        //发送信息给数据库
    var answerInfo = new Object();
    answerInfo.id=problem_id;
    answerInfo.answer=value;
    answerInfo.doctorId=ID;
        
    var url="http://localhost:8080/api/qa/update";
    var msg=JSON.stringify(answerInfo);
    loadXMLDoc(url,"PUT",function(){
        if(xmlhttp.readyState == 4)
         {
            if (xmlhttp.status == 200)
            {
                    alert("回答成功");
            }
        }
    },msg)
}
                   