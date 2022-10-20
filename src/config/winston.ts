import { Injectable } from '@nestjs/common';
import { WinstonModuleOptionsFactory } from 'nest-winston';
import winston, { format, LoggerOptions } from 'winston';

@Injectable()
export class WinstonConfigService implements WinstonModuleOptionsFactory {
  createWinstonModuleOptions(): LoggerOptions | Promise<LoggerOptions> {
    winston.addColors({
      error: 'red',
      warn: 'yellow',
      info: 'cyan',
      debug: 'green',
    });
    return {
      format: format.combine(
        format.colorize({ message: true }),
        format.simple(),
        format.timestamp(),
        // format.json(),
        // format.prettyPrint({ colorize: true }),
      ),
      transports: [new winston.transports.Console()],
    };
  }
}
