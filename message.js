var option={
    message: '',    //消息文字
    duration: 3000,    //显示时间，毫秒，为0提示框不关闭
    id: '',          //消息id，动态时间戳
    onClose: null,  //关闭之后的回调函数
    timer: 0
};
var Message = function(options) {
    if(typeof options === 'string'){
        option.message = options;
    }else{
        for(var i in options){
            option[i] = options[i];
        }
    }
    creatHtml();
};
var creatHtml = function() {
        var node = document.createElement("div");
        if(option.id){
            document.getElementById(option.id+'-p').innerHTML=option.message;
            setTimeoutClose();
            return;
        }
        option.id = new Date().getTime();
        node.id = option.id;
        node.innerHTML = '<div class="my-message"><div class="message-cover"></div><div class="my-message__group"><p class="'+option.id+'-p">'
            + option.message
            + '</p><div class="my-message-close" id="'+option.id+'-close"></div></div></div>';
        document.body.appendChild(node);
        bindClose();
    },
    bindClose = function () {
        document.getElementById(option.id+'-close').onclick=function(){
            close();
        };
        setTimeoutClose();
    },
    close = function(){
        var remove = document.getElementById(option.id);
        document.body.removeChild(remove);
        option.id = '';
        clearTimeout(option.timer);
        if (typeof option.onClose === 'function') {
            option.onClose(Message);
        }
    },
    setTimeoutClose = function(){
        clearTimeout(option.timer);
        if(option.duration>0){
            option.timer = setTimeout(function () {
                close();
            }, option.duration);
        }
    };


export default Message;

