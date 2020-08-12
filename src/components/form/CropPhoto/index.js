import React, { useState, useEffect, useRef, useCallback } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Row, Col } from 'antd';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { useTranslation } from 'react-i18next';
import './index.scss';

const pixelRatio = 4;

export default function FilterModal(props) {
  const [upImg, setUpImg] = useState();
  const [fileUrl, setFileUrl] = useState();
  const [src, setSrc] = useState();
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!props.imgField) return;
    if (props.imgField.files && props.imgField.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result));
      reader.readAsDataURL(props.imgField.files[0]);
    }
    return () => '';
  }, [props.imgField]);

  const onImageLoaded = (image) => {
    setUpImg(image);
  };

  const onCropComplete = (crop) => {
    makeClientCrop(crop);
  };

  const onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    setCrop(crop);
  };

  async function makeClientCrop(crop) {
    if (upImg && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(upImg, crop, 'newFile.jpeg');
      props.onFinish(croppedImageUrl);
      // this.setState({ croppedImageUrl });
    }
  }

  function getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(fileUrl);
        // setFileUrl(window.URL.createObjectURL(blob));
        resolve(window.URL.createObjectURL(blob));
      }, 'image/jpeg');
    });
  }
  return (
    <Modal
      {...props}
      visible={props.visible}
      title={''}
      closeIcon={''}
      className='crop-photo '
      closable={false}
      footer={false}
    >
      <Row>
        <Col span={20}>
          <p className='title'> التصفية</p>
        </Col>
        <Col span={1} offset={3}>
          <img
            src={require('../../../assets/icons/close.svg')}
            onClick={props.onClose}
            style={{ cursor: 'pointer' }}
            width='20'
          />
        </Col>
        <Row>
          <ReactCrop
            src={src}
            crop={crop}
            ruleOfThirds
            onImageLoaded={onImageLoaded}
            onComplete={onCropComplete}
            onChange={onCropChange}
          />
          <div>
            <canvas
              ref={previewCanvasRef}
              style={{
                width: completedCrop?.width ?? 0,
                height: completedCrop?.height ?? 0,
              }}
            />
          </div>
        </Row>

        <Row>
          <button
            type='button'
            disabled={!completedCrop?.width || !completedCrop?.height}
            onClick={() =>
              generateDownload(previewCanvasRef.current, completedCrop)
            }
          >
            Download cropped image
          </button>
        </Row>
      </Row>
    </Modal>
  );
}

// We resize the canvas down when saving on retina devices otherwise the image
// will be double or triple the preview size.
function getResizedCanvas(canvas, newWidth, newHeight) {
  const tmpCanvas = document.createElement('canvas');
  tmpCanvas.width = newWidth;
  tmpCanvas.height = newHeight;

  const ctx = tmpCanvas.getContext('2d');
  ctx.drawImage(
    canvas,
    0,
    0,
    canvas.width,
    canvas.height,
    0,
    0,
    newWidth,
    newHeight
  );

  return tmpCanvas;
}

function generateDownload(previewCanvas, crop) {
  if (!crop || !previewCanvas) {
    return;
  }

  const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);

  canvas.toBlob(
    (blob) => {
      const previewUrl = window.URL.createObjectURL(blob);

      const anchor = document.createElement('a');
      anchor.download = 'cropPreview.png';
      anchor.href = URL.createObjectURL(blob);
      anchor.click();

      window.URL.revokeObjectURL(previewUrl);
    },
    'image/png',
    1
  );
}
