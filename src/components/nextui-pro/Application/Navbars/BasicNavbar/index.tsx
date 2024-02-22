'use client';

import type { NavbarProps } from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
  Divider,
  Dropdown,
  DropdownTrigger,
  Badge,
  Avatar,
  DropdownMenu,
  DropdownItem,
  Switch,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';

import { cn } from './cn';
import { AcmeIcon } from './social';
import { useTheme } from 'next-themes';
const menuItems = [
  'About',
  'Blog',
  'Customers',
  'Pricing',
  'Enterprise',
  'Changelog',
  'Documentation',
  'Contact Us',
];
export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  console.log(theme);
  return (
    <>
      <Switch
        size="lg"
        color="secondary"
        isSelected={theme === 'dark'}
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <Icon icon="carbon:moon" className={className} />
          ) : (
            <Icon icon="carbon:sunny" className={className} />
          )
        }
        onValueChange={(value) => {
          if (value) {
            setTheme('dark');
          } else {
            setTheme('light');
          }
        }}
      />
    </>
  );
}
export default function BasicNavbar(
  props: NavbarProps & { loginurl: string; signupurl: string },
) {
  const session = useSession();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <Navbar
      {...props}
      classNames={{
        base: cn('border-default-100', {
          'bg-default-200/50 dark:bg-default-100/50': isMenuOpen,
        }),
        wrapper: 'w-full justify-center',
        item: 'hidden md:flex',
      }}
      height="60px"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Left Content */}
      <NavbarBrand>
        <div className="rounded-full bg-foreground text-background">
          <AcmeIcon size={34} />
        </div>
        <span className="ml-2 text-small font-medium">ACME</span>
      </NavbarBrand>

      {/* Center Content */}
      <NavbarContent justify="center">
        <NavbarItem>
          <Link className="text-default-500" href="#" size="sm">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-default-500" href="#" size="sm">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" color="foreground" href="#" size="sm">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-default-500" href="#" size="sm">
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-default-500" href="#" size="sm">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Right Content */}
      <NavbarContent className="hidden md:flex" justify="end">
        <NavbarItem className="hidden sm:flex">
          <ThemeSwitcher />
          {/* <Button isIconOnly radius="full" variant="light">
            <Icon
              className="text-default-500"
              icon="solar:sun-linear"
              width={24}
            />
          </Button> */}
        </NavbarItem>
        {session.data?.user ? (
          <NavbarItem className="px-2">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <button className="mt-1 h-8 w-8 outline-none transition-transform">
                  <Badge
                    className="border-transparent"
                    color="success"
                    content=""
                    placement="bottom-right"
                    shape="circle"
                    size="sm"
                  >
                    <Avatar
                      size="sm"
                      src={
                        session.data.user.image ? session.data.user.image : ''
                      }
                    />
                  </Badge>
                </button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Profile Actions"
                variant="flat"
                onAction={(key) => {
                  if (key === 'logout') {
                    return signOut({ callbackUrl: '/' });
                  }
                }}
              >
                <DropdownItem key="profile" className="h-14 gap-2" isDisabled>
                  <p className="font-semibold">登录自：</p>
                  <p className="font-semibold">
                    {session.data.user.email ||
                      ('phoneNumber' in session.data.user
                        ? (session.data.user.phoneNumber as string)
                        : '')}
                  </p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">帮助与反馈</DropdownItem>
                <DropdownItem key="logout" color="danger">
                  登出
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <NavbarItem className="ml-2 !flex gap-2">
            <Button
              as={Link}
              className="text-default-500"
              radius="full"
              variant="light"
              href={props.loginurl}
            >
              登录
            </Button>
            <Button
              className="bg-foreground font-medium text-background"
              color="secondary"
              endContent={<Icon icon="solar:alt-arrow-right-linear" />}
              radius="full"
              variant="flat"
              as={Link}
              href={props.signupurl}
            >
              创建账户
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenuToggle className="text-default-400 md:hidden" />

      <NavbarMenu
        className="top-[calc(var(--navbar-height)_-_1px)] max-h-fit bg-default-200/50 pb-6 pt-6 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
        motionProps={{
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: {
            ease: 'easeInOut',
            duration: 0.2,
          },
        }}
      >
        <NavbarMenuItem>
          <Button fullWidth as={Link} href={props.loginurl} variant="faded">
            登录
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem className="mb-4">
          <Button
            fullWidth
            as={Link}
            className="bg-foreground text-background"
            href={props.signupurl}
          >
            开始
          </Button>
        </NavbarMenuItem>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="mb-2 w-full text-default-500" href="#" size="md">
              {item}
            </Link>
            {index < menuItems.length - 1 && <Divider className="opacity-50" />}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
