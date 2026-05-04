'use client';

import {
  Container,
  Stack,
  Title,
  Text,
  Card,
  Code,
  Box,
  Badge,
  Group,
  Tabs,
  Table,
  Divider,
  useMantineColorScheme,
  ActionIcon,
  Anchor,
} from '@mantine/core';
import { IconSun, IconMoon, IconApi } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers';
import { AppShellWrapper } from '@/components/app-shell';

function ApiEndpoint({
  method,
  path,
  description,
  body,
  response,
  queryParams,
}: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  body?: string;
  response: string;
  queryParams?: { name: string; type: string; required: boolean; description: string }[];
}) {
  const methodColors: Record<string, string> = {
    GET: 'green',
    POST: 'blue',
    PUT: 'orange',
    DELETE: 'red',
  };

  return (
    <Card shadow="sm" padding="lg" radius="lg" withBorder>
      <Stack gap="md">
        <Group gap="sm">
          <Badge color={methodColors[method]} size="lg" variant="filled">
            {method}
          </Badge>
          <Code>{path}</Code>
        </Group>

        <Text size="sm">{description}</Text>

        {queryParams && queryParams.length > 0 && (
          <Box>
            <Text size="sm" fw={600} mb="xs">
              Query Parameters
            </Text>
            <Table striped withTableBorder>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Type</Table.Th>
                  <Table.Th>Required</Table.Th>
                  <Table.Th>Description</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {queryParams.map((param) => (
                  <Table.Tr key={param.name}>
                    <Table.Td>
                      <Code>{param.name}</Code>
                    </Table.Td>
                    <Table.Td>{param.type}</Table.Td>
                    <Table.Td>
                      <Badge
                        size="xs"
                        color={param.required ? 'red' : 'gray'}
                        variant="light"
                      >
                        {param.required ? 'Required' : 'Optional'}
                      </Badge>
                    </Table.Td>
                    <Table.Td>{param.description}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Box>
        )}

        {body && (
          <Box>
            <Text size="sm" fw={600} mb="xs">
              Request Body
            </Text>
            <Code block>{body}</Code>
          </Box>
        )}

        <Box>
          <Text size="sm" fw={600} mb="xs">
            Response
          </Text>
          <Code block>{response}</Code>
        </Box>
      </Stack>
    </Card>
  );
}

function PublicApiDocs() {
  const router = useRouter();
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Box mih="100vh">
      <Box
        component="header"
        p="md"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backdropFilter: 'blur(10px)',
        }}
      >
        <Container size="lg">
          <Group justify="space-between">
            <Text
              size="xl"
              fw={700}
              style={{ cursor: 'pointer' }}
              onClick={() => router.push('/')}
            >
              Knolty
            </Text>
            <Group gap="sm">
              <ActionIcon
                variant="subtle"
                size="lg"
                onClick={toggleColorScheme}
                aria-label="Toggle color scheme"
              >
                {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
              </ActionIcon>
              <Anchor onClick={() => router.push('/login')} size="sm">
                Login
              </Anchor>
            </Group>
          </Group>
        </Container>
      </Box>
      <ApiDocsContent />
    </Box>
  );
}

function ApiDocsContent() {
  return (
    <Container size="md" py="md">
      <Stack gap="lg">
        <Box>
          <Group gap="sm" mb="xs">
            <IconApi size={28} />
            <Title order={2}>API Documentation</Title>
          </Group>
          <Text c="dimmed" size="sm">
            Use the Knolty API to post logs from CLI, GitHub Actions, or other tools.
          </Text>
        </Box>

        <Card shadow="sm" padding="lg" radius="lg" withBorder>
          <Stack gap="sm">
            <Title order={4}>Authentication</Title>
            <Text size="sm">
              All API requests require authentication via Bearer token in the
              Authorization header:
            </Text>
            <Code block>
              {`Authorization: Bearer YOUR_API_TOKEN`}
            </Code>
            <Text size="sm" c="dimmed">
              Note: In demo mode, authentication is simulated. Connect a database
              for real token-based authentication.
            </Text>
          </Stack>
        </Card>

        <Divider label="Endpoints" labelPosition="center" />

        <Tabs defaultValue="logs">
          <Tabs.List>
            <Tabs.Tab value="logs">Logs</Tabs.Tab>
            <Tabs.Tab value="user">User</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="logs" pt="md">
            <Stack gap="md">
              <ApiEndpoint
                method="POST"
                path="/api/logs/create"
                description="Create a new study log. Use this endpoint to post logs from CLI or automation tools."
                body={`{
  "userId": "user-123",
  "date": "2024-01-15",
  "duration": 120,
  "category": "Programming",
  "memo": "Learned React hooks",
  "outputUrl": "https://github.com/...",
  "tags": ["React", "JavaScript"],
  "themeId": "theme-456"
}`}
                response={`{
  "success": true,
  "data": {
    "id": "log-789",
    "userId": "user-123",
    "date": "2024-01-15",
    "duration": 120,
    "category": "Programming",
    "memo": "Learned React hooks",
    "outputUrl": "https://github.com/...",
    "tags": ["React", "JavaScript"],
    "themeId": "theme-456",
    "likes": [],
    "comments": [],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}`}
              />

              <ApiEndpoint
                method="GET"
                path="/api/logs/list"
                description="Retrieve a list of study logs for a user."
                queryParams={[
                  {
                    name: 'userId',
                    type: 'string',
                    required: true,
                    description: 'The user ID to fetch logs for',
                  },
                  {
                    name: 'limit',
                    type: 'number',
                    required: false,
                    description: 'Number of logs to return (default: 20)',
                  },
                  {
                    name: 'offset',
                    type: 'number',
                    required: false,
                    description: 'Offset for pagination (default: 0)',
                  },
                ]}
                response={`{
  "success": true,
  "data": {
    "logs": [...],
    "pagination": {
      "limit": 20,
      "offset": 0,
      "total": 100
    }
  }
}`}
              />
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="user" pt="md">
            <Stack gap="md">
              <ApiEndpoint
                method="GET"
                path="/api/user/me"
                description="Get the current authenticated user's profile."
                response={`{
  "success": true,
  "data": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "User Name",
    "avatar": "",
    "bio": "Learning everyday",
    "createdAt": "2024-01-01T00:00:00Z",
    "following": ["user-456"],
    "followers": ["user-789"]
  }
}`}
              />
            </Stack>
          </Tabs.Panel>
        </Tabs>

        <Divider label="Examples" labelPosition="center" />

        <Card shadow="sm" padding="lg" radius="lg" withBorder>
          <Stack gap="md">
            <Title order={4}>CLI Example (curl)</Title>
            <Code block>
              {`curl -X POST https://your-domain.com/api/logs/create \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -d '{
    "userId": "user-123",
    "date": "'$(date +%Y-%m-%d)'",
    "duration": 60,
    "category": "Programming",
    "memo": "Daily coding session",
    "tags": ["coding"]
  }'`}
            </Code>
          </Stack>
        </Card>

        <Card shadow="sm" padding="lg" radius="lg" withBorder>
          <Stack gap="md">
            <Title order={4}>GitHub Actions Example</Title>
            <Code block>
              {`name: Log Study Time
on:
  push:
    branches: [main]

jobs:
  log:
    runs-on: ubuntu-latest
    steps:
      - name: Post study log
        env:
          KNOLTY_TOKEN: \$\{\{ secrets.KNOLTY_TOKEN \}\}
          REPO_NAME: \$\{\{ github.repository \}\}
          REPO_URL: \$\{\{ github.event.repository.html_url \}\}
        run: |
          curl -X POST https://your-domain.com/api/logs/create \\
            -H "Content-Type: application/json" \\
            -H "Authorization: Bearer $KNOLTY_TOKEN" \\
            -d '{
              "userId": "your-user-id",
              "date": "'$(date +%Y-%m-%d)'",
              "duration": 30,
              "category": "Programming",
              "memo": "Committed code to '"$REPO_NAME"'",
              "outputUrl": "'"$REPO_URL"'",
              "tags": ["github", "coding"]
            }'`}
            </Code>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}

export default function ApiDocsPage() {
  const { user } = useAuth();

  if (!user) {
    return <PublicApiDocs />;
  }

  return (
    <AppShellWrapper>
      <ApiDocsContent />
    </AppShellWrapper>
  );
}
