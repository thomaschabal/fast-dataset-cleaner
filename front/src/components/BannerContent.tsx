import React, { useState, useEffect, useCallback } from 'react';
import { withStyles, WithStylesProps } from 'react-with-styles';
import { PhotoRoomThemeType } from '../theme/PhotoRoomTheme';
import Input from './elements/Input';
import Separator from './elements/Separator';
import Select from './elements/Select';
import {
    getAnnotator,
    getImgPerPage,
    getSha,
    setAnnotator,
    setImgPerPage,
    setSha,
    DEFAULT_IMG_PER_PAGE,
    OPTIONS_IMG_PER_PAGE,
    getDatasetPath,
    setDatasetPath,
    setImagesFolder,
    setMasksFolder,
    getImagesFolder,
    getMasksFolder,
    OPTIONS_USE_MASKS,
    setUseMasks,
    getUseMasks,
    getIdColumnName,
    setIdColumnName,
    setImagesExtension,
    getImagesExtension,
    getMasksExtension,
    setMasksExtension,
    setAnnotationUltraFastModeLS,
    getAnnotationUltraFastModeLS
} from '../services/LocalStorage';
import { updateUrl } from '../services/Location';
import Button from './elements/Button';
import Section from './elements/Section';
import TextDisplay from './elements/TextDisplay';
import Switch from './elements/Switch';


const FOLDER_PLACEHOLDER = '/path/to/folder/';
export const handleClickGetImages = () => window.location.reload(false);

type Props = {
    isClicked: boolean;
} & WithStylesProps;


