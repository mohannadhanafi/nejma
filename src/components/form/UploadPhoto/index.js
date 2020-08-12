import React, { useRef, useEffect, useState } from 'react';
import cameraIcon from 'assets/camera.svg';

import { useTranslation } from 'react-i18next';
import './index.scss';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/selectors';
import CropPhoto from 'components/PhotoCrop';

export default function UploadPhoto(props) {
  const imgFile = useRef();
  const user = useSelector(selectUser);
  const [src, setSrc] = useState();
  const [showCropPhoto, setShowCropPhoto] = useState(false);

  const { t } = useTranslation();

  const onClick = () => {
    imgFile.current.value = "";
    imgFile.current.click();
  };

  useEffect(() => {
    imgFile.current.addEventListener('change', (event) => {
      const files = imgFile.current;
      setSrc(URL.createObjectURL(files.files[0]));
      setShowCropPhoto(true);
    });
  }, [imgFile]);

  const getCropped = (value) => {
    setSrc(URL.createObjectURL(value));

    props.onChange(null, value);
    setShowCropPhoto(false);
  };
  const onClose = () => {
    setShowCropPhoto(false);
  };
  return (
    <>
      <CropPhoto
        visible={showCropPhoto}
        imageSrc={src}
        getCropped={getCropped}
        onClose={onClose}
        ratio={props.ratio}
        className={props.className1}
      />

      <div
        {...props}
        className={`nejma-upload-photo-container ${props.className}`}
      >
        <div
          className={`nejma-upload-photo ${
            props.talent ? `nejma-upload-talent` : null
          }`}
          style={{
            backgroundImage: `url(${src || user.pic_url})`,
            backgroundSize: 'cover',
          }}
          onClick={onClick}
        >
          {!(src || user.pic_url) && (
            <img src={cameraIcon} alt='upload photo' />
          )}
          <input
            type='file'
            name='myfile'
            style={{ display: 'none' }}
            ref={imgFile}
            multiple
            accept='image/*'
          />
          {!(src || user.pic_url) && user.role === 'talent' && (
            <p style={{ fontWeight: 'bold', marginTop: 10 }}>
              {t('uploadPhoto')}
            </p>
          )}
        </div>
        {!props.talent && <p>{t('uploadPhoto')}</p>}
      </div>
    </>
  );
}
