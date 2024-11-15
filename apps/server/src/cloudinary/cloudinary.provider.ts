import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return v2.config({
      cloud_name: 'dhihu7sdd',
      api_key: '337417862721933',
      api_secret: 'oS5eZ-qFIvWXd12p5BkiLkraR5s',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    });
  },
};
