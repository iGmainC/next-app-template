"use client";

import type {IconProps} from "@iconify/react";

import React from "react";
import {Link, Spacer} from "@nextui-org/react";
import {Icon} from "@iconify/react";
import type {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

type SocialIconProps = Omit<IconProps, "icon">;
const AcmeIcon: React.FC<IconSvgProps> = ({size = 32, width, height, ...props}) => (
  <svg fill="none" height={size || height} viewBox="0 0 32 32" width={size || width} {...props}>
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
const navLinks = [
  {
    name: "Home",
    href: "#",
  },
  {
    name: "About",
    href: "#",
  },
  {
    name: "Services",
    href: "#",
  },
  {
    name: "Projects",
    href: "#",
  },
  {
    name: "Contact",
    href: "#",
  },
  {
    name: "Blog",
    href: "#",
  },
  {
    name: "Careers",
    href: "#",
  },
];

const socialItems = [
  {
    name: "Facebook",
    href: "#",
    icon: (props: SocialIconProps) => <Icon {...props} icon="fontisto:facebook" />,
  },
  {
    name: "Instagram",
    href: "#",
    icon: (props: SocialIconProps) => <Icon {...props} icon="fontisto:instagram" />,
  },
  {
    name: "Twitter",
    href: "#",
    icon: (props: SocialIconProps) => <Icon {...props} icon="fontisto:twitter" />,
  },
  {
    name: "GitHub",
    href: "#",
    icon: (props: SocialIconProps) => <Icon {...props} icon="fontisto:github" />,
  },
  {
    name: "YouTube",
    href: "#",
    icon: (props: SocialIconProps) => <Icon {...props} icon="fontisto:youtube" />,
  },
];

export default function CenteredFooter() {
  return (
    <footer className="flex w-full flex-col">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="flex items-center justify-center">
          <AcmeIcon size={44} />
          <span className="text-medium font-medium">ACME</span>
        </div>
        <Spacer y={4} />
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              isExternal
              className="text-default-500"
              href={item.href}
              size="sm"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <Spacer y={6} />
        <div className="flex justify-center gap-x-4">
          {socialItems.map((item) => (
            <Link key={item.name} isExternal className="text-default-400" href={item.href}>
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" className="w-5" />
            </Link>
          ))}
        </div>
        <Spacer y={4} />
        <p className="mt-1 text-center text-small text-default-400">
          &copy; 2024 Acme Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
