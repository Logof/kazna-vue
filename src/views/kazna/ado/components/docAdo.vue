<template>
    <el-form :model="form" label-width="200px">
      <el-form-item label="Счет плательщика:">
        <el-input v-if="props.adoData._identity === undefined || props.adoData._identity === ''" v-model="form.personal_account" />
        <el-input v-else v-model="form.personal_account" disabled/>
      </el-form-item>
      <el-form-item label="Счет получателя:">
        <el-input v-if="props.adoData._identity === undefined || props.adoData._identity === ''" v-model="form.receiver_account" />
        <el-input v-else v-model="form.receiver_account" disabled />
      </el-form-item>
      <el-form-item label="Докумениты-основания:">
        <ReasonDocLine v-if="props.adoData._identity === undefined || props.adoData._identity === ''" @eventPartDataChange="getEventReasonDocLineData" />
        <ReasonDocLine v-else :reason-document="form.reason_documents" :is-editable = "false" />
      </el-form-item>
      <el-form-item label="Расшифровка:">
        <doDocLine v-if="props.adoData._identity === undefined || props.adoData._identity === ''" @eventPartDataChange="getEventBoLineData" />
        <doDocLine v-else :ado-line-data="form.decoding" :is-editable = "false" />
      </el-form-item>
      <el-form-item>
        <el-button v-if="props.adoData._identity === undefined || props.adoData._identity === ''" type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
</template>
  
<script lang="ts" setup>
  import { reactive, ref, PropType } from "vue";

  import { type docAdo, type adoLine, type reasonDocument } from "../../../../api/kazna/ado/index";
  import ReasonDocLine from "./reasonDocLine.vue";
  import doDocLine from "./adoLine.vue";

  const props = defineProps({
    adoData: {
      type: Object as PropType<docAdo>,
      default: [],
    },
  });

  const emit = defineEmits(["eventFormDataSave", "eventFormDataCancel"]);

  const adoFormVisible = ref(false);

  const form = reactive<docAdo>({
    personal_account: props.adoData.personal_account ||"",
    receiver_account: props.adoData.receiver_account ||"",
    reason_documents: props.adoData.reason_documents || [],
    decoding: props.adoData.decoding || [],
  });
  
  const getEventBoLineData = (data: any) => {
    form.decoding = data.map(item => <adoLine>{
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