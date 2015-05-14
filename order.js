/*
//////////////////////////////////////////////
--[[
                   _ooOoo_
                  o8888888o
                  88" . "88
                  (| -_- |)
                  O\  =  /O
               ____/`---'\____
             .'  \\|     |//  `.
            /  \\|||  :  |||//  \
           /  _||||| -:- |||||-  \
           |   | \\\  -  /// |   |
           | \_|  ''\---/''  |   |
           \  .-\__  `-`  ___/-. /
         ___`. .'  /--.--\  `. . __
      ."" '<  `.___\_<|>_/___.'  >'"".
     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
     \  \ `-.   \_ __\ /__ _/   .-` /  /
======`-.____`-.___\_____/___.-`____.-'======
                   `=---='
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      佛祖保佑       永无BUG      永不修改
--]]
//////////////////////////////////////////////
*/
function Order(){
    return this;
}

Order.prototype = {
    /*队列的顺序*/
    start : 0,
    /*函数队列*/
    fun_array : [],
    /*函数包装*/
    tempPack : {},
    /*需要执行函数添加到队列中*/
    add : function(fun,args){
        /*包装一下函数*/
        this.tempPack.fun = fun;
        this.tempPack.arg = args;
        this.fun_array.push(this.tempPack);
        this.tempPack = {};/*初始化*/

        return this;
    },
    /*开启队列中的函数*/
    doByOrder : function(){
        var tagObj = this;
        function next(){
            tagObj.start += 1;
            if(tagObj.start < tagObj.fun_array.length){
                /*生成数组，然后将next方法封装进去*/
                var tempArgs = tagObj.fun_array[tagObj.start].arg ? Array.prototype.slice.call(tagObj.fun_array[tagObj.start].arg) : [];
                tempArgs.push(next);
                tagObj.fun_array[tagObj.start].fun.apply(null,tempArgs);
            }
        };

        if(this.fun_array[this.start]){
            var tempArgs = Array.prototype.slice.call(this.fun_array[this.start].arg || []);
            tempArgs.push(next);
            this.fun_array[this.start].fun.apply(null,tempArgs);
        }
    }
};
