import React from 'react';

export interface ImageType {
    dataURL?: string;
    file?: File;
    [key: string]: string | File | undefined;
}

export type ImageListType = ImageType[];

export interface ImageUploadingPropsType {
    value: ImageListType;
    onChange: (value: ImageListType, addUpdatedIndex?: number[]) => void;
    children?: (props: ExportInterface) => React.ReactNode;
    multiple?: boolean;
    maxNumber?: number;
    acceptType?: string[];
    maxFileSize?: number;
    resolutionWidth?: number;
    resolutionHeight?: number;
    resolutionType?: ResolutionType;
    onError?: (errors: ErrorsType, files?: ImageListType) => void;
    dataURLKey?: string;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    allowNonImageType?: boolean;
}

export interface ExportInterface {
    imageList: ImageListType;
    onImageUpload: () => void;
    onImageRemoveAll: () => void;
    errors: ErrorsType;
    onImageUpdate: (index: number) => void;
    onImageRemove: (index: number) => void;
    isDragging: boolean;
    dragProps: {
        onDrop: (e: React.DragEvent) => void;
        onDragEnter: (e: React.DragEvent) => void;
        onDragLeave: (e: React.DragEvent) => void;
        onDragOver: (e: React.DragEvent) => void;
        onDragStart: (e: React.DragEvent) => void;
    };
}

export type ErrorsType = {
    maxFileSize?: boolean;
    maxNumber?: boolean;
    acceptType?: boolean;
    resolution?: boolean;
} | null;

export type ResolutionType = 'absolute' | 'less' | 'more' | 'ratio';
