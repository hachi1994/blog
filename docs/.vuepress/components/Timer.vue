<!--
 * @Author: your name
 * @Date: 2021-04-15 16:41:50
 * @LastEditTime: 2021-04-15 16:54:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vuePressCode\docs\.vuepress\components\Timer.vue
-->
<template>
    <div>
        <h1>nihao</h1>
        <img :src="imgscr" alt="">
        {{timer}}
    </div>
</template>
<script>
import moment from 'moment'
import logo from '../public/img/logo.jpg'
export default {
    data(){
        return {
            timer:'',
            imgscr:''
        }
    },
    mounted(){
        let that = this
        this.imgscr = logo
        this.timer = moment().format('YYYY-MM-DD hh:mm:ss')
        setInterval(() => {
            that.timer = moment().format('YYYY-MM-DD hh:mm:ss')
        }, 1000);
    }
}
</script>