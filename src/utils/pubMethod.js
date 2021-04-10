export {getWeight,getObj,initChart,Msg,getValue}
import * as echarts from 'echarts'
/**
 * 抽取目的对象中某一属性不同值出现的次数，并以对象数组形式进行返回
 * key:某一属性的值，value:出现的次数
 * @obj 抽取的目的对象
 * @newObj 结果放入的对象
 * @attr 需要抽取的属性
 */
function getWeight(obj, newObj, attr) {
    let edu = []
    for (let item of obj) {
        if (item){
            edu.push(item[attr])
        }
    }
    //权重
    for (let i = 0; i < edu.length; i++) {
        if (edu.indexOf(edu[i]) === i) {
            let num = 1;
            for (let j = i + 1; j < edu.length; j++) {
                if (edu[i] === edu[j]) {
                    num++;
                }
            }
            const obj = {}
            obj['name'] = edu[i]
            obj['value'] = num
            newObj.push(obj)
        }
    }
}
/**
 * 获取目的对象中的属性的种类，并以对象数组形式返回，key和value相同
 * key:某一属性的值，value:属性的值
 * @param attr  属性
 * @param newObj 返回的对象
 * @param obj 目的对象
 * {value:"高中",key:"高中"}
 */
function getObj(attr,newObj,obj){
    let edu = []
    for (let item of obj) {
        edu.push(item[attr])
    }
    let newsArr = [];
    for (let i = 0; i < edu.length; i++) {
        if(newsArr.indexOf(edu[i]) === -1){
            newsArr.push(edu[i]);
        }
    }
    for (let i = 0; i < newsArr.length; i++) {
        const obj = {}
        obj['text'] = newsArr[i]
        obj['value'] = newsArr[i]
        newObj.push(obj)
    }
}

/***
 * 获取某一个属性的值
 * @param attr
 * @param newObj
 * @param obj
 */
function getValue(attr,newObj,obj){
    for (let item of attr){
        newObj.push(item[obj])
    }
}

/**
 * 初始化chart图表
 * @param id  图表所在的标签的id
 * @param data  数据源
 */
function initChart(id,data){
    let chart = echarts.init(
        document.getElementById(id)
    );
    //注入数据
    chart.setOption(data);
}

//消息提示，内容，种类，消息
function Msg(param,type,msg){
    param({
        message: msg,
        type: type
    });
}