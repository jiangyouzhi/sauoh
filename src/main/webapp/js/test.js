//判断是否为空
function empty(e){
	if (e==""||e==null)
		return false;
	else
		return true;
}

function isEmpty(e,flag)
{
	var value = e.value.trim();
	switch (flag) 
	{
		case 0:
		    var tip = document.getElementById('tip_name');
		    if (empty(value))
		    	{
		    		tip.innerHTML="";
		    		return true;
		    	}
		    else
			    {
			    	tip.innerHTML="用户名不能为空";
			    	return false;
			    }
		case 1:
			var tip = document.getElementById('tip_pass');
			if (empty(value))
				{
					tip.innerHTML="";
					return true;
				}
			else
			    {
			    	tip.innerHTML="密码不能为空";
			    	return false;
			    }
        case 2:
            var tip = document.getElementById('tip_email_sign');
			if (empty(value))
		    	{
		    		return true;
		    	}
		    else
			    {
			    	tip.innerHTML="邮箱不能为空";
			    	return false;
			    }
	    case 3:
	        var tip = document.getElementById('tip_pass1');
			if (empty(value))
				{
					tip.innerHTML="";
					return true;
				}
			else
			    {
			    	tip.innerHTML="密码不能为空";
			    	return false;
			    }
	    case 4:
	        var tip = document.getElementById('tip_name_sign');
	        if (empty(value))
				{
					tip.innerHTML="";
					return true;
				}
			else
			    {
			    	tip.innerHTML="用户名不能为空";
			    	return false;
			    }
	}
}
//判断邮箱格式
function isEmail(e,flag){
	if(isEmpty(e,0))
	{
		var value = e.value.trim();
	    var email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	    if (flag==0)
		    var tip = document.getElementById('tip_email');
		else
			var tip = document.getElementById('tip_email_sign');
	    if (!email.test(value))
		{
			tip.innerHTML="请输入正确的邮箱格式";
		    // return false;
		}
		else
		{

            tip.innerHTML="";
            return true;
		}
	}
	else
		return false;
}
//登录
function sign_in()
{
	var uname = document.getElementById("uname");
	var pass = document.getElementById('upass');
	if(isEmpty(uname,0)&&isEmpty(pass,1))
	{
		var xmlhttp1;
        if (window.XMLHttpRequest)
        {
            //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
            xmlhttp1=new XMLHttpRequest();
        }
        else
        {
            // IE6, IE5 浏览器执行代码
            xmlhttp1=new ActiveXObject("Microsoft.XMLHTTP");
        }
        //登录接口
        var user = new Object();
		user.name="haha";
		user.password="123 ";
		// xmlhttp1.open("POST",str,true);
		// xmlhttp1.open("POST","http://localhost:8080/test/login?user="+user,true);
        xmlhttp1.open("POST","http://localhost:8080/a/login?uname="+uname.value+"&pass="+pass.value,true);
	    xmlhttp1.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	    xmlhttp1.send();
	    xmlhttp1.onreadystatechange = result;
        function result()
        {
	        if(xmlhttp1.readyState == 4)
	        {
	            if (xmlhttp1.status == 200)
	            {
	                clear_Cookie();
                    createCookie(uname.value,pass.value);
                    i = xmlhttp1.responseText;
	                if(i==1)//1表示患者
	                {
	                    url="main.htmlflag_id="+i;
                        window.location.href=encodeURI(url);
	                    return true;
	                }
	                else if (i==2)//表示医生
  	                {
                       url="main.htmlflag_id="+i;
                       window.location.href=encodeURI(url);
	                   return true;
	                }
	                else if (i==3)//表示市级管理员
	                {
                       url="admin.html?flag_id="+i;
                       window.location.href=encodeURI(url);
	                   return true;
	                }
	                else if (i==4)//表示省级管理员
	                {
	                	
	                	url="admin.html?flag_id="+i;
                        window.location.href=encodeURI(url);
	                    return true;
	                }
	                else //登录错误
	                {
                       var tip = document.getElementById('tip_email');
                       tip.innerHTML='邮箱或密码错误';
                       return false;
	                }   
	            }
            }
        }
    }                                   
	else
	   return false;
}
//转场
function sign_up(){
	var show1 = document.getElementById('show1');
	var show2 = document.getElementById('show2');
	show2.style.display = 'block'
	show1.style.display = 'none';
}
//判断密码是否相等
function isEqual(){
    var pass1 = document.getElementById('upass1').value;
    var pass2 = document.getElementById('upass2').value;
    var tip = document.getElementById('tip_pass2');
    if(pass2==pass1)
    {
        tip.innerHTML="";
    	return true;
    }	
    else
    {
    	tip.innerHTML="两次密码不一致";
    	return false;
    }
}
//注册
function sign_submit(){
	var name = document.getElementById('sign_uname');
	var email = document.getElementById('sign_uemail');
	var pass1 = document.getElementById('upass1');
	var pass2 = document.getElementById('upass2');
	var user = new Object();
	user.username = name.value;
	user.email = email.value;
	user.password = pass1.value;
	if(isEmpty(name,4)&&isEqual()&&isEmail(email)&&isEmpty(pass1,3))
	{
		var xmlhttp;
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
        //注册接口
        console.log(JSON.stringify(user));
        xmlhttp.open("POST","http://localhost:8080/register?registerUser="+JSON.stringify(user),true);
	    xmlhttp.setRequestHeader("Content-type","application/json");
	    xmlhttp.send();
	    xmlhttp.onreadystatechange = result;
        function result()
        {
	        if(xmlhttp.readyState == 4)
	        {
	            if (xmlhttp.status == 200)
	            {
	                i = xmlhttp.responseText;
	                if(i!=0)
	                {
	                    alert("注册成功");
	                    var show1=document.getElementById('show1');
	                    var show2=document.getElementById('show2');
	                    show1.style.display = 'block';
	                    show2.style.display = 'none';
	                    return true;
	                }
	                else
	                {
	                   alert("注册失败");
                       var tip = document.getElementById('tip_email_sign');
                       tip.innerHTML='该邮箱已被注册';
                       return false;
	                }   
	            }
            }
        }
    }
	else
	{
		alert("注册失败");
		return false;
	}
	
}
//创建Cookie
function createCookie(username,password)
{
   var expiredays=null;
   var exdate=new Date();
   exdate.setDate(exdate.getDate()+expiredays);
   document.cookie=username+"="+password+((expiredays==null)? "" :";expires="+exdate.toGMTString());
}

function clear_Cookie()
{
	var exp = new Date();
	exp.setTime(exp.getTime()-1);
	while(document.cookie.length>0)
	{
		var info = document.cookie.split('=');
		document.cookie=info[0]+"="+info[1]+";expires="+exp.toGMTString();
	}
}

