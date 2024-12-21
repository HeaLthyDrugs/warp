export interface Snippet {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    userId: string;
    title: string;
    code: string;
    language: string;
    tags: string[];
    isFavorite: boolean;
}

export interface Tag {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    userId: string;
    name: string;
    snippetCount: number;
} 