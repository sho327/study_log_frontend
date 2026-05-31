'use client';

import {
  Container,
  Stack,
  Title,
  Text,
  TextInput,
  Textarea,
  NumberInput,
  Button,
  Card,
  Group,
  TagsInput,
  Select,
  Box,
  Image,
  SimpleGrid,
  ActionIcon,
  FileButton,
  Paper,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import {
  IconClock,
  IconLink,
  IconCategory,
  IconHash,
  IconFolder,
  IconPhoto,
  IconX,
} from '@tabler/icons-react';
import { useAppStore, useCurrentUser } from '@/stores';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { useEffect, useState, useRef } from 'react';
import type { Theme } from '@/types';

const defaultCategories = [
  'Programming',
  'Design',
  'English',
  'Math',
  'Science',
  'Business',
  'Reading',
  'Writing',
  'Other',
];

const MAX_IMAGES = 4;

export function NewLogContent() {
  const user = useCurrentUser();
  const router = useRouter();
  const store = useAppStore();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [existingTags, setExistingTags] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const resetRef = useRef<() => void>(null);

  const form = useForm({
    initialValues: {
      date: new Date(),
      duration: 60,
      category: 'Programming',
      memo: '',
      outputUrl: '',
      tags: [] as string[],
      themeId: '',
    },
    validate: {
      duration: (value) => (value <= 0 ? 'Duration must be positive' : null),
      category: (value) => (!value ? 'Category is required' : null),
      outputUrl: (value) => {
        if (value && !value.startsWith('http')) {
          return 'URL must start with http:// or https://';
        }
        return null;
      },
    },
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    setThemes(store.getUserThemes(user.id));
    setExistingTags(store.getAllTags());
  }, [user, router, store]);

  const handleImageUpload = (files: File[] | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);

    const remainingSlots = MAX_IMAGES - images.length;
    const filesToProcess = files.slice(0, remainingSlots);

    const promises = filesToProcess.map((file) => {
      return new Promise<string>((resolve, reject) => {
        if (!file.type.startsWith('image/')) {
          reject(new Error('Invalid file type'));
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          reject(new Error('File too large'));
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.onerror = () => {
          reject(new Error('Failed to read file'));
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises)
      .then((newImages) => {
        setImages((prev) => [...prev, ...newImages].slice(0, MAX_IMAGES));
        notifications.show({
          title: 'Images added',
          message: `${newImages.length} image(s) added successfully`,
          color: 'green',
        });
      })
      .catch((error) => {
        notifications.show({
          title: 'Error',
          message: error.message || 'Failed to upload images',
          color: 'red',
        });
      })
      .finally(() => {
        setIsUploading(false);
        resetRef.current?.();
      });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (values: typeof form.values) => {
    if (!user) return;

    store.createLog({
      userId: user.id,
      date: values.date.toISOString().split('T')[0],
      duration: values.duration,
      category: values.category,
      memo: values.memo || undefined,
      outputUrl: values.outputUrl || undefined,
      images: images.length > 0 ? images : undefined,
      tags: values.tags,
      themeId: values.themeId || undefined,
    });

    notifications.show({
      title: 'Success!',
      message: 'Study log created successfully',
      color: 'green',
    });

    router.push('/timeline');
  };

  if (!user) {
    return null;
  }

  return (
    <Container size="md" py="md">
      <Stack gap="lg">
        <Box>
          <Title order={2}>学習記録の作成</Title>
          <Text c="dimmed" size="sm">
            学習した内容を記録しよう！
          </Text>
        </Box>

        <Card shadow="sm" padding="lg" radius="lg" withBorder>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <DatePickerInput
                label="日付"
                placeholder="日付を選択"
                required
                maxDate={new Date()}
                {...form.getInputProps('date')}
              />

              <NumberInput
                label="勉強時間 (分)"
                placeholder="60"
                required
                min={1}
                max={1440}
                leftSection={<IconClock size={16} />}
                {...form.getInputProps('duration')}
              />

              <Select
                label="カテゴリ"
                placeholder="カテゴリを選択"
                required
                data={defaultCategories}
                searchable
                creatable
                getCreateLabel={(query) => `+ ${query} を作成`}
                onCreate={(query) => {
                  return query;
                }}
                leftSection={<IconCategory size={16} />}
                {...form.getInputProps('category')}
              />

              <Textarea
                label="メモ"
                placeholder="学んだことを入力"
                minRows={3}
                maxRows={6}
                autosize
                {...form.getInputProps('memo')}
              />

              <Box>
                <Text size="sm" fw={500} mb="xs">
                  画像（任意、最大{MAX_IMAGES}枚）
                </Text>

                {images.length > 0 && (
                  <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="xs" mb="sm">
                    {images.map((img, index) => (
                      <Paper
                        key={index}
                        style={{ position: 'relative' }}
                        radius="md"
                        withBorder
                      >
                        <Image
                          src={img}
                          alt={`アップロード ${index + 1}`}
                          h={100}
                          fit="cover"
                          radius="md"
                        />
                        <ActionIcon
                          size="sm"
                          color="red"
                          variant="filled"
                          style={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                          }}
                          onClick={() => removeImage(index)}
                          aria-label="画像を削除"
                        >
                          <IconX size={12} />
                        </ActionIcon>
                      </Paper>
                    ))}
                  </SimpleGrid>
                )}

                {images.length < MAX_IMAGES && (
                  <FileButton
                    resetRef={resetRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    multiple
                  >
                    {(props) => (
                      <Button
                        {...props}
                        variant="light"
                        leftSection={<IconPhoto size={16} />}
                        loading={isUploading}
                        fullWidth
                      >
                        {images.length === 0 ? '画像を追加' : '画像を追加'}
                      </Button>
                    )}
                  </FileButton>
                )}

                <Text size="xs" c="dimmed" mt="xs">
                  対応ファイル形式: JPG, PNG, GIF。最大5MBまで
                </Text>
              </Box>

              <TextInput
                label="成果物のURL"
                placeholder="https://github.com/..."
                leftSection={<IconLink size={16} />}
                {...form.getInputProps('outputUrl')}
              />

              <TagsInput
                label="タグ"
                placeholder="タグを入力"
                leftSection={<IconHash size={16} />}
                data={existingTags}
                {...form.getInputProps('tags')}
              />

              {themes.length > 0 && (
                <Select
                  label="テーマ (任意)"
                  placeholder="学習テーマを選択"
                  data={themes.map((t) => ({ value: t.id, label: t.name }))}
                  clearable
                  leftSection={<IconFolder size={16} />}
                  {...form.getInputProps('themeId')}
                />
              )}

              <Group justify="flex-end" mt="md">
                <Button variant="default" onClick={() => router.back()}>
                  キャンセル
                </Button>
                <Button type="submit">保存</Button>
              </Group>
            </Stack>
          </form>
        </Card>
      </Stack>
    </Container>
  );
}
