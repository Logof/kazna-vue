<template>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-button type="primary" :icon="Plus" @click="adoFormEditVisible = true">Создать заявку</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="_identity" label="ID" width="300px" align="center"></el-table-column>
                <el-table-column prop="personal_account" label="Счет списания"></el-table-column>
				<el-table-column prop="receiver_account" label="Счет зачисления"></el-table-column>
				<el-table-column label="Действия" width="220" align="center">
					<template #default="scope">
						<el-button text :icon="Edit" @click="handleView(scope.$index, scope.row)">
							Подробнее
                        </el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		
		<el-dialog
    		v-model="adoFormEditVisible"
    		title="Денежное обязательство"
    		width="70%"
    		destroy-on-close
    		center
  		>
			<ado @eventFormDataSave="onSubmit" @eventFormDataCancel="onCancel" />
		</el-dialog>
		<el-dialog
    		v-model="adoFormViewVisible"
    		title="Денежное обязательство"
    		width="70%"
    		destroy-on-close
    		center
  		>
			<ado :ado-Data="adoData" @eventFormDataCancel="onCancel" />
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Edit, Plus } from '@element-plus/icons-vue';
import { saveAdoApi, getAllAdoApi, type docAdo } from '../../../api/kazna/ado/index';
import ado from './components/docAdo.vue';

const tableData = ref<docAdo[]>([]);
const adoData = ref<docAdo>();
const pageTotal = ref(0);
const adoFormEditVisible = ref(false);
const adoFormViewVisible = ref(false);

const getData = async () => {
	await getAllAdoApi().then(res => {
        console.log(res.data.DO);
		tableData.value = res.data.DO;
		pageTotal.value = res.data.DO.length;
	});
};
getData();

const editVisible = ref(false);

let form = reactive({
  personal_account: '',
  receiver_account: '',
  reason_documents: [],
  decoding: [],
});

let idx: number = -1;
const handleView = (index: number, row: any) => {
	adoData.value = row;
	adoFormViewVisible.value = true;
};

const onSubmit = async (data: any) => {
	await saveAdoApi(data).then(res => {
		if (res.data.status) {
			ElMessage.success(res.data.message);
		} else {
			ElMessage.error(res.data.error.responses[0].response.message);
		}
		console.log(res.data);
	});
	adoFormEditVisible.value = false;
	getData();
}

const onCancel = (data: boolean) => {
	if (data) {
		adoFormEditVisible.value = false;
		adoFormViewVisible.value = false;
	}
}
</script>

<style scoped>
.handle-box {
	margin-bottom: 20px;
}

.handle-select {
	width: 120px;
}

.handle-input {
	width: 300px;
}
.table {
	width: 100%;
	font-size: 14px;
}
.red {
	color: #F56C6C;
}
.mr10 {
	margin-right: 10px;
}
.table-td-thumb {
	display: block;
	margin: auto;
	width: 40px;
	height: 40px;
}
</style>
