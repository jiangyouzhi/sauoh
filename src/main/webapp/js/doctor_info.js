var xmlhttp;
function loadXMLDoc(url,method,cfunc,msg)
{
    if (window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest();
    }
    else
    {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=cfunc;
    xmlhttp.open(method,url,true);
    xmlhttp.setRequestHeader("Content-type","application/json");
    xmlhttp.send(msg);
}
//获取Cookie
function getCookie()
{
   if(document.cookie.length>0)
   {
    get_doctor(0);
     var info = document.cookie.split('=');
     console.log(info);
     renzheng(info[0],info[1]);
   }
   else
   {
       url="login.html";
       window.location.href=encodeURI(url);
   }
}
//身份认证
function renzheng(name,flag)
{
    var admin_flag = document.getElementById("admin");
    var doctor_flag = document.getElementById("doctor_shen");
    var shen = document.getElementById("Ushenfen");
    if(flag=="ROLE_CITY_ADMIN")
    {
      admin_flag.style.display='none';
      doctor_flag.style.display = 'none';
      shen.innerText="市级管理员";
    }
    else
        shen.innerText="省级管理员";
    var uname = document.getElementById('Uname');
    uname.innerHTML=name;
}
//退出
function exit()
{
  var exp = new Date();
  exp.setTime(exp.getTime()-1);
  var info =getCookie();
  if(info!="")
    document.cookie=info[0]+"="+info[1]+";expires="+exp.toGMTString();
  url="login.html";
        window.location.href=encodeURI(url);
}
//显示
function show(e)
{
  e.style.backgroundColor = "rgba(96,191,242,0.5)";
}
//隐藏
function hiden(e)
{
  e.style.backgroundColor = "#fff";
}
//清除提示
function clear_info1(e)
{
  e.value = "";
  e.style.color = 'black';
}
//手机号验证
function phone(e)
{
  var value = e.value;
  if(value.length==11&&(!isNaN(value)))
    return true;
  else
  {
    e.style.color = 'red';
    e.value="请输入正确的手机号"
    return false;
  }
}
//邮箱判断
function email(e)
{
  var value = e.value;
  var email_info = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if(!email_info.test(value))
  {
    e.value="请输入正确的邮箱";
    e.style.color = 'red';
    return false;
  }
  else
    return true;
}
//判断非空
function empty(e)
{
  var value = e.value;
    if(value!=null&&value!=""&&value!="不能为空")
      return true;
    else
    {
      e.style.color = 'red';
    e.value="不能为空";
    return false;
    }
}
//信息分页列表
var table_list=new Array();
//创建骨架
function gujia(list,xiu)
{
  var sex_={"male":"男","female":"女"};
  var department = ['妇科','儿科','内科','皮肤性病科','营养科','骨伤科','男科','外科','肿瘤及防治科','中医科','口腔颌面科','眼科','整形美容科','精神心理科','产科'];
   var k=-1;
   var n=0;
   for(var j in list)
   {
        if(list[j]["checked"]!=1)
          continue;
        k++;
        if(k%10==0)
        {
           var table = document.createElement("table");
           table.setAttribute("width","1000");
           table.setAttribute("border","1");
           table.setAttribute("cellspacing","0");
           table.setAttribute("rules","all");

           //获取标题
           var title_ = title(0);
           table.appendChild(title_);

           //创建身体
           var tbody = document.createElement("tbody");
           tbody.id="tbody";
           table.appendChild(tbody);
           //获取表头
           var th = subtitle(xiu);
           tbody.appendChild(th);
           table_list[n]=table;
           n++;
        }
        var tr =msg(9,xiu);
        var td =tr.children;
        for(var i=0;i<9;i++)
        {
          switch (i) {
          case 0:
            td[i].innerHTML = list[j]["id"];
            break;
          case 1:
            td[i].innerHTML = list[j]["userId"];
            break;
          case 2:
            td[i].innerHTML = list[j]["name"];
            break;
          case 3:
            td[i].innerHTML = sex_[list[j]["sex"]];
            break;
          case 4:
            td[i].innerHTML = list[j]["phone"];
            break;
          case 5:
            td[i].innerHTML = list[j]["workedTime"];
            break;
          case 6:
             td[i].innerHTML = list[j]["level"];
            break;
          case 7:
            td[i].innerHTML = list[j]["hospital"];
            break;
          case 8:
              td[i].innerHTML = department[list[j]["departmentId"] - 1];
            break;
          }
      }
      tbody.appendChild(tr);
   }
   return table_list;
}
//表格信息
function msg(number,xiu)
{
   var tr = document.createElement("tr");
   if(xiu==2)
   {
    tr.setAttribute("onmousemove","show(this)");
    tr.setAttribute("onmouseleave","hiden(this)")
    tr.style.cursor = 'pointer';
    tr.setAttribute("onclick","del_info(this)");
   }
   for (var i=0;i<number;i++)
   {
      var td=document.createElement("td");
      if(i==0||i==1)
        td.setAttribute("class","yin");
      if(xiu==1)
        {
          if(i>=2)
          {
            var str = "xiu_info(this,"+i+")";
            td.setAttribute("onclick",str);
            td.style.cursor = 'pointer';
            td.setAttribute("onmousemove","show(this)");
            td.setAttribute("onmouseleave","hiden(this)")
          }
        }
      tr.appendChild(td);
   }
   return tr;
}
//添加表格主标题 flag1表示对象，flag2表示返回值
function title(flag1)
{
  var caption;
  if(flag1==0)
    caption = document.createElement("caption");
  else
    caption = document.createElement("div");
  caption.setAttribute("class","title");
  caption.innerHTML="医生基本信息";
  return caption;
}
//添加表头
function subtitle(xiu)
{
   var list=['ID','UserID','姓名','性别','手机号','从医时间','医生资格','所属医院','所属科室'];

   var tr = document.createElement("tr");
   for (var i=0;i<list.length;i++)
   {
      var th=document.createElement("th");
      th.setAttribute("scope","col");
     th.innerHTML=list[i];
      if(i<=1)
        th.setAttribute("class","yin");
      tr.appendChild(th);
   }
   return tr;
}
var records;
//获取医生信息
function get_doctor(flag)
{
  loadXMLDoc("http://localhost:8080/api/doctor/list?pageSize=100 ","GET",function() {
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 200) {
          var i = xmlhttp.responseText;
          i=JSON.parse(i);
          var page_=i["page"];
          records=page_["records"];
          if(flag==0)
          {
            find(null);
          } 
      }
    }
  },null)
}
//查询信息
function find(e)
{
   page=1;
   var info = clear_info();
   var table=gujia(records,0);
   info.appendChild(table[0]);
   var div = page_button(table.length);
   info.appendChild(div);
   if(e!=null)
     tab_css(e);
}
//设置分页
function page_button(length)
{
  var div = document.createElement("div");
  var up = document.createElement("button");
  var down = document.createElement("button");

  var str = "clik_page(this,"+length+")";
  var str_up = "page_up(this,"+length+")";
  var str_down = "page_down(this,"+length+")";

    div.setAttribute("class","page_button");
  up.setAttribute("class","up_page");
  up.setAttribute("onclick",str_up);
  up.innerText="上一页";
  down.setAttribute("class","down_page");
  down.setAttribute("onclick",str_down);
  down.innerText="下一页";
  div.appendChild(up);
  for(var i=1;i<=length;i++)
  {
    var page = document.createElement("button");
    page.setAttribute("class", "page");
    if(i==1)
      page.setAttribute("class","page page_zhong");
    page.setAttribute("onclick",str);
    page.innerText=i;
    div.appendChild(page);
  }
  div.appendChild(down);
  return div;
}
var page=1;
function clik_page(e,length)
{
  page = e.innerText;
  console.log(page);
  var parent = e.parentElement;
  var button = parent.children;
  for(var i=1;i<=length;i++)
  {
    button[i].removeAttribute("class");
    button[i].setAttribute("class", "page");
  }
  e.setAttribute("class","page page_zhong");
  replace_page();
}
function page_up(e,length)
{
  if(page==1)
    return false;
  else
    {
      var parent = e.parentElement;
      var button = parent.children;
      page--;
      clik_page(button[page],length);
    }
}
function page_down(e,length)
{
  if(page==length)
    return false;
  else
    {
      var parent = e.parentElement;
      var button = parent.children;
      page++;
      clik_page(button[page],length);
    }
}
//页面替换
function replace_page()
{
  var info =document.getElementById('info');
  var now = info.firstElementChild;
  console.log(now);
    info.replaceChild(table_list[page-1],now);
}
function depatment_option()
{
  var select = document.createElement("select");
  select.setAttribute("class","select");
  var list = ['妇科','儿科','内科','皮肤性病科','营养科','骨伤科','男科','外科','肿瘤及防治科','中医科','口腔颌面科','眼科','整形美容科','精神心理科','产科'];
  var list_value = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  for(var i=0;i<list.length;i++)
  {
    var option = document.createElement("option");
    option.innerHTML=list[i];
    option.setAttribute("value",list_value[i]);
    select.appendChild(option);
  }
  return select;
}
function sex_option()
{
  var select = document.createElement("select");
  select.setAttribute("class","select");
  var list = ['男','女'];
  var list_value = ['male','female'];
  for(var i=0;i<list.length;i++)
  {
    var option = document.createElement("option");
    option.innerHTML=list[i];
    option.setAttribute("value",list_value[i]);
    select.appendChild(option);
  }
  return select;
}
function level_option()
{
  var select = document.createElement("select");
  select.setAttribute("class","select");
  var list = ['医生','副主任医生','主任医生'];
  for(var i=0;i<list.length;i++)
  {
    var option = document.createElement("option");
    option.innerHTML=list[i];
    option.setAttribute("value",list[i]);
    select.appendChild(option);
  }
  return select;
}
//表单元素
function input_info()
{
  //外壳
  var div = document.createElement('div');
  var list=['姓&emsp;&emsp;名：','性&emsp;&emsp;别：','从医时间：','医生资格：','手机号码：','电子邮箱：',
                 '所属医院：','所属科室：','用户名称：','密&emsp;&emsp;码'];
    for(var i =0;i<list.length;i++)
    {
      var span = document.createElement('span');
      span.setAttribute("class","input_info");
      span.setAttribute("class","name");
      span.innerHTML=list[i];
      var input = document.createElement('input');
      input.setAttribute("type","text");
      input.setAttribute("onfocus","clear_info1(this)");
      input.setAttribute("onblur","empty(this)");
      if(i==1)
        input = sex_option();
      else if(i==3)
        input=level_option();
      else if(i==2)
         input.setAttribute("type","date");
     else  if(i==4)
          input.setAttribute("onchange","phone(this)");
      else if(i==5)
        input.setAttribute("onchange","email(this)");
      else if(i==7)
        input = depatment_option();
      div.appendChild(span);
      div.appendChild(input);
      var br = document.createElement('br');
      if((i+1)%2==0)
           div.appendChild(br);
    }
    var button = document.createElement('button');
    button.setAttribute("class","button_add");
    button.setAttribute("onclick","add_doctor(this)");
    button.innerHTML="添&emsp;&emsp;加"
    div.appendChild(button);
    return div;
}
//添加信息
function add(e)
{
    //强调
    if(e!=null)
    tab_css(e);
    //标题
    var title_ = title(1);
    var div_n = input_info(1);
    var div_w = document.createElement('div');
    div_w.appendChild(title_);
    div_w.appendChild(div_n);
    var info=clear_info();
    info.appendChild(div_w);
}
//发送添加信息
function send_add_info(user)
{

   var url;
    url="http://localhost:8080/api/doctor/savevm";
    loadXMLDoc(url,"POST",function(){
        if(xmlhttp.readyState == 4)
        {
             console.log(xmlhttp.responseText);
            if (xmlhttp.status == 204)
            {
                alert("添加成功");
                get_doctor(1);
                add(null);
            }
            else
                alert("添加失败，该用户已存在");
        }
    },JSON.stringify(user));
}
//添加医生
function add_doctor(e) 
{
  //创建医生对象
  var doctor = new Object();
  var div_parent = e.parentElement;
  var child = div_parent.children;
  var name_elem = child[1];
  doctor.doctorName = name_elem.value;
  doctor.sex = child[3].value;
  var worktime_elem = child[6];
  doctor.workedTime = worktime_elem.value;
  var phone_elem = child[11];
  var email_elem = child[13];
  doctor.phone = phone_elem.value;
  doctor.email = email_elem.value;
  var username_elem = child[21];
  var password_elem = child[23];
  doctor.username = username_elem.value;
  doctor.password = password_elem.value;
  var hospital_elem = child[16];
  doctor.hospital = hospital_elem.value;
  doctor.departmentId = child[18].value;
  doctor.level=child[8].value;//下面去掉了手机和邮箱
  if(empty(name_elem)&&empty(worktime_elem)&&phone(phone_elem)&&email(email_elem)&&empty(username_elem)
   &&empty(password_elem)&&empty(hospital_elem))
  {
    if(confirm("确定添加吗"))
       send_add_info(doctor)
  }
}
//属性类型
var kind;
//表格位置
var td_;
//创建字典
var userlist=new Array();
function createUser(e,flag,s)
{
  var department = {'妇科':1,'儿科':2,'内科':3,'皮肤性病科':4,'营养科':5,'骨伤科':6,'男科':7,'外科':8,'肿瘤及防治科':9,'中医科':10,'口腔颌面科':11,'眼科':12,'整形美容科':13,'精神心理科':14,'产科':15};
  var sex = {"男":"male","女":"female"};
  var checked = {"未认证":0,"认证成功":1,"认证失败":-1}
  var parent =e.parentElement;
  var child = parent.children;

  var user = new Object();
  user.id = child[0].innerHTML;
  user.userId=child[1].innerHTML;
  user.name = child[2].innerHTML;
  user.sex = sex[child[3].innerHTML];
  user.phone = child[4].innerHTML;
  user.workedTime=child[5].innerHTML;
  user.hospital = child[7].innerHTML;
  user.departmentId=department[child[8].innerHTML];
  user.level=child[6].innerHTML;
  if(s==1)
       user.checked =checked[child[9].innerHTML];
  return user;
}
//发送修改信息
function send_xiu(user)
{
  var list = [];
  for(var i in user)
  {
    list.push(user[i]);
  }
  var url="http://localhost:8080/api/doctor/batch/update";
  loadXMLDoc(url,"PUT",function(){

    if(xmlhttp.readyState == 4)
    {
      console.log(xmlhttp.responseText);
      if (xmlhttp.status == 204)
      {
        alert("修改成功");
        var tbody = document.getElementById("tbody");
        var tr = tbody.children;
        for(var j=1;j<tr.length;j++)
        {
          var td=tr[j].children;
          for(var i=2;i<td.length;i++)
          {
            if(td[i].hasAttribute("class"))
              td[i].removeAttribute("class");
          }
        }
          get_doctor(1);
      }
    }
  },JSON.stringify(list));
}
function panduan()
{
  var department = ['妇科','儿科','内科','皮肤性病科','营养科','骨伤科','男科','外科','肿瘤及防治科','中医科','口腔颌面科','眼科','整形美容科','精神心理科','产科'];
  var sex={"male":"男","female":"女"};
  var input =document.getElementById("input");
  var flag=0;
  if(kind==4)
  {
    if(phone(input))
      flag=1;
  } 
  else
    flag=1;
  if(flag)
  {
      var button = document.getElementById("sure");
      var xiu = document.getElementById("sure_xiu");
      xiu.style.display = 'inline-block';
      info.removeChild(input);
      info.removeChild(button);
    td_.setAttribute("class","hong");
    if(kind!=8&&kind!=3)
      td_.innerText=input.value;
    else if(kind==8)
      td_.innerText=department[input.value-1];
    else if(kind==3)
      td_.innerText=sex[input.value];
    else
       td_.innerText=input.value;
    var user = createUser(td_,0);
    userlist[user.id]=user;
    console.log(userlist);
  }
}
//修改信息
function xiu_info(e,n)
{
  var info =document.getElementById('info');
  var department = {'妇科':1,'儿科':2,'内科':3,'皮肤性病科':4,'营养科':5,'骨伤科':6,'男科':7,'外科':8,'肿瘤及防治科':9,'中医科':10,'口腔颌面科':11,'眼科':12,'整形美容科':13,'精神心理科':14,'产科':15};
  var sex={"男":"male","女":"female"};
  var value = e.innerText;
  kind = n;
  var xiu = document.getElementById("sure_xiu");
  var input =document.getElementById("input");
  var button = document.getElementById("sure");
  if(input!=null)
    {
      info.removeChild(input);
      info.removeChild(button);
    }
    if(xiu!=null)
    {   
      var br = document.getElementById("br");
      info.removeChild(xiu);
      if(br!=null)
        info.removeChild(br);
    }
  shuru();
  xiu = document.getElementById("sure_xiu");
  input =document.getElementById("input");
  xiu.style.display = 'none';
  input.style.color= 'black';
  if(kind==8)
    input.value=department[value];
  else if(kind==3)
    input.value=sex[value];
  else
    input.value=value;
  td_=e;
}
//创建输入框
function shuru()
{
  //创建输入框
  var input;
  
  if(kind==3)
  {
        input = sex_option();
        input.setAttribute("class","in select");
  }
  else if(kind==4)
  {
      input = document.createElement("input");
      input.setAttribute("class","in");
      input.setAttribute("type","date");
  }
  else if(kind==5)
  {
      input = document.createElement("input");
      input.setAttribute("class","in");
      input.setAttribute("type","date");
  }
  else if(kind==8)
  {
      input = depatment_option();
      input.setAttribute("class","in select");
  }
  else if(kind==6)
  {
    input = level_option();
    input.setAttribute("class","in select");
  }
  else
  {
    input = document.createElement("input");
    input.setAttribute("class","in");
    input.setAttribute("type","text");
  }
  input.setAttribute("id","input");
  //创建确定button
  var button = document.createElement("button");
  button.setAttribute("class","sure");
  button.setAttribute("id","sure");
  button.setAttribute("onclick","panduan()");
  button.innerHTML="确定";
  info.appendChild(input);
  info.appendChild(button);
  //创建修改button
  var button_xiu = document.createElement("button");
  button_xiu.setAttribute("class","sure_xiu");
  button_xiu.setAttribute("id","sure_xiu");
  button_xiu.setAttribute("onclick","tijiao()");
  button_xiu.innerHTML="修&emsp;&emsp;改";
  info.appendChild(button_xiu);
}
//修改信息
function amend(e)
{
  page=1;
  var info = clear_info();
  var table=gujia(records,1);
  info.appendChild(table[0]);
  var div = page_button(table.length);
  info.appendChild(div);
  var button_xiu = document.createElement("button");
  button_xiu.id="sure_xiu";
  button_xiu.setAttribute("class","sure_xiu");
  button_xiu.setAttribute("onclick","tijiao()");
  button_xiu.innerHTML="修&emsp;&emsp;改";
  info.appendChild(button_xiu);
   tab_css(e);
}
//提交修改信息  
function tijiao()
{
     if(confirm("确认修改吗"))
    {
      //发送信息给Controller
      send_xiu(userlist);
      userlist=[];
    }
}
var listId = new Array();
//选中删除信息
function del_info(e)
{
  var id = e.firstChild.innerText;
  if(e.hasAttribute("class"))
  {
        delete listId[id];
    e.removeAttribute("class");
  }
  else
  {   
    listId[id]=e;
    e.setAttribute("class","show");
  }
}
//发送删除信息
function send_delet(user)
{
  var list_id = [];
  for(var i in user)
  {
    list_id.push(i)
  }
  var url="http://localhost:8080/api/doctor/batch/delete";
  loadXMLDoc(url,"POST",function(){
    if(xmlhttp.readyState == 4)
    {
      if (xmlhttp.status == 204)
      {
        alert("删除成功");
          
        for(var i in records)
        {
          for(var j in user)
          {
              if(records[i]['id']==j)
             {
                 delete records[i];
                 delete user[j];
                 break;
             }
          }
        }
          delet(null);
        get_doctor(1);
      }
    }
  },JSON.stringify(list_id))
}
//删除信息
function delet(e)
{
  page=1;
  table_list=[];
  var info = clear_info();
  var table=gujia(records,2);
  info.appendChild(table[0]);
  var div = page_button(table.length);
  info.appendChild(div);
  //创建删除button
  var button = document.createElement("button");
  button.setAttribute("class","delet_button");
  button.setAttribute("onclick","shanchu()");
  button.innerHTML="删&emsp;&emsp;除";
  info.appendChild(button);
  if(e!=null)
  tab_css(e);
}
function shanchu()
{
  if(confirm("确认删除吗"))
  {
        //发送删除信息
        send_delet(listId);
        listId=[];
  }
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
//清除
function clear_info()
{
    var info = document.getElementById("info");
     while(info.firstElementChild)
        info.removeChild(info.firstElementChild);
    return info;
}


//创建td
function create_td(number)
{
  var tr = document.createElement("tr");
  for (var i=0;i<number;i++)
   {
      var td=document.createElement("td");
      if(i<=1)
        td.setAttribute("class","yin");
      if(i==number-1)
        {
          td.setAttribute("class","button_yin");
          var yes = document.createElement("button");
          var no = document.createElement("button");
          yes.setAttribute("class","button_shen yes");
          yes.setAttribute("onclick","pass(this)");
          no.setAttribute("class","button_shen no");
          no.setAttribute("onclick","no(this)");
          yes.innerHTML="通&emsp;过";
          no.innerHTML="拒&emsp;绝";
          td.appendChild(yes);
          td.appendChild(no);
        }
      tr.appendChild(td);
   }
   return tr;
}
var list_shen = new Array();
function pass(e)
{
  var parent = e.parentElement;
  var result = parent.previousElementSibling;
  var value = result.previousElementSibling.innerText;
  result.innerText="认证成功";
  var user = createUser(parent,2,1);
  list_shen[user.id]=user;
  result.style.color = "rgba(0,255,0,0.9)";
}
function no(e)
{
  var parent = e.parentElement;
  var result = parent.previousElementSibling;
  var value = result.previousElementSibling.innerText;
  result.innerText="认证失败";
  var user = createUser(parent,2,1);
  list_shen[user.id]=user;
  result.style.color = "rgba(255,0,0,0.9)";
}
//创建审核表格
function create_shen(list)
{
   var n=0;
   var k=-1;
   var table_list = [];
   var list_title = ['ID','userID','姓名','性别','手机号','从医时间','从医资格','所属医院','所属科室','申请结果'];
   var department = ['妇科','儿科','内科','皮肤性病科','营养科','骨伤科','男科','外科','肿瘤及防治科','中医科','口腔颌面科','眼科','整形美容科','精神心理科','产科'];
    var sex_={"male":"男","female":"女"};
  for(var j in list)
   {
       if(list[j]["checked"]!=0)
          continue;
       k++;
      if(k%10==0)
     {
       var table = document.createElement("table");
       table.setAttribute("width","1000");
       table.setAttribute("cellspacing","0");
       table.setAttribute("rules","none");
       table.setAttribute("class","table_size");
       
        //获取标题
       var title_ = document.createElement("caption");
       title_.innerText="医生资格认证" ;
       title_.setAttribute("class", "title");
       table.appendChild(title_);
        //创建身体
       var tbody = document.createElement("tbody");
       tbody.setAttribute("id","shenhe");
       table.appendChild(tbody);
       //获取表头
       var tr = document.createElement("tr");
       for (var i=0;i<list_title.length+1;i++)
      {
        var th = document.createElement("th");
        if(i<=1)
           th.setAttribute("class","yin");
        if(i!=list_title.length)
           th.innerText=list_title[i];
         tr.appendChild(th);
      }
      tbody.appendChild(tr);
      table_list[n]=table;
      n++;
    }
     var tr =create_td(list_title.length+1);
     var td =tr.children;
      for(var i=0;i<list_title.length;i++)
      {
        switch (i) {
        case 0:
            td[i].innerHTML = list[j]["id"];
            break;
        case 1:
            td[i].innerHTML = list[j]["userId"];
          break;
        case 2:
            td[i].innerHTML = list[j]["name"];
          break;
        case 3:
            td[i].innerHTML = sex_[list[j]["sex"]];
          break;
        case 4:
          td[i].innerHTML = list[j]["phone"];
          break;
        case 5:
          td[i].innerHTML = list[j]["workedTime"];
          break;
        case 6:
          td[i].innerHTML = list[j]["level"];
          break;
        case 7:
           td[i].innerHTML = list[j]["hospital"];
          break;
        case 8:
          td[i].innerHTML = department[list[j]["departmentId"] - 1];
          break;
        case 9:
          td[i].innerHTML = "审核中";
        }
      } 
      tbody.appendChild(tr);
   }
   return table_list;
}
//获取审核信息
function get_shenhe(flag)
{
  var info = document.getElementById('info');
  var table=create_shen(records);
  if(table.length>0)
  {
    info.appendChild(table[0]);
   //创建page_button
    var div = page_button(table.length);
    info.appendChild(div);
    //创建保存button
    var button = document.createElement("button");
    var str = "delet_button"+flag;
    button.setAttribute("class","delet_button");
    button.setAttribute("id",str);
    button.setAttribute("onclick","save()");
    button.innerHTML="保&emsp;&emsp;存";
    info.appendChild(button); 
  } 
}
//审核信息
function audit(e)
{
  var info = clear_info();
  get_shenhe();
  tab_css(e);
}
//发送审核结果
function send_shenhe(list_shen)
{
  var list = [];
  for(var i in list_shen)
  {
    list.push(list_shen[i]);
  }
  console.log(JSON.stringify(list[0]))
  var url="http://localhost:8080/api/doctor/batch/update";
  loadXMLDoc(url,"PUT",function(){

    if(xmlhttp.readyState == 4)
    {
      if (xmlhttp.status == 204)
      {
        alert("保存成功");
        get_doctor(1);
        var tbody = document.getElementById("shenhe");
        var tr = tbody.children;
        for(var j=1;j<tr.length;j++)
        {
          var td=tr[j].children;
          for(var i=2;i<td.length;i++)
          {
            if(td[i].hasAttribute("style"))
               td[i].removeAttribute("style");
          }
        }
      }
    }
  },JSON.stringify(list));
}
function save()
{
  if(confirm("确认保存吗"))
  {
    send_shenhe(list_shen);
    list_shen=[];
  }
}


