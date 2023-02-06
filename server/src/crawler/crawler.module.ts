import {Module} from '@nestjs/common';
import {CrawlerService} from './crawler.service';
import {CrawlerController} from './crawler.controller';
import {NestCrawlerModule} from "nest-crawler";
import {HttpModule} from "@nestjs/axios";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PuppeteerModule} from "nest-puppeteer";
import {StockEntity} from "../stock/entities/stock.entity";
import {StockTransactionEntity} from "../stock/entities/stock-transaction.entity";
import {UserEntity} from "../user/entities/user.entity";
import {CityEntity} from "../models/city.entity";
import {DistrictEntity} from "../models/district.entity";
import {WardEntity} from "../models/ward.entity";

@Module({
  imports: [
      TypeOrmModule.forFeature([
          StockEntity,
          StockTransactionEntity,
          UserEntity,
          CityEntity,
          DistrictEntity,
          WardEntity
      ]),
      NestCrawlerModule,
      HttpModule.registerAsync({
          useFactory: () => ({
              timeout: 6000000,
              maxRedirects: 5,
          }),
      }),
      PuppeteerModule.forRoot({
          pipe: true,
          timeout: 6000000,
          isGlobal: true
      })
  ],
  controllers: [CrawlerController],
  providers: [CrawlerService]
})
export class CrawlerModule {}
