<template>
  <el-form :model="form" label-width="180px">
    <el-form-item label="Счет плательщика:">
      <el-input v-if="props.zkrData._identity === undefined || props.zkrData._identity === ''" v-model="form.debit_account"/>
      <el-input v-else v-model="form.debit_account" disabled />
    </el-form-item>
    <el-form-item label="Счет получателя:">
      <el-input v-if="props.zkrData._identity === undefined || props.zkrData._identity === ''" v-model="form.receiver_account" />
      <el-input v-else v-model="form.receiver_account" disabled />
    </el-form-item>
    <el-form-item label="БО:">
      <el-input v-if="props.zkrData._identity === undefined || props.zkrData._identity === ''" v-model="form.budget_obligation" />
      <el-input v-else v-model="form.budget_obligation" disabled />
    </el-form-item>
    <el-form-item label="ДО:">
      <el-input v-if="props.zkrData._identity === undefined || props.zkrData._identity === ''" v-model="form.monetary_obligation" />
      <el-input v-else v-model="form.monetary_obligation" disabled />
    </el-form-item>
    <el-form-item label="Строки заявки:">
      <ZkrLine v-if="props.zkrData._identity === undefined || props.zkrData._identity === ''" @eventPartDataChange="getEventZrkLineData" />
      <ZkrLine v-else :zkr-line-data="form.decoding" :is-editable="false" />
    </el-form-item>
    <el-form-item>
      <el-button v-if="props.zkrData._identity === undefined || props.zkrData._identity === ''" type="primary" @click="onSubmit">Create</el-button>
      <el-button @click="onCancel">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, PropType } from "vue";
import { type docZkr, type zkrLine } from "../../../../api/kazna/zkr/index";
import ZkrLine from "./ZkrLine.vue";

const props = defineProps({
  zkrData: {
    type: Object as PropType<docZkr>,
    default: [],
  },
});

const emit = defineEmits(["eventFormDataSave", "eventFormDataCancel"]);

const currentDate = new Date();

const zkrFormVisible = ref(false);

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

const form = reactive<docZkr>({
  debit_account: props.zkrData.debit_account || "",
  receiver_account: props.zkrData.receiver_account || "",
  budget_obligation: props.zkrData.budget_obligation || "",
  monetary_obligation: props.zkrData.monetary_obligation || "",
  decoding: props.zkrData.decoding || [],
});

const getEventZrkLineData = (data: any) => {
  form.decoding = data.map(item => <zkrLine>{
      code: item.code,
      subCode: item.subCode,
      amount: item.amount,    
      is_prepaid: item.isPrepaid,
  });
};

const onSubmit = () => {
  emit("eventFormDataSave", form);
};

const onCancel = () => {
  emit("eventFormDataCancel", true);
}
</script>