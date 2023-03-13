<template>
    <el-form :model="form" label-width="180px">
      <el-form-item label="Счет списания:">
        <el-input v-if="props.brsData._identity === undefined || props.brsData._identity === ''" v-model="form.debit_account" />
        <el-input v-else v-model="form.debit_account" disabled />
      </el-form-item>
      <el-form-item label="Счет зачисления:">
        <el-input v-if="props.brsData._identity === undefined || props.brsData._identity === ''" v-model="form.credit_account" />
        <el-input v-else v-model="form.credit_account" disabled />
      </el-form-item>
      <el-form-item label="Дата действия:">
        <el-date-picker
          v-if="props.brsData._identity === undefined || props.brsData._identity === ''"
          v-model="form.entry_date"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
        />
        <el-date-picker
          v-else
          v-model="form.entry_date"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
          disabled
        />
      </el-form-item>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="БА" name="brs_ba">
          <BrsParty v-if="props.brsData._identity === undefined || props.brsData._identity === ''" @eventPartDataChange="getEventBaData" />
          <BrsParty v-else :part-brs-data="form.ba" :is-editable = "false" />
        </el-tab-pane>
        <el-tab-pane label="ЛБО" name="brs_lbo">
          <BrsParty v-if="props.brsData._identity === undefined || props.brsData._identity === ''" @eventPartDataChange="getEventLboData" />
          <BrsParty v-else :part-brs-data="form.lbo" :is-editable = "false" />
        </el-tab-pane>
        <el-tab-pane label="ПОФР" name="brs_pofr">
          <BrsParty v-if="props.brsData._identity === undefined || props.brsData._identity === ''" @eventPartDataChange="getEventPofrData" />
          <BrsParty v-else :part-brs-data="form.pofr" :is-editable = "false" />
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button v-if="props.brsData._identity === undefined || props.brsData._identity === ''" type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </template>
  
<script lang="ts" setup>
import { reactive, ref, PropType } from "vue";
import type { TabsPaneContext } from "element-plus";
import { type docBrs, type partBrs } from "../../../../api/kazna/brs/index";
import BrsParty from "./BrsParty.vue";

const props = defineProps({
  brsData: {
    type: Object as PropType<docBrs>,
    default: [],
  },
});

  
const emit = defineEmits(["eventFormDataSave", "eventFormDataCancel"]);

const brsFormVisible = ref(false);
  
const activeName = ref("brs_ba");
  
const currentDate = new Date();
  
const getDate = (date?: Date): string => {
  if (date == null) {
    date = new Date();
  }
  
  const year = String(date.getFullYear());
  let month = String(date.getMonth() + 1);
  let day = String(date.getDate());
  
  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }
  
  return year + "-" + month + "-" + day;
};
  
const form = reactive<docBrs>({
  debit_account: props.brsData.debit_account || "" ,
  credit_account: props.brsData.credit_account || "",
  entry_date: props.brsData.entry_date || getDate(currentDate),
  ba: props.brsData.ba || [],
  lbo: props.brsData.lbo || [],
  pofr: props.brsData.pofr || [],
});
  
const onSubmit = () => {
  emit("eventFormDataSave", form);
};

const onCancel = () => {
  emit("eventFormDataCancel", true);
}
  
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
  
const getEventBaData = (data: any) => {
  form.ba = data.map(item => <partBrs>{
    code: item.code,
    subCode: item.subCode,
    amount: item.amount,    
  });
};
  
const getEventLboData = (data: any) => {
  form.lbo = data.map(item => <partBrs>{
    code: item.code,
    subCode: item.subCode,
    amount: item.amount,    
  });
};
  
const getEventPofrData = (data: any) => {
  form.pofr = data.map(item => <partBrs>{
    code: item.code,
    subCode: item.subCode,
    amount: item.amount,    
  });
};
</script>
  
  <style>
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }
  
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  </style>