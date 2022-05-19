export default class RouteBuilder {
  public readonly URI: string;

  public readonly API_BASE_URL: string;

  private paths: string[] = [];

  private queryParams: { key: string, value: string }[] = [];

  constructor() {
    this.URI = process.env.SERVER_URI || 'http://127.0.0.1:8000';
    this.API_BASE_URL = `${this.URI}/api`;
  }

  append(resource: ApiResource): RouteBuilder {
    this.paths.push(resource);
    return this;
  }

  select(id: string): RouteBuilder {
    this.paths.push(id);
    return this;
  }

  queryParam(key: string, value: string) {
    this.queryParams.push({ key, value });
    return this;
  }

  build(): string {
    const route = [this.API_BASE_URL, ...this.paths].join('/');

    const url = new URL(route);
    this.queryParams.forEach(({ key, value }) => {
      url.searchParams.append(key, value);
    });

    return url.href;
  }
}

export enum ApiResource {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  AUTH = 'auth',
  RECORD = 'record',
}
