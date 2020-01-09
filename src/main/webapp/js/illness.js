// JavaScript Document
var patient_id;
var doctor_id;
function getId()
{
    var  thisURL = document.URL;
    var  getval =thisURL.split('?');
    var showval = getval[1].split('=');
    patient_id=showval[1];
    doctor_id=showval[2];
    console.log(patient_id);
    console.log(doctor_id);
    
}
function submint()
{
    var value = document.getElementById('info').value.trim();
    if(value=='')
    {
        alert("描述不能为空");
        return false;
    }
    else
    {
        var oder = new Object();
        oder.patientId=patient_id;
        oder.doctorId=doctor_id;
        oder.patientStatus=value;
        console.log(oder);
        //发送信息
        var url="http://localhost:8080/api/mr/save";
        loadXMLDoc(url,"POST",function(){
            if(xmlhttp.readyState == 4)
            {
                console.log(xmlhttp.responseText);
                if (xmlhttp.status == 201)
                {
                    alert("添加成功");
                    //关闭网页
                     window.close();
                }
                else
                {
                    alert("添加失败");
                }   
        }
        },JSON.stringify(oder))
    }
}
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

