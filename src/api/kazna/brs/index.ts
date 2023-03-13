import request from '../../../utils/request';

export interface partBrs {
  code: string;
  subCode: string | "";
  amount: bigint;
}

export interface docBrs {
  _identity?: string | "";
  debit_account: string;
  credit_account: string;
  entry_date: string;
  ba: partBrs[];
  lbo: partBrs[];
  pofr: partBrs[];
}

export function saveBrsApi(data: docBrs) {
  return request({
    url: "/api/kazna/brs",
    method: "post",
    data,
  });
}

export function getAllBrsApi() {
  return request({
    url: "/api/kazna/brs",
    method: "get",
  });
}
