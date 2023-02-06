import {Module} from '@nestjs/common';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import {ConfigModuleModule} from './config_module/config_module.module';
import {CrawlerModule} from './crawler/crawler.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigServiceProvider} from "./config_module/config_module.service";

@Module({
  imports: [
      ConfigModule.forRoot({isGlobal: true}),
      TypeOrmModule.forRootAsync({
          imports: [ConfigModuleModule],
          useFactory: (config: ConfigServiceProvider) => config.createTypeOrmOptions(),
          inject: [ConfigServiceProvider]
      }),
      ConfigModuleModule,
      CrawlerModule,
  ],
  providers: [AppService],
})
export class AppModule {}
