/**
 * Object Model of a picture ( <title>, (object picture))
 */

export class Picture {
  title: string;
  fileData: string;

  constructor(
    {
      title = '',
      fileData = null
    }:
      { title ? : string, fileData ? : string })
  {
    this.title = title;
    this.fileData = fileData;
  }

}
