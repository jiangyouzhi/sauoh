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
var ID;
function getCookie()
{
    if(document.cookie.length>0)
    {
      var info = document.cookie.split('=');
      console.log(info);
      var name = info[0];
      var url ="http://localhost:8080/api/user/list?pageSize=1000";
      loadXMLDoc(url,"GET",function(){
      if(xmlhttp.readyState==4)
      {
        console.log(xmlhttp.responseText);
        if(xmlhttp.status==200)
        {
          var temp = xmlhttp.responseText;
              var temp = JSON.parse(temp);
              var temp1 = temp['page'];
              var temp2 = temp1['records'];
              for(var i in temp2)
              {
                if(temp2[i]['username']==name)
                  {
                    ID=temp2[i]['id'];
                    break;
                  }
              }
        }
      }
    },null);
    }
}
//发送添加信息
function send_add_info(user)
{

   var url;
   console.log(user);
    url="http://localhost:8080/api/patient/save";
    loadXMLDoc(url,"POST",function(){
        if(xmlhttp.readyState == 4)
        {
            console.log(xmlhttp.responseText);
            if (xmlhttp.status == 201)
            {
                alert("完善成功");
                window.close();
            }
            else
                alert("已经完善");
        }
    },JSON.stringify(user));
}
function add_patient(e) 
{
  //创建病人对象
  var patient = new Object();
  var div_parent = e.parentElement;
  var child = div_parent.children;
  var name_elem = child[1];
  patient.userId=ID;
  patient.name = name_elem.value;
  patient.sex = child[4].value;
  var age_elem = child[7];
  patient.birthday = age_elem.value;
  var phone_elem= child[10];
  patient.phone=phone_elem.value;
  if(empty(name_elem)&&phone(phone_elem))
  {
    if(confirm("确定添加吗"))
        send_add_info(patient);
  }
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
function clear_info1(e)
{
  e.value = "";
  e.style.color = 'black';
}