import { GoogleService } from './google/service'
import { MapboxService } from './mapbox/service'

class Atlas {
  protected service: any;

  constructor(service: string, options: any) {
    if (service == 'google') {
      this.service = this.registerGoogleService(options);
    } else if (service == 'mapbox') {
      this.service = this.registerMapboxService(options);
    }
  }

  private registerGoogleService(options: any): GoogleService {
    return new GoogleService(options);
  }

  private registerMapboxService(options: any): MapboxService {
    return new MapboxService(options);
  }
}

module.exports = Atlas;
