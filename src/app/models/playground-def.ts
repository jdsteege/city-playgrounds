import { LocationService } from '../services/location.service';

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

  static sortDefsByDistance(
    defArray: PlaygroundDef[],
    locationService: LocationService
  ): PlaygroundDef[] {
    return defArray.sort((a, b) => {
      return (
        locationService.distanceTo(a.latitude, a.longitude) -
        locationService.distanceTo(b.latitude, b.longitude)
      );
    });
  }
}
