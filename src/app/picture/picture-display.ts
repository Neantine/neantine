/**
 * Object Model of a picture ( <title>, (object picture))
 */

export class PictureDisplay {

  id: string;
  title: string;
  url : string;

  constructor( { title = '', url = '', id='' } :  {id: string ,title? : string, url : string } ) {
    this.title = title;
    this.id = id;
    this.url = url;
  }

}

