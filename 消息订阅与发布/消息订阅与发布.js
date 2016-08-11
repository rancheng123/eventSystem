
var eventSystem = (function(){
    //消息池
    var eventStore = {};

    var eventSystem = {
        //消息订阅
        on: function(oContext,eventType,callback){
            //没有宿主
            if(!eventStore[oContext]){
                eventStore[oContext] = {};
            };
            //没有此事件
            if(!eventStore[oContext][eventType]){
                eventStore[oContext][eventType] = [];
            };
            eventStore[oContext][eventType].push(callback);
        },

        off: function(oContext,eventType){
            //无效的宿主
            if(!eventStore[oContext]){
                console.error('没有'+ oContext +'此宿主');
                return;
            }

            if(!eventType){
                //不区分事件类型  删除整个宿主
                delete eventStore[oContext];
            }else{
                //删除单个事件
                delete eventStore[oContext][eventType];
            };
        },

        //消息发布
        trigger: function(oContext,eventType){

            //无效的宿主
            if(!eventStore[oContext]){
                console.error('没有'+ oContext +'此宿主');
                return;
            }

            //无效的事件
            if(!eventStore[oContext][eventType]){
                console.error('没有'+ eventType +'此事件');
                return;
            }

            var callbackList = eventStore[oContext][eventType];
            for(var i=0;i<callbackList.length;i++){
                callbackList[i]();
            }
        }
    };
    return eventSystem;
})();



window.onload = function(){
    //使用

    document.getElementById('on').onclick = function(){
        //注册事件
        eventSystem.on('head','toGreen',function(){
            document.body.style.background = 'green';

            console.log('发布事件成功')
        });
    };

    document.getElementById('trigger').onclick = function(){
        //发布事件
        eventSystem.trigger('head','toGreen');
    };

    document.getElementById('off').onclick = function(){
        //卸载事件
        eventSystem.off('head','toGreen');
    };





}

