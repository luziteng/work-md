/* 
* @Author: Marte
* @Date:   2018-09-08 10:54:37
* @Last Modified by:   Marte
* @Last Modified time: 2019-05-08 15:06:22
*/

//*********************判断闰年*****************//
 function leapYear(year){
        if(year >1000 && typeof(year)=="number"){
           if(year%4==0 && year%100!=0 || year%400==0){
                                return 1;
                            }
                            else{
                                return 2;
                            }
        }
        else{
                return 3;
        }
 }

 //********************计算数组数字总和*************//
 function getSum(arr){
        var sum = 0;
        for(var i=0;i<arr.length;i++){
            sum +=arr[i];
        }
        return sum;
 }
//************偶数、奇数分数和**********************//
function getFenshuSum(n){
    var sum=0;
        if(n%2==0){
            for(i=2;i<=n;i+=2)
                sum+=1/i;
        }
        else if(n%2==1){
            for(i=1;i<=n;i+=2)
                sum+=1/i;
        }
    return sum;
    }

//***************获取一定范围内的随机数*************//
function getRandNum(min,max){
    var randNum=parseInt(Math.random()*(max-min+1)+min);
    return randNum;
}

//***************获取随机色****************************//
function getRandColor(){
    var r = getRandNum(0,255);
    var g = getRandNum(0,255);
    var b = getRandNum(0,255);
    return 'rgb'+'('+r+','+g+','+b+')';
}
//*********************阶乘*********************//
function getJiecheng(n){
        if(n==1||n==0) return 1;
        return n*getJiecheng(--n);
}
//*********************数列*********************//
function getShulie(n){
       if(n==1 || n == 2){
                return 1;
            }
            return getShulie(n-1) +getShulie(n-2);
        
}
//*******************随机生成一定范围内数组***************//
function getArr(min,max,leng){
    var arr=[];
    for(var i =0;i<leng;i++){
        arr[i] = getRandNum(min,max);
    }
    return arr;
}

//****************截取数组字符**************************//
//实现防止相同的值的索引互相覆盖。//
//可以用第一次得到字符串或数组，再调用一次函数。要注意第二次找不索引是返回-1，会切掉最后一个值或返回空//
//如果只知道要截取包含的值内的内容，可以使用push()和unshift()把切掉的值补上。
function getSlice(att,attr,item){
        //att 被切割的值，attr切割起始点，item切割终点
        //在传过来的实参已经加了引号，使用索引就不要加引号，否则会默认为需要索引的对象为括号内容，索引方法没有找到返回-1。
        //截取字符串
        if(typeof att =="string"){
            var idx1 = att.indexOf(attr)+1;
            var idx2 = att.lastIndexOf(item);
            var str =att.slice(idx1,idx2);
            return str;
        }

        //截取数组
        else if(Array.isArray(att)){
            for(var i= 0 ;i<att.length;i++){
                if(att[i]===attr){
                    var idx1 = i+1;
                    break;
                }                
            }
            for(var i=att.length;i>0;i--){
                if(att[i]===item){
                    var idx2 =i;
                    break;
                }
            }
            var  arr1 =att.slice(idx1,idx2);
            return arr1;
        }    
}


//**********************冒泡排序法********************//
function bubbling(arr){
         for(var i=0;i<arr.length-1;i++){
            for(var j=0;j<arr.length-1-i;j++){
                if(arr[j] > arr[j+1]){
                    var current = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = current;
                }
            }
        }
        return arr;
}

//********************选择排序法**********************//
function selPaixu(arr){
    for(var i=0;i<arr.length-1;i++){
            for(var j=i+1;j<arr.length;j++){
                if(arr[i]>arr[j]){
                    var current = arr[i];
                    arr[i] = arr[j];
                    arr[j] = current;
                }
            }
        }
        return arr;
}

//**********************快速排序**********************//
//如果出现多个数值一样的会被切割掉
function quickSort(arr){
    if(arr.length <= 1){
                return arr;
            }
            //1. 找出数组中间位置元素
            var cIdx = parseInt(arr.length/2);
            // 2. 通过splice(),改变原数组(去掉了中间那个数)。返回值为被删除的元素
            var cItem = arr.splice(cIdx,1);
            // 3.声明两个数组
            var arrGt = [];
            var arrLt = [];
            
            // 4.遍历arr,大于cItem的值，放在arrGt。小于的话放在arrLt
            for(var i=0;i<arr.length;i++){
                if(arr[i]>cItem[0]){
                    arrGt.push(arr[i]);
                }else if(arr[i] < cItem[0]){
                    arrLt.push(arr[i]);
                }
            }
            return quickSort(arrLt).concat(cItem,quickSort(arrGt));
}
//****************随机生成数字验证码********************//
function NumCode(num){
    var randomMa =[];
    for(var i = 0;i<num;i++){
        randomMa.push(parseInt(Math.random()*10));
    }  
    return randomMa.join("");
}

//*****************随机生成大写字母字符串***************//
//String.fromCharCode(94) //编码转换成字符String.fromCharCode
function bigLetter(num){
    var randomMa = [];
    for(var i = 0; i<num;i++){
        randomMa.push(String.fromCharCode(parseInt(Math.random()*(90-65+1)+65)));
    }
    return randomMa.join("");
}

//*****************随机生成小写字母字符串***************//
function smallLetter(num){
    var randomMa = [];
    for(var i=0;i<num;i++){
        randomMa.push(String.fromCharCode(parseInt(Math.random()*(122-97+1)+97)));
    }
    return randomMa.join("");
}
//*****************随机生成数字大小写字母字符串***************//
function randCode(num){
    var randomMa = [];
    var str ="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0987654321"
    for(var i = 0;i<num;i++){
        idx = parseInt(Math.random()*62);
        randomMa.push(str[idx]);
    }
    return randomMa.join("");
}


/*
*
日期转换，毫秒数改为时间日期
*
 */
timeChange =(time,state)=>{
  let unixTimestamp = new Date( time ) ;
  let commonTime = unixTimestamp.toLocaleString();
  if(state==='LL'){
     Date.prototype.toLocaleString = function() {
        let h = this.getHours() < 10 ? '0'+this.getHours() : this.getHours();
        let m = this.getMinutes() < 10 ? '0' + this.getMinutes() : this.getMinutes();
        let s = this.getSeconds() < 10 ? '0' + this.getSeconds() : this.getSeconds();
        return this.getFullYear() + '/' + (this.getMonth() + 1) + '/' + this.getDate() + ' ' + h + ":" + m + ":" + s;
    };
   return commonTime;
  }else if(state ==='Ll'){
    Date.prototype.toLocaleString = function() {
    return this.getFullYear() + '/' + (this.getMonth() + 1) + '/' + this.getDate() + ' ' + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
   };
   return commonTime;
}else{
     Date.prototype.toLocaleString = function() {
     return this.getFullYear() + '/' + (this.getMonth() + 1) + '/' + this.getDate() ;
   };
   return commonTime;
}
  
}

