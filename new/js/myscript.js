/**
 * Created by Liu on 2018/3/21.
 */
var power;
function register() {
    var username=document.getElementById("username").value;
    var email=document.getElementById("email").value;
    var psd=document.getElementById("password").value;
    var psds=document.getElementById("passwords").value;
    if(username==''){
        document.getElementById("hint").style.display="";
        document.getElementById("hint").innerHTML="Error: Username can not be empty!";
        return false;
    }
    if(email==''){
        document.getElementById("hint").style.display="";
        document.getElementById("hint").innerHTML="Error: Email can not be empty!";
        return false;

    }
    if(psd=='' || psds==''){
        document.getElementById("hint").style.display="";
        document.getElementById("hint").innerHTML="Error: Password can not be empty!";
        return false;

    }
    if(psd!=psds){
        document.getElementById("hint").style.display="";
        document.getElementById("hint").innerHTML="Error: Passwords must match!";
        return false;;

    }
    var email=document.getElementById("email").value;
    console.log('email:',email);
    var str_array=new Array();
    str_array=email.split("@");
    var keyword=str_array[1];
    console.log('keyword:',keyword);

    if(keyword=='zendure.com'){
        console.log('go register');
        $.post("php/register.php",{username:username,password:psd,email:email},function (data) {
            console.error(data);
            jsonobj=JSON.parse(data);
            switch (jsonobj.result){
                case "success":
                    document.getElementById("hint").style.display="";
                    document.getElementById("hint").style.color="green";
                    document.getElementById("hint").innerHTML="Register success!";

                    break;
                case "fail":
                    document.getElementById("hint").style.display="";
                    document.getElementById("hint").innerHTML="Register fail!";
                    break;
                case "error":
                    document.getElementById("hint").style.display="";
                    document.getElementById("hint").innerHTML="System error!"
                    break;
            }
        });

    }else {
        document.getElementById("hint").style.display="";
        document.getElementById("hint").innerHTML="Error: "+keyword+" is an illegal domain name!";
        return false;

    }
}
function login(){
    console.log('login');
    var email=document.getElementById("email").value;
    var psd=document.getElementById("password").value;
    if(email==''){
        document.getElementById("hint").style.display="";
        document.getElementById("hint").innerHTML="error: Email can not be empty!";
        return false;
    }
    if(psd==''){
        document.getElementById("hint").style.display="";
        document.getElementById("hint").innerHTML="error: Password can not be empty!";
        return false;
    }
    var email=document.getElementById("email").value;
    console.log('email:',email);
    var str_3="@zendure.com";
    console.log("tt:"+email.indexOf(str_3));
    if(email.indexOf(str_3)==-1){
        document.getElementById("hint").style.display="";
        document.getElementById("hint").innerHTML='error:'+"Invalid mailbox!";
        return false;
    }else{
        var str_array=new Array();
        console.log('email:',email);
        str_array=email.split("@");
        console.log('str0:',str_array[0]);
        console.log('str1:',str_array[1]);
        var keyword=str_array[1];
        console.log('keyword:',keyword);

        if(keyword=='zendure.com'){
            console.log('go login');
            $.post("php/login.php",{email:email,password:psd},function(data,status){
                console.log("data:"+data);
                jsonobj=JSON.parse(data);
                switch (jsonobj.result){
                    case "success":

                        document.getElementById("hint").style.display="";
                        document.getElementById("hint").style.color="green"
                        document.getElementById("hint").innerHTML="Login success!"

                        window.location.href="dashboard.html";
                        break;
                    case "fail":

                        document.getElementById("hint").style.display="";
                        document.getElementById("hint").innerHTML="Your password is incorrect or we cannot find an account with that email address !"
                        break;
                    case "error":
                        document.getElementById("hint").style.display="";
                        document.getElementById("hint").innerHTML="System error!"
                        break;
                }

            });
        }else {
            document.getElementById("hint").style.display="";
            document.getElementById("hint").innerHTML='error:'+keyword+' is an illegal domain name!';
            return false;
        }
    }



}
function forgot_psd() {
    document.getElementById("hint").style.display="";
    document.getElementById("hint").innerHTML="The function are not available temporarily because of debugging.";

}
function cancelload(){
    var loader=document.getElementById("loader");
    loader.style.display="none";
}
function welcome(){

    $.post("php/homepage_username.php",function(data){
        console.log("data:"+data);
        jsonObj=JSON.parse(data);

        if(jsonObj.id==''){
            document.getElementById("username").innerHTML="please login";
            document.getElementById("username").style.color="red";
            document.getElementById("userface").innerHTML='<img src="images/uiface6.png" height="40" width="40"/>';
            window.location.href='index.html';
        }else {

            document.getElementById("username").innerText="Welcome back "+jsonObj.username;
            document.getElementById("welcometxt").innerText="Hi "+jsonObj.username+" welcome to use Zendure dashboard system !";

            switch(jsonObj.power) {
                case "0":
                    power=0;//管理者
                    break;
                case "1":
                    power=1;//分析者
                    document.getElementById("userface").innerHTML='<img src="images/ae.png" height="40" width="40"/>';
                    break;
                case "2":
                    power=2;//客服者
                    document.getElementById("userface").innerHTML='<img src="images/se.png" height="40" width="40"/>';
                    break;

            }


        }
    });
}
function getDataRow(h){
    var row = document.createElement('tr'); //创建行
    /*row.setAttribute('id', h.Issue_id);
    row.onclick=function(){
        console.log("id:"+this.getAttribute('id'));
        window.location.href = "list-detail.html?id="+this.getAttribute('id');
    }*/
    var Issue_idCell = document.createElement('td'); //创建第一列
    Issue_idCell.innerHTML = h.Issue_id; //填充数据
    row.appendChild(Issue_idCell); //加入行  ，下面类似

    var Product_nameCell = document.createElement('td');//创建第二列
    Product_nameCell.innerHTML = h.Product_name;
    row.appendChild(Product_nameCell);

    var Product_typeCell = document.createElement('td');//创建第三列
    Product_typeCell.innerHTML = h.Product_type;
    row.appendChild(Product_typeCell);

    var RegionCell = document.createElement('td');
    RegionCell.innerHTML = h.Region;
    row.appendChild(RegionCell);

    var PrioritiesCell = document.createElement('td');
    PrioritiesCell.innerHTML = h.Priorities;
    row.appendChild(PrioritiesCell);

    var Issue_briefCell = document.createElement('td');
    Issue_briefCell.innerHTML = h.Issue_brief;
    row.appendChild(Issue_briefCell);

    var Raised_dateCell = document.createElement('td');
    Raised_dateCell.innerHTML = h.Raised_date;
    row.appendChild(Raised_dateCell);

    var Submitter_emailCell = document.createElement('td');
    Submitter_emailCell.innerHTML = h.Submitter_email;
    row.appendChild(Submitter_emailCell);

    var Editor_emailCell = document.createElement('td');
    Editor_emailCell.innerHTML = h.Editor_email;
    row.appendChild(Editor_emailCell);

    var Issue_statusCell = document.createElement('td');
    if(h.Issue_status=='null'){
        Issue_statusCell.innerHTML ='';
    }else {
        Issue_statusCell.innerHTML = h.Issue_status;
    }

    row.appendChild( Issue_statusCell);

    var DatetimeCell = document.createElement('td');
    DatetimeCell.innerHTML = h.Datetime;
    row.appendChild(DatetimeCell);


    //到这里，json中的数据已经添加到表格中，下面为每行末尾添加按钮

    var checkCell = document.createElement('td');
    row.appendChild(checkCell);
    var btncheck = document.createElement('input'); //创建一个input控件
    btncheck.setAttribute('type','button'); //type="button"
    btncheck.setAttribute('value','Detail');
    btncheck.setAttribute('id', h.Issue_id);
    //查看操作
    btncheck.onclick=function(){
        if(power==2){
            console.log("list-detail:"+this.getAttribute('id'));
            window.location.href = "list-modify.html?id="+this.getAttribute('id');
        }
        if(power==1){
            console.log("list-detail:"+this.getAttribute('id'));
            window.location.href = "list-detail.html?id="+this.getAttribute('id');
        }

    }
    checkCell.appendChild(btncheck);  //把查看按钮加入td，别忘了

    var delCell = document.createElement('td');
    row.appendChild(delCell);
    var btnDel = document.createElement('input'); //创建一个input控件
    btnDel.setAttribute('type','button'); //type="button"
    btnDel.setAttribute('value','Delete');
    btnDel.setAttribute('name', h.Issue_id);
    //删除操作
    btnDel.onclick=function(){
        if(confirm("Are you sure to delete it?")){
            //找到按钮所在行的节点，然后删掉这一行
            console.log("homepage-delete:"+this.getAttribute('name'));
            $.post("php/delete_list.php",{id:this.getAttribute('name')},function (data) {
                console.error(data);
                var jsonobj =  JSON.parse(data);//转换为json对象
                switch (jsonobj.result){
                    case "success":
                        document.getElementById("alert").style.display="";
                        document.getElementById("inform").className="green";
                        document.getElementById("welcometxt").innerText="Delete success!";
                        setTimeout('document.getElementById("alert").style.display="none"',2000);

                        break;
                    case "fail":

                        document.getElementById("alert").style.display="";
                        document.getElementById("inform").className="red";
                        document.getElementById("welcometxt").innerText="Delete fail!";
                        setTimeout('document.getElementById("alert").style.display="none"',2000);
                        break;
                    case "error":
                        document.getElementById("alert").style.display="";
                        document.getElementById("inform").className="red";
                        document.getElementById("welcometxt").innerText="System error!";
                        setTimeout('document.getElementById("alert").style.display="none"',2000);
                        break;
                }
            });
            this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);

            //btnDel - td - tr - tbody - 删除(tr)
            //刷新网页还原。实际操作中，还要删除数据库中数据，实现真正删除
        }
    }
    delCell.appendChild(btnDel);  //把删除按钮加入td，别忘了

    return row; //返回tr数据
}
function table_show(){
    //console.log("homepage-table-show");

    $.post("php/homepage.php",function(data){
       // console.log("json:"+data);
        //console.log("json:"+JSON.parse(data));//问题 一开始为空 怎么判断

            var jsonObj =  JSON.parse(data);//转换为json对象
            var tbody = document.getElementById('tbMain');
            for (var i=0;i<jsonObj.length;i++){
                var trow=getDataRow(jsonObj[i]);
                tbody.appendChild(trow);
                cancelload();

        }

    });
}
function add_list(){
    console.error("add-list");
    var customer_name=document.getElementById("customer_name").value;
    var customer_contact=document.getElementById("customer_contact").value;
    var region=document.getElementById("region").value;
    var issue_brief=document.getElementById("issue_brief").value;
    var issue_detail_description=document.getElementById("issue_detail_description").value;
    if(customer_name==''){
        document.getElementById("alert").style.display="";
        document.getElementById("inform").className="red";
        document.getElementById("welcometxt").innerText="error: customer_name can not be empty!";
        setTimeout('document.getElementById("alert").style.display="none"',2000);
        return false;
    }else{
        document.getElementById("inform").className="green";
    }
    if(customer_contact==''){
        document.getElementById("inform").className="red";
        document.getElementById("welcometxt").innerText="error: customer_contact can not be empty!";
        document.getElementById("alert").style.display="";
        setTimeout('document.getElementById("alert").style.display="none"',2000);
        return false;
    }else{
        document.getElementById("inform").className="green";

    }
    if(region==''){
        document.getElementById("inform").className="red";
        document.getElementById("welcometxt").innerText="error: region can not be empty!";
        document.getElementById("alert").style.display="";
        setTimeout('document.getElementById("alert").style.display="none"',2000);
        return false;
    }else{
        document.getElementById("inform").className="green";

    }
    if(issue_brief==''){
        document.getElementById("inform").className="red";
        document.getElementById("welcometxt").innerText="error: issue_brief can not be empty and limit 8000 bytes!";
        document.getElementById("alert").style.display="";
        setTimeout('document.getElementById("alert").style.display="none"',2000);
        return false;
    }else{
        document.getElementById("inform").className="green";

    }
    if(issue_detail_description==''){
        document.getElementById("inform").className="red";
        document.getElementById("welcometxt").innerText="error: issue_detail_description can not be empty and limit 8000 bytes!";
        document.getElementById("alert").style.display="";
        setTimeout('document.getElementById("alert").style.display="none"',2000);
        return false;
    }else{
        document.getElementById("inform").className="green";
    }
    var form=document.getElementById("form");
    var fd =new FormData(form);
    $.ajax({
        url: "php/add.php",
        type: "POST",
        data: fd,
        processData: false,  // 告诉jQuery不要去处理发送的数据
        contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
        success: function(data,status,xhr){
            console.error(data);
            jsonObj=JSON.parse(data);

            switch (jsonObj.result){
                case "1":
                    document.getElementById("inform").className="red";
                    document.getElementById("welcometxt").innerText="Error: Zip file size limit within 8MB !";
                    document.getElementById("alert").style.display="";
                    setTimeout('document.getElementById("alert").style.display="none"',2000);
                    break;
                case "2":
                    document.getElementById("inform").className="red";
                    document.getElementById("welcometxt").innerText="Error: Zip file size limit within 8MB !";
                    document.getElementById("alert").style.display="";
                    setTimeout('document.getElementById("alert").style.display="none"',2000);
                    break;
                case "3":
                    document.getElementById("inform").className="red";
                    document.getElementById("welcometxt").innerText="Error: Only part of the zip file is uploaded !";
                    document.getElementById("alert").style.display="";
                    setTimeout('document.getElementById("alert").style.display="none"',2000);
                    break;
                case "4":
                    document.getElementById("inform").className="red";
                    document.getElementById("welcometxt").innerText="Error:You can only upload zip files !";
                    document.getElementById("alert").style.display="";
                    setTimeout('document.getElementById("alert").style.display="none"',2000);
                    break;
                case "5":
                    document.getElementById("inform").className="green";
                    document.getElementById("welcometxt").innerText="submit success!";
                    document.getElementById("alert").style.display="";
                    setTimeout('document.getElementById("alert").style.display="none"',4000);
                    break;
                case "6":
                    document.getElementById("inform").className="red";
                    document.getElementById("welcometxt").innerText="Failure to submit!";
                    document.getElementById("alert").style.display="";
                    setTimeout('document.getElementById("alert").style.display="none"',4000);
                    break;
                case "7":
                    document.getElementById("inform").className="red";
                    document.getElementById("welcometxt").innerText="Failure to submit!";
                    document.getElementById("alert").style.display="";
                    setTimeout('document.getElementById("alert").style.display="none"',4000);
                    break;
                case "8":
                    document.getElementById("inform").className="green";
                    document.getElementById("welcometxt").innerText="submit success!";
                    document.getElementById("alert").style.display="";
                    setTimeout('document.getElementById("alert").style.display="none"',4000);
                    break;

            }


        }
    });
    return false;
}
function detail_list(id){
    if(id==undefined){
        console.error("id==undefined");
        return false;
    }else {
        console.error("detail_id:"+id);
        document.getElementById("div1").style.display="";
        document.getElementById("loader").style.display="";
        document.getElementById("search").style.display="none";
        document.getElementById("search_btn").style.display="none";
       document.getElementById("issue_id").innerHTML="Issue Index:"+id;
        $.post("php/detail.php",{id:id},function(data){
            console.log("json:"+data);
            var jsonObj =  JSON.parse(data);//转换为json对象
            if(jsonObj.result=="fail"){
                document.getElementById("alert").style.display="";
                document.getElementById("inform").className="red";
                document.getElementById("welcometxt").innerText="error: The Issue Id does not exist";
                setTimeout('document.getElementById("alert").style.display="none"',8000);
                document.getElementById("search").style.display="";
                document.getElementById("search_btn").style.display="";
                document.getElementById("div1").style.display="none";
                document.getElementById("div2").style.display="none";
                cancelload();
                return false;
            }else {
                document.getElementById("Product_name").innerHTML=jsonObj.Product_name;//youwenti
                document.getElementById("Product_type").innerHTML=jsonObj.Product_type;
                document.getElementById("Customer_name").innerHTML=jsonObj.Customer_name;
                document.getElementById("Customer_contact").innerHTML=jsonObj.Customer_contact;
                document.getElementById("Region").innerHTML=jsonObj.Region;
                document.getElementById("Raised_date").innerHTML=jsonObj.Raised_date;
                document.getElementById("Issue_brief").innerHTML=jsonObj.Issue_brief;
                document.getElementById("Issue_detail_description").innerHTML=jsonObj.Issue_detail_description;
                document.getElementById("Priorities").innerHTML=jsonObj.Priorities;
            }

            if(jsonObj.Root_Cause==null){
                document.getElementById("Root_cause").innerHTML="";
            }else {
                document.getElementById("Root_cause").innerHTML=jsonObj.Root_Cause;
            }
            if(jsonObj.Repley==null){
                document.getElementById("Repley").innerHTML="";
            }else {
                document.getElementById("Repley").innerHTML=jsonObj.Repley;
            }
            if(jsonObj.Issue_status==null){
                document.getElementById("Issue_Status").innerHTML="";

            }else {
                document.getElementById("Issue_Status").innerHTML=jsonObj.Issue_status;
            }

            if(jsonObj.Close_date==null){
                document.getElementById("Close_date").innerHTML="";
            }else {
                document.getElementById("Close_date").innerHTML=jsonObj.Close_date;
            }

            if(jsonObj.Datetime==null){
                document.getElementById("Datetime").innerHTML="";
            }else {
                document.getElementById("Datetime").innerHTML=jsonObj.Datetime;
            }
            if(jsonObj.Submitter_email==null){
                document.getElementById("s_email").innerHTML="";
            }else {
                document.getElementById("s_email").innerHTML=jsonObj.Submitter_email;
            }
            if(jsonObj.Editor_email==null){
                document.getElementById("e_email").innerHTML="";
            }else {
                document.getElementById("e_email").innerHTML=jsonObj.Editor_email;
            }
            if(jsonObj.Analyst_email==null){
                document.getElementById("a_email").innerHTML="";
            }else {
                document.getElementById("a_email").innerHTML=jsonObj.Analyst_email;
            }

            if(jsonObj.Attachment_id==null){
                document.getElementById("Attachment").innerHTML="";
            }else {
                //note:JQuery的ajax函数的返回类型只有xml、text、json、html等类型，没有“流”类型，所以我们要实现ajax下载，不能够使用相应的ajax函数进行文件下载。但可以用js生成一个form，用这个form提交参数，并返回“流”类型的数据。在实现过程中，页面也没有进行刷新。
                //document.getElementById("Attachment").innerHTML=jsonObj.Attachment_id;
                document.getElementById("Attachment").innerHTML="attachment.zip";
                document.getElementById("Attachment").onclick=function(){
                    var form=$("<form>");//定义一个form表单
                    form.attr("style","display:none");
                    form.attr("target","");
                    form.attr("method","post");
                    form.attr("action","php/download.php");
                    var input1=$("<input>");
                    input1.attr("type","hidden");
                    input1.attr("name","Attachment");
                    input1.attr("value",jsonObj.Attachment_id);
                    $("body").append(form);//将表单放置在web中
                    form.append(input1);
                    form.submit();//表单提交
                }
            }

            cancelload();
        });
    }
}

