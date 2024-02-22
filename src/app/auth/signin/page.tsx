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
import { signIn } from 'next-auth/react';
import { AcmeIcon } from './social';
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function Page() {
  const [isVisible, setIsVisible] = React.useState(false);
  // const response = await fetch('/api/auth/csrf');
  // const { csrfToken } = await response.json();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validationSchema = yup.object({
    phoneNumber: yup
      .string()
      .matches(/^1[3456789]\d{9}$/, '手机号格式不正确')
      .required('手机号是必须的'),
    password: yup
      .string()
      .min(6, '密码长度不能小于6位')
      .max(20, '密码长度不能大于20位')
      .required('密码是必须的'),
    // verifyCode: yup
    //   .string()
    //   .matches(/^\d{6}$/, '验证码格式不正确')
    //   .required('验证码是必须的'),
  });
  let formik = useFormik({
    initialValues: {
      phoneNumber: '',
      password: '',
      // verifyCode: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      signIn('credentials', {
        phoneNumber: values.phoneNumber,
        password: values.password,
        type: 'signIn',
        callbackUrl: '/',
      });
    },
  });

  return (
    <main className="min-h-screen flex flex-col justify-center">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="flex flex-col items-center pb-6">
          <AcmeIcon size={60} />
          <p className="text-xl font-medium">欢迎回来</p>
          <p className="text-small text-default-500">登录您的帐户以继续</p>
        </div>
        <div className="mt-2 flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
          <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
            <Input
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
            <Input
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
              placeholder="输入您的密码"
              type={isVisible ? 'text' : 'password'}
              variant="bordered"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorMessage={formik.touched.password && formik.errors.password}
            />
            <div className="flex items-center justify-between px-1 py-2">
              {/* <Checkbox name="remember" size="sm">
                记住我
              </Checkbox> */}
              <Spacer x={0} />
              <Link className="text-default-500" href="#" size="sm">
                忘记密码？
              </Link>
            </div>
            <Button color="primary" type="submit">
              登录
            </Button>
          </form>
          <div className="flex items-center gap-4">
            <Divider className="flex-1" />
            <p className="shrink-0 text-tiny text-default-500">OR</p>
            <Divider className="flex-1" />
          </div>
          <div className="flex flex-col gap-2">
            {/* <Button
              startContent={<Icon icon="flat-color-icons:google" width={24} />}
              variant="bordered"
            >
              使用 Google 登录
            </Button> */}

            <Button
              startContent={
                <Icon
                  className="text-default-500"
                  icon="fe:github"
                  width={24}
                />
              }
              variant="bordered"
              onClick={async () => signIn('github', { callbackUrl: '/' })}
            >
              使用 Github 登录
            </Button>
          </div>
          <p className="text-center text-small">
            还没有账号?&nbsp;
            <Link href="/auth/signup" size="sm">
              注册
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
