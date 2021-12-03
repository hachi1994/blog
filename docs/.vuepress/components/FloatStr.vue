<!--
 * @Author: your name
 * @Date: 2021-04-15 16:41:50
 * @LastEditTime: 2021-04-15 16:54:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vuePressCode\docs\.vuepress\components\Timer.vue
-->
<template>
    <!-- <img id='floatImg' width='25' :src="src" alt=""> -->
    <div  id='floatImg'> </div>
</template>
<script>
export default {
    data(){
        return {
               src:'',
               imgList:[
                   '/img/floatImgs/1.jpg',
                   '/img/floatImgs/2.jpg',
                   '/img/floatImgs/3.jpg',
                   '/img/floatImgs/4.jpg',
                   '/img/floatImgs/5.jpg',
                   '/img/floatImgs/6.jpg',
                   '/img/floatImgs/7.jpg',
                   '/img/floatImgs/8.jpg'
               ]
        }
    },
    methods: {
        setFloatImg(e){
            console.log(e);
            if(document.getElementById('lhc')){
                let imgg = document.getElementById('lhc')
                document.body.removeChild(imgg)
            }
            
            //let img = document.getElementById('floatImg')
            //console.log(img)
            let img = document.createElement('img')
            img.id ='lhc'
            img.innerText ='wcaonid'
            img.style.position = 'fixed'
            img.style.top = e.clientY - 50 +'px'
            img.style.opacity = 1
            img.style.left = e.clientX + 'px'
            img.style.width = '50px'
            img.style.transition = 'all 1s'
            img.src = this.imgList[parseInt(Math.random()*0.7 *10)] 
            document.body.appendChild(img)
            
            let timer = setTimeout(() => {
                let imgg = document.getElementById('lhc')
                imgg.style.top = e.clientY - 150 +'px'
                imgg.style.opacity = 0
                let timer1 = setTimeout(() => {
                    document.body.removeChild(imgg)
                    clearTimeout(timer)
                    //clearTimeout(timer1)
                }, 1000);
            }, 0);
            
            
        }
    },
    mounted(){
        window.addEventListener('click',this.setFloatImg)
    }
}
</script>