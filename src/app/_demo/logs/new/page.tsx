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
  IconPlus,
} from '@tabler/icons-react';
import { useAuth } from '@/components/providers';
import { AppShellWrapper } from '@/components/app-shell';
import { createLog, getUserThemes, getAllTags } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { useEffect, useState, useRef } from 'react';
import type { Theme } from '@/lib/types';

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

export default function NewLogPage() {
  const { user } = useAuth();
  const router = useRouter();
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
    setThemes(getUserThemes(user.id));
    setExistingTags(getAllTags());
  }, [user, router]);

  const handleImageUpload = (files: File[] | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);

    const remainingSlots = MAX_IMAGES - images.length;
    const filesToProcess = files.slice(0, remainingSlots);

    const promises = filesToProcess.map((file) => {
      return new Promise<string>((resolve, reject) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          reject(new Error('Invalid file type'));
          return;
        }

        // Validate file size (max 5MB)
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

    createLog({
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
    <AppShellWrapper>
      <Container size="sm" py="md">
        <Stack gap="lg">
          <Box>
            <Title order={2}>New Study Log</Title>
            <Text c="dimmed" size="sm">
              Record your learning progress
            </Text>
          </Box>

          <Card shadow="sm" padding="lg" radius="lg" withBorder>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="md">
                <DatePickerInput
                  label="Date"
                  placeholder="Select date"
                  required
                  maxDate={new Date()}
                  {...form.getInputProps('date')}
                />

                <NumberInput
                  label="Duration (minutes)"
                  placeholder="60"
                  required
                  min={1}
                  max={1440}
                  leftSection={<IconClock size={16} />}
                  {...form.getInputProps('duration')}
                />

                <Select
                  label="Category"
                  placeholder="Select category"
                  required
                  data={defaultCategories}
                  searchable
                  nothingFoundMessage="No category found"
                  leftSection={<IconCategory size={16} />}
                  {...form.getInputProps('category')}
                />

                <Textarea
                  label="Memo"
                  placeholder="What did you learn today?"
                  minRows={3}
                  maxRows={6}
                  autosize
                  {...form.getInputProps('memo')}
                />

                {/* Image Upload Section */}
                <Box>
                  <Text size="sm" fw={500} mb="xs">
                    Images (optional, max {MAX_IMAGES})
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
                            alt={`Upload ${index + 1}`}
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
                            aria-label="Remove image"
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
                          {images.length === 0 ? 'Add Images' : 'Add More Images'}
                        </Button>
                      )}
                    </FileButton>
                  )}

                  <Text size="xs" c="dimmed" mt="xs">
                    Supported: JPG, PNG, GIF. Max size: 5MB per image.
                  </Text>
                </Box>

                <TextInput
                  label="Output URL (optional)"
                  placeholder="https://github.com/..."
                  leftSection={<IconLink size={16} />}
                  {...form.getInputProps('outputUrl')}
                />

                <TagsInput
                  label="Tags"
                  placeholder="Press Enter to add tags"
                  leftSection={<IconHash size={16} />}
                  data={existingTags}
                  {...form.getInputProps('tags')}
                />

                {themes.length > 0 && (
                  <Select
                    label="Theme (optional)"
                    placeholder="Link to a learning theme"
                    data={themes.map((t) => ({ value: t.id, label: t.name }))}
                    clearable
                    leftSection={<IconFolder size={16} />}
                    {...form.getInputProps('themeId')}
                  />
                )}

                <Group justify="flex-end" mt="md">
                  <Button variant="default" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Log</Button>
                </Group>
              </Stack>
            </form>
          </Card>
        </Stack>
      </Container>
    </AppShellWrapper>
  );
}
