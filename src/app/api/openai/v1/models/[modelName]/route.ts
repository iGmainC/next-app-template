export async function GET(
  request: Request,
  { params }: { params: { modelName: string } },
) {
  return new Response(
    JSON.stringify({
      id: params.modelName,
      object: 'model',
      created: 1686935002,
      owned_by: 'organization-owner',
    }),
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
}
