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
import { useAuth } from '@/components/providers/mantineProvider';
import { StudyLogCard } from '@/components/page/main/logs/StudyLogCard';
import { useAppStore } from '@/stores';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import type { StudyLog } from '@/types';

interface TagCount {
  tag: string;
  count: number;
}

export function TagsContent() {
  const { user } = useAuth();
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
          <Title order={2}>Tags</Title>
          <Text c="dimmed" size="sm">
            Browse logs by tags
          </Text>
        </Box>

        <TextInput
          placeholder="Search tags..."
          leftSection={<IconSearch size={16} />}
          value={searchQuery}
          onChange={(e) => handleSearch(e.currentTarget.value)}
          size="md"
        />

        {!searchQuery && (
          <Card shadow="sm" padding="lg" radius="lg" withBorder>
            <Stack gap="md">
              <Text fw={500}>Popular Tags</Text>
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
                  No tags yet. Add tags to your study logs!
                </Text>
              )}
            </Stack>
          </Card>
        )}

        {searchQuery && (
          <Stack gap="md">
            <Group gap="xs">
              <Text size="sm" c="dimmed">
                Showing results for:
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
                      No logs found with tag &quot;{searchQuery}&quot;
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
