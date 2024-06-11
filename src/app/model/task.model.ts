export interface Task {
    id: number;
    title: string;
    description: string;
    priorty: string;
    status: number;
    audiofile?: Blob;
    audiourl?: string;
}