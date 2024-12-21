import { ID, Query } from 'appwrite';
import { databases, storage } from '@/appwrite/config';
import { Snippet } from '@/types/snippet';

const DATABASE_ID = '6765b131003b7bee36ab';
const SNIPPETS_COLLECTION_ID = '6766638e003611dc02bd';
const BUCKET_ID = '6766659f0036b094308a';

export const snippetsService = {
  // Create a new snippet
  async createSnippet(snippet: Omit<Snippet, '$id' | '$createdAt' | '$updatedAt'>) {
    const response = await databases.createDocument(
      DATABASE_ID,
      SNIPPETS_COLLECTION_ID,
      ID.unique(),
      snippet
    );
    return response as unknown as Snippet;
  },

  // Get all snippets for a user
  async getUserSnippets(userId: string) {
    const response = await databases.listDocuments(
      DATABASE_ID,
      SNIPPETS_COLLECTION_ID,
      [Query.equal('userId', userId)]
    );
    return response.documents as unknown as Snippet[];
  },

  // Update a snippet
  async updateSnippet(snippetId: string, data: Partial<Snippet>) {
    return await databases.updateDocument(
      DATABASE_ID,
      SNIPPETS_COLLECTION_ID,
      snippetId,
      data
    );
  },

  // Delete a snippet
  async deleteSnippet(snippetId: string) {
    return await databases.deleteDocument(
      DATABASE_ID,
      SNIPPETS_COLLECTION_ID,
      snippetId
    );
  },

  // Toggle favorite
  async toggleFavorite(snippetId: string, isFavorite: boolean) {
    return await databases.updateDocument(
      DATABASE_ID,
      SNIPPETS_COLLECTION_ID,
      snippetId,
      { isFavorite }
    );
  }
}; 