function search_num(){
 var id=document.getElementById("search").value;
    window.location.href = "list-detail.html?id="+id;
}
function update_detail(){

    //confirm("are your sure ?");
    var id=window.location.href.split("=")[1];
    console.log("update_detail-id:"+id);
    var Root_Cause_new=document.getElementById("Root_Cause_new").value;
    var Repley_new=document.getElementById("Repley_new").value;
    var Issue_Status_new=document.getElementById("Issue_Status_new").value;
    var Close_Date_new=document.getElementById("Close_Date_new").value;

    if(Root_Cause_new==''){
        document.getElementById("alert").style.display="";
        document.getElementById("inform").className="red";
        document.getElementById("welcometxt").innerText="error: Root Cause can not be empty!";
        setTimeout('document.getElementById("alert").style.display="none"',2000);
        return false;
    }else{
        document.getElementById("inform").className="green";
    }
    if(Repley_new==''){
        document.getElementById("alert").style.display="";
        document.getElementById("inform").className="red";
        document.getElementById("welcometxt").innerText="error: Repley can not be empty!";
        setTimeout('document.getElementById("alert").style.display="none"',2000);
        return false;
    }else{
        document.getElementById("inform").className="green";
    }
    if( Close_Date_new==''){
        document.getElementById("alert").style.display="";
        document.getElementById("inform").className="red";
        document.getElementById("welcometxt").innerText="error:  Closed Date can not be empty!";
        setTimeout('document.getElementById("alert").style.display="none"',2000);
        return false;
    }else{
        document.getElementById("inform").className="green";
    }
    $.post("php/update_te.php",{Issue_id:id,Root_Cause:Root_Cause_new,Repley:Repley_new,Close_date:Close_Date_new,Issue_status:Issue_Status_new},function(data,status){
        console.log("data:"+data);
        jsonobj=JSON.parse(data);
        switch (jsonobj.result){
            case "success":

                detail_list(window.location.href.split("=")[1]);
                document.getElementById("alert").style.display="";
                document.getElementById("inform").className="green";
                document.getElementById("welcometxt").innerText="Success submit!";
                setTimeout('document.getElementById("alert").style.display="none"',2000);
                break;
            case "fail":
                document.getElementById("alert").style.display="";
                document.getElementById("inform").className="red";
                document.getElementById("welcometxt").innerText="Failure to submit!";
                setTimeout('document.getElementById("alert").style.display="none"',2000);
                break;
            case "error":
                document.getElementById("alert").style.display="";
                document.getElementById("inform").className="red";
                document.getElementById("welcometxt").innerText="System error,Failure to submit!";
                setTimeout('document.getElementById("alert").style.display="none"',2000);
                break

        }
    });
}
function delete_table_show(){
    console.log("delete_table_show");

    $.post("php/homepage.php",function(data){
       // console.log("json:"+data);
        var jsonObj =  JSON.parse(data);//转换为json对象
        var tbody = document.getElementById('tbMain');
        for (var i=0;i<jsonObj.length;i++){
            var trow=delete_getDataRow(jsonObj[i]);
            tbody.appendChild(trow);
            cancelload();
        }
    });
}
function delete_getDataRow(h){
    var row = document.createElement('tr'); //创建行
    row.setAttribute('id', h.Issue_id);


    var Issue_idCell = document.createElement('td'); //创建第一列
    Issue_idCell.innerHTML = h.Issue_id; //填充数据
    Issue_idCell.setAttribute("id",h.Issue_id);
    row.appendChild(Issue_idCell); //加入行  ，下面类似
    Issue_idCell.onclick=function () {
        console.error("id_detele:"+this.getAttribute("id"));

        if(confirm("Are you sure to delete it?")){
            $.post("php/delete_list.php",{id:this.getAttribute("id")},function (data) {
                console.error(data);
                var jsonobj =  JSON.parse(data);//转换为json对象
                switch (jsonobj.result){
                    case "success":
                        document.getElementById("alert").style.display="";
                        document.getElementById("inform").className="green";
                        document.getElementById("welcometxt").innerText="Delete success!";
                        setTimeout('document.getElementById("alert").style.display="none"',2000);

                        break;
                    case "fail":

                        document.getElementById("alert").style.display="";
                        document.getElementById("inform").className="red";
                        document.getElementById("welcometxt").innerText="Delete fail!";
                        setTimeout('document.getElementById("alert").style.display="none"',2000);
                        break;
                    case "error":
                        document.getElementById("alert").style.display="";
                        document.getElementById("inform").className="red";
                        document.getElementById("welcometxt").innerText="System error!";
                        setTimeout('document.getElementById("alert").style.display="none"',2000);
                        break;
                }
            });
            this.parentNode.parentNode.removeChild(this.parentNode);
            //刷新网页还原。实际操作中，还要删除数据库中数据，实现真正删除
        }
    }


    var Product_nameCell = document.createElement('td');//创建第二列
    Product_nameCell.innerHTML = h.Product_name;
    row.appendChild(Product_nameCell);

    var Product_typeCell = document.createElement('td');//创建第三列
    Product_typeCell.innerHTML = h.Product_type;
    row.appendChild(Product_typeCell);

    var RegionCell = document.createElement('td');
    RegionCell.innerHTML = h.Region;
    row.appendChild(RegionCell);

    var PrioritiesCell = document.createElement('td');
    PrioritiesCell.innerHTML = h.Priorities;
    row.appendChild(PrioritiesCell);

    var Issue_briefCell = document.createElement('td');
    Issue_briefCell.innerHTML = h.Issue_brief;
    row.appendChild(Issue_briefCell);

    var Raised_dateCell = document.createElement('td');
    Raised_dateCell.innerHTML = h.Raised_date;
    row.appendChild(Raised_dateCell);

    var User_idCell = document.createElement('td');
    User_idCell.innerHTML = h.User_id;
    row.appendChild(User_idCell);

    var Issue_statusCell = document.createElement('td');
    if(h.Issue_status=='null'){
        Issue_statusCell.innerHTML ='';
    }else {
        Issue_statusCell.innerHTML = h.Issue_status;
    }

    row.appendChild( Issue_statusCell);

    var DatetimeCell = document.createElement('td');
    DatetimeCell.innerHTML = h.Datetime;
    row.appendChild(DatetimeCell);



    return row; //返回tr数据
}
function exit(){
    console.log("exit");
    $.post("php/exit.php",function(data){
        console.log(data);
        OBJ=JSON.parse(data);
        if(OBJ.result=="success"){
            window.location.href ="index.html";
        }
    });
}
function modify(id){
    if(id==undefined){
        console.error("id==undefined");
        return false;
    }else {
        console.error("modify_id:"+id);
        document.getElementById("div1").style.display="";
        document.getElementById("div2").style.display="";
        document.getElementById("loader").style.display="";
        document.getElementById("search").style.display="none";
        document.getElementById("search_btn").style.display="none";
        document.getElementById("issue_id").innerHTML="Issue Index:"+id;
        $.post("php/detail.php",{id:id},function(data){
            console.log("json:"+data);
            var jsonObj =  JSON.parse(data);//转换为json对象
            if(jsonObj.result=="fail"){
                document.getElementById("alert").style.display="";
                document.getElementById("inform").className="red";
                document.getElementById("welcometxt").innerText="error: The Issue Id does not exist";
                setTimeout('document.getElementById("alert").style.display="none"',8000);
                document.getElementById("search").style.display="";
                document.getElementById("search_btn").style.display="";
                document.getElementById("div1").style.display="none";
                document.getElementById("div2").style.display="none";
                cancelload();
                return false;
            }else {
                document.getElementById("Productname_").innerHTML=jsonObj.Product_name;//youwenti
                document.getElementById("Producttype_").innerHTML=jsonObj.Product_type;
                document.getElementById("Customer_name").innerHTML=jsonObj.Customer_name;
                document.getElementById("Customer_contact").innerHTML=jsonObj.Customer_contact;
                document.getElementById("Region_").innerHTML=jsonObj.Region;
                document.getElementById("Raised_date").innerHTML=jsonObj.Raised_date;
                document.getElementById("Issue_brief").innerHTML=jsonObj.Issue_brief;
                document.getElementById("Issue_detail_description").innerHTML=jsonObj.Issue_detail_description;
                document.getElementById("Priorities_").innerHTML=jsonObj.Priorities;
            }

            if(jsonObj.Root_Cause==null){

                document.getElementById("Root_cause").innerHTML="";
            }else {
                document.getElementById("Root_cause").innerHTML=jsonObj.Root_Cause;
            }
            if(jsonObj.Repley==null){
                document.getElementById("Repley").innerHTML="";
            }else {
                document.getElementById("Repley").innerHTML=jsonObj.Repley;
            }
            if(jsonObj.Issue_status==null){
                document.getElementById("Issue_Status").innerHTML="";

            }else {
                document.getElementById("Issue_Status").innerHTML=jsonObj.Issue_status;
            }

            if(jsonObj.Close_date==null){
                document.getElementById("Close_date").innerHTML="";
            }else {
                document.getElementById("Close_date").innerHTML=jsonObj.Close_date;
            }

            if(jsonObj.Datetime==null){
                document.getElementById("Datetime").innerHTML="";
            }else {
                document.getElementById("Datetime").innerHTML=jsonObj.Datetime;
            }
            if(jsonObj.Submitter_email==null){
                document.getElementById("s_email").innerHTML="";
            }else {
                document.getElementById("s_email").innerHTML=jsonObj.Submitter_email;
            }
            if(jsonObj.Editor_email==null){
                document.getElementById("e_email").innerHTML="";
            }else {
                document.getElementById("e_email").innerHTML=jsonObj.Editor_email;
            }
            if(jsonObj.Analyst_email==null){
                document.getElementById("a_email").innerHTML="";
            }else {
                document.getElementById("a_email").innerHTML=jsonObj.Analyst_email;
            }


            if(jsonObj.Attachment_id==null){
                document.getElementById("Attachment").innerHTML="";
            }else {
                //note:JQuery的ajax函数的返回类型只有xml、text、json、html等类型，没有“流”类型，所以我们要实现ajax下载，不能够使用相应的ajax函数进行文件下载。但可以用js生成一个form，用这个form提交参数，并返回“流”类型的数据。在实现过程中，页面也没有进行刷新。
                //document.getElementById("Attachment").innerHTML=jsonObj.Attachment_id;
                document.getElementById("Attachment").innerHTML="attachment.zip";
                document.getElementById("Attachment").onclick=function(){
                    var form=$("<form>");//定义一个form表单
                    form.attr("style","display:none");
                    form.attr("target","");
                    form.attr("method","post");
                    form.attr("action","php/download.php");
                    var input1=$("<input>");
                    input1.attr("type","hidden");
                    input1.attr("name","Attachment");
                    input1.attr("value",jsonObj.Attachment_id);
                    $("body").append(form);//将表单放置在web中
                    form.append(input1);
                    form.submit();//表单提交
                }
            }
            cancelload();
        });

    }
}
function modify_list(){
    console.log("modify_list");
    document.getElementById("issue_ids").value=document.getElementById("issue_id").innerHTML.split(":")[1];
    console.error("issue_ids:"+document.getElementById("issue_ids").value);
    var customer_name=document.getElementById("customer_names").value;
    var customer_contact=document.getElementById("customer_contacts").value;
    var region=document.getElementById("regions").value;
    var issue_brief=document.getElementById("issue_briefs").value;
    var issue_detail_description=document.getElementById("issue_detail_descriptions").value;
    if(customer_name==''){
        document.getElementById("alert").style.display="";
        document.getElementById("inform").className="red";
        document.getElementById("welcometxt").innerText="error: customer_name can not be empty!";
        setTimeout('document.getElementById("alert").style.display="none"',2000);
        return false;
    }else{
        document.getElementById("inform").className="green";
    }
    if(customer_contact==''){
        document.getElementById("inform").className="red";
        document.getElementById("welcometxt").innerText="error: customer_contact can not be empty!";
        document.getElementById("alert").style.display="";
        setTimeout('document.getElementById("alert").style.display="none"',2000);
        return false;
    }else{
        document.getElementById("inform").className="green";

    }
    if(region==''){
        document.getElementById("inform").className="red";
        document.getElementById("welcometxt").innerText="error: region can not be empty!";
        document.getElementById("alert").style.display="";
        setTimeout('document.getElementById("alert").style.display="none"',2000);
        return false;
    }else{
        document.getElementById("inform").className="green";

    }
    if(issue_brief==''){
        document.getElementById("inform").className="red";
        document.getElementById("welcometxt").innerText="error: issue_brief can not be empty and limit 8000 bytes!";
        document.getElementById("alert").style.display="";
        setTimeout('document.getElementById("alert").style.display="none"',2000);
        return false;
    }else{
        document.getElementById("inform").className="green";

    }
    if(issue_detail_description==''){
        document.getElementById("inform").className="red";
        document.getElementById("welcometxt").innerText="error: issue_detail_description can not be empty and limit 8000 bytes!";
        document.getElementById("alert").style.display="";
        setTimeout('document.getElementById("alert").style.display="none"',2000);
        return false;
    }else{
        document.getElementById("inform").className="green";
    }
    var form=document.getElementById("form");
    var fd =new FormData(form);
    $.ajax({
        url: "php/modify.php",
        type: "POST",
        data: fd,
        processData: false,  // 告诉jQuery不要去处理发送的数据
        contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
        success: function(data,status,xhr){
            console.error(data);
            jsonObj=JSON.parse(data);

            switch (jsonObj.result){
                /*case "1":
                    document.getElementById("inform").className="red";
                    document.getElementById("welcometxt").innerText="error!";
                    document.getElementById("alert").style.display="";
                    setTimeout('document.getElementById("alert").style.display="none"',2000);
                    break;
                case "2":
                    document.getElementById("inform").className="red";
                    document.getElementById("welcometxt").innerText="error!";
                    document.getElementById("alert").style.display="";
                    setTimeout('document.getElementById("alert").style.display="none"',2000);
                    break;
                case "3":
                    document.getElementById("inform").className="red";
                    document.getElementById("welcometxt").innerText="error!";
                    document.getElementById("alert").style.display="";
                    setTimeout('document.getElementById("alert").style.display="none"',2000);
                    break;
                case "4":
                    document.getElementById("inform").className="red";
                    document.getElementById("welcometxt").innerText="error!";
                    document.getElementById("alert").style.display="";
                    setTimeout('document.getElementById("alert").style.display="none"',2000);
                    break;*/
                case "1":
                document.getElementById("inform").className="red";
                document.getElementById("welcometxt").innerText="Error: Zip file size limit within 8MB !";
                document.getElementById("alert").style.display="";
                setTimeout('document.getElementById("alert").style.display="none"',2000);
                break;
                case "2":
                    document.getElementById("inform").className="red";
                    document.getElementById("welcometxt").innerText="Error: Zip file size limit within 8MB !";
                    document.getElementById("alert").style.display="";
                    setTimeout('document.getElementById("alert").style.display="none"',2000);
                    break;
                case "3":
                    document.getElementById("inform").className="red";
                    document.getElementById("welcometxt").innerText="Error: Only part of the zip file is uploaded !";
                    document.getElementById("alert").style.display="";
                    setTimeout('document.getElementById("alert").style.display="none"',2000);
                    break;
                case "4":
                    document.getElementById("inform").className="red";
                    document.getElementById("welcometxt").innerText="Error:You can only upload zip files !";
                    document.getElementById("alert").style.display="";
                    setTimeout('document.getElementById("alert").style.display="none"',2000);
                    break;
                case "error":
                    document.getElementById("inform").className="red";
                    document.getElementById("welcometxt").innerText="System error!";
                    document.getElementById("alert").style.display="";
                    setTimeout('document.getElementById("alert").style.display="none"',4000);
                    break;
                case "fail":
                    document.getElementById("inform").className="red";
                    document.getElementById("welcometxt").innerText="Failure to submit!";
                    document.getElementById("alert").style.display="";
                    setTimeout('document.getElementById("alert").style.display="none"',4000);
                    break;
                case "success":
                    modify(window.location.href.split("=")[1]);
                    document.getElementById("inform").className="green";
                    document.getElementById("welcometxt").innerText="submit success!";
                    document.getElementById("alert").style.display="";
                    setTimeout('document.getElementById("alert").style.display="none"',4000);

                    break;

            }


        }
    });
    return false;


}
function modify_num(){
    window.location.href = "list-modify.html?id="+document.getElementById("search").value;
}