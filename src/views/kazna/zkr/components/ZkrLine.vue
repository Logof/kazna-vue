<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    @row-dblclick="handleDoubleClick"
    :row-class-name="tableRowClassName"
  >
    <el-table-column align="center" label="" width="50">
      <template v-slot="{ row }">
        <span>{{ row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="КБК" width="310">
      <template v-slot="{ row }">
        <span v-if="!row.isEdit">{{ row.code }}</span>
        <el-input
          v-else
          v-model="row.code"
          show-word-limit
          placeholder="Please input"
          maxlength="20"
          class="w-50 m-2"
          @input="submitFormData"
          @focus="handleChangeFocus(row.rowIndex)"
        >
          <template #append>
            <el-button
              type="success"
              :icon="Check"
              @click="tableData[row.rowIndex].isEdit = false"
            />
          </template>
        </el-input>
      </template>
    </el-table-column>
    <el-table-column align="center" label="КЦ" width="180">
      <template v-slot="{ row }">
        <span v-if="!row.isEdit">{{ row.subCode }}</span>
        <el-input
          v-else
          v-model="row.subCode"
          placeholder="Please input"
          maxlength="20"
          class="w-50 m-2"
          @input="submitFormData"
          @focus="handleChangeFocus(row.rowIndex)"
        >
          <template #append>
            <el-button
              type="success"
              :icon="Check"
              @click="tableData[row.rowIndex].isEdit = false"
            />
          </template>
        </el-input>
      </template>
    </el-table-column>
    <el-table-column align="center" label="Сумма" width="200">
      <template v-slot="{ row }">
        <span v-if="!row.isEdit">{{ row.amount }}</span>
        <el-input
          v-else
          v-model="row.amount"
          placeholder="Please input"
          maxlength="20"
          class="w-50 m-2"
          @input="submitFormData"
          @focus="handleChangeFocus(row.rowIndex)"
        >
          <template #append>
            <el-button
              type="success"
              :icon="Check"
              @click="tableData[row.rowIndex].isEdit = false"
              input=""
            />
          </template>
        </el-input>
      </template>
    </el-table-column>
    <el-table-column align="center" label="Авансовый платеж" width="200">
      <template v-slot="{ row }">
        <el-checkbox v-if="!row.isEdit" v-model="row.isPrepaid" disabled />
        <el-checkbox v-else v-model="row.isPrepaid" />
      </template>
    </el-table-column>
  </el-table>
  <el-button v-if="props.isEditable" type="success" :icon="Plus" @click="handleAddNewRow"></el-button>
</template>

<script lang="ts" setup>
import { ref, PropType } from "vue";
import { Check, Plus } from "@element-plus/icons-vue";
import type { zkrLine } from "../../../../api/kazna/zkr";

const props = defineProps({
  zkrLineData: {
    type: Object as PropType<zkrLine>,
    default: [],
  },
  isEditable: {
    type: Boolean,
    default: true,
  }
});

const emit = defineEmits(["eventPartDataChange"]);

interface tableRecord {
  rowIndex: number;
  code: string;
  subCode: string;
  amount: number;
  isPrepaid: boolean;
  isEdit: boolean;
}

const prevRowSelect = ref();

const tableData = ref<tableRecord[]>([]);

const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: tableRecord;
  rowIndex: number;
}) => {
  row.rowIndex = rowIndex;
};

const handleDoubleClick = (row: tableRecord, column: any, event: Event) => {
  if (!props.isEditable) {
   return;
  }
  if (prevRowSelect.value != undefined) {
    tableData.value[prevRowSelect.value].isEdit = false;
  }
  prevRowSelect.value = row.rowIndex;
  tableData.value[row.rowIndex].isEdit = true;
};

const handleAddNewRow = () => {
  if (prevRowSelect.value === undefined) {
    prevRowSelect.value = tableData.value.length - 1;
  }

  if (prevRowSelect.value !== -1) {
    tableData.value[prevRowSelect.value].isEdit = false;
  }
  tableData.value.push({
    rowIndex: tableData.value.length,
    code: "",
    subCode: "-",
    amount: 0,
    isPrepaid: false,
    isEdit: true,
  });
  prevRowSelect.value = tableData.value.length - 1;
};

const handleChangeFocus = (rowIndex: number) => {
  if (prevRowSelect.value === undefined) {
    prevRowSelect.value = rowIndex;
  }
  console.log("(focus) prew id = " + prevRowSelect.value);
  if (prevRowSelect.value !== undefined && prevRowSelect.value != rowIndex) {
    tableData.value[prevRowSelect.value].isEdit = false;
  }
};

function submitFormData() {
  emit("eventPartDataChange", tableData.value);
}

const getList = () => {
  console.log(props.zkrLineData)
  if (props.zkrLineData !== undefined) {
    tableData.value = props.zkrLineData.map((item, index) => ({ ...item, isEdit: false, rowIndex: index }));
  }
};
getList();

</script>

<style></style>
