'use client';

import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  ScrollShadow,
} from '@nextui-org/react';
import { User } from '@nextui-org/react';
import { motion } from 'framer-motion';

export default function RobotCard(props: {
  name: string;
  description: string;
  robotId: string;
  avatarUrl?: string;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', duration: 0.25 }}
      whileTap={{ scale: 1 }}
      className="h-min"
    >
      <Badge
        content="new"
        color="warning"
        placement="top-right"
        className={`transition duration-300 `}
        classNames={{ base: 'w-full' }}
      >
        <Card
          className={`${
            props?.className ? props.className : ''
          }  hover:cursor-pointer`}
          classNames={{
            base: 'p-4 w-full',
          }}
          isPressable
          onClick={() => {
            console.log(props.name);
          }}
        >
          <CardHeader>
            <div className="flex w-full justify-between align-center items-center">
              <User
                name={props.name}
                avatarProps={{
                  src: props?.avatarUrl,
                  size: 'lg',
                  isBordered: true,
                }}
                classNames={{
                  name: 'text-lg font-bold ml-2',
                }}
              />
            </div>
          </CardHeader>
          <CardBody>
            <ScrollShadow className="max-h-32 min-h-32 overflow-hidden">
              {props.description.split('\n').map((item, index) => {
                return (
                  <p key={index} className="text-sm text-default-500">
                    {item}
                  </p>
                );
              })}
            </ScrollShadow>
          </CardBody>
        </Card>
      </Badge>
    </motion.div>
  );
}
