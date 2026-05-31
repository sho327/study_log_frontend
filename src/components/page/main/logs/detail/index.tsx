'use client';

import {
  Container,
  Stack,
  Title,
  Text,
  Card,
  Group,
  Avatar,
  Badge,
  ActionIcon,
  Box,
  Divider,
  Textarea,
  Button,
  Paper,
  Image,
  SimpleGrid,
  Anchor,
  Modal,
  CloseButton,
  Popover,
  ScrollArea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconHeart,
  IconHeartFilled,
  IconClock,
  IconArrowLeft,
  IconExternalLink,
  IconBrandGithub,
  IconTrash,
  IconChevronLeft,
  IconChevronRight,
  IconAt,
} from '@tabler/icons-react';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { useAppStore, useCurrentUser } from '@/stores';
import { useRouter, useParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import type { StudyLog, User, Comment } from '@/types';

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0 && mins > 0) {
    return `${hours}時間${mins}分`;
  } else if (hours > 0) {
    return `${hours}時間`;
  }
  return `${mins}分`;
}

function getUrlType(url: string): 'github' | 'zenn' | 'qiita' | 'other' {
  if (url.includes('github.com')) return 'github';
  if (url.includes('zenn.dev')) return 'zenn';
  if (url.includes('qiita.com')) return 'qiita';
  return 'other';
}

function UrlPreview({ url }: { url: string }) {
  const type = getUrlType(url);

  const getIcon = () => {
    switch (type) {
      case 'github':
        return <IconBrandGithub size={16} />;
      default:
        return <IconExternalLink size={16} />;
    }
  };

  const getLabel = () => {
    switch (type) {
      case 'github':
        return 'GitHub リポジトリ';
      case 'zenn':
        return 'Zenn 記事';
      case 'qiita':
        return 'Qiita 記事';
      default:
        return 'リンク';
    }
  };

  return (
    <Paper withBorder p="sm" radius="md">
      <Group gap="xs">
        {getIcon()}
        <Box style={{ flex: 1, minWidth: 0 }}>
          <Text size="xs" c="dimmed">
            {getLabel()}
          </Text>
          <Anchor
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            lineClamp={1}
          >
            {url}
          </Anchor>
        </Box>
      </Group>
    </Paper>
  );
}

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  opened: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

function ImageLightbox({
  images,
  currentIndex,
  opened,
  onClose,
  onPrevious,
  onNext,
}: ImageLightboxProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="xl"
      centered
      withCloseButton={false}
      padding={0}
      styles={{
        content: { backgroundColor: 'transparent', boxShadow: 'none' },
        body: { padding: 0 },
      }}
    >
      <Box style={{ position: 'relative' }}>
        <CloseButton
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
          }}
          size="lg"
        />
        {images.length > 1 && (
          <>
            <ActionIcon
              onClick={onPrevious}
              style={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}
              size="xl"
              variant="filled"
              color="dark"
            >
              <IconChevronLeft size={24} color="white" />
            </ActionIcon>
            <ActionIcon
              onClick={onNext}
              style={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}
              size="xl"
              variant="filled"
              color="dark"
            >
              <IconChevronRight size={24} color="white" />
            </ActionIcon>
          </>
        )}
        <Image
          src={images[currentIndex]}
          alt={`画像 ${currentIndex + 1}`}
          fit="contain"
          mah="80vh"
          radius="md"
        />
        {images.length > 1 && (
          <Text
            style={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '4px 12px',
              borderRadius: 'var(--mantine-radius-md)',
            }}
            c="white"
            size="sm"
          >
            {currentIndex + 1} / {images.length}
          </Text>
        )}
      </Box>
    </Modal>
  );
}

interface CommentItemProps {
  comment: Comment;
  onReply: (userId: string, userName: string) => void;
}

function CommentItem({ comment, onReply }: CommentItemProps) {
  const store = useAppStore();
  const commentAuthor = store.getUser(comment.userId);
  const replyToUser = comment.replyToUserId ? store.getUser(comment.replyToUserId) : null;
  const router = useRouter();

  if (!commentAuthor) return null;

  return (
    <Paper p="md" withBorder radius="md">
      <Group gap="sm" mb="xs" justify="space-between">
        <Group gap="xs">
          <Avatar
            src={commentAuthor.avatar}
            size="sm"
            radius="xl"
            color="brand"
            style={{ cursor: 'pointer' }}
            onClick={() => router.push(`/profile/${commentAuthor.id}`)}
          >
            {commentAuthor.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Text
              size="sm"
              fw={500}
              style={{ cursor: 'pointer' }}
              onClick={() => router.push(`/profile/${commentAuthor.id}`)}
            >
              {commentAuthor.name}
            </Text>
            <Text size="xs" c="dimmed">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
                locale: ja,
              })}
            </Text>
          </Box>
        </Group>
        <Button
          variant="subtle"
          size="xs"
          leftSection={<IconAt size={12} />}
          onClick={() => onReply(commentAuthor.id, commentAuthor.name)}
        >
          返信
        </Button>
      </Group>
      {replyToUser && (
        <Badge variant="light" size="sm" mb="xs" leftSection={<IconAt size={10} />}>
          {replyToUser.name}
        </Badge>
      )}
      <Text size="sm" style={{ whiteSpace: 'pre-wrap' }}>
        {comment.content}
      </Text>
    </Paper>
  );
}

