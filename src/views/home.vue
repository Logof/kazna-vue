<template>
	<v-header />
	<v-sidebar />
	<div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
		<div class="content">
			<router-view v-slot="{ Component }">
				<transition name="move" mode="out-in">
					<component :is="Component"></component>
				</transition>
			</router-view>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useSidebarStore } from '../store/sidebar';
import vHeader from '../components/header.vue';
import vSidebar from '../components/sidebar.vue';

const sidebar = useSidebarStore();
</script>
