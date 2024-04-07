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
    acceptType?: string[];
    maxFileSize?: number;
    resolutionWidth?: number;
    resolutionHeight?: number;
    dataURLKey?: string;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    allowNonImageType?: boolean;
}

export interface ExportInterface {
    imageList?: ImageListType;
    onImageUpload?: () => void;
    onImageUpdate: (index: number) => void;
}