function Banner(props: Props){
    const { isClicked, css, styles } = props;
    const [annot, setAnnot] = useState(getAnnotator() || '');
    const [csv, setCsv] = useState(getDatasetPath() || '');
    const [imagesPerPage, setImagesPerPage] = useState(getImgPerPage() || DEFAULT_IMG_PER_PAGE);
    const [shaPass, setShaPass] = useState(getSha() || '');
    const [imgFold, setImgFold] = useState(getImagesFolder() || '');
    const [maskFold, setMaskFold] = useState(getMasksFolder() || '');
    const [useMasks, setUseMasksValue] = useState(getUseMasks() || 'false');
    const [idColumn, setIdColumn] = useState(getIdColumnName() || 'id');
    const [imgExt, setImgExt] = useState(getImagesExtension() || '');
    const [masksExt, setMasksExt] = useState(getMasksExtension() || '');
    const [annotationUltraFastMode, setAnnotationUltraFastMode] = useState(getAnnotationUltraFastModeLS() || false);
    
    useEffect(() => {
        if (!getIdColumnName()) {
            setIdColumnName('id');
        }
    }, []);

    const handleChangeAnnotator = (e: any) => {
        const annotator = e.target.value;
        setAnnotator(annotator);
        setAnnot(annotator);
    };

    const handleChangeImgPerPage = (e: any) => {
        const imgPerPage = e.target.value;
        setImgPerPage(imgPerPage);
        setImagesPerPage(imgPerPage);
        updateUrl();
    };
    
    const handleChangeCsv = (e: any) => {
        const csvPath = e.target.value;
        setDatasetPath(csvPath);
        setCsv(csvPath);
        updateUrl();
    };
    
    const handleChangeSha = (e: any) => {
        const password = e.target.value;
        setShaPass(password);
        setSha(password);
        updateUrl();
    };

    const handleChangeImagesFolder = (e: any) => {
        const folder = e.target.value;
        setImagesFolder(folder);
        setImgFold(folder);
        updateUrl();
    };

    const handleChangeMasksFolder = (e: any) => {
        const folder = e.target.value;
        setMasksFolder(folder);
        setMaskFold(folder);
        updateUrl();
    };

    const handleChangeUseMasks = (e: any) => {
        const useMasksValue = e.target.value;
        setUseMasksValue(useMasksValue);
        setUseMasks(useMasksValue);
        updateUrl();
    };

    const handleChangeIdColumnName = (e: any) => {
        const name = e.target.value;
        setIdColumn(name);
        setIdColumnName(name);
        updateUrl();
    };

    const handleChangeImagesExtension = (e: any) => {
        const extension = e.target.value;
        setImgExt(extension);
        setImagesExtension(extension);
        updateUrl();
    };

    const handleChangeMasksExtension = (e: any) => {
        const extension = e.target.value;
        setMasksExt(extension);
        setMasksExtension(extension);
        updateUrl();
    };

    const handleChangeAnnotationMode = (mode: boolean) => {
        setAnnotationUltraFastMode(mode);
        setAnnotationUltraFastModeLS(mode);
    }

    const InputBanner = useCallback((props: any) => <Input isHidden={!isClicked} {...props} />, [isClicked]);
    const SelectBanner = useCallback((props: any) => <Select isHidden={!isClicked} {...props} />, [isClicked]);
    const SwitchBanner = useCallback((props: any) => <Switch isHidden={!isClicked} {...props} />, [isClicked]);
    const SectionBanner = useCallback((props: any) => <Section isHidden={!isClicked} {...props} />, [isClicked]);
    const ButtonBanner = useCallback((props: any) => <Button isHidden={!isClicked} {...props} />, [isClicked]);

    return (
        <div
            {...css(
                styles.bannerContent,
                isClicked && styles.bannerOpen
            )}
        >
            {isClicked && <Separator />}
            <SectionBanner title="Password">
                <InputBanner
                    value={shaPass}
                    onChange={handleChangeSha}
                />
            </SectionBanner>
            <SectionBanner title="About the CSV">
                <InputBanner
                    displayInputValue
                    title="CSV path"
                    value={csv}
                    onChange={handleChangeCsv}
                />
                <InputBanner
                    title="Name of the id column"
                    value={idColumn}
                    onChange={handleChangeIdColumnName}
                />
            </SectionBanner>
            <SectionBanner title="Images">
                <TextDisplay text={`${imgFold || FOLDER_PLACEHOLDER}{id}${imgExt}`} />
                <InputBanner
                    title="Images folder"
                    value={imgFold}
                    onChange={handleChangeImagesFolder}
                />
                <InputBanner
                    title="Images extension"
                    value={imgExt}
                    onChange={handleChangeImagesExtension}
                />
            </SectionBanner>
            <SectionBanner title="Masks">
                <SelectBanner
                    title="Use masks"
                    name="use_masks"
                    value={useMasks}
                    options={OPTIONS_USE_MASKS}
                    onChange={handleChangeUseMasks}
                />
                {useMasks === 'true' && (
                    <>
                        <TextDisplay text={`${maskFold || FOLDER_PLACEHOLDER}{id}${masksExt}`} />
                        <InputBanner
                            title="Masks folder"
                            value={maskFold}
                            onChange={handleChangeMasksFolder}
                        />
                        <InputBanner
                            title="Masks extension"
                            value={masksExt}
                            onChange={handleChangeMasksExtension}
                        />
                    </>
                )}
            </SectionBanner>
            <SectionBanner title="Annotation">
                <InputBanner
                    title="Annotator"
                    value={annot}
                    onChange={handleChangeAnnotator}
                />
                <SelectBanner
                    title="Images per page"
                    name="img_per_page"
                    value={imagesPerPage.toString()}
                    options={OPTIONS_IMG_PER_PAGE}
                    onChange={handleChangeImgPerPage}
                />
                <SwitchBanner
                    value={annotationUltraFastMode}
                    stateFalse="Fast mode"
                    stateTrue="Ludicrous mode"
                    handleClick={handleChangeAnnotationMode} />
            </SectionBanner>
            <ButtonBanner title="Get images" handleClick={handleClickGetImages} />
        </div>
    );
}

const unit = 8;
const bannerContentSideMargin = 3 * unit;
export default withStyles(({ unit, speed }: PhotoRoomThemeType) => ({
    bannerContent: {
        width: 0,
        margin: bannerContentSideMargin,
        marginTop : 19 * unit,
        zIndex: 2,
        overflowY: 'auto',
        maxHeight: '85vh',
        transition: `width ${speed.fast}s ease-in-out`,
    },
    bannerOpen: {
        width: `calc(100% - 2 * ${bannerContentSideMargin}px)`,
    },
}))(Banner);
