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
	var sf =  document.getElementsByName("sf");
	var sf_value;
	for(var i=0; i<sf.length; i ++){
        if(sf[i].checked)
            sf_value=sf[i].value;
    }
	var user = new Object();
	user.username = uname.value;
	user.password = pass.value;
	user.rememberMe=true;
	if(isEmpty(uname,0)&&isEmpty(pass,1)) {
		var info;
		if (window.XMLHttpRequest) {
			info = new XMLHttpRequest();
		} else {
			info = new ActiveXObject("Microsoft.XMLHTTP");
		}
		info.open("GET", "http://localhost:8080/auth/check?fieldName=username" + "&field=" + user.username);
		info.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		info.send();
		info.onreadystatechange = info_result;
		function info_result() {
			if (info.readyState == 4) {
				if (info.status == 200) {
					msg = JSON.parse(info.responseText);
					console.log(msg);
					var i =msg.status;
					console.log(i);
					var str="";
					if(i=="registering")
						str="请完成邮箱验证";
					else if(i=="noExist")
						str="用户名不存在";
					var tip = document.getElementById("tip_name");
					if(str!="")
					   tip.innerText=str;
					else
					{
						loadXMLDoc("http://localhost:8080/auth/login","POST",function(){
							if(xmlhttp.readyState == 4)
							{
								if(xmlhttp.status == 401)
								{
									var tip = document.getElementById('tip_pass');
									console.log("密码错误");
									tip.innerHTML='密码错误';
									return false;
								}
								if (xmlhttp.status == 200)
								{	
									var text = xmlhttp.responseText;
									var user_info = JSON.parse(text);
									console.log(user_info);
									var sf_flag=0;
									for(var i in user_info['roles'])
									{
										if(user_info['roles'][i]==sf_value)
											sf_flag=1;
									}
									if(sf_flag==0&&sf_value=="ROLE_DOCTOR")
									{
										clear_Cookie();
									    createCookie(uname.value,1);
										var pageURL="renzheng.html"
										OpenWindow(pageURL, 520, 580);
									}
									else if(sf_flag==0&&sf_value=="")
									{
									    for(var i in user_info['roles'])
										{
											//省级管理员
											if(user_info['roles'][i]=="ROLE_PROVINCE_ADMIN")
											{
												  clear_Cookie();
									              createCookie(uname.value,"ROLE_PROVINCE_ADMIN");
                                                  url="patient_info.html";
                                                  window.location.href=encodeURI(url);
                                                  return true;
											}
											//市级管理员
											if(user_info['roles'][i]=="ROLE_CITY_ADMIN")
											{
												  clear_Cookie();
									              createCookie(uname.value,"ROLE_CITY_ADMIN");
                                                  url="patient_info.html";
                                                  window.location.href=encodeURI(url);
                                                  return true;
											}
										}
										alert("您不是管理员");
										return false;
									}
									else if(sf_flag==1)
									{
										//医生
										if(sf_value=="ROLE_DOCTOR")
										{
                                            console.log(uname.value);
										    var url ="http://localhost:8080/auth/required/"+uname.value;
										    loadXMLDoc(url,"GET",function(){
                                            if(xmlhttp.readyState==4)
                                            {
                                            	console.log(xmlhttp.responseText);
                                            	if(xmlhttp.status==200)
                                            	{
                                            		var temp = xmlhttp.responseText;
                                                    var temp = JSON.parse(temp);
                                                    var temp1 = temp['list'];
                                                    var user =temp1[0];
                                                    console.log(user);
                                                    clear_Cookie();
									                createCookie2(uname.value,user['id'],user['hospital'],user['name']);
									                url="main_doctor.html";
										            window.location.href=encodeURI(url);
										            return true;
                                            	}
                                            }
										   },null);
                                           
										}//患者
										else if(sf_value=="ROLE_PATIENT")
										{
										    var url ="http://localhost:8080/auth/required/"+uname.value;
										    loadXMLDoc(url,"GET",function(){
                                            if(xmlhttp.readyState==4)
                                            {
                                            	
                                            	console.log(xmlhttp.responseText);
                                            	if(xmlhttp.status==200)
                                            	{
                                            		var temp = xmlhttp.responseText;
                                                    var temp = JSON.parse(temp);
                                                    var temp1 = temp['list'];
                                                    var user =temp1[1];
                                                    if(user==null)
                                                      {
                                                      	wanshan(uname.value);
                                                      	return false;
                                                      }
                                                    console.log(user);
                                                    clear_Cookie();
									                createCookie(uname.value,user['id']);
									                url="main.html";
										            window.location.href=encodeURI(url);
										            return true;
                                            	}
                                            }
										   },null);
										}
									}
								}
							}
						},JSON.stringify(user))
					}
				}
			}
		}
	}
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
		loadXMLDoc("http://localhost:8080/auth/register","POST",function()
		{
			if(xmlhttp.readyState == 4)
			{
				if(xmlhttp.status == 400)
				{
					alert("注册失败");
					var tip = document.getElementById('tip_name_sign');
					tip.innerHTML='该信息已被注册';
					return false;
				}
				if (xmlhttp.status == 201)
				{
					{
						var show1=document.getElementById('show1');
						var show2=document.getElementById('show2');
						show1.style.display = 'block';
						show2.style.display = 'none';
						alert("请尽快进行邮箱验证");
						return true;
					}

				}
			}
		},JSON.stringify(user));
    }
	else
	{
		alert("注册失败");
		return false;
	}
}
//创建Cookie
function createCookie(username,id)
{
   var expiredays=null;
   var exdate=new Date();
   exdate.setDate(exdate.getDate()+expiredays);
   document.cookie=username+"="+id+((expiredays==null)? "" :";expires="+exdate.toGMTString());
}
function createCookie2(uname,id,hospital,name)
{
   var expiredays=null;
   var exdate=new Date();
   exdate.setDate(exdate.getDate()+expiredays);
   document.cookie=uname+"="+id+"="+hospital+"="+name+((expiredays==null)? "" :";expires="+exdate.toGMTString());
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

function OpenWindow(pageURL, innerWidth, innerHeight)
{
	var ScreenWidth = screen.availWidth
	var ScreenHeight = screen.availHeight
	var StartX = (ScreenWidth - innerWidth) / 2
	var StartY = (ScreenHeight - innerHeight) / 2
	wins = window.open(pageURL, 'OpenWin', 'left='+ StartX + ', top='+ StartY + ', Width=' + innerWidth +', height=' + innerHeight + ', resizable=no, scrollbars=yes, status=no, toolbar=no, menubar=no, location=no')
	wins.focus();
}
function wanshan(name)
{
    clear_Cookie();
    createCookie(name,1);
    var pageURL="wanshan.html"
    OpenWindow(pageURL, 500, 350);
}