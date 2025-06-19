export type UploadedFile = {
  fileName: string;
  fileKey: string;
  fileUrl: string;
  contentType: string;
  size: number;
  message: string;
};

export type FileItem = {
  name: string;
  key: string;
  contentType: string;
  size: number;
  url: string;
};
