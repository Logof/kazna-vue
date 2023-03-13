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
    <el-table-column align="center" label="Номер" width="250">
      <template v-slot="{ row }">
        <span v-if="!row.isEdit">{{ row.number }}</span>
        <el-input 
          v-else
          v-model="row.number"
          show-word-limit
          placeholder="Please input"
          maxlength="10"
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
    <el-table-column align="center" label="Тип документа" width="180">
      <template v-slot="{ row }">
        <span v-if="!row.isEdit">{{ row.caption }}</span>
        <el-input
          v-else
          v-model="row.caption"
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
    <el-table-column align="center" label="Ссылка" width="400">
      <template v-slot="{ row }">
        <span v-if="!row.isEdit">{{ row.uri }}</span>
        <el-input
          v-else
          v-model="row.uri"
          placeholder="Please input"
          maxlength="200"
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
  </el-table>
  <el-button v-if="props.isEditable" type="success" :icon="Plus" @click="handleAddNewRow"></el-button>
</template>

<script lang="ts" setup>
import { ref, PropType } from "vue";
import { Check, Plus } from "@element-plus/icons-vue";
import { type reasonDocument } from "../../../../api/kazna/abo/index";

const props = defineProps({
  reasonData: {
    type: Object as PropType<reasonDocument>,
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
  number: string;
  caption: string;
  uri: string;
  isEdit: boolean;
}

const prevRowSelect = ref();

const tableData = ref<tableRecord[]>([]);

const getList = () => {
  if (props.reasonData !== undefined) {
    tableData.value = props.reasonData.map((item, index) => ({ ...item, isEdit: false, rowIndex: index }));
  }
};
getList();

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
    number: "",
    caption: "",
    uri: "",
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
</script>

<style></style>
