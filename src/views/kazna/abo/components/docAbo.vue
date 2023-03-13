<template>
    <el-form :model="form" label-width="200px">
      <el-form-item label="Счет плательщика:">
        <el-input v-if="props.aboData._identity === undefined || props.aboData._identity === ''" v-model="form.personal_account" />
        <el-input v-else v-model="form.personal_account" disabled />
      </el-form-item>
      <el-form-item label="Счет получателя:">
        <el-input v-if="props.aboData._identity === undefined || props.aboData._identity === ''" v-model="form.receiver_account" />
        <el-input v-else v-model="form.personal_account" disabled />
      </el-form-item>
      <el-form-item label="Докумениты-основания:">
        <ReasonDocLine v-if="props.aboData._identity === undefined || props.aboData._identity === ''" @eventPartDataChange="getEventReasonDocLineData" />
        <ReasonDocLine v-else :reason-document="form.decoding" :is-editable = "false" :reason-Data="form.reason_documents" />
      </el-form-item>
      <el-form-item label="Расшифровка:">
        <aboDocLine v-if="props.aboData._identity === undefined || props.aboData._identity === ''" @eventPartDataChange="getEventBoLineData" />
        <aboDocLine v-else :abo-line-data="form.decoding" :is-editable = "false" />
      </el-form-item>
      <el-form-item>
        <el-button v-if="props.aboData._identity === undefined || props.aboData._identity === ''" type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref, PropType } from "vue";

  import { type docAbo, type aboLine, type reasonDocument } from "../../../../api/kazna/abo/index";
  import ReasonDocLine from "./reasonDocLine.vue";
  import aboDocLine from "./aboLine.vue";

  const props = defineProps({
    aboData: {
      type: Object as PropType<docAbo>,
      default: [],
    },
  });

  const emit = defineEmits(["eventFormDataSave", "eventFormDataCancel"]);

  const aboFormVisible = ref(false);
  const form = reactive<docAbo>({
    personal_account: props.aboData.personal_account || "",
    receiver_account: props.aboData.receiver_account || "",
    reason_documents: props.aboData.reason_documents || [],
    decoding: props.aboData.decoding || [],
  });
  
  const getEventBoLineData = (data: any) => {
    form.decoding = data.map(item => <aboLine>{
        code: item.code,
        subCode: item.subCode,
        amount: item.amount,    
        prepaidAmount: item.prepaidAmount,
    });
  };

  const getEventReasonDocLineData = (data: any) => {
    form.reason_documents = data.map(item => <reasonDocument>{
        number: item.number,
        caption: item.caption,
        uri: item.uri,
    });
  };

  const onSubmit = () => {
  emit("eventFormDataSave", form);
};

const onCancel = () => {
  emit("eventFormDataCancel", true);
}
</script>