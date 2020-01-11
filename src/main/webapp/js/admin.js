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
//获取Cookie
function getCookie()
{
   // if(document.cookie.length>0)
   // {
   //   var info = document.cookie.split('=');
   //   console.log(info);
   //   renzheng(info[0]);
   //   return info;
   // }
   // else
   // {
   //     url="login.html";
   //     window.location.href=encodeURI(url);
   //     return "";
   // }
  return "哈哈";
}
//身份认证
function renzheng(name)
{
  var info = getId();
  var admin_flag = document.getElementById("li4");
    var doctor_flag = document.getElementById("doctor_shen");
    var shen = document.getElementById("Ushenfen");
    if(info[0]!=4)
    {
      admin_flag.style.display='none';
      doctor_flag.style.display = 'none';
      var doctor_=doctor_flag.parentElement.parentElement;
      if(doctor_.hasAttribute("class"))
      {   
        doctor_.removeAttribute("class");
      }
      
      shen.innerText="市级管理员";
    }
    else
        shen.innerText="省级管理员";
    var uname = document.getElementById('Uname');
    uname.innerHTML=name;
    load();
}
//获取URL信息
function getId()
{
    var  thisURL = document.URL;
    var  getval =thisURL.split('?');
    if(getval[1]==null)
    {
      url="login.html";
      window.location.href=encodeURI(url);
      return "";
    }
    var showval = getval[1].split('=');
    return showval[1];
}
//页面加载结束后执行
function load()
{
  var patient = document.getElementById('patient_find');
  find(patient,1,0);
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
//强调1
function add_color(li)
{
  var ul = li.parentElement;
  var list = ul.children;
  for(var i=0;i<list.length;i++)
  {
    if(list[i].hasAttribute("class"))
      list[i].removeAttribute("class");
  }
  li.setAttribute("class", "selected");
}
//强调2
function add_(li)
{
   var ul = li.parentElement.parentElement;
   var list = ul.children;
   for(var i=0;i<list.length;i++)
   {
    if(list[i].hasAttribute("class"))
      list[i].removeAttribute("class");
   }
   var e = li.parentElement;
   e.setAttribute("class", "add");
}
//导航
function nav(flag)
{
  var patient = document.getElementById('patient');
  var doctor = document .getElementById('doctor');
  var medicine = document.getElementById('medicine');
  var admin = document.getElementById('admin');
  patient.style.display = 'none';
  doctor.style.display = 'none';
  medicine.style.display = 'none';
  admin.style.display = 'none';
  
  switch (flag) {
    case 1:
      patient.style.display = 'block';
      break;
    case 2:
        doctor.style.display = 'block';
      break;
    case 3:
        medicine.style.display = 'block';
        break;
    case 4:
        admin.style.display = 'block';
        break;
  }
}
//清除提示
function clear_info(e)
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
//价格判断
function isprice(e)
{
  var value =e.value;
  if(!isNaN(value))
    return true;
  else
  {
    e.style.color = 'red';
    e.value="请输入正确的价格";
    return false;
  }
}
//患者处理
function patient(e)
{
  table_list=[];
  var patient = document.getElementById('patient_find');
  add_color(e);
  nav(1);
  find(patient,1,0);  
}
//医生处理
function doctor(e)
{    
    table_list=[];
  var doctor = document.getElementById('doctor_find');
    add_color(e);
    nav(2);
    find(doctor,2,0);
}
//药品处理
function medicine(e)
{
    table_list=[];
  var medicine = document.getElementById('medicine_find');
    add_color(e);
    nav(3);
    find(medicine,3,0);
}
//管理员处理
function admin(e)
{
    table_list=[];
  var admin = document.getElementById('admin_find');
  add_color(e);
  nav(4);
  find(admin,4,0);
}
//信息分页列表
var table_list=new Array();
//创建骨架
function gujia(flag,list,xiu)
{
  var sex_={"male":"男","female":"女"};
  var department = ['内科','外科','妇产科','皮肤病科','骨科','耳鼻咽喉科','儿科','口腔科'];
   var k=-1;
   var info = user(flag);
   var n=0;
   for(var j in list)
   {
        if(flag==2&&list[j]["checked"]==0)
          continue;
        k++;
        if(k%10==0)
        {
           var table = document.createElement("table");
       table.setAttribute("width","900");
       table.setAttribute("border","1");
       table.setAttribute("cellspacing","0");
       table.setAttribute("rules","all");

       //获取标题
       var title_ = title(flag,0);
       table.appendChild(title_);

       //创建身体
       var tbody = document.createElement("tbody");
       var str = "tbody"+flag;
       tbody.setAttribute("id",str);
       table.appendChild(tbody);
       //获取表头
       var th = subtitle(flag,xiu);
       tbody.appendChild(th);
           table_list[n]=table;
           n++;
        }
      var tr =msg(flag,info[1],xiu);
        console.log(tr);
      var td =tr.children;
      for(var i=0;i<info[1];i++)
      {
        switch (i) {
        case 0:
          td[i].innerHTML = list[j]["id"];
          break;
        case 1:
          if(flag==1||flag==2)
             td[i].innerHTML = list[j]["userId"];
          break;
        case 2:
          if(flag!=4)
            td[i].innerHTML = list[j]["name"];
          break;
        case 3:
          if(flag==1||flag==2)
            td[i].innerHTML = sex_[list[j]["sex"]];
          else if(flag==3)
            td[i].innerHTML=list[j]["price"];
          break;
        case 4:
          if(flag==1)
             td[i].innerHTML = list[j]["birthday"];
          else if(flag==2)
             td[i].innerHTML = list[j]["phone"];
          else if(flag==3)
            td[i].innerHTML = list[j]["description"];
          break;
        case 5:
          if(flag==1)
            td[i].innerHTML = list[j]["phone"];
          else
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
//清空骨架 返回content
function clear_gujia(flag)
{
  page=1;
   var info =user(flag);
   var child = info[0].children;
   var content = child[2];
   while(content.firstElementChild)
     content.removeChild(content.firstElementChild);
   return content;
}
//表格信息
function msg(flag,number,xiu)
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
function title(flag1,flag2)
{
  var caption;
  if(flag2==0)
    caption = document.createElement("caption");
  else
    caption = document.createElement("div");
  caption.setAttribute("class","title");
  switch (flag1) {
    case 1:
      caption.innerHTML="患者基本信息";
      break;
    case 2:
        caption.innerHTML="医生基本信息";
        break;
    case 3:
        caption.innerHTML="药品基本信息";
        break;
    default:
      caption.innerHTML="管理员基本信息";
      break;
  }
  return caption;
}
//添加表头
function subtitle(flag,xiu)
{
   var list;
   if(xiu!=1)
   {
      list={1:['ID','UserID','姓名','性别','出生日期','手机号',],
              2:['ID','UserID','姓名','性别','手机号','从医时间','医生资格','所属医院','所属科室'],
              3:['ID','药品名称','药品价格','药品描述'],
        4:['ID','用户名','电子邮箱','身份'],
             };
   }
   else
   {
      list={1:['ID','UserID','姓名','性别','出生日期','手机号'],
              2:['ID','UserID','姓名','性别','手机号','从医时间','医生资格','所属医院','所属科室'],
              3:['ID','药品名称','药品价格','药品描述'],
              4:['ID','用户名','电子邮箱','身份'],
             };
   }
   var tr = document.createElement("tr");
   for (var i=0;i<list[flag].length;i++)
   {
      var th=document.createElement("th");
      th.setAttribute("scope","col");
     th.innerHTML=list[flag][i];
      if(i<=1&&(flag==1||flag==2))
        th.setAttribute("class","yin");
      else if(i==0)
        th.setAttribute("class","yin");
      tr.appendChild(th);
   }
   return tr;
}
//获取病人信息
function get_patient(xiu)
{
    loadXMLDoc("http://localhost:8080/api/patient/list?pageSize=100 ","GET",function() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                var i = xmlhttp.responseText;
                i=JSON.parse(i);
                var page_=i["page"];
                var records=page_["records"];
        var table=gujia(1,records,xiu);
                console.log(table);
        content.appendChild(table[page-1]);
        var div = page_button(table.length);
        content.appendChild(div);
                if(xiu==1)
        {
          //创建修改button
          var button_xiu = document.createElement("button");
          var str_xiu = "sure_xiu"+user_flag;
          button_xiu.setAttribute("class","sure_xiu");
          button_xiu.setAttribute("id",str_xiu);
          button_xiu.setAttribute("onclick","tijiao()");
          button_xiu.innerHTML="修&emsp;&emsp;改";
          content.appendChild(button_xiu);
        }
                else  if(xiu==2)
        {
          //创建删除button
          var button = document.createElement("button");
          var str = "delet_button"+user_flag;
          button.setAttribute("class","delet_button");
          button.setAttribute("id",str);
          var str_ = "shanchu("+user_flag+")";
          button.setAttribute("onclick",str_);
          button.innerHTML="删&emsp;&emsp;除";
          content.appendChild(button);
        }
            }
        }
    },null)
}
//获取医生信息
function get_doctor(xiu)
{
  loadXMLDoc("http://localhost:8080/api/doctor/list?pageSize=100 ","GET",function() {
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 200) {
        var i = xmlhttp.responseText;
        i=JSON.parse(i);
        var page_=i["page"];
        var records=page_["records"];
        var table=gujia(2,records,xiu);
        console.log(table);
        content.appendChild(table[page-1]);
        var div = page_button(table.length);
        content.appendChild(div);
        if(xiu==1)
        {
          //创建修改button
          var button_xiu = document.createElement("button");
          var str_xiu = "sure_xiu"+user_flag;
          button_xiu.setAttribute("class","sure_xiu");
          button_xiu.setAttribute("id",str_xiu);
          button_xiu.setAttribute("onclick","tijiao()");
          button_xiu.innerHTML="修&emsp;&emsp;改";
          content.appendChild(button_xiu);
        }
        else  if(xiu==2)
        {
          //创建删除button
          var button = document.createElement("button");
          var str = "delet_button"+user_flag;
          button.setAttribute("class","delet_button");
          button.setAttribute("id",str);
          var str_ = "shanchu("+user_flag+")";
          button.setAttribute("onclick",str_);
          button.innerHTML="删&emsp;&emsp;除";
          content.appendChild(button);
        }
      }
    }
  },null)
}
//获取药品信息
function get_medicine(xiu)
{
  loadXMLDoc("http://localhost:8080/api/medicine/list?pageSize=100 ","GET",function() {
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 200) {
        var i = xmlhttp.responseText;
        i=JSON.parse(i);
        var page_=i["page"];
        var records=page_["records"];
        var table=gujia(3,records,xiu);
        console.log(table);
        content.appendChild(table[page-1]);
        var div = page_button(table.length);
        content.appendChild(div);
        if(xiu==1)
        {
          //创建修改button
          var button_xiu = document.createElement("button");
          var str_xiu = "sure_xiu"+user_flag;
          button_xiu.setAttribute("class","sure_xiu");
          button_xiu.setAttribute("id",str_xiu);
          button_xiu.setAttribute("onclick","tijiao()");
          button_xiu.innerHTML="修&emsp;&emsp;改";
          content.appendChild(button_xiu);
        }
        else  if(xiu==2)
        {
          //创建删除button
          var button = document.createElement("button");
          var str = "delet_button"+user_flag;
          button.setAttribute("class","delet_button");
          button.setAttribute("id",str);
          var str_ = "shanchu("+user_flag+")";
          button.setAttribute("onclick",str_);
          button.innerHTML="删&emsp;&emsp;除";
          content.appendChild(button);
        }
      }
    }
  },null)
}
//获取管理员信息
function get_admin()
{
  loadXMLDoc("http://localhost:8080/api/user/list?pageSize=100 ","GET",function() {
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 200) {
        var i = xmlhttp.responseText;
        i=JSON.parse(i);
        var page_=i["page"];
        var records=page_["records"];
        var table=gujia(3,records,xiu);
        console.log(table);
        content.appendChild(table[page-1]);
        var div = page_button(table.length);
        content.appendChild(div);
        if(xiu==1)
        {
          //创建修改button
          var button_xiu = document.createElement("button");
          var str_xiu = "sure_xiu"+user_flag;
          button_xiu.setAttribute("class","sure_xiu");
          button_xiu.setAttribute("id",str_xiu);
          button_xiu.setAttribute("onclick","tijiao()");
          button_xiu.innerHTML="修&emsp;&emsp;改";
          content.appendChild(button_xiu);
        }
        else  if(xiu==2)
        {
          //创建删除button
          var button = document.createElement("button");
          var str = "delet_button"+user_flag;
          button.setAttribute("class","delet_button");
          button.setAttribute("id",str);
          var str_ = "shanchu("+user_flag+")";
          button.setAttribute("onclick",str_);
          button.innerHTML="删&emsp;&emsp;除";
          content.appendChild(button);
        }
      }
    }
  },null)
}
//确认对象
function user(flag)
{
   var user;
   var number;
   switch (flag) {
    case 1:
      user = document.getElementById('patient');
      number = 6;
      break;
    case 2:
        user = document.getElementById('doctor');
        number = 9;
        break;
    case 3:
        user = document.getElementById('medicine');
        number = 5;
        break;
    default:
      user = document.getElementById('admin');
      number = 5;
      break;
   }
   var list=[user,number];
   return list;
}
//内容框架
var content;
//查询信息
function find(e,flag,page)
{
   page=1;
   content = clear_gujia(flag);
   switch (flag) {
     case 1:
      //患者信息
           get_patient(0);
         break;
     case 2:
      //医生信息
       get_doctor(0);
       break;
     case 3:
      //药品信息
       get_medicine(0);
       break;
     case 4:
      //管理员信息
       get_admin(0);
       break;
   }
   add_(e);
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
  var now = content.firstElementChild;
  console.log(now);
    content.replaceChild(table_list[page-1],now);
}
function identity_option() 
{
  var select = document.createElement("select");
  select.setAttribute("class","select");
  var list = ['市级','省级'];
  for(var i=0;i<list.length;i++)
  {
    var option = document.createElement("option");
    option.innerHTML=list[i];
    option.setAttribute("value",list[i]);
    select.appendChild(option);
  }
  return select;
}
function depatment_option()
{
  var select = document.createElement("select");
  select.setAttribute("class","select");
  var list = ['内科','外科','妇产科','皮肤病科','骨科','耳鼻咽喉科','儿科','口腔科'];
  var list_value = [1,2,3,4,5,6,7,8];
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
function input_info(flag)
{
  var info = user(flag);
  //外壳
  var div = document.createElement('div');
  var list={1:['姓&emsp;&emsp;名：','性&emsp;&emsp;别：','出生日期：','手机号码：','电子邮箱：','用户名称：','密&emsp;&emsp;码'],
              2:['姓&emsp;&emsp;名：','性&emsp;&emsp;别：','从医时间：','医生资格：','手机号码：','电子邮箱：',
                 '所属医院：','所属科室：','用户名称：','密&emsp;&emsp;码'],
              3:['药品名称：','药品价格：','药品描述：'],
              4:['用户名称：','密&emsp;&emsp;码','电子邮箱：','身&emsp;&emsp;份']
            };
    if(flag==4)
      info[1]--;
    else if(flag==3)
      info[1]-=2;
    else
      info[1]++;
    for(var i =0;i<info[1];i++)
    {
      var span = document.createElement('span');
      span.setAttribute("class","input_info");
      if(flag!=3)
        span.setAttribute("class","xiugai");
      span.innerHTML=list[flag][i];
      var input = document.createElement('input');
      input.setAttribute("type","text");
      input.setAttribute("onfocus","clear_info(this)");
      input.setAttribute("onblur","empty(this)");
      if((flag==1||flag==2)&&i==1)
        input = sex_option();
      else if(flag==2&&i==3)
        input=level_option();
      else if(flag==3&&i==1)
        input.setAttribute("onchange","isprice(this)");
      else if(flag==3&&i==2)
      {
        input = document.createElement('textarea');
        input.setAttribute("onfocus","clear_info(this)");
        input.setAttribute("onblur","empty(this)");
      }
      else if((flag==1||flag==2)&&i==2)
         input.setAttribute("type","date");
     else  if((flag==1&&i==3)||((flag==2||flag==4)&&i==4))
          input.setAttribute("onchange","phone(this)");
      else if((flag==1&&i==4)||(flag==2&&i==5)||(flag==4&&i==2))
        input.setAttribute("onchange","email(this)");
      else if(flag==2&&i==7)
        input = depatment_option();
      else if (flag==4&&i==3)
        input = identity_option();
      div.appendChild(span);
      div.appendChild(input);
      var br = document.createElement('br');
      if((flag==3)||(i+1)%2==0)
           div.appendChild(br);
    }
    var button = document.createElement('button');
    button.setAttribute("class","button_add");
    if(flag==1)
  {
        button.setAttribute("onclick","add_patient(this,1)");
        button.setAttribute("class","button_add button_xiugai");
  } 
  else if (flag==2)
    {
      button.setAttribute("onclick","add_doctor(this,2)");
      // button.setAttribute("class","button_add button_xiugai");
     }
  else if (flag==3)
    button.setAttribute("onclick","add_medicine(this,3)");
  else
    button.setAttribute("onclick","add_admin(this,4)");
    button.innerHTML="添&emsp;&emsp;加"
    div.appendChild(button);
    return div;
}
//添加信息
function add(e,flag)
{
    //强调
    if(e!=null)
    add_(e);
    //标题
    var title_ = title(flag,1);
  var div_n = input_info(flag);
  var div_w = document.createElement('div');
  div_w.appendChild(title_);
  div_w.appendChild(div_n);

    var info =user(flag);
    var child = info[0].children;
   //内容
    var content = child[2];
    while(content.firstElementChild)
      content.removeChild(content.firstElementChild);
    content.appendChild(div_w);
}
//发送添加信息
function send_add_info(user,flag)
{

    var url;
    console.log(user);
    if(flag==1)//添加患者Controller
        url="http://localhost:8080/api/patient/savevm";
    else if(flag==2)//添加医生Controller
        url="http://localhost:8080/api/doctor/savevm";
    else if(flag==3)//添加药品Controller
        url="http://localhost:8080/api/medicine/savevm";
    else
        url="http://localhost:8080/api/patient/savevm";
    loadXMLDoc(url,"POST",function(){
        if(xmlhttp.readyState == 4)
        {
            console.log(xmlhttp.responseText);
            if (xmlhttp.status == 201)
            {
                alert("添加成功");
                add(null,flag);
            }
            else
            {
              if(flag!=3)
                alert("添加失败，该用户已存在");
              else
                alert("添加失败，该药品已存在");
            }
        }
    },JSON.stringify(user));
}
//添加病人
function add_patient(e,flag) 
{
  //创建病人对象
  var patient = new Object();
  var div_parent = e.parentElement;
  var child = div_parent.children;
    var name_elem = child[1];
  patient.patientName = name_elem.value;
  patient.sex = child[3].value;
  var age_elem = child[6];
  patient.birthday = age_elem.value;
  var phone_elem = child[8];
  var email_elem = child[11];
  patient.phone = phone_elem.value;
    patient.email = email_elem.value;
    username_elem = child[13];
    password_elem = child[16];
    patient.username = username_elem.value;
    patient.password = password_elem .value;
  if(empty(name_elem)&&phone(phone_elem)&&email(email_elem)
    &&empty(username_elem)&&empty(password_elem))
  {
    if(confirm("确定添加吗"))
        send_add_info(patient,flag);
  }
}
//添加医生
function add_doctor(e,flag) 
{
  //创建医生对象
  var doctor = new Object();
  var div_parent = e.parentElement;
  var child = div_parent.children;
  var name_elem = child[1];
  doctor.name = name_elem.value;
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
  if(empty(name_elem)&&empty(worktime_elem)&&phone(phone_elem)&&email(name_elem)&&empty(username_elem)
   &&empty(password_elem)&&empty(hospital_elem))
  {
    if(confirm("确定添加吗"))
       send_add_info(doctor,flag)
  }
}
//添加药品
function add_medicine(e,flag) 
{
  //创建药品对象
  var medicine = new Object();
  var div_parent = e.parentElement;
  var child = div_parent.children;
  var name_elem = child[1];
  var price_elem = child[4];
  var description_elem = child[7];
  medicine.name = name_elem.value;
  medicine.price = price_elem.value;
  medicine.description = description_elem.value.trim();
  if(empty(name_elem)&&empty(price_elem)&&isprice(price_elem)&&empty(description_elem))
  {
      if(confirm("确定添加吗"))
       send_add_info(medicine,flag);
  }
}
//添加管理员
function add_admin(e,flag) 
{
  //创建管理员对象
  var identity = {"省级":1,"市级":2};
  var admin = new Object();
  var div_parent = e.parentElement;
  var child = div_parent.children;
  var username_elem =child[1];
  var password_elem = child[3];
  admin.username = name_elem.value;
  admin.password = child[3].value;
  var email_elem = child[6];
  admin.email = email_elem.value;
  var identity_elem = child[8];
  admin.identity = identity_elem.value; 
  if(empty(username_elem)&&empty(password_elem)&&email(email_elem))
  {
    if(confirm("确定添加吗"))
    {
       send_add_info(admin,flag)
       console.log(admin);
       console.log(JSON.stringify(admin));
    }
  }
}
//属性类型
var kind;
//表格位置
var td_;
//用户对象
var user_flag;
//创建字典
var userlist=new Array();
function createUser(e,flag,s)
{
  var department = {'内科':1,'外科':2,'妇产科':3,'皮肤病科':4,'骨科':5,'耳鼻咽喉科':6,'儿科':7,'口腔科':8};
  var sex = {"男":"male","女":"female"};
  var checked = {"未认证":0,"认证成功":1,"认证失败":-1}
  var parent =e.parentElement;
  var child = parent.children;

  var user = new Object();
  user.id = child[0].innerHTML;
  if(flag!=3)
    user.userId=child[1].innerHTML;
  if(flag!=3)
  {
    user.userId = child[1].innerHTML;
    user.name = child[2].innerHTML;
    user.sex = sex[child[3].innerHTML];
    if(flag==1)
      user.birthday = child[4].innerHTML;
    user.phone = child[5].innerHTML;
  }
 if(flag==2)//医生
  {
     user.phone = child[4].innerHTML;
     user.workedTime=child[5].innerHTML;
     user.hospital = child[7].innerHTML;
     user.departmentId=department[child[8].innerHTML];
     user.level=child[6].innerHTML;
     if(s==1)
       user.checked =checked[child[9].innerHTML];
  }
  else if(flag==3)//药品
  {
     user.name = child[2].innerHTML;
     user.price = child[3].innerHTML;
     user.description = child[4].innerHTML;
  }
  else//管理员
  {
       user.identity = child[6].innerHTML;
       user.userName = child[7].innerHTML;
       user.passWord = child[8].innerHTML;
  }
  return user;
}
//发送修改信息
function send_xiu(user,flag)
{
  var url;
  var list = [];
  for(var i in user)
  {
    list.push(user[i]);
  }
  console.log(JSON.stringify(list[0]));
  if(flag==1)//添加患者Controller
    url="http://localhost:8080/api/patient/update";
  else if(flag==2)//添加医生Controller
    url="http://localhost:8080/api/doctor/update";
  else if(flag==3)//添加药品Controller
    url="http://localhost:8080/api/medicine/update";
  else
    url="http://localhost:8080/api/patient/update";
  loadXMLDoc(url,"PUT",function(){

    if(xmlhttp.readyState == 4)
    {
      if (xmlhttp.status == 204)
      {
        alert("修改成功");
        var str = "tbody"+user_flag;
        var tbody = document.getElementById(str);
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
      }
    }
  },JSON.stringify(list[0]));

}
function panduan()
{
  var department = ['内科','外科','妇产科','皮肤病科','骨科','耳鼻咽喉科','儿科','口腔科'];
  var sex={"male":"男","female":"女"};
  var str_input ="input"+user_flag;
  var input =document.getElementById(str_input);
  var flag=0;
   if(kind==3&&user_flag==3)
  {
    if(isprice(input))
      flag=1;
  } 
  else if((kind==4&&user_flag==2)||kind==5)
  {
    if(phone(input))
      flag=1;
  } 
  else if(kind==6&&user_flag!=3)
  {
    if(email(input))
      flag=1;
  }
  else if(kind==3&&user_flag==3) 
    id()
  else
    flag=1;
  if(flag)
  {
    var str_input ="input"+user_flag;
      var str_button = "sure"+user_flag;
      var str_xiu = "sure_xiu"+user_flag;
      var input =document.getElementById(str_input);
      var button = document.getElementById(str_button);
      var xiu = document.getElementById(str_xiu);
      xiu.style.display = 'inline-block';
      content.removeChild(input);
      content.removeChild(button);
    td_.setAttribute("class","hong");
    if(kind!=8&&kind!=3)
      td_.innerText=input.value;
    else if(kind==8)
      td_.innerText=department[input.value-1];
    else if(kind==3&&user_flag!=3)
      td_.innerText=sex[input.value];
    else
       td_.innerText=input.value;
    var user = createUser(td_,user_flag,0);
    userlist[user.id]=user;
    console.log(userlist);
  }
}
//修改信息
function xiu_info(e,n)
{
  var department = {'内科':1,'外科':2,'妇产科':3,'皮肤病科':4,'骨科':5,'耳鼻咽喉科':6,'儿科':7,'口腔科':8};
  var sex={"男":"male","女":"female"};
  var value = e.innerText;
  console.log(value);
  kind = n;
  var str_xiu = "sure_xiu"+user_flag;
  var str_input ="input"+user_flag;
  var str_button = "sure"+user_flag;
  var xiu = document.getElementById(str_xiu);
  var input =document.getElementById(str_input);
    var button = document.getElementById(str_button);
  if(input!=null)
    {
      content.removeChild(input);
      content.removeChild(button);
    }
    if(xiu!=null)
    {   
      var str="br"+user_flag;
    var br = document.getElementById(str);
    console.log(br);
    content.removeChild(xiu);
    if(br!=null)
       content.removeChild(br);
    }
  shuru();
  xiu = document.getElementById(str_xiu);
  input =document.getElementById(str_input);
  xiu.style.display = 'none';
  input.style.color= 'black';
  if(kind==8)
    input.value=department[value];
  else if(kind==3&&user_flag!=3)
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
  
  if((user_flag==1&&kind==3)||(user_flag==2&&kind==3))
  {
        input = sex_option();
        input.setAttribute("class","in select");
  }
  else if(user_flag==1&&kind==4)
  {
    input = document.createElement("input");
      input.setAttribute("class","in");
      input.setAttribute("type","date");
  }
  else if(user_flag==2&&kind==5)
  {
      input = document.createElement("input");
      input.setAttribute("class","in");
      input.setAttribute("type","date");
  }
  else if(user_flag==2&&kind==8)
  {
      input = depatment_option();
      input.setAttribute("class","in select");
  }
  else if(user_flag==4&&kind==7)
  {
    input = identity_option();
    input.setAttribute("class","in select");
  }
  else if(user_flag==2&&kind==6)
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
  var str_input = "input"+user_flag;
  input.setAttribute("id",str_input);
    //创建确定button
    var button = document.createElement("button");
    var str_button = "sure"+user_flag;
    button.setAttribute("class","sure");
    button.setAttribute("id",str_button);
    button.setAttribute("onclick","panduan()");
    button.innerHTML="确定";
    content.appendChild(input);
    content.appendChild(button);
  
  var str_br = "br"+user_flag;
  var br = document.createElement("br");
  br.setAttribute("id",str_br);
  content.appendChild(br);
  //创建修改button
  var button_xiu = document.createElement("button");
  var str_xiu = "sure_xiu"+user_flag;
  button_xiu.setAttribute("class","sure_xiu");
  button_xiu.setAttribute("id",str_xiu);
  button_xiu.setAttribute("onclick","tijiao()");
  button_xiu.innerHTML="修&emsp;&emsp;改";
  content.appendChild(button_xiu);
}
//修改信息
function amend(e,flag)
{
  user_flag=flag;
  content = clear_gujia(flag);
  switch (flag) {
    case 1:
      //患者信息
      get_patient(1);
      break;
    case 2:
      //医生信息
      get_doctor(1);
      break;
    case 3:
      //药品信息
      get_medicine(1);
      break;
    case 4:
      //管理员信息
      get_admin(1);
      break;
  }

  add_(e);  
}
//提交修改信息  
function tijiao()
{
    if(confirm("确认修改吗"))
    {
      for(var i in userlist)
      {
        console.log(userlist[i]);
      }
      //发送信息给Controller
      send_xiu(userlist,user_flag);
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
function send_delet(user,flag)
{
  var url;
  var str = "tbody"+flag;
  var tbody = document.getElementById(str);
  var tr = tbody.children;
  var list = [];
  for(var i in user)
  {
    list.unshift(i);
  }
  console.log(list);
  if(flag==1)//添加患者Controller
    url="http://localhost:8080/api/patient/delete/"+list[0];
  else if(flag==2)//添加医生Controller
    url="http://localhost:8080/api/doctor/delete/"+list[0];
  else if(flag==3)//添加药品Controller
    url="http://localhost:8080/api/medicine/delete/"+list[0];
  else
    url="http://localhost:8080/api/patient/delete/";
  loadXMLDoc(url,"DELETE",function(){

    if(xmlhttp.readyState == 4)
    {
      // alert(xmlhttp.status);
      console.log(xmlhttp.responseText);
      if (xmlhttp.status == 204)
      {
        alert("删除成功");
        for(var i in user)
        {
          tbody.removeChild(user[i]);
        }
        // add(null,flag);
      }
    }
  },null);
}
//删除信息
function delet(e,flag)
{
  user_flag=flag;
  content = clear_gujia(flag);
  switch (flag) {
    case 1:
      //患者信息
      get_patient(2);
      break;
    case 2:
      //医生信息
      get_doctor(2);
      break;
    case 3:
      //药品信息
      get_medicine(2);
      break;
    case 4:
      //管理员信息
      get_admin(2);
      break;
  }
  if(e!=null)
  add_(e);
}
function shanchu(flag)
{
  if(confirm("确认删除吗"))
  {

        console.log(listId);
        //发送删除信息
        send_delet(listId,flag);

    //delet(null,flag);
        listId=[];
  }
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
   var department = ['内科','外科','妇产科','皮肤病科','骨科','耳鼻咽喉科','儿科','口腔科'];
    var sex_={"male":"男","female":"女"};
  for(var j in list)
   {
       if(list[j]["checked"]!=0)
          continue;
       k++;
      if(k%10==0)
     {
       var table = document.createElement("table");
       table.setAttribute("width","900");
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
  loadXMLDoc("http://localhost:8080/api/doctor/list?pageSize=100 ","GET",function() {
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 200) {
        var i = xmlhttp.responseText;
        i=JSON.parse(i);
        var page_=i["page"];
        var records=page_["records"];
        console.log(records);
        var table=create_shen(records);
        content.appendChild(table[0]);
        //创建page_button
        var div = page_button(table.length);
        content.appendChild(div);
        //创建保存button
        var button = document.createElement("button");
        var str = "delet_button"+flag;
        button.setAttribute("class","delet_button");
        button.setAttribute("id",str);
        button.setAttribute("onclick","save()");
        button.innerHTML="保&emsp;&emsp;存";
        content.appendChild(button);
      }
    }
  },null)    
}
//审核信息
function audit(e,flag)
{
  content = clear_gujia(flag);
  get_shenhe(flag);
  add_(e);
}
//发送审核结果
function send_shenhe(list_shen)
{
  console.log(list_shen);
  var list = [];
  for(var i in list_shen)
  {
    list.push(list_shen[i]);
  }
  console.log(JSON.stringify(list[0]))
  var url="http://localhost:8080/api/doctor/update";
  loadXMLDoc(url,"PUT",function(){

    if(xmlhttp.readyState == 4)
    {
      if (xmlhttp.status == 204)
      {
        alert("保存成功");
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
  },JSON.stringify(list[0]));
}
function save()
{
  if(confirm("确认保存吗"))
  {
    send_shenhe(list_shen);
    for(var i in list_shen)
    {
      console.log(list_shen[i]);
    }
    list_shen=[];
  }
}


