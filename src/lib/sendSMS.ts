'use server';
// This file is auto-generated, don't edit it
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import { exists, setValue } from './redis';

function generateClient(
  accessKeyId: string,
  accessKeySecret: string,
): Dysmsapi20170525 {
  let config = new $OpenApi.Config({
    accessKeyId: accessKeyId,
    accessKeySecret: accessKeySecret,
  });
  return new Dysmsapi20170525(config);
}

const Client = generateClient(
  process.env['ALIYUN_ACCESS_KEY_ID'] || '',
  process.env['ALIYUN_ACCESS_KEY_SECRET'] || '',
);

async function sendSMS(
  phoneNumber: string,
  templateId: string,
  signName: string,
  templateParam: { code: string },
): Promise<$Dysmsapi20170525.SendSmsResponse> {
  let request = new $Dysmsapi20170525.SendSmsRequest({
    phoneNumbers: `${phoneNumber}`,
    signName: signName,
    templateCode: templateId,
    templateParam: JSON.stringify(templateParam),
  });
  console.log(request);
  let resp = await Client.sendSms(request);
  console.log(resp);
  return resp;
}
function showProps(obj: any, objName: string) {
  var result = '';
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      result += objName + '.' + i + ' = ' + obj[i] + '\n';
    }
  }
  return result;
}

export async function sendRegisterSMS(phoneNumber: string, code: string) {
  if (await exists(phoneNumber)) {
    return false;
  }
  let response = await sendSMS(phoneNumber, 'SMS_276350222', '语核科技', {
    code: code,
  });
  if (response.statusCode !== 200) {
    let requestBody = {
      code: response.body.code,
      message: response.body.message,
      requestId: response.body.RequestId,
    };
    return false;
  } else {
    let requestBody = {
      bizId: response.body.BizId,
      code: response.body.code,
      message: response.body.message,
      requestId: response.body.RequestId,
    };
    setValue(phoneNumber, code, 300);
    return true;
  }
}
