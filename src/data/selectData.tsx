export interface Option {
    value: string;
    label: string;
}

export const selectData: Option[] = [
    { value: '', label: '선택' },
    { value: 'n', label: '작성자' },
    { value: 't', label: '제목' }
] 