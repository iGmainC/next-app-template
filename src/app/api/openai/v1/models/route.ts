export async function GET(request: Request) {
  return new Response(
    JSON.stringify({
      object: 'list',
      data: [
        {
          id: 'model-id-0',
          object: 'model',
          created: 1686935002,
          owned_by: 'organization-owner',
        },
        {
          id: 'model-id-1',
          object: 'model',
          created: 1686935002,
          owned_by: 'organization-owner',
        },
        {
          id: 'model-id-2',
          object: 'model',
          created: 1686935002,
          owned_by: 'openai',
        },
      ],
    }),
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
}
