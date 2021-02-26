import {Injectable} from '../../lib';

@Injectable('dummyService')
class DummyService {
  public dummyProterty = 'dummyProperty';

  constructor() {}

  public dummyMethod(): string {
    return 'dummyMethod';
  }
}

export default DummyService;
