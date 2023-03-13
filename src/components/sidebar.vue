<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="sidebar.collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-sub-menu :index="item.index" :key="item.index">
                        <template #title>
                            <el-icon>
                                <component :is="item.icon"></component>
                            </el-icon>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-sub-menu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-sub-menu>
                            <el-menu-item v-else :index="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSidebarStore } from '../store/sidebar';
import { useRoute } from 'vue-router';

const items = [
    {
        icon: 'Odometer',
        index: '/dashboard',
        title: 'Главная',
    },
    {
        icon: 'Calendar',
        index: '1',
        title: 'Расходные расписания',
        subs: [
            {
                index: '/kazna/brs/list',
                title: 'Список расходных расписаний',
            },
        ],
    },
    {
        icon: 'Edit',
        index: '2',
        title: 'Учет и контроль бюджетных обязательств',
        subs: [
            {
                index: '3',
                title: 'Ввод и обработка платежных документов',
                subs: [
                    {
                        index: '/kazna/zkr/list',
                        title: 'Список заявок',
                    },
                ],
            },
            {
                index: '4',
                title: 'Ввод и обработка финансовых документов',
                subs: [
                    {
                        index: '/kazna/abo/list',
                        title: 'Список БО',
                    },
                    {
                        index: '/kazna/ado/list',
                        title: 'Список ДО',
                    },
                ],
            },
        ],
    },
];

const route = useRoute();
const onRoutes = computed(() => {
    return route.path;
});

const sidebar = useSidebarStore();
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 400px;
}
.sidebar > ul {
    height: 100%;
}
</style>
