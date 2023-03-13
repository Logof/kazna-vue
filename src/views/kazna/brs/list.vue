<template>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-button type="primary" :icon="Plus" @click="brsFormEditVisible = true">Создать РР</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="_identity" label="ID" width="300px" align="center"></el-table-column>
				<el-table-column prop="entry_date" label="Дата" width="100px"></el-table-column>
                <el-table-column prop="debit_account" label="Счет списания"></el-table-column>
				<el-table-column prop="credit_account" label="Счет зачисления"></el-table-column>
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
    		v-model="brsFormEditVisible"
    		title="Расходное расписание"
    		width="70%"
    		destroy-on-close
    		center
  		>
			<brsEdit @eventFormDataSave="onSubmit" @eventFormDataCancel="onCancel" />
		</el-dialog>

		<el-dialog
    		v-model="brsFormViewVisible"
    		title="Расходное расписание"
    		width="70%"
    		destroy-on-close
    		center
  		>
			<brsView :brs-data="brsData" @eventFormDataCancel="onCancel" />
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Edit, Plus } from '@element-plus/icons-vue';
import { saveBrsApi, getAllBrsApi, type docBrs } from '../../../api/kazna/brs/index';
import brsEdit from './components/docBrs.vue';
import brsView from './components/docBrs.vue';

const brsData = ref<docBrs>();

const tableData = ref<docBrs[]>([]);
const pageTotal = ref(0);

const brsFormEditVisible = ref(false);
const brsFormViewVisible = ref(false);

const getData = async () => {
	await getAllBrsApi().then(res => {
        console.log(res.data.BRS);
		tableData.value = res.data.BRS;
		pageTotal.value = res.data.BRS.length;
	});
};
getData();

const editVisible = ref(false);

let form = reactive({
	name: '',
	address: '',
	debit_account: '',
  	credit_account: '',
  	entry_date: '',
  	ba: [],
  	lbo: [],
  	pofr: [],
});

let idx: number = -1;
const handleView = (index: number, row: any) => {
	brsData.value = row;
	brsFormViewVisible.value = true;
};

const onSubmit = async (data: any) => {
	await saveBrsApi(data).then(res => {
		if (res.data.status) {
			ElMessage.success(res.data.message);
		} else {
			ElMessage.error(res.data.error.responses[0].response.message);
		}
		console.log(res.data);
	});
	brsFormEditVisible.value = false;
	getData();
}

const onCancel = (data: boolean) => {
	if (data) {
		brsFormEditVisible.value = false;
		brsFormViewVisible.value = false;
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
