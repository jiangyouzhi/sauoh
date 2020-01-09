var xmlhttp;
function loadXMLDoc(url,method,cfunc,msg,flag)
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
    xmlhttp.open(method,url,flag);
    xmlhttp.setRequestHeader("Content-type","application/json");
    xmlhttp.send(msg);
}
//获取Cookie 处理top
function init()
{
    getCookie();
    getQuestion();
}
var ID;
function getCookie()
{
    if(document.cookie.length>0)
    {
      var info = document.cookie.split('=');
      ID=info[1];
      getUser(info);
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
//获得问题列表
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
//提交
function tiwen()
{
    var info = new Object();
    var problem = document.getElementById('problem').value.trim();
    info.question=problem;
    info.patientId=ID;
    if(problem=='')
    {
        alert("提问信息不能为空");
        return false;
    }
    else
    {
        var url="http://localhost:8080/api/qa/save";
        var msg=problem;
        loadXMLDoc(url,"POST",function(){
           if(xmlhttp.readyState == 4)
         {
            console.log(xmlhttp.responseText);
            if (xmlhttp.status == 201)
            {
              document.getElementById('problem').value="";          
              alert("提问成功");
              clear_info();
              getQuestion();
            }
         }
        },JSON.stringify(info),true)
    }
}
var doctor_list={};
//创建回答信息
function createQuestion()
{
    var info = document.getElementById('info');
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
       
        var text = xmlhttp.responseText;
        var id = question_list[i]['doctorId'];
        var da = document.createElement("span");
        da.setAttribute("class","da");
        da.innerHTML="答";

        var answer_info = document.createElement('span');
        answer_info.setAttribute("class","answer_info");
        answer_info.innerHTML = question_list[i]['answer'];

        var witer = document.createElement("span");
        witer.setAttribute("class","witer");
        witer.innerHTML=doctor_list[i].name+"&emsp;"+doctor_list[i].hospital;
                                
        answer.appendChild(da);
        answer.appendChild(answer_info);
        answer.appendChild(witer);
    }
}
}

function clear_info()
{
    var info = document.getElementById("info");
     while(info.firstElementChild)
        info.removeChild(info.firstElementChild);
}