export function LogDetailContent() {
  const user = useCurrentUser();
  const router = useRouter();
  const params = useParams();
  const logId = params.id as string;
  const store = useAppStore();

  const [log, setLog] = useState<StudyLog | null>(null);
  const [commentText, setCommentText] = useState('');
  const [replyTo, setReplyTo] = useState<{ userId: string; userName: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mentionMenuOpened, setMentionMenuOpened] = useState(false);
  const [mentionSearch, setMentionSearch] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [lightboxOpened, { open: openLightbox, close: closeLightbox }] = useDisclosure(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allUsers = useMemo(() => store.getAllUsers(), [store]);
  const author = useMemo(() => (log ? store.getUser(log.userId) : null), [log, store]);
  const isLiked = user && log ? log.likes.includes(user.id) : false;
  const isOwnLog = user && log ? user.id === log.userId : false;

  const filteredMentionUsers = useMemo(() => {
    if (!mentionSearch) return allUsers.filter((u) => u.id !== user?.id);
    return allUsers.filter(
      (u) =>
        u.id !== user?.id &&
        u.name.toLowerCase().includes(mentionSearch.toLowerCase())
    );
  }, [allUsers, mentionSearch, user?.id]);

  const loadLog = useCallback(() => {
    const fetchedLog = store.getLog(logId);
    if (!fetchedLog) {
      router.push('/timeline');
      return;
    }
    setLog(fetchedLog);
  }, [logId, router, store]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    loadLog();
  }, [user, router, loadLog]);

  const handleLike = () => {
    if (!user || !log) return;
    store.toggleLike(log.id, user.id);
    loadLog();
  };

  const handleDelete = () => {
    if (!user || !log || log.userId !== user.id) return;

    if (confirm('この学習ログを削除しますか?')) {
      store.deleteLog(log.id);
      notifications.show({
        title: '削除完了',
        message: '学習ログを削除しました',
        color: 'green',
      });
      router.push('/timeline');
    }
  };

  const handleReply = (userId: string, userName: string) => {
    setReplyTo({ userId, userName });
    textareaRef.current?.focus();
  };

  const handleMentionSelect = (selectedUser: User) => {
    const before = commentText.slice(0, cursorPosition);
    const after = commentText.slice(cursorPosition);
    const lastAtIndex = before.lastIndexOf('@');
    const newText = before.slice(0, lastAtIndex) + `@${selectedUser.name} ` + after;
    setCommentText(newText);
    setMentionMenuOpened(false);
    setMentionSearch('');
    setReplyTo({ userId: selectedUser.id, userName: selectedUser.name });
    textareaRef.current?.focus();
  };

  const handleCommentChange = (value: string) => {
    setCommentText(value);

    const cursorPos = textareaRef.current?.selectionStart || 0;
    setCursorPosition(cursorPos);

    const textBeforeCursor = value.slice(0, cursorPos);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');

    if (lastAtIndex !== -1) {
      const textAfterAt = textBeforeCursor.slice(lastAtIndex + 1);
      if (!textAfterAt.includes(' ') && !textAfterAt.includes('\n')) {
        setMentionSearch(textAfterAt);
        setMentionMenuOpened(true);
        return;
      }
    }
    setMentionMenuOpened(false);
    setMentionSearch('');
  };

  const handleComment = async () => {
    if (!user || !log || !commentText.trim()) return;

    setIsSubmitting(true);
    store.addComment(log.id, user.id, commentText.trim(), replyTo?.userId);
    setCommentText('');
    setReplyTo(null);
    setIsSubmitting(false);
    loadLog();
    notifications.show({
      title: 'コメント投稿',
      message: 'コメントを投稿しました',
      color: 'green',
    });
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    openLightbox();
  };

  if (!user || !log || !author) {
    return null;
  }

  return (
    <Container size="md" py="md">
      <Stack gap="lg">
        <Group>
          <ActionIcon variant="subtle" onClick={() => router.back()}>
            <IconArrowLeft size={20} />
          </ActionIcon>
          <Title order={3}>学習ログ詳細</Title>
        </Group>

        <Card shadow="sm" padding="lg" radius="lg" withBorder>
          <Stack gap="md">
            <Group justify="space-between" wrap="nowrap">
              <Group
                gap="sm"
                style={{ cursor: 'pointer' }}
                onClick={() => router.push(`/profile/${author.id}`)}
              >
                <Avatar src={author.avatar} alt={author.name} radius="xl" size="md" color="brand">
                  {author.name.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Text size="sm" fw={500}>
                    {author.name}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {formatDistanceToNow(new Date(log.createdAt), {
                      addSuffix: true,
                      locale: ja,
                    })}
                  </Text>
                </Box>
              </Group>

              <Group gap="xs">
                <Badge variant="light" leftSection={<IconClock size={12} />}>
                  {formatDuration(log.duration)}
                </Badge>
                <Badge variant="outline">{log.category}</Badge>
                {isOwnLog && (
                  <ActionIcon
                    variant="subtle"
                    color="red"
                    size="sm"
                    onClick={handleDelete}
                    aria-label="削除"
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                )}
              </Group>
            </Group>

            {log.memo && (
              <Text size="sm" style={{ whiteSpace: 'pre-wrap' }}>
                {log.memo}
              </Text>
            )}

            {log.images && log.images.length > 0 && (
              <SimpleGrid cols={{ base: 2, sm: log.images.length === 1 ? 1 : 2 }} spacing="xs">
                {log.images.map((img, index) => (
                  <Box
                    key={index}
                    style={{
                      cursor: 'pointer',
                      borderRadius: 'var(--mantine-radius-md)',
                      overflow: 'hidden',
                    }}
                    onClick={() => handleImageClick(index)}
                  >
                    <Image
                      src={img}
                      alt={`学習ログ画像 ${index + 1}`}
                      h={log.images!.length === 1 ? 250 : 150}
                      fit="cover"
                      radius="md"
                    />
                  </Box>
                ))}
              </SimpleGrid>
            )}

            {log.outputUrl && <UrlPreview url={log.outputUrl} />}

            {log.tags.length > 0 && (
              <Group gap="xs">
                {log.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="light"
                    size="sm"
                    style={{ cursor: 'pointer' }}
                    onClick={() => router.push(`/tags?q=${encodeURIComponent(tag)}`)}
                  >
                    #{tag}
                  </Badge>
                ))}
              </Group>
            )}

            <Divider />

            <Group gap="lg">
              <Group gap={4}>
                <ActionIcon
                  variant="subtle"
                  color={isLiked ? 'red' : 'gray'}
                  onClick={handleLike}
                  aria-label={isLiked ? 'いいね解除' : 'いいね'}
                >
                  {isLiked ? <IconHeartFilled size={20} /> : <IconHeart size={20} />}
                </ActionIcon>
                <Text size="sm" c="dimmed">
                  {log.likes.length}
                </Text>
              </Group>
              <Text size="xs" c="dimmed">
                {log.date}
              </Text>
            </Group>
          </Stack>
        </Card>

        <Card shadow="sm" padding="lg" radius="lg" withBorder>
          <Stack gap="md">
            <Title order={4}>コメント ({log.comments.length})</Title>

            <Box>
              {replyTo && (
                <Badge
                  variant="light"
                  mb="xs"
                  rightSection={
                    <ActionIcon
                      size="xs"
                      variant="transparent"
                      onClick={() => setReplyTo(null)}
                    >
                      <IconChevronRight size={10} style={{ transform: 'rotate(45deg)' }} />
                    </ActionIcon>
                  }
                >
                  {replyTo.userName} に返信
                </Badge>
              )}
              <Popover
                opened={mentionMenuOpened && filteredMentionUsers.length > 0}
                position="top-start"
                width={200}
                shadow="md"
              >
                <Popover.Target>
                  <Textarea
                    ref={textareaRef}
                    placeholder="コメントを入力... (@でユーザーをメンション)"
                    minRows={2}
                    maxRows={4}
                    autosize
                    value={commentText}
                    onChange={(e) => handleCommentChange(e.currentTarget.value)}
                  />
                </Popover.Target>
                <Popover.Dropdown p={0}>
                  <ScrollArea.Autosize mah={200}>
                    <Stack gap={0}>
                      {filteredMentionUsers.slice(0, 5).map((u) => (
                        <Button
                          key={u.id}
                          variant="subtle"
                          justify="flex-start"
                          fullWidth
                          leftSection={
                            <Avatar src={u.avatar} size="xs" radius="xl">
                              {u.name.charAt(0)}
                            </Avatar>
                          }
                          onClick={() => handleMentionSelect(u)}
                        >
                          {u.name}
                        </Button>
                      ))}
                    </Stack>
                  </ScrollArea.Autosize>
                </Popover.Dropdown>
              </Popover>
              <Group justify="flex-end" mt="xs">
                <Button
                  onClick={handleComment}
                  loading={isSubmitting}
                  disabled={!commentText.trim()}
                >
                  投稿
                </Button>
              </Group>
            </Box>

            <Divider />

            {log.comments.length > 0 ? (
              <Stack gap="sm">
                {log.comments
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((comment) => (
                    <CommentItem
                      key={comment.id}
                      comment={comment}
                      onReply={handleReply}
                    />
                  ))}
              </Stack>
            ) : (
              <Text c="dimmed" ta="center" py="md">
                まだコメントがありません
              </Text>
            )}
          </Stack>
        </Card>
      </Stack>

      {log.images && log.images.length > 0 && (
        <ImageLightbox
          images={log.images}
          currentIndex={currentImageIndex}
          opened={lightboxOpened}
          onClose={closeLightbox}
          onPrevious={() =>
            setCurrentImageIndex((prev) =>
              prev > 0 ? prev - 1 : log.images!.length - 1
            )
          }
          onNext={() =>
            setCurrentImageIndex((prev) =>
              prev < log.images!.length - 1 ? prev + 1 : 0
            )
          }
        />
      )}
    </Container>
  );
}
