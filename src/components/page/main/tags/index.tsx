'use client';

import {
  Container,
  Stack,
  Title,
  Text,
  Card,
  TextInput,
  Group,
  Badge,
  Box,
  Center,
} from '@mantine/core';
import { IconSearch, IconHash, IconMoodEmpty } from '@tabler/icons-react';
import { StudyLogCard } from '@/components/page/main/logs/StudyLogCard';
import { useAppStore, useCurrentUser } from '@/stores';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import type { StudyLog } from '@/types';

interface TagCount {
  tag: string;
  count: number;
}

export function TagsContent() {
  const user = useCurrentUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const store = useAppStore();

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [allTags, setAllTags] = useState<TagCount[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<StudyLog[]>([]);

  const loadData = useCallback(() => {
    const tags = store.getAllTags();
    const logs = store.getLogs();

    const tagCounts: TagCount[] = tags.map((tag) => ({
      tag,
      count: logs.filter((log) => log.tags.includes(tag)).length,
    })).sort((a, b) => b.count - a.count);

    setAllTags(tagCounts);

    if (searchQuery) {
      const results = store.searchLogsByTag(searchQuery);
      setFilteredLogs(results.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    } else {
      setFilteredLogs([]);
    }
  }, [searchQuery, store]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    loadData();
  }, [user, router, loadData]);

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    router.push(`/tags?q=${encodeURIComponent(tag)}`);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value) {
      router.push(`/tags?q=${encodeURIComponent(value)}`);
    } else {
      router.push('/tags');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Container size="md" py="md">
      <Stack gap="lg">
        <Box>
          <Title order={2}>タグ</Title>
          <Text c="dimmed" size="sm">
            タグで学習ログを検索できます
          </Text>
        </Box>

        <TextInput
          placeholder="タグを検索"
          leftSection={<IconSearch size={16} />}
          value={searchQuery}
          onChange={(e) => handleSearch(e.currentTarget.value)}
          size="md"
        />

        {!searchQuery && (
          <Card shadow="sm" padding="lg" radius="lg" withBorder>
            <Stack gap="md">
              <Text fw={500}>人気タグ</Text>
              {allTags.length > 0 ? (
                <Group gap="xs">
                  {allTags.map(({ tag, count }) => (
                    <Badge
                      key={tag}
                      variant="light"
                      size="lg"
                      style={{ cursor: 'pointer' }}
                      leftSection={<IconHash size={12} />}
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag} ({count})
                    </Badge>
                  ))}
                </Group>
              ) : (
                <Text c="dimmed" size="sm">
                  まだタグがありません。学習ログにタグを追加しましょう！
                </Text>
              )}
            </Stack>
          </Card>
        )}

        {searchQuery && (
          <Stack gap="md">
            <Group gap="xs">
              <Text size="sm" c="dimmed">
                検索結果:
              </Text>
              <Badge variant="light" leftSection={<IconHash size={12} />}>
                {searchQuery}
              </Badge>
            </Group>

            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <StudyLogCard key={log.id} log={log} onUpdate={loadData} />
              ))
            ) : (
              <Card shadow="sm" padding="xl" radius="lg" withBorder>
                <Center py="xl">
                  <Stack align="center" gap="md">
                    <IconMoodEmpty size={48} stroke={1.5} color="var(--mantine-color-dimmed)" />
                    <Text c="dimmed" ta="center">
                      {searchQuery}タグのログは見つかりませんでした
                    </Text>
                  </Stack>
                </Center>
              </Card>
            )}
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
