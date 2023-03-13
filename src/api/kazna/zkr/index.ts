import request from '../../../utils/request';

export interface zkrLine {
  code: string;
  subCode: string | "";
  amount: bigint;
  is_prepaid: boolean | false;
}

export interface docZkr {
  _identity?: string | "";
  debit_account: string;
  receiver_account: string;
  budget_obligation: string;
  monetary_obligation: string;
  decoding: zkrLine[];
}

export function saveZkrApi(data: docZkr) {
  return request({
    url: "/api/kazna/zkr",
    method: "post",
    data,
  });
}

export function getAllZkrApi() {
  return request({
    url: "/api/kazna/zkr",
    method: "get",
  });
}
