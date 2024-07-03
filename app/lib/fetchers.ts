export type Repo = {
  id: string;
  name: string;
  stars: number;
  lastCommit: string;
  url: string;
  owner: {
    name: string;
    url: string;
    avatarUrl: string | null;
  };
  languages: string[];
  description: string;
};

// GraphQL query templates
const REPO_COUNT_QUERY = (searchQuery: string) => `
  query {
    search(query: "${searchQuery}", type: REPOSITORY) {
      repositoryCount
    }
  }
`;

const GITHUB_API_URL = process.env.GITHUB_API_URL as string;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const REPOS_QUERY = (
  searchQuery: string,
  first: number,
  after: string | null,
) => `
  query {
    search(query: "${searchQuery}", type: REPOSITORY, first: ${first}, after: ${after ? `"${after}"` : null}) {
      repositoryCount
      edges {
        cursor
        node {
          ... on Repository {
            id
            name
            stargazerCount
            pushedAt
            url
            owner {
              login
              avatarUrl
              url
            }
            languages(first: 5) {
              edges {
                node {
                  name
                }
              }
            }
            description
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

// Fetch repositories from GitHub with offset
export async function fetchRepositories(
  searchQuery: string,
  first: number,
  offset: number,
): Promise<Repo[]> {
  let after: string | null = null;

  if (offset > 0) {
    const initialQuery = REPOS_QUERY(searchQuery, offset, null);
    const initialResponse = await fetch(GITHUB_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({ query: initialQuery }),
    });
    const initialData = await initialResponse.json();
    if (initialData.errors) {
      throw new Error(
        initialData.errors.map((error: any) => error.message).join(', '),
      );
    }

    after = initialData.data.search.pageInfo.endCursor;
  }

  const query = REPOS_QUERY(searchQuery, first, after);
  const response = await fetch(GITHUB_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  if (data.errors) {
    throw new Error(data.errors.map((error: any) => error.message).join(', '));
  }

  return data.data.search.edges.map((edge: any) => ({
    id: edge.node.id,
    name: edge.node.name,
    stars: edge.node.stargazerCount,
    lastCommit: edge.node.pushedAt,
    url: edge.node.url,
    owner: {
      name: edge.node.owner.login,
      url: edge.node.owner.url,
      avatarUrl: edge.node.owner.avatarUrl,
    },
    languages: edge.node.languages.edges.map((lang: any) => lang.node.name),
    description: edge.node.description,
  }));
}

// Fetch total count of repositories for a given search query
export async function fetchCommon(searchQuery: string): Promise<number> {
  const query = REPO_COUNT_QUERY(searchQuery);

  const response = await fetch(GITHUB_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();

  if (data.errors) {
    throw new Error(data.errors.map((error: any) => error.message).join(', '));
  }
  console.log('data: ' + data.data.search.repositoryCount);
  return data.data.search.repositoryCount;
}

// Function to fetch and log fields
export async function fetchAndLogFields(
  searchQuery: string,
  first: number,
  offset: number,
) {
  let after: string | null = null;

  if (offset > 0) {
    const initialQuery = REPOS_QUERY(searchQuery, offset, null);
    const initialResponse = await fetch(GITHUB_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({ query: initialQuery }),
    });
    const initialData = await initialResponse.json();
    if (initialData.errors) {
      throw new Error(
        initialData.errors.map((error: any) => error.message).join(', '),
      );
    }

    after = initialData.data.search.pageInfo.endCursor;
  }

  const query = REPOS_QUERY(searchQuery, first, after);
  const response = await fetch(GITHUB_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  if (data.errors) {
    throw new Error(data.errors.map((error: any) => error.message).join(', '));
  }

  console.log(JSON.stringify(data, null, 2));
}

// Example usage
fetchAndLogFields('react', 10, 0)
  .then(() => console.log('Fetched and logged fields successfully'))
  .catch((error) => console.error('Error fetching fields:', error));
