'use client';

import {
  Container,
  Stack,
  Title,
  Text,
  Card,
  SimpleGrid,
  Group,
  ThemeIcon,
  Box,
  RingProgress,
  Center,
  SegmentedControl,
} from '@mantine/core';
import { BarChart, DonutChart } from '@mantine/charts';
import {
  IconFlame,
  IconClock,
  IconCalendar,
  IconChartPie,
} from '@tabler/icons-react';
import { useAuth } from '@/components/providers/mantineProvider';
import { useAppStore } from '@/stores';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface StatsData {
  dailyStats: { date: string; totalMinutes: number; logCount: number }[];
  categoryStats: { category: string; totalMinutes: number; percentage: number }[];
  totalMinutes: number;
  streak: number;
  logCount: number;
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

export function StatsContent() {
  const { user } = useAuth();
  const router = useRouter();
  const store = useAppStore();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [period, setPeriod] = useState('30');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    const data = store.getUserStats(user.id, parseInt(period));
    setStats(data);
  }, [user, router, period, store]);

  if (!user || !stats) {
    return null;
  }

  const chartData = stats.dailyStats
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-parseInt(period))
    .map((d) => ({
      date: d.date.slice(5),
      minutes: d.totalMinutes,
    }));

  const donutData = stats.categoryStats.map((c, i) => ({
    name: c.category,
    value: c.totalMinutes,
    color: `var(--mantine-color-blue-${Math.min(9, i + 3)})`,
  }));

  return (
    <Container size="md" py="md">
      <Stack gap="lg">
        <Group justify="space-between" align="flex-end">
          <Box>
            <Title order={2}>学習統計</Title>
            <Text c="dimmed" size="sm">
              学習の進捗を記録しよう
            </Text>
          </Box>
          <SegmentedControl
            value={period}
            onChange={setPeriod}
            data={[
              { label: '7 days', value: '7' },
              { label: '30 days', value: '30' },
              { label: '90 days', value: '90' },
            ]}
          />
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
          <Card shadow="sm" padding="lg" radius="lg" withBorder>
            <Group>
              <ThemeIcon size={48} radius="md" variant="light" color="orange">
                <IconFlame size={24} />
              </ThemeIcon>
              <Box>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  連続記録
                </Text>
                <Text size="xl" fw={700}>
                  {stats.streak} 日
                </Text>
              </Box>
            </Group>
          </Card>

          <Card shadow="sm" padding="lg" radius="lg" withBorder>
            <Group>
              <ThemeIcon size={48} radius="md" variant="light" color="blue">
                <IconClock size={24} />
              </ThemeIcon>
              <Box>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  総学習時間
                </Text>
                <Text size="xl" fw={700}>
                  {formatDuration(stats.totalMinutes)}
                </Text>
              </Box>
            </Group>
          </Card>

          <Card shadow="sm" padding="lg" radius="lg" withBorder>
            <Group>
              <ThemeIcon size={48} radius="md" variant="light" color="green">
                <IconCalendar size={24} />
              </ThemeIcon>
              <Box>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  学習記録数
                </Text>
                <Text size="xl" fw={700}>
                  {stats.logCount}
                </Text>
              </Box>
            </Group>
          </Card>

          <Card shadow="sm" padding="lg" radius="lg" withBorder>
            <Group>
              <ThemeIcon size={48} radius="md" variant="light" color="grape">
                <IconChartPie size={24} />
              </ThemeIcon>
              <Box>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  1日平均
                </Text>
                <Text size="xl" fw={700}>
                  {stats.logCount > 0
                    ? formatDuration(Math.round(stats.totalMinutes / stats.dailyStats.length))
                    : '0m'}
                </Text>
              </Box>
            </Group>
          </Card>
        </SimpleGrid>

        <Card shadow="sm" padding="lg" radius="lg" withBorder>
          <Stack gap="md">
            <Title order={4}>日々の学習</Title>
            {chartData.length > 0 ? (
              <BarChart
                h={300}
                data={chartData}
                dataKey="date"
                series={[{ name: 'minutes', color: 'blue.6' }]}
                tickLine="y"
                gridAxis="y"
              />
            ) : (
              <Center h={300}>
                <Text c="dimmed">この期間のデータはありません</Text>
              </Center>
            )}
          </Stack>
        </Card>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <Card shadow="sm" padding="lg" radius="lg" withBorder>
            <Stack gap="md">
              <Title order={4}>カテゴリー別学習時間</Title>
              {donutData.length > 0 ? (
                <Center>
                  <DonutChart
                    data={donutData}
                    size={200}
                    thickness={30}
                    withLabelsLine
                    labelsType="percent"
                    withLabels
                  />
                </Center>
              ) : (
                <Center h={200}>
                  <Text c="dimmed">データはありません</Text>
                </Center>
              )}
            </Stack>
          </Card>

          <Card shadow="sm" padding="lg" radius="lg" withBorder>
            <Stack gap="md">
              <Title order={4}>カテゴリー別内訳</Title>
              <Stack gap="xs">
                {stats.categoryStats.length > 0 ? (
                  stats.categoryStats.map((cat) => (
                    <Group key={cat.category} justify="space-between">
                      <Text size="sm">{cat.category}</Text>
                      <Group gap="xs">
                        <Text size="sm" fw={500}>
                          {formatDuration(cat.totalMinutes)}
                        </Text>
                        <RingProgress
                          size={24}
                          thickness={3}
                          sections={[{ value: cat.percentage, color: 'blue' }]}
                        />
                      </Group>
                    </Group>
                  ))
                ) : (
                  <Text c="dimmed" ta="center">
                    データはありません
                  </Text>
                )}
              </Stack>
            </Stack>
          </Card>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
