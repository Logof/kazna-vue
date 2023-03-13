import request from '../../../utils/request';

export interface reasonDocument {
  number: string;
  caption: string;
  uri: string;
}

export interface adoLine {
  code: string;
  subCode: string | "";
  amount: number;
  prepaidAmount: number;
}

export interface docAdo {
  _identity?: string | "";
  personal_account: string;
  receiver_account: string;
  reason_documents: reasonDocument[];
  decoding: adoLine[];
  number?: string;
}

export function saveAdoApi(data: docAdo) {
  return request({
    url: "/api/kazna/do",
    method: "post",
    data,
  });
}

export function getAllAdoApi() {
  return request({
    url: "/api/kazna/do",
    method: "get",
  });
}