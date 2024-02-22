'use client';
import { AcmeLogo } from '@/components/logo';
import {
  Avatar,
  Button,
  ScrollShadow,
  Spacer,
  useDisclosure,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/nextuiPro';
import { useSession } from 'next-auth/react';

function LogoItem({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 px-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
        <AcmeLogo className="text-background" />
      </div>
      <span className="text-small font-bold uppercase text-foreground">
        {title}
      </span>
    </div>
  );
}

function UserInfoItem({ userName }: { userName: string }) {
  return (
    <div className="flex items-center gap-3 px-3">
      <Avatar
        isBordered
        size="sm"
        src="https://i.pravatar.cc/150?u=a04258114e29026708c"
      />
      <div className="flex flex-col">
        <p className="text-small font-medium text-default-600">{userName}</p>
        <p className="text-tiny text-default-400">Product Designer</p>
      </div>
    </div>
  );
}

function SidebarItem({ title, icon }: { title: string; icon: string }) {
  return (
    // <div className="flex items-center gap-3 px-3">
    //   <Icon icon={icon} width={24} />
    //   <span className="text-small font-medium text-default-600">{title}</span>
    // </div>
    <>
      <Button
        startContent={<Icon icon={icon} width={24} />}
        className="bg-[rgba(0,0,0,0.2)] w-full flex justify-start"
        size="lg"
      >
        {title}
      </Button>
      <Spacer y={2} />
    </>
  );
}

export function Sidebar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const session = useSession();
  return (
    <div
      className={cn(
        'relative hidden h-full w-0 max-w-[288px] flex-1 flex-col bg-gradient-to-b from-default-100 via-danger-100 to-secondary-100 p-6 transition-[transform,opacity,margin] duration-250 ease-in-out md:flex md:w-72',
        {
          '-ml-72 -translate-x-72': !true,
        },
      )}
    >
      <LogoItem title="Acme" />
      <Spacer y={4} />
      <UserInfoItem userName={session.data?.user?.name || ''} />
      <Spacer y={4} />

      {/* <Sidebar defaultSelectedKey="home" items={sectionItemsWithTeams} /> */}
      <ScrollShadow>
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
        <SidebarItem icon="bx:bx-home" title="Home" />
      </ScrollShadow>

      <Spacer y={8} />
      <div className="mt-auto flex flex-col">
        <Button
          fullWidth
          className="justify-start text-default-500 data-[hover=true]:text-foreground"
          startContent={
            <Icon
              className="text-default-500"
              icon="solar:info-circle-line-duotone"
              width={24}
            />
          }
          variant="light"
        >
          Help & Information
        </Button>
        <Button
          className="justify-start text-default-500 data-[hover=true]:text-foreground"
          startContent={
            <Icon
              className="rotate-180 text-default-500"
              icon="solar:minus-circle-line-duotone"
              width={24}
            />
          }
          variant="light"
        >
          Log Out
        </Button>
      </div>
    </div>
  );
}
