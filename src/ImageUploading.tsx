import React, {useCallback, useMemo, useRef, useState} from 'react';
import {getAcceptTypeString, getListFiles, openFileDialog} from './image-uploading.utils.ts';
import {ImageListType,  ImageUploadingPropsType} from './typings';
import {DEFAULT_DATA_URL_KEY, DEFAULT_NULL_INDEX} from "./constants.ts";

const ImageUploading: React.FC<ImageUploadingPropsType> = (
    {
        value = [],
        onChange,
        children,
        dataURLKey = DEFAULT_DATA_URL_KEY,
        acceptType,
        inputProps = {},
        allowNonImageType = false,
    }) => {
    const inValue = value || [];
    const inputRef = useRef<HTMLInputElement>(null);
    const [keyUpdate, setKeyUpdate] = useState<number>(DEFAULT_NULL_INDEX);

    const handleClickInput = useCallback(() => openFileDialog(inputRef), [inputRef]);

    const onImageUpload = useCallback(() => {
        if (inputRef.current) {
            setKeyUpdate(DEFAULT_NULL_INDEX);
            handleClickInput();
        }
    }, [handleClickInput, inputRef]);

    const onImageUpdate = useCallback((index: number): void => {
        setKeyUpdate(index);
        handleClickInput();
    }, [handleClickInput]);

    const handleChange = async (files: FileList | null) => {
        if (!files) return;
        const fileList = await getListFiles(files, dataURLKey);
        if (!fileList.length) return;

        let updatedFileList: ImageListType;
        const updatedIndexes: number[] = [];

        if (keyUpdate > DEFAULT_NULL_INDEX) {
            const [firstFile] = fileList;
            updatedFileList = [...inValue];
            updatedFileList[keyUpdate] = firstFile;
            updatedIndexes.push(keyUpdate);
        } else {
            updatedFileList = [fileList[0]];
            updatedIndexes.push(0);
        }

        onChange?.(updatedFileList, updatedIndexes);
    };

    const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        if (inputRef.current) {
            await handleChange(e.target.files);
            keyUpdate > DEFAULT_NULL_INDEX && setKeyUpdate(DEFAULT_NULL_INDEX);
            inputRef.current.value = '';
        }
    };

    const acceptTypeString = useMemo(
        () => getAcceptTypeString(acceptType, allowNonImageType),
        [acceptType, allowNonImageType]
    );

    return (
        <>
            <input
                type="file"
                accept={acceptTypeString}
                ref={inputRef}
                onChange={onInputChange}
                style={{display: 'none'}}
                {...inputProps}
            />
            {children?.({
                imageList: inValue,
                onImageUpload,
                onImageUpdate,
            })}
        </>
    );
};

export default ImageUploading;

