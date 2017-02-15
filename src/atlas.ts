import { GoogleService } from './google/service'
import { MapboxService } from './mapbox/service'

class Atlas {
  protected service: any;

  constructor(service: string, options: any) {
    if (service == 'google') {
      this.service = this.registerGoogleService(options);
    }
  }

  registerGoogleService(options: any): GoogleService {
    return new GoogleService(options);
  }

  registerMapboxService(options: any): MapboxService {
    return new MapboxService(options);
  }
}

module.exports = Atlas;
