import {Controller, Get, Query} from '@nestjs/common';
import {CrawlerService} from './crawler.service';

@Controller('crawler')
export class CrawlerController {
  constructor(
      private readonly crawlerService: CrawlerService) {}

  @Get('')
  async getCraw(@Query() q: any) {
    return this.crawlerService.getCraw(q.stock_exchanges);
  }
}
