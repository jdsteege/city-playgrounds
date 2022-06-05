export class PlaygroundDef {
  id: string;
  name: string;
  imageUrl: string;
  address: string;
  latitude: number;
  longitude: number;

  constructor() {
    this.id = '';
    this.name = '';
    this.imageUrl = '';
    this.address = '';
    this.latitude = 0;
    this.longitude = 0;
  }
}
