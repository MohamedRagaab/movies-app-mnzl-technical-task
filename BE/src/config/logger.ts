import _ from 'lodash';
import winston, { Logger as WinstonLogger } from 'winston';
import expressWinston from 'express-winston';
import { environment } from './index.js';

const JSONFormatter = (log: winston.LogEntry): winston.LogEntry => {
  const message = Symbol.for('message');
  const base = { timestamp: new Date(), severity: log.level.toUpperCase() };
  const json = Object.assign(base, log);
  (log as any)[message] = JSON.stringify(json);
  return log;
};

class Logger {
  private logger: WinstonLogger;
  private expressWinstonMiddleware: expressWinston.LoggerOptions;
  private expressWinstonErrorMiddleware: expressWinston.ErrorLoggerOptions;

  constructor() {
    let level: string;
    let silent: boolean;

    switch (environment) {
      case 'production':
      case 'staging':
        level = 'info';
        silent = false;
        break;
      case 'testing':
        level = 'error';
        silent = false;
        break;
      case 'development':
        level = 'debug';
        silent = false;
        break;
      default:
        level = 'emerg';
        silent = true;
        break;
    }

    this.logger = winston.createLogger({
      level,
      silent,
      defaultMeta: {
        service: 'movies-BE',
        version: '1.0.0'
      },
      transports: [
        new winston.transports.Console({
          handleExceptions: true,
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json(),
            winston.format.timestamp(),
            winston.format.printf((info) => JSON.stringify(info))
          )
        })
      ],
      exitOnError: false
    });

    this.expressWinstonMiddleware = {
      winstonInstance: this.logger,
      metaField: null,
      requestWhitelist: ['headers', 'query', 'body'],
      responseWhitelist: [],
      expressFormat: true,
      colorize: false,
      statusLevels: false,
      requestFilter: (req, propName) => {
        if (propName === 'body') {
          if (_.has(req.body, 'password')) delete req.body.password;
          if (_.has(req.body, 'businessAdminData.password')) delete req.body.businessAdminData.password;
        }
        return req[propName];
      },
      responseFilter: (res, propName) => {
        return res[propName];
      },
      level: (req, res) => {
        let logLevel = '';
        if (res.statusCode >= 100) {
          logLevel = 'info';
        }
        if (res.statusCode >= 400) {
          logLevel = 'warn';
        }
        if (res.statusCode >= 500) {
          logLevel = 'error';
        }
        if (res.statusCode === 401 || res.statusCode === 403) {
          logLevel = 'warn';
        }
        return logLevel;
      },
      dynamicMeta: (req, res) => {
        const httpRequest: any = {};
        const meta: any = {};
        if (req) {
          meta.httpRequest = httpRequest;
          httpRequest.requestMethod = req.method;
          httpRequest.requestUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
          httpRequest.protocol = `HTTP/${req.httpVersion}`;
          httpRequest.requestSize = req.socket.bytesRead;
          httpRequest.userAgent = req.get('User-Agent');
          httpRequest.referrer = req.get('Referrer');
          httpRequest.countryCode = req.get('X-Country-Code');
          httpRequest.countryName = req.get('X-Country-Name');
          httpRequest.cityName = req.get('X-City-Name');
          httpRequest.geoLat = req.get('X-Geo-Longitude');
          httpRequest.geoLng = req.get('X-Geo-Longitude');
          meta.user = req.user;
        }

        if (res) {
          meta.httpRequest = httpRequest;
          httpRequest.status = res.statusCode;
          if (res.locals.body) {
            if (typeof res.locals.body === 'object') {
              httpRequest.responseSize = JSON.stringify(res.locals.body).length;
            } else if (typeof res.locals.body === 'string') {
              httpRequest.responseSize = res.locals.body.length;
            }
          }
        }
        if (res.locals.error) {
          meta.stack = res.locals.error.stack;
        }
        return meta;
      }
    };

    this.expressWinstonErrorMiddleware = {
      winstonInstance: this.logger,
      metaField: null,
      requestWhitelist: ['headers', 'query', 'body'],
      msg: '{{req.method}} {{req.path}} {{err.message}}',
      requestFilter: (req, propName) => {
        if (propName === 'body') {
          if (_.has(req.body, 'password')) delete req.body.password;
          if (_.has(req.body, 'businessAdminData.password')) delete req.body.businessAdminData.password;
        }
        return req[propName];
      },
      dynamicMeta: (req, res, err) => {
        const httpRequest: any = {};
        const meta: any = {};
        if (req) {
          meta.httpRequest = httpRequest;
          httpRequest.requestMethod = req.method;
          httpRequest.requestUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
          httpRequest.protocol = `HTTP/${req.httpVersion}`;
          httpRequest.requestSize = req.socket.bytesRead;
          httpRequest.userAgent = req.get('User-Agent');
          httpRequest.referrer = req.get('Referrer');
          httpRequest.countryCode = req.get('X-Country-Code');
          httpRequest.countryName = req.get('X-Country-Name');
          httpRequest.cityName = req.get('X-City-Name');
          httpRequest.geoLat = req.get('X-Geo-Longitude');
          httpRequest.geoLng = req.get('X-Geo-Longitude');
          meta.user = req.user;
        }

        if (res) {
          meta.httpRequest = httpRequest;
          httpRequest.status = res.statusCode;
          if (res.locals.body) {
            if (typeof res.locals.body === 'object') {
              httpRequest.responseSize = JSON.stringify(res.locals.body).length;
            } else if (typeof res.locals.body === 'string') {
              httpRequest.responseSize = res.locals.body.length;
            }
          }
        }

        return meta;
      }
    };
  }

  info(message: string) {
    return this.logger.info(message, {
      labels: {}
    });
  }

  error(message: string) {
    return this.logger.error(message, {
      labels: {}
    });
  }

  debug(message: string) {
    return this.logger.debug(message, {
      labels: {}
    });
  }

  warn(message: string) {
    return this.logger.warn(message, {
      labels: {}
    });
  }

  log(message: string) {
    return this.logger.log(message, {
      labels: {}
    });
  }

  getExpressWinstonMiddleware() {
    return expressWinston.logger(this.expressWinstonMiddleware);
  }

  getExpressWinstonErrorMiddleware() {
    return expressWinston.errorLogger(this.expressWinstonErrorMiddleware);
  }
}

const logger = Object.freeze(new Logger());

export default logger;
