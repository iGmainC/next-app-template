'use client';

import React from 'react';
import {
  Button,
  Input,
  Checkbox,
  Link,
  Divider,
  Spacer,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { sendRegisterSMS } from '@/lib/sendSMS';
import { signIn } from 'next-auth/react';
import * as yup from 'yup';
import { AcmeIcon } from './social';
import { useFormik } from 'formik';

export default function Page() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const validationSchema = yup.object({
    username: yup
      .string()
      .max(12, '用户名长度不能大于12位')
      .matches(/^[A-Za-z0-9]+$/, '用户名不能包含特殊字符')
      .required('用户名是必须的'),
    phoneNumber: yup
      .string()
      .matches(/^1[3456789]\d{9}$/, '手机号格式不正确')
      .required('手机号是必须的'),
    password: yup
      .string()
      .min(6, '密码长度不能小于6位')
      .max(20, '密码长度不能大于20位')
      .required('密码是必须的'),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref('password'), yup.ref('confirmPassword')],
        '两次密码不一致',
      ),
    verifyCode: yup
      .string()
      .matches(/^\d{6}$/, '验证码格式不正确')
      .required('验证码是必须的'),
  });
  let formik = useFormik({
    initialValues: {
      username: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      verifyCode: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      signIn('credentials', { type: 'signUp', ...values }).then((d)=>{

      }).catch((e)=>{
      });
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center pb-2">
        <AcmeIcon size={60} />
        <p className="text-xl font-medium">欢迎</p>
        <p className="text-small text-default-500">
          Create your account to get started
        </p>
      </div>
      <div className="mt-2 flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
        <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
          <Input
            isRequired
            label="用户名"
            name="username"
            type="text"
            variant="bordered"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.touched.username && formik.errors.username}
          />
          <Input
            isRequired
            label="手机号"
            name="phoneNumber"
            type="tel"
            variant="bordered"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={
              formik.touched.phoneNumber && formik.errors.phoneNumber
            }
          />
          <div className="flex flex-row flex-nowrap items-center justify-start h-max">
            <Input
              type="text"
              label="验证码"
              size="md"
              name="verifyCode"
              variant="bordered"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorMessage={
                formik.touched.verifyCode && formik.errors.verifyCode
              }
            />
            <Spacer x={2} />
            <Button
              className="mx-auto text-sm"
              color="primary"
              size="lg"
              onClick={async () => {
                sendRegisterSMS('18568636464', '1234');
              }}
            >
              发送验证码
            </Button>
          </div>
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="密码"
            name="password"
            type={isVisible ? 'text' : 'password'}
            variant="bordered"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.touched.password && formik.errors.password}
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleConfirmVisibility}>
                {isConfirmVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="确认密码"
            name="confirmPassword"
            type={isConfirmVisible ? 'text' : 'password'}
            variant="bordered"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <Checkbox isRequired className="py-4" size="sm">
            我同意
            <Link href="/agreement" size="sm">
              《用户政策》
            </Link>
            和
            <Link href="/agreement" size="sm">
              《隐私协议》
            </Link>
          </Checkbox>
          <Button color="primary" type="submit">
            注册
          </Button>
        </form>
        <div className="flex items-center gap-4">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">或者</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            startContent={
              <Icon className="text-default-500" icon="fe:github" width={24} />
            }
            variant="bordered"
          >
            使用 Github 注册
          </Button>
        </div>
        <p className="text-center text-small">
          已经有账户了？&nbsp;
          <Link href="/auth/signin" size="sm">
            去登录
          </Link>
        </p>
      </div>
      <Button
        onClick={async () => {
          await sendRegisterSMS('18568636464', '1234');
        }}
      >
        发送验证码
      </Button>
    </div>
  );
}
