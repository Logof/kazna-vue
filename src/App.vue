<template>
    <el-config-provider :locale="ru">
        <router-view />
    </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import ru from 'element-plus/es/locale/lang/ru';
</script>
<style>
@import './assets/css/main.css';
@import './assets/css/color-dark.css';
</style>
