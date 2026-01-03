export interface Advertisement {
    id?: string
    name: string;
    age: string;
    place: string;
    content: string;
    email: string;
    phone: string;
    showPhone: boolean;
    category: string;
    confirmed?: boolean;
}

export interface PagedData<T> {
    data: T[];
    total: number;
    page: number;
    pageSize?: number;
}