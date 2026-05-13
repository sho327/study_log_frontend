'use client';

import {
  Card,
  Group,
  Text,
  Avatar,
  ActionIcon,
  Badge,
  Stack,
  Anchor,
  Box,
  Paper,
  Divider,
  Image,
  SimpleGrid,
  Modal,
  CloseButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconHeart,
  IconHeartFilled,
  IconMessageCircle,
  IconClock,
  IconExternalLink,
  IconBrandGithub,
  IconTrash,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { useAuth } from '@/components/providers/mantineProvider';
import { useAppStore } from '@/stores';
import type { StudyLog } from '@/types';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';

interface StudyLogCardProps {
  log: StudyLog;
  onUpdate?: () => void;
  showDelete?: boolean;
}

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
            onClick={(e) => e.stopPropagation()}
          >
            {url}
          </Anchor>
        </Box>
      </Group>
    </Paper>
  );
}

interface ImageGalleryProps {
  images: string[];
  onImageClick: (index: number) => void;
}

function ImageGallery({ images, onImageClick }: ImageGalleryProps) {
  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <Box
        style={{ cursor: 'pointer', borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}
        onClick={(e) => {
          e.stopPropagation();
          onImageClick(0);
        }}
      >
        <Image
          src={images[0]}
          alt="学習ログ画像"
          h={200}
          fit="cover"
          radius="md"
        />
      </Box>
    );
  }

  if (images.length === 2) {
    return (
      <SimpleGrid cols={2} spacing="xs">
        {images.map((img, index) => (
          <Box
            key={index}
            style={{ cursor: 'pointer', borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}
            onClick={(e) => {
              e.stopPropagation();
              onImageClick(index);
            }}
          >
            <Image
              src={img}
              alt={`学習ログ画像 ${index + 1}`}
              h={150}
              fit="cover"
              radius="md"
            />
          </Box>
        ))}
      </SimpleGrid>
    );
  }

  if (images.length === 3) {
    return (
      <Group gap="xs" align="stretch" wrap="nowrap">
        <Box
          style={{ flex: 1, cursor: 'pointer', borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}
          onClick={(e) => {
            e.stopPropagation();
            onImageClick(0);
          }}
        >
          <Image
            src={images[0]}
            alt="学習ログ画像 1"
            h={200}
            fit="cover"
            radius="md"
          />
        </Box>
        <Stack gap="xs" style={{ flex: 1 }}>
          {images.slice(1, 3).map((img, index) => (
            <Box
              key={index}
              style={{ cursor: 'pointer', borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}
              onClick={(e) => {
                e.stopPropagation();
                onImageClick(index + 1);
              }}
            >
              <Image
                src={img}
                alt={`学習ログ画像 ${index + 2}`}
                h={96}
                fit="cover"
                radius="md"
              />
            </Box>
          ))}
        </Stack>
      </Group>
    );
  }

  const displayImages = images.slice(0, 4);
  const remainingCount = images.length - 4;

  return (
    <SimpleGrid cols={2} spacing="xs">
      {displayImages.map((img, index) => (
        <Box
          key={index}
          style={{
            cursor: 'pointer',
            position: 'relative',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden',
          }}
          onClick={(e) => {
            e.stopPropagation();
            onImageClick(index);
          }}
        >
          <Image
            src={img}
            alt={`学習ログ画像 ${index + 1}`}
            h={120}
            fit="cover"
            radius="md"
          />
          {index === 3 && remainingCount > 0 && (
            <Box
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--mantine-radius-md)',
              }}
            >
              <Text c="white" size="xl" fw={700}>
                +{remainingCount}
              </Text>
            </Box>
          )}
        </Box>
      ))}
    </SimpleGrid>
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
        content: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
        body: {
          padding: 0,
        },
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
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
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
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
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

export function StudyLogCard({ log, onUpdate, showDelete = false }: StudyLogCardProps) {
  const { user } = useAuth();
  const router = useRouter();
  const store = useAppStore();
  const [lightboxOpened, { open: openLightbox, close: closeLightbox }] = useDisclosure(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const author = useMemo(() => store.getUser(log.userId), [log.userId, store]);
  const isLiked = user ? log.likes.includes(user.id) : false;

  const handleCardClick = () => {
    router.push(`/logs/${log.id}`);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      router.push('/login');
      return;
    }
    store.toggleLike(log.id, user.id);
    onUpdate?.();
  };

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/logs/${log.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user || log.userId !== user.id) return;

    if (confirm('この学習ログを削除しますか?')) {
      store.deleteLog(log.id);
      notifications.show({
        title: '削除完了',
        message: '学習ログを削除しました',
        color: 'green',
      });
      onUpdate?.();
    }
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    openLightbox();
  };

  if (!author) return null;

  return (
    <>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{ cursor: 'pointer' }}
        onClick={handleCardClick}
      >
        <Stack gap="md">
          <Group justify="space-between" wrap="nowrap">
            <Group
              gap="sm"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/profile/${author.id}`);
              }}
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
              {showDelete && user?.id === log.userId && (
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
            <Text size="sm" style={{ whiteSpace: 'pre-wrap' }} lineClamp={3}>
              {log.memo}
            </Text>
          )}

          {log.images && log.images.length > 0 && (
            <ImageGallery images={log.images} onImageClick={handleImageClick} />
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
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/tags?q=${encodeURIComponent(tag)}`);
                  }}
                >
                  #{tag}
                </Badge>
              ))}
            </Group>
          )}

          <Divider />

          <Group justify="space-between">
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

              <Group gap={4}>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  onClick={handleCommentClick}
                  aria-label="コメント"
                >
                  <IconMessageCircle size={20} />
                </ActionIcon>
                <Text size="sm" c="dimmed">
                  {log.comments.length}
                </Text>
              </Group>
            </Group>

            <Text size="xs" c="dimmed">
              {log.date}
            </Text>
          </Group>
        </Stack>
      </Card>

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
    </>
  );
}
