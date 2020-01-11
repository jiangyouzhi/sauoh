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
      get_admin(0);
      var info = document.cookie.split('=');
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
    var shen = document.getElementById("Ushenfen");
    if(flag=="ROLE_CITY_ADMIN")
    {
      admin_flag.style.display='none';
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
  e.style.backgroundColor = "rgba(46,197,97,0.9)";
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
   var k=-1;
   var n=0;
   for(var j in list)
   {
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
           tbody.setAttribute("id","tbody");
           table.appendChild(tbody);
           //获取表头
           var th = subtitle(xiu);
           tbody.appendChild(th);
           table_list[n]=table;
           n++;
        }
      var tr =msg(5,xiu);
      var td =tr.children;
      var nubmer=5;
      if(xiu!=1)
         nubmer++;
       else
        nubmer--;
      for(var i=0;i<nubmer;i++)
      {
        switch (i) {
        case 0:
          td[i].innerHTML = list[j]["id"];
          break;
        case 1:
          break;
        case 2:
            td[i].innerHTML = list[j]["username"];
          break;
        case 3:
            td[i].innerHTML=list[j]["email"];
          break;
        case 4://未处理
            //td[i].innerHTML = list[j]["roles"];
            td[i].innerHTML="市级管理员";
          break;
        case 5:
            td[i].innerHTML=list[j]['createTime'];
        }
      }
      tbody.appendChild(tr);
   }
   return table_list;
}
//表格信息
function msg(number,xiu)
{
   if(xiu!=1)
    number++;
     else
      number--;
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
function title(flag2)
{
  var caption;
  if(flag2==0)
    caption = document.createElement("caption");
  else
    caption = document.createElement("div");
  caption.setAttribute("class","title");
  caption.innerHTML="管理员基本信息";
  return caption;
}
//添加表头
function subtitle(xiu)
{     
   var list=['ID','用户名','电子邮箱','身份','注册时间'];
   if(xiu==1)
       list=['ID','用户名','电子邮箱'];
   var tr = document.createElement("tr");
   for (var i=0;i<list.length;i++)
   {
      var th=document.createElement("th");
      th.setAttribute("scope","col");
      th.innerHTML=list[i];
      if(i==0)
        th.setAttribute("class","yin");
      tr.appendChild(th);
   }
   return tr;
}

//获取管理员信息
var records;
function get_admin(flag)
{
  loadXMLDoc("http://localhost:8080/api/user/authList","GET",function() {
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 200) {
        var i = xmlhttp.responseText;
        i=JSON.parse(i);
        console.log(i);
        records=i["users"];
        // records=page_["records"];
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
function identity_option() 
{
  var select = document.createElement("select");
  select.setAttribute("class","select");
  var list = ['省级管理员','市级管理员'];
  var list_value = ['ROLE_PROVINCE_ADMIN','ROLE_CITY_ADMIN'];
  for(var i=0;i<list.length;i++)
  {
    var option = document.createElement("option");
    option.innerHTML=list[i];
    option.setAttribute("value",list_value[i]);
    select.appendChild(option);
  }
  return select;
}
//表单元素
function input_info()
{
  //外壳
  var div = document.createElement('div');
  var list=['用户名称：','密&emsp;&emsp;码','电子邮箱：'];
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
      if(i==2)
        input.setAttribute("onchange","email(this)");
      else if (i==3)
        input = identity_option();
      div.appendChild(span);
      div.appendChild(input);
      var br = document.createElement('br');
      div.appendChild(br);
    }
    var button = document.createElement('button');
    button.setAttribute("class","button_add");
    button.setAttribute("onclick","add_admin(this)");
    button.innerHTML="添&emsp;&emsp;加"
    div.appendChild(button);
    return div;
}
//添加信息
function add(e,flag)
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
    url="http://localhost:8080/api/user/save";
    loadXMLDoc(url,"POST",function(){
        if(xmlhttp.readyState == 4)
        {
            if (xmlhttp.status == 201)
            {
                alert("添加成功");
                get_admin(1);
                add(null);
            }
            else
                alert("添加失败，该用户已存在");
        }
    },JSON.stringify(user));
}
//添加管理员
function add_admin(e) 
{
  //创建管理员对象
  var admin = new Object();
  var div_parent = e.parentElement;
  var child = div_parent.children;
  var username_elem =child[1];
  var password_elem = child[4];
  admin.username = username_elem.value;
  admin.password = password_elem.value;
  var email_elem = child[7];
  admin.email = email_elem.value;
  var iden_list = [];
  iden_list.push("ROLE_CITY_ADMIN");
  admin.roles= iden_list; 
  console.log(admin);
  if(empty(username_elem)&&empty(password_elem)&&email(email_elem))
  {
    if(confirm("确定添加吗"))
       send_add_info(admin)
  }
}
//属性类型
var kind;
//表格位置
var td_;
//创建字典
var userlist=new Array();
function createUser(e)
{
   var sf={'省级管理员':'ROLE_PROVINCE_ADMIN','市级管理员':'ROLE_CITY_ADMIN'};
  var parent =e.parentElement;
  var child = parent.children;

  var user = new Object();
  user.id = child[0].innerHTML;
  var list = [];
  list.push("ROLE_CITY_ADMIN");
  user.roles = list;
  user.username = child[2].innerHTML;
  user.email=child[3].innerHTML;
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
  var url="http://localhost:8080/api/user/batch/update";
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
          get_admin(1);
      }
    }
  },JSON.stringify(list));

}
function panduan()
{
  var info = document.getElementById('info');
  var list_value = {'ROLE_PROVINCE_ADMIN':'省级管理员','ROLE_CITY_ADMIN':'市级管理员'};
  var input =document.getElementById("input");
  var flag=0;
  if(kind==3)
  {
    if(email(input))
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
    if(kind==4)
      td_.innerText=list_value[input.value];
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
  var info = document.getElementById('info');
  var list_value = {'省级管理员':'ROLE_PROVINCE_ADMIN','市级管理员':'ROLE_CITY_ADMIN'};
  var value = e.innerText;
  console.log(value);
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
  if(kind==4)
    input.value=list_value[value];
  else
  input.value=value;
  td_=e;
}
//创建输入框
function shuru()
{
  //创建输入框
  var input;
  
  if(kind==4)
  {
    input = identity_option();
    input.setAttribute("class","in select");
  }
  else if(kind==3)
  {
    input = document.createElement("input");
    input.setAttribute("onfocus","email(this)")
    input.setAttribute("class","in");
    input.setAttribute("type","text");
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
   tab_css(e);; 
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
  var url="http://localhost:8080/api/user/batch/delete";
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
        get_admin(1);
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
function shanchu(flag)
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
