import React, { useState, useRef, useEffect } from 'react';

import './LoadFileToServerWithPercent.scss';

import CachedIcon from '@material-ui/icons/Cached';
import CheckIcon from '@material-ui/icons/Check';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box } from '@material-ui/core';

const { v4: uuidv4 } = require('uuid');

const LoadFileToServerWithPercent = () => {
    const [loadState, setLoadState] = useState(false);
    const [listFiles, setListFiles] = useState([]);
    const [percentLoadAll, setPercentLoadAll] = useState(0);
    const refFile = useRef('');

    let xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('progress', (e) => {
        console.log('chunk', e.loaded);
        console.log('total', e.total);

        setPercentLoadAll(Math.round((e.loaded / e.total) * 100));
    });

    xhr.upload.addEventListener('load', (e) => {
        console.log('END');
        setLoadState(true)
    });


    useEffect(() => {
        console.log('RENDER');
    }, []);

    useEffect(() => {
        // console.log(listFiles);
    }, [listFiles]);

    const handleLoadFile = () => {
        setLoadState(false);
        const files = refFile.current.files;
        const formFilesData = new FormData();

        for (const key in files) {
            if (files.hasOwnProperty(key)) {
                console.log('Add set files');
                formFilesData.append(`form-${key}`, files[key]);
                setListFiles((prev) => {
                    return [
                        ...prev,
                        ...[
                            {
                                id: uuidv4(),
                                name: files[key].name,
                                size: (files[key].size / (1024 * 1024)).toFixed(
                                    2
                                ),
                                startSize: 0,
                                loaded: false,
                            },
                        ],
                    ];
                });
            }
        }

        xhr.open('POST', 'http://localhost:3001/loadFile');
        xhr.send(formFilesData);
    };

    return (
        <div className='LoadFileToServerWithPercent'>
            <div className='btnLoad'>
                <input
                    ref={refFile}
                    onChange={handleLoadFile}
                    type='file'
                    id='file'
                    multiple
                />
                <div className='wrapper'>
                    <label htmlFor='file'>
                        <CloudUploadIcon htmlFor='file' />
                    </label>
                    <label className='name' htmlFor='file'>
                        <Typography variant='h5' gutterBottom>
                            Drag or browse file
                        </Typography>
                    </label>
                </div>
            </div>
            <div className='listUploadFiles'>
                <div className='listFiles'>
                    {listFiles.map((file) => (
                        <div className={"item " + ((loadState == true) ? "active" : null) } key={file.id}>
                            <div className='wrap'>
                                {
                                    (loadState == false)
                                        ? <RotateLeftIcon className='rotate' />
                                        : <CheckIcon />
                                }
                                
                            </div>
                            <div className='description'>
                                <Typography variant='h6' gutterBottom>
                                    {file.name}
                                </Typography>
                                <span className='size'>
                                    <Typography variant='body2' gutterBottom>
                                        {file.startSize} MB / {file.size} MB
                                    </Typography>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Box className='allProgessBar' display='flex' alignItems='center'>
                <Box width='100%' mr={0}>
                    <LinearProgress
                        variant='determinate'
                        value={percentLoadAll}
                    />
                </Box>

                <Box minWidth={35} className='percent'>
                    <Typography
                        variant='body2'
                        color='textSecondary'
                    >{`${percentLoadAll}%`}</Typography>
                </Box>
            </Box>
        </div>
    );
};

export default LoadFileToServerWithPercent;
