$('#login-button').click(function(event) {
    var userName = document.getElementById("userName").value;
    var pwd = document.getElementById("pwd").value;
    //修改密码请改此处
    if (userName == "zhoulong" && pwd == "24") {
        event.preventDefault();
        $('form').fadeOut(500);
        $('.wrapper').addClass('form-success');
        setTimeout(function() { location.href = "https://sp.zihol.studio/zl/BirthdayCake.html"; }, 2000);
    } else {
        alert("Wrong Password");
    }
});