'use client';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  Avatar,
  Badge,
  Button,
  Link,
  ScrollShadow,
  Tooltip,
  Image,
  Textarea,
} from '@nextui-org/react';
import { useCallback, useRef, useState } from 'react';
import { useClipboard } from '@nextui-org/use-clipboard';
import { cn } from '@/lib/nextuiPro';

export type MessageCardProps = React.HTMLAttributes<HTMLDivElement> & {
  avatar?: string;
  showFeedback?: boolean;
  message?: React.ReactNode;
  currentAttempt?: number;
  status?: 'success' | 'failed';
  attempts?: number;
  messageClassName?: string;
  onAttemptChange?: (attempt: number) => void;
  onMessageCopy?: (content: string | string[]) => void;
  onFeedback?: (feedback: 'like' | 'dislike') => void;
  onAttemptFeedback?: (feedback: 'like' | 'dislike' | 'same') => void;
};

export function ChatBubble({
  avatar,
  message,
  showFeedback,
  attempts = 1,
  currentAttempt = 1,
  status,
  onMessageCopy,
  onAttemptChange,
  onFeedback,
  onAttemptFeedback,
  className,
  messageClassName,
  ...props
}: MessageCardProps) {
  const [feedback, setFeedback] = useState<'like' | 'dislike'>();
  const [attemptFeedback, setAttemptFeedback] = useState<
    'like' | 'dislike' | 'same'
  >();

  const messageRef = useRef<HTMLDivElement>(null);

  const { copied, copy } = useClipboard();

  const failedMessageClassName =
    status === 'failed'
      ? 'bg-danger-100/50 border border-danger-100 text-foreground'
      : '';
  const failedMessage = (
    <p>
      Something went wrong, if the issue persists please contact us through our
      help center at&nbsp;
      <Link href="mailto:support@acmeai.com" size="sm">
        support@acmeai.com
      </Link>
    </p>
  );

  const hasFailed = status === 'failed';

  const handleCopy = useCallback(() => {
    let stringValue = '';

    if (typeof message === 'string') {
      stringValue = message;
    } else if (Array.isArray(message)) {
      message.forEach((child) => {
        // @ts-ignore
        const childString =
          typeof child === 'string'
            ? child
            : child?.props?.children?.toString();

        if (childString) {
          stringValue += childString + '\n';
        }
      });
    }

    const valueToCopy = stringValue || messageRef.current?.textContent || '';

    copy(valueToCopy);

    onMessageCopy?.(valueToCopy);
  }, [copy, message, onMessageCopy]);

  const handleFeedback = useCallback(
    (liked: boolean) => {
      setFeedback(liked ? 'like' : 'dislike');

      onFeedback?.(liked ? 'like' : 'dislike');
    },
    [onFeedback],
  );

  const handleAttemptFeedback = useCallback(
    (feedback: 'like' | 'dislike' | 'same') => {
      setAttemptFeedback(feedback);

      onAttemptFeedback?.(feedback);
    },
    [onAttemptFeedback],
  );

  return (
    <div
      {...props}
      // ref={ref}
      className={cn('flex gap-3', className)}
    >
      <div className="relative flex-none">
        <Badge
          isOneChar
          color="danger"
          content={
            <Icon
              className="text-background"
              icon="gravity-ui:circle-exclamation-fill"
            />
          }
          isInvisible={!hasFailed}
          placement="bottom-right"
          shape="circle"
        >
          <Avatar src={avatar} />
        </Badge>
      </div>
      <div className="flex w-full flex-col gap-4">
        <div
          className={cn(
            'relative w-full rounded-medium bg-content2 px-4 py-3 text-default-600',
            failedMessageClassName,
            messageClassName,
          )}
        >
          <div ref={messageRef} className={'pr-20 text-small'}>
            {hasFailed ? failedMessage : message}
          </div>
          {showFeedback && !hasFailed && (
            <div className="absolute right-2 top-2 flex rounded-full bg-content2 shadow-small">
              <Button
                isIconOnly
                radius="full"
                size="sm"
                variant="light"
                onPress={handleCopy}
              >
                {copied ? (
                  <Icon
                    className="text-lg text-default-600"
                    icon="gravity-ui:check"
                  />
                ) : (
                  <Icon
                    className="text-lg text-default-600"
                    icon="gravity-ui:copy"
                  />
                )}
              </Button>
              <Button
                isIconOnly
                radius="full"
                size="sm"
                variant="light"
                onPress={() => handleFeedback(true)}
              >
                {feedback === 'like' ? (
                  <Icon
                    className="text-lg text-default-600"
                    icon="gravity-ui:thumbs-up-fill"
                  />
                ) : (
                  <Icon
                    className="text-lg text-default-600"
                    icon="gravity-ui:thumbs-up"
                  />
                )}
              </Button>
              <Button
                isIconOnly
                radius="full"
                size="sm"
                variant="light"
                onPress={() => handleFeedback(false)}
              >
                {feedback === 'dislike' ? (
                  <Icon
                    className="text-lg text-default-600"
                    icon="gravity-ui:thumbs-down-fill"
                  />
                ) : (
                  <Icon
                    className="text-lg text-default-600"
                    icon="gravity-ui:thumbs-down"
                  />
                )}
              </Button>
            </div>
          )}
          {attempts > 1 && !hasFailed && (
            <div className="flex w-full items-center justify-end">
              <button
                onClick={() =>
                  onAttemptChange?.(currentAttempt > 1 ? currentAttempt - 1 : 1)
                }
              >
                <Icon
                  className="cursor-pointer text-default-400 hover:text-default-500"
                  icon="gravity-ui:circle-arrow-left"
                />
              </button>
              <button
                onClick={() =>
                  onAttemptChange?.(
                    currentAttempt < attempts ? currentAttempt + 1 : attempts,
                  )
                }
              >
                <Icon
                  className="cursor-pointer text-default-400 hover:text-default-500"
                  icon="gravity-ui:circle-arrow-right"
                />
              </button>
              <p className="px-1 text-tiny font-medium text-default-500">
                {currentAttempt}/{attempts}
              </p>
            </div>
          )}
        </div>
        {showFeedback && attempts > 1 && (
          <div className="flex items-center justify-between rounded-medium border-small border-default-100 px-4 py-3 shadow-small">
            <p className="text-small text-default-600">
              Was this response better or worse?
            </p>
            <div className="flex gap-1">
              <Tooltip content="Better">
                <Button
                  isIconOnly
                  radius="full"
                  size="sm"
                  variant="light"
                  onPress={() => handleAttemptFeedback('like')}
                >
                  {attemptFeedback === 'like' ? (
                    <Icon
                      className="text-lg text-primary"
                      icon="gravity-ui:thumbs-up-fill"
                    />
                  ) : (
                    <Icon
                      className="text-lg text-default-600"
                      icon="gravity-ui:thumbs-up"
                    />
                  )}
                </Button>
              </Tooltip>
              <Tooltip content="Worse">
                <Button
                  isIconOnly
                  radius="full"
                  size="sm"
                  variant="light"
                  onPress={() => handleAttemptFeedback('dislike')}
                >
                  {attemptFeedback === 'dislike' ? (
                    <Icon
                      className="text-lg text-default-600"
                      icon="gravity-ui:thumbs-down-fill"
                    />
                  ) : (
                    <Icon
                      className="text-lg text-default-600"
                      icon="gravity-ui:thumbs-down"
                    />
                  )}
                </Button>
              </Tooltip>
              <Tooltip content="Same">
                <Button
                  isIconOnly
                  radius="full"
                  size="sm"
                  variant="light"
                  onPress={() => handleAttemptFeedback('same')}
                >
                  {attemptFeedback === 'same' ? (
                    <Icon
                      className="text-lg text-danger"
                      icon="gravity-ui:face-sad"
                    />
                  ) : (
                    <Icon
                      className="text-lg text-default-600"
                      icon="gravity-ui:face-sad"
                    />
                  )}
                </Button>
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export function ChatTextAreaImage({
  src,
  onRemove,
}: {
  src: string;
  onRemove: () => void;
}) {
  return (
    <Badge
      isOneChar
      className="opacity-0 group-hover:opacity-100"
      content={
        <Button
          isIconOnly
          radius="full"
          size="sm"
          variant="light"
          onPress={() => {}}
        >
          <Icon
            className="text-foreground"
            icon="iconamoon:close-thin"
            width={16}
          />
        </Button>
      }
    >
      <Image
        className="h-14 w-14 rounded-small border-small border-default-200/50 object-cover"
        src={src}
      />
    </Badge>
  );
}
export function ChatTextArea() {
  // 生成一个2000字符的字符串
  const longString = Array(20000).fill('a').join('');
  const [input, setInput] = useState(longString);
  return (
    <>
      <div className="flex w-full flex-col items-start rounded-medium bg-default-100 transition-colors hover:bg-default-200/70 pb-4">
        <div className="group flex gap-2 px-4 pt-4">
          <ChatTextAreaImage
            src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/nextui-cover1.png"
            onRemove={() => {}}
          />
        </div>
        <Textarea
          value={input}
          aria-label="Prompt"
          className="min-h-[40px]"
          classNames={{
            inputWrapper: '!bg-transparent shadow-none',
            innerWrapper: 'relative',
            input: 'py-0pt-1 pb-6 !pr-10 text-medium',
            label: 'hidden',
          }}
          minRows={3}
          radius="lg"
          variant="flat"
          onValueChange={(value) => setInput(value)}
          startContent={
            <Tooltip showArrow content="添加图片">
              <Button isIconOnly radius="full" size="sm" variant="light">
                <Icon
                  className="text-default-500"
                  icon="solar:gallery-minimalistic-linear"
                  width={20}
                />
              </Button>
            </Tooltip>
          }
          endContent={
            <div className="absolute right-0 flex h-full flex-col items-end justify-between gap-2">
              <Tooltip showArrow content="Speak">
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <Icon
                    className="text-default-500"
                    icon="solar:microphone-3-linear"
                    width={20}
                  />
                </Button>
              </Tooltip>
              <div className="flex items-end gap-2">
                <p className="py-1 text-tiny text-default-400">
                  {input.length}/2000
                </p>
                <Tooltip showArrow content="Send message">
                  <Button
                    isIconOnly
                    color={!input ? 'default' : 'primary'}
                    isDisabled={!input}
                    radius="lg"
                    size="sm"
                    variant="solid"
                  >
                    <Icon
                      className={cn(
                        '[&>path]:stroke-[2px]',
                        !input ? 'text-default-600' : 'text-primary-foreground',
                      )}
                      icon="solar:arrow-up-linear"
                      width={20}
                    />
                  </Button>
                </Tooltip>
              </div>
            </div>
          }
        />
      </div>
    </>
  );
}

export function Body({ onOpen }: { onOpen?: () => void }) {
  return (
    <div className="w-full flex-1 flex-col p-4 max-h-screen">
      <header className="flex h-16 items-center gap-2 rounded-medium border-small border-divider px-4">
        <Button
          isIconOnly
          className="flex md:hidden"
          size="sm"
          variant="light"
          onPress={onOpen}
        >
          <Icon
            className="text-default-500"
            height={24}
            icon="solar:hamburger-menu-outline"
            width={24}
          />
        </Button>
        <h2 className="text-medium font-medium text-default-700">Overview</h2>
      </header>
      <main className="mt-4 flex-grow w-full">
        <ScrollShadow className="flex-grow h-[400px]">
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
          <ChatBubble message="123123" />
        </ScrollShadow>
        <ChatTextArea />
      </main>
    </div>
  );
}
