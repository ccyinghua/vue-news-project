<!-- 头部组件 -->
<template>
    <div id="nav">
        <div class="nav">
            <ul class="clear">
                <!-- <li class="active"><a href="javascript:;">首页</a></li>
                <li><a href="javascript:;">关注</a></li>
                <li><a href="javascript:;">栏目</a></li> -->
                <router-link tag="li" to="/home" active-class="active">
                    <a href="javascript:;">首页</a>
                </router-link>
                <router-link tag="li" to="/follow" active-class="active">
                    <a href="javascript:;">关注</a>
                </router-link>
                <router-link tag="li" to="/column" active-class="active">
                    <a href="javascript:;">栏目</a>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<style scoped>
    .nav{width:100%; position:fixed; top:0;left:0; z-index:2; background:#fff;}
    .nav ul{width:4.38rem;height:0.6rem; margin:0 auto;}
    .nav ul li{width:1.46rem;height:0.6rem; float:left;}
    .nav ul li a{ display:block;width:1.46rem;height:0.6rem; line-height:0.6rem; text-align:center; font-size:0.3rem; color:#9e9a95;}
    .nav ul li.active a{height:0.5rem; border-bottom:0.1rem solid #5477b2; color:#5477b2;}
</style>