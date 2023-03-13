<template>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-button type="primary" :icon="Plus" @click="aboFormEditVisible = true">Создать заявку</el-button>
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
    		v-model="aboFormEditVisible"
    		title="Бюджетное обязательство"
    		width="70%"
    		destroy-on-close
    		center
  		>
			<abo @eventFormDataSave="onSubmit" @eventFormDataCancel="onCancel" />
		</el-dialog>

		<el-dialog
    		v-model="aboFormViewVisible"
    		title="Бюджетное обязательство"
    		width="70%"
    		destroy-on-close
    		center
  		>
			<abo :abo-data="aboData" @eventFormDataCancel="onCancel" />
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Edit, Plus } from '@element-plus/icons-vue';
import { saveAboApi, getAllAboApi, type docAbo } from '../../../api/kazna/abo/index';
import abo from './components/docAbo.vue';

const emit = defineEmits(["eventFormDataSave", "eventFormDataCancel"]);

const tableData = ref<docAbo[]>([]);
const aboData = ref<docAbo>();

const pageTotal = ref(0);
const aboFormEditVisible = ref(false);
const aboFormViewVisible = ref(false);

const getData = async () => {
	await getAllAboApi().then(res => {
        console.log(res.data.BO);
		tableData.value = res.data.BO;
		pageTotal.value = res.data.BO.length;
	});
};
getData();

const editVisible = ref(false);

let form = reactive({
  debit_account: '',
  receiver_account: '',
  budget_obligation: '',
  monetary_obligation: '',
  decoding: [],
});

let idx: number = -1;
const handleView = (index: number, row: any) => {
	aboData.value = row;
	aboFormViewVisible.value = true;
};

const onSubmit = async (data: any) => {
	await saveAboApi(data).then(res => {
		if (res.data.status) {
			ElMessage.success(res.data.message);
		} else {
			ElMessage.error(res.data.error.responses[0].response.message);
		}
		console.log(res.data);
	});
	aboFormEditVisible.value = false;
	getData();
}

const onCancel = (data: boolean) => {
	if (data) {
		aboFormEditVisible.value = false;
		aboFormViewVisible.value = false;
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
