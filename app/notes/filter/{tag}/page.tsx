import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";

export default async function FilteredNotesPage({
  params,
}: {
  params: Promise<{ tag?: string[] }>;
}) {
  const { tag } = await params;
  
  // Отримуємо тег з URL. Якщо це 'all' або undefined, передаємо undefined в API
  const selectedTag = tag?.[0];
  const apiTag = selectedTag === 'all' ? undefined : selectedTag;

  const queryClient = new QueryClient();

  // Виконуємо попередній запит на сервері
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", apiTag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, tag: apiTag }),
  });

  // Отримуємо дані з кешу
  const data = queryClient.getQueryData<FetchNotesResponse>(["notes", 1, "", apiTag]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
       {data?.notes && data.notes.length > 0 ? (
          <NoteList notes={data.notes} />
       ) : (
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '18px', color: '#555' }}>
            No notes found for this tag.
          </p>
       )}
    </HydrationBoundary>
  );
}