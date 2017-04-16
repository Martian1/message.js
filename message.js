exports function Message(modules){
    var initDate={
        message: '',    //消息文字
        duration: 3000,    //显示时间，毫秒，为0提示框不关闭
        id: '',          //消息id，动态时间戳
        onClose: null,  //关闭之后的回调函数
        timer: 0
    };
    function Message(options){
        this.option = initDate;
        for(var i in options){
            this.option[i] = options[i];
        }
        this.init();
    }
    Message.prototype = {
        constructor:Message,
        init: function () {
            this.creatHtml();
        },
        creatHtml: function() {
            var node = document.createElement("div");
            this.option.id = new Date().getTime();
            node.id = this.option.id;
            node.innerHTML = '<div class="my-message"><div class="my-message-cover"></div><div class="my-message__group"><p>'
                + this.option.message
                + '</p><div class="my-message-close" id="'+this.option.id+'-close"></div></div></div>';
            document.body.appendChild(node);
            this.bindClose();
        },
        bindClose: function () {
            var that = this;
            document.getElementById(this.option.id+'-close').onclick=function(){
                that.close();
            };
            that.setTimeoutClose();
        },
        close: function(){
            var remove = document.getElementById(this.option.id);
            document.body.removeChild(remove);
            clearTimeout(this.option.timer);
            if (typeof this.option.onClose === 'function') {
                this.option.onClose(this);
            }
        },
        setTimeoutClose: function(){
            var that = this;
            if(this.option.duration>0){
                this.option.timer = setTimeout(function () {
                    that.close();
                }, this.option.duration);
            }
        }
    };

    return new Message(modules);
}