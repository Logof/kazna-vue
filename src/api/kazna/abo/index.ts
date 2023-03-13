import request from '../../../utils/request';

export interface reasonDocument {
  number: string;
  caption: string;
  uri: string;
}

export interface aboLine {
  code: string;
  subCode: string | "";
  amount: number;
  prepaidAmount: number;
}

export interface docAbo {
  _identity?: string | "";
  personal_account: string;
  receiver_account: string;
  reason_documents: reasonDocument[];
  decoding: aboLine[];
}

export function saveAboApi(data: docAbo) {
  return request({
    url: "/api/kazna/bo",
    method: "post",
    data,
  });
}

export function getAllAboApi() {
  return request({
    url: "/api/kazna/bo",
    method: "get",
  });
}
