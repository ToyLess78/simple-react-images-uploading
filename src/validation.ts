import { DEFAULT_NULL_INDEX } from './constants';
import { ResolutionType, ErrorsType, ImageListType } from './typings';
import { getImage } from './utils';

export const isResolutionValid = (
    image: HTMLImageElement,
    resolutionType: ResolutionType,
    resolutionWidth: number = 0,
    resolutionHeight: number = 1
): boolean => {
    if (!resolutionWidth || !resolutionHeight || !image.width || !image.height)
        return true;
    switch (resolutionType) {
        case 'absolute': {
            if (image.width === resolutionWidth && image.height === resolutionHeight)
                return true;
            break;
        }
        case 'ratio': {
            const ratio = resolutionWidth / resolutionHeight;
            if (image.width / image.height === ratio) return true;
            break;
        }
        case 'less': {
            if (image.width <= resolutionWidth && image.height <= resolutionHeight)
                return true;
            break;
        }
        case 'more': {
            if (image.width >= resolutionWidth && image.height >= resolutionHeight)
                return true;
            break;
        }
        default:
            break;
    }
    return false;
};

export const isImageValid = (fileType: string): boolean => {
    return fileType.includes('image');
};

export const isMaxFileSizeValid = (fileSize: number, maxFileSize?: number): boolean => {
    return maxFileSize ? fileSize <= maxFileSize : true;
};

export const isAcceptTypeValid = (acceptType: Array<string>, fileName: string): boolean => {
    if (acceptType && acceptType.length > 0) {
        const type: string = fileName.split('.').pop() || '';
        return acceptType.findIndex(
            (item) => item.toLowerCase() === type.toLowerCase()
        ) >= 0;
    }
    return true;
};

export const isMaxNumberValid = (totalNumber: number, maxNumber?: number, keyUpdate?: number): boolean => {
    if (maxNumber === undefined || maxNumber === null) return true;
    if (keyUpdate === DEFAULT_NULL_INDEX) {
        return totalNumber <= maxNumber;
    } else {
        return totalNumber <= maxNumber + 1;
    }
};

export const getErrorValidation = async ({
                                             fileList,
                                             value,
                                             maxNumber,
                                             keyUpdate,
                                             acceptType,
                                             maxFileSize,
                                             resolutionType,
                                             resolutionWidth,
                                             resolutionHeight,
                                             allowNonImageType,
                                         }: {
    fileList: ImageListType;
    value: ImageListType;
    maxNumber?: number;
    keyUpdate?: number;
    acceptType?: Array<string>;
    maxFileSize?: number;
    resolutionType?: ResolutionType;
    resolutionWidth?: number;
    resolutionHeight?: number;
    allowNonImageType?: boolean;
}): Promise<ErrorsType> => {
    const newErrors: ErrorsType = {};
    const totalNumber = fileList.length + value.length;
    if (!isMaxNumberValid(totalNumber, maxNumber, keyUpdate)) {
        newErrors.maxNumber = true;
    } else {
        for (let i = 0; i < fileList.length; i += 1) {
            const { file } = fileList[i];
            if (!file) continue;
            if (!allowNonImageType && !isImageValid(file.type)) {
                newErrors.acceptType = true;
                break;
            }
            if (acceptType && !isAcceptTypeValid(acceptType, file.name)) {
                newErrors.acceptType = true;
                break;
            }
            if (!isMaxFileSizeValid(file.size, maxFileSize)) {
                newErrors.maxFileSize = true;
                break;
            }
            if (resolutionType) {
                const image = await getImage(file);
                const checkRes = isResolutionValid(
                    image,
                    resolutionType,
                    resolutionWidth,
                    resolutionHeight
                );
                if (!checkRes) {
                    newErrors.resolution = true;
                    break;
                }
            }
        }
    }
    if (Object.values(newErrors).find(Boolean)) return newErrors;
    return null;
};
