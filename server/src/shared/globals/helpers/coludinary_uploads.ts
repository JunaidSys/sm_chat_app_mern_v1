import cloudinary, { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

type ImgUpload = {
  file: string;
  public_id?: string;
  overwrite?: boolean;
  invalidate?: boolean;
};

type VideoUpload = {
  file: string;
  public_id?: string;
  overwrite?: boolean;
  invalidate?: boolean;
};

export class CloudinaryUpload {
  static imgUpload(
    file: string, //the files that we are sending must be in base 64 encoded strings format
    public_id?: string,
    overwrite?: boolean,
    invalidate?: boolean
  ): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
    return new Promise((resolve) => {
      cloudinary.v2.uploader.upload(
        file,
        {
          public_id,
          overwrite,
          invalidate
        },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error) resolve(error);
          resolve(result);
        }
      );
    });
  }

  static videoUpload(
    file: string,
    public_id?: string,
    overwrite?: boolean,
    invalidate?: boolean
  ): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
    return new Promise((resolve) => {
      cloudinary.v2.uploader.upload(
        file,
        {
          resource_type: 'video',
          chunk_size: 50000,
          public_id,
          overwrite,
          invalidate
        },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error) resolve(error);
          resolve(result);
        }
      );
    });
  }
}

// export const cloudinaryUploads: CloudinaryUpload = new CloudinaryUpload();

export function imgUploads(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file,
      {
        public_id,
        overwrite,
        invalidate
      },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) resolve(error);
        resolve(result);
      }
    );
  });
}

export function videoUploads(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file,
      {
        resource_type: 'video',
        chunk_size: 50000,
        public_id,
        overwrite,
        invalidate
      },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) resolve(error);
        resolve(result);
      }
    );
  });
}